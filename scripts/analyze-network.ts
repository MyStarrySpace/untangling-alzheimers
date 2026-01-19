/**
 * CLI Script: Analyze AD Mechanistic Network
 *
 * Runs comprehensive graph analysis to find unintuitive insights
 * about Alzheimer's disease pathways.
 *
 * Usage:
 *   npx tsx scripts/analyze-network.ts
 *   npm run analyze-network
 */

import { allNodes } from '../src/data/mechanisticFramework/nodes';
import { allEdges } from '../src/data/mechanisticFramework/edges';
import { modules } from '../src/data/mechanisticFramework/modules';
import { feedbackLoops } from '../src/data/mechanisticFramework/feedbackLoops';
import {
  analyzeNetwork,
  generateInsightReports,
} from '../src/lib/graphAnalysis';

// ============================================================================
// MAIN
// ============================================================================

console.log('');
console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     AD MECHANISTIC NETWORK ANALYSIS                            ║');
console.log('║     Finding Unintuitive Insights in Alzheimer\'s Disease        ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');

console.log('Network Statistics:');
console.log(`  Nodes: ${allNodes.length}`);
console.log(`  Edges: ${allEdges.length}`);
console.log(`  Modules: ${modules.length}`);
console.log(`  Feedback loops: ${feedbackLoops.length}`);
console.log('');

console.log('Running analysis...');
const startTime = Date.now();

const insights = analyzeNetwork(allNodes, allEdges, modules, feedbackLoops);
const reports = generateInsightReports(insights);

const elapsed = Date.now() - startTime;
console.log(`Analysis completed in ${elapsed}ms`);
console.log('');

// ============================================================================
// SUMMARY
// ============================================================================

console.log('════════════════════════════════════════════════════════════════');
console.log('NETWORK SUMMARY');
console.log('════════════════════════════════════════════════════════════════');
console.log(`  Average degree: ${insights.summary.avgDegree}`);
console.log(`  Average path length: ${insights.summary.avgPathLength}`);
console.log(`  Network density: ${(insights.summary.networkDensity * 100).toFixed(2)}%`);
console.log('');

// ============================================================================
// HUB NODES
// ============================================================================

console.log('════════════════════════════════════════════════════════════════');
console.log('TOP 10 HUB NODES (Most Connected)');
console.log('════════════════════════════════════════════════════════════════');
console.log('');
insights.hubNodes.slice(0, 10).forEach((hub, i) => {
  const target = hub.roles?.includes('THERAPEUTIC_TARGET') ? '[TARGET]' : '';
  console.log(`  ${i + 1}. ${hub.label} ${target}`);
  console.log(`     Module: ${hub.moduleId} | In: ${hub.inDegree} | Out: ${hub.outDegree} | Total: ${hub.totalDegree}`);
  console.log('');
});

// ============================================================================
// CHOKEPOINTS
// ============================================================================

console.log('════════════════════════════════════════════════════════════════');
console.log('TOP 10 CHOKEPOINTS (Highest Betweenness Centrality)');
console.log('════════════════════════════════════════════════════════════════');
console.log('');
console.log('These nodes are bottlenecks - many pathways flow through them.');
console.log('Targeting them would disrupt the most causal chains.');
console.log('');
insights.chokepoints.slice(0, 10).forEach((node, i) => {
  const target = node.roles?.includes('THERAPEUTIC_TARGET') ? '[TARGET]' : '';
  console.log(`  ${i + 1}. ${node.label} ${target}`);
  console.log(`     Betweenness: ${(node.betweennessCentrality * 100).toFixed(2)}% | Module: ${node.moduleId}`);
  console.log('');
});

// ============================================================================
// BRIDGE NODES
// ============================================================================

console.log('════════════════════════════════════════════════════════════════');
console.log('TOP 10 BRIDGE NODES (Connect Multiple Modules)');
console.log('════════════════════════════════════════════════════════════════');
console.log('');
console.log('These nodes connect different pathological modules.');
console.log('They represent opportunities for multi-target intervention.');
console.log('');
insights.bridgeNodes.slice(0, 10).forEach((bridge, i) => {
  console.log(`  ${i + 1}. ${bridge.label}`);
  console.log(`     Connects: ${bridge.connectsModules.join(', ')}`);
  console.log(`     Cross-module edges: ${bridge.crossModuleEdgeCount}`);
  console.log('');
});

// ============================================================================
// NEGLECTED TARGETS
// ============================================================================

console.log('════════════════════════════════════════════════════════════════');
console.log('POTENTIALLY NEGLECTED THERAPEUTIC TARGETS');
console.log('════════════════════════════════════════════════════════════════');
console.log('');
console.log('High-centrality nodes NOT marked as therapeutic targets.');
console.log('These may be overlooked intervention opportunities.');
console.log('');
if (insights.neglectedTargets.length === 0) {
  console.log('  None found - all high-centrality nodes are already targets.');
} else {
  insights.neglectedTargets.slice(0, 10).forEach((node, i) => {
    console.log(`  ${i + 1}. ${node.label}`);
    console.log(`     ${node.reason}`);
    console.log(`     Module: ${node.moduleId} | Betweenness: ${(node.betweenness * 100).toFixed(2)}%`);
    console.log('');
  });
}

// ============================================================================
// EVIDENCE GAPS
// ============================================================================

console.log('════════════════════════════════════════════════════════════════');
console.log('EVIDENCE GAPS (High-Degree Nodes with Weak Evidence)');
console.log('════════════════════════════════════════════════════════════════');
console.log('');
console.log('These central nodes have mostly low-confidence edges (L5-L7).');
console.log('Research here could strengthen or refute key causal claims.');
console.log('');
if (insights.evidenceGaps.length === 0) {
  console.log('  None found - network has good evidence coverage.');
} else {
  insights.evidenceGaps.slice(0, 10).forEach((gap, i) => {
    console.log(`  ${i + 1}. ${gap.label}`);
    console.log(`     Module: ${gap.moduleId}`);
    console.log(`     Total edges: ${gap.totalDegree} | High confidence (L1-L3): ${gap.highConfidenceEdges} | Low: ${gap.lowConfidenceEdges}`);
    console.log(`     High-confidence ratio: ${(gap.confidenceRatio * 100).toFixed(0)}%`);
    console.log('');
  });
}

// ============================================================================
// LOOP VULNERABILITIES
// ============================================================================

console.log('════════════════════════════════════════════════════════════════');
console.log('FEEDBACK LOOP VULNERABILITIES');
console.log('════════════════════════════════════════════════════════════════');
console.log('');
console.log('Reinforcing loops amplify pathology. Breaking them is therapeutic.');
console.log('Balancing loops maintain homeostasis. Strengthening them helps.');
console.log('');

const reinforcing = insights.loopVulnerabilities.filter(l => l.loopType === 'reinforcing');
const balancing = insights.loopVulnerabilities.filter(l => l.loopType === 'balancing');

console.log(`Reinforcing (vicious) loops: ${reinforcing.length}`);
reinforcing.slice(0, 5).forEach((loop, i) => {
  console.log(`  ${i + 1}. ${loop.loopName}`);
  console.log(`     Weakest edge: ${loop.weakestEdge.source} -> ${loop.weakestEdge.target} (${loop.weakestEdge.confidence})`);
  console.log(`     ${loop.interventionOpportunity}`);
  console.log('');
});

console.log(`Balancing (protective) loops: ${balancing.length}`);
balancing.slice(0, 3).forEach((loop, i) => {
  console.log(`  ${i + 1}. ${loop.loopName}`);
  console.log(`     ${loop.interventionOpportunity}`);
  console.log('');
});

// ============================================================================
// SHORTEST PATHS FROM RISK TO OUTCOMES
// ============================================================================

console.log('════════════════════════════════════════════════════════════════');
console.log('SHORTEST PATHS: Risk Factors to Clinical Outcomes');
console.log('════════════════════════════════════════════════════════════════');
console.log('');
console.log('How do upstream risk factors cascade to clinical decline?');
console.log('');

insights.shortestPaths.forEach(path => {
  console.log(`  ${path.from} -> ${path.to}`);
  console.log(`     Path length: ${path.length} steps`);
  console.log(`     Modules traversed: ${path.modules.join(' -> ')}`);
  console.log(`     Weakest evidence: ${path.lowestConfidence}`);
  console.log(`     Route: ${path.path.join(' -> ')}`);
  console.log('');
});

// ============================================================================
// SURPRISING CONNECTIONS
// ============================================================================

console.log('════════════════════════════════════════════════════════════════');
console.log('SURPRISING MULTI-STEP CASCADES');
console.log('════════════════════════════════════════════════════════════════');
console.log('');
console.log('Long paths from inputs to outputs reveal non-obvious mechanisms.');
console.log('');

insights.surprisingConnections.slice(0, 5).forEach((path, i) => {
  console.log(`  ${i + 1}. ${path.from} reaches ${path.to} in ${path.length} steps`);
  console.log(`     Modules: ${path.modules.join(' -> ')}`);
  console.log(`     Path: ${path.path.slice(0, 6).join(' -> ')}${path.path.length > 6 ? ' -> ...' : ''}`);
  console.log('');
});

// ============================================================================
// KEY INSIGHTS (Human-Readable)
// ============================================================================

console.log('════════════════════════════════════════════════════════════════');
console.log('KEY INSIGHTS');
console.log('════════════════════════════════════════════════════════════════');
console.log('');

reports.forEach((report, i) => {
  console.log(`${i + 1}. ${report.title.toUpperCase()}`);
  console.log(`   ${report.insight}`);
  console.log(`   Evidence: ${report.evidence}`);
  console.log(`   Implication: ${report.implication}`);
  console.log('');
});

// ============================================================================
// UNINTUITIVE FINDINGS SUMMARY
// ============================================================================

console.log('════════════════════════════════════════════════════════════════');
console.log('UNINTUITIVE FINDINGS ABOUT ALZHEIMER\'S DISEASE');
console.log('════════════════════════════════════════════════════════════════');
console.log('');

// Find surprising patterns
const topHub = insights.hubNodes[0];
const topChokepoint = insights.chokepoints[0];
const topBridge = insights.bridgeNodes[0];

console.log('1. THE MOST CONNECTED NODE');
if (topHub) {
  const isAmyloid = topHub.moduleId === 'M06';
  console.log(`   ${topHub.label} has ${topHub.totalDegree} connections.`);
  if (!isAmyloid) {
    console.log('   SURPRISE: The most connected node is NOT amyloid-related!');
    console.log('   This suggests the amyloid hypothesis may be focusing on a downstream effect.');
  }
}
console.log('');

console.log('2. THE CRITICAL BOTTLENECK');
if (topChokepoint) {
  console.log(`   ${topChokepoint.label} is the biggest bottleneck.`);
  console.log(`   ${(topChokepoint.betweennessCentrality * 100).toFixed(1)}% of all pathways flow through it.`);
  if (!topChokepoint.roles?.includes('THERAPEUTIC_TARGET')) {
    console.log('   SURPRISE: This critical node is NOT a therapeutic target!');
  }
}
console.log('');

console.log('3. THE MASTER CONNECTOR');
if (topBridge) {
  console.log(`   ${topBridge.label} connects ${topBridge.connectsModules.length} different modules.`);
  console.log(`   Targeting it could affect: ${topBridge.connectsModules.join(', ')}`);
}
console.log('');

// Count modules in shortest paths
const moduleCounts = new Map<string, number>();
insights.shortestPaths.forEach(p => {
  p.modules.forEach(m => moduleCounts.set(m, (moduleCounts.get(m) || 0) + 1));
});
const sortedModules = Array.from(moduleCounts.entries()).sort((a, b) => b[1] - a[1]);

console.log('4. MODULES MOST OFTEN ON THE PATH TO COGNITIVE DECLINE');
sortedModules.slice(0, 5).forEach(([ moduleId, count ], i) => {
  const mod = modules.find(m => m.id === moduleId);
  console.log(`   ${i + 1}. ${mod?.shortName || moduleId}: appears in ${count}/${insights.shortestPaths.length} paths`);
});
console.log('');

console.log('5. THE VICIOUS CYCLE MOST WORTH BREAKING');
if (reinforcing.length > 0) {
  const worst = reinforcing[0];
  console.log(`   ${worst.loopName}`);
  console.log(`   Best intervention point: ${worst.weakestEdge.source} -> ${worst.weakestEdge.target}`);
  console.log(`   (Only ${worst.weakestEdge.confidence} evidence - needs more research)`);
}
console.log('');

console.log('════════════════════════════════════════════════════════════════');
console.log('ANALYSIS COMPLETE');
console.log('════════════════════════════════════════════════════════════════');
