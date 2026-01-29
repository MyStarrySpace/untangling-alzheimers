// Research Misconduct Sources
// Includes: THE LESNÉ SCANDAL, THE ZLOKOVIC SCANDAL

import { Source } from './types';

export const scandalSources: Source[] = [
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
  // THE ZLOKOVIC SCANDAL
  // ============================================
  {
    id: 'piller-2023-zlokovic',
    type: 'journal',
    authors: ['Charles Piller'],
    title: 'Brain games?',
    publication: 'Science',
    year: 2023,
    volume: '382',
    pages: '754-759',
    doi: '10.1126/science.adm9261',
    url: 'https://www.science.org/content/article/misconduct-concerns-possible-drug-risks-should-stop-stroke-trial-whistleblowers-say',
    citations: [
      {
        id: 'piller-2023-zlokovic-dossier',
        quote: 'A 113-page dossier from whistleblowers highlighted evidence that dozens of papers from Zlokovic\'s lab contain seemingly doctored data suggesting scientific misconduct.',
        usedIn: ['timeline', 'caseStudies'],
        context: 'The Science investigation that triggered the NIH trial halt and USC investigation.',
      },
      {
        id: 'piller-2023-zlokovic-culture',
        quote: 'Four former members of Zlokovic\'s lab said the anomalies were no accident. They described a culture of intimidation in which he regularly pushed them to adjust data.',
        usedIn: ['caseStudies'],
        context: 'Whistleblower testimony about systematic data manipulation.',
      },
      {
        id: 'piller-2023-zlokovic-scope',
        quote: 'The whistleblower report identified allegedly doctored images and data in 35 research papers in which Zlokovic was the sole common author, which have accumulated more than 8,400 citations.',
        usedIn: ['timeline', 'caseStudies'],
        context: 'The scale of the suspected fraud across Zlokovic\'s publications.',
      },
    ],
  },

  {
    id: 'zlokovic-pericyte-retraction-2024',
    type: 'journal',
    authors: ['Abhay P. Sagare', 'Robert D. Bell', 'Zhen Zhao', 'Qingyi Ma', 'Ethan A. Winkler', 'Anita Ramanathan', 'Berislav V. Zlokovic'],
    title: 'Retraction Note: Pericyte loss influences Alzheimer-like neurodegeneration in mice',
    publication: 'Nature Communications',
    year: 2024,
    volume: '15',
    pages: '2882',
    doi: '10.1038/s41467-024-47285-6',
    url: 'https://www.nature.com/articles/s41467-024-47285-6',
    citations: [
      {
        id: 'zlokovic-pericyte-retraction',
        quote: 'The authors retracted the article after concerns were raised about some of the data reported, specifically similarities identified between representative image panels in Fig. 7, showing tissue staining with different anti-tau antibodies.',
        usedIn: ['timeline', 'caseStudies'],
        context: 'Retraction of key paper claiming pericyte loss causes AD-like neurodegeneration in mice.',
      },
      {
        id: 'zlokovic-pericyte-no-data',
        quote: 'Due to the age of the paper, the authors no longer have access to all original data for this publication, and so can no longer be confident in the reliability of the data reported.',
        usedIn: ['caseStudies'],
        context: 'Original data no longer available to verify the findings.',
      },
    ],
  },

  {
    id: 'zlokovic-whitematter-retraction-2024',
    type: 'journal',
    authors: ['Axel Montagne', 'Angeliki M. Nikolakopoulou', 'Zhen Zhao', 'Abhay P. Sagare', 'et al.', 'Berislav V. Zlokovic'],
    title: 'Retraction Note: Pericyte degeneration causes white matter dysfunction in the mouse central nervous system',
    publication: 'Nature Medicine',
    year: 2024,
    volume: '30',
    pages: '1215',
    doi: '10.1038/s41591-024-02935-6',
    url: 'https://www.nature.com/articles/s41591-024-02935-6',
    citations: [
      {
        id: 'zlokovic-whitematter-retraction',
        quote: 'The authors retracted this article after concerns were raised regarding the images presented in the figures and supplementary materials.',
        usedIn: ['timeline', 'caseStudies'],
        context: 'Retraction of paper linking pericyte degeneration to white matter dysfunction.',
      },
      {
        id: 'zlokovic-whitematter-overlap',
        quote: 'Fig. 4n S1Cx +/+ and F7/F7 images appear to overlap with each other, as well as with Fig. 7f Cortex APPsw/0,PDGFRb+/+ and Fig. S3b Cortex PDGFRb+/+ in ref. 1.',
        usedIn: ['caseStudies'],
        context: 'Specific image overlap between figures in this paper and the other retracted Zlokovic pericyte paper.',
      },
    ],
  },

  {
    id: 'zlokovic-leave-2024',
    type: 'news',
    authors: ['Charles Piller'],
    title: 'Top Alzheimer\'s researcher goes \'on leave\' amid misconduct concerns',
    publication: 'Science',
    year: 2024,
    url: 'https://www.science.org/content/article/top-alzheimer-s-researcher-goes-leave-amid-misconduct-concerns',
    accessDate: '2025-01-28',
    citations: [
      {
        id: 'zlokovic-leave',
        quote: 'Zlokovic is on leave nearly a year after allegations of research misconduct cast doubt on his published work. He also stepped down as co-director of USC\'s federally funded Alzheimer\'s Disease Research Center.',
        usedIn: ['timeline', 'caseStudies'],
        context: 'Institutional consequences at USC.',
      },
      {
        id: 'zlokovic-trial-halted',
        quote: 'A planned $30 million clinical trial of a stroke drug candidate Zlokovic helped develop has been formally called off by its company sponsor, and the NIH has required that USC return nearly $2 million in funding for the trial.',
        usedIn: ['timeline', 'caseStudies'],
        context: 'The 3K3A-APC trial was halted and $1.9M returned to NIH.',
      },
      {
        id: 'zlokovic-retractions-count',
        quote: 'Since the allegations became public, the scientific journals that published the questioned papers have issued four retractions and posted nine corrections and two expressions of concern.',
        usedIn: ['caseStudies'],
        context: 'Running total of journal actions on Zlokovic\'s papers.',
      },
    ],
  },
];
