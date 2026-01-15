'use client';

import { useCallback, useMemo, useState, useEffect, useRef, memo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
  Node,
  Edge,
  MarkerType,
  Position,
  Handle,
  NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { allNodes } from '@/data/mechanisticFramework/nodes';
import { allEdges } from '@/data/mechanisticFramework/edges';
import type { MechanisticNode, BoundaryVariant } from '@/data/mechanisticFramework/types';

// Tri-state for module filtering: 'on' (full), 'partial' (filtered), 'off' (hidden)
type ModuleFilterState = 'on' | 'partial' | 'off';

// Module colors for visual grouping
const moduleColors: Record<string, string> = {
  'BOUNDARY': '#787473',
  'M01': '#486393',  // Insulin/mTOR - blue
  'M02': '#007385',  // Lysosomal - teal
  'M03': '#C9461D',  // Mitochondrial - orange
  'M04': '#E5AF19',  // Inflammasome - yellow
  'M05': '#C3577F',  // Microglial - pink
  'M06': '#60a5fa',  // Amyloid - soft blue
  'M07': '#a78bfa',  // Tau - purple
  'M08': '#34d399',  // Complement - green
  'M09': '#f472b6',  // Iron - pink
  'M10': '#8ecae6',  // APOE - teal
  'M11': '#fbbf24',  // TREM2 - yellow
  'M12': '#94a3b8',  // BBB - slate
  'M13': '#fb923c',  // Cholinergic - orange
  'M14': '#a855f7',  // MAM - violet
  'M15': '#22c55e',  // Interventions - green
  'M16': '#ec4899',  // Sex/Ancestry - pink
  'M17': '#14b8a6',  // Immunomodulatory - teal
};

// Category shapes/styles (SBSF v2.0: Only STOCK, STATE, BOUNDARY)
const categoryStyles: Record<string, { borderStyle: string; borderWidth: number }> = {
  'BOUNDARY': { borderStyle: 'dashed', borderWidth: 2 },
  'STATE': { borderStyle: 'solid', borderWidth: 2 },
  'STOCK': { borderStyle: 'solid', borderWidth: 3 },
};

// Role-based styling for REGULATOR nodes (SBSF v2.0: REGULATOR is now a role, not category)
const roleStyles: Record<string, { borderColor?: string; borderStyle?: string }> = {
  'REGULATOR': { borderColor: '#e36216', borderStyle: 'double' },
  'THERAPEUTIC_TARGET': { borderColor: '#C9461D' },
  'BIOMARKER': { borderColor: '#34d399' },
  'DRUG': { borderColor: '#5a8a6e' },
};

// View mode for boundary variant nodes
type BoundaryViewMode = 'simple' | 'table' | 'graph';

// Effect direction indicator
function EffectIndicator({ direction }: { direction: 'protective' | 'neutral' | 'risk' }) {
  const colors = {
    protective: '#34d399',
    neutral: '#787473',
    risk: '#c75146',
  };
  return (
    <span
      className="inline-block w-2 h-2 rounded-full"
      style={{ backgroundColor: colors[direction] }}
    />
  );
}

// Custom node for boundary nodes with variants
interface BoundaryVariantNodeData extends Record<string, unknown> {
  label: string;
  variants: BoundaryVariant[];
  defaultVariant?: string;
  moduleId: string;
  isPartial?: boolean;
  onVariantSelect?: (variantId: string | null) => void;
  onVariantHover?: (variantId: string | null) => void;
  selectedVariant?: string | null;
  hoveredVariant?: string | null;
  forceGraphView?: boolean; // Force graph view when only boundaries are visible
}

// Helper to interpret risk magnitude
function getRiskLabel(magnitude: number, direction: 'protective' | 'neutral' | 'risk'): string {
  if (direction === 'neutral') return 'No effect';
  if (direction === 'protective') {
    if (magnitude >= 2) return 'Strong protection';
    if (magnitude >= 1.5) return 'Moderate protection';
    return 'Mild protection';
  }
  // risk
  if (magnitude >= 3) return 'High risk';
  if (magnitude >= 2) return 'Moderate risk';
  if (magnitude >= 1.5) return 'Elevated risk';
  return 'Slight risk';
}

const BoundaryVariantNode = memo(({ data }: NodeProps<Node<BoundaryVariantNodeData>>) => {
  const [localViewMode, setLocalViewMode] = useState<BoundaryViewMode>('simple');
  const variants = data.variants || [];
  const activeVariantId = data.selectedVariant || data.hoveredVariant;

  // Use forced graph view if set, otherwise use local state
  const viewMode = data.forceGraphView ? 'graph' : localViewMode;

  // Calculate max magnitude for graph scaling (use 1.0 as baseline)
  const maxMagnitude = Math.max(...variants.map(v => v.effectMagnitude || 1), 1);

  // Get node dimensions based on view mode
  const getWidth = () => {
    switch (viewMode) {
      case 'table': return 200; // Narrower table
      case 'graph': return 240; // Slightly wider for labels
      default: return 180;
    }
  };

  return (
    <div
      className="bg-white border-2 border-dashed transition-all"
      style={{
        borderColor: moduleColors[data.moduleId] || '#787473',
        width: getWidth(),
        opacity: data.isPartial ? 0.5 : 1,
        padding: viewMode === 'simple' ? '8px 12px' : '10px',
        borderRadius: viewMode === 'simple' ? '4px' : '8px', // BOUNDARY = box shape
      }}
    >
      <Handle type="target" position={Position.Left} className="!bg-[var(--border)]" />
      <Handle type="source" position={Position.Right} className="!bg-[var(--border)]" />

      {/* Header with label and view toggle */}
      <div className="flex items-center justify-between gap-1 mb-1">
        <span className="text-[11px] font-medium text-[var(--text-primary)] truncate">
          {data.label}
        </span>
        {variants.length > 0 && !data.forceGraphView && (
          <div className="flex gap-0.5">
            {(['simple', 'table', 'graph'] as const).map(mode => (
              <button
                key={mode}
                onClick={(e) => { e.stopPropagation(); setLocalViewMode(mode); }}
                className={`px-1 py-0.5 text-[8px] rounded transition-colors ${
                  viewMode === mode
                    ? 'bg-[var(--accent-orange)] text-white'
                    : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:bg-[var(--border)]'
                }`}
              >
                {mode === 'simple' ? '•' : mode === 'table' ? '≡' : '▮'}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Simple view: just variant names */}
      {viewMode === 'simple' && variants.length > 0 && (
        <div className="text-[9px] text-[var(--text-muted)] leading-tight">
          {variants.map((v, i) => (
            <span
              key={v.id}
              className={`cursor-pointer hover:text-[var(--text-primary)] ${
                activeVariantId === v.id ? 'text-[var(--accent-orange)] font-medium' : ''
              }`}
              onMouseEnter={() => data.onVariantHover?.(v.id)}
              onMouseLeave={() => data.onVariantHover?.(null)}
              onClick={(e) => { e.stopPropagation(); data.onVariantSelect?.(activeVariantId === v.id ? null : v.id); }}
            >
              <EffectIndicator direction={v.effectDirection} />
              {' '}{v.label}{i < variants.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>
      )}

      {/* Table view - compact with risk interpretation */}
      {viewMode === 'table' && variants.length > 0 && (
        <div className="mt-1 space-y-1">
          {variants.map(v => (
            <div
              key={v.id}
              className={`cursor-pointer p-1 rounded text-[9px] ${
                activeVariantId === v.id ? 'bg-[var(--accent-orange-light)]' : 'hover:bg-[var(--bg-secondary)]'
              }`}
              onMouseEnter={() => data.onVariantHover?.(v.id)}
              onMouseLeave={() => data.onVariantHover?.(null)}
              onClick={(e) => { e.stopPropagation(); data.onVariantSelect?.(activeVariantId === v.id ? null : v.id); }}
            >
              <div className="flex items-center gap-1">
                <EffectIndicator direction={v.effectDirection} />
                <span className={activeVariantId === v.id ? 'font-medium' : ''}>{v.label}</span>
                {v.frequency && (
                  <span className="text-[var(--text-muted)] ml-auto">{(v.frequency * 100).toFixed(0)}%</span>
                )}
              </div>
              <div className="text-[8px] mt-0.5" style={{ color: v.color }}>
                {getRiskLabel(v.effectMagnitude || 1, v.effectDirection)} ({v.effectMagnitude?.toFixed(1)}x)
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Graph view (horizontal bars with risk labels) */}
      {viewMode === 'graph' && variants.length > 0 && (
        <div className="mt-1 space-y-1.5">
          {variants.map(v => {
            const barWidth = ((v.effectMagnitude || 1) / maxMagnitude) * 100;
            const riskLabel = getRiskLabel(v.effectMagnitude || 1, v.effectDirection);
            return (
              <div
                key={v.id}
                className={`cursor-pointer ${
                  activeVariantId === v.id ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
                onMouseEnter={() => data.onVariantHover?.(v.id)}
                onMouseLeave={() => data.onVariantHover?.(null)}
                onClick={(e) => { e.stopPropagation(); data.onVariantSelect?.(activeVariantId === v.id ? null : v.id); }}
              >
                <div className="flex items-center justify-between text-[8px] mb-0.5">
                  <div className="flex items-center gap-1">
                    <EffectIndicator direction={v.effectDirection} />
                    <span className={activeVariantId === v.id ? 'font-medium text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}>
                      {v.label}
                    </span>
                  </div>
                  <span className="text-[7px]" style={{ color: v.color }}>
                    {riskLabel}
                  </span>
                </div>
                <div className="h-3 bg-[var(--bg-secondary)] rounded overflow-hidden relative">
                  <div
                    className="h-full rounded transition-all"
                    style={{
                      width: `${barWidth}%`,
                      backgroundColor: v.color,
                      opacity: activeVariantId === v.id ? 1 : 0.7,
                    }}
                  />
                  {/* Baseline marker at 1.0x */}
                  <div
                    className="absolute top-0 bottom-0 w-px bg-[var(--text-muted)]"
                    style={{ left: `${(1 / maxMagnitude) * 100}%`, opacity: 0.5 }}
                  />
                </div>
              </div>
            );
          })}
          {/* Legend */}
          <div className="text-[7px] text-[var(--text-muted)] flex items-center gap-2 pt-1 border-t border-[var(--border)]">
            <span className="flex items-center gap-0.5"><EffectIndicator direction="protective" /> Protective</span>
            <span className="flex items-center gap-0.5"><EffectIndicator direction="risk" /> Risk</span>
            <span className="ml-auto">| = baseline</span>
          </div>
        </div>
      )}
    </div>
  );
});

BoundaryVariantNode.displayName = 'BoundaryVariantNode';

// Node types for React Flow
const nodeTypes = {
  boundaryVariant: BoundaryVariantNode,
};

// Compute topological layers for DAG layout (left-to-right)
function computeDAGLayers(
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

// Variant callback type for passing into convertNodes
interface VariantCallbacks {
  onVariantSelect: (variantId: string | null) => void;
  onVariantHover: (variantId: string | null) => void;
  selectedVariant: string | null;
  hoveredVariant: string | null;
}

// =============================================================================
// GREEDY DYNAMIC LAYOUT ALGORITHM
// =============================================================================

interface LayoutPosition {
  x: number;
  y: number;
}

interface PseudoNode {
  id: string;
  label: string;
  moduleId: string;
  isPseudo: true;
  connectsFrom: string[];  // node IDs in visible set that connect TO this hidden module
  connectsTo: string[];    // node IDs in visible set that this hidden module connects TO
}

/**
 * Find connected components in the filtered subgraph
 */
function findFilteredComponents(
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
function findPseudoNodes(
  filteredNodes: MechanisticNode[],
  allEdgesData: typeof allEdges,
  allNodesData: typeof allNodes
): { pseudoNodes: PseudoNode[]; excludedEdges: Set<string> } {
  const visibleNodeIds = new Set(filteredNodes.map(n => n.id));
  const visibleModuleIds = new Set(filteredNodes.map(n => n.moduleId));
  const pseudoNodes: PseudoNode[] = [];
  const addedPseudoModules = new Set<string>();
  const excludedEdges = new Set<string>();

  // Find edges that go from visible -> hidden -> visible
  // These represent paths through hidden modules
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
      // Check if the sources and targets are in different components or modules
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

        // Find the source and target modules
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

        // First, identify all edges that will be excluded (cross-module edges)
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

        // Now find nodes in target modules that will have NO incoming edges
        // after we exclude the cross-module edges
        // These are the nodes we need to connect from the pseudo-node
        const targetModuleEntryPoints = new Set<string>();
        targetModuleIds.forEach(targetModId => {
          const targetModuleNodes = filteredNodes.filter(n => n.moduleId === targetModId);

          targetModuleNodes.forEach(node => {
            // Check if this node will have any incoming edges after exclusion
            const hasRemainingIncoming = (incoming[node.id] || []).some(srcId => {
              // Check if the edge from srcId -> node.id will remain
              const srcNode = filteredNodes.find(n => n.id === srcId);
              if (!srcNode) return false; // Source not visible

              // Find the edge
              const edge = allEdgesData.find(e => e.source === srcId && e.target === node.id);
              if (!edge) return false;

              // Edge remains if it's not excluded
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
          connectsTo: Array.from(targetModuleEntryPoints), // Connect to all entry points
        });

        // Add the excluded edges
        edgesToExclude.forEach(id => excludedEdges.add(id));
      }
    }
  });

  return { pseudoNodes, excludedEdges };
}

/**
 * Greedy layout algorithm that positions nodes based on causal flow.
 * Handles disconnected components by laying them out separately.
 */
function computeGreedyLayout(
  filteredNodes: MechanisticNode[],
  edges: typeof allEdges,
  pseudoNodes: PseudoNode[] = [],
  excludedEdges: Set<string> = new Set()
): Map<string, LayoutPosition> {
  const positions = new Map<string, LayoutPosition>();

  if (filteredNodes.length === 0) return positions;

  const nodeIds = new Set(filteredNodes.map(n => n.id));
  const nodeMap = new Map(filteredNodes.map(n => [n.id, n]));

  // Add pseudo-nodes to the node set
  pseudoNodes.forEach(pn => {
    nodeIds.add(pn.id);
  });

  // Build adjacency for filtered subgraph + pseudo-nodes
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

  filteredEdges.forEach(e => {
    outgoing[e.source].push(e.target);
    incoming[e.target].push(e.source);
  });

  // Add pseudo-edges for pseudo-nodes
  pseudoNodes.forEach(pn => {
    // Ensure adjacency arrays exist for pseudo-node connections
    pn.connectsFrom.forEach(fromId => {
      if (!outgoing[fromId]) outgoing[fromId] = [];
    });
    pn.connectsTo.forEach(toId => {
      if (!incoming[toId]) incoming[toId] = [];
    });

    // Add edges FROM source nodes TO pseudo-node
    pn.connectsFrom.forEach(fromId => {
      if (nodeIds.has(fromId)) {
        outgoing[fromId].push(pn.id);
        incoming[pn.id].push(fromId);
      }
    });

    // Add edges FROM pseudo-node TO target nodes
    pn.connectsTo.forEach(toId => {
      if (nodeIds.has(toId)) {
        outgoing[pn.id].push(toId);
        incoming[toId].push(pn.id);
      }
    });
  });

  // Build pseudo-edges
  const pseudoEdges = pseudoNodes.flatMap(pn => {
    const edges: { source: string; target: string }[] = [];
    // Edges from source nodes to pseudo-node
    pn.connectsFrom.forEach(fromId => {
      if (nodeIds.has(fromId)) {
        edges.push({ source: fromId, target: pn.id });
      }
    });
    // Edges from pseudo-node to target nodes
    pn.connectsTo.forEach(toId => {
      if (nodeIds.has(toId)) {
        edges.push({ source: pn.id, target: toId });
      }
    });
    return edges;
  });

  // Find connected components (include pseudo-nodes and pseudo-edges)
  const allNodesList = [...filteredNodes, ...pseudoNodes.map(pn => ({ id: pn.id, moduleId: pn.moduleId } as MechanisticNode))];
  const allEdgesForComponents = [...filteredEdges, ...pseudoEdges];
  const components = findFilteredComponents(allNodesList, allEdgesForComponents);

  // DEBUG: When both M01 and M03 are enabled
  const hasM01 = filteredNodes.some(n => n.moduleId === 'M01');
  const hasM03 = filteredNodes.some(n => n.moduleId === 'M03');
  if (hasM01 && hasM03) {
    console.log('=== DEBUG M01+M03 ===');
    console.log('excludedEdges:', Array.from(excludedEdges));
    console.log('M03 edges in filteredEdges:', filteredEdges.filter(e => e.id.startsWith('E03')).map(e => `${e.id}: ${e.source}->${e.target}`));
    console.log('All M03 edges in data:', edges.filter(e => e.id.startsWith('E03')).map(e => `${e.id}: ${e.source}->${e.target} (excluded: ${excludedEdges.has(e.id)})`));
  }

  // Sort components by size (largest first)
  components.sort((a, b) => b.length - a.length);

  // Layout each component separately
  let globalYOffset = 50;
  const layerWidth = 250;
  const nodeHeight = 80;
  const componentGap = 100;

  components.forEach((component, compIdx) => {
    const componentNodeIds = new Set(component);

    // DEBUG: Check M03 nodes in this component
    const hasM03 = component.some(id => id.includes('mito') || id.includes('mtDNA'));
    if (hasM03) {
      console.log(`=== LAYER DEBUG Component ${compIdx} ===`);
      console.log('Component nodes:', component);
    }

    // Find sources within this component
    const sources = component.filter(id => {
      const incomingInComponent = (incoming[id] || []).filter(p => componentNodeIds.has(p));
      const isSource = incomingInComponent.length === 0;
      if (hasM03) {
        // Log ALL M03 nodes to see why they're being marked as sources
        const node = nodeMap.get(id);
        if (node?.moduleId === 'M03' || id.includes('pseudo')) {
          console.log(`Node ${id}: incoming=${JSON.stringify(incoming[id])}, incomingInComponent=${JSON.stringify(incomingInComponent)}, isSource=${isSource}`);
        }
      }
      return isSource;
    });

    // DEBUG: Log sources right after filter
    if (hasM03) {
      console.log('Sources IMMEDIATELY after filter:', sources.slice());
    }

    // If no sources (cycle detected), pick ONE node with fewest incoming as the starting point
    if (sources.length === 0) {
      const incomingCounts = component.map(id => ({
        id,
        count: (incoming[id] || []).filter(p => componentNodeIds.has(p)).length
      }));
      incomingCounts.sort((a, b) => a.count - b.count);
      // Only pick the FIRST node with minimum incoming, not all of them
      sources.push(incomingCounts[0].id);
      if (hasM03) {
        console.log('Cycle detected - picking single source:', sources[0], 'with', incomingCounts[0].count, 'incoming');
      }
    }

    // Assign layers via BFS
    const layers = new Map<string, number>();
    const queue = [...sources];
    sources.forEach(id => layers.set(id, 0));

    const processed = new Set<string>();
    let iterations = 0;
    const maxIterations = component.length * 10;

    while (queue.length > 0 && iterations < maxIterations) {
      iterations++;
      const nodeId = queue.shift()!;

      if (!componentNodeIds.has(nodeId)) continue;
      if (processed.has(nodeId)) continue;

      const preds = (incoming[nodeId] || []).filter(p => componentNodeIds.has(p));
      const allPredsProcessed = preds.every(p => layers.has(p));

      // DEBUG: Trace mtDNA_oxidized processing
      if (hasM03 && nodeId === 'mtDNA_oxidized') {
        console.log(`BFS processing mtDNA_oxidized:`);
        console.log(`  preds: ${JSON.stringify(preds)}`);
        console.log(`  allPredsProcessed: ${allPredsProcessed}`);
        console.log(`  preds layers: ${preds.map(p => `${p}=${layers.get(p)}`).join(', ')}`);
      }

      if (!allPredsProcessed && preds.length > 0) {
        if (hasM03 && nodeId === 'mtDNA_oxidized') {
          console.log(`  -> Re-queuing because not all preds processed`);
        }
        queue.push(nodeId);
        continue;
      }

      const predLayers = preds.map(p => layers.get(p) ?? -1);
      const layer = predLayers.length > 0 ? Math.max(...predLayers) + 1 : 0;
      layers.set(nodeId, layer);
      processed.add(nodeId);

      if (hasM03 && (nodeId === 'mito_ROS' || nodeId === 'mtDNA_oxidized')) {
        console.log(`BFS assigned ${nodeId} to layer ${layer} (predLayers: ${JSON.stringify(predLayers)})`);
      }

      (outgoing[nodeId] || []).forEach(succ => {
        if (componentNodeIds.has(succ) && !processed.has(succ)) {
          if (hasM03 && succ === 'mtDNA_oxidized') {
            console.log(`BFS: Adding mtDNA_oxidized to queue from ${nodeId}`);
          }
          queue.push(succ);
        }
      });
    }

    // Handle remaining nodes - place them based on their module's pseudo-node layer
    const maxLayer = Math.max(...Array.from(layers.values()), 0);

    // Find pseudo-node layers for reference
    const pseudoNodeLayers = new Map<string, number>();
    pseudoNodes.forEach(pn => {
      if (layers.has(pn.id)) {
        pseudoNodeLayers.set(pn.moduleId, layers.get(pn.id)!);
      }
    });

    // For unprocessed nodes, find the module they belong to and place them after relevant pseudo-node
    component.forEach(id => {
      if (!layers.has(id)) {
        const node = nodeMap.get(id);
        if (node) {
          // Check if there's a pseudo-node for a hidden module that connects to this node's module
          // Find the pseudo-node that connects TO this module
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
            // Place after the pseudo-node
            layers.set(id, bestPseudoLayer + 1);
          } else {
            layers.set(id, maxLayer + 1);
          }
        } else {
          layers.set(id, maxLayer + 1);
        }
      }
    });

    // Now do a second BFS pass for nodes that were placed after pseudo-nodes
    // to properly order them relative to each other
    const unprocessedInDownstream = component.filter(id =>
      !processed.has(id) && layers.has(id) && layers.get(id)! > 0
    );

    if (unprocessedInDownstream.length > 0) {
      // Re-run BFS just for these nodes to get proper relative ordering
      const downstreamQueue = [...unprocessedInDownstream];
      let downstreamIter = 0;
      const maxDownstreamIter = unprocessedInDownstream.length * 10;

      while (downstreamQueue.length > 0 && downstreamIter < maxDownstreamIter) {
        downstreamIter++;
        const nodeId = downstreamQueue.shift()!;
        if (processed.has(nodeId)) continue;

        const preds = (incoming[nodeId] || []).filter(p => componentNodeIds.has(p));
        const predsWithLayers = preds.filter(p => layers.has(p));

        if (predsWithLayers.length > 0) {
          const predLayers = predsWithLayers.map(p => layers.get(p)!);
          const newLayer = Math.max(...predLayers) + 1;
          if (newLayer > layers.get(nodeId)!) {
            layers.set(nodeId, newLayer);
          }
        }

        processed.add(nodeId);

        // Add successors to queue
        (outgoing[nodeId] || []).forEach(succ => {
          if (componentNodeIds.has(succ) && !processed.has(succ) && unprocessedInDownstream.includes(succ)) {
            downstreamQueue.push(succ);
          }
        });
      }
    }

    // DEBUG: Log layer assignments for M03 nodes
    if (hasM03) {
      console.log('Sources identified:', sources);
      console.log('Layer assignments:');
      layers.forEach((layer, nodeId) => {
        if (nodeId.includes('mito') || nodeId.includes('mtDNA') || nodeId.includes('pseudo') || nodeId.includes('insulin') || nodeId.includes('mTOR')) {
          console.log(`  ${nodeId} -> layer ${layer}`);
        }
      });
    }

    // Group by layer
    const layerGroups: Map<number, string[]> = new Map();
    layers.forEach((layer, nodeId) => {
      if (!layerGroups.has(layer)) {
        layerGroups.set(layer, []);
      }
      layerGroups.get(layer)!.push(nodeId);
    });

    // Sort within layers by module
    layerGroups.forEach(ids => {
      ids.sort((a, b) => {
        const modA = nodeMap.get(a)?.moduleId || pseudoNodes.find(p => p.id === a)?.moduleId || '';
        const modB = nodeMap.get(b)?.moduleId || pseudoNodes.find(p => p.id === b)?.moduleId || '';
        return modA.localeCompare(modB);
      });
    });

    // Barycenter minimization (3 passes)
    const nodePositionInLayer = new Map<string, number>();
    layerGroups.forEach(ids => {
      ids.forEach((id, idx) => nodePositionInLayer.set(id, idx));
    });

    const sortedLayers = Array.from(layerGroups.keys()).sort((a, b) => a - b);

    for (let iter = 0; iter < 3; iter++) {
      // Forward
      for (let i = 1; i < sortedLayers.length; i++) {
        const layer = sortedLayers[i];
        const ids = layerGroups.get(layer)!;
        const bary = new Map<string, number>();

        ids.forEach(id => {
          const preds = (incoming[id] || []).filter(p => layers.get(p) === sortedLayers[i - 1]);
          if (preds.length > 0) {
            bary.set(id, preds.reduce((s, p) => s + (nodePositionInLayer.get(p) ?? 0), 0) / preds.length);
          } else {
            bary.set(id, nodePositionInLayer.get(id) ?? 0);
          }
        });

        ids.sort((a, b) => (bary.get(a) ?? 0) - (bary.get(b) ?? 0));
        ids.forEach((id, idx) => nodePositionInLayer.set(id, idx));
      }

      // Backward
      for (let i = sortedLayers.length - 2; i >= 0; i--) {
        const layer = sortedLayers[i];
        const ids = layerGroups.get(layer)!;
        const bary = new Map<string, number>();

        ids.forEach(id => {
          const succs = (outgoing[id] || []).filter(s => layers.get(s) === sortedLayers[i + 1]);
          if (succs.length > 0) {
            bary.set(id, succs.reduce((s, t) => s + (nodePositionInLayer.get(t) ?? 0), 0) / succs.length);
          } else {
            bary.set(id, nodePositionInLayer.get(id) ?? 0);
          }
        });

        ids.sort((a, b) => (bary.get(a) ?? 0) - (bary.get(b) ?? 0));
        ids.forEach((id, idx) => nodePositionInLayer.set(id, idx));
      }
    }

    // Calculate positions for this component
    let maxYInComponent = 0;
    layerGroups.forEach((ids, layer) => {
      ids.forEach((id, idx) => {
        const y = globalYOffset + idx * nodeHeight;
        positions.set(id, {
          x: layer * layerWidth + 50,
          y,
        });
        maxYInComponent = Math.max(maxYInComponent, y + nodeHeight);
      });
    });

    globalYOffset = maxYInComponent + componentGap;
  });

  return positions;
}

// Module labels for pseudo-nodes
const moduleLabels: Record<string, string> = {
  'BOUNDARY': 'Boundary',
  'M01': 'Insulin/mTOR',
  'M02': 'Lysosomal',
  'M03': 'Mitochondrial',
  'M04': 'Inflammasome',
  'M05': 'Microglial',
  'M06': 'Amyloid',
  'M07': 'Tau',
  'M08': 'Complement',
  'M09': 'Iron',
  'M10': 'APOE',
  'M11': 'TREM2',
  'M12': 'BBB/Glymphatic',
  'M13': 'Cholinergic',
  'M14': 'MAM/Calcium',
  'M15': 'Interventions',
  'M16': 'Sex/Ancestry',
  'M17': 'Immunomodulatory',
};

// Convert mechanistic nodes to React Flow nodes with dynamic layout
function convertNodes(
  nodes: MechanisticNode[],
  moduleFilters: Record<string, ModuleFilterState>,
  variantCallbacks?: VariantCallbacks
): { flowNodes: Node[]; pseudoNodes: PseudoNode[]; excludedEdges: Set<string> } {
  // Filter nodes based on module filter state (only include 'on' or 'partial' modules)
  const filteredNodes = nodes.filter(n => {
    const state = moduleFilters[n.moduleId];
    return state === 'on' || state === 'partial';
  });

  // Check if only boundaries are visible (auto-expand to graph view)
  const activeModules = new Set(filteredNodes.map(n => n.moduleId));
  const onlyBoundariesVisible = activeModules.size === 1 && activeModules.has('BOUNDARY');

  const flowNodes: Node[] = [];

  // Find pseudo-nodes for hidden connecting modules
  const { pseudoNodes, excludedEdges } = findPseudoNodes(filteredNodes, allEdges, nodes);

  // Compute dynamic layout for filtered nodes + pseudo nodes
  const dynamicPositions = computeGreedyLayout(filteredNodes, allEdges, pseudoNodes, excludedEdges);

  // Add pseudo-nodes to flow
  pseudoNodes.forEach(pn => {
    const pos = dynamicPositions.get(pn.id);
    const color = moduleColors[pn.moduleId] || '#787473';

    flowNodes.push({
      id: pn.id,
      position: { x: pos?.x ?? 50, y: pos?.y ?? 50 },
      data: {
        label: `via ${moduleLabels[pn.moduleId] || pn.moduleId}`,
        moduleId: pn.moduleId,
        isPseudo: true,
      },
      style: {
        background: '#f5f3f0',
        border: `2px dashed ${color}`,
        borderRadius: '16px',
        padding: '4px 10px',
        fontSize: '10px',
        fontWeight: 500,
        fontStyle: 'italic',
        color: '#7a7a7a',
        width: 120,
        textAlign: 'center' as const,
        opacity: 0.8,
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    });
  });

  filteredNodes.forEach((node) => {
    // Use dynamically computed position
    const pos = dynamicPositions.get(node.id);
    const x = pos?.x ?? 50;
    const y = pos?.y ?? 50;
    const color = moduleColors[node.moduleId] || '#787473';
    const catStyle = categoryStyles[node.category] || categoryStyles['STATE'];
    const isPartial = moduleFilters[node.moduleId] === 'partial';

    // SBSF v2.0: Apply role-based styling if node has roles
    let borderColor = color;
    let borderStyle = catStyle.borderStyle;
    if (node.roles) {
      // Check for role-specific styling (priority: REGULATOR > THERAPEUTIC_TARGET > BIOMARKER > DRUG)
      for (const role of ['REGULATOR', 'THERAPEUTIC_TARGET', 'BIOMARKER', 'DRUG'] as const) {
        if (node.roles.includes(role) && roleStyles[role]) {
          if (roleStyles[role].borderColor) borderColor = roleStyles[role].borderColor!;
          if (roleStyles[role].borderStyle) borderStyle = roleStyles[role].borderStyle!;
          break;
        }
      }
    }

    // Check if this is a boundary node with variants
    const hasVariants = node.category === 'BOUNDARY' && node.variants && node.variants.length > 0;

    // Use custom node type for boundary nodes with variants
    if (hasVariants) {
      flowNodes.push({
        id: node.id,
        type: 'boundaryVariant',
        position: { x, y },
        data: {
          label: node.label,
          variants: node.variants,
          defaultVariant: node.defaultVariant,
          moduleId: node.moduleId,
          isPartial,
          forceGraphView: onlyBoundariesVisible, // Auto-expand when only boundaries visible
          // Pass variant callbacks if provided
          onVariantSelect: variantCallbacks?.onVariantSelect,
          onVariantHover: variantCallbacks?.onVariantHover,
          selectedVariant: variantCallbacks?.selectedVariant,
          hoveredVariant: variantCallbacks?.hoveredVariant,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      });
    } else {
      // Standard node
      flowNodes.push({
        id: node.id,
        position: { x, y },
        data: {
          label: node.label,
          description: node.description,
          mechanism: node.mechanism,
          moduleId: node.moduleId,
          category: node.category,
          subtype: node.subtype,
          roles: node.roles,
          // Boundary variant data (for non-variant boundaries)
          variants: node.variants,
          defaultVariant: node.defaultVariant,
          hasVariants,
        },
        style: {
          background: '#ffffff',
          border: `${catStyle.borderWidth}px ${borderStyle} ${borderColor}`,
          // SBSF v2.0 shapes: STOCK = circle, BOUNDARY = box, STATE = rounded box
          borderRadius: node.category === 'STOCK' ? '50%' : node.category === 'BOUNDARY' ? '4px' : '8px',
          padding: '8px 12px',
          fontSize: '11px',
          fontWeight: 500,
          color: '#2d2d2d',
          width: 180,
          textAlign: 'center' as const,
          opacity: isPartial ? 0.5 : 1,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      });
    }
  });

  return { flowNodes, pseudoNodes, excludedEdges };
}

// Get variant data for a boundary node
function getVariantData(sourceNodeId: string, variantId: string | null): BoundaryVariant | undefined {
  if (!variantId) return undefined;
  const sourceNode = allNodes.find(n => n.id === sourceNodeId);
  if (!sourceNode?.variants) return undefined;
  return sourceNode.variants.find(v => v.id === variantId);
}

// Convert mechanistic edges to React Flow edges
function convertEdges(
  edges: typeof allEdges,
  moduleFilters: Record<string, ModuleFilterState>,
  activeVariantNodeId: string | null,
  activeVariant: BoundaryVariant | null,
  pseudoNodes: PseudoNode[] = [],
  excludedEdges: Set<string> = new Set()
): Edge[] {
  // Filter edges based on module filter state (excluding edges that should go through pseudo-nodes)
  const filteredEdges = edges.filter(e => {
    const state = moduleFilters[e.moduleId];
    return (state === 'on' || state === 'partial') && !excludedEdges.has(e.id);
  });

  const flowEdges: Edge[] = [];

  // Add pseudo-edges for pseudo-nodes
  pseudoNodes.forEach(pn => {
    const color = moduleColors[pn.moduleId] || '#787473';

    // Edges from source nodes to pseudo-node
    pn.connectsFrom.forEach((fromId, idx) => {
      flowEdges.push({
        id: `${pn.id}_in_${idx}`,
        source: fromId,
        target: pn.id,
        animated: false,
        style: {
          stroke: color,
          strokeWidth: 1,
          strokeDasharray: '5,5',
          cursor: 'pointer',
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color,
        },
      });
    });

    // Edges from pseudo-node to target nodes
    pn.connectsTo.forEach((toId, idx) => {
      flowEdges.push({
        id: `${pn.id}_out_${idx}`,
        source: pn.id,
        target: toId,
        animated: false,
        style: {
          stroke: color,
          strokeWidth: 1,
          strokeDasharray: '5,5',
          cursor: 'pointer',
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color,
        },
      });
    });
  });

  filteredEdges.forEach(edge => {
    // Check if this edge originates from a boundary node with an active variant
    const isVariantEdge = !!(activeVariantNodeId && edge.source === activeVariantNodeId && activeVariant);

    // Determine edge color based on variant effect
    let strokeColor = edge.relation.includes('Decrease') ? '#c75146' : '#007385';
    let strokeWidth = edge.causalConfidence?.startsWith('L')
      ? Math.max(1, 8 - parseInt(edge.causalConfidence.slice(1)))
      : 1;

    if (isVariantEdge && activeVariant) {
      // Color based on effect direction
      strokeColor = activeVariant.effectDirection === 'protective'
        ? '#34d399' // Green for protective
        : activeVariant.effectDirection === 'risk'
        ? '#c75146' // Red for risk
        : '#787473'; // Gray for neutral

      // Width based on effect magnitude
      strokeWidth = Math.max(2, Math.min(6, (activeVariant.effectMagnitude || 1) * 1.5));
    }

    flowEdges.push({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      animated: isVariantEdge || edge.relation === 'directlyIncreases' || edge.relation === 'directlyDecreases',
      style: {
        stroke: strokeColor,
        strokeWidth,
        cursor: 'pointer',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: strokeColor,
      },
      label: isVariantEdge && activeVariant
        ? `${activeVariant.label} (${activeVariant.effectMagnitude}x)`
        : edge.mechanismLabel?.slice(0, 20),
      labelStyle: {
        fontSize: isVariantEdge ? 10 : 9,
        fill: isVariantEdge ? strokeColor : '#7a7a7a',
        fontWeight: isVariantEdge ? 600 : 400,
        cursor: 'pointer',
      },
      // Store full edge data for tooltip
      data: {
        mechanismLabel: edge.mechanismLabel,
        mechanismDescription: edge.mechanismDescription,
        relation: edge.relation,
        edgeType: edge.edgeType,
        causalConfidence: edge.causalConfidence,
        evidence: edge.evidence,
        keyInsight: edge.keyInsight,
        therapeuticImplication: edge.therapeuticImplication,
        translationalGap: edge.translationalGap,
        // Add variant info if applicable
        activeVariant: isVariantEdge ? activeVariant : undefined,
      },
    });
  });

  return flowEdges;
}

// Get unique modules for filter
function getModules(nodes: MechanisticNode[]): { id: string; label: string; count: number }[] {
  const moduleMap: Record<string, number> = {};
  nodes.forEach(node => {
    moduleMap[node.moduleId] = (moduleMap[node.moduleId] || 0) + 1;
  });

  const moduleLabels: Record<string, string> = {
    'BOUNDARY': 'Boundaries',
    'M01': 'Insulin/mTOR',
    'M02': 'Lysosomal',
    'M03': 'Mitochondrial',
    'M04': 'Inflammasome',
    'M05': 'Microglial',
    'M06': 'Amyloid',
    'M07': 'Tau',
    'M08': 'Complement',
    'M09': 'Iron',
    'M10': 'APOE',
    'M11': 'TREM2',
    'M12': 'BBB/Glymphatic',
    'M13': 'Cholinergic',
    'M14': 'MAM/Calcium',
    'M15': 'Interventions',
    'M16': 'Sex/Ancestry',
    'M17': 'Immunomodulatory',
  };

  return Object.entries(moduleMap)
    .map(([id, count]) => ({
      id,
      label: moduleLabels[id] || id,
      count,
    }))
    .sort((a, b) => {
      if (a.id === 'BOUNDARY') return -1;
      if (b.id === 'BOUNDARY') return 1;
      return a.id.localeCompare(b.id);
    });
}

interface MechanisticNetworkGraphProps {
  height?: string;
  showControls?: boolean;
  showMiniMap?: boolean;
}

// Initialize module filter state - start with M01 on, others off
function getInitialModuleFilters(modules: { id: string }[]): Record<string, ModuleFilterState> {
  const filters: Record<string, ModuleFilterState> = {};
  modules.forEach(m => {
    filters[m.id] = m.id === 'M01' ? 'on' : 'off';
  });
  return filters;
}

// Module checkbox component (simple on/off toggle)
function ModuleCheckbox({
  state,
  onChange,
  color,
  label,
  count,
  disabled,
}: {
  state: ModuleFilterState;
  onChange: () => void;
  color: string;
  label: string;
  count: number;
  disabled?: boolean;
}) {
  // In focus mode, 'partial' means this module is shown but dimmed (connected to focused node)
  const isOn = state === 'on';
  const isPartial = state === 'partial';

  return (
    <label
      className={`flex items-center gap-1.5 cursor-pointer group ${disabled ? 'pointer-events-none' : ''}`}
      style={{ opacity: state === 'off' ? 0.5 : isPartial ? 0.7 : 1 }}
    >
      <div className="relative">
        <input
          type="checkbox"
          checked={isOn || isPartial}
          onChange={onChange}
          disabled={disabled}
          className="peer sr-only"
        />
        <div
          className={`w-4 h-4 border-2 rounded transition-all ${
            isOn || isPartial
              ? 'border-transparent'
              : 'border-[var(--border)] group-hover:border-[var(--accent-orange)]'
          }`}
          style={{
            backgroundColor: isOn || isPartial ? color : 'white',
            opacity: isPartial ? 0.6 : 1,
          }}
        >
          {isOn && (
            <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {isPartial && (
            <div className="w-2 h-0.5 bg-white absolute top-1.5 left-1" />
          )}
        </div>
      </div>
      <span className="text-[11px] text-[var(--text-body)] group-hover:text-[var(--text-primary)]">
        {label}
      </span>
      <span className="text-[10px] text-[var(--text-muted)]">({count})</span>
    </label>
  );
}

// Get all nodes connected to a given node (upstream and downstream)
function getConnectedNodes(nodeId: string, edges: typeof allEdges): Set<string> {
  const connected = new Set<string>([nodeId]);
  let changed = true;

  // Iteratively find all connected nodes (both directions)
  while (changed) {
    changed = false;
    edges.forEach(edge => {
      if (connected.has(edge.source) && !connected.has(edge.target)) {
        connected.add(edge.target);
        changed = true;
      }
      if (connected.has(edge.target) && !connected.has(edge.source)) {
        connected.add(edge.source);
        changed = true;
      }
    });
  }

  return connected;
}

// Inner component that uses useReactFlow (must be inside ReactFlowProvider)
function MechanisticNetworkGraphInner({
  height = '600px',
  showControls = true,
  showMiniMap = true,
}: MechanisticNetworkGraphProps) {
  const modules = useMemo(() => getModules(allNodes), []);
  const [moduleFilters, setModuleFilters] = useState<Record<string, ModuleFilterState>>(() =>
    getInitialModuleFilters(modules)
  );
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [hoveredVariant, setHoveredVariant] = useState<string | null>(null);
  const [activeVariantNodeId, setActiveVariantNodeId] = useState<string | null>(null);

  // Focus mode state: stores the pre-focus filter state to restore when exiting
  const [focusMode, setFocusMode] = useState<{
    focusedNodeId: string;
    previousFilters: Record<string, ModuleFilterState>;
  } | null>(null);

  const { fitView } = useReactFlow();

  // Variant callbacks for custom nodes
  const handleVariantSelect = useCallback((variantId: string | null) => {
    setSelectedVariant(variantId);
  }, []);

  const handleVariantHover = useCallback((variantId: string | null) => {
    setHoveredVariant(variantId);
  }, []);

  // Get the currently active variant (selected takes precedence over hovered)
  const activeVariantId = selectedVariant || hoveredVariant;
  const activeVariant = useMemo(
    () => activeVariantNodeId && activeVariantId
      ? getVariantData(activeVariantNodeId, activeVariantId) || null
      : null,
    [activeVariantNodeId, activeVariantId]
  );

  // Stable variant callbacks - don't include state values, pass them via node data updates
  const variantCallbacks = useMemo(() => ({
    onVariantSelect: handleVariantSelect,
    onVariantHover: handleVariantHover,
    selectedVariant: null as string | null,
    hoveredVariant: null as string | null,
  }), [handleVariantSelect, handleVariantHover]);

  // Track pseudo-nodes and excluded edges for layout
  const [currentPseudoNodes, setCurrentPseudoNodes] = useState<PseudoNode[]>([]);
  const [currentExcludedEdges, setCurrentExcludedEdges] = useState<Set<string>>(new Set());

  const { flowNodes: initialFlowNodes, pseudoNodes: initialPseudoNodes, excludedEdges: initialExcludedEdges } = useMemo(
    () => convertNodes(allNodes, moduleFilters, variantCallbacks),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [moduleFilters] // Only recreate nodes when module filters change
  );

  const initialEdges = useMemo(
    () => convertEdges(allEdges, moduleFilters, null, null, initialPseudoNodes, initialExcludedEdges),
    [moduleFilters, initialPseudoNodes, initialExcludedEdges]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialFlowNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update pseudo-nodes and excluded edges tracking when initial changes
  useEffect(() => {
    setCurrentPseudoNodes(initialPseudoNodes);
    setCurrentExcludedEdges(initialExcludedEdges);
  }, [initialPseudoNodes, initialExcludedEdges]);

  // Update only node DATA (not positions) when variant hover/select changes
  useEffect(() => {
    setNodes(currentNodes =>
      currentNodes.map(node => {
        if (node.type === 'boundaryVariant') {
          return {
            ...node,
            data: {
              ...node.data,
              selectedVariant,
              hoveredVariant,
            },
          };
        }
        return node;
      })
    );
  }, [selectedVariant, hoveredVariant, setNodes]);

  // Recreate all nodes only when module filters change
  useEffect(() => {
    const { flowNodes: newFlowNodes, pseudoNodes: newPseudoNodes, excludedEdges: newExcludedEdges } = convertNodes(allNodes, moduleFilters, {
      ...variantCallbacks,
      selectedVariant,
      hoveredVariant,
    });
    setNodes(newFlowNodes);
    setCurrentPseudoNodes(newPseudoNodes);
    setCurrentExcludedEdges(newExcludedEdges);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleFilters]); // Only on module filter changes

  // Update edges when variant or module filters change
  useEffect(() => {
    const newEdges = convertEdges(allEdges, moduleFilters, activeVariantNodeId, activeVariant, currentPseudoNodes, currentExcludedEdges);
    setEdges(newEdges);
  }, [moduleFilters, activeVariantNodeId, activeVariant, currentPseudoNodes, currentExcludedEdges, setEdges]);

  // Simple on/off toggle for module filter (no tri-state cycling)
  const toggleModuleFilter = useCallback((moduleId: string) => {
    // Don't allow toggling while in focus mode
    if (focusMode) return;

    setModuleFilters(prev => {
      const current = prev[moduleId];
      // Simple toggle: off -> on, on/partial -> off
      const next: ModuleFilterState = current === 'off' ? 'on' : 'off';
      return { ...prev, [moduleId]: next };
    });
  }, [focusMode]);

  // Select all modules
  const selectAllModules = useCallback(() => {
    if (focusMode) return;
    setModuleFilters(prev => {
      const next: Record<string, ModuleFilterState> = {};
      Object.keys(prev).forEach(id => { next[id] = 'on'; });
      return next;
    });
  }, [focusMode]);

  // Clear all modules
  const clearAllModules = useCallback(() => {
    if (focusMode) return;
    setModuleFilters(prev => {
      const next: Record<string, ModuleFilterState> = {};
      Object.keys(prev).forEach(id => { next[id] = 'off'; });
      return next;
    });
  }, [focusMode]);

  // Enter focus mode: show only the focused node and its connected pathway
  const enterFocusMode = useCallback((nodeId: string) => {
    // Get all nodes connected to this node
    const connectedNodeIds = getConnectedNodes(nodeId, allEdges);

    // Find modules of connected nodes
    const connectedModules = new Set<string>();
    const focusedNodeModule = allNodes.find(n => n.id === nodeId)?.moduleId;

    allNodes.forEach(node => {
      if (connectedNodeIds.has(node.id)) {
        connectedModules.add(node.moduleId);
      }
    });

    // Save current filters and create new focus filters
    setFocusMode({
      focusedNodeId: nodeId,
      previousFilters: { ...moduleFilters },
    });

    // Set filters: focused node's module = 'on', connected modules = 'partial', others = 'off'
    const focusFilters: Record<string, ModuleFilterState> = {};
    modules.forEach(m => {
      if (m.id === focusedNodeModule) {
        focusFilters[m.id] = 'on';
      } else if (connectedModules.has(m.id)) {
        focusFilters[m.id] = 'partial';
      } else {
        focusFilters[m.id] = 'off';
      }
    });

    setModuleFilters(focusFilters);
  }, [moduleFilters, modules]);

  // Exit focus mode: restore previous filter state
  const exitFocusMode = useCallback(() => {
    if (focusMode) {
      setModuleFilters(focusMode.previousFilters);
      setFocusMode(null);
    }
  }, [focusMode]);

  // Fit view only when module filters change (not on variant hover)
  useEffect(() => {
    // Small delay to ensure nodes are rendered before fitting
    const timer = setTimeout(() => {
      fitView({ padding: 0.2, duration: 300 });
    }, 50);
    return () => clearTimeout(timer);
  }, [moduleFilters, fitView]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    // Ctrl+click to enter focus mode
    if (event.ctrlKey || event.metaKey) {
      enterFocusMode(node.id);
      return;
    }

    setSelectedNode(node);
    setSelectedEdge(null);
    // Set activeVariantNodeId for boundary nodes with variants
    if (node.type === 'boundaryVariant' && node.data?.variants) {
      setActiveVariantNodeId(node.id);
    } else {
      setActiveVariantNodeId(null);
      setSelectedVariant(null);
      setHoveredVariant(null);
    }
  }, [enterFocusMode]);

  const onEdgeClick = useCallback((_: React.MouseEvent, edge: Edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  }, []);

  return (
    <div className="border border-[var(--border)] bg-white" style={{ height }}>
      {/* Module filter checkboxes */}
      <div className="p-3 border-b border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-medium text-[var(--text-muted)]">Modules:</span>
          {!focusMode ? (
            <>
              <button
                onClick={selectAllModules}
                className="text-[10px] text-[var(--accent-orange)] hover:underline"
              >
                All On
              </button>
              <button
                onClick={clearAllModules}
                className="text-[10px] text-[var(--text-muted)] hover:underline"
              >
                All Off
              </button>
            </>
          ) : (
            <button
              onClick={exitFocusMode}
              className="text-[10px] px-2 py-0.5 bg-[var(--accent-orange)] text-white rounded hover:bg-[var(--accent-orange)]/80"
            >
              Exit Focus Mode
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {modules.map(module => (
            <ModuleCheckbox
              key={module.id}
              state={moduleFilters[module.id]}
              onChange={() => toggleModuleFilter(module.id)}
              color={moduleColors[module.id]}
              label={module.label}
              count={module.count}
              disabled={!!focusMode}
            />
          ))}
        </div>
        <p className="mt-2 text-[10px] text-[var(--text-muted)]">
          {nodes.length} nodes, {edges.length} edges
          {focusMode
            ? ` • Focus mode: showing pathways for "${allNodes.find(n => n.id === focusMode.focusedNodeId)?.label}"`
            : ' • Ctrl+click a node to focus on its pathways'}
        </p>
      </div>

      {/* Graph */}
      <div style={{ height: `calc(${height} - ${selectedNode || selectedEdge ? '220px' : '100px'})` }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          fitView
          attributionPosition="bottom-left"
        >
          <Background color="#e5e2dd" gap={20} />
          {showControls && <Controls />}
          {showMiniMap && (
            <MiniMap
              nodeColor={(node) => {
                // Pseudo-nodes get a lighter color
                if (node.data?.isPseudo) {
                  return '#d1d1d1';
                }
                return moduleColors[node.data?.moduleId as string] || '#787473';
              }}
              maskColor="rgba(250, 249, 247, 0.7)"
              pannable
              zoomable
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid var(--border)',
                borderRadius: '4px',
              }}
            />
          )}
        </ReactFlow>
      </div>

      {/* Selected node details - only show for non-boundaryVariant nodes */}
      {selectedNode && selectedNode.type !== 'boundaryVariant' && (
        <div className="p-3 border-t border-[var(--border)] bg-[var(--bg-primary)]">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-[var(--text-primary)]">{selectedNode.data.label as string}</h4>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[var(--text-muted)]">Category: </span>
              <span className="text-[var(--text-body)]">{selectedNode.data.category as string}</span>
            </div>
            <div>
              <span className="text-[var(--text-muted)]">Subtype: </span>
              <span className="text-[var(--text-body)]">{selectedNode.data.subtype as string}</span>
            </div>
          </div>
          {selectedNode.data.description ? (
            <p className="mt-2 text-xs text-[var(--text-body)]">{String(selectedNode.data.description)}</p>
          ) : null}
          {selectedNode.data.mechanism ? (
            <p className="mt-1 text-xs text-[var(--text-muted)] italic">{String(selectedNode.data.mechanism)}</p>
          ) : null}
          {selectedNode.data.roles && Array.isArray(selectedNode.data.roles) && (selectedNode.data.roles as string[]).length > 0 ? (
            <div className="mt-2 flex gap-1">
              {(selectedNode.data.roles as string[]).map(role => (
                <span key={role} className="px-1.5 py-0.5 text-[10px] bg-[var(--accent-orange-light)] text-[var(--accent-orange)] rounded">
                  {role}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      )}

      {/* Selected edge details */}
      {selectedEdge && selectedEdge.data && (() => {
        const edgeData = selectedEdge.data as {
          mechanismLabel?: string;
          mechanismDescription?: string;
          relation?: string;
          edgeType?: string;
          causalConfidence?: string;
          evidence?: Array<{pmid?: string; firstAuthor: string; year: number; methodType: string; quote?: string}>;
          keyInsight?: string;
          therapeuticImplication?: string;
          translationalGap?: string;
        };
        return (
        <div className="p-3 border-t border-[var(--border)] bg-[var(--bg-primary)] overflow-y-auto max-h-[200px]">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-semibold text-[var(--text-primary)]">
                {selectedEdge.source} → {selectedEdge.target}
              </h4>
              {edgeData.mechanismLabel && (
                <span className="text-xs text-[var(--text-muted)]">{edgeData.mechanismLabel}</span>
              )}
            </div>
            <button
              onClick={() => setSelectedEdge(null)}
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              Close
            </button>
          </div>

          {/* Relation and confidence */}
          <div className="grid grid-cols-3 gap-2 text-xs mb-2">
            <div>
              <span className="text-[var(--text-muted)]">Relation: </span>
              <span className={`font-medium ${
                edgeData.relation?.includes('Decrease') ? 'text-[#c75146]' : 'text-[#007385]'
              }`}>
                {edgeData.relation}
              </span>
            </div>
            {edgeData.edgeType && (
              <div>
                <span className="text-[var(--text-muted)]">Type: </span>
                <span className="text-[var(--text-body)]">{edgeData.edgeType}</span>
              </div>
            )}
            {edgeData.causalConfidence && (
              <div>
                <span className="text-[var(--text-muted)]">Confidence: </span>
                <span className="font-medium text-[var(--accent-orange)]">{edgeData.causalConfidence}</span>
              </div>
            )}
          </div>

          {/* Mechanism description */}
          {edgeData.mechanismDescription && (
            <p className="text-xs text-[var(--text-body)] mb-2">{edgeData.mechanismDescription}</p>
          )}

          {/* Key insight */}
          {edgeData.keyInsight && (
            <p className="text-xs text-[var(--success)] bg-[var(--success-light)] px-2 py-1 rounded mb-2">
              {edgeData.keyInsight}
            </p>
          )}

          {/* Translational gap */}
          {edgeData.translationalGap && (
            <p className="text-xs text-[var(--danger)] bg-[var(--danger-light)] px-2 py-1 rounded mb-2">
              {edgeData.translationalGap}
            </p>
          )}

          {/* Evidence citations */}
          {edgeData.evidence && edgeData.evidence.length > 0 && (
            <div className="mt-2 border-t border-[var(--border)] pt-2">
              <span className="text-xs font-medium text-[var(--text-muted)]">Evidence ({edgeData.evidence.length}):</span>
              <div className="mt-1 space-y-1">
                {edgeData.evidence.slice(0, 3).map((ev, i) => (
                  <div key={i} className="text-[10px] text-[var(--text-body)] bg-white p-1.5 rounded border border-[var(--border)]">
                    <div className="flex justify-between">
                      <span className="font-medium">{ev.firstAuthor} et al., {ev.year}</span>
                      <span className="text-[var(--text-muted)]">{ev.methodType}</span>
                    </div>
                    {ev.pmid && (
                      <a
                        href={`https://pubmed.ncbi.nlm.nih.gov/${ev.pmid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--accent-orange)] hover:underline"
                      >
                        PMID: {ev.pmid}
                      </a>
                    )}
                    {ev.quote && (
                      <p className="mt-1 italic text-[var(--text-muted)]">&ldquo;{ev.quote.slice(0, 150)}...&rdquo;</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        );
      })()}
    </div>
  );
}

// Wrapper component that provides ReactFlowProvider
export function MechanisticNetworkGraph(props: MechanisticNetworkGraphProps) {
  return (
    <ReactFlowProvider>
      <MechanisticNetworkGraphInner {...props} />
    </ReactFlowProvider>
  );
}
