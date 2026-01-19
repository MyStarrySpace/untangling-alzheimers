/**
 * GET /api/v1/modules
 *
 * List all 16 disease modules with metadata.
 */

import { NextRequest } from 'next/server';
import { success } from '@/lib/api/response';
import {
  modules,
  allNodes,
  allEdges,
} from '@/data/mechanisticFramework';

export async function GET(request: NextRequest) {
  // Enrich modules with node/edge counts
  const enrichedModules = modules.map(m => {
    const nodeCount = allNodes.filter(n =>
      n.moduleId === m.id || n.sharedWith?.includes(m.id)
    ).length;

    const edgeCount = allEdges.filter(e =>
      e.moduleId === m.id || e.sharedWith?.includes(m.id)
    ).length;

    return {
      id: m.id,
      name: m.name,
      shortName: m.shortName,
      description: m.description,
      nodeCount,
      edgeCount,
      upstreamModules: m.upstreamModules,
      downstreamModules: m.downstreamModules,
      therapeuticTargets: m.therapeuticTargets,
      interventionWindow: m.interventionWindow,
      color: m.color,
      icon: m.icon,
    };
  });

  return success({
    count: enrichedModules.length,
    modules: enrichedModules,
  });
}
