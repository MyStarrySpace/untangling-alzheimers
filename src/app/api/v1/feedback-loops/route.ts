/**
 * GET /api/v1/feedback-loops
 *
 * Query feedback loops.
 *
 * Query params:
 * - type: reinforcing | balancing
 * - node: Filter loops involving a specific node
 * - module: Filter loops in a specific module
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 50, max: 100)
 */

import { NextRequest } from 'next/server';
import { paginatedSuccess } from '@/lib/api/response';
import { parseCommonParams, parseString, searchFilter } from '@/lib/api/params';
import {
  feedbackLoops,
  allEdges,
  type FeedbackLoop,
  type LoopType,
} from '@/data/mechanisticFramework';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const { page, limit, search } = parseCommonParams(url);

  // Parse filters
  const type = parseString(url, 'type') as LoopType | undefined;
  const node = parseString(url, 'node');
  const module = parseString(url, 'module');

  // Apply filters
  let filtered: FeedbackLoop[] = [...feedbackLoops];

  // Filter by loop type
  if (type) {
    filtered = filtered.filter(l => l.type === type);
  }

  // Filter by node involvement
  if (node) {
    filtered = filtered.filter(loop =>
      loop.edgeIds.some(edgeId => {
        const edge = allEdges.find(e => e.id === edgeId);
        return edge?.source === node || edge?.target === node;
      })
    );
  }

  // Filter by module
  if (module) {
    filtered = filtered.filter(l => l.moduleIds.includes(module));
  }

  // Apply text search
  filtered = searchFilter(filtered, search, (l) =>
    `${l.id} ${l.name} ${l.description} ${l.clinicalImplication || ''}`
  );

  // Transform to API response format
  const transformed = filtered.map(l => ({
    id: l.id,
    name: l.name,
    type: l.type,
    description: l.description,
    edgeCount: l.edgeIds.length,
    moduleIds: l.moduleIds,
    clinicalImplication: l.clinicalImplication,
    interventionPoints: l.interventionPoints,
  }));

  return paginatedSuccess(transformed, page, limit);
}
