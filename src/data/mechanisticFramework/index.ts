/**
 * AD Mechanistic Framework
 *
 * A Systems Biology Stock-Flow (SBSF) Framework for Alzheimer's Disease
 * combining Donella Meadows' systems dynamics, BEL causal semantics,
 * and biological ontologies.
 *
 * Model Performance: ROC ~0.90 for predicting clinical trial failure
 *
 * @module mechanisticFramework
 */

// Types
export * from './types';

// Data
export { modules, default as moduleData } from './modules';
export {
  allNodes,
  boundaryNodes,
  module1Nodes,
  module2Nodes,
  module3Nodes,
  module4Nodes,
  module5Nodes,
  module6Nodes,
  module7Nodes,
  module8Nodes,
  module9Nodes,
  module10Nodes,
  module11Nodes,
  module12Nodes,
  module13Nodes,
  module14Nodes,
  module15Nodes,
  module16Nodes,
} from './nodes';
export {
  allEdges,
  module1Edges,
  module2Edges,
  module3Edges,
  module4Edges,
  module5Edges,
  module6Edges,
  module7Edges,
  module8Edges,
  module9Edges,
  module10Edges,
  module11Edges,
  module12Edges,
  module13Edges,
  module14Edges,
  module15Edges,
  module16Edges,
} from './edges';
export { feedbackLoops, default as loopData } from './feedbackLoops';

// Types re-exported for convenience
export type {
  NodeCategory,
  NodeSubtype,
  RelationType,
  ModulationEffect,
  MethodType,
  CausalConfidence,
  MechanisticNode,
  MechanisticEdge,
  MechanisticModule,
  FeedbackLoop,
  MechanisticFramework,
  EvidenceCitation,
  OntologyReferences,
  Compartment,
  SpeciesInfo,
  EdgeModulation,
  QuantitativeData,
} from './types';

// Import for building the complete framework
import { modules } from './modules';
import { allNodes } from './nodes';
import { allEdges } from './edges';
import { feedbackLoops } from './feedbackLoops';
import type { MechanisticFramework } from './types';

/**
 * The complete AD Mechanistic Framework
 */
export const mechanisticFramework: MechanisticFramework = {
  version: '1.0.0',
  lastUpdated: '2026-01-14',

  performance: {
    rocAuc: 0.90,
    description: 'White-box mechanistic model for predicting AD clinical trial outcomes',
  },

  modules,
  nodes: allNodes,
  edges: allEdges,
  feedbackLoops,

  // System boundaries
  inputBoundaries: [
    'aging',
    'APOE4_genotype',
    'TREM2_variants',
    'familial_AD_mutations',
    'sex',
    'sleep_disruption',
  ],
  outputBoundaries: [
    'cognitive_function',
    'mortality',
    'cognitive_score',
    'synapses',
    'neuronal_count',
    'brain_volume',
    'CSF_biomarkers',
  ],
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get a node by ID
 */
export function getNodeById(id: string) {
  return allNodes.find(n => n.id === id);
}

/**
 * Get all nodes in a module
 */
export function getNodesByModule(moduleId: string) {
  return allNodes.filter(n => n.moduleId === moduleId);
}

/**
 * Get edges by source node
 */
export function getEdgesBySource(sourceId: string) {
  return allEdges.filter(e => e.source === sourceId);
}

/**
 * Get edges by target node
 */
export function getEdgesByTarget(targetId: string) {
  return allEdges.filter(e => e.target === targetId);
}

/**
 * Get all edges in a module
 */
export function getEdgesByModule(moduleId: string) {
  return allEdges.filter(e => e.moduleId === moduleId);
}

/**
 * Get module by ID
 */
export function getModuleById(id: string) {
  return modules.find(m => m.id === id);
}

/**
 * Get all feedback loops involving a node
 */
export function getLoopsByNode(nodeId: string) {
  return feedbackLoops.filter(loop =>
    loop.edgeIds.some(edgeId => {
      const edge = allEdges.find(e => e.id === edgeId);
      return edge?.source === nodeId || edge?.target === nodeId;
    })
  );
}

/**
 * Get upstream nodes (nodes that feed into this one)
 */
export function getUpstreamNodes(nodeId: string) {
  const incomingEdges = getEdgesByTarget(nodeId);
  return incomingEdges.map(e => getNodeById(e.source)).filter(Boolean);
}

/**
 * Get downstream nodes (nodes this one feeds into)
 */
export function getDownstreamNodes(nodeId: string) {
  const outgoingEdges = getEdgesBySource(nodeId);
  return outgoingEdges.map(e => getNodeById(e.target)).filter(Boolean);
}

/**
 * Get all therapeutic targets
 */
export function getTherapeuticTargets() {
  return allNodes.filter(n => n.roles?.includes('THERAPEUTIC_TARGET'));
}

/**
 * Get all biomarkers
 */
export function getBiomarkers() {
  return allNodes.filter(n => n.roles?.includes('BIOMARKER'));
}

/**
 * Get edges with high causal confidence (L1-L3)
 */
export function getHighConfidenceEdges() {
  return allEdges.filter(e => ['L1', 'L2', 'L3'].includes(e.causalConfidence));
}

/**
 * Get cross-module edges
 */
export function getCrossModuleEdges() {
  return allEdges.filter(e => e.crossModule);
}

/**
 * Build adjacency list for graph algorithms
 */
export function buildAdjacencyList() {
  const adjacency: Record<string, string[]> = {};

  allNodes.forEach(node => {
    adjacency[node.id] = [];
  });

  allEdges.forEach(edge => {
    if (adjacency[edge.source]) {
      adjacency[edge.source].push(edge.target);
    }
  });

  return adjacency;
}

/**
 * Calculate node degree (in + out edges)
 */
export function getNodeDegree(nodeId: string) {
  const inDegree = getEdgesByTarget(nodeId).length;
  const outDegree = getEdgesBySource(nodeId).length;
  return { inDegree, outDegree, total: inDegree + outDegree };
}

/**
 * Get hub nodes (high degree)
 */
export function getHubNodes(minDegree = 5) {
  return allNodes.filter(node => {
    const { total } = getNodeDegree(node.id);
    return total >= minDegree;
  });
}

// ============================================================================
// STATISTICS
// ============================================================================

export const frameworkStats = {
  totalNodes: allNodes.length,
  totalEdges: allEdges.length,
  totalModules: modules.length,
  totalLoops: feedbackLoops.length,

  nodesByCategory: {
    STOCK: allNodes.filter(n => n.category === 'STOCK').length,
    REGULATOR: allNodes.filter(n => n.category === 'REGULATOR').length,
    PROCESS: allNodes.filter(n => n.category === 'PROCESS').length,
    STATE: allNodes.filter(n => n.category === 'STATE').length,
    BOUNDARY: allNodes.filter(n => n.category === 'BOUNDARY').length,
  },

  edgesByConfidence: {
    L1: allEdges.filter(e => e.causalConfidence === 'L1').length,
    L2: allEdges.filter(e => e.causalConfidence === 'L2').length,
    L3: allEdges.filter(e => e.causalConfidence === 'L3').length,
    L4: allEdges.filter(e => e.causalConfidence === 'L4').length,
    L5: allEdges.filter(e => e.causalConfidence === 'L5').length,
    L6: allEdges.filter(e => e.causalConfidence === 'L6').length,
    L7: allEdges.filter(e => e.causalConfidence === 'L7').length,
  },

  therapeuticTargets: allNodes.filter(n => n.roles?.includes('THERAPEUTIC_TARGET')).length,
  biomarkers: allNodes.filter(n => n.roles?.includes('BIOMARKER')).length,
  reinforcingLoops: feedbackLoops.filter(l => l.type === 'reinforcing').length,
  balancingLoops: feedbackLoops.filter(l => l.type === 'balancing').length,
};

export default mechanisticFramework;
