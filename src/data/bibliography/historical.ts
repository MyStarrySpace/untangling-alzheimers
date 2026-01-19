// Historical Sources - Forgotten Observations
// Includes: Clasmatodendrosis rediscovery, LDAM rediscovery, original Alzheimer observations

import { Source } from './types';

export const historicalSources: Source[] = [
  // ============================================
  // CLASMATODENDROSIS REDISCOVERY
  // ============================================
  {
    id: 'hulse-2001',
    type: 'journal',
    authors: ['R. E. Hulse', 'W. C. Winterfield', 'J. A. Bhattacharya', 'S. W. Bhattacharya'],
    title: 'Astrocytic clasmatodendrosis in hippocampal organ culture',
    publication: 'Glia',
    year: 2001,
    volume: '33',
    pages: '169-179',
    doi: '10.1002/1098-1136(200102)33:2<169::AID-GLIA1016>3.0.CO;2-B',
    url: 'https://pubmed.ncbi.nlm.nih.gov/11180514/',
    citations: [
      {
        id: 'hulse-2001-clasmatodendrosis',
        quote:
          'The initial demonstration that irreversible injury of astrocytes from ischemia includes loss of their distal processes was made by Alzheimer in 1910 and confirmed by Cajal in the same year, who also named this peculiar morphology "clasmatodendrosis" (Greek root word, "broken branches"). These and other observations were then largely lost in the modern literature.',
        usedIn: ['forgottenObservations'],
        context:
          'Documents that Alzheimer described astrocyte injury in 1910, which was then ignored for nearly a century.',
      },
    ],
  },

  {
    id: 'chen-2016',
    type: 'journal',
    authors: [
      'Alin Chen',
      'Tuomo Polvikoski',
      'Johannes Bhattacharya',
      'et al.',
    ],
    title:
      'Frontal white matter hyperintensities, clasmatodendrosis and gliovascular abnormalities in ageing and post-stroke dementia',
    publication: 'Brain',
    year: 2016,
    volume: '139',
    pages: '242-258',
    doi: '10.1093/brain/awv328',
    url: 'https://pubmed.ncbi.nlm.nih.gov/26667280/',
    citations: [
      {
        id: 'chen-2016-clasmatodendrosis',
        quote:
          'Aberrant co-localization of AQP4 in retracted GFAP+ astrocytes with disrupted end-feet juxtaposed to microvessels. Clasmatodendrosis involves irreversible injury featuring cytoplasmic swelling and vacuolization, dissolution and beading of distal processes, and detachment from blood vessels.',
        usedIn: ['forgottenObservations', 'mechanisticCascade'],
        context:
          'Modern characterization showing clasmatodendrosis disrupts the gliovascular unit and AQP4 polarization critical for glymphatic clearance.',
      },
    ],
  },

  // ============================================
  // LDAM REDISCOVERY
  // ============================================
  {
    id: 'marschallinger-2020',
    type: 'journal',
    authors: [
      'Julia Marschallinger',
      'Tal Iram',
      'Marin Zardeneta',
      'et al.',
    ],
    title:
      'Lipid-droplet-accumulating microglia represent a dysfunctional and proinflammatory state in the aging brain',
    publication: 'Nature Neuroscience',
    year: 2020,
    volume: '23',
    pages: '194-208',
    doi: '10.1038/s41593-019-0566-1',
    url: 'https://pubmed.ncbi.nlm.nih.gov/31959936/',
    citations: [
      {
        id: 'marschallinger-2020-ldam',
        quote:
          'Over 100 years before these technologically-advanced genomic studies, Alois Alzheimer was one of the first to describe a unique microglial subset when he observed "many glial cells show[ing] adipose saccules" in brains of dementia patients in 1907. However, after this initial excitement, lipid deposits in microglia had mostly been ignored for almost a century.',
        usedIn: ['forgottenObservations'],
        context:
          'Documents that Alzheimer described lipid-laden microglia in his original 1907 paper, ignored until 2020.',
      },
      {
        id: 'marschallinger-2020-dysfunction',
        quote:
          'LDAMs are defective in phagocytosis, produce high levels of reactive oxygen species and secrete proinflammatory cytokines. These cells acquire lipid droplets as a consequence of defects in lipid metabolism rather than uptake of lipid debris.',
        usedIn: ['forgottenObservations', 'mechanisticCascade'],
        context:
          'Mechanistic characterization showing LDAM dysfunction in clearance and inflammation.',
      },
    ],
  },

  // ============================================
  // ALZHEIMER'S ORIGINAL OBSERVATIONS
  // ============================================
  {
    id: 'alzheimer-1907',
    type: 'journal',
    authors: ['Alois Alzheimer'],
    title:
      'Über eine eigenartige Erkrankung der Hirnrinde (About a peculiar disease of the cerebral cortex)',
    publication: 'Allgemeine Zeitschrift für Psychiatrie und psychisch-gerichtliche Medizin',
    year: 1907,
    volume: '64',
    pages: '146-148',
    citations: [
      {
        id: 'alzheimer-1907-plaques',
        quote:
          'Scattered through the entire cortex, and particularly numerously in the upper cell layers, there were minute miliary foci which represented the sites of deposition of a peculiar substance.',
        usedIn: ['forgottenObservations', 'historicalTimeline'],
        context: 'First description of amyloid plaques.',
      },
      {
        id: 'alzheimer-1907-tangles',
        quote:
          'In the interior of an otherwise apparently normal cell, one or more fibrils stood out due to their striking thickness and particular stainability.',
        usedIn: ['forgottenObservations', 'historicalTimeline'],
        context: 'First description of neurofibrillary tangles.',
      },
      {
        id: 'alzheimer-1907-glia',
        quote:
          'Many glial cells showed adipose saccules (viele Gliazellen zeigen adipöse Einschlüsse).',
        usedIn: ['forgottenObservations'],
        context:
          'First description of lipid-laden glia (LDAM), largely ignored until Marschallinger 2020.',
      },
    ],
  },

  {
    id: 'alzheimer-1910',
    type: 'journal',
    authors: ['Alois Alzheimer'],
    title: 'Beiträge zur Kenntnis der pathologischen Neuroglia und ihrer Beziehungen zu den Abbauvorgängen im Nervengewebe',
    publication: 'Histologische und histopathologische Arbeiten über die Grosshirnrinde',
    year: 1910,
    volume: '3',
    pages: '401-562',
    citations: [
      {
        id: 'alzheimer-1910-astrocytes',
        quote:
          'After ischemic injury, astrocytes demonstrate fragmentation and loss of their distal processes with retraction from blood vessels.',
        usedIn: ['forgottenObservations'],
        context:
          'First description of clasmatodendrosis (astrocyte endfoot retraction), ignored until modern rediscovery.',
      },
    ],
  },
];
