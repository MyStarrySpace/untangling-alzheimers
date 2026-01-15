import { allNodes } from '../src/data/mechanisticFramework/nodes';
import { allEdges } from '../src/data/mechanisticFramework/edges';

// Get all node IDs that appear in edges (as source or target)
const connectedNodeIds = new Set<string>();
allEdges.forEach(e => {
  connectedNodeIds.add(e.source);
  connectedNodeIds.add(e.target);
});

// Find nodes not connected to any edge
const unconnectedNodes = allNodes.filter(n => !connectedNodeIds.has(n.id));

// Find nodes with only incoming edges (sinks)
const nodesWithOutgoing = new Set<string>();
const nodesWithIncoming = new Set<string>();
allEdges.forEach(e => {
  nodesWithOutgoing.add(e.source);
  nodesWithIncoming.add(e.target);
});

const sinkNodes = allNodes.filter(n =>
  nodesWithIncoming.has(n.id) && !nodesWithOutgoing.has(n.id)
);

const sourceNodes = allNodes.filter(n =>
  nodesWithOutgoing.has(n.id) && !nodesWithIncoming.has(n.id)
);

// Group unconnected by module
const byModule: Record<string, typeof allNodes> = {};
unconnectedNodes.forEach(n => {
  if (!byModule[n.moduleId]) byModule[n.moduleId] = [];
  byModule[n.moduleId].push(n);
});

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║              MECHANISTIC NETWORK ANALYSIS                      ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');
console.log('SUMMARY:');
console.log('  Total nodes:', allNodes.length);
console.log('  Total edges:', allEdges.length);
console.log('  Connected nodes:', connectedNodeIds.size);
console.log('  Unconnected nodes:', unconnectedNodes.length);
console.log('  Source-only nodes (no incoming):', sourceNodes.length);
console.log('  Sink-only nodes (no outgoing):', sinkNodes.length);

console.log('\n════════════════════════════════════════════════════════════════');
console.log('UNCONNECTED NODES (no edges at all):');
console.log('════════════════════════════════════════════════════════════════');

if (unconnectedNodes.length === 0) {
  console.log('  ✓ All nodes are connected!');
} else {
  Object.entries(byModule).sort((a,b) => a[0].localeCompare(b[0])).forEach(([mod, nodes]) => {
    console.log(`\n[${mod}] - ${nodes.length} unconnected:`);
    nodes.forEach(n => {
      console.log(`  ○ ${n.id}`);
      console.log(`    Label: ${n.label}`);
      console.log(`    Category: ${n.category}${n.subtype ? ` / ${n.subtype}` : ''}`);
      if (n.description) console.log(`    Desc: ${n.description.slice(0, 60)}...`);
    });
  });
}

console.log('\n════════════════════════════════════════════════════════════════');
console.log('SOURCE NODES (only outgoing edges - typically boundaries):');
console.log('════════════════════════════════════════════════════════════════');

sourceNodes.forEach(n => {
  const outCount = allEdges.filter(e => e.source === n.id).length;
  console.log(`  → ${n.id} (${n.category}) - ${outCount} outgoing`);
});

console.log('\n════════════════════════════════════════════════════════════════');
console.log('SINK NODES (only incoming edges - typically outcomes):');
console.log('════════════════════════════════════════════════════════════════');

sinkNodes.forEach(n => {
  const inCount = allEdges.filter(e => e.target === n.id).length;
  console.log(`  ← ${n.id} (${n.category}) - ${inCount} incoming`);
});

// Check for edges referencing non-existent nodes
console.log('\n════════════════════════════════════════════════════════════════');
console.log('EDGE INTEGRITY CHECK:');
console.log('════════════════════════════════════════════════════════════════');

const nodeIdSet = new Set(allNodes.map(n => n.id));
const brokenEdges = allEdges.filter(e =>
  !nodeIdSet.has(e.source) || !nodeIdSet.has(e.target)
);

if (brokenEdges.length === 0) {
  console.log('  ✓ All edges reference valid nodes!');
} else {
  console.log(`  ✗ ${brokenEdges.length} edges reference non-existent nodes:`);
  brokenEdges.forEach(e => {
    const srcMissing = !nodeIdSet.has(e.source);
    const tgtMissing = !nodeIdSet.has(e.target);
    console.log(`  - ${e.id}: ${srcMissing ? '❌' : '✓'}${e.source} → ${tgtMissing ? '❌' : '✓'}${e.target}`);
  });
}
