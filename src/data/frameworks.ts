// Competing Frameworks for Alzheimer's Disease
// Reframes the narrative from "sidelined researchers" to "sidelined frameworks"
// Each framework has multiple proponents and represents a different causal theory

export type FrameworkStatus =
  | 'dominant' // Receives majority of funding
  | 'marginalized' // Historically underfunded despite evidence
  | 'emerging'; // Recently gaining recognition

export interface FrameworkProponent {
  name: string;
  institution: string;
  contribution: string;
  keyYear: number;
}

export interface FrameworkIntervention {
  name: string;
  type: 'generic' | 'patented' | 'lifestyle' | 'device';
  cost: 'low' | 'medium' | 'high';
  status: string;
}

export interface ResearchFramework {
  id: string;
  name: string;
  shortName: string;
  coreClaim: string;
  detailedClaim: string;
  yearProposed: number;
  cascadeStage: number | number[]; // Which stage(s) of the mechanistic cascade this addresses
  stageName: string;
  proponents: FrameworkProponent[];
  keyEvidence: string[];
  interventionTargets: string[];
  potentialInterventions: FrameworkIntervention[];
  status: FrameworkStatus;
  fundingShare?: string; // Approximate share of AD research funding
  sourceIds: string[];
}

export const frameworks: ResearchFramework[] = [
  // ============================================
  // THE DOMINANT FRAMEWORK
  // ============================================
  {
    id: 'amyloid',
    name: 'Amyloid Cascade Hypothesis',
    shortName: 'Amyloid',
    coreClaim: 'Aβ deposition is the initial pathological event that causes all downstream damage.',
    detailedClaim:
      'The amyloid cascade hypothesis proposes that deposition of Aβ is the initial pathological event in AD, leading to the formation of senile plaques and then to neurofibrillary tangles, neuronal cell death, and ultimately dementia. Remove the plaques, cure the disease.',
    yearProposed: 1992,
    cascadeStage: 8,
    stageName: 'Clearance Failure',
    proponents: [
      {
        name: 'John Hardy',
        institution: 'UCL',
        contribution: 'Formalized the amyloid cascade hypothesis',
        keyYear: 1992,
      },
      {
        name: 'Dennis Selkoe',
        institution: 'Harvard',
        contribution: 'Developed amyloid oligomer toxicity theory',
        keyYear: 1991,
      },
      {
        name: 'Alison Goate',
        institution: 'Icahn School of Medicine',
        contribution: 'Discovered APP mutations in familial AD',
        keyYear: 1991,
      },
    ],
    keyEvidence: [
      'APP mutations cause familial AD (~1% of cases)',
      'Down syndrome patients (trisomy 21, extra APP gene) develop AD early',
      'Amyloid plaques are present in all AD brains',
      'Anti-amyloid antibodies can remove plaques from the brain',
    ],
    interventionTargets: ['Aβ clearance', 'Secretase inhibition', 'Amyloid aggregation'],
    potentialInterventions: [
      {
        name: 'Lecanemab (Leqembi)',
        type: 'patented',
        cost: 'high',
        status: 'FDA approved 2023; $26,500/year; 27% slowing',
      },
      {
        name: 'Donanemab (Kisunla)',
        type: 'patented',
        cost: 'high',
        status: 'FDA approved 2024; ~$32,000/year; 35% slowing',
      },
      {
        name: 'Aducanumab (Aduhelm)',
        type: 'patented',
        cost: 'high',
        status: 'Approved 2021, abandoned 2024',
      },
    ],
    status: 'dominant',
    fundingShare: '~50% of NIH AD funding ($1.6B in 2022)',
    sourceIds: ['hardy-higgins-1992', 'goate-1991', 'glenner-wong-1984'],
  },

  // ============================================
  // THE SIDELINED FRAMEWORKS
  // ============================================
  {
    id: 'vascular',
    name: 'Vascular Hypothesis',
    shortName: 'Vascular',
    coreClaim: 'Chronic brain hypoperfusion initiates the neurodegenerative cascade.',
    detailedClaim:
      'The vascular hypothesis proposes that reduced blood flow to the brain (chronic cerebral hypoperfusion) is the primary initiating event in Alzheimer\'s disease. Cardiovascular risk factors damage blood vessels, reducing oxygen and nutrient delivery to neurons, which then triggers downstream pathology including amyloid deposition.',
    yearProposed: 1993,
    cascadeStage: 1,
    stageName: 'Entry Point',
    proponents: [
      {
        name: 'Jack de la Torre',
        institution: 'UT Austin / Banner Institute',
        contribution: 'Proposed CATCH hypothesis; chronic hypoperfusion experiments',
        keyYear: 1993,
      },
    ],
    keyEvidence: [
      'Cardiovascular disease is a major AD risk factor',
      'Hypoperfusion precedes amyloid deposition in longitudinal studies',
      'Hypertension treatment reduces dementia incidence by 50% (Syst-Eur trial)',
      'Cerebral blood flow is reduced years before symptoms',
    ],
    interventionTargets: ['Cerebral blood flow', 'Cardiovascular health', 'Blood pressure management'],
    potentialInterventions: [
      {
        name: 'Antihypertensives (nitrendipine)',
        type: 'generic',
        cost: 'low',
        status: '50% dementia reduction in Syst-Eur trial; ~$50/year',
      },
      {
        name: 'Exercise programs',
        type: 'lifestyle',
        cost: 'low',
        status: 'Improves cerebral blood flow; no patent',
      },
      {
        name: 'Cardiovascular risk management',
        type: 'lifestyle',
        cost: 'low',
        status: 'Prevention-focused; difficult to monetize',
      },
    ],
    status: 'marginalized',
    sourceIds: ['delatorre-1993'],
  },

  {
    id: 'metabolic',
    name: 'Type 3 Diabetes Hypothesis',
    shortName: 'Metabolic',
    coreClaim: 'Brain insulin resistance is the primary driver of Alzheimer\'s pathology.',
    detailedClaim:
      'The Type 3 Diabetes hypothesis proposes that Alzheimer\'s disease is fundamentally a metabolic disorder characterized by brain insulin resistance and deficiency. When neurons cannot properly use glucose due to insulin signaling failure, they starve, malfunction, and accumulate pathological proteins including amyloid.',
    yearProposed: 2005,
    cascadeStage: 1,
    stageName: 'Entry Point',
    proponents: [
      {
        name: 'Suzanne de la Monte',
        institution: 'Brown University',
        contribution: 'Coined "Type 3 Diabetes"; brain insulin resistance research',
        keyYear: 2005,
      },
      {
        name: 'Jack Wands',
        institution: 'Brown University',
        contribution: 'Co-developed metabolic hypothesis',
        keyYear: 2005,
      },
    ],
    keyEvidence: [
      'Type 2 diabetes increases AD risk 2-4x',
      'Brain insulin resistance precedes amyloid in longitudinal studies',
      'Insulin receptor knockout in mouse brain produces AD-like pathology',
      'Intranasal insulin improves cognition in AD patients (trials)',
    ],
    interventionTargets: ['Brain insulin signaling', 'Glucose metabolism', 'Metabolic health'],
    potentialInterventions: [
      {
        name: 'Intranasal insulin',
        type: 'generic',
        cost: 'low',
        status: 'Phase 2/3 trials; ~$100/year for insulin',
      },
      {
        name: 'Metformin',
        type: 'generic',
        cost: 'low',
        status: 'Observational benefit; ~$50/year',
      },
      {
        name: 'GLP-1 agonists (semaglutide)',
        type: 'patented',
        cost: 'high',
        status: 'Trials ongoing; >$10,000/year',
      },
      {
        name: 'Dietary interventions (ketogenic)',
        type: 'lifestyle',
        cost: 'low',
        status: 'Bypasses insulin resistance; no patent',
      },
    ],
    status: 'marginalized',
    sourceIds: ['delamonte-2005'],
  },

  {
    id: 'mitochondrial',
    name: 'Mitochondrial Cascade Hypothesis',
    shortName: 'Mitochondrial',
    coreClaim: 'Mitochondrial dysfunction triggers amyloid accumulation, not vice versa.',
    detailedClaim:
      'The mitochondrial cascade hypothesis proposes that inherited and acquired mitochondrial dysfunction drives the sporadic AD that accounts for over 95% of cases. As mitochondria fail with age, neurons lose energy capacity, and this bioenergetic failure triggers amyloid accumulation as a downstream consequence.',
    yearProposed: 2004,
    cascadeStage: 4,
    stageName: 'Convergence',
    proponents: [
      {
        name: 'Russell Swerdlow',
        institution: 'University of Kansas',
        contribution: 'Proposed mitochondrial cascade; maternal inheritance research',
        keyYear: 2004,
      },
      {
        name: 'Shaharyar Khan',
        institution: 'University of Kansas',
        contribution: 'Co-developed mitochondrial hypothesis',
        keyYear: 2004,
      },
    ],
    keyEvidence: [
      'Mitochondrial dysfunction precedes amyloid in sporadic AD',
      'AD has strong maternal inheritance pattern (mtDNA is maternally inherited)',
      'Electron transport chain defects found early in AD',
      'Amyloid hypothesis only explains rare familial cases (<5%)',
    ],
    interventionTargets: ['Mitochondrial function', 'Oxidative stress', 'Bioenergetics'],
    potentialInterventions: [
      {
        name: 'CoQ10',
        type: 'generic',
        cost: 'low',
        status: 'Supplement; no strong trial data; ~$20/month',
      },
      {
        name: 'Methylene blue',
        type: 'generic',
        cost: 'low',
        status: 'Enhances mitochondrial function; trials inconclusive',
      },
      {
        name: 'Exercise',
        type: 'lifestyle',
        cost: 'low',
        status: 'Improves mitochondrial biogenesis; no patent',
      },
    ],
    status: 'marginalized',
    sourceIds: ['swerdlow-khan-2004'],
  },

  {
    id: 'lysosomal',
    name: 'Lysosomal/PANTHOS Hypothesis',
    shortName: 'Lysosomal',
    coreClaim: 'Plaques form inside neurons from lysosomal failure, then are released when cells die.',
    detailedClaim:
      'The lysosomal hypothesis, supported by the PANTHOS discovery, proposes that amyloid plaques form inside neurons due to lysosomal acidification failure. When lysosomes cannot properly degrade proteins, amyloid accumulates intracellularly in "flower-like" patterns. When these neurons die, the internal amyloid is released as extracellular plaques.',
    yearProposed: 2022,
    cascadeStage: 4,
    stageName: 'Convergence',
    proponents: [
      {
        name: 'Ralph Nixon',
        institution: 'NYU / Nathan Kline Institute',
        contribution: 'PANTHOS discovery; lysosomal acidification research',
        keyYear: 2022,
      },
      {
        name: 'Ju-Hyun Lee',
        institution: 'NYU / Nathan Kline Institute',
        contribution: 'Lead author on PANTHOS paper',
        keyYear: 2022,
      },
    ],
    keyEvidence: [
      'Lysosomal acidification fails before plaques appear',
      'PANTHOS neurons contain intracellular amyloid in "flower" pattern',
      'All plaques in mouse models originated from PANTHOS neuron death',
      'Presenilin mutations (familial AD) directly impair lysosomal function',
    ],
    interventionTargets: ['Lysosomal acidification', 'Autophagy', 'Protein clearance'],
    potentialInterventions: [
      {
        name: 'Acidifying agents',
        type: 'generic',
        cost: 'low',
        status: 'Research stage',
      },
      {
        name: 'Autophagy enhancers (rapamycin)',
        type: 'generic',
        cost: 'low',
        status: 'Research stage; safety concerns',
      },
    ],
    status: 'emerging',
    sourceIds: ['nixon-2022'],
  },

  {
    id: 'myelin',
    name: 'Myelin/Oligodendrocyte Hypothesis',
    shortName: 'Myelin',
    coreClaim: 'Age-related myelin deterioration drives amyloid deposition.',
    detailedClaim:
      'The myelin hypothesis proposes that age-dependent degeneration of myelin sheaths drives amyloid plaque formation. Damaged myelin causes accumulation of amyloid-producing machinery in axons AND distracts microglia from clearing plaques. Myelin dysfunction is upstream of amyloid.',
    yearProposed: 2023,
    cascadeStage: 5,
    stageName: 'Upstream',
    proponents: [
      {
        name: 'Klaus-Armin Nave',
        institution: 'Max Planck Institute, Göttingen',
        contribution: 'Nature paper showing myelin drives amyloid',
        keyYear: 2023,
      },
      {
        name: 'Constanze Depp',
        institution: 'Max Planck Institute, Göttingen',
        contribution: 'Lead author on myelin-amyloid paper',
        keyYear: 2023,
      },
    ],
    keyEvidence: [
      'Myelin dysfunction precedes amyloid in aging',
      'Genetic myelin mutations increase amyloid deposition',
      'Demyelinating injuries drive plaque formation in mouse models',
      'Microglia preferentially clear myelin debris over amyloid plaques',
    ],
    interventionTargets: ['Oligodendrocyte health', 'Myelin repair', 'Remyelination'],
    potentialInterventions: [
      {
        name: 'Remyelination therapies',
        type: 'patented',
        cost: 'high',
        status: 'Research stage; being developed for MS',
      },
      {
        name: 'Cholesterol optimization',
        type: 'generic',
        cost: 'low',
        status: 'Myelin requires cholesterol; research stage',
      },
    ],
    status: 'emerging',
    sourceIds: ['depp-nave-2023'],
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

// Get framework by ID
export function getFramework(id: string): ResearchFramework | undefined {
  return frameworks.find(f => f.id === id);
}

// Get frameworks by status
export function getFrameworksByStatus(status: FrameworkStatus): ResearchFramework[] {
  return frameworks.filter(f => f.status === status);
}

// Get sidelined frameworks (marginalized + emerging)
export function getSidelinedFrameworks(): ResearchFramework[] {
  return frameworks.filter(f => f.status === 'marginalized' || f.status === 'emerging');
}

// Get frameworks by cascade stage
export function getFrameworksByStage(stage: number): ResearchFramework[] {
  return frameworks.filter(f => {
    if (Array.isArray(f.cascadeStage)) {
      return f.cascadeStage.includes(stage);
    }
    return f.cascadeStage === stage;
  });
}

// Get all proponents across frameworks
export function getAllProponents(): Array<FrameworkProponent & { frameworkId: string }> {
  const proponents: Array<FrameworkProponent & { frameworkId: string }> = [];
  for (const framework of frameworks) {
    for (const proponent of framework.proponents) {
      proponents.push({ ...proponent, frameworkId: framework.id });
    }
  }
  return proponents.sort((a, b) => a.keyYear - b.keyYear);
}

// Get cheap interventions (could be funded but aren't)
export function getCheapInterventions(): Array<FrameworkIntervention & { frameworkId: string; frameworkName: string }> {
  const interventions: Array<FrameworkIntervention & { frameworkId: string; frameworkName: string }> = [];
  for (const framework of frameworks) {
    for (const intervention of framework.potentialInterventions) {
      if (intervention.cost === 'low' && intervention.type !== 'patented') {
        interventions.push({
          ...intervention,
          frameworkId: framework.id,
          frameworkName: framework.name,
        });
      }
    }
  }
  return interventions;
}

// Compare dominant vs marginalized funding
export interface FundingComparison {
  dominant: {
    name: string;
    trialFailureRate: string;
    typicalDrugCost: string;
    fundingShare: string;
  };
  marginalized: {
    count: number;
    potentialInterventions: number;
    averageCost: string;
    fundingShare: string;
  };
}

export function getFundingComparison(): FundingComparison {
  const sidelined = getSidelinedFrameworks();
  const cheapInterventions = getCheapInterventions();

  return {
    dominant: {
      name: 'Amyloid Cascade Hypothesis',
      trialFailureRate: '99.6%',
      typicalDrugCost: '$26,500–$32,000/year',
      fundingShare: '~50% of NIH AD funding',
    },
    marginalized: {
      count: sidelined.length,
      potentialInterventions: cheapInterventions.length,
      averageCost: '<$500/year for most interventions',
      fundingShare: '<10% combined',
    },
  };
}
