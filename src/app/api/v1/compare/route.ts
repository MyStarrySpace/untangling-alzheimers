/**
 * GET /api/v1/compare
 *
 * Compare multiple treatments side-by-side.
 *
 * Query params:
 * - ids: Comma-separated treatment IDs (required, max 5)
 */

import { NextRequest } from 'next/server';
import { success, error } from '@/lib/api/response';
import { parseList } from '@/lib/api/params';
import { getTreatmentById } from '@/data/mechanisticFramework/drugLibrary';
import {
  allNodes,
  allEdges,
  feedbackLoops,
} from '@/data/mechanisticFramework';
import {
  calculateDrugPathway,
  getPathwayStats,
} from '@/lib/pathwayCalculation';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  // Parse treatment IDs
  const ids = parseList(url, 'ids');

  if (!ids || ids.length === 0) {
    return error('Missing required parameter: ids (comma-separated treatment IDs)', 400);
  }

  if (ids.length > 5) {
    return error('Maximum 5 treatments can be compared at once', 400);
  }

  // Get all treatments and validate
  const treatments = ids.map(id => ({
    id,
    treatment: getTreatmentById(id),
  }));

  const invalidIds = treatments.filter(t => !t.treatment).map(t => t.id);
  if (invalidIds.length > 0) {
    return error(`Invalid treatment IDs: ${invalidIds.join(', ')}`, 400);
  }

  // Calculate pathways for all treatments
  const comparisons = treatments.map(({ id, treatment }) => {
    const pathway = calculateDrugPathway(
      treatment!,
      allNodes,
      allEdges,
      feedbackLoops,
      5
    );
    const stats = getPathwayStats(pathway);

    return {
      id: treatment!.id,
      name: treatment!.name,
      type: treatment!.type,
      fdaStatus: treatment!.fdaStatus,
      availability: treatment!.availability,
      evidenceLevel: treatment!.adEvidence.level,
      annualCost: treatment!.annualCost,
      targets: treatment!.primaryTargets.map(t => ({
        nodeId: t.nodeId,
        effect: t.effect,
        strength: t.strength,
      })),
      pathway: {
        totalNodes: stats.totalNodes,
        upstreamCount: stats.upstreamCount,
        downstreamCount: stats.downstreamCount,
        moduleCount: stats.moduleCount,
        loopCount: stats.loopCount,
        loopsBreaking: stats.loopsBreaking,
        affectedModules: pathway.affectedModules,
      },
    };
  });

  // Find overlapping nodes/modules
  const allTargetNodes = new Set<string>();
  const allAffectedModules = new Set<string>();

  comparisons.forEach(c => {
    c.targets.forEach(t => allTargetNodes.add(t.nodeId));
    c.pathway.affectedModules.forEach(m => allAffectedModules.add(m));
  });

  // Calculate overlap
  const sharedTargets = Array.from(allTargetNodes).filter(nodeId =>
    comparisons.filter(c => c.targets.some(t => t.nodeId === nodeId)).length > 1
  );

  const sharedModules = Array.from(allAffectedModules).filter(moduleId =>
    comparisons.filter(c => c.pathway.affectedModules.includes(moduleId)).length > 1
  );

  return success({
    count: comparisons.length,
    treatments: comparisons,
    overlap: {
      sharedTargetNodes: sharedTargets,
      sharedModules,
    },
  });
}
