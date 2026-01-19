/**
 * GET /api/v1/treatments/:id
 *
 * Returns full details for a single treatment including:
 * - All target nodes with mechanisms
 * - Variants (dosing options)
 * - AD-specific evidence with PMIDs
 */

import { NextRequest } from 'next/server';
import { success, notFound } from '@/lib/api/response';
import { getTreatmentById } from '@/data/mechanisticFramework/drugLibrary';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const treatment = getTreatmentById(id);

  if (!treatment) {
    return notFound(`Treatment '${id}' not found`);
  }

  return success({
    id: treatment.id,
    name: treatment.name,
    type: treatment.type,
    fdaStatus: treatment.fdaStatus,
    availability: treatment.availability,
    mechanismSummary: treatment.mechanismSummary,
    primaryTargets: treatment.primaryTargets.map(t => ({
      nodeId: t.nodeId,
      effect: t.effect,
      strength: t.strength,
      mechanism: t.mechanism,
    })),
    variants: treatment.variants?.map(v => ({
      id: v.id,
      label: v.label,
      effectModifier: v.effectModifier,
      notes: v.notes,
    })),
    adEvidence: {
      level: treatment.adEvidence.level,
      summary: treatment.adEvidence.summary,
      pmids: treatment.adEvidence.pmids,
    },
    annualCost: treatment.annualCost,
    notes: treatment.notes,
  });
}
