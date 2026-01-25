/**
 * Pathway Calculation Algorithm
 *
 * BFS-based algorithm for computing drug pathways through the mechanistic network.
 * Identifies upstream (causes) and downstream (effects) nodes from drug targets,
 * and analyzes involvement with feedback loops.
 */

import type { MechanisticNode, MechanisticEdge, FeedbackLoop } from '@/data/mechanisticFramework/types';
import type { DrugLibraryEntry, DrugPathwayConfig, DrugTarget } from '@/data/mechanisticFramework/drugLibrary';

// ============================================================================
// TYPES
// ============================================================================

interface AdjacencyLists {
  /** Outgoing edges: nodeId -> list of target nodeIds */
  outgoing: Map<string, string[]>;
  /** Incoming edges: nodeId -> list of source nodeIds */
  incoming: Map<string, string[]>;
  /** Edge lookup: "source->target" -> edge */
  edgeMap: Map<string, MechanisticEdge>;
}

interface PathwayResult {
  /** All nodes in the pathway (upstream + target + downstream) */
  allNodes: Set<string>;
  /** Nodes upstream of targets */
  upstreamNodes: Set<string>;
  /** The target nodes themselves */
  targetNodes: Set<string>;
  /** Nodes downstream of targets */
  downstreamNodes: Set<string>;
  /** Edges in the pathway */
  pathwayEdges: Set<string>;
  /** Modules touched by the pathway */
  affectedModules: Set<string>;
}

export interface LoopInvolvement {
  loopId: string;
  /** How the drug affects this loop */
  involvement: 'breaks' | 'weakens' | 'strengthens' | 'enters';
  /** Which target node participates in this loop */
  targetNodeInLoop: string;
}

// ============================================================================
// ADJACENCY LIST BUILDER
// ============================================================================

/**
 * Build adjacency lists from nodes and edges
 */
export function buildAdjacencyLists(
  nodes: MechanisticNode[],
  edges: MechanisticEdge[]
): AdjacencyLists {
  const outgoing = new Map<string, string[]>();
  const incoming = new Map<string, string[]>();
  const edgeMap = new Map<string, MechanisticEdge>();

  // Initialize all nodes
  nodes.forEach(node => {
    outgoing.set(node.id, []);
    incoming.set(node.id, []);
  });

  // Build adjacency from edges
  edges.forEach(edge => {
    // Add to outgoing
    const outList = outgoing.get(edge.source);
    if (outList) {
      outList.push(edge.target);
    }

    // Add to incoming
    const inList = incoming.get(edge.target);
    if (inList) {
      inList.push(edge.source);
    }

    // Store edge for lookup
    edgeMap.set(`${edge.source}->${edge.target}`, edge);
  });

  return { outgoing, incoming, edgeMap };
}

// ============================================================================
// BFS TRAVERSAL
// ============================================================================

/**
 * BFS backward from targets to find upstream nodes (what causes the target)
 */
function bfsBackward(
  startNodes: string[],
  incoming: Map<string, string[]>,
  maxDepth: number = 5
): Set<string> {
  const visited = new Set<string>();
  const queue: { nodeId: string; depth: number }[] = [];

  // Initialize queue with start nodes
  startNodes.forEach(nodeId => {
    queue.push({ nodeId, depth: 0 });
  });

  while (queue.length > 0) {
    const { nodeId, depth } = queue.shift()!;

    if (visited.has(nodeId)) continue;
    if (depth > maxDepth) continue;

    visited.add(nodeId);

    // Get predecessors (nodes that lead to this one)
    const predecessors = incoming.get(nodeId) || [];
    predecessors.forEach(predId => {
      if (!visited.has(predId)) {
        queue.push({ nodeId: predId, depth: depth + 1 });
      }
    });
  }

  return visited;
}

/**
 * BFS forward from targets to find downstream nodes (what the target affects)
 */
function bfsForward(
  startNodes: string[],
  outgoing: Map<string, string[]>,
  maxDepth: number = 5
): Set<string> {
  const visited = new Set<string>();
  const queue: { nodeId: string; depth: number }[] = [];

  // Initialize queue with start nodes
  startNodes.forEach(nodeId => {
    queue.push({ nodeId, depth: 0 });
  });

  while (queue.length > 0) {
    const { nodeId, depth } = queue.shift()!;

    if (visited.has(nodeId)) continue;
    if (depth > maxDepth) continue;

    visited.add(nodeId);

    // Get successors (nodes this one leads to)
    const successors = outgoing.get(nodeId) || [];
    successors.forEach(succId => {
      if (!visited.has(succId)) {
        queue.push({ nodeId: succId, depth: depth + 1 });
      }
    });
  }

  return visited;
}

// ============================================================================
// PATHWAY COMPUTATION
// ============================================================================

/**
 * Compute the pathway for a set of drug targets
 */
export function computePathway(
  targets: DrugTarget[],
  adjacency: AdjacencyLists,
  nodes: MechanisticNode[],
  maxDepth: number = 5
): PathwayResult {
  const targetNodeIds = targets.map(t => t.nodeId);
  const targetNodes = new Set(targetNodeIds);

  // BFS backward to find upstream nodes
  const upstreamWithTargets = bfsBackward(targetNodeIds, adjacency.incoming, maxDepth);

  // BFS forward to find downstream nodes
  const downstreamWithTargets = bfsForward(targetNodeIds, adjacency.outgoing, maxDepth);

  // Separate upstream and downstream (remove targets from each)
  const upstreamNodes = new Set<string>();
  upstreamWithTargets.forEach(nodeId => {
    if (!targetNodes.has(nodeId)) {
      upstreamNodes.add(nodeId);
    }
  });

  const downstreamNodes = new Set<string>();
  downstreamWithTargets.forEach(nodeId => {
    if (!targetNodes.has(nodeId)) {
      downstreamNodes.add(nodeId);
    }
  });

  // Combine all pathway nodes
  const allNodes = new Set([
    ...upstreamNodes,
    ...targetNodes,
    ...downstreamNodes,
  ]);

  // Find edges within the pathway
  const pathwayEdges = new Set<string>();
  adjacency.edgeMap.forEach((edge, key) => {
    if (allNodes.has(edge.source) && allNodes.has(edge.target)) {
      pathwayEdges.add(edge.id);
    }
  });

  // Find affected modules
  const affectedModules = new Set<string>();
  const nodeMap = new Map(nodes.map(n => [n.id, n]));
  allNodes.forEach(nodeId => {
    const node = nodeMap.get(nodeId);
    if (node) {
      affectedModules.add(node.moduleId);
    }
  });

  return {
    allNodes,
    upstreamNodes,
    targetNodes,
    downstreamNodes,
    pathwayEdges,
    affectedModules,
  };
}

// ============================================================================
// FEEDBACK LOOP ANALYSIS
// ============================================================================

/**
 * Determine how a drug's effect on a target affects a feedback loop
 */
function determineLoopInvolvement(
  drugEffect: DrugTarget['effect'],
  loopType: FeedbackLoop['type'],
  isDirectTarget: boolean
): LoopInvolvement['involvement'] {
  // If the drug targets a node directly in the loop:
  // - Inhibiting a reinforcing loop node = breaks/weakens the loop
  // - Activating a reinforcing loop node = strengthens the loop
  // - Inhibiting a balancing loop node = weakens homeostasis
  // - Activating a balancing loop node = strengthens homeostasis

  if (!isDirectTarget) {
    return 'enters'; // Drug pathway passes through loop but doesn't target it directly
  }

  if (loopType === 'reinforcing') {
    if (drugEffect === 'inhibits') {
      return 'breaks'; // Breaking a pathological reinforcing loop is therapeutic
    } else if (drugEffect === 'activates') {
      return 'strengthens'; // Could be harmful if loop is pathological
    }
  } else {
    // Balancing loop
    if (drugEffect === 'inhibits') {
      return 'weakens'; // Weakening homeostatic loop is usually harmful
    } else if (drugEffect === 'activates') {
      return 'strengthens'; // Strengthening homeostasis is therapeutic
    }
  }

  return 'enters'; // Default for 'modulates'
}

/**
 * Analyze which feedback loops are affected by the drug pathway
 */
export function analyzeLoopInvolvement(
  targets: DrugTarget[],
  pathwayResult: PathwayResult,
  feedbackLoops: FeedbackLoop[],
  edges: MechanisticEdge[]
): LoopInvolvement[] {
  const involvements: LoopInvolvement[] = [];
  const targetNodeIds = new Set(targets.map(t => t.nodeId));
  const targetMap = new Map(targets.map(t => [t.nodeId, t]));

  feedbackLoops.forEach(loop => {
    // Check if any pathway edges are in this loop
    const loopEdgeIds = new Set(loop.edgeIds);
    const pathwayEdgesInLoop: string[] = [];

    pathwayResult.pathwayEdges.forEach(edgeId => {
      if (loopEdgeIds.has(edgeId)) {
        pathwayEdgesInLoop.push(edgeId);
      }
    });

    if (pathwayEdgesInLoop.length === 0) return; // No involvement

    // Find which nodes from the pathway are in this loop
    const loopNodeIds = new Set<string>();
    loop.edgeIds.forEach(edgeId => {
      const edge = edges.find(e => e.id === edgeId);
      if (edge) {
        loopNodeIds.add(edge.source);
        loopNodeIds.add(edge.target);
      }
    });

    // Check if any target nodes are directly in the loop
    let targetInLoop: string | null = null;
    let isDirectTarget = false;

    targetNodeIds.forEach(targetId => {
      if (loopNodeIds.has(targetId)) {
        targetInLoop = targetId;
        isDirectTarget = true;
      }
    });

    // If no direct target, find any pathway node in the loop
    if (!targetInLoop) {
      pathwayResult.allNodes.forEach(nodeId => {
        if (loopNodeIds.has(nodeId) && !targetInLoop) {
          targetInLoop = nodeId;
        }
      });
    }

    if (!targetInLoop) return; // Shouldn't happen but be safe

    // Determine involvement type
    const drugTarget = targetMap.get(targetInLoop);
    const drugEffect = drugTarget?.effect || 'modulates';

    const involvement = determineLoopInvolvement(
      drugEffect,
      loop.type,
      isDirectTarget
    );

    involvements.push({
      loopId: loop.id,
      involvement,
      targetNodeInLoop: targetInLoop,
    });
  });

  return involvements;
}

// ============================================================================
// MAIN PATHWAY CALCULATOR
// ============================================================================

/**
 * Calculate complete pathway configuration for a drug
 */
export function calculateDrugPathway(
  drug: DrugLibraryEntry,
  nodes: MechanisticNode[],
  edges: MechanisticEdge[],
  feedbackLoops: FeedbackLoop[],
  maxDepth: number = 5
): DrugPathwayConfig {
  // Build adjacency lists
  const adjacency = buildAdjacencyLists(nodes, edges);

  // Compute pathway
  const pathwayResult = computePathway(
    drug.primaryTargets,
    adjacency,
    nodes,
    maxDepth
  );

  // Analyze loop involvement
  const loopInvolvements = analyzeLoopInvolvement(
    drug.primaryTargets,
    pathwayResult,
    feedbackLoops,
    edges
  );

  return {
    drugId: drug.id,
    upstreamNodes: Array.from(pathwayResult.upstreamNodes),
    targetNodes: Array.from(pathwayResult.targetNodes),
    downstreamNodes: Array.from(pathwayResult.downstreamNodes),
    pathwayEdges: Array.from(pathwayResult.pathwayEdges),
    relevantLoops: loopInvolvements,
    affectedModules: Array.from(pathwayResult.affectedModules),
    computedAt: new Date().toISOString(),
  };
}

/**
 * Calculate pathways for all drugs in the library
 */
export function calculateAllDrugPathways(
  drugs: DrugLibraryEntry[],
  nodes: MechanisticNode[],
  edges: MechanisticEdge[],
  feedbackLoops: FeedbackLoop[],
  maxDepth: number = 5
): Map<string, DrugPathwayConfig> {
  const pathways = new Map<string, DrugPathwayConfig>();

  drugs.forEach(drug => {
    const pathway = calculateDrugPathway(drug, nodes, edges, feedbackLoops, maxDepth);
    pathways.set(drug.id, pathway);
  });

  return pathways;
}

// ============================================================================
// LIVE CALCULATION FOR CUSTOM DRUGS
// ============================================================================

/**
 * Calculate pathway for a custom drug (not in library)
 * Used for user-added drug nodes in the network
 */
export function calculateCustomDrugPathway(
  customDrugId: string,
  targets: DrugTarget[],
  nodes: MechanisticNode[],
  edges: MechanisticEdge[],
  feedbackLoops: FeedbackLoop[],
  maxDepth: number = 5
): DrugPathwayConfig {
  const adjacency = buildAdjacencyLists(nodes, edges);
  const pathwayResult = computePathway(targets, adjacency, nodes, maxDepth);
  const loopInvolvements = analyzeLoopInvolvement(
    targets,
    pathwayResult,
    feedbackLoops,
    edges
  );

  return {
    drugId: customDrugId,
    upstreamNodes: Array.from(pathwayResult.upstreamNodes),
    targetNodes: Array.from(pathwayResult.targetNodes),
    downstreamNodes: Array.from(pathwayResult.downstreamNodes),
    pathwayEdges: Array.from(pathwayResult.pathwayEdges),
    relevantLoops: loopInvolvements,
    affectedModules: Array.from(pathwayResult.affectedModules),
    computedAt: new Date().toISOString(),
  };
}

// ============================================================================
// PATHWAY STATISTICS
// ============================================================================

export interface PathwayStats {
  totalNodes: number;
  upstreamCount: number;
  targetCount: number;
  downstreamCount: number;
  edgeCount: number;
  moduleCount: number;
  loopCount: number;
  loopsBreaking: number;
  loopsWeakening: number;
  loopsStrengthening: number;
}

/**
 * Get statistics for a pathway
 */
export function getPathwayStats(pathway: DrugPathwayConfig): PathwayStats {
  return {
    totalNodes: pathway.upstreamNodes.length +
                pathway.targetNodes.length +
                pathway.downstreamNodes.length,
    upstreamCount: pathway.upstreamNodes.length,
    targetCount: pathway.targetNodes.length,
    downstreamCount: pathway.downstreamNodes.length,
    edgeCount: pathway.pathwayEdges.length,
    moduleCount: pathway.affectedModules.length,
    loopCount: pathway.relevantLoops.length,
    loopsBreaking: pathway.relevantLoops.filter(l => l.involvement === 'breaks').length,
    loopsWeakening: pathway.relevantLoops.filter(l => l.involvement === 'weakens').length,
    loopsStrengthening: pathway.relevantLoops.filter(l => l.involvement === 'strengthens').length,
  };
}
