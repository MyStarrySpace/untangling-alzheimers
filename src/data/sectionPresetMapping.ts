/**
 * Section-to-Preset Mapping
 *
 * Maps section IDs to preset IDs for scroll-sync functionality.
 * When a user scrolls to a section, the sidebar graph updates to show
 * the relevant preset/visualization.
 */

/**
 * Main section preset mapping
 * Maps section IDs (from Section component) to preset IDs (from presets.ts)
 * null means no preset should be applied for that section
 */
export const sectionPresetMapping: Record<string, string | null> = {
  // Hero / Intro sections - no specific preset
  'hero': null,
  'alzheimer-legacy': null,

  // Act I: The Paradox
  'paradox': 'biomarker_timeline',         // Shows early biomarker detection
  'timeline': 'atn_framework_extended',    // ATN+ framework context
  'trial-barriers': null,                  // Focus on text content

  // Act II: The System
  'system': null,                          // Failure cascade - focus on text
  'translational-failures': 'amyloid_cascade',  // Shows amyloid pathway (mice models)
  'forgotten-observations': 'vascular_hypothesis',  // Vascular/BBB focus
  'graveyard': null,                       // Evidence graveyard - focus on text
  'researchers': null,                     // Sidelined researchers - focus on text
  'cases': null,                           // Case studies - uses sub-mapping below

  // Act III: Hope
  'hopeful-developments': 'all_approved',  // Show approved drugs
  'promising-frontier': 'all_lifestyle',   // Show lifestyle interventions
  'evidence': null,                        // Evidence hierarchy - focus on text
  'cascade': null,                         // Mechanistic cascade - has its own graph

  // Other sections
  'sex-ancestry': 'lipid_metabolism',      // APOE-related for sex/ancestry effects
  'stakes': null,                          // Focus on text
};

/**
 * Case study preset mapping
 * Maps individual case study IDs to relevant presets
 */
export const caseStudyPresetMapping: Record<string, string | null> = {
  'gv-971': 'gut_brain_axis',              // GV-971 targets gut-brain axis
  'tnf-inhibitors': 'neuroinflammation_hypothesis',  // TNF is neuroinflammation
  '40hz-gamma': 'mitochondrial_cascade',   // 40Hz affects mitochondria/microglia
  'focused-ultrasound': 'vascular_hypothesis',  // Focused ultrasound affects BBB
  'butylphthalide': 'vascular_hypothesis', // Butylphthalide is vascular/neuroprotective
  'lesne-scandal': 'amyloid_cascade',      // Lesne scandal is about amyloid
  'lithium': 'prion_like_spreading',       // Lithium affects tau/GSK-3β
  'nebivolol': 'vascular_hypothesis',      // Nebivolol is cardiovascular
  'rapamycin': 'mitochondrial_cascade',    // Rapamycin affects mTOR/autophagy
  'metformin': 'mitochondrial_cascade',    // Metformin affects mTOR/insulin signaling
};

/**
 * Get preset ID for a section
 */
export function getPresetForSection(sectionId: string): string | null {
  return sectionPresetMapping[sectionId] ?? null;
}

/**
 * Get preset ID for a case study
 */
export function getPresetForCaseStudy(caseStudyId: string): string | null {
  return caseStudyPresetMapping[caseStudyId] ?? null;
}

/**
 * Get all section IDs that have preset mappings
 */
export function getSectionsWithPresets(): string[] {
  return Object.entries(sectionPresetMapping)
    .filter(([_, presetId]) => presetId !== null)
    .map(([sectionId]) => sectionId);
}
