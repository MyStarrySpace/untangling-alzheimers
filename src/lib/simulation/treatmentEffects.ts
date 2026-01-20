/**
 * Treatment Effects Module
 *
 * Models how treatments (drugs, lifestyle interventions, devices) affect
 * the mechanistic network dynamics. Computes rate modifiers for target nodes.
 */

import type {
  TreatmentAdministration,
  TreatmentRegimen,
  PharmacokineticParams,
} from './types';
import { EFFECT_STRENGTH_MULTIPLIER } from './stockFlowModel';

// ============================================================================
// TYPES
// ============================================================================

/**
 * Computed effect of a treatment on a specific node
 */
export interface NodeTreatmentEffect {
  /** Node being affected */
  nodeId: string;
  /** Treatment providing the effect */
  treatmentId: string;
  /** Effect type */
  effectType: 'activates' | 'inhibits' | 'modulates';
  /** Magnitude of effect (0-1) */
  magnitude: number;
  /** Rate modifier to apply (< 1 for inhibition, > 1 for activation) */
  rateModifier: number;
}

/**
 * Treatment state at a point in time
 */
export interface TreatmentState {
  /** Treatment ID */
  treatmentId: string;
  /** Is treatment currently active */
  isActive: boolean;
  /** Current effective concentration (0-1 normalized) */
  effectiveConcentration: number;
  /** Time since treatment started */
  timeSinceTreatmentStart: number;
  /** Effects on nodes */
  nodeEffects: NodeTreatmentEffect[];
}

/**
 * Drug from the treatment library (simplified for simulation)
 */
export interface TreatmentDefinition {
  id: string;
  name: string;
  type: string;
  primaryTargets: {
    nodeId: string;
    effect: 'activates' | 'inhibits' | 'modulates';
    strength: 'strong' | 'moderate' | 'weak';
    mechanism?: string;
  }[];
  variants?: {
    id: string;
    label: string;
    effectModifier: number;
  }[];
  /** Time to reach steady state (days) */
  onsetTime?: number;
  /** Time for effect to wear off after stopping (days) */
  offsetTime?: number;
  /** PK parameters for full kinetics mode */
  pharmacokinetics?: PharmacokineticParams;
}

// ============================================================================
// EFFECT CALCULATIONS
// ============================================================================

/**
 * Default onset/offset times by treatment type (in days)
 */
export const DEFAULT_KINETICS: Record<string, { onsetDays: number; offsetDays: number }> = {
  'small_molecule': { onsetDays: 7, offsetDays: 3 },
  'antibody': { onsetDays: 14, offsetDays: 30 },
  'biologic': { onsetDays: 14, offsetDays: 14 },
  'supplement': { onsetDays: 14, offsetDays: 7 },
  'device': { onsetDays: 1, offsetDays: 1 },
  'lifestyle': { onsetDays: 30, offsetDays: 30 },
  'behavioral': { onsetDays: 1, offsetDays: 1 },
};

/**
 * Calculate onset curve (0 to 1 over onset period)
 * Uses sigmoid for smooth transition
 */
export function calculateOnsetFactor(
  timeSinceStart: number,
  onsetTimeDays: number
): number {
  if (onsetTimeDays <= 0) return 1;

  // Sigmoid curve centered at half the onset time
  const halfPoint = onsetTimeDays / 2;
  const steepness = 4 / onsetTimeDays; // Reaches ~95% at onset time
  return 1 / (1 + Math.exp(-steepness * (timeSinceStart - halfPoint)));
}

/**
 * Calculate offset curve (1 to 0 after stopping)
 */
export function calculateOffsetFactor(
  timeSinceStop: number,
  offsetTimeDays: number
): number {
  if (offsetTimeDays <= 0) return 0;

  // Exponential decay
  const halfLife = offsetTimeDays / 3; // Reaches ~10% at offset time
  return Math.exp(-0.693 * timeSinceStop / halfLife);
}

/**
 * Calculate effect strength to rate modifier
 *
 * For inhibition: modifier < 1 (reduces rate)
 * For activation: modifier > 1 (increases rate)
 */
export function strengthToModifier(
  effectType: 'activates' | 'inhibits' | 'modulates',
  strength: 'strong' | 'moderate' | 'weak',
  concentration: number = 1.0
): number {
  const baseStrength = EFFECT_STRENGTH_MULTIPLIER[strength] || 0.5;
  const effectiveMagnitude = baseStrength * concentration;

  switch (effectType) {
    case 'inhibits':
      // Inhibition reduces rate: modifier = 1 - magnitude
      // Strong inhibition at full concentration: 1 - 1.0 = 0 (complete block)
      // Weak inhibition: 1 - 0.3 = 0.7 (30% reduction)
      return Math.max(0.05, 1 - effectiveMagnitude); // Never fully block

    case 'activates':
      // Activation increases rate: modifier = 1 + magnitude
      // Strong activation: 1 + 1.0 = 2.0 (doubles rate)
      return 1 + effectiveMagnitude;

    case 'modulates':
      // Modulation can go either way, default to slight activation
      return 1 + effectiveMagnitude * 0.5;
  }
}

// ============================================================================
// TREATMENT STATE COMPUTATION
// ============================================================================

/**
 * Compute the current state of a single treatment
 */
export function computeTreatmentState(
  admin: TreatmentAdministration,
  treatment: TreatmentDefinition,
  currentTime: number,
  timeUnit: 'days' | 'years' = 'years'
): TreatmentState {
  // Convert time to days for kinetics calculations
  const timeInDays = timeUnit === 'years' ? currentTime * 365 : currentTime;
  const startTimeInDays = timeUnit === 'years' ? admin.startTime * 365 : admin.startTime;
  const endTimeInDays = admin.endTime !== undefined
    ? (timeUnit === 'years' ? admin.endTime * 365 : admin.endTime)
    : undefined;

  // Get kinetics parameters
  const kinetics = DEFAULT_KINETICS[treatment.type] || DEFAULT_KINETICS['small_molecule'];
  const onsetDays = treatment.onsetTime ?? kinetics.onsetDays;
  const offsetDays = treatment.offsetTime ?? kinetics.offsetDays;

  // Determine if treatment is active and calculate concentration
  let isActive = false;
  let effectiveConcentration = 0;
  const timeSinceStart = timeInDays - startTimeInDays;

  if (timeSinceStart < 0) {
    // Treatment hasn't started yet
    isActive = false;
    effectiveConcentration = 0;
  } else if (endTimeInDays === undefined || timeInDays <= endTimeInDays) {
    // Treatment is ongoing
    isActive = true;
    const onsetFactor = calculateOnsetFactor(timeSinceStart, onsetDays);
    effectiveConcentration = onsetFactor * (admin.doseMultiplier ?? 1.0) * (admin.adherence ?? 1.0);
  } else {
    // Treatment has ended, calculate washout
    const timeSinceEnd = timeInDays - endTimeInDays;
    isActive = false;
    const peakConcentration = (admin.doseMultiplier ?? 1.0) * (admin.adherence ?? 1.0);
    effectiveConcentration = peakConcentration * calculateOffsetFactor(timeSinceEnd, offsetDays);
  }

  // Get variant modifier if specified
  let variantModifier = 1.0;
  if (admin.variantId && treatment.variants) {
    const variant = treatment.variants.find(v => v.id === admin.variantId);
    if (variant) {
      variantModifier = variant.effectModifier;
    }
  }

  // Apply variant modifier to concentration
  effectiveConcentration *= variantModifier;

  // Compute effects on each target node
  const nodeEffects: NodeTreatmentEffect[] = [];
  for (const target of treatment.primaryTargets) {
    const rateModifier = strengthToModifier(
      target.effect,
      target.strength,
      effectiveConcentration
    );

    nodeEffects.push({
      nodeId: target.nodeId,
      treatmentId: treatment.id,
      effectType: target.effect,
      magnitude: effectiveConcentration * EFFECT_STRENGTH_MULTIPLIER[target.strength],
      rateModifier,
    });
  }

  return {
    treatmentId: treatment.id,
    isActive,
    effectiveConcentration,
    timeSinceTreatmentStart: Math.max(0, timeSinceStart),
    nodeEffects,
  };
}

/**
 * Compute combined effects of all treatments on node rates
 */
export function computeCombinedEffects(
  treatmentStates: TreatmentState[]
): Record<string, number> {
  const combinedModifiers: Record<string, number[]> = {};

  // Collect all modifiers per node
  for (const state of treatmentStates) {
    for (const effect of state.nodeEffects) {
      if (!combinedModifiers[effect.nodeId]) {
        combinedModifiers[effect.nodeId] = [];
      }
      combinedModifiers[effect.nodeId].push(effect.rateModifier);
    }
  }

  // Combine modifiers multiplicatively (with saturation)
  const result: Record<string, number> = {};
  for (const [nodeId, modifiers] of Object.entries(combinedModifiers)) {
    if (modifiers.length === 0) {
      result[nodeId] = 1.0;
    } else if (modifiers.length === 1) {
      result[nodeId] = modifiers[0];
    } else {
      // Multiplicative combination with diminishing returns
      // Use geometric mean with saturation
      let product = 1.0;
      for (const mod of modifiers) {
        product *= mod;
      }
      // Apply saturation to prevent extreme values
      result[nodeId] = Math.max(0.01, Math.min(10, product));
    }
  }

  return result;
}

/**
 * Compute all treatment effects at a given time point
 */
export function computeTreatmentEffectsAtTime(
  regimen: TreatmentRegimen,
  treatments: Map<string, TreatmentDefinition>,
  currentTime: number,
  timeUnit: 'days' | 'years' = 'years'
): {
  states: TreatmentState[];
  combinedModifiers: Record<string, number>;
} {
  const states: TreatmentState[] = [];

  for (const admin of regimen.treatments) {
    const treatment = treatments.get(admin.treatmentId);
    if (!treatment) {
      console.warn(`Treatment not found: ${admin.treatmentId}`);
      continue;
    }

    const state = computeTreatmentState(admin, treatment, currentTime, timeUnit);
    states.push(state);
  }

  const combinedModifiers = computeCombinedEffects(states);

  return { states, combinedModifiers };
}

// ============================================================================
// FEEDBACK LOOP EFFECTS
// ============================================================================

/**
 * Feedback loop definition (simplified)
 */
export interface FeedbackLoopDef {
  id: string;
  name: string;
  type: 'reinforcing' | 'balancing';
  nodeIds: string[];
  edgeIds: string[];
  baseGain: number; // Baseline amplification factor
}

/**
 * Calculate how treatments affect feedback loop gain
 */
export function calculateLoopGainModification(
  loop: FeedbackLoopDef,
  treatmentModifiers: Record<string, number>
): {
  modifiedGain: number;
  reductionFactor: number;
  affectedNodes: string[];
  isBroken: boolean;
} {
  const affectedNodes: string[] = [];
  let totalModifier = 1.0;

  // Check each node in the loop
  for (const nodeId of loop.nodeIds) {
    const modifier = treatmentModifiers[nodeId];
    if (modifier !== undefined && modifier !== 1.0) {
      affectedNodes.push(nodeId);
      totalModifier *= modifier;
    }
  }

  // Calculate modified gain
  const modifiedGain = loop.baseGain * totalModifier;

  // Loop is "broken" if gain drops below 1 (no longer self-reinforcing)
  const isBroken = loop.type === 'reinforcing' && modifiedGain < 1.0;

  return {
    modifiedGain,
    reductionFactor: 1 - (modifiedGain / loop.baseGain),
    affectedNodes,
    isBroken,
  };
}

/**
 * Classify how a treatment affects a feedback loop
 */
export function classifyLoopInvolvement(
  gainReduction: number,
  isBroken: boolean
): 'breaks' | 'weakens' | 'strengthens' | 'enters' | 'none' {
  if (isBroken) return 'breaks';
  if (gainReduction > 0.3) return 'weakens';
  if (gainReduction < -0.1) return 'strengthens';
  if (gainReduction !== 0) return 'enters';
  return 'none';
}

// ============================================================================
// PHARMACOKINETIC MODEL (for Full mode)
// ============================================================================

/**
 * One-compartment PK model for drug concentration
 */
export function computeDrugConcentration(
  pk: PharmacokineticParams,
  dose: number,
  timeSinceDoseHours: number
): number {
  const { ka, bioavailability, vd, halfLife } = pk;

  // Elimination rate constant
  const ke = 0.693 / halfLife;

  // One-compartment model with first-order absorption
  // C(t) = (F * D * ka) / (Vd * (ka - ke)) * (e^(-ke*t) - e^(-ka*t))
  if (Math.abs(ka - ke) < 0.001) {
    // Special case: ka ≈ ke
    return (bioavailability * dose * ka * timeSinceDoseHours * Math.exp(-ke * timeSinceDoseHours)) / vd;
  }

  const coefficient = (bioavailability * dose * ka) / (vd * (ka - ke));
  const concentration = coefficient * (Math.exp(-ke * timeSinceDoseHours) - Math.exp(-ka * timeSinceDoseHours));

  return Math.max(0, concentration);
}

/**
 * Compute steady-state concentration for repeated dosing
 */
export function computeSteadyStateConcentration(
  pk: PharmacokineticParams,
  dose: number,
  dosingIntervalHours: number
): { cMax: number; cMin: number; cAvg: number } {
  const ke = 0.693 / pk.halfLife;

  // Accumulation factor
  const accumulationFactor = 1 / (1 - Math.exp(-ke * dosingIntervalHours));

  // Approximate steady-state concentrations
  const cMax = (pk.bioavailability * dose / pk.vd) * accumulationFactor;
  const cMin = cMax * Math.exp(-ke * dosingIntervalHours);
  const cAvg = (cMax + cMin) / 2;

  return { cMax, cMin, cAvg };
}
