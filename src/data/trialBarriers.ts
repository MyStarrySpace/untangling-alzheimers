// Why Companies Test AD Drugs in Other Conditions First
// AD trials are exceptionally expensive, long, and risky—so companies often
// pursue faster, cheaper indications first (Parkinson's, ALS, diabetes, etc.)

export interface TrialRequirement {
  factor: string;
  adTrials: string;
  otherIndications: string;
  impact: string;
}

export interface RedirectedDrug {
  id: string;
  name: string;
  mechanism: string;
  originalTarget?: string;
  adRationale: string;
  currentIndications: string[];
  adTrialStatus: 'none' | 'phase_1' | 'phase_2' | 'phase_3' | 'abandoned' | 'preclinical';
  whyNotAD: string;
  potentialConcerns?: string[];
  sourceIds: string[];
}

// Why AD trials are uniquely difficult
export const trialRequirements: TrialRequirement[] = [
  {
    factor: 'Trial Duration',
    adTrials: '18-36 months minimum; often 4-5 years for prevention trials',
    otherIndications: '6-12 months typical for many conditions',
    impact: 'Dramatically higher costs and longer time to revenue',
  },
  {
    factor: 'Endpoint Measurement',
    adTrials: 'Subtle cognitive changes require large samples to detect statistically',
    otherIndications: 'Often clear biomarkers or clinical endpoints (tumor size, HbA1c, motor function)',
    impact: 'Need 1,500-3,000+ patients vs. hundreds for other diseases',
  },
  {
    factor: 'Patient Recruitment',
    adTrials: 'Must confirm amyloid status via PET scan (~$5,000 each); high screen-failure rate',
    otherIndications: 'Often clinical diagnosis or simple blood tests',
    impact: 'Screening costs alone can exceed $50M for a Phase 3',
  },
  {
    factor: 'Safety Monitoring',
    adTrials: 'Serial MRIs required for amyloid drugs (ARIA monitoring); cognitive testing at every visit',
    otherIndications: 'Standard safety labs and clinical assessments',
    impact: 'Per-patient costs 3-5x higher than typical trials',
  },
  {
    factor: 'Regulatory Pathway',
    adTrials: 'FDA requires cognitive AND functional benefit; surrogate endpoints controversial',
    otherIndications: 'Many diseases accept biomarker endpoints for accelerated approval',
    impact: 'Higher bar for approval; fewer shortcuts available',
  },
  {
    factor: 'Patient Heterogeneity',
    adTrials: 'Mixed pathologies (vascular, Lewy body, TDP-43); genetic variants (APOE); stage variability',
    otherIndications: 'Often more homogeneous patient populations',
    impact: 'Noise in data; need larger trials to see signal',
  },
  {
    factor: 'Placebo Response',
    adTrials: 'Caregiver effects, practice effects on cognitive tests can mask drug benefit',
    otherIndications: 'Varies, but often more objective endpoints',
    impact: 'Makes detecting true drug effect harder',
  },
];

// ============================================
// AD CLINICAL TRIAL COSTS BY PHASE
// Source: Cummings et al. 2022 (Alzheimer's & Dementia)
// ============================================

export interface TrialPhaseCost {
  phase: string;
  perDrugCost: number; // in millions USD (2021 dollars)
  totalIndustrySpend1995to2021: number; // in millions USD
  percentOfTotal: number;
  typicalDuration: string;
  typicalPatients: string;
  failureRate: number; // percentage
}

export const adTrialPhaseCosts: TrialPhaseCost[] = [
  {
    phase: 'Phase 1',
    perDrugCost: 79_000_000,
    totalIndustrySpend1995to2021: 4_200_000_000, // estimated ~10% of $42.5B
    percentOfTotal: 10,
    typicalDuration: '6-12 months',
    typicalPatients: '20-100',
    failureRate: 40,
  },
  {
    phase: 'Phase 2',
    perDrugCost: 141_000_000,
    totalIndustrySpend1995to2021: 9_600_000_000, // Phase 2+3 = $33.7B, subtract Phase 3
    percentOfTotal: 23,
    typicalDuration: '1-2 years',
    typicalPatients: '100-500',
    failureRate: 72,
  },
  {
    phase: 'Phase 3',
    perDrugCost: 462_000_000,
    totalIndustrySpend1995to2021: 24_065_000_000,
    percentOfTotal: 57,
    typicalDuration: '3-5 years',
    typicalPatients: '1,500-3,000',
    failureRate: 40, // of those that reach Phase 3
  },
];

// Total AD drug development industry statistics (1995-2021)
export const adDevelopmentStatistics = {
  totalPrivateInvestment: 42_500_000_000, // $42.5 billion
  totalClinicalTrials: 1097,
  totalParticipants: 183_679,
  overallFailureRate: 95, // 117 discontinuations of 235 agents
  phase3Failures: 36, // drugs discontinued at Phase 3
  fdaApprovals: 6, // only 6 approvals despite massive investment
  sourceId: 'cummings-ad-costs-2022',
};

// Estimated costs comparison by disease (Phase 3 only)
export const trialCostComparison = {
  alzheimerPhase3: {
    lowEstimate: 300_000_000,
    highEstimate: 600_000_000,
    typical: 462_000_000, // Updated from Cummings 2022
    duration: '3-5 years',
    patients: '1,500-3,000',
  },
  parkinsonsPhase3: {
    lowEstimate: 100_000_000,
    highEstimate: 250_000_000,
    typical: 150_000_000,
    duration: '2-3 years',
    patients: '400-800',
  },
  diabetesPhase3: {
    lowEstimate: 80_000_000,
    highEstimate: 200_000_000,
    typical: 120_000_000,
    duration: '1-2 years',
    patients: '500-1,500',
  },
  alsPhase3: {
    lowEstimate: 50_000_000,
    highEstimate: 150_000_000,
    typical: 80_000_000,
    duration: '18 months',
    patients: '300-600',
  },
};

// ============================================
// FUNDING SOURCES FOR AD RESEARCH
// ============================================

export type FundingSourceType =
  | 'government' // NIH, NIA, national health services
  | 'nonprofit' // Foundations, charities
  | 'industry'; // Pharmaceutical companies

export interface FundingSource {
  id: string;
  name: string;
  type: FundingSourceType;
  country: string;
  annualBudget: number; // in millions USD
  budgetYear: number;
  description: string;
  fundingFocus: string[];
  canFundPhase3: boolean; // Can their budget cover a single Phase 3 AD trial?
  sourceIds: string[];
}

export const fundingSources: FundingSource[] = [
  // ============================================
  // GOVERNMENT FUNDING
  // ============================================
  {
    id: 'nih-nia',
    name: 'NIH/NIA (National Institute on Aging)',
    type: 'government',
    country: 'USA',
    annualBudget: 3_800, // $3.8 billion
    budgetYear: 2024,
    description:
      'Primary US federal funder of AD research. Budget has grown 7x since 2011 through advocacy.',
    fundingFocus: [
      'Basic research',
      'Translational research',
      'Clinical trials',
      'Biomarkers',
      'Care research',
    ],
    canFundPhase3: true, // Could fund ~8 Phase 3 trials per year
    sourceIds: ['nih-nia-budget-2024'],
  },
  {
    id: 'uk-dementia-research',
    name: 'UK Government Dementia Research',
    type: 'government',
    country: 'UK',
    annualBudget: 200, // ~£160M = ~$200M
    budgetYear: 2024,
    description:
      'UK government commitment doubled dementia research funding to £160M by 2024.',
    fundingFocus: ['Basic research', 'Care research', 'Prevention'],
    canFundPhase3: false, // Entire annual budget < 1 Phase 3 trial
    sourceIds: ['uk-dementia-budget-2024'],
  },

  // ============================================
  // NONPROFIT / FOUNDATION FUNDING
  // ============================================
  {
    id: 'alzheimers-association',
    name: "Alzheimer's Association",
    type: 'nonprofit',
    country: 'USA',
    annualBudget: 105, // $105 million in 2024
    budgetYear: 2024,
    description:
      'Largest nonprofit AD funder. Active portfolio of 1,100+ grants in 56 countries totaling $430M committed.',
    fundingFocus: [
      'Early-career researchers',
      'Novel hypotheses',
      'Care research',
      'Diversity in research',
    ],
    canFundPhase3: false, // Annual budget = ~23% of one Phase 3
    sourceIds: ['alzheimers-association-budget-2024'],
  },
  {
    id: 'alzheimers-research-uk',
    name: "Alzheimer's Research UK",
    type: 'nonprofit',
    country: 'UK',
    annualBudget: 43, // £34.6M = ~$43M
    budgetYear: 2024,
    description:
      'Leading UK dementia research charity. Has funded 1,275 projects and committed £237M+ to research.',
    fundingFocus: ['Basic research', 'Drug discovery', 'Early detection', 'Prevention'],
    canFundPhase3: false, // Annual budget = ~9% of one Phase 3
    sourceIds: ['aruk-budget-2024'],
  },
  {
    id: 'brightfocus',
    name: 'BrightFocus Foundation',
    type: 'nonprofit',
    country: 'USA',
    annualBudget: 10, // ~$10M across all programs (AD, macular, glaucoma)
    budgetYear: 2024,
    description:
      'Funds innovative seed research. Has invested $189M+ in AD research historically. No government funding.',
    fundingFocus: [
      'Early-stage/seed research',
      'Novel mechanisms',
      'Early-career scientists',
    ],
    canFundPhase3: false, // Annual budget = ~2% of one Phase 3
    sourceIds: ['brightfocus-budget-2024'],
  },
  {
    id: 'addf',
    name: "Alzheimer's Drug Discovery Foundation (ADDF)",
    type: 'nonprofit',
    country: 'USA',
    annualBudget: 15, // Estimated based on portfolio; venture philanthropy model
    budgetYear: 2024,
    description:
      'Venture philanthropy model—invests in drug development, returns go back to mission. Has invested $65M+ in 450 programs.',
    fundingFocus: [
      'Drug development',
      'Clinical trials',
      'Biomarkers',
      'Aging biology',
    ],
    canFundPhase3: false, // Annual budget = ~3% of one Phase 3
    sourceIds: ['addf-budget-2024'],
  },

  // ============================================
  // INDUSTRY (FOR COMPARISON)
  // ============================================
  {
    id: 'pharma-industry',
    name: 'Pharmaceutical Industry (Combined)',
    type: 'industry',
    country: 'Global',
    annualBudget: 2_000, // Rough estimate based on $42.5B over 26 years
    budgetYear: 2024,
    description:
      'Private pharma investment. Historically $42.5B spent 1995-2021. Concentrated on amyloid-targeting drugs.',
    fundingFocus: [
      'Late-stage clinical trials',
      'FDA approval pathways',
      'Patentable compounds',
    ],
    canFundPhase3: true, // Primary funder of Phase 3 trials
    sourceIds: ['cummings-ad-costs-2022'],
  },
];

// ============================================
// NIH/NIA BUDGET BREAKDOWN
// Why can't we just rely on NIH to fund generic drug trials?
// Source: NIH Reporter, NIA Budget documents, estimates
// ============================================

export interface NIHBudgetCategory {
  id: string;
  category: string;
  amount: number; // in millions USD
  percentage: number;
  description: string;
  canFundGenericTrials: boolean;
}

export const nihBudgetBreakdown: NIHBudgetCategory[] = [
  {
    id: 'basic-research',
    category: 'Basic Research',
    amount: 1520, // ~40% of $3.8B
    percentage: 40,
    description: 'Fundamental biology, disease mechanisms, genetics, biomarkers. Essential but doesn\'t fund clinical trials.',
    canFundGenericTrials: false,
  },
  {
    id: 'amyloid-research',
    category: 'Amyloid-Focused Research',
    amount: 1140, // ~30% - estimated from NIH project data
    percentage: 30,
    description: 'Research specifically on amyloid hypothesis. Nearly half of all AD funding goes here.',
    canFundGenericTrials: false,
  },
  {
    id: 'clinical-trials',
    category: 'Clinical Trials (Total)',
    amount: 570, // ~15%
    percentage: 15,
    description: 'All clinical trial funding combined. Only a fraction goes to non-amyloid approaches.',
    canFundGenericTrials: true,
  },
  {
    id: 'care-research',
    category: 'Care & Caregiving Research',
    amount: 380, // ~10%
    percentage: 10,
    description: 'Research on care delivery, caregiver support, health services. Important but not drug development.',
    canFundGenericTrials: false,
  },
  {
    id: 'infrastructure',
    category: 'Infrastructure & Training',
    amount: 190, // ~5%
    percentage: 5,
    description: 'Training grants, research centers, ADNI, data sharing infrastructure.',
    canFundGenericTrials: false,
  },
];

// Detailed breakdown of why NIH can't fill the gap
export const nihLimitations = {
  totalBudget: 3800, // $3.8B in 2024
  clinicalTrialBudget: 570, // $570M for ALL clinical trials
  amyloidTrialBudget: 400, // Most clinical trial $ goes to amyloid approaches
  nonAmyloidTrialBudget: 170, // Only ~$170M for non-amyloid trials
  phase3Cost: 462, // A single Phase 3 costs $462M

  keyProblems: [
    {
      problem: 'Amyloid Concentration',
      detail: 'Nearly half of NIA\'s AD research budget is concentrated on amyloid-focused studies, leaving alternative hypotheses underfunded.',
    },
    {
      problem: 'Basic vs Applied',
      detail: 'NIH\'s mandate prioritizes understanding disease (basic research) over developing treatments (applied research like Phase 3 trials).',
    },
    {
      problem: 'Grant Cycles',
      detail: 'NIH grants are structured for academic timelines, not commercial drug development—making large, sustained Phase 3 investments structurally difficult.',
    },
    {
      problem: 'Academic Infrastructure',
      detail: 'Universities excel at discovery research but lack the operational capacity for large-scale clinical trials that pharmaceutical companies have built over decades.',
    },
    {
      problem: 'Peer Review Conservatism',
      detail: 'NIH peer review historically favored "safe" amyloid research over alternative hypotheses.',
    },
  ],

  // Calculation showing the math doesn't work
  mathDoesntWork: {
    totalNonAmyloidTrialFunding: 170, // $170M
    singlePhase3Cost: 462, // $462M
    percentCovered: Math.round((170 / 462) * 100), // ~37%
    conclusion: 'Even if NIH devoted ALL non-amyloid trial funding to a single generic drug trial, it would only cover 37% of costs.',
  }
};

// NIA spending by research focus area (for pie/bar chart)
// Source: NIH Reporter analysis (nih-reporter-ad-portfolio-2024)
export const niaSpendingByFocus = [
  { name: 'Amyloid-focused', amount: 1140, percentage: 30, color: '#60a5fa' },
  { name: 'Tau-focused', amount: 380, percentage: 10, color: '#f59e0b' },
  { name: 'Neuroinflammation', amount: 228, percentage: 6, color: '#ec4899' },
  { name: 'Vascular/Metabolic', amount: 190, percentage: 5, color: '#a78bfa' },
  { name: 'Care & Caregiving', amount: 380, percentage: 10, color: '#10b981' },
  { name: 'Basic Neuroscience', amount: 760, percentage: 20, color: '#6b7280' },
  { name: 'Infrastructure/Training', amount: 342, percentage: 9, color: '#94a3b8' },
  { name: 'Other', amount: 380, percentage: 10, color: '#cbd5e1' },
];
export const niaSpendingSourceId = 'nih-reporter-ad-portfolio-2024';

// Basic vs Applied research funding comparison
// Source: NIH RePORTER (nih-basic-vs-applied-2023)
export const basicVsAppliedFunding = [
  {
    category: 'NIH/NIA',
    basic: 2660, // ~70% of $3.8B
    applied: 570, // ~15% clinical trials
    other: 570, // ~15% care, infrastructure
    basicPercent: 70,
    appliedPercent: 15,
  },
  {
    category: 'Pharma Industry',
    basic: 200, // ~10% of $2B
    applied: 1600, // ~80% late-stage trials
    other: 200, // ~10% other
    basicPercent: 10,
    appliedPercent: 80,
  },
];
export const basicVsAppliedSourceId = 'nih-basic-vs-applied-2023';

// Grant cycle limitations data
// Sources: NIH Data Book (nih-r01-funding-levels-2024), Cummings 2022 (cummings-ad-drug-development-2022)
export const grantCycleComparison = {
  nihGrant: {
    label: 'Typical NIH R01 Grant',
    duration: '5 years',
    totalBudget: 2.5, // $2.5M over 5 years
    annualBudget: 0.5, // $500K/year
    renewalRequired: true,
    renewalUncertainty: 'High—must compete for renewal',
  },
  phase3Trial: {
    label: 'AD Phase 3 Trial',
    duration: '3-5 years',
    totalBudget: 462, // $462M
    annualBudget: 115, // ~$115M/year
    renewalRequired: false,
    commitmentRequired: 'Full funding must be secured upfront',
  },
  gap: {
    budgetMultiple: 185, // Phase 3 costs 185x more than an R01
    insight: 'A single Phase 3 trial costs as much as 185 R01 grants. NIH would need to consolidate nearly 200 grants to fund one trial—something the grant system isn\'t designed to do.',
  },
  sourceIds: ['nih-r01-funding-levels-2024', 'cummings-ad-drug-development-2022'],
};

// Academic vs Pharma infrastructure comparison
// Sources: Getz & Campo 2017 (pharmaceutical-clinical-trial-infrastructure),
//          Zarin et al. 2019 (academic-clinical-trial-challenges-2019)
export const infrastructureComparison = [
  {
    capability: 'Clinical Sites',
    academic: '10-50 sites via academic networks',
    pharma: '200-500+ global sites via CRO partnerships',
    advantage: 'pharma',
  },
  {
    capability: 'Patient Recruitment',
    academic: 'Months to years; limited marketing budget',
    pharma: 'Dedicated teams, TV ads, patient databases',
    advantage: 'pharma',
  },
  {
    capability: 'Regulatory Affairs',
    academic: 'Small teams; FDA interactions as needed',
    pharma: 'Large dedicated teams; ongoing FDA relationships',
    advantage: 'pharma',
  },
  {
    capability: 'Data Management',
    academic: 'REDCap, limited staff',
    pharma: 'Enterprise systems, 24/7 monitoring centers',
    advantage: 'pharma',
  },
  {
    capability: 'Safety Monitoring',
    academic: 'Local IRBs, DSMBs',
    pharma: 'Global pharmacovigilance systems',
    advantage: 'pharma',
  },
  {
    capability: 'Manufacturing',
    academic: 'Must partner or outsource',
    pharma: 'In-house GMP facilities',
    advantage: 'pharma',
  },
  {
    capability: 'Budget Flexibility',
    academic: 'Fixed grant amounts; competitive renewals',
    pharma: 'Can increase investment if results promising',
    advantage: 'pharma',
  },
  {
    capability: 'Discovery Research',
    academic: 'Strength: novel hypotheses, long-term questions',
    pharma: 'Limited; prefer validated targets',
    advantage: 'academic',
  },
];
export const infrastructureSourceIds = ['pharmaceutical-clinical-trial-infrastructure', 'academic-clinical-trial-challenges-2019'];

// Data for funding comparison bar chart
export const fundingComparisonData = [
  {
    name: 'Pharma (Annual AD Spend)',
    amount: 2000,
    color: 'blue',
    description: '~$2B/year on AD drug development',
  },
  {
    name: 'NIH/NIA (Total Budget)',
    amount: 3800,
    color: 'emerald',
    description: 'But only 15% funds clinical trials',
  },
  {
    name: 'NIH Clinical Trials',
    amount: 570,
    color: 'cyan',
    description: 'Most goes to amyloid approaches',
  },
  {
    name: 'NIH Non-Amyloid Trials',
    amount: 170,
    color: 'amber',
    description: 'Available for alternative approaches',
  },
  {
    name: 'All Nonprofits Combined',
    amount: 173,
    color: 'purple',
    description: 'Alzheimer\'s Assoc, ADDF, etc.',
  },
  {
    name: 'Single Phase 3 Trial',
    amount: 462,
    color: 'red',
    description: 'Cost of one AD Phase 3 trial',
  },
];

// ============================================
// FUNDING GAP ANALYSIS
// ============================================

export function getFundingGapAnalysis() {
  const phase3Cost = adTrialPhaseCosts.find(p => p.phase === 'Phase 3')!.perDrugCost;
  const totalNonprofitAnnual = fundingSources
    .filter(s => s.type === 'nonprofit')
    .reduce((sum, s) => sum + s.annualBudget * 1_000_000, 0);
  const nihBudget =
    fundingSources.find(s => s.id === 'nih-nia')!.annualBudget * 1_000_000;

  return {
    phase3CostUSD: phase3Cost,
    totalNonprofitAnnualUSD: totalNonprofitAnnual,
    nihAnnualUSD: nihBudget,
    nonprofitCoversPhase3Percent: Math.round(
      (totalNonprofitAnnual / phase3Cost) * 100
    ),
    nihCouldFundTrials: Math.floor(nihBudget / phase3Cost),
    keyInsight:
      'All major AD nonprofits combined (~$173M/year) cannot fund a single Phase 3 trial ($462M). NIH could theoretically fund ~8 trials/year, but most funding goes to basic research. This leaves Phase 3 trials almost entirely dependent on industry—which prioritizes patentable compounds.',
  };
}

// Examples of drugs tested elsewhere first (or instead of AD)
export const redirectedDrugs: RedirectedDrug[] = [
  {
    id: 'riluzole',
    name: 'Riluzole',
    mechanism: 'Glutamate modulator; reduces excitotoxicity',
    originalTarget: 'Amyotrophic lateral sclerosis (ALS)',
    adRationale: 'Glutamate excitotoxicity contributes to neuronal death in AD; riluzole could be neuroprotective',
    currentIndications: ['ALS (FDA approved 1995)'],
    adTrialStatus: 'phase_2',
    whyNotAD: 'ALS trials are shorter (18 months), smaller (300-600 patients), and have clear functional endpoints. AD trials would need 3-5x more patients and 2x longer duration.',
    potentialConcerns: [
      'May protect neuronal cell bodies but not synapses from C1q-mediated complement attack',
      'Does not address membrane vulnerability to oxidative stress',
      'Risk of hepatotoxicity requires liver function monitoring',
    ],
    sourceIds: ['riluzole-als-1994', 'riluzole-hepatotoxicity-livertox', 'c1q-synapse-elimination-2022'],
  },
  {
    id: 'lysosome-acidifiers',
    name: 'β2-Adrenergic Agonists (Lysosome Acidifiers)',
    mechanism: 'Restore lysosomal acidification via β2-AR/PKA/ClC-7 pathway; rescues autophagy function',
    originalTarget: 'Asthma, COPD (existing β2 agonists like isoproterenol)',
    adRationale: 'Nixon lab showed lysosome acidification failure is the earliest pathology in AD—before amyloid plaques. Restoring lysosomal pH reverses autophagy dysfunction, reduces intraneuronal amyloid >50%, and improves memory in AD mice.',
    currentIndications: ['β2 agonists approved for respiratory conditions; novel derivatives in preclinical development'],
    adTrialStatus: 'preclinical',
    whyNotAD: 'This is a paradigm shift from anti-amyloid approaches: "One has to now attack the process inside the cell... to cure the cell from inside rather than by removing amyloid." Novel brain-penetrant derivatives are being developed but lack pharma investment despite strong preclinical data.',
    sourceIds: ['nixon-lysosome-2020', 'nixon-panthos-2022'],
  },
  {
    id: 'dasatinib',
    name: 'Dasatinib + Quercetin',
    mechanism: 'Senolytic combination; clears senescent cells',
    originalTarget: 'Chronic myeloid leukemia (dasatinib)',
    adRationale: 'Senescent cells accumulate in aging brains and secrete inflammatory factors (SASP); clearing them may reduce neuroinflammation',
    currentIndications: ['CML (dasatinib)', 'Quercetin is a supplement'],
    adTrialStatus: 'phase_2',
    whyNotAD: 'Cancer trials have short durations (months) and clear response criteria (tumor shrinkage). AD senolytic trials are exploratory, require years of follow-up, and the mechanism is speculative. Small pilot studies ongoing but no pharma investment.',
    potentialConcerns: [
      'Dasatinib inhibits Src family kinases required for DAP12 phosphorylation, potentially blocking TREM2-mediated DAM transition and phagocytosis—uncleared debris may activate TLR4',
      'Rapid death of senescent glia may release iron, triggering ferroptosis in neighboring cells',
      'Quercetin is a flavonoid iron chelator that may strip bioavailable iron from cytoplasm, starving mitochondria of Fe-S clusters and worsening metabolic failure even as inflammation drops',
    ],
    sourceIds: ['senolytics-ad-2019'],
  },
  {
    id: 'rapamycin',
    name: 'Rapamycin (Sirolimus)',
    mechanism: 'mTOR inhibitor; enhances autophagy, reduces inflammation',
    originalTarget: 'Organ transplant rejection',
    adRationale: 'mTOR inhibition restores autophagy—critical for clearing protein aggregates. Extends lifespan in multiple species.',
    currentIndications: ['Transplant rejection', 'Certain cancers', 'LAM'],
    adTrialStatus: 'phase_1',
    whyNotAD: 'Transplant trials are well-defined with clear endpoints. AD trials for an autophagy mechanism would need to prove cognitive benefit over years. No major pharma investment; only academic studies.',
    potentialConcerns: [
      'Increases autophagosome input without guaranteeing lysosomal output—if lysosomal pH > 5.5 or lipofuscin load is high, autolysosomes may accumulate with undegraded mtDNA, risking LMP and cGAS-STING activation',
      'Potent immunosuppressant that inhibits translation of cytokines and receptors needed for DAM transition, potentially impairing microglial protective functions',
    ],
    sourceIds: ['rapamycin-autophagy-2016'],
  },
  {
    id: 'telmisartan',
    name: 'Telmisartan',
    mechanism: 'ARB with PPAR-γ activation; antihypertensive with metabolic benefits',
    originalTarget: 'Hypertension',
    adRationale: 'Hypertension is a major AD risk factor; telmisartan uniquely activates PPAR-γ (like pioglitazone) while controlling blood pressure',
    currentIndications: ['Hypertension', 'Cardiovascular risk reduction'],
    adTrialStatus: 'none',
    whyNotAD: 'Blood pressure trials use clear endpoints (mmHg reduction) over months. An AD trial would need cognitive endpoints over years. Generic status means no commercial incentive despite plausible mechanism.',
    sourceIds: ['telmisartan-pparg-2004'],
  },
  {
    id: 'metformin',
    name: 'Metformin',
    mechanism: 'AMPK activator; improves insulin sensitivity, reduces inflammation, may enhance autophagy',
    originalTarget: 'Type 2 diabetes',
    adRationale: 'Epidemiological studies show diabetics on metformin have lower AD risk. AMPK activation may reduce tau phosphorylation and improve neuronal metabolism.',
    currentIndications: ['Type 2 diabetes (first-line treatment)'],
    adTrialStatus: 'phase_2',
    whyNotAD: 'Metformin is off-patent and costs pennies per pill. The large prevention trial needed would cost hundreds of millions with no commercial return. Small academic trials ongoing but no pharma investment despite compelling observational data.',
    sourceIds: ['metformin-ad-meta-2020'],
  },
  {
    id: 'orforglipron',
    name: 'Orforglipron',
    mechanism: 'Oral small-molecule GLP-1 receptor agonist; designed for better CNS penetration than injectable peptide GLP-1s',
    originalTarget: 'Type 2 diabetes and obesity',
    adRationale: 'Brain insulin resistance is implicated in AD ("Type 3 diabetes" hypothesis); GLP-1 agonists may reduce neuroinflammation. As a small molecule, orforglipron may have better blood-brain barrier penetration than injectable peptides like semaglutide (which failed EVOKE).',
    currentIndications: ['Phase 3 for diabetes/obesity (not yet approved)'],
    adTrialStatus: 'none',
    whyNotAD: 'Eli Lilly is prioritizing Phase 3 diabetes/obesity trials first—faster endpoints, higher success rates. If approved, physicians could prescribe off-label for AD patients while the company decides whether to run formal AD trials. This is the "test elsewhere first" strategy in action.',
    potentialConcerns: [
      'GFAP increases may cause myelin damage and white matter degeneration',
      'mTORC1 activation could inhibit autophagy, preventing clearance of protein aggregates',
      'Increased resting heart rate and sympathetic tone may disrupt glymphatic clearance, inhibiting amyloid plaque and tau clearance during sleep',
    ],
    sourceIds: ['orforglipron-lilly-2025', 'glp1-mtorc1-activation-2023', 'glp1-heart-rate-2016', 'glymphatic-heart-rate-2019', 'glymphatic-norepinephrine-2025'],
  },
];

// Data for disease comparison charts
export const diseaseComparisonChartData = {
  // Phase 3 costs by disease
  costComparison: [
    { disease: "Alzheimer's", cost: 462, color: '#ef4444' },
    { disease: "Parkinson's", cost: 150, color: '#f59e0b' },
    { disease: 'Diabetes', cost: 120, color: '#3b82f6' },
    { disease: 'ALS', cost: 80, color: '#10b981' },
    { disease: 'Oncology', cost: 100, color: '#8b5cf6' },
  ],
  // Trial duration by disease (months)
  durationComparison: [
    { disease: "Alzheimer's", duration: 48, color: '#ef4444' },
    { disease: "Parkinson's", duration: 30, color: '#f59e0b' },
    { disease: 'Diabetes', cost: 18, duration: 18, color: '#3b82f6' },
    { disease: 'ALS', duration: 18, color: '#10b981' },
    { disease: 'Oncology', duration: 24, color: '#8b5cf6' },
  ],
  // Patients required by disease
  patientsComparison: [
    { disease: "Alzheimer's", patients: 2250, color: '#ef4444' },
    { disease: "Parkinson's", patients: 600, color: '#f59e0b' },
    { disease: 'Diabetes', patients: 1000, color: '#3b82f6' },
    { disease: 'ALS', patients: 450, color: '#10b981' },
    { disease: 'Oncology', patients: 500, color: '#8b5cf6' },
  ],
  // Failure rates by disease
  failureRateComparison: [
    { disease: "Alzheimer's", rate: 99, color: '#ef4444' },
    { disease: "Parkinson's", rate: 92, color: '#f59e0b' },
    { disease: 'Diabetes', rate: 70, color: '#3b82f6' },
    { disease: 'ALS', rate: 95, color: '#10b981' },
    { disease: 'Oncology', rate: 95, color: '#8b5cf6' },
  ],
};

// Summary statistics
export function getTrialBarriersSummary() {
  return {
    adTrialCostMultiple: '3-5x',
    adTrialDurationMultiple: '2-3x',
    adTrialPatientMultiple: '3-5x',
    drugsTestedElsewhere: redirectedDrugs.length,
    keyInsight: 'The economics of drug development push companies to test promising drugs in faster, cheaper indications first. By the time a drug might reach AD trials—if ever—patent life may be nearly exhausted.',
  };
}

// Get drugs by their AD trial status
export function getDrugsByADStatus(status: RedirectedDrug['adTrialStatus']): RedirectedDrug[] {
  return redirectedDrugs.filter(d => d.adTrialStatus === status);
}

// Get drugs that have never been tried in AD
export function getDrugsNeverTriedInAD(): RedirectedDrug[] {
  return redirectedDrugs.filter(d => d.adTrialStatus === 'none' || d.adTrialStatus === 'abandoned');
}
