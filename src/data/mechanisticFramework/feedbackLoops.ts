/**
 * Feedback Loops in the AD Mechanistic Network
 *
 * These self-amplifying (reinforcing) and self-regulating (balancing) loops
 * are critical for understanding disease progression and identifying
 * intervention points.
 */

import type { FeedbackLoop } from './types';

export const feedbackLoops: FeedbackLoop[] = [
  // ============================================================================
  // MODULE 1: mTORC1-S6K1-IRS1 Reinforcing Loop
  // ============================================================================
  {
    id: 'loop_mTORC1_S6K1_IRS1',
    name: 'mTORC1-S6K1-IRS1 Insulin Resistance Loop',
    type: 'reinforcing',
    description: `
      Self-amplifying pathological cycle: insulin resistance removes TSC1/2 brake
      on mTORC1 → mTORC1 activates S6K1 → S6K1 phosphorylates IRS-1 → IRS-1
      degradation/inhibition → MORE insulin resistance.

      Once initiated, this cycle is self-sustaining. Explains why metabolic
      dysfunction is progressive in AD.
    `.trim(),
    edgeIds: ['E01.001', 'E01.008', 'E01.009', 'E01.010'],
    ghostEdge: {
      source: 'IRS1_serine_phosphorylated',
      target: 'insulin_resistance',
      relation: 'increases',
      mechanism: 'IRS-1 serine phosphorylation impairs insulin signaling cascade',
    },
    clinicalImplication: 'Breaking the cycle requires intervention at any node',
    interventionPoints: [
      'mTORC1_hyperactive',  // Rapamycin/rapalogs
      'S6K1_active',         // S6K1 inhibitors (PF-4708671)
      'insulin_resistance',  // Insulin sensitizers, GLP-1 agonists
    ],
    moduleIds: ['M01'],
  },

  // ============================================================================
  // MODULE 4-7: NLRP3-Tau Feedforward Loop
  // ============================================================================
  {
    id: 'loop_NLRP3_tau_feedforward',
    name: 'NLRP3-Tau Feedforward Loop',
    type: 'reinforcing',
    description: `
      Self-amplifying tau pathology: NLRP3 activation → GSK3β↑/PP2A↓ → tau
      hyperphosphorylation → tau aggregation → aggregated tau activates NLRP3
      → MORE inflammation.

      This creates exponential progression once initiated.
    `.trim(),
    edgeIds: ['E04.005', 'E04.006', 'E04.007', 'E04.008', 'E04.010'],
    ghostEdge: {
      source: 'tau_aggregated',
      target: 'NLRP3_active',
      relation: 'increases',
      mechanism: 'PHF/NFT tau seeds phagocytosed by microglia → lysosomal rupture → NLRP3',
    },
    clinicalImplication: 'Explains rapid progression once tau pathology begins',
    interventionPoints: [
      'NLRP3_active',       // NLRP3 inhibitors (MCC950, OLT1177)
      'GSK3B_active',       // GSK3β inhibitors, H₂S donors
      'tau_aggregated',     // Anti-tau immunotherapy, aggregation inhibitors
    ],
    moduleIds: ['M04', 'M07'],
  },

  // ============================================================================
  // MODULE 5-6: LDAM-Aβ Accumulation Loop
  // ============================================================================
  {
    id: 'loop_LDAM_Abeta',
    name: 'LDAM-Aβ Clearance Failure Loop',
    type: 'reinforcing',
    description: `
      Phagocytic failure creates accumulation: LDAM phenotype → impaired
      phagocytosis → reduced Aβ clearance → more Aβ oligomers → more
      microglial activation → more LDAM.

      This explains why Aβ accumulation accelerates over time.
    `.trim(),
    edgeIds: ['E05.007', 'E05.008'],
    ghostEdge: {
      source: 'Abeta_oligomers',
      target: 'microglia_activated',
      relation: 'increases',
      mechanism: 'Aβ oligomers trigger microglial activation',
    },
    clinicalImplication: 'DGAT2 inhibitors may break this loop by reducing lipid droplets',
    interventionPoints: [
      'SREBP1_active',      // SREBP1 inhibitors
      'lipid_droplets',     // DGAT2 inhibitors
      'Abeta_oligomers',    // Anti-Aβ immunotherapy
    ],
    moduleIds: ['M05', 'M06'],
  },

  // ============================================================================
  // MODULE 2-4: Lysosomal-Inflammasome Loop
  // ============================================================================
  {
    id: 'loop_lysosome_inflammasome',
    name: 'Lysosomal Dysfunction-Inflammation Loop',
    type: 'reinforcing',
    description: `
      Lysosomal failure amplifies inflammation: lysosomal dysfunction →
      cargo accumulation → lipofuscin → LMP → cathepsin B release →
      NLRP3 activation → IL-1β → NF-κB → more lysosomal stress.

      IL-1β and other cytokines increase lysosomal stress, completing the loop.
    `.trim(),
    edgeIds: ['E01.004', 'E02.001', 'E02.002', 'E02.003', 'E02.004', 'E02.005'],
    ghostEdge: {
      source: 'IL1B',
      target: 'lysosomal_dysfunction',
      relation: 'increases',
      mechanism: 'Pro-inflammatory cytokines increase cellular stress on lysosomes',
    },
    clinicalImplication: 'Breaking at lipofuscin is impossible (irreversible); must target upstream',
    interventionPoints: [
      'mTORC1_hyperactive',  // Restore lysosomal biogenesis
      'NLRP3_active',        // NLRP3 inhibitors
      'cathepsin_B_cytosolic', // Cathepsin B inhibitors (CA-074-Me)
    ],
    moduleIds: ['M01', 'M02', 'M04'],
  },

  // ============================================================================
  // MODULE 3-4: mtDNA-cGAS-STING Inflammation Loop
  // ============================================================================
  {
    id: 'loop_mtDNA_STING',
    name: 'mtDNA-STING Aging Inflammation Loop',
    type: 'reinforcing',
    description: `
      Mitochondrial damage amplifies via inflammation: damaged mitochondria →
      mtDNA release → cGAS-STING activation → Type I IFN → ISG expression →
      impaired mitophagy → more damaged mitochondria.

      Type I IFN signaling impairs cellular quality control, feeding back.
    `.trim(),
    edgeIds: ['E03.009', 'E04.003', 'E04.004'],
    ghostEdge: {
      source: 'type_I_IFN',
      target: 'damaged_mito_pool',
      relation: 'increases',
      mechanism: 'IFN signaling impairs mitochondrial quality control',
    },
    clinicalImplication: 'STING inhibitors show promise for aging-related inflammation',
    interventionPoints: [
      'PINK1_Parkin',       // Urolithin A, mitophagy enhancers
      'STING_active',       // STING inhibitors
      'cGAS_active',        // cGAS inhibitors
    ],
    moduleIds: ['M03', 'M04'],
  },

  // ============================================================================
  // MODULE 5-8: A1 Astrocyte-Synapse Loss Loop
  // ============================================================================
  {
    id: 'loop_A1_synapse',
    name: 'A1 Astrocyte Synapse Loss Loop',
    type: 'reinforcing',
    description: `
      Glial dysfunction amplifies neurodegeneration: activated microglia →
      IL-1α + TNF + C1q → A1 astrocytes → neurotoxicity + C3 production →
      complement-mediated synapse elimination → neuronal stress signals →
      more microglial activation.
    `.trim(),
    edgeIds: ['E05.010', 'E05.011', 'E05.012', 'E05.013', 'E05.014'],
    ghostEdge: {
      source: 'synapses',
      target: 'microglia_activated',
      relation: 'decreases', // Synapse loss reduces tonic inhibition
      mechanism: 'Synapse loss releases tonic microglial inhibition (CX3CL1/CX3CR1)',
    },
    clinicalImplication: 'Complement inhibitors have early therapeutic window',
    interventionPoints: [
      'C1q',                // Anti-C1q antibodies (ANX005)
      'A1_astrocytes',      // Target A1-specific markers
      'IL1A',               // IL-1α blockade
    ],
    moduleIds: ['M05', 'M08'],
  },

  // ============================================================================
  // Balancing Loop: PINK1/Parkin Quality Control
  // ============================================================================
  {
    id: 'loop_mitophagy_balance',
    name: 'Mitophagy Quality Control (Balancing)',
    type: 'balancing',
    description: `
      Homeostatic mitochondrial quality control: damaged mitochondria →
      PINK1 stabilization → Parkin recruitment → mitophagy → clearance →
      reduced damaged pool.

      This balancing loop maintains mitochondrial health UNTIL overwhelmed.
    `.trim(),
    edgeIds: ['E02.006', 'E03.010'],
    clinicalImplication: 'Enhancing this loop (urolithin A) may restore balance',
    interventionPoints: [
      'PINK1_Parkin',       // Urolithin A, NAD+ precursors
    ],
    moduleIds: ['M02', 'M03'],
  },
];

export default feedbackLoops;
