/**
 * Network Layout Algorithm for Mechanistic Network Graph
 *
 * Goals:
 * 1. Show causal chains clearly (left-to-right flow)
 * 2. Minimize edge crossings
 * 3. Reserve space for boundary nodes to expand
 *
 * Approach:
 * - Use Sugiyama-style layered graph drawing
 * - Handle disconnected components separately
 * - Layer assignment via bidirectional longest path
 * - Crossing minimization via barycenter heuristic
 * - Vertical spacing based on node type (more for BOUNDARY)
 */

import { allNodes } from '../src/data/mechanisticFramework/nodes';
import { allEdges } from '../src/data/mechanisticFramework/edges';

interface LayoutNode {
  id: string;
  label: string;
  category: string;
  moduleId: string;
  layer: number;
  position: number; // vertical position within layer
  x: number;
  y: number;
}

interface LayoutEdge {
  source: string;
  target: string;
}

// Build adjacency structures
function buildGraph() {
  const nodeIds = new Set(allNodes.map(n => n.id));
  const edges: LayoutEdge[] = allEdges
    .filter(e => nodeIds.has(e.source) && nodeIds.has(e.target))
    .map(e => ({ source: e.source, target: e.target }));

  const outgoing: Record<string, string[]> = {};
  const incoming: Record<string, string[]> = {};

  allNodes.forEach(n => {
    outgoing[n.id] = [];
    incoming[n.id] = [];
  });

  edges.forEach(e => {
    outgoing[e.source].push(e.target);
    incoming[e.target].push(e.source);
  });

  return { edges, outgoing, incoming };
}

// Find connected components (treating graph as undirected for grouping)
function findConnectedComponents(): string[][] {
  const { outgoing, incoming } = buildGraph();
  const visited = new Set<string>();
  const components: string[][] = [];

  function dfs(nodeId: string, component: string[]) {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    component.push(nodeId);

    // Traverse both directions (undirected connectivity)
    outgoing[nodeId].forEach(n => dfs(n, component));
    incoming[nodeId].forEach(n => dfs(n, component));
  }

  allNodes.forEach(n => {
    if (!visited.has(n.id)) {
      const component: string[] = [];
      dfs(n.id, component);
      components.push(component);
    }
  });

  // Sort components by size (largest first) and then alphabetically by first node
  components.sort((a, b) => {
    if (b.length !== a.length) return b.length - a.length;
    return a[0].localeCompare(b[0]);
  });

  return components;
}

// Assign layers within a component using longest path from sources
function assignLayersForComponent(
  componentNodeIds: Set<string>,
  outgoing: Record<string, string[]>,
  incoming: Record<string, string[]>
): Map<string, number> {
  const layers = new Map<string, number>();

  // Find sources within this component (no incoming edges from within component)
  const sources = Array.from(componentNodeIds).filter(id =>
    incoming[id].filter(pred => componentNodeIds.has(pred)).length === 0
  );

  // If no sources (cycles), pick arbitrary starting point
  if (sources.length === 0) {
    sources.push(Array.from(componentNodeIds)[0]);
  }

  // BFS-style layer assignment
  const queue = [...sources];
  sources.forEach(id => layers.set(id, 0));

  const processed = new Set<string>();
  let iterations = 0;
  const maxIterations = componentNodeIds.size * 10;

  while (queue.length > 0 && iterations < maxIterations) {
    iterations++;
    const nodeId = queue.shift()!;

    if (!componentNodeIds.has(nodeId)) continue;
    if (processed.has(nodeId)) continue;

    // Get predecessors within this component
    const componentPreds = incoming[nodeId].filter(pred => componentNodeIds.has(pred));

    // Check if all predecessors are processed
    const allPredecessorsProcessed = componentPreds.every(pred => layers.has(pred));
    if (!allPredecessorsProcessed && componentPreds.length > 0) {
      queue.push(nodeId);
      continue;
    }

    // Calculate layer as max(predecessor layers) + 1
    const predLayers = componentPreds.map(pred => layers.get(pred) ?? -1);
    const layer = predLayers.length > 0 ? Math.max(...predLayers) + 1 : 0;
    layers.set(nodeId, layer);
    processed.add(nodeId);

    // Add successors within component to queue
    outgoing[nodeId].forEach(succ => {
      if (componentNodeIds.has(succ) && !processed.has(succ)) {
        queue.push(succ);
      }
    });
  }

  // Handle any remaining nodes in this component (cycles)
  const maxLayer = Math.max(...Array.from(layers.values()), 0);
  componentNodeIds.forEach(id => {
    if (!layers.has(id)) {
      layers.set(id, maxLayer + 1);
    }
  });

  return layers;
}

// Step 1: Assign layers to all nodes
function assignLayers(): Map<string, number> {
  const { outgoing, incoming } = buildGraph();
  const components = findConnectedComponents();
  const layers = new Map<string, number>();

  console.log(`Found ${components.length} connected components:`);
  components.forEach((comp, i) => {
    console.log(`  Component ${i + 1}: ${comp.length} nodes`);
  });

  // Process each component separately
  let currentYOffset = 0;

  components.forEach((component) => {
    const componentNodeIds = new Set(component);
    const componentLayers = assignLayersForComponent(componentNodeIds, outgoing, incoming);

    // Assign layers with component offset
    componentLayers.forEach((layer, nodeId) => {
      layers.set(nodeId, layer);
    });
  });

  return layers;
}

// Step 2: Order nodes within layers to minimize crossings (barycenter method)
function orderWithinLayers(layers: Map<string, number>): Map<string, number> {
  const { edges } = buildGraph();
  const positions = new Map<string, number>();

  // Group nodes by layer
  const layerGroups: Map<number, string[]> = new Map();
  layers.forEach((layer, nodeId) => {
    if (!layerGroups.has(layer)) {
      layerGroups.set(layer, []);
    }
    layerGroups.get(layer)!.push(nodeId);
  });

  // Initial ordering: by module, then by category (BOUNDARY first for visibility)
  const categoryOrder: Record<string, number> = { 'BOUNDARY': 0, 'STATE': 1, 'STOCK': 2 };

  layerGroups.forEach((nodeIds) => {
    nodeIds.sort((a, b) => {
      const nodeA = allNodes.find(n => n.id === a)!;
      const nodeB = allNodes.find(n => n.id === b)!;

      // First by module
      const moduleCompare = nodeA.moduleId.localeCompare(nodeB.moduleId);
      if (moduleCompare !== 0) return moduleCompare;

      // Then by category
      const catA = categoryOrder[nodeA.category] ?? 1;
      const catB = categoryOrder[nodeB.category] ?? 1;
      return catA - catB;
    });

    nodeIds.forEach((id, idx) => positions.set(id, idx));
  });

  // Barycenter iterations to reduce crossings
  const numIterations = 10;
  const sortedLayers = Array.from(layerGroups.keys()).sort((a, b) => a - b);

  for (let iter = 0; iter < numIterations; iter++) {
    // Forward pass (layer 0 to max)
    for (let i = 1; i < sortedLayers.length; i++) {
      const layer = sortedLayers[i];
      const nodeIds = layerGroups.get(layer)!;

      // Calculate barycenter for each node based on predecessors
      const barycenters: Map<string, number> = new Map();
      nodeIds.forEach(nodeId => {
        const predecessors = edges
          .filter(e => e.target === nodeId && layers.get(e.source) === sortedLayers[i - 1])
          .map(e => e.source);

        if (predecessors.length > 0) {
          const avgPos = predecessors.reduce((sum, p) => sum + (positions.get(p) ?? 0), 0) / predecessors.length;
          barycenters.set(nodeId, avgPos);
        } else {
          barycenters.set(nodeId, positions.get(nodeId) ?? 0);
        }
      });

      // Sort by barycenter
      nodeIds.sort((a, b) => (barycenters.get(a) ?? 0) - (barycenters.get(b) ?? 0));
      nodeIds.forEach((id, idx) => positions.set(id, idx));
    }

    // Backward pass (max layer to 0)
    for (let i = sortedLayers.length - 2; i >= 0; i--) {
      const layer = sortedLayers[i];
      const nodeIds = layerGroups.get(layer)!;

      // Calculate barycenter for each node based on successors
      const barycenters: Map<string, number> = new Map();
      nodeIds.forEach(nodeId => {
        const successors = edges
          .filter(e => e.source === nodeId && layers.get(e.target) === sortedLayers[i + 1])
          .map(e => e.target);

        if (successors.length > 0) {
          const avgPos = successors.reduce((sum, s) => sum + (positions.get(s) ?? 0), 0) / successors.length;
          barycenters.set(nodeId, avgPos);
        } else {
          barycenters.set(nodeId, positions.get(nodeId) ?? 0);
        }
      });

      // Sort by barycenter
      nodeIds.sort((a, b) => (barycenters.get(a) ?? 0) - (barycenters.get(b) ?? 0));
      nodeIds.forEach((id, idx) => positions.set(id, idx));
    }
  }

  return positions;
}

// Step 3: Calculate actual x,y coordinates with component separation
function calculateCoordinates(
  layers: Map<string, number>,
  positions: Map<string, number>
): LayoutNode[] {
  const layerWidth = 250; // Horizontal spacing between layers
  const baseNodeHeight = 70; // Base vertical spacing
  const boundaryExtraSpace = 50; // Extra space for boundary nodes

  // Group by layer to calculate max height per layer
  const layerGroups: Map<number, string[]> = new Map();
  layers.forEach((layer, nodeId) => {
    if (!layerGroups.has(layer)) {
      layerGroups.set(layer, []);
    }
    layerGroups.get(layer)!.push(nodeId);
  });

  // Sort nodes within each layer by position
  layerGroups.forEach((nodeIds) => {
    nodeIds.sort((a, b) => (positions.get(a) ?? 0) - (positions.get(b) ?? 0));
  });

  const layoutNodes: LayoutNode[] = [];

  layerGroups.forEach((nodeIds, layer) => {
    let currentY = 50; // Start with padding

    nodeIds.forEach(nodeId => {
      const node = allNodes.find(n => n.id === nodeId)!;
      const isBoundary = node.category === 'BOUNDARY';
      const hasVariants = isBoundary && node.variants && node.variants.length > 0;

      // Calculate height for this node
      const nodeHeight = hasVariants
        ? baseNodeHeight + boundaryExtraSpace + (node.variants!.length * 20)
        : baseNodeHeight;

      layoutNodes.push({
        id: node.id,
        label: node.label,
        category: node.category,
        moduleId: node.moduleId,
        layer,
        position: positions.get(nodeId) ?? 0,
        x: layer * layerWidth + 50,
        y: currentY,
      });

      currentY += nodeHeight;
    });
  });

  return layoutNodes;
}

// Count edge crossings (for quality metric)
function countCrossings(
  layoutNodes: LayoutNode[],
  edges: LayoutEdge[]
): number {
  const nodePositions = new Map<string, { x: number; y: number }>();
  layoutNodes.forEach(n => nodePositions.set(n.id, { x: n.x, y: n.y }));

  let crossings = 0;

  for (let i = 0; i < edges.length; i++) {
    for (let j = i + 1; j < edges.length; j++) {
      const e1 = edges[i];
      const e2 = edges[j];

      const p1 = nodePositions.get(e1.source);
      const p2 = nodePositions.get(e1.target);
      const p3 = nodePositions.get(e2.source);
      const p4 = nodePositions.get(e2.target);

      if (!p1 || !p2 || !p3 || !p4) continue;

      // Only count crossings between edges in adjacent layers
      if (p1.x === p3.x && p2.x === p4.x) {
        // Check if lines cross
        const above1 = p1.y < p3.y;
        const above2 = p2.y < p4.y;
        if (above1 !== above2) {
          crossings++;
        }
      }
    }
  }

  return crossings;
}

// Main function
function main() {
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║           NETWORK LAYOUT ALGORITHM                             ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  // Step 1: Layer assignment
  console.log('Step 1: Assigning layers (longest path from sources)...');
  const layers = assignLayers();

  const layerCounts: Record<number, number> = {};
  layers.forEach(layer => {
    layerCounts[layer] = (layerCounts[layer] || 0) + 1;
  });
  console.log('  Layers:', Object.keys(layerCounts).length);
  console.log('  Nodes per layer:', layerCounts);

  // Step 2: Order within layers
  console.log('\nStep 2: Ordering nodes within layers (barycenter method)...');
  const positions = orderWithinLayers(layers);

  // Step 3: Calculate coordinates
  console.log('\nStep 3: Calculating coordinates...');
  const layoutNodes = calculateCoordinates(layers, positions);

  // Calculate quality metrics
  const { edges } = buildGraph();
  const crossings = countCrossings(layoutNodes, edges);
  console.log(`\n  Edge crossings: ${crossings}`);

  // Calculate bounding box
  const maxX = Math.max(...layoutNodes.map(n => n.x));
  const maxY = Math.max(...layoutNodes.map(n => n.y));
  console.log(`  Bounding box: ${maxX + 200}px x ${maxY + 100}px`);

  // Output layout data
  console.log('\n════════════════════════════════════════════════════════════════');
  console.log('LAYOUT POSITIONS (by layer):');
  console.log('════════════════════════════════════════════════════════════════\n');

  const sortedLayers = [...new Set(layoutNodes.map(n => n.layer))].sort((a, b) => a - b);

  sortedLayers.forEach(layer => {
    const layerNodes = layoutNodes.filter(n => n.layer === layer).sort((a, b) => a.y - b.y);
    console.log(`Layer ${layer} (x=${layerNodes[0]?.x ?? 0}):`);
    layerNodes.forEach(n => {
      const marker = n.category === 'BOUNDARY' ? '▢' : n.category === 'STOCK' ? '○' : '◇';
      console.log(`  ${marker} ${n.id.padEnd(30)} y=${String(n.y).padStart(4)} [${n.moduleId}]`);
    });
    console.log();
  });

  // Export as JSON for use in component
  console.log('════════════════════════════════════════════════════════════════');
  console.log('EXPORTABLE LAYOUT (paste into component):');
  console.log('════════════════════════════════════════════════════════════════\n');

  const layoutMap: Record<string, { x: number; y: number }> = {};
  layoutNodes.forEach(n => {
    layoutMap[n.id] = { x: n.x, y: n.y };
  });

  console.log('export const nodePositions: Record<string, { x: number; y: number }> = ');
  console.log(JSON.stringify(layoutMap, null, 2).slice(0, 2000) + '...');
  console.log(`\n// Full layout has ${Object.keys(layoutMap).length} nodes`);

  // Write to file
  const fs = require('fs');
  const outputPath = './src/data/mechanisticFramework/nodePositions.ts';
  const fileContent = `// Auto-generated by scripts/layout-network.ts
// Run: npx tsx scripts/layout-network.ts

export const nodePositions: Record<string, { x: number; y: number }> = ${JSON.stringify(layoutMap, null, 2)};
`;

  fs.writeFileSync(outputPath, fileContent);
  console.log(`\n✓ Layout saved to ${outputPath}`);
}

main();
