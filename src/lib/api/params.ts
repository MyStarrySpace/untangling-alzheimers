/**
 * Query Parameter Parsing Utilities
 *
 * Standardized parsing for common API query parameters.
 */

/**
 * Common query parameters shared across endpoints
 */
export interface CommonParams {
  page: number;
  limit: number;
  search?: string;
}

/**
 * Parse common query parameters from URL
 */
export function parseCommonParams(url: URL): CommonParams {
  return {
    page: Number.parseInt(url.searchParams.get('page') || '1', 10),
    limit: Math.min(
      Number.parseInt(url.searchParams.get('limit') || '50', 10),
      100 // Max limit
    ),
    search: url.searchParams.get('search') || undefined,
  };
}

/**
 * Parse a single string parameter
 */
export function parseString(url: URL, key: string): string | undefined {
  return url.searchParams.get(key) || undefined;
}

/**
 * Parse a boolean parameter
 */
export function parseBoolean(url: URL, key: string): boolean | undefined {
  const value = url.searchParams.get(key);
  if (value === null) return undefined;
  return value === 'true' || value === '1';
}

/**
 * Parse an integer parameter
 */
export function parseIntParam(url: URL, key: string): number | undefined {
  const value = url.searchParams.get(key);
  if (value === null) return undefined;
  const parsed = Number.parseInt(value, 10);
  return isNaN(parsed) ? undefined : parsed;
}

/**
 * Parse a comma-separated list into an array
 */
export function parseList(url: URL, key: string): string[] | undefined {
  const value = url.searchParams.get(key);
  if (!value) return undefined;
  return value.split(',').map(s => s.trim()).filter(Boolean);
}

/**
 * Filter items by text search across multiple fields
 */
export function searchFilter<T>(
  items: T[],
  search: string | undefined,
  getSearchableText: (item: T) => string
): T[] {
  if (!search) return items;

  const searchLower = search.toLowerCase();
  return items.filter(item =>
    getSearchableText(item).toLowerCase().includes(searchLower)
  );
}
