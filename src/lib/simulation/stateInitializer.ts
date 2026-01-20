/**
 * State Initializer
 *
 * Converts a PatientScenario into initial node states (0-1 scale).
 * Maps risk factors, lifestyle, comorbidities, and genetics to
 * mechanistic network node values.
 */

import type {
  PatientScenario,
  APOEGenotype,
  DiseaseStage,
  LifestyleFactors,
  Comorbidities,
  NodeState,
} from './types';

// ============================================================================
// APOE EFFECTS
// ============================================================================

/**
 * APOE genotype effects on various pathways
 * Values represent multipliers for pathological processes
 */
export const APOE_EFFECTS: Record<APOEGenotype, {
  amyloidClearance: number;      // Lower = worse clearance
  lipidMetabolism: number;       // Higher = more dysfunction
  inflammatoryResponse: number;  // Higher = more inflammation
  bbbIntegrity: number;          // Lower = more BBB dysfunction
  overallRisk: number;           // Relative risk multiplier
}> = {
  'e2/e2': {
    amyloidClearance: 1.2,
    lipidMetabolism: 0.8,
    inflammatoryResponse: 0.8,
    bbbIntegrity: 1.1,
    overallRisk: 0.6,
  },
  'e2/e3': {
    amyloidClearance: 1.1,
    lipidMetabolism: 0.9,
    inflammatoryResponse: 0.9,
    bbbIntegrity: 1.05,
    overallRisk: 0.8,
  },
  'e2/e4': {
    amyloidClearance: 0.9,
    lipidMetabolism: 1.1,
    inflammatoryResponse: 1.1,
    bbbIntegrity: 0.95,
    overallRisk: 1.5,
  },
  'e3/e3': {
    amyloidClearance: 1.0,
    lipidMetabolism: 1.0,
    inflammatoryResponse: 1.0,
    bbbIntegrity: 1.0,
    overallRisk: 1.0,
  },
  'e3/e4': {
    amyloidClearance: 0.7,
    lipidMetabolism: 1.3,
    inflammatoryResponse: 1.3,
    bbbIntegrity: 0.85,
    overallRisk: 3.0,
  },
  'e4/e4': {
    amyloidClearance: 0.4,
    lipidMetabolism: 1.6,
    inflammatoryResponse: 1.6,
    bbbIntegrity: 0.7,
    overallRisk: 12.0,
  },
};

// ============================================================================
// DISEASE STAGE EFFECTS
// ============================================================================

/**
 * Disease stage to baseline pathology mapping
 * Values are baseline node values (0-1 scale)
 */
export const DISEASE_STAGE_BASELINE: Record<DiseaseStage, {
  amyloidBurden: number;
  tauBurden: number;
  synapticDysfunction: number;
  neuroinflammation: number;
  cognitiveImpairment: number;
}> = {
  'preclinical': {
    amyloidBurden: 0.2,
    tauBurden: 0.1,
    synapticDysfunction: 0.1,
    neuroinflammation: 0.15,
    cognitiveImpairment: 0.0,
  },
  'mci': {
    amyloidBurden: 0.5,
    tauBurden: 0.3,
    synapticDysfunction: 0.3,
    neuroinflammation: 0.35,
    cognitiveImpairment: 0.2,
  },
  'mild_ad': {
    amyloidBurden: 0.7,
    tauBurden: 0.5,
    synapticDysfunction: 0.5,
    neuroinflammation: 0.5,
    cognitiveImpairment: 0.4,
  },
  'moderate_ad': {
    amyloidBurden: 0.85,
    tauBurden: 0.7,
    synapticDysfunction: 0.7,
    neuroinflammation: 0.65,
    cognitiveImpairment: 0.6,
  },
  'severe_ad': {
    amyloidBurden: 0.95,
    tauBurden: 0.9,
    synapticDysfunction: 0.9,
    neuroinflammation: 0.8,
    cognitiveImpairment: 0.85,
  },
};

// ============================================================================
// LIFESTYLE EFFECTS
// ============================================================================

/**
 * Calculate lifestyle contribution to node states
 * Returns adjustments to add to baseline (can be negative for protective)
 */
export function calculateLifestyleEffects(
  lifestyle: LifestyleFactors
): Record<string, number> {
  const effects: Record<string, number> = {};

  // Exercise (protective)
  // Higher exercise = lower pathology
  const exerciseProtection = lifestyle.exerciseLevel * 0.3;
  effects['mtorc1_hyperactive'] = -exerciseProtection * 0.5;
  effects['insulin_resistance'] = -exerciseProtection * 0.6;
  effects['mitochondrial_dysfunction'] = -exerciseProtection * 0.4;
  effects['neuroinflammation'] = -exerciseProtection * 0.3;
  effects['oxidative_stress'] = -exerciseProtection * 0.4;

  // Diet (protective)
  const dietProtection = lifestyle.dietQuality * 0.25;
  effects['insulin_resistance'] = (effects['insulin_resistance'] || 0) - dietProtection * 0.5;
  effects['oxidative_stress'] = (effects['oxidative_stress'] || 0) - dietProtection * 0.4;
  effects['gut_dysbiosis'] = -dietProtection * 0.5;
  effects['neuroinflammation'] = (effects['neuroinflammation'] || 0) - dietProtection * 0.3;

  // Sleep (protective for glymphatic clearance)
  const sleepProtection = lifestyle.sleepQuality * 0.2;
  effects['glymphatic_dysfunction'] = -sleepProtection * 0.6;
  effects['abeta_accumulation'] = -sleepProtection * 0.3;
  effects['tau_accumulation'] = -sleepProtection * 0.2;

  // Cognitive engagement (cognitive reserve)
  const cognitiveProtection = lifestyle.cognitiveEngagement * 0.15;
  effects['synaptic_dysfunction'] = -cognitiveProtection * 0.4;
  effects['cognitive_impairment'] = -cognitiveProtection * 0.3;

  // Social engagement (anti-inflammatory, stress reduction)
  const socialProtection = lifestyle.socialEngagement * 0.1;
  effects['neuroinflammation'] = (effects['neuroinflammation'] || 0) - socialProtection * 0.2;
  effects['stress_response'] = -socialProtection * 0.3;

  // Stress (harmful)
  const stressHarm = lifestyle.stressLevel * 0.2;
  effects['cortisol_elevated'] = stressHarm * 0.5;
  effects['neuroinflammation'] = (effects['neuroinflammation'] || 0) + stressHarm * 0.3;
  effects['oxidative_stress'] = (effects['oxidative_stress'] || 0) + stressHarm * 0.2;

  // Smoking (harmful)
  if (lifestyle.smokingStatus === 'current') {
    effects['oxidative_stress'] = (effects['oxidative_stress'] || 0) + 0.15;
    effects['vascular_dysfunction'] = 0.2;
    effects['neuroinflammation'] = (effects['neuroinflammation'] || 0) + 0.1;
  } else if (lifestyle.smokingStatus === 'former') {
    effects['oxidative_stress'] = (effects['oxidative_stress'] || 0) + 0.05;
  }

  // Heavy alcohol (harmful)
  if (lifestyle.alcoholConsumption === 'heavy') {
    effects['neuroinflammation'] = (effects['neuroinflammation'] || 0) + 0.15;
    effects['oxidative_stress'] = (effects['oxidative_stress'] || 0) + 0.1;
    effects['thiamine_deficiency'] = 0.3;
  }

  return effects;
}

// ============================================================================
// COMORBIDITY EFFECTS
// ============================================================================

/**
 * Calculate comorbidity contribution to node states
 */
export function calculateComorbidityEffects(
  comorbidities: Comorbidities
): Record<string, number> {
  const effects: Record<string, number> = {};

  if (comorbidities.diabetes) {
    effects['insulin_resistance'] = 0.4;
    effects['mtorc1_hyperactive'] = 0.3;
    effects['oxidative_stress'] = 0.2;
    effects['vascular_dysfunction'] = 0.2;
    effects['age_pathway'] = 0.15; // AGE = advanced glycation end products
  }

  if (comorbidities.hypertension) {
    effects['vascular_dysfunction'] = (effects['vascular_dysfunction'] || 0) + 0.3;
    effects['bbb_dysfunction'] = 0.25;
    effects['cerebral_hypoperfusion'] = 0.3;
    effects['glymphatic_dysfunction'] = 0.2;
  }

  if (comorbidities.cardiovascularDisease) {
    effects['vascular_dysfunction'] = (effects['vascular_dysfunction'] || 0) + 0.35;
    effects['cerebral_hypoperfusion'] = (effects['cerebral_hypoperfusion'] || 0) + 0.3;
    effects['oxidative_stress'] = (effects['oxidative_stress'] || 0) + 0.15;
  }

  if (comorbidities.obesity) {
    effects['insulin_resistance'] = (effects['insulin_resistance'] || 0) + 0.25;
    effects['neuroinflammation'] = 0.2;
    effects['adipokine_imbalance'] = 0.3;
  }

  if (comorbidities.depression) {
    effects['neuroinflammation'] = (effects['neuroinflammation'] || 0) + 0.15;
    effects['bdnf_reduced'] = 0.25;
    effects['cortisol_elevated'] = 0.2;
    effects['serotonin_dysfunction'] = 0.3;
  }

  if (comorbidities.tbiHistory) {
    effects['neuroinflammation'] = (effects['neuroinflammation'] || 0) + 0.2;
    effects['tau_accumulation'] = 0.15;
    effects['bbb_dysfunction'] = (effects['bbb_dysfunction'] || 0) + 0.15;
  }

  if (comorbidities.hearingLoss) {
    effects['cognitive_load'] = 0.15;
    effects['social_isolation'] = 0.2;
  }

  return effects;
}

// ============================================================================
// AGE EFFECTS
// ============================================================================

/**
 * Calculate age-related baseline increases in pathology
 * Age 65 is reference point (multiplier = 1.0)
 */
export function calculateAgeEffects(age: number): Record<string, number> {
  const effects: Record<string, number> = {};

  // Age relative to 65
  const ageOffset = (age - 65) / 10; // Per decade offset

  // Baseline increases with age
  effects['oxidative_stress'] = Math.max(0, ageOffset * 0.1);
  effects['mitochondrial_dysfunction'] = Math.max(0, ageOffset * 0.12);
  effects['proteostasis_decline'] = Math.max(0, ageOffset * 0.1);
  effects['senescent_cells'] = Math.max(0, ageOffset * 0.15);
  effects['immune_senescence'] = Math.max(0, ageOffset * 0.1);

  // Younger ages have some protection
  if (age < 65) {
    effects['cellular_resilience'] = Math.abs(ageOffset) * 0.1;
  }

  return effects;
}

// ============================================================================
// NODE MAPPING
// ============================================================================

/**
 * Map conceptual states to actual node IDs in the network
 * This bridges the gap between scenario factors and network nodes
 */
export const CONCEPT_TO_NODE_MAP: Record<string, string[]> = {
  // Amyloid pathway
  'amyloidBurden': ['abeta_oligomers', 'abeta_plaques', 'abeta_accumulation'],
  'abeta_accumulation': ['abeta_oligomers', 'abeta_plaques'],

  // Tau pathway
  'tauBurden': ['tau_hyperphosphorylated', 'nft_formation', 'tau_spreading'],
  'tau_accumulation': ['tau_hyperphosphorylated', 'nft_formation'],

  // Synaptic
  'synapticDysfunction': ['synaptic_loss', 'ltp_impairment', 'neurotransmitter_deficit'],
  'synaptic_dysfunction': ['synaptic_loss', 'ltp_impairment'],

  // Inflammation
  'neuroinflammation': ['nlrp3_active', 'il1b', 'microglial_activation', 'astrocyte_reactivity'],

  // Metabolic
  'insulin_resistance': ['insulin_resistance', 'mtorc1_hyperactive'],
  'mtorc1_hyperactive': ['mtorc1_hyperactive'],

  // Mitochondrial
  'mitochondrial_dysfunction': ['mitochondrial_dysfunction', 'atp_deficit', 'ros_production'],
  'oxidative_stress': ['ros_production', 'lipid_peroxidation', 'oxidative_damage'],

  // Vascular
  'vascular_dysfunction': ['vascular_dysfunction', 'endothelial_dysfunction'],
  'bbb_dysfunction': ['bbb_dysfunction', 'bbb_permeability'],
  'cerebral_hypoperfusion': ['cerebral_hypoperfusion', 'hypoxia'],
  'glymphatic_dysfunction': ['glymphatic_dysfunction', 'waste_accumulation'],

  // Clearance
  'amyloidClearance': ['microglial_phagocytosis', 'neprilysin_activity', 'ide_activity'],

  // Lipid metabolism (APOE-related)
  'lipidMetabolism': ['lipid_droplets', 'cholesterol_dysregulation', 'apoe_dysfunction'],

  // Other
  'cognitiveImpairment': ['cognitive_decline', 'memory_impairment'],
  'gut_dysbiosis': ['gut_dysbiosis', 'intestinal_permeability'],

  // Protective factors
  'nrf2_pathway': ['nrf2_pathway'],
  'sirt1_activity': ['sirt1_activity'],
  'bdnf_reduced': ['bdnf_reduced'],
  'gpx4_activity': ['gpx4_activity'],
};

// ============================================================================
// MAIN INITIALIZATION FUNCTION
// ============================================================================

/**
 * Initialize system state from a patient scenario
 */
export function initializeState(
  scenario: PatientScenario,
  allNodeIds: string[]
): Record<string, NodeState> {
  const states: Record<string, NodeState> = {};

  // Initialize all nodes to baseline (0)
  for (const nodeId of allNodeIds) {
    states[nodeId] = {
      nodeId,
      value: 0,
      rate: 0,
      crossedTippingPoint: false,
    };
  }

  // Apply disease stage baseline
  const stageBaseline = DISEASE_STAGE_BASELINE[scenario.diseaseStage];
  applyConceptToNodes(states, 'amyloidBurden', stageBaseline.amyloidBurden);
  applyConceptToNodes(states, 'tauBurden', stageBaseline.tauBurden);
  applyConceptToNodes(states, 'synapticDysfunction', stageBaseline.synapticDysfunction);
  applyConceptToNodes(states, 'neuroinflammation', stageBaseline.neuroinflammation);
  applyConceptToNodes(states, 'cognitiveImpairment', stageBaseline.cognitiveImpairment);

  // Apply APOE effects
  const apoeEffects = APOE_EFFECTS[scenario.apoeGenotype];

  // Reduced clearance (inverse, so lower clearance = higher accumulation rate)
  const clearanceDeficit = 1 - apoeEffects.amyloidClearance;
  if (clearanceDeficit > 0) {
    applyConceptToNodes(states, 'amyloidClearance', -clearanceDeficit * 0.3); // Reduce clearance nodes
  }

  // Lipid metabolism dysfunction
  if (apoeEffects.lipidMetabolism > 1) {
    applyConceptToNodes(states, 'lipidMetabolism', (apoeEffects.lipidMetabolism - 1) * 0.3);
  }

  // Inflammatory response
  if (apoeEffects.inflammatoryResponse > 1) {
    applyConceptToNodes(states, 'neuroinflammation',
      (apoeEffects.inflammatoryResponse - 1) * 0.2, true);
  }

  // BBB integrity
  if (apoeEffects.bbbIntegrity < 1) {
    applyConceptToNodes(states, 'bbb_dysfunction', (1 - apoeEffects.bbbIntegrity) * 0.3);
  }

  // Apply age effects
  const ageEffects = calculateAgeEffects(scenario.age);
  for (const [concept, value] of Object.entries(ageEffects)) {
    applyConceptToNodes(states, concept, value, true);
  }

  // Apply lifestyle effects
  const lifestyleEffects = calculateLifestyleEffects(scenario.lifestyle);
  for (const [concept, value] of Object.entries(lifestyleEffects)) {
    applyConceptToNodes(states, concept, value, true);
  }

  // Apply comorbidity effects
  const comorbidityEffects = calculateComorbidityEffects(scenario.comorbidities);
  for (const [concept, value] of Object.entries(comorbidityEffects)) {
    applyConceptToNodes(states, concept, value, true);
  }

  // Apply direct node overrides (highest priority)
  if (scenario.nodeOverrides) {
    for (const [nodeId, value] of Object.entries(scenario.nodeOverrides)) {
      if (states[nodeId]) {
        states[nodeId].value = value;
      }
    }
  }

  // Clamp all values to [0, 1]
  for (const nodeId of Object.keys(states)) {
    states[nodeId].value = Math.max(0, Math.min(1, states[nodeId].value));
  }

  return states;
}

/**
 * Apply a value to nodes mapped from a concept
 */
function applyConceptToNodes(
  states: Record<string, NodeState>,
  concept: string,
  value: number,
  additive: boolean = false
): void {
  // Try direct node match first
  if (states[concept]) {
    if (additive) {
      states[concept].value += value;
    } else {
      states[concept].value = value;
    }
    return;
  }

  // Try concept mapping
  const mappedNodes = CONCEPT_TO_NODE_MAP[concept];
  if (mappedNodes) {
    for (const nodeId of mappedNodes) {
      if (states[nodeId]) {
        if (additive) {
          states[nodeId].value += value;
        } else {
          states[nodeId].value = value;
        }
      }
    }
  }
}

/**
 * Extract just the values from node states
 */
export function extractValues(states: Record<string, NodeState>): Record<string, number> {
  const values: Record<string, number> = {};
  for (const [nodeId, state] of Object.entries(states)) {
    values[nodeId] = state.value;
  }
  return values;
}

/**
 * Update node states with new values and rates
 */
export function updateStates(
  states: Record<string, NodeState>,
  newValues: Record<string, number>,
  rates: Record<string, number>,
  tippingPoints: Record<string, number>,
  currentTime: number
): Record<string, NodeState> {
  const updated: Record<string, NodeState> = {};

  for (const [nodeId, state] of Object.entries(states)) {
    const newValue = Math.max(0, Math.min(1, newValues[nodeId] ?? state.value));
    const rate = rates[nodeId] ?? 0;
    const threshold = tippingPoints[nodeId];

    // Check for tipping point crossing
    let crossedTippingPoint = state.crossedTippingPoint;
    let tippingPointCrossedAt = state.tippingPointCrossedAt;

    if (threshold !== undefined && !crossedTippingPoint && newValue >= threshold) {
      crossedTippingPoint = true;
      tippingPointCrossedAt = currentTime;
    }

    updated[nodeId] = {
      nodeId,
      value: newValue,
      rate,
      crossedTippingPoint,
      tippingPointCrossedAt,
    };
  }

  return updated;
}
