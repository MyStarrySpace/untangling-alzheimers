/**
 * Generate TypeScript data from the mechanistic framework Excel file
 *
 * Run this script after editing framework.xlsx:
 *   npx tsx scripts/generate-framework-data.ts
 *
 * This generates src/data/mechanisticFramework/data.ts
 */

import * as XLSX from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';

const EXCEL_PATH = path.join(__dirname, '../src/data/mechanisticFramework/framework.xlsx');
const OUTPUT_PATH = path.join(__dirname, '../src/data/mechanisticFramework/data.ts');

interface NodeRow {
  id: string;
  label: string;
  category: string;
  subtype: string;
  moduleId: string;
  description: string;
  mechanism?: string;
  references_protein?: string;
  references_gene?: string;
  references_process?: string;
  references_cellType?: string;
  roles?: string;
  pmid?: string;
  notes?: string;
}

interface EdgeRow {
  id: string;
  source: string;
  target: string;
  relation: string;
  moduleId: string;
  causalConfidence?: string;
  mechanismDescription?: string;
  keyInsight?: string;
  pmid?: string;
  firstAuthor?: string;
  year?: string;
  methodType?: string;
  notes?: string;
}

interface ModuleRow {
  id: string;
  name: string;
  shortName: string;
  description: string;
  color: string;
}

function parseArray(value: string | undefined): string[] {
  if (!value || value.trim() === '') return [];
  return value.split(',').map(s => s.trim()).filter(Boolean);
}

function loadExcel() {
  if (!fs.existsSync(EXCEL_PATH)) {
    console.error(`Excel file not found: ${EXCEL_PATH}`);
    console.log('Run: npx tsx scripts/init-framework-excel.ts');
    process.exit(1);
  }

  return XLSX.readFile(EXCEL_PATH);
}

function loadNodes(wb: XLSX.WorkBook): string {
  const sheet = wb.Sheets['Nodes'];
  if (!sheet) return '[]';

  const rows = XLSX.utils.sheet_to_json<NodeRow>(sheet);

  const nodes = rows
    .filter(row => row.id)
    .map(row => {
      const node: Record<string, unknown> = {
        id: row.id,
        label: row.label || row.id,
        category: row.category || 'STOCK',
        subtype: row.subtype || 'ProteinPool',
        moduleId: row.moduleId || 'M01',
        description: row.description || '',
      };

      if (row.mechanism) node.mechanism = row.mechanism;
      if (row.pmid) node.pmid = row.pmid;
      if (row.notes) node.notes = row.notes;

      // Parse references
      const refs: Record<string, string> = {};
      if (row.references_protein) refs.protein = row.references_protein;
      if (row.references_gene) refs.gene = row.references_gene;
      if (row.references_process) refs.process = row.references_process;
      if (row.references_cellType) refs.cellType = row.references_cellType;
      if (Object.keys(refs).length > 0) node.references = refs;

      // Parse roles
      const roles = parseArray(row.roles);
      if (roles.length > 0) node.roles = roles;

      return node;
    });

  return JSON.stringify(nodes, null, 2);
}

function loadEdges(wb: XLSX.WorkBook): string {
  const sheet = wb.Sheets['Edges'];
  if (!sheet) return '[]';

  const rows = XLSX.utils.sheet_to_json<EdgeRow>(sheet);

  const edges = rows
    .filter(row => row.id && row.source && row.target)
    .map(row => {
      const edge: Record<string, unknown> = {
        id: row.id,
        source: row.source,
        target: row.target,
        relation: row.relation || 'regulates',
        moduleId: row.moduleId || 'M01',
      };

      if (row.causalConfidence) edge.causalConfidence = row.causalConfidence;
      if (row.mechanismDescription) edge.mechanismDescription = row.mechanismDescription;
      if (row.keyInsight) edge.keyInsight = row.keyInsight;
      if (row.notes) edge.notes = row.notes;

      // Parse evidence
      if (row.pmid || row.firstAuthor || row.year || row.methodType) {
        const evidence: Record<string, unknown> = {};
        if (row.pmid) evidence.pmid = row.pmid;
        if (row.firstAuthor) evidence.firstAuthor = row.firstAuthor;
        if (row.year) evidence.year = parseInt(row.year, 10);
        if (row.methodType) evidence.methodType = row.methodType;
        edge.evidence = evidence;
      }

      return edge;
    });

  return JSON.stringify(edges, null, 2);
}

function loadModules(wb: XLSX.WorkBook): string {
  const sheet = wb.Sheets['Modules'];
  if (!sheet) return '[]';

  const rows = XLSX.utils.sheet_to_json<ModuleRow>(sheet);

  const modules = rows
    .filter(row => row.id)
    .map(row => ({
      id: row.id,
      name: row.name || row.id,
      shortName: row.shortName || row.id,
      description: row.description || '',
      color: row.color || '#787473',
    }));

  return JSON.stringify(modules, null, 2);
}

function main() {
  console.log(`Reading ${EXCEL_PATH}...`);
  const wb = loadExcel();

  const nodesJson = loadNodes(wb);
  const edgesJson = loadEdges(wb);
  const modulesJson = loadModules(wb);

  const nodeCount = JSON.parse(nodesJson).length;
  const edgeCount = JSON.parse(edgesJson).length;
  const moduleCount = JSON.parse(modulesJson).length;

  const output = `/**
 * AUTO-GENERATED FILE - DO NOT EDIT DIRECTLY
 *
 * This file is generated from framework.xlsx by:
 *   npx tsx scripts/generate-framework-data.ts
 *
 * To update this data, edit the Excel file and re-run the script.
 *
 * Generated: ${new Date().toISOString()}
 */

import type { MechanisticNode, MechanisticEdge, Module } from './types';

export const allNodes: MechanisticNode[] = ${nodesJson};

export const allEdges: MechanisticEdge[] = ${edgesJson};

export const modules: Module[] = ${modulesJson};

export const mechanisticFramework = {
  nodes: allNodes,
  edges: allEdges,
  modules,
};
`;

  fs.writeFileSync(OUTPUT_PATH, output);
  console.log(`Generated ${OUTPUT_PATH}`);
  console.log(`  Nodes: ${nodeCount}`);
  console.log(`  Edges: ${edgeCount}`);
  console.log(`  Modules: ${moduleCount}`);
}

main();
