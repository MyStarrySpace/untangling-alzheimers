/**
 * Standard API Response Helpers
 *
 * Consistent response formatting for all API endpoints.
 */

import { NextResponse } from 'next/server';

/**
 * Standard success response
 */
export function success<T>(data: T, meta?: Record<string, unknown>) {
  return NextResponse.json({
    success: true,
    data,
    ...meta,
  });
}

/**
 * Standard error response
 */
export function error(message: string, status = 400) {
  return NextResponse.json(
    { success: false, error: message },
    { status }
  );
}

/**
 * Not found response
 */
export function notFound(message = 'Resource not found') {
  return error(message, 404);
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

/**
 * Paginate an array of items
 */
export function paginate<T>(
  items: T[],
  page: number,
  limit: number
): PaginatedResult<T> {
  const start = (page - 1) * limit;
  const paginatedItems = items.slice(start, start + limit);

  return {
    items: paginatedItems,
    total: items.length,
    page,
    limit,
    pages: Math.ceil(items.length / limit),
  };
}

/**
 * Success response with pagination
 */
export function paginatedSuccess<T>(
  items: T[],
  page: number,
  limit: number
) {
  const result = paginate(items, page, limit);
  return NextResponse.json({
    success: true,
    data: result.items,
    pagination: {
      total: result.total,
      page: result.page,
      limit: result.limit,
      pages: result.pages,
    },
  });
}
