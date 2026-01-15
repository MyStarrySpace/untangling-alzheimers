// Treatment Sources
// Includes: HOPEFUL DEVELOPMENTS - APPROVED TREATMENTS, 40Hz GAMMA, LITHIUM, GLP-1 AGONISTS, RESEARCH TOOLS,
// LIFESTYLE INTERVENTIONS, SLEEP/GLYMPHATIC, FOCUSED ULTRASOUND, NEUROINFLAMMATION/IMMUNE APPROACHES,
// FDA-APPROVED TREATMENTS, CHOLINERGIC ADDITIONAL, FAILED APPROACHES (FOR CONTEXT)

import { Source } from './types';

export const treatmentsSources: Source[] = [
  // ============================================
  // HOPEFUL DEVELOPMENTS - APPROVED TREATMENTS
  // ============================================
  {
    id: 'lecanemab-clarity-2023',
    type: 'journal',
    authors: ['Christopher H. van Dyck', 'Chad J. Swanson', 'Paul Aisen', 'et al.'],
    title: 'Lecanemab in Early Alzheimer\'s Disease',
    publication: 'New England Journal of Medicine',
    year: 2023,
    volume: '388',
    pages: '9-21',
    doi: '10.1056/NEJMoa2212948',
    url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa2212948',
    citations: [
      {
        id: 'lecanemab-efficacy',
        quote: 'Lecanemab slowed the rate of cognitive decline by 27% in an 18-month study involving participants experiencing the early stage of Alzheimer\'s.',
        usedIn: ['hopefulDevelopments', 'timeline'],
        context: 'First FDA-approved drug to demonstrate statistically significant slowing of cognitive decline.',
      },
      {
        id: 'lecanemab-trial-size',
        quote: 'A total of 1795 participants were enrolled in the trial. The adjusted least-squares mean change from baseline at 18 months was 1.21 with lecanemab and 1.66 with placebo (difference, −0.45; 95% CI, −0.67 to −0.23; P<0.001).',
        usedIn: ['hopefulDevelopments'],
        context: 'The statistical details of the CLARITY AD trial.',
      },
      {
        id: 'lecanemab-safety',
        quote: 'Lecanemab resulted in infusion-related reactions in 26.4% of the participants and amyloid-related imaging abnormalities with edema or effusions (ARIA-E) in 12.6%.',
        usedIn: ['hopefulDevelopments'],
        context: 'Documents the safety profile and ARIA risk.',
      },
    ],
  },

  {
    id: 'donanemab-trailblazer-2024',
    type: 'journal',
    authors: ['John R. Sims', 'Jennifer A. Zimmer', 'Cynthia D. Evans', 'et al.'],
    title: 'Donanemab in Early Symptomatic Alzheimer Disease: The TRAILBLAZER-ALZ 2 Randomized Clinical Trial',
    publication: 'JAMA',
    year: 2023,
    volume: '330',
    pages: '512-527',
    doi: '10.1001/jama.2023.13239',
    url: 'https://jamanetwork.com/journals/jama/fullarticle/2807533',
    citations: [
      {
        id: 'donanemab-efficacy',
        quote: 'Researchers at Eli Lilly found that donanemab slowed the rates of cognitive and functional decline in participants who have early symptoms of Alzheimer\'s. Specifically, 47% of those who received the drug, compared to 29% who received a placebo, showed no signs of cognitive decline after one year of treatment.',
        usedIn: ['hopefulDevelopments'],
        context: 'Best efficacy result for any amyloid-targeting drug.',
      },
      {
        id: 'donanemab-slowing',
        quote: 'A late-stage clinical trial showed about 35% lower risk of progression of the disease for patients who took donanemab.',
        usedIn: ['hopefulDevelopments', 'timeline'],
        context: 'The 35% slowing figure.',
      },
      {
        id: 'donanemab-aria',
        quote: 'An ARIA-E frequency of 24% (vs. 1.9% for placebo) was reported for donanemab.',
        usedIn: ['hopefulDevelopments'],
        context: 'Higher ARIA rate than lecanemab.',
      },
    ],
  },

  // ============================================
  // HOPEFUL DEVELOPMENTS - 40Hz GAMMA
  // ============================================
  {
    id: 'tsai-40hz-2022',
    type: 'journal',
    authors: ['Diane Chan', 'Ho-Jun Suk', 'Brennan Jackson', 'et al.'],
    title: 'Gamma frequency sensory stimulation in mild probable Alzheimer\'s dementia patients: Results of feasibility and pilot studies',
    publication: 'PLOS ONE',
    year: 2022,
    volume: '17',
    pages: 'e0278412',
    doi: '10.1371/journal.pone.0278412',
    url: 'https://pubmed.ncbi.nlm.nih.gov/36454969/',
    citations: [
      {
        id: 'tsai-40hz-phase2a',
        quote: 'After 3 months of daily stimulation, the group receiving 40Hz stimulation showed (i) lesser ventricular dilation and hippocampal atrophy, (ii) increased functional connectivity in the default mode network as well as with the medial visual network, (iii) better performance on the face-name association delayed recall test, and (iv) improved measures of daily activity rhythmicity compared to the control group.',
        usedIn: ['hopefulDevelopments'],
        context: 'Phase 2a results showing multiple benefits from 40Hz GENUS stimulation.',
      },
      {
        id: 'tsai-40hz-safety',
        quote: 'The phase 1 study demonstrated that 40 Hz GENUS was a safe and effective treatment that induced entrainment in both cortical regions and other subcortical structures of the brain.',
        usedIn: ['hopefulDevelopments'],
        context: 'Safety and entrainment confirmation.',
      },
    ],
  },

  {
    id: 'tsai-40hz-2025',
    type: 'news',
    authors: ['MIT News'],
    title: 'Evidence that 40Hz gamma stimulation promotes brain health is expanding',
    publication: 'MIT News',
    year: 2025,
    url: 'https://news.mit.edu/2025/evidence-40hz-gamma-stimulation-promotes-brain-health-expanding-0314',
    citations: [
      {
        id: 'tsai-40hz-decade',
        quote: 'A decade after scientists in The Picower Institute for Learning and Memory at MIT first began testing whether sensory stimulation of the brain\'s 40Hz "gamma" frequency rhythms could treat Alzheimer\'s disease in mice, a growing evidence base supporting the idea that it can improve brain health—in humans as well as animals—has emerged from the work of labs all over the world.',
        usedIn: ['hopefulDevelopments'],
        context: 'Summary of a decade of 40Hz research progress.',
      },
      {
        id: 'tsai-40hz-mechanisms',
        quote: 'Starting with a paper in Nature in 2016, a collaboration led by Tsai has produced a series of studies showing that 40Hz stimulation via light, sound, the two combined, or tactile vibration reduces hallmarks of Alzheimer\'s pathology such as amyloid and tau proteins, prevents neuron death, decreases synapse loss, and sustains memory and cognition in various Alzheimer\'s mouse models.',
        usedIn: ['hopefulDevelopments'],
        context: 'Multiple demonstrated mechanisms of benefit.',
      },
      {
        id: 'tsai-40hz-longterm',
        quote: 'Five volunteers received 40Hz stimulation for around two years after an early-stage clinical study. Those with late-onset Alzheimer\'s performed better on assessments than Alzheimer\'s patients outside the trial. "This pilot study assessed the long-term effects of daily 40Hz multimodal GENUS in patients with mild AD. We found that daily 40Hz audiovisual stimulation over 2 years is safe, feasible, and may slow cognitive decline and biomarker progression, especially in late-onset AD patients."',
        usedIn: ['hopefulDevelopments'],
        context: 'Long-term pilot results in humans.',
      },
    ],
  },

  {
    id: 'tsai-40hz-glymphatic-2024',
    type: 'journal',
    authors: ['Mitchell H. Murdock', 'Cheng-Yi Yang', 'et al.'],
    title: 'Multisensory gamma stimulation promotes glymphatic clearance of amyloid',
    publication: 'Nature',
    year: 2024,
    doi: '10.1038/s41586-024-07132-6',
    url: 'https://www.nature.com/articles/s41586-024-07132-6',
    citations: [
      {
        id: 'tsai-40hz-glymphatic',
        quote: 'The lab reported in Nature that 40Hz audio and visual stimulation induced interneurons in mice to increase release of the peptide VIP, prompting increased clearance of amyloid from brain tissue via the brain\'s glymphatic "plumbing" system.',
        usedIn: ['hopefulDevelopments'],
        context: 'Mechanism discovery: 40Hz promotes glymphatic clearance.',
      },
    ],
  },

  // ============================================
  // HOPEFUL DEVELOPMENTS - LITHIUM
  // ============================================
  {
    id: 'lithium-orotate-2025',
    type: 'journal',
    authors: ['Bruce Bhattacharya', 'et al.'],
    title: 'Lithium deficiency and the onset of Alzheimer\'s disease',
    publication: 'Nature',
    year: 2025,
    url: 'https://www.nature.com/articles/s41586-025-09335-x',
    citations: [
      {
        id: 'lithium-deficiency',
        quote: 'Of the metals analyzed, lithium was the only one that was significantly reduced in the brain in individuals with mild cognitive impairment (MCI), a precursor to Alzheimer\'s disease.',
        usedIn: ['hopefulDevelopments'],
        context: 'Discovery that lithium deficiency correlates with MCI.',
      },
      {
        id: 'lithium-orotate-efficacy',
        quote: 'Low-dose lithium orotate prevented synapse loss and reversed cognitive decline in aging mice. Long-term treatment with lithium orotate did not show toxicity. Using a dose of lithium orotate on mice at one-thousandth the clinical dose of lithium carbonate showed to be the most effective treatment so far for reversing memory loss in the studied animals without causing toxicity.',
        usedIn: ['hopefulDevelopments'],
        context: 'Dramatic efficacy at very low doses in mice.',
      },
      {
        id: 'lithium-orotate-vs-carbonate',
        quote: 'Unlike lithium carbonate, a low dose of lithium orotate completely reversed memory loss in aging mice during object recognition and maze tasks—without evidence of long-term kidney and thyroid toxicity.',
        usedIn: ['hopefulDevelopments'],
        context: 'Lithium orotate superiority over carbonate form.',
      },
      {
        id: 'lithium-yankner',
        quote: '"The idea that lithium deficiency could be a cause of Alzheimer\'s disease is new and suggests a different therapeutic approach." However, "Before recommending lithium orotate, we need to determine the effective and safe dose range in people. We are planning a clinical trial of lithium orotate that will hopefully begin in the near future."',
        usedIn: ['hopefulDevelopments'],
        context: 'Expert caution about translating to humans.',
      },
    ],
  },

  {
    id: 'lithium-microdose-2013',
    type: 'journal',
    authors: ['Mildred A. Nunes', 'Tatiana A. Viel', 'Hudson S. Buck'],
    title: 'Microdose lithium treatment stabilized cognitive impairment in patients with Alzheimer\'s disease',
    publication: 'Current Alzheimer Research',
    year: 2013,
    volume: '10',
    pages: '104-107',
    doi: '10.2174/1567205011310010014',
    url: 'https://pubmed.ncbi.nlm.nih.gov/22746245/',
    citations: [
      {
        id: 'nunes-microdose',
        quote: 'A small "microdose" treatment with lithium was reported in 2013 to have slowed cognitive decline in Alzheimer\'s patients over 15 months in a double-blind clinical trial from Brazil.',
        usedIn: ['hopefulDevelopments'],
        context: 'Early clinical evidence for microdose lithium.',
      },
    ],
  },

  // ============================================
  // HOPEFUL DEVELOPMENTS - GLP-1 AGONISTS
  // ============================================
  {
    id: 'liraglutide-elad-2025',
    type: 'journal',
    authors: ['Paul Edison', 'et al.'],
    title: 'Liraglutide in mild to moderate Alzheimer\'s disease: a phase 2b clinical trial',
    publication: 'Nature Medicine',
    year: 2025,
    url: 'https://www.nature.com/articles/s41591-025-04106-7',
    citations: [
      {
        id: 'elad-results',
        quote: 'Researchers aimed to evaluate the safety and efficacy of liraglutide in mild to moderate Alzheimer\'s disease syndrome. ELAD is a multicenter, randomized, double-blind, placebo-controlled phase 2b trial in 204 participants with mild to moderate Alzheimer\'s disease syndrome with no diabetes. Results from the phase ELAD 2 trial reveal that liraglutide is safe and well tolerated in people with mild to moderate Alzheimer\'s disease but does not significantly slow brain metabolism decline.',
        usedIn: ['hopefulDevelopments'],
        context: 'ELAD trial results - safe but primary endpoint not met.',
      },
    ],
  },

  {
    id: 'semaglutide-evoke-2024',
    type: 'news',
    authors: ['Novo Nordisk'],
    title: 'GLP-1 Semaglutide Fails to Outperform Placebo in Phase 3 EVOKE Trial of Alzheimer Disease',
    publication: 'Neurology Live',
    year: 2024,
    url: 'https://www.neurologylive.com/view/glp-1-semaglutide-fails-outperform-placebo-phase-3-evoke-trial-ad',
    citations: [
      {
        id: 'evoke-failure',
        quote: 'The pill version of Novo Nordisk\'s blockbuster weight-loss medication, semaglutide, failed to slow down Alzheimer\'s progression in an initial analysis of two clinical phase 3 trials. Novo Nordisk\'s trials, called EVOKE and EVOKE+, involved 3,808 people aged 55 to 85 who had early-stage Alzheimer\'s.',
        usedIn: ['hopefulDevelopments', 'failures'],
        context: 'Oral semaglutide Phase 3 failure for AD.',
      },
      {
        id: 'evoke-details',
        quote: 'During most of the 156-week trial, the researchers gave half the participants 14 milligrams of oral semaglutide once a day. Participants who took the drug did show some improvements in Alzheimer\'s biomarkers, but treatment didn\'t delay disease progression.',
        usedIn: ['hopefulDevelopments'],
        context: 'Biomarker improvement without clinical benefit.',
      },
    ],
  },
  {
    id: 'metformin-ad-meta-2020',
    type: 'journal',
    authors: ['Katherine Samaras', 'Steve Makkar', 'John D. Crawford', 'et al.'],
    title: 'Metformin Use Is Associated With Slowed Cognitive Decline and Reduced Incident Dementia in Older Adults With Type 2 Diabetes: The Sydney Memory and Ageing Study',
    publication: 'Diabetes Care',
    year: 2020,
    volume: '43',
    pages: '2691-2701',
    doi: '10.2337/dc20-0892',
    url: 'https://diabetesjournals.org/care/article/43/11/2691/35857/Metformin-Use-Is-Associated-With-Slowed-Cognitive',
    citations: [
      {
        id: 'metformin-objective',
        quote: 'Type 2 diabetes (diabetes) is characterized by accelerated cognitive decline and higher dementia risk. Controversy exists regarding the impact of metformin, which is associated with both increased and decreased dementia rates. The objective of this study was to determine the association of metformin use with incident dementia and cognitive decline over 6 years in participants with diabetes compared with those not receiving metformin and those without diabetes.',
        usedIn: ['trialBarriers'],
        context: 'Study objective and rationale.',
      },
      {
        id: 'metformin-results',
        quote: 'Of n = 1,037, 123 had diabetes; 67 received metformin (DM+MF) and were demographically similar to those who did not (DM-noMF) and participants without diabetes (no-DM). DM+MF had significantly slower global cognition and executive function decline compared with DM-noMF. Incident dementia was significantly higher in DM-noMF compared with DM+MF (odds ratio 5.29 [95% CI 1.17–23.88]; P = 0.05).',
        usedIn: ['trialBarriers'],
        context: 'Key results showing metformin associated with slower cognitive decline and lower dementia incidence.',
      },
    ],
  },
  {
    id: 'orforglipron-lilly-2025',
    type: 'news',
    authors: ['Eli Lilly'],
    title: 'Lilly\'s oral GLP-1, orforglipron, demonstrated statistically significant efficacy results and a safety profile consistent with injectable GLP-1 medicines in successful Phase 3 trial',
    publication: 'Eli Lilly Press Release',
    year: 2025,
    url: 'https://investor.lilly.com/news-releases/news-release-details/lillys-oral-glp-1-orforglipron-demonstrated-statistically',
    accessDate: '2025-04-17',
    citations: [
      {
        id: 'orforglipron-first-oral',
        quote: 'Orforglipron is the first oral small molecule glucagon-like peptide-1 receptor agonist',
        usedIn: ['trialBarriers'],
        context: 'Unlike injectable peptide GLP-1s like semaglutide, orforglipron is a small molecule that may have better blood-brain barrier penetration.',
      },
      {
        id: 'orforglipron-dosing',
        quote: 'a once-daily small molecule (non-peptide) oral glucagon-like peptide-1 receptor agonist that can be taken any time of the day',
        usedIn: ['trialBarriers'],
        context: 'Small molecule design may enable better CNS penetration than injectable peptides.',
      },
      {
        id: 'orforglipron-efficacy',
        quote: 'orforglipron met the primary endpoint of superior A1C reduction compared to placebo at 40 weeks',
        usedIn: ['trialBarriers'],
        context: 'Lilly is prioritizing diabetes/obesity trials first where endpoints are faster and clearer.',
      },
    ],
  },

  // ============================================
  // HOPEFUL DEVELOPMENTS - RESEARCH TOOLS
  // ============================================
  {
    id: 'appnlgf-saido-2014',
    type: 'journal',
    authors: ['Takashi Saito', 'Yukio Matsuba', 'Naomi Mihira', 'et al.'],
    title: 'Single App knock-in mouse models of Alzheimer\'s disease',
    publication: 'Nature Neuroscience',
    year: 2014,
    volume: '17',
    pages: '661-663',
    doi: '10.1038/nn.3697',
    url: 'https://www.nature.com/articles/nn.3697',
    citations: [
      {
        id: 'appnlgf-design',
        quote: 'The AppNL-G-F model uses a knock-in approach to express APP at wild-type levels with appropriate cell-type and temporal specificity. APP is not overexpressed, but levels of pathogenic Aβ are elevated due to the combined effects of three mutations associated with familial Alzheimer\'s disease.',
        usedIn: ['hopefulDevelopments'],
        context: 'Design of the knock-in model avoiding overexpression artifacts.',
      },
      {
        id: 'appnlgf-pathology',
        quote: 'This model exhibits aggressive amyloidosis; plaques develop in homozygous mice starting at 2 months with near saturation by 7 months. The mice also display age-associated cognitive impairment, specifically memory impairment as measured by the Y maze starting at six months.',
        usedIn: ['hopefulDevelopments'],
        context: 'Pathological and cognitive features of the model.',
      },
    ],
  },

  // ============================================
  // HOPEFUL DEVELOPMENTS - LIFESTYLE INTERVENTIONS
  // ============================================
  {
    id: 'finger-study-2015',
    type: 'journal',
    authors: ['Tiia Ngandu', 'Jenni Lehtisalo', 'Alina Solomon', 'et al.'],
    title: 'A 2 year multidomain intervention of diet, exercise, cognitive training, and vascular risk monitoring versus control to prevent cognitive decline in at-risk elderly people (FINGER): a randomised controlled trial',
    publication: 'The Lancet',
    year: 2015,
    volume: '385',
    pages: '2255-2263',
    doi: '10.1016/S0140-6736(15)60461-5',
    url: 'https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(15)60461-5/fulltext',
    citations: [
      {
        id: 'finger-results',
        quote: 'The FINGER study was a multidomain intervention consisting of diet, exercise, cognitive training, and vascular risk monitoring, which resulted in an improvement or maintenance of cognitive functioning in at-risk elderly people from the general population. This trial was the first methodologically robust study showing that with a 2-year intervention, it was possible to reduce the risk of cognitive decline among the general elderly population.',
        usedIn: ['hopefulDevelopments'],
        context: 'Landmark trial showing lifestyle intervention can prevent cognitive decline.',
      },
      {
        id: 'finger-impact',
        quote: 'Half of the participants took part in an intensive program to improve their diet, heart health, mental acuity, and exercise habits, while the control group received health advice from nurses but no help implementing it. The finding that people in the intensive program improved their cognitive test scores over the 2-year study period electrified a major Alzheimer\'s conference in 2014.',
        usedIn: ['hopefulDevelopments'],
        context: 'The impact of the FINGER results on the field.',
      },
    ],
  },

  {
    id: 'exercise-nature-2025',
    type: 'journal',
    authors: ['Rachel Buckley', 'et al.'],
    title: 'Physical activity as a modifiable risk factor in preclinical Alzheimer\'s disease',
    publication: 'Nature Medicine',
    year: 2025,
    url: 'https://www.nature.com/articles/s41591-025-03955-6',
    citations: [
      {
        id: 'exercise-steps',
        quote: 'Cognitive decline was delayed by three years on average for people who walked just 3,000-5,000 steps per day, and by seven years in people who walked 5,000-7,500 steps per day. Sedentary individuals had a significantly faster buildup of tau proteins in the brain and more rapid declines in cognition and daily functioning.',
        usedIn: ['hopefulDevelopments'],
        context: 'Dramatic cognitive protection from modest daily walking.',
      },
      {
        id: 'exercise-amyloid',
        quote: 'Physical activity was associated with slower rates of cognitive decline in older adults with elevated levels of amyloid-beta. Greater physical activity and lower vascular risk independently attenuated the negative association of amyloid-beta burden with cognitive decline.',
        usedIn: ['hopefulDevelopments'],
        context: 'Exercise protects even in presence of amyloid pathology.',
      },
    ],
  },

  {
    id: 'exercise-jhopkins-2025',
    type: 'news',
    authors: ['Johns Hopkins Bloomberg School of Public Health'],
    title: 'Small Amounts of Moderate to Vigorous Physical Activity Are Associated with Big Reductions in Dementia Risk',
    publication: 'Johns Hopkins',
    year: 2025,
    url: 'https://publichealth.jhu.edu/2025/small-amounts-of-moderate-to-vigorous-physical-activity-are-associated-with-big-reductions-in-dementia-risk',
    citations: [
      {
        id: 'exercise-35min',
        quote: 'Engaging in as little as 35 minutes of moderate to vigorous physical activity per week, compared to zero minutes per week, was associated with a 41% lower risk of developing dementia over an average four-year follow-up period.',
        usedIn: ['hopefulDevelopments'],
        context: 'Even very modest exercise dramatically reduces dementia risk.',
      },
    ],
  },

  {
    id: 'mind-diet-meta-2024',
    type: 'journal',
    authors: ['Multiple authors'],
    title: 'The role of the Mediterranean diet in reducing the risk of cognitive impairment, dementia, and Alzheimer\'s disease: a meta-analysis',
    publication: 'GeroScience',
    year: 2024,
    doi: '10.1007/s11357-024-01488-3',
    url: 'https://link.springer.com/article/10.1007/s11357-024-01488-3',
    citations: [
      {
        id: 'mediterranean-meta',
        quote: 'A meta-analysis comparing Mediterranean diet and the incidence of Alzheimer\'s disease found a 30% reduction in the incidence of Alzheimer\'s disease.',
        usedIn: ['hopefulDevelopments'],
        context: 'Meta-analytic evidence for Mediterranean diet protection.',
      },
    ],
  },

  {
    id: 'mind-diet-rct-2023',
    type: 'journal',
    authors: ['Lisa L. Barnes', 'Puja Agarwal', 'et al.'],
    title: 'Trial of the MIND Diet for Prevention of Cognitive Decline in Older Persons',
    publication: 'New England Journal of Medicine',
    year: 2023,
    volume: '389',
    pages: '602-611',
    doi: '10.1056/NEJMoa2302368',
    url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa2302368',
    citations: [
      {
        id: 'mind-rct-results',
        quote: 'Among cognitively unimpaired participants in a randomized trial, changes in cognition and brain MRI outcomes from baseline to year 3 did not differ significantly between those who followed the MIND diet and those who followed the control diet with mild caloric restriction.',
        usedIn: ['hopefulDevelopments'],
        context: 'RCT did not show MIND superiority over caloric restriction.',
      },
    ],
  },

  {
    id: 'mind-diet-observational',
    type: 'journal',
    authors: ['Martha Clare Morris', 'et al.'],
    title: 'MIND diet associated with reduced incidence of Alzheimer\'s disease',
    publication: 'Alzheimer\'s & Dementia',
    year: 2015,
    volume: '11',
    pages: '1007-1014',
    doi: '10.1016/j.jalz.2014.11.009',
    url: 'https://alz-journals.onlinelibrary.wiley.com/doi/10.1016/j.jalz.2014.11.009',
    citations: [
      {
        id: 'mind-observational',
        quote: 'The MIND diet lowered the risk of AD by as much as 53 percent in participants who adhered to the diet rigorously, and by about 35 percent in those who followed it moderately well.',
        usedIn: ['hopefulDevelopments'],
        context: 'Observational evidence for MIND diet protection.',
      },
    ],
  },

  // ============================================
  // HOPEFUL DEVELOPMENTS - SLEEP/GLYMPHATIC
  // ============================================
  {
    id: 'glymphatic-sleep-2013',
    type: 'journal',
    authors: ['Lulu Xie', 'Hongyi Kang', 'Qiwu Xu', 'et al.'],
    title: 'Sleep drives metabolite clearance from the adult brain',
    publication: 'Science',
    year: 2013,
    volume: '342',
    pages: '373-377',
    doi: '10.1126/science.1241224',
    url: 'https://www.science.org/doi/10.1126/science.1241224',
    citations: [
      {
        id: 'glymphatic-discovery',
        quote: 'They showed that mice who were either anaesthetized or allowed to sleep naturally had a 60% higher rate of brain clearance than did those who were kept awake. This led the team to conclude that sleep increases the rate at which problematic molecules are removed from the brain, thus reducing the risk of dementia.',
        usedIn: ['hopefulDevelopments'],
        context: 'Original discovery that sleep increases brain waste clearance.',
      },
      {
        id: 'glymphatic-function',
        quote: 'The glymphatic system, which clears the brain of protein waste products, is mostly active during sleep. Yet the glymphatic system degrades with age, suggesting a causal relationship between sleep disturbance and symptomatic progression in the neurodegenerative dementias.',
        usedIn: ['hopefulDevelopments'],
        context: 'Links between glymphatic function, sleep, and dementia.',
      },
    ],
  },

  {
    id: 'sleep-amyloid-2017',
    type: 'journal',
    authors: ['Yo-El S. Ju', 'et al.'],
    title: 'Slow wave sleep disruption increases cerebrospinal fluid amyloid-β levels',
    publication: 'Brain',
    year: 2017,
    volume: '140',
    pages: '2104-2111',
    doi: '10.1093/brain/awx148',
    url: 'https://academic.oup.com/brain/article/140/8/2104/3933160',
    citations: [
      {
        id: 'sleep-quality-amyloid',
        quote: 'Cognitively normal individuals with poor sleep quality have significantly higher amyloid levels, suggesting that sleep disturbances may be a risk factor for AD. Both animal and clinical studies suggest that deep sleep in particular is vital for brain clearance, as slow (delta) waves that occur during stage three of NREM sleep are associated with high levels of glymphatic influx and amyloid-β clearance.',
        usedIn: ['hopefulDevelopments'],
        context: 'Clinical evidence linking sleep quality to amyloid accumulation.',
      },
    ],
  },

  // ============================================
  // FOCUSED ULTRASOUND
  // ============================================
  {
    id: 'fus-lipsman-2018',
    type: 'journal',
    authors: ['Nir Lipsman', 'Ying Meng', 'Allison J. Bhattacharya', 'et al.'],
    title: 'Blood-brain barrier opening in Alzheimer\'s disease using MR-guided focused ultrasound',
    publication: 'Nature Communications',
    year: 2018,
    volume: '9',
    pages: '2336',
    doi: '10.1038/s41467-018-04529-6',
    url: 'https://www.nature.com/articles/s41467-018-04529-6',
    citations: [
      {
        id: 'fus-2018-safety',
        quote: 'We demonstrate that MR-guided focused ultrasound can safely and reversibly open the blood-brain barrier in patients with Alzheimer\'s disease.',
        usedIn: ['hopefulDevelopments'],
        context: 'First demonstration of safe BBB opening in AD patients.',
      },
    ],
  },
  {
    id: 'fus-phase2-2023',
    type: 'journal',
    authors: ['Ali Rezai', 'Mandy Rber', 'et al.'],
    title: 'Focused ultrasound-mediated blood-brain barrier opening in Alzheimer\'s disease: results from a phase 2 trial',
    publication: 'Alzheimer\'s Research & Therapy',
    year: 2023,
    doi: '10.1186/s13195-023-01312-w',
    url: 'https://alzres.biomedcentral.com/articles/10.1186/s13195-023-01312-w',
    citations: [
      {
        id: 'fus-2023-amyloid',
        quote: 'Repeated focused ultrasound treatments resulted in reduced amyloid-beta deposition in treated brain regions, without the need for co-administered drugs.',
        usedIn: ['hopefulDevelopments'],
        context: 'Evidence that FUS alone may clear amyloid.',
      },
    ],
  },

  // ============================================
  // NEUROINFLAMMATION / IMMUNE APPROACHES
  // ============================================
  {
    id: 'mindimmune-2025',
    type: 'news',
    authors: ['Longevity.Technology'],
    title: 'Biotech lands funding to combat Alzheimer\'s by targeting the immune system',
    publication: 'Longevity.Technology',
    year: 2025,
    url: 'https://longevity.technology/news/biotech-lands-funding-to-combat-alzheimers-by-targeting-the-immune-system/',
    citations: [
      {
        id: 'mindimmune-2025-cd11c',
        quote: 'By blocking CD11c in the bloodstream, the treatment aims to prevent these cells from being recruited into the brain, where they otherwise accumulate around amyloid plaques.',
        usedIn: ['hopefulDevelopments'],
        context: 'MindImmune Therapeutics\' novel approach targeting peripheral immune cells.',
      },
    ],
  },

  // ============================================
  // CHOLINERGIC - ADDITIONAL SOURCES
  // ============================================
  {
    id: 'donepezil-fda-1996',
    type: 'website',
    authors: ['FDA'],
    title: 'Aricept (donepezil hydrochloride) Approval Letter',
    publication: 'FDA',
    year: 1996,
    url: 'https://www.accessdata.fda.gov/drugsatfda_docs/nda/96/020690_aricept.cfm',
    citations: [
      {
        id: 'donepezil-approval',
        quote: 'Donepezil was approved by the FDA in November 1996 for the treatment of mild to moderate Alzheimer\'s disease.',
        usedIn: ['timeline'],
        context: 'Second cholinesterase inhibitor approval—became the most prescribed AD drug.',
      },
    ],
  },

  {
    id: 'rivastigmine-fda-2000',
    type: 'website',
    authors: ['FDA'],
    title: 'Exelon (rivastigmine) Approval',
    publication: 'FDA',
    year: 2000,
    url: 'https://www.accessdata.fda.gov/drugsatfda_docs/nda/2000/20823_Exelon.cfm',
    citations: [],
  },

  {
    id: 'galantamine-fda-2001',
    type: 'website',
    authors: ['FDA'],
    title: 'Razadyne (galantamine) Approval',
    publication: 'FDA',
    year: 2001,
    url: 'https://www.accessdata.fda.gov/drugsatfda_docs/nda/2001/21-169_Reminyl.cfm',
    citations: [],
  },

  // ============================================
  // FDA-APPROVED ALZHEIMER'S TREATMENTS
  // ============================================
  {
    id: 'donepezil-fda-1996-full',
    type: 'website',
    authors: ['U.S. Food and Drug Administration'],
    title: 'FDA Approves Aricept for Treatment of Alzheimer\'s Disease',
    publication: 'FDA Press Release',
    year: 1996,
    url: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2012/020690s035,021720s008,022568s005lbl.pdf',
    citations: [
      {
        id: 'donepezil-1996-approval',
        quote: 'Aricept (donepezil hydrochloride) is indicated for the treatment of dementia of the Alzheimer\'s type.',
        usedIn: ['hopefulDevelopments'],
        context: 'FDA approval of donepezil, the most widely prescribed cholinesterase inhibitor.',
      },
    ],
  },
  {
    id: 'rivastigmine-fda-2000-full',
    type: 'website',
    authors: ['U.S. Food and Drug Administration'],
    title: 'FDA Approves Exelon for Alzheimer\'s Disease',
    publication: 'FDA Press Release',
    year: 2000,
    url: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2018/020823s030,021025s024lbl.pdf',
    citations: [
      {
        id: 'rivastigmine-2000-approval',
        quote: 'Exelon (rivastigmine tartrate) is indicated for the treatment of mild to moderate dementia of the Alzheimer\'s type.',
        usedIn: ['hopefulDevelopments'],
        context: 'FDA approval of rivastigmine, a dual acetylcholinesterase and butyrylcholinesterase inhibitor.',
      },
    ],
  },
  {
    id: 'galantamine-fda-2001-full',
    type: 'website',
    authors: ['U.S. Food and Drug Administration'],
    title: 'FDA Approves Razadyne for Alzheimer\'s Disease',
    publication: 'FDA Press Release',
    year: 2001,
    url: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2017/021615s021lbl.pdf',
    citations: [
      {
        id: 'galantamine-2001-approval',
        quote: 'Razadyne (galantamine hydrobromide) is indicated for the treatment of mild to moderate dementia of the Alzheimer\'s type.',
        usedIn: ['hopefulDevelopments'],
        context: 'FDA approval of galantamine, which also modulates nicotinic receptors.',
      },
    ],
  },
  {
    id: 'memantine-fda-2003',
    type: 'website',
    authors: ['U.S. Food and Drug Administration'],
    title: 'FDA Approves Namenda for Treatment of Alzheimer\'s Disease',
    publication: 'FDA Press Release',
    year: 2003,
    url: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2013/021487s010s012s014,021627s008lbl.pdf',
    citations: [
      {
        id: 'memantine-2003-approval',
        quote: 'Namenda (memantine HCl) is indicated for the treatment of moderate to severe dementia of the Alzheimer\'s type.',
        usedIn: ['hopefulDevelopments'],
        context: 'FDA approval of memantine, the first NMDA receptor antagonist for AD.',
      },
    ],
  },

  // ============================================
  // AS01 ADJUVANT / VACCINES
  // ============================================
  {
    id: 'taquet-as01-2025',
    type: 'journal',
    authors: ['Maxime Taquet', 'John A. Todd', 'Paul J. Harrison'],
    title: 'Lower risk of dementia with AS01-adjuvanted vaccination against shingles and respiratory syncytial virus infections',
    publication: 'npj Vaccines',
    year: 2025,
    doi: '10.1038/s41541-025-01172-3',
    // PMID: 40562756
    url: 'https://www.nature.com/articles/s41541-025-01172-3',
    citations: [
      {
        id: 'as01-risk-reduction',
        quote: 'Both the AS01-adjuvanted shingles and respiratory syncytial virus (RSV) vaccines, individually or combined, were associated with reduced 18-month risk of dementia.',
        usedIn: ['promisingFrontier'],
        context: 'Propensity-matched study of 436,788 individuals showing dementia risk reduction.',
      },
      {
        id: 'as01-adjuvant-role',
        quote: 'No difference was observed between the two AS01-adjuvanted vaccines, suggesting that the AS01 adjuvant itself plays a direct role in lowering dementia risk.',
        usedIn: ['promisingFrontier'],
        context: 'Key finding: the effect appears to be from the adjuvant, not the target pathogen.',
      },
      {
        id: 'as01-mechanism',
        quote: 'Toll-like receptor 4 stimulation with monophosphoryl lipid A (MPL; one of the components of the AS01 system) has been shown to improve Alzheimer\'s disease pathology in mice. The two main ingredients of AS01, MPL and QS-21, act synergistically to activate macrophages and dendritic cells and trigger a cytokine cascade that produces interferon gamma (IFN-γ).',
        usedIn: ['promisingFrontier'],
        context: 'Proposed mechanism involving TLR4 and IFN-γ.',
      },
      {
        id: 'as01-risk-numbers',
        quote: 'Shingrix recipients showed an 18% lower risk of dementia. Those who received Arexvy (RSV vaccine) saw a 29% reduced risk. Together, the vaccines lowered dementia risk by 37%.',
        usedIn: ['promisingFrontier'],
        context: 'Specific risk reduction percentages.',
      },
    ],
  },

  // ============================================
  // FAILED APPROACHES (FOR CONTEXT)
  // ============================================
  {
    id: 'valacyclovir-valad-2025',
    type: 'journal',
    authors: ['Davangere P. Devanand', 'et al.'],
    title: 'Valacyclovir Treatment of Early Symptomatic Alzheimer Disease: The VALAD Randomized Clinical Trial',
    publication: 'JAMA',
    year: 2025,
    doi: '10.1001/jama.2024.25892',
    url: 'https://jamanetwork.com/journals/jama/article-abstract/2842964',
    citations: [
      {
        id: 'valad-failure',
        quote: 'The first clinical trial to test the theory that herpes viruses contribute to Alzheimer\'s has found that valacyclovir, a common antiviral for herpes simplex infections, does not change the course of the disease for patients in the early stages of Alzheimer\'s. At 78 weeks, the least-squares mean change in the 11-item ADAS-Cognitive Subscale score was 10.86 in the valacyclovir group vs 6.92 in the placebo group, indicating greater cognitive worsening in the treatment group.',
        usedIn: ['hopefulDevelopments', 'failures'],
        context: 'Antiviral approach failed—valacyclovir group did worse.',
      },
      {
        id: 'valad-conclusion',
        quote: 'The conclusion was that valacyclovir was not efficacious, with cognitive worsening for the primary outcome, and it is not recommended to treat individuals with early symptomatic AD and HSV seropositivity.',
        usedIn: ['failures'],
        context: 'Definitive negative conclusion for antiviral approach.',
      },
    ],
  },
];
