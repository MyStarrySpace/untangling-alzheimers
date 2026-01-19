/**
 * GET /api/v1/treatments/:id/pathway
 *
 * Compute pathway from treatment targets through the mechanistic network.
 * Returns upstream causes, downstream effects, affected modules, and feedback loops.
 *
 * Query params:
 * - depth: Max traversal depth (default: 5, max: 10)
 */

import { NextRequest } from 'next/server';
import { success, notFound, error } from '@/lib/api/response';
import { parseIntParam } from '@/lib/api/params';
import { getTreatmentById } from '@/data/mechanisticFramework/drugLibrary';
import {
  allNodes,
  allEdges,
  feedbackLoops,
  getNodeById,
} from '@/data/mechanisticFramework';
import {
  calculateDrugPathway,
  getPathwayStats,
} from '@/lib/pathwayCalculation';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const url = new URL(request.url);

  const treatment = getTreatmentById(id);

  if (!treatment) {
    return notFound(`Treatment '${id}' not found`);
  }

  // Parse depth parameter
  const depth = Math.min(parseIntParam(url, 'depth') ?? 5, 10);

  try {
    // Calculate the pathway
    const pathway = calculateDrugPathway(
      treatment,
      allNodes,
      allEdges,
      feedbackLoops,
      depth
    );

    // Get pathway statistics
    const stats = getPathwayStats(pathway);

    // Enrich nodes with labels for better API response
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
      treatmentId: treatment.id,
      treatmentName: treatment.name,
      targets: treatment.primaryTargets.map(t => ({
        nodeId: t.nodeId,
        effect: t.effect,
        strength: t.strength,
      })),
      upstream: pathway.upstreamNodes.map(enrichNode),
      downstream: pathway.downstreamNodes.map(enrichNode),
      affectedModules: pathway.affectedModules,
      feedbackLoops: pathway.relevantLoops.map(loop => ({
        loopId: loop.loopId,
        involvement: loop.involvement,
        targetNode: loop.targetNodeInLoop,
      })),
      stats: {
        totalNodes: stats.totalNodes,
        upstreamCount: stats.upstreamCount,
        targetCount: stats.targetCount,
        downstreamCount: stats.downstreamCount,
        edgeCount: stats.edgeCount,
        moduleCount: stats.moduleCount,
        loopCount: stats.loopCount,
        loopsBreaking: stats.loopsBreaking,
        loopsWeakening: stats.loopsWeakening,
        loopsStrengthening: stats.loopsStrengthening,
      },
      computedAt: pathway.computedAt,
    });
  } catch (err) {
    console.error('Error computing pathway:', err);
    return error('Failed to compute pathway', 500);
  }
}
