/**
 * CLI Script: Simulate Treatments on AD Network
 *
 * Simulates the effects of various treatments on the mechanistic network,
 * showing pathway disruption, feedback loop effects, and predicted outcomes.
 *
 * Usage:
 *   npx tsx scripts/simulate-treatments.ts
 *   npm run simulate-treatments
 */

import { allNodes } from '../src/data/mechanisticFramework/nodes';
import { allEdges } from '../src/data/mechanisticFramework/edges';
import { modules } from '../src/data/mechanisticFramework/modules';
import { feedbackLoops } from '../src/data/mechanisticFramework/feedbackLoops';
import {
  treatmentLibrary,
  type TreatmentLibraryEntry,
  type TreatmentPathwayConfig,
} from '../src/data/mechanisticFramework/drugLibrary';
import {
  calculateDrugPathway,
  getPathwayStats,
  buildAdjacencyLists,
} from '../src/lib/pathwayCalculation';

// ============================================================================
// TYPES
// ============================================================================

interface TreatmentSimulation {
  treatment: TreatmentLibraryEntry;
  pathway: TreatmentPathwayConfig;
  stats: ReturnType<typeof getPathwayStats>;
  clinicalOutcomesAffected: string[];
  pathwaysToOutcomes: Map<string, string[]>;
  networkCoverage: number;
  loopBreakScore: number;
  combinedScore: number;
}

interface CombinationSimulation {
  treatments: TreatmentLibraryEntry[];
  combinedNodes: Set<string>;
  combinedModules: Set<string>;
  uniqueLoopsAffected: Set<string>;
  synergyScore: number;
  coverageIncrease: number;
}

// ============================================================================
// HELPERS
// ============================================================================

const CLINICAL_OUTCOMES = [
  'cognitive_score',
  'synapses',
  'neuronal_count',
  'mortality',
  'brain_volume',
];

const nodeMap = new Map(allNodes.map(n => [n.id, n]));
const adjacency = buildAdjacencyLists(allNodes, allEdges);

/**
 * Find if a treatment's downstream nodes can reach clinical outcomes
 */
function findPathsToOutcomes(downstreamNodes: string[]): Map<string, string[]> {
  const paths = new Map<string, string[]>();

  for (const outcome of CLINICAL_OUTCOMES) {
    // BFS from downstream nodes to outcome
    for (const start of downstreamNodes) {
      const visited = new Set<string>();
      const queue: { node: string; path: string[] }[] = [{ node: start, path: [start] }];

      while (queue.length > 0) {
        const { node, path } = queue.shift()!;

        if (node === outcome) {
          if (!paths.has(outcome) || path.length < paths.get(outcome)!.length) {
            paths.set(outcome, path);
          }
          break;
        }

        if (visited.has(node)) continue;
        visited.add(node);

        const neighbors = adjacency.outgoing.get(node) || [];
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            queue.push({ node: neighbor, path: [...path, neighbor] });
          }
        }
      }
    }
  }

  return paths;
}

/**
 * Calculate a treatment's impact score
 */
function calculateImpactScore(sim: Omit<TreatmentSimulation, 'combinedScore'>): number {
  // Weights for different factors
  const LOOP_BREAK_WEIGHT = 3;
  const COVERAGE_WEIGHT = 2;
  const OUTCOME_WEIGHT = 2;
  const MODULE_WEIGHT = 1;

  const loopScore = sim.stats.loopsBreaking * LOOP_BREAK_WEIGHT;
  const coverageScore = sim.networkCoverage * 100 * COVERAGE_WEIGHT;
  const outcomeScore = sim.clinicalOutcomesAffected.length * OUTCOME_WEIGHT;
  const moduleScore = sim.pathway.affectedModules.length * MODULE_WEIGHT;

  return loopScore + coverageScore + outcomeScore + moduleScore;
}

/**
 * Simulate a single treatment
 */
function simulateTreatment(treatment: TreatmentLibraryEntry): TreatmentSimulation {
  const pathway = calculateDrugPathway(treatment, allNodes, allEdges, feedbackLoops, 5);
  const stats = getPathwayStats(pathway);

  // Find paths to clinical outcomes
  const pathsToOutcomes = findPathsToOutcomes(pathway.downstreamNodes);
  const clinicalOutcomesAffected = Array.from(pathsToOutcomes.keys());

  // Calculate network coverage
  const totalNodesAffected = pathway.upstreamNodes.length + pathway.targetNodes.length + pathway.downstreamNodes.length;
  const networkCoverage = totalNodesAffected / allNodes.length;

  // Loop break score
  const loopBreakScore = pathway.relevantLoops.filter(l => l.involvement === 'breaks').length;

  const partialSim = {
    treatment,
    pathway,
    stats,
    clinicalOutcomesAffected,
    pathwaysToOutcomes: pathsToOutcomes,
    networkCoverage,
    loopBreakScore,
  };

  return {
    ...partialSim,
    combinedScore: calculateImpactScore(partialSim),
  };
}

/**
 * Simulate treatment combinations
 */
function simulateCombination(treatments: TreatmentLibraryEntry[]): CombinationSimulation {
  const combinedNodes = new Set<string>();
  const combinedModules = new Set<string>();
  const uniqueLoopsAffected = new Set<string>();

  let totalIndividualNodes = 0;

  for (const treatment of treatments) {
    const pathway = calculateDrugPathway(treatment, allNodes, allEdges, feedbackLoops, 5);

    pathway.upstreamNodes.forEach(n => combinedNodes.add(n));
    pathway.targetNodes.forEach(n => combinedNodes.add(n));
    pathway.downstreamNodes.forEach(n => combinedNodes.add(n));
    pathway.affectedModules.forEach(m => combinedModules.add(m));
    pathway.relevantLoops.forEach(l => uniqueLoopsAffected.add(l.loopId));

    totalIndividualNodes += pathway.upstreamNodes.length + pathway.targetNodes.length + pathway.downstreamNodes.length;
  }

  // Synergy = how much overlap (negative) vs unique coverage (positive)
  const overlap = totalIndividualNodes - combinedNodes.size;
  const overlapRatio = overlap / totalIndividualNodes;
  const synergyScore = (1 - overlapRatio) * combinedNodes.size / allNodes.length;

  // How much more coverage does combination provide?
  const avgIndividualCoverage = totalIndividualNodes / treatments.length / allNodes.length;
  const combinedCoverage = combinedNodes.size / allNodes.length;
  const coverageIncrease = combinedCoverage / avgIndividualCoverage;

  return {
    treatments,
    combinedNodes,
    combinedModules,
    uniqueLoopsAffected,
    synergyScore,
    coverageIncrease,
  };
}

// ============================================================================
// MAIN
// ============================================================================

console.log('');
console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     TREATMENT SIMULATION ENGINE                                ║');
console.log('║     Predicting Effects on Alzheimer\'s Disease Network          ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');

console.log(`Simulating ${treatmentLibrary.length} treatments...`);
console.log('');

// Simulate all treatments
const simulations: TreatmentSimulation[] = treatmentLibrary.map(t => simulateTreatment(t));

// Sort by combined score
simulations.sort((a, b) => b.combinedScore - a.combinedScore);

// ============================================================================
// INDIVIDUAL TREATMENT RANKINGS
// ============================================================================

console.log('════════════════════════════════════════════════════════════════');
console.log('TREATMENT RANKINGS BY NETWORK IMPACT');
console.log('════════════════════════════════════════════════════════════════');
console.log('');

simulations.forEach((sim, i) => {
  const status = sim.treatment.fdaStatus === 'approved' ? '[APPROVED]' :
                 sim.treatment.fdaStatus === 'phase3' ? '[Phase 3]' :
                 sim.treatment.fdaStatus === 'phase2' ? '[Phase 2]' :
                 `[${sim.treatment.fdaStatus}]`;

  console.log(`${i + 1}. ${sim.treatment.name} ${status}`);
  console.log(`   Impact Score: ${sim.combinedScore.toFixed(1)}`);
  console.log(`   Network Coverage: ${(sim.networkCoverage * 100).toFixed(1)}% (${sim.stats.totalNodes} nodes)`);
  console.log(`   Modules Affected: ${sim.pathway.affectedModules.length} - ${sim.pathway.affectedModules.join(', ')}`);
  console.log(`   Feedback Loops: ${sim.stats.loopCount} involved, ${sim.stats.loopsBreaking} broken`);
  console.log(`   Clinical Outcomes Reached: ${sim.clinicalOutcomesAffected.join(', ') || 'none directly'}`);
  console.log('');
});

// ============================================================================
// LOOP-BREAKING CHAMPIONS
// ============================================================================

console.log('════════════════════════════════════════════════════════════════');
console.log('BEST TREATMENTS FOR BREAKING VICIOUS CYCLES');
console.log('════════════════════════════════════════════════════════════════');
console.log('');

const loopBreakers = [...simulations]
  .filter(s => s.loopBreakScore > 0)
  .sort((a, b) => b.loopBreakScore - a.loopBreakScore);

if (loopBreakers.length === 0) {
  console.log('No treatments directly break feedback loops.');
} else {
  loopBreakers.forEach((sim, i) => {
    console.log(`${i + 1}. ${sim.treatment.name}`);
    console.log(`   Loops Broken: ${sim.loopBreakScore}`);

    const brokenLoops = sim.pathway.relevantLoops.filter(l => l.involvement === 'breaks');
    brokenLoops.forEach(loop => {
      const loopDef = feedbackLoops.find(l => l.id === loop.loopId);
      console.log(`   - ${loopDef?.name || loop.loopId} (via ${loop.targetNodeInLoop})`);
    });
    console.log('');
  });
}

// ============================================================================
// DETAILED PATHWAY ANALYSIS - TOP 5
// ============================================================================

console.log('════════════════════════════════════════════════════════════════');
console.log('DETAILED PATHWAY ANALYSIS - TOP 5 TREATMENTS');
console.log('════════════════════════════════════════════════════════════════');
console.log('');

simulations.slice(0, 5).forEach((sim, i) => {
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`${i + 1}. ${sim.treatment.name.toUpperCase()}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log('');

  console.log(`Mechanism: ${sim.treatment.mechanismSummary}`);
  console.log('');

  console.log('Primary Targets:');
  sim.treatment.primaryTargets.forEach(target => {
    const node = nodeMap.get(target.nodeId);
    console.log(`  • ${target.effect.toUpperCase()} ${node?.label || target.nodeId} (${target.strength})`);
  });
  console.log('');

  console.log('Upstream (What Feeds Into Targets):');
  const upstreamLabels = sim.pathway.upstreamNodes
    .map(id => nodeMap.get(id)?.label || id)
    .slice(0, 8);
  console.log(`  ${upstreamLabels.join(' → ')}`);
  if (sim.pathway.upstreamNodes.length > 8) {
    console.log(`  ... and ${sim.pathway.upstreamNodes.length - 8} more`);
  }
  console.log('');

  console.log('Downstream (Cascade Effects):');
  const downstreamLabels = sim.pathway.downstreamNodes
    .map(id => nodeMap.get(id)?.label || id)
    .slice(0, 10);
  console.log(`  ${downstreamLabels.join(' → ')}`);
  if (sim.pathway.downstreamNodes.length > 10) {
    console.log(`  ... and ${sim.pathway.downstreamNodes.length - 10} more`);
  }
  console.log('');

  if (sim.pathwaysToOutcomes.size > 0) {
    console.log('Paths to Clinical Outcomes:');
    sim.pathwaysToOutcomes.forEach((path, outcome) => {
      const outcomeNode = nodeMap.get(outcome);
      console.log(`  → ${outcomeNode?.label || outcome}:`);
      const pathLabels = path.map(id => nodeMap.get(id)?.label || id);
      if (pathLabels.length <= 5) {
        console.log(`    ${pathLabels.join(' → ')}`);
      } else {
        console.log(`    ${pathLabels.slice(0, 3).join(' → ')} → ... → ${pathLabels.slice(-1)[0]} (${path.length} steps)`);
      }
    });
    console.log('');
  }

  console.log(`Evidence Level: ${sim.treatment.adEvidence.level}`);
  console.log(`Evidence Summary: ${sim.treatment.adEvidence.summary}`);
  console.log('');
});

// ============================================================================
// COMBINATION THERAPY ANALYSIS
// ============================================================================

console.log('════════════════════════════════════════════════════════════════');
console.log('SYNERGISTIC COMBINATION ANALYSIS');
console.log('════════════════════════════════════════════════════════════════');
console.log('');
console.log('Testing which treatment combinations provide maximum coverage...');
console.log('');

// Test some promising combinations
const combinations = [
  // Multi-target approach: mTOR + inflammation + clearance
  ['rapamycin', 'colchicine', 'lecanemab'],
  // Metabolic + neuroprotective
  ['semaglutide', 'nad_precursors', 'lithium_microdose'],
  // Anti-amyloid combination
  ['lecanemab', 'donanemab', 'aducanumab'],
  // Lifestyle + drug
  ['exercise_aerobic', 'rapamycin', 'gamma_40hz'],
  // Senolytic + mTOR + NAD
  ['dasatinib_quercetin', 'rapamycin', 'nad_precursors'],
  // Budget-friendly combo
  ['lithium_microdose', 'curcumin', 'exercise_aerobic'],
];

const combinationResults: { name: string; result: CombinationSimulation }[] = [];

combinations.forEach(combo => {
  const treatments = combo
    .map(id => treatmentLibrary.find(t => t.id === id))
    .filter((t): t is TreatmentLibraryEntry => t !== undefined);

  if (treatments.length === combo.length) {
    const result = simulateCombination(treatments);
    combinationResults.push({
      name: treatments.map(t => t.name.split(' ')[0]).join(' + '),
      result,
    });
  }
});

// Sort by synergy
combinationResults.sort((a, b) => b.result.synergyScore - a.result.synergyScore);

console.log('Best Combinations by Synergy Score:');
console.log('');

combinationResults.forEach((combo, i) => {
  const r = combo.result;
  console.log(`${i + 1}. ${combo.name}`);
  console.log(`   Network Coverage: ${(r.combinedNodes.size / allNodes.length * 100).toFixed(1)}% (${r.combinedNodes.size} nodes)`);
  console.log(`   Modules Covered: ${r.combinedModules.size}/${modules.length}`);
  console.log(`   Loops Affected: ${r.uniqueLoopsAffected.size}/${feedbackLoops.length}`);
  console.log(`   Synergy Score: ${r.synergyScore.toFixed(3)}`);
  console.log(`   Coverage vs Individual: ${r.coverageIncrease.toFixed(2)}x`);
  console.log('');
});

// ============================================================================
// HEAD-TO-HEAD: ANTI-AMYLOID VS METABOLIC
// ============================================================================

console.log('════════════════════════════════════════════════════════════════');
console.log('HEAD-TO-HEAD: ANTI-AMYLOID VS METABOLIC APPROACHES');
console.log('════════════════════════════════════════════════════════════════');
console.log('');

const antiAmyloid = simulations.filter(s =>
  ['aducanumab', 'lecanemab', 'donanemab'].includes(s.treatment.id)
);

const metabolic = simulations.filter(s =>
  ['rapamycin', 'semaglutide', 'nad_precursors'].includes(s.treatment.id)
);

const avgAmyloidScore = antiAmyloid.reduce((sum, s) => sum + s.combinedScore, 0) / antiAmyloid.length;
const avgMetabolicScore = metabolic.reduce((sum, s) => sum + s.combinedScore, 0) / metabolic.length;

const avgAmyloidCoverage = antiAmyloid.reduce((sum, s) => sum + s.networkCoverage, 0) / antiAmyloid.length;
const avgMetabolicCoverage = metabolic.reduce((sum, s) => sum + s.networkCoverage, 0) / metabolic.length;

const avgAmyloidLoops = antiAmyloid.reduce((sum, s) => sum + s.loopBreakScore, 0) / antiAmyloid.length;
const avgMetabolicLoops = metabolic.reduce((sum, s) => sum + s.loopBreakScore, 0) / metabolic.length;

console.log('Anti-Amyloid Antibodies (Aducanumab, Lecanemab, Donanemab):');
console.log(`  Average Impact Score: ${avgAmyloidScore.toFixed(1)}`);
console.log(`  Average Network Coverage: ${(avgAmyloidCoverage * 100).toFixed(1)}%`);
console.log(`  Average Loops Broken: ${avgAmyloidLoops.toFixed(1)}`);
console.log('');

console.log('Metabolic Modulators (Rapamycin, Semaglutide, NAD+):');
console.log(`  Average Impact Score: ${avgMetabolicScore.toFixed(1)}`);
console.log(`  Average Network Coverage: ${(avgMetabolicCoverage * 100).toFixed(1)}%`);
console.log(`  Average Loops Broken: ${avgMetabolicLoops.toFixed(1)}`);
console.log('');

const winner = avgMetabolicScore > avgAmyloidScore ? 'METABOLIC' : 'ANTI-AMYLOID';
const margin = Math.abs(avgMetabolicScore - avgAmyloidScore);
console.log(`Network Analysis Winner: ${winner} approaches (+${margin.toFixed(1)} impact score)`);
console.log('');

// ============================================================================
// SURPRISING FINDINGS
// ============================================================================

console.log('════════════════════════════════════════════════════════════════');
console.log('SURPRISING FINDINGS');
console.log('════════════════════════════════════════════════════════════════');
console.log('');

// Find treatments that are underrated
const approvedButLowRank = simulations
  .map((s, i) => ({ ...s, rank: i + 1 }))
  .filter(s => s.treatment.fdaStatus === 'approved' && s.rank > 10);

if (approvedButLowRank.length > 0) {
  console.log('1. APPROVED TREATMENTS WITH LOW NETWORK IMPACT:');
  approvedButLowRank.forEach(s => {
    console.log(`   - ${s.treatment.name}: Rank #${s.rank} despite FDA approval`);
  });
  console.log('   → These may target symptoms rather than disease mechanisms');
  console.log('');
}

// Find non-drugs that outperform drugs
const topLifestyle = simulations
  .filter(s => ['lifestyle', 'device'].includes(s.treatment.type))
  .slice(0, 3);

const topDrugs = simulations
  .filter(s => s.treatment.type === 'small_molecule')
  .slice(0, 3);

if (topLifestyle.length > 0 && topLifestyle[0].combinedScore >= topDrugs[0].combinedScore * 0.8) {
  console.log('2. LIFESTYLE INTERVENTIONS COMPETE WITH DRUGS:');
  topLifestyle.forEach(s => {
    console.log(`   - ${s.treatment.name}: Score ${s.combinedScore.toFixed(1)} (${(s.networkCoverage * 100).toFixed(1)}% coverage)`);
  });
  console.log('   → Non-pharmacological approaches have substantial network effects');
  console.log('');
}

// Find the best bang-for-buck
const costEffective = simulations
  .filter(s => s.treatment.annualCost !== undefined && s.treatment.annualCost < 1000)
  .sort((a, b) => (b.combinedScore / (b.treatment.annualCost || 1)) - (a.combinedScore / (a.treatment.annualCost || 1)));

if (costEffective.length > 0) {
  console.log('3. BEST VALUE TREATMENTS (Impact per $1000/year):');
  costEffective.slice(0, 3).forEach(s => {
    const costPerImpact = (s.treatment.annualCost || 0) / s.combinedScore;
    console.log(`   - ${s.treatment.name}: $${s.treatment.annualCost}/year, Score ${s.combinedScore.toFixed(1)}`);
    console.log(`     → $${costPerImpact.toFixed(0)} per impact point`);
  });
  console.log('');
}

// Find treatments with unique module coverage
const uniqueModuleTreatments = simulations.filter(sim => {
  const otherTreatments = simulations.filter(s => s.treatment.id !== sim.treatment.id);
  const otherModules = new Set(otherTreatments.flatMap(s => s.pathway.affectedModules));
  const uniqueModules = sim.pathway.affectedModules.filter(m => !otherModules.has(m));
  return uniqueModules.length > 0;
});

if (uniqueModuleTreatments.length > 0) {
  console.log('4. TREATMENTS WITH UNIQUE MODULE COVERAGE:');
  uniqueModuleTreatments.slice(0, 3).forEach(sim => {
    const otherModules = new Set(
      simulations
        .filter(s => s.treatment.id !== sim.treatment.id)
        .flatMap(s => s.pathway.affectedModules)
    );
    const unique = sim.pathway.affectedModules.filter(m => !otherModules.has(m));
    console.log(`   - ${sim.treatment.name}: Uniquely reaches ${unique.join(', ')}`);
  });
  console.log('');
}

// ============================================================================
// SUMMARY TABLE
// ============================================================================

console.log('════════════════════════════════════════════════════════════════');
console.log('SUMMARY TABLE');
console.log('════════════════════════════════════════════════════════════════');
console.log('');
console.log('Treatment               | Score | Coverage | Loops | Outcomes | Status');
console.log('------------------------|-------|----------|-------|----------|--------');

simulations.slice(0, 12).forEach(sim => {
  const name = sim.treatment.name.slice(0, 22).padEnd(22);
  const score = sim.combinedScore.toFixed(1).padStart(5);
  const coverage = `${(sim.networkCoverage * 100).toFixed(0)}%`.padStart(8);
  const loops = sim.loopBreakScore.toString().padStart(5);
  const outcomes = sim.clinicalOutcomesAffected.length.toString().padStart(8);
  const status = sim.treatment.fdaStatus.slice(0, 8).padStart(8);

  console.log(`${name} | ${score} | ${coverage} | ${loops} | ${outcomes} | ${status}`);
});

console.log('');
console.log('════════════════════════════════════════════════════════════════');
console.log('SIMULATION COMPLETE');
console.log('════════════════════════════════════════════════════════════════');
