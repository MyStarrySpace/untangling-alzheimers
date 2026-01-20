/**
 * Stock-Flow Model for AD Mechanistic Network
 *
 * Implements the core differential equations for node state changes.
 * Supports three fidelity modes:
 * - Linear: d[X]/dt = k_in * [sources] - k_out * [X]
 * - Nonlinear: Saturation + Hill coefficients + tipping points
 * - Full: Michaelis-Menten kinetics + inhibition
 */

import type {
  FidelityMode,
  NodeState,
  SystemState,
  MichaelisMentenParams,
  InhibitionParams,
} from './types';

// ============================================================================
// RATE CONSTANTS
// ============================================================================

/**
 * Default rate constants derived from biological timescales
 * Units: per year (for consistency with simulation timeframe)
 */
export const TIMESCALE_TO_RATE: Record<string, number> = {
  // Fast processes (hours)
  'hours': 365 * 24,      // ~8760/year
  'minutes': 365 * 24 * 60,

  // Medium processes (days)
  'days': 365,            // 365/year
  'weeks': 52,            // 52/year

  // Slow processes (months/years)
  'months': 12,           // 12/year
  'years': 1,             // 1/year
  'decades': 0.1,         // 0.1/year
};

/**
 * Causal confidence to effect strength mapping
 * L1 (strongest) to L7 (weakest)
 */
export const CONFIDENCE_TO_STRENGTH: Record<string, number> = {
  'L1': 1.0,    // Human RCT
  'L2': 0.9,    // Human longitudinal
  'L3': 0.8,    // Human cross-sectional + mechanism
  'L4': 0.6,    // Animal intervention
  'L5': 0.4,    // In vitro / cell culture
  'L6': 0.3,    // Observational only
  'L7': 0.2,    // Theoretical / computational
};

/**
 * Effect strength to multiplier mapping
 */
export const EFFECT_STRENGTH_MULTIPLIER: Record<string, number> = {
  'strong': 1.0,
  'moderate': 0.6,
  'weak': 0.3,
};

// ============================================================================
// LINEAR MODEL
// ============================================================================

/**
 * Parameters for a single edge in linear model
 */
export interface LinearEdgeParams {
  sourceId: string;
  targetId: string;
  /** Rate constant (per time unit) */
  rate: number;
  /** Effect direction: positive = increases target, negative = decreases */
  direction: 1 | -1;
}

/**
 * Parameters for linear model
 */
export interface LinearModelParams {
  /** Node IDs */
  nodeIds: string[];
  /** Edge parameters */
  edges: LinearEdgeParams[];
  /** Baseline degradation rate per node */
  degradationRates: Record<string, number>;
  /** Baseline production rate per node (external inputs) */
  productionRates: Record<string, number>;
}

/**
 * Compute derivatives for linear model
 *
 * d[X]/dt = production + sum(k_ij * direction_ij * [source_j]) - degradation * [X]
 */
export function computeLinearDerivatives(
  state: Record<string, number>,
  params: LinearModelParams,
  treatmentModifiers: Record<string, number> = {}
): Record<string, number> {
  const derivatives: Record<string, number> = {};

  // Initialize with production - degradation
  for (const nodeId of params.nodeIds) {
    const production = params.productionRates[nodeId] || 0;
    const degradation = params.degradationRates[nodeId] || 0.1; // Default 10%/year
    const value = state[nodeId] || 0;

    derivatives[nodeId] = production - degradation * value;
  }

  // Add edge contributions
  for (const edge of params.edges) {
    const sourceValue = state[edge.sourceId] || 0;
    const targetDeriv = derivatives[edge.targetId] || 0;

    // Apply treatment modifier if present
    const modifier = treatmentModifiers[edge.targetId] ?? 1.0;

    derivatives[edge.targetId] = targetDeriv + edge.rate * edge.direction * sourceValue * modifier;
  }

  return derivatives;
}

// ============================================================================
// NONLINEAR MODEL
// ============================================================================

/**
 * Parameters for nonlinear model
 */
export interface NonlinearEdgeParams extends LinearEdgeParams {
  /** Saturation concentration (EC50/IC50) */
  saturationConc?: number;
  /** Hill coefficient */
  hillCoefficient?: number;
  /** Tipping point threshold (triggers acceleration) */
  tippingPoint?: number;
  /** Acceleration factor after tipping point */
  tippingAcceleration?: number;
}

export interface NonlinearModelParams {
  nodeIds: string[];
  edges: NonlinearEdgeParams[];
  degradationRates: Record<string, number>;
  productionRates: Record<string, number>;
  /** Global tipping points per node */
  tippingPoints: Record<string, number>;
}

/**
 * Hill function for saturation
 * effect = [X]^n / (EC50^n + [X]^n)
 */
export function hillFunction(
  concentration: number,
  ec50: number,
  hillCoeff: number = 1
): number {
  if (ec50 <= 0) return concentration > 0 ? 1 : 0;
  const xn = Math.pow(Math.max(0, concentration), hillCoeff);
  const kn = Math.pow(ec50, hillCoeff);
  return xn / (kn + xn);
}

/**
 * Inverse Hill function for inhibition
 * effect = EC50^n / (EC50^n + [X]^n)
 */
export function inverseHillFunction(
  concentration: number,
  ic50: number,
  hillCoeff: number = 1
): number {
  return 1 - hillFunction(concentration, ic50, hillCoeff);
}

/**
 * Compute derivatives for nonlinear model
 */
export function computeNonlinearDerivatives(
  state: Record<string, number>,
  params: NonlinearModelParams,
  treatmentModifiers: Record<string, number> = {},
  crossedTippingPoints: Set<string> = new Set()
): Record<string, number> {
  const derivatives: Record<string, number> = {};

  // Initialize with production - degradation
  for (const nodeId of params.nodeIds) {
    const production = params.productionRates[nodeId] || 0;
    const degradation = params.degradationRates[nodeId] || 0.1;
    const value = state[nodeId] || 0;

    derivatives[nodeId] = production - degradation * value;
  }

  // Add edge contributions with nonlinear effects
  for (const edge of params.edges) {
    const sourceValue = state[edge.sourceId] || 0;
    let effect: number;

    // Apply saturation if specified
    if (edge.saturationConc && edge.saturationConc > 0) {
      effect = hillFunction(
        sourceValue,
        edge.saturationConc,
        edge.hillCoefficient || 1
      );
    } else {
      effect = sourceValue;
    }

    // Apply tipping point acceleration
    if (edge.tippingPoint && sourceValue > edge.tippingPoint) {
      const acceleration = edge.tippingAcceleration || 2.0;
      effect *= acceleration;
    }

    // Check global tipping points
    if (crossedTippingPoints.has(edge.sourceId)) {
      effect *= 1.5; // 50% acceleration after tipping
    }

    // Apply treatment modifier
    const modifier = treatmentModifiers[edge.targetId] ?? 1.0;

    derivatives[edge.targetId] =
      (derivatives[edge.targetId] || 0) + edge.rate * edge.direction * effect * modifier;
  }

  return derivatives;
}

// ============================================================================
// FULL KINETICS MODEL
// ============================================================================

/**
 * Michaelis-Menten rate equation
 * v = Vmax * [S] / (Km + [S])
 */
export function michaelisMenten(
  substrate: number,
  vmax: number,
  km: number
): number {
  if (km <= 0) return substrate > 0 ? vmax : 0;
  return vmax * substrate / (km + substrate);
}

/**
 * Michaelis-Menten with competitive inhibition
 * v = Vmax * [S] / (Km * (1 + [I]/Ki) + [S])
 */
export function michaelisMentenCompetitive(
  substrate: number,
  inhibitor: number,
  vmax: number,
  km: number,
  ki: number
): number {
  const apparentKm = km * (1 + inhibitor / ki);
  return vmax * substrate / (apparentKm + substrate);
}

/**
 * Michaelis-Menten with noncompetitive inhibition
 * v = Vmax / (1 + [I]/Ki) * [S] / (Km + [S])
 */
export function michaelisMentenNoncompetitive(
  substrate: number,
  inhibitor: number,
  vmax: number,
  km: number,
  ki: number
): number {
  const apparentVmax = vmax / (1 + inhibitor / ki);
  return apparentVmax * substrate / (km + substrate);
}

/**
 * Parameters for full kinetics model
 */
export interface FullKineticsParams {
  nodeIds: string[];
  /** Kinetic parameters per node */
  nodeKinetics: Record<string, {
    baselineProduction: number;
    baselineDegradation: number;
    productionMM?: MichaelisMentenParams;
    degradationMM?: MichaelisMentenParams;
  }>;
  /** Edge kinetics */
  edgeKinetics: {
    sourceId: string;
    targetId: string;
    type: 'production' | 'degradation' | 'activation' | 'inhibition';
    mm: MichaelisMentenParams;
    inhibition?: InhibitionParams;
  }[];
  /** Drug concentrations (from PK model) */
  drugConcentrations: Record<string, number>;
  /** Drug inhibition parameters */
  drugInhibition: Record<string, Record<string, InhibitionParams>>;
}

/**
 * Compute derivatives for full kinetics model
 */
export function computeFullKineticsDerivatives(
  state: Record<string, number>,
  params: FullKineticsParams
): Record<string, number> {
  const derivatives: Record<string, number> = {};

  // Initialize derivatives
  for (const nodeId of params.nodeIds) {
    const kinetics = params.nodeKinetics[nodeId];
    if (!kinetics) {
      derivatives[nodeId] = 0;
      continue;
    }

    const value = state[nodeId] || 0;

    // Baseline production and degradation
    let production = kinetics.baselineProduction;
    let degradation = kinetics.baselineDegradation * value;

    // Apply MM kinetics if specified
    if (kinetics.productionMM) {
      const mm = kinetics.productionMM;
      production = michaelisMenten(production, mm.vmax, mm.km);
    }
    if (kinetics.degradationMM) {
      const mm = kinetics.degradationMM;
      degradation = michaelisMenten(value, mm.vmax, mm.km);
    }

    derivatives[nodeId] = production - degradation;
  }

  // Apply edge kinetics
  for (const edge of params.edgeKinetics) {
    const sourceValue = state[edge.sourceId] || 0;
    let rate: number;

    // Calculate base rate from MM kinetics
    rate = michaelisMenten(sourceValue, edge.mm.vmax, edge.mm.km);

    // Apply Hill coefficient if specified
    if (edge.mm.hillCoefficient && edge.mm.hillCoefficient !== 1) {
      rate = hillFunction(sourceValue, edge.mm.km, edge.mm.hillCoefficient) * edge.mm.vmax;
    }

    // Apply drug inhibition
    for (const [drugId, concentration] of Object.entries(params.drugConcentrations)) {
      const inhibParams = params.drugInhibition[drugId]?.[edge.targetId];
      if (inhibParams) {
        switch (inhibParams.type) {
          case 'competitive':
            rate = michaelisMentenCompetitive(
              sourceValue, concentration,
              edge.mm.vmax, edge.mm.km, inhibParams.ki
            );
            break;
          case 'noncompetitive':
            rate = michaelisMentenNoncompetitive(
              sourceValue, concentration,
              edge.mm.vmax, edge.mm.km, inhibParams.ki
            );
            break;
        }
      }
    }

    // Apply to target based on edge type
    switch (edge.type) {
      case 'production':
      case 'activation':
        derivatives[edge.targetId] = (derivatives[edge.targetId] || 0) + rate;
        break;
      case 'degradation':
      case 'inhibition':
        derivatives[edge.targetId] = (derivatives[edge.targetId] || 0) - rate;
        break;
    }
  }

  return derivatives;
}

// ============================================================================
// UNIFIED INTERFACE
// ============================================================================

/**
 * Unified model parameters
 */
export type ModelParams =
  | { mode: 'linear'; params: LinearModelParams }
  | { mode: 'nonlinear'; params: NonlinearModelParams }
  | { mode: 'full'; params: FullKineticsParams };

/**
 * Compute derivatives using the appropriate model
 */
export function computeDerivatives(
  state: Record<string, number>,
  model: ModelParams,
  treatmentModifiers: Record<string, number> = {},
  crossedTippingPoints: Set<string> = new Set()
): Record<string, number> {
  switch (model.mode) {
    case 'linear':
      return computeLinearDerivatives(state, model.params, treatmentModifiers);
    case 'nonlinear':
      return computeNonlinearDerivatives(
        state, model.params, treatmentModifiers, crossedTippingPoints
      );
    case 'full':
      return computeFullKineticsDerivatives(state, model.params);
  }
}

/**
 * Clamp values to valid range [0, 1]
 */
export function clampState(state: Record<string, number>): Record<string, number> {
  const clamped: Record<string, number> = {};
  for (const [nodeId, value] of Object.entries(state)) {
    clamped[nodeId] = Math.max(0, Math.min(1, value));
  }
  return clamped;
}

/**
 * Check for tipping point crossings
 */
export function checkTippingPoints(
  state: Record<string, number>,
  tippingPoints: Record<string, number>,
  alreadyCrossed: Set<string>
): { newlyCrossed: string[]; allCrossed: Set<string> } {
  const newlyCrossed: string[] = [];
  const allCrossed = new Set(alreadyCrossed);

  for (const [nodeId, threshold] of Object.entries(tippingPoints)) {
    const value = state[nodeId] || 0;
    if (value >= threshold && !alreadyCrossed.has(nodeId)) {
      newlyCrossed.push(nodeId);
      allCrossed.add(nodeId);
    }
  }

  return { newlyCrossed, allCrossed };
}
