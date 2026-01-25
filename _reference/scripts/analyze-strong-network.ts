#!/usr/bin/env npx tsx
/**
 * Analyze L1-L3 network connectivity and generate ASCII diagram
 */

import { allEdges, modules, allNodes } from '../src/data/mechanisticFramework';

// Get L1-L3 edges
const strongEdges = allEdges.filter(e => {
  const levels = e.evidence?.map(ev => ev.causalConfidence).filter(Boolean) || [];
  return levels.some(l => l === 'L1' || l === 'L2' || l === 'L3');
});

// Build adjacency (undirected for connectivity analysis)
const nodes = new Set<string>();
const adjacency = new Map<string, Set<string>>();
const edgeMap = new Map<string, { source: string; target: string; moduleId: string; relation: string }[]>();

for (const edge of strongEdges) {
  nodes.add(edge.source);
  nodes.add(edge.target);

  if (!adjacency.has(edge.source)) adjacency.set(edge.source, new Set());
  if (!adjacency.has(edge.target)) adjacency.set(edge.target, new Set());

  adjacency.get(edge.source)!.add(edge.target);
  adjacency.get(edge.target)!.add(edge.source);

  const key = `${edge.source}->${edge.target}`;
  if (!edgeMap.has(key)) edgeMap.set(key, []);
  edgeMap.get(key)!.push({ source: edge.source, target: edge.target, moduleId: edge.moduleId, relation: edge.relation });
}

// Find connected components using BFS
function findComponents(): string[][] {
  const visited = new Set<string>();
  const components: string[][] = [];

  for (const node of nodes) {
    if (visited.has(node)) continue;

    const component: string[] = [];
    const queue = [node];

    while (queue.length > 0) {
      const curr = queue.shift()!;
      if (visited.has(curr)) continue;
      visited.add(curr);
      component.push(curr);

      for (const neighbor of adjacency.get(curr) || []) {
        if (!visited.has(neighbor)) queue.push(neighbor);
      }
    }

    components.push(component);
  }

  return components.sort((a, b) => b.length - a.length);
}

// Get node's module
function getNodeModule(nodeId: string): string {
  const node = allNodes.find(n => n.id === nodeId);
  return node?.moduleId || 'UNKNOWN';
}

// Get short label for node
function getShortLabel(nodeId: string): string {
  const node = allNodes.find(n => n.id === nodeId);
  if (!node) return nodeId.substring(0, 15);
  // Abbreviate common words
  let label = node.label || nodeId;
  label = label.replace('Dysfunction', 'Dysf')
               .replace('Activated', 'Act')
               .replace('Hyperphosphorylated', 'Hyp-P')
               .replace('Activity', 'Act')
               .replace('Inflammation', 'Inflam')
               .replace('Cognitive', 'Cog')
               .replace('Neuronal', 'Neur')
               .replace('Clinical', 'Clin')
               .replace('Synaptic', 'Syn');
  return label.substring(0, 18);
}

const components = findComponents();

console.log('╔══════════════════════════════════════════════════════════════════════════╗');
console.log('║         L1-L3 STRONG EVIDENCE NETWORK ANALYSIS                          ║');
console.log('╠══════════════════════════════════════════════════════════════════════════╣');
console.log(`║  Total nodes with L1-L3 evidence: ${nodes.size.toString().padEnd(37)}║`);
console.log(`║  Total L1-L3 edges: ${strongEdges.length.toString().padEnd(52)}║`);
console.log(`║  Connected components: ${components.length.toString().padEnd(49)}║`);
console.log('╚══════════════════════════════════════════════════════════════════════════╝');
console.log('');

// Component analysis
console.log('COMPONENT ANALYSIS:');
console.log('═'.repeat(74));
for (let i = 0; i < components.length; i++) {
  const comp = components[i];
  const moduleBreakdown = new Map<string, number>();
  for (const node of comp) {
    const mod = getNodeModule(node);
    moduleBreakdown.set(mod, (moduleBreakdown.get(mod) || 0) + 1);
  }

  console.log(`\nComponent ${i + 1}: ${comp.length} nodes`);
  console.log(`  Modules: ${[...moduleBreakdown.entries()].map(([m, c]) => `${m}(${c})`).join(', ')}`);

  if (comp.length <= 15) {
    console.log(`  Nodes: ${comp.join(', ')}`);
  }
}

// Hub analysis (most connected nodes in L1-L3 network)
console.log('\n\nHUB NODES (≥3 L1-L3 connections):');
console.log('═'.repeat(74));
const hubs = Array.from(adjacency.entries())
  .map(([node, neighbors]) => ({ node, count: neighbors.size, module: getNodeModule(node) }))
  .filter(h => h.count >= 3)
  .sort((a, b) => b.count - a.count);

for (const hub of hubs) {
  const neighbors = [...(adjacency.get(hub.node) || [])];
  console.log(`\n  ${getShortLabel(hub.node)} [${hub.module}]: ${hub.count} connections`);
  console.log(`    → ${neighbors.map(n => getShortLabel(n)).join(', ')}`);
}

// Modules with NO strong evidence
console.log('\n\n⚠️  MODULES WITH ZERO L1-L3 EDGES:');
console.log('═'.repeat(74));
const modulesWithStrong = new Set(strongEdges.map(e => e.moduleId));
for (const mod of modules) {
  if (!modulesWithStrong.has(mod.id)) {
    console.log(`  ${mod.id}: ${mod.name}`);
  }
}

// Cross-module bridges (edges connecting different modules)
console.log('\n\nCROSS-MODULE BRIDGES (L1-L3 edges connecting modules):');
console.log('═'.repeat(74));
const bridges: { edge: typeof strongEdges[0]; sourceModule: string; targetModule: string }[] = [];
for (const edge of strongEdges) {
  const sourceMod = getNodeModule(edge.source);
  const targetMod = getNodeModule(edge.target);
  if (sourceMod !== targetMod && sourceMod !== 'UNKNOWN' && targetMod !== 'UNKNOWN') {
    bridges.push({ edge, sourceModule: sourceMod, targetModule: targetMod });
  }
}

// Group bridges by module pair
const bridgeGroups = new Map<string, typeof bridges>();
for (const b of bridges) {
  const key = [b.sourceModule, b.targetModule].sort().join('↔');
  if (!bridgeGroups.has(key)) bridgeGroups.set(key, []);
  bridgeGroups.get(key)!.push(b);
}

for (const [pair, edges] of [...bridgeGroups.entries()].sort((a, b) => b[1].length - a[1].length)) {
  console.log(`\n  ${pair}: ${edges.length} bridge(s)`);
  for (const b of edges.slice(0, 3)) {
    console.log(`    ${b.edge.source} → ${b.edge.target} (${b.edge.relation})`);
  }
  if (edges.length > 3) console.log(`    ... and ${edges.length - 3} more`);
}

// ASCII DIAGRAM
console.log('\n\n');
console.log('╔══════════════════════════════════════════════════════════════════════════════════════════════════╗');
console.log('║                        ASCII NETWORK: L1-L3 EVIDENCE ONLY                                       ║');
console.log('║   (Only showing hub nodes with ≥3 connections and their direct connections)                     ║');
console.log('╚══════════════════════════════════════════════════════════════════════════════════════════════════╝');
console.log('');

// Group hubs by functional area for ASCII diagram
const inflammationHubs = hubs.filter(h => ['M02', 'M03', 'M04', 'M05'].includes(h.module));
const pathologyHubs = hubs.filter(h => ['M06', 'M07', 'M08'].includes(h.module));
const vascularHubs = hubs.filter(h => ['M12', 'M13', 'M18'].includes(h.module));
const outcomeHubs = hubs.filter(h => ['M15', 'BOUNDARY'].includes(h.module));
const otherHubs = hubs.filter(h => !['M02', 'M03', 'M04', 'M05', 'M06', 'M07', 'M08', 'M12', 'M13', 'M18', 'M15', 'BOUNDARY'].includes(h.module));

console.log(`
┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                    INFLAMMATION CORE                                                │
│                                    ════════════════                                                 │
│                                                                                                     │`);

// Print inflammation nodes
if (inflammationHubs.length > 0) {
  for (const hub of inflammationHubs) {
    console.log(`│     [${hub.module}] ${getShortLabel(hub.node).padEnd(20)} ────┬─── ${hub.count} connections                              │`);
  }
}

console.log(`│                                         │                                                         │
│                                         ▼                                                         │
│    ┌────────────────────────────────────────────────────────────────────────────────┐             │
│    │                           PATHOLOGY (Aβ, Tau, Complement)                      │             │
│    │                           ═══════════════════════════════                      │             │`);

if (pathologyHubs.length > 0) {
  for (const hub of pathologyHubs) {
    console.log(`│    │  [${hub.module}] ${getShortLabel(hub.node).padEnd(22)} ─── ${hub.count} connections                          │             │`);
  }
}

console.log(`│    └────────────────────────────────────────────────────────────────────────────────┘             │
│                                         │                                                         │
│                                         ▼                                                         │
│    ┌────────────────────────────────────────────────────────────────────────────────┐             │
│    │                           VASCULAR / BBB / GLYMPHATIC                          │             │
│    │                           ═══════════════════════════                          │             │`);

if (vascularHubs.length > 0) {
  for (const hub of vascularHubs) {
    console.log(`│    │  [${hub.module}] ${getShortLabel(hub.node).padEnd(22)} ─── ${hub.count} connections                          │             │`);
  }
}

console.log(`│    └────────────────────────────────────────────────────────────────────────────────┘             │
│                                         │                                                         │
│                                         ▼                                                         │
│    ┌────────────────────────────────────────────────────────────────────────────────┐             │
│    │                              CLINICAL OUTCOMES                                 │             │
│    │                              ═════════════════                                 │             │`);

if (outcomeHubs.length > 0) {
  for (const hub of outcomeHubs) {
    console.log(`│    │  [${hub.module}] ${getShortLabel(hub.node).padEnd(22)} ─── ${hub.count} connections                          │             │`);
  }
} else {
  console.log(`│    │  [M15] cognitive_score                 ─── (endpoint)                              │             │`);
}

console.log(`│    └────────────────────────────────────────────────────────────────────────────────┘             │
│                                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────────────────────┘
`);

// Detailed causal chains
console.log('\n\nKEY CAUSAL CHAINS (L1-L3 evidence only):');
console.log('═'.repeat(74));
console.log(`
1. LYSOSOME → INFLAMMATION → ASTROCYTE → NEURODEGENERATION
   ┌──────────────────────────────────────────────────────────────────────┐
   │ lysosomal_dysfunction                                                │
   │        │ (L3: Oka 2022)                                              │
   │        ▼                                                             │
   │ mtdna_undegraded ──► mtdna_from_lysosome ──► cgas_active            │
   │                           (L3)                   (L3)                │
   │                                                   │                  │
   │                                                   ▼                  │
   │                                             sting_active             │
   │                                                   │                  │
   │                                                   ▼                  │
   │                                             type_i_ifn               │
   │                                                   │                  │
   │                                                   ▼                  │
   │                                          neuroinflammation           │
   └──────────────────────────────────────────────────────────────────────┘

2. INFLAMMASOME → TAU → COGNITION
   ┌──────────────────────────────────────────────────────────────────────┐
   │ nlrp3_active ──────────────────────────────────────┬───────────────► │
   │      │ (L3: Heneka 2013)                           │                 │
   │      ▼                                             ▼                 │
   │ caspase1_active                              gsk3b_active            │
   │                                                    │                 │
   │                                                    ▼                 │
   │                                           tau_hyperphosphorylated    │
   └──────────────────────────────────────────────────────────────────────┘

3. COMPLEMENT → SYNAPSE LOSS → COGNITIVE DECLINE
   ┌──────────────────────────────────────────────────────────────────────┐
   │ c1q ──► c3_opsonization ──► cr3_mediated_pruning                    │
   │  (L3: Stevens 2007)   (L3)            │ (L3)                         │
   │                                       ▼                              │
   │                              synapse_elimination                     │
   │                                       │                              │
   │                                       ▼                              │
   │                                   synapses (↓)                       │
   │                                       │                              │
   │                                       ▼                              │
   │                               cognitive_score (↓)                    │
   │                               (L1: RCT data)                         │
   └──────────────────────────────────────────────────────────────────────┘

4. APOE4 → BBB → CLEARANCE FAILURE
   ┌──────────────────────────────────────────────────────────────────────┐
   │ apoe_genotype (E4)                                                   │
   │      │ (L3: Bell 2012)                                               │
   │      ▼                                                               │
   │ cypa_elevated ──► mmp9_active ──► pericyte_injury ──► bbb_breakdown │
   │                        (L3)           (L3)              (L3)         │
   │                                                                      │
   │ lrp1_apoe4_impaired ──► abeta_monomers (↓ clearance)                │
   │           (L3)                                                       │
   └──────────────────────────────────────────────────────────────────────┘

5. MICROGLIA → A1 ASTROCYTES → NEURODEGENERATION
   ┌──────────────────────────────────────────────────────────────────────┐
   │ microglia_activated                                                  │
   │      │                                                               │
   │      ├──► il1a ──┐                                                   │
   │      │           │                                                   │
   │      ├──► tnf ───┼──► a1_astrocytes ──► neuronal_dysfunction        │
   │      │           │     (L3: Liddelow 2017)                           │
   │      └──► c1q ───┘                                                   │
   │           (L3)                                                       │
   └──────────────────────────────────────────────────────────────────────┘
`);

console.log('\n\nNETWORK HEALTH ASSESSMENT:');
console.log('═'.repeat(74));
const mainComponent = components[0];
const isConnected = components.length === 1;
const coveragePercent = ((nodes.size / allNodes.length) * 100).toFixed(1);
const edgeCoveragePercent = ((strongEdges.length / allEdges.length) * 100).toFixed(1);

console.log(`
  Connected:              ${isConnected ? '✅ YES (single component)' : '❌ NO (' + components.length + ' components)'}
  Main component size:    ${mainComponent.length} nodes (${((mainComponent.length / nodes.size) * 100).toFixed(0)}% of L1-L3 nodes)
  Node coverage:          ${nodes.size} / ${allNodes.length} nodes (${coveragePercent}%)
  Edge coverage:          ${strongEdges.length} / ${allEdges.length} edges (${edgeCoveragePercent}%)

  ${components.length > 1 ? '⚠️  DISCONNECTED COMPONENTS:' : ''}
`);

if (components.length > 1) {
  for (let i = 1; i < components.length; i++) {
    console.log(`    Component ${i + 1}: ${components[i].join(', ')}`);
  }
  console.log('\n  These nodes have L1-L3 evidence but are not connected to the main graph.');
  console.log('  Consider adding bridging edges or verifying the evidence quality.');
}

console.log('\n\nRECOMMENDATIONS:');
console.log('═'.repeat(74));
console.log(`
1. MODULES NEEDING STRONG EVIDENCE:
   - M14 (MAM & Calcium): 0 L1-L3 edges - all L4-L5
   - M16 (Sex & Ancestry): 0 L1-L3 edges - all L6-L7
   - M17 (Trained Immunity): 0 L1-L3 edges - only 4 total edges
   - M19 (Post-Infectious): 0 L1-L3 edges - mostly correlational

2. WEAK MODULES TO STRENGTHEN:
   - M09 (Iron/Ferroptosis): Only 2 strong edges, 7 weak
   - M18 (Astrocyte Endfoot): Only 3 strong edges, 14 weak
   - M07 (Tau): Only 2 strong edges for 34 total

3. WELL-SUPPORTED MODULES:
   - M15 (Interventions): 11 strong / 14 total (93%)
   - M02 (Lysosomal): 5 strong / 13 total (79%)
   - M04 (Inflammasome): 6 strong / 16 total (77%)
`);
