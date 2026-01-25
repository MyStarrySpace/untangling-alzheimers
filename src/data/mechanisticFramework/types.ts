/**
 * Type definitions for the Mechanistic Framework
 *
 * Data is stored in framework.xlsx and loaded at build time.
 */

// Node categories based on Systems Biology Stock-Flow semantics
export type NodeCategory = 'STOCK' | 'STATE' | 'BOUNDARY' | 'PROCESS';

// Node subtypes for more specific categorization
export type NodeSubtype =
  | 'Organelle'
  | 'ProteinPool'
  | 'MetabolitePool'
  | 'CytokineLevel'
  | 'Aggregate'
  | 'PhenotypePool'
  | 'Activator'
  | 'Inhibitor'
  | 'MetabolicState'
  | 'PhysiologicalState'
  | 'DiseaseStage'
  | 'SignalingPathway'
  | 'RiskFactor'
  | 'ProtectiveFactor'
  | 'ClinicalOutcome'
  | 'BiologicalProcess';

// Node roles for special properties
export type NodeRole =
  | 'THERAPEUTIC_TARGET'
  | 'BIOMARKER'
  | 'RATE_LIMITER'
  | 'LEVERAGE_POINT'
  | 'REGULATOR';

// Evidence levels for causal confidence (L1 = strongest)
export type CausalConfidence = 'L1' | 'L2' | 'L3' | 'L4' | 'L5' | 'L6' | 'L7';

// Edge relation types
export type EdgeRelation =
  | 'increases'
  | 'decreases'
  | 'directlyIncreases'
  | 'directlyDecreases'
  | 'regulates'
  | 'modulates'
  | 'produces'
  | 'degrades'
  | 'binds'
  | 'transports'
  | 'causesNoChange'
  | 'association';

// Study method types for evidence
export type MethodType =
  | 'RCT'
  | 'mendelian_randomization'
  | 'knockout'
  | 'cohort'
  | 'case_control'
  | 'intervention_animal'
  | 'in_vitro'
  | 'observational'
  | 'review'
  | 'expert_opinion';

/**
 * A node in the mechanistic framework
 */
export interface MechanisticNode {
  id: string;
  label: string;
  category: NodeCategory;
  subtype: NodeSubtype;
  moduleId: string;
  description: string;
  mechanism?: string;
  references?: {
    protein?: string;    // UniProt ID
    gene?: string;       // HGNC ID
    process?: string;    // GO term
    cellType?: string;   // Cell Ontology ID
  };
  roles?: NodeRole[];
  pmid?: string;
  notes?: string;
}

/**
 * An edge connecting two nodes
 */
export interface MechanisticEdge {
  id: string;
  source: string;
  target: string;
  relation: EdgeRelation;
  moduleId: string;
  causalConfidence?: CausalConfidence;
  mechanismDescription?: string;
  keyInsight?: string;
  evidence?: {
    pmid?: string;
    firstAuthor?: string;
    year?: number;
    methodType?: MethodType;
  };
  notes?: string;
}

/**
 * A module grouping related nodes
 */
export interface Module {
  id: string;
  name: string;
  shortName: string;
  description: string;
  color: string;
}

/**
 * The complete mechanistic framework
 */
export interface MechanisticFramework {
  nodes: MechanisticNode[];
  edges: MechanisticEdge[];
  modules: Module[];
}
