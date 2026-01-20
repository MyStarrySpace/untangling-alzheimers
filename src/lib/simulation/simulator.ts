/**
 * Main Simulator Orchestrator
 *
 * Ties together all simulation components:
 * - State initialization from patient scenario
 * - Treatment effect modeling
 * - Stock-flow model dynamics
 * - Numerical integration
 * - Result collection and analysis
 */

import type {
  PatientScenario,
  TreatmentRegimen,
  SimulationSettings,
  SimulationResults,
  SimulationResponse,
  PerformanceMetrics,
  FidelityMode,
  NodeTrajectory,
  LoopTrajectory,
  SystemState,
  SimulationSummary,
  TreatmentEffectAnalysis,
  DEFAULT_SETTINGS,
} from './types';
import {
  initializeState,
  extractValues,
  CONCEPT_TO_NODE_MAP,
} from './stateInitializer';
import {
  computeTreatmentEffectsAtTime,
  type TreatmentDefinition,
  type TreatmentState,
  type FeedbackLoopDef,
  calculateLoopGainModification,
  classifyLoopInvolvement,
} from './treatmentEffects';
import {
  type LinearModelParams,
  type NonlinearModelParams,
  type ModelParams,
  TIMESCALE_TO_RATE,
  CONFIDENCE_TO_STRENGTH,
  EFFECT_STRENGTH_MULTIPLIER,
} from './stockFlowModel';
import {
  integrate,
  getRecommendedTimestep,
  estimateComputeSteps,
  type IntegratorOptions,
} from './integrator';

// ============================================================================
// TYPES
// ============================================================================

/**
 * Network node definition (from mechanistic framework)
 */
export interface NetworkNode {
  id: string;
  label: string;
  category: string;
  moduleId?: string;
}

/**
 * Network edge definition (from mechanistic framework)
 */
export interface NetworkEdge {
  id: string;
  sourceId: string;
  targetId: string;
  relationship: 'activates' | 'inhibits' | 'modulates' | 'produces' | 'degrades';
  causalConfidence?: string;
  effectStrength?: 'strong' | 'moderate' | 'weak';
  timescale?: string;
}

/**
 * Simulation input configuration
 */
export interface SimulationInput {
  scenario: PatientScenario;
  treatments: TreatmentRegimen;
  settings: SimulationSettings;
  /** Duration of simulation in years */
  durationYears: number;
  /** Output sampling interval in years (e.g., 1/12 for monthly) */
  outputInterval?: number;
}

/**
 * Network data for building model
 */
export interface NetworkData {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  feedbackLoops?: FeedbackLoopDef[];
  tippingPoints?: Record<string, number>;
}

// ============================================================================
// MODEL BUILDING
// ============================================================================

/**
 * Convert network edges to linear model parameters
 */
export function buildLinearModel(
  nodes: NetworkNode[],
  edges: NetworkEdge[]
): LinearModelParams {
  const nodeIds = nodes.map(n => n.id);
  const linearEdges: LinearModelParams['edges'] = [];
  const degradationRates: Record<string, number> = {};
  const productionRates: Record<string, number> = {};

  // Default degradation rates (10% per year baseline)
  for (const node of nodes) {
    degradationRates[node.id] = 0.1;
    productionRates[node.id] = 0; // No external production by default
  }

  // Convert edges
  for (const edge of edges) {
    // Determine rate from timescale
    let rate = 1.0; // Default: 1/year
    if (edge.timescale) {
      rate = TIMESCALE_TO_RATE[edge.timescale] || 1.0;
      // Scale down for simulation stability
      rate = Math.min(rate, 10); // Cap at 10/year
    }

    // Apply causal confidence scaling
    if (edge.causalConfidence) {
      const confidence = CONFIDENCE_TO_STRENGTH[edge.causalConfidence] || 0.5;
      rate *= confidence;
    }

    // Apply effect strength
    if (edge.effectStrength) {
      const strength = EFFECT_STRENGTH_MULTIPLIER[edge.effectStrength] || 0.6;
      rate *= strength;
    }

    // Determine direction
    let direction: 1 | -1 = 1;
    if (edge.relationship === 'inhibits' || edge.relationship === 'degrades') {
      direction = -1;
    }

    linearEdges.push({
      sourceId: edge.sourceId,
      targetId: edge.targetId,
      rate,
      direction,
    });
  }

  return {
    nodeIds,
    edges: linearEdges,
    degradationRates,
    productionRates,
  };
}

/**
 * Convert network to nonlinear model parameters
 */
export function buildNonlinearModel(
  nodes: NetworkNode[],
  edges: NetworkEdge[],
  tippingPoints: Record<string, number> = {}
): NonlinearModelParams {
  const linearModel = buildLinearModel(nodes, edges);

  // Extend with nonlinear parameters
  const nonlinearEdges = linearModel.edges.map(edge => ({
    ...edge,
    saturationConc: 0.5, // Default EC50 at 50%
    hillCoefficient: 1.5, // Slight cooperativity
    tippingPoint: undefined as number | undefined,
    tippingAcceleration: 2.0,
  }));

  return {
    nodeIds: linearModel.nodeIds,
    edges: nonlinearEdges,
    degradationRates: linearModel.degradationRates,
    productionRates: linearModel.productionRates,
    tippingPoints,
  };
}

/**
 * Select model based on fidelity mode
 */
export function selectModel(
  fidelityMode: FidelityMode,
  nodes: NetworkNode[],
  edges: NetworkEdge[],
  tippingPoints: Record<string, number>
): ModelParams {
  switch (fidelityMode) {
    case 'linear':
      return {
        mode: 'linear',
        params: buildLinearModel(nodes, edges),
      };

    case 'nonlinear':
    case 'auto':
    default:
      return {
        mode: 'nonlinear',
        params: buildNonlinearModel(nodes, edges, tippingPoints),
      };

    // Full kinetics would require additional parameter specification
    // For now, fall back to nonlinear
    case 'full':
      return {
        mode: 'nonlinear',
        params: buildNonlinearModel(nodes, edges, tippingPoints),
      };
  }
}

// ============================================================================
// AUTO-DETECTION
// ============================================================================

/**
 * Benchmark to determine appropriate fidelity mode
 */
export function benchmarkFidelity(
  nodes: NetworkNode[],
  edges: NetworkEdge[],
  targetMs: number = 100
): FidelityMode {
  const nodeCount = nodes.length;
  const edgeCount = edges.length;

  // Rough heuristics based on network size
  const complexity = nodeCount * edgeCount;

  if (complexity < 1000) {
    return 'full';
  } else if (complexity < 10000) {
    return 'nonlinear';
  } else {
    return 'linear';
  }
}

/**
 * Auto-detect fidelity mode based on device performance
 */
export function autoDetectFidelity(
  networkData: NetworkData,
  settings: SimulationSettings
): FidelityMode {
  if (settings.fidelityMode !== 'auto') {
    return settings.fidelityMode;
  }

  return benchmarkFidelity(networkData.nodes, networkData.edges);
}

// ============================================================================
// MAIN SIMULATOR
// ============================================================================

/**
 * Run a complete simulation
 */
export function runSimulation(
  input: SimulationInput,
  networkData: NetworkData,
  treatmentLibrary: Map<string, TreatmentDefinition>
): SimulationResponse {
  const startTime = performance.now();
  const warnings: string[] = [];

  try {
    // Determine fidelity mode
    const fidelityMode = autoDetectFidelity(networkData, input.settings);
    if (fidelityMode !== input.settings.fidelityMode && input.settings.fidelityMode !== 'auto') {
      warnings.push(`Fidelity mode changed from ${input.settings.fidelityMode} to ${fidelityMode}`);
    }

    // Build model
    const tippingPoints = networkData.tippingPoints || {};
    const model = selectModel(
      fidelityMode,
      networkData.nodes,
      networkData.edges,
      tippingPoints
    );

    // Get node IDs
    const nodeIds = networkData.nodes.map(n => n.id);

    // Initialize state from scenario
    const initialNodeStates = initializeState(input.scenario, nodeIds);
    const initialValues = extractValues(initialNodeStates);

    // Get integrator options
    const integratorOptions = getRecommendedTimestep(fidelityMode, input.durationYears);
    if (input.settings.integrationMethod) {
      integratorOptions.method = input.settings.integrationMethod;
    }
    if (input.settings.adaptiveTimestep !== undefined) {
      integratorOptions.adaptive = input.settings.adaptiveTimestep;
    }

    // Create treatment modifier function
    const treatmentModifierFn = (time: number): Record<string, number> => {
      const { combinedModifiers } = computeTreatmentEffectsAtTime(
        input.treatments,
        treatmentLibrary,
        time,
        'years'
      );
      return combinedModifiers;
    };

    // Check for timeout
    const maxDurationMs = input.settings.maxDurationMs || 5000;
    const estimatedSteps = estimateComputeSteps(input.durationYears, integratorOptions);

    // Run integration
    const integrationResult = integrate(
      initialValues,
      0,
      input.durationYears,
      model,
      treatmentModifierFn,
      tippingPoints,
      integratorOptions,
      undefined, // No step callback
      estimatedSteps * 2 // Allow some buffer
    );

    // Collect results
    const nodeLabels = new Map(networkData.nodes.map(n => [n.id, n.label]));

    // Build node trajectories
    const nodeTrajectories: NodeTrajectory[] = [];
    for (const [nodeId, traj] of Array.from(integrationResult.trajectories.entries())) {
      const tippingIdx = traj.values.findIndex((v, i) => {
        const threshold = tippingPoints[nodeId];
        if (threshold === undefined) return false;
        return v >= threshold && (i === 0 || traj.values[i - 1] < threshold);
      });

      nodeTrajectories.push({
        nodeId,
        nodeLabel: nodeLabels.get(nodeId) || nodeId,
        times: traj.times,
        values: traj.values,
        rates: traj.rates,
        tippingPointIndex: tippingIdx,
      });
    }

    // Build loop trajectories (simplified)
    const loopTrajectories: LoopTrajectory[] = [];
    if (networkData.feedbackLoops) {
      for (const loop of networkData.feedbackLoops) {
        // Sample loop gains at a few time points
        const times: number[] = [];
        const gains: number[] = [];
        let brokenAt: number | undefined;

        const sampleInterval = input.durationYears / 20;
        for (let t = 0; t <= input.durationYears; t += sampleInterval) {
          times.push(t);
          const modifiers = treatmentModifierFn(t);
          const { modifiedGain, isBroken } = calculateLoopGainModification(loop, modifiers);
          gains.push(modifiedGain);

          if (isBroken && brokenAt === undefined) {
            brokenAt = t;
          }
        }

        loopTrajectories.push({
          loopId: loop.id,
          loopName: loop.name,
          loopType: loop.type,
          times,
          gains,
          brokenByTreatment: brokenAt !== undefined,
          brokenAt,
        });
      }
    }

    // Build state snapshots
    const stateSnapshots: SystemState[] = [];
    const outputInterval = input.outputInterval || 1 / 12; // Monthly default
    const firstNodeTraj = nodeTrajectories[0];
    if (firstNodeTraj) {
      for (let i = 0; i < firstNodeTraj.times.length; i++) {
        const time = firstNodeTraj.times[i];
        // Sample at output interval
        if (i === 0 || time >= stateSnapshots.length * outputInterval * input.durationYears / firstNodeTraj.times.length) {
          const nodes: Record<string, { nodeId: string; value: number; rate: number; crossedTippingPoint: boolean }> = {};
          for (const traj of nodeTrajectories) {
            nodes[traj.nodeId] = {
              nodeId: traj.nodeId,
              value: traj.values[i] ?? 0,
              rate: traj.rates[i] ?? 0,
              crossedTippingPoint: traj.tippingPointIndex !== -1 && i >= traj.tippingPointIndex,
            };
          }

          const loopGains: Record<string, number> = {};
          for (const loop of loopTrajectories) {
            const loopIdx = Math.min(
              Math.floor(i * loop.times.length / firstNodeTraj.times.length),
              loop.gains.length - 1
            );
            loopGains[loop.loopId] = loop.gains[loopIdx] ?? loop.gains[0] ?? 1;
          }

          stateSnapshots.push({
            time,
            timeUnit: 'years',
            nodes,
            loopGains,
            stabilityIndex: calculateStabilityIndex(loopGains, loopTrajectories),
          });
        }
      }
    }

    // Calculate summary
    const summary = calculateSummary(
      nodeTrajectories,
      loopTrajectories,
      input.durationYears,
      integrationResult.crossedTippingPoints.size
    );

    // Calculate treatment effects
    const treatmentEffects = analyzeTreatmentEffects(
      input.treatments,
      treatmentLibrary,
      networkData.feedbackLoops || [],
      input.durationYears / 2 // Analyze at midpoint
    );

    // Generate recommendations
    const recommendations = generateRecommendations(
      summary,
      treatmentEffects,
      loopTrajectories
    );

    // Build results
    const results: SimulationResults = {
      scenario: input.scenario,
      treatments: input.treatments,
      settings: input.settings,
      nodeTrajectories,
      loopTrajectories,
      stateSnapshots,
      summary,
      treatmentEffects,
      recommendations,
    };

    // Performance metrics
    const computeTimeMs = performance.now() - startTime;
    const performance_: PerformanceMetrics = {
      fidelityModeUsed: fidelityMode,
      computeTimeMs,
      timestepsComputed: integrationResult.stepCount,
      msPerTimestep: computeTimeMs / integrationResult.stepCount,
      memoryEstimateBytes: estimateMemoryUsage(nodeTrajectories),
      warnings,
    };

    return {
      success: true,
      results,
      performance: input.settings.returnPerformanceMetrics ? performance_ : undefined,
    };

  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// ============================================================================
// ANALYSIS HELPERS
// ============================================================================

/**
 * Calculate overall stability index from loop gains
 */
function calculateStabilityIndex(
  loopGains: Record<string, number>,
  loopTrajectories: LoopTrajectory[]
): number {
  // Stability index: negative = stable, positive = unstable
  // Based on whether reinforcing loops have gain > 1

  let totalGain = 0;
  let reinforcingCount = 0;

  for (const loop of loopTrajectories) {
    if (loop.loopType === 'reinforcing') {
      const gain = loopGains[loop.loopId] ?? 1;
      totalGain += gain - 1; // Positive if gain > 1 (unstable)
      reinforcingCount++;
    }
  }

  if (reinforcingCount === 0) return 0;

  // Normalize to -1 to 1 range
  return Math.tanh(totalGain / reinforcingCount);
}

/**
 * Calculate simulation summary statistics
 */
function calculateSummary(
  nodeTrajectories: NodeTrajectory[],
  loopTrajectories: LoopTrajectory[],
  duration: number,
  tippingPointsCrossed: number
): SimulationSummary {
  // Find key pathology nodes
  const amyloidNode = nodeTrajectories.find(t =>
    t.nodeId.includes('abeta') || t.nodeId.includes('amyloid')
  );
  const tauNode = nodeTrajectories.find(t =>
    t.nodeId.includes('tau')
  );
  const cognitiveNode = nodeTrajectories.find(t =>
    t.nodeId.includes('cognitive') || t.nodeId.includes('memory')
  );

  // Calculate progression rate based on pathology change
  let progressionRate = 1.0;
  if (amyloidNode || tauNode || cognitiveNode) {
    const pathologyChanges: number[] = [];
    for (const node of [amyloidNode, tauNode, cognitiveNode]) {
      if (node && node.values.length > 1) {
        const startVal = node.values[0];
        const endVal = node.values[node.values.length - 1];
        pathologyChanges.push(endVal - startVal);
      }
    }
    if (pathologyChanges.length > 0) {
      const avgChange = pathologyChanges.reduce((a, b) => a + b, 0) / pathologyChanges.length;
      // Normalize: 0.1 change per year is baseline (progressionRate = 1)
      progressionRate = Math.max(0, avgChange / (duration * 0.1));
    }
  }

  // Calculate loop status
  const loopsBroken = loopTrajectories.filter(l => l.brokenByTreatment).length;

  // Calculate stability change
  const initialGains = loopTrajectories.map(l => l.gains[0] ?? 1);
  const finalGains = loopTrajectories.map(l => l.gains[l.gains.length - 1] ?? 1);
  const initialStability = initialGains.reduce((a, b) => a + (b - 1), 0) / Math.max(1, initialGains.length);
  const finalStability = finalGains.reduce((a, b) => a + (b - 1), 0) / Math.max(1, finalGains.length);

  // Estimate CDR-SB change (very rough approximation)
  // Typical untreated progression: ~1.5 points/year
  // progressionRate of 1.0 = 1.5 points/year
  const estimatedCdrSbChangePerYear = progressionRate * 1.5;

  return {
    duration,
    timeUnit: 'years',
    finalStabilityIndex: Math.tanh(finalStability),
    stabilityChange: finalStability - initialStability,
    tippingPointsCrossed,
    loopsBroken,
    progressionRate,
    estimatedCdrSbChangePerYear,
  };
}

/**
 * Analyze effects of each treatment
 */
function analyzeTreatmentEffects(
  regimen: TreatmentRegimen,
  treatmentLibrary: Map<string, TreatmentDefinition>,
  feedbackLoops: FeedbackLoopDef[],
  analysisTime: number
): TreatmentEffectAnalysis[] {
  const effects: TreatmentEffectAnalysis[] = [];

  for (const admin of regimen.treatments) {
    const treatment = treatmentLibrary.get(admin.treatmentId);
    if (!treatment) continue;

    // Get treatment modifiers at analysis time
    const { states, combinedModifiers } = computeTreatmentEffectsAtTime(
      { treatments: [admin] },
      treatmentLibrary,
      analysisTime,
      'years'
    );

    // Direct targets
    const directTargets = treatment.primaryTargets.map(t => t.nodeId);

    // Loop effects
    const loopsAffected: TreatmentEffectAnalysis['loopsAffected'] = [];
    for (const loop of feedbackLoops) {
      const { modifiedGain, reductionFactor, isBroken } = calculateLoopGainModification(
        loop,
        combinedModifiers
      );
      const effect = classifyLoopInvolvement(reductionFactor, isBroken);
      if (effect !== 'none') {
        loopsAffected.push({
          loopId: loop.id,
          effect,
          gainReduction: reductionFactor,
        });
      }
    }

    // Calculate overall contribution
    const contribution = loopsAffected.reduce((sum, la) => sum + Math.max(0, la.gainReduction), 0) /
      Math.max(1, feedbackLoops.length);

    effects.push({
      treatmentId: treatment.id,
      treatmentName: treatment.name,
      directTargets,
      loopsAffected,
      progressionSlowingContribution: Math.min(1, contribution),
    });
  }

  return effects;
}

/**
 * Generate recommendations based on simulation results
 */
function generateRecommendations(
  summary: SimulationSummary,
  treatmentEffects: TreatmentEffectAnalysis[],
  loopTrajectories: LoopTrajectory[]
): string[] {
  const recommendations: string[] = [];

  // Check if progression is too fast
  if (summary.progressionRate > 0.8) {
    recommendations.push('Current treatment regimen provides minimal slowing. Consider additional interventions.');
  }

  // Find unbroken reinforcing loops
  const unbrokenmLoops = loopTrajectories.filter(l =>
    l.loopType === 'reinforcing' && !l.brokenByTreatment
  );
  if (unbrokenmLoops.length > 0) {
    const loopNames = unbrokenmLoops.slice(0, 3).map(l => l.loopName).join(', ');
    recommendations.push(`Reinforcing loops still active: ${loopNames}. Target these for additional intervention.`);
  }

  // Check treatment synergies
  const totalContribution = treatmentEffects.reduce((sum, te) =>
    sum + te.progressionSlowingContribution, 0
  );
  if (totalContribution < 0.3 && treatmentEffects.length > 0) {
    recommendations.push('Treatment combination shows limited synergy. Consider targeting different pathways.');
  }

  // Positive feedback
  if (summary.progressionRate < 0.3) {
    recommendations.push('Treatment combination shows strong effect on disease progression.');
  }
  if (summary.loopsBroken > 0) {
    recommendations.push(`${summary.loopsBroken} reinforcing loop(s) effectively disrupted.`);
  }

  return recommendations;
}

/**
 * Estimate memory usage of trajectories
 */
function estimateMemoryUsage(trajectories: NodeTrajectory[]): number {
  let bytes = 0;
  for (const traj of trajectories) {
    // Each number is 8 bytes (Float64)
    bytes += traj.times.length * 8 * 3; // times, values, rates
    bytes += traj.nodeId.length * 2; // strings
    bytes += traj.nodeLabel.length * 2;
  }
  return bytes;
}

