/**
 * GET /api/v1/edges
 *
 * Query edges with filters.
 *
 * Query params:
 * - module: Filter by module ID
 * - confidence: Minimum confidence level (L1-L7)
 * - source: Filter by source node ID
 * - target: Filter by target node ID
 * - crossModule: true for inter-module edges only
 * - edgeType: FLOW | TRANSITION | MODULATION | INFLUENCE
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 50, max: 100)
 */

import { NextRequest } from 'next/server';
import { paginatedSuccess } from '@/lib/api/response';
import { parseCommonParams, parseString, parseBoolean, searchFilter } from '@/lib/api/params';
import {
  allEdges,
  type MechanisticEdge,
  type CausalConfidence,
  type EdgeType,
} from '@/data/mechanisticFramework';

// Confidence level ranking (L1 = best)
const confidenceLevels: CausalConfidence[] = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7'];

function getConfidenceRank(level: CausalConfidence): number {
  return confidenceLevels.indexOf(level);
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const { page, limit, search } = parseCommonParams(url);

  // Parse filters
  const module = parseString(url, 'module');
  const confidence = parseString(url, 'confidence') as CausalConfidence | undefined;
  const source = parseString(url, 'source');
  const target = parseString(url, 'target');
  const crossModule = parseBoolean(url, 'crossModule');
  const edgeType = parseString(url, 'edgeType') as EdgeType | undefined;

  // Apply filters
  let filtered: MechanisticEdge[] = [...allEdges];

  // Filter by module
  if (module) {
    filtered = filtered.filter(e =>
      e.moduleId === module || e.sharedWith?.includes(module)
    );
  }

  // Filter by minimum confidence
  if (confidence) {
    const minRank = getConfidenceRank(confidence);
    filtered = filtered.filter(e => getConfidenceRank(e.causalConfidence) <= minRank);
  }

  // Filter by source node
  if (source) {
    filtered = filtered.filter(e => e.source === source);
  }

  // Filter by target node
  if (target) {
    filtered = filtered.filter(e => e.target === target);
  }

  // Filter by cross-module status
  if (crossModule !== undefined) {
    filtered = filtered.filter(e => Boolean(e.crossModule) === crossModule);
  }

  // Filter by edge type
  if (edgeType) {
    filtered = filtered.filter(e => e.edgeType === edgeType);
  }

  // Apply text search
  filtered = searchFilter(filtered, search, (e) =>
    `${e.id} ${e.source} ${e.target} ${e.mechanismLabel || ''} ${e.mechanismDescription || ''}`
  );

  // Transform to API response format
  const transformed = filtered.map(e => ({
    id: e.id,
    source: e.source,
    target: e.target,
    relation: e.relation,
    edgeType: e.edgeType,
    moduleId: e.moduleId,
    causalConfidence: e.causalConfidence,
    crossModule: e.crossModule,
    mechanismLabel: e.mechanismLabel,
    timescale: e.timescale,
  }));

  return paginatedSuccess(transformed, page, limit);
}
