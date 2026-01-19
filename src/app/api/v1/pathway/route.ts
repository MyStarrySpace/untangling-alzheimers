/**
 * GET /api/v1/pathway
 *
 * Compute pathway from arbitrary node(s).
 *
 * Query params:
 * - from: Comma-separated node IDs (required)
 * - direction: upstream | downstream | both (default: both)
 * - depth: Max traversal depth (default: 5, max: 10)
 */

import { NextRequest } from 'next/server';
import { success, error } from '@/lib/api/response';
import { parseString, parseIntParam, parseList } from '@/lib/api/params';
import {
  allNodes,
  allEdges,
  getNodeById,
} from '@/data/mechanisticFramework';
import {
  buildAdjacencyLists,
  computePathway,
} from '@/lib/pathwayCalculation';

type Direction = 'upstream' | 'downstream' | 'both';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  // Parse parameters
  const fromNodes = parseList(url, 'from');
  const direction = (parseString(url, 'direction') || 'both') as Direction;
  const depth = Math.min(parseIntParam(url, 'depth') ?? 5, 10);

  // Validate required parameters
  if (!fromNodes || fromNodes.length === 0) {
    return error('Missing required parameter: from (comma-separated node IDs)', 400);
  }

  // Validate all nodes exist
  const invalidNodes = fromNodes.filter(id => !getNodeById(id));
  if (invalidNodes.length > 0) {
    return error(`Invalid node IDs: ${invalidNodes.join(', ')}`, 400);
  }

  try {
    // Build adjacency lists
    const adjacency = buildAdjacencyLists(allNodes, allEdges);

    // Create mock targets for the pathway computation
    const targets = fromNodes.map(nodeId => ({
      nodeId,
      effect: 'modulates' as const,
      strength: 'moderate' as const,
    }));

    // Compute the full pathway
    const pathway = computePathway(targets, adjacency, allNodes, depth);

    // Filter based on direction
    let upstreamNodes = Array.from(pathway.upstreamNodes);
    let downstreamNodes = Array.from(pathway.downstreamNodes);

    if (direction === 'upstream') {
      downstreamNodes = [];
    } else if (direction === 'downstream') {
      upstreamNodes = [];
    }

    // Enrich nodes with labels
    const enrichNode = (nodeId: string) => {
      const node = getNodeById(nodeId);
      return {
        id: nodeId,
        label: node?.label ?? nodeId,
        moduleId: node?.moduleId,
        category: node?.category,
      };
    };

    return success({
      from: fromNodes,
      direction,
      depth,
      upstream: upstreamNodes.map(enrichNode),
      downstream: downstreamNodes.map(enrichNode),
      affectedModules: Array.from(pathway.affectedModules),
      stats: {
        upstreamCount: upstreamNodes.length,
        downstreamCount: downstreamNodes.length,
        totalNodes: upstreamNodes.length + downstreamNodes.length + fromNodes.length,
        edgeCount: pathway.pathwayEdges.size,
        moduleCount: pathway.affectedModules.size,
      },
    });
  } catch (err) {
    console.error('Error computing pathway:', err);
    return error('Failed to compute pathway', 500);
  }
}
