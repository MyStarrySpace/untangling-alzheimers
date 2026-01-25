/**
 * Mechanistic Framework
 *
 * Data is stored in framework.xlsx and generated to data.ts.
 * After editing the Excel file, run:
 *   npx tsx scripts/generate-framework-data.ts
 *
 * Usage:
 *   import { mechanisticFramework, allNodes, allEdges } from '@/data/mechanisticFramework';
 */

export * from './types';
export * from './data';
