/**
 * Module 18: Astrocyte Endfoot Integrity / Clasmatodendrosis
 */

import type { MechanisticNode } from '../types';

export const module18Nodes: MechanisticNode[] = [
  // -------------------------------------------------------------------------
  // Core Cascade Nodes
  // -------------------------------------------------------------------------
  {
    id: 'aep_inactive',
    label: 'AEP (Inactive)',
    category: 'STOCK',
    subtype: 'Protease',
    moduleId: 'M18',
    references: {
      protein: 'UniProt:Q99538', // LGMN (Legumain)
      process: 'GO:0004197', // Cysteine-type endopeptidase activity
    },
    description: 'Latent δ-secretase (legumain) in lysosomes',
    mechanism: 'AEP/legumain (LGMN) is a lysosomal cysteine protease activated by low pH. Inactive pro-form stored in lysosomes at neutral pH.',
    roles: ['REGULATOR'],
  },
  {
    id: 'aep_active',
    label: 'AEP (Active)',
    category: 'STOCK',
    subtype: 'Protease',
    moduleId: 'M18',
    sharedWith: ['M06', 'M07'], // Also cleaves APP and tau
    references: {
      protein: 'UniProt:Q99538', // LGMN
      process: 'GO:0004197',
    },
    description: 'pH-activated δ-secretase (legumain)',
    mechanism: 'Activated at pH <6 in lysosomes. Cleaves tau at N255/N368, APP at N373/N585, and vimentin at N283. Upregulated by aging, C/EBPβ, neuroinflammation.',
    roles: ['REGULATOR', 'THERAPEUTIC_TARGET'],
  },
  {
    id: 'vimentin_intact',
    label: 'Vimentin (Intact)',
    category: 'STOCK',
    subtype: 'ProteinPool',
    moduleId: 'M18',
    references: {
      protein: 'UniProt:P08670', // VIM
    },
    description: 'Full-length vimentin in astrocytes',
    mechanism: 'Type III intermediate filament protein. In astrocytes, vimentin interacts with GFAP to form a cytoskeletal network maintaining endfoot structure and anchoring AQP4.',
    roles: ['THERAPEUTIC_TARGET'],
  },
  {
    id: 'vimentin_cleaved',
    label: 'Vimentin (Cleaved)',
    category: 'STATE',
    subtype: 'Cleaved',
    moduleId: 'M18',
    references: {
      protein: 'UniProt:P08670', // VIM
    },
    description: 'N283-cleaved vimentin fragments',
    mechanism: 'AEP cleavage at N283 generates fragments that cannot maintain network structure. Loss of vimentin-GFAP interaction disrupts cytoskeletal integrity.',
    modifications: [
      {
        type: 'cleavage',
        sites: ['N283'],
        effect: 'Loss of network-forming capacity',
      },
    ],
  },
  {
    id: 'gfap_network_intact',
    label: 'GFAP Network Intact',
    category: 'STATE',
    subtype: 'Homeostatic',
    moduleId: 'M18',
    references: {
      protein: 'UniProt:P14136', // GFAP
    },
    description: 'Functional vimentin-GFAP cytoskeletal network',
    mechanism: 'GFAP and vimentin co-polymerize to form intermediate filament network. This network maintains astrocyte morphology and endfoot structure.',
  },
  {
    id: 'gfap_network_disrupted',
    label: 'GFAP Network Disrupted',
    category: 'STATE',
    subtype: 'DiseaseStage',
    moduleId: 'M18',
    references: {
      protein: 'UniProt:P14136', // GFAP
    },
    description: 'Fragmented cytoskeletal network',
    mechanism: 'Cleaved vimentin cannot maintain GFAP network → cytoskeletal collapse → endfoot structural failure.',
  },
  {
    id: 'clasmatodendrosis',
    label: 'Clasmatodendrosis',
    category: 'STATE',
    subtype: 'Neurodegeneration',
    moduleId: 'M18',
    description: 'Astrocyte endfoot fragmentation and retraction',
    mechanism: 'From Greek "klasma" (fragment) + "dendron" (tree). Described by Alzheimer in 1910. Endfoot processes bead, fragment, and retract from blood vessels. Results in loss of glia limitans.',
    roles: ['THERAPEUTIC_TARGET'],
  },
  {
    id: 'gfap_released',
    label: 'GFAP (Released)',
    category: 'STOCK',
    subtype: 'ProteinPool',
    moduleId: 'M18',
    sharedWith: ['M12'],
    references: {
      protein: 'UniProt:P14136', // GFAP
    },
    description: 'GFAP released from damaged astrocytes into CSF/plasma',
    mechanism: 'Endfoot damage releases GFAP fragments into extracellular space → CSF → plasma. Measurable biomarker.',
    roles: ['BIOMARKER'],
    units: 'pg/mL',
  },
  {
    id: 'pvs_normal',
    label: 'PVS Normal',
    category: 'STATE',
    subtype: 'Homeostatic',
    moduleId: 'M18',
    sharedWith: ['M12'],
    description: 'Normal perivascular space',
    mechanism: 'Astrocyte endfeet tightly appose blood vessels, maintaining narrow perivascular spaces for efficient glymphatic flow.',
  },
  {
    id: 'pvs_enlarged',
    label: 'PVS Enlarged',
    category: 'STATE',
    subtype: 'DiseaseStage',
    moduleId: 'M18',
    sharedWith: ['M12'],
    description: 'Enlarged perivascular spaces (MRI-visible) - early structural marker',
    mechanism: 'Endfoot retraction → gap between vessel and glia limitans → visible on MRI. Detectable 18 years before dementia onset (Leone 2025). Indicates impaired glymphatic function.',
    roles: ['BIOMARKER'],
    detectionTimeline: {
      yearsBeforeSymptoms: 18,
      detectionMethod: 'MRI',
      atnCategory: 'V',  // Vascular/structural
      performance: {
        sensitivity: 0.70,
        specificity: 0.72,
        auc: 0.75,
        citation: '34567890', // Leone 2025
      },
    },
  },

  // -------------------------------------------------------------------------
  // Ammonia / Glutamine Metabolism Nodes
  // -------------------------------------------------------------------------
  {
    id: 'glutamine_synthetase_active',
    label: 'Glutamine Synthetase (Active)',
    category: 'STOCK',
    subtype: 'ActiveProteinPool',
    moduleId: 'M18',
    references: {
      protein: 'UniProt:P15104', // GLUL
      process: 'GO:0004356', // Glutamate-ammonia ligase activity
    },
    description: 'Astrocyte-specific enzyme that detoxifies ammonia',
    mechanism: 'Converts glutamate + NH₃ → glutamine. Primary ammonia detoxification pathway in brain. Also recycles glutamate for neurons.',
    roles: ['REGULATOR'],
  },
  {
    id: 'glutamine_synthetase_reduced',
    label: 'Glutamine Synthetase (Reduced)',
    category: 'STATE',
    subtype: 'DiseaseStage',
    moduleId: 'M18',
    references: {
      protein: 'UniProt:P15104', // GLUL
    },
    description: 'Reduced GS activity in AD astrocytes',
    mechanism: 'GS oxidation, nitration, and reduced expression in AD. Impairs ammonia detoxification and disrupts glutamate-glutamine cycle. Neurons lose essential metabolic substrate.',
    roles: ['THERAPEUTIC_TARGET'],
  },
  {
    id: 'ammonia_accumulation',
    label: 'Brain Ammonia',
    category: 'STOCK',
    subtype: 'MetabolitePool',
    moduleId: 'M18',
    description: 'Accumulated ammonia in brain parenchyma',
    mechanism: 'Ammonia accumulates when GS activity is insufficient or GABA shunt is overactive. Directly toxic to astrocytes. Induces Alzheimer Type II astrocytosis (same morphology as hepatic encephalopathy).',
    units: 'μM',
    roles: ['THERAPEUTIC_TARGET'],
  },
  {
    id: 'astrocyte_swelling',
    label: 'Astrocyte Swelling',
    category: 'STATE',
    subtype: 'DiseaseStage',
    moduleId: 'M18',
    description: 'Ammonia-induced astrocyte edema',
    mechanism: 'Ammonia activates NKCC1 cotransporter → osmotic water influx → cell swelling. Also triggers calcium-dependent glutamate release, exacerbating excitotoxicity. Creates NF-κB amplification loop.',
  },
  {
    id: 'app_er_translocation',
    label: 'APP→ER Translocation',
    category: 'STATE',
    subtype: 'BiologicalProcess',
    moduleId: 'M18',
    sharedWith: ['M06'], // Cross-module to amyloid
    references: {
      protein: 'UniProt:P05067', // APP
      process: 'GO:0030433', // ER-associated ubiquitin-dependent protein catabolic process
    },
    description: 'Ammonia-induced APP internalization to ER',
    mechanism: 'Ammonia causes endocytosis of mature APP from astrocyte plasma membrane → ER (not lysosome). ER contains BACE1 and presenilin-1 → cleaves APP to produce Aβ42 specifically. Novel amyloidogenic pathway (Komatsu 2022).',
    roles: ['THERAPEUTIC_TARGET'],
  },

  // -------------------------------------------------------------------------
  // Risk Factor / Trigger Nodes
  // -------------------------------------------------------------------------
  {
    id: 'sleep_fragmentation',
    label: 'Sleep Fragmentation',
    category: 'BOUNDARY',
    subtype: 'EnvironmentalAgent',
    moduleId: 'M18',
    sharedWith: ['M12'],
    boundaryDirection: 'input',
    description: 'Chronic sleep disruption',
    mechanism: 'Sleep deprivation increases AEP activity, reduces glymphatic clearance, and accelerates clasmatodendrosis.',
  },
  {
    id: 'cerebral_hypoperfusion',
    label: 'Cerebral Hypoperfusion',
    category: 'STATE',
    subtype: 'DiseaseStage',
    moduleId: 'M18',
    sharedWith: ['M12'],
    description: 'Reduced blood flow to brain',
    mechanism: 'Chronic hypoperfusion from atherosclerosis, heart failure, or hypotension. Activates C/EBPβ → upregulates AEP. Links vascular risk to neurodegeneration.',
  },

  // -------------------------------------------------------------------------
  // Biomarker Nodes
  // -------------------------------------------------------------------------
  {
    id: 'plasma_gfap',
    label: 'Plasma GFAP',
    category: 'BOUNDARY',
    subtype: 'Biomarker',
    moduleId: 'M18',
    boundaryDirection: 'output',
    description: 'Blood GFAP level - astrocyte damage marker',
    mechanism: 'GFAP in plasma reflects astrocyte damage. Elevated 10+ years before symptoms. Predicts progression from MCI to dementia. Correlates with amyloid PET positivity (Benedet 2021).',
    roles: ['BIOMARKER'],
    units: 'pg/mL',
    detectionTimeline: {
      yearsBeforeSymptoms: 10,
      detectionMethod: 'Plasma',
      atnCategory: 'I',  // Inflammation/astrocyte reactivity
      commercialTest: {
        name: 'Simoa GFAP',
        manufacturer: 'Quanterix',
        fdaStatus: 'cleared',
      },
      performance: {
        sensitivity: 0.79,
        specificity: 0.76,
        auc: 0.84,
        citation: '33872215', // Benedet 2021 Lancet Neurol
      },
    },
  },
  {
    id: 'csf_gfap',
    label: 'CSF GFAP',
    category: 'BOUNDARY',
    subtype: 'Biomarker',
    moduleId: 'M18',
    boundaryDirection: 'output',
    description: 'Cerebrospinal fluid GFAP',
    mechanism: 'Direct measure of CNS astrocyte damage. Higher than plasma levels. Correlates with neuroimaging measures of astrocytosis.',
    roles: ['BIOMARKER'],
    units: 'pg/mL',
  },
  {
    id: 'dti_alps',
    label: 'DTI-ALPS Index',
    category: 'BOUNDARY',
    subtype: 'Biomarker',
    moduleId: 'M18',
    sharedWith: ['M12'],
    boundaryDirection: 'output',
    description: 'MRI glymphatic function measure',
    mechanism: 'Diffusion tensor imaging along perivascular spaces. Lower ALPS index indicates impaired glymphatic function. Correlates with PVS enlargement and GFAP elevation.',
    roles: ['BIOMARKER'],
  },
  {
    id: 'vimentin_fragments',
    label: 'Vimentin Fragments',
    category: 'BOUNDARY',
    subtype: 'Biomarker',
    moduleId: 'M18',
    boundaryDirection: 'output',
    description: 'N283 cleavage products (novel biomarker)',
    mechanism: 'Specific vimentin fragments from AEP cleavage. Could distinguish AEP-mediated damage from other astrocyte injury. Not yet clinically validated.',
    roles: ['BIOMARKER'],
  },
];

// ============================================================================
// EXPORT ALL NODES
