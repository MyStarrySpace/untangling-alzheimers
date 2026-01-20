/**
 * Simulation Scenario Presets
 *
 * Pre-built patient scenarios for common use cases:
 * - Research: Test specific hypotheses
 * - Clinical: Model typical patient presentations
 * - Education: Demonstrate disease progression
 */

import type { ScenarioPreset, PatientScenario, DEFAULT_LIFESTYLE, DEFAULT_COMORBIDITIES } from './types';

// ============================================================================
// APOE RISK SCENARIOS
// ============================================================================

export const apoe4HomozygousPreset: ScenarioPreset = {
  id: 'apoe4_homozygous',
  name: 'APOE4 Homozygous Carrier',
  description: 'High-risk APOE4/4 carrier with 12x baseline risk. Models accelerated amyloid accumulation and impaired clearance.',
  scenario: {
    age: 60,
    sex: 'female',
    apoeGenotype: 'e4/e4',
    diseaseStage: 'preclinical',
    lifestyle: {
      exerciseLevel: 0.3,
      dietQuality: 0.4,
      sleepQuality: 0.5,
      cognitiveEngagement: 0.4,
      socialEngagement: 0.5,
      stressLevel: 0.5,
      smokingStatus: 'never',
      alcoholConsumption: 'moderate',
    },
    comorbidities: {
      diabetes: false,
      hypertension: false,
      cardiovascularDisease: false,
      obesity: false,
      depression: false,
      tbiHistory: false,
      hearingLoss: false,
    },
  },
  suggestedTreatments: ['lecanemab', 'exercise_aerobic', 'lithium_orotate'],
  tags: ['genetic_risk', 'apoe4', 'preclinical', 'high_risk'],
};

export const apoe4HeterozygousPreset: ScenarioPreset = {
  id: 'apoe4_heterozygous',
  name: 'APOE4 Heterozygous Carrier',
  description: 'Moderate-risk APOE3/4 carrier with 3x baseline risk. Common scenario for prevention studies.',
  scenario: {
    age: 65,
    sex: 'male',
    apoeGenotype: 'e3/e4',
    diseaseStage: 'preclinical',
    lifestyle: {
      exerciseLevel: 0.4,
      dietQuality: 0.5,
      sleepQuality: 0.5,
      cognitiveEngagement: 0.5,
      socialEngagement: 0.5,
      stressLevel: 0.4,
      smokingStatus: 'never',
      alcoholConsumption: 'moderate',
    },
    comorbidities: {
      diabetes: false,
      hypertension: false,
      cardiovascularDisease: false,
      obesity: false,
      depression: false,
      tbiHistory: false,
      hearingLoss: false,
    },
  },
  suggestedTreatments: ['exercise_aerobic', 'diet_mediterranean', 'lithium_orotate'],
  tags: ['genetic_risk', 'apoe4', 'preclinical', 'moderate_risk'],
};

export const apoe2ProtectivePreset: ScenarioPreset = {
  id: 'apoe2_protective',
  name: 'APOE2 Carrier (Protective)',
  description: 'Low-risk APOE2/3 carrier with 0.8x baseline risk. Models enhanced clearance and resilience.',
  scenario: {
    age: 70,
    sex: 'female',
    apoeGenotype: 'e2/e3',
    diseaseStage: 'preclinical',
    lifestyle: {
      exerciseLevel: 0.3,
      dietQuality: 0.4,
      sleepQuality: 0.5,
      cognitiveEngagement: 0.4,
      socialEngagement: 0.5,
      stressLevel: 0.5,
      smokingStatus: 'never',
      alcoholConsumption: 'moderate',
    },
    comorbidities: {
      diabetes: false,
      hypertension: false,
      cardiovascularDisease: false,
      obesity: false,
      depression: false,
      tbiHistory: false,
      hearingLoss: false,
    },
  },
  suggestedTreatments: [],
  tags: ['genetic_risk', 'apoe2', 'low_risk', 'resilience'],
};

// ============================================================================
// METABOLIC SCENARIOS
// ============================================================================

export const metabolicSyndromePreset: ScenarioPreset = {
  id: 'metabolic_syndrome',
  name: 'Metabolic Syndrome',
  description: 'Type 2 diabetes + obesity + hypertension. Models insulin resistance cascade and vascular contributions.',
  scenario: {
    age: 62,
    sex: 'male',
    apoeGenotype: 'e3/e3',
    diseaseStage: 'mci',
    lifestyle: {
      exerciseLevel: 0.1,
      dietQuality: 0.2,
      sleepQuality: 0.4,
      cognitiveEngagement: 0.3,
      socialEngagement: 0.3,
      stressLevel: 0.6,
      smokingStatus: 'former',
      alcoholConsumption: 'moderate',
    },
    comorbidities: {
      diabetes: true,
      hypertension: true,
      cardiovascularDisease: false,
      obesity: true,
      depression: false,
      tbiHistory: false,
      hearingLoss: false,
    },
  },
  suggestedTreatments: ['metformin', 'exercise_aerobic', 'diet_mediterranean'],
  tags: ['metabolic', 'insulin_resistance', 'vascular', 'mci'],
};

export const prediabeticSedentaryPreset: ScenarioPreset = {
  id: 'prediabetic_sedentary',
  name: 'Prediabetic Sedentary',
  description: 'Sedentary lifestyle with prediabetes. High mTORC1 activity and oxidative stress. Good candidate for lifestyle intervention.',
  scenario: {
    age: 58,
    sex: 'female',
    apoeGenotype: 'e3/e4',
    diseaseStage: 'preclinical',
    lifestyle: {
      exerciseLevel: 0.1,
      dietQuality: 0.3,
      sleepQuality: 0.4,
      cognitiveEngagement: 0.4,
      socialEngagement: 0.4,
      stressLevel: 0.6,
      smokingStatus: 'never',
      alcoholConsumption: 'none',
    },
    comorbidities: {
      diabetes: false,
      hypertension: false,
      cardiovascularDisease: false,
      obesity: true,
      depression: false,
      tbiHistory: false,
      hearingLoss: false,
    },
    nodeOverrides: {
      'insulin_resistance': 0.4,
      'mtorc1_hyperactive': 0.35,
    },
  },
  suggestedTreatments: ['metformin', 'exercise_aerobic', 'diet_mediterranean', 'lithium_orotate'],
  tags: ['metabolic', 'sedentary', 'prevention', 'lifestyle'],
};

// ============================================================================
// CLINICAL STAGE SCENARIOS
// ============================================================================

export const earlyMciPreset: ScenarioPreset = {
  id: 'early_mci',
  name: 'Early MCI (Amyloid+, Tau-)',
  description: 'Early-stage MCI with amyloid positivity but minimal tau spread. Prime window for intervention.',
  scenario: {
    age: 72,
    sex: 'female',
    apoeGenotype: 'e3/e4',
    diseaseStage: 'mci',
    lifestyle: {
      exerciseLevel: 0.3,
      dietQuality: 0.5,
      sleepQuality: 0.4,
      cognitiveEngagement: 0.5,
      socialEngagement: 0.5,
      stressLevel: 0.4,
      smokingStatus: 'never',
      alcoholConsumption: 'none',
    },
    comorbidities: {
      diabetes: false,
      hypertension: true,
      cardiovascularDisease: false,
      obesity: false,
      depression: false,
      tbiHistory: false,
      hearingLoss: false,
    },
    nodeOverrides: {
      'abeta_oligomers': 0.5,
      'tau_hyperphosphorylated': 0.2,
    },
  },
  suggestedTreatments: ['lecanemab', 'donanemab', 'exercise_aerobic', 'lithium_orotate'],
  tags: ['mci', 'amyloid_positive', 'intervention_window', 'clinical_trial'],
};

export const mildAdPreset: ScenarioPreset = {
  id: 'mild_ad',
  name: 'Mild AD (Symptomatic)',
  description: 'Mild Alzheimer\'s disease with cognitive symptoms. Tau spreading has begun.',
  scenario: {
    age: 75,
    sex: 'male',
    apoeGenotype: 'e3/e4',
    diseaseStage: 'mild_ad',
    lifestyle: {
      exerciseLevel: 0.2,
      dietQuality: 0.4,
      sleepQuality: 0.3,
      cognitiveEngagement: 0.4,
      socialEngagement: 0.4,
      stressLevel: 0.5,
      smokingStatus: 'never',
      alcoholConsumption: 'none',
    },
    comorbidities: {
      diabetes: false,
      hypertension: true,
      cardiovascularDisease: false,
      obesity: false,
      depression: true,
      tbiHistory: false,
      hearingLoss: true,
    },
  },
  suggestedTreatments: ['lecanemab', 'donepezil', 'exercise_aerobic'],
  tags: ['mild_ad', 'symptomatic', 'tau_positive'],
};

// ============================================================================
// RESEARCH SCENARIOS
// ============================================================================

export const inflammationDrivenPreset: ScenarioPreset = {
  id: 'inflammation_driven',
  name: 'Inflammation-Driven Pathology',
  description: 'Chronic inflammation from depression + poor sleep. Tests neuroinflammation interventions.',
  scenario: {
    age: 65,
    sex: 'female',
    apoeGenotype: 'e3/e3',
    diseaseStage: 'preclinical',
    lifestyle: {
      exerciseLevel: 0.2,
      dietQuality: 0.3,
      sleepQuality: 0.2,
      cognitiveEngagement: 0.3,
      socialEngagement: 0.2,
      stressLevel: 0.8,
      smokingStatus: 'never',
      alcoholConsumption: 'moderate',
    },
    comorbidities: {
      diabetes: false,
      hypertension: false,
      cardiovascularDisease: false,
      obesity: false,
      depression: true,
      tbiHistory: false,
      hearingLoss: false,
    },
    nodeOverrides: {
      'nlrp3_active': 0.5,
      'microglial_activation': 0.4,
    },
  },
  suggestedTreatments: ['sleep_hygiene', 'exercise_aerobic', 'lithium_orotate', 'dimethyl_fumarate'],
  tags: ['neuroinflammation', 'nlrp3', 'sleep', 'depression', 'research'],
};

export const oxidativeStressPreset: ScenarioPreset = {
  id: 'oxidative_stress',
  name: 'Oxidative Stress Focus',
  description: 'High oxidative burden from smoking + poor diet. Tests antioxidant interventions.',
  scenario: {
    age: 60,
    sex: 'male',
    apoeGenotype: 'e3/e4',
    diseaseStage: 'preclinical',
    lifestyle: {
      exerciseLevel: 0.1,
      dietQuality: 0.2,
      sleepQuality: 0.4,
      cognitiveEngagement: 0.4,
      socialEngagement: 0.4,
      stressLevel: 0.5,
      smokingStatus: 'current',
      alcoholConsumption: 'heavy',
    },
    comorbidities: {
      diabetes: false,
      hypertension: false,
      cardiovascularDisease: false,
      obesity: false,
      depression: false,
      tbiHistory: false,
      hearingLoss: false,
    },
    nodeOverrides: {
      'ros_production': 0.6,
      'lipid_peroxidation': 0.4,
    },
  },
  suggestedTreatments: ['dimethyl_fumarate', 'exercise_aerobic', 'diet_mediterranean'],
  tags: ['oxidative_stress', 'nrf2', 'antioxidant', 'research'],
};

export const vascularContributionPreset: ScenarioPreset = {
  id: 'vascular_contribution',
  name: 'Vascular Cognitive Impairment',
  description: 'Strong vascular contribution with CVD and hypertension. Tests vascular interventions.',
  scenario: {
    age: 70,
    sex: 'male',
    apoeGenotype: 'e3/e3',
    diseaseStage: 'mci',
    lifestyle: {
      exerciseLevel: 0.2,
      dietQuality: 0.3,
      sleepQuality: 0.5,
      cognitiveEngagement: 0.4,
      socialEngagement: 0.4,
      stressLevel: 0.5,
      smokingStatus: 'former',
      alcoholConsumption: 'moderate',
    },
    comorbidities: {
      diabetes: false,
      hypertension: true,
      cardiovascularDisease: true,
      obesity: false,
      depression: false,
      tbiHistory: false,
      hearingLoss: false,
    },
  },
  suggestedTreatments: ['exercise_aerobic', 'diet_mediterranean'],
  tags: ['vascular', 'cerebrovascular', 'hypertension', 'research'],
};

// ============================================================================
// COMBINATION TESTING SCENARIOS
// ============================================================================

export const multiModalInterventionPreset: ScenarioPreset = {
  id: 'multimodal_intervention',
  name: 'FINGER Trial Profile',
  description: 'Based on FINGER trial participant profile. Tests multi-domain lifestyle intervention.',
  scenario: {
    age: 67,
    sex: 'female',
    apoeGenotype: 'e3/e3',
    diseaseStage: 'preclinical',
    lifestyle: {
      exerciseLevel: 0.2,
      dietQuality: 0.3,
      sleepQuality: 0.5,
      cognitiveEngagement: 0.3,
      socialEngagement: 0.4,
      stressLevel: 0.5,
      smokingStatus: 'never',
      alcoholConsumption: 'moderate',
    },
    comorbidities: {
      diabetes: false,
      hypertension: true,
      cardiovascularDisease: false,
      obesity: false,
      depression: false,
      tbiHistory: false,
      hearingLoss: false,
    },
  },
  suggestedTreatments: ['exercise_aerobic', 'diet_mediterranean', 'cognitive_training', 'sleep_hygiene'],
  tags: ['finger', 'multimodal', 'prevention', 'lifestyle'],
};

export const comprehensiveTreatmentPreset: ScenarioPreset = {
  id: 'comprehensive_treatment',
  name: 'Comprehensive Multi-Target',
  description: 'Tests comprehensive treatment strategy targeting multiple pathways simultaneously.',
  scenario: {
    age: 70,
    sex: 'female',
    apoeGenotype: 'e3/e4',
    diseaseStage: 'mci',
    lifestyle: {
      exerciseLevel: 0.3,
      dietQuality: 0.4,
      sleepQuality: 0.4,
      cognitiveEngagement: 0.4,
      socialEngagement: 0.4,
      stressLevel: 0.5,
      smokingStatus: 'never',
      alcoholConsumption: 'none',
    },
    comorbidities: {
      diabetes: true,
      hypertension: true,
      cardiovascularDisease: false,
      obesity: false,
      depression: false,
      tbiHistory: false,
      hearingLoss: false,
    },
  },
  suggestedTreatments: [
    'metformin',
    'lithium_orotate',
    'exercise_aerobic',
    'diet_mediterranean',
    'sleep_hygiene',
  ],
  tags: ['comprehensive', 'multi_target', 'mci', 'clinical_trial'],
};

// ============================================================================
// ALL PRESETS
// ============================================================================

export const scenarioPresets: ScenarioPreset[] = [
  // APOE Risk
  apoe4HomozygousPreset,
  apoe4HeterozygousPreset,
  apoe2ProtectivePreset,

  // Metabolic
  metabolicSyndromePreset,
  prediabeticSedentaryPreset,

  // Clinical Stage
  earlyMciPreset,
  mildAdPreset,

  // Research
  inflammationDrivenPreset,
  oxidativeStressPreset,
  vascularContributionPreset,

  // Combination Testing
  multiModalInterventionPreset,
  comprehensiveTreatmentPreset,
];

/**
 * Get a preset by ID
 */
export function getScenarioPresetById(id: string): ScenarioPreset | undefined {
  return scenarioPresets.find(p => p.id === id);
}

/**
 * Get presets by tag
 */
export function getScenarioPresetsByTag(tag: string): ScenarioPreset[] {
  return scenarioPresets.filter(p => p.tags.includes(tag));
}

/**
 * Get all unique tags
 */
export function getAllPresetTags(): string[] {
  const tags = new Set<string>();
  for (const preset of scenarioPresets) {
    for (const tag of preset.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort();
}
