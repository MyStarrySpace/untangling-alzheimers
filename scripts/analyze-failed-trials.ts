/**
 * CLI Script: Analyze Failed AD Trials
 *
 * Reads failed treatment data from Excel and analyzes why they failed
 * based on their position in the mechanistic network.
 *
 * Usage:
 *   npx tsx scripts/analyze-failed-trials.ts
 *   npm run analyze-failures
 */

import * as XLSX from 'xlsx';
import * as path from 'path';
import { allNodes } from '../src/data/mechanisticFramework/nodes';
import { allEdges } from '../src/data/mechanisticFramework/edges';
import { modules } from '../src/data/mechanisticFramework/modules';
import { feedbackLoops } from '../src/data/mechanisticFramework/feedbackLoops';
import { buildAdjacencyLists } from '../src/lib/pathwayCalculation';

// ============================================================================
// CONFIGURATION
// ============================================================================

const EXCEL_PATH = path.join(
  __dirname,
  '../src/data/mechanistic_framework/ad_framework_trial_failure_stress_test_scaleup_v5_with_symptomatic_dimension.xlsx'
);

// ============================================================================
// TYPES
// ============================================================================

interface FailedTrial {
  drugName: string;
  mechanism: string;
  targetNode?: string;
  phase: string;
  year?: number;
  reason?: string;
  population?: string;
  outcome?: string;
  [key: string]: unknown;
}

interface FailureAnalysis {
  trial: FailedTrial;
  matchedNodes: string[];
  matchedModules: string[];
  networkPosition: {
    isUpstream: boolean;
    isDownstream: boolean;
    distanceFromOutcomes: number;
    betweenness: number;
  };
  failureHypotheses: string[];
  suggestedAlternatives: string[];
}

// ============================================================================
// HELPERS
// ============================================================================

const adjacency = buildAdjacencyLists(allNodes, allEdges);
const nodeMap = new Map(allNodes.map(n => [n.id, n]));
const nodeLabelMap = new Map(allNodes.map(n => [n.label.toLowerCase(), n]));

// Keywords to node ID mapping
const keywordToNodes: Record<string, string[]> = {
  'amyloid': ['abeta_oligomers', 'abeta_monomers', 'abeta_plaques', 'abeta_clearance'],
  'beta-amyloid': ['abeta_oligomers', 'abeta_monomers', 'abeta_plaques'],
  'aβ': ['abeta_oligomers', 'abeta_monomers', 'abeta_plaques'],
  'tau': ['tau_hyperphosphorylated', 'tau_misfolded', 'aggregated_tau'],
  'bace': ['bace1_upregulated', 'app_c99'],
  'gamma-secretase': ['abeta_monomers'],
  'secretase': ['abeta_monomers', 'app_c99'],
  'inflammation': ['neuroinflammation', 'nlrp3_active', 'microglia_activated'],
  'nlrp3': ['nlrp3_active'],
  'microglia': ['microglia_activated', 'ldam'],
  'astrocyte': ['a1_astrocytes', 'clasmatodendrosis'],
  'cholinergic': ['ach_reduced', 'cholinergic_degeneration'],
  'acetylcholine': ['ach_reduced'],
  'ache': ['ach_reduced'],
  'nmda': ['neuronal_dysfunction'],
  'glutamate': ['neuronal_dysfunction'],
  'mtor': ['mtorc1_hyperactive'],
  'autophagy': ['autophagy_flux', 'tfeb_phosphorylated'],
  'mitochondria': ['damaged_mito_pool', 'mito_ros', 'mitophagy_rate_reduced'],
  'insulin': ['insulin_resistance'],
  'glp-1': ['insulin_resistance'],
  'gsk-3': ['gsk3b_active'],
  'gsk3': ['gsk3b_active'],
  'kinase': ['gsk3b_active', 'p38_active'],
  'p38': ['p38_active'],
  'nfkb': ['nfkb_active'],
  'nf-kb': ['nfkb_active'],
  'oxidative': ['mito_ros', 'lipid_peroxidation'],
  'antioxidant': ['gpx4_activity', 'glutathione_gsh'],
  'iron': ['labile_iron_pool', 'lysosomal_iron_trap', 'ferroptosis'],
  'ferroptosis': ['ferroptosis'],
  'apoe': ['apoe_genotype', 'apoe4_domain_interaction'],
  'complement': ['c1q', 'c3_opsonization'],
  'synapse': ['synapses', 'synapse_elimination'],
  'synaptic': ['synapses', 'synapse_elimination', 'ltp_inhibition'],
  'bbb': ['bbb_breakdown', 'bbb_integrity'],
  'blood-brain': ['bbb_breakdown', 'bbb_integrity'],
  'glymphatic': ['glymphatic_clearance', 'csf_isf_exchange'],
  'sleep': ['sleep_disruption'],
  'calcium': ['ca_overload', 'er_mito_ca_flux'],
  'lysosome': ['lysosomal_dysfunction', 'lysosome_pool'],
  'lysosomal': ['lysosomal_dysfunction', 'lysosome_pool'],
  'proteasome': ['cargo_accumulation'],
  'antibody': ['abeta_oligomers', 'abeta_clearance'],
  'immunotherapy': ['abeta_oligomers', 'abeta_clearance', 'microglia_activated'],
  'vaccine': ['abeta_oligomers', 'abeta_clearance'],
  'neurotrophin': ['neuronal_dysfunction'],
  'bdnf': ['neuronal_dysfunction'],
  'ngf': ['cholinergic_degeneration'],
  'rage': ['neuroinflammation', 'abeta_oligomers'],
  'ppar': ['neuroinflammation', 'insulin_resistance'],
  'sirt': ['mtorc1_hyperactive'],
  'nad': ['mitophagy_rate_reduced'],
  'senolytic': ['sasp'],
  'senolytics': ['sasp'],
};

function findMatchingNodes(text: string): string[] {
  const lowerText = text.toLowerCase();
  const matches = new Set<string>();

  // Check keyword mappings
  for (const [keyword, nodeIds] of Object.entries(keywordToNodes)) {
    if (lowerText.includes(keyword)) {
      nodeIds.forEach(id => matches.add(id));
    }
  }

  // Check direct node label matches
  for (const [label, node] of nodeLabelMap) {
    if (lowerText.includes(label)) {
      matches.add(node.id);
    }
  }

  return Array.from(matches);
}

function getDistanceToOutcomes(nodeId: string): number {
  const outcomes = ['cognitive_score', 'synapses', 'neuronal_count', 'mortality'];
  let minDistance = Infinity;

  // BFS to find shortest path to any outcome
  const visited = new Set<string>();
  const queue: { node: string; dist: number }[] = [{ node: nodeId, dist: 0 }];

  while (queue.length > 0) {
    const { node, dist } = queue.shift()!;

    if (outcomes.includes(node)) {
      minDistance = Math.min(minDistance, dist);
      continue;
    }

    if (visited.has(node)) continue;
    visited.add(node);

    const neighbors = adjacency.outgoing.get(node) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        queue.push({ node: neighbor, dist: dist + 1 });
      }
    }
  }

  return minDistance === Infinity ? -1 : minDistance;
}

function isUpstreamNode(nodeId: string): boolean {
  // Check if this node is close to input boundaries
  const inputs = allNodes.filter(n => n.boundaryDirection === 'input');
  const inputIds = new Set(inputs.map(n => n.id));

  // Check incoming edges
  const incoming = adjacency.incoming.get(nodeId) || [];
  return incoming.some(n => inputIds.has(n)) || inputIds.has(nodeId);
}

function generateFailureHypotheses(
  trial: FailedTrial,
  matchedNodes: string[],
  matchedModules: string[],
  distanceToOutcome: number
): string[] {
  const hypotheses: string[] = [];

  // No network match
  if (matchedNodes.length === 0) {
    hypotheses.push('Target mechanism not well-represented in current disease models');
    hypotheses.push('May target a pathway not causally linked to AD');
    return hypotheses;
  }

  // Distance-based hypotheses
  if (distanceToOutcome > 5) {
    hypotheses.push(`Target is ${distanceToOutcome} steps from clinical outcomes - effect may be diluted through cascade`);
  }

  if (distanceToOutcome === -1) {
    hypotheses.push('Target has no clear path to clinical outcomes in the network');
  }

  // Module-based hypotheses
  const amyloidModules = ['M06'];
  const inflammationModules = ['M04', 'M05'];
  const metabolicModules = ['M01', 'M02', 'M03'];

  if (matchedModules.some(m => amyloidModules.includes(m))) {
    hypotheses.push('Amyloid-targeting: May be too downstream - amyloid could be consequence, not cause');
    hypotheses.push('Amyloid clearance alone may not halt established pathology');
  }

  if (matchedModules.some(m => inflammationModules.includes(m)) && matchedModules.length === 1) {
    hypotheses.push('Single inflammation target: Multiple inflammatory pathways may compensate');
  }

  // Check if target breaks any feedback loops
  // Derive nodes from edge IDs in each loop
  const nodeInLoop = feedbackLoops.some(loop => {
    const loopNodes = new Set<string>();
    loop.edgeIds.forEach(edgeId => {
      const edge = allEdges.find(e => e.id === edgeId);
      if (edge) {
        loopNodes.add(edge.source);
        loopNodes.add(edge.target);
      }
    });
    return matchedNodes.some(n => loopNodes.has(n));
  });

  if (!nodeInLoop) {
    hypotheses.push('Target does not interrupt any feedback loops - pathology may regenerate');
  }

  // Phase-based hypotheses
  if (trial.phase?.includes('3') || trial.phase?.includes('III')) {
    hypotheses.push('Phase 3 failure suggests efficacy seen in Phase 2 did not translate to broader population');
  }

  // Population-based hypotheses
  const pop = (trial.population || '').toLowerCase();
  if (pop.includes('mild') || pop.includes('moderate') || pop.includes('dementia')) {
    hypotheses.push('Treatment may have been tested too late in disease progression');
  }

  if (pop.includes('prodromal') || pop.includes('early')) {
    hypotheses.push('Even early intervention may miss the optimal prevention window');
  }

  return hypotheses;
}

function suggestAlternatives(matchedNodes: string[], matchedModules: string[]): string[] {
  const suggestions: string[] = [];

  // If targeting amyloid, suggest upstream
  if (matchedModules.includes('M06')) {
    suggestions.push('Consider targeting upstream: mTOR/autophagy (M01), lysosomal function (M02)');
    suggestions.push('Consider combination with loop-breaking treatment (e.g., NLRP3 inhibitor)');
  }

  // If single target, suggest multi-target
  if (matchedNodes.length === 1) {
    suggestions.push('Single-target approach may be insufficient - consider multi-target compounds');
  }

  // If no loop involvement, suggest loop-breakers
  // Derive loop nodes from edge IDs
  const loopNodes = new Set<string>();
  feedbackLoops.forEach(loop => {
    loop.edgeIds.forEach(edgeId => {
      const edge = allEdges.find(e => e.id === edgeId);
      if (edge) {
        loopNodes.add(edge.source);
        loopNodes.add(edge.target);
      }
    });
  });
  if (!matchedNodes.some(n => loopNodes.has(n))) {
    suggestions.push('Consider adding treatment that breaks feedback loops (e.g., Colchicine, Semaglutide)');
  }

  // Timing suggestions
  suggestions.push('Consider earlier intervention (prevention trials in at-risk populations)');

  return suggestions;
}

// ============================================================================
// MAIN
// ============================================================================

console.log('');
console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     FAILED AD TRIALS ANALYSIS                                  ║');
console.log('║     Understanding Why Treatments Failed Using Network Analysis ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');

// Read Excel file
console.log(`Reading: ${EXCEL_PATH}`);
console.log('');

let workbook: XLSX.WorkBook;
try {
  workbook = XLSX.readFile(EXCEL_PATH);
} catch (error) {
  console.error(`Error reading Excel file: ${error}`);
  process.exit(1);
}

console.log(`Sheets found: ${workbook.SheetNames.join(', ')}`);
console.log('');

// Process each sheet
const allTrials: FailedTrial[] = [];
const analyses: FailureAnalysis[] = [];

workbook.SheetNames.forEach(sheetName => {
  console.log(`════════════════════════════════════════════════════════════════`);
  console.log(`SHEET: ${sheetName}`);
  console.log(`════════════════════════════════════════════════════════════════`);
  console.log('');

  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet) as Record<string, unknown>[];

  if (data.length === 0) {
    console.log('  (empty sheet)');
    console.log('');
    return;
  }

  // Show column headers
  const headers = Object.keys(data[0]);
  console.log(`Columns: ${headers.join(', ')}`);
  console.log(`Rows: ${data.length}`);
  console.log('');

  // Sample first few rows
  console.log('Sample data:');
  data.slice(0, 3).forEach((row, i) => {
    console.log(`  Row ${i + 1}: ${JSON.stringify(row).slice(0, 150)}...`);
  });
  console.log('');

  // Convert to FailedTrial format
  data.forEach(row => {
    // Try to find drug name column - handle specific Cases_v2 format
    const drugName = String(
      row['Program'] || row['Drug'] || row['drug'] || row['Drug Name'] || row['drug_name'] ||
      row['Treatment'] || row['treatment'] || row['Compound'] || row['compound'] ||
      row['Name'] || row['name'] || row['Agent'] || row['agent'] || ''
    );

    // Try to find mechanism column - handle specific Cases_v2 format
    const mechanism = String(
      row['Class / target'] || row['Class/target'] ||
      row['Mechanism'] || row['mechanism'] || row['MOA'] || row['moa'] ||
      row['Mechanism of Action'] || row['mechanism_of_action'] ||
      row['Target'] || row['target'] || row['Primary Target'] || ''
    );

    // Try to find phase column
    const phase = String(
      row['Phase'] || row['phase'] || row['Trial Phase'] || row['trial_phase'] ||
      row['Stage'] || row['stage'] || ''
    );

    // Try to find reason column - handle specific Cases_v2 format
    const reason = String(
      row['Primary failure mode'] || row['Framework red flags (from DAG logic)'] ||
      row['Observed outcome'] ||
      row['Reason'] || row['reason'] || row['Failure Reason'] || row['failure_reason'] ||
      row['Outcome'] || row['outcome'] || row['Result'] || row['result'] || ''
    );

    // Try to find population column - handle specific Cases_v2 format
    const population = String(
      row['Pivotal population'] ||
      row['Population'] || row['population'] || row['Patients'] || row['patients'] ||
      row['Stage'] || row['Disease Stage'] || ''
    );

    // Check if this is a failure (Outcome label = 1)
    const isFailure = row['Outcome label (1=fail, 0=success)'] === 1 ||
                      row['Outcome label (1=fail, 0=success)'] === '1';

    if (drugName && drugName !== 'undefined' && drugName !== '' && sheetName === 'Cases_v2') {
      allTrials.push({
        drugName,
        mechanism,
        phase,
        reason,
        population,
        isFailure,
        ...row,
      });
    } else if (drugName && drugName !== 'undefined' && drugName !== '') {
      allTrials.push({
        drugName,
        mechanism,
        phase,
        reason,
        population,
        ...row,
      });
    }
  });
});

console.log('');
console.log(`Total trials extracted: ${allTrials.length}`);
console.log('');

// ============================================================================
// ANALYZE EACH TRIAL
// ============================================================================

console.log('════════════════════════════════════════════════════════════════');
console.log('NETWORK-BASED FAILURE ANALYSIS');
console.log('════════════════════════════════════════════════════════════════');
console.log('');

allTrials.forEach((trial, index) => {
  // Find matching nodes based on mechanism
  const searchText = `${trial.drugName} ${trial.mechanism} ${trial.reason || ''}`;
  const matchedNodes = findMatchingNodes(searchText);

  // Find matched modules
  const matchedModules = [...new Set(
    matchedNodes
      .map(id => nodeMap.get(id)?.moduleId)
      .filter((m): m is string => m !== undefined)
  )];

  // Calculate network position
  const avgDistance = matchedNodes.length > 0
    ? matchedNodes.reduce((sum, n) => sum + getDistanceToOutcomes(n), 0) / matchedNodes.length
    : -1;

  const isUpstream = matchedNodes.some(n => isUpstreamNode(n));

  // Generate hypotheses
  const hypotheses = generateFailureHypotheses(trial, matchedNodes, matchedModules, avgDistance);
  const alternatives = suggestAlternatives(matchedNodes, matchedModules);

  const analysis: FailureAnalysis = {
    trial,
    matchedNodes,
    matchedModules,
    networkPosition: {
      isUpstream,
      isDownstream: avgDistance <= 3 && avgDistance >= 0,
      distanceFromOutcomes: avgDistance,
      betweenness: 0, // Would need to compute
    },
    failureHypotheses: hypotheses,
    suggestedAlternatives: alternatives,
  };

  analyses.push(analysis);
});

// ============================================================================
// DETAILED ANALYSIS OUTPUT
// ============================================================================

// Sort by number of matched nodes (most interesting first)
const sortedAnalyses = [...analyses].sort((a, b) =>
  b.matchedNodes.length - a.matchedNodes.length
);

console.log('DETAILED TRIAL ANALYSES (Top 20):');
console.log('');

sortedAnalyses.slice(0, 20).forEach((analysis, i) => {
  const { trial, matchedNodes, matchedModules, networkPosition, failureHypotheses } = analysis;

  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`${i + 1}. ${trial.drugName.toUpperCase()}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

  if (trial.mechanism) console.log(`   Mechanism: ${trial.mechanism}`);
  if (trial.phase) console.log(`   Phase: ${trial.phase}`);
  if (trial.population) console.log(`   Population: ${trial.population}`);
  if (trial.reason) console.log(`   Outcome: ${trial.reason}`);
  console.log('');

  console.log('   Network Mapping:');
  if (matchedNodes.length > 0) {
    const nodeLabels = matchedNodes.map(id => nodeMap.get(id)?.label || id).slice(0, 5);
    console.log(`     Matched Nodes: ${nodeLabels.join(', ')}${matchedNodes.length > 5 ? '...' : ''}`);
    console.log(`     Modules: ${matchedModules.join(', ')}`);
    console.log(`     Distance to Outcomes: ${networkPosition.distanceFromOutcomes >= 0 ? networkPosition.distanceFromOutcomes.toFixed(1) + ' steps' : 'No path found'}`);
    console.log(`     Position: ${networkPosition.isUpstream ? 'Upstream' : 'Downstream'}`);
  } else {
    console.log('     No direct network mapping found');
  }
  console.log('');

  console.log('   Why It May Have Failed:');
  failureHypotheses.forEach(h => console.log(`     • ${h}`));
  console.log('');
});

// ============================================================================
// AGGREGATE STATISTICS
// ============================================================================

console.log('════════════════════════════════════════════════════════════════');
console.log('AGGREGATE FAILURE PATTERNS');
console.log('════════════════════════════════════════════════════════════════');
console.log('');

// Count by module
const moduleFailureCounts = new Map<string, number>();
analyses.forEach(a => {
  a.matchedModules.forEach(m => {
    moduleFailureCounts.set(m, (moduleFailureCounts.get(m) || 0) + 1);
  });
});

const sortedModules = [...moduleFailureCounts.entries()]
  .sort((a, b) => b[1] - a[1]);

console.log('Failures by Target Module:');
sortedModules.forEach(([moduleId, count]) => {
  const mod = modules.find(m => m.id === moduleId);
  const bar = '█'.repeat(Math.min(count, 30));
  console.log(`  ${(mod?.shortName || moduleId).padEnd(20)} ${bar} ${count}`);
});
console.log('');

// Count by mechanism keyword
const mechanismCounts = new Map<string, number>();
analyses.forEach(a => {
  const mech = a.trial.mechanism?.toLowerCase() || '';
  for (const keyword of Object.keys(keywordToNodes)) {
    if (mech.includes(keyword)) {
      mechanismCounts.set(keyword, (mechanismCounts.get(keyword) || 0) + 1);
    }
  }
});

const sortedMechanisms = [...mechanismCounts.entries()]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 15);

console.log('Most Common Failed Mechanisms:');
sortedMechanisms.forEach(([mech, count]) => {
  const bar = '█'.repeat(Math.min(count, 30));
  console.log(`  ${mech.padEnd(20)} ${bar} ${count}`);
});
console.log('');

// Distance distribution
const distanceGroups = {
  'No path': 0,
  '1-2 steps (very downstream)': 0,
  '3-4 steps': 0,
  '5-6 steps': 0,
  '7+ steps (upstream)': 0,
};

analyses.forEach(a => {
  const d = a.networkPosition.distanceFromOutcomes;
  if (d < 0) distanceGroups['No path']++;
  else if (d <= 2) distanceGroups['1-2 steps (very downstream)']++;
  else if (d <= 4) distanceGroups['3-4 steps']++;
  else if (d <= 6) distanceGroups['5-6 steps']++;
  else distanceGroups['7+ steps (upstream)']++;
});

console.log('Distance to Clinical Outcomes:');
Object.entries(distanceGroups).forEach(([group, count]) => {
  const bar = '█'.repeat(Math.min(count, 30));
  console.log(`  ${group.padEnd(30)} ${bar} ${count}`);
});
console.log('');

// ============================================================================
// KEY INSIGHTS
// ============================================================================

console.log('════════════════════════════════════════════════════════════════');
console.log('KEY INSIGHTS FROM FAILED TRIALS');
console.log('════════════════════════════════════════════════════════════════');
console.log('');

// Find most failed module
const topFailedModule = sortedModules[0];
if (topFailedModule) {
  const mod = modules.find(m => m.id === topFailedModule[0]);
  console.log(`1. MOST FAILED MODULE: ${mod?.name || topFailedModule[0]}`);
  console.log(`   ${topFailedModule[1]} trials targeted this module and failed.`);
  console.log(`   This suggests either:`);
  console.log(`   - The module is not causally central to AD`);
  console.log(`   - Targeting single nodes in this module is insufficient`);
  console.log(`   - Compensatory mechanisms negate the intervention`);
  console.log('');
}

// Count trials with no loop involvement
// Derive all loop nodes from edge IDs
const allLoopNodes = new Set<string>();
feedbackLoops.forEach(loop => {
  loop.edgeIds.forEach(edgeId => {
    const edge = allEdges.find(e => e.id === edgeId);
    if (edge) {
      allLoopNodes.add(edge.source);
      allLoopNodes.add(edge.target);
    }
  });
});
const noLoopTrials = analyses.filter(a => {
  return !a.matchedNodes.some(n => allLoopNodes.has(n));
}).length;

console.log(`2. FEEDBACK LOOP ANALYSIS`);
console.log(`   ${noLoopTrials}/${analyses.length} failed trials targeted nodes OUTSIDE feedback loops.`);
console.log(`   This is ${((noLoopTrials / analyses.length) * 100).toFixed(0)}% of failures.`);
console.log(`   Implication: Treatments that don't break vicious cycles may fail because`);
console.log(`   pathology regenerates through intact loops.`);
console.log('');

// Upstream vs downstream
const upstreamFailures = analyses.filter(a => a.networkPosition.isUpstream).length;
const downstreamFailures = analyses.filter(a => a.networkPosition.isDownstream).length;

console.log(`3. NETWORK POSITION`);
console.log(`   Upstream failures: ${upstreamFailures}`);
console.log(`   Downstream failures: ${downstreamFailures}`);
if (downstreamFailures > upstreamFailures) {
  console.log(`   Most failures targeted downstream nodes - treating consequences, not causes.`);
} else {
  console.log(`   Failures distributed across network positions.`);
}
console.log('');

// Amyloid-specific analysis
const amyloidFailures = analyses.filter(a =>
  a.matchedModules.includes('M06') ||
  a.trial.mechanism?.toLowerCase().includes('amyloid') ||
  a.trial.mechanism?.toLowerCase().includes('aβ')
).length;

console.log(`4. AMYLOID HYPOTHESIS STRESS TEST`);
console.log(`   ${amyloidFailures} trials targeted amyloid-related mechanisms.`);
console.log(`   This represents ${((amyloidFailures / analyses.length) * 100).toFixed(0)}% of all failed trials.`);
if (amyloidFailures > analyses.length * 0.3) {
  console.log(`   FINDING: Heavy investment in amyloid hypothesis has not yielded success.`);
  console.log(`   Network analysis suggests amyloid may be downstream of true causes.`);
}
console.log('');

console.log('════════════════════════════════════════════════════════════════');
console.log('RECOMMENDATIONS BASED ON FAILURE ANALYSIS');
console.log('════════════════════════════════════════════════════════════════');
console.log('');
console.log('1. TARGET FEEDBACK LOOPS: Treatments should break vicious cycles,');
console.log('   not just modulate individual nodes.');
console.log('');
console.log('2. GO UPSTREAM: Target metabolic/autophagy pathways (M01-M03)');
console.log('   rather than downstream pathology (amyloid, tau).');
console.log('');
console.log('3. MULTI-TARGET APPROACH: Single-target drugs have failed repeatedly.');
console.log('   Consider combinations or pleiotropic compounds.');
console.log('');
console.log('4. EARLIER INTERVENTION: Most trials tested in symptomatic patients.');
console.log('   Prevention trials in at-risk populations may succeed.');
console.log('');
console.log('5. RECONSIDER ENDPOINTS: Amyloid clearance ≠ cognitive improvement.');
console.log('   Use biomarkers closer to clinical outcomes.');
console.log('');

console.log('════════════════════════════════════════════════════════════════');
console.log('ANALYSIS COMPLETE');
console.log('════════════════════════════════════════════════════════════════');
