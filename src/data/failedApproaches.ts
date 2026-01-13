// Failed Approaches in Alzheimer's Research
// Important context: what didn't work and why
// Learning from failure is essential to understanding the field

export type FailureCategory =
  | 'amyloid_antibody' // Anti-amyloid immunotherapies
  | 'secretase_inhibitor' // BACE/gamma secretase inhibitors
  | 'tau_targeted' // Tau-targeting approaches
  | 'anti_inflammatory' // NSAIDs and anti-inflammatory approaches
  | 'metabolic' // GLP-1, insulin sensitizers
  | 'antiviral' // Viral hypothesis approaches
  | 'neurotransmitter' // Cholinesterase inhibitors, etc.
  | 'other'; // Other mechanisms

export type FailureReason =
  | 'no_efficacy' // Drug worked mechanistically but no clinical benefit
  | 'safety' // Unacceptable side effects
  | 'futility' // Stopped early for no chance of success
  | 'wrong_target' // Hypothesis may be incorrect
  | 'wrong_timing' // Intervention too late in disease
  | 'wrong_population' // Wrong patient selection
  | 'bbb_penetration' // Drug didn't reach brain adequately
  | 'commercial' // Commercial failure despite approval
  | 'fraud'; // Data integrity issues

export interface FailedApproach {
  id: string;
  name: string;
  company: string;
  category: FailureCategory;
  mechanism: string;
  hypothesis: string;
  trialPhase: string;
  trialName?: string;
  participants?: number;
  trialResult: string;
  yearFailed: number;
  failureReasons: FailureReason[];
  lesson: string;
  costEstimate?: string;
  sourceIds: string[];
}

export const failedApproaches: FailedApproach[] = [
  // ============================================
  // AMYLOID ANTIBODIES
  // ============================================
  {
    id: 'aducanumab',
    name: 'Aducanumab (Aduhelm)',
    company: 'Biogen',
    category: 'amyloid_antibody',
    mechanism: 'Monoclonal antibody targeting aggregated Aβ',
    hypothesis: 'Removing amyloid plaques would slow cognitive decline',
    trialPhase: 'Phase 3',
    trialName: 'EMERGE/ENGAGE',
    participants: 3285,
    trialResult:
      'Phase 3 trials stopped for futility in March 2019. Post-hoc analysis of high-dose EMERGE showed 22% slowing; identical ENGAGE trial showed no benefit. FDA approved June 2021 despite 10-0 advisory panel rejection. Biogen abandoned January 2024.',
    yearFailed: 2024,
    failureReasons: ['no_efficacy', 'safety', 'commercial'],
    lesson:
      'Clearing plaques alone is insufficient. The FDA approval despite unanimous expert rejection damaged trust in the regulatory process. Commercial failure suggests the market rejected the risk-benefit profile.',
    costEstimate: '>$2 billion development cost',
    sourceIds: ['aducanumab-advisory-2020', 'biogen-discontinue-2024'],
  },

  {
    id: 'bapineuzumab',
    name: 'Bapineuzumab',
    company: 'Pfizer/Johnson & Johnson',
    category: 'amyloid_antibody',
    mechanism: 'Monoclonal antibody targeting N-terminus of Aβ',
    hypothesis: 'Passive immunization against amyloid would slow disease',
    trialPhase: 'Phase 3',
    participants: 4570,
    trialResult:
      'Four Phase 3 trials failed to show clinical benefit in mild-to-moderate AD. Reduced amyloid on PET imaging but no cognitive improvement.',
    yearFailed: 2012,
    failureReasons: ['no_efficacy', 'safety'],
    lesson:
      'First major amyloid antibody failure. Established pattern: successful amyloid clearance without clinical benefit. ARIA side effects first characterized here.',
    costEstimate: '~$400 million',
    sourceIds: ['bapineuzumab-2012'],
  },

  {
    id: 'solanezumab',
    name: 'Solanezumab',
    company: 'Eli Lilly',
    category: 'amyloid_antibody',
    mechanism: 'Monoclonal antibody targeting soluble Aβ monomers',
    hypothesis: 'Targeting soluble (not plaque) amyloid would be more effective',
    trialPhase: 'Phase 3',
    trialName: 'EXPEDITION 1/2/3',
    participants: 4100,
    trialResult:
      'EXPEDITION 1 & 2 failed in mild-to-moderate AD. EXPEDITION 3 focused on mild AD only—still failed to meet primary endpoint.',
    yearFailed: 2016,
    failureReasons: ['no_efficacy'],
    lesson:
      'Even targeting soluble amyloid (not plaques) failed. Multiple attempts to refine patient selection could not rescue the approach.',
    costEstimate: '>$1 billion across all trials',
    sourceIds: ['solanezumab-2016'],
  },

  {
    id: 'crenezumab',
    name: 'Crenezumab',
    company: 'Roche/Genentech',
    category: 'amyloid_antibody',
    mechanism: 'Monoclonal antibody targeting multiple forms of Aβ',
    hypothesis: 'Broader amyloid targeting would be more effective',
    trialPhase: 'Phase 3',
    trialName: 'CREAD 1/2',
    participants: 1500,
    trialResult:
      'Trials stopped early for futility in January 2019. Also failed in prevention trial for familial AD (API Colombia).',
    yearFailed: 2019,
    failureReasons: ['futility', 'no_efficacy'],
    lesson:
      'Even prevention trials in genetically at-risk populations failed. The amyloid hypothesis faced its strongest test and did not pass.',
    sourceIds: ['crenezumab-2019'],
  },

  {
    id: 'gantenerumab',
    name: 'Gantenerumab',
    company: 'Roche',
    category: 'amyloid_antibody',
    mechanism: 'Fully human monoclonal antibody targeting aggregated Aβ',
    hypothesis: 'High-dose subcutaneous administration would improve efficacy',
    trialPhase: 'Phase 3',
    trialName: 'GRADUATE 1/2',
    participants: 2000,
    trialResult:
      'Both Phase 3 trials failed in November 2022. Significant amyloid reduction but no slowing of cognitive decline.',
    yearFailed: 2022,
    failureReasons: ['no_efficacy'],
    lesson:
      'High-dose regimen achieving near-complete amyloid clearance still failed. Strongest evidence yet that plaque removal alone is insufficient.',
    sourceIds: ['gantenerumab-2022'],
  },

  // ============================================
  // SECRETASE INHIBITORS
  // ============================================
  {
    id: 'semagacestat',
    name: 'Semagacestat',
    company: 'Eli Lilly',
    category: 'secretase_inhibitor',
    mechanism: 'Gamma-secretase inhibitor to reduce Aβ production',
    hypothesis: 'Blocking amyloid production at the source would prevent disease',
    trialPhase: 'Phase 3',
    participants: 2600,
    trialResult:
      'Trials stopped in 2010 after patients on drug declined FASTER than placebo. Also increased skin cancer risk.',
    yearFailed: 2010,
    failureReasons: ['safety', 'no_efficacy'],
    lesson:
      'Gamma-secretase has many substrates beyond APP (including Notch). Non-selective inhibition caused serious harm. Biology is more complex than the hypothesis assumed.',
    sourceIds: ['semagacestat-2010'],
  },

  {
    id: 'verubecestat',
    name: 'Verubecestat',
    company: 'Merck',
    category: 'secretase_inhibitor',
    mechanism: 'BACE1 inhibitor to reduce Aβ production',
    hypothesis: 'More selective secretase inhibition would be safer and effective',
    trialPhase: 'Phase 3',
    trialName: 'EPOCH',
    participants: 1958,
    trialResult:
      'Stopped for futility in February 2017. Patients on drug performed worse on cognitive tests despite 60-80% reduction in CSF amyloid.',
    yearFailed: 2017,
    failureReasons: ['futility', 'no_efficacy', 'safety'],
    lesson:
      'Even highly selective BACE1 inhibition that successfully reduced amyloid production failed. Cognitive worsening suggested amyloid or BACE1 may serve important functions.',
    sourceIds: ['verubecestat-2017'],
  },

  {
    id: 'atabecestat',
    name: 'Atabecestat',
    company: 'Janssen',
    category: 'secretase_inhibitor',
    mechanism: 'BACE1 inhibitor',
    hypothesis: 'Prevention in at-risk individuals would succeed where treatment failed',
    trialPhase: 'Phase 2/3',
    trialName: 'Early (Prevention)',
    trialResult:
      'Prevention trial stopped in May 2018 due to liver toxicity findings.',
    yearFailed: 2018,
    failureReasons: ['safety'],
    lesson:
      'BACE inhibitors showed consistent safety signals across multiple compounds. The target may be too important for normal function.',
    sourceIds: ['atabecestat-2018'],
  },

  {
    id: 'lanabecestat',
    name: 'Lanabecestat',
    company: 'AstraZeneca/Eli Lilly',
    category: 'secretase_inhibitor',
    mechanism: 'BACE1 inhibitor',
    hypothesis: 'Different BACE inhibitor might have better profile',
    trialPhase: 'Phase 3',
    trialName: 'AMARANTH/DAYBREAK',
    participants: 4400,
    trialResult:
      'Both trials stopped for futility in June 2018. Part of systematic failure of entire BACE inhibitor class.',
    yearFailed: 2018,
    failureReasons: ['futility', 'no_efficacy'],
    lesson:
      'The entire BACE inhibitor class failed. Reducing amyloid production—like removing plaques—does not slow disease.',
    sourceIds: ['lanabecestat-2018'],
  },

  // ============================================
  // METABOLIC / GLP-1
  // ============================================
  {
    id: 'oral-semaglutide',
    name: 'Oral Semaglutide',
    company: 'Novo Nordisk',
    category: 'metabolic',
    mechanism: 'GLP-1 receptor agonist (oral formulation)',
    hypothesis: 'GLP-1 agonists would address the "Type 3 Diabetes" mechanism',
    trialPhase: 'Phase 3',
    trialName: 'EVOKE / EVOKE+',
    participants: 3808,
    trialResult:
      'Both Phase 3 trials failed to show significant slowing of cognitive decline vs placebo. Biomarkers improved but clinical endpoints not met.',
    yearFailed: 2024,
    failureReasons: ['no_efficacy', 'bbb_penetration'],
    lesson:
      'Oral semaglutide has limited blood-brain barrier penetration (~1% of plasma levels reach brain). The metabolic hypothesis may still be valid, but requires drugs that adequately reach brain tissue. Injectable GLP-1 agonists with better CNS exposure are still being studied.',
    sourceIds: ['semaglutide-evoke-2024'],
  },

  {
    id: 'liraglutide-elad',
    name: 'Liraglutide (ELAD trial)',
    company: 'Novo Nordisk',
    category: 'metabolic',
    mechanism: 'GLP-1 receptor agonist (injectable)',
    hypothesis: 'GLP-1 agonists would protect brain metabolism',
    trialPhase: 'Phase 2b',
    trialName: 'ELAD',
    participants: 204,
    trialResult:
      'Primary endpoint (brain glucose metabolism on FDG-PET) not met. Safe and well-tolerated but no significant benefit.',
    yearFailed: 2025,
    failureReasons: ['no_efficacy'],
    lesson:
      'Even injectable liraglutide, which crosses BBB better than oral semaglutide, did not show clear benefit. May need earlier intervention, longer treatment, or different GLP-1 approach. Subcutaneous tirzepatide (GLP-1/GIP dual agonist) trials ongoing.',
    sourceIds: ['liraglutide-elad-2025'],
  },

  // ============================================
  // ANTIVIRAL
  // ============================================
  {
    id: 'valacyclovir',
    name: 'Valacyclovir (VALAD trial)',
    company: 'Academic',
    category: 'antiviral',
    mechanism: 'Antiviral targeting herpes simplex virus',
    hypothesis: 'HSV reactivation in the brain contributes to AD pathology; antivirals could slow progression',
    trialPhase: 'Phase 2',
    trialName: 'VALAD',
    participants: 130,
    trialResult:
      'Valacyclovir group showed WORSE cognitive decline than placebo (10.86 vs 6.92 point worsening on ADAS-Cog).',
    yearFailed: 2025,
    failureReasons: ['no_efficacy', 'wrong_target'],
    lesson:
      'The viral hypothesis, at least via this antiviral approach in symptomatic patients, appears to be incorrect. The worse outcomes in the treatment group are concerning and unexplained.',
    sourceIds: ['valacyclovir-valad-2025'],
  },

  // ============================================
  // ANTI-INFLAMMATORY
  // ============================================
  {
    id: 'nsaids-adapt',
    name: 'NSAIDs (ADAPT trial)',
    company: 'NIH',
    category: 'anti_inflammatory',
    mechanism: 'COX inhibitors (naproxen, celecoxib) to reduce neuroinflammation',
    hypothesis: 'Epidemiological data showed NSAID users had lower AD risk; prevention trial would confirm',
    trialPhase: 'Phase 3',
    trialName: 'ADAPT',
    participants: 2528,
    trialResult:
      'Prevention trial stopped early in 2004 due to cardiovascular safety concerns with celecoxib. Naproxen arm showed no benefit and possible harm in some analyses.',
    yearFailed: 2004,
    failureReasons: ['safety', 'no_efficacy'],
    lesson:
      'Epidemiological associations don\'t prove causation. The "healthy user bias" likely explained the observational findings. NSAIDs at prevention doses carry cardiovascular risks that outweigh uncertain benefits.',
    sourceIds: ['adapt-2007'],
  },

  {
    id: 'tarenflurbil',
    name: 'Tarenflurbil (Flurizan)',
    company: 'Myriad Genetics',
    category: 'anti_inflammatory',
    mechanism: 'R-enantiomer of flurbiprofen; gamma-secretase modulator',
    hypothesis: 'Would shift amyloid production to shorter, less toxic forms',
    trialPhase: 'Phase 3',
    participants: 1600,
    trialResult:
      'Phase 3 trial failed in June 2008. No benefit on any outcome measure.',
    yearFailed: 2008,
    failureReasons: ['no_efficacy', 'bbb_penetration'],
    lesson:
      'Poor brain penetration may have doomed this approach. The gamma-secretase modulation concept was sound but the drug didn\'t reach adequate CNS concentrations.',
    costEstimate: '~$200 million',
    sourceIds: ['tarenflurbil-2008'],
  },

  // ============================================
  // TAU-TARGETED
  // ============================================
  {
    id: 'tideglusib',
    name: 'Tideglusib',
    company: 'Noscira/Zeltia',
    category: 'tau_targeted',
    mechanism: 'GSK-3 inhibitor to reduce tau phosphorylation',
    hypothesis: 'Reducing tau pathology would slow disease progression',
    trialPhase: 'Phase 2',
    trialName: 'ARGO',
    participants: 306,
    trialResult:
      'Phase 2 trial failed to meet primary endpoint in 2012. No significant benefit on cognitive or functional measures.',
    yearFailed: 2012,
    failureReasons: ['no_efficacy'],
    lesson:
      'First major tau-targeted failure. GSK-3 has many functions beyond tau; selective intervention proved difficult.',
    sourceIds: ['tideglusib-2012'],
  },

  {
    id: 'lmtx',
    name: 'LMTX (Methylene blue derivative)',
    company: 'TauRx',
    category: 'tau_targeted',
    mechanism: 'Tau aggregation inhibitor',
    hypothesis: 'Preventing tau tangles would slow disease',
    trialPhase: 'Phase 3',
    participants: 1686,
    trialResult:
      'Two Phase 3 trials failed primary endpoints in 2016. Add-on therapy showed no benefit; monotherapy showed modest signals but uncontrolled.',
    yearFailed: 2016,
    failureReasons: ['no_efficacy'],
    lesson:
      'Tau aggregation inhibition in symptomatic patients may be too late. Like amyloid, tau pathology may be a marker rather than a driver by the time symptoms appear.',
    sourceIds: ['lmtx-2016'],
  },

  // ============================================
  // FRAUD / DATA INTEGRITY
  // ============================================
  {
    id: 'lesne-ab56',
    name: 'Aβ*56 Research Program',
    company: 'Academic (University of Minnesota)',
    category: 'amyloid_antibody',
    mechanism: 'N/A - foundational research',
    hypothesis: 'Specific amyloid oligomer Aβ*56 was the toxic species causing memory impairment',
    trialPhase: 'Preclinical',
    trialResult:
      '2006 Nature paper cited 2,300+ times was retracted in 2024 after Science investigation found evidence of image manipulation. Researcher resigned in 2025.',
    yearFailed: 2024,
    failureReasons: ['fraud'],
    lesson:
      'Scientific fraud can misdirect an entire field for decades. The Aβ*56 hypothesis influenced research priorities and funding decisions. Peer review failed to catch obvious image manipulation for 16 years.',
    costEstimate: 'Billions in misdirected research funding (estimated)',
    sourceIds: ['lesne-2006', 'piller-2022', 'lesne-retraction-2024'],
  },
];

// ============================================
// SUMMARY STATISTICS
// ============================================

export interface FailureSummary {
  totalFailed: number;
  byCategory: Record<FailureCategory, number>;
  byReason: Record<FailureReason, number>;
  amyloidAntibodiesTotal: number;
  amyloidAntibodiesAllFailed: boolean;
  baceInhibitorsTotal: number;
  baceInhibitorsAllFailed: boolean;
  estimatedWastedInvestment: string;
}

export function getFailureSummary(): FailureSummary {
  const byCategory: Record<FailureCategory, number> = {
    amyloid_antibody: 0,
    secretase_inhibitor: 0,
    tau_targeted: 0,
    anti_inflammatory: 0,
    metabolic: 0,
    antiviral: 0,
    neurotransmitter: 0,
    other: 0,
  };

  const byReason: Record<FailureReason, number> = {
    no_efficacy: 0,
    safety: 0,
    futility: 0,
    wrong_target: 0,
    wrong_timing: 0,
    wrong_population: 0,
    bbb_penetration: 0,
    commercial: 0,
    fraud: 0,
  };

  for (const approach of failedApproaches) {
    byCategory[approach.category]++;
    for (const reason of approach.failureReasons) {
      byReason[reason]++;
    }
  }

  return {
    totalFailed: failedApproaches.length,
    byCategory,
    byReason,
    amyloidAntibodiesTotal: byCategory.amyloid_antibody,
    amyloidAntibodiesAllFailed: true, // Until lecanemab/donanemab, all failed
    baceInhibitorsTotal: byCategory.secretase_inhibitor,
    baceInhibitorsAllFailed: true, // Entire class failed
    estimatedWastedInvestment: '>$40 billion (conservative estimate)',
  };
}

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getFailuresByCategory(category: FailureCategory): FailedApproach[] {
  return failedApproaches.filter(f => f.category === category);
}

export function getFailuresByReason(reason: FailureReason): FailedApproach[] {
  return failedApproaches.filter(f => f.failureReasons.includes(reason));
}

export function getFailuresByYear(year: number): FailedApproach[] {
  return failedApproaches.filter(f => f.yearFailed === year);
}

export function getChronologicalFailures(): FailedApproach[] {
  return [...failedApproaches].sort((a, b) => a.yearFailed - b.yearFailed);
}

// Key lessons from the failures
export const keyLessonsFromFailures = [
  {
    lesson: 'Amyloid clearance is not sufficient',
    evidence:
      'Multiple antibodies successfully cleared plaques (bapineuzumab, gantenerumab) without clinical benefit.',
  },
  {
    lesson: 'Reducing amyloid production doesn\'t work',
    evidence:
      'Entire BACE inhibitor class failed. Patients on verubecestat performed worse despite 60-80% amyloid reduction.',
  },
  {
    lesson: 'Earlier is not always better',
    evidence:
      'Prevention trials (ADAPT, crenezumab in API Colombia) also failed to show benefit.',
  },
  {
    lesson: 'Epidemiological associations can mislead',
    evidence:
      'NSAIDs showed benefit in observational studies but failed in RCTs. "Healthy user bias" explained the association.',
  },
  {
    lesson: 'Blood-brain barrier penetration matters',
    evidence:
      'Oral semaglutide\'s failure may be due to poor BBB penetration (~1% reaches brain). Tarenflurbil similarly failed.',
  },
  {
    lesson: 'By the time symptoms appear, it may be too late',
    evidence:
      'Tau aggregation inhibitors failed in symptomatic patients. The disease process begins decades before diagnosis.',
  },
  {
    lesson: 'Animal models may not predict human outcomes',
    evidence:
      '99% of drugs that worked in mice failed in humans. Overexpression models created artifacts.',
  },
  {
    lesson: 'Scientific fraud can misdirect entire fields',
    evidence:
      'Aβ*56 research influenced 16 years of funding and research priorities before being exposed as fraudulent.',
  },
];
