/**
 * AUTO-GENERATED FILE - DO NOT EDIT DIRECTLY
 *
 * This file is generated from framework.xlsx by:
 *   npx tsx scripts/generate-framework-data.ts
 *
 * To update this data, edit the Excel file and re-run the script.
 *
 * Generated: 2026-01-25T14:26:07.889Z
 */

import type { MechanisticNode, MechanisticEdge, Module } from './types';

export const allNodes: MechanisticNode[] = [
  {
    "id": "lysosome",
    "label": "Lysosome",
    "category": "STOCK",
    "subtype": "Organelle",
    "moduleId": "M02",
    "description": "Acidic organelle responsible for degradation and recycling of cellular components",
    "mechanism": "Lysosomes are membrane-bound organelles containing hydrolytic enzymes that break down proteins, lipids, carbohydrates, and nucleic acids. They maintain an acidic pH (~4.5-5) via V-ATPase proton pumps. Critical for autophagy, phagocytosis, and cellular homeostasis. Lysosomal dysfunction is implicated in multiple neurodegenerative diseases.",
    "notes": "Central node - connects to autophagy, lipid metabolism, pH regulation, and clearance pathways",
    "references": {
      "process": "GO:0005764"
    },
    "roles": [
      "THERAPEUTIC_TARGET"
    ]
  }
];

export const allEdges: MechanisticEdge[] = [];

export const modules: Module[] = [
  {
    "id": "M02",
    "name": "Lysosomal Pathology",
    "shortName": "Lysosome",
    "description": "Lysosomal dysfunction, pH dysregulation, and clearance pathway failures",
    "color": "#34d399"
  }
];

export const mechanisticFramework = {
  nodes: allNodes,
  edges: allEdges,
  modules,
};
