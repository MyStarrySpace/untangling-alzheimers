import type { Drug, ComparisonRow } from '@/types';

export const patentedDrugs: Drug[] = [
  {
    id: 'lecanemab',
    name: 'Lecanemab (Leqembi)',
    type: 'patented',
    investment: 50000, // $50+ billion total in amyloid research
    annualCost: 26500,
    fdaStatus: 'approved',
    evidenceStrength: 2,
    outcome: '27% slowing of cognitive decline',
    mechanism: 'Anti-amyloid antibody',
    keyStudyYear: 2023,
    keyEvidence: 'Phase 3 trial showed 27% slowing vs placebo',
  },
  {
    id: 'donanemab',
    name: 'Donanemab (Kisunla)',
    type: 'patented',
    investment: 3000,
    annualCost: 32000,
    fdaStatus: 'approved',
    evidenceStrength: 2,
    outcome: '35% slowing of cognitive decline',
    mechanism: 'Anti-amyloid antibody',
    keyStudyYear: 2024,
    keyEvidence: 'Phase 3 trial showed 35% slowing vs placebo',
  },
  {
    id: 'aduhelm',
    name: 'Aducanumab (Aduhelm)',
    type: 'patented',
    investment: 2000,
    annualCost: 28200,
    fdaStatus: 'approved',
    evidenceStrength: 1,
    outcome: 'Controversial approval, withdrawn from market',
    mechanism: 'Anti-amyloid antibody',
    keyStudyYear: 2021,
    keyEvidence: 'Accelerated approval despite mixed trial results',
  },
];

export const genericDrugs: Drug[] = [
  {
    id: 'lithium-orotate',
    name: 'Lithium Orotate',
    type: 'supplement',
    investment: 5, // Minimal research funding
    annualCost: 120, // ~$10/month
    fdaStatus: 'no-pathway',
    evidenceStrength: 4,
    outcome: 'Reversed memory loss in AD mice at 1/1000th bipolar dose',
    mechanism: 'GSK-3β inhibition, BDNF upregulation',
    keyStudyYear: 2025,
    keyEvidence: 'Nature 2025: Complete reversal of memory deficits without toxicity',
  },
  {
    id: 'tnf-inhibitors',
    name: 'TNF Inhibitors (Etanercept, Adalimumab)',
    type: 'biosimilar',
    investment: 10,
    annualCost: 3000, // Biosimilar pricing
    fdaStatus: 'no-pathway',
    evidenceStrength: 5,
    outcome: '50-70% reduction in AD incidence',
    mechanism: 'TNF-α inhibition prevents lysosomal dysfunction',
    keyStudyYear: 2022,
    keyEvidence: 'Multiple cohort studies in RA/psoriasis patients',
  },
  {
    id: 'nebivolol',
    name: 'Nebivolol',
    type: 'generic',
    investment: 2,
    annualCost: 48, // ~$4/month
    fdaStatus: 'no-pathway',
    evidenceStrength: 3,
    outcome: 'Reduced amyloid pathology, brain-bioavailable',
    mechanism: 'SIRT1 activation, NO release, superior to metoprolol',
    keyStudyYear: 2013,
    keyEvidence: 'J Alzheimers Dis 2013: Reduced amyloid in mice',
  },
  {
    id: 'metformin',
    name: 'Metformin',
    type: 'generic',
    investment: 15,
    annualCost: 48,
    fdaStatus: 'no-pathway',
    evidenceStrength: 3,
    outcome: 'Anti-aging mechanism, SIRT1 activation',
    mechanism: 'AMPK activation, anti-inflammatory',
    keyStudyYear: 2024,
    keyEvidence: 'TAME trial ongoing with philanthropic funding only',
  },
  {
    id: 'gv-971',
    name: 'GV-971 (Oligomannate)',
    type: 'generic',
    investment: 50,
    annualCost: 2400,
    fdaStatus: 'pending',
    evidenceStrength: 3,
    outcome: 'Approved in China, gut-brain mechanism',
    mechanism: 'Gut microbiome remodeling, reduces neuroinflammation',
    keyStudyYear: 2019,
    keyEvidence: 'Cell Research 2019, US Phase 3 terminated 2022 (funding)',
  },
];

export const allDrugs: Drug[] = [...patentedDrugs, ...genericDrugs];

export const comparisonData: ComparisonRow[] = [
  {
    category: 'Investment',
    patented: '$50+ billion',
    generic: '~$50 million',
    delta: '1000:1',
  },
  {
    category: 'Example Drugs',
    patented: 'Lecanemab, Donanemab, Aduhelm',
    generic: 'Lithium orotate, TNF inhibitors, Nebivolol, Metformin',
  },
  {
    category: 'Best Outcome',
    patented: '27-35% slowing of decline',
    generic: '50-70% prevention (TNFi); Reversed memory loss (lithium)',
    delta: 'Generics outperform',
  },
  {
    category: 'Annual Cost',
    patented: '$26,500 (lecanemab)',
    generic: '$4-180/year',
    delta: '100-1000x cheaper',
  },
  {
    category: 'FDA Status',
    patented: 'APPROVED',
    generic: '"Needs more research"',
  },
];

export const investmentData = {
  patented: {
    total: 50000000000, // $50 billion
    label: 'Patented Drugs',
    examples: ['Lecanemab', 'Donanemab', 'Aduhelm'],
  },
  generic: {
    total: 50000000, // $50 million
    label: 'Generic/Supplements',
    examples: ['Lithium', 'TNF inhibitors', 'Metformin'],
  },
  ratio: 1000,
};
