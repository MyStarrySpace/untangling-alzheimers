/**
 * GET /api/v1/treatments
 *
 * Query treatment library with filters.
 *
 * Query params:
 * - status: FDA/regulatory status (approved, phase3, preclinical, etc.)
 * - evidence: Minimum evidence level (L1-L7)
 * - type: Treatment type (small_molecule, antibody, device, lifestyle, etc.)
 * - target: Node ID this treatment targets
 * - effect: Effect type (inhibits, activates, modulates)
 * - search: Text search on name/mechanism
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 50, max: 100)
 */

import { NextRequest } from 'next/server';
import { success, paginatedSuccess } from '@/lib/api/response';
import { parseCommonParams, parseString, searchFilter } from '@/lib/api/params';
import {
  treatmentLibrary,
  type TreatmentLibraryEntry,
  type RegulatoryStatus,
  type TreatmentType,
  type TreatmentEffect,
  type TreatmentADEvidence,
} from '@/data/mechanisticFramework/drugLibrary';

// Evidence level ranking for filtering (L1 = best)
const evidenceLevels: TreatmentADEvidence['level'][] = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7'];

function getEvidenceRank(level: TreatmentADEvidence['level']): number {
  return evidenceLevels.indexOf(level);
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const { page, limit, search } = parseCommonParams(url);

  // Parse filters
  const status = parseString(url, 'status') as RegulatoryStatus | undefined;
  const evidence = parseString(url, 'evidence') as TreatmentADEvidence['level'] | undefined;
  const type = parseString(url, 'type') as TreatmentType | undefined;
  const target = parseString(url, 'target');
  const effect = parseString(url, 'effect') as TreatmentEffect | undefined;

  // Apply filters
  let filtered: TreatmentLibraryEntry[] = [...treatmentLibrary];

  // Filter by regulatory status
  if (status) {
    filtered = filtered.filter(t => t.fdaStatus === status);
  }

  // Filter by minimum evidence level
  if (evidence) {
    const minRank = getEvidenceRank(evidence);
    filtered = filtered.filter(t => getEvidenceRank(t.adEvidence.level) <= minRank);
  }

  // Filter by treatment type
  if (type) {
    filtered = filtered.filter(t => t.type === type);
  }

  // Filter by target node
  if (target) {
    filtered = filtered.filter(t =>
      t.primaryTargets.some(pt => pt.nodeId === target)
    );
  }

  // Filter by effect type
  if (effect) {
    filtered = filtered.filter(t =>
      t.primaryTargets.some(pt => pt.effect === effect)
    );
  }

  // Apply text search
  filtered = searchFilter(filtered, search, (t) =>
    `${t.name} ${t.mechanismSummary} ${t.notes || ''}`
  );

  // Transform to API response format
  const transformed = filtered.map(t => ({
    id: t.id,
    name: t.name,
    type: t.type,
    fdaStatus: t.fdaStatus,
    targets: t.primaryTargets.map(pt => pt.nodeId),
    evidenceLevel: t.adEvidence.level,
    annualCost: t.annualCost,
    availability: t.availability,
  }));

  return paginatedSuccess(transformed, page, limit);
}
