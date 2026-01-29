import type { CaseStudy, TimelineEvent } from '@/types';

export const caseStudies: CaseStudy[] = [
  {
    id: 'gv-971',
    title: 'The GV-971 Collapse',
    drug: 'GV-971 (Sodium Oligomannate)',
    summary: 'China-approved drug abandoned due to funding, not science.',
    year: 2022,
    keyFinding:
      'Novel gut-brain mechanism, approved in China in 2019, showed cognitive improvement in Phase 3. 439 patients enrolled in global trial before termination.',
    whatShouldHappen: 'Global Phase 3 confirmation to validate gut-brain axis approach',
    whatActuallyHappened:
      'US trial terminated May 2022 after screening 1,308 patients. Company cited "global geopolitical situation" and funding collapse, NOT safety or efficacy concerns. Drug remains unavailable outside China.',
    quote:
      'The company cited "the global geopolitical situation" and a "gloomy biotech capital market."',
    quoteSource: 'Green Valley Pharmaceuticals',
    cost: '$200/month (China only)',
    patentStatus: 'unavailable',
  },
  {
    id: 'tnf-inhibitors',
    title: 'The TNF Inhibitor Gap',
    drug: 'Etanercept (Enbrel)',
    summary: '60-70% lower AD risk observed, but only one tiny trial ever run.',
    year: 2016,
    keyFinding:
      'Three large epidemiological studies found TNF inhibitor users had 60-70% lower odds of developing AD. Neuroinflammation is now recognized as a key disease driver.',
    whatShouldHappen: 'Large Phase 3 trial testing etanercept or newer TNF inhibitors for AD prevention',
    whatActuallyHappened:
      'Only one small Phase 2 trial ever conducted (41 patients, 24 weeks). Failed to show benefit with standard dosing. Perispinal administration showed rapid improvement but was never validated in RCTs. The drug is generic for arthritis but no company will fund AD trials.',
    quote:
      'The current study should not be seen to support the use of unlicensed subcutaneous etanercept for the treatment of AD dementia.',
    quoteSource: 'Phase 2 trial conclusion, 2015',
    cost: '$7,000-9,500/month (for arthritis; Medicare-negotiated: $2,355 starting 2026)',
    patentStatus: 'generic',
  },
  {
    id: '40hz-gamma',
    title: 'The 40Hz Light Therapy Wait',
    drug: '40Hz Gamma Entrainment (GENUS)',
    summary: 'A decade of MIT research stuck in trials: too cheap to fund.',
    year: 2025,
    keyFinding:
      'A decade of MIT research: 40Hz light/sound activates microglia, clears amyloid, reduces brain atrophy, improves memory in mice and early human trials. Cost: LED lights and speakers.',
    whatShouldHappen: 'Fast-track trials given low cost and safety profile',
    whatActuallyHappened:
      'Still in Phase 3 after 10+ years of promising preclinical data. Only 15 patients in Phase 2a. No accelerated pathway. If it works, the intervention could potentially cost under $100 (LED lights and speakers are inexpensive). That means no blockbuster revenue to fund trials.',
    quote:
      'Safe; late-onset AD patients showed better cognitive scores than matched controls.',
    quoteSource: 'MIT long-term pilot study',
    cost: 'Potentially low-cost (LED/audio equipment)',
    patentStatus: 'device',
  },
  {
    id: 'focused-ultrasound',
    title: 'The Blood-Brain Barrier Breakthrough',
    drug: 'Focused Ultrasound (FUS)',
    summary: 'Could make AD drugs 5-8x more effective, yet draws no pharma interest.',
    year: 2024,
    keyFinding:
      'Non-invasively opens the BBB to enhance drug delivery 5-8x. In Phase 2a, reduced amyloid WITHOUT any drug co-administration. Could make existing treatments far more effective.',
    whatShouldHappen: 'Rapid combination trials with approved antibodies, standalone studies',
    whatActuallyHappened:
      'FDA Breakthrough Device designation for related brain applications (BBB disruption for brain tumors), but AD-specific trials remain slow. Only ~30 patients in Phase 2a. Could transform efficacy of lecanemab/donanemab but no pharma company is racing to prove their expensive drugs work better at lower doses.',
    quote:
      'FUS enhanced antibody delivery to targeted brain regions by 5-8x.',
    quoteSource: 'FUS + Aducanumab combination trial',
    cost: 'High (specialized equipment)',
    patentStatus: 'device',
  },
  {
    id: 'lesne-scandal',
    title: 'The Lesne Scandal',
    drug: 'Amyloid Oligomer (Aβ*56)',
    summary: 'Fabricated paper directed $287M/year for 18 years.',
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
  {
    id: 'zlokovic-scandal',
    title: 'The Zlokovic Scandal',
    drug: 'Pericyte-BBB Research',
    summary: 'Star neuroscientist\'s pericyte data questioned across 35 papers, $30M trial halted.',
    year: 2024,
    keyFinding:
      'Berislav Zlokovic (USC) built the dominant model of pericyte loss driving BBB breakdown in AD. His lab\'s papers accumulated 8,400+ citations and influenced 49 patents. His work shaped how we think about vascular contributions to neurodegeneration.',
    whatShouldHappen: 'Independent replication of key pericyte-BBB-AD claims before building clinical programs on them',
    whatActuallyHappened:
      'A 113-page whistleblower dossier identified image manipulation in 35 papers. Four lab members described a culture of data pressure. NIH halted a $30M stroke trial (3K3A-APC) and demanded $1.9M returned. Journals issued 4 retractions, 9 corrections, and 2 expressions of concern. Zlokovic went on indefinite leave from USC in October 2024.',
    quote:
      'Four former members of Zlokovic\'s lab said the anomalies were no accident. They described a culture of intimidation in which he regularly pushed them to adjust data.',
    quoteSource: 'Science investigation, November 2023',
    cost: '$30M trial halted, $1.9M returned to NIH',
    patentStatus: 'patented',
  },
  {
    id: 'butylphthalide',
    title: 'The Phthalide Gap',
    drug: 'Butylphthalide (NBP)',
    summary: 'Positive Phase 3 for AD in China. FDA orphan status for ALS, yet no Western AD trials.',
    year: 2024,
    keyFinding:
      'A multi-target neuroprotectant derived from celery seeds, approved in China since 2002 for stroke. The EBMCI trial (2024) showed significant cognitive improvement in MCI due to AD. Reduces Aβ/tau, inhibits NLRP3 inflammasome, protects mitochondria, and improves microcirculation. Has 20+ years of human safety data.',
    whatShouldHappen: 'Western replication of the positive EBMCI trial; Phase 3 AD prevention study; inclusion in combination therapy trials with approved anti-amyloid antibodies',
    whatActuallyHappened:
      'FDA granted orphan drug designation for ALS (2018), not AD. A US Phase 3 trial is underway for stroke, not AD. The positive EBMCI results for MCI due to AD have no Western replication pathway. The drug is being developed where orphan economics work (rare ALS) rather than where the evidence points (common AD).',
    quote:
      'NBP was associated with lower odds of deterioration (OR=0.19) and cognitive decline (OR=0.10) in AD patients. Yet Western development focuses on stroke and ALS, not the disease where it shows the strongest signal.',
    quoteSource: 'EBMCI trial and cohort studies, 2021-2024',
    cost: '<$100/month (generic in China)',
    patentStatus: 'generic',
  },
];

export const evidenceGraveyardData = [
  {
    id: 'nebivolol',
    drug: 'Nebivolol',
    evidence: 'Reduced amyloid pathology, brain-bioavailable, superior SIRT1 activation',
    year: 2013,
    source: 'J Alzheimers Dis',
    shouldHappen: 'Head-to-head cognitive trial vs metoprolol',
    actuallyHappened: 'Nothing for 12+ years',
    whyNotFunded: 'Benefits are likely preventive, vascular, and slow, but AD trial designs favor symptomatic treatments with rapid, measurable cognitive changes. A drug that works over decades doesn\'t fit the 18-month trial paradigm, so nebivolol was never seriously evaluated against the right criteria.',
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
  investmentRatio: 850, // $42.5B / ~$50M
  patentedInvestment: 42500000000, // $42.5 billion (Cummings 2022)
  genericInvestment: 50000000, // ~$50 million (estimate)
};
