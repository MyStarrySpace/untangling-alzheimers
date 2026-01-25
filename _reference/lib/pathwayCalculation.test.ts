import { describe, it, expect } from 'vitest';
import {
  buildAdjacencyLists,
  computePathway,
  analyzeLoopInvolvement,
  getPathwayStats,
} from './pathwayCalculation';
import type { MechanisticNode, MechanisticEdge, FeedbackLoop } from '@/data/mechanisticFramework/types';
import type { DrugTarget, DrugPathwayConfig } from '@/data/mechanisticFramework/drugLibrary';

// Mock data for testing
const mockNodes: MechanisticNode[] = [
  { id: 'node_a', label: 'Node A', category: 'STOCK', subtype: 'ProteinPool', moduleId: 'M01' },
  { id: 'node_b', label: 'Node B', category: 'STOCK', subtype: 'ProteinPool', moduleId: 'M01' },
  { id: 'node_c', label: 'Node C', category: 'STOCK', subtype: 'ProteinPool', moduleId: 'M02' },
  { id: 'node_d', label: 'Node D', category: 'STATE', subtype: 'BiologicalProcess', moduleId: 'M02' },
  { id: 'node_e', label: 'Node E', category: 'BOUNDARY', subtype: 'CognitiveScore', moduleId: 'M03' },
];

const mockEdges: MechanisticEdge[] = [
  {
    id: 'edge_1',
    source: 'node_a',
    target: 'node_b',
    relation: 'increases',
    moduleId: 'M01',
    evidence: [],
    causalConfidence: 'L4',
  },
  {
    id: 'edge_2',
    source: 'node_b',
    target: 'node_c',
    relation: 'increases',
    moduleId: 'M01',
    evidence: [],
    causalConfidence: 'L4',
  },
  {
    id: 'edge_3',
    source: 'node_c',
    target: 'node_d',
    relation: 'increases',
    moduleId: 'M02',
    evidence: [],
    causalConfidence: 'L4',
  },
  {
    id: 'edge_4',
    source: 'node_d',
    target: 'node_e',
    relation: 'decreases',
    moduleId: 'M02',
    evidence: [],
    causalConfidence: 'L4',
  },
];

describe('buildAdjacencyLists', () => {
  it('builds correct outgoing adjacency list', () => {
    const { outgoing } = buildAdjacencyLists(mockNodes, mockEdges);

    expect(outgoing.get('node_a')).toEqual(['node_b']);
    expect(outgoing.get('node_b')).toEqual(['node_c']);
    expect(outgoing.get('node_c')).toEqual(['node_d']);
    expect(outgoing.get('node_d')).toEqual(['node_e']);
    expect(outgoing.get('node_e')).toEqual([]);
  });

  it('builds correct incoming adjacency list', () => {
    const { incoming } = buildAdjacencyLists(mockNodes, mockEdges);

    expect(incoming.get('node_a')).toEqual([]);
    expect(incoming.get('node_b')).toEqual(['node_a']);
    expect(incoming.get('node_c')).toEqual(['node_b']);
    expect(incoming.get('node_d')).toEqual(['node_c']);
    expect(incoming.get('node_e')).toEqual(['node_d']);
  });

  it('builds correct edge map', () => {
    const { edgeMap } = buildAdjacencyLists(mockNodes, mockEdges);

    expect(edgeMap.get('node_a->node_b')?.id).toBe('edge_1');
    expect(edgeMap.get('node_b->node_c')?.id).toBe('edge_2');
    expect(edgeMap.get('node_c->node_d')?.id).toBe('edge_3');
    expect(edgeMap.get('node_d->node_e')?.id).toBe('edge_4');
  });

  it('handles empty inputs', () => {
    const { outgoing, incoming, edgeMap } = buildAdjacencyLists([], []);

    expect(outgoing.size).toBe(0);
    expect(incoming.size).toBe(0);
    expect(edgeMap.size).toBe(0);
  });

  it('handles nodes with multiple outgoing edges', () => {
    const nodeWithFork: MechanisticNode[] = [
      { id: 'root', label: 'Root', category: 'STOCK', subtype: 'ProteinPool', moduleId: 'M01' },
      { id: 'branch_a', label: 'Branch A', category: 'STOCK', subtype: 'ProteinPool', moduleId: 'M01' },
      { id: 'branch_b', label: 'Branch B', category: 'STOCK', subtype: 'ProteinPool', moduleId: 'M01' },
    ];
    const edgesWithFork: MechanisticEdge[] = [
      { id: 'e1', source: 'root', target: 'branch_a', relation: 'increases', moduleId: 'M01', evidence: [], causalConfidence: 'L4' },
      { id: 'e2', source: 'root', target: 'branch_b', relation: 'increases', moduleId: 'M01', evidence: [], causalConfidence: 'L4' },
    ];

    const { outgoing } = buildAdjacencyLists(nodeWithFork, edgesWithFork);
    expect(outgoing.get('root')).toEqual(['branch_a', 'branch_b']);
  });
});

describe('computePathway', () => {
  it('computes pathway from a single target', () => {
    const adjacency = buildAdjacencyLists(mockNodes, mockEdges);
    const targets: DrugTarget[] = [
      { nodeId: 'node_c', effect: 'inhibits', strength: 'strong' },
    ];

    const result = computePathway(targets, adjacency, mockNodes, 5);

    // Target node
    expect(result.targetNodes.has('node_c')).toBe(true);

    // Upstream nodes (node_a -> node_b -> node_c)
    expect(result.upstreamNodes.has('node_a')).toBe(true);
    expect(result.upstreamNodes.has('node_b')).toBe(true);

    // Downstream nodes (node_c -> node_d -> node_e)
    expect(result.downstreamNodes.has('node_d')).toBe(true);
    expect(result.downstreamNodes.has('node_e')).toBe(true);
  });

  it('includes all nodes in allNodes set', () => {
    const adjacency = buildAdjacencyLists(mockNodes, mockEdges);
    const targets: DrugTarget[] = [
      { nodeId: 'node_c', effect: 'inhibits', strength: 'strong' },
    ];

    const result = computePathway(targets, adjacency, mockNodes, 5);

    expect(result.allNodes.size).toBe(5); // All nodes connected
    mockNodes.forEach(node => {
      expect(result.allNodes.has(node.id)).toBe(true);
    });
  });

  it('identifies affected modules', () => {
    const adjacency = buildAdjacencyLists(mockNodes, mockEdges);
    const targets: DrugTarget[] = [
      { nodeId: 'node_c', effect: 'inhibits', strength: 'strong' },
    ];

    const result = computePathway(targets, adjacency, mockNodes, 5);

    expect(result.affectedModules.has('M01')).toBe(true);
    expect(result.affectedModules.has('M02')).toBe(true);
    expect(result.affectedModules.has('M03')).toBe(true);
  });

  it('identifies pathway edges', () => {
    const adjacency = buildAdjacencyLists(mockNodes, mockEdges);
    const targets: DrugTarget[] = [
      { nodeId: 'node_c', effect: 'inhibits', strength: 'strong' },
    ];

    const result = computePathway(targets, adjacency, mockNodes, 5);

    // All edges should be in pathway since all nodes are connected
    expect(result.pathwayEdges.has('edge_1')).toBe(true);
    expect(result.pathwayEdges.has('edge_2')).toBe(true);
    expect(result.pathwayEdges.has('edge_3')).toBe(true);
    expect(result.pathwayEdges.has('edge_4')).toBe(true);
  });

  it('respects maxDepth parameter', () => {
    const adjacency = buildAdjacencyLists(mockNodes, mockEdges);
    const targets: DrugTarget[] = [
      { nodeId: 'node_c', effect: 'inhibits', strength: 'strong' },
    ];

    // With depth 1, should only get immediate neighbors
    const result = computePathway(targets, adjacency, mockNodes, 1);

    // Should include node_c (target), node_b (upstream 1), node_d (downstream 1)
    expect(result.targetNodes.has('node_c')).toBe(true);
    expect(result.upstreamNodes.has('node_b')).toBe(true);
    expect(result.downstreamNodes.has('node_d')).toBe(true);

    // node_a and node_e are 2 hops away
    expect(result.upstreamNodes.has('node_a')).toBe(false);
    expect(result.downstreamNodes.has('node_e')).toBe(false);
  });

  it('handles multiple targets', () => {
    const adjacency = buildAdjacencyLists(mockNodes, mockEdges);
    const targets: DrugTarget[] = [
      { nodeId: 'node_b', effect: 'inhibits', strength: 'strong' },
      { nodeId: 'node_d', effect: 'activates', strength: 'moderate' },
    ];

    const result = computePathway(targets, adjacency, mockNodes, 5);

    expect(result.targetNodes.has('node_b')).toBe(true);
    expect(result.targetNodes.has('node_d')).toBe(true);
    expect(result.targetNodes.size).toBe(2);
  });
});

describe('analyzeLoopInvolvement', () => {
  const loopEdges: MechanisticEdge[] = [
    { id: 'loop_e1', source: 'loop_a', target: 'loop_b', relation: 'increases', moduleId: 'M01', evidence: [], causalConfidence: 'L4' },
    { id: 'loop_e2', source: 'loop_b', target: 'loop_c', relation: 'increases', moduleId: 'M01', evidence: [], causalConfidence: 'L4' },
    { id: 'loop_e3', source: 'loop_c', target: 'loop_a', relation: 'increases', moduleId: 'M01', evidence: [], causalConfidence: 'L4' },
  ];

  const loopNodes: MechanisticNode[] = [
    { id: 'loop_a', label: 'Loop A', category: 'STOCK', subtype: 'ProteinPool', moduleId: 'M01' },
    { id: 'loop_b', label: 'Loop B', category: 'STOCK', subtype: 'ProteinPool', moduleId: 'M01' },
    { id: 'loop_c', label: 'Loop C', category: 'STOCK', subtype: 'ProteinPool', moduleId: 'M01' },
  ];

  const reinforcingLoop: FeedbackLoop = {
    id: 'test_loop',
    name: 'Test Reinforcing Loop',
    type: 'reinforcing',
    description: 'A test reinforcing loop',
    edgeIds: ['loop_e1', 'loop_e2', 'loop_e3'],
    moduleIds: ['M01'],
  };

  it('detects when drug breaks a reinforcing loop', () => {
    const adjacency = buildAdjacencyLists(loopNodes, loopEdges);
    const targets: DrugTarget[] = [
      { nodeId: 'loop_b', effect: 'inhibits', strength: 'strong' },
    ];

    const pathwayResult = computePathway(targets, adjacency, loopNodes, 5);
    const involvements = analyzeLoopInvolvement(targets, pathwayResult, [reinforcingLoop], loopEdges);

    expect(involvements.length).toBe(1);
    expect(involvements[0].loopId).toBe('test_loop');
    expect(involvements[0].involvement).toBe('breaks');
    expect(involvements[0].targetNodeInLoop).toBe('loop_b');
  });

  it('detects when drug strengthens a reinforcing loop', () => {
    const adjacency = buildAdjacencyLists(loopNodes, loopEdges);
    const targets: DrugTarget[] = [
      { nodeId: 'loop_b', effect: 'activates', strength: 'strong' },
    ];

    const pathwayResult = computePathway(targets, adjacency, loopNodes, 5);
    const involvements = analyzeLoopInvolvement(targets, pathwayResult, [reinforcingLoop], loopEdges);

    expect(involvements.length).toBe(1);
    expect(involvements[0].involvement).toBe('strengthens');
  });

  it('returns empty array when no loops affected', () => {
    const noLoopNodes: MechanisticNode[] = [
      { id: 'isolated', label: 'Isolated', category: 'STOCK', subtype: 'ProteinPool', moduleId: 'M99' },
    ];
    const noLoopEdges: MechanisticEdge[] = [];

    const adjacency = buildAdjacencyLists(noLoopNodes, noLoopEdges);
    const targets: DrugTarget[] = [
      { nodeId: 'isolated', effect: 'inhibits', strength: 'strong' },
    ];

    const pathwayResult = computePathway(targets, adjacency, noLoopNodes, 5);
    const involvements = analyzeLoopInvolvement(targets, pathwayResult, [reinforcingLoop], loopEdges);

    expect(involvements.length).toBe(0);
  });
});

describe('getPathwayStats', () => {
  it('calculates correct statistics', () => {
    const pathway: DrugPathwayConfig = {
      drugId: 'test_drug',
      upstreamNodes: ['a', 'b'],
      targetNodes: ['c'],
      downstreamNodes: ['d', 'e', 'f'],
      pathwayEdges: ['e1', 'e2', 'e3', 'e4'],
      relevantLoops: [
        { loopId: 'loop1', involvement: 'breaks', targetNodeInLoop: 'c' },
        { loopId: 'loop2', involvement: 'weakens', targetNodeInLoop: 'c' },
        { loopId: 'loop3', involvement: 'strengthens', targetNodeInLoop: 'c' },
      ],
      affectedModules: ['M01', 'M02'],
      computedAt: new Date().toISOString(),
    };

    const stats = getPathwayStats(pathway);

    expect(stats.totalNodes).toBe(6); // 2 + 1 + 3
    expect(stats.upstreamCount).toBe(2);
    expect(stats.targetCount).toBe(1);
    expect(stats.downstreamCount).toBe(3);
    expect(stats.edgeCount).toBe(4);
    expect(stats.moduleCount).toBe(2);
    expect(stats.loopCount).toBe(3);
    expect(stats.loopsBreaking).toBe(1);
    expect(stats.loopsWeakening).toBe(1);
    expect(stats.loopsStrengthening).toBe(1);
  });

  it('handles empty pathway', () => {
    const emptyPathway: DrugPathwayConfig = {
      drugId: 'empty_drug',
      upstreamNodes: [],
      targetNodes: [],
      downstreamNodes: [],
      pathwayEdges: [],
      relevantLoops: [],
      affectedModules: [],
      computedAt: new Date().toISOString(),
    };

    const stats = getPathwayStats(emptyPathway);

    expect(stats.totalNodes).toBe(0);
    expect(stats.upstreamCount).toBe(0);
    expect(stats.targetCount).toBe(0);
    expect(stats.downstreamCount).toBe(0);
    expect(stats.edgeCount).toBe(0);
    expect(stats.moduleCount).toBe(0);
    expect(stats.loopCount).toBe(0);
  });
});
