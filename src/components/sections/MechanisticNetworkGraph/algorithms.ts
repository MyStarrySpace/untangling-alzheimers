import type { MechanisticNode } from '@/data/mechanisticFramework/types';
import { allEdges, allNodes } from '@/data/mechanisticFramework';
import type { LayoutPosition, PseudoNode, LayoutResult } from './types';
import { LAYER_WIDTH, NODE_HEIGHT, COMPONENT_GAP } from './constants';

/**
 * Compute topological layers for DAG layout (left-to-right)
 */
export function computeDAGLayers(
  nodes: MechanisticNode[],
  edges: typeof allEdges
): Map<string, number> {
  const nodeIds = new Set(nodes.map(n => n.id));
  const relevantEdges = edges.filter(e => nodeIds.has(e.source) && nodeIds.has(e.target));

  // Build adjacency lists
  const inDegree: Record<string, number> = {};
  const outEdges: Record<string, string[]> = {};

  nodes.forEach(n => {
    inDegree[n.id] = 0;
    outEdges[n.id] = [];
  });

  relevantEdges.forEach(e => {
    inDegree[e.target] = (inDegree[e.target] || 0) + 1;
    outEdges[e.source] = outEdges[e.source] || [];
    outEdges[e.source].push(e.target);
  });

  // Kahn's algorithm for topological sort with layer assignment
  const layers = new Map<string, number>();
  let queue = nodes.filter(n => inDegree[n.id] === 0).map(n => n.id);
  let layer = 0;

  while (queue.length > 0) {
    const nextQueue: string[] = [];

    queue.forEach(nodeId => {
      layers.set(nodeId, layer);

      (outEdges[nodeId] || []).forEach(targetId => {
        inDegree[targetId]--;
        if (inDegree[targetId] === 0) {
          nextQueue.push(targetId);
        }
      });
    });

    queue = nextQueue;
    layer++;
  }

  // Handle any remaining nodes (cycles or disconnected) - place at end
  nodes.forEach(n => {
    if (!layers.has(n.id)) {
      layers.set(n.id, layer);
    }
  });

  return layers;
}

/**
 * Find connected components in the filtered subgraph
 */
export function findFilteredComponents(
  filteredNodes: { id: string; moduleId: string }[],
  filteredEdges: { source: string; target: string }[]
): string[][] {
  const nodeIds = new Set(filteredNodes.map(n => n.id));
  const visited = new Set<string>();
  const components: string[][] = [];

  // Build undirected adjacency
  const adj: Record<string, string[]> = {};
  filteredNodes.forEach(n => { adj[n.id] = []; });
  filteredEdges.forEach(e => {
    // Initialize adjacency for both endpoints if not already done
    if (!adj[e.source]) adj[e.source] = [];
    if (!adj[e.target]) adj[e.target] = [];

    if (nodeIds.has(e.source) && nodeIds.has(e.target)) {
      adj[e.source].push(e.target);
      adj[e.target].push(e.source);
    }
  });

  function dfs(nodeId: string, component: string[]) {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    component.push(nodeId);
    (adj[nodeId] || []).forEach(neighbor => dfs(neighbor, component));
  }

  filteredNodes.forEach(n => {
    if (!visited.has(n.id)) {
      const component: string[] = [];
      dfs(n.id, component);
      if (component.length > 0) {
        components.push(component);
      }
    }
  });

  return components;
}

/**
 * Find pseudo-nodes that represent hidden modules connecting visible components.
 * Also returns edges that should be excluded (because they should go through the hidden module).
 */
export function findPseudoNodes(
  filteredNodes: MechanisticNode[],
  allEdgesData: typeof allEdges,
  allNodesData: typeof allNodes
): { pseudoNodes: PseudoNode[]; excludedEdges: Set<string> } {
  const visibleNodeIds = new Set(filteredNodes.map(n => n.id));
  const pseudoNodes: PseudoNode[] = [];
  const addedPseudoModules = new Set<string>();
  const excludedEdges = new Set<string>();

  // Find edges that go from visible -> hidden -> visible
  const hiddenNodes = allNodesData.filter(n => !visibleNodeIds.has(n.id));
  const hiddenNodeIds = new Set(hiddenNodes.map(n => n.id));

  // Build full graph adjacency
  const outgoing: Record<string, string[]> = {};
  const incoming: Record<string, string[]> = {};
  allNodesData.forEach(n => {
    outgoing[n.id] = [];
    incoming[n.id] = [];
  });
  allEdgesData.forEach(e => {
    outgoing[e.source]?.push(e.target);
    incoming[e.target]?.push(e.source);
  });

  // For each hidden module, check if it connects two visible nodes
  const hiddenModuleNodes: Record<string, string[]> = {};
  hiddenNodes.forEach(n => {
    if (!hiddenModuleNodes[n.moduleId]) {
      hiddenModuleNodes[n.moduleId] = [];
    }
    hiddenModuleNodes[n.moduleId].push(n.id);
  });

  // Check each hidden module
  Object.entries(hiddenModuleNodes).forEach(([moduleId, nodeIds]) => {
    // Find visible nodes that connect TO this hidden module
    const visibleSourcesInto = new Set<string>();
    // Find visible nodes that this hidden module connects TO
    const visibleTargetsFrom = new Set<string>();

    nodeIds.forEach(hiddenId => {
      // Check incoming edges from visible nodes
      (incoming[hiddenId] || []).forEach(source => {
        if (visibleNodeIds.has(source)) {
          visibleSourcesInto.add(source);
        }
      });
      // Check outgoing edges to visible nodes
      (outgoing[hiddenId] || []).forEach(target => {
        if (visibleNodeIds.has(target)) {
          visibleTargetsFrom.add(target);
        }
      });
    });

    // If this hidden module bridges visible nodes, create a pseudo-node
    if (visibleSourcesInto.size > 0 && visibleTargetsFrom.size > 0) {
      const sourceModules = new Set(
        Array.from(visibleSourcesInto).map(id =>
          filteredNodes.find(n => n.id === id)?.moduleId
        )
      );
      const targetModules = new Set(
        Array.from(visibleTargetsFrom).map(id =>
          filteredNodes.find(n => n.id === id)?.moduleId
        )
      );

      // Only add pseudo-node if it connects different modules
      const connectsDifferentModules =
        ![...sourceModules].every(m => targetModules.has(m)) ||
        ![...targetModules].every(m => sourceModules.has(m));

      if (connectsDifferentModules && !addedPseudoModules.has(moduleId)) {
        addedPseudoModules.add(moduleId);

        const sourceModuleIds = new Set<string>();
        Array.from(visibleSourcesInto).forEach(id => {
          const node = filteredNodes.find(n => n.id === id);
          if (node) sourceModuleIds.add(node.moduleId);
        });

        const targetModuleIds = new Set<string>();
        Array.from(visibleTargetsFrom).forEach(id => {
          const node = filteredNodes.find(n => n.id === id);
          if (node) targetModuleIds.add(node.moduleId);
        });

        // Identify edges to exclude (cross-module edges)
        const edgesToExclude = new Set<string>();
        allEdgesData.forEach(edge => {
          const srcNode = filteredNodes.find(n => n.id === edge.source);
          const tgtNode = filteredNodes.find(n => n.id === edge.target);
          if (srcNode && tgtNode &&
              sourceModuleIds.has(srcNode.moduleId) &&
              targetModuleIds.has(tgtNode.moduleId) &&
              srcNode.moduleId !== tgtNode.moduleId) {
            edgesToExclude.add(edge.id);
          }
        });

        // Find entry points in target modules
        const targetModuleEntryPoints = new Set<string>();
        targetModuleIds.forEach(targetModId => {
          const targetModuleNodes = filteredNodes.filter(n => n.moduleId === targetModId);

          targetModuleNodes.forEach(node => {
            const hasRemainingIncoming = (incoming[node.id] || []).some(srcId => {
              const srcNode = filteredNodes.find(n => n.id === srcId);
              if (!srcNode) return false;
              const edge = allEdgesData.find(e => e.source === srcId && e.target === node.id);
              if (!edge) return false;
              return !edgesToExclude.has(edge.id);
            });

            if (!hasRemainingIncoming) {
              targetModuleEntryPoints.add(node.id);
            }
          });
        });

        pseudoNodes.push({
          id: `__pseudo_${moduleId}`,
          label: moduleId,
          moduleId,
          isPseudo: true,
          connectsFrom: Array.from(visibleSourcesInto),
          connectsTo: Array.from(targetModuleEntryPoints),
        });

        edgesToExclude.forEach(id => excludedEdges.add(id));
      }
    }
  });

  return { pseudoNodes, excludedEdges };
}

/**
 * Greedy layout algorithm that positions nodes based on causal flow.
 * Handles disconnected components by laying them out separately.
 * Also identifies back edges (cycle-completing edges) during BFS.
 */
export function computeGreedyLayout(
  filteredNodes: MechanisticNode[],
  edges: typeof allEdges,
  pseudoNodes: PseudoNode[] = [],
  excludedEdges: Set<string> = new Set()
): LayoutResult {
  const positions = new Map<string, LayoutPosition>();
  const backEdges = new Set<string>();

  if (filteredNodes.length === 0) return { positions, backEdges };

  const nodeIds = new Set(filteredNodes.map(n => n.id));
  const nodeMap = new Map(filteredNodes.map(n => [n.id, n]));

  // Add pseudo-nodes to the node set
  pseudoNodes.forEach(pn => {
    nodeIds.add(pn.id);
  });

  // Build adjacency for filtered subgraph + pseudo nodes
  const outgoing: Record<string, string[]> = {};
  const incoming: Record<string, string[]> = {};

  filteredNodes.forEach(n => {
    outgoing[n.id] = [];
    incoming[n.id] = [];
  });
  pseudoNodes.forEach(pn => {
    outgoing[pn.id] = [];
    incoming[pn.id] = [];
  });

  // Add real edges between visible nodes (excluding edges that should go through pseudo-nodes)
  const filteredEdges = edges.filter(e =>
    nodeIds.has(e.source) && nodeIds.has(e.target) && !excludedEdges.has(e.id)
  );

  // Build a map from source-target pair to edge ID for back-edge detection
  const edgeIdMap = new Map<string, string>();
  filteredEdges.forEach(e => {
    edgeIdMap.set(`${e.source}->${e.target}`, e.id);
  });

  filteredEdges.forEach(e => {
    outgoing[e.source].push(e.target);
    incoming[e.target].push(e.source);
  });

  // Add pseudo-edges for pseudo-nodes
  pseudoNodes.forEach(pn => {
    pn.connectsFrom.forEach(fromId => {
      if (!outgoing[fromId]) outgoing[fromId] = [];
    });
    pn.connectsTo.forEach(toId => {
      if (!incoming[toId]) incoming[toId] = [];
    });

    pn.connectsFrom.forEach(fromId => {
      if (nodeIds.has(fromId)) {
        outgoing[fromId].push(pn.id);
        incoming[pn.id].push(fromId);
      }
    });

    pn.connectsTo.forEach(toId => {
      if (nodeIds.has(toId)) {
        outgoing[pn.id].push(toId);
        incoming[toId].push(pn.id);
      }
    });
  });

  // Build pseudo-edges
  const pseudoEdges = pseudoNodes.flatMap(pn => {
    const edgeList: { source: string; target: string }[] = [];
    pn.connectsFrom.forEach(fromId => {
      if (nodeIds.has(fromId)) {
        edgeList.push({ source: fromId, target: pn.id });
      }
    });
    pn.connectsTo.forEach(toId => {
      if (nodeIds.has(toId)) {
        edgeList.push({ source: pn.id, target: toId });
      }
    });
    return edgeList;
  });

  // Find connected components
  const allNodesList = [...filteredNodes, ...pseudoNodes.map(pn => ({ id: pn.id, moduleId: pn.moduleId } as MechanisticNode))];
  const allEdgesForComponents = [...filteredEdges, ...pseudoEdges];
  const components = findFilteredComponents(allNodesList, allEdgesForComponents);

  // Sort components by size (largest first)
  components.sort((a, b) => b.length - a.length);

  // Layout each component separately
  let globalYOffset = 50;
  const layerWidth = LAYER_WIDTH;
  const nodeHeight = NODE_HEIGHT;
  const componentGap = COMPONENT_GAP;

  components.forEach((component) => {
    const componentNodeIds = new Set(component);

    // Identify input and output boundaries in this component
    const inputBoundaries = component.filter(id => {
      const node = nodeMap.get(id);
      return node?.category === 'BOUNDARY' && node.boundaryDirection === 'input';
    });
    const outputBoundaries = component.filter(id => {
      const node = nodeMap.get(id);
      return node?.category === 'BOUNDARY' && node.boundaryDirection === 'output';
    });

    // Find sources within this component
    let sources = component.filter(id => {
      const incomingInComponent = (incoming[id] || []).filter(p => componentNodeIds.has(p));
      return incomingInComponent.length === 0;
    });

    // Ensure all input boundaries are included as sources
    inputBoundaries.forEach(id => {
      if (!sources.includes(id)) {
        sources.push(id);
      }
    });

    // If no sources (cycle detected), pick ONE node with fewest incoming
    if (sources.length === 0) {
      const incomingCounts = component.map(id => ({
        id,
        count: (incoming[id] || []).filter(p => componentNodeIds.has(p)).length
      }));
      incomingCounts.sort((a, b) => a.count - b.count);
      sources.push(incomingCounts[0].id);
    }

    // Assign layers via BFS with cycle detection
    const layers = new Map<string, number>();
    const queue = [...sources];

    // Input boundaries get exclusive layer 0, other sources get layer 1 (if inputs exist)
    const hasInputBoundaries = inputBoundaries.length > 0;
    sources.forEach(id => {
      if (inputBoundaries.includes(id)) {
        layers.set(id, 0);
      } else {
        layers.set(id, hasInputBoundaries ? 1 : 0);
      }
    });

    const processed = new Set<string>();
    const inQueue = new Set<string>(sources);
    let iterations = 0;
    const maxIterations = component.length * 10;

    while (queue.length > 0 && iterations < maxIterations) {
      iterations++;
      const nodeId = queue.shift()!;
      inQueue.delete(nodeId);

      if (!componentNodeIds.has(nodeId)) continue;
      if (processed.has(nodeId)) continue;

      const preds = (incoming[nodeId] || []).filter(p => componentNodeIds.has(p));
      const processedPreds = preds.filter(p => layers.has(p));
      const unprocessedPreds = preds.filter(p => !layers.has(p));

      const shouldProcess = unprocessedPreds.length === 0 ||
        (iterations > component.length && processedPreds.length > 0);

      if (!shouldProcess) {
        queue.push(nodeId);
        inQueue.add(nodeId);
        continue;
      }

      // Mark edges from unprocessed predecessors as back edges
      unprocessedPreds.forEach(predId => {
        const edgeId = edgeIdMap.get(`${predId}->${nodeId}`);
        if (edgeId) {
          backEdges.add(edgeId);
        }
      });

      const predLayers = processedPreds.map(p => layers.get(p) ?? -1);
      const layer = predLayers.length > 0 ? Math.max(...predLayers) + 1 : 0;
      layers.set(nodeId, layer);
      processed.add(nodeId);

      (outgoing[nodeId] || []).forEach(succ => {
        if (componentNodeIds.has(succ)) {
          if (processed.has(succ)) {
            const edgeId = edgeIdMap.get(`${nodeId}->${succ}`);
            if (edgeId) {
              backEdges.add(edgeId);
            }
          } else if (!inQueue.has(succ)) {
            queue.push(succ);
            inQueue.add(succ);
          }
        }
      });
    }

    // Handle remaining nodes
    const maxLayer = Math.max(...Array.from(layers.values()), 0);

    const pseudoNodeLayers = new Map<string, number>();
    pseudoNodes.forEach(pn => {
      if (layers.has(pn.id)) {
        pseudoNodeLayers.set(pn.moduleId, layers.get(pn.id)!);
      }
    });

    component.forEach(id => {
      if (!layers.has(id)) {
        const node = nodeMap.get(id);
        if (node) {
          let bestPseudoLayer = -1;
          pseudoNodes.forEach(pn => {
            if (pn.connectsTo.some(toId => {
              const toNode = nodeMap.get(toId);
              return toNode && toNode.moduleId === node.moduleId;
            })) {
              const pnLayer = layers.get(pn.id);
              if (pnLayer !== undefined && pnLayer > bestPseudoLayer) {
                bestPseudoLayer = pnLayer;
              }
            }
          });

          if (bestPseudoLayer >= 0) {
            layers.set(id, bestPseudoLayer + 1);
          } else {
            layers.set(id, maxLayer + 1);
          }
        } else {
          layers.set(id, maxLayer + 1);
        }
      }
    });

    // Group by layer
    const layerGroups: Map<number, string[]> = new Map();
    layers.forEach((layer, nodeId) => {
      if (!layerGroups.has(layer)) {
        layerGroups.set(layer, []);
      }
      layerGroups.get(layer)!.push(nodeId);
    });

    // Move output boundaries to rightmost layer
    if (outputBoundaries.length > 0) {
      const currentMaxLayer = Math.max(...Array.from(layers.values()));
      const outputLayer = currentMaxLayer + 1;

      outputBoundaries.forEach(id => {
        const currentLayer = layers.get(id);
        if (currentLayer !== undefined && currentLayer !== outputLayer) {
          const currentGroup = layerGroups.get(currentLayer);
          if (currentGroup) {
            const idx = currentGroup.indexOf(id);
            if (idx >= 0) currentGroup.splice(idx, 1);
          }
          layers.set(id, outputLayer);
          if (!layerGroups.has(outputLayer)) {
            layerGroups.set(outputLayer, []);
          }
          layerGroups.get(outputLayer)!.push(id);
        }
      });
    }

    // Sort within layers by module
    layerGroups.forEach(ids => {
      ids.sort((a, b) => {
        if (a.startsWith('__dummy_')) return 1;
        if (b.startsWith('__dummy_')) return -1;
        const modA = nodeMap.get(a)?.moduleId || pseudoNodes.find(p => p.id === a)?.moduleId || '';
        const modB = nodeMap.get(b)?.moduleId || pseudoNodes.find(p => p.id === b)?.moduleId || '';
        return modA.localeCompare(modB);
      });
    });

    // Calculate positions for this component
    // VERTICAL FLOW: layers become rows (y-based), nodes spread horizontally (x-based)
    const verticalLayerHeight = 90;  // Base vertical spacing between layer rows
    const rowHeightSpacing = 70;     // Vertical gap between rows within same layer
    const nodeWidthSpacing = 190;    // Node width + gap for horizontal spacing
    const maxNodesPerRow = 2;        // Max nodes per row to fit in sidebar width
    const containerWidth = 380;      // Approximate container width

    let maxYInComponent = 0;
    const sortedLayerKeys = Array.from(layerGroups.keys()).sort((a, b) => a - b);
    let currentY = globalYOffset;

    sortedLayerKeys.forEach((layer) => {
      const ids = layerGroups.get(layer) || [];
      const realIds = ids.filter(id => !id.startsWith('__dummy_'));
      const numRows = Math.ceil(realIds.length / maxNodesPerRow);

      realIds.forEach((id, idx) => {
        // Calculate row and column within this layer
        const row = Math.floor(idx / maxNodesPerRow);
        const col = idx % maxNodesPerRow;
        const nodesInThisRow = Math.min(maxNodesPerRow, realIds.length - row * maxNodesPerRow);

        // Center nodes horizontally within the container
        const totalRowWidth = nodesInThisRow * nodeWidthSpacing - 10;
        const startX = Math.max(50, (containerWidth - totalRowWidth) / 2);

        const x = startX + col * nodeWidthSpacing;
        const y = currentY + row * rowHeightSpacing;

        positions.set(id, { x, y });
        maxYInComponent = Math.max(maxYInComponent, y + rowHeightSpacing);
      });

      // Move to next layer, accounting for multi-row layers
      currentY += numRows * rowHeightSpacing + (verticalLayerHeight - rowHeightSpacing);
    });

    globalYOffset = maxYInComponent + componentGap;
  });

  // Post-processing: Identify back edges based on final positions
  // VERTICAL FLOW: A back edge goes from a node with higher Y to a node with lower Y
  backEdges.clear();

  filteredEdges.forEach(e => {
    const sourcePos = positions.get(e.source);
    const targetPos = positions.get(e.target);

    if (sourcePos && targetPos) {
      // If the edge goes backward (target is at same or earlier Y position than source)
      if (targetPos.y <= sourcePos.y) {
        const edgeId = edgeIdMap.get(`${e.source}->${e.target}`);
        if (edgeId) {
          backEdges.add(edgeId);
        }
      }
    }
  });

  return { positions, backEdges };
}
