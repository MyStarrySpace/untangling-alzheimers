/**
 * Module 13: Cholinergic & White Matter
 */

import type { MechanisticNode } from '../types';

export const module13Nodes: MechanisticNode[] = [
  {
    id: 'cholinergic_degeneration',
    label: 'Cholinergic Degeneration',
    category: 'STATE', // SBSF v2.0: Was PROCESS, now STATE (process activity as categorical state)
    subtype: 'Neurodegeneration',
    moduleId: 'M13',
    description: 'Basal forebrain cholinergic neuron loss',
    mechanism: 'Basis for AChEI symptomatic treatment',
  },
  {
    id: 'ach_reduced',
    label: 'Acetylcholine Reduced',
    category: 'STOCK',
    subtype: 'MetaboliteSignal',
    moduleId: 'M13',
    description: 'Cholinergic deficit in AD',
    mechanism: 'ChAT↓, ACh↓ in cortex and hippocampus',
    roles: ['THERAPEUTIC_TARGET'],
  },
  {
    id: 'white_matter_pathology',
    label: 'White Matter Pathology',
    category: 'STATE',
    subtype: 'DiseaseStage',
    moduleId: 'M13',
    description: 'Myelin/oligodendrocyte dysfunction',
    mechanism: 'A1 astrocytes kill oligodendrocytes',
  },
  {
    id: 'myelin_breakdown',
    label: 'Myelin Breakdown',
    category: 'STATE', // SBSF v2.0: Was PROCESS, now STATE (process activity as categorical state)
    subtype: 'Neurodegeneration',
    moduleId: 'M13',
    description: 'Demyelination in AD',
    mechanism: 'Oligodendrocyte death → myelin loss → axonal dysfunction',
  },

  // Oligodendrocyte Lineage (added 2026-01-15)
  {
    id: 'opcs',
    label: 'Oligodendrocyte Precursor Cells',
    category: 'STOCK',
    subtype: 'CellPopulation',
    moduleId: 'M13',
    references: {
      cellType: 'CL:0002453', // oligodendrocyte precursor cell
    },
    description: 'NG2+ progenitors; maintain remyelination capacity; support BBB',
    mechanism: 'OPCs differentiate to mature OLs; also release TGF-β1 for BBB support; Ca²⁺ signals precede pericyte dilation in NVC. Key evidence: Seo 2014 (PMID:25186741) showed OPCs support BBB integrity via TGF-β1; Rungta 2018 (PMID:29937277) showed OPC Ca²⁺ signals precede pericyte dilation',
    units: 'cells/mm³',
  },
  {
    id: 'mature_oligodendrocytes',
    label: 'Mature Oligodendrocytes',
    category: 'STOCK',
    subtype: 'CellPopulation',
    moduleId: 'M13',
    references: {
      cellType: 'CL:0000128', // oligodendrocyte
    },
    description: 'MBP+/MOG+ myelinating cells; vulnerable to APOE4, A1 astrocytes',
    mechanism: 'Produce and maintain myelin sheaths; require cholesterol for myelin synthesis; killed by A1 astrocyte-derived saturated lipids. Blanchard 2022 Nature (PMID:36385529) showed APOE4 impairs cholesterol transport to oligodendrocytes leading to myelin deficits',
    units: 'cells/mm³',
  },
  {
    id: 'opc_nos1_activity',
    label: 'OPC NOS1 Activity',
    category: 'STATE',
    subtype: 'BiologicalProcess',
    moduleId: 'M13',
    references: {
      gene: 'HGNC:7872', // NOS1
      protein: 'UniProt:P29475',
    },
    description: 'Nitric oxide synthase 1 expression in OPCs - HUMAN-SPECIFIC',
    mechanism: 'Human OPCs express NOS1 (cell type enhanced, τ=0.85 per Human Protein Atlas); mouse OPCs do NOT express Nos1 (Tabula Muris/Allen Brain Atlas). CRITICAL TRANSLATIONAL GAP: Human-specific NOS1 expression in OPCs means mouse BBB models lack this signaling axis. Current BBB models (Transwell, organoids) typically lack oligodendrocyte lineage cells entirely',
  },
  {
    id: 'ol_cholesterol_synthesis',
    label: 'OL Cholesterol Synthesis',
    category: 'STATE',
    subtype: 'MetabolicState',
    moduleId: 'M13',
    references: {
      process: 'GO:0006695', // cholesterol biosynthetic process
    },
    description: 'Oligodendrocyte cholesterol production for myelin',
    mechanism: 'OLs synthesize cholesterol de novo OR receive from astrocytes via APOE. APOE4 impairs both pathways: ↓SREBP2 in OLs + poor lipidation of secreted APOE4. Blanchard 2022 (PMID:36385529): APOE4 oligodendrocytes have reduced cholesterol synthesis and increased reliance on external cholesterol that cannot be adequately supplied',
    roles: ['THERAPEUTIC_TARGET'],
  },
  {
    id: 'opc_tgf_beta1',
    label: 'OPC-Derived TGF-β1',
    category: 'STOCK',
    subtype: 'CytokineSignal',
    moduleId: 'M13',
    references: {
      gene: 'HGNC:11766', // TGFB1
      protein: 'UniProt:P01137',
    },
    description: 'TGF-β1 secreted by OPCs to support BBB integrity',
    mechanism: 'OPCs release TGF-β1 → activates TGF-βR on pericytes/endothelium → maintains tight junctions. OPC loss → BBB breakdown. Seo 2014 (PMID:25186741): OPC-derived TGF-β1 is essential for maintaining blood-brain barrier integrity',
    sharedWith: ['M12'], // BBB/Glymphatic module
  },
  {
    id: 'opc_vascular_coupling',
    label: 'OPC-Vascular Coupling',
    category: 'STATE',
    subtype: 'BiologicalProcess',
    moduleId: 'M13',
    references: {
      process: 'GO:0001974', // blood vessel remodeling
    },
    description: 'OPC Ca²⁺ signaling drives neurovascular coupling',
    mechanism: 'OPCs wrap capillaries; Ca²⁺ transients in OPCs PRECEDE pericyte relaxation during functional hyperemia. Human OPCs may use NOS1/NO pathway (absent in mice). Rungta 2018 (PMID:29937277) showed calcium increases in NG2 cells precede arteriole dilation. TRANSLATIONAL GAP: Human mechanism may differ due to NOS1 expression',
    sharedWith: ['M12'], // BBB/Glymphatic module
  },
  {
    id: 'remyelination_capacity',
    label: 'Remyelination Capacity',
    category: 'STATE',
    subtype: 'Homeostatic',
    moduleId: 'M13',
    description: 'Ability to regenerate myelin after damage',
    mechanism: 'Requires OPC pool + differentiation signals + cholesterol supply. Declines with age: OPC senescence, LINGO1↑, Nogo receptor activation. Neumann 2019 (PMID:31497960): Remyelination efficiency declines with age due to impaired OPC differentiation',
    roles: ['THERAPEUTIC_TARGET'],
  },

  // ============================================================================
  // SLIT2-ROBO1 Demyelination Axis (Chen et al. 2025)
  // Key insight: Demyelination in AD is NOT microglial attack on myelin,
  // but oligodendrocyte SELF-WITHDRAWAL triggered by aberrant neuronal SLIT2 signaling
  // ============================================================================
  {
    id: 'slit2_neuronal',
    label: 'Neuronal SLIT2',
    category: 'STOCK',
    subtype: 'ProteinPool',
    moduleId: 'M13',
    references: {
      gene: 'HGNC:11086', // SLIT2
      protein: 'UniProt:O94813',
    },
    description: 'SLIT2 secreted by excitatory neurons; upregulated in tauopathy',
    mechanism: 'SLIT2 is a developmental axon guidance cue reactivated in AD. Tau pathology → microglia activation (DAP12/TREM2) → unknown signal → excitatory neurons upregulate SLIT2 → secreted SLIT2 binds ROBO1 on OLs. Chen 2025 (PMID pending): SLIT2 elevated in AD grey matter; colocalized with myelinated axons',
    sharedWith: ['M07'], // Tau module - trigger for SLIT2 upregulation
  },
  {
    id: 'robo1_ol',
    label: 'OL ROBO1 Receptor',
    category: 'STOCK',
    subtype: 'SurfaceReceptor',
    moduleId: 'M13',
    references: {
      gene: 'HGNC:10249', // ROBO1
      protein: 'UniProt:Q9Y6N7',
    },
    description: 'Roundabout guidance receptor 1 on oligodendrocytes',
    mechanism: 'ROBO1 is the primary receptor for SLIT2 on OLs. SLIT2 binds ROBO1 Ig1 domain → Fyn dissociates from ROBO1 cytoplasmic domain → RhoA activation → process retraction. ROBO1 also upregulated in tauopathy. Liu 2012 (PMID:22447934): SLIT2-ROBO1-Fyn-RhoA pathway regulates OPC migration',
    roles: ['THERAPEUTIC_TARGET'],
  },
  {
    id: 'fyn_kinase_ol',
    label: 'OL Fyn Kinase Activity',
    category: 'STATE',
    subtype: 'BiologicalProcess',
    moduleId: 'M13',
    references: {
      gene: 'HGNC:4037', // FYN
      protein: 'UniProt:P06241',
    },
    description: 'Fyn kinase activity in oligodendrocytes; normally promotes OL maturation',
    mechanism: 'Fyn normally bound to ROBO1 cytoplasmic domain, maintaining OL process extension. SLIT2 binding → Fyn dissociates → Fyn DEACTIVATED → p190RhoGAP activity decreases → RhoA-GTP increases. Fyn also promotes OL differentiation via MBP regulation. Saracatinib (Fyn inhibitor) failed Phase 2a in AD but tested wrong patient subtype',
    roles: ['THERAPEUTIC_TARGET'],
  },
  {
    id: 'rhoa_gtp_ol',
    label: 'OL RhoA-GTP',
    category: 'STOCK',
    subtype: 'ActiveProteinPool',
    moduleId: 'M13',
    references: {
      gene: 'HGNC:667', // RHOA
      protein: 'UniProt:P61586',
    },
    description: 'Active RhoA (GTP-bound) in oligodendrocytes; drives cytoskeletal contraction',
    mechanism: 'RhoA-GTP activates ROCK kinase → actin stress fibers → OL process RETRACTION. SLIT2-ROBO1 signaling increases RhoA-GTP via: (1) Fyn dissociation → p190RhoGAP↓ → RhoA-GTP↑; (2) SRGAP recruitment → Cdc42/Rac1↓. Fasudil (ROCK inhibitor) could theoretically block downstream but non-selective',
    roles: ['THERAPEUTIC_TARGET'],
  },
  {
    id: 'ol_process_retraction',
    label: 'OL Process Retraction',
    category: 'STATE',
    subtype: 'BiologicalProcess',
    moduleId: 'M13',
    description: 'Oligodendrocyte process retraction from axons; primary mechanism of Class B AD demyelination',
    mechanism: 'SLIT2-ROBO1-Fyn-RhoA cascade causes OLs to physically WITHDRAW processes from axons. NOT microglial attack (as in MS). Physical changes: process retraction, failed membrane spreading, blocked differentiation, disrupted myelin compaction. Chen 2025: DAP12 KO reduces demyelination by interrupting SLIT2 induction, NOT by removing microglial attackers',
  },
  {
    id: 'myelin_sheath_withdrawal',
    label: 'Myelin Sheath Withdrawal',
    category: 'STATE',
    subtype: 'Neurodegeneration',
    moduleId: 'M13',
    description: 'Active myelin sheath withdrawal/retraction (distinct from degradation)',
    mechanism: 'Myelin sheaths RETRACT rather than being attacked. Key distinction from MS: in AD Class B, demyelination is inside-out (OL withdrawal) not outside-in (immune attack). This explains why complement inhibitors may not help Class B AD. Results in: axonal exposure, conduction slowing, secondary OPC exhaustion via myelin debris inhibition',
  },
  {
    id: 'dap12_signaling',
    label: 'DAP12 Signaling',
    category: 'STATE',
    subtype: 'BiologicalProcess',
    moduleId: 'M13',
    sharedWith: ['M05', 'M11'], // Microglia, TREM2/DAM modules
    references: {
      gene: 'HGNC:12449', // TYROBP (DAP12)
      protein: 'UniProt:O43914',
    },
    description: 'DAP12/TYROBP signaling in microglia; triggers SLIT2 induction in neurons',
    mechanism: 'DAP12 is TREM2 signaling adaptor with ITAM motif. Tau internalization → DAP12/TREM2 signaling → pAKT↑, pERK↑, pNFκB↑, IFN↑ → unknown signal to neurons → neuronal SLIT2↑. Chen 2025: DAP12 KO reduces demyelination DESPITE increasing tau pathology. Paradox: DAP12 needed for debris clearance but harmful during active tauopathy',
    roles: ['THERAPEUTIC_TARGET'],
  },
];

// ============================================================================
// MODULE 14: MAM & Calcium
