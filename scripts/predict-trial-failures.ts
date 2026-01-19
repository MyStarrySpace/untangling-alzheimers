/**
 * CLI Script: DAG-Based Trial Failure Prediction
 *
 * Uses the mechanistic DAG structure to predict which current trials
 * are likely to fail based on:
 * - Causal centrality (betweenness)
 * - Feedback loop disruption
 * - Distance from risk factors vs clinical outcomes
 * - Edge confidence levels
 * - Historical failure patterns
 *
 * Usage:
 *   npx tsx scripts/predict-trial-failures.ts
 *   npm run predict-failures
 */

import * as XLSX from 'xlsx';
import * as path from 'path';
import { allNodes, type MechanisticNode } from '../src/data/mechanisticFramework/nodes';
import { allEdges, type MechanisticEdge } from '../src/data/mechanisticFramework/edges';
import { modules } from '../src/data/mechanisticFramework/modules';
import { feedbackLoops } from '../src/data/mechanisticFramework/feedbackLoops';
import {
  treatmentLibrary,
  calculateCnsMpoScore,
  type BBBPenetration,
  type MolecularProperties,
} from '../src/data/mechanisticFramework/drugLibrary';
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

interface Trial {
  name: string;
  mechanism: string;
  population: string;
  phase?: string;
  isCompleted: boolean;
  actualOutcome?: 'success' | 'failure' | 'unknown';
  redFlags?: string;
  notes?: string;
}

interface DAGPrediction {
  trial: Trial;
  matchedNodes: string[];
  matchedModules: string[];

  // DAG-based metrics
  dagMetrics: {
    avgBetweenness: number;           // How central are targets?
    avgDistanceToOutcomes: number;    // How downstream?
    avgDistanceFromInputs: number;    // How upstream?
    pathsDisrupted: number;           // How many causal paths affected?
    loopsBroken: number;              // Feedback loops interrupted?
    loopsParticipating: number;       // In any loop at all?
    avgEdgeConfidence: number;        // Causal confidence of target edges
    modulesAffected: number;          // Breadth of effect
  };

  // Pharmacological metrics
  pharmaMetrics: {
    cnsMpoScore: number | null;       // CNS MPO score (0-6, ≥4 desirable)
    molecularWeight: number | null;   // MW in Daltons
    tpsa: number | null;              // Topological polar surface area
    bbbPenetration: BBBPenetration | null;
    isAntibody: boolean;              // Large biologic that can't cross BBB
    isPeptide: boolean;               // Peptide (typically poor BBB)
  };

  // Risk scores (0-100, higher = more likely to fail)
  riskScores: {
    downstreamRisk: number;           // Targeting effects not causes
    loopMissRisk: number;             // Not breaking vicious cycles
    lowCentralityRisk: number;        // Targeting peripheral nodes
    singleTargetRisk: number;         // Narrow mechanism
    weakEvidenceRisk: number;         // Low confidence edges
    stageMismatchRisk: number;        // Wrong intervention window
    historicalPatternRisk: number;    // Similar to past failures
    bbbPenetrationRisk: number;       // Poor CNS access (NEW)
  };

  overallFailureRisk: number;         // Combined score
  confidence: string;                 // How confident in prediction
  topReasons: string[];               // Why likely to fail
  whatWouldHelp: string[];            // Suggestions
}

// ============================================================================
// DAG ANALYSIS HELPERS
// ============================================================================

const adjacency = buildAdjacencyLists(allNodes, allEdges);
const nodeMap = new Map(allNodes.map(n => [n.id, n]));
const edgeMap = new Map(allEdges.map(e => [`${e.source}->${e.target}`, e]));

// Pre-compute input and output boundary nodes
const inputBoundaries = allNodes.filter(n => n.boundaryDirection === 'input').map(n => n.id);
const outputBoundaries = allNodes.filter(n => n.boundaryDirection === 'output').map(n => n.id);
const clinicalOutcomes = ['cognitive_score', 'synapses', 'neuronal_count', 'mortality', 'brain_volume'];

// Confidence level rankings
const CONFIDENCE_RANK: Record<string, number> = {
  'L1': 7, 'L2': 6, 'L3': 5, 'L4': 4, 'L5': 3, 'L6': 2, 'L7': 1
};

// Keywords to node mapping (same as failure analysis)
const keywordToNodes: Record<string, string[]> = {
  'amyloid': ['abeta_oligomers', 'abeta_monomers', 'abeta_plaques', 'abeta_clearance'],
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
  'glp1': ['insulin_resistance'],
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
  'glymphatic': ['glymphatic_clearance', 'csf_isf_exchange'],
  'sleep': ['sleep_disruption'],
  'calcium': ['ca_overload', 'er_mito_ca_flux'],
  'lysosome': ['lysosomal_dysfunction', 'lysosome_pool'],
  'lysosomal': ['lysosomal_dysfunction', 'lysosome_pool'],
  'antibody': ['abeta_oligomers', 'abeta_clearance'],
  'immunotherapy': ['abeta_oligomers', 'abeta_clearance', 'microglia_activated'],
  'vaccine': ['abeta_oligomers', 'abeta_clearance'],
  'trem2': ['trem2_function'],
  'senolytic': ['sasp'],
  'sirt': ['mtorc1_hyperactive'],
  'nad': ['mitophagy_rate_reduced'],
  'neurotrophin': ['neuronal_dysfunction'],
  'bdnf': ['neuronal_dysfunction'],
};

function findMatchingNodes(text: string): string[] {
  const lowerText = text.toLowerCase();
  const matches = new Set<string>();

  for (const [keyword, nodeIds] of Object.entries(keywordToNodes)) {
    if (lowerText.includes(keyword)) {
      nodeIds.forEach(id => {
        if (nodeMap.has(id)) matches.add(id);
      });
    }
  }

  return Array.from(matches);
}

// BFS to find shortest distance
function bfsDistance(start: string, targets: Set<string>, direction: 'forward' | 'backward'): number {
  const visited = new Set<string>();
  const queue: { node: string; dist: number }[] = [{ node: start, dist: 0 }];

  while (queue.length > 0) {
    const { node, dist } = queue.shift()!;

    if (targets.has(node) && node !== start) return dist;
    if (visited.has(node)) continue;
    visited.add(node);

    const neighbors = direction === 'forward'
      ? (adjacency.outgoing.get(node) || [])
      : (adjacency.incoming.get(node) || []);

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        queue.push({ node: neighbor, dist: dist + 1 });
      }
    }
  }

  return -1; // No path
}

// Count all paths through a node (simplified betweenness)
function countPathsThrough(nodeId: string): number {
  let pathCount = 0;

  // Count paths from inputs to outputs that pass through this node
  for (const input of inputBoundaries.slice(0, 5)) { // Sample for performance
    for (const output of clinicalOutcomes) {
      // Check if node is on path from input to output
      const toNode = bfsDistance(input, new Set([nodeId]), 'forward');
      if (toNode < 0) continue;

      const toOutput = bfsDistance(nodeId, new Set([output]), 'forward');
      if (toOutput < 0) continue;

      pathCount++;
    }
  }

  return pathCount;
}

// Get edges connected to a node
function getConnectedEdges(nodeId: string): MechanisticEdge[] {
  const edges: MechanisticEdge[] = [];

  const incoming = adjacency.incoming.get(nodeId) || [];
  const outgoing = adjacency.outgoing.get(nodeId) || [];

  incoming.forEach(src => {
    const edge = edgeMap.get(`${src}->${nodeId}`);
    if (edge) edges.push(edge);
  });

  outgoing.forEach(tgt => {
    const edge = edgeMap.get(`${nodeId}->${tgt}`);
    if (edge) edges.push(edge);
  });

  return edges;
}

// Match trial to treatment library entry and get pharmacological data
function getPharmacologicalMetrics(trial: Trial): {
  cnsMpoScore: number | null;
  molecularWeight: number | null;
  tpsa: number | null;
  bbbPenetration: BBBPenetration | null;
  isAntibody: boolean;
  isPeptide: boolean;
} {
  const trialName = trial.name.toLowerCase();
  const mechanism = trial.mechanism.toLowerCase();

  // Try to match to treatment library - require minimum 4 char match to avoid false positives
  const matchedTreatment = treatmentLibrary.find(t => {
    const tName = t.name.toLowerCase();
    const tId = t.id.toLowerCase();
    const trialFirstWord = trialName.split(' ')[0];
    const minMatchLen = 4; // Minimum chars to match

    // Direct containment (full drug name in trial name)
    if (tName.length >= minMatchLen && trialName.includes(tName)) return true;
    if (tId.length >= minMatchLen && trialName.includes(tId)) return true;

    // Trial first word matches drug (e.g., "semaglutide" in "Semaglutide (AD trial)")
    if (trialFirstWord.length >= minMatchLen) {
      if (tName.includes(trialFirstWord)) return true;
      if (tId.includes(trialFirstWord)) return true;
    }

    return false;
  });

  // Check if antibody or peptide from trial info
  const isAntibody = mechanism.includes('antibody') ||
                     mechanism.includes('immunotherapy') ||
                     mechanism.includes('mab') ||
                     trialName.includes('mab') ||
                     matchedTreatment?.type === 'antibody';

  const isPeptide = mechanism.includes('peptide') ||
                    mechanism.includes('glp-1') ||
                    mechanism.includes('glp1') ||
                    matchedTreatment?.type === 'biologic';

  if (matchedTreatment?.molecularProperties) {
    const props = matchedTreatment.molecularProperties;
    const cnsMpoScore = calculateCnsMpoScore(props);
    return {
      cnsMpoScore,
      molecularWeight: props.molecularWeight,
      tpsa: props.tpsa,
      bbbPenetration: matchedTreatment.bbbPenetration || null,
      isAntibody,
      isPeptide,
    };
  }

  // Estimate from treatment type if no molecular data
  if (isAntibody) {
    return {
      cnsMpoScore: 0, // Antibodies cannot cross BBB
      molecularWeight: 150000, // ~150 kDa for IgG
      tpsa: null,
      bbbPenetration: 'none',
      isAntibody: true,
      isPeptide: false,
    };
  }

  if (isPeptide) {
    return {
      cnsMpoScore: 1, // Peptides typically very poor
      molecularWeight: null,
      tpsa: null,
      bbbPenetration: 'poor',
      isAntibody: false,
      isPeptide: true,
    };
  }

  return {
    cnsMpoScore: null,
    molecularWeight: null,
    tpsa: null,
    bbbPenetration: matchedTreatment?.bbbPenetration || null,
    isAntibody: false,
    isPeptide: false,
  };
}

// Check feedback loop involvement
function checkLoopInvolvement(nodeIds: string[]): { broken: number; participating: number } {
  let broken = 0;
  let participating = 0;

  for (const loop of feedbackLoops) {
    const loopNodes = loop.nodeIds || [];
    const inLoop = nodeIds.some(n => loopNodes.includes(n));

    if (inLoop) {
      participating++;
      // Check if targeting would break the loop (simplified: any node in loop)
      if (loop.type === 'reinforcing') {
        broken++;
      }
    }
  }

  return { broken, participating };
}

// ============================================================================
// PREDICTION MODEL
// ============================================================================

function predictTrialOutcome(trial: Trial): DAGPrediction {
  const searchText = `${trial.name} ${trial.mechanism} ${trial.redFlags || ''}`;
  const matchedNodes = findMatchingNodes(searchText);

  const matchedModules = [...new Set(
    matchedNodes
      .map(id => nodeMap.get(id)?.moduleId)
      .filter((m): m is string => m !== undefined)
  )];

  // Calculate DAG metrics
  let totalBetweenness = 0;
  let totalDistToOutcomes = 0;
  let totalDistFromInputs = 0;
  let validDistCount = 0;

  const outcomeSet = new Set(clinicalOutcomes);
  const inputSet = new Set(inputBoundaries);

  for (const nodeId of matchedNodes) {
    // Betweenness proxy
    totalBetweenness += countPathsThrough(nodeId);

    // Distance to outcomes
    const distOut = bfsDistance(nodeId, outcomeSet, 'forward');
    if (distOut >= 0) {
      totalDistToOutcomes += distOut;
      validDistCount++;
    }

    // Distance from inputs
    const distIn = bfsDistance(nodeId, inputSet, 'backward');
    if (distIn >= 0) {
      totalDistFromInputs += distIn;
    }
  }

  // Edge confidence
  let totalConfidence = 0;
  let edgeCount = 0;
  for (const nodeId of matchedNodes) {
    const edges = getConnectedEdges(nodeId);
    for (const edge of edges) {
      totalConfidence += CONFIDENCE_RANK[edge.causalConfidence] || 3;
      edgeCount++;
    }
  }

  // Loop involvement
  const loopStats = checkLoopInvolvement(matchedNodes);

  // Compile metrics
  const dagMetrics = {
    avgBetweenness: matchedNodes.length > 0 ? totalBetweenness / matchedNodes.length : 0,
    avgDistanceToOutcomes: validDistCount > 0 ? totalDistToOutcomes / validDistCount : -1,
    avgDistanceFromInputs: matchedNodes.length > 0 ? totalDistFromInputs / matchedNodes.length : -1,
    pathsDisrupted: totalBetweenness,
    loopsBroken: loopStats.broken,
    loopsParticipating: loopStats.participating,
    avgEdgeConfidence: edgeCount > 0 ? totalConfidence / edgeCount : 0,
    modulesAffected: matchedModules.length,
  };

  // ============================================================================
  // PHARMACOLOGICAL METRICS (CNS MPO)
  // ============================================================================

  const pharmaMetrics = getPharmacologicalMetrics(trial);

  // ============================================================================
  // RISK SCORING
  // ============================================================================

  const riskScores = {
    downstreamRisk: 0,
    loopMissRisk: 0,
    lowCentralityRisk: 0,
    singleTargetRisk: 0,
    weakEvidenceRisk: 0,
    stageMismatchRisk: 0,
    historicalPatternRisk: 0,
    bbbPenetrationRisk: 0,
  };

  // 1. Downstream risk (targeting effects not causes)
  if (dagMetrics.avgDistanceToOutcomes >= 0 && dagMetrics.avgDistanceToOutcomes <= 2) {
    riskScores.downstreamRisk = 85; // Very downstream
  } else if (dagMetrics.avgDistanceToOutcomes > 2 && dagMetrics.avgDistanceToOutcomes <= 4) {
    riskScores.downstreamRisk = 50;
  } else if (dagMetrics.avgDistanceToOutcomes > 4) {
    riskScores.downstreamRisk = 20; // More upstream = better
  } else {
    riskScores.downstreamRisk = 70; // No path = concerning
  }

  // 2. Loop miss risk
  if (dagMetrics.loopsBroken === 0) {
    riskScores.loopMissRisk = 90; // Critical: 100% of past failures missed loops
  } else if (dagMetrics.loopsBroken === 1) {
    riskScores.loopMissRisk = 40;
  } else {
    riskScores.loopMissRisk = 15; // Breaking multiple loops = promising
  }

  // 3. Low centrality risk
  if (dagMetrics.avgBetweenness < 2) {
    riskScores.lowCentralityRisk = 70; // Peripheral target
  } else if (dagMetrics.avgBetweenness < 5) {
    riskScores.lowCentralityRisk = 40;
  } else {
    riskScores.lowCentralityRisk = 20; // Central target
  }

  // 4. Single target risk
  if (matchedNodes.length <= 1) {
    riskScores.singleTargetRisk = 75;
  } else if (matchedNodes.length <= 3) {
    riskScores.singleTargetRisk = 45;
  } else {
    riskScores.singleTargetRisk = 20; // Multi-target = better
  }

  // 5. Weak evidence risk
  if (dagMetrics.avgEdgeConfidence < 3) {
    riskScores.weakEvidenceRisk = 70; // Low confidence edges
  } else if (dagMetrics.avgEdgeConfidence < 5) {
    riskScores.weakEvidenceRisk = 40;
  } else {
    riskScores.weakEvidenceRisk = 15; // High confidence
  }

  // 6. Stage mismatch risk
  const pop = (trial.population || '').toLowerCase();
  const targetModules = matchedModules.map(id => modules.find(m => m.id === id));

  let stageMismatch = false;
  if (pop.includes('moderate') || pop.includes('dementia')) {
    // Late stage patient, check if targeting prevention modules
    stageMismatch = targetModules.some(m => m?.interventionWindow === 'prevention');
  }
  if (pop.includes('prodromal') || pop.includes('early') || pop.includes('prevention')) {
    // Early stage, check if targeting treatment modules
    stageMismatch = targetModules.some(m => m?.interventionWindow === 'treatment');
  }
  riskScores.stageMismatchRisk = stageMismatch ? 65 : 25;

  // 7. Historical pattern risk (amyloid = high failure rate)
  const mech = (trial.mechanism || '').toLowerCase();
  if (mech.includes('amyloid') || mech.includes('aβ') || mech.includes('bace') ||
      mech.includes('secretase') || matchedModules.includes('M06')) {
    riskScores.historicalPatternRisk = 80; // 39% of all failures were amyloid
  } else if (mech.includes('tau') || matchedModules.includes('M07')) {
    riskScores.historicalPatternRisk = 60; // 11% of failures
  } else if (mech.includes('inflammation') || matchedModules.includes('M04')) {
    riskScores.historicalPatternRisk = 50;
  } else {
    riskScores.historicalPatternRisk = 30; // Novel mechanism
  }

  // 8. BBB Penetration Risk (based on CNS MPO and molecular properties)
  if (pharmaMetrics.isAntibody) {
    // Antibodies have ~0.1% brain uptake - cannot reach CNS targets effectively
    riskScores.bbbPenetrationRisk = 85;
  } else if (pharmaMetrics.isPeptide) {
    // Peptides typically have very poor BBB penetration (e.g., Semaglutide failed EVOKE)
    riskScores.bbbPenetrationRisk = 80;
  } else if (pharmaMetrics.cnsMpoScore !== null) {
    // Use CNS MPO score: <4 is poor, ≥4 is desirable for CNS drugs
    if (pharmaMetrics.cnsMpoScore >= 5) {
      riskScores.bbbPenetrationRisk = 10; // Excellent CNS penetration
    } else if (pharmaMetrics.cnsMpoScore >= 4) {
      riskScores.bbbPenetrationRisk = 25; // Good CNS penetration
    } else if (pharmaMetrics.cnsMpoScore >= 3) {
      riskScores.bbbPenetrationRisk = 50; // Marginal
    } else if (pharmaMetrics.cnsMpoScore >= 2) {
      riskScores.bbbPenetrationRisk = 70; // Poor
    } else {
      riskScores.bbbPenetrationRisk = 85; // Very poor
    }
  } else if (pharmaMetrics.bbbPenetration) {
    // Use qualitative BBB data if no molecular properties
    const bbbRiskMap: Record<BBBPenetration, number> = {
      'good': 20,
      'moderate': 40,
      'poor': 70,
      'none': 90,
      'indirect': 50,    // Works peripherally, uncertain CNS effect
      'unknown': 45,
    };
    riskScores.bbbPenetrationRisk = bbbRiskMap[pharmaMetrics.bbbPenetration];
  } else {
    // Unknown - assign moderate risk
    riskScores.bbbPenetrationRisk = 45;
  }

  // ============================================================================
  // OVERALL SCORE
  // ============================================================================

  // Weighted combination (loop miss is most predictive based on 100% correlation)
  // BBB penetration is second most important - drug must reach CNS target
  const weights = {
    downstreamRisk: 0.12,
    loopMissRisk: 0.25,           // Most important!
    lowCentralityRisk: 0.08,
    singleTargetRisk: 0.08,
    weakEvidenceRisk: 0.08,
    stageMismatchRisk: 0.08,
    historicalPatternRisk: 0.12,
    bbbPenetrationRisk: 0.19,     // Second most important - drug must reach target!
  };

  const overallFailureRisk = Object.entries(riskScores).reduce((sum, [key, value]) => {
    return sum + value * weights[key as keyof typeof weights];
  }, 0);

  // Confidence based on how much we could map
  let confidence: string;
  if (matchedNodes.length >= 3 && dagMetrics.avgDistanceToOutcomes >= 0) {
    confidence = 'HIGH';
  } else if (matchedNodes.length >= 1) {
    confidence = 'MEDIUM';
  } else {
    confidence = 'LOW';
  }

  // Generate reasons
  const topReasons: string[] = [];
  if (riskScores.loopMissRisk >= 80) {
    topReasons.push('Does NOT break any feedback loops (100% of past failures share this)');
  }
  if (riskScores.downstreamRisk >= 70) {
    topReasons.push(`Targets downstream pathology (${dagMetrics.avgDistanceToOutcomes.toFixed(1)} steps from outcomes)`);
  }
  if (riskScores.historicalPatternRisk >= 70) {
    topReasons.push('Targets amyloid - historically 39% failure rate for this mechanism');
  }
  if (riskScores.singleTargetRisk >= 60) {
    topReasons.push('Single-target approach - multi-target drugs show more promise');
  }
  if (riskScores.stageMismatchRisk >= 50) {
    topReasons.push('Potential stage mismatch between intervention and patient population');
  }
  if (riskScores.bbbPenetrationRisk >= 70) {
    if (pharmaMetrics.isAntibody) {
      topReasons.push('Antibody cannot cross BBB (~0.1% brain uptake) - limited CNS target engagement');
    } else if (pharmaMetrics.isPeptide) {
      topReasons.push('Peptide has poor BBB penetration - may not reach CNS targets (see: Semaglutide EVOKE failure)');
    } else if (pharmaMetrics.cnsMpoScore !== null) {
      topReasons.push(`Poor CNS MPO score (${pharmaMetrics.cnsMpoScore.toFixed(1)}/6) - suboptimal brain penetration`);
    } else {
      topReasons.push('Poor or unknown BBB penetration - drug may not reach CNS targets');
    }
  }

  // Suggestions
  const whatWouldHelp: string[] = [];
  if (dagMetrics.loopsBroken === 0) {
    whatWouldHelp.push('Combine with loop-breaking agent (e.g., Colchicine for NLRP3 loop)');
  }
  if (dagMetrics.avgDistanceToOutcomes <= 2) {
    whatWouldHelp.push('Consider upstream combination (mTOR inhibitor, autophagy enhancer)');
  }
  if (matchedNodes.length <= 1) {
    whatWouldHelp.push('Add second mechanism targeting different module');
  }
  if (pop.includes('moderate') || pop.includes('dementia')) {
    whatWouldHelp.push('Test in earlier population (MCI, preclinical)');
  }
  if (riskScores.bbbPenetrationRisk >= 70) {
    if (pharmaMetrics.isAntibody) {
      whatWouldHelp.push('Consider small molecule targeting same pathway (antibodies have ~0.1% brain uptake)');
      whatWouldHelp.push('Explore focused ultrasound or nanoparticle delivery to enhance CNS access');
    } else if (pharmaMetrics.isPeptide) {
      whatWouldHelp.push('Develop brain-penetrant small molecule analog or use intranasal delivery');
    } else {
      whatWouldHelp.push('Optimize molecular properties for CNS MPO score ≥4 (MW<450, LogP 1-4, TPSA<90)');
    }
  }

  return {
    trial,
    matchedNodes,
    matchedModules,
    dagMetrics,
    pharmaMetrics,
    riskScores,
    overallFailureRisk,
    confidence,
    topReasons,
    whatWouldHelp,
  };
}

// ============================================================================
// MAIN
// ============================================================================

console.log('');
console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     DAG-BASED TRIAL FAILURE PREDICTION                         ║');
console.log('║     Using Causal Network Structure to Predict Outcomes         ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');

// Read Excel for ongoing/current trials
let workbook: XLSX.WorkBook;
try {
  workbook = XLSX.readFile(EXCEL_PATH);
} catch (error) {
  console.error(`Error reading Excel file: ${error}`);
  process.exit(1);
}

const sheet = workbook.Sheets['Cases_v2'];
const data = XLSX.utils.sheet_to_json(sheet) as Record<string, unknown>[];

// Extract all trials
const trials: Trial[] = data.map(row => ({
  name: String(row['Program'] || ''),
  mechanism: String(row['Class / target'] || ''),
  population: String(row['Pivotal population'] || ''),
  isCompleted: row['Outcome label (1=fail, 0=success)'] !== undefined &&
               row['Outcome label (1=fail, 0=success)'] !== '',
  actualOutcome: row['Outcome label (1=fail, 0=success)'] === 1 ? 'failure' :
                 row['Outcome label (1=fail, 0=success)'] === 0 ? 'success' : 'unknown',
  redFlags: String(row['Framework red flags (from DAG logic)'] || ''),
  notes: String(row['Notes'] || ''),
})).filter(t => t.name);

console.log(`Loaded ${trials.length} trials from database`);
console.log('');

// Separate completed vs ongoing
const completedTrials = trials.filter(t => t.actualOutcome !== 'unknown');
const ongoingTrials = trials.filter(t => t.actualOutcome === 'unknown');

console.log(`Completed trials: ${completedTrials.length}`);
console.log(`Ongoing/Current trials: ${ongoingTrials.length}`);
console.log('');

// ============================================================================
// VALIDATE MODEL ON COMPLETED TRIALS
// ============================================================================

console.log('════════════════════════════════════════════════════════════════');
console.log('MODEL VALIDATION ON COMPLETED TRIALS');
console.log('════════════════════════════════════════════════════════════════');
console.log('');

const completedPredictions = completedTrials.map(t => predictTrialOutcome(t));

// Check accuracy
let truePositives = 0;  // Predicted fail, actually failed
let falsePositives = 0; // Predicted fail, actually succeeded
let trueNegatives = 0;  // Predicted success, actually succeeded
let falseNegatives = 0; // Predicted success, actually failed

const THRESHOLD = 55; // Risk score threshold for predicting failure

completedPredictions.forEach(pred => {
  const predictedFail = pred.overallFailureRisk >= THRESHOLD;
  const actuallyFailed = pred.trial.actualOutcome === 'failure';

  if (predictedFail && actuallyFailed) truePositives++;
  else if (predictedFail && !actuallyFailed) falsePositives++;
  else if (!predictedFail && !actuallyFailed) trueNegatives++;
  else if (!predictedFail && actuallyFailed) falseNegatives++;
});

const accuracy = (truePositives + trueNegatives) / completedPredictions.length * 100;
const precision = truePositives / (truePositives + falsePositives) * 100 || 0;
const recall = truePositives / (truePositives + falseNegatives) * 100 || 0;

console.log('Confusion Matrix:');
console.log(`                     Actual Fail    Actual Success`);
console.log(`  Predicted Fail        ${truePositives.toString().padStart(3)}            ${falsePositives.toString().padStart(3)}`);
console.log(`  Predicted Success     ${falseNegatives.toString().padStart(3)}            ${trueNegatives.toString().padStart(3)}`);
console.log('');
console.log(`Accuracy:  ${accuracy.toFixed(1)}%`);
console.log(`Precision: ${precision.toFixed(1)}% (when we predict fail, how often correct)`);
console.log(`Recall:    ${recall.toFixed(1)}% (of actual failures, how many we caught)`);
console.log('');

// ============================================================================
// PREDICT ONGOING TRIALS
// ============================================================================

console.log('════════════════════════════════════════════════════════════════');
console.log('PREDICTIONS FOR ONGOING/CURRENT TRIALS');
console.log('════════════════════════════════════════════════════════════════');
console.log('');

if (ongoingTrials.length === 0) {
  console.log('No ongoing trials found in database.');
  console.log('Adding current Phase 3 trials for prediction...');
  console.log('');

  // Add current trials not in the database
  const currentTrials: Trial[] = [
    {
      name: 'Lecanemab (Leqembi) - Ongoing extension',
      mechanism: 'Anti-Aβ protofibril antibody',
      population: 'Early AD',
      isCompleted: false,
      actualOutcome: 'unknown',
    },
    {
      name: 'Donanemab (Kisunla) - Real-world',
      mechanism: 'Anti-Aβ plaque antibody',
      population: 'Early AD',
      isCompleted: false,
      actualOutcome: 'unknown',
    },
    {
      name: 'Remternetug',
      mechanism: 'Anti-Aβ antibody (pyroglutamate)',
      population: 'Early AD',
      isCompleted: false,
      actualOutcome: 'unknown',
    },
    {
      name: 'Simufilam (PTI-125)',
      mechanism: 'Filamin A modulator',
      population: 'Mild-moderate AD',
      isCompleted: false,
      actualOutcome: 'unknown',
    },
    {
      name: 'Blarcamesine (ANAVEX2-73)',
      mechanism: 'Sigma-1 receptor agonist',
      population: 'Early AD',
      isCompleted: false,
      actualOutcome: 'unknown',
    },
    {
      name: 'Masitinib',
      mechanism: 'Tyrosine kinase inhibitor (mast cells, microglia)',
      population: 'Mild-moderate AD',
      isCompleted: false,
      actualOutcome: 'unknown',
    },
    {
      name: 'Valiltramiprosate (ALZ-801)',
      mechanism: 'Anti-Aβ oligomer (prodrug of tramiprosate)',
      population: 'APOE4 carriers, early AD',
      isCompleted: false,
      actualOutcome: 'unknown',
    },
    {
      name: 'Semaglutide (AD trial)',
      mechanism: 'GLP-1 receptor agonist',
      population: 'Early AD',
      isCompleted: false,
      actualOutcome: 'unknown',
    },
    {
      name: 'CMS121',
      mechanism: 'Fatty acid synthase inhibitor / ferroptosis inhibitor',
      population: 'Early AD',
      isCompleted: false,
      actualOutcome: 'unknown',
    },
    {
      name: 'NE3107',
      mechanism: 'ERK/NFκB inhibitor (insulin sensitizer)',
      population: 'Mild-moderate AD',
      isCompleted: false,
      actualOutcome: 'unknown',
    },
    {
      name: 'Buntanetap (Posiphen)',
      mechanism: 'APP/tau translational inhibitor',
      population: 'Early AD',
      isCompleted: false,
      actualOutcome: 'unknown',
    },
    {
      name: 'CT1812',
      mechanism: 'Sigma-2 receptor antagonist (blocks Aβ oligomer binding)',
      population: 'Mild-moderate AD',
      isCompleted: false,
      actualOutcome: 'unknown',
    },
  ];

  ongoingTrials.push(...currentTrials);
}

const ongoingPredictions = ongoingTrials.map(t => predictTrialOutcome(t));

// Sort by failure risk (highest first)
ongoingPredictions.sort((a, b) => b.overallFailureRisk - a.overallFailureRisk);

console.log('TRIALS RANKED BY PREDICTED FAILURE RISK:');
console.log('');

ongoingPredictions.forEach((pred, i) => {
  const riskLevel = pred.overallFailureRisk >= 70 ? '🔴 HIGH RISK' :
                    pred.overallFailureRisk >= 50 ? '🟡 MODERATE' :
                    '🟢 LOWER RISK';

  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`${i + 1}. ${pred.trial.name.toUpperCase()}`);
  console.log(`   ${riskLevel} - Failure Probability: ${pred.overallFailureRisk.toFixed(0)}%`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

  console.log(`   Mechanism: ${pred.trial.mechanism}`);
  console.log(`   Population: ${pred.trial.population}`);
  console.log(`   Confidence: ${pred.confidence}`);
  console.log('');

  console.log('   DAG METRICS:');
  console.log(`     Distance to outcomes: ${pred.dagMetrics.avgDistanceToOutcomes >= 0 ? pred.dagMetrics.avgDistanceToOutcomes.toFixed(1) + ' steps' : 'No path'}`);
  console.log(`     Feedback loops broken: ${pred.dagMetrics.loopsBroken}/${feedbackLoops.length}`);
  console.log(`     Causal paths disrupted: ${pred.dagMetrics.pathsDisrupted}`);
  console.log(`     Modules affected: ${pred.matchedModules.join(', ') || 'Unknown'}`);
  console.log('');

  console.log('   PHARMACOLOGICAL METRICS:');
  if (pred.pharmaMetrics.cnsMpoScore !== null) {
    const mpoLevel = pred.pharmaMetrics.cnsMpoScore >= 4 ? '✓ Good' :
                     pred.pharmaMetrics.cnsMpoScore >= 3 ? '⚠ Marginal' : '✗ Poor';
    console.log(`     CNS MPO Score: ${pred.pharmaMetrics.cnsMpoScore.toFixed(2)}/6 (${mpoLevel})`);
  }
  if (pred.pharmaMetrics.molecularWeight !== null) {
    const mwStatus = pred.pharmaMetrics.molecularWeight <= 450 ? '✓' :
                     pred.pharmaMetrics.molecularWeight <= 500 ? '⚠' : '✗';
    console.log(`     Molecular Weight: ${pred.pharmaMetrics.molecularWeight.toFixed(0)} Da ${mwStatus}`);
  }
  if (pred.pharmaMetrics.tpsa !== null) {
    const tpsaStatus = pred.pharmaMetrics.tpsa <= 90 ? '✓' : '✗';
    console.log(`     TPSA: ${pred.pharmaMetrics.tpsa.toFixed(1)} Å² ${tpsaStatus}`);
  }
  if (pred.pharmaMetrics.bbbPenetration) {
    console.log(`     BBB Penetration: ${pred.pharmaMetrics.bbbPenetration}`);
  }
  if (pred.pharmaMetrics.isAntibody) {
    console.log(`     Type: Antibody (~0.1% brain uptake)`);
  } else if (pred.pharmaMetrics.isPeptide) {
    console.log(`     Type: Peptide (poor BBB penetration)`);
  }
  console.log('');

  console.log('   RISK BREAKDOWN:');
  console.log(`     Loop miss risk:        ${pred.riskScores.loopMissRisk}% (weight: 25%)`);
  console.log(`     BBB penetration risk:  ${pred.riskScores.bbbPenetrationRisk}% (weight: 19%)`);
  console.log(`     Downstream risk:       ${pred.riskScores.downstreamRisk}% (weight: 12%)`);
  console.log(`     Historical pattern:    ${pred.riskScores.historicalPatternRisk}% (weight: 12%)`);
  console.log(`     Single target risk:    ${pred.riskScores.singleTargetRisk}% (weight: 8%)`);
  console.log(`     Stage mismatch:        ${pred.riskScores.stageMismatchRisk}% (weight: 8%)`);
  console.log('');

  if (pred.topReasons.length > 0) {
    console.log('   WHY IT MAY FAIL:');
    pred.topReasons.forEach(r => console.log(`     • ${r}`));
    console.log('');
  }

  if (pred.whatWouldHelp.length > 0) {
    console.log('   WHAT WOULD IMPROVE CHANCES:');
    pred.whatWouldHelp.forEach(s => console.log(`     → ${s}`));
    console.log('');
  }
});

// ============================================================================
// SUMMARY
// ============================================================================

console.log('════════════════════════════════════════════════════════════════');
console.log('PREDICTION SUMMARY');
console.log('════════════════════════════════════════════════════════════════');
console.log('');

const highRisk = ongoingPredictions.filter(p => p.overallFailureRisk >= 70);
const moderateRisk = ongoingPredictions.filter(p => p.overallFailureRisk >= 50 && p.overallFailureRisk < 70);
const lowerRisk = ongoingPredictions.filter(p => p.overallFailureRisk < 50);

console.log(`🔴 HIGH RISK (≥70%):     ${highRisk.length} trials`);
highRisk.forEach(p => console.log(`   - ${p.trial.name}: ${p.overallFailureRisk.toFixed(0)}%`));
console.log('');

console.log(`🟡 MODERATE RISK (50-69%): ${moderateRisk.length} trials`);
moderateRisk.forEach(p => console.log(`   - ${p.trial.name}: ${p.overallFailureRisk.toFixed(0)}%`));
console.log('');

console.log(`🟢 LOWER RISK (<50%):    ${lowerRisk.length} trials`);
lowerRisk.forEach(p => console.log(`   - ${p.trial.name}: ${p.overallFailureRisk.toFixed(0)}%`));
console.log('');

// Key insight
const noLoopBreakers = ongoingPredictions.filter(p => p.dagMetrics.loopsBroken === 0);
console.log('════════════════════════════════════════════════════════════════');
console.log('CRITICAL INSIGHT');
console.log('════════════════════════════════════════════════════════════════');
console.log('');
console.log(`${noLoopBreakers.length}/${ongoingPredictions.length} ongoing trials do NOT break any feedback loops.`);
console.log('');
console.log('This is the single strongest predictor of failure in our historical data.');
console.log('100% of past failures shared this characteristic.');
console.log('');
console.log('Trials most likely to succeed target:');
console.log('  1. mTORC1-S6K1-IRS1 insulin resistance loop (Semaglutide)');
console.log('  2. NLRP3-Tau feedforward loop (Colchicine-like mechanisms)');
console.log('  3. Lysosomal dysfunction-inflammation loop');
console.log('');

console.log('════════════════════════════════════════════════════════════════');
console.log('PREDICTION COMPLETE');
console.log('════════════════════════════════════════════════════════════════');
