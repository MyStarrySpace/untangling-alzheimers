export interface SidelinedResearcher {
  id: string;
  name: string;
  institution: string;
  hypothesis: string;
  year: number;
  keyFinding: string;
  cascadeStage: number;
  stageName: string;
}

export const sidelinedResearchers: SidelinedResearcher[] = [
  {
    id: 'de-la-torre',
    name: 'Jack de la Torre',
    institution: 'UT Austin / Banner Institute',
    hypothesis: 'Vascular Hypothesis',
    year: 1993,
    keyFinding: 'Chronic brain hypoperfusion initiates neurodegeneration',
    cascadeStage: 1,
    stageName: 'Entry Point',
  },
  {
    id: 'de-la-monte',
    name: 'Suzanne de la Monte',
    institution: 'Brown University',
    hypothesis: 'Type 3 Diabetes',
    year: 2005,
    keyFinding: 'Brain insulin resistance precedes amyloid; AD is metabolic disease',
    cascadeStage: 1,
    stageName: 'Entry Point',
  },
  {
    id: 'swerdlow',
    name: 'Russell Swerdlow',
    institution: 'University of Kansas',
    hypothesis: 'Mitochondrial Cascade',
    year: 2004,
    keyFinding: 'Bioenergetic failure triggers amyloid, not the reverse',
    cascadeStage: 4,
    stageName: 'Convergence',
  },
  {
    id: 'nixon',
    name: 'Ralph Nixon',
    institution: 'NYU / Nathan Kline Institute',
    hypothesis: 'Lysosome Hypothesis (PANTHOS)',
    year: 2022,
    keyFinding: 'Plaques form INSIDE neurons from lysosomal failure, not outside',
    cascadeStage: 4,
    stageName: 'Convergence',
  },
  {
    id: 'nave',
    name: 'Klaus-Armin Nave',
    institution: 'Max Planck Institute',
    hypothesis: 'Myelin/Oligodendrocyte',
    year: 2023,
    keyFinding: 'Myelin dysfunction is UPSTREAM of amyloid; drives deposition',
    cascadeStage: 5,
    stageName: 'Upstream',
  },
];

export interface EvidenceLevel {
  stars: number;
  type: string;
  description: string;
  examples: string[];
}

export const evidenceHierarchy: EvidenceLevel[] = [
  {
    stars: 5,
    type: 'Humanization',
    description: 'If giving mice human gene/protein X produces human-like pathology, X is causal',
    examples: [
      'Humanized Aβ knock-in mice: 3x more amyloid (Saito 2014)',
      'APOE4 knock-in: reproduces human lipid dysregulation (Knoferle 2014)',
    ],
  },
  {
    stars: 5,
    type: 'Bidirectional FMT',
    description: 'If transferring X from sick to healthy induces disease AND healthy to sick reverses it, X is causal',
    examples: [
      'AD microbiome to healthy mice = cognitive impairment',
      'Healthy to AD mice = improved pathology (Sun 2019; Kim 2020)',
    ],
  },
  {
    stars: 4,
    type: 'Natural Experiment',
    description: 'Time-locked events create before/after comparisons with natural counterfactuals',
    examples: [
      'Menopause: abrupt estrogen loss leads to accelerated tau in APOE4+ women',
      'HZ vaccine eligibility cutoff: 20% lower dementia (Eyting 2024 Nature)',
    ],
  },
  {
    stars: 4,
    type: 'Genetic KO/KI',
    description: 'Knockout/knockin of gene X changes phenotype Y in predicted direction',
    examples: [
      'Myelin gene mutations lead to increased Aβ deposition (Depp 2023 Nature)',
      'v-ATPase KO leads to lysosomal failure and PANTHOS (Nixon 2022)',
    ],
  },
  {
    stars: 3,
    type: 'Temporal Precedence',
    description: 'X changes before Y in longitudinal data (necessary but not sufficient)',
    examples: [
      'Microbiome dysbiosis precedes symptoms in preclinical AD',
      'Hypoperfusion precedes amyloid (de la Torre)',
    ],
  },
  {
    stars: 2,
    type: 'Correlation',
    description: 'X and Y co-occur; direction unknown',
    examples: [
      'Most observational studies',
      'Cannot distinguish cause from consequence',
    ],
  },
];

export interface CascadeStage {
  stage: number;
  title: string;
  shortTitle: string;
  description: string;
  mechanisms: string[];
  evidenceLevel: string;
  researchers?: string[];
  drugs?: { name: string; effect: string }[];
}

export const mechanisticCascade: CascadeStage[] = [
  {
    stage: 1,
    title: 'Initiating Factors',
    shortTitle: 'Entry Points',
    description: 'Different patients enter the cascade at different points—this is why AD is heterogeneous.',
    mechanisms: [
      'Gut dysbiosis: increased LPS, Phe/Ile leads to systemic inflammation',
      'Vascular: Hypoperfusion leads to BBB breakdown',
      'Metabolic: Insulin resistance leads to mTORC1 hyperactivation',
      'Genetic: APOE4, PSEN1/2, BIN1, PICALM, etc.',
      'Infection: HSV, P. gingivalis leads to chronic inflammation',
      'Trauma: TBI leads to Sur1-TRPM4 activation and edema',
    ],
    evidenceLevel: 'Multiple 5-star',
    researchers: ['de la Torre', 'de la Monte'],
  },
  {
    stage: 2,
    title: 'Systemic Dysfunction',
    shortTitle: 'Systemic',
    description: 'Chronic low-grade inflammation and mineral maldistribution.',
    mechanisms: [
      'Inflammaging: increased IL-6, TNF-alpha, CRP',
      'Mineral maldistribution: Iron sequestered, decreased Mg, Zn absorption',
      'Gut barrier breakdown: LPS, bacterial amyloids reach circulation',
    ],
    evidenceLevel: '4-star (Long COVID natural experiment)',
  },
  {
    stage: 3,
    title: 'BBB/Astrocyte Dysfunction',
    shortTitle: 'BBB/Astrocyte',
    description: 'Blood-brain barrier breakdown and astrocyte reactivity.',
    mechanisms: [
      'BBB breakdown: increased permeability, pericyte loss',
      'Astrocyte reactivity: LPS leads to TLR4 leads to NF-kappaB leads to decreased homeostatic genes',
      'APOE4 converges here: lysosomal dysfunction, poor APOE lipidation',
      'Loss of trophic support: Cannot supply cholesterol or iron to OLs',
    ],
    evidenceLevel: '4-star (Tcw 2022 Cell)',
  },
  {
    stage: 4,
    title: 'Pan-Glial Lysosomal Dysfunction',
    shortTitle: 'Lysosomal',
    description: 'This is the critical intermediate zone where multiple upstream causes converge.',
    mechanisms: [
      'APOE4 leads to cholesterol accumulation and lysosomal membrane destabilization',
      'Presenilin mutations lead to v-ATPase assembly failure and acidification loss',
      'Insulin resistance leads to mTORC1 leads to TFEB sequestration',
      'Aging leads to lipofuscin accumulation and lysosomal burden',
      'Mitochondrial-lysosomal crosstalk (Swerdlow hypothesis)',
    ],
    evidenceLevel: '5-star (Nixon 2022; Lee 2010)',
    researchers: ['Nixon', 'Swerdlow'],
  },
  {
    stage: 5,
    title: 'Oligodendrocyte Dysfunction',
    shortTitle: 'Myelin',
    description: 'Myelin dysfunction DRIVES Aβ deposition (Depp 2023 Nature title).',
    mechanisms: [
      'Iron starvation: Astrocytes cannot supply Fe, decreased myelination enzymes',
      'Cholesterol starvation: Poorly lipidated APOE cannot deliver cholesterol',
      'OL ferroptosis: decreased GPX4 + iron accumulation leads to lipid peroxidation',
    ],
    evidenceLevel: '5-star (Depp 2023 Nature)',
    researchers: ['Nave'],
  },
  {
    stage: 6,
    title: 'Dual Aβ Production',
    shortTitle: 'Aβ Production',
    description: 'Amyloid is produced through both neuronal and oligodendrocyte pathways.',
    mechanisms: [
      'Neuronal pathway: Axonal swellings accumulate APP/BACE1 machinery',
      'OL pathway: OLs directly produce Aβ (~25% of plaques)',
      'PANTHOS: Lysosomal failure leads to intracellular Aβ aggregation',
    ],
    evidenceLevel: '5-star (Depp 2023; Sasmita 2024)',
  },
  {
    stage: 7,
    title: 'Microglial Exhaustion',
    shortTitle: 'Microglia',
    description: 'Microglia become "distracted" by myelin debris and cannot corral plaques.',
    mechanisms: [
      'Stress/inflammation precedes lipid dysregulation',
      'Metabolic exhaustion: HIF-1alpha leads to glycolysis shift',
      'LDAM phenotype: 10-fold decreased phagocytic capacity',
    ],
    evidenceLevel: '5-star (Haney 2024 Nature)',
  },
  {
    stage: 8,
    title: 'Clearance Failure',
    shortTitle: 'Plaques',
    description: 'This is where current drugs target—but it\'s DOWNSTREAM.',
    mechanisms: [
      'Aβ production >> Aβ clearance leads to plaque accumulation',
      'Lecanemab, donanemab work HERE (Stage 8)',
      'Only 27-35% slowing because Stages 1-7 keep producing pathology',
    ],
    evidenceLevel: 'Current drug target',
    drugs: [
      { name: 'Lecanemab', effect: '27% slowing' },
      { name: 'Donanemab', effect: '35% slowing' },
    ],
  },
  {
    stage: 9,
    title: 'Clinical AD',
    shortTitle: 'Dementia',
    description: 'The final stage—by this point, significant damage has occurred.',
    mechanisms: [
      'Tau propagation (downstream of insulin resistance via GSK3beta)',
      'Synaptic loss (strongest correlate of cognitive decline)',
      'Neuronal death, brain atrophy, dementia',
    ],
    evidenceLevel: 'Clinical endpoint',
  },
];

export const drugEfficacyComparison = [
  {
    drug: 'Lecanemab',
    targetStage: 8,
    efficacy: '27% slowing (0.45 CDR-SB)',
    limitation: "Doesn't fix Stages 1-7",
  },
  {
    drug: 'Donanemab',
    targetStage: 8,
    efficacy: '35% slowing (low tau)',
    limitation: 'Better early = less upstream damage',
  },
  {
    drug: 'GV-971',
    targetStage: 1,
    efficacy: '+2.54 ADAS-cog points',
    limitation: 'Addresses upstream cause',
  },
  {
    drug: 'Syst-Eur (nitrendipine)',
    targetStage: 1,
    efficacy: '50% decreased dementia incidence',
    limitation: 'Upstream; 20-year prevention window',
  },
];
