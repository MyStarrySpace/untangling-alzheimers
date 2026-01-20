---
planStatus:
  planId: plan-temporal-simulation
  title: Temporal Simulation Engine for Treatment Scenarios
  status: draft
  planType: feature
  priority: high
  owner: developer
  stakeholders:
    - developer
    - researchers
  tags:
    - simulation
    - kinetics
    - feedback-loops
    - treatment-analysis
    - spectral-analysis
  created: "2026-01-20"
  updated: "2026-01-20T16:45:00.000Z"
  progress: 0
---

# Temporal Simulation Engine for Treatment Scenarios

## Goals
- Enable time-based simulation of disease progression and treatment effects
- Allow users to configure patient scenarios (risk factors, lifestyle, genetics)
- Model feedback loop dynamics to predict if treatments can break self-reinforcing cascades
- Provide spectral analysis to identify network stability and dominant feedback modes
- Answer the question: "Can this treatment combination actually halt AD progression?"

## Problem Description

### Current State
The system has excellent graph structure with:
- 11 defined feedback loops with tipping points and intervention windows
- Sophisticated pathway analysis (BFS traversal, loop involvement)
- Treatment targeting with effect strengths (strong/moderate/weak)
- Centrality metrics (betweenness, closeness, degree)

**But it cannot answer temporal questions like:**
- "If I have oxidative stress and sedentary lifestyle, will metformin + lithium break the reinforcing loops?"
- "At what disease stage does intervention become futile?"
- "How long until biomarkers cross tipping points?"

### Key Gap
No temporal dynamics. Effects are binary (inhibits/activates), not quantitative. No simulation of how node concentrations change over time.

### User Story
As a researcher, I want to:
1. Configure a patient scenario (APOE4+, sedentary, high oxidative stress)
2. Select treatments (metformin, lithium orotate, exercise)
3. Run a simulation over 5-10 years
4. See if the self-reinforcing loops are broken or merely slowed
5. Visualize biomarker trajectories crossing (or not crossing) tipping points

## High-Level Approach

### Phase 1: Semi-Quantitative Stock-Flow Model
Rather than requiring full Michaelis-Menten kinetics (which would need extensive literature mining), use a simplified model:

**Node States:**
- Normalize all nodes to 0-1 scale (0 = healthy baseline, 1 = pathological maximum)
- Risk factors push initial values above 0
- Treatments pull values down

**Edge Dynamics:**
- Each edge has an influence rate (derived from causal confidence + effect strength)
- Reinforcing loops amplify: `d[target]/dt += k * [source] * loop_gain`
- Treatments reduce loop_gain based on how they affect the loop

**Feedback Loop Modeling:**
- Use existing `loopTimescale` (hours/days/months) to set rate constants
- Use `tippingPoint.threshold` to define bifurcation points
- When a node crosses its tipping point, accelerate downstream effects

### Phase 2: Treatment Intervention Model
- Treatments have onset time, efficacy curve, and target effects
- Effect strength maps to multiplicative factor: strong=0.3, moderate=0.5, weak=0.7
- Multiple treatments combine (with possible saturation)

### Phase 3: Scenario Configuration API
- Patient profile: age, APOE status, comorbidities, lifestyle factors
- Initial node states derived from profile
- Treatment regimen: drugs, doses, timing
- Simulation parameters: duration, timestep, output frequency

### Phase 4: Spectral Analysis (Stability Analysis)
**Why spectral analysis makes sense:**
- The feedback loops form a dynamical system
- Eigenvalues of the Jacobian determine stability
- Positive real parts = unstable (disease progresses)
- Negative real parts = stable (homeostasis maintained)
- Treatments should shift eigenvalues toward negative

**Spectral tools to add:**
1. **Adjacency matrix eigenvalues** - Network connectivity structure
2. **Laplacian eigenvalues** - Diffusion/spreading dynamics
3. **Jacobian eigenvalues** (at current state) - Local stability
4. **Eigenvector centrality** - Which nodes drive dynamics
5. **Dominant mode analysis** - Which feedback loops dominate at each disease stage

## Key Components

### 1. Simulation Engine (`src/lib/simulation/`)
- `stockFlowModel.ts` - Core ODE-like update equations
- `feedbackLoopDynamics.ts` - Loop gain calculations
- `treatmentEffects.ts` - Drug intervention modeling
- `scenarioConfig.ts` - Patient profile to initial states
- `simulator.ts` - Main simulation runner (Euler or RK4 integration)

### 2. Spectral Analysis (`src/lib/analysis/`)
- `matrixConstruction.ts` - Build adjacency/Laplacian/Jacobian matrices
- `eigenanalysis.ts` - Compute eigenvalues/eigenvectors (use numeric.js or mathjs)
- `stabilityAnalysis.ts` - Interpret eigenvalues for stability
- `dominantModes.ts` - Identify which loops drive dynamics

### 3. API Endpoints (`src/app/api/v1/`)
- `POST /api/v1/simulate` - Run simulation with scenario config
- `GET /api/v1/simulate/presets` - Pre-built scenarios (APOE4 carrier, metabolic syndrome, etc.)
- `GET /api/v1/spectral` - Network spectral properties
- `GET /api/v1/spectral/stability` - Stability analysis at given state
- `GET /api/v1/feedback-loops/dynamics` - Loop gain analysis

### 4. Data Extensions
- Add `baselineValue` and `pathologicalValue` to nodes
- Add `rateConstant` to edges (derive from timescale annotations)
- Add `onsetTime` and `efficacyCurve` to treatments

### 5. Visualization (Optional, Future)
- Biomarker trajectory plots
- Phase portraits showing loop dynamics
- Eigenvalue spectrum visualization
- Treatment effect animations

## Example Scenario

**Input:**
```
Patient: 65yo, APOE4 heterozygous, sedentary, BMI 28, prediabetic
Initial states:
  - insulin_resistance: 0.6
  - oxidative_stress: 0.5
  - mtorc1_hyperactive: 0.4
  - exercise_level: 0.2 (low)

Treatments:
  - metformin: start year 0, standard dose
  - lithium_microdose: start year 0
  - exercise: moderate, start year 0

Simulation: 10 years, monthly timesteps
```

**Output:**
```
Year 0: All reinforcing loops active, net amplification rate +0.12/year
Year 2: Metformin + lithium reduce mTOR loop gain by 40%
Year 3: NLRP3-tau loop still reinforcing but slowed
Year 5: With exercise, net amplification rate reduced to +0.02/year
Year 10: Biomarkers stabilized below tipping points

Conclusion: Treatment combination DELAYS but does not HALT progression
Additional intervention needed: Nrf2 activation (DMF) to break oxidative stress loop
```

## Acceptance Criteria

1. **Scenario API works**: Can POST a patient profile + treatments and get simulation results
2. **Feedback loops modeled**: Reinforcing loops actually amplify over time
3. **Treatments have effect**: Adding metformin measurably reduces mTOR-related node values
4. **Tipping points matter**: Crossing a tipping point accelerates downstream nodes
5. **Spectral analysis available**: Can get eigenvalues and stability assessment
6. **Reproducible**: Same inputs produce same outputs
7. **Reasonable timescales**: Simulation years map to biological reality

## What Success Looks Like

1. User can ask: "Will metformin + lithium + exercise prevent AD in an APOE4 carrier?"
2. System returns: trajectory data, loop dynamics, stability analysis
3. Answer is nuanced: "Slows progression by X%, but oxidative stress loop still reinforcing"
4. Suggests additional interventions: "Adding DMF would target the remaining unstable mode"

## Decisions Made

1. **Parameter estimation**:
   - Derive from `loopTimescale` annotations (already have hours/days/months)
   - Use causal confidence as proxy for effect size
   - Literature mining for key parameters
   - Allow user tuning with sensitivity analysis

2. **Validation**: **DECIDED** - Match to clinical trials and available data
   - Calibrate to lecanemab CLARITY-AD (27% slowing over 18 months)
   - Calibrate to donanemab TRAILBLAZER-ALZ 2 (35% slowing)
   - Match epidemiological data (exercise 30-50% risk reduction)
   - Match FINGER trial multi-domain intervention results
   - Document all calibration targets with PMIDs

3. **Fidelity modes**: **DECIDED** - Three levels (see below)

4. **Uncertainty quantification**: **DECIDED** - Yes, with Simple/Advanced modes
   - **Simple mode**: Single deterministic run, point estimates
   - **Advanced mode**: Monte Carlo sampling (N=100-1000), confidence intervals, sensitivity analysis

5. **Spectral analysis scope**: **DECIDED** - Full advanced implementation
   - Eigenvalues and stability classification
   - Dominant mode identification
   - Bifurcation analysis
   - Phase portraits (for key 2D projections)

6. **UI/Visualization**: **DECIDED** - API-first
   - Phase 1: Complete API with all endpoints
   - Phase 2: Frontend visualization (later)

## Simulation Fidelity Modes (DECIDED)

Support **three fidelity levels** with auto-detection and user override:

### Mode 1: Linear (Fast, Accessible)
- First-order linear dynamics: `d[X]/dt = k_in * [source] - k_out * [X]`
- Constant rate coefficients
- No saturation or cooperativity
- **Use case**: Quick exploration, education, low-end devices
- **Performance**: <100ms for 10-year simulation

### Mode 2: Nonlinear (Balanced)
- Saturation effects: `effect = Emax * [X] / (EC50 + [X])`
- Hill coefficient for cooperativity (n=1-4)
- Threshold/tipping point discontinuities
- **Use case**: Default for most users, good accuracy vs. speed
- **Performance**: <500ms for 10-year simulation

### Mode 3: Full Kinetics (Accurate, Slow)
- Michaelis-Menten enzyme kinetics: `v = Vmax * [S] / (Km + [S])`
- Competitive/non-competitive inhibition: `Ki` parameters
- Multi-substrate reactions where applicable
- Drug pharmacokinetics (absorption, distribution, metabolism, excretion)
- **Use case**: Research-grade predictions, parameter fitting
- **Performance**: 1-5s for 10-year simulation

### Auto-Detection Logic
```
1. Run quick benchmark (10 iterations of Mode 2)
2. If <50ms: Default to Mode 3
3. If 50-200ms: Default to Mode 2
4. If >200ms: Default to Mode 1
5. Store preference in localStorage/settings
```

### User Settings
- Simulation fidelity: Auto / Linear / Nonlinear / Full Kinetics
- Show performance metrics: Yes / No
- Warning threshold: Alert if simulation takes >Xs

### API Parameter
```
POST /api/v1/simulate
{
  "scenario": {...},
  "treatments": [...],
  "settings": {
    "fidelityMode": "auto" | "linear" | "nonlinear" | "full",
    "maxDurationMs": 5000,
    "returnPerformanceMetrics": true
  }
}
```

### Response Includes
```
{
  "results": {...},
  "metadata": {
    "fidelityModeUsed": "nonlinear",
    "computeTimeMs": 234,
    "iterationsRun": 120,
    "warnings": ["Switched from 'full' to 'nonlinear' due to performance"]
  }
}
```

## Validation Calibration Targets

The simulation must reproduce these known outcomes within reasonable tolerance:

### Clinical Trial Outcomes
| Trial | Drug | Outcome | Timeframe | Target |
|-------|------|---------|-----------|--------|
| CLARITY-AD | Lecanemab | 27% slowing (CDR-SB) | 18 months | Sim should show 25-30% reduction in cognitive decline rate |
| TRAILBLAZER-ALZ 2 | Donanemab | 35% slowing (iADRS) | 18 months | Sim should show 32-38% reduction |
| FINGER | Multi-domain | Cognitive improvement | 2 years | Sim should show positive trajectory with lifestyle interventions |

### Epidemiological Data
| Factor | Effect | Source | Target |
|--------|--------|--------|--------|
| Exercise (moderate) | 30-50% risk reduction | Meta-analyses | Sim should show 0.3-0.5x progression rate |
| Mediterranean diet | 30-53% risk reduction | Lancet Neurology | Sim should slow metabolic/inflammatory loops |
| APOE4 homozygous | 12x risk increase | Genetics literature | Sim should show accelerated loop dynamics |
| APOE4 heterozygous | 3x risk increase | Genetics literature | Sim should show moderate acceleration |

### Biomarker Timelines
| Biomarker | Years Before Symptoms | Source | Target |
|-----------|----------------------|--------|--------|
| Aβ PET positive | 15-20 years | Jack et al. | Amyloid nodes cross threshold at t=-15 to -20 |
| Tau PET positive | 5-10 years | Braak staging | Tau nodes cross threshold at t=-5 to -10 |
| Cognitive symptoms | 0 (definition) | Clinical | CDR-SB equivalent crosses clinical threshold at t=0 |

## Implementation Phases (API-First)

### Phase 1: Core Simulation Engine
**Goal**: Working simulation with linear dynamics

Files to create:
- `src/lib/simulation/types.ts` - Simulation types and interfaces
- `src/lib/simulation/stockFlowModel.ts` - Core differential equations
- `src/lib/simulation/stateInitializer.ts` - Scenario → initial node states
- `src/lib/simulation/treatmentEffects.ts` - Drug modulation of rates
- `src/lib/simulation/integrator.ts` - Euler/RK4 time stepping
- `src/lib/simulation/simulator.ts` - Main orchestrator

API endpoints:
- `POST /api/v1/simulate` - Run simulation
- `GET /api/v1/simulate/presets` - Pre-built scenarios

### Phase 2: Feedback Loop Dynamics
**Goal**: Reinforcing loops actually amplify; treatments break them

Files to create/modify:
- `src/lib/simulation/loopDynamics.ts` - Loop gain calculations
- `src/lib/simulation/tippingPoints.ts` - Threshold crossing detection
- Extend `stockFlowModel.ts` with loop coupling

### Phase 3: Spectral Analysis
**Goal**: Stability analysis and dominant mode identification

Files to create:
- `src/lib/analysis/matrixBuilder.ts` - Adjacency/Laplacian/Jacobian construction
- `src/lib/analysis/eigenanalysis.ts` - Eigenvalue computation (mathjs)
- `src/lib/analysis/stabilityClassifier.ts` - Interpret eigenvalues
- `src/lib/analysis/dominantModes.ts` - Identify driving loops
- `src/lib/analysis/bifurcation.ts` - Bifurcation point detection

API endpoints:
- `GET /api/v1/spectral` - Full spectral properties
- `GET /api/v1/spectral/stability` - Stability at given state
- `GET /api/v1/spectral/modes` - Dominant mode analysis

### Phase 4: Fidelity Modes
**Goal**: Linear/Nonlinear/Full kinetics with auto-detection

Files to modify:
- `src/lib/simulation/stockFlowModel.ts` - Add nonlinear and MM kinetics
- `src/lib/simulation/simulator.ts` - Fidelity mode selection
- `src/lib/simulation/benchmark.ts` - Performance detection

### Phase 5: Uncertainty Quantification
**Goal**: Monte Carlo + sensitivity analysis

Files to create:
- `src/lib/simulation/monteCarlo.ts` - Parameter sampling
- `src/lib/simulation/sensitivityAnalysis.ts` - Tornado plots, Sobol indices
- `src/lib/simulation/confidenceIntervals.ts` - Bootstrap CIs

API parameter additions:
- `uncertaintyMode: "simple" | "advanced"`
- `monteCarloRuns: number`
- `sensitivityParams: string[]`

### Phase 6: Validation & Calibration
**Goal**: Match clinical trial outcomes

Files to create:
- `src/lib/simulation/calibration.ts` - Parameter fitting utilities
- `src/lib/simulation/validationTargets.ts` - Known outcomes to match
- `scripts/calibrate-to-trials.ts` - Calibration script
- `tests/simulation/validation.test.ts` - Automated validation tests

## Technical Considerations

**Math libraries:**
- `mathjs` or `numeric.js` for matrix operations and eigenvalues
- Simple Euler integration (timestep small enough for stability)
- Consider Web Workers for long simulations

**Performance:**
- ~100 nodes, ~500 edges = small matrices, fast computation
- 10-year simulation with monthly steps = 120 iterations
- Should complete in <1 second

**Testing:**
- Unit tests for stock-flow equations
- Integration tests for known scenarios
- Regression tests for reproducibility
