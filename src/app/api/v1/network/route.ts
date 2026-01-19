/**
 * GET /api/v1/network
 *
 * Returns full mechanistic framework metadata including:
 * - Version and performance metrics
 * - Statistics (node/edge/module/loop counts)
 * - Node breakdown by category and role
 * - Edge breakdown by confidence level
 */

import { NextRequest } from 'next/server';
import { success } from '@/lib/api/response';
import {
  mechanisticFramework,
  frameworkStats,
} from '@/data/mechanisticFramework';

export async function GET(request: NextRequest) {
  const { version, lastUpdated, performance } = mechanisticFramework;

  return success({
    version,
    lastUpdated,
    performance: {
      rocAuc: performance.rocAuc,
      description: performance.description,
    },
    stats: {
      totalNodes: frameworkStats.totalNodes,
      totalEdges: frameworkStats.totalEdges,
      totalModules: frameworkStats.totalModules,
      totalLoops: frameworkStats.totalLoops,
    },
    nodesByCategory: frameworkStats.nodesByCategory,
    nodesByRole: frameworkStats.nodesByRole,
    edgesByConfidence: frameworkStats.edgesByConfidence,
    feedbackLoops: {
      reinforcing: frameworkStats.reinforcingLoops,
      balancing: frameworkStats.balancingLoops,
    },
    systemBoundaries: {
      inputs: mechanisticFramework.inputBoundaries,
      outputs: mechanisticFramework.outputBoundaries,
    },
  });
}
