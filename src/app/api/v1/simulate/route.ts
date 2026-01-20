/**
 * POST /api/v1/simulate
 *
 * Run a temporal simulation of disease progression with treatments.
 *
 * Request body:
 * - scenario: PatientScenario - Patient configuration
 * - treatments: TreatmentRegimen - List of treatments to apply
 * - settings: SimulationSettings - Simulation configuration
 * - durationYears: number - How long to simulate
 * - outputInterval?: number - Sampling interval (default monthly)
 */

import { NextRequest } from 'next/server';
import { success, error } from '@/lib/api/response';
import {
  allNodes,
  allEdges,
  feedbackLoops,
  drugLibrary,
} from '@/data/mechanisticFramework';
import {
  runSimulation,
  type NetworkData,
  type NetworkNode,
  type NetworkEdge,
} from '@/lib/simulation/simulator';
import type {
  TreatmentDefinition,
  FeedbackLoopDef,
} from '@/lib/simulation/treatmentEffects';
import type {
  PatientScenario,
  TreatmentRegimen,
  SimulationSettings,
} from '@/lib/simulation/types';
import type { TreatmentLibraryEntry } from '@/data/mechanisticFramework/drugLibrary';

// ============================================================================
// ADAPTERS
// ============================================================================

/**
 * Convert mechanistic framework node to simulator network node
 */
function convertNode(node: typeof allNodes[0]): NetworkNode {
  return {
    id: node.id,
    label: node.label,
    category: node.category,
    moduleId: node.moduleId,
  };
}

/**
 * Map framework RelationType to simulator relationship type
 */
function mapRelationType(relation: string): 'activates' | 'inhibits' | 'modulates' | 'produces' | 'degrades' {
  switch (relation) {
    case 'directlyIncreases':
    case 'increases':
    case 'causesNoChange':
      return 'activates';
    case 'directlyDecreases':
    case 'decreases':
    case 'negativeCorrelation':
      return 'inhibits';
    case 'produces':
    case 'hasProduct':
      return 'produces';
    case 'degrades':
    case 'hasComponent':
      return 'degrades';
    case 'regulates':
    case 'modulates':
    case 'association':
    case 'binds':
    case 'isA':
    case 'partOf':
    case 'analogous':
    default:
      return 'modulates';
  }
}

/**
 * Derive effect strength from causal confidence
 */
function deriveEffectStrength(confidence: string): 'strong' | 'moderate' | 'weak' | undefined {
  switch (confidence) {
    case 'L1':
    case 'L2':
      return 'strong';
    case 'L3':
    case 'L4':
      return 'moderate';
    case 'L5':
    case 'L6':
    case 'L7':
      return 'weak';
    default:
      return undefined;
  }
}

/**
 * Convert mechanistic framework edge to simulator network edge
 */
function convertEdge(edge: typeof allEdges[0]): NetworkEdge {
  return {
    id: edge.id,
    sourceId: edge.source,
    targetId: edge.target,
    relationship: mapRelationType(edge.relation),
    causalConfidence: edge.causalConfidence,
    effectStrength: deriveEffectStrength(edge.causalConfidence),
    timescale: edge.timescale,
  };
}

/**
 * Convert feedback loop to simulator format
 */
function convertFeedbackLoop(loop: typeof feedbackLoops[0]): FeedbackLoopDef {
  // Extract node IDs from edge IDs
  const nodeIds: string[] = [];
  for (const edgeId of loop.edgeIds) {
    const edge = allEdges.find(e => e.id === edgeId);
    if (edge) {
      if (!nodeIds.includes(edge.source)) nodeIds.push(edge.source);
      if (!nodeIds.includes(edge.target)) nodeIds.push(edge.target);
    }
  }

  return {
    id: loop.id,
    name: loop.name,
    type: loop.type,
    nodeIds,
    edgeIds: loop.edgeIds,
    baseGain: loop.type === 'reinforcing' ? 1.5 : 0.8, // Default gains
  };
}

/**
 * Convert drug library entry to treatment definition for simulator
 */
function convertTreatment(entry: TreatmentLibraryEntry): TreatmentDefinition {
  return {
    id: entry.id,
    name: entry.name,
    type: entry.type,
    primaryTargets: entry.primaryTargets.map(t => ({
      nodeId: t.nodeId,
      effect: t.effect,
      strength: t.strength,
      mechanism: t.mechanism,
    })),
    variants: entry.variants?.map(v => ({
      id: v.id,
      label: v.label,
      effectModifier: v.effectModifier ?? 1.0,
    })),
    // Default kinetics based on type
    onsetTime: getDefaultOnsetTime(entry.type),
    offsetTime: getDefaultOffsetTime(entry.type),
  };
}

/**
 * Get default onset time by treatment type (in days)
 */
function getDefaultOnsetTime(type: string): number {
  switch (type) {
    case 'small_molecule': return 7;
    case 'antibody': return 14;
    case 'biologic': return 14;
    case 'supplement': return 14;
    case 'device': return 1;
    case 'lifestyle': return 30;
    case 'behavioral': return 1;
    default: return 7;
  }
}

/**
 * Get default offset time by treatment type (in days)
 */
function getDefaultOffsetTime(type: string): number {
  switch (type) {
    case 'small_molecule': return 3;
    case 'antibody': return 30;
    case 'biologic': return 14;
    case 'supplement': return 7;
    case 'device': return 1;
    case 'lifestyle': return 30;
    case 'behavioral': return 1;
    default: return 7;
  }
}

/**
 * Extract tipping points from feedback loops
 */
function extractTippingPoints(): Record<string, number> {
  const tippingPoints: Record<string, number> = {};

  for (const loop of feedbackLoops) {
    if (loop.tippingPoint?.biomarker && loop.tippingPoint?.threshold) {
      // Parse threshold if it's a percentage
      const thresholdStr = loop.tippingPoint.threshold;
      const match = thresholdStr.match(/(\d+)/);
      if (match) {
        const value = parseInt(match[1], 10) / 100; // Convert to 0-1 scale
        // Map biomarker description to potential node IDs
        const biomarker = loop.tippingPoint.biomarker.toLowerCase();
        if (biomarker.includes('amyloid') || biomarker.includes('aβ')) {
          tippingPoints['abeta_oligomers'] = value;
          tippingPoints['abeta_plaques'] = value;
        }
        if (biomarker.includes('tau')) {
          tippingPoints['tau_hyperphosphorylated'] = value;
        }
        if (biomarker.includes('microglia')) {
          tippingPoints['microglial_activation'] = value;
        }
      }
    }
  }

  // Default tipping points for key nodes
  if (!tippingPoints['abeta_oligomers']) tippingPoints['abeta_oligomers'] = 0.6;
  if (!tippingPoints['tau_hyperphosphorylated']) tippingPoints['tau_hyperphosphorylated'] = 0.5;
  if (!tippingPoints['microglial_activation']) tippingPoints['microglial_activation'] = 0.5;
  tippingPoints['synaptic_loss'] = 0.4;
  tippingPoints['neuronal_loss'] = 0.3;
  tippingPoints['cognitive_decline'] = 0.4;

  return tippingPoints;
}

// ============================================================================
// REQUEST VALIDATION
// ============================================================================

interface SimulateRequest {
  scenario: PatientScenario;
  treatments: TreatmentRegimen;
  settings?: Partial<SimulationSettings>;
  durationYears?: number;
  outputInterval?: number;
}

function validateScenario(scenario: unknown): scenario is PatientScenario {
  if (!scenario || typeof scenario !== 'object') return false;
  const s = scenario as Record<string, unknown>;
  return (
    typeof s.age === 'number' &&
    typeof s.sex === 'string' &&
    typeof s.apoeGenotype === 'string' &&
    typeof s.diseaseStage === 'string' &&
    typeof s.lifestyle === 'object' &&
    typeof s.comorbidities === 'object'
  );
}

function validateTreatments(treatments: unknown): treatments is TreatmentRegimen {
  if (!treatments || typeof treatments !== 'object') return false;
  const t = treatments as Record<string, unknown>;
  if (!Array.isArray(t.treatments)) return false;
  return t.treatments.every(
    (tx: unknown) =>
      typeof tx === 'object' &&
      tx !== null &&
      typeof (tx as Record<string, unknown>).treatmentId === 'string'
  );
}

// ============================================================================
// API HANDLER
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    const body: SimulateRequest = await request.json();

    // Validate request
    if (!validateScenario(body.scenario)) {
      return error('Invalid scenario configuration', 400);
    }

    if (!validateTreatments(body.treatments)) {
      return error('Invalid treatments configuration', 400);
    }

    // Build settings with defaults
    const settings: SimulationSettings = {
      fidelityMode: body.settings?.fidelityMode ?? 'auto',
      uncertaintyMode: body.settings?.uncertaintyMode ?? 'simple',
      monteCarloRuns: body.settings?.monteCarloRuns ?? 100,
      maxDurationMs: body.settings?.maxDurationMs ?? 5000,
      returnPerformanceMetrics: body.settings?.returnPerformanceMetrics ?? true,
      integrationMethod: body.settings?.integrationMethod ?? 'euler',
      adaptiveTimestep: body.settings?.adaptiveTimestep ?? false,
    };

    const durationYears = body.durationYears ?? 10;
    const outputInterval = body.outputInterval ?? 1 / 12; // Monthly

    // Convert network data to simulator format
    const networkData: NetworkData = {
      nodes: allNodes.map(convertNode),
      edges: allEdges.map(convertEdge),
      feedbackLoops: feedbackLoops.map(convertFeedbackLoop),
      tippingPoints: extractTippingPoints(),
    };

    // Build treatment library map
    const treatmentLibrary = new Map<string, TreatmentDefinition>();
    for (const entry of drugLibrary) {
      treatmentLibrary.set(entry.id, convertTreatment(entry));
    }

    // Run simulation
    const response = runSimulation(
      {
        scenario: body.scenario,
        treatments: body.treatments,
        settings,
        durationYears,
        outputInterval,
      },
      networkData,
      treatmentLibrary
    );

    if (!response.success) {
      return error(response.error || 'Simulation failed', 500);
    }

    return success(response);
  } catch (err) {
    console.error('Simulation error:', err);
    return error(
      err instanceof Error ? err.message : 'Internal server error',
      500
    );
  }
}

/**
 * GET /api/v1/simulate
 *
 * Returns information about the simulation API and available options.
 */
export async function GET() {
  return success({
    description: 'Temporal simulation of AD progression with treatment interventions',
    version: '1.0.0',
    endpoints: {
      POST: {
        description: 'Run a simulation',
        body: {
          scenario: 'PatientScenario - Patient configuration (age, sex, APOE, lifestyle, comorbidities)',
          treatments: 'TreatmentRegimen - List of treatments with timing and adherence',
          settings: 'SimulationSettings - Optional simulation configuration',
          durationYears: 'number - Simulation duration (default: 10)',
          outputInterval: 'number - Output sampling interval in years (default: 1/12 monthly)',
        },
      },
      'GET /presets': {
        description: 'Get pre-built simulation scenario presets',
      },
    },
    fidelityModes: {
      linear: 'Fast first-order dynamics (<100ms)',
      nonlinear: 'Saturation and Hill coefficients (<500ms)',
      full: 'Michaelis-Menten kinetics (1-5s)',
      auto: 'Auto-detect based on device performance',
    },
    availableTreatments: drugLibrary.length,
    networkNodes: allNodes.length,
    networkEdges: allEdges.length,
    feedbackLoops: feedbackLoops.length,
  });
}
