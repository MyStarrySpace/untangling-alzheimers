/**
 * GET /api/v1/citations/:id
 *
 * Returns full details for a single citation source including all quotes.
 */

import { NextRequest } from 'next/server';
import { success, notFound } from '@/lib/api/response';
import { getSource } from '@/data/bibliography/index';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const source = getSource(id);

  if (!source) {
    return notFound(`Citation source '${id}' not found`);
  }

  return success({
    id: source.id,
    type: source.type,
    authors: source.authors,
    title: source.title,
    publication: source.publication,
    year: source.year,
    volume: source.volume,
    pages: source.pages,
    url: source.url,
    doi: source.doi,
    accessDate: source.accessDate,
    citations: source.citations.map(c => ({
      id: c.id,
      quote: c.quote,
      page: c.page,
      usedIn: c.usedIn,
      context: c.context,
    })),
  });
}
