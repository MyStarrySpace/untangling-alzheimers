// Sex and Ancestry Effects in Alzheimer's Disease
// These are not statistical covariates—they are mechanistic drivers that determine
// who gets AD and who responds to treatment.

export interface XLinkedGene {
  gene: string;
  location: string;
  function: string;
  diseaseWhenMutated: string;
  escapesXInactivation: boolean;
  adRelevance: string;
}

export interface HormoneEffect {
  hormone: string;
  effectOnLysosomes: string;
  adImplication: string;
}

export interface SexPathwayDifference {
  pathway: string;
  males: string;
  females: string;
  therapeuticImplication: string;
}

export interface AncestryAPOE4Risk {
  ancestry: string;
  apoe4OddsRatio: string;
  vsEuropean: string;
  notes: string;
}

export interface AncestryFatDistribution {
  ancestry: string;
  visceralFat: 'low' | 'intermediate' | 'high';
  subcutaneousFat: 'low' | 'intermediate' | 'high';
  metabolicPattern: string;
}

export interface MechanismMatchedIntervention {
  intervention: string;
  bestCandidates: string;
  worstCandidates: string;
  rationale: string;
}

// ============================================
// SEX DIFFERENCES
// ============================================

export const sexDifferencesSummary = {
  femalePrevalence: '~2/3 of AD cases',
  postMenopausalAcceleration: 'Biomarker progression spikes within 5-10 years of menopause',
  clinicalTrialProblem: 'Most trials don\'t stratify by sex; those that do often show divergent responses',
  keyInsight: 'The 2:1 female:male AD prevalence reflects fundamental differences in lysosomal function, immune activation, and lipid metabolism.',
};

// X-linked genes affecting lysosomal pH and clearance
export const xLinkedLysosomalGenes: XLinkedGene[] = [
  {
    gene: 'SLC9A7',
    location: 'Xp11.3',
    function: 'Na⁺/H⁺ exchanger; Golgi pH regulation',
    diseaseWhenMutated: '#1 X-linked AD risk locus (Belloy 2024, n=1.15M)',
    escapesXInactivation: false,
    adRelevance: 'Critical for maintaining pH gradient; females have mosaic expression which may provide heterogeneity-based protection',
  },
  {
    gene: 'ATP6AP2',
    location: 'Xp11.4',
    function: 'v-ATPase assembly',
    diseaseWhenMutated: 'X-linked Parkinsonism-Spasticity (XPDS)',
    escapesXInactivation: false,
    adRelevance: 'Required for lysosomal acidification; dysfunction leads to protein accumulation',
  },
  {
    gene: 'ATP6AP1',
    location: 'Xq28',
    function: 'v-ATPase function',
    diseaseWhenMutated: 'Immunodeficiency + cognitive impairment',
    escapesXInactivation: false,
    adRelevance: 'v-ATPase is the proton pump that acidifies lysosomes',
  },
  {
    gene: 'LAMP2',
    location: 'Xq24',
    function: 'Autophagosome-lysosome fusion',
    diseaseWhenMutated: 'Danon disease',
    escapesXInactivation: false,
    adRelevance: 'Required for autophagy completion; deficiency causes cardiomyopathy and cognitive decline',
  },
];

// Sex hormone effects on lysosomal function
export const hormoneEffects: HormoneEffect[] = [
  {
    hormone: 'Testosterone',
    effectOnLysosomes: '↑ Autophagy via GPRC6A → ERK → mTOR inhibition',
    adImplication: 'Protective; orchiectomy → Aβ accumulation in animal models',
  },
  {
    hormone: 'Estrogen',
    effectOnLysosomes: '↑ Lysosomal gene expression (Lamp1, Lamp2, CD68) but NOT function',
    adImplication: 'Paradox: Female microglia express MORE lysosomal genes but have WORSE phagocytic function—the bottleneck is acidification, not gene expression',
  },
  {
    hormone: 'Estrogen withdrawal',
    effectOnLysosomes: '↓ Lysosomal acidification (pH rises above 5.5)',
    adImplication: 'Post-menopausal acceleration of AD pathology',
  },
  {
    hormone: 'FSH (post-menopause)',
    effectOnLysosomes: 'Acts DIRECTLY on hippocampal and cortical neurons',
    adImplication: 'Activates C/EBPβ-δ-secretase pathway → accelerates Aβ AND Tau deposition; FSH blockade REVERSES AD-like phenotype in mice (Xiong 2022 Nature)',
  },
];

// Sex-specific pathway usage
export const sexPathwayDifferences: SexPathwayDifference[] = [
  {
    pathway: 'Autophagy',
    males: 'Higher basal, functional',
    females: 'Lower, accumulation',
    therapeuticImplication: 'Autophagy inducers (e.g., rapamycin) may be less effective or harmful in females if lysosomal output is impaired',
  },
  {
    pathway: 'Lysosomal acidification',
    males: 'Functional',
    females: 'Impaired post-menopause',
    therapeuticImplication: 'Direct acidifiers (e.g., β2-agonists) may preferentially help females',
  },
  {
    pathway: 'LDAM formation',
    males: 'Less',
    females: 'MORE (Prakash 2025)',
    therapeuticImplication: 'DGAT2 inhibitors may be more beneficial in females',
  },
  {
    pathway: 'Complement dependence',
    males: 'HIGH',
    females: 'Low (alternative pathways)',
    therapeuticImplication: 'Anti-complement therapies may work better in males',
  },
  {
    pathway: 'APOE4 × tau interaction',
    males: 'Modest',
    females: 'Accelerated tau pathology',
    therapeuticImplication: 'Female APOE4 carriers may need earlier intervention',
  },
];

// The female "perfect storm" at menopause
export const menopauseTransition = {
  preMenopause: {
    estrogen: 'HIGH',
    lysosomalPH: '~4.5-5.0 (optimal)',
    cathepsins: 'ACTIVE',
    clearance: 'Aβ/Tau CLEARED',
    fsh: 'LOW',
    neurons: 'Protected',
    fatDistribution: 'Subcutaneous (protective depot)',
    inflammation: 'Lower systemic inflammation',
  },
  postMenopause: {
    estrogen: 'LOW',
    lysosomalPH: '>5.5 (alkalinized)',
    cathepsins: 'INACTIVE',
    clearance: 'Aβ/Tau ACCUMULATE',
    fsh: 'HIGH',
    neurons: 'FSH acts directly → C/EBPβ-δ-secretase → Accelerated Aβ/Tau',
    fatDistribution: 'Visceral (inflammatory depot)',
    inflammation: 'Higher IL-6, TNF-α → BBB → brain',
  },
};

// ============================================
// ANCESTRY DIFFERENCES
// ============================================

export const ancestryAPOE4Risks: AncestryAPOE4Risk[] = [
  {
    ancestry: 'East Asian',
    apoe4OddsRatio: '~15×',
    vsEuropean: 'AMPLIFIED',
    notes: 'Higher risk per APOE4 allele; may relate to higher VAT at same BMI',
  },
  {
    ancestry: 'European',
    apoe4OddsRatio: '10-16×',
    vsEuropean: 'Reference',
    notes: 'Standard reference population for most APOE studies',
  },
  {
    ancestry: 'Amerindian',
    apoe4OddsRatio: '~5×',
    vsEuropean: 'AMPLIFIED',
    notes: 'May need earlier/more aggressive intervention',
  },
  {
    ancestry: 'African American',
    apoe4OddsRatio: '5-10×',
    vsEuropean: 'ATTENUATED (~40% lower)',
    notes: 'rs10423769_A protective variant reduces OR from 7.2 → 2.1; may be OVER-treated if using European risk models',
  },
  {
    ancestry: 'Nigerian',
    apoe4OddsRatio: 'No association',
    vsEuropean: 'VERY PROTECTED',
    notes: '"Nigerian Paradox"—APOE4 shows NO association with AD despite high allele frequency',
  },
];

// Key finding: APOE4 expression varies by ancestry
export const ancestryAPOE4Expression = {
  keyFinding: 'European APOE4 carriers express significantly MORE APOE4 protein in brain than African carriers with the same genotype (Griswold 2021)',
  europeanAncestry: {
    apoe4Expression: 'HIGH',
    protectiveVariants: 'None identified',
    neuropathologyLink: 'Strong',
  },
  africanAncestry: {
    apoe4Expression: 'LOW',
    protectiveVariants: 'rs10423769_A reduces OR from 7.2 → 2.1',
    neuropathologyLink: 'Weak (Naslavsky 2022)',
  },
  criticalInsight: 'It\'s not just having APOE4—it\'s how much you express and in what genetic context.',
};

// Fat distribution by ancestry
export const ancestryFatDistribution: AncestryFatDistribution[] = [
  {
    ancestry: 'African',
    visceralFat: 'low',
    subcutaneousFat: 'high',
    metabolicPattern: 'Lower T2D risk at same BMI; genetically lower VAT → lower baseline systemic inflammation',
  },
  {
    ancestry: 'European',
    visceralFat: 'intermediate',
    subcutaneousFat: 'intermediate',
    metabolicPattern: 'Reference population',
  },
  {
    ancestry: 'Asian',
    visceralFat: 'high',
    subcutaneousFat: 'low',
    metabolicPattern: '"Skinny-fat" phenotype; higher T2D risk at lower BMI; may benefit more from metabolic interventions',
  },
];

export const fatDistributionADRelevance = {
  mechanism: 'Visceral adipose tissue (VAT) secretes pro-inflammatory adipokines (IL-6, TNF-α, leptin) into portal circulation → cross BBB → neuroinflammation',
  genesWith7of14SexualDimorphism: ['RSPO3', 'TBX15', 'LYPLAL1', 'VEGFA', 'GRB14', 'LY86', 'ADAMTS9'],
  note: '7 of 14 fat distribution loci show sexual dimorphism (all stronger in women)',
};

// Nigerian Paradox explanations
export const nigerianParadox = {
  phenomenon: 'In Nigeria, APOE4 shows NO association with AD despite high allele frequency',
  possibleExplanations: [
    { factor: 'Dietary', explanation: 'Traditional low-fat, high-fiber diet' },
    { factor: 'Genetic', explanation: 'Different local haplotype/protective variants in APOE region' },
    { factor: 'Metabolic', explanation: 'Lower VAT, different lipid handling' },
    { factor: 'Infectious', explanation: 'Possible past selection for APOE4 (malaria, other pathogens)—APOE4 may be beneficial in some contexts' },
  ],
};

// ============================================
// CLINICAL TRIAL IMPLICATIONS
// ============================================

export const currentTrialProblems = [
  'Most AD trials don\'t stratify by sex in primary analysis',
  'Don\'t stratify by ancestry (or are >90% European)',
  'Use APOE4 status without considering ancestry context',
  'Ignore metabolic phenotype (VAT, insulin resistance)',
  'Donanemab point estimate favored placebo in Black subgroup—anti-amyloid may not work (or harm?) in this population',
];

export const recommendedStratification = [
  {
    factor: 'Sex',
    why: 'Different pathway usage (complement vs. lysosomal)',
    how: 'Pre-specified subgroup analysis',
  },
  {
    factor: 'Menopausal status',
    why: 'Transition = high-risk period; lysosomal alkalinization',
    how: 'Include as covariate; time since menopause',
  },
  {
    factor: 'Ancestry + APOE',
    why: 'Risk varies 3-5× across ancestries for same APOE4 genotype',
    how: 'Local ancestry at APOE locus, not just global ancestry',
  },
  {
    factor: 'Visceral adipose tissue (VAT)',
    why: 'Inflammation mediator; varies by ancestry',
    how: 'MRI or surrogate (waist circumference)',
  },
  {
    factor: 'FSH levels',
    why: 'Direct neuronal effects in post-menopausal women',
    how: 'Blood test at baseline',
  },
];

// Mechanism-matched interventions
export const mechanismMatchedInterventions: MechanismMatchedIntervention[] = [
  {
    intervention: 'Lysosomal acidifiers (β2-agonists)',
    bestCandidates: 'Post-menopausal women',
    worstCandidates: 'Pre-menopausal women, males (already have functional acidification)',
    rationale: 'Addresses the specific lysosomal alkalinization that occurs after menopause',
  },
  {
    intervention: 'Anti-complement therapies',
    bestCandidates: 'Males (high complement dependence)',
    worstCandidates: 'Females (use alternative pathways)',
    rationale: 'Males show higher complement pathway usage for synaptic pruning',
  },
  {
    intervention: 'DGAT2 inhibitors',
    bestCandidates: 'Females (higher LDAM formation)',
    worstCandidates: 'Males',
    rationale: 'Female microglia form more lipid-droplet accumulating microglia (LDAM)',
  },
  {
    intervention: 'Anti-FSH antibodies',
    bestCandidates: 'Perimenopausal/early postmenopausal women',
    worstCandidates: 'Males, late postmenopausal women',
    rationale: 'FSH rises during menopause transition and acts directly on neurons',
  },
  {
    intervention: 'GLP-1 agonists',
    bestCandidates: 'High VAT individuals (any sex/ancestry)',
    worstCandidates: 'Low VAT individuals',
    rationale: 'Primary benefit may be through VAT reduction and metabolic improvement',
  },
  {
    intervention: 'Anti-amyloid (lecanemab, donanemab)',
    bestCandidates: 'European APOE4 carriers',
    worstCandidates: 'African ancestry—may be harmful? (Donanemab favored placebo in Black subgroup)',
    rationale: 'African ancestry shows weak APOE4-neuropathology link; different disease mechanism?',
  },
];

// ============================================
// KEY STATISTICS
// ============================================

export const keyStatistics = {
  femaleToMaleRatio: '2:1',
  apoe4RiskVariationAcrossAncestries: '3-5×',
  postMenopausalAccelerationWindow: '5-10 years after menopause',
  africanAPOE4RiskReduction: '~40% lower than European',
  fatDistributionLociWithSexDimorphism: '7 of 14',
};

// ============================================
// BIBLIOGRAPHY REFERENCES
// ============================================

export const sexAncestrySourceIds = [
  'belloy-slc9a7-2024',
  'xiong-fsh-2022',
  'prakash-ldam-2025',
  'griswold-apoe-expression-2021',
  'rajabli-protective-variant-2022',
  'naslavsky-local-ancestry-2022',
  'heid-fat-distribution-2010',
  'du-testosterone-2025',
  'guillot-sestier-microglia-2021',
];
