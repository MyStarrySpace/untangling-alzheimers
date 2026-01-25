/**
 * Graph Analysis Algorithms for the AD Mechanistic Network
 *
 * Computes various centrality measures and network insights to find
 * unintuitive patterns in Alzheimer's disease pathways.
 */

import type { MechanisticNode, MechanisticEdge, MechanisticModule, FeedbackLoop } from '@/data/mechanisticFramework/types';

// ============================================================================
// TYPES
// ============================================================================

export interface NodeCentrality {
  nodeId: string;
  label: string;
  moduleId: string;
  category: string;
  roles?: string[];

  // Centrality measures
  inDegree: number;
  outDegree: number;
  totalDegree: number;
  betweennessCentrality: number;
  closenessCentrality: number;

  // Derived insights
  isHub: boolean;
  isBridge: boolean;
  isChokepoint: boolean;
}

export interface PathInfo {
  from: string;
  to: string;
  path: string[];
  length: number;
  edges: string[];
  lowestConfidence: string;
  modules: string[];
}

export interface ModuleBridge {
  nodeId: string;
  label: string;
  connectsModules: string[];
  crossModuleEdgeCount: number;
  bridgeScore: number;
}

export interface NeglectedTarget {
  nodeId: string;
  label: string;
  moduleId: string;
  betweenness: number;
  totalDegree: number;
  isTherapeuticTarget: boolean;
  reason: string;
}

export interface EvidenceGap {
  nodeId: string;
  label: string;
  moduleId: string;
  totalDegree: number;
  highConfidenceEdges: number;
  lowConfidenceEdges: number;
  confidenceRatio: number;
  gapScore: number;
}

export interface LoopVulnerability {
  loopId: string;
  loopName: string;
  loopType: 'reinforcing' | 'balancing';
  nodes: string[];
  weakestEdge: {
    edgeId: string;
    confidence: string;
    source: string;
    target: string;
  };
  interventionOpportunity: string;
}

export interface NetworkInsights {
  summary: {
    totalNodes: number;
    totalEdges: number;
    avgDegree: number;
    avgPathLength: number;
    networkDensity: number;
  };
  hubNodes: NodeCentrality[];
  bridgeNodes: ModuleBridge[];
  chokepoints: NodeCentrality[];
  shortestPaths: PathInfo[];
  neglectedTargets: NeglectedTarget[];
  evidenceGaps: EvidenceGap[];
  loopVulnerabilities: LoopVulnerability[];
  surprisingConnections: PathInfo[];
}

// ============================================================================
// ADJACENCY STRUCTURES
// ============================================================================

interface AdjacencyData {
  outgoing: Map<string, string[]>;
  incoming: Map<string, string[]>;
  edgeMap: Map<string, MechanisticEdge>;
  nodeMap: Map<string, MechanisticNode>;
}

function buildAdjacency(nodes: MechanisticNode[], edges: MechanisticEdge[]): AdjacencyData {
  const outgoing = new Map<string, string[]>();
  const incoming = new Map<string, string[]>();
  const edgeMap = new Map<string, MechanisticEdge>();
  const nodeMap = new Map<string, MechanisticNode>();

  nodes.forEach(node => {
    outgoing.set(node.id, []);
    incoming.set(node.id, []);
    nodeMap.set(node.id, node);
  });

  edges.forEach(edge => {
    const out = outgoing.get(edge.source);
    if (out) out.push(edge.target);

    const inc = incoming.get(edge.target);
    if (inc) inc.push(edge.source);

    edgeMap.set(`${edge.source}->${edge.target}`, edge);
  });

  return { outgoing, incoming, edgeMap, nodeMap };
}

// ============================================================================
// SHORTEST PATHS (BFS)
// ============================================================================

function bfsShortestPath(
  start: string,
  end: string,
  adjacency: AdjacencyData
): string[] | null {
  const visited = new Set<string>();
  const queue: { node: string; path: string[] }[] = [{ node: start, path: [start] }];

  while (queue.length > 0) {
    const { node, path } = queue.shift()!;

    if (node === end) return path;
    if (visited.has(node)) continue;
    visited.add(node);

    const neighbors = adjacency.outgoing.get(node) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        queue.push({ node: neighbor, path: [...path, neighbor] });
      }
    }
  }

  return null;
}

function allPairsShortestPaths(
  nodes: string[],
  adjacency: AdjacencyData
): Map<string, Map<string, string[]>> {
  const paths = new Map<string, Map<string, string[]>>();

  for (const start of nodes) {
    const fromStart = new Map<string, string[]>();
    const visited = new Set<string>();
    const queue: { node: string; path: string[] }[] = [{ node: start, path: [start] }];

    while (queue.length > 0) {
      const { node, path } = queue.shift()!;

      if (visited.has(node)) continue;
      visited.add(node);
      fromStart.set(node, path);

      const neighbors = adjacency.outgoing.get(node) || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          queue.push({ node: neighbor, path: [...path, neighbor] });
        }
      }
    }

    paths.set(start, fromStart);
  }

  return paths;
}

// ============================================================================
// BETWEENNESS CENTRALITY (Brandes Algorithm simplified)
// ============================================================================

function computeBetweennessCentrality(
  nodes: MechanisticNode[],
  adjacency: AdjacencyData
): Map<string, number> {
  const betweenness = new Map<string, number>();
  nodes.forEach(n => betweenness.set(n.id, 0));

  const nodeIds = nodes.map(n => n.id);

  for (const source of nodeIds) {
    // BFS from source
    const stack: string[] = [];
    const pred = new Map<string, string[]>();
    const sigma = new Map<string, number>();
    const dist = new Map<string, number>();

    nodeIds.forEach(n => {
      pred.set(n, []);
      sigma.set(n, 0);
      dist.set(n, -1);
    });

    sigma.set(source, 1);
    dist.set(source, 0);

    const queue: string[] = [source];

    while (queue.length > 0) {
      const v = queue.shift()!;
      stack.push(v);

      const neighbors = adjacency.outgoing.get(v) || [];
      for (const w of neighbors) {
        // w found for first time?
        if (dist.get(w)! < 0) {
          dist.set(w, dist.get(v)! + 1);
          queue.push(w);
        }
        // shortest path to w via v?
        if (dist.get(w) === dist.get(v)! + 1) {
          sigma.set(w, sigma.get(w)! + sigma.get(v)!);
          pred.get(w)!.push(v);
        }
      }
    }

    // Accumulation
    const delta = new Map<string, number>();
    nodeIds.forEach(n => delta.set(n, 0));

    while (stack.length > 0) {
      const w = stack.pop()!;
      for (const v of pred.get(w)!) {
        const contribution = (sigma.get(v)! / sigma.get(w)!) * (1 + delta.get(w)!);
        delta.set(v, delta.get(v)! + contribution);
      }
      if (w !== source) {
        betweenness.set(w, betweenness.get(w)! + delta.get(w)!);
      }
    }
  }

  // Normalize
  const n = nodes.length;
  const factor = n > 2 ? 1 / ((n - 1) * (n - 2)) : 1;
  betweenness.forEach((val, key) => {
    betweenness.set(key, val * factor);
  });

  return betweenness;
}

// ============================================================================
// CLOSENESS CENTRALITY
// ============================================================================

function computeClosenessCentrality(
  nodes: MechanisticNode[],
  allPaths: Map<string, Map<string, string[]>>
): Map<string, number> {
  const closeness = new Map<string, number>();
  const n = nodes.length;

  for (const node of nodes) {
    const pathsFrom = allPaths.get(node.id);
    if (!pathsFrom) {
      closeness.set(node.id, 0);
      continue;
    }

    let totalDist = 0;
    let reachable = 0;

    pathsFrom.forEach((path, target) => {
      if (target !== node.id) {
        totalDist += path.length - 1;
        reachable++;
      }
    });

    if (reachable > 0 && totalDist > 0) {
      // Normalized closeness: (reachable / (n-1)) * (reachable / totalDist)
      closeness.set(node.id, (reachable / (n - 1)) * (reachable / totalDist));
    } else {
      closeness.set(node.id, 0);
    }
  }

  return closeness;
}

// ============================================================================
// MODULE BRIDGES
// ============================================================================

function findModuleBridges(
  nodes: MechanisticNode[],
  edges: MechanisticEdge[],
  adjacency: AdjacencyData
): ModuleBridge[] {
  const bridges: ModuleBridge[] = [];

  for (const node of nodes) {
    const connectedModules = new Set<string>();
    connectedModules.add(node.moduleId);

    let crossModuleEdges = 0;

    // Check outgoing edges
    const outEdges = adjacency.outgoing.get(node.id) || [];
    for (const targetId of outEdges) {
      const target = adjacency.nodeMap.get(targetId);
      if (target && target.moduleId !== node.moduleId) {
        connectedModules.add(target.moduleId);
        crossModuleEdges++;
      }
    }

    // Check incoming edges
    const inEdges = adjacency.incoming.get(node.id) || [];
    for (const sourceId of inEdges) {
      const source = adjacency.nodeMap.get(sourceId);
      if (source && source.moduleId !== node.moduleId) {
        connectedModules.add(source.moduleId);
        crossModuleEdges++;
      }
    }

    if (connectedModules.size > 1) {
      const bridgeScore = (connectedModules.size - 1) * crossModuleEdges;
      bridges.push({
        nodeId: node.id,
        label: node.label,
        connectsModules: Array.from(connectedModules),
        crossModuleEdgeCount: crossModuleEdges,
        bridgeScore,
      });
    }
  }

  return bridges.sort((a, b) => b.bridgeScore - a.bridgeScore);
}

// ============================================================================
// NEGLECTED THERAPEUTIC TARGETS
// ============================================================================

function findNeglectedTargets(
  nodes: MechanisticNode[],
  betweenness: Map<string, number>,
  adjacency: AdjacencyData
): NeglectedTarget[] {
  const neglected: NeglectedTarget[] = [];

  // Calculate stats for thresholds
  const betweennessValues = Array.from(betweenness.values());
  const avgBetweenness = betweennessValues.reduce((a, b) => a + b, 0) / betweennessValues.length;
  const p75Betweenness = betweennessValues.sort((a, b) => a - b)[Math.floor(betweennessValues.length * 0.75)];

  for (const node of nodes) {
    const b = betweenness.get(node.id) || 0;
    const inDegree = (adjacency.incoming.get(node.id) || []).length;
    const outDegree = (adjacency.outgoing.get(node.id) || []).length;
    const totalDegree = inDegree + outDegree;

    const isTarget = node.roles?.includes('THERAPEUTIC_TARGET') || false;

    // High betweenness but not a target
    if (b > p75Betweenness && !isTarget && node.category !== 'BOUNDARY') {
      let reason = 'High betweenness centrality (top 25%) but not marked as therapeutic target';

      if (totalDegree >= 5) {
        reason += '; also a hub node with many connections';
      }

      neglected.push({
        nodeId: node.id,
        label: node.label,
        moduleId: node.moduleId,
        betweenness: b,
        totalDegree,
        isTherapeuticTarget: isTarget,
        reason,
      });
    }
  }

  return neglected.sort((a, b) => b.betweenness - a.betweenness);
}

// ============================================================================
// EVIDENCE GAPS
// ============================================================================

const CONFIDENCE_RANK: Record<string, number> = {
  L1: 7,
  L2: 6,
  L3: 5,
  L4: 4,
  L5: 3,
  L6: 2,
  L7: 1,
};

function findEvidenceGaps(
  nodes: MechanisticNode[],
  edges: MechanisticEdge[],
  adjacency: AdjacencyData
): EvidenceGap[] {
  const gaps: EvidenceGap[] = [];

  for (const node of nodes) {
    const inEdges = adjacency.incoming.get(node.id) || [];
    const outEdges = adjacency.outgoing.get(node.id) || [];

    const relatedEdges: MechanisticEdge[] = [];

    for (const sourceId of inEdges) {
      const edge = adjacency.edgeMap.get(`${sourceId}->${node.id}`);
      if (edge) relatedEdges.push(edge);
    }

    for (const targetId of outEdges) {
      const edge = adjacency.edgeMap.get(`${node.id}->${targetId}`);
      if (edge) relatedEdges.push(edge);
    }

    if (relatedEdges.length === 0) continue;

    const highConf = relatedEdges.filter(e => ['L1', 'L2', 'L3'].includes(e.causalConfidence)).length;
    const lowConf = relatedEdges.filter(e => ['L5', 'L6', 'L7'].includes(e.causalConfidence)).length;
    const total = relatedEdges.length;

    const confidenceRatio = highConf / total;

    // Gap = high-degree node with mostly low-confidence edges
    if (total >= 3 && confidenceRatio < 0.3) {
      const gapScore = total * (1 - confidenceRatio);
      gaps.push({
        nodeId: node.id,
        label: node.label,
        moduleId: node.moduleId,
        totalDegree: total,
        highConfidenceEdges: highConf,
        lowConfidenceEdges: lowConf,
        confidenceRatio,
        gapScore,
      });
    }
  }

  return gaps.sort((a, b) => b.gapScore - a.gapScore);
}

// ============================================================================
// LOOP VULNERABILITY ANALYSIS
// ============================================================================

function analyzeLoopVulnerabilities(
  loops: FeedbackLoop[],
  edges: MechanisticEdge[],
  adjacency: AdjacencyData
): LoopVulnerability[] {
  const vulnerabilities: LoopVulnerability[] = [];

  for (const loop of loops) {
    const loopEdges = loop.edgeIds
      .map(id => edges.find(e => e.id === id))
      .filter((e): e is MechanisticEdge => e !== undefined);

    if (loopEdges.length === 0) continue;

    // Find nodes in loop
    const loopNodes = new Set<string>();
    loopEdges.forEach(e => {
      loopNodes.add(e.source);
      loopNodes.add(e.target);
    });

    // Find weakest edge (lowest confidence)
    const sortedByConfidence = [...loopEdges].sort((a, b) => {
      const rankA = CONFIDENCE_RANK[a.causalConfidence] || 0;
      const rankB = CONFIDENCE_RANK[b.causalConfidence] || 0;
      return rankA - rankB;
    });

    const weakest = sortedByConfidence[0];

    let opportunity = '';
    if (loop.type === 'reinforcing') {
      opportunity = `Breaking this reinforcing loop at ${weakest.source} → ${weakest.target} could interrupt pathological amplification`;
    } else {
      opportunity = `This balancing loop could be strengthened by improving evidence for ${weakest.source} → ${weakest.target}`;
    }

    vulnerabilities.push({
      loopId: loop.id,
      loopName: loop.name,
      loopType: loop.type,
      nodes: Array.from(loopNodes),
      weakestEdge: {
        edgeId: weakest.id,
        confidence: weakest.causalConfidence,
        source: weakest.source,
        target: weakest.target,
      },
      interventionOpportunity: opportunity,
    });
  }

  return vulnerabilities;
}

// ============================================================================
// SURPRISING CONNECTIONS (Long shortest paths between related concepts)
// ============================================================================

function findSurprisingConnections(
  nodes: MechanisticNode[],
  edges: MechanisticEdge[],
  adjacency: AdjacencyData,
  allPaths: Map<string, Map<string, string[]>>
): PathInfo[] {
  const surprising: PathInfo[] = [];

  // Input boundaries (risk factors)
  const inputs = nodes.filter(n => n.category === 'BOUNDARY' && n.boundaryDirection === 'input');

  // Output boundaries (clinical outcomes)
  const outputs = nodes.filter(n => n.category === 'BOUNDARY' && n.boundaryDirection === 'output');

  // Find paths from inputs to outputs
  for (const input of inputs) {
    for (const output of outputs) {
      const pathsFromInput = allPaths.get(input.id);
      if (!pathsFromInput) continue;

      const path = pathsFromInput.get(output.id);
      if (!path || path.length <= 2) continue;

      // Get edges along path
      const pathEdges: string[] = [];
      let lowestConf = 'L1';

      for (let i = 0; i < path.length - 1; i++) {
        const edge = adjacency.edgeMap.get(`${path[i]}->${path[i + 1]}`);
        if (edge) {
          pathEdges.push(edge.id);
          if ((CONFIDENCE_RANK[edge.causalConfidence] || 0) < (CONFIDENCE_RANK[lowestConf] || 7)) {
            lowestConf = edge.causalConfidence;
          }
        }
      }

      // Get modules traversed
      const pathModules = new Set<string>();
      path.forEach(nodeId => {
        const node = adjacency.nodeMap.get(nodeId);
        if (node) pathModules.add(node.moduleId);
      });

      surprising.push({
        from: input.id,
        to: output.id,
        path,
        length: path.length - 1,
        edges: pathEdges,
        lowestConfidence: lowestConf,
        modules: Array.from(pathModules),
      });
    }
  }

  // Sort by path length (longer = more surprising)
  return surprising.sort((a, b) => b.length - a.length);
}

// ============================================================================
// MAIN ANALYSIS FUNCTION
// ============================================================================

export function analyzeNetwork(
  nodes: MechanisticNode[],
  edges: MechanisticEdge[],
  modules: MechanisticModule[],
  feedbackLoops: FeedbackLoop[]
): NetworkInsights {
  const adjacency = buildAdjacency(nodes, edges);

  // Compute centrality measures
  const allPaths = allPairsShortestPaths(nodes.map(n => n.id), adjacency);
  const betweenness = computeBetweennessCentrality(nodes, adjacency);
  const closeness = computeClosenessCentrality(nodes, allPaths);

  // Degree centrality
  const nodeCentralities: NodeCentrality[] = nodes.map(node => {
    const inDeg = (adjacency.incoming.get(node.id) || []).length;
    const outDeg = (adjacency.outgoing.get(node.id) || []).length;
    const totalDeg = inDeg + outDeg;
    const b = betweenness.get(node.id) || 0;
    const c = closeness.get(node.id) || 0;

    return {
      nodeId: node.id,
      label: node.label,
      moduleId: node.moduleId,
      category: node.category,
      roles: node.roles,
      inDegree: inDeg,
      outDegree: outDeg,
      totalDegree: totalDeg,
      betweennessCentrality: b,
      closenessCentrality: c,
      isHub: totalDeg >= 5,
      isBridge: false, // Set later
      isChokepoint: b > 0.01,
    };
  });

  // Find bridges
  const bridges = findModuleBridges(nodes, edges, adjacency);
  const bridgeIds = new Set(bridges.slice(0, 20).map(b => b.nodeId));
  nodeCentralities.forEach(nc => {
    nc.isBridge = bridgeIds.has(nc.nodeId);
  });

  // Hub nodes (high degree)
  const hubNodes = nodeCentralities
    .filter(n => n.isHub)
    .sort((a, b) => b.totalDegree - a.totalDegree)
    .slice(0, 15);

  // Chokepoints (high betweenness)
  const chokepoints = nodeCentralities
    .filter(n => n.isChokepoint)
    .sort((a, b) => b.betweennessCentrality - a.betweennessCentrality)
    .slice(0, 15);

  // Neglected targets
  const neglectedTargets = findNeglectedTargets(nodes, betweenness, adjacency);

  // Evidence gaps
  const evidenceGaps = findEvidenceGaps(nodes, edges, adjacency);

  // Loop vulnerabilities
  const loopVulnerabilities = analyzeLoopVulnerabilities(feedbackLoops, edges, adjacency);

  // Surprising connections
  const surprisingConnections = findSurprisingConnections(nodes, edges, adjacency, allPaths);

  // Shortest paths from key inputs to outputs
  const keyInputs = ['aging', 'apoe_genotype', 'insulin_resistance'];
  const keyOutputs = ['cognitive_score', 'synapses', 'neuronal_count'];
  const shortestPaths: PathInfo[] = [];

  for (const from of keyInputs) {
    for (const to of keyOutputs) {
      const pathsFrom = allPaths.get(from);
      if (!pathsFrom) continue;

      const path = pathsFrom.get(to);
      if (!path) continue;

      const pathEdges: string[] = [];
      let lowestConf = 'L1';

      for (let i = 0; i < path.length - 1; i++) {
        const edge = adjacency.edgeMap.get(`${path[i]}->${path[i + 1]}`);
        if (edge) {
          pathEdges.push(edge.id);
          if ((CONFIDENCE_RANK[edge.causalConfidence] || 0) < (CONFIDENCE_RANK[lowestConf] || 7)) {
            lowestConf = edge.causalConfidence;
          }
        }
      }

      const pathModules = new Set<string>();
      path.forEach(nodeId => {
        const node = adjacency.nodeMap.get(nodeId);
        if (node) pathModules.add(node.moduleId);
      });

      shortestPaths.push({
        from,
        to,
        path,
        length: path.length - 1,
        edges: pathEdges,
        lowestConfidence: lowestConf,
        modules: Array.from(pathModules),
      });
    }
  }

  // Summary stats
  const totalDegree = nodeCentralities.reduce((sum, n) => sum + n.totalDegree, 0);
  const avgDegree = totalDegree / nodes.length;

  let totalPathLength = 0;
  let pathCount = 0;
  allPaths.forEach(paths => {
    paths.forEach((path, target) => {
      if (path.length > 1) {
        totalPathLength += path.length - 1;
        pathCount++;
      }
    });
  });
  const avgPathLength = pathCount > 0 ? totalPathLength / pathCount : 0;

  const maxPossibleEdges = nodes.length * (nodes.length - 1);
  const networkDensity = edges.length / maxPossibleEdges;

  return {
    summary: {
      totalNodes: nodes.length,
      totalEdges: edges.length,
      avgDegree: Math.round(avgDegree * 100) / 100,
      avgPathLength: Math.round(avgPathLength * 100) / 100,
      networkDensity: Math.round(networkDensity * 10000) / 10000,
    },
    hubNodes,
    bridgeNodes: bridges.slice(0, 15),
    chokepoints,
    shortestPaths,
    neglectedTargets: neglectedTargets.slice(0, 10),
    evidenceGaps: evidenceGaps.slice(0, 10),
    loopVulnerabilities,
    surprisingConnections: surprisingConnections.slice(0, 10),
  };
}

// ============================================================================
// INSIGHT GENERATION
// ============================================================================

export interface InsightReport {
  title: string;
  category: 'hub' | 'bridge' | 'path' | 'gap' | 'neglected' | 'loop' | 'surprise';
  insight: string;
  evidence: string;
  implication: string;
  nodes: string[];
}

export function generateInsightReports(insights: NetworkInsights): InsightReport[] {
  const reports: InsightReport[] = [];

  // Top hub insight
  if (insights.hubNodes.length > 0) {
    const top = insights.hubNodes[0];
    reports.push({
      title: `${top.label} is the most connected node`,
      category: 'hub',
      insight: `With ${top.totalDegree} connections (${top.inDegree} incoming, ${top.outDegree} outgoing), ${top.label} is the most highly connected entity in the network.`,
      evidence: `Module: ${top.moduleId}. Roles: ${top.roles?.join(', ') || 'none'}`,
      implication: top.roles?.includes('THERAPEUTIC_TARGET')
        ? 'This is already a therapeutic target - interventions here have maximum cascade effects.'
        : 'Consider whether this should be a therapeutic target given its central role.',
      nodes: [top.nodeId],
    });
  }

  // Top bridge insight
  if (insights.bridgeNodes.length > 0) {
    const top = insights.bridgeNodes[0];
    reports.push({
      title: `${top.label} bridges ${top.connectsModules.length} modules`,
      category: 'bridge',
      insight: `${top.label} connects ${top.connectsModules.join(', ')} with ${top.crossModuleEdgeCount} cross-module edges.`,
      evidence: `Bridge score: ${top.bridgeScore}`,
      implication: 'Targeting this node could affect multiple pathological pathways simultaneously.',
      nodes: [top.nodeId],
    });
  }

  // Chokepoint insight
  if (insights.chokepoints.length > 0) {
    const top = insights.chokepoints[0];
    reports.push({
      title: `${top.label} is a critical chokepoint`,
      category: 'hub',
      insight: `${top.label} has the highest betweenness centrality (${(top.betweennessCentrality * 100).toFixed(2)}%), meaning many pathways flow through it.`,
      evidence: `Category: ${top.category}, Module: ${top.moduleId}`,
      implication: 'Blocking or modifying this node would disrupt the most pathways in the network.',
      nodes: [top.nodeId],
    });
  }

  // Neglected target insight
  if (insights.neglectedTargets.length > 0) {
    const top = insights.neglectedTargets[0];
    reports.push({
      title: `${top.label} may be an overlooked therapeutic target`,
      category: 'neglected',
      insight: top.reason,
      evidence: `Betweenness: ${(top.betweenness * 100).toFixed(2)}%, Degree: ${top.totalDegree}`,
      implication: 'This node\'s network position suggests it could be a valuable intervention point that hasn\'t been prioritized.',
      nodes: [top.nodeId],
    });
  }

  // Evidence gap insight
  if (insights.evidenceGaps.length > 0) {
    const top = insights.evidenceGaps[0];
    reports.push({
      title: `${top.label} has weak evidence despite high connectivity`,
      category: 'gap',
      insight: `${top.label} has ${top.totalDegree} edges but only ${(top.confidenceRatio * 100).toFixed(0)}% are high-confidence (L1-L3).`,
      evidence: `High confidence: ${top.highConfidenceEdges}, Low confidence: ${top.lowConfidenceEdges}`,
      implication: 'This is a research priority - better evidence here could solidify or refute multiple causal claims.',
      nodes: [top.nodeId],
    });
  }

  // Loop vulnerability insight
  if (insights.loopVulnerabilities.length > 0) {
    const reinforcing = insights.loopVulnerabilities.filter(l => l.loopType === 'reinforcing');
    if (reinforcing.length > 0) {
      const top = reinforcing[0];
      reports.push({
        title: `${top.loopName} is a breakable vicious cycle`,
        category: 'loop',
        insight: `This reinforcing loop amplifies pathology. Weakest link: ${top.weakestEdge.source} → ${top.weakestEdge.target} (${top.weakestEdge.confidence} confidence).`,
        evidence: `Involves ${top.nodes.length} nodes`,
        implication: top.interventionOpportunity,
        nodes: top.nodes,
      });
    }
  }

  // Surprising connection insight
  if (insights.surprisingConnections.length > 0) {
    const top = insights.surprisingConnections[0];
    reports.push({
      title: `${top.from} reaches ${top.to} through ${top.length} steps`,
      category: 'surprise',
      insight: `The path from ${top.from} to ${top.to} traverses ${top.modules.length} modules: ${top.modules.join(' → ')}.`,
      evidence: `Path: ${top.path.join(' → ')}. Weakest evidence: ${top.lowestConfidence}`,
      implication: 'This multi-step cascade shows how upstream risk factors cascade to clinical outcomes.',
      nodes: top.path,
    });
  }

  return reports;
}
