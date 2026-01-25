/**
 * Initialize the mechanistic framework Excel file with initial data
 * Run with: npx tsx scripts/init-framework-excel.ts
 */

import * as XLSX from 'xlsx';
import * as path from 'path';

const EXCEL_PATH = path.join(__dirname, '../src/data/mechanisticFramework/framework.xlsx');

// Define column headers for each sheet
const nodesColumns = [
  'id',                    // Unique identifier (snake_case)
  'label',                 // Display name
  'category',              // STOCK, STATE, BOUNDARY, PROCESS
  'subtype',               // More specific categorization
  'moduleId',              // Which module this belongs to (M01, M02, etc.)
  'description',           // Brief description
  'mechanism',             // Detailed mechanism explanation
  'references_protein',    // UniProt ID if applicable
  'references_gene',       // HGNC ID if applicable
  'references_process',    // GO term if applicable
  'references_cellType',   // Cell Ontology ID if applicable
  'roles',                 // Comma-separated: THERAPEUTIC_TARGET, BIOMARKER, etc.
  'pmid',                  // Primary citation PMID
  'notes',                 // Additional notes
];

const edgesColumns = [
  'id',                    // Unique identifier (E01.001 format)
  'source',                // Source node id
  'target',                // Target node id
  'relation',              // increases, decreases, regulates, etc.
  'moduleId',              // Primary module
  'causalConfidence',      // L1-L7 evidence level
  'mechanismDescription',  // How source affects target
  'keyInsight',            // Important takeaway
  'pmid',                  // Primary citation PMID
  'firstAuthor',           // First author of primary citation
  'year',                  // Year of primary citation
  'methodType',            // RCT, cohort, knockout, etc.
  'notes',                 // Additional notes
];

const modulesColumns = [
  'id',                    // M01, M02, etc.
  'name',                  // Full name
  'shortName',             // Abbreviated name
  'description',           // What this module covers
  'color',                 // Hex color for visualization
];

// Initial data
const initialNodes = [
  {
    id: 'lysosome',
    label: 'Lysosome',
    category: 'STOCK',
    subtype: 'Organelle',
    moduleId: 'M02',
    description: 'Acidic organelle responsible for degradation and recycling of cellular components',
    mechanism: 'Lysosomes are membrane-bound organelles containing hydrolytic enzymes that break down proteins, lipids, carbohydrates, and nucleic acids. They maintain an acidic pH (~4.5-5) via V-ATPase proton pumps. Critical for autophagy, phagocytosis, and cellular homeostasis. Lysosomal dysfunction is implicated in multiple neurodegenerative diseases.',
    references_protein: '',
    references_gene: '',
    references_process: 'GO:0005764',
    references_cellType: '',
    roles: 'THERAPEUTIC_TARGET',
    pmid: '',
    notes: 'Central node - connects to autophagy, lipid metabolism, pH regulation, and clearance pathways',
  },
];

const initialModules = [
  {
    id: 'M02',
    name: 'Lysosomal Pathology',
    shortName: 'Lysosome',
    description: 'Lysosomal dysfunction, pH dysregulation, and clearance pathway failures',
    color: '#34d399',
  },
];

const initialEdges: Record<string, string>[] = [];

// Create workbook
const wb = XLSX.utils.book_new();

// Create Nodes sheet
const nodesData = [nodesColumns, ...initialNodes.map(node => nodesColumns.map(col => node[col as keyof typeof node] || ''))];
const nodesWs = XLSX.utils.aoa_to_sheet(nodesData);
// Set column widths
nodesWs['!cols'] = nodesColumns.map(col => ({ wch: col === 'mechanism' || col === 'description' ? 50 : col === 'id' || col === 'label' ? 20 : 15 }));
XLSX.utils.book_append_sheet(wb, nodesWs, 'Nodes');

// Create Edges sheet
const edgesData = [edgesColumns, ...initialEdges.map(edge => edgesColumns.map(col => edge[col] || ''))];
const edgesWs = XLSX.utils.aoa_to_sheet(edgesData);
edgesWs['!cols'] = edgesColumns.map(col => ({ wch: col === 'mechanismDescription' || col === 'keyInsight' ? 50 : 15 }));
XLSX.utils.book_append_sheet(wb, edgesWs, 'Edges');

// Create Modules sheet
const modulesData = [modulesColumns, ...initialModules.map(mod => modulesColumns.map(col => mod[col as keyof typeof mod] || ''))];
const modulesWs = XLSX.utils.aoa_to_sheet(modulesData);
modulesWs['!cols'] = modulesColumns.map(col => ({ wch: col === 'description' ? 50 : 20 }));
XLSX.utils.book_append_sheet(wb, modulesWs, 'Modules');

// Write file
XLSX.writeFile(wb, EXCEL_PATH);

console.log(`Created ${EXCEL_PATH}`);
console.log('Sheets: Nodes, Edges, Modules');
console.log(`Initial node: lysosome (M02)`);
