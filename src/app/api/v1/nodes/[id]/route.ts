/**
 * GET /api/v1/nodes/:id
 *
 * Returns full details for a single node including:
 * - All metadata
 * - Connected edges (incoming and outgoing)
 * - Treatments targeting this node
 */

import { NextRequest } from 'next/server';
import { success, notFound } from '@/lib/api/response';
import {
  getNodeById,
  getEdgesBySource,
  getEdgesByTarget,
  getNodeDegree,
  getLoopsByNode,
} from '@/data/mechanisticFramework';
import { getTreatmentsTargetingNode } from '@/data/mechanisticFramework/drugLibrary';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const node = getNodeById(id);

  if (!node) {
    return notFound(`Node '${id}' not found`);
  }

  // Get connected edges
  const incomingEdges = getEdgesByTarget(id);
  const outgoingEdges = getEdgesBySource(id);
  const degree = getNodeDegree(id);

  // Get feedback loops involving this node
  const loops = getLoopsByNode(id);

  // Get treatments targeting this node
  const treatments = getTreatmentsTargetingNode(id);

  return success({
    id: node.id,
    label: node.label,
    category: node.category,
    subtype: node.subtype,
    moduleId: node.moduleId,
    sharedWith: node.sharedWith,
    roles: node.roles,
    description: node.description,
    mechanism: node.mechanism,
    compartment: node.compartment,
    references: node.references,
    timescale: node.timescale,
    units: node.units,
    variants: node.variants,
    connections: {
      inDegree: degree.inDegree,
      outDegree: degree.outDegree,
      totalDegree: degree.total,
      incoming: incomingEdges.map(e => ({
        edgeId: e.id,
        sourceNode: e.source,
        relation: e.relation,
        confidence: e.causalConfidence,
      })),
      outgoing: outgoingEdges.map(e => ({
        edgeId: e.id,
        targetNode: e.target,
        relation: e.relation,
        confidence: e.causalConfidence,
      })),
    },
    feedbackLoops: loops.map(l => ({
      id: l.id,
      name: l.name,
      type: l.type,
    })),
    treatments: treatments.map(t => ({
      id: t.id,
      name: t.name,
      effect: t.primaryTargets.find(pt => pt.nodeId === id)?.effect,
      strength: t.primaryTargets.find(pt => pt.nodeId === id)?.strength,
    })),
  });
}
