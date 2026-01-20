import type { ModuleCategory } from './types';

// Module colors for visual grouping
export const moduleColors: Record<string, string> = {
  'BOUNDARY': '#787473',
  'M01': '#486393',  // Insulin/mTOR - blue
  'M02': '#007385',  // Lysosomal - teal
  'M03': '#C9461D',  // Mitochondrial - orange
  'M04': '#E5AF19',  // Inflammasome - yellow
  'M05': '#C3577F',  // Microglial - pink
  'M06': '#60a5fa',  // Amyloid - soft blue
  'M07': '#a78bfa',  // Tau - purple
  'M08': '#34d399',  // Complement - green
  'M09': '#f472b6',  // Iron - pink
  'M10': '#8ecae6',  // APOE - teal
  'M11': '#fbbf24',  // TREM2 - yellow
  'M12': '#94a3b8',  // BBB - slate
  'M13': '#fb923c',  // Cholinergic - orange
  'M14': '#a855f7',  // MAM - violet
  'M15': '#22c55e',  // Interventions - green
  'M16': '#ec4899',  // Sex/Ancestry - pink
  'M17': '#14b8a6',  // Immunomodulatory - teal
  'CUSTOM': '#e36216',  // Custom user-created nodes - accent orange
};

// Category shapes/styles (SBSF v2.0: Only STOCK, STATE, BOUNDARY)
export const categoryStyles: Record<string, { borderStyle: string; borderWidth: number }> = {
  'BOUNDARY': { borderStyle: 'dashed', borderWidth: 2 },
  'STATE': { borderStyle: 'solid', borderWidth: 2 },
  'STOCK': { borderStyle: 'solid', borderWidth: 3 },
};

// Role-based styling for REGULATOR nodes (SBSF v2.0: REGULATOR is now a role, not category)
export const roleStyles: Record<string, { borderColor?: string; borderStyle?: string }> = {
  'REGULATOR': { borderColor: '#e36216', borderStyle: 'double' },
  'THERAPEUTIC_TARGET': { borderColor: '#C9461D' },
  'BIOMARKER': { borderColor: '#34d399' },
  'DRUG': { borderColor: '#5a8a6e' },
};

// Module labels for display
export const moduleLabels: Record<string, string> = {
  'M01': 'Insulin/mTOR',
  'M02': 'Lysosomal',
  'M03': 'Mitochondrial',
  'M04': 'Inflammasome',
  'M05': 'Microglial',
  'M06': 'Amyloid',
  'M07': 'Tau',
  'M08': 'Complement',
  'M09': 'Iron',
  'M10': 'APOE',
  'M11': 'TREM2',
  'M12': 'BBB/Glymphatic',
  'M13': 'Cholinergic',
  'M14': 'MAM/Calcium',
  'M15': 'Interventions',
  'M16': 'Sex/Ancestry',
  'M17': 'Immunomodulatory',
};

// Group modules by category
export const moduleCategoryMap: Record<string, ModuleCategory> = {
  'M01': 'upstream',       // Insulin/mTOR
  'M02': 'upstream',       // Lysosomal
  'M03': 'upstream',       // Mitochondrial
  'M14': 'upstream',       // MAM/Calcium
  'M04': 'core',           // Inflammasome
  'M05': 'core',           // Microglial
  'M08': 'core',           // Complement
  'M17': 'core',           // Immunomodulatory
  'M06': 'downstream',     // Amyloid
  'M07': 'downstream',     // Tau
  'M12': 'downstream',     // BBB/Glymphatic
  'M13': 'downstream',     // Cholinergic
  'M09': 'downstream',     // Iron
  'M10': 'downstream',     // APOE
  'M11': 'downstream',     // TREM2
  'M15': 'therapeutic',    // Interventions
  'M16': 'boundary',       // Sex/Ancestry
  'BOUNDARY': 'boundary',  // Boundary conditions
};

// Category display order and labels
export const categoryOrder: ModuleCategory[] = ['boundary', 'upstream', 'core', 'downstream', 'therapeutic'];

export const categoryLabels: Record<ModuleCategory, string> = {
  'upstream': 'Upstream',
  'core': 'Core Pathology',
  'downstream': 'Downstream',
  'boundary': 'Boundaries',
  'therapeutic': 'Therapeutic',
};

// Layout constants (vertical flow: causality flows top-to-bottom)
export const LAYER_WIDTH = 280;     // Horizontal spacing between layers (legacy, kept for compatibility)
export const NODE_HEIGHT = 100;     // Vertical spacing between nodes (legacy, kept for compatibility)
export const COMPONENT_GAP = 120;   // Gap between disconnected components
export const BACK_EDGE_OFFSET = 150; // Offset for back edge routing (legacy)
export const BACK_EDGE_STAGGER = 60; // Stagger between multiple back edges (legacy)

// Vertical flow layout constants (new: top-to-bottom causality)
export const LAYER_HEIGHT = 90;     // Vertical spacing between layer rows
export const ROW_HEIGHT = 70;       // Vertical gap between rows within same layer (for multi-row layers)
export const NODE_WIDTH = 180;      // Node width for horizontal spacing
export const MAX_NODES_PER_ROW = 2; // Maximum nodes per row (2 * 180 + gap = ~370px fits 380px sidebar)
export const NODE_GAP = 10;         // Horizontal gap between nodes in same row
export const SIDE_EDGE_OFFSET = 80; // X offset for back edge routing on left side
export const SIDE_EDGE_STAGGER = 30; // X stagger between multiple back edges

// ============================================================================
// BRAIN REGION ORDERING
// ============================================================================

/**
 * Brain region types for anatomical organization
 */
export type BrainRegion =
  | 'systemic'           // Peripheral/whole-body (blood, immune cells)
  | 'blood_brain_barrier' // BBB/glymphatic system
  | 'cortex'             // Cerebral cortex
  | 'hippocampus'        // Hippocampus (memory)
  | 'entorhinal_cortex'  // Entorhinal cortex (early AD)
  | 'basal_forebrain'    // Basal forebrain (cholinergic)
  | 'white_matter'       // White matter tracts
  | 'intracellular'      // Intracellular/molecular level
  | 'unknown';           // Unknown/unspecified

/**
 * Ordered list of brain regions from peripheral to intracellular
 * Used for vertical sorting in region mode
 */
export const REGION_ORDER: BrainRegion[] = [
  'systemic',
  'blood_brain_barrier',
  'cortex',
  'hippocampus',
  'entorhinal_cortex',
  'basal_forebrain',
  'white_matter',
  'intracellular',
  'unknown',
];

/**
 * Module to default region mapping for inference
 * Used when nodes don't have explicit region annotations
 */
export const MODULE_DEFAULT_REGIONS: Record<string, BrainRegion> = {
  'M01': 'intracellular',      // Insulin/mTOR - intracellular signaling
  'M02': 'intracellular',      // Lysosomal - intracellular
  'M03': 'intracellular',      // Mitochondrial - intracellular
  'M04': 'intracellular',      // Inflammasome - intracellular
  'M05': 'systemic',           // Microglial - can be systemic
  'M06': 'cortex',             // Amyloid - cortical plaques
  'M07': 'intracellular',      // Tau - intracellular tangles
  'M08': 'systemic',           // Complement - immune system
  'M09': 'intracellular',      // Iron - intracellular
  'M10': 'cortex',             // APOE - lipid transport
  'M11': 'systemic',           // TREM2 - microglial receptor
  'M12': 'blood_brain_barrier', // BBB/Glymphatic
  'M13': 'basal_forebrain',    // Cholinergic
  'M14': 'intracellular',      // MAM/Calcium - intracellular
  'M15': 'systemic',           // Interventions - varies
  'M16': 'systemic',           // Sex/Ancestry - genetic
  'M17': 'systemic',           // Immunomodulatory
  'BOUNDARY': 'unknown',        // Boundary nodes
};

/**
 * Module to default timescale mapping for inference
 * Used when nodes don't have explicit timescale annotations
 */
export const MODULE_DEFAULT_TIMESCALES: Record<string, string> = {
  'M01': 'hours',       // Insulin/mTOR signaling
  'M02': 'days',        // Lysosomal processing
  'M03': 'hours',       // Mitochondrial dynamics
  'M04': 'hours',       // Inflammasome activation
  'M05': 'days',        // Microglial phenotype changes
  'M06': 'years',       // Amyloid accumulation
  'M07': 'months',      // Tau propagation
  'M08': 'days',        // Complement cascade
  'M09': 'months',      // Iron accumulation
  'M10': 'years',       // APOE effects
  'M11': 'days',        // TREM2 signaling
  'M12': 'weeks',       // BBB changes
  'M13': 'months',      // Cholinergic degeneration
  'M14': 'minutes',     // Calcium signaling
  'M15': 'weeks',       // Intervention effects
  'M16': 'decades',     // Genetic factors
  'M17': 'days',        // Immunomodulatory
  'BOUNDARY': 'years',  // Boundary nodes
};
