/**
 * Script to add network analysis column to the trial failure prediction Excel
 *
 * For each clinical trial, this script:
 * 1. Maps the drug/target to nodes in our mechanistic network
 * 2. Calculates network metrics (centrality, feedback loops affected, etc.)
 * 3. Adds the analysis to a new column in the Excel file
 *
 * Run with: npx tsx scripts/add-network-analysis-to-excel.ts
 */

import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import {
  allNodes,
  allEdges,
  feedbackLoops,
  getEdgesBySource,
  getEdgesByTarget,
  getLoopsByNode,
} from '../src/data/mechanisticFramework';

// ============================================================================
// TARGET MAPPING
// ============================================================================

/**
 * Map trial class/target descriptions to node IDs in our network
 */
const TARGET_TO_NODES: Record<string, string[]> = {
  // Amyloid-targeting
  'γ-secretase inhibitor (Aβ production)': ['gamma_secretase', 'app_processing', 'abeta_oligomers'],
  'γ-secretase inhibitor': ['gamma_secretase', 'app_processing', 'abeta_oligomers'],
  'BACE1 inhibitor (Aβ production)': ['bace1', 'app_processing', 'abeta_oligomers'],
  'BACE1 inhibitor': ['bace1', 'app_processing', 'abeta_oligomers'],
  'BACE inhibitor': ['bace1', 'app_processing', 'abeta_oligomers'],
  'Anti-Aβ mAb (primarily fibrillar/plaque)': ['abeta_plaques', 'abeta_oligomers'],
  'Anti-Aβ mAb (plaque/fibrillar)': ['abeta_plaques', 'abeta_oligomers'],
  'Anti-Aβ mAb (soluble monomer)': ['abeta_oligomers', 'abeta_monomers'],
  'Anti-Aβ mAb (protofibrils/soluble aggregates)': ['abeta_oligomers', 'abeta_protofibrils'],
  'Anti-Aβ mAb (pyroglutamate Aβ in plaques)': ['abeta_plaques', 'abeta_pyroglutamate'],
  'Anti-Aβ monoclonal antibody': ['abeta_oligomers', 'abeta_plaques'],
  'Active Aβ immunotherapy': ['abeta_oligomers', 'abeta_plaques', 'microglial_phagocytosis'],
  'Aβ aggregation inhibitor': ['abeta_oligomers', 'abeta_aggregation'],

  // Tau-targeting
  'Anti-tau mAb (N-terminus)': ['tau_hyperphosphorylated', 'tau_spreading'],
  'Anti-tau mAb (extracellular tau, N-terminus)': ['tau_hyperphosphorylated', 'tau_spreading'],
  'Anti-tau monoclonal antibody': ['tau_hyperphosphorylated', 'nft_formation'],
  'Tau aggregation inhibitor': ['tau_hyperphosphorylated', 'nft_formation'],
  'O-GlcNAcase inhibitor (tau modification)': ['tau_hyperphosphorylated', 'o_glcnac'],

  // Cholinergic
  'Cholinesterase inhibitor (AChE)': ['acetylcholine', 'cholinergic_signaling'],
  'Cholinesterase inhibitor (AChE/BuChE)': ['acetylcholine', 'cholinergic_signaling'],
  'Cholinesterase inhibitor': ['acetylcholine', 'cholinergic_signaling'],
  'Cholinesterase inhibitor (natural product)': ['acetylcholine', 'cholinergic_signaling'],
  'Cholinesterase inhibitor / APP translation inhibitor': ['acetylcholine', 'app_processing'],

  // Glutamatergic
  'NMDA receptor antagonist': ['nmda_receptor', 'glutamate_excitotoxicity'],
  'AMPA receptor modulator (ampakine)': ['ampa_receptor', 'synaptic_plasticity'],
  'Glutamate modulator': ['glutamate_excitotoxicity', 'nmda_receptor'],

  // Serotonergic
  '5-HT6 receptor antagonist': ['serotonin_signaling', 'neurotransmitter_deficit'],
  '5-HT4 receptor agonist': ['serotonin_signaling', 'neurotransmitter_deficit'],

  // Inflammation
  'Anti-TNF biologic': ['tnf_alpha', 'neuroinflammation', 'nlrp3_active'],
  'COX-2 inhibitor': ['cox2', 'neuroinflammation', 'prostaglandins'],
  'NSAID (ibuprofen)': ['cox2', 'neuroinflammation'],
  'NSAID (naproxen)': ['cox2', 'neuroinflammation'],
  'NSAID': ['cox2', 'neuroinflammation'],
  'Anti-amyloid/anti-inflammatory hypothesis': ['abeta_oligomers', 'neuroinflammation'],
  'Antibiotic / anti-inflammatory': ['neuroinflammation', 'microglial_activation'],
  'Antibiotic combo (anti-amyloid hypothesis)': ['abeta_oligomers', 'neuroinflammation'],
  'p38 MAPK inhibitor': ['p38_mapk', 'neuroinflammation', 'microglial_activation'],
  'RAGE inhibitor': ['rage_receptor', 'neuroinflammation', 'abeta_oligomers'],

  // Metabolic
  'Insulin / insulin sensitizer': ['insulin_resistance', 'insulin_signaling', 'mtorc1_hyperactive'],
  'GLP-1 receptor agonist': ['insulin_resistance', 'glp1_signaling'],
  'mTOR pathway': ['mtorc1_hyperactive', 'autophagy_impaired'],
  'Nrf2 activator': ['nrf2_pathway', 'oxidative_stress'],
  'Antioxidant': ['oxidative_stress', 'ros_production', 'nrf2_pathway'],
  'PPARγ agonist': ['ppar_gamma', 'insulin_resistance', 'neuroinflammation'],

  // Mitochondrial
  'Mitochondrial enhancer': ['mitochondrial_dysfunction', 'atp_deficit'],
  'Mitochondria-targeted antioxidant': ['mitochondrial_dysfunction', 'ros_production'],

  // Vascular
  'Calcium channel blocker (repurposed)': ['calcium_signaling', 'vascular_dysfunction'],
  'Angiotensin II receptor antagonist': ['vascular_dysfunction', 'bbb_dysfunction'],
  'Statin': ['cholesterol_dysregulation', 'vascular_dysfunction'],

  // Neurotrophin
  'NGF gene therapy': ['ngf', 'bdnf_reduced', 'neurotrophin_signaling'],
  'BDNF-related': ['bdnf_reduced', 'neurotrophin_signaling'],

  // Synaptic
  'Sigma-1 receptor agonist': ['sigma1_receptor', 'synaptic_plasticity'],
  'PDE inhibitor': ['pde_inhibitor', 'camp_signaling', 'synaptic_plasticity'],
  'Phosphodiesterase inhibitor': ['pde_inhibitor', 'camp_signaling'],

  // Other
  'Atypical antipsychotic': ['dopamine_signaling', 'serotonin_signaling'],
  'Combination symptomatic therapy': ['acetylcholine', 'nmda_receptor'],
  'Nutraceutical blend': ['oxidative_stress', 'neuroinflammation'],
  'Herbal extract (Ginkgo)': ['oxidative_stress', 'cerebral_blood_flow'],
  'Estrogen replacement': ['estrogen_signaling', 'neuroprotection'],
  'Lithium': ['gsk3b', 'tau_hyperphosphorylated', 'autophagy_impaired', 'nlrp3_active'],
  'GSK-3β inhibitor': ['gsk3b', 'tau_hyperphosphorylated'],

  // Additional mappings using actual network nodes
  'NMDA receptor antagonist': ['ltp_inhibition', 'synaptic_abeta_binding', 'neuronal_dysfunction'],
  'Oligosaccharide / gut microbiome modulator': ['nlrp3_active', 'neuroinflammation', 'microglia_activated'],
  'Histamine H3 receptor antagonist': ['ach_reduced', 'cholinergic_degeneration'],
  'α7 nicotinic ACh receptor agonist': ['ach_reduced', 'cholinergic_degeneration', 'nlrp3_active'],
  'Microtubule stabilizer': ['tau_aggregated', 'nft_formation', 'neuronal_dysfunction'],
  'Metal-protein attenuating compound': ['iron_accumulation', 'abeta_oligomers', 'labile_iron'],
  'RAGE antagonist': ['abeta_oligomers', 'nf_kb_active', 'nlrp3_active'],
  'Metal chelator / anti-aggregation': ['iron_accumulation', 'labile_iron', 'abeta_oligomers', 'lipid_peroxidation'],
  'Microtubule stabilizer / neuroprotective peptide': ['tau_aggregated', 'nft_formation'],
  'Mood stabilizer / neuroprotective hypothesis': ['gsk3b_active', 'tau_aggregated', 'nlrp3_active'],
  'Mitochondrial / antihistamine (repurposed)': ['mito_ros', 'mtdna_oxidized'],
  'PKC activator (synaptogenic)': ['synapses', 'synapse_elimination', 'ltp_inhibition'],
  'Deuterated dextromethorphan/quinidine (BPSD)': ['neuronal_dysfunction', 'ltp_inhibition'],
  'Gamma oscillation entrainment': ['microglia_activated', 'glymphatic_clearance', 'phagocytosis_impaired'],
  '40Hz sensory stimulation': ['microglia_activated', 'glymphatic_clearance', 'phagocytosis_impaired'],
  'GLP-1 receptor agonist': ['insulin_resistance', 'mtorc1_hyperactive', 'nlrp3_active'],
  'Incretin mimetic': ['insulin_resistance', 'mtorc1_hyperactive'],
  'DPP-4 inhibitor': ['insulin_resistance', 'mtorc1_hyperactive'],
  'Multimodal (synaptogenesis / neuroprotection)': ['synapses', 'synapse_elimination', 'neuronal_dysfunction'],
  'Tyrosine kinase inhibitor (neuroinflammation)': ['nf_kb_active', 'microglia_activated'],
  'p75NTR modulator': ['cholinergic_degeneration', 'neuronal_dysfunction'],
  'TREM2 agonist': ['trem2_surface', 'dam_transition_blocked', 'phagocytosis_impaired'],
  'Microglial modulator': ['microglia_activated', 'nlrp3_active', 'nf_kb_active'],
  'CSF1R inhibitor': ['microglia_activated', 'dam_stage1', 'dam_stage2'],

  // More unmapped targets
  'Atypical antipsychotic': ['neuronal_dysfunction', 'chronic_stress'],
  '5-HT6 receptor antagonist': ['ach_reduced', 'cholinergic_degeneration', 'cognitive_score'],
  'AMPA receptor modulator (ampakine)': ['ltp_inhibition', 'synapses', 'cognitive_score'],
  'Nicotinic receptor agonist': ['ach_reduced', 'cholinergic_degeneration'],
  'Muscarinic receptor agonist': ['ach_reduced', 'cholinergic_degeneration'],
  'Glial modulator / PDE inhibitor': ['microglia_activated', 'nlrp3_active'],
  'Ergoline derivative (vascular/neurometabolic)': ['bbb_breakdown', 'cerebral_blood_flow_reduced'],
  'Ergot alkaloid mixture (vascular)': ['bbb_breakdown', 'cerebral_blood_flow_reduced'],
  'Antihypertensive (ARB)': ['bbb_integrity', 'pericyte_function'],
  'DHA / omega-3 fatty acid': ['lipid_peroxidation', 'neuroinflammation'],
  'Vitamin E (α-tocopherol)': ['lipid_peroxidation', 'mito_ros'],
  'Vitamin D supplementation': ['nlrp3_active', 'nf_kb_active'],
  'Huperzine A': ['ach_reduced', 'cholinergic_degeneration'],
  'Active Aβ immunotherapy': ['abeta_oligomers', 'abeta_plaques', 'phagocytosis_impaired'],
  'Passive Aβ immunotherapy': ['abeta_oligomers', 'abeta_plaques'],
};

/**
 * Try to find matching nodes for a target description
 */
function findNodesForTarget(targetDesc: string): string[] {
  // Direct match
  if (TARGET_TO_NODES[targetDesc]) {
    return TARGET_TO_NODES[targetDesc];
  }

  // Partial match
  const lowerTarget = targetDesc.toLowerCase();
  for (const [key, nodes] of Object.entries(TARGET_TO_NODES)) {
    if (lowerTarget.includes(key.toLowerCase()) || key.toLowerCase().includes(lowerTarget)) {
      return nodes;
    }
  }

  // Keyword matching
  const keywords: Record<string, string[]> = {
    'amyloid': ['abeta_oligomers', 'abeta_plaques'],
    'aβ': ['abeta_oligomers', 'abeta_plaques'],
    'tau': ['tau_hyperphosphorylated', 'nft_formation'],
    'bace': ['bace1', 'app_processing'],
    'secretase': ['gamma_secretase', 'app_processing'],
    'cholinesterase': ['acetylcholine', 'cholinergic_signaling'],
    'acetylcholine': ['acetylcholine', 'cholinergic_signaling'],
    'nmda': ['nmda_receptor', 'glutamate_excitotoxicity'],
    'glutamate': ['glutamate_excitotoxicity'],
    'serotonin': ['serotonin_signaling'],
    '5-ht': ['serotonin_signaling'],
    'dopamine': ['dopamine_signaling'],
    'inflamm': ['neuroinflammation', 'nlrp3_active'],
    'tnf': ['tnf_alpha', 'neuroinflammation'],
    'cox': ['cox2', 'neuroinflammation'],
    'nsaid': ['cox2', 'neuroinflammation'],
    'insulin': ['insulin_resistance', 'insulin_signaling'],
    'glp-1': ['glp1_signaling', 'insulin_resistance'],
    'mtor': ['mtorc1_hyperactive'],
    'autophagy': ['autophagy_impaired'],
    'mitochond': ['mitochondrial_dysfunction'],
    'oxidat': ['oxidative_stress', 'ros_production'],
    'antioxidant': ['oxidative_stress', 'nrf2_pathway'],
    'vascular': ['vascular_dysfunction'],
    'cholesterol': ['cholesterol_dysregulation'],
    'statin': ['cholesterol_dysregulation'],
    'calcium': ['calcium_signaling'],
    'synaptic': ['synaptic_loss', 'synaptic_plasticity'],
    'microglia': ['microglial_activation'],
    'astrocyte': ['astrocyte_reactivity'],
    'nrf2': ['nrf2_pathway'],
    'gsk': ['gsk3b'],
    'lithium': ['gsk3b', 'autophagy_impaired'],
  };

  for (const [keyword, nodes] of Object.entries(keywords)) {
    if (lowerTarget.includes(keyword)) {
      return nodes;
    }
  }

  return [];
}

// ============================================================================
// NETWORK METRICS
// ============================================================================

/**
 * Calculate network metrics for a set of target nodes
 */
function calculateNetworkMetrics(targetNodeIds: string[]): {
  nodesFound: number;
  totalNodes: number;
  inDegree: number;
  outDegree: number;
  feedbackLoopsAffected: number;
  reinforcingLoopsAffected: number;
  networkCoverage: number;
  upstreamNodes: number;
  downstreamNodes: number;
} {
  // Filter to nodes that exist in our network
  const existingNodeIds = targetNodeIds.filter(id =>
    allNodes.some(n => n.id === id || n.id.includes(id) || id.includes(n.id))
  );

  // Also try partial matching
  const matchedNodes: string[] = [];
  for (const targetId of targetNodeIds) {
    const match = allNodes.find(n =>
      n.id === targetId ||
      n.id.includes(targetId) ||
      targetId.includes(n.id) ||
      n.label.toLowerCase().includes(targetId.replace(/_/g, ' '))
    );
    if (match && !matchedNodes.includes(match.id)) {
      matchedNodes.push(match.id);
    }
  }

  const nodesFound = matchedNodes.length;

  if (nodesFound === 0) {
    return {
      nodesFound: 0,
      totalNodes: targetNodeIds.length,
      inDegree: 0,
      outDegree: 0,
      feedbackLoopsAffected: 0,
      reinforcingLoopsAffected: 0,
      networkCoverage: 0,
      upstreamNodes: 0,
      downstreamNodes: 0,
    };
  }

  // Calculate degree centrality
  let totalInDegree = 0;
  let totalOutDegree = 0;
  const upstreamSet = new Set<string>();
  const downstreamSet = new Set<string>();

  for (const nodeId of matchedNodes) {
    const inEdges = getEdgesByTarget(nodeId);
    const outEdges = getEdgesBySource(nodeId);
    totalInDegree += inEdges.length;
    totalOutDegree += outEdges.length;

    inEdges.forEach(e => upstreamSet.add(e.source));
    outEdges.forEach(e => downstreamSet.add(e.target));
  }

  // Count feedback loops affected
  const loopsAffected = new Set<string>();
  const reinforcingLoops = new Set<string>();

  for (const nodeId of matchedNodes) {
    const loops = getLoopsByNode(nodeId);
    loops.forEach(loop => {
      loopsAffected.add(loop.id);
      if (loop.type === 'reinforcing') {
        reinforcingLoops.add(loop.id);
      }
    });
  }

  // Calculate network coverage (% of nodes reachable within 2 hops)
  const reachable = new Set<string>(matchedNodes);
  for (const nodeId of matchedNodes) {
    upstreamSet.forEach(n => reachable.add(n));
    downstreamSet.forEach(n => reachable.add(n));
  }

  return {
    nodesFound,
    totalNodes: targetNodeIds.length,
    inDegree: totalInDegree,
    outDegree: totalOutDegree,
    feedbackLoopsAffected: loopsAffected.size,
    reinforcingLoopsAffected: reinforcingLoops.size,
    networkCoverage: Math.round((reachable.size / allNodes.length) * 100),
    upstreamNodes: upstreamSet.size,
    downstreamNodes: downstreamSet.size,
  };
}

/**
 * Generate analysis summary string
 */
function generateAnalysisSummary(
  targetDesc: string,
  nodeIds: string[],
  metrics: ReturnType<typeof calculateNetworkMetrics>
): string {
  if (metrics.nodesFound === 0) {
    return `No network mapping found for "${targetDesc}"`;
  }

  const parts: string[] = [];

  parts.push(`Targets: ${nodeIds.slice(0, 3).join(', ')}${nodeIds.length > 3 ? '...' : ''}`);
  parts.push(`Nodes found: ${metrics.nodesFound}/${metrics.totalNodes}`);
  parts.push(`Degree: in=${metrics.inDegree}, out=${metrics.outDegree}`);
  parts.push(`Loops: ${metrics.feedbackLoopsAffected} (${metrics.reinforcingLoopsAffected} reinforcing)`);
  parts.push(`Network reach: ${metrics.networkCoverage}%`);

  return parts.join(' | ');
}

// ============================================================================
// MAIN SCRIPT
// ============================================================================

async function main() {
  const inputPath = path.join(
    process.cwd(),
    'src/data/mechanistic_framework/ad_framework_with_network_analysis.xlsx'
  );
  const outputPath = inputPath; // Overwrite the copy

  console.log('Reading Excel file...');
  const workbook = XLSX.readFile(inputPath);

  const sheetName = 'Cases_v2';
  const worksheet = workbook.Sheets[sheetName];
  const data: Record<string, unknown>[] = XLSX.utils.sheet_to_json(worksheet);

  console.log(`Processing ${data.length} trials...`);

  // Add network analysis for each row
  const results: {
    program: string;
    target: string;
    nodeIds: string[];
    metrics: ReturnType<typeof calculateNetworkMetrics>;
    summary: string;
  }[] = [];

  for (const row of data) {
    const program = row['Program'] as string || '';
    const targetDesc = row['Class / target'] as string || '';

    const nodeIds = findNodesForTarget(targetDesc);
    const metrics = calculateNetworkMetrics(nodeIds);
    const summary = generateAnalysisSummary(targetDesc, nodeIds, metrics);

    results.push({ program, target: targetDesc, nodeIds, metrics, summary });

    // Add to row
    (row as Record<string, unknown>)['Network Analysis'] = summary;
    (row as Record<string, unknown>)['Network Nodes Found'] = metrics.nodesFound;
    (row as Record<string, unknown>)['Network Loops Affected'] = metrics.feedbackLoopsAffected;
    (row as Record<string, unknown>)['Network Reinforcing Loops'] = metrics.reinforcingLoopsAffected;
    (row as Record<string, unknown>)['Network Coverage %'] = metrics.networkCoverage;
  }

  // Convert back to worksheet
  const newWorksheet = XLSX.utils.json_to_sheet(data);
  workbook.Sheets[sheetName] = newWorksheet;

  // Write output
  console.log('Writing updated Excel file...');
  XLSX.writeFile(workbook, outputPath);

  // Print summary
  console.log('\n=== Summary ===');
  console.log(`Total trials: ${data.length}`);

  const mapped = results.filter(r => r.metrics.nodesFound > 0);
  console.log(`Trials with network mapping: ${mapped.length} (${Math.round(mapped.length / data.length * 100)}%)`);

  const withLoops = results.filter(r => r.metrics.feedbackLoopsAffected > 0);
  console.log(`Trials affecting feedback loops: ${withLoops.length}`);

  // Show some examples
  console.log('\n=== Sample mappings ===');
  for (const r of results.slice(0, 10)) {
    console.log(`${r.program}: ${r.summary}`);
  }

  // Show unmapped targets
  const unmapped = results.filter(r => r.metrics.nodesFound === 0);
  if (unmapped.length > 0) {
    console.log(`\n=== Unmapped targets (${unmapped.length}) ===`);
    const uniqueUnmapped = [...new Set(unmapped.map(r => r.target))];
    for (const t of uniqueUnmapped.slice(0, 15)) {
      console.log(`  - ${t}`);
    }
  }

  console.log(`\nOutput written to: ${outputPath}`);
}

main().catch(console.error);
