// Centralized abbreviations dictionary for the project
// Used by the TextWithAbbreviations component to automatically add tooltips

export const abbreviations = {
  // Greek symbols
  'Aβ': 'Amyloid-beta',
  'TNF-α': 'Tumor Necrosis Factor Alpha',

  // Proteins and molecules
  'APP': 'Amyloid Precursor Protein',
  'APOE4': 'Apolipoprotein E4',
  'AChE': 'Acetylcholinesterase',
  'ACh': 'Acetylcholine',
  'BDNF': 'Brain-Derived Neurotrophic Factor',
  'GLP-1': 'Glucagon-Like Peptide-1',
  'TNF': 'Tumor Necrosis Factor',
  'NMDA': 'N-Methyl-D-Aspartate',
  'NFT': 'Neurofibrillary Tangles',
  'LTP': 'Long-Term Potentiation',

  // Medical terms
  'AD': "Alzheimer's Disease",
  'MCI': 'Mild Cognitive Impairment',
  'BBB': 'Blood-Brain Barrier',
  'CSF': 'Cerebrospinal Fluid',
  'RCT': 'Randomized Controlled Trial',
  'PET': 'Positron Emission Tomography',

  // Organizations
  'FDA': 'Food and Drug Administration',
  'NIH': 'National Institutes of Health',
  'NIA': 'National Institute on Aging',
} as const;

export type AbbreviationKey = keyof typeof abbreviations;

// Get all abbreviation keys sorted by length (longest first) for regex matching
export function getAbbreviationPattern(): string {
  const sortedKeys = Object.keys(abbreviations).sort((a, b) => b.length - a.length);
  return sortedKeys.map(key => key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
}
