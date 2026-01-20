// Precision Medicine Sources
// Includes: CSF PROTEOMIC SUBTYPES, APOE STRATIFICATION, BIOMARKER PANELS, COMBINATION THERAPY

import { Source } from './types';

export const precisionMedicineSources: Source[] = [
  // ============================================
  // TIJMS CSF PROTEOMIC SUBTYPES
  // ============================================
  {
    id: 'tijms-subtypes-2024',
    type: 'journal',
    authors: ['Betty M. Tijms', 'Ellen M. Vromen', 'Olav Mjaavatten', 'et al.'],
    title: 'Cerebrospinal fluid proteomics in patients with Alzheimer\'s disease reveals five molecular subtypes with distinct genetic risk profiles',
    publication: 'Nature Aging',
    year: 2024,
    volume: '4',
    pages: '33-47',
    doi: '10.1038/s43587-023-00550-7',
    url: 'https://pubmed.ncbi.nlm.nih.gov/38195725/',
    citations: [
      {
        id: 'tijms-2024-heterogeneity',
        quote: 'Alzheimer\'s disease (AD) is heterogeneous at the molecular level. Understanding this heterogeneity is critical for AD drug development.',
        usedIn: ['precisionMedicine', 'promisingFrontier'],
        context: 'Opening statement establishing the need for precision medicine in AD.',
      },
      {
        id: 'tijms-2024-five-subtypes',
        quote: 'We defined AD molecular subtypes using mass spectrometry proteomics in cerebrospinal fluid, based on 1,058 proteins, with different levels in individuals with AD (n = 419) compared to controls (n = 187). Five subtypes were identified characterized by: (1) neuronal hyperplasticity, (2) innate immune activation, (3) RNA dysregulation, (4) choroid plexus dysfunction and (5) blood-brain barrier impairment.',
        usedIn: ['precisionMedicine', 'promisingFrontier'],
        context: 'The five molecular subtypes identified through CSF proteomics.',
      },
      {
        id: 'tijms-2024-genetic-risk',
        quote: 'Each subtype was related to specific AD genetic risk variants, for example, subtype 1 was enriched with TREM2 R47H.',
        usedIn: ['precisionMedicine'],
        context: 'Genetic associations differ by subtype, supporting personalized treatment.',
      },
      {
        id: 'tijms-2024-clinical-outcomes',
        quote: 'Subtypes also differed in clinical outcomes, survival times and anatomical patterns of brain atrophy.',
        usedIn: ['precisionMedicine'],
        context: 'Clinical relevance of molecular subtypes for prognosis.',
      },
      {
        id: 'tijms-2024-personalized',
        quote: 'These results indicate molecular heterogeneity in AD and highlight the need for personalized medicine.',
        usedIn: ['precisionMedicine', 'promisingFrontier'],
        context: 'Key conclusion supporting precision medicine approach.',
      },
    ],
  },

  {
    id: 'tijms-subtypes-2020',
    type: 'journal',
    authors: ['Betty M. Tijms', 'Johan Gobom', 'Lianne Reus', 'et al.'],
    title: 'Pathophysiological subtypes of Alzheimer\'s disease based on cerebrospinal fluid proteomics',
    publication: 'Brain',
    year: 2020,
    volume: '143',
    pages: '3776-3792',
    doi: '10.1093/brain/awaa325',
    url: 'https://pubmed.ncbi.nlm.nih.gov/33439986/',
    citations: [
      {
        id: 'tijms-2020-three-subtypes',
        quote: 'Using CSF proteomics, we identified three Alzheimer\'s disease subtypes that show: (1) hyperplasticity and increased BACE1 levels; (2) innate immune activation; and (3) blood-brain barrier dysfunction with low BACE1 levels.',
        usedIn: ['precisionMedicine'],
        context: 'Initial identification of three AD subtypes (later expanded to five).',
      },
      {
        id: 'tijms-2020-faster-progression',
        quote: 'Subtype 2 showed faster clinical progression (hazard ratio = 2.5, 95% CI 1.2-5.1).',
        usedIn: ['precisionMedicine'],
        context: 'Innate immune subtype has significantly worse prognosis.',
      },
      {
        id: 'tijms-2020-tailored-therapy',
        quote: 'Future therapeutics may need tailoring to individual disease subtypes.',
        usedIn: ['precisionMedicine', 'promisingFrontier'],
        context: 'Conclusion supporting precision medicine approach.',
      },
    ],
  },

  // ============================================
  // APOE AND HRT
  // ============================================
  {
    id: 'saleh-hrt-apoe4-2023',
    type: 'journal',
    authors: ['Rasha N. M. Saleh', 'Anne-Marie Minihane', 'Stephen B. Sheridan', 'et al.'],
    title: 'Hormone replacement therapy is associated with improved cognition and larger brain volumes in at-risk APOE4 women: results from the European Prevention of Alzheimer\'s Disease (EPAD) cohort',
    publication: 'Alzheimer\'s Research & Therapy',
    year: 2023,
    volume: '15',
    pages: '10',
    doi: '10.1186/s13195-022-01121-5',
    url: 'https://pubmed.ncbi.nlm.nih.gov/36631903/',
    citations: [
      {
        id: 'saleh-2023-apoe4-hrt-benefit',
        quote: 'HRT introduction is associated with improved delayed memory and larger entorhinal and amygdala volumes in APOE4 carriers only. This may represent an effective targeted strategy to mitigate the higher life-time risk of AD in this large at-risk population.',
        usedIn: ['precisionMedicine', 'sexAncestryEffects'],
        context: 'APOE4 women specifically benefit from HRT - precision medicine example.',
      },
      {
        id: 'saleh-2023-apoe4-response',
        quote: 'APOE4 women are most responsive to HRT. They exhibited larger entorhinal cortex and amygdala volumes, along with higher delayed memory index scores compared to APOE4 non-HRT users.',
        usedIn: ['precisionMedicine'],
        context: 'Quantitative benefit of HRT in APOE4 women.',
      },
    ],
  },

  {
    id: 'riedel-estrogen-apoe-2016',
    type: 'journal',
    authors: ['Brandalyn C. Riedel', 'Paul M. Thompson', 'Roberta Diaz Brinton'],
    title: 'Age, APOE and sex: Triad of risk of Alzheimer\'s disease',
    publication: 'Journal of Steroid Biochemistry and Molecular Biology',
    year: 2016,
    volume: '160',
    pages: '134-147',
    doi: '10.1016/j.jsbmb.2016.03.012',
    url: 'https://pubmed.ncbi.nlm.nih.gov/26969397/',
    citations: [
      {
        id: 'riedel-2016-triad',
        quote: 'The APOE genotype is strongly associated with the risk of Alzheimer\'s disease and cognitive decline. Compared to the wild-type APOE3/E3, those with APOE3/E4 and APOE4/E4 are at a 3-4-fold and 12-15-fold increased risk of AD, respectively. Female APOE4 carriers have the highest risk of AD.',
        usedIn: ['precisionMedicine', 'sexAncestryEffects'],
        context: 'Quantifying the APOE4 risk by genotype and sex.',
      },
    ],
  },

  // ============================================
  // CORTISOL AND HPA AXIS
  // ============================================
  {
    id: 'ouanes-cortisol-2020',
    type: 'journal',
    authors: ['Sami Ouanes', 'Julius Popp'],
    title: 'High Cortisol and the Risk of Dementia and Alzheimer\'s Disease: A Review of the Literature',
    publication: 'Frontiers in Aging Neuroscience',
    year: 2019,
    volume: '11',
    pages: '43',
    doi: '10.3389/fnagi.2019.00043',
    url: 'https://pubmed.ncbi.nlm.nih.gov/30881301/',
    citations: [
      {
        id: 'ouanes-2019-cortisol-ad',
        quote: 'In patients with AD, the increased cortisol at preclinical and early clinical stages is associated with a poorer prognosis and a more rapid cognitive decline.',
        usedIn: ['precisionMedicine', 'mechanisticCascade'],
        context: 'Cortisol as a prognostic marker and therapeutic target.',
      },
      {
        id: 'ouanes-2019-vicious-circle',
        quote: 'Along with the glucocorticoid cascade hypothesis, elevated cortisol in AD could be explained by loss of inhibitory control of the hippocampus over the HPA-axis due to hippocampal damage and atrophy caused by AD pathology, a process accelerated over time by glucocorticoid toxicity on the hippocampus, i.e., a vicious circle.',
        usedIn: ['precisionMedicine', 'mechanisticCascade'],
        context: 'The bidirectional cortisol-hippocampus feedback loop.',
      },
    ],
  },

  {
    id: 'canet-hpa-2022',
    type: 'journal',
    authors: ['Gemma Canet', 'Nathalie Bhalo', 'Slavica Krantic'],
    title: 'Chronic stress and Alzheimer\'s disease: the interplay between the hypothalamic-pituitary-adrenal axis, genetics and microglia',
    publication: 'Biological Psychiatry',
    year: 2022,
    volume: '91',
    pages: '73-82',
    doi: '10.1016/j.biopsych.2021.05.006',
    url: 'https://pubmed.ncbi.nlm.nih.gov/34159699/',
    citations: [
      {
        id: 'canet-2022-chronic-stress',
        quote: 'Chronic psychosocial stress is increasingly being recognized as a risk factor for sporadic Alzheimer\'s disease (AD).',
        usedIn: ['precisionMedicine'],
        context: 'Establishing chronic stress as modifiable AD risk factor.',
      },
      {
        id: 'canet-2022-hpa-microglia',
        quote: 'Chronic stress triggers prolonged HPA axis activation, resulting in elevated cortisol levels, which can lead to hippocampal atrophy, synaptic dysfunction, and neuroinflammation.',
        usedIn: ['precisionMedicine', 'mechanisticCascade'],
        context: 'Mechanistic link between stress and AD pathology.',
      },
    ],
  },

  // ============================================
  // THYROID HORMONES
  // ============================================
  {
    id: 'choi-thyroid-2022',
    type: 'journal',
    authors: ['Hee-Sun Choi', 'Hui-Jin Hong', 'Sung-Hwan Kim', 'et al.'],
    title: 'Thyroid dysfunction and Alzheimer\'s disease, a vicious circle',
    publication: 'Frontiers in Endocrinology',
    year: 2024,
    volume: '15',
    pages: '1354372',
    doi: '10.3389/fendo.2024.1354372',
    url: 'https://pubmed.ncbi.nlm.nih.gov/38449848/',
    citations: [
      {
        id: 'choi-2024-thyroid-ad',
        quote: 'Several studies have reported an association between thyroid disorders, such as hyper- or hypothyroidism, with Alzheimer\'s disease. Hypothyroidism was significantly more prevalent in Alzheimer\'s disease compared with controls (6.4% vs 2.4%).',
        usedIn: ['precisionMedicine'],
        context: 'Thyroid dysfunction as AD risk factor requiring monitoring.',
      },
    ],
  },

  {
    id: 'tan-thyroid-2008',
    type: 'journal',
    authors: ['Zaldy S. Tan', 'Thomas A. Beiser', 'Ramachandran S. Vasan', 'et al.'],
    title: 'Thyroid function and the risk of Alzheimer disease: the Framingham Study',
    publication: 'Archives of Internal Medicine',
    year: 2008,
    volume: '168',
    pages: '1514-1520',
    doi: '10.1001/archinte.168.14.1514',
    url: 'https://pubmed.ncbi.nlm.nih.gov/18663163/',
    citations: [
      {
        id: 'tan-2008-framingham-thyroid',
        quote: 'There was a strong association between hypothyroidism and the risk of Alzheimer-type dementia, with overt thyroid dysfunction translating to a 2-fold greater risk for the development of Alzheimer-type dementia than euthyroidism.',
        usedIn: ['precisionMedicine'],
        context: 'Framingham data on thyroid-AD relationship.',
      },
    ],
  },

  // ============================================
  // TESTOSTERONE
  // ============================================
  {
    id: 'yeap-testosterone-2022',
    type: 'journal',
    authors: ['Bu B. Yeap', 'Leon Flicker'],
    title: 'Testosterone, cognitive decline and dementia in ageing men',
    publication: 'Reviews in Endocrine and Metabolic Disorders',
    year: 2022,
    volume: '23',
    pages: '1243-1257',
    doi: '10.1007/s11154-022-09728-7',
    url: 'https://pubmed.ncbi.nlm.nih.gov/35262839/',
    citations: [
      {
        id: 'yeap-2022-testosterone-decline',
        quote: 'As men grow older, circulating testosterone concentrations decline, while prevalence of cognitive impairment and dementia increase. Epidemiological studies of middle-aged and older men have demonstrated associations of lower testosterone concentrations with higher prevalence and incidence of cognitive decline and dementia, including Alzheimer\'s disease.',
        usedIn: ['precisionMedicine'],
        context: 'Testosterone as potential biomarker in men.',
      },
      {
        id: 'yeap-2022-biomarker-not-target',
        quote: 'Additional research is warranted but at this stage lower testosterone concentrations in ageing men should be regarded as a biomarker rather than a proven therapeutic target for risk reduction of cognitive decline and dementia.',
        usedIn: ['precisionMedicine'],
        context: 'Caution about testosterone as therapeutic target.',
      },
    ],
  },

  {
    id: 'jia-testosterone-ad-2022',
    type: 'journal',
    authors: ['Jia-Xi Yang', 'Wei-Ping Ke', 'Liang Liu', 'et al.'],
    title: 'Impact of Testosterone on Alzheimer\'s Disease',
    publication: 'World Journal of Men\'s Health',
    year: 2022,
    volume: '40',
    pages: '243-253',
    doi: '10.5534/wjmh.210175',
    url: 'https://pubmed.ncbi.nlm.nih.gov/35021310/',
    citations: [
      {
        id: 'jia-2022-testosterone-neuroprotective',
        quote: 'Animal models demonstrated that testosterone exerted a neuroprotective effect reducing the production of amyloid-beta (Aβ), improving synaptic signaling, and counteracting neuronal death.',
        usedIn: ['precisionMedicine', 'mechanisticCascade'],
        context: 'Testosterone mechanism in animal models.',
      },
    ],
  },

  // ============================================
  // BIOMARKER PANELS AND HEPCIDIN
  // ============================================
  {
    id: 'kweon-hepcidin-2019',
    type: 'journal',
    authors: ['Ok Joon Kweon', 'Seung Jun Yoon', 'Sang-Guk Lee'],
    title: 'Serum hepcidin levels are associated with the severity of Alzheimer\'s disease',
    publication: 'Journal of the Neurological Sciences',
    year: 2019,
    volume: '403',
    pages: '139-145',
    doi: '10.1016/j.jns.2019.06.018',
    url: 'https://pubmed.ncbi.nlm.nih.gov/31255800/',
    citations: [
      {
        id: 'kweon-2019-hepcidin-ad',
        quote: 'Serum hepcidin levels were significantly higher in patients with AD (median 39.0 ng/ml) compared to controls (5.5 ng/ml). Hepcidin correlates with CDR severity (r=0.253).',
        usedIn: ['precisionMedicine'],
        context: 'Hepcidin as emerging biomarker for gut-iron axis in AD.',
      },
    ],
  },

  {
    id: 'palmqvist-ptau217-2020',
    type: 'journal',
    authors: ['Sebastian Palmqvist', 'Shorena Janelidze', 'Yakeel T. Quiroz', 'et al.'],
    title: 'Discriminative Accuracy of Plasma Phospho-tau217 for Alzheimer Disease vs Other Neurodegenerative Disorders',
    publication: 'JAMA',
    year: 2020,
    volume: '324',
    pages: '772-781',
    doi: '10.1001/jama.2020.12134',
    url: 'https://pubmed.ncbi.nlm.nih.gov/32722745/',
    citations: [
      {
        id: 'palmqvist-2020-ptau217',
        quote: 'Plasma P-tau217 showed high accuracy for discriminating Alzheimer disease from other neurodegenerative diseases (AUC, 0.96).',
        usedIn: ['precisionMedicine', 'biomarkers'],
        context: 'p-tau217 as gold standard plasma biomarker.',
      },
    ],
  },

  // ============================================
  // COMBINATION THERAPY
  // ============================================
  {
    id: 'cummings-combination-2019',
    type: 'journal',
    authors: ['Jeffrey Cummings', 'Garam Lee', 'Aaron Ritter', 'et al.'],
    title: 'Alzheimer\'s disease drug development pipeline: 2019',
    publication: 'Alzheimer\'s & Dementia: Translational Research & Clinical Interventions',
    year: 2019,
    volume: '5',
    pages: '272-293',
    doi: '10.1016/j.trci.2019.05.008',
    url: 'https://pubmed.ncbi.nlm.nih.gov/31334330/',
    citations: [
      {
        id: 'cummings-2019-combination',
        quote: 'Combination trials that simultaneously target multiple mechanisms may be required to achieve meaningful clinical benefit in Alzheimer\'s disease, similar to combination approaches used in cancer and HIV treatment.',
        usedIn: ['precisionMedicine', 'promisingFrontier'],
        context: 'Rationale for combination therapy in AD.',
      },
    ],
  },
];
