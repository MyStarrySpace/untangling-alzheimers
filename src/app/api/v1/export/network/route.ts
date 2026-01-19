/**
 * GET /api/v1/export/network
 *
 * Export full network data as JSON.
 *
 * Query params:
 * - format: json (default, future: csv, graphml, biopax)
 */

import { NextRequest } from 'next/server';
import { success, error } from '@/lib/api/response';
import { parseString } from '@/lib/api/params';
import {
  mechanisticFramework,
  allNodes,
  allEdges,
  modules,
  feedbackLoops,
} from '@/data/mechanisticFramework';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const format = parseString(url, 'format') || 'json';

  if (format !== 'json') {
    return error(`Format '${format}' is not yet supported. Available: json`, 400);
  }

  return success({
    version: mechanisticFramework.version,
    lastUpdated: mechanisticFramework.lastUpdated,
    performance: mechanisticFramework.performance,
    systemBoundaries: {
      inputs: mechanisticFramework.inputBoundaries,
      outputs: mechanisticFramework.outputBoundaries,
    },
    modules: modules.map(m => ({
      id: m.id,
      name: m.name,
      shortName: m.shortName,
      description: m.description,
      upstreamModules: m.upstreamModules,
      downstreamModules: m.downstreamModules,
      color: m.color,
    })),
    nodes: allNodes.map(n => ({
      id: n.id,
      label: n.label,
      category: n.category,
      subtype: n.subtype,
      moduleId: n.moduleId,
      sharedWith: n.sharedWith,
      roles: n.roles,
      description: n.description,
      compartment: n.compartment,
      references: n.references,
    })),
    edges: allEdges.map(e => ({
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
    })),
    feedbackLoops: feedbackLoops.map(l => ({
      id: l.id,
      name: l.name,
      type: l.type,
      description: l.description,
      edgeIds: l.edgeIds,
      moduleIds: l.moduleIds,
      clinicalImplication: l.clinicalImplication,
      interventionPoints: l.interventionPoints,
    })),
  });
}
