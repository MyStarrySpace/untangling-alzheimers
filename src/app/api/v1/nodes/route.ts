/**
 * GET /api/v1/nodes
 *
 * Query nodes with filters.
 *
 * Query params:
 * - module: Filter by module ID (e.g., M01)
 * - category: STOCK | STATE | BOUNDARY
 * - role: THERAPEUTIC_TARGET | BIOMARKER | LEVERAGE_POINT | REGULATOR
 * - search: Text search on label/description
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 50, max: 100)
 */

import { NextRequest } from 'next/server';
import { paginatedSuccess } from '@/lib/api/response';
import { parseCommonParams, parseString, searchFilter } from '@/lib/api/params';
import {
  allNodes,
  type MechanisticNode,
  type NodeCategory,
  type NodeRoleAnnotation,
} from '@/data/mechanisticFramework';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const { page, limit, search } = parseCommonParams(url);

  // Parse filters
  const module = parseString(url, 'module');
  const category = parseString(url, 'category') as NodeCategory | undefined;
  const role = parseString(url, 'role') as NodeRoleAnnotation | undefined;

  // Apply filters
  let filtered: MechanisticNode[] = [...allNodes];

  // Filter by module
  if (module) {
    filtered = filtered.filter(n =>
      n.moduleId === module || n.sharedWith?.includes(module)
    );
  }

  // Filter by category
  if (category) {
    filtered = filtered.filter(n => n.category === category);
  }

  // Filter by role
  if (role) {
    filtered = filtered.filter(n => n.roles?.includes(role));
  }

  // Apply text search
  filtered = searchFilter(filtered, search, (n) =>
    `${n.id} ${n.label} ${n.description || ''} ${n.mechanism || ''}`
  );

  // Transform to API response format
  const transformed = filtered.map(n => ({
    id: n.id,
    label: n.label,
    category: n.category,
    subtype: n.subtype,
    moduleId: n.moduleId,
    sharedWith: n.sharedWith,
    roles: n.roles,
    description: n.description,
  }));

  return paginatedSuccess(transformed, page, limit);
}
