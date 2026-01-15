/**
 * Systems Biology Stock-Flow (SBSF) Framework Types
 *
 * This framework combines:
 * 1. Donella Meadows' Systems Dynamics - Stock-flow thinking, feedback loops, leverage points
 * 2. BEL (Biological Expression Language) - Causal semantics, entity functions
 * 3. SBGN/SBO - Visual notation standards, entity classification
 * 4. OBO Relation Ontology - Standardized biological relationships
 *
 * Model Performance: ROC ~0.90 for predicting clinical trial failure
 */

// ============================================================================
// NODE TYPES
// ============================================================================

/**
 * Primary node categories following Meadows' systems dynamics
 */
export type NodeCategory =
  | 'STOCK'      // Accumulations; snapshot values (protein levels, cell counts, plaque burden)
  | 'REGULATOR'  // Controls rate of change; not consumed (enzymes, receptors, channels)
  | 'PROCESS'    // Dynamic; flows over time (phagocytosis, inflammation)
  | 'STATE'      // Qualitative condition (cell phenotype, compartment integrity)
  | 'BOUNDARY';  // System boundary condition (gene, drug, clinical outcome)

/**
 * Stock subtypes - things that accumulate
 */
export type StockSubtype =
  // Molecular stocks
  | 'ProteinPool'         // Total protein abundance (any form)
  | 'ActiveProteinPool'   // Active/phosphorylated/bound form specifically
  | 'MetabolitePool'      // Iron, lipids, ATP, ROS, etc.
  | 'RNAPool'             // mRNA, miRNA levels
  | 'ComplexPool'         // Assembled protein complexes (e.g., inflammasome)
  // Cellular stocks
  | 'CellPopulation'      // Count of cells (neurons, microglia, etc.)
  | 'PhenotypePool'       // Count in specific phenotype (LDAM, DAM, M1, M2)
  // Structural stocks
  | 'Aggregate'           // Plaques, tangles, lipid droplets, lipofuscin
  | 'OrganellePool'       // Functional lysosomes, mitochondria
  | 'CompartmentState'    // BBB integrity, lysosomal pH, membrane potential
  // Signal stocks
  | 'CytokineLevel'       // IL-6, TNF-α, IFN-γ concentrations
  | 'HormoneLevel'        // Hepcidin, insulin, cortisol
  | 'MetaboliteSignal';   // When metabolite acts as signal

/**
 * Regulator subtypes - things that control rates
 */
export type RegulatorSubtype =
  // Enzymes
  | 'Kinase'              // Phosphorylation
  | 'Phosphatase'         // Dephosphorylation
  | 'Protease'            // Cleavage (caspases, cathepsins)
  | 'Transferase'         // Transfer groups
  // Receptors
  | 'SurfaceReceptor'     // TLR4, TREM2, cytokine receptors
  | 'NuclearReceptor'     // Steroid receptors, PPARs
  | 'IntracellularSensor' // NLRP3, cGAS-STING
  // Channels/Transporters
  | 'IonChannel'          // Ca2+, K+, Na+ channels
  | 'Transporter'         // DMT1, ferroportin, glucose transporters
  | 'Pump'                // ATP-dependent pumps
  // Transcription factors
  | 'Activator'           // NRF2, TFEB, HIF-1α
  | 'Repressor'           // REST, HDACs
  | 'MasterRegulator';    // PGC-1α, SREBP

/**
 * Process subtypes - activities over time
 */
export type ProcessSubtype =
  | 'BiologicalProcess'   // GO Biological Process terms
  | 'Phagocytosis'        // GO:0006909
  | 'Autophagy'           // GO:0006914
  | 'Mitophagy'           // GO:0000422
  | 'Apoptosis'           // GO:0006915
  | 'Ferroptosis'         // Non-canonical cell death
  | 'Neuroinflammation'   // MESH:D000071618
  | 'Neurodegeneration'   // HP:0002180
  | 'Reaction';           // Specific biochemical reactions

/**
 * State subtypes - qualitative conditions
 */
export type StateSubtype =
  // Activation states
  | 'Phosphorylated'      // Specific residue modifications
  | 'Bound'               // In complex with partner
  | 'NuclearLocalized'    // Translocated to nucleus
  | 'Cleaved'             // Proteolytically processed
  // Cell phenotypes
  | 'M1_Microglial'       // Pro-inflammatory
  | 'M2_Microglial'       // Anti-inflammatory
  | 'LDAM'                // Lipid-droplet accumulating
  | 'DAM'                 // Disease-associated microglia
  | 'Senescent'           // SASP-positive
  | 'A1_Astrocyte'        // Neurotoxic reactive
  // System states
  | 'CompartmentIntegrity'// BBB_intact, lysosomal_pH_normal
  | 'MetabolicState'      // Glycolytic, oxidative
  | 'DiseaseStage';       // Preclinical, MCI, dementia

/**
 * Boundary subtypes - system edges
 */
export type BoundarySubtype =
  // Genetic elements (inputs)
  | 'Gene'                // Source of transcription
  | 'GeneticVariant'      // APOE4, TREM2 R47H
  // External exposures
  | 'DietaryIntake'       // Nutrients, xenobiotics
  | 'EnvironmentalAgent'  // Pathogens, toxins
  | 'Excretion'           // Renal, biliary elimination
  // Interventions
  | 'SmallMolecule'       // Drugs, supplements
  | 'Biologic'            // Antibodies, vaccines
  | 'Lifestyle'           // Exercise, diet change, sleep
  // Degradation
  | 'Proteolysis'         // Proteasome, lysosome
  | 'CellDeath'           // Apoptosis, necrosis
  // Clinical measures (outputs)
  | 'Biomarker'           // CSF tau, PET signal
  | 'CognitiveScore'      // MMSE, CDR, ADAS-Cog
  | 'Diagnosis';          // MCI, dementia

export type NodeSubtype = StockSubtype | RegulatorSubtype | ProcessSubtype | StateSubtype | BoundarySubtype;

// ============================================================================
// EDGE/RELATION TYPES
// ============================================================================

/**
 * Causal relation types
 * - Direct: Physical interaction known
 * - Indirect: Pathway exists, details hidden
 */
export type RelationType =
  // Direct causation
  | 'directlyIncreases'   // => Physical interaction, increases
  | 'directlyDecreases'   // =| Physical interaction, decreases
  // Indirect causation
  | 'increases'           // -> Indirect/pathway, increases
  | 'decreases'           // -| Indirect/pathway, decreases
  // Regulatory
  | 'regulates'           // Direction unknown or context-dependent
  | 'modulates'           // Bidirectional modification
  // No effect (important for negative results)
  | 'causesNoChange'      // A perturbed, B unchanged
  | 'noCorrelation'       // No correlation found
  // Correlative (non-causal)
  | 'positiveCorrelation' // A and B increase/decrease together
  | 'negativeCorrelation' // A increases as B decreases
  | 'association';        // Associated, mechanism unknown

/**
 * Modulation effects - how a state affects an edge's behavior
 */
export type ModulationEffect =
  | 'potentiates'         // Increases edge strength
  | 'attenuates'          // Decreases edge strength
  | 'blocks'              // Prevents edge from acting
  | 'enables'             // Required for edge to act (permissive)
  | 'reverses';           // Flips edge polarity

// ============================================================================
// EVIDENCE & METHODOLOGY
// ============================================================================

/**
 * Method types with causal strength hierarchy
 */
export type MethodType =
  | 'rct'                 // L1 - Human randomized controlled trial
  | 'mr'                  // L2 - Mendelian randomization
  | 'knockout'            // L3 - Genetic knockout
  | 'knockin'             // L3 - Genetic knock-in
  | 'transgenic'          // L3 - Transgenic overexpression
  | 'intervention_animal' // L4 - Drug/compound in animals
  | 'intervention_human'  // L4 - Open-label human study
  | 'in_vitro'            // L5 - Cell culture, biochemical assays
  | 'ex_vivo'             // L5 - Tissue slices, organoids
  | 'cohort'              // L6 - Prospective cohort
  | 'case_control'        // L6 - Retrospective comparison
  | 'cross_sectional'     // L7 - Single timepoint association
  | 'case_report'         // L7 - Clinical observation
  | 'toxicology'          // L-Tox - Poisoning/adverse event
  | 'computational'       // L-Comp - Modeling, prediction
  | 'meta_analysis';      // Varies - Pooled analysis

/**
 * Causal confidence levels (L1 = strongest)
 */
export type CausalConfidence = 'L1' | 'L2' | 'L3' | 'L4' | 'L5' | 'L6' | 'L7';

/**
 * Species information for translational assessment
 */
export interface SpeciesInfo {
  ncbiTaxon: string;          // e.g., "NCBITaxon:10090"
  commonName: string;         // e.g., "mouse"
  strain?: string;            // e.g., "C57BL/6J"
  model?: string;             // e.g., "5xFAD"
  modelId?: string;           // e.g., "MGI:3693208"
  geneticModification?: string;
  notes?: string;
}

/**
 * Evidence citation
 */
export interface EvidenceCitation {
  pmid?: string;
  doi?: string;
  firstAuthor: string;
  year: number;
  title?: string;             // Paper title (optional for abbreviated citations)
  quote?: string;             // Exact quote from paper
  species?: SpeciesInfo;
  methodType: MethodType;
  methodDetails?: string;
  causalConfidence: CausalConfidence;
}

// ============================================================================
// ONTOLOGY REFERENCES
// ============================================================================

/**
 * External ontology references for interoperability
 */
export interface OntologyReferences {
  gene?: string;              // HGNC ID (e.g., "HGNC:6018")
  protein?: string;           // UniProt ID (e.g., "UniProt:P05231")
  process?: string;           // GO ID (e.g., "GO:0006909")
  disease?: string;           // DOID (e.g., "DOID:10652")
  drug?: string;              // CHEBI (e.g., "CHEBI:75291")
  cellType?: string;          // CL ontology (e.g., "CL:0000129")
  anatomy?: string;           // UBERON (e.g., "UBERON:0000955")
  phenotype?: string;         // HP ontology
  sbo?: string;               // Systems Biology Ontology
}

/**
 * Compartment/location information
 */
export interface Compartment {
  cellType?: string;          // CL ontology or description
  subcellular?: string;       // GO cellular component
  tissue?: string;            // UBERON or description
  region?: string;            // Brain region (hippocampus, cortex, etc.)
}

// ============================================================================
// NODE DEFINITION
// ============================================================================

/**
 * Node roles in the system
 */
export type NodeRole =
  | 'THERAPEUTIC_TARGET'
  | 'BIOMARKER'
  | 'RATE_LIMITER'
  | 'LEVERAGE_POINT'
  | 'FEEDBACK_HUB';

/**
 * Timescale of node dynamics
 */
export type Timescale =
  | 'seconds' | 'minutes' | 'hours' | 'days'
  | 'weeks' | 'months' | 'years' | 'decades';

/**
 * Full node definition
 */
export interface MechanisticNode {
  id: string;                 // Unique identifier (snake_case)
  label: string;              // Human-readable display name
  category: NodeCategory;
  subtype: NodeSubtype;
  moduleId: string;           // Which module this belongs to

  // Optional metadata
  references?: OntologyReferences;
  compartment?: Compartment;
  roles?: NodeRole[];
  timescale?: Timescale;
  units?: string;             // e.g., "pg/mL", "ASC specks/cell"

  // For visualization
  description?: string;       // Brief explanation
  mechanism?: string;         // Longer mechanistic description

  // Stock-specific
  inflows?: string[];         // IDs of edges flowing into this stock
  outflows?: string[];        // IDs of edges flowing out of this stock

  // State/modification details
  modifications?: {
    type: string;             // e.g., "phosphorylation"
    sites?: string[];         // e.g., ["S396", "S404"]
    effect?: string;
  }[];
}

// ============================================================================
// EDGE DEFINITION
// ============================================================================

/**
 * Edge modulation by a state node
 */
export interface EdgeModulation {
  modulator: string;          // Node ID of the state that modifies this edge
  effect: ModulationEffect;
  quantitative?: number;      // Fold-change in edge strength
  mechanism?: string;
  evidence?: string;          // PMID
}

/**
 * Quantitative edge parameters (optional, when available)
 */
export interface QuantitativeData {
  // Kinetic parameters
  km?: number;                // μM - substrate concentration at half-max
  vmax?: number;              // μmol/min - maximum reaction rate
  kcat?: number;              // s⁻¹ - catalytic rate constant
  ki?: number;                // μM - inhibition constant
  kd?: number;                // nM - dissociation constant
  ic50?: number;              // nM - half-maximal inhibitory concentration
  ec50?: number;              // nM - half-maximal effective concentration
  hillCoefficient?: number;

  // Correlation data
  correlationCoefficient?: number;
  correlationType?: 'pearson' | 'spearman' | 'partial';
  pValue?: number;
  sampleSize?: number;

  // Effect size
  foldChange?: number;
  direction?: 'increase' | 'decrease';
  confidenceInterval?: [number, number];
}

/**
 * Full edge definition
 */
export interface MechanisticEdge {
  id: string;                 // Unique identifier (e.g., "E04.001")
  source: string;             // Source node ID
  target: string;             // Target node ID
  relation: RelationType;
  moduleId: string;           // Which module this belongs to

  // Mechanism details
  mechanismLabel?: string;    // Short label for the mechanism
  mechanismDescription?: string;

  // Evidence
  evidence: EvidenceCitation[];
  causalConfidence: CausalConfidence; // Summary confidence

  // Cross-module connections
  crossModule?: string;       // e.g., "Input from Module 3"

  // Optional annotations
  modulations?: EdgeModulation[];
  quantitative?: QuantitativeData;

  // Ghost edge for feedback loops
  isGhost?: boolean;          // True if this completes a cycle but isn't drawn
  completesLoop?: string;     // Loop ID this ghost edge completes

  // For visualization
  keyInsight?: string;        // Important takeaway
  therapeuticImplication?: string;
  translationalGap?: string;  // e.g., "Mouse-only evidence"
}

// ============================================================================
// MODULE DEFINITION
// ============================================================================

/**
 * Module metadata
 */
export interface MechanisticModule {
  id: string;                 // e.g., "M01", "M02"
  name: string;               // e.g., "Insulin/mTOR/Autophagy Axis"
  shortName: string;          // e.g., "mTOR/Autophagy"
  description: string;

  // Overview
  overview?: string;          // Longer description of module function
  keyFindings?: string[];     // Bullet points of key discoveries
  paradigmShifts?: {
    year: number;
    discovery: string;
    pmid?: string;
  }[];

  // Connections to other modules
  upstreamModules?: string[]; // Module IDs that feed into this one
  downstreamModules?: string[];

  // Key papers for this module
  landmarkPapers?: {
    pmid: string;
    discovery: string;
  }[];

  // Therapeutic implications
  therapeuticTargets?: string[];  // Node IDs
  interventionWindow?: 'prevention' | 'early_treatment' | 'treatment' | 'management';

  // For visualization
  color?: string;             // Module color for network viz
  icon?: string;              // Lucide icon name
}

// ============================================================================
// FEEDBACK LOOPS
// ============================================================================

/**
 * Loop polarity
 */
export type LoopType = 'reinforcing' | 'balancing';

/**
 * Feedback loop definition
 */
export interface FeedbackLoop {
  id: string;                 // e.g., "loop_mTORC1_S6K1_IRS1"
  name: string;               // Human-readable name
  type: LoopType;
  description: string;

  // Edges in the loop (in order)
  edgeIds: string[];

  // Ghost edge that completes the loop
  ghostEdge?: {
    source: string;
    target: string;
    relation: RelationType;
    mechanism?: string;
  };

  // Clinical significance
  clinicalImplication?: string;
  interventionPoints?: string[];  // Node IDs where loop can be broken

  // Which module(s) this spans
  moduleIds: string[];
}

// ============================================================================
// COMPLETE FRAMEWORK
// ============================================================================

/**
 * The complete mechanistic framework
 */
export interface MechanisticFramework {
  version: string;            // e.g., "1.0.0"
  lastUpdated: string;        // ISO date

  // Model performance
  performance: {
    rocAuc: number;           // ~0.90
    description: string;
  };

  // All modules
  modules: MechanisticModule[];

  // All nodes and edges
  nodes: MechanisticNode[];
  edges: MechanisticEdge[];

  // Feedback loops
  feedbackLoops: FeedbackLoop[];

  // System boundaries
  inputBoundaries: string[];  // Node IDs
  outputBoundaries: string[];
}

// ============================================================================
// VISUALIZATION HELPERS
// ============================================================================

/**
 * Node shape for visualization (based on node category)
 */
export const NODE_SHAPES: Record<NodeCategory, string> = {
  STOCK: 'rectangle',         // Container shape
  REGULATOR: 'diamond',       // Diamond
  PROCESS: 'roundedRect',     // Rounded/pill shape
  STATE: 'hexagon',           // Hexagon
  BOUNDARY: 'cloud',          // Cloud or half-circle
};

/**
 * Default colors for node categories
 */
export const NODE_CATEGORY_COLORS: Record<NodeCategory, string> = {
  STOCK: '#486393',           // Blue
  REGULATOR: '#e36216',       // Orange
  PROCESS: '#5a8a6e',         // Green
  STATE: '#a78bfa',           // Purple
  BOUNDARY: '#787473',        // Gray
};

/**
 * Colors for modules (for network visualization)
 */
export const MODULE_COLORS: Record<string, string> = {
  M01: '#486393',   // Insulin/mTOR - Blue
  M02: '#007385',   // Lysosomal - Teal
  M03: '#60a5fa',   // Mitochondrial - Light blue
  M04: '#C9461D',   // Inflammasome - Orange-red
  M05: '#f472b6',   // Microglial - Pink
  M06: '#8ecae6',   // Amyloid - Sky blue
  M07: '#a78bfa',   // Tau - Purple
  M08: '#34d399',   // Complement - Green
  M09: '#fbbf24',   // Iron/Ferroptosis - Yellow
  M10: '#C3577F',   // APOE4/REST - Rose
  M11: '#7ED3FF',   // TREM2/DAM - Light cyan
  M12: '#FFA380',   // BBB/Glymphatic - Coral
  M13: '#787473',   // Cholinergic - Gray
  M14: '#E5AF19',   // MAM/Calcium - Gold
  M15: '#c75146',   // Interventions - Brick red
  M16: '#5a8a6e',   // Sex/Ancestry - Sage green
};
