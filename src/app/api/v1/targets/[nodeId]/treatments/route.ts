/**
 * GET /api/v1/targets/:nodeId/treatments
 *
 * Get all treatments targeting a specific node.
 */

import { NextRequest } from 'next/server';
import { success, notFound } from '@/lib/api/response';
import { getNodeById } from '@/data/mechanisticFramework';
import { getTreatmentsTargetingNode } from '@/data/mechanisticFramework/drugLibrary';

interface RouteParams {
  params: Promise<{
    nodeId: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { nodeId } = await params;

  // Verify the node exists
  const node = getNodeById(nodeId);
  if (!node) {
    return notFound(`Node '${nodeId}' not found`);
  }

  const treatments = getTreatmentsTargetingNode(nodeId);

  return success({
    nodeId,
    nodeLabel: node.label,
    count: treatments.length,
    treatments: treatments.map(t => {
      const targetInfo = t.primaryTargets.find(pt => pt.nodeId === nodeId);
      return {
        id: t.id,
        name: t.name,
        type: t.type,
        fdaStatus: t.fdaStatus,
        effect: targetInfo?.effect,
        strength: targetInfo?.strength,
        mechanism: targetInfo?.mechanism,
        evidenceLevel: t.adEvidence.level,
        annualCost: t.annualCost,
      };
    }),
  });
}
