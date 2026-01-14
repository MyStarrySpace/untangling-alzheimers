import type { CaseStudy, TimelineEvent } from '@/types';

export const caseStudies: CaseStudy[] = [
  {
    id: 'lithium-orotate',
    title: 'The Lithium Orotate Story',
    drug: 'Lithium Orotate',
    year: 2025,
    keyFinding:
      'Completely reversed memory loss in Alzheimer\'s mice at 1/1000th the dose used for bipolar disorder, without kidney or thyroid toxicity.',
    whatShouldHappen: 'Large prevention trial to confirm human dosing',
    whatActuallyHappened:
      'Available now as supplement (~$10/month); clinical trial "planning to begin soon"',
    quote:
      'We are planning a clinical trial that will hopefully begin in the near future.',
    quoteSource: 'Lead author, Harvard team',
    cost: '$10/month supplement',
    patentStatus: 'supplement',
  },
  {
    id: 'gv-971',
    title: 'The GV-971 Collapse',
    drug: 'GV-971 (Sodium Oligomannate)',
    year: 2022,
    keyFinding:
      'Novel gut-brain mechanism, approved in China in 2019, showed cognitive improvement in Phase 3.',
    whatShouldHappen: 'Global Phase 3 confirmation',
    whatActuallyHappened:
      'US trial terminated May 2022—not for safety or efficacy concerns, but because they couldn\'t raise additional funds',
    quote:
      'The company cited "the global geopolitical situation" and a "gloomy biotech capital market."',
    quoteSource: 'Green Valley Pharmaceuticals',
    cost: '$200/month',
    patentStatus: 'generic',
  },
  {
    id: 'tnf-inhibitors',
    title: 'The TNF Inhibitor Paradox',
    drug: 'TNF Inhibitors (Etanercept, Adalimumab)',
    year: 2022,
    keyFinding:
      'Patients taking TNF inhibitors for rheumatoid arthritis or psoriasis have 50-70% lower rates of Alzheimer\'s disease. This is among the strongest preventive signals in the entire AD literature.',
    whatShouldHappen: 'Prevention trial in high-risk groups',
    whatActuallyHappened:
      'Zero prevention trials initiated. TNF inhibitors are now biosimilar (off-patent). A prevention trial would cost $50-100 million with no possibility of profit.',
    cost: '$250/month (biosimilar)',
    patentStatus: 'biosimilar',
  },
  {
    id: 'nebivolol',
    title: 'The Nebivolol Silence',
    drug: 'Nebivolol',
    year: 2013,
    keyFinding:
      'Reduced amyloid pathology in mice, brain-bioavailable, superior to metoprolol for SIRT1 pathway activation.',
    whatShouldHappen: 'Head-to-head cognitive trial vs metoprolol',
    whatActuallyHappened:
      'Nothing for 12+ years. Meanwhile, metoprolol (which may worsen dementia via NADPH oxidase) remains widely prescribed.',
    cost: '$4/month',
    patentStatus: 'generic',
  },
  {
    id: 'lesne-scandal',
    title: 'The Lesne Scandal',
    drug: 'Amyloid Oligomer (Aβ*56)',
    year: 2024,
    keyFinding:
      'In 2006, a Nature paper claimed Aβ*56 was THE causative agent of AD memory loss. It became the 5th most-cited AD paper with 2,300+ citations. NIH funding for amyloid oligomer research rose from near zero to $287 million annually.',
    whatShouldHappen: 'Rigorous replication before field-wide adoption',
    whatActuallyHappened:
      'In 2022, Science exposed evidence of image fabrication. In 2024, Nature retracted the paper. The lead author resigned after receiving $7M+ in NIH funding. Alternative hypotheses were starved of funding for 18 years.',
    quote:
      'Even researchers who couldn\'t replicate Aβ*56 couldn\'t publish negative results. The amyloid hypothesis had become unfalsifiable.',
    quoteSource: 'Science investigation, 2022',
    cost: '$287M/year misdirected',
    patentStatus: 'patented',
  },
];

export const evidenceGraveyardData = [
  {
    id: 'tnf-inhibitors',
    drug: 'TNF Inhibitors',
    evidence: '50-70% reduction in AD incidence in RA/psoriasis patients',
    year: 2022,
    source: 'Multiple cohort studies',
    shouldHappen: 'Prevention trial in high-risk groups',
    actuallyHappened: 'Zero trials initiated',
    whyNotFunded: 'Off-patent biologics with no commercial sponsor. Prevention trials require large cohorts over many years—pharma won\'t fund trials for drugs they can\'t sell exclusively.',
  },
  {
    id: 'nebivolol',
    drug: 'Nebivolol',
    evidence: 'Reduced amyloid pathology, brain-bioavailable, superior SIRT1 activation',
    year: 2013,
    source: 'J Alzheimers Dis',
    shouldHappen: 'Head-to-head cognitive trial vs metoprolol',
    actuallyHappened: 'Nothing for 12+ years',
    whyNotFunded: 'Generic beta-blocker ($4/month). No company can recoup trial costs. NIH prioritizes novel mechanisms over repurposed generics.',
  },
  {
    id: 'gv-971',
    drug: 'GV-971 (Oligomannate)',
    evidence: 'Gut-brain mechanism, approved in China, showed cognitive improvement',
    year: 2019,
    source: 'Cell Research',
    shouldHappen: 'Global Phase 3 confirmation',
    actuallyHappened: 'US trial terminated 2022 (funding)',
    whyNotFunded: 'Small Chinese biotech couldn\'t raise Western capital amid geopolitical tensions and biotech market crash. Not because the science failed.',
  },
  {
    id: 'metformin',
    drug: 'Metformin',
    evidence: 'Activates SIRT1, anti-inflammatory, anti-aging mechanisms',
    year: 2024,
    source: 'Ongoing research',
    shouldHappen: 'Large prevention trial',
    actuallyHappened: 'TAME trial struggling (philanthropic funding only)',
    whyNotFunded: 'Costs $4/month generic. The TAME aging trial has been trying to launch for years, relying entirely on philanthropy because no company will fund a trial for a drug anyone can make.',
  },
];

export const timeline: TimelineEvent[] = [
  {
    year: 2013,
    title: 'Nebivolol Study Published',
    description: 'Shows reduced amyloid pathology in mice. No follow-up trials funded.',
    type: 'discovery',
    drug: 'Nebivolol',
  },
  {
    year: 2019,
    title: 'GV-971 Approved in China',
    description: 'Novel gut-brain mechanism shows promise. Global trial planned.',
    type: 'approval',
    drug: 'GV-971',
  },
  {
    year: 2020,
    title: 'TNF Inhibitor Data Published',
    description: '50-70% AD risk reduction in RA patients documented.',
    type: 'discovery',
    drug: 'TNF Inhibitors',
  },
  {
    year: 2021,
    title: 'Aduhelm Controversy',
    description: 'FDA approves despite mixed evidence. $56,000/year initial price.',
    type: 'approval',
    drug: 'Aduhelm',
  },
  {
    year: 2022,
    title: 'GV-971 Trial Terminated',
    description: 'US Phase 3 ends due to funding issues, not efficacy concerns.',
    type: 'failure',
    drug: 'GV-971',
  },
  {
    year: 2023,
    title: 'Lecanemab Approved',
    description: '27% slowing of decline. $26,500/year. ARIA risks.',
    type: 'approval',
    drug: 'Lecanemab',
  },
  {
    year: 2024,
    title: 'Donanemab Approved',
    description: '35% slowing of decline. Similar cost and risk profile.',
    type: 'approval',
    drug: 'Donanemab',
  },
  {
    year: 2025,
    title: 'Lithium Orotate Nature Paper',
    description: 'Harvard team shows memory reversal at 1/1000th dose. $10/month.',
    type: 'discovery',
    drug: 'Lithium Orotate',
  },
];

export const keyStatistics = {
  globalPatients: 55000000,
  projectedBy2050: 165000000,
  trialFailureRate: 99,
  approvedTreatments: 7,
  investmentRatio: 1000,
  patentedInvestment: 50000000000,
  genericInvestment: 50000000,
};
