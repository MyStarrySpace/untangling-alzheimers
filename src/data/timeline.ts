// Historical Timeline for Alzheimer's Research
// Tracks the evolution of hypotheses, key discoveries, and the sidelining of alternatives

export type TimelineEventType =
  | 'discovery' // Scientific breakthroughs
  | 'hypothesis' // New theoretical frameworks proposed
  | 'milestone' // Key confirmatory findings
  | 'failure' // Clinical trial failures, drug withdrawals
  | 'scandal' // Fraud, misconduct
  | 'approval' // Regulatory approvals
  | 'rejection'; // Regulatory rejections

export type FrameworkId =
  | 'amyloid'
  | 'cholinergic'
  | 'tau'
  | 'vascular'
  | 'metabolic'
  | 'mitochondrial'
  | 'lysosomal'
  | 'infection'
  | 'neuroinflammation'
  | 'myelin'
  | null; // For events not tied to a specific framework

export interface TimelineResearcher {
  name: string;
  institution: string;
  hypothesis: string;
}

export interface TimelineEvent {
  id: string;
  year: number;
  month?: number; // 1-12
  day?: number;
  title: string;
  shortTitle: string; // For compact timeline views
  description: string;
  expandedDescription?: string; // Additional context and details shown when expanded
  type: TimelineEventType;
  framework: FrameworkId;
  significance: 'major' | 'supporting';
  sourceIds: string[]; // References to bibliography.ts
  citationIds?: string[]; // Specific citation IDs for quoted text
  researcher?: TimelineResearcher; // Key researcher associated with this event
}

export const timelineEvents: TimelineEvent[] = [
  // ============================================
  // THE ORIGIN (1900s)
  // ============================================
  {
    id: 'alzheimer-discovers',
    year: 1906,
    month: 11,
    day: 3,
    title: 'Alois Alzheimer presents the first case',
    shortTitle: 'First AD case',
    description:
      'At a psychiatry conference in Tübingen, Alois Alzheimer describes "a peculiar disease of the cortex" based on his patient Auguste Deter, a 51-year-old woman who had suffered progressive memory loss, confusion, and paranoia.',
    expandedDescription:
      'Auguste Deter was admitted to the Frankfurt asylum in 1901 at age 51 with symptoms including memory loss, disorientation, and paranoid delusions. When asked to write her name, she could only manage "Mrs." before stopping, saying "I have lost myself." After her death in 1906, Alzheimer used newly developed silver staining techniques to examine her brain, finding two distinctive abnormalities: extracellular plaques (later identified as Aβ) and intracellular tangles (later identified as tau). His presentation received no questions—the audience was waiting for the next talk. The original case file was lost for decades until rediscovered in 1995.',
    type: 'discovery',
    framework: null,
    significance: 'major',
    sourceIds: ['alzheimer-1906', 'maurer-alzheimer-biography-2003'],
    citationIds: ['alzheimer-1906-presentation', 'alzheimer-1906-pathology', 'maurer-2003-reception', 'maurer-2003-chairman'],
  },

  // ============================================
  // THE CHOLINERGIC ERA (1970s-1980s)
  // ============================================
  {
    id: 'cholinergic-hypothesis',
    year: 1976,
    title: 'The cholinergic hypothesis: first biochemical theory of AD',
    shortTitle: 'Cholinergic hypothesis',
    description:
      'Peter Davies and A.J.F. Maloney discover severe depletion of acetylcholine (ACh) in AD brains—the first biochemical abnormality linked to the disease.',
    expandedDescription:
      'Acetylcholine is a neurotransmitter critical for memory and learning. Davies found that the enzyme choline acetyltransferase (ChAT), which synthesizes ACh, was reduced by 60-90% in AD patients\' cortex and hippocampus. This reduction correlated with cognitive impairment severity. The finding established that AD had a specific biochemical signature and suggested a treatment strategy: boost ACh levels. This led directly to cholinesterase inhibitors, which remain the most commonly prescribed AD medications today.',
    type: 'discovery',
    framework: 'cholinergic',
    significance: 'major',
    sourceIds: ['davies-maloney-1976'],
    citationIds: ['davies-1976-deficit', 'davies-1976-correlation'],
    researcher: {
      name: 'Peter Davies',
      institution: 'University of Edinburgh',
      hypothesis: 'Cholinergic Hypothesis',
    },
  },
  {
    id: 'first-cholinesterase-inhibitor',
    year: 1993,
    title: 'Tacrine becomes first FDA-approved AD drug',
    shortTitle: 'First AD drug',
    description:
      'Tacrine (Cognex), a cholinesterase inhibitor that boosts acetylcholine, becomes the first drug approved for AD. It provides modest but real cognitive benefits.',
    expandedDescription:
      'Tacrine works by blocking acetylcholinesterase (AChE), the enzyme that breaks down acetylcholine, thereby increasing ACh levels in the brain. Clinical trials showed a 2.4-point improvement on the ADAS-cog scale (a 70-point scale). While modest, this was the first evidence that AD symptoms could be pharmacologically treated. Tacrine was later replaced by better-tolerated drugs: donepezil (Aricept, 1996), rivastigmine (Exelon, 2000), and galantamine (Razadyne, 2001). These cholinesterase inhibitors remain standard of care, though they only treat symptoms and don\'t slow disease progression.',
    type: 'approval',
    framework: 'cholinergic',
    significance: 'major',
    sourceIds: ['tacrine-approval-1993'],
    citationIds: ['tacrine-1993-approval', 'tacrine-1993-efficacy'],
  },

  // ============================================
  // THE MOLECULAR ERA (1980s)
  // ============================================
  {
    id: 'glenner-isolates-abeta',
    year: 1984,
    title: 'Glenner & Wong isolate amyloid-beta (Aβ)',
    shortTitle: 'Aβ isolated',
    description:
      'George Glenner and Caine Wong purify and sequence the amyloid-beta (Aβ) protein from AD brain plaques, revealing the molecular identity of the "clumps" Alzheimer saw 80 years earlier.',
    expandedDescription:
      'Working at UC San Diego, Glenner and Wong extracted protein from cerebrovascular amyloid deposits in AD and Down syndrome brains. They identified a 4-kilodalton peptide (now called Aβ) with a unique amino acid sequence. Crucially, they noted the same protein in Down syndrome patients, who have an extra copy of chromosome 21—leading them to predict the gene encoding Aβ would be on chromosome 21. This prediction was confirmed in 1987 when APP (amyloid precursor protein) was mapped to chromosome 21.',
    type: 'discovery',
    framework: 'amyloid',
    significance: 'major',
    sourceIds: ['glenner-wong-1984'],
    citationIds: ['glenner-1984-isolation', 'glenner-1984-chromosome21'],
  },

  // ============================================
  // THE HYPOTHESIS TAKES HOLD (1990s)
  // ============================================
  {
    id: 'goate-app-mutation',
    year: 1991,
    title: 'First genetic mutation linked to familial AD',
    shortTitle: 'APP mutation',
    description:
      'Alison Goate discovers that mutations in the amyloid precursor protein (APP) gene on chromosome 21 cause early-onset familial Alzheimer\'s disease.',
    expandedDescription:
      'Goate\'s team at St. Mary\'s Hospital in London studied families with autosomal dominant AD—a rare inherited form where affected individuals develop symptoms in their 40s-50s. They found a missense mutation (Val717Ile) in the APP gene that segregated perfectly with disease. This genetic evidence was powerful: if mutations in the amyloid-producing gene cause AD, then amyloid must be causally involved. However, these familial mutations account for less than 1% of all AD cases; the relevance to sporadic (non-inherited) AD remained an assumption.',
    type: 'milestone',
    framework: 'amyloid',
    significance: 'major',
    sourceIds: ['goate-1991'],
    citationIds: ['goate-1991-mutation', 'goate-1991-familial'],
  },

  {
    id: 'hardy-amyloid-cascade',
    year: 1992,
    month: 4,
    day: 10,
    title: 'Hardy & Higgins publish the Amyloid Cascade Hypothesis',
    shortTitle: 'Amyloid hypothesis',
    description:
      'In a Science paper written in about a week, John Hardy and Gerald Higgins formally propose that Aβ deposition is "the initial pathological event" in AD, triggering all downstream pathology.',
    expandedDescription:
      'Hardy and Higgins proposed that Aβ deposition is "the causative agent" of Alzheimer\'s, triggering a cascade: amyloid plaques → tau tangles → neuronal death → dementia. The hypothesis was based on familial AD genetics (APP and presenilin mutations all increase Aβ production) and Down syndrome (an extra copy of chromosome 21, which carries APP, causes early AD). The paper was elegant and testable: if amyloid causes AD, removing it should cure the disease. This became the dominant framework for 30+ years, directing the vast majority of research funding toward amyloid-targeting therapies.',
    type: 'hypothesis',
    framework: 'amyloid',
    significance: 'major',
    sourceIds: ['hardy-higgins-1992'],
    citationIds: ['hardy-1992-hypothesis', 'hardy-1992-framework'],
  },

  {
    id: 'roses-apoe4',
    year: 1993,
    title: 'APOE4 discovered as major genetic risk factor',
    shortTitle: 'APOE4 risk gene',
    description:
      'Allen Roses and colleagues at Duke discover that the APOE4 allele dramatically increases risk for late-onset Alzheimer\'s—the first major genetic risk factor for sporadic AD.',
    expandedDescription:
      'Allen Roses used a genetic linkage approach rather than assuming amyloid involvement. His team found that the epsilon-4 allele of the APOE gene (APOE4) dramatically increases late-onset AD risk: one copy increases risk 3-4 fold; two copies increase risk 12-15 fold. About 25% of people carry at least one APOE4 allele. APOE encodes apolipoprotein E, which transports cholesterol and lipids in the brain. APOE4 is associated with poorer lipid transport, reduced amyloid clearance, greater inflammation, and impaired synaptic repair. This discovery highlighted that sporadic AD involves complex metabolic and clearance processes, not just amyloid production.',
    type: 'discovery',
    framework: null,
    significance: 'major',
    sourceIds: ['roses-apoe4-1993'],
    citationIds: ['roses-1993-risk', 'roses-1993-dose', 'roses-1993-homozygosity'],
  },

  {
    id: 'delatorre-vascular',
    year: 1993,
    title: 'de la Torre proposes the vascular hypothesis',
    shortTitle: 'Vascular hypothesis',
    description:
      'Jack de la Torre publishes research showing chronic brain hypoperfusion can initiate neurodegeneration, proposing AD as primarily a vascular disorder.',
    expandedDescription:
      'De la Torre\'s experiments demonstrated that chronic reduction in cerebral blood flow (hypoperfusion) in rats produced cognitive deficits and neurodegeneration similar to AD. He noted that many AD risk factors—hypertension, diabetes, atherosclerosis, heart disease—share vascular pathology. His hypothesis proposed that vascular dysfunction precedes and causes amyloid deposition, not vice versa. Supporting evidence includes: (1) hypoperfusion is detectable years before amyloid in PET scans, (2) treating cardiovascular risk factors reduces dementia incidence, (3) many cognitively normal elderly have significant amyloid but intact vasculature.',
    type: 'hypothesis',
    framework: 'vascular',
    significance: 'major',
    sourceIds: ['delatorre-1993'],
    citationIds: ['delatorre-1993-hypothesis', 'delatorre-1993-experiment'],
    researcher: {
      name: 'Jack de la Torre',
      institution: 'UT Austin / Banner Institute',
      hypothesis: 'Vascular Hypothesis',
    },
  },

  {
    id: 'presenilin-discovery',
    year: 1995,
    title: 'Presenilin genes discovered in familial AD',
    shortTitle: 'PSEN1/2 discovered',
    description:
      'Sherrington and colleagues discover mutations in presenilin 1 (PSEN1) on chromosome 14 cause familial AD. PSEN2 is discovered shortly after. Together with APP, these become the three known familial AD genes.',
    expandedDescription:
      'Presenilin 1 mutations account for most familial AD cases (30-70% of autosomal dominant AD). Later research revealed that presenilins form the catalytic core of gamma-secretase, the enzyme that cleaves APP to release Aβ. PSEN mutations increase the ratio of the more aggregation-prone Aβ42 to Aβ40. Together, APP, PSEN1, and PSEN2 mutations explain early-onset familial AD—but this represents only 1-5% of all AD cases. The remaining 95%+ of sporadic AD cases have no known causative mutations, raising questions about whether the amyloid mechanism applies to typical late-onset disease.',
    type: 'discovery',
    framework: 'amyloid',
    significance: 'major',
    sourceIds: ['sherrington-psen1-1995'],
    citationIds: ['sherrington-1995-psen1'],
  },

  // ============================================
  // THE ALTERNATIVES EMERGE (2000s)
  // ============================================
  {
    id: 'an1792-halted',
    year: 2002,
    month: 1,
    title: 'First Alzheimer\'s vaccine trial halted after brain inflammation',
    shortTitle: 'AN-1792 halted',
    description:
      'Elan\'s AN-1792 vaccine trial is suspended after 6% of patients develop meningoencephalitis (brain inflammation). The first attempt to translate the amyloid hypothesis into therapy ends in safety disaster.',
    expandedDescription:
      'AN-1792 was an active immunotherapy: patients were injected with synthetic Aβ42 peptide plus an adjuvant to stimulate their immune system to produce anti-amyloid antibodies. The approach worked—patients developed antibodies and showed reduced amyloid plaques at autopsy. However, 6% (18 of ~300 patients) developed meningoencephalitis, likely because the T-cell response attacked brain tissue along with amyloid. Autopsy studies of trial participants showed cleared plaques but continued tau pathology and cognitive decline, raising early questions about whether amyloid removal alone would help patients. The trial led to the development of passive immunotherapy (injecting pre-made antibodies) to avoid the T-cell response.',
    type: 'failure',
    framework: 'amyloid',
    significance: 'major',
    sourceIds: ['an1792-alzforum'],
    citationIds: ['an1792-suspension', 'an1792-rate', 'an1792-termination'],
  },

  {
    id: 'swerdlow-mitochondrial',
    year: 2004,
    title: 'Swerdlow proposes the mitochondrial cascade hypothesis',
    shortTitle: 'Mitochondrial hypothesis',
    description:
      'Russell Swerdlow argues that mitochondrial dysfunction—not amyloid—is the primary driver of sporadic AD, noting the amyloid hypothesis only explains rare familial cases.',
    expandedDescription:
      'Swerdlow observed that the amyloid cascade hypothesis was built on familial AD mutations, which cause only 1-5% of cases. For the other 95%+ of sporadic cases, he proposed that inherited variation in mitochondrial DNA and age-related mitochondrial decline are the primary drivers. His "mitochondrial cascade hypothesis" posits: aging mitochondria → reduced ATP production → impaired cellular functions → increased oxidative stress → APP processing shifts toward Aβ production. Supporting evidence includes: AD brains show reduced cytochrome oxidase activity, FDG-PET shows hypometabolism years before amyloid appears, and AD patient mitochondria transferred to healthy cells cause AD-like changes (cybrid studies).',
    type: 'hypothesis',
    framework: 'mitochondrial',
    significance: 'major',
    sourceIds: ['swerdlow-khan-2004'],
    citationIds: ['swerdlow-2004-hypothesis', 'swerdlow-2004-contrast', 'swerdlow-2004-reversal'],
    researcher: {
      name: 'Russell Swerdlow',
      institution: 'University of Kansas',
      hypothesis: 'Mitochondrial Cascade',
    },
  },

  {
    id: 'delamonte-type3',
    year: 2005,
    title: 'de la Monte coins "Type 3 Diabetes"',
    shortTitle: 'Type 3 diabetes',
    description:
      'Suzanne de la Monte discovers that brain insulin resistance precedes amyloid and proposes AD as a metabolic disease—"Type 3 Diabetes."',
    expandedDescription:
      'De la Monte\'s research showed that AD brains have dramatically reduced expression of insulin and insulin-like growth factor (IGF) receptors, along with downstream signaling defects. When she disrupted brain insulin signaling in mice, they developed AD-like pathology including tau hyperphosphorylation. Her "Type 3 Diabetes" concept proposes: brain insulin resistance → impaired glucose uptake → energy starvation → activation of GSK-3β (which phosphorylates tau) → neurodegeneration. This links AD to the diabetes epidemic and explains why type 2 diabetics have 2-4x higher AD risk. It also suggests that insulin-sensitizing drugs (metformin, intranasal insulin, GLP-1 agonists) might help.',
    type: 'hypothesis',
    framework: 'metabolic',
    significance: 'major',
    sourceIds: ['delamonte-2005'],
    citationIds: ['delamonte-2005-type3', 'delamonte-2005-discovery', 'delamonte-2005-serendipity'],
    researcher: {
      name: 'Suzanne de la Monte',
      institution: 'Brown University',
      hypothesis: 'Type 3 Diabetes',
    },
  },

  {
    id: 'lesne-abeta56',
    year: 2006,
    title: 'Lesné publishes Aβ*56 paper in Nature',
    shortTitle: 'Aβ*56 paper',
    description:
      'Sylvain Lesné reports discovering Aβ*56, a specific amyloid oligomer that allegedly impairs memory. The paper becomes one of the most influential in AD research.',
    expandedDescription:
      'Lesné reported isolating a 56-kilodalton amyloid oligomer (Aβ*56) from the brains of Tg2576 transgenic mice and showed it correlated with memory deficits. When purified Aβ*56 was injected into healthy rat brains, it impaired memory. This suggested a specific "toxic species" of amyloid was responsible for cognitive damage, not the plaques themselves. The paper was highly influential—it shifted research focus from plaques to oligomers and was cited over 2,300 times. However, in 2022, a Science investigation found evidence of image manipulation in this and other Lesné papers, casting doubt on whether Aβ*56 exists as described.',
    type: 'milestone',
    framework: 'amyloid',
    significance: 'major',
    sourceIds: ['lesne-2006'],
    citationIds: ['lesne-2006-claim', 'lesne-2006-influence'],
  },

  // ============================================
  // THE FAILURES MOUNT (2010s)
  // ============================================
  {
    id: 'bapineuzumab-fails',
    year: 2012,
    month: 8,
    day: 6,
    title: 'Bapineuzumab Phase 3 trials terminated after no clinical benefit',
    shortTitle: 'Bapineuzumab fails',
    description:
      'Pfizer and Johnson & Johnson terminate all Phase 3 trials of bapineuzumab—the first anti-amyloid antibody—after two large studies show no clinical benefit, despite biomarker evidence that the drug engaged its target.',
    expandedDescription:
      'Bapineuzumab was the first passive immunotherapy to complete Phase 3 trials. It targeted the N-terminus of Aβ and was tested in over 4,500 patients across four studies. The antibody engaged its target: PET scans showed reduced amyloid in treated patients, and cerebrospinal fluid biomarkers shifted. However, there was no significant difference in cognitive decline between drug and placebo groups. The trials also revealed amyloid-related imaging abnormalities (ARIA)—brain swelling and microbleeds—in about 10% of patients. The failure prompted debate: was the drug given too late in disease, or was the hypothesis wrong? Most researchers concluded treatment timing was the issue.',
    type: 'failure',
    framework: 'amyloid',
    significance: 'major',
    sourceIds: ['bapineuzumab-alzforum'],
    citationIds: ['bapineuzumab-termination', 'bapineuzumab-biomarkers', 'bapineuzumab-explanation'],
  },

  {
    id: 'trial-failures-mounting',
    year: 2014,
    title: 'Clinical trial failure rate reaches 99.6%',
    shortTitle: '99.6% failure',
    description:
      'Analysis reveals that 99.6% of Alzheimer\'s drug trials since 2002 have failed, with billions spent on amyloid-targeting therapies showing no clinical benefit.',
    expandedDescription:
      'A systematic analysis by Jeffrey Cummings and colleagues examined all AD drug trials from 2002-2012. Of 413 trials testing 244 compounds, only one drug (memantine) was approved—a 0.4% success rate. For comparison, the overall drug development success rate is about 14%. The failures spanned multiple mechanisms but were dominated by amyloid-targeting approaches. Many of these drugs demonstrated target engagement (reduced amyloid on PET scans, changed CSF biomarkers) but failed to improve cognition. The analysis also noted: average Phase 3 trials lasted 18 months, cost $462 million, and enrolled ~2,000 patients.',
    type: 'failure',
    framework: 'amyloid',
    significance: 'major',
    sourceIds: ['cummings-2014'],
    citationIds: ['cummings-2014-failure', 'cummings-2014-scope'],
  },

  {
    id: 'solanezumab-fails',
    year: 2016,
    month: 11,
    day: 23,
    title: 'Solanezumab fails third Phase 3 trial',
    shortTitle: 'Solanezumab fails',
    description:
      'Eli Lilly\'s solanezumab fails to beat placebo in its third Phase 3 trial (EXPEDITION3), testing in over 2,100 patients with mild AD. Lilly\'s stock falls 14%. The company abandons FDA submission plans.',
    expandedDescription:
      'Solanezumab targets soluble Aβ monomers rather than plaques, based on the theory that soluble amyloid species are more toxic than deposited plaques. EXPEDITION3 enrolled 2,129 patients with mild AD and amyloid-positive PET scans—a more homogeneous population than previous trials. After 18 months, there was no statistically significant difference between drug and placebo on the primary endpoint (ADAS-Cog14). A small numeric trend favoring the drug (0.8 points on an 85-point scale) was not significant. Eli Lilly had invested over a decade and approximately $2 billion in solanezumab development.',
    type: 'failure',
    framework: 'amyloid',
    significance: 'major',
    sourceIds: ['solanezumab-statnews-2016'],
    citationIds: ['solanezumab-failure', 'solanezumab-third', 'solanezumab-stock'],
  },

  // ============================================
  // THE RECKONING (2020s)
  // ============================================
  {
    id: 'fda-rejects-aducanumab',
    year: 2020,
    month: 11,
    day: 6,
    title: 'FDA advisory panel votes 10-0 against aducanumab',
    shortTitle: 'Panel rejects Aduhelm',
    description:
      'The FDA\'s expert advisory committee unanimously votes that aducanumab has not been shown to be effective. Three members will later resign when FDA approves it anyway.',
    expandedDescription:
      'The FDA convened its Peripheral and Central Nervous System Drugs Advisory Committee to review Biogen\'s aducanumab application. The committee examined two Phase 3 trials (ENGAGE and EMERGE) that had been stopped early for futility, then were re-analyzed after additional data suggested possible efficacy in one trial. The committee voted 10-0 (with one uncertain) that the evidence did not demonstrate aducanumab\'s effectiveness, citing: inconsistent results between trials, the futility analysis, and concerns about post-hoc data mining. The FDA\'s own statistical reviewers had also expressed skepticism about the data integrity.',
    type: 'rejection',
    framework: 'amyloid',
    significance: 'major',
    sourceIds: ['aducanumab-advisory-2020'],
    citationIds: ['fda-vote'],
  },

  {
    id: 'fda-approves-aducanumab',
    year: 2021,
    month: 6,
    day: 7,
    title: 'FDA approves aducanumab despite advisory panel rejection',
    shortTitle: 'Aduhelm approved',
    description:
      'The FDA grants accelerated approval to aducanumab (Aduhelm), overruling its own advisory committee. Three committee members resign in protest.',
    expandedDescription:
      'The FDA used the accelerated approval pathway, requiring amyloid reduction (a surrogate endpoint) rather than proven clinical benefit. This was controversial because: (1) the advisory committee had unanimously voted against approval, (2) the two Phase 3 trials showed conflicting results, (3) the trials had been stopped for futility before being re-analyzed. Three advisory committee members resigned in protest: Aaron Kesselheim, Joel Perlmutter, and David Knopman. The approval triggered congressional investigations into FDA-Biogen interactions, and CMS ultimately limited Medicare coverage to patients in clinical trials. Biogen priced Aduhelm at $56,000/year initially, later reduced to $28,200.',
    type: 'approval',
    framework: 'amyloid',
    significance: 'major',
    sourceIds: ['alexander-2021', 'aducanumab-advisory-2020'],
    citationIds: ['alexander-2021-approval', 'fda-override'],
  },

  {
    id: 'nixon-panthos',
    year: 2022,
    month: 6,
    title: 'Nixon discovers PANTHOS—plaques form inside neurons',
    shortTitle: 'PANTHOS discovery',
    description:
      'Ralph Nixon reveals that amyloid plaques form inside neurons from lysosomal failure (PANTHOS), then are released when the cells die—reversing the assumed causality.',
    expandedDescription:
      'Nixon\'s research identified a previously unknown pathway he called PANTHOS (Poisonous Anthos, or "flower"). Using advanced electron microscopy, his team showed that in AD neurons, lysosomes (the cell\'s recycling centers) become dysfunctional, accumulate APP and its processing enzymes, and generate Aβ intracellularly. These damaged lysosomes form flower-shaped structures that eventually rupture, killing the neuron and releasing their amyloid content. This suggests plaques are a consequence of neuronal death, not a cause. The finding connects presenilin mutations (which disrupt lysosomal acidification) directly to lysosomal failure, providing a mechanistic link between familial AD genetics and cellular pathology.',
    type: 'hypothesis',
    framework: 'lysosomal',
    significance: 'major',
    sourceIds: ['nixon-2022'],
    citationIds: ['nixon-2022-panthos', 'nixon-2022-origin', 'nixon-2022-lysosome'],
    researcher: {
      name: 'Ralph Nixon',
      institution: 'NYU / Nathan Kline Institute',
      hypothesis: 'Lysosome Hypothesis (PANTHOS)',
    },
  },

  {
    id: 'lesne-fraud-exposed',
    year: 2022,
    month: 7,
    title: 'Science exposes Lesné fraud',
    shortTitle: 'Aβ*56 fraud exposed',
    description:
      'A Science investigation reveals extensive image manipulation in Lesné\'s work, including the landmark 2006 Aβ*56 paper that influenced 16 years of research.',
    expandedDescription:
      'Neuroscientist Matthew Schrag identified anomalies in Western blot images in Lesné\'s publications, including the 2006 Aβ*56 paper. Science commissioned independent image analysts who found evidence of manipulation: bands appeared to be cut, moved, or duplicated across experiments. The investigation identified concerns in at least 10 of Lesné\'s papers totaling 70+ potentially altered images. Notably, independent laboratories had struggled for years to replicate the Aβ*56 findings. The University of Minnesota opened an investigation. The senior author Karen Ashe expressed concerns about data integrity but stood by her underlying conclusions about amyloid oligomers.',
    type: 'scandal',
    framework: 'amyloid',
    significance: 'major',
    sourceIds: ['piller-2022'],
    citationIds: ['piller-2022-investigation', 'piller-2022-scope'],
  },

  {
    id: 'nave-myelin',
    year: 2023,
    month: 6,
    title: 'Nave shows myelin dysfunction drives amyloid deposition',
    shortTitle: 'Myelin drives Aβ',
    description:
      'Klaus-Armin Nave publishes in Nature showing that myelin dysfunction is upstream of amyloid—damaged myelin drives plaque formation, not vice versa.',
    expandedDescription:
      'Nave\'s team at Max Planck showed that oligodendrocytes (myelin-producing cells) express BACE1 and APP, and can directly produce Aβ. When they genetically damaged oligodendrocyte function in mice, amyloid plaque deposition increased. Their data indicated that ~25% of brain amyloid may come from oligodendrocytes rather than neurons. The paper\'s key insight: myelin damage (which occurs with normal aging) creates a feed-forward loop where damaged oligodendrocytes produce more Aβ, which further damages myelin. This provides a mechanism linking brain aging directly to amyloid deposition and suggests that protecting myelin health could be a therapeutic target.',
    type: 'hypothesis',
    framework: 'myelin',
    significance: 'major',
    sourceIds: ['depp-nave-2023'],
    citationIds: ['nave-2023-title', 'nave-2023-mechanism', 'nave-2023-conclusion'],
    researcher: {
      name: 'Klaus-Armin Nave',
      institution: 'Max Planck Institute',
      hypothesis: 'Myelin/Oligodendrocyte',
    },
  },

  {
    id: 'lesne-retraction',
    year: 2024,
    title: 'Nature retracts Lesné\'s Aβ*56 paper',
    shortTitle: 'Aβ*56 retracted',
    description:
      'Nature formally retracts the 2006 Aβ*56 paper—the second most-cited retracted paper in history—after all authors except Lesné agree to retraction.',
    expandedDescription:
      'Nature retracted the paper after an institutional investigation by the University of Minnesota concluded there was evidence of image manipulation. Five of the six authors agreed to the retraction; Lesné did not respond. With over 2,300 citations, it became one of the most-cited retracted papers in scientific history. The retraction raised questions about how much research had built on these findings. However, many AD researchers noted that the oligomer hypothesis (that soluble Aβ species are toxic) had support from multiple independent laboratories beyond Lesné\'s work, and that the retraction did not invalidate the broader amyloid hypothesis.',
    type: 'scandal',
    framework: 'amyloid',
    significance: 'major',
    sourceIds: ['lesne-retraction-2024'],
    citationIds: ['lesne-retraction', 'lesne-retraction-delay'],
  },

  {
    id: 'biogen-abandons-aducanumab',
    year: 2024,
    month: 1,
    title: 'Biogen abandons aducanumab',
    shortTitle: 'Aduhelm abandoned',
    description:
      'Biogen discontinues aducanumab (Aduhelm), the drug it fought so hard to approve, citing "financial reasons."',
    expandedDescription:
      'Biogen announced it would discontinue aducanumab development and commercial operations, citing the need to focus resources on lecanemab (which showed clearer efficacy data). The drug had faced multiple obstacles since approval: CMS restricted Medicare coverage to patients enrolled in clinical trials, neurologists were reluctant to prescribe given the controversial approval, the required ARIA monitoring was burdensome, and lecanemab\'s successful trial made aducanumab\'s uncertain data less compelling. Biogen recorded approximately $2.6 billion in impairment charges related to aducanumab. The drug was prescribed to only about 2,000 patients during its brief commercial life.',
    type: 'failure',
    framework: 'amyloid',
    significance: 'major',
    sourceIds: ['biogen-discontinue-2024'],
    citationIds: ['biogen-discontinue'],
  },

  // ============================================
  // THE CHOLINERGIC HYPOTHESIS (1970s-1980s)
  // ============================================
  {
    id: 'cholinergic-hypothesis',
    year: 1982,
    month: 7,
    day: 30,
    title: 'Bartus formalizes the Cholinergic Hypothesis',
    shortTitle: 'Cholinergic hypothesis',
    description:
      'Raymond Bartus and colleagues publish their landmark Science paper reviewing evidence that cholinergic dysfunction underlies memory impairment in aging and Alzheimer\'s disease.',
    expandedDescription:
      'Bartus synthesized evidence from three converging lines of research: (1) scopolamine (an acetylcholine blocker) produced memory deficits resembling early AD in young adults, (2) the cholinergic basal forebrain degenerates severely in AD, and (3) acetylcholine levels decline with normal aging, correlating with cognitive changes. The hypothesis proposed that enhancing cholinergic transmission could improve cognitive function. This directly led to cholinesterase inhibitor development. Four drugs based on this hypothesis (tacrine, donepezil, rivastigmine, galantamine) were approved and remain the most commonly prescribed AD medications, providing modest symptomatic benefit.',
    type: 'hypothesis',
    framework: 'cholinergic',
    significance: 'major',
    sourceIds: ['bartus-1982'],
    citationIds: ['bartus-1982-hypothesis', 'bartus-1982-evidence'],
  },

  {
    id: 'tacrine-approved',
    year: 1993,
    title: 'FDA approves tacrine—the first Alzheimer\'s drug',
    shortTitle: 'Tacrine approved',
    description:
      'The FDA approves tacrine (Cognex), the first drug specifically for Alzheimer\'s. It boosts acetylcholine and provides modest cognitive benefit—proving the cholinergic hypothesis has therapeutic value.',
    expandedDescription:
      'Tacrine (tetrahydroaminoacridine or THA) inhibits acetylcholinesterase, the enzyme that breaks down acetylcholine, thereby increasing acetylcholine levels in synapses. Clinical trials showed improvement of 2-4 points on the ADAS-cog scale in responding patients. However, tacrine required dosing four times daily and caused liver toxicity (elevated transaminases) in about 50% of patients, requiring regular monitoring. These limitations spurred development of better-tolerated cholinesterase inhibitors. Tacrine was voluntarily withdrawn from the market in 2013, replaced by safer alternatives.',
    type: 'approval',
    framework: 'cholinergic',
    significance: 'major',
    sourceIds: ['tacrine-fda-1993'],
    citationIds: ['tacrine-approval'],
  },

  {
    id: 'donepezil-approved',
    year: 1996,
    month: 11,
    title: 'FDA approves donepezil (Aricept)',
    shortTitle: 'Aricept approved',
    description:
      'Donepezil becomes the second cholinesterase inhibitor approved for AD. Unlike tacrine, it has minimal liver toxicity and once-daily dosing, making it the most prescribed AD drug for the next 25 years.',
    expandedDescription:
      'Donepezil offered major advantages over tacrine: once-daily dosing, no liver toxicity requiring monitoring, and better tolerability. Clinical trials showed sustained benefit on cognitive tests (ADAS-cog) for up to 52 weeks, with some patients maintaining improvement for several years. Side effects are primarily gastrointestinal (nausea, diarrhea) due to peripheral cholinergic effects. Donepezil was the first AD drug to achieve blockbuster sales, reaching $3 billion annually at its peak. It is now generic and available for under $20/month. Despite modest effects (2-3 points on ADAS-cog), it remains standard of care for mild-to-moderate AD.',
    type: 'approval',
    framework: 'cholinergic',
    significance: 'major',
    sourceIds: ['donepezil-fda-1996'],
    citationIds: ['donepezil-approval'],
  },

  {
    id: 'rivastigmine-galantamine',
    year: 2001,
    title: 'Rivastigmine and galantamine expand cholinergic options',
    shortTitle: 'More ChEIs approved',
    description:
      'FDA approves rivastigmine (Exelon) in 2000 and galantamine (Razadyne) in 2001, completing the cholinesterase inhibitor class. Three drugs that actually help patients—all based on cholinergic hypothesis.',
    expandedDescription:
      'Rivastigmine (2000) inhibits both acetylcholinesterase and butyrylcholinesterase, with a unique patch formulation that reduces GI side effects. Galantamine (2001) combines cholinesterase inhibition with nicotinic receptor modulation. Both show similar efficacy to donepezil (2-3 point ADAS-cog improvement). These drugs can slow symptom progression for 6-12 months on average and may delay nursing home placement. They do not modify disease course or stop progression. A fourth drug, memantine (approved 2003), works via a different mechanism (NMDA receptor modulation) and is often used in combination with cholinesterase inhibitors in moderate-to-severe AD.',
    type: 'approval',
    framework: 'cholinergic',
    significance: 'supporting',
    sourceIds: ['rivastigmine-fda-2000', 'galantamine-fda-2001'],
  },

  // ============================================
  // THE TAU HYPOTHESIS (1990s-2020s)
  // ============================================
  {
    id: 'braak-staging',
    year: 1991,
    title: 'Braak & Braak establish tau staging of AD',
    shortTitle: 'Braak staging',
    description:
      'Heiko and Eva Braak publish their landmark study showing neurofibrillary tangles spread through the brain in a predictable 6-stage pattern that correlates with clinical progression—better than amyloid does.',
    expandedDescription:
      'The Braaks examined 83 brains and defined 6 stages of tau pathology spread: Stages I-II (transentorhinal cortex, clinically silent), Stages III-IV (limbic regions including hippocampus, early symptoms), Stages V-VI (neocortex, dementia). Critically, they showed that Braak stage correlated strongly with clinical dementia severity, while amyloid plaque burden did not. Some individuals with high plaque loads had minimal cognitive impairment if tau pathology was limited. This work suggested that tau spread, not amyloid accumulation, tracks disease progression. The Braak staging system remains the standard for neuropathological diagnosis.',
    type: 'hypothesis',
    framework: 'tau',
    significance: 'major',
    sourceIds: ['braak-braak-1991'],
    citationIds: ['braak-1991-staging', 'braak-1991-correlation'],
  },

  {
    id: 'tau-pet-imaging',
    year: 2016,
    title: 'First tau PET tracers enable imaging of tangles in living patients',
    shortTitle: 'Tau PET imaging',
    description:
      'FDA approves flortaucipir (Tauvid) for PET imaging of tau tangles. For the first time, researchers can visualize tau pathology in living patients—confirming what Braak showed in autopsy: tau correlates with symptoms.',
    expandedDescription:
      'Flortaucipir (Tauvid, formerly known as AV-1451 or T807) is a radiotracer that binds selectively to aggregated tau in neurofibrillary tangles. FDA approved it in 2020 for PET imaging in adults with cognitive impairment being evaluated for AD. Studies consistently show that tau PET signal correlates more strongly with cognitive impairment than amyloid PET. Tau PET can also predict future cognitive decline: regions showing tau accumulation in early scans show subsequent atrophy and functional decline. The regional pattern of tau matches Braak staging, enabling noninvasive staging in living patients.',
    type: 'milestone',
    framework: 'tau',
    significance: 'major',
    sourceIds: ['tauvid-fda-2020'],
    citationIds: ['tauvid-approval'],
  },

  {
    id: 'tau-prion-spreading',
    year: 2009,
    title: 'Frost and Diamond show tau spreads like a prion',
    shortTitle: 'Tau prion spreading',
    description:
      'Researchers demonstrate that misfolded tau can template normal tau into pathological forms and spread between cells—a prion-like mechanism that explains Braak staging.',
    expandedDescription:
      'Frost and Diamond demonstrated that extracellular tau aggregates can be taken up by cells and template the misfolding of normal intracellular tau—a prion-like mechanism. This spread occurs through synaptic connections, explaining the predictable anatomical progression described by Braak staging: tau begins in entorhinal cortex, spreads to hippocampus, then to neocortex. The mechanism involves release of tau from affected neurons, uptake by connected neurons, and seeding of new aggregates. This has therapeutic implications: blocking tau release, uptake, or seeding could potentially halt disease spread even after it has begun.',
    type: 'discovery',
    framework: 'tau',
    significance: 'major',
    sourceIds: ['frost-diamond-2009'],
    citationIds: ['frost-2009-spreading'],
  },

  {
    id: 'tau-antibodies-fail',
    year: 2021,
    month: 3,
    title: 'Semorinemab and gosuranemab fail Phase 2 trials',
    shortTitle: 'Tau antibodies fail',
    description:
      'Two anti-tau antibodies—Roche\'s semorinemab and Biogen\'s gosuranemab—fail Phase 2 trials, showing no cognitive benefit despite reducing tau.',
    expandedDescription:
      'Semorinemab (Roche) targets the N-terminus of tau and showed CSF tau reduction but no cognitive benefit in the LAURIET Phase 2 trial (272 patients, prodromal-to-mild AD). Gosuranemab (Biogen) targets extracellular tau but failed to slow decline in a Phase 2 trial. These failures raised questions similar to those from amyloid trials: Is it the wrong target, wrong stage of disease, or wrong approach to that target? Tau-targeting therapies continue in development with different strategies including antisense oligonucleotides, small molecules, and vaccines.',
    type: 'failure',
    framework: 'tau',
    significance: 'supporting',
    sourceIds: ['semorinemab-failure-2021'],
  },

  // ============================================
  // THE INFECTION HYPOTHESIS (1990s-2020s)
  // ============================================
  {
    id: 'itzhaki-herpes',
    year: 1997,
    title: 'Itzhaki links herpes virus to Alzheimer\'s',
    shortTitle: 'Herpes-AD link',
    description:
      'Ruth Itzhaki and colleagues discover that the combination of herpes simplex virus (HSV-1) in the brain and the APOE4 gene increases Alzheimer\'s risk 12-fold—proposing infection as a trigger for the disease.',
    expandedDescription:
      'Itzhaki\'s team found that HSV-1 DNA was present in the brains of ~70% of AD patients vs. ~40% of controls, and was specifically localized within amyloid plaques. The key finding was a gene-environment interaction: HSV-1 in brain plus APOE4 genotype increased AD risk 12-fold, while neither factor alone significantly increased risk. The proposed mechanism: HSV-1 periodically reactivates in the brain, and APOE4 carriers may have impaired ability to suppress viral replication. This would explain why antiviral treatments (studied in Taiwan) reduced dementia risk in herpes patients. The work suggests Aβ may serve as an antimicrobial defense.',
    type: 'hypothesis',
    framework: 'infection',
    significance: 'major',
    sourceIds: ['itzhaki-1997'],
    citationIds: ['itzhaki-1997-risk', 'itzhaki-1997-synergy'],
  },

  {
    id: 'moir-amyloid-antimicrobial',
    year: 2010,
    title: 'Moir discovers Aβ is an antimicrobial peptide',
    shortTitle: 'Aβ is antimicrobial',
    description:
      'Robert Moir at Harvard discovers that Aβ kills bacteria and viruses—it\'s an ancient antimicrobial defense. Plaques may be the brain\'s attempt to fight infection, not a disease cause.',
    expandedDescription:
      'Moir showed that Aβ has antimicrobial activity against common pathogens including E. coli, S. aureus, and Candida albicans—comparable to the known antimicrobial peptide LL-37. Subsequent work showed Aβ can form fibrils that trap and kill pathogens, essentially creating a "molecular flypaper" around infections. In transgenic AD mice, Aβ protected against bacterial and viral infections. This reframed the amyloid hypothesis: rather than being purely pathological, Aβ may be part of the innate immune system, with plaques forming as an excessive defense response to real or perceived infections. This explains why Aβ is evolutionarily conserved across species.',
    type: 'discovery',
    framework: 'infection',
    significance: 'major',
    sourceIds: ['moir-2010'],
    citationIds: ['moir-2010-antimicrobial'],
  },

  {
    id: 'gingivalis-discovery',
    year: 2019,
    month: 1,
    title: 'Gum disease bacteria found in Alzheimer\'s brains',
    shortTitle: 'P. gingivalis in AD',
    description:
      'A Science Advances paper reports finding Porphyromonas gingivalis—the bacterium that causes gum disease—in Alzheimer\'s brains, with its toxic proteins correlating with tau pathology.',
    expandedDescription:
      'Researchers found P. gingivalis DNA in 96% of AD brain samples (vs. 39% of controls), and its toxic proteases (gingipains) were found in neurons. Higher gingipain levels correlated with higher tau and ubiquitin pathology. In mice, oral P. gingivalis infection led to brain colonization, Aβ production, and neurodegeneration—effects blocked by gingipain inhibitors. The company Cortexyme developed a gingipain inhibitor (atuzaginstat/COR388) which entered Phase 2/3 trials but failed to meet endpoints in 2022. Questions remain about whether P. gingivalis is causative or merely opportunistic in AD brains with compromised blood-brain barriers.',
    type: 'discovery',
    framework: 'infection',
    significance: 'major',
    sourceIds: ['dominy-gingivalis-2019'],
    citationIds: ['dominy-2019-presence', 'dominy-2019-correlation', 'dominy-2019-mice'],
  },

  {
    id: 'taiwan-herpes-antivirals',
    year: 2018,
    title: 'Taiwan study: antivirals reduce dementia risk 90%',
    shortTitle: 'Antivirals prevent AD',
    description:
      'A massive Taiwanese study of 33,000 patients finds that treating herpes with antivirals reduces dementia risk by 90%. The finding supports Itzhaki\'s 20-year-old hypothesis.',
    expandedDescription:
      'This retrospective cohort study used Taiwan\'s National Health Insurance database to compare dementia rates in ~8,400 patients with newly diagnosed herpes simplex infections vs. matched controls. Those who received antiviral treatment (acyclovir, famciclovir, valacyclovir) had a 90% lower rate of subsequent dementia diagnosis over 10+ years of follow-up. The effect was dose-dependent: longer treatment duration correlated with lower dementia risk. Limitations include the observational design (patients who seek treatment may differ in health behaviors) and possible diagnostic bias. Multiple randomized controlled trials of antivirals for AD prevention are now underway.',
    type: 'milestone',
    framework: 'infection',
    significance: 'major',
    sourceIds: ['tzeng-antivirals-2018'],
    citationIds: ['tzeng-2018-result'],
  },

  // ============================================
  // THE NEUROINFLAMMATION HYPOTHESIS (2000s-2020s)
  // ============================================
  {
    id: 'mcgeer-nsaids',
    year: 1996,
    title: 'McGeer shows NSAIDs reduce Alzheimer\'s risk',
    shortTitle: 'NSAIDs reduce AD',
    description:
      'Patrick and Edith McGeer publish evidence that long-term NSAID use (for arthritis) reduces Alzheimer\'s risk by 50-80%. Inflammation appears to drive the disease.',
    expandedDescription:
      'The McGeers analyzed epidemiological data showing that arthritis patients taking NSAIDs long-term had 50-80% lower AD incidence. They proposed that neuroinflammation—activation of microglia and astrocytes—contributes to AD pathology. Multiple subsequent studies confirmed the epidemiological association. However, clinical trials of NSAIDs in patients with established AD (naproxen, rofecoxib, celecoxib) showed no benefit and possible harm. The ADAPT prevention trial (naproxen, celecoxib in healthy elderly) was stopped early for cardiovascular concerns. The disconnect suggests inflammation may drive disease initiation rather than progression, requiring treatment decades before symptoms appear.',
    type: 'discovery',
    framework: 'neuroinflammation',
    significance: 'major',
    sourceIds: ['mcgeer-nsaids-1996'],
    citationIds: ['mcgeer-1996-risk'],
  },

  {
    id: 'tobinick-tnf',
    year: 2006,
    title: 'Tobinick reports rapid improvement with TNF inhibitor',
    shortTitle: 'TNF-α pilot',
    description:
      'Edward Tobinick reports that perispinal etanercept, a TNF-alpha inhibitor used for arthritis, produces rapid cognitive improvement in Alzheimer\'s patients—some within minutes.',
    expandedDescription:
      'Tobinick administered etanercept (a TNF-alpha inhibitor used for rheumatoid arthritis) via perispinal injection to deliver the drug to the brain via cerebrospinal venous drainage. He reported rapid improvement in some patients—within minutes to hours—in verbal fluency and other cognitive measures. TNF-alpha is elevated in AD brains and CSF and can directly impair synaptic function. The rapid improvement (if real) suggests TNF-alpha may acutely suppress cognition rather than causing structural damage. However, the findings remain controversial: the studies were open-label and uncontrolled. A small randomized controlled trial showed no significant benefit. Larger trials have not been conducted.',
    type: 'hypothesis',
    framework: 'neuroinflammation',
    significance: 'major',
    sourceIds: ['tobinick-2006'],
    citationIds: ['tobinick-2006-tnf', 'tobinick-2006-improvement', 'tobinick-2006-rapid'],
  },

  {
    id: 'trem2-discovery',
    year: 2013,
    title: 'TREM2 mutations dramatically increase AD risk',
    shortTitle: 'TREM2 discovered',
    description:
      'Two independent studies discover that rare mutations in TREM2—a gene expressed in microglia—increase Alzheimer\'s risk 3-4 fold, comparable to APOE4. The immune system is central to AD.',
    expandedDescription:
      'Two independent genome-wide association studies simultaneously reported that the R47H variant of TREM2 (Triggering Receptor Expressed on Myeloid cells 2) increased AD risk 2-4 fold. TREM2 is expressed almost exclusively on microglia in the brain and modulates their response to damage—including their ability to clear amyloid and cellular debris. The R47H variant impairs TREM2 function, leading to defective microglial responses. This established that the brain\'s immune system plays a central role in AD, independent of amyloid production. TREM2 biology has since become a major research focus, with several TREM2-targeting therapies in development.',
    type: 'discovery',
    framework: 'neuroinflammation',
    significance: 'major',
    sourceIds: ['trem2-jonsson-2013'],
    citationIds: ['trem2-2013-risk'],
  },

  // ============================================
  // ADDITIONAL VASCULAR HYPOTHESIS EVENTS
  // ============================================
  {
    id: 'snowdon-nun-study',
    year: 1997,
    title: 'Nun Study reveals stroke + amyloid = dementia',
    shortTitle: 'Nun Study',
    description:
      'The landmark Nun Study shows that brain infarcts dramatically increase the clinical expression of Alzheimer\'s. Nuns with amyloid plaques but no strokes often had normal cognition.',
    expandedDescription:
      'The Nun Study followed 678 Catholic sisters aged 75-102, with detailed cognitive assessments and brain donation at death. A key finding: among participants meeting neuropathological criteria for AD (plaques and tangles), those with brain infarcts (strokes) were much more likely to have had clinical dementia. Conversely, some participants with heavy plaque and tangle burdens maintained normal cognition if they had no infarcts. The data suggested that vascular damage acts synergistically with AD pathology—the brain has "reserve" that can be depleted by vascular insults. This supports prevention strategies targeting cardiovascular risk factors.',
    type: 'discovery',
    framework: 'vascular',
    significance: 'major',
    sourceIds: ['snowdon-nun-1997'],
    citationIds: ['snowdon-1997-infarcts'],
  },

  {
    id: 'zlokovic-bbb',
    year: 2011,
    title: 'Zlokovic shows blood-brain barrier breakdown precedes AD',
    shortTitle: 'BBB breakdown',
    description:
      'Berislav Zlokovic demonstrates that blood-brain barrier dysfunction occurs early in AD and may initiate the cascade—before significant amyloid accumulation.',
    expandedDescription:
      'The brain\'s protective barrier breaks down before Alzheimer\'s strikes. Zlokovic shows that blood-brain barrier dysfunction precedes amyloid accumulation. Toxic blood proteins leak into the brain. The vascular hypothesis gains molecular support. Treatment implications go unexplored.',
    type: 'discovery',
    framework: 'vascular',
    significance: 'major',
    sourceIds: ['zlokovic-bbb-2011'],
    citationIds: ['zlokovic-2011-bbb'],
  },

  // ============================================
  // ADDITIONAL METABOLIC HYPOTHESIS EVENTS
  // ============================================
  {
    id: 'craft-insulin-nasal',
    year: 2012,
    title: 'Nasal insulin improves cognition in AD patients',
    shortTitle: 'Nasal insulin trial',
    description:
      'Suzanne Craft shows that intranasal insulin improves memory and cognition in AD patients—providing clinical validation of the "Type 3 Diabetes" hypothesis.',
    expandedDescription:
      'The brain needs insulin. Craft delivers it directly via nasal spray, bypassing the blood-brain barrier. AD patients improve. A cheap, safe intervention that treats brain insulin resistance. But insulin is generic. Large trials remain unfunded.',
    type: 'milestone',
    framework: 'metabolic',
    significance: 'major',
    sourceIds: ['craft-insulin-2012'],
    citationIds: ['craft-2012-memory'],
  },

  {
    id: 'ketogenic-metabolic',
    year: 2004,
    title: 'First study shows ketogenic diet improves AD cognition',
    shortTitle: 'Ketones help AD',
    description:
      'Researchers show that medium-chain triglycerides (which produce ketones) improve cognition in AD patients. The brain can use ketones when glucose metabolism fails.',
    expandedDescription:
      'The Alzheimer\'s brain is starving. Glucose metabolism is impaired. But the brain can burn ketones instead. A study shows that MCT oil—which produces ketones—improves cognition in AD patients. The intervention costs pennies per day. No drug company funds large trials.',
    type: 'discovery',
    framework: 'metabolic',
    significance: 'supporting',
    sourceIds: ['reger-ketones-2004'],
    citationIds: ['reger-2004-memory'],
  },

  // ============================================
  // ADDITIONAL MITOCHONDRIAL HYPOTHESIS EVENTS
  // ============================================
  {
    id: 'cytoplasmic-hybrid',
    year: 1997,
    title: 'Cybrid studies prove mitochondrial defects are primary',
    shortTitle: 'Cybrid studies',
    description:
      'Swerdlow creates "cybrids"—cells with AD patient mitochondria in healthy cell backgrounds. The AD mitochondria alone produce AD-like changes, proving mitochondrial dysfunction is upstream.',
    expandedDescription:
      'An elegant experiment. Take mitochondria from AD patients. Put them in healthy cells. The cells develop AD-like features—oxidative stress, altered amyloid processing. The mitochondria themselves carry the disease program. Amyloid is downstream.',
    type: 'discovery',
    framework: 'mitochondrial',
    significance: 'major',
    sourceIds: ['swerdlow-cybrid-1997'],
    citationIds: ['swerdlow-1997-cybrid'],
  },

  {
    id: 'mito-dysfunction-earliest',
    year: 2020,
    title: 'Brain imaging shows metabolic decline is earliest AD change',
    shortTitle: 'Metabolism first',
    description:
      'Studies using FDG-PET show that reduced brain glucose metabolism (reflecting mitochondrial dysfunction) occurs before amyloid accumulation and predicts progression to AD.',
    expandedDescription:
      'Brain scans reveal the true order of events. Glucose metabolism—driven by mitochondria—declines first. Years before amyloid becomes visible. The energy failure precedes the plaques. But no drug targeting mitochondria enters clinical trials.',
    type: 'milestone',
    framework: 'mitochondrial',
    significance: 'major',
    sourceIds: ['fdg-pet-early-2020'],
    citationIds: ['fdg-2020-earliest'],
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

// Get events by framework
export function getEventsByFramework(framework: FrameworkId): TimelineEvent[] {
  return timelineEvents.filter(e => e.framework === framework);
}

// Get events by type
export function getEventsByType(type: TimelineEventType): TimelineEvent[] {
  return timelineEvents.filter(e => e.type === type);
}

// Get events in year range
export function getEventsInRange(startYear: number, endYear: number): TimelineEvent[] {
  return timelineEvents.filter(e => e.year >= startYear && e.year <= endYear);
}

// Get major events only
export function getMajorEvents(): TimelineEvent[] {
  return timelineEvents.filter(e => e.significance === 'major');
}

// Sort events chronologically
export function getChronologicalEvents(): TimelineEvent[] {
  return [...timelineEvents].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    if (a.month && b.month && a.month !== b.month) return a.month - b.month;
    if (a.day && b.day) return a.day - b.day;
    return 0;
  });
}

// Sort events chronologically (by year, then month, then day)
function sortEvents(events: TimelineEvent[]): TimelineEvent[] {
  return [...events].sort((a, b) => {
    // First sort by year
    if (a.year !== b.year) return a.year - b.year;
    // Then by month (undefined months come first)
    const monthA = a.month ?? 0;
    const monthB = b.month ?? 0;
    if (monthA !== monthB) return monthA - monthB;
    // Then by day (undefined days come first)
    const dayA = a.day ?? 0;
    const dayB = b.day ?? 0;
    return dayA - dayB;
  });
}

// Get "eras" for timeline sections
export interface TimelineEra {
  id: string;
  title: string;
  startYear: number;
  endYear: number;
  description: string;
  events: TimelineEvent[];
}

export function getTimelineEras(): TimelineEra[] {
  return [
    {
      id: 'origin',
      title: 'The Discovery',
      startYear: 1900,
      endYear: 1983,
      description: 'A disease is named and the first biochemical clue—acetylcholine depletion—emerges.',
      events: sortEvents(timelineEvents.filter(e => e.year >= 1900 && e.year <= 1983)),
    },
    {
      id: 'molecular',
      title: 'The Target Emerges',
      startYear: 1984,
      endYear: 1991,
      description: 'Aβ is identified and linked to genetics. A molecular target appears.',
      events: sortEvents(timelineEvents.filter(e => e.year >= 1984 && e.year <= 1991)),
    },
    {
      id: 'hypothesis',
      title: 'The Hypothesis Takes Hold',
      startYear: 1992,
      endYear: 1999,
      description: 'The amyloid cascade hypothesis is formalized. Alternative voices begin to emerge.',
      events: sortEvents(timelineEvents.filter(e => e.year >= 1992 && e.year <= 1999)),
    },
    {
      id: 'alternatives',
      title: 'The Alternatives',
      startYear: 2000,
      endYear: 2009,
      description:
        'Researchers propose vascular, mitochondrial, and metabolic causes. Their work is marginalized.',
      events: sortEvents(timelineEvents.filter(e => e.year >= 2000 && e.year <= 2009)),
    },
    {
      id: 'failures',
      title: 'The Failures Mount',
      startYear: 2010,
      endYear: 2019,
      description: 'Trial after trial fails. The 99% failure rate becomes undeniable.',
      events: sortEvents(timelineEvents.filter(e => e.year >= 2010 && e.year <= 2019)),
    },
    {
      id: 'reckoning',
      title: 'The Reckoning',
      startYear: 2020,
      endYear: 2025,
      description:
        'Fraud is exposed. Controversial approvals. New evidence suggests the sidelined frameworks were right.',
      events: sortEvents(timelineEvents.filter(e => e.year >= 2020 && e.year <= 2025)),
    },
  ];
}
