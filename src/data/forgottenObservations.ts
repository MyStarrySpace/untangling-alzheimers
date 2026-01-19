// Forgotten Observations Data
// Documents Alzheimer's original 1907/1910 observations that were ignored for a century

export interface ForgottenObservation {
  id: string;
  originalDescription: string; // Alzheimer's words
  modernTerm: string;
  mechanism: string;
  yearObserved: number;
  yearRediscovered: number;
  gapYears: number;
  paperCount: number; // PubMed count
  comparisonTopic: string;
  comparisonPaperCount: number;
  ratio: string; // e.g., "604:1"
  cellType: string;
  mechanisticPosition: 'upstream' | 'downstream';
  implications: string;
  citationIds: string[];
}

export const forgottenObservations: ForgottenObservation[] = [
  {
    id: 'clasmatodendrosis',
    originalDescription: 'Astrocytes losing distal processes after reduction in blood flow',
    modernTerm: 'Clasmatodendrosis',
    mechanism:
      'Irreversible astrocyte injury with fragmentation and retraction of endfeet, leading to AQP4 depolarization and glymphatic failure',
    yearObserved: 1910,
    yearRediscovered: 2016,
    gapYears: 106,
    paperCount: 70,
    comparisonTopic: 'Tau tangles + AD',
    comparisonPaperCount: 42300,
    ratio: '604:1',
    cellType: 'Astrocyte',
    mechanisticPosition: 'upstream',
    implications: 'Endfoot damage precedes and may cause impaired Aβ clearance',
    citationIds: ['hulse-2001-clasmatodendrosis', 'chen-2016-clasmatodendrosis'],
  },
  {
    id: 'ldam',
    originalDescription: 'Many glia include adipose inclusions / adipose saccules',
    modernTerm: 'LDAM (Lipid Droplet-Accumulating Microglia)',
    mechanism:
      'Dysfunctional microglia that accumulate lipids, show impaired phagocytosis, and release pro-inflammatory cytokines',
    yearObserved: 1907,
    yearRediscovered: 2020,
    gapYears: 113,
    paperCount: 87,
    comparisonTopic: 'Microglia + AD (general)',
    comparisonPaperCount: 10370,
    ratio: '119:1',
    cellType: 'Microglia',
    mechanisticPosition: 'upstream',
    implications: 'Impaired clearance and inflammation precede plaque formation',
    citationIds: ['marschallinger-2020-ldam'],
  },
];

// Alzheimer's four original observations for the comparison table
export interface AlzheimerObservation {
  id: string;
  originalDescription: string;
  modernTerm: string;
  paperCount: number;
  status: 'heavily-studied' | 'ignored';
  yearObserved: number;
  yearRediscovered?: number;
  gapYears?: number;
}

export const alzheimerObservations: AlzheimerObservation[] = [
  {
    id: 'neurofibrils',
    originalDescription: 'Striking changes of neurofibrils',
    modernTerm: 'Tau tangles (NFTs)',
    paperCount: 42300,
    status: 'heavily-studied',
    yearObserved: 1907,
  },
  {
    id: 'plaques',
    originalDescription: 'Minute miliary foci',
    modernTerm: 'Amyloid plaques',
    paperCount: 48500,
    status: 'heavily-studied',
    yearObserved: 1907,
  },
  {
    id: 'ldam',
    originalDescription: 'Many glia showing adipose saccules',
    modernTerm: 'LDAM',
    paperCount: 87,
    status: 'ignored',
    yearObserved: 1907,
    yearRediscovered: 2020,
    gapYears: 113,
  },
  {
    id: 'clasmatodendrosis',
    originalDescription: 'Astrocyte distal process loss',
    modernTerm: 'Clasmatodendrosis',
    paperCount: 70,
    status: 'ignored',
    yearObserved: 1910,
    yearRediscovered: 2016,
    gapYears: 106,
  },
];

// Research investment inversion data for the bar chart
export interface InversionComparison {
  id: string;
  studiedTopic: string;
  studiedCount: number;
  ignoredTopic: string;
  ignoredCount: number;
  ratio: string;
  description: string;
}

export const inversionComparisons: InversionComparison[] = [
  {
    id: 'tau-clasmatodendrosis',
    studiedTopic: 'Tau tangles + AD',
    studiedCount: 42300,
    ignoredTopic: 'Clasmatodendrosis + AD',
    ignoredCount: 70,
    ratio: '604:1',
    description: 'Neuronal pathology vs astrocytic pathology',
  },
  {
    id: 'amyloid-endfeet',
    studiedTopic: 'Amyloid plaques + AD',
    studiedCount: 48500,
    ignoredTopic: 'Astrocyte endfeet + AD',
    ignoredCount: 823,
    ratio: '59:1',
    description: 'Downstream deposits vs upstream clearance mechanism',
  },
  {
    id: 'oligodendrocyte-clasmato',
    studiedTopic: 'Oligodendrocytes + AD',
    studiedCount: 7980,
    ignoredTopic: 'Clasmatodendrosis + AD',
    ignoredCount: 70,
    ratio: '114:1',
    description: 'Cell type generally vs specific Alzheimer-described pathology',
  },
];
