/**
 * Numerical Integration Module
 *
 * Implements numerical integration methods for solving the ODEs:
 * - Euler: Simple first-order method (fast, less accurate)
 * - RK4: Fourth-order Runge-Kutta (more accurate, slightly slower)
 *
 * Both methods support adaptive timestep for stiff systems.
 */

import type { FidelityMode, TimeUnit } from './types';
import {
  computeDerivatives,
  clampState,
  checkTippingPoints,
  type ModelParams,
} from './stockFlowModel';

// ============================================================================
// TYPES
// ============================================================================

/**
 * Integration method
 */
export type IntegrationMethod = 'euler' | 'rk4';

/**
 * Options for the integrator
 */
export interface IntegratorOptions {
  /** Integration method */
  method: IntegrationMethod;
  /** Base timestep (in time units) */
  timestep: number;
  /** Time unit */
  timeUnit: TimeUnit;
  /** Use adaptive timestep */
  adaptive: boolean;
  /** Minimum timestep (for adaptive) */
  minTimestep?: number;
  /** Maximum timestep (for adaptive) */
  maxTimestep?: number;
  /** Error tolerance (for adaptive) */
  errorTolerance?: number;
}

/**
 * Result of a single integration step
 */
export interface StepResult {
  /** New state after step */
  state: Record<string, number>;
  /** New time */
  time: number;
  /** Actual timestep used */
  actualTimestep: number;
  /** Tipping points newly crossed */
  newlyCrossedTippingPoints: string[];
  /** All crossed tipping points */
  allCrossedTippingPoints: Set<string>;
  /** Derivatives at end of step */
  derivatives: Record<string, number>;
}

/**
 * Default integrator options
 */
export const DEFAULT_INTEGRATOR_OPTIONS: IntegratorOptions = {
  method: 'euler',
  timestep: 1 / 12, // Monthly in years
  timeUnit: 'years',
  adaptive: false,
  minTimestep: 1 / 365, // Daily
  maxTimestep: 1 / 4, // Quarterly
  errorTolerance: 0.001,
};

// ============================================================================
// EULER INTEGRATION
// ============================================================================

/**
 * Single Euler step
 *
 * y_{n+1} = y_n + h * f(t_n, y_n)
 */
export function eulerStep(
  state: Record<string, number>,
  time: number,
  timestep: number,
  model: ModelParams,
  treatmentModifiers: Record<string, number>,
  crossedTippingPoints: Set<string>
): { newState: Record<string, number>; derivatives: Record<string, number> } {
  // Compute derivatives at current state
  const derivatives = computeDerivatives(
    state,
    model,
    treatmentModifiers,
    crossedTippingPoints
  );

  // Update state
  const newState: Record<string, number> = {};
  for (const nodeId of Object.keys(state)) {
    const deriv = derivatives[nodeId] || 0;
    newState[nodeId] = state[nodeId] + timestep * deriv;
  }

  return { newState: clampState(newState), derivatives };
}

// ============================================================================
// RK4 INTEGRATION
// ============================================================================

/**
 * Single RK4 step
 *
 * k1 = f(t_n, y_n)
 * k2 = f(t_n + h/2, y_n + h*k1/2)
 * k3 = f(t_n + h/2, y_n + h*k2/2)
 * k4 = f(t_n + h, y_n + h*k3)
 * y_{n+1} = y_n + h/6 * (k1 + 2*k2 + 2*k3 + k4)
 */
export function rk4Step(
  state: Record<string, number>,
  time: number,
  timestep: number,
  model: ModelParams,
  treatmentModifiers: Record<string, number>,
  crossedTippingPoints: Set<string>
): { newState: Record<string, number>; derivatives: Record<string, number> } {
  const nodeIds = Object.keys(state);

  // k1 = f(t_n, y_n)
  const k1 = computeDerivatives(state, model, treatmentModifiers, crossedTippingPoints);

  // y + h*k1/2
  const state2: Record<string, number> = {};
  for (const nodeId of nodeIds) {
    state2[nodeId] = state[nodeId] + (timestep / 2) * (k1[nodeId] || 0);
  }

  // k2 = f(t_n + h/2, y_n + h*k1/2)
  const k2 = computeDerivatives(clampState(state2), model, treatmentModifiers, crossedTippingPoints);

  // y + h*k2/2
  const state3: Record<string, number> = {};
  for (const nodeId of nodeIds) {
    state3[nodeId] = state[nodeId] + (timestep / 2) * (k2[nodeId] || 0);
  }

  // k3 = f(t_n + h/2, y_n + h*k2/2)
  const k3 = computeDerivatives(clampState(state3), model, treatmentModifiers, crossedTippingPoints);

  // y + h*k3
  const state4: Record<string, number> = {};
  for (const nodeId of nodeIds) {
    state4[nodeId] = state[nodeId] + timestep * (k3[nodeId] || 0);
  }

  // k4 = f(t_n + h, y_n + h*k3)
  const k4 = computeDerivatives(clampState(state4), model, treatmentModifiers, crossedTippingPoints);

  // y_{n+1} = y_n + h/6 * (k1 + 2*k2 + 2*k3 + k4)
  const newState: Record<string, number> = {};
  for (const nodeId of nodeIds) {
    const k1v = k1[nodeId] || 0;
    const k2v = k2[nodeId] || 0;
    const k3v = k3[nodeId] || 0;
    const k4v = k4[nodeId] || 0;
    newState[nodeId] = state[nodeId] + (timestep / 6) * (k1v + 2 * k2v + 2 * k3v + k4v);
  }

  // Return k1 as the derivatives (at the start of the step)
  return { newState: clampState(newState), derivatives: k1 };
}

// ============================================================================
// ADAPTIVE TIMESTEP
// ============================================================================

/**
 * Estimate local truncation error using step doubling
 * Compare y(t+h) computed with one step of size h vs two steps of size h/2
 */
export function estimateError(
  state: Record<string, number>,
  time: number,
  timestep: number,
  model: ModelParams,
  treatmentModifiers: Record<string, number>,
  crossedTippingPoints: Set<string>,
  method: IntegrationMethod
): number {
  const stepFn = method === 'rk4' ? rk4Step : eulerStep;

  // One big step
  const { newState: bigStep } = stepFn(
    state,
    time,
    timestep,
    model,
    treatmentModifiers,
    crossedTippingPoints
  );

  // Two half steps
  const { newState: halfStep1 } = stepFn(
    state,
    time,
    timestep / 2,
    model,
    treatmentModifiers,
    crossedTippingPoints
  );
  const { newState: halfStep2 } = stepFn(
    halfStep1,
    time + timestep / 2,
    timestep / 2,
    model,
    treatmentModifiers,
    crossedTippingPoints
  );

  // Compute max relative error
  let maxError = 0;
  for (const nodeId of Object.keys(state)) {
    const big = bigStep[nodeId] || 0;
    const small = halfStep2[nodeId] || 0;
    const error = Math.abs(big - small) / Math.max(0.001, Math.abs(small));
    maxError = Math.max(maxError, error);
  }

  return maxError;
}

/**
 * Compute adaptive timestep based on error estimate
 */
export function computeAdaptiveTimestep(
  currentTimestep: number,
  error: number,
  tolerance: number,
  minTimestep: number,
  maxTimestep: number,
  method: IntegrationMethod
): number {
  // Safety factor
  const safety = 0.9;

  // Order of the method
  const order = method === 'rk4' ? 4 : 1;

  // Optimal timestep based on error
  let newTimestep: number;
  if (error < tolerance * 0.1) {
    // Error very small, can increase timestep
    newTimestep = currentTimestep * 2;
  } else if (error > tolerance) {
    // Error too large, decrease timestep
    newTimestep = safety * currentTimestep * Math.pow(tolerance / error, 1 / (order + 1));
  } else {
    // Error acceptable
    newTimestep = currentTimestep;
  }

  // Clamp to bounds
  return Math.max(minTimestep, Math.min(maxTimestep, newTimestep));
}

// ============================================================================
// MAIN INTEGRATOR
// ============================================================================

/**
 * Perform a single integration step
 */
export function integrationStep(
  state: Record<string, number>,
  time: number,
  model: ModelParams,
  treatmentModifiers: Record<string, number>,
  crossedTippingPoints: Set<string>,
  tippingPointThresholds: Record<string, number>,
  options: IntegratorOptions
): StepResult {
  let actualTimestep = options.timestep;
  let newState: Record<string, number>;
  let derivatives: Record<string, number>;

  // Adaptive timestep
  if (options.adaptive) {
    const error = estimateError(
      state,
      time,
      actualTimestep,
      model,
      treatmentModifiers,
      crossedTippingPoints,
      options.method
    );

    actualTimestep = computeAdaptiveTimestep(
      actualTimestep,
      error,
      options.errorTolerance || 0.001,
      options.minTimestep || DEFAULT_INTEGRATOR_OPTIONS.minTimestep!,
      options.maxTimestep || DEFAULT_INTEGRATOR_OPTIONS.maxTimestep!,
      options.method
    );
  }

  // Perform integration step
  const stepFn = options.method === 'rk4' ? rk4Step : eulerStep;
  const result = stepFn(
    state,
    time,
    actualTimestep,
    model,
    treatmentModifiers,
    crossedTippingPoints
  );
  newState = result.newState;
  derivatives = result.derivatives;

  // Check tipping points
  const { newlyCrossed, allCrossed } = checkTippingPoints(
    newState,
    tippingPointThresholds,
    crossedTippingPoints
  );

  return {
    state: newState,
    time: time + actualTimestep,
    actualTimestep,
    newlyCrossedTippingPoints: newlyCrossed,
    allCrossedTippingPoints: allCrossed,
    derivatives,
  };
}

/**
 * Integrate system from start to end time
 */
export function integrate(
  initialState: Record<string, number>,
  startTime: number,
  endTime: number,
  model: ModelParams,
  treatmentModifiersFn: (time: number) => Record<string, number>,
  tippingPointThresholds: Record<string, number>,
  options: IntegratorOptions,
  onStep?: (result: StepResult) => void,
  maxSteps: number = 10000
): {
  finalState: Record<string, number>;
  finalTime: number;
  crossedTippingPoints: Set<string>;
  stepCount: number;
  trajectories: Map<string, { times: number[]; values: number[]; rates: number[] }>;
} {
  let currentState = { ...initialState };
  let currentTime = startTime;
  let crossedTippingPoints = new Set<string>();
  let stepCount = 0;

  // Initialize trajectories
  const trajectories = new Map<string, { times: number[]; values: number[]; rates: number[] }>();
  for (const nodeId of Object.keys(initialState)) {
    trajectories.set(nodeId, {
      times: [startTime],
      values: [initialState[nodeId]],
      rates: [0],
    });
  }

  // Integration loop
  while (currentTime < endTime && stepCount < maxSteps) {
    // Get treatment modifiers at current time
    const treatmentModifiers = treatmentModifiersFn(currentTime);

    // Take a step
    const stepResult = integrationStep(
      currentState,
      currentTime,
      model,
      treatmentModifiers,
      crossedTippingPoints,
      tippingPointThresholds,
      options
    );

    // Update state
    currentState = stepResult.state;
    currentTime = stepResult.time;
    crossedTippingPoints = stepResult.allCrossedTippingPoints;
    stepCount++;

    // Record trajectories
    for (const nodeId of Object.keys(currentState)) {
      const traj = trajectories.get(nodeId);
      if (traj) {
        traj.times.push(currentTime);
        traj.values.push(currentState[nodeId]);
        traj.rates.push(stepResult.derivatives[nodeId] || 0);
      }
    }

    // Callback
    if (onStep) {
      onStep(stepResult);
    }
  }

  return {
    finalState: currentState,
    finalTime: currentTime,
    crossedTippingPoints,
    stepCount,
    trajectories,
  };
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Convert timestep between time units
 */
export function convertTimestep(
  timestep: number,
  fromUnit: TimeUnit,
  toUnit: TimeUnit
): number {
  // Convert to days first
  const toDays: Record<TimeUnit, number> = {
    hours: 1 / 24,
    days: 1,
    weeks: 7,
    months: 30,
    years: 365,
  };

  const days = timestep * toDays[fromUnit];
  return days / toDays[toUnit];
}

/**
 * Calculate recommended timestep based on fidelity mode
 */
export function getRecommendedTimestep(
  fidelityMode: FidelityMode,
  simulationDurationYears: number
): IntegratorOptions {
  switch (fidelityMode) {
    case 'linear':
      // Fast mode: larger timesteps, Euler
      return {
        method: 'euler',
        timestep: 1 / 12, // Monthly
        timeUnit: 'years',
        adaptive: false,
      };

    case 'nonlinear':
      // Balanced mode: medium timesteps, Euler or RK4
      return {
        method: simulationDurationYears > 5 ? 'euler' : 'rk4',
        timestep: 1 / 24, // Bi-weekly
        timeUnit: 'years',
        adaptive: false,
      };

    case 'full':
      // Accurate mode: smaller timesteps, RK4, adaptive
      return {
        method: 'rk4',
        timestep: 1 / 52, // Weekly
        timeUnit: 'years',
        adaptive: true,
        minTimestep: 1 / 365, // Daily min
        maxTimestep: 1 / 12, // Monthly max
        errorTolerance: 0.0001,
      };

    case 'auto':
    default:
      // Default to nonlinear settings
      return {
        method: 'euler',
        timestep: 1 / 12,
        timeUnit: 'years',
        adaptive: false,
      };
  }
}

/**
 * Estimate compute time for a simulation
 */
export function estimateComputeSteps(
  durationYears: number,
  options: IntegratorOptions
): number {
  const timestepYears = convertTimestep(options.timestep, options.timeUnit, 'years');
  return Math.ceil(durationYears / timestepYears);
}
