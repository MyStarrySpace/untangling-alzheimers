/**
 * Temporal Simulation Engine - Type Definitions
 *
 * Supports three fidelity modes:
 * - Linear: First-order dynamics, fast
 * - Nonlinear: Saturation + Hill coefficients
 * - Full: Michaelis-Menten + PK/PD
 */

// ============================================================================
// SIMULATION CONFIGURATION
// ============================================================================

/**
 * Simulation fidelity mode
 */
export type FidelityMode = 'auto' | 'linear' | 'nonlinear' | 'full';

/**
 * Uncertainty quantification mode
 */
export type UncertaintyMode = 'simple' | 'advanced';

/**
 * Time unit for simulation
 */
export type TimeUnit = 'hours' | 'days' | 'weeks' | 'months' | 'years';

/**
 * Simulation settings
 */
export interface SimulationSettings {
  /** Fidelity mode (auto-detected if 'auto') */
  fidelityMode: FidelityMode;
  /** Uncertainty quantification mode */
  uncertaintyMode: UncertaintyMode;
  /** Number of Monte Carlo runs (only for advanced mode) */
  monteCarloRuns?: number;
  /** Maximum duration in milliseconds before timeout */
  maxDurationMs?: number;
  /** Return performance metrics in response */
  returnPerformanceMetrics?: boolean;
  /** Integration method */
  integrationMethod?: 'euler' | 'rk4';
  /** Adaptive timestep (for stiff systems) */
  adaptiveTimestep?: boolean;
}

/**
 * Default simulation settings
 */
export const DEFAULT_SETTINGS: SimulationSettings = {
  fidelityMode: 'auto',
  uncertaintyMode: 'simple',
  monteCarloRuns: 100,
  maxDurationMs: 5000,
  returnPerformanceMetrics: true,
  integrationMethod: 'euler',
  adaptiveTimestep: false,
};

// ============================================================================
// PATIENT SCENARIO
// ============================================================================

/**
 * APOE genotype
 */
export type APOEGenotype = 'e2/e2' | 'e2/e3' | 'e2/e4' | 'e3/e3' | 'e3/e4' | 'e4/e4';

/**
 * Disease stage
 */
export type DiseaseStage =
  | 'preclinical'      // No symptoms, biomarkers may be positive
  | 'mci'              // Mild cognitive impairment
  | 'mild_ad'          // Mild Alzheimer's disease
  | 'moderate_ad'      // Moderate AD
  | 'severe_ad';       // Severe AD

/**
 * Lifestyle factors
 */
export interface LifestyleFactors {
  /** Exercise level (0-1, where 0=sedentary, 1=very active) */
  exerciseLevel: number;
  /** Diet quality (0-1, where 0=poor, 1=Mediterranean/MIND) */
  dietQuality: number;
  /** Sleep quality (0-1, where 0=poor/fragmented, 1=optimal 7-8h) */
  sleepQuality: number;
  /** Cognitive engagement (0-1, where 0=low, 1=high mental activity) */
  cognitiveEngagement: number;
  /** Social engagement (0-1) */
  socialEngagement: number;
  /** Stress level (0-1, where 0=low, 1=chronic high stress) */
  stressLevel: number;
  /** Smoking status */
  smokingStatus: 'never' | 'former' | 'current';
  /** Alcohol consumption */
  alcoholConsumption: 'none' | 'moderate' | 'heavy';
}

/**
 * Comorbidities that affect AD risk/progression
 */
export interface Comorbidities {
  /** Type 2 diabetes */
  diabetes: boolean;
  /** Hypertension */
  hypertension: boolean;
  /** Cardiovascular disease */
  cardiovascularDisease: boolean;
  /** Obesity (BMI > 30) */
  obesity: boolean;
  /** Depression */
  depression: boolean;
  /** Traumatic brain injury history */
  tbiHistory: boolean;
  /** Hearing loss */
  hearingLoss: boolean;
}

/**
 * Patient scenario configuration
 */
export interface PatientScenario {
  /** Unique identifier for this scenario */
  id?: string;
  /** Human-readable name */
  name?: string;

  // Demographics
  /** Age at simulation start (years) */
  age: number;
  /** Biological sex */
  sex: 'male' | 'female';
  /** APOE genotype */
  apoeGenotype: APOEGenotype;

  // Disease state
  /** Current disease stage */
  diseaseStage: DiseaseStage;
  /** Years since symptom onset (negative = preclinical) */
  yearsSinceOnset?: number;

  // Risk factors
  /** Lifestyle factors */
  lifestyle: LifestyleFactors;
  /** Comorbidities */
  comorbidities: Comorbidities;

  // Optional: direct node state overrides
  /** Override specific node initial values (0-1 scale) */
  nodeOverrides?: Record<string, number>;
}

/**
 * Default lifestyle (average American)
 */
export const DEFAULT_LIFESTYLE: LifestyleFactors = {
  exerciseLevel: 0.3,
  dietQuality: 0.4,
  sleepQuality: 0.5,
  cognitiveEngagement: 0.4,
  socialEngagement: 0.5,
  stressLevel: 0.5,
  smokingStatus: 'never',
  alcoholConsumption: 'moderate',
};

/**
 * Default comorbidities (none)
 */
export const DEFAULT_COMORBIDITIES: Comorbidities = {
  diabetes: false,
  hypertension: false,
  cardiovascularDisease: false,
  obesity: false,
  depression: false,
  tbiHistory: false,
  hearingLoss: false,
};

// ============================================================================
// TREATMENT REGIMEN
// ============================================================================

/**
 * Treatment administration in the simulation
 */
export interface TreatmentAdministration {
  /** Treatment ID from drugLibrary */
  treatmentId: string;
  /** Variant ID (e.g., 'standard', 'low_dose') */
  variantId?: string;
  /** Start time (in simulation time units) */
  startTime: number;
  /** End time (undefined = continue indefinitely) */
  endTime?: number;
  /** Dose multiplier (1.0 = standard dose) */
  doseMultiplier?: number;
  /** Adherence rate (0-1, where 1 = perfect adherence) */
  adherence?: number;
}

/**
 * Complete treatment regimen
 */
export interface TreatmentRegimen {
  /** List of treatments to administer */
  treatments: TreatmentAdministration[];
}

// ============================================================================
// SIMULATION STATE
// ============================================================================

/**
 * State of a single node at a point in time
 */
export interface NodeState {
  /** Node ID */
  nodeId: string;
  /** Current value (0-1 normalized, where 0=healthy, 1=pathological max) */
  value: number;
  /** Rate of change (d[value]/dt) */
  rate: number;
  /** Has crossed tipping point */
  crossedTippingPoint: boolean;
  /** Time when tipping point was crossed (if applicable) */
  tippingPointCrossedAt?: number;
}

/**
 * State of the entire system at a point in time
 */
export interface SystemState {
  /** Current simulation time */
  time: number;
  /** Time unit */
  timeUnit: TimeUnit;
  /** State of all nodes */
  nodes: Record<string, NodeState>;
  /** Active feedback loops and their current gains */
  loopGains: Record<string, number>;
  /** Overall system stability metric (-1 to 1, negative = stable) */
  stabilityIndex: number;
}

// ============================================================================
// SIMULATION OUTPUT
// ============================================================================

/**
 * Trajectory of a single node over time
 */
export interface NodeTrajectory {
  /** Node ID */
  nodeId: string;
  /** Node label */
  nodeLabel: string;
  /** Time points */
  times: number[];
  /** Values at each time point */
  values: number[];
  /** Rates at each time point */
  rates: number[];
  /** Index of tipping point crossing (-1 if not crossed) */
  tippingPointIndex: number;
}

/**
 * Feedback loop dynamics over time
 */
export interface LoopTrajectory {
  /** Loop ID */
  loopId: string;
  /** Loop name */
  loopName: string;
  /** Loop type */
  loopType: 'reinforcing' | 'balancing';
  /** Time points */
  times: number[];
  /** Loop gain at each time point */
  gains: number[];
  /** Is loop broken by treatment */
  brokenByTreatment: boolean;
  /** Time when loop was broken */
  brokenAt?: number;
}

/**
 * Summary statistics for a simulation
 */
export interface SimulationSummary {
  /** Total simulation duration */
  duration: number;
  /** Time unit */
  timeUnit: TimeUnit;
  /** Final stability index */
  finalStabilityIndex: number;
  /** Change in stability from start */
  stabilityChange: number;
  /** Number of tipping points crossed */
  tippingPointsCrossed: number;
  /** Number of feedback loops broken */
  loopsBroken: number;
  /** Overall disease progression rate (0 = halted, 1 = untreated baseline) */
  progressionRate: number;
  /** Equivalent clinical outcome (approximate CDR-SB change per year) */
  estimatedCdrSbChangePerYear: number;
}

/**
 * Treatment effect analysis
 */
export interface TreatmentEffectAnalysis {
  /** Treatment ID */
  treatmentId: string;
  /** Treatment name */
  treatmentName: string;
  /** Nodes directly affected */
  directTargets: string[];
  /** Feedback loops affected */
  loopsAffected: {
    loopId: string;
    effect: 'breaks' | 'weakens' | 'strengthens' | 'enters';
    gainReduction: number;
  }[];
  /** Overall contribution to slowing progression (0-1) */
  progressionSlowingContribution: number;
}

/**
 * Complete simulation results
 */
export interface SimulationResults {
  /** Scenario that was simulated */
  scenario: PatientScenario;
  /** Treatment regimen applied */
  treatments: TreatmentRegimen;
  /** Settings used */
  settings: SimulationSettings;

  /** Node trajectories */
  nodeTrajectories: NodeTrajectory[];
  /** Loop trajectories */
  loopTrajectories: LoopTrajectory[];
  /** System state snapshots (sampled) */
  stateSnapshots: SystemState[];

  /** Summary statistics */
  summary: SimulationSummary;
  /** Per-treatment effect analysis */
  treatmentEffects: TreatmentEffectAnalysis[];

  /** Recommendations for additional interventions */
  recommendations: string[];
}

/**
 * Performance metrics for the simulation
 */
export interface PerformanceMetrics {
  /** Fidelity mode actually used */
  fidelityModeUsed: FidelityMode;
  /** Total compute time in milliseconds */
  computeTimeMs: number;
  /** Number of timesteps computed */
  timestepsComputed: number;
  /** Average time per timestep */
  msPerTimestep: number;
  /** Memory usage estimate (bytes) */
  memoryEstimateBytes: number;
  /** Any warnings generated */
  warnings: string[];
}

/**
 * Full simulation response
 */
export interface SimulationResponse {
  /** Success flag */
  success: boolean;
  /** Error message if failed */
  error?: string;
  /** Simulation results */
  results?: SimulationResults;
  /** Performance metrics (if requested) */
  performance?: PerformanceMetrics;
  /** Confidence intervals (if advanced uncertainty mode) */
  confidenceIntervals?: {
    /** 95% CI for progression rate */
    progressionRate: [number, number];
    /** 95% CI for stability index */
    stabilityIndex: [number, number];
  };
}

// ============================================================================
// SCENARIO PRESETS
// ============================================================================

/**
 * Pre-built scenario preset
 */
export interface ScenarioPreset {
  /** Unique identifier */
  id: string;
  /** Display name */
  name: string;
  /** Description */
  description: string;
  /** The scenario configuration */
  scenario: PatientScenario;
  /** Suggested treatments to compare */
  suggestedTreatments?: string[];
  /** Tags for filtering */
  tags: string[];
}

// ============================================================================
// KINETIC PARAMETERS (for Full mode)
// ============================================================================

/**
 * Michaelis-Menten kinetic parameters
 */
export interface MichaelisMentenParams {
  /** Maximum reaction velocity */
  vmax: number;
  /** Michaelis constant (substrate concentration at half-Vmax) */
  km: number;
  /** Hill coefficient (cooperativity) */
  hillCoefficient?: number;
}

/**
 * Inhibition parameters
 */
export interface InhibitionParams {
  /** Inhibition constant */
  ki: number;
  /** Inhibition type */
  type: 'competitive' | 'noncompetitive' | 'uncompetitive' | 'mixed';
}

/**
 * Drug pharmacokinetic parameters
 */
export interface PharmacokineticParams {
  /** Absorption rate constant (1/time) */
  ka: number;
  /** Bioavailability (0-1) */
  bioavailability: number;
  /** Volume of distribution (L/kg) */
  vd: number;
  /** Elimination half-life (hours) */
  halfLife: number;
  /** Time to peak concentration (hours) */
  tmax: number;
}

/**
 * Extended node kinetics (for Full mode)
 */
export interface NodeKinetics {
  /** Node ID */
  nodeId: string;
  /** Baseline production rate */
  baselineProductionRate: number;
  /** Baseline degradation rate */
  baselineDegradationRate: number;
  /** Michaelis-Menten params for regulated production */
  productionKinetics?: MichaelisMentenParams;
  /** Michaelis-Menten params for regulated degradation */
  degradationKinetics?: MichaelisMentenParams;
}

/**
 * Extended treatment kinetics (for Full mode)
 */
export interface TreatmentKinetics {
  /** Treatment ID */
  treatmentId: string;
  /** PK parameters */
  pharmacokinetics?: PharmacokineticParams;
  /** Inhibition parameters per target */
  inhibitionParams?: Record<string, InhibitionParams>;
  /** EC50 for activation effects */
  ec50?: Record<string, number>;
}
