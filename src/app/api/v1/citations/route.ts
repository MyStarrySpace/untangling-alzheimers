/**
 * GET /api/v1/citations
 *
 * Query bibliography citations.
 *
 * Query params:
 * - category: Source category (foundational, hypotheses, trials, mechanisms, etc.)
 * - year: Filter by publication year
 * - type: Source type (journal, news, book, website, conference)
 * - search: Text search
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 50, max: 100)
 */

import { NextRequest } from 'next/server';
import { paginatedSuccess } from '@/lib/api/response';
import { parseCommonParams, parseString, parseIntParam, searchFilter } from '@/lib/api/params';
import {
  bibliography,
  foundationalSources,
  hypothesesSources,
  trialsSources,
  mechanismsSources,
  treatmentsSources,
  fundingSources,
  geneticsSources,
  drugConcernsSources,
  sexAncestrySources,
  policySources,
  failureCascadeSources,
  pipelineDrugsSources,
  scandalSources,
  type Source,
} from '@/data/bibliography/index';

// Map category names to source arrays
const categoryMap: Record<string, Source[]> = {
  foundational: foundationalSources,
  hypotheses: hypothesesSources,
  trials: trialsSources,
  mechanisms: mechanismsSources,
  treatments: treatmentsSources,
  funding: fundingSources,
  genetics: geneticsSources,
  drugConcerns: drugConcernsSources,
  sexAncestry: sexAncestrySources,
  policy: policySources,
  failureCascade: failureCascadeSources,
  pipelineDrugs: pipelineDrugsSources,
  scandal: scandalSources,
};

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const { page, limit, search } = parseCommonParams(url);

  // Parse filters
  const category = parseString(url, 'category');
  const year = parseIntParam(url, 'year');
  const type = parseString(url, 'type') as Source['type'] | undefined;

  // Start with all sources or filter by category
  let sources: Source[] = category && categoryMap[category]
    ? categoryMap[category]
    : bibliography;

  // Filter by year
  if (year !== undefined) {
    sources = sources.filter(s => s.year === year);
  }

  // Filter by type
  if (type) {
    sources = sources.filter(s => s.type === type);
  }

  // Apply text search
  sources = searchFilter(sources, search, (s) =>
    `${s.title} ${s.authors.join(' ')} ${s.publication} ${s.citations.map(c => c.quote).join(' ')}`
  );

  // Transform to API response format
  const transformed = sources.map(s => ({
    id: s.id,
    type: s.type,
    authors: s.authors,
    title: s.title,
    publication: s.publication,
    year: s.year,
    url: s.url,
    doi: s.doi,
    citationCount: s.citations.length,
  }));

  return paginatedSuccess(transformed, page, limit);
}
