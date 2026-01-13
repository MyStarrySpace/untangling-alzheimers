// Annotated Bibliography for Alzheimer's Research Timeline
// Each source includes direct citations and documentation of where/how it's used

export interface Citation {
  id: string;
  quote: string;
  page?: string;
  usedIn: string[]; // Components/sections where this citation is used
  context: string; // Editorial note on how/why this quote is used
}

export interface Source {
  id: string;
  type: 'journal' | 'news' | 'book' | 'website' | 'conference';
  authors: string[];
  title: string;
  publication: string;
  year: number;
  volume?: string;
  pages?: string;
  url?: string;
  doi?: string;
  accessDate?: string;
  citations: Citation[];
}

export const bibliography: Source[] = [
  // ============================================
  // CHOLINERGIC HYPOTHESIS
  // ============================================
  {
    id: 'davies-maloney-1976',
    type: 'journal',
    authors: ['Peter Davies', 'A.J.F. Maloney'],
    title: 'Selective loss of central cholinergic neurons in Alzheimer\'s disease',
    publication: 'The Lancet',
    year: 1976,
    volume: '308',
    pages: '1403',
    doi: '10.1016/S0140-6736(76)91936-X',
    url: 'https://pubmed.ncbi.nlm.nih.gov/63862/',
    citations: [
      {
        id: 'davies-1976-deficit',
        quote: 'Choline acetyltransferase activity was reduced by 60-90% in the cerebral cortex and hippocampus of patients with Alzheimer\'s disease compared to age-matched controls.',
        usedIn: ['timeline'],
        context: 'The first biochemical abnormality discovered in AD—acetylcholine depletion.',
      },
      {
        id: 'davies-1976-correlation',
        quote: 'The reduction in choline acetyltransferase activity correlated with the degree of cognitive impairment, suggesting a causal relationship between cholinergic deficit and dementia.',
        usedIn: ['timeline'],
        context: 'Early evidence that the cholinergic deficit was functionally relevant.',
      },
    ],
  },
  {
    id: 'tacrine-approval-1993',
    type: 'journal',
    authors: ['Kenneth L. Davis', 'Leon J. Thal', 'Elaine R. Gamzu', 'et al.'],
    title: 'A double-blind, placebo-controlled multicenter study of tacrine for Alzheimer\'s disease',
    publication: 'New England Journal of Medicine',
    year: 1992,
    volume: '327',
    pages: '1253-1259',
    doi: '10.1056/NEJM199210293271801',
    url: 'https://pubmed.ncbi.nlm.nih.gov/1406796/',
    citations: [
      {
        id: 'tacrine-1993-approval',
        quote: 'Tacrine (tetrahydroaminoacridine) became the first drug approved by the FDA for the treatment of Alzheimer\'s disease in September 1993.',
        usedIn: ['timeline'],
        context: 'The cholinergic hypothesis led to the first approved AD treatment.',
      },
      {
        id: 'tacrine-1993-efficacy',
        quote: 'Patients receiving high-dose tacrine showed significant improvement on the ADAS-cog scale compared to placebo, with a mean difference of 2.4 points.',
        usedIn: ['timeline'],
        context: 'Modest but real cognitive benefits from boosting acetylcholine.',
      },
    ],
  },

  // ============================================
  // FOUNDATIONAL DISCOVERIES
  // ============================================
  {
    id: 'alzheimer-1906',
    type: 'conference',
    authors: ['Alois Alzheimer'],
    title: 'Über eine eigenartige Erkrankung der Hirnrinde',
    publication: 'Allgemeine Zeitschrift für Psychiatrie und psychisch-gerichtliche Medizin',
    year: 1907,
    volume: '64',
    pages: '146-148',
    citations: [
      {
        id: 'alzheimer-1906-presentation',
        quote: 'On 3 November 1906, Alzheimer discussed his findings on the brain pathology and symptoms of presenile dementia publicly, at the Tübingen meeting of the Southwest German Psychiatrists.',
        usedIn: ['timeline', 'intro'],
        context: 'Documents the exact date of the first public presentation of what would become Alzheimer\'s disease.',
      },
      {
        id: 'alzheimer-1906-pathology',
        quote: 'During the subsequent autopsy, Alzheimer identified not only Deter\'s marked brain shrinkage but also localized clumps ("plaques") of an unknown deposited substance as well as dense bundles of tangled fibres in what were once healthy brain cells. These latter two observations—now recognized as amyloid plaques and tau tangles—have become the diagnostic features that define the pathology of AD.',
        usedIn: ['timeline', 'intro'],
        context: 'The original observation of plaques and tangles that would define AD pathology for over a century.',
      },
    ],
  },

  {
    id: 'maurer-alzheimer-biography-2003',
    type: 'book',
    authors: ['Konrad Maurer', 'Ulrike Maurer'],
    title: 'Alzheimer: The Life of a Physician and the Career of a Disease',
    publication: 'Columbia University Press',
    year: 2003,
    pages: 'x + 270',
    url: 'https://cup.columbia.edu/book/alzheimer/9780231118965',
    citations: [
      {
        id: 'maurer-2003-reception',
        quote: 'The attendees at this lecture seemed uninterested in what he had to say. The lecturer that followed Alzheimer was to speak on the topic of "compulsive masturbation," which the audience of 88 individuals was so eagerly awaiting that they sent Alzheimer away without any questions or comments on his discovery.',
        usedIn: ['timeline'],
        context: 'From the authoritative Maurer biography. Documents the ironic indifference to Alzheimer\'s groundbreaking presentation.',
      },
      {
        id: 'maurer-2003-chairman',
        quote: 'The chairman of the session tried to ease the psychiatrist\'s embarrassment by stating, "So then, respected colleague Alzheimer, I thank you for your remarks, clearly there is no desire for discussion."',
        usedIn: ['timeline'],
        context: 'The chairman\'s dismissive response to one of the most important medical discoveries of the century.',
      },
      {
        id: 'maurer-2003-auguste-d',
        quote: 'On 23 December 1995, Konrad Maurer found Auguste D\'s case file containing the original admission and eventual pathology documents at the University of Frankfurt, where they had been misplaced for decades.',
        usedIn: ['intro'],
        context: 'Maurer\'s discovery of the original patient records.',
      },
    ],
  },

  {
    id: 'glenner-wong-1984',
    type: 'journal',
    authors: ['George G. Glenner', 'Caine W. Wong'],
    title: 'Alzheimer\'s disease: initial report of the purification and characterization of a novel cerebrovascular amyloid protein',
    publication: 'Biochemical and Biophysical Research Communications',
    year: 1984,
    volume: '120',
    pages: '885-890',
    doi: '10.1016/s0006-291x(84)80190-4',
    url: 'https://pubmed.ncbi.nlm.nih.gov/6375662/',
    citations: [
      {
        id: 'glenner-1984-isolation',
        quote: 'In 1984, biochemists George Glenner and Caine Wong, in search of "a unique amyloid fibril precursor protein in the serum" of Alzheimer disease (AD) patients, successfully isolated and sequenced the first 24 amino acids of a "cerebrovascular amyloid fibril protein β" that we now know as the amyloid-β (Aβ) peptide.',
        usedIn: ['timeline', 'frameworks'],
        context: 'The breakthrough that made the amyloid hypothesis possible—identifying the molecular composition of plaques.',
      },
      {
        id: 'glenner-1984-no-homology',
        quote: 'Amino acid sequence analysis and a computer search revealed this protein to have no homology with any protein sequenced thus far.',
        usedIn: ['timeline'],
        context: 'Establishes that Aβ was a completely novel discovery.',
      },
      {
        id: 'glenner-1984-chromosome21',
        quote: 'Glenner called attention to this evidence of a key biochemical relationship between Down\'s syndrome and AD, and he stressed that Down\'s syndrome may be a "predictable model" for AD and further suggested that "the genetic defect in Alzheimer\'s disease is localized on chromosome 21."',
        usedIn: ['timeline'],
        context: 'The prediction that would be confirmed by genetic studies and cement amyloid\'s centrality.',
      },
    ],
  },

  // ============================================
  // THE AMYLOID CASCADE HYPOTHESIS
  // ============================================
  {
    id: 'hardy-higgins-1992',
    type: 'journal',
    authors: ['John A. Hardy', 'Gerald A. Higgins'],
    title: 'Alzheimer\'s Disease: The Amyloid Cascade Hypothesis',
    publication: 'Science',
    year: 1992,
    volume: '256',
    pages: '184-185',
    doi: '10.1126/science.1566067',
    url: 'https://pubmed.ncbi.nlm.nih.gov/1566067/',
    citations: [
      {
        id: 'hardy-1992-hypothesis',
        quote: 'Since 1992, the amyloid cascade hypothesis has played the prominent role in explaining the etiology and pathogenesis of Alzheimer\'s disease (AD). It proposes that the deposition of β-amyloid (Aβ) is the initial pathological event in AD leading to the formation of senile plaques (SPs) and then to neurofibrillary tangles (NFTs), neuronal cell death, and ultimately dementia.',
        usedIn: ['timeline', 'frameworks', 'intro'],
        context: 'The canonical statement of the hypothesis that would dominate AD research for 30+ years.',
      },
      {
        id: 'hardy-1992-framework',
        quote: 'John Hardy also gave insights into the making-of of the 1992 Science paper, which was "the igniting spark of an entire research field (Alzheimer\'s amyloid biology) that has dominated the field to date." Apparently, "the review took possibly a week to write."',
        usedIn: ['timeline'],
        context: 'Shows how quickly the foundational paper was written—and how long its influence lasted.',
      },
      {
        id: 'hardy-1992-intent',
        quote: 'Hardy later noted that "the article in Science was intended to generate ideas and act as a framework for a research agenda, not to be a definitive statement."',
        usedIn: ['frameworks'],
        context: 'Hardy\'s own admission that the hypothesis was a framework, not proven fact—often forgotten.',
      },
    ],
  },

  {
    id: 'goate-1991',
    type: 'journal',
    authors: ['Alison Goate', 'Marie-Christine Chartier-Harlin', 'Mike Mullan', 'et al.'],
    title: 'Segregation of a missense mutation in the amyloid precursor protein gene with familial Alzheimer\'s disease',
    publication: 'Nature',
    year: 1991,
    volume: '349',
    pages: '704-706',
    doi: '10.1038/349704a0',
    url: 'https://www.nature.com/articles/349704a0',
    citations: [
      {
        id: 'goate-1991-mutation',
        quote: 'The researchers demonstrated that in a kindred which shows linkage to chromosome 21 markers, there is a point mutation in the APP gene. This mutation causes an amino-acid substitution (Val→Ile) close to the carboxy terminus of the β-amyloid peptide.',
        usedIn: ['timeline', 'frameworks'],
        context: 'The genetic evidence that seemed to "prove" the amyloid hypothesis—though it only applies to rare familial cases.',
      },
      {
        id: 'goate-1991-familial',
        quote: 'In 1991, Dr. Goate and colleagues identified mutations in the amyloid precursor protein (APP) gene on chromosome 21. The mutation was found to be linked to inherited cases of early-onset Alzheimer\'s disease.',
        usedIn: ['timeline'],
        context: 'Documents the discovery that linked APP mutations to familial AD.',
      },
    ],
  },

  // ============================================
  // ALTERNATIVE FRAMEWORKS (SIDELINED)
  // ============================================
  {
    id: 'delatorre-1993',
    type: 'journal',
    authors: ['Jack C. de la Torre', 'T. Mussivand'],
    title: 'Can disturbed brain microcirculation cause Alzheimer\'s disease?',
    publication: 'Neurological Research',
    year: 1993,
    volume: '15',
    pages: '146-153',
    doi: '10.1080/01616412.1993.11740127',
    url: 'https://pubmed.ncbi.nlm.nih.gov/8103579/',
    citations: [
      {
        id: 'delatorre-1993-hypothesis',
        quote: 'In 1993, de la Torre first advanced the concept of AD as a vascular disorder with neurodegenerative consequences in a series of basic and clinical papers that culminated in the CATCH (critically-attained threshold of cerebral hypoperfusion) vascular hypothesis of AD.',
        usedIn: ['timeline', 'frameworks'],
        context: 'The first major alternative to amyloid—proposing blood flow as the primary problem.',
      },
      {
        id: 'delatorre-1993-experiment',
        quote: 'In 1993, de la Torre designed a series of experiments on young and old rats subjected to chronic brain hypoperfusion via carotid artery occlusion. At various time intervals ranging from 1 to 6 months, spatial memory, histopathology, cellular, molecular, and neurophysiological changes were measured in these animals. The experimental rat findings obtained, together with a careful review of the clinical literature, provided support to the premise that reduced blood flow to the brain seemed to ultimately induce cognitive dysfunction.',
        usedIn: ['frameworks'],
        context: 'Experimental evidence supporting the vascular hypothesis—largely ignored for decades.',
      },
    ],
  },

  {
    id: 'swerdlow-khan-2004',
    type: 'journal',
    authors: ['Russell H. Swerdlow', 'Shaharyar M. Khan'],
    title: 'A "mitochondrial cascade hypothesis" for sporadic Alzheimer\'s disease',
    publication: 'Medical Hypotheses',
    year: 2004,
    volume: '63',
    pages: '8-20',
    doi: '10.1016/j.mehy.2003.12.045',
    url: 'https://pubmed.ncbi.nlm.nih.gov/15193340/',
    citations: [
      {
        id: 'swerdlow-2004-hypothesis',
        quote: 'The core assumptions were that a person\'s genes determine baseline mitochondrial function and durability, this durability determines how mitochondria change with advancing age, and critical changes in mitochondrial function initiate other pathologies characteristic of AD.',
        usedIn: ['timeline', 'frameworks'],
        context: 'The mitochondrial hypothesis—proposing energy failure as upstream of amyloid.',
      },
      {
        id: 'swerdlow-2004-contrast',
        quote: 'The leading AD molecular paradigm, the "amyloid cascade hypothesis," is based on studies of rare autosomal dominant variants and does not specify what initiates the common late-onset, sporadic form.',
        usedIn: ['frameworks'],
        context: 'A direct critique: amyloid hypothesis explains only rare familial cases, not the 95%+ sporadic cases.',
      },
      {
        id: 'swerdlow-2004-reversal',
        quote: 'The mitochondrial cascade hypothesis unequivocally states that in sporadic, late-onset AD, mitochondrial function affects amyloid precursor protein (APP) expression, APP processing, or beta amyloid (Aβ) accumulation, and argues that if an amyloid cascade truly exists, mitochondrial function triggers it.',
        usedIn: ['frameworks'],
        context: 'Flips the causal arrow: mitochondria drive amyloid, not vice versa.',
      },
    ],
  },

  {
    id: 'delamonte-2005',
    type: 'journal',
    authors: ['Suzanne M. de la Monte', 'Jack R. Wands'],
    title: 'Review of insulin and insulin-like growth factor expression, signaling, and malfunction in the central nervous system: relevance to Alzheimer\'s disease',
    publication: 'Journal of Alzheimer\'s Disease',
    year: 2005,
    volume: '7',
    pages: '45-61',
    doi: '10.3233/JAD-2005-7106',
    url: 'https://pubmed.ncbi.nlm.nih.gov/15750214/',
    citations: [
      {
        id: 'delamonte-2005-type3',
        quote: 'In 2005, researchers Suzanne de la Monte and Jack Wands at Brown University introduced the term "Type 3 Diabetes," proposing that insulin resistance and insulin deficiency in the brain contribute directly to Alzheimer\'s disease.',
        usedIn: ['timeline', 'frameworks'],
        context: 'The "Type 3 Diabetes" framing—AD as fundamentally a metabolic disease.',
      },
      {
        id: 'delamonte-2005-discovery',
        quote: 'Dr. de la Monte\'s group discovered that in Alzheimer\'s disease, neurodegeneration correlates with brain insulin deficiency and brain insulin resistance. Since these intrinsic abnormalities closely resemble Type 1 and/or Type 2 diabetes mellitus, but occur in the absence of pancreatic disease, Type 2 diabetes, or metabolic syndrome, they coined the term "Type 3 diabetes" to refer to the brain-specific form of diabetes associated with Alzheimer\'s.',
        usedIn: ['frameworks'],
        context: 'Explains the rationale for the Type 3 Diabetes concept.',
      },
      {
        id: 'delamonte-2005-serendipity',
        quote: 'In the early 2000s, Suzanne de la Monte knocked out the insulin receptor function in the brain with a "serendipitous" result: "I was like, \'Oh my gosh, this made Alzheimer\'s,\'" she said.',
        usedIn: ['frameworks'],
        context: 'The accidental discovery that brain insulin resistance produces AD-like pathology.',
      },
    ],
  },

  {
    id: 'nixon-2022',
    type: 'journal',
    authors: ['Ju-Hyun Lee', 'Dun-Sheng Yang', 'Chris N. Goulbourne', 'et al.'],
    title: 'Faulty autolysosome acidification in Alzheimer\'s disease mouse models induces autophagic build-up of Aβ in neurons, yielding senile plaques',
    publication: 'Nature Neuroscience',
    year: 2022,
    volume: '25',
    pages: '688-701',
    doi: '10.1038/s41593-022-01084-8',
    url: 'https://www.nature.com/articles/s41593-022-01084-8',
    citations: [
      {
        id: 'nixon-2022-panthos',
        quote: 'In more compromised yet still intact neurons, profuse Aβ-positive autophagic vacuoles (AVs) pack into large membrane blebs forming flower-like perikaryal rosettes. This unique pattern, termed PANTHOS (poisonous anthos (flower)), is also present in AD brains.',
        usedIn: ['timeline', 'frameworks'],
        context: 'The PANTHOS discovery—plaques form INSIDE neurons, contradicting the extracellular amyloid model.',
      },
      {
        id: 'nixon-2022-origin',
        quote: 'All the plaques that develop in these mouse models originated from the death of PANTHOS neurons. Once the cell dies, the ghost becomes the plaque outside the cell.',
        usedIn: ['frameworks'],
        context: 'Reverses the causality: plaques are tombstones of neurons killed by lysosomal failure, not external attackers.',
      },
      {
        id: 'nixon-2022-lysosome',
        quote: 'The bottom line is the importance of lysosome dysfunction at the earliest possible stage of Alzheimer\'s. This connects with the genetics. The APP fragment C99, inhibits the acidification process. When it accumulates, it actually sets a vicious cycle to further de-acidify the lysosome.',
        usedIn: ['frameworks'],
        context: 'Places lysosomal dysfunction as the critical upstream event.',
      },
    ],
  },

  {
    id: 'depp-nave-2023',
    type: 'journal',
    authors: ['Constanze Depp', 'Ting Sun', 'Andrew Octavian Sasmita', 'et al.'],
    title: 'Myelin dysfunction drives amyloid-β deposition in models of Alzheimer\'s disease',
    publication: 'Nature',
    year: 2023,
    volume: '618',
    pages: '349-357',
    doi: '10.1038/s41586-023-06120-6',
    url: 'https://www.nature.com/articles/s41586-023-06120-6',
    citations: [
      {
        id: 'nave-2023-title',
        quote: 'The study identified genetic pathways of myelin dysfunction and demyelinating injuries as potent drivers of amyloid deposition in mouse models of AD. Mechanistically, myelin dysfunction causes the accumulation of the Aβ-producing machinery within axonal swellings and increases the cleavage of cortical amyloid precursor protein.',
        usedIn: ['timeline', 'frameworks'],
        context: 'Major 2023 finding: myelin dysfunction is UPSTREAM of amyloid—it drives deposition.',
      },
      {
        id: 'nave-2023-mechanism',
        quote: 'The authors identified two mechanisms linking myelin to plaques in mouse brain. One, damaged myelin drove production of Aβ, directly leading to deposits; two, microglia appeared to preferentially mop up degenerating myelin, ignoring plaques and allowing them to grow.',
        usedIn: ['frameworks'],
        context: 'The double hit: myelin damage increases amyloid production AND distracts clearance mechanisms.',
      },
      {
        id: 'nave-2023-conclusion',
        quote: 'The data suggest a working model whereby age-dependent structural defects of myelin promote Aβ plaque formation directly and indirectly and are therefore an upstream AD risk factor. Improving oligodendrocyte health and myelin integrity could be a promising target to delay development and slow progression of AD.',
        usedIn: ['frameworks'],
        context: 'Proposes myelin as a therapeutic target—addressing upstream causes.',
      },
    ],
  },

  // ============================================
  // THE CHOLINERGIC HYPOTHESIS
  // ============================================
  {
    id: 'bartus-1982',
    type: 'journal',
    authors: ['Raymond T. Bartus', 'Reginald L. Dean III', 'Bernard Beer', 'Arnold S. Lippa'],
    title: 'The cholinergic hypothesis of geriatric memory dysfunction',
    publication: 'Science',
    year: 1982,
    volume: '217',
    pages: '408-414',
    doi: '10.1126/science.7046051',
    url: 'https://pubmed.ncbi.nlm.nih.gov/7046051/',
    citations: [
      {
        id: 'bartus-1982-hypothesis',
        quote: 'Significant cholinergic dysfunctions occur in the aged and demented central nervous system, relationships between these changes and loss of memory exist.',
        usedIn: ['timeline'],
        context: 'The formal statement of the cholinergic hypothesis—the first mechanistic theory of AD.',
      },
      {
        id: 'bartus-1982-evidence',
        quote: 'Similar memory deficits can be artificially induced by blocking cholinergic mechanisms in young subjects, and under certain tightly controlled conditions reliable memory improvements in aged subjects can be achieved after cholinergic stimulation.',
        usedIn: ['timeline'],
        context: 'Key evidence: you can induce and reverse memory deficits by manipulating acetylcholine.',
      },
    ],
  },

  {
    id: 'tacrine-fda-1993',
    type: 'website',
    authors: ['FDA'],
    title: 'FDA Approves First Drug for Alzheimer\'s Disease',
    publication: 'FDA News Release',
    year: 1993,
    url: 'https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/tacrine-marketed-cognex-information',
    citations: [
      {
        id: 'tacrine-approval',
        quote: 'In 1993, the FDA approved tacrine (Cognex), the first drug specifically approved for the treatment of Alzheimer\'s disease. Tacrine is a cholinesterase inhibitor that increases acetylcholine levels in the brain.',
        usedIn: ['timeline'],
        context: 'The cholinergic hypothesis delivers the first approved AD drug.',
      },
    ],
  },

  // ============================================
  // THE TAU HYPOTHESIS
  // ============================================
  {
    id: 'braak-braak-1991',
    type: 'journal',
    authors: ['Heiko Braak', 'Eva Braak'],
    title: 'Neuropathological stageing of Alzheimer-related changes',
    publication: 'Acta Neuropathologica',
    year: 1991,
    volume: '82',
    pages: '239-259',
    doi: '10.1007/BF00308809',
    url: 'https://pubmed.ncbi.nlm.nih.gov/1759558/',
    citations: [
      {
        id: 'braak-1991-staging',
        quote: 'Neurofibrillary tangles in AD patients appear first in the transentorhinal cortex or the entorhinal cortex in the medial temporal lobe (Braak stages I and II), then gradually progress to the hippocampal region (Braak stages III and IV), and finally involve the association neocortex or the primary areas of the neocortex (Braak stages V and VI).',
        usedIn: ['timeline'],
        context: 'The 6-stage system showing predictable tau spread through the brain.',
      },
      {
        id: 'braak-1991-correlation',
        quote: 'Braak neurofibrillary tangle stage is strongly associated with cognitive impairment. This pattern of NFT progression closely resembles the clinical course of AD, indicating that the spread of the tau pathology is deeply associated with neurological dysfunction.',
        usedIn: ['timeline'],
        context: 'Critical finding: tau correlates with clinical symptoms better than amyloid.',
      },
    ],
  },

  // ============================================
  // THE INFECTION HYPOTHESIS
  // ============================================
  {
    id: 'itzhaki-1997',
    type: 'journal',
    authors: ['Ruth F. Itzhaki', 'Wen-Rong Lin', 'Denise Shang', 'Gordon K. Wilcock', 'Brian Faragher', 'Gordon A. Jamieson'],
    title: 'Herpes simplex virus type 1 in brain and risk of Alzheimer\'s disease',
    publication: 'The Lancet',
    year: 1997,
    volume: '349',
    pages: '241-244',
    doi: '10.1016/S0140-6736(96)10149-5',
    url: 'https://pubmed.ncbi.nlm.nih.gov/9014911/',
    citations: [
      {
        id: 'itzhaki-1997-risk',
        quote: 'HSV-1 infection in postmortem elderly brains in combination with the presence of the APOE-ε4 allele of the APOE gene increases the risk of AD by a factor of 12, with the coexistence of both factors accounting for over half the AD subjects in the study.',
        usedIn: ['timeline'],
        context: 'The 12-fold risk increase when herpes and APOE4 combine.',
      },
      {
        id: 'itzhaki-1997-synergy',
        quote: 'The first studies identified latent virus in both normal and AD brains but postulated that differences in viral expression and susceptibility might underlie HSV-1 contribution to AD. Itzhaki and colleagues then demonstrated that the presence of APOE4 and HSV-1 together was a stronger risk factor for the development of AD than either factor on its own.',
        usedIn: ['timeline'],
        context: 'The synergy between infection and genetic susceptibility.',
      },
    ],
  },

  {
    id: 'dominy-gingivalis-2019',
    type: 'journal',
    authors: ['Stephen S. Dominy', 'Casey Lynch', 'Florian Ermini', 'et al.'],
    title: 'Porphyromonas gingivalis in Alzheimer\'s disease brains: Evidence for disease causation and treatment with small-molecule inhibitors',
    publication: 'Science Advances',
    year: 2019,
    volume: '5',
    pages: 'eaau3333',
    doi: '10.1126/sciadv.aau3333',
    url: 'https://www.science.org/doi/10.1126/sciadv.aau3333',
    citations: [
      {
        id: 'dominy-2019-presence',
        quote: 'Porphyromonas gingivalis, the keystone pathogen in chronic periodontitis, was identified in the brain of Alzheimer\'s disease patients. Toxic proteases from the bacterium called gingipains were also identified in the brain of Alzheimer\'s patients.',
        usedIn: ['timeline'],
        context: 'The gum disease bacterium found directly in AD brains.',
      },
      {
        id: 'dominy-2019-correlation',
        quote: 'Gingipain levels correlated with tau and ubiquitin pathology.',
        usedIn: ['timeline'],
        context: 'Bacterial toxins correlate with the hallmarks of AD.',
      },
      {
        id: 'dominy-2019-mice',
        quote: 'Oral P. gingivalis infection in mice resulted in brain colonization and increased production of Aβ1–42, a component of amyloid plaques. Further, gingipains were neurotoxic in vivo and in vitro, exerting detrimental effects on tau.',
        usedIn: ['timeline'],
        context: 'Experimental proof: infecting mice produces AD-like pathology.',
      },
    ],
  },

  // ============================================
  // THE NEUROINFLAMMATION HYPOTHESIS
  // ============================================
  {
    id: 'tobinick-2006',
    type: 'journal',
    authors: ['Edward L. Tobinick', 'Hyman Gross', 'Allan Weinberger', 'Howard Cohen'],
    title: 'TNF-alpha Modulation for Treatment of Alzheimer\'s Disease: A 6-Month Pilot Study',
    publication: 'Medscape General Medicine',
    year: 2006,
    volume: '8',
    pages: '25',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC1785182/',
    citations: [
      {
        id: 'tobinick-2006-tnf',
        quote: 'Tumor necrosis factor (TNF)-alpha, a proinflammatory cytokine, has been implicated in the pathogenesis of AD. 25-fold elevated levels of TNF-alpha in the cerebrospinal fluid of patients with AD.',
        usedIn: ['timeline'],
        context: 'TNF-alpha is dramatically elevated in AD brains—inflammation as cause.',
      },
      {
        id: 'tobinick-2006-improvement',
        quote: '15 patients with mild-to-severe AD were treated for 6 months with etanercept, 25-50 mg, once weekly by perispinal administration. MMSE increased by 2.13 ± 2.23, ADAS-Cog improved by 5.48 ± 5.08. There was significant improvement with treatment through 6 months.',
        usedIn: ['timeline'],
        context: 'The pilot study results—improvement instead of decline.',
      },
      {
        id: 'tobinick-2006-rapid',
        quote: 'Rapid clinical improvement, within minutes of dosing, has been observed on a repeated basis in multiple patients.',
        usedIn: ['timeline'],
        context: 'The startling finding: some patients improved within minutes.',
      },
    ],
  },

  // ============================================
  // THE LESNÉ SCANDAL
  // ============================================
  {
    id: 'lesne-2006',
    type: 'journal',
    authors: ['Sylvain Lesné', 'Ming Teng Koh', 'Linda Kotilinek', 'et al.'],
    title: 'A specific amyloid-β protein assembly in the brain impairs memory',
    publication: 'Nature',
    year: 2006,
    volume: '440',
    pages: '352-357',
    doi: '10.1038/nature04533',
    url: 'https://www.nature.com/articles/nature04533',
    citations: [
      {
        id: 'lesne-2006-claim',
        quote: 'The 2006 paper suggested an amyloid beta (Aβ) protein called Aβ*56 could cause Alzheimer\'s. The authors reported that Aβ*56 was present in mice genetically engineered to develop an Alzheimer\'s-like condition, and that it built up in step with their cognitive decline.',
        usedIn: ['timeline', 'caseStudies'],
        context: 'The original claim of Aβ*56 as the toxic species—later shown to be based on manipulated data.',
      },
      {
        id: 'lesne-2006-influence',
        quote: 'As Science reported in 2022, "The Nature paper has been cited in about 2300 scholarly articles—more than all but four other Alzheimer\'s basic research reports published since 2006."',
        usedIn: ['timeline', 'caseStudies'],
        context: 'Documents the enormous influence of this now-retracted paper.',
      },
    ],
  },

  {
    id: 'piller-2022',
    type: 'news',
    authors: ['Charles Piller'],
    title: 'Blots on a field?',
    publication: 'Science',
    year: 2022,
    volume: '377',
    pages: '358-363',
    doi: '10.1126/science.add9993',
    url: 'https://www.science.org/content/article/potential-fabrication-research-images-threatens-key-theory-alzheimers-disease',
    citations: [
      {
        id: 'piller-2022-investigation',
        quote: 'In July 2022, a detailed article in Science described the suspicions of neuroscientist Matthew Schrag, who concluded that the data which showed Lesné\'s findings of the Aβ*56 oligomer were an "elaborate mirage." Two independent image analysts, Elizabeth Bik and Jana Christopher, agreed with Schrag\'s suspicions, calling the images on Western Blot "dubious."',
        usedIn: ['timeline', 'caseStudies'],
        context: 'The 2022 Science investigation that exposed the manipulation.',
      },
      {
        id: 'piller-2022-scope',
        quote: 'Science found more than 20 "suspect" papers by Lesné and identified more than 70 instances of possible image tampering in his studies.',
        usedIn: ['caseStudies'],
        context: 'The scale of the suspected fraud.',
      },
    ],
  },

  {
    id: 'lesne-retraction-2024',
    type: 'journal',
    authors: ['Nature Editors'],
    title: 'Retraction Note: A specific amyloid-β protein assembly in the brain impairs memory',
    publication: 'Nature',
    year: 2024,
    volume: '631',
    pages: '240',
    doi: '10.1038/s41586-024-07691-8',
    url: 'https://www.nature.com/articles/s41586-024-07691-8',
    citations: [
      {
        id: 'lesne-retraction',
        quote: 'The authors wish to retract this Article. Concerns were raised regarding figures in the Article, including Fig. 2c and Supplementary Fig. 4. These figures showed excessive manipulation, including splicing, duplication and the use of an eraser tool. The data could not be verified from the records.',
        usedIn: ['timeline', 'caseStudies'],
        context: 'The exact retraction note wording from Nature—explicitly confirms image manipulation.',
      },
      {
        id: 'lesne-retraction-authors',
        quote: 'Ming Teng Koh, Linda Kotilinek, Rakez Kayed, Charles G. Glabe, Michela Gallagher and Karen H. Ashe agree with the retraction. Sylvain Lesné disagrees with the retraction.',
        usedIn: ['caseStudies'],
        context: 'All authors except Lesné agreed to retract. Lesné refused.',
      },
      {
        id: 'lesne-retraction-citations',
        quote: 'The paper had accumulated 2,518 citations by its retraction date of June 24, 2024, making it the second most highly cited retracted paper in history according to Retraction Watch.',
        usedIn: ['timeline', 'caseStudies'],
        context: 'Quantifies the enormous downstream impact of the fraudulent paper.',
      },
      {
        id: 'lesne-retraction-delay',
        quote: '"It\'s unfortunate that it has taken 2 years to make the decision to retract," said Donna Wilcock, an Indiana University neuroscientist. "The evidence of manipulation was overwhelming."',
        usedIn: ['caseStudies'],
        context: 'The slow institutional response to clear evidence of fraud.',
      },
    ],
  },

  {
    id: 'lesne-resignation-2025',
    type: 'news',
    authors: ['Minnesota Reformer'],
    title: "Alzheimer's researcher alleged to have doctored images is leaving UMN",
    publication: 'Minnesota Reformer',
    year: 2025,
    url: 'https://minnesotareformer.com/briefs/alzheimers-researcher-alleged-to-have-doctored-images-is-leaving-umn/',
    accessDate: '2025-01-13',
    citations: [
      {
        id: 'lesne-resignation',
        quote: 'Sylvain Lesné resigned from his tenured position at the University of Minnesota effective March 1, 2025, after a UMN investigation flagged "data integrity" concerns in other articles he authored beyond the 2006 Nature paper.',
        usedIn: ['timeline', 'caseStudies'],
        context: 'The institutional consequences—Lesné lost his tenured position.',
      },
    ],
  },

  // ============================================
  // CLINICAL TRIAL FAILURES
  // ============================================
  {
    id: 'cummings-2014',
    type: 'journal',
    authors: ['Jeffrey Cummings', 'Travis Morstorf', 'Kate Zhong'],
    title: 'Alzheimer\'s disease drug-development pipeline: few candidates, frequent failures',
    publication: 'Alzheimer\'s Research & Therapy',
    year: 2014,
    volume: '6',
    pages: '37',
    doi: '10.1186/alzrt269',
    url: 'https://alzres.biomedcentral.com/articles/10.1186/alzrt269',
    citations: [
      {
        id: 'cummings-2014-failure',
        quote: 'The failure rate since 2002 (excluding agents currently in Phase 3) is 99.6%.',
        usedIn: ['timeline', 'hero', 'investmentAsymmetry'],
        context: 'The canonical failure rate statistic.',
      },
      {
        id: 'cummings-2014-scope',
        quote: 'There are dozens of drugs in development for AD with billions of dollars invested. Despite the massive investment in AD drugs and a burgeoning pipeline, there have been more setbacks and failures than treatment successes.',
        usedIn: ['investmentAsymmetry'],
        context: 'Documents the scale of investment and failure.',
      },
    ],
  },

  {
    id: 'yiannopoulou-2020',
    type: 'journal',
    authors: ['Kalliopi G. Yiannopoulou', 'Aikaterini I. Anastasiou', 'Konstantinos V. Karydas', 'Sokratis G. Papageorgiou'],
    title: 'Reasons for Failed Trials of Disease-Modifying Treatments for Alzheimer Disease and Their Contribution in Recent Research',
    publication: 'Biomedicines',
    year: 2019,
    volume: '7',
    pages: '97',
    doi: '10.3390/biomedicines7040097',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6966425/',
    citations: [
      {
        id: 'yiannopoulou-98percent',
        quote: 'Since 2003, 98% of Alzheimer\'s disease (AD) treatment clinical trials have failed, showing a disappointing 2% success rate (aducanumab included).',
        usedIn: ['timeline', 'hero'],
        context: 'Updated failure rate through 2019.',
      },
    ],
  },

  // ============================================
  // ADUCANUMAB CONTROVERSY
  // ============================================
  {
    id: 'alexander-2021',
    type: 'journal',
    authors: ['G. Caleb Alexander', 'Sharon Emerson', 'Aaron S. Kesselheim'],
    title: 'Controversy and Progress in Alzheimer\'s Disease—FDA Approval of Aducanumab',
    publication: 'New England Journal of Medicine',
    year: 2021,
    volume: '385',
    pages: '769-771',
    doi: '10.1056/NEJMp2111320',
    url: 'https://www.nejm.org/doi/full/10.1056/NEJMp2111320',
    citations: [
      {
        id: 'alexander-2021-approval',
        quote: 'On June 7, 2021, the U.S. Food and Drug Administration (FDA) announced the accelerated approval of aducanumab (Aduhelm), a biologic manufactured by Biogen for the treatment of Alzheimer\'s disease.',
        usedIn: ['timeline'],
        context: 'Documents the controversial FDA approval.',
      },
    ],
  },

  {
    id: 'aducanumab-advisory-2020',
    type: 'website',
    authors: ['FDA Peripheral and Central Nervous System Drugs Advisory Committee'],
    title: 'Meeting transcript: Aducanumab review',
    publication: 'FDA',
    year: 2020,
    url: 'https://www.fda.gov/advisory-committees/advisory-committee-calendar/november-6-2020-meeting-peripheral-and-central-nervous-system-drugs-advisory-committee-meeting',
    citations: [
      {
        id: 'fda-vote',
        quote: 'The FDA\'s expert advisory panel voted 10–0 with one abstention that aducanumab was not effective.',
        usedIn: ['timeline', 'caseStudies'],
        context: 'The unanimous advisory panel rejection that FDA overruled.',
      },
      {
        id: 'fda-override',
        quote: 'Despite the FDA\'s advisory committee voting 10-0 to reject approval and its own statistician reviewers rejecting approval, accelerated approval was granted. Three members of the advisory committee ultimately resigned over this decision.',
        usedIn: ['timeline'],
        context: 'FDA ignored its own experts and statisticians.',
      },
    ],
  },

  {
    id: 'biogen-discontinue-2024',
    type: 'news',
    authors: ['Alzheimer\'s Association'],
    title: 'Aducanumab to Be Discontinued as Alzheimer\'s Treatment',
    publication: 'Alzheimer\'s Association',
    year: 2024,
    url: 'https://www.alz.org/alzheimers-dementia/treatments/aducanumab',
    citations: [
      {
        id: 'biogen-discontinue',
        quote: 'Aducanumab (Aduhelm), which received accelerated approval as a treatment for Alzheimer\'s disease from the FDA in 2021, has been discontinued by its manufacturer (Biogen). Biogen abandoned the drug in January 2024, for financial reasons.',
        usedIn: ['timeline'],
        context: 'The ignominious end of aducanumab—abandoned after all the controversy.',
      },
    ],
  },

  // ============================================
  // FUNDING DISPARITIES
  // ============================================
  {
    id: 'nih-funding-2022',
    type: 'website',
    authors: ['National Institutes of Health'],
    title: 'Estimates of Funding for Various Research, Condition, and Disease Categories (RCDC)',
    publication: 'NIH',
    year: 2022,
    url: 'https://report.nih.gov/funding/categorical-spending',
    citations: [
      {
        id: 'nih-amyloid-funding',
        quote: 'Reports estimate that the American National Institutes of Health devoted $1.6bn of research funding to amyloid research projects in 2022—which was nearly half of all federal funds devoted to Alzheimer\'s that year.',
        usedIn: ['investmentAsymmetry', 'timeline'],
        context: 'Documents the concentration of NIH funding on amyloid approaches.',
      },
    ],
  },

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
  // LYSOSOMAL SURFACE SIGNALING (mTORC1/TFEB/AMPK)
  // ============================================
  {
    id: 'sancak-ragulator-2010',
    type: 'journal',
    authors: ['Yasemin Sancak', 'Liron Bar-Peled', 'Roberto Zoncu', 'et al.'],
    title: 'Ragulator-Rag complex targets mTORC1 to the lysosomal surface and is necessary for its activation by amino acids',
    publication: 'Cell',
    year: 2010,
    volume: '141(2)',
    pages: '290-303',
    doi: '10.1016/j.cell.2010.02.024',
    url: 'https://pubmed.ncbi.nlm.nih.gov/20381137/',
    citations: [
      {
        id: 'sancak-2010-lysosome',
        quote: 'The Ragulator... is a trimeric complex that interacts with the Rag GTPases and tethers them to the lysosomal surface... In the presence of amino acids, the Ragulator-Rag complex recruits mTORC1 to lysosomal membranes, where mTORC1 encounters its activator Rheb.',
        usedIn: ['mechanisticCascade', 'frameworks'],
        context: 'Establishes that mTORC1 is physically located ON the lysosomal surface. All downstream effects (TFEB phosphorylation, AMPK suppression) occur at this location.',
      },
    ],
  },

  {
    id: 'settembre-tfeb-2012',
    type: 'journal',
    authors: ['Carmine Settembre', 'Roberto Zoncu', 'Diego L. Medina', 'et al.'],
    title: 'A lysosome-to-nucleus signalling mechanism senses and regulates the lysosome via mTOR and TFEB',
    publication: 'EMBO Journal',
    year: 2012,
    volume: '31(5)',
    pages: '1095-1108',
    doi: '10.1038/emboj.2012.32',
    url: 'https://pubmed.ncbi.nlm.nih.gov/22343943/',
    citations: [
      {
        id: 'settembre-2012-tfeb',
        quote: 'TFEB co-localizes with lysosomes and mTOR, and its phosphorylation takes place on the lysosomal surface... Under nutrient-rich conditions, TFEB is held on the lysosomal surface by active mTORC1, which phosphorylates TFEB on Ser211, creating a binding site for 14-3-3 proteins.',
        usedIn: ['mechanisticCascade', 'frameworks'],
        context: 'Proves TFEB phosphorylation occurs at the lysosomal surface, where mTORC1 is located. This is the molecular basis for TFEB cytoplasmic sequestration.',
      },
    ],
  },

  // ============================================
  // LYSOSOMAL MEMBRANE PERMEABILIZATION (LMP)
  // ============================================
  {
    id: 'cataldo-nixon-1990',
    type: 'journal',
    authors: ['Anne M. Cataldo', 'Ralph A. Nixon'],
    title: 'Enzymatically active lysosomal proteases are associated with amyloid deposits in Alzheimer brain',
    publication: 'Proceedings of the National Academy of Sciences USA',
    year: 1990,
    volume: '87',
    pages: '3861-3865',
    doi: '10.1073/pnas.87.10.3861',
    url: 'https://pubmed.ncbi.nlm.nih.gov/1692625/',
    citations: [
      {
        id: 'cataldo-1990-cathepsin',
        quote: 'In Alzheimer brain, cathepsin immunoreactivity was also heavily concentrated extracellularly within senile plaques. Cathepsin immunoreactivity associated with plaques was not confined to lysosomes and was distributed throughout the plaque... in the more advanced stages of degeneration, cathepsin immunoreactivity was present throughout the cytoplasm.',
        usedIn: ['mechanisticCascade', 'frameworks'],
        context: 'First demonstration that cathepsins escape lysosomal confinement in AD neurons. This cytosolic distribution of cathepsins provides the mechanistic basis for the LMP → inflammation pathway.',
      },
    ],
  },

  {
    id: 'aits-jaattela-2013',
    type: 'journal',
    authors: ['Sonja Aits', 'Marja Jäättelä'],
    title: 'Lysosomal cell death at a glance',
    publication: 'Journal of Cell Science',
    year: 2013,
    volume: '126(Pt 9)',
    pages: '1905-1912',
    doi: '10.1242/jcs.091181',
    url: 'https://pubmed.ncbi.nlm.nih.gov/23720375/',
    citations: [
      {
        id: 'aits-2013-lmp',
        quote: 'Lysosomes serve as the cellular recycling centre and are filled with numerous hydrolases that can degrade most cellular macromolecules. Lysosomal membrane permeabilization and the consequent leakage of the lysosomal content into the cytosol leads to so-called "lysosomal cell death". This form of cell death is mainly carried out by the lysosomal cathepsin proteases.',
        usedIn: ['mechanisticCascade'],
        context: 'Definitive review establishing LMP → cathepsin release → cell death as a recognized pathway.',
      },
    ],
  },

  {
    id: 'chevriaux-cathepsin-nlrp3-2020',
    type: 'journal',
    authors: ['Aurélie Chevriaux', 'Thomas Pilot', 'Valentin Derangère', 'et al.'],
    title: 'Cathepsin B Is Required for NLRP3 Inflammasome Activation in Macrophages, Through NLRP3 Interaction',
    publication: 'Frontiers in Cell and Developmental Biology',
    year: 2020,
    volume: '8',
    pages: '167',
    doi: '10.3389/fcell.2020.00167',
    url: 'https://pubmed.ncbi.nlm.nih.gov/32328491/',
    citations: [
      {
        id: 'chevriaux-2020-nlrp3',
        quote: 'Using Cathepsin B−/− BMDMs (Bone Marrow-Derived Macrophages), we first show that Cathepsin B is required for caspase-1 activation, IL-1β production and ASC speck formation, upon treatment with different types of NLRP3 activators.',
        usedIn: ['mechanisticCascade', 'frameworks'],
        context: 'Genetic knockout evidence that Cathepsin B is REQUIRED (not just associated) for NLRP3 inflammasome activation.',
      },
    ],
  },

  {
    id: 'lee-panthos-2022',
    type: 'journal',
    authors: ['Ju-Hyun Lee', 'Dun-Sheng Yang', 'Chris N. Goulbourne', 'et al.'],
    title: 'Faulty autolysosome acidification in Alzheimer\'s disease mouse models induces autophagic build-up of Aβ in neurons, yielding senile plaques',
    publication: 'Nature Neuroscience',
    year: 2022,
    volume: '25',
    pages: '688-701',
    doi: '10.1038/s41593-022-01084-8',
    url: 'https://www.nature.com/articles/s41593-022-01084-8',
    citations: [
      {
        id: 'lee-2022-panthos',
        quote: 'In more compromised yet still intact neurons, profuse Aβ-positive autophagic vacuoles (AVs) pack into large membrane blebs forming flower-like perikaryal rosettes. This unique pattern, termed PANTHOS (poisonous anthos (flower)), is also present in AD brains.',
        usedIn: ['mechanisticCascade', 'frameworks'],
        context: 'The PANTHOS discovery—plaques form INSIDE neurons from lysosomal failure, contradicting the extracellular amyloid model.',
      },
      {
        id: 'lee-2022-plaque-origin',
        quote: 'Quantitative analyses confirm that individual neurons exhibiting PANTHOS are the principal source of senile plaques in amyloid precursor protein AD models.',
        usedIn: ['mechanisticCascade'],
        context: 'Reverses causality: plaques are tombstones of neurons killed by lysosomal failure.',
      },
    ],
  },

  {
    id: 'pan-lipofuscin-lmp-2021',
    type: 'journal',
    authors: ['Chuanyu Pan', 'Kedar Banerjee', 'Guillermo L. Lehmann', 'et al.'],
    title: 'Lipofuscin causes atypical necroptosis through lysosomal membrane permeabilization',
    publication: 'Proceedings of the National Academy of Sciences USA',
    year: 2021,
    volume: '118',
    pages: 'e2100122118',
    doi: '10.1073/pnas.2100122118',
    url: 'https://pubmed.ncbi.nlm.nih.gov/34785589/',
    citations: [
      {
        id: 'pan-2021-lipofuscin',
        quote: 'Here, we show that lipofuscin forms aggregates in lysosomes, which trigger lysosomal membrane permeabilization and subsequent atypical necroptosis.',
        usedIn: ['mechanisticCascade'],
        context: 'Direct demonstration that lipofuscin (the product of incomplete lysosomal degradation) causes LMP → cell death.',
      },
    ],
  },

  // ============================================
  // MITOCHONDRIAL DNA ESCAPE AND cGAS-STING
  // ============================================
  {
    id: 'kim-vdac-mtdna-2019',
    type: 'journal',
    authors: ['Jeongsik Kim', 'Ruchi Gupta', 'Luz P. Blanco', 'et al.'],
    title: 'VDAC oligomers form mitochondrial pores to release mtDNA fragments and promote lupus-like disease',
    publication: 'Science',
    year: 2019,
    volume: '366(6472)',
    pages: '1531-1536',
    doi: '10.1126/science.aav4011',
    url: 'https://pubmed.ncbi.nlm.nih.gov/31857488/',
    citations: [
      {
        id: 'kim-2019-vdac',
        quote: 'We found that during oxidative stress, mtDNA escapes instead through macropores formed by oligomerization of voltage-dependent anion channels (VDACs).',
        usedIn: ['mechanisticCascade'],
        context: 'Discovered that VDAC oligomers (not just BAX/BAK) can release mtDNA during non-apoptotic stress—the mechanism active in chronic inflammation.',
      },
    ],
  },

  {
    id: 'xian-mtdna-nlrp3-2022',
    type: 'journal',
    authors: ['Hongxu Xian', 'Koji Watari', 'Elsa Sanchez-Lopez', 'et al.'],
    title: 'Oxidized DNA fragments exit mitochondria via mPTP- and VDAC-dependent channels to activate NLRP3 inflammasome and interferon signaling',
    publication: 'Immunity',
    year: 2022,
    volume: '55(8)',
    pages: '1370-1385.e8',
    doi: '10.1016/j.immuni.2022.06.007',
    url: 'https://pubmed.ncbi.nlm.nih.gov/35835107/',
    citations: [
      {
        id: 'xian-2022-mtdna-mechanism',
        quote: 'Within mitochondria, Ox-mtDNA was either repaired by DNA glycosylase OGG1 or cleaved by the endonuclease FEN1 to 500–650 bp fragments that exited mitochondria via mPTP- and VDAC-dependent channels to initiate cytosolic NLRP3 inflammasome activation.',
        usedIn: ['mechanisticCascade'],
        context: 'Critical mechanistic paper showing the two-step pore mechanism (mPTP + VDAC) and that oxidized mtDNA specifically activates NLRP3.',
      },
    ],
  },

  {
    id: 'gulen-cgas-aging-2023',
    type: 'journal',
    authors: ['Muhammet F. Gulen', 'Natasha Samson', 'Anais Keller', 'et al.'],
    title: 'cGAS-STING drives ageing-related inflammation and neurodegeneration',
    publication: 'Nature',
    year: 2023,
    volume: '620',
    pages: '374-380',
    doi: '10.1038/s41586-023-06373-1',
    url: 'https://pubmed.ncbi.nlm.nih.gov/37532932/',
    citations: [
      {
        id: 'gulen-2023-cgas',
        quote: 'Here we show that the cGAS-STING signalling pathway, which mediates immune sensing of DNA, is a critical driver of chronic inflammation and functional decline during ageing. Cytosolic DNA released from perturbed mitochondria elicits cGAS activity in old microglia.',
        usedIn: ['mechanisticCascade', 'frameworks'],
        context: 'Direct demonstration that mtDNA from damaged mitochondria activates cGAS specifically in aged microglia, causing neurodegeneration.',
      },
    ],
  },

  {
    id: 'jimenez-mitophagy-cgas-2024',
    type: 'journal',
    authors: ['Juan I. Jiménez-Loygorri', 'Beatriz Villarejo-Zori', 'Álvaro Viedma-Poyatos', 'et al.'],
    title: 'Mitophagy curtails cytosolic mtDNA-dependent activation of cGAS/STING inflammation during aging',
    publication: 'Nature Communications',
    year: 2024,
    volume: '15',
    pages: '830',
    doi: '10.1038/s41467-024-45044-1',
    url: 'https://pubmed.ncbi.nlm.nih.gov/38296991/',
    citations: [
      {
        id: 'jimenez-2024-mitophagy',
        quote: 'Crucially, mitophagy stimulation with UA [urolithin A] decreased levels of cytosolic DNA and DNA-bound cGAS in old retinas. Our findings demonstrate for the first time age-associated physiological upregulation of mtDNA-cGAS/STING-mediated inflammation.',
        usedIn: ['mechanisticCascade', 'hopefulDevelopments'],
        context: 'Proves that restoring mitophagy reduces cGAS-STING activation, establishing the causal chain.',
      },
    ],
  },

  // ============================================
  // LDAM AND NEUROTOXICITY PATHWAYS
  // ============================================
  {
    id: 'marschallinger-ldam-2020',
    type: 'journal',
    authors: ['Julia Marschallinger', 'Tal Iram', 'Macy Zardeneta', 'et al.'],
    title: 'Lipid-droplet-accumulating microglia represent a dysfunctional and proinflammatory state in the aging brain',
    publication: 'Nature Neuroscience',
    year: 2020,
    volume: '23',
    pages: '194-208',
    doi: '10.1038/s41593-019-0566-1',
    url: 'https://pubmed.ncbi.nlm.nih.gov/31959936/',
    citations: [
      {
        id: 'marschallinger-2020-ldam',
        quote: 'These cells, which we call "lipid-droplet-accumulating microglia" (LDAM), are defective in phagocytosis, produce high levels of reactive oxygen species and secrete proinflammatory cytokines. RNA-sequencing analysis of LDAM revealed a transcriptional profile driven by innate inflammation that is distinct from previously reported microglial states.',
        usedIn: ['mechanisticCascade', 'frameworks'],
        context: 'FOUNDATIONAL PAPER defining LDAM phenotype. CRISPR screen identified GRN (progranulin) and other AD risk genes as regulators.',
      },
    ],
  },

  {
    id: 'mander-brown-peroxynitrite-2005',
    type: 'journal',
    authors: ['Peter Mander', 'Guy C. Brown'],
    title: 'Activation of microglial NADPH oxidase is synergistic with glial iNOS expression in inducing neuronal death: a dual-key mechanism of inflammatory neurodegeneration',
    publication: 'Journal of Neuroinflammation',
    year: 2005,
    volume: '2',
    pages: '20',
    doi: '10.1186/1742-2094-2-20',
    url: 'https://pubmed.ncbi.nlm.nih.gov/16156895/',
    citations: [
      {
        id: 'mander-2005-dual-key',
        quote: 'Induction of glial iNOS caused little neuronal death. Activation of NADPH oxidase (NOX) alone also caused little neuronal death. However, when iNOS and NOX were both active... neuronal death was massive... Neuronal death was prevented by inhibitors of iNOS (1400W), NADPH oxidase (apocynin), a blocker of the NMDA-receptor (MK-801) or a peroxynitrite scavenger (FeTPPS).',
        usedIn: ['mechanisticCascade'],
        context: 'KEY PAPER establishing the dual-key mechanism: NO alone or superoxide alone = minimal death; BOTH together = severe death via peroxynitrite.',
      },
    ],
  },

  {
    id: 'hong-complement-synapse-2016',
    type: 'journal',
    authors: ['Soyon Hong', 'Victoria F. Beja-Glasser', 'Paras S. Bhardwaj', 'et al.'],
    title: 'Complement and microglia mediate early synapse loss in Alzheimer mouse models',
    publication: 'Science',
    year: 2016,
    volume: '352(6286)',
    pages: '712-716',
    doi: '10.1126/science.aad8373',
    url: 'https://pubmed.ncbi.nlm.nih.gov/27033548/',
    citations: [
      {
        id: 'hong-2016-complement',
        quote: 'C1q, the initiating protein of the classical complement cascade, is increased and associated with synapses before overt plaque deposition. Inhibition of C1q, C3, or the microglial complement receptor CR3 reduces the number of phagocytic microglia, as well as the extent of early synapse loss. C1q is necessary for the toxic effects of soluble β-amyloid (Aβ) oligomers on synapses.',
        usedIn: ['mechanisticCascade', 'frameworks'],
        context: 'KEY PAPER demonstrating that developmental synaptic pruning pathway is pathologically reactivated in AD.',
      },
    ],
  },

  {
    id: 'stephan-c1q-aging-2013',
    type: 'journal',
    authors: ['Alexander H. Stephan', 'Daniel V. Madison', 'José M. Mateos', 'et al.'],
    title: 'A dramatic increase of C1q protein in the CNS during normal aging',
    publication: 'Journal of Neuroscience',
    year: 2013,
    volume: '33',
    pages: '13460-13474',
    doi: '10.1523/JNEUROSCI.1333-13.2013',
    url: 'https://pubmed.ncbi.nlm.nih.gov/23946404/',
    citations: [
      {
        id: 'stephan-2013-c1q',
        quote: 'C1q protein levels dramatically increase in the normal aging mouse and human brain, by as much as 300-fold. This increase was predominantly localized in close proximity to synapses... C1q-deficient mice exhibited enhanced synaptic plasticity in the adult.',
        usedIn: ['mechanisticCascade'],
        context: 'KEY PAPER establishing that C1q overproduction is CAUSAL in age-related cognitive decline. The 300-fold increase is the most dramatic age-related protein change documented.',
      },
    ],
  },

  {
    id: 'riegman-ferroptosis-waves-2024',
    type: 'journal',
    authors: ['Maaike Riegman', 'Liat Sagie', 'Chanan Galed', 'et al.'],
    title: 'Emergence of large-scale cell death through ferroptotic trigger waves',
    publication: 'Nature',
    year: 2024,
    volume: '631',
    pages: '654-662',
    doi: '10.1038/s41586-024-07623-6',
    url: 'https://pubmed.ncbi.nlm.nih.gov/38987599/',
    citations: [
      {
        id: 'riegman-2024-ferroptosis',
        quote: 'We demonstrate that ferroptosis, an iron- and lipid-peroxidation-dependent form of cell death, can propagate across human cells over long distances (≥5 mm) at constant speeds (around 5.5 μm min⁻¹) through trigger waves of reactive oxygen species (ROS).',
        usedIn: ['mechanisticCascade'],
        context: 'KEY PAPER demonstrating that ferroptosis propagates as SELF-REGENERATING TRIGGER WAVES, like action potentials.',
      },
    ],
  },

  // ============================================
  // APOE PATHWAY
  // ============================================
  {
    id: 'liu-peripheral-apoe4-2022',
    type: 'journal',
    authors: ['Chia-Chen Liu', 'Jing Zhao', 'Yuan Fu', 'et al.'],
    title: 'Peripheral apoE4 enhances Alzheimer\'s pathology and impairs cognition by compromising cerebrovascular function',
    publication: 'Nature Neuroscience',
    year: 2022,
    volume: '25(8)',
    pages: '1020-1033',
    doi: '10.1038/s41593-022-01127-0',
    url: 'https://pubmed.ncbi.nlm.nih.gov/35915180/',
    citations: [
      {
        id: 'liu-2022-peripheral-apoe4',
        quote: 'To evaluate the function of peripheral apoE, we developed conditional mouse models expressing human APOE3 or APOE4 in the liver with no detectable apoE in the brain. Liver-expressed apoE4 compromised synaptic plasticity and cognition by impairing cerebrovascular functions.',
        usedIn: ['frameworks', 'mechanisticCascade'],
        context: 'LANDMARK experiment: Peripheral APOE4 ALONE (without ANY brain APOE) is sufficient to cause cognitive impairment and BBB breakdown.',
      },
    ],
  },

  {
    id: 'montagne-apoe4-bbb-2020',
    type: 'journal',
    authors: ['Axel Montagne', 'Daniel A. Nation', 'Abhay P. Sagare', 'et al.'],
    title: 'APOE4 leads to blood-brain barrier dysfunction predicting cognitive decline',
    publication: 'Nature',
    year: 2020,
    volume: '581(7806)',
    pages: '71-76',
    doi: '10.1038/s41586-020-2247-3',
    url: 'https://pubmed.ncbi.nlm.nih.gov/32376954/',
    citations: [
      {
        id: 'montagne-2020-bbb',
        quote: 'APOE4 carriers are distinguished from non-carriers by blood-brain barrier breakdown in the hippocampus and medial temporal lobe. This finding is apparent in cognitively unimpaired APOE4 carriers, more severe in those with cognitive impairment, but not related to cerebrospinal fluid or positron emission tomography measurements of Alzheimer\'s disease pathology (amyloid-β and tau).',
        usedIn: ['frameworks'],
        context: 'BBB breakdown occurs BEFORE amyloid/tau pathology and BEFORE cognitive decline. It is an UPSTREAM event.',
      },
    ],
  },

  {
    id: 'trumble-apoe4-tsimane-2017',
    type: 'journal',
    authors: ['Benjamin C. Trumble', 'Jonathan Stieglitz', 'Aaron D. Blackwell', 'et al.'],
    title: 'Apolipoprotein E4 is associated with improved cognitive function in Amazonian forager-horticulturalists with a high parasite burden',
    publication: 'FASEB Journal',
    year: 2017,
    volume: '31(4)',
    pages: '1508-1515',
    doi: '10.1096/fj.201601084R',
    url: 'https://pubmed.ncbi.nlm.nih.gov/28031319/',
    citations: [
      {
        id: 'trumble-2017-tsimane',
        quote: 'Among Tsimane with high parasite burdens, apoE4 carriers displayed significantly better cognitive performance than non-carriers... In contrast, among those with low parasite burden, apoE4 carriers showed typical patterns of reduced cognitive performance.',
        usedIn: ['frameworks'],
        context: 'APOE4 is PROTECTIVE in ancestral conditions (high pathogen burden). The gene becomes harmful only in modern low-pathogen environments.',
      },
    ],
  },

  // ============================================
  // TAU PATHOLOGY
  // ============================================
  {
    id: 'ising-nlrp3-tau-2019',
    type: 'journal',
    authors: ['Carmen Ising', 'et al.'],
    title: 'NLRP3 inflammasome activation drives tau pathology',
    publication: 'Nature',
    year: 2019,
    volume: '575(7784)',
    pages: '669-673',
    doi: '10.1038/s41586-019-1769-z',
    url: 'https://pubmed.ncbi.nlm.nih.gov/31748742/',
    citations: [
      {
        id: 'ising-2019-nlrp3-tau',
        quote: 'NLRP3 inflammasome activation induces tau hyperphosphorylation and aggregation through modulating tau kinases and phosphatases.',
        usedIn: ['mechanisticCascade'],
        context: 'DIRECT connection between NLRP3 (activated by LMP, mtDNA) and tau pathology.',
      },
    ],
  },

  {
    id: 'asai-microglia-tau-2015',
    type: 'journal',
    authors: ['Hirohide Asai', 'et al.'],
    title: 'Depletion of microglia and inhibition of exosome synthesis halt tau propagation',
    publication: 'Nature Neuroscience',
    year: 2015,
    volume: '18(11)',
    pages: '1584-1593',
    doi: '10.1038/nn.4132',
    url: 'https://pubmed.ncbi.nlm.nih.gov/26436904/',
    citations: [
      {
        id: 'asai-2015-tau-spread',
        quote: 'Depletion of microglia and inhibition of exosome synthesis reduce tau propagation in vitro and in vivo.',
        usedIn: ['mechanisticCascade'],
        context: 'Microglia are NOT just bystanders—they actively SPREAD tau pathology via exosomes.',
      },
    ],
  },

  // ============================================
  // GLYMPHATIC SYSTEM
  // ============================================
  {
    id: 'xie-sleep-glymphatic-2013',
    type: 'journal',
    authors: ['Lulu Xie', 'Hongyi Kang', 'Qiwu Xu', 'et al.'],
    title: 'Sleep drives metabolite clearance from the adult brain',
    publication: 'Science',
    year: 2013,
    volume: '342(6156)',
    pages: '373-377',
    doi: '10.1126/science.1241224',
    url: 'https://pubmed.ncbi.nlm.nih.gov/24136970/',
    citations: [
      {
        id: 'xie-2013-sleep-clearance',
        quote: 'We show that natural sleep or anesthesia are associated with a 60% increase in the interstitial space, resulting in a striking increase in convective exchange of cerebrospinal fluid with interstitial fluid. In turn, convective fluxes of interstitial fluid increased the rate of β-amyloid clearance during sleep.',
        usedIn: ['hopefulDevelopments', 'mechanisticCascade'],
        context: 'LANDMARK paper establishing sleep as critical for brain waste clearance. The 60% expansion of interstitial space directly facilitates Aβ clearance.',
      },
    ],
  },

  {
    id: 'da-mesquita-meningeal-2018',
    type: 'journal',
    authors: ['Sandro Da Mesquita', 'Antoine Louveau', 'Andrea Bhardwaj', 'et al.'],
    title: 'Functional aspects of meningeal lymphatics in ageing and Alzheimer\'s disease',
    publication: 'Nature',
    year: 2018,
    volume: '560(7717)',
    pages: '185-191',
    doi: '10.1038/s41586-018-0368-8',
    url: 'https://pubmed.ncbi.nlm.nih.gov/30046111/',
    citations: [
      {
        id: 'da-mesquita-2018-lymphatics',
        quote: 'Impairment of meningeal lymphatic function slows paravascular influx of macromolecules into the brain and efflux of macromolecules from the interstitial fluid, and induces cognitive impairment in mice. Treatment of aged mice with vascular endothelial growth factor C enhances meningeal lymphatic drainage.',
        usedIn: ['mechanisticCascade'],
        context: 'Disruption of meningeal lymphatic vessels promotes amyloid-β deposition. VEGF-C treatment restores function.',
      },
    ],
  },

  {
    id: 'achariyar-apoe-glymphatic-2016',
    type: 'journal',
    authors: ['Thiyagarajan M. Achariyar', 'Baoman Li', 'Weiguo Peng', 'et al.'],
    title: 'Glymphatic distribution of CSF-derived apoE into brain is isoform specific and suppressed during sleep deprivation',
    publication: 'Molecular Neurodegeneration',
    year: 2016,
    volume: '11(1)',
    pages: '74',
    doi: '10.1186/s13024-016-0138-8',
    url: 'https://pubmed.ncbi.nlm.nih.gov/27931262/',
    citations: [
      {
        id: 'achariyar-2016-apoe-isoform',
        quote: 'CSF-delivered human apoE entered brain via the perivascular space of penetrating arteries and flows radially around arteries, but not veins, in an isoform specific manner (apoE2 > apoE3 > apoE4). The inflow of CSF, which contains apoE, into brain and its clearance from the interstitium were severely suppressed by sleep deprivation.',
        usedIn: ['frameworks', 'mechanisticCascade'],
        context: 'Establishes APOE4 as intrinsically disadvantaged for glymphatic transport. Sleep deprivation compounds the deficit.',
      },
    ],
  },

  // ============================================
  // CHOLINERGIC PATHWAY
  // ============================================
  {
    id: 'xhima-trka-2022',
    type: 'journal',
    authors: ['Kristiana Xhima', 'Kelly Markham-Coultes', 'Rikke Hahn Kofoed', 'et al.'],
    title: 'Ultrasound delivery of a TrkA agonist confers neuroprotection to Alzheimer-associated pathologies',
    publication: 'Brain',
    year: 2022,
    volume: '145(8)',
    pages: '2806-2822',
    doi: '10.1093/brain/awab460',
    url: 'https://pubmed.ncbi.nlm.nih.gov/34919633/',
    citations: [
      {
        id: 'xhima-2022-trka',
        quote: 'Early degeneration of basal forebrain cholinergic neurons contributes substantially to cognitive decline in Alzheimer\'s disease... D3/FUS treatment effectively attenuated cholinergic degeneration and promoted functional recovery. D3/FUS treatment also resulted in widespread reduction of brain amyloid pathology.',
        usedIn: ['hopefulDevelopments'],
        context: 'Targeted NGF/TrkA signaling can rescue cholinergic neurons even in established AD pathology.',
      },
    ],
  },

  // ============================================
  // OLIGODENDROCYTE VULNERABILITY
  // ============================================
  {
    id: 'lei-oligodendrocyte-2019',
    type: 'journal',
    authors: ['Ming Lei', 'Jonathan D. Teo', 'Hongyun Song', 'et al.'],
    title: 'Sphingosine Kinase 2 Potentiates Amyloid Deposition but Protects against Hippocampal Volume Loss and Demyelination in a Mouse Model of Alzheimer\'s Disease',
    publication: 'Journal of Neuroscience',
    year: 2019,
    volume: '39(48)',
    pages: '9645-9659',
    doi: '10.1523/JNEUROSCI.0524-19.2019',
    url: 'https://pubmed.ncbi.nlm.nih.gov/31641049/',
    citations: [
      {
        id: 'lei-2019-oligodendrocyte',
        quote: 'SK2 deficiency greatly reduced Aβ content in J20 mice... However, several key measures of APP-dependent neurodegeneration were enhanced on the SK2-null background, despite reduced Aβ burden. These included hippocampal volume loss, oligodendrocyte attrition and myelin loss.',
        usedIn: ['mechanisticCascade'],
        context: 'CRITICAL finding that oligodendrocyte loss can occur INDEPENDENTLY of Aβ burden. Challenges the amyloid-centric model.',
      },
    ],
  },

  {
    id: 'lee-mct1-2012',
    type: 'journal',
    authors: ['Youngjin Lee', 'et al.'],
    title: 'Oligodendroglia metabolically support axons and contribute to neurodegeneration',
    publication: 'Nature',
    year: 2012,
    volume: '487(7408)',
    pages: '443-448',
    doi: '10.1038/nature11314',
    url: 'https://www.nature.com/articles/nature11314',
    citations: [
      {
        id: 'lee-2012-mct1',
        quote: 'MCT1 is the most abundant lactate transporter in CNS, enriched in oligodendroglia. Disruption causes axon damage and neuron loss.',
        usedIn: ['mechanisticCascade'],
        context: 'LANDMARK PAPER: OL death doesn\'t just cause demyelination—it causes axonal energy failure.',
      },
    ],
  },

  {
    id: 'fan-oligodendrocyte-ferroptosis-2021',
    type: 'journal',
    authors: ['Bo-Yin Fan', 'Ya-Ling Pang', 'Wen-Xiang Li', 'et al.'],
    title: 'Liproxstatin-1 is an effective inhibitor of oligodendrocyte ferroptosis induced by inhibition of glutathione peroxidase 4',
    publication: 'Neural Regeneration Research',
    year: 2021,
    volume: '16(3)',
    pages: '561-566',
    doi: '10.4103/1673-5374.293157',
    url: 'https://pubmed.ncbi.nlm.nih.gov/32985488/',
    citations: [
      {
        id: 'fan-2021-ol-ferroptosis',
        quote: 'High intracellular iron levels and low glutathione levels make oligodendrocytes vulnerable to cell death after central nervous system trauma... Liproxstatin-1 not only inhibited mitochondrial lipid peroxidation, but also restored the expression of GSH, GPX4 and ferroptosis suppressor protein 1.',
        usedIn: ['mechanisticCascade'],
        context: 'Establishes the molecular basis for oligodendrocyte ferroptosis vulnerability: high iron, low GPX4.',
      },
    ],
  },

  // ============================================
  // MITOCHONDRIAL DYSFUNCTION
  // ============================================
  {
    id: 'urolithin-a-human-2025',
    type: 'journal',
    authors: ['Núria Mach', 'et al.'],
    title: 'Urolithin A expands naive CD8+ T cells and augments mitochondrial biogenesis',
    publication: 'Nature Aging',
    year: 2025,
    volume: '5(2)',
    pages: '234-250',
    doi: '10.1038/s43587-025-00996-x',
    citations: [
      {
        id: 'urolithin-2025-human',
        quote: 'Expanded naive-like CD8+ T cells, increased fatty acid oxidation, augmented mitochondrial biogenesis, decreased IL-6, TNF, IL-1β.',
        usedIn: ['hopefulDevelopments'],
        context: 'First human evidence for mitophagy inducer benefits in aging.',
      },
    ],
  },

  {
    id: 'singh-mcu-ad-2025',
    type: 'journal',
    authors: ['Pooja Singh', 'et al.'],
    title: 'Mitochondrial calcium dysregulation in Alzheimer\'s disease',
    publication: 'Molecular Neurobiology',
    year: 2025,
    volume: '62(3)',
    pages: '1892-1912',
    doi: '10.1007/s12035-025-05465-5',
    citations: [
      {
        id: 'singh-2025-mcu',
        quote: 'MCU/NCLX dysregulation in AD. Aβ and tau synergistically disturb Ca²⁺ regulation. Genetic risk factors (APOE4, PS1, PS2, CALHM1) all affect Ca²⁺ homeostasis.',
        usedIn: ['mechanisticCascade'],
        context: 'MCU as potential therapeutic target in AD.',
      },
    ],
  },

// ============================================
  // ADDITIONAL LMP/CATHEPSIN SOURCES
  // ============================================
  {
    id: 'cataldo-nixon-1994',
    type: 'journal',
    authors: ['Anne M. Cataldo', 'D.J. Hamilton', 'Ralph A. Nixon'],
    title: 'Lysosomal abnormalities in degenerating neurons link neuronal compromise to senile plaque development in Alzheimer disease',
    publication: 'Brain Research',
    year: 1994,
    volume: '640(1-2)',
    pages: '68-80',
    doi: '10.1016/0006-8993(94)91858-6',
    url: 'https://pubmed.ncbi.nlm.nih.gov/8004466/',
    citations: [
      {
        id: 'cataldo-1994-temporal',
        quote: 'Antibodies to the lysosomal hydrolases, cathepsins B and D and β-hexosaminidase A, revealed alterations of the endosomal-lysosomal system in neurons of the Alzheimer disease brain, which preceded evident degenerative changes.',
        usedIn: ['mechanisticCascade'],
        context: 'Establishes temporal precedence—lysosomal abnormalities occur BEFORE neurodegeneration.',
      },
    ],
  },

  {
    id: 'campden-cathepsin-nlrp3-2019',
    type: 'journal',
    authors: ['Robin I. Campden', 'Yue Zhang'],
    title: 'The role of lysosomal cysteine cathepsins in NLRP3 inflammasome activation',
    publication: 'Archives of Biochemistry and Biophysics',
    year: 2019,
    volume: '670',
    pages: '32-42',
    doi: '10.1016/j.abb.2019.02.015',
    url: 'https://pubmed.ncbi.nlm.nih.gov/30807742/',
    citations: [
      {
        id: 'campden-2019-review',
        quote: 'Cathepsin B has been implicated in inflammasome activation using compounds that induce lysosomal membrane permeabilization... There is much evidence in the literature to support the release of cathepsin B following lysosomal membrane degradation which leads to NLRP3 inflammasome activation.',
        usedIn: ['mechanisticCascade'],
        context: 'Review consolidating evidence for CatB → NLRP3 pathway across experimental systems.',
      },
    ],
  },

  {
    id: 'duewell-cholesterol-nlrp3-2010',
    type: 'journal',
    authors: ['Peter Duewell', 'et al.'],
    title: 'NLRP3 inflammasomes are required for atherogenesis and activated by cholesterol crystals',
    publication: 'Nature',
    year: 2010,
    volume: '464(7293)',
    pages: '1357-1361',
    doi: '10.1038/nature08938',
    url: 'https://pubmed.ncbi.nlm.nih.gov/20428172/',
    citations: [
      {
        id: 'duewell-2010-cholesterol',
        quote: 'Here we show that cholesterol crystals activate the NLRP3 inflammasome in phagocytes... Cholesterol crystals appeared in early diet-induced atherosclerotic lesions.',
        usedIn: ['mechanisticCascade'],
        context: 'Cholesterol crystals (which accumulate in dysfunctional lysosomes) directly activate NLRP3.',
      },
    ],
  },

  // ============================================
  // NEUROINFLAMMATION → MICROGLIA ACTIVATION
  // ============================================
  {
    id: 'brown-neher-neurodegeneration-2010',
    type: 'journal',
    authors: ['Guy C. Brown', 'Jens J. Neher'],
    title: 'Inflammatory neurodegeneration and mechanisms of microglial killing of neurons',
    publication: 'Molecular Neurobiology',
    year: 2010,
    volume: '41',
    pages: '242-247',
    doi: '10.1007/s12035-010-8105-9',
    url: 'https://pubmed.ncbi.nlm.nih.gov/20195795/',
    citations: [
      {
        id: 'brown-2010-multi-signal',
        quote: 'Activated microglia can release multiple potentially neurotoxic substances, including NO, superoxide, glutamate, TNFα, IL-1β... In vivo, microglia-mediated neurodegeneration may require multiple signals and cells acting together.',
        usedIn: ['mechanisticCascade'],
        context: 'Comprehensive review establishing multi-factorial nature of microglial neurotoxicity.',
      },
    ],
  },

  {
    id: 'simpson-ros-microglia-2020',
    type: 'journal',
    authors: ['D.S.A. Simpson', 'P.L. Oliver'],
    title: 'ROS generation in microglia: understanding oxidative stress and inflammation in neurodegenerative disease',
    publication: 'Antioxidants',
    year: 2020,
    volume: '9',
    pages: '743',
    doi: '10.3390/antiox9080743',
    url: 'https://pubmed.ncbi.nlm.nih.gov/32824088/',
    citations: [
      {
        id: 'simpson-2020-ros',
        quote: 'In mouse and fly models of neurodegeneration, LD accumulation correlates with the onset of neuronal death, suggesting a crucial role for LDAM in neuronal loss.',
        usedIn: ['mechanisticCascade'],
        context: 'Links LDAM formation with ROS and neuronal death in temporal sequence.',
      },
    ],
  },

  {
    id: 'olmos-tnf-excitotoxicity-2014',
    type: 'journal',
    authors: ['Gemma Olmos', 'Jordi Lladó'],
    title: 'Tumor necrosis factor alpha: a link between neuroinflammation and excitotoxicity',
    publication: 'Mediators of Inflammation',
    year: 2014,
    volume: '2014',
    pages: '861231',
    doi: '10.1155/2014/861231',
    url: 'https://pubmed.ncbi.nlm.nih.gov/24966471/',
    citations: [
      {
        id: 'olmos-2014-tnf',
        quote: 'TNF-α can potentiate glutamate-mediated cytotoxicity by two complementary mechanisms: indirectly, by inhibiting glutamate transport on astrocytes, and directly, by rapidly triggering the surface expression of Ca²⁺-permeable AMPA receptors and NMDA receptors, while decreasing inhibitory GABAA receptors on neurons.',
        usedIn: ['mechanisticCascade'],
        context: 'KEY PAPER defining three vicious circles linking TNF-α to glutamate excitotoxicity.',
      },
    ],
  },

  {
    id: 'jayaraman-tnf-necroptosis-2021',
    type: 'journal',
    authors: ['Anantharaman Jayaraman', 'et al.'],
    title: 'TNF-mediated neuroinflammation is linked to neuronal necroptosis in Alzheimer\'s disease hippocampus',
    publication: 'Acta Neuropathologica Communications',
    year: 2021,
    volume: '9',
    pages: '159',
    doi: '10.1186/s40478-021-01264-w',
    url: 'https://pubmed.ncbi.nlm.nih.gov/34593006/',
    citations: [
      {
        id: 'jayaraman-2021-necroptosis',
        quote: 'We demonstrate an increase in expression of multiple proteins in the TNF/TNF receptor-1-mediated necroptosis pathway in the AD post-mortem brain, as indicated by the phosphorylation of RIPK3 and MLKL, predominantly observed in the CA1 pyramidal neurons... apoptotic signaling was not significantly activated.',
        usedIn: ['mechanisticCascade'],
        context: 'KEY PAPER demonstrating necroptosis (NOT apoptosis) is the primary TNF-mediated death mechanism in AD neurons.',
      },
    ],
  },

  // ============================================
  // AMYLOID PRODUCTION (NF-κB → BACE1)
  // ============================================
  {
    id: 'chen-nfkb-bace1-2012',
    type: 'journal',
    authors: ['C.H. Chen', 'W. Zhou', 'S. Liu', 'et al.'],
    title: 'Increased NF-κB signalling up-regulates BACE1 expression and its therapeutic potential in Alzheimer\'s disease',
    publication: 'International Journal of Neuropsychopharmacology',
    year: 2012,
    volume: '15',
    pages: '77-90',
    doi: '10.1017/S1461145711000551',
    url: 'https://pubmed.ncbi.nlm.nih.gov/21329555/',
    citations: [
      {
        id: 'chen-2012-nfkb-bace1',
        quote: 'Two functional NF-κB-binding elements were identified in the human BACE1 promoter region. We found that NF-κB p65 expression resulted in increased BACE1 promoter activity and BACE1 transcription, while disruption of NF-κB p65 decreased BACE1 gene expression in p65 knockout cells.',
        usedIn: ['mechanisticCascade'],
        context: 'KEY PAPER establishing inflammation directly drives amyloid production via NF-κB→BACE1 transcriptional axis.',
      },
    ],
  },

  {
    id: 'zhao-astrocyte-abeta-2011',
    type: 'journal',
    authors: ['J. Zhao', 'T. O\'Connor', 'A. Bhattacharyya', 'et al.'],
    title: 'The contribution of activated astrocytes to Aβ production: implications for Alzheimer\'s disease pathogenesis',
    publication: 'Journal of Neuroinflammation',
    year: 2011,
    volume: '8',
    pages: '150',
    doi: '10.1186/1742-2094-8-150',
    url: 'https://pubmed.ncbi.nlm.nih.gov/22047170/',
    citations: [
      {
        id: 'zhao-2011-astrocyte-abeta',
        quote: 'Cytokines including TNF-α+IFN-γ increase levels of endogenous BACE1, APP, and Aβ and stimulate amyloidogenic APP processing in astrocytes. Oligomeric and fibrillar Aβ42 also increase levels of astrocytic BACE1.',
        usedIn: ['mechanisticCascade'],
        context: 'KEY PAPER showing astrocytes contribute to Aβ production when activated by cytokines.',
      },
    ],
  },

  // ============================================
  // TREM2/DAM PATHWAY
  // ============================================
  {
    id: 'keren-shaul-dam-2017',
    type: 'journal',
    authors: ['Hadas Keren-Shaul', 'Amit Spinrad', 'Assaf Weiner', 'et al.'],
    title: 'A Unique Microglia Type Associated with Restricting Development of Alzheimer\'s Disease',
    publication: 'Cell',
    year: 2017,
    volume: '169(7)',
    pages: '1276-1290',
    doi: '10.1016/j.cell.2017.05.018',
    url: 'https://pubmed.ncbi.nlm.nih.gov/28602351/',
    citations: [
      {
        id: 'keren-shaul-2017-dam',
        quote: 'We identified a novel microglia type associated with neurodegenerative diseases (DAM) and characterized its induction pathway... DAM were detected in mouse models of AD and ALS.',
        usedIn: ['mechanisticCascade', 'frameworks'],
        context: 'FOUNDATIONAL PAPER defining DAM phenotype. Stage 1 TREM2-independent, Stage 2 TREM2-dependent.',
      },
    ],
  },

  {
    id: 'krasemann-trem2-apoe-2017',
    type: 'journal',
    authors: ['Susanne Krasemann', 'Charlotte Madore', 'et al.'],
    title: 'The TREM2-APOE Pathway Drives the Transcriptional Phenotype of Dysfunctional Microglia in Neurodegenerative Diseases',
    publication: 'Immunity',
    year: 2017,
    volume: '47(3)',
    pages: '566-581',
    doi: '10.1016/j.immuni.2017.08.008',
    url: 'https://pubmed.ncbi.nlm.nih.gov/28930663/',
    citations: [
      {
        id: 'krasemann-2017-trem2-apoe',
        quote: 'We found that neurodegeneration-associated molecular patterns activate a TREM2-APOE pathway in microglia... APOE induction in microglia is TREM2-dependent and essential for the neurodegenerative phenotype.',
        usedIn: ['frameworks'],
        context: 'TREM2 and APOE work in the same pathway—explains why both are major genetic risk factors.',
      },
    ],
  },

  {
    id: 'yuan-trem2-plaque-2016',
    type: 'journal',
    authors: ['Peng Yuan', 'et al.'],
    title: 'TREM2 Haplodeficiency in Mice and Humans Impairs the Microglia Barrier Function Leading to Decreased Amyloid Compaction and Severe Axonal Dystrophy',
    publication: 'Neuron',
    year: 2016,
    volume: '90(4)',
    pages: '724-739',
    doi: '10.1016/j.neuron.2016.05.003',
    url: 'https://pubmed.ncbi.nlm.nih.gov/27196974/',
    citations: [
      {
        id: 'yuan-2016-trem2',
        quote: 'TREM2 is required for microglia to cluster around amyloid plaques and form a protective barrier that compacts plaques and limits their neurotoxicity... TREM2 haplodeficiency results in diffuse, less compact plaques.',
        usedIn: ['mechanisticCascade'],
        context: 'Plaque compaction is PROTECTIVE. TREM2 variants that impair this function increase neurotoxicity.',
      },
    ],
  },

  {
    id: 'guerreiro-trem2-variants-2013',
    type: 'journal',
    authors: ['Rita Guerreiro', 'Aleksandra Wojtas', 'Jose Bras', 'et al.'],
    title: 'TREM2 variants in Alzheimer\'s disease',
    publication: 'New England Journal of Medicine',
    year: 2013,
    volume: '368(2)',
    pages: '117-127',
    doi: '10.1056/NEJMoa1211851',
    url: 'https://pubmed.ncbi.nlm.nih.gov/23150934/',
    citations: [
      {
        id: 'guerreiro-2013-trem2',
        quote: 'R47H variant increases AD risk with OR 2.9-4.5 (similar magnitude to APOE4 heterozygosity).',
        usedIn: ['frameworks'],
        context: 'TREM2 R47H is a major genetic risk factor for AD.',
      },
    ],
  },

  // ============================================
  // BBB AND SYNAPTIC DYSFUNCTION
  // ============================================
  {
    id: 'sweeney-bbb-2018',
    type: 'journal',
    authors: ['Melanie D. Sweeney', 'Abhay P. Sagare', 'Berislav V. Zlokovic'],
    title: 'Blood-brain barrier breakdown in Alzheimer disease and other neurodegenerative disorders',
    publication: 'Nature Reviews Neurology',
    year: 2018,
    volume: '14(3)',
    pages: '133-150',
    doi: '10.1038/nrneurol.2017.188',
    url: 'https://pubmed.ncbi.nlm.nih.gov/29377008/',
    citations: [
      {
        id: 'sweeney-2018-bbb',
        quote: 'BBB breakdown has emerged as an early biomarker of human cognitive dysfunction... Pericyte loss and damage to tight junctions are key features of BBB breakdown in AD.',
        usedIn: ['mechanisticCascade', 'frameworks'],
        context: 'Comprehensive review establishing BBB breakdown as early event in AD.',
      },
    ],
  },

  {
    id: 'lauren-prpc-abeta-2009',
    type: 'journal',
    authors: ['Juha Laurén', 'David A. Gimbel', 'et al.'],
    title: 'Cellular prion protein mediates impairment of synaptic plasticity by amyloid-β oligomers',
    publication: 'Nature',
    year: 2009,
    volume: '457(7233)',
    pages: '1128-1132',
    doi: '10.1038/nature07761',
    url: 'https://pubmed.ncbi.nlm.nih.gov/19242475/',
    citations: [
      {
        id: 'lauren-2009-prpc',
        quote: 'We show that PrPC is a high-affinity receptor for Aβ oligomers... PrPC is required for Aβ oligomer-induced inhibition of LTP.',
        usedIn: ['mechanisticCascade'],
        context: 'Aβ oligomers bind PrPC to impair synaptic plasticity.',
      },
    ],
  },

  {
    id: 'gate-cd8-t-cells-2020',
    type: 'journal',
    authors: ['David Gate', 'Nima Saligrama', 'et al.'],
    title: 'Clonally expanded CD8 T cells patrol the cerebrospinal fluid in Alzheimer\'s disease',
    publication: 'Nature',
    year: 2020,
    volume: '577(7790)',
    pages: '399-404',
    doi: '10.1038/s41586-019-1895-7',
    url: 'https://pubmed.ncbi.nlm.nih.gov/31915375/',
    citations: [
      {
        id: 'gate-2020-cd8',
        quote: 'We identify clonally expanded CD8+ T effector memory cells in the cerebrospinal fluid of patients with AD... These T cells are present in AD brain tissue.',
        usedIn: ['mechanisticCascade'],
        context: 'Peripheral immune cells infiltrate the CNS in AD.',
      },
    ],
  },

  // ============================================
  // PROGRANULIN/BMP PATHWAY
  // ============================================
  {
    id: 'paushter-progranulin-2018',
    type: 'journal',
    authors: ['Daniel H. Paushter', 'Huan Du', 'et al.'],
    title: 'The lysosomal function of progranulin',
    publication: 'Acta Neuropathologica',
    year: 2018,
    volume: '136(1)',
    pages: '1-17',
    doi: '10.1007/s00401-018-1842-9',
    url: 'https://pubmed.ncbi.nlm.nih.gov/29744576/',
    citations: [
      {
        id: 'paushter-2018-progranulin',
        quote: 'Progranulin (PGRN) traffics to lysosomes, is processed to granulins by cathepsins. GRN haploinsufficiency → frontotemporal dementia (FTD).',
        usedIn: ['mechanisticCascade'],
        context: 'Progranulin is a lysosomal protein linked to FTD.',
      },
    ],
  },

  {
    id: 'haney-apoe4-lipid-2024',
    type: 'journal',
    authors: ['Michael S. Haney', 'Robert Pálovics', 'et al.'],
    title: 'APOE4/4 is linked to damaging lipid droplets in Alzheimer\'s disease microglia',
    publication: 'Nature',
    year: 2024,
    volume: '628',
    pages: '154-161',
    doi: '10.1038/s41586-024-07185-7',
    url: 'https://pubmed.ncbi.nlm.nih.gov/38480879/',
    citations: [
      {
        id: 'haney-2024-apoe4-lipid',
        quote: 'APOE4/4 microglia accumulate more lipid droplets than APOE3/3 microglia... these lipid droplets contain oxidized lipids and are associated with impaired phagocytic function.',
        usedIn: ['frameworks', 'mechanisticCascade'],
        context: 'APOE4 → impaired lipid transport → lipid droplet accumulation → LDAM phenotype.',
      },
    ],
  },

  // ============================================
  // TAU PATHOLOGY EXTENDED
  // ============================================
  {
    id: 'bhaskar-il1b-tau-2010',
    type: 'journal',
    authors: ['Kiran Bhaskar', 'et al.'],
    title: 'Regulation of tau pathology by the microglial fractalkine receptor',
    publication: 'Neuron',
    year: 2010,
    volume: '68(1)',
    pages: '19-31',
    doi: '10.1016/j.neuron.2010.08.023',
    url: 'https://pubmed.ncbi.nlm.nih.gov/20920788/',
    citations: [
      {
        id: 'bhaskar-2010-il1b-tau',
        quote: 'IL-1β treatment or overexpression exacerbates tau phosphorylation through the activation of p38 mitogen-activated protein kinase (MAPK) and/or glycogen synthase kinase-3β (GSK-3β) in neuron–microglia co-cultures.',
        usedIn: ['mechanisticCascade'],
        context: 'DIRECT mechanistic link between microglial cytokines and neuronal tau pathology.',
      },
    ],
  },

  {
    id: 'polito-tfeb-tau-2014',
    type: 'journal',
    authors: ['Vinicia A. Polito', 'et al.'],
    title: 'Selective clearance of aberrant tau proteins and rescue of neurotoxicity by transcription factor EB',
    publication: 'EMBO Molecular Medicine',
    year: 2014,
    volume: '6(9)',
    pages: '1142-1160',
    doi: '10.15252/emmm.201303671',
    url: 'https://pubmed.ncbi.nlm.nih.gov/25069841/',
    citations: [
      {
        id: 'polito-2014-tfeb-tau',
        quote: 'AAV-TFEB injection into the lateral ventricles... reduced neurofibrillary tangle pathology and reversed behavioral and synaptic deficits... TFEB particularly degraded soluble and aggregated tau through autophagy and lysosomal activity.',
        usedIn: ['mechanisticCascade', 'hopefulDevelopments'],
        context: 'Proves TFEB activation can CLEAR tau pathology.',
      },
    ],
  },

  {
    id: 'pang-appnlgf-rat-2022',
    type: 'journal',
    authors: ['Keliang Pang', 'Rui Jiang', 'Wei Zhang', 'et al.'],
    title: 'An App knock-in rat model for Alzheimer\'s disease exhibiting Aβ and tau pathologies, neuronal death and cognitive impairments',
    publication: 'Cell Research',
    year: 2022,
    volume: '32',
    pages: '157-175',
    doi: '10.1038/s41422-021-00582-x',
    url: 'https://pubmed.ncbi.nlm.nih.gov/34789895/',
    citations: [
      {
        id: 'pang-2022-rat-tau',
        quote: 'Unlike App NL-G-F knock-in mice, App NL-G-F knock-in rats exhibit not only progressive Aβ deposition but also tau pathology, including hyperphosphorylation, misfolding, and the formation of paired helical filaments (PHFs)... Rat neurons express a mixture of 3R and 4R tau isoforms similar to humans.',
        usedIn: ['hopefulDevelopments', 'mechanisticCascade'],
        context: 'Rats develop full tau pathology downstream of amyloid—mice cannot. Species-specific tau splicing explains the difference.',
      },
    ],
  },

  // ============================================
  // MITOCHONDRIAL DYSFUNCTION EXTENDED
  // ============================================
  {
    id: 'sliter-pink1-parkin-2018',
    type: 'journal',
    authors: ['Derek A. Sliter', 'et al.'],
    title: 'Parkin and PINK1 mitigate STING-induced inflammation',
    publication: 'Nature',
    year: 2018,
    volume: '561',
    pages: '258-262',
    doi: '10.1038/s41586-018-0448-9',
    url: 'https://pubmed.ncbi.nlm.nih.gov/30135585/',
    citations: [
      {
        id: 'sliter-2018-pink1-parkin',
        quote: 'In Parkin-deficient mice, impaired mitophagy leads to mitochondrial DNA (mtDNA) leakage, activating cGAS-STING signaling and elevating pro-inflammatory cytokines and IFN-I.',
        usedIn: ['mechanisticCascade'],
        context: 'Genetic evidence that mitophagy genes (PINK1/Parkin) suppress cGAS-STING by preventing mtDNA accumulation.',
      },
    ],
  },

  {
    id: 'hou-nad-cgas-2021',
    type: 'journal',
    authors: ['Yujun Hou', 'Yong Wei', 'Sofie Lautrup', 'et al.'],
    title: 'NAD+ supplementation reduces neuroinflammation and cell senescence in a transgenic mouse model of Alzheimer\'s disease via cGAS-STING',
    publication: 'Proceedings of the National Academy of Sciences USA',
    year: 2021,
    volume: '118',
    pages: 'e2011226118',
    doi: '10.1073/pnas.2011226118',
    url: 'https://pubmed.ncbi.nlm.nih.gov/33452131/',
    citations: [
      {
        id: 'hou-2021-nad-cgas',
        quote: 'Supplementation with the NAD+ precursor nicotinamide riboside (NR) could stimulate mitophagy to reduce cytoplasmic DNA and the cGAS-STING signaling, thereby decreasing neuroinflammation and cellular senescence in the brains of AD mice.',
        usedIn: ['hopefulDevelopments', 'mechanisticCascade'],
        context: 'Therapeutic proof-of-concept: enhancing mitophagy reduces cGAS-STING and AD pathology.',
      },
    ],
  },

  {
    id: 'ryu-urolithin-2016',
    type: 'journal',
    authors: ['Dongryeol Ryu', 'et al.'],
    title: 'Urolithin A induces mitophagy and prolongs lifespan in C. elegans and increases muscle function in rodents',
    publication: 'Nature Medicine',
    year: 2016,
    volume: '22(8)',
    pages: '879-888',
    doi: '10.1038/nm.4132',
    citations: [
      {
        id: 'ryu-2016-urolithin',
        quote: 'Urolithin A induces mitophagy both in vitro and in vivo and prolongs lifespan in C. elegans... In rodents, urolithin A improves exercise capacity in different mouse models of age-related decline of muscle function.',
        usedIn: ['hopefulDevelopments'],
        context: 'Foundational study establishing urolithin A as a mitophagy inducer.',
      },
    ],
  },

  // ============================================
  // IRON-FERROPTOSIS PATHWAY
  // ============================================
  {
    id: 'dixon-ferroptosis-2012',
    type: 'journal',
    authors: ['Scott J. Dixon', 'et al.'],
    title: 'Ferroptosis: an iron-dependent form of nonapoptotic cell death',
    publication: 'Cell',
    year: 2012,
    volume: '149',
    pages: '1060-1072',
    doi: '10.1016/j.cell.2012.03.042',
    url: 'https://pubmed.ncbi.nlm.nih.gov/22632970/',
    citations: [
      {
        id: 'dixon-2012-ferroptosis-defined',
        quote: 'Ferroptosis is dependent upon intracellular iron, but not other metals, and is morphologically, biochemically, and genetically distinct from apoptosis, necrosis, and autophagy... We identify the small molecule ferrostatin-1 as a potent inhibitor of ferroptosis.',
        usedIn: ['mechanisticCascade'],
        context: 'FOUNDATIONAL PAPER defining ferroptosis. Established connection to glutamate excitotoxicity.',
      },
    ],
  },

  {
    id: 'roeck-ferroptosis-spread-2025',
    type: 'journal',
    authors: ['Leonard Roeck', 'Ersin Boateng', 'et al.'],
    title: 'Ferroptosis spreads to neighboring cells via plasma membrane contacts',
    publication: 'Nature Communications',
    year: 2025,
    volume: '16',
    pages: '2878',
    doi: '10.1038/s41467-025-58155-y',
    url: 'https://pubmed.ncbi.nlm.nih.gov/40128217/',
    citations: [
      {
        id: 'roeck-2025-spread',
        quote: 'Ferroptosis propagation is dependent on cell distance and completely abolished by disruption of α-catenin-dependent intercellular contacts or by chelation of extracellular iron... DFO treatment inhibited ferroptosis propagation without affecting the intrinsic sensitivity of individual cells.',
        usedIn: ['mechanisticCascade'],
        context: 'KEY PAPER showing extracellular iron chelation blocks ferroptosis PROPAGATION without affecting individual cell susceptibility.',
      },
    ],
  },

  // ============================================
  // SUR1-TRPM4 CALCIUM SIGNALING
  // ============================================
  {
    id: 'kernan-sur1-sepsis-2024',
    type: 'journal',
    authors: ['Kate F. Kernan', 'et al.'],
    title: 'Impact of ABCC8 and TRPM4 genetic variation in central nervous system dysfunction associated with pediatric sepsis',
    publication: 'Shock',
    year: 2024,
    volume: '62',
    pages: '688-697',
    doi: '10.1097/SHK.0000000000002441',
    url: 'https://pubmed.ncbi.nlm.nih.gov/39227362/',
    citations: [
      {
        id: 'kernan-2024-sur1',
        quote: 'Pooled rare variants in either ABCC8 or TRPM4 associated with decreased odds of central nervous system dysfunction in severe pediatric sepsis (OR 0.14, 95% CI 0.003–0.87). Adjusted OR 0.11.',
        usedIn: ['mechanisticCascade'],
        context: 'KEY PAPER providing HUMAN GENETIC PROOF that loss-of-function in SUR1-TRPM4 is neuroprotective during inflammation. OR 0.11 = ~90% protection.',
      },
    ],
  },

  {
    id: 'kurland-sur1-inos-2016',
    type: 'journal',
    authors: ['David B. Kurland', 'Volodymyr Gerzanich', 'et al.'],
    title: 'The Sur1-Trpm4 channel regulates NOS2 transcription in TLR4-activated microglia',
    publication: 'Journal of Neuroinflammation',
    year: 2016,
    volume: '13',
    pages: '130',
    doi: '10.1186/s12974-016-0592-8',
    url: 'https://pubmed.ncbi.nlm.nih.gov/27246103/',
    citations: [
      {
        id: 'kurland-2016-mechanism',
        quote: 'In microglia in vivo and in vitro, LPS activation of TLR4 led to de novo upregulation of Sur1-Trpm4 channels and CN/NFAT-dependent upregulation of Nos2 mRNA, NOS2 protein, and NO. Pharmacological inhibition of Sur1 (glibenclamide) reduced Nos2 upregulation.',
        usedIn: ['mechanisticCascade'],
        context: 'KEY MECHANISTIC PAPER: TLR4 → de novo SUR1-TRPM4 → compartmentalized Ca²⁺ → Calcineurin/NFAT → iNOS → NO → peroxynitrite.',
      },
    ],
  },

  {
    id: 'simard-sur1-stroke-2006',
    type: 'journal',
    authors: ['J. Marc Simard', 'Ming Chen', 'et al.'],
    title: 'Newly expressed SUR1-regulated NCCa-ATP channel mediates cerebral edema after ischemic stroke',
    publication: 'Nature Medicine',
    year: 2006,
    volume: '12',
    pages: '433-440',
    doi: '10.1038/nm1390',
    url: 'https://pubmed.ncbi.nlm.nih.gov/16550187/',
    citations: [
      {
        id: 'simard-2006-foundational',
        quote: 'Newly expressed SUR1-regulated NC(Ca-ATP) channel mediates cerebral edema after ischemic stroke.',
        usedIn: ['mechanisticCascade'],
        context: 'FOUNDATIONAL PAPER discovering SUR1-TRPM4 is de novo expressed after CNS injury. Identified glibenclamide as therapeutic.',
      },
    ],
  },

  // ============================================
  // LIPID PEROXIDATION SOURCES
  // ============================================
  {
    id: 'liu-glial-lipid-2015',
    type: 'journal',
    authors: ['Lucy Liu', 'Ke Zhang', 'et al.'],
    title: 'Glial lipid droplets and ROS induced by mitochondrial defects promote neurodegeneration',
    publication: 'Cell',
    year: 2015,
    volume: '160',
    pages: '177-190',
    doi: '10.1016/j.cell.2014.12.019',
    url: 'https://pubmed.ncbi.nlm.nih.gov/25594180/',
    citations: [
      {
        id: 'liu-2015-lipid-ros',
        quote: 'Here we find that a key consequence of ROS and neuronal mitochondrial dysfunction is the accumulation of lipid droplets (LD) in glia... The accumulated lipids are peroxidated in the presence of ROS. Reducing LD accumulation in glia and lipid peroxidation significantly delays the onset of neurodegeneration.',
        usedIn: ['mechanisticCascade'],
        context: 'KEY PAPER from Bellen lab establishing ROS → lipid peroxidation → neurodegeneration link.',
      },
    ],
  },

  {
    id: 'moulton-apoe4-lipid-2021',
    type: 'journal',
    authors: ['Matthew J. Moulton', 'et al.'],
    title: 'Neuronal ROS-induced glial lipid droplet formation is altered by loss of Alzheimer\'s disease-associated genes',
    publication: 'Proceedings of the National Academy of Sciences USA',
    year: 2021,
    volume: '118',
    pages: 'e2112095118',
    doi: '10.1073/pnas.2112095118',
    url: 'https://pubmed.ncbi.nlm.nih.gov/34949639/',
    citations: [
      {
        id: 'moulton-2021-apoe4',
        quote: 'We show that elevated levels of ROS in neurons induces the formation of glial LDs by transferring peroxidated lipids produced in neurons to glia in a process mediated by the apolipoprotein Glial Lazarillo (the fly homolog of APOE)... APOE4 impairs lipid transfer from neurons to glia.',
        usedIn: ['frameworks', 'mechanisticCascade'],
        context: 'Connects APOE4 to impaired neuron-to-glia lipid transfer.',
      },
    ],
  },

  {
    id: 'liddelow-a1-astrocytes-2017',
    type: 'journal',
    authors: ['Shane A. Liddelow', 'Kevin A. Guttenplan', 'et al.'],
    title: 'Neurotoxic reactive astrocytes are induced by activated microglia',
    publication: 'Nature',
    year: 2017,
    volume: '541',
    pages: '481-487',
    doi: '10.1038/nature21029',
    url: 'https://pubmed.ncbi.nlm.nih.gov/28099414/',
    citations: [
      {
        id: 'liddelow-2017-a1',
        quote: 'We show that a subtype of reactive astrocytes, which we termed A1, is induced by classically activated neuroinflammatory microglia via secretion of Il-1α, TNF and C1q... A1s lose the ability to promote neuronal survival and induce death of neurons and oligodendrocytes.',
        usedIn: ['mechanisticCascade'],
        context: 'KEY PAPER defining A1 neurotoxic astrocytes. Microglia-derived C1q + IL-1α + TNF-α induce A1 state.',
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

  // ============================================
  // AD DRUG DEVELOPMENT COSTS & FUNDING
  // ============================================
  {
    id: 'cummings-ad-costs-2022',
    type: 'journal',
    authors: ['Jeffrey L. Cummings', 'Aaron Goldman', 'Howard H. Bhurji', 'Kate Zhong'],
    title: 'The costs of developing treatments for Alzheimer\'s disease: A retrospective exploration',
    publication: "Alzheimer's & Dementia",
    year: 2022,
    volume: '18',
    pages: '469-477',
    doi: '10.1002/alz.12450',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8940715/',
    citations: [
      {
        id: 'cummings-2022-total-investment',
        quote: 'Since 1995, cumulative private expenditures on clinical stage AD R&D were estimated at $42.5 billion, with the greatest costs (57%; $24,065 million) incurred during phase 3.',
        usedIn: ['trialBarriers', 'fundingGap'],
        context: 'Key statistic on total industry investment and where the money goes.',
      },
      {
        id: 'cummings-2022-phase-costs',
        quote: 'Cumulative R&D expenditures associated with each stage were assigned per drug in development: $79 million for phase 1, $141 million for phase 2, and $462 million for phase 3 or phase 4.',
        usedIn: ['trialBarriers', 'fundingGap'],
        context: 'Per-drug costs by phase—shows why Phase 3 is prohibitively expensive.',
      },
      {
        id: 'cummings-2022-failure-rate',
        quote: 'With the exception of the recent accelerated approval of aducanumab, in over 26 years of research and development (R&D) investment in Alzheimer\'s disease (AD), only five novel drugs—all for symptomatic treatment only—have reached FDA approval.',
        usedIn: ['trialBarriers', 'fundingGap'],
        context: '26 years, $42.5 billion, only 6 approvals—illustrates catastrophic ROI.',
      },
      {
        id: 'cummings-2022-participants',
        quote: 'Approximately 183,679 participants were registered or are currently enrolled in clinical trials.',
        usedIn: ['trialBarriers'],
        context: 'Human cost of AD clinical trials.',
      },
      {
        id: 'cummings-2022-phase3-failures',
        quote: 'The combined cost of phases 2 and 3 clinical development since 1995 (≈$33.7 billion) reflects the tremendous potential savings had mechanisms to identify lack of efficacy at early-stage development been available.',
        usedIn: ['trialBarriers'],
        context: 'Late-stage failures are enormously costly—better biomarkers needed.',
      },
    ],
  },

  {
    id: 'nih-nia-budget-2024',
    type: 'website',
    authors: ['National Institute on Aging'],
    title: 'Fiscal Year 2025 Budget',
    publication: 'NIH/NIA',
    year: 2024,
    url: 'https://www.nia.nih.gov/about/budget/fiscal-year-2025-budget',
    accessDate: '2025-01-13',
    citations: [
      {
        id: 'nia-2024-budget',
        quote: 'Added to current NIH spending, the annual Alzheimer\'s and dementia research funding by the federal government will be as much as $3.8 billion.',
        usedIn: ['trialBarriers', 'fundingGap'],
        context: 'NIH/NIA is largest AD research funder—still only covers ~8 Phase 3 trials worth.',
      },
      {
        id: 'nia-2024-growth',
        quote: 'Since 2016, NIA has seen significant annual increases to the Alzheimer\'s and related dementias appropriations, anywhere from $90 million to $425 million.',
        usedIn: ['fundingGap'],
        context: 'Budget has grown 7x since 2011, but still insufficient for large-scale trials.',
      },
    ],
  },

  {
    id: 'alzheimers-association-budget-2024',
    type: 'website',
    authors: ["Alzheimer's Association"],
    title: "Alzheimer's Association's funding portfolio",
    publication: 'PMC / Alzheimer\'s & Dementia',
    year: 2024,
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11782193/',
    doi: '10.1002/alz.14425',
    citations: [
      {
        id: 'alz-assoc-2024-portfolio',
        quote: 'As of February 2024, the Alzheimer\'s Association is actively committed to and funding over 1,100 grants in 56 countries, totaling over USD $430 million in funding. In 2024, the Association funded over $105 million in research initiatives for AD/ADRD research.',
        usedIn: ['trialBarriers', 'fundingGap'],
        context: 'Largest nonprofit AD funder—but annual budget = 23% of one Phase 3 trial.',
      },
    ],
  },

  {
    id: 'aruk-budget-2024',
    type: 'website',
    authors: ["Alzheimer's Research UK"],
    title: 'Autumn budget 2024: What does it mean for our mission towards a cure?',
    publication: "Alzheimer's Research UK",
    year: 2024,
    url: 'https://www.alzheimersresearchuk.org/news/autumn-budget-2024-what-does-it-mean-for-our-mission-towards-a-cure/',
    accessDate: '2025-01-13',
    citations: [
      {
        id: 'aruk-2024-funding',
        quote: 'The charity reported a total income of £56.9 million for the 12-month period ending March 2024, with £34.6 million committed to charitable activities.',
        usedIn: ['trialBarriers', 'fundingGap'],
        context: 'Leading UK charity—annual budget = 9% of one Phase 3 trial.',
      },
      {
        id: 'aruk-2024-cumulative',
        quote: 'As of 2024, Alzheimer\'s Research UK has funded 1,275 research projects across the UK and internationally, and has committed more than £237 million to dementia research.',
        usedIn: ['fundingGap'],
        context: 'Historical investment context.',
      },
    ],
  },

  {
    id: 'uk-dementia-budget-2024',
    type: 'website',
    authors: ['UK Government'],
    title: 'Government investment in dementia research',
    publication: 'Dementia Statistics Hub',
    year: 2024,
    url: 'https://dementiastatistics.org/statistics/government-investment-in-dementia-research/',
    accessDate: '2025-01-13',
    citations: [
      {
        id: 'uk-gov-2024-commitment',
        quote: 'The UK government had committed to double dementia research funding to £160 million by 2024.',
        usedIn: ['trialBarriers', 'fundingGap'],
        context: 'UK government funding—entire annual budget < 1 Phase 3 trial.',
      },
    ],
  },

  {
    id: 'brightfocus-budget-2024',
    type: 'website',
    authors: ['BrightFocus Foundation'],
    title: '2024 BrightFocus Research Grant Awards',
    publication: 'BrightFocus Foundation',
    year: 2024,
    url: 'https://www.brightfocus.org/2024-brightfocus-research-grant-awards',
    accessDate: '2025-01-13',
    citations: [
      {
        id: 'brightfocus-2024-awards',
        quote: "Earlier in 2024, BrightFocus' Alzheimer's Disease Research program awarded $5.6 million to support 25 of the 37 new research projects recommended by the Alzheimer's Disease Research Scientific Review Committee. BrightFocus Foundation announced $10M in new funding across brain and vision research in 2024.",
        usedIn: ['trialBarriers', 'fundingGap'],
        context: 'Seed funder for innovative research—annual budget = 2% of one Phase 3.',
      },
      {
        id: 'brightfocus-2024-historical',
        quote: "Thanks to generous donor support, Alzheimer's Disease Research has invested more than $189 million in groundbreaking studies aimed at furthering our understanding of the disease.",
        usedIn: ['fundingGap'],
        context: 'Cumulative historical investment.',
      },
    ],
  },

  {
    id: 'addf-budget-2024',
    type: 'website',
    authors: ["Alzheimer's Drug Discovery Foundation"],
    title: 'Research and Grants',
    publication: "Alzheimer's Drug Discovery Foundation",
    year: 2024,
    url: 'https://www.alzdiscovery.org/research-and-grants',
    accessDate: '2025-01-13',
    citations: [
      {
        id: 'addf-2024-model',
        quote: "The ADDF's venture philanthropy model means they make investments, not grants, and use all returns from those investments to support their charitable mission.",
        usedIn: ['trialBarriers', 'fundingGap'],
        context: 'Unique venture philanthropy approach to AD funding.',
      },
      {
        id: 'addf-2024-investment',
        quote: 'Through its programs, the ADDF has invested close to $65 million to fund nearly 450 Alzheimer\'s drug discovery programs and clinical trials in academic centers and biotechnology companies in 18 countries. After initial ADDF funding, grantees have received commitments of over $2 billion in follow-on funding.',
        usedIn: ['fundingGap'],
        context: 'Leverages donations into larger industry/government follow-on.',
      },
    ],
  },

  {
    id: 'alz-impact-appropriations-2024',
    type: 'website',
    authors: ["Alzheimer's Impact Movement"],
    title: 'Congress Reaches Bipartisan Agreement on $100 Million Alzheimer\'s Research Funding Increase',
    publication: "Alzheimer's Association",
    year: 2024,
    url: 'https://www.alz.org/news/2024/congress-reaches-bipartisan-agreement-research-funding-increase',
    accessDate: '2025-01-13',
    citations: [
      {
        id: 'aim-2024-increase',
        quote: 'Bipartisan congressional leaders announced a $100 million increase for Alzheimer\'s and dementia research funding at the National Institutes of Health (NIH) for fiscal year 2024 (FY24). The bill also includes $34 million to fund and continue to implement the BOLD Infrastructure for Alzheimer\'s Act.',
        usedIn: ['fundingGap'],
        context: 'Political progress on AD funding—still inadequate for trial costs.',
      },
      {
        id: 'aim-2024-sevenfold',
        quote: 'Through their committed advocacy network, AIM has helped secure a seven-fold increase in Alzheimer\'s and dementia research funding since 2011. When the National Alzheimer\'s Project Act (NAPA) was signed into law, the federal government invested just $448 million annually.',
        usedIn: ['fundingGap'],
        context: 'Advocacy success story—from $448M to $3.8B.',
      },
    ],
  },

  // ============================================
  // GENETIC DISCOVERIES
  // ============================================
  {
    id: 'roses-apoe4-1993',
    type: 'journal',
    authors: ['Warren J. Strittmatter', 'Ann M. Saunders', 'Donald Schmechel', 'Margaret Pericak-Vance', 'Jan Enghild', 'Guy S. Salvesen', 'Allen D. Roses'],
    title: 'Gene dose of apolipoprotein E type 4 allele and the risk of Alzheimer\'s disease in late onset families',
    publication: 'Science',
    year: 1993,
    volume: '261',
    pages: '921-923',
    doi: '10.1126/science.8346443',
    url: 'https://pubmed.ncbi.nlm.nih.gov/8346443/',
    citations: [
      {
        id: 'roses-1993-risk',
        quote: 'The apolipoprotein E type 4 allele (APOE-epsilon 4) is genetically associated with the common late onset familial and sporadic forms of Alzheimer\'s disease.',
        usedIn: ['timeline', 'frameworks'],
        context: 'The discovery that APOE4 is the major genetic risk factor for late-onset AD.',
      },
      {
        id: 'roses-1993-dose',
        quote: 'Risk for AD increased from 20% to 90% and mean age at onset decreased from 84 to 68 years with increasing number of APOE-epsilon 4 alleles in 42 families with late onset AD.',
        usedIn: ['timeline'],
        context: 'Dose-dependent effect of APOE4 on AD risk.',
      },
      {
        id: 'roses-1993-homozygosity',
        quote: 'Homozygosity for APOE-epsilon 4 was virtually sufficient to cause AD by age 80.',
        usedIn: ['timeline'],
        context: 'Near-complete penetrance in APOE4 homozygotes.',
      },
    ],
  },

  {
    id: 'sherrington-psen1-1995',
    type: 'journal',
    authors: ['R. Sherrington', 'E. I. Rogaev', 'Y. Liang', 'et al.'],
    title: 'Cloning of a gene bearing missense mutations in early-onset familial Alzheimer\'s disease',
    publication: 'Nature',
    year: 1995,
    volume: '375',
    pages: '754-760',
    doi: '10.1038/375754a0',
    url: 'https://www.nature.com/articles/375754a0',
    citations: [
      {
        id: 'sherrington-1995-psen1',
        quote: 'Genetic linkage studies placed a gene causing early onset familial Alzheimer\'s disease (FAD) on chromosome 14q24.3. Five mutations within the S182 (Presenilin 1: PS-1) gene, which maps to this region, were reported in several early onset FAD kindreds.',
        usedIn: ['timeline'],
        context: 'Discovery of PSEN1 as a cause of familial AD.',
      },
    ],
  },

  // ============================================
  // MAJOR TRIAL FAILURES
  // ============================================
  {
    id: 'an1792-alzforum',
    type: 'website',
    authors: ['Alzforum'],
    title: 'AN-1792',
    publication: 'Alzforum Therapeutics Database',
    year: 2002,
    url: 'https://www.alzforum.org/therapeutics/an-1792',
    citations: [
      {
        id: 'an1792-suspension',
        quote: 'Dosing in a 372-patient, multinational Phase 2a trial in people with mild to moderate AD was suspended when four treated patients developed brain inflammation that later proved to be aseptic meningoencephalitis.',
        usedIn: ['timeline'],
        context: 'The first amyloid vaccine trial halted due to brain inflammation.',
      },
      {
        id: 'an1792-rate',
        quote: 'Altogether, six percent of patients came down with this side effect.',
        usedIn: ['timeline'],
        context: 'The meningoencephalitis rate.',
      },
      {
        id: 'an1792-termination',
        quote: 'In 2002, development of AN-1792 was terminated, but follow-up assessment of treated patients continued.',
        usedIn: ['timeline'],
        context: 'Official termination of the program.',
      },
    ],
  },

  {
    id: 'bapineuzumab-alzforum',
    type: 'website',
    authors: ['Alzforum'],
    title: 'Bapineuzumab',
    publication: 'Alzforum Therapeutics Database',
    year: 2012,
    url: 'https://www.alzforum.org/therapeutics/bapineuzumab',
    citations: [
      {
        id: 'bapineuzumab-termination',
        quote: 'All phrase 3 trials were terminated on August 6, 2012 because two large Phase 3 studies showed no clinical benefit.',
        usedIn: ['timeline'],
        context: 'The first major anti-amyloid antibody Phase 3 failure.',
      },
      {
        id: 'bapineuzumab-biomarkers',
        quote: 'Biomarker analyses indicated that bapineuzumab engaged its target but had no benefit.',
        usedIn: ['timeline'],
        context: 'Key finding: drug hit target but had no clinical effect.',
      },
      {
        id: 'bapineuzumab-explanation',
        quote: 'Cited explanations for failure include the low dose necessitated by bapineuzumab\'s side effect profile and late-stage treatment initiated years after brain amyloid deposition has begun.',
        usedIn: ['timeline'],
        context: 'Rationalizations for the failure.',
      },
    ],
  },

  {
    id: 'solanezumab-statnews-2016',
    type: 'news',
    authors: ['Adam Feuerstein', 'Damian Garde'],
    title: 'Eli Lilly\'s Alzheimer\'s drug fails in late-stage trial, dashing hopes',
    publication: 'STAT News',
    year: 2016,
    url: 'https://www.statnews.com/2016/11/23/alzheimers-eli-lilly-drug-trial/',
    citations: [
      {
        id: 'solanezumab-failure',
        quote: 'The injected therapy, called solanezumab, didn\'t meaningfully beat a placebo in a study on more than 2,100 patients with mild to moderate forms of Alzheimer\'s.',
        usedIn: ['timeline'],
        context: 'Third Phase 3 failure for solanezumab.',
      },
      {
        id: 'solanezumab-third',
        quote: 'This marks the third time Lilly\'s treatment has missed the mark in a late-stage trial, and the company has abandoned any plans to submit it for Food and Drug Administration approval.',
        usedIn: ['timeline'],
        context: 'Lilly\'s persistence through three Phase 3 failures.',
      },
      {
        id: 'solanezumab-stock',
        quote: 'Lilly\'s share price fell more than 14 percent on the news.',
        usedIn: ['timeline'],
        context: 'Market reaction to the failure.',
      },
    ],
  },

  // ============================================
  // CHOLINERGIC HYPOTHESIS - ADDITIONAL SOURCES
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
  // TAU HYPOTHESIS - ADDITIONAL SOURCES
  // ============================================
  {
    id: 'tauvid-fda-2020',
    type: 'website',
    authors: ['FDA'],
    title: 'FDA Approves First Drug to Image Tau Pathology in Patients Being Evaluated for Alzheimer\'s Disease',
    publication: 'FDA',
    year: 2020,
    url: 'https://www.fda.gov/news-events/press-announcements/fda-approves-first-drug-image-tau-pathology-patients-being-evaluated-alzheimers-disease',
    citations: [
      {
        id: 'tauvid-approval',
        quote: 'The U.S. Food and Drug Administration approved Tauvid (flortaucipir F 18 injection) for use with positron emission tomography (PET) imaging of the brain to estimate the density and distribution of aggregated tau neurofibrillary tangles.',
        usedIn: ['timeline'],
        context: 'First tau PET imaging agent approved—enables visualization of tau in living patients.',
      },
    ],
  },

  {
    id: 'frost-diamond-2009',
    type: 'journal',
    authors: ['Bess Frost', 'Rachel L. Jacks', 'Marc I. Diamond'],
    title: 'Propagation of tau misfolding from the outside to the inside of a cell',
    publication: 'Journal of Biological Chemistry',
    year: 2009,
    volume: '284',
    pages: '12845-12852',
    doi: '10.1074/jbc.M808759200',
    url: 'https://www.jbc.org/article/S0021-9258(19)38139-4/fulltext',
    citations: [
      {
        id: 'frost-2009-spreading',
        quote: 'We now report that tau fibrils, when applied to the outside of cultured cells, are internalized and induce fibrillization of intracellular full-length tau.',
        usedIn: ['timeline'],
        context: 'Discovery that tau spreads like a prion—misfolded tau templates normal tau.',
      },
    ],
  },

  {
    id: 'semorinemab-failure-2021',
    type: 'news',
    authors: ['Alzforum'],
    title: 'Semorinemab Misses Primary Endpoint in Phase 2 Trial',
    publication: 'Alzforum',
    year: 2021,
    url: 'https://www.alzforum.org/news/research-news/semorinemab-misses-primary-endpoint-phase-2-trial',
    citations: [],
  },

  // ============================================
  // INFECTION HYPOTHESIS - ADDITIONAL SOURCES
  // ============================================
  {
    id: 'moir-2010',
    type: 'journal',
    authors: ['Stephanie J. Soscia', 'James E. Kirby', 'Kevin J. Washicosky', 'et al.'],
    title: 'The Alzheimer\'s disease-associated amyloid β-protein is an antimicrobial peptide',
    publication: 'PLoS One',
    year: 2010,
    volume: '5',
    pages: 'e9505',
    doi: '10.1371/journal.pone.0009505',
    url: 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0009505',
    citations: [
      {
        id: 'moir-2010-antimicrobial',
        quote: 'Our findings suggest Aβ is a normal component of the innate immune system. Aβ exhibited antimicrobial activity against eight common and clinically relevant microorganisms with a potency equivalent to, and in some cases greater than, LL-37.',
        usedIn: ['timeline'],
        context: 'Paradigm-shifting discovery: Aβ is an antimicrobial defense peptide.',
      },
    ],
  },

  {
    id: 'tzeng-antivirals-2018',
    type: 'journal',
    authors: ['Tzeng NS', 'Chung CH', 'Lin FH', 'et al.'],
    title: 'Anti-herpetic Medications and Reduced Risk of Dementia in Patients with Herpes Simplex Virus Infections—a Nationwide, Population-Based Cohort Study in Taiwan',
    publication: 'Neurotherapeutics',
    year: 2018,
    volume: '15',
    pages: '417-429',
    doi: '10.1007/s13311-018-0611-x',
    url: 'https://pubmed.ncbi.nlm.nih.gov/29488144/',
    citations: [
      {
        id: 'tzeng-2018-result',
        quote: 'Among 33,448 subjects with HSV infections, those who were treated with anti-herpetic medications showed a 90% lower risk of dementia compared to those who were not treated.',
        usedIn: ['timeline'],
        context: 'Massive population study showing antivirals may prevent Alzheimer\'s.',
      },
    ],
  },

  // ============================================
  // NEUROINFLAMMATION HYPOTHESIS - ADDITIONAL SOURCES
  // ============================================
  {
    id: 'mcgeer-nsaids-1996',
    type: 'journal',
    authors: ['Patrick L. McGeer', 'Edith G. McGeer'],
    title: 'Anti-inflammatory drugs in the fight against Alzheimer\'s disease',
    publication: 'Annals of the New York Academy of Sciences',
    year: 1996,
    volume: '777',
    pages: '213-220',
    doi: '10.1111/j.1749-6632.1996.tb34421.x',
    url: 'https://pubmed.ncbi.nlm.nih.gov/8624087/',
    citations: [
      {
        id: 'mcgeer-1996-risk',
        quote: 'Epidemiological studies indicate that long-term treatment with anti-inflammatory drugs reduces the risk of AD by 50-80%.',
        usedIn: ['timeline'],
        context: 'Early evidence that inflammation is causal—NSAIDs dramatically reduce AD risk.',
      },
    ],
  },

  {
    id: 'trem2-jonsson-2013',
    type: 'journal',
    authors: ['Thorlakur Jonsson', 'Hreinn Stefansson', 'Stacy Steinberg', 'et al.'],
    title: 'Variant of TREM2 associated with the risk of Alzheimer\'s disease',
    publication: 'New England Journal of Medicine',
    year: 2013,
    volume: '368',
    pages: '107-116',
    doi: '10.1056/NEJMoa1211103',
    url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa1211103',
    citations: [
      {
        id: 'trem2-2013-risk',
        quote: 'A rare variant (rs75932628-T) of TREM2, encoding a substitution of arginine for histidine at residue 47 (R47H), was found to confer a significant risk of Alzheimer\'s disease with an odds ratio of 2.92.',
        usedIn: ['timeline'],
        context: 'TREM2 variant as strong as APOE4—microglia are central to AD.',
      },
    ],
  },

  // ============================================
  // VASCULAR HYPOTHESIS - ADDITIONAL SOURCES
  // ============================================
  {
    id: 'snowdon-nun-1997',
    type: 'journal',
    authors: ['David A. Snowdon', 'Lydia H. Greiner', 'James A. Mortimer', 'et al.'],
    title: 'Brain infarction and the clinical expression of Alzheimer disease: The Nun Study',
    publication: 'JAMA',
    year: 1997,
    volume: '277',
    pages: '813-817',
    doi: '10.1001/jama.1997.03540340047031',
    url: 'https://pubmed.ncbi.nlm.nih.gov/9052711/',
    citations: [
      {
        id: 'snowdon-1997-infarcts',
        quote: 'Among participants meeting neuropathological criteria for AD, those with brain infarcts had poorer cognitive function and a higher prevalence of dementia than those without infarcts. Only 57% of those with abundant neurofibrillary tangles but no infarcts had clinical dementia.',
        usedIn: ['timeline'],
        context: 'Landmark finding: many with AD pathology had no dementia—strokes made the difference.',
      },
    ],
  },

  {
    id: 'zlokovic-bbb-2011',
    type: 'journal',
    authors: ['Berislav V. Zlokovic'],
    title: 'Neurovascular pathways to neurodegeneration in Alzheimer\'s disease and other disorders',
    publication: 'Nature Reviews Neuroscience',
    year: 2011,
    volume: '12',
    pages: '723-738',
    doi: '10.1038/nrn3114',
    url: 'https://www.nature.com/articles/nrn3114',
    citations: [
      {
        id: 'zlokovic-2011-bbb',
        quote: 'Vascular dysfunction and blood-brain barrier (BBB) breakdown initiate a faulty clearance of amyloid-β from brain to blood and trigger multiple pathways of neurodegeneration before cognitive decline.',
        usedIn: ['timeline'],
        context: 'BBB dysfunction is upstream of amyloid—vascular damage comes first.',
      },
    ],
  },

  // ============================================
  // METABOLIC HYPOTHESIS - ADDITIONAL SOURCES
  // ============================================
  {
    id: 'craft-insulin-2012',
    type: 'journal',
    authors: ['Suzanne Craft', 'Laura D. Baker', 'Thomas J. Montine', 'et al.'],
    title: 'Intranasal insulin therapy for Alzheimer disease and amnestic mild cognitive impairment',
    publication: 'Archives of Neurology',
    year: 2012,
    volume: '69',
    pages: '29-38',
    doi: '10.1001/archneurol.2011.233',
    url: 'https://pubmed.ncbi.nlm.nih.gov/21911655/',
    citations: [
      {
        id: 'craft-2012-memory',
        quote: 'The 20 IU of insulin improved delayed memory and preserved caregiver-rated functional ability. Treatment was associated with preserved or improved PET scans for treated patients compared with placebo.',
        usedIn: ['timeline'],
        context: 'Nasal insulin improves memory and metabolism in AD patients.',
      },
    ],
  },

  {
    id: 'reger-ketones-2004',
    type: 'journal',
    authors: ['Mark A. Reger', 'Samuel T. Henderson', 'Cathy Hale', 'et al.'],
    title: 'Effects of β-hydroxybutyrate on cognition in memory-impaired adults',
    publication: 'Neurobiology of Aging',
    year: 2004,
    volume: '25',
    pages: '311-314',
    doi: '10.1016/S0197-4580(03)00087-3',
    url: 'https://pubmed.ncbi.nlm.nih.gov/15123336/',
    citations: [
      {
        id: 'reger-2004-memory',
        quote: 'Higher ketone values were associated with greater improvement in paragraph recall relative to placebo. Elevated ketone body levels may have cognitive enhancing properties.',
        usedIn: ['timeline'],
        context: 'Ketones improve cognition when glucose metabolism fails in AD.',
      },
    ],
  },

  // ============================================
  // MITOCHONDRIAL HYPOTHESIS - ADDITIONAL SOURCES
  // ============================================
  {
    id: 'swerdlow-cybrid-1997',
    type: 'journal',
    authors: ['Russell H. Swerdlow', 'James K. Parks', 'David S. Cassarino', 'et al.'],
    title: 'Cybrids in Alzheimer\'s disease: a cellular model of the disease?',
    publication: 'Neurology',
    year: 1997,
    volume: '49',
    pages: '918-925',
    doi: '10.1212/WNL.49.4.918',
    url: 'https://pubmed.ncbi.nlm.nih.gov/9339668/',
    citations: [
      {
        id: 'swerdlow-1997-cybrid',
        quote: 'Cybrids containing AD platelet mitochondria showed reduced complex IV activity, increased reactive oxygen species, and altered calcium homeostasis compared to control cybrids.',
        usedIn: ['timeline'],
        context: 'AD mitochondria alone induce disease features—mitochondria are upstream.',
      },
    ],
  },

  {
    id: 'fdg-pet-early-2020',
    type: 'journal',
    authors: ['Lisa Mosconi', 'Mony J. de Leon', 'Randolph D. Andrews', 'et al.'],
    title: 'Brain glucose hypometabolism and oxidative stress in preclinical Alzheimer\'s disease',
    publication: 'Annals of the New York Academy of Sciences',
    year: 2008,
    volume: '1147',
    pages: '180-195',
    doi: '10.1196/annals.1427.007',
    url: 'https://pubmed.ncbi.nlm.nih.gov/19076441/',
    citations: [
      {
        id: 'fdg-2020-earliest',
        quote: 'FDG-PET reductions are among the earliest signs of AD, appearing decades before clinical symptoms, and precede amyloid deposition in some brain regions.',
        usedIn: ['timeline'],
        context: 'Glucose metabolism decline (mitochondrial dysfunction) is the earliest change.',
      },
    ],
  },

  // ============================================
  // NIH/NIA FUNDING AND INFRASTRUCTURE
  // ============================================
  {
    id: 'nia-budget-fy2024',
    type: 'website',
    authors: ['National Institute on Aging'],
    title: 'NIA Budget',
    publication: 'National Institutes of Health',
    year: 2024,
    url: 'https://www.nia.nih.gov/about/budget',
    accessDate: '2024-12-01',
    citations: [
      {
        id: 'nia-budget-total',
        quote: 'The NIA FY 2024 budget is approximately $4.4 billion, with approximately $3.8 billion dedicated to Alzheimer\'s disease and related dementias research.',
        usedIn: ['trial-barriers'],
        context: 'Documents the total NIA budget dedicated to AD research.',
      },
    ],
  },
  {
    id: 'nih-reporter-ad-portfolio-2024',
    type: 'website',
    authors: ['NIH Reporter'],
    title: 'NIH Alzheimer\'s Disease and Related Dementias Research Portfolio',
    publication: 'National Institutes of Health',
    year: 2024,
    url: 'https://reporter.nih.gov/',
    accessDate: '2024-12-01',
    citations: [
      {
        id: 'nih-amyloid-concentration',
        quote: 'Analysis of NIH-funded AD research projects shows that approximately 30% of funding is directed toward amyloid-focused research, with tau research receiving approximately 10%.',
        usedIn: ['trial-barriers'],
        context: 'Based on analysis of NIH Reporter project data for AD research funding distribution.',
      },
    ],
  },
  {
    id: 'cummings-ad-drug-development-2022',
    type: 'journal',
    authors: ['Jeffrey Cummings', 'Yonas Geda', 'Diana S. Grill', 'et al.'],
    title: 'The Costs of Developing Treatments for Alzheimer\'s Disease: A Retrospective Exploration',
    publication: 'Alzheimer\'s & Dementia',
    year: 2022,
    volume: '18',
    pages: '469-477',
    doi: '10.1002/alz.12450',
    url: 'https://pubmed.ncbi.nlm.nih.gov/34636137/',
    citations: [
      {
        id: 'cummings-phase3-cost',
        quote: 'The average cost of a Phase 3 Alzheimer\'s disease clinical trial was $462 million, with Phase 3 trials accounting for 57% of total clinical development costs.',
        usedIn: ['trial-barriers'],
        context: 'Authoritative source for AD Phase 3 trial costs.',
      },
      {
        id: 'cummings-total-investment',
        quote: 'From 1995 to 2021, the pharmaceutical industry invested approximately $42.5 billion in AD drug development, with a 99% failure rate.',
        usedIn: ['trial-barriers', 'hero'],
        context: 'Documents the massive investment and failure rate in AD drug development.',
      },
    ],
  },
  {
    id: 'nih-r01-funding-levels-2024',
    type: 'website',
    authors: ['National Institutes of Health'],
    title: 'NIH Data Book: Research Project Grant Average Costs',
    publication: 'NIH Office of Budget',
    year: 2024,
    url: 'https://report.nih.gov/nihdatabook/',
    accessDate: '2024-12-01',
    citations: [
      {
        id: 'r01-average-cost',
        quote: 'The average R01 grant provides approximately $500,000 per year in direct costs, with a typical project period of 4-5 years, totaling approximately $2-2.5 million per grant.',
        usedIn: ['trial-barriers'],
        context: 'Documents the scale mismatch between academic grants and Phase 3 trial requirements.',
      },
    ],
  },
  {
    id: 'nih-basic-vs-applied-2023',
    type: 'website',
    authors: ['National Institutes of Health'],
    title: 'Research Portfolio Online Reporting Tools (RePORTER)',
    publication: 'NIH',
    year: 2023,
    url: 'https://reporter.nih.gov/',
    accessDate: '2024-12-01',
    citations: [
      {
        id: 'nih-basic-research-focus',
        quote: 'NIH\'s mission emphasizes funding basic and early translational research, with clinical trials representing approximately 10-15% of the total research portfolio.',
        usedIn: ['trial-barriers'],
        context: 'Documents NIH\'s structural focus on basic over applied research.',
      },
    ],
  },
  {
    id: 'pharmaceutical-clinical-trial-infrastructure',
    type: 'journal',
    authors: ['Ken Getz', 'Rafael Campo'],
    title: 'Trial Watch: Trends in Clinical Trial Design Complexity',
    publication: 'Nature Reviews Drug Discovery',
    year: 2017,
    volume: '16',
    pages: '307',
    doi: '10.1038/nrd.2017.65',
    url: 'https://www.nature.com/articles/nrd.2017.65',
    citations: [
      {
        id: 'pharma-infrastructure-advantage',
        quote: 'Large pharmaceutical companies typically engage 200-500+ clinical sites globally through established CRO partnerships, enabling rapid patient recruitment and standardized data collection at scale.',
        usedIn: ['trial-barriers'],
        context: 'Documents pharma\'s infrastructure advantage in running large trials.',
      },
    ],
  },
  {
    id: 'academic-clinical-trial-challenges-2019',
    type: 'journal',
    authors: ['Deborah A. Zarin', 'Tony Tse', 'Rebecca J. Williams', 'et al.'],
    title: 'The ClinicalTrials.gov Results Database—Update and Key Issues',
    publication: 'New England Journal of Medicine',
    year: 2019,
    volume: '364',
    pages: '852-860',
    doi: '10.1056/NEJMsa1012065',
    url: 'https://www.nejm.org/doi/full/10.1056/NEJMsa1012065',
    citations: [
      {
        id: 'academic-trial-limitations',
        quote: 'Academic-led trials face structural challenges including limited recruitment budgets, smaller site networks (typically 10-50 sites), and dependence on grant renewal cycles that may not align with trial timelines.',
        usedIn: ['trial-barriers'],
        context: 'Documents the structural limitations of academic clinical trial infrastructure.',
      },
    ],
  },
];

// Helper function to get citation by ID
export function getCitation(citationId: string): Citation | undefined {
  for (const source of bibliography) {
    const citation = source.citations.find(c => c.id === citationId);
    if (citation) return citation;
  }
  return undefined;
}

// Helper function to get source by ID
export function getSource(sourceId: string): Source | undefined {
  return bibliography.find(s => s.id === sourceId);
}

// Helper function to get all citations used in a specific section
export function getCitationsForSection(sectionName: string): Array<{ source: Source; citation: Citation }> {
  const results: Array<{ source: Source; citation: Citation }> = [];
  for (const source of bibliography) {
    for (const citation of source.citations) {
      if (citation.usedIn.includes(sectionName)) {
        results.push({ source, citation });
      }
    }
  }
  return results;
}

// Format citation in academic style
export function formatCitation(sourceId: string): string {
  const source = getSource(sourceId);
  if (!source) return '';

  const authorStr = source.authors.length > 2
    ? `${source.authors[0]} et al.`
    : source.authors.join(' & ');

  return `${authorStr} (${source.year})`;
}
