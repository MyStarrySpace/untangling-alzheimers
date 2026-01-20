/**
 * Precision Medicine Data for Alzheimer's Disease
 *
 * Based on:
 * - Tijms BM et al. (2024) Nat Aging: CSF proteomic subtypes
 * - Multi-loop inflammation framework for E4/4 carriers
 * - Proposed stratification algorithms for clinical trials
 */

// ============================================================================
// TYPES
// ============================================================================

export interface ADSubtype {
  id: string;
  name: string;
  shortName: string;
  prevalence: string;
  prognosis: 'baseline' | 'faster' | 'variable';
  prognosisHR?: string; // Hazard ratio vs baseline
  molecularSignature: string;
  biomarkers: {
    elevated: string[];
    reduced: string[];
  };
  geneticAssociations: string[];
  treatmentPriority: TreatmentPriority[];
  frameworkRelevance: 1 | 2 | 3 | 4 | 5; // Our inflammation framework applicability
  color: string;
}

export interface TreatmentPriority {
  target: string;
  drugs: string[];
  priority: 1 | 2 | 3 | 4 | 5;
  rationale: string;
}

export interface APOEStratification {
  genotype: string;
  risk: string;
  prevalence: string;
  description: string;
  treatmentApproach: string;
  biomarkerPanelNote: string;
}

export interface BiomarkerPanel {
  name: string;
  marker: string;
  cost: string;
  availability: 'clinical' | 'research' | 'emerging';
  category: 'amyloid' | 'tau' | 'neurodegeneration' | 'inflammation' | 'iron' | 'gut' | 'vascular' | 'genetic';
  e4Relevance: string;
  threshold?: string;
}

export interface CombinationRegimen {
  name: string;
  targets: string[];
  drugs: string[];
  rationale: string;
  status: 'conceptual' | 'preclinical' | 'clinical' | 'ongoing_trial';
  applicableSubtypes: string[];
}

// ============================================================================
// TIJMS CSF PROTEOMIC SUBTYPES (2024 Nat Aging)
// ============================================================================

export const tijmsSubtypes: ADSubtype[] = [
  {
    id: 'hyperplasticity',
    name: 'Hyperplasticity',
    shortName: 'Type 1',
    prevalence: '36-59%',
    prognosis: 'baseline',
    molecularSignature: 'Elevated BACE1, neuronal plasticity proteins, synaptic markers',
    biomarkers: {
      elevated: ['BACE1', 'Neuronal plasticity proteins', 'Synaptic markers'],
      reduced: [],
    },
    geneticAssociations: ['TREM2 R47H enriched'],
    treatmentPriority: [
      {
        target: 'Amyloid',
        drugs: ['Lecanemab', 'Donanemab'],
        priority: 5,
        rationale: 'May respond well to anti-amyloid monotherapy due to intact clearance mechanisms',
      },
    ],
    frameworkRelevance: 2,
    color: '#60a5fa', // Blue
  },
  {
    id: 'innate_immune',
    name: 'Innate Immune Activation',
    shortName: 'Type 2',
    prevalence: '21-32%',
    prognosis: 'faster',
    prognosisHR: '2.1-2.5',
    molecularSignature: 'Immune activation markers, elevated sTREM2, complement proteins',
    biomarkers: {
      elevated: ['sTREM2', 'Complement proteins', 'hs-CRP', 'Hepcidin', 'IL-6'],
      reduced: [],
    },
    geneticAssociations: ['Inflammatory gene variants', 'TREM2 loss-of-function'],
    treatmentPriority: [
      {
        target: 'Amyloid',
        drugs: ['Lecanemab', 'Donanemab'],
        priority: 4,
        rationale: 'Necessary but insufficient - must combine with anti-inflammatory',
      },
      {
        target: 'NLRP3 Inflammasome',
        drugs: ['MCC950', 'Dapansutrile'],
        priority: 5,
        rationale: 'Core driver of tau seeding and neuroinflammation loop',
      },
      {
        target: 'Gut-Brain Axis',
        drugs: ['GV-971', 'Prebiotics'],
        priority: 4,
        rationale: 'Reduces peripheral Th1 activation driving brain inflammation',
      },
    ],
    frameworkRelevance: 5, // Our core focus
    color: '#f97316', // Orange
  },
  {
    id: 'bbb_dysfunction',
    name: 'BBB Dysfunction',
    shortName: 'Type 3',
    prevalence: '20-32%',
    prognosis: 'faster',
    prognosisHR: '2.1-2.5',
    molecularSignature: 'Reduced BACE1, elevated barrier proteins, albumin ratio abnormalities',
    biomarkers: {
      elevated: ['CSF/serum albumin ratio', 'Barrier proteins'],
      reduced: ['BACE1'],
    },
    geneticAssociations: ['Vascular risk genes'],
    treatmentPriority: [
      {
        target: 'Vascular',
        drugs: ['Cilostazol', 'Pentoxifylline', 'BP control'],
        priority: 5,
        rationale: 'Primary driver is vascular dysfunction, not inflammation',
      },
      {
        target: 'Amyloid',
        drugs: ['Lecanemab'],
        priority: 3,
        rationale: 'Secondary - clearance impaired by vascular route dysfunction',
      },
    ],
    frameworkRelevance: 3,
    color: '#a78bfa', // Purple
  },
  {
    id: 'choroid_plexus',
    name: 'Choroid Plexus',
    shortName: 'Type 4',
    prevalence: 'Subset',
    prognosis: 'variable',
    molecularSignature: 'Choroid plexus-specific proteins, CSF production markers',
    biomarkers: {
      elevated: ['CP-specific proteins', 'Transthyretin variants'],
      reduced: [],
    },
    geneticAssociations: ['Unknown'],
    treatmentPriority: [],
    frameworkRelevance: 2,
    color: '#34d399', // Green
  },
  {
    id: 'rna_dysregulation',
    name: 'RNA Dysregulation',
    shortName: 'Type 5',
    prevalence: 'Subset',
    prognosis: 'variable',
    molecularSignature: 'RNA processing proteins, splicing factors',
    biomarkers: {
      elevated: ['RNA processing proteins'],
      reduced: [],
    },
    geneticAssociations: ['Unknown'],
    treatmentPriority: [],
    frameworkRelevance: 2,
    color: '#f472b6', // Pink
  },
];

// ============================================================================
// APOE STRATIFICATION
// ============================================================================

export const apoeStratification: APOEStratification[] = [
  {
    genotype: 'APOE4/4',
    risk: '8-15x increased',
    prevalence: '2-3% of population',
    description: 'Highest genetic risk. Multiple feedback loops engaged: NLRP3-tau, gut-iron, complement-synapse, impaired glymphatic clearance.',
    treatmentApproach: 'Combination therapy required: anti-amyloid + anti-inflammatory + lifestyle (sleep, diet, exercise)',
    biomarkerPanelNote: 'Extended panel with hepcidin, ferritin, hs-CRP, fecal calprotectin. Start monitoring at age 45.',
  },
  {
    genotype: 'APOE3/4',
    risk: '3-4x increased',
    prevalence: '20-25% of population',
    description: 'Moderate genetic risk. Inflammation loops partially engaged. Intermediate phenotype.',
    treatmentApproach: 'Anti-amyloid likely sufficient if started early; consider combination if elevated inflammation markers',
    biomarkerPanelNote: 'Standard AD biomarkers + hs-CRP. Monitor inflammation status.',
  },
  {
    genotype: 'APOE2/4',
    risk: '~2x increased',
    prevalence: '~2% of population',
    description: 'Mixed risk - protective E2 allele partially offsets E4 risk.',
    treatmentApproach: 'Individualized based on biomarker profile',
    biomarkerPanelNote: 'Standard AD biomarkers.',
  },
  {
    genotype: 'APOE3/3',
    risk: 'Baseline',
    prevalence: '~60% of population',
    description: 'Population baseline risk. Disease driven by aging, vascular factors, or other genetic variants.',
    treatmentApproach: 'CSF proteomic subtyping recommended; treatment matched to subtype',
    biomarkerPanelNote: 'Standard AD biomarkers. Consider proteomic subtyping.',
  },
  {
    genotype: 'APOE2/3 or 2/2',
    risk: '0.5-0.7x (protective)',
    prevalence: '~12% of population',
    description: 'Protective genotype. Lower AD risk but not zero.',
    treatmentApproach: 'Standard approach if disease develops; focus on vascular factors',
    biomarkerPanelNote: 'Standard AD biomarkers if symptomatic.',
  },
];

// ============================================================================
// BIOMARKER PANELS
// ============================================================================

export const extendedBiomarkerPanel: BiomarkerPanel[] = [
  // Standard AD biomarkers
  {
    name: 'p-tau217',
    marker: 'Phospho-tau 217',
    cost: '$1,200',
    availability: 'clinical',
    category: 'tau',
    e4Relevance: 'Gold standard tau marker. Elevated ~15 years before symptoms.',
    threshold: 'Assay-specific cutoffs',
  },
  {
    name: 'ptau181',
    marker: 'Phospho-tau 181',
    cost: '$200-400',
    availability: 'clinical',
    category: 'tau',
    e4Relevance: 'FDA-cleared. Elevated ~10 years before symptoms.',
    threshold: '>2.0 pg/mL (Quanterix)',
  },
  {
    name: 'abeta_ratio',
    marker: 'Plasma Amyloid-beta 42/40 Ratio',
    cost: '$500-800',
    availability: 'clinical',
    category: 'amyloid',
    e4Relevance: 'Indicates brain amyloid deposition. Abnormal ~18 years before symptoms.',
    threshold: '<0.089 (PrecivityAD)',
  },
  {
    name: 'gfap',
    marker: 'Glial Fibrillary Acidic Protein',
    cost: '$200-400',
    availability: 'clinical',
    category: 'inflammation',
    e4Relevance: 'Astrocyte activation marker. Rising star for early detection.',
    threshold: '>200 pg/mL suggests pathology',
  },
  {
    name: 'nfl',
    marker: 'Neurofilament Light Chain',
    cost: '$200-400',
    availability: 'clinical',
    category: 'neurodegeneration',
    e4Relevance: 'Non-specific neurodegeneration marker. Tracks disease progression.',
    threshold: 'Age-adjusted cutoffs',
  },
  // Inflammation panel (E4/4 extended)
  {
    name: 'hscrp',
    marker: 'High-sensitivity C-Reactive Protein',
    cost: '$20-50',
    availability: 'clinical',
    category: 'inflammation',
    e4Relevance: 'Chronic elevation (>2 mg/L) indicates engaged inflammation loops.',
    threshold: '>2 mg/L = elevated',
  },
  {
    name: 'hepcidin',
    marker: 'Hepcidin',
    cost: '$100-200',
    availability: 'research',
    category: 'iron',
    e4Relevance: 'Elevated in preclinical AD. Indicates gut-iron axis activation.',
    threshold: '>30 ng/mL in AD vs 5.5 controls',
  },
  {
    name: 'ferritin',
    marker: 'Serum Ferritin',
    cost: '$20-40',
    availability: 'clinical',
    category: 'iron',
    e4Relevance: 'High ferritin = brain iron accumulation risk.',
    threshold: '>200 (men), >150 (women) ng/mL',
  },
  {
    name: 'tibc',
    marker: 'Total Iron Binding Capacity',
    cost: '$20-40',
    availability: 'clinical',
    category: 'iron',
    e4Relevance: 'Low in AD (308 vs 330 in controls). Part of iron panel.',
    threshold: '<300 may indicate iron dysregulation',
  },
  {
    name: 'fecal_calprotectin',
    marker: 'Fecal Calprotectin',
    cost: '$50-100',
    availability: 'clinical',
    category: 'gut',
    e4Relevance: 'Gut inflammation marker. Indicates gut-brain axis activation.',
    threshold: '>50 may warrant investigation',
  },
  {
    name: 'apoe_genotype',
    marker: 'APOE Genotype',
    cost: '$100-200',
    availability: 'clinical',
    category: 'genetic',
    e4Relevance: 'Fundamental risk stratification. One-time test.',
    threshold: 'E4/4 = highest risk',
  },
];

// ============================================================================
// COMBINATION REGIMENS
// ============================================================================

export const combinationRegimens: CombinationRegimen[] = [
  {
    name: 'Anti-Amyloid + Anti-Tau',
    targets: ['Amyloid clearance', 'Tau propagation'],
    drugs: ['Lecanemab or Donanemab', 'E2814 (anti-tau antibody)'],
    rationale: 'Addresses amyloid-tau cascade at two points. DIAN-TU testing this approach.',
    status: 'ongoing_trial',
    applicableSubtypes: ['innate_immune', 'hyperplasticity'],
  },
  {
    name: 'Triple Therapy: Amyloid + NLRP3 + Gut',
    targets: ['Amyloid clearance', 'NLRP3 inflammasome', 'Gut-brain axis'],
    drugs: ['Lecanemab', 'MCC950/Dapansutrile', 'GV-971 or prebiotic'],
    rationale: 'Breaks multiple feedback loops simultaneously. Optimal for E4/4 with elevated inflammation.',
    status: 'conceptual',
    applicableSubtypes: ['innate_immune'],
  },
  {
    name: 'Vascular + Anti-Amyloid',
    targets: ['BBB integrity', 'Amyloid clearance'],
    drugs: ['Cilostazol', 'Lecanemab'],
    rationale: 'For BBB-dysfunction subtype. Improves vascular clearance routes.',
    status: 'conceptual',
    applicableSubtypes: ['bbb_dysfunction'],
  },
  {
    name: 'Anti-Amyloid + Lifestyle Intensive',
    targets: ['Amyloid clearance', 'Glymphatic function', 'Inflammation'],
    drugs: ['Lecanemab', 'Sleep optimization protocol', 'Mediterranean diet', 'Aerobic exercise'],
    rationale: 'Lifestyle interventions enhance glymphatic clearance (sleep), reduce inflammation (diet, exercise).',
    status: 'clinical',
    applicableSubtypes: ['hyperplasticity', 'innate_immune'],
  },
];

// ============================================================================
// STRATIFICATION ALGORITHM
// ============================================================================

export interface StratificationStep {
  step: number;
  title: string;
  action: string;
  branches: StratificationBranch[];
}

export interface StratificationBranch {
  condition: string;
  result: string;
  nextStep?: number;
  recommendation?: string;
  color: string;
}

export const stratificationAlgorithm: StratificationStep[] = [
  {
    step: 1,
    title: 'Genetic Testing',
    action: 'APOE genotyping + family history for ADAD genes',
    branches: [
      {
        condition: 'ADAD mutation (PSEN1/2, APP)',
        result: 'Autosomal Dominant AD',
        recommendation: 'DIAN-TU trials, anti-amyloid focus',
        color: '#ef4444',
      },
      {
        condition: 'APOE4/4',
        result: 'High-risk inflammation-driven',
        nextStep: 2,
        color: '#f97316',
      },
      {
        condition: 'APOE3/4 or APOE2/4',
        result: 'Moderate risk',
        nextStep: 2,
        color: '#eab308',
      },
      {
        condition: 'No APOE4',
        result: 'Standard risk',
        nextStep: 3,
        color: '#22c55e',
      },
    ],
  },
  {
    step: 2,
    title: 'Inflammation Assessment',
    action: 'Measure hs-CRP, hepcidin, ferritin, fecal calprotectin',
    branches: [
      {
        condition: 'Elevated inflammation markers',
        result: 'Inflammation-driven (Tijms Type 2)',
        recommendation: 'Combination therapy: anti-amyloid + anti-inflammatory + gut modulation',
        color: '#f97316',
      },
      {
        condition: 'Normal inflammation markers',
        result: 'May respond to anti-amyloid alone',
        recommendation: 'Standard anti-amyloid therapy with monitoring',
        color: '#22c55e',
      },
    ],
  },
  {
    step: 3,
    title: 'CSF Proteomic Subtyping',
    action: 'Tijms panel: BACE1, sTREM2, barrier proteins, albumin ratio',
    branches: [
      {
        condition: 'Elevated BACE1, synaptic markers',
        result: 'Type 1: Hyperplasticity',
        recommendation: 'Anti-amyloid monotherapy may suffice',
        color: '#60a5fa',
      },
      {
        condition: 'Elevated sTREM2, immune markers',
        result: 'Type 2: Innate Immune',
        recommendation: 'Combination therapy required',
        color: '#f97316',
      },
      {
        condition: 'Reduced BACE1, elevated albumin ratio',
        result: 'Type 3: BBB Dysfunction',
        recommendation: 'Vascular-focused approach',
        color: '#a78bfa',
      },
    ],
  },
];

// ============================================================================
// KEY INSIGHTS
// ============================================================================

export const keyInsights = [
  {
    title: 'One drug fits none',
    description: 'AD is not one disease. The 20+ years of anti-amyloid monotherapy failures in E4/4 patients are evidence that amyloid clearance alone is insufficient for inflammation-driven AD.',
  },
  {
    title: 'Stratify first, treat second',
    description: 'Matching treatment to molecular subtype could explain why some patients respond brilliantly to anti-amyloid drugs while others show no benefit.',
  },
  {
    title: 'Biomarkers enable precision',
    description: 'Cheap, routine tests (CRP, ferritin, hepcidin) could identify patients who need combination therapy BEFORE expensive AD-specific biomarkers become abnormal.',
  },
  {
    title: 'Loops, not cascades',
    description: 'AD progression involves multiple feedback loops (NLRP3-tau, gut-iron-inflammation, complement-synapse). Breaking one loop may not stop progression if others remain active.',
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getSubtypeById(id: string): ADSubtype | undefined {
  return tijmsSubtypes.find(s => s.id === id);
}

export function getSubtypesByFrameworkRelevance(minRelevance: number): ADSubtype[] {
  return tijmsSubtypes.filter(s => s.frameworkRelevance >= minRelevance);
}

export function getBiomarkersByCategory(category: BiomarkerPanel['category']): BiomarkerPanel[] {
  return extendedBiomarkerPanel.filter(b => b.category === category);
}

export function getClinicalBiomarkers(): BiomarkerPanel[] {
  return extendedBiomarkerPanel.filter(b => b.availability === 'clinical');
}

export function getRegimensForSubtype(subtypeId: string): CombinationRegimen[] {
  return combinationRegimens.filter(r => r.applicableSubtypes.includes(subtypeId));
}
