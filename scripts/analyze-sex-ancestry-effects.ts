/**
 * Analyze Sex & Ancestry Effects in the AD Network
 *
 * This script identifies:
 * 1. Which nodes are downstream of sex/ancestry modifiers (differential effects)
 * 2. Which feedback loops are influenced by sex/ancestry
 * 3. Which treatments target sex-modified pathways
 * 4. Nodes with known safety constraints (carcinogenicity, hepatotoxicity)
 * 5. BBB penetration requirements for each pathway
 *
 * Usage:
 *   npx tsx scripts/analyze-sex-ancestry-effects.ts
 */

import { allNodes } from '../src/data/mechanisticFramework/nodes';
import { allEdges } from '../src/data/mechanisticFramework/edges';
import { feedbackLoops } from '../src/data/mechanisticFramework/feedbackLoops';
import { treatmentLibrary } from '../src/data/mechanisticFramework/drugLibrary';
import { buildAdjacencyLists } from '../src/lib/pathwayCalculation';

// ============================================================================
// SEX/ANCESTRY MODIFIER NODES (Module 16)
// ============================================================================

const SEX_ANCESTRY_NODES = [
  'sex',
  'estrogen_level',
  'testosterone_level',
  'fsh_elevated',
  'x_linked_lysosomal_genes',
  'visceral_adipose_tissue',
  'apoe4_ancestry_effect',
  'female_iron_storage_failure',
];

// Nodes with known safety constraints that limit druggability
const SAFETY_CONSTRAINED_NODES: Record<string, { constraint: string; details: string }> = {
  // mTOR pathway - immunosuppression
  'mtorc1_hyperactive': {
    constraint: 'immunosuppression',
    details: 'mTOR inhibition causes dose-limiting immunosuppression at therapeutic doses',
  },
  // GSK3β - oncogenesis concern
  'gsk3b_active': {
    constraint: 'carcinogenicity_risk',
    details: 'GSK3β inhibition may promote Wnt signaling and tumorigenesis in some contexts',
  },
  // BACE1 - substrate specificity
  'bace1_active': {
    constraint: 'off_target_effects',
    details: 'BACE1 inhibitors failed due to cognitive worsening (neuregulin cleavage impaired)',
  },
  // Gamma secretase - Notch
  'gamma_secretase': {
    constraint: 'carcinogenicity',
    details: 'Gamma secretase inhibition blocks Notch signaling → GI toxicity, skin cancers',
  },
  // Senescent cells - wound healing
  'senescent_cells': {
    constraint: 'wound_healing',
    details: 'Senolytics may impair wound healing; timing-dependent safety',
  },
  // Microglia - protective vs harmful
  'microglia_activated': {
    constraint: 'dual_role',
    details: 'Microglia have protective (clearance) and harmful (inflammation) roles; blanket inhibition risky',
  },
  // NLRP3 - infection risk
  'nlrp3_active': {
    constraint: 'infection_susceptibility',
    details: 'NLRP3 inhibition may increase susceptibility to certain infections',
  },
};

// ============================================================================
// HELPERS
// ============================================================================

const nodeMap = new Map(allNodes.map(n => [n.id, n]));
const adjacency = buildAdjacencyLists(allNodes, allEdges);

/**
 * Find all nodes downstream of a given set of source nodes (BFS)
 */
function findDownstreamNodes(sourceNodeIds: string[], maxDepth = 10): Map<string, number> {
  const downstream = new Map<string, number>(); // nodeId -> distance
  const visited = new Set<string>();
  const queue: { nodeId: string; depth: number }[] = sourceNodeIds.map(id => ({ nodeId: id, depth: 0 }));

  while (queue.length > 0) {
    const { nodeId, depth } = queue.shift()!;
    if (visited.has(nodeId) || depth > maxDepth) continue;
    visited.add(nodeId);

    if (!sourceNodeIds.includes(nodeId)) {
      downstream.set(nodeId, depth);
    }

    const neighbors = adjacency.outgoing.get(nodeId) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        queue.push({ nodeId: neighbor, depth: depth + 1 });
      }
    }
  }

  return downstream;
}

/**
 * Check if a treatment targets any nodes in a given set
 */
function treatmentTargetsNodes(treatmentId: string, nodeIds: Set<string>): string[] {
  const treatment = treatmentLibrary.find(t => t.id === treatmentId);
  if (!treatment) return [];

  return treatment.primaryTargets
    .filter(t => nodeIds.has(t.nodeId))
    .map(t => t.nodeId);
}

// ============================================================================
// MAIN ANALYSIS
// ============================================================================

console.log('');
console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     SEX & ANCESTRY EFFECTS ANALYSIS                            ║');
console.log('║     Identifying Differential Treatment Response Pathways       ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');

// ============================================================================
// 1. FIND ALL NODES DOWNSTREAM OF SEX/ANCESTRY MODIFIERS
// ============================================================================

console.log('════════════════════════════════════════════════════════════════');
console.log('1. NODES AFFECTED BY SEX/ANCESTRY MODIFIERS');
console.log('════════════════════════════════════════════════════════════════');
console.log('');

const sexDownstream = findDownstreamNodes(['sex'], 8);
const estrogenDownstream = findDownstreamNodes(['estrogen_level'], 8);
const testosteroneDownstream = findDownstreamNodes(['testosterone_level'], 8);
const fshDownstream = findDownstreamNodes(['fsh_elevated'], 8);
const apoeAncestryDownstream = findDownstreamNodes(['apoe4_ancestry_effect'], 8);
const femaleIronDownstream = findDownstreamNodes(['female_iron_storage_failure'], 8);

console.log('Nodes downstream of SEX (biological sex effects):');
const sexAffected = Array.from(sexDownstream.entries())
  .sort((a, b) => a[1] - b[1])
  .slice(0, 20);
sexAffected.forEach(([nodeId, dist]) => {
  const node = nodeMap.get(nodeId);
  console.log(`  [${dist} hops] ${node?.label || nodeId}`);
});
console.log(`  ... and ${sexDownstream.size - 20} more nodes`);
console.log('');

console.log('Nodes downstream of ESTROGEN_LEVEL (menopause effects):');
const estrogenAffected = Array.from(estrogenDownstream.entries())
  .sort((a, b) => a[1] - b[1])
  .slice(0, 15);
estrogenAffected.forEach(([nodeId, dist]) => {
  const node = nodeMap.get(nodeId);
  console.log(`  [${dist} hops] ${node?.label || nodeId}`);
});
console.log('');

console.log('Nodes downstream of FSH_ELEVATED (menopause-specific):');
const fshAffected = Array.from(fshDownstream.entries())
  .sort((a, b) => a[1] - b[1])
  .slice(0, 10);
fshAffected.forEach(([nodeId, dist]) => {
  const node = nodeMap.get(nodeId);
  console.log(`  [${dist} hops] ${node?.label || nodeId}`);
});
console.log('');

console.log('Nodes downstream of FEMALE_IRON_STORAGE_FAILURE (female-specific):');
const femaleIronAffected = Array.from(femaleIronDownstream.entries())
  .sort((a, b) => a[1] - b[1]);
femaleIronAffected.forEach(([nodeId, dist]) => {
  const node = nodeMap.get(nodeId);
  console.log(`  [${dist} hops] ${node?.label || nodeId}`);
});
console.log('');

console.log('Nodes downstream of APOE4_ANCESTRY_EFFECT:');
const apoeAncestryAffected = Array.from(apoeAncestryDownstream.entries())
  .sort((a, b) => a[1] - b[1])
  .slice(0, 10);
apoeAncestryAffected.forEach(([nodeId, dist]) => {
  const node = nodeMap.get(nodeId);
  console.log(`  [${dist} hops] ${node?.label || nodeId}`);
});
console.log('');

// ============================================================================
// 2. FEEDBACK LOOPS AFFECTED BY SEX/ANCESTRY
// ============================================================================

console.log('════════════════════════════════════════════════════════════════');
console.log('2. FEEDBACK LOOPS INFLUENCED BY SEX/ANCESTRY');
console.log('════════════════════════════════════════════════════════════════');
console.log('');

// Combine all sex-affected nodes
const allSexAffectedNodes = new Set<string>();
sexDownstream.forEach((_, nodeId) => allSexAffectedNodes.add(nodeId));
estrogenDownstream.forEach((_, nodeId) => allSexAffectedNodes.add(nodeId));
fshDownstream.forEach((_, nodeId) => allSexAffectedNodes.add(nodeId));
femaleIronDownstream.forEach((_, nodeId) => allSexAffectedNodes.add(nodeId));

feedbackLoops.forEach(loop => {
  const loopNodes = new Set(loop.edgeIds.flatMap(edgeId => {
    const edge = allEdges.find(e => e.id === edgeId);
    return edge ? [edge.source, edge.target] : [];
  }));

  const sexAffectedInLoop = Array.from(loopNodes).filter(n => allSexAffectedNodes.has(n));

  if (sexAffectedInLoop.length > 0) {
    console.log(`${loop.name}:`);
    console.log(`  Type: ${loop.type}`);
    console.log(`  Sex-affected nodes in loop:`);
    sexAffectedInLoop.forEach(nodeId => {
      const node = nodeMap.get(nodeId);
      const sources: string[] = [];
      if (sexDownstream.has(nodeId)) sources.push('sex');
      if (estrogenDownstream.has(nodeId)) sources.push('estrogen');
      if (fshDownstream.has(nodeId)) sources.push('FSH');
      if (femaleIronDownstream.has(nodeId)) sources.push('female_iron');
      console.log(`    - ${node?.label || nodeId} (via ${sources.join(', ')})`);
    });

    // Check intervention points
    const sexAffectedInterventions = (loop.interventionPoints || [])
      .filter(ip => allSexAffectedNodes.has(ip));
    if (sexAffectedInterventions.length > 0) {
      console.log(`  ⚠️  Intervention points affected by sex:`);
      sexAffectedInterventions.forEach(ip => {
        const node = nodeMap.get(ip);
        console.log(`    - ${node?.label || ip}`);
      });
    }
    console.log('');
  }
});

// ============================================================================
// 3. TREATMENTS TARGETING SEX-AFFECTED PATHWAYS
// ============================================================================

console.log('════════════════════════════════════════════════════════════════');
console.log('3. TREATMENTS TARGETING SEX-AFFECTED PATHWAYS');
console.log('════════════════════════════════════════════════════════════════');
console.log('');
console.log('These treatments may show differential efficacy by sex/ancestry:');
console.log('');

treatmentLibrary.forEach(treatment => {
  const targetedSexNodes = treatment.primaryTargets
    .filter(t => allSexAffectedNodes.has(t.nodeId))
    .map(t => t.nodeId);

  if (targetedSexNodes.length > 0) {
    console.log(`${treatment.name}:`);
    console.log(`  BBB Penetration: ${treatment.bbbPenetration || 'unknown'}`);
    console.log(`  Targets in sex-affected pathways:`);
    targetedSexNodes.forEach(nodeId => {
      const node = nodeMap.get(nodeId);
      const sources: string[] = [];
      if (estrogenDownstream.has(nodeId)) sources.push('estrogen↓');
      if (fshDownstream.has(nodeId)) sources.push('FSH↑');
      if (femaleIronDownstream.has(nodeId)) sources.push('female_iron');
      if (testosteroneDownstream.has(nodeId)) sources.push('testosterone');
      console.log(`    - ${node?.label || nodeId} (affected by: ${sources.join(', ') || 'sex'})`);
    });
    console.log('');
  }
});

// ============================================================================
// 4. SAFETY-CONSTRAINED NODES
// ============================================================================

console.log('════════════════════════════════════════════════════════════════');
console.log('4. NODES WITH SAFETY CONSTRAINTS (Limits Druggability)');
console.log('════════════════════════════════════════════════════════════════');
console.log('');
console.log('These nodes are difficult to target due to toxicity/safety concerns:');
console.log('');

Object.entries(SAFETY_CONSTRAINED_NODES).forEach(([nodeId, constraint]) => {
  const node = nodeMap.get(nodeId);
  console.log(`${node?.label || nodeId}:`);
  console.log(`  Constraint: ${constraint.constraint.toUpperCase()}`);
  console.log(`  Details: ${constraint.details}`);

  // Find treatments targeting this node
  const targetingTreatments = treatmentLibrary.filter(t =>
    t.primaryTargets.some(pt => pt.nodeId === nodeId)
  );
  if (targetingTreatments.length > 0) {
    console.log(`  Treatments targeting this node:`);
    targetingTreatments.forEach(t => {
      console.log(`    - ${t.name} (BBB: ${t.bbbPenetration || 'unknown'})`);
    });
  }
  console.log('');
});

// ============================================================================
// 5. BBB PENETRATION REQUIREMENTS
// ============================================================================

console.log('════════════════════════════════════════════════════════════════');
console.log('5. BBB PENETRATION ANALYSIS');
console.log('════════════════════════════════════════════════════════════════');
console.log('');

// Categorize nodes by whether they require CNS penetration
const cnsNodes = allNodes.filter(n =>
  ['M01', 'M02', 'M03', 'M04', 'M05', 'M06', 'M07', 'M08', 'M09', 'M13', 'M18'].includes(n.moduleId || '')
);
const peripheralNodes = allNodes.filter(n =>
  ['M16', 'BOUNDARY'].includes(n.moduleId || '') || n.category === 'BOUNDARY'
);

console.log('Treatments by BBB Penetration Status:');
console.log('');

const bbbGood = treatmentLibrary.filter(t => t.bbbPenetration === 'good');
const bbbModerate = treatmentLibrary.filter(t => t.bbbPenetration === 'moderate');
const bbbPoor = treatmentLibrary.filter(t => t.bbbPenetration === 'poor');
const bbbIndirect = treatmentLibrary.filter(t => t.bbbPenetration === 'indirect');
const bbbUnknown = treatmentLibrary.filter(t => !t.bbbPenetration || t.bbbPenetration === 'unknown');

console.log('GOOD BBB penetration (can target CNS nodes):');
bbbGood.forEach(t => {
  const cnsTargets = t.primaryTargets.filter(pt =>
    cnsNodes.some(n => n.id === pt.nodeId)
  ).length;
  console.log(`  - ${t.name} (${cnsTargets} CNS targets)`);
});
console.log('');

console.log('MODERATE BBB penetration (may reach CNS at sufficient dose):');
bbbModerate.forEach(t => console.log(`  - ${t.name}`));
console.log('');

console.log('POOR BBB penetration (CNS targets unreachable):');
bbbPoor.forEach(t => console.log(`  - ${t.name}`));
console.log('');

console.log('INDIRECT mechanism (peripheral action affects CNS):');
bbbIndirect.forEach(t => console.log(`  - ${t.name}`));
console.log('');

console.log('UNKNOWN BBB penetration (needs characterization):');
bbbUnknown.forEach(t => console.log(`  - ${t.name}`));
console.log('');

// ============================================================================
// 6. SUMMARY: SEX-DIFFERENTIAL TREATMENT PREDICTIONS
// ============================================================================

console.log('════════════════════════════════════════════════════════════════');
console.log('6. PREDICTED SEX-DIFFERENTIAL EFFECTS');
console.log('════════════════════════════════════════════════════════════════');
console.log('');
console.log('Based on network topology, these treatments likely show sex differences:');
console.log('');

// Find treatments most affected by sex pathways
const treatmentSexScore = treatmentLibrary.map(treatment => {
  let score = 0;
  let reasons: string[] = [];

  treatment.primaryTargets.forEach(target => {
    if (estrogenDownstream.has(target.nodeId)) {
      score += 3;
      reasons.push(`targets estrogen-affected node (${nodeMap.get(target.nodeId)?.label})`);
    }
    if (fshDownstream.has(target.nodeId)) {
      score += 3;
      reasons.push(`targets FSH-affected node (${nodeMap.get(target.nodeId)?.label})`);
    }
    if (femaleIronDownstream.has(target.nodeId)) {
      score += 2;
      reasons.push(`targets female iron pathway (${nodeMap.get(target.nodeId)?.label})`);
    }
    if (testosteroneDownstream.has(target.nodeId)) {
      score += 2;
      reasons.push(`targets testosterone-affected node (${nodeMap.get(target.nodeId)?.label})`);
    }
  });

  return { treatment, score, reasons };
}).filter(t => t.score > 0)
  .sort((a, b) => b.score - a.score);

treatmentSexScore.forEach(({ treatment, score, reasons }) => {
  console.log(`${treatment.name} (sex-differential score: ${score}):`);
  reasons.forEach(r => console.log(`  - ${r}`));
  console.log('');
});

console.log('');
console.log('════════════════════════════════════════════════════════════════');
console.log('KEY IMPLICATIONS FOR TRIAL DESIGN');
console.log('════════════════════════════════════════════════════════════════');
console.log('');
console.log('1. STRATIFY BY SEX: Treatments targeting neuroinflammation, ferroptosis,');
console.log('   or lysosomal dysfunction should pre-specify sex-stratified analysis');
console.log('');
console.log('2. MENOPAUSE TIMING: Treatments affecting estrogen-modulated pathways');
console.log('   may show different effects pre- vs post-menopause');
console.log('');
console.log('3. APOE4 × SEX INTERACTION: Women with APOE4 are at higher risk;');
console.log('   consider APOE4/sex interaction in trial design');
console.log('');
console.log('4. FEMALE-SPECIFIC IRON: Ferroptosis inhibitors may be particularly');
console.log('   effective in women due to female_iron_storage_failure pathway');
console.log('');
console.log('════════════════════════════════════════════════════════════════');
console.log('ANALYSIS COMPLETE');
console.log('════════════════════════════════════════════════════════════════');
