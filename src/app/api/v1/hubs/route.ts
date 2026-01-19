/**
 * GET /api/v1/hubs
 *
 * Get high-connectivity nodes (potential leverage points).
 *
 * Query params:
 * - minDegree: Minimum total edge count (default: 10)
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 50, max: 100)
 */

import { NextRequest } from 'next/server';
import { paginatedSuccess } from '@/lib/api/response';
import { parseCommonParams, parseIntParam } from '@/lib/api/params';
import {
  allNodes,
  getNodeDegree,
  getLoopsByNode,
} from '@/data/mechanisticFramework';
import { getTreatmentsTargetingNode } from '@/data/mechanisticFramework/drugLibrary';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const { page, limit } = parseCommonParams(url);
  const minDegree = parseIntParam(url, 'minDegree') ?? 10;

  // Calculate degree for all nodes and filter by minDegree
  const nodesWithDegree = allNodes
    .map(node => {
      const degree = getNodeDegree(node.id);
      const loops = getLoopsByNode(node.id);
      const treatments = getTreatmentsTargetingNode(node.id);

      return {
        id: node.id,
        label: node.label,
        category: node.category,
        moduleId: node.moduleId,
        roles: node.roles,
        inDegree: degree.inDegree,
        outDegree: degree.outDegree,
        totalDegree: degree.total,
        loopCount: loops.length,
        treatmentCount: treatments.length,
        isTherapeuticTarget: node.roles?.includes('THERAPEUTIC_TARGET') ?? false,
        isLeveragePoint: node.roles?.includes('LEVERAGE_POINT') ?? false,
      };
    })
    .filter(n => n.totalDegree >= minDegree)
    .sort((a, b) => b.totalDegree - a.totalDegree);

  return paginatedSuccess(nodesWithDegree, page, limit);
}
