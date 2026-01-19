/**
 * GET /api/v1/modules/:id
 *
 * Returns full details for a single module including:
 * - Module metadata
 * - All nodes in the module
 * - All edges in the module
 * - Key findings and paradigm shifts
 */

import { NextRequest } from 'next/server';
import { success, notFound } from '@/lib/api/response';
import {
  getModuleById,
  allNodes,
  allEdges,
} from '@/data/mechanisticFramework';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const module = getModuleById(id);

  if (!module) {
    return notFound(`Module '${id}' not found`);
  }

  // Get all nodes in this module
  const moduleNodes = allNodes.filter(n =>
    n.moduleId === id || n.sharedWith?.includes(id)
  );

  // Get all edges in this module
  const moduleEdges = allEdges.filter(e =>
    e.moduleId === id || e.sharedWith?.includes(id)
  );

  return success({
    id: module.id,
    name: module.name,
    shortName: module.shortName,
    description: module.description,
    overview: module.overview,
    keyFindings: module.keyFindings,
    paradigmShifts: module.paradigmShifts,
    upstreamModules: module.upstreamModules,
    downstreamModules: module.downstreamModules,
    landmarkPapers: module.landmarkPapers,
    therapeuticTargets: module.therapeuticTargets,
    interventionWindow: module.interventionWindow,
    color: module.color,
    icon: module.icon,
    stats: {
      nodeCount: moduleNodes.length,
      edgeCount: moduleEdges.length,
    },
    nodes: moduleNodes.map(n => ({
      id: n.id,
      label: n.label,
      category: n.category,
      subtype: n.subtype,
      roles: n.roles,
    })),
    edges: moduleEdges.map(e => ({
      id: e.id,
      source: e.source,
      target: e.target,
      relation: e.relation,
      causalConfidence: e.causalConfidence,
    })),
  });
}
