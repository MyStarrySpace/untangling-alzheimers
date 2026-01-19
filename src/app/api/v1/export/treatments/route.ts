/**
 * GET /api/v1/export/treatments
 *
 * Export treatment library as JSON.
 *
 * Query params:
 * - format: json (default, future: csv)
 */

import { NextRequest } from 'next/server';
import { success, error } from '@/lib/api/response';
import { parseString } from '@/lib/api/params';
import { treatmentLibrary } from '@/data/mechanisticFramework/drugLibrary';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const format = parseString(url, 'format') || 'json';

  if (format !== 'json') {
    return error(`Format '${format}' is not yet supported. Available: json`, 400);
  }

  return success({
    count: treatmentLibrary.length,
    exportedAt: new Date().toISOString(),
    treatments: treatmentLibrary.map(t => ({
      id: t.id,
      name: t.name,
      type: t.type,
      fdaStatus: t.fdaStatus,
      availability: t.availability,
      mechanismSummary: t.mechanismSummary,
      primaryTargets: t.primaryTargets.map(pt => ({
        nodeId: pt.nodeId,
        effect: pt.effect,
        strength: pt.strength,
        mechanism: pt.mechanism,
      })),
      variants: t.variants?.map(v => ({
        id: v.id,
        label: v.label,
        effectModifier: v.effectModifier,
        notes: v.notes,
      })),
      adEvidence: {
        level: t.adEvidence.level,
        summary: t.adEvidence.summary,
        pmids: t.adEvidence.pmids,
      },
      annualCost: t.annualCost,
      notes: t.notes,
    })),
  });
}
