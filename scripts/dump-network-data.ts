#!/usr/bin/env npx tsx
/**
 * Network Data Dump Script
 *
 * Generates markdown tables of all nodes, edges, feedback loops, etc.
 * for easy auditing of the mechanistic framework.
 *
 * Usage: npx tsx scripts/dump-network-data.ts > network-audit.md
 */

import {
  allNodes,
  allEdges,
  feedbackLoops,
  modules
} from '../src/data/mechanisticFramework';

// Helper to escape pipe characters in markdown tables
function escapeMarkdown(str: string | undefined): string {
  if (!str) return '';
  return str.replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

// Helper to truncate long strings
function truncate(str: string | undefined, maxLen: number = 80): string {
  if (!str) return '';
  const escaped = escapeMarkdown(str);
  if (escaped.length <= maxLen) return escaped;
  return escaped.substring(0, maxLen - 3) + '...';
}

// Generate summary statistics
function generateSummary() {
  console.log('# Network Data Audit Report\n');
  console.log(`Generated: ${new Date().toISOString()}\n`);

  console.log('## Summary Statistics\n');
  console.log('| Metric | Count |');
  console.log('|--------|-------|');
  console.log(`| Total Nodes | ${allNodes.length} |`);
  console.log(`| Total Edges | ${allEdges.length} |`);
  console.log(`| Total Modules | ${modules.length} |`);
  console.log(`| Feedback Loops | ${feedbackLoops.length} |`);

  // Node categories
  const nodesByCategory = allNodes.reduce((acc, n) => {
    acc[n.category] = (acc[n.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  console.log('\n### Nodes by Category\n');
  console.log('| Category | Count |');
  console.log('|----------|-------|');
  Object.entries(nodesByCategory).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
    console.log(`| ${cat} | ${count} |`);
  });

  // Nodes by module
  const nodesByModule = allNodes.reduce((acc, n) => {
    acc[n.moduleId] = (acc[n.moduleId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  console.log('\n### Nodes by Module\n');
  console.log('| Module | Count |');
  console.log('|--------|-------|');
  Object.entries(nodesByModule).sort((a, b) => {
    // Sort by module ID numerically
    const aNum = parseInt(a[0].replace(/\D/g, '')) || 0;
    const bNum = parseInt(b[0].replace(/\D/g, '')) || 0;
    return aNum - bNum;
  }).forEach(([mod, count]) => {
    const module = modules.find(m => m.id === mod);
    const name = module?.name || mod;
    console.log(`| ${mod}: ${truncate(name, 30)} | ${count} |`);
  });

  // Edges by module
  const edgesByModule = allEdges.reduce((acc, e) => {
    acc[e.moduleId] = (acc[e.moduleId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  console.log('\n### Edges by Module\n');
  console.log('| Module | Count |');
  console.log('|--------|-------|');
  Object.entries(edgesByModule).sort((a, b) => {
    const aNum = parseInt(a[0].replace(/\D/g, '')) || 0;
    const bNum = parseInt(b[0].replace(/\D/g, '')) || 0;
    return aNum - bNum;
  }).forEach(([mod, count]) => {
    const module = modules.find(m => m.id === mod);
    const name = module?.name || mod;
    console.log(`| ${mod}: ${truncate(name, 30)} | ${count} |`);
  });

  // Edge relation types
  const edgesByRelation = allEdges.reduce((acc, e) => {
    acc[e.relation] = (acc[e.relation] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  console.log('\n### Edges by Relation Type\n');
  console.log('| Relation | Count |');
  console.log('|----------|-------|');
  Object.entries(edgesByRelation).sort((a, b) => b[1] - a[1]).forEach(([rel, count]) => {
    console.log(`| ${rel} | ${count} |`);
  });

  // Causal confidence distribution
  const edgesByConfidence = allEdges.reduce((acc, e) => {
    acc[e.causalConfidence] = (acc[e.causalConfidence] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  console.log('\n### Edges by Causal Confidence\n');
  console.log('| Level | Count | Description |');
  console.log('|-------|-------|-------------|');
  const confidenceDescriptions: Record<string, string> = {
    'L1': 'Human RCT',
    'L2': 'Human genetic (Mendelian)',
    'L3': 'Human genetic (GWAS) + animal KO',
    'L4': 'Animal intervention',
    'L5': 'In vitro / Cell culture',
    'L6': 'Observational / Correlation',
    'L7': 'Expert opinion / Hypothesis',
  };
  ['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7'].forEach(level => {
    const count = edgesByConfidence[level] || 0;
    console.log(`| ${level} | ${count} | ${confidenceDescriptions[level] || ''} |`);
  });
}

// Generate modules table
function generateModulesTable() {
  console.log('\n---\n');
  console.log('## Modules\n');
  console.log('| ID | Name | Description |');
  console.log('|----|------|-------------|');

  modules.sort((a, b) => {
    const aNum = parseInt(a.id.replace(/\D/g, '')) || 0;
    const bNum = parseInt(b.id.replace(/\D/g, '')) || 0;
    return aNum - bNum;
  }).forEach(m => {
    console.log(`| ${m.id} | ${escapeMarkdown(m.name)} | ${truncate(m.description, 60)} |`);
  });
}

// Generate nodes table
function generateNodesTable() {
  console.log('\n---\n');
  console.log('## All Nodes\n');
  console.log('| ID | Label | Category | Subtype | Module | Roles |');
  console.log('|----|-------|----------|---------|--------|-------|');

  // Sort by module, then by ID
  const sortedNodes = [...allNodes].sort((a, b) => {
    const aModNum = parseInt(a.moduleId.replace(/\D/g, '')) || 0;
    const bModNum = parseInt(b.moduleId.replace(/\D/g, '')) || 0;
    if (aModNum !== bModNum) return aModNum - bModNum;
    return a.id.localeCompare(b.id);
  });

  sortedNodes.forEach(n => {
    const roles = n.roles?.join(', ') || '';
    console.log(`| ${n.id} | ${truncate(n.label, 35)} | ${n.category} | ${n.subtype || ''} | ${n.moduleId} | ${roles} |`);
  });
}

// Generate edges table
function generateEdgesTable() {
  console.log('\n---\n');
  console.log('## All Edges\n');
  console.log('| ID | Source | Relation | Target | Module | Confidence | Mechanism |');
  console.log('|----|--------|----------|--------|--------|------------|-----------|');

  // Sort by edge ID
  const sortedEdges = [...allEdges].sort((a, b) => a.id.localeCompare(b.id));

  sortedEdges.forEach(e => {
    console.log(`| ${e.id} | ${e.source} | ${e.relation} | ${e.target} | ${e.moduleId} | ${e.causalConfidence} | ${truncate(e.mechanismLabel, 30)} |`);
  });
}

// Generate feedback loops table
function generateFeedbackLoopsTable() {
  console.log('\n---\n');
  console.log('## Feedback Loops\n');
  console.log('| ID | Name | Type | Modules | Edge Count |');
  console.log('|----|------|------|---------|------------|');

  feedbackLoops.forEach(loop => {
    console.log(`| ${loop.id} | ${truncate(loop.name, 40)} | ${loop.type} | ${loop.moduleIds.join(', ')} | ${loop.edgeIds.length} |`);
  });

  // Detailed loop info
  console.log('\n### Feedback Loop Details\n');
  feedbackLoops.forEach(loop => {
    console.log(`#### ${loop.name}\n`);
    console.log(`- **ID**: ${loop.id}`);
    console.log(`- **Type**: ${loop.type}`);
    console.log(`- **Modules**: ${loop.moduleIds.join(', ')}`);
    console.log(`- **Description**: ${truncate(loop.description, 200)}`);
    console.log(`- **Clinical Implication**: ${truncate(loop.clinicalImplication, 150)}`);
    console.log(`- **Edges**: ${loop.edgeIds.join(' → ')}`);
    if (loop.interventionPoints?.length) {
      console.log(`- **Intervention Points**: ${loop.interventionPoints.join(', ')}`);
    }
    console.log('');
  });
}

// Generate biomarker nodes table
function generateBiomarkersTable() {
  console.log('\n---\n');
  console.log('## Biomarker Nodes\n');

  const biomarkers = allNodes.filter(n =>
    n.roles?.includes('BIOMARKER') ||
    n.detectionTimeline
  );

  console.log('| ID | Label | Years Before Symptoms | Method | ATN | AUC |');
  console.log('|----|-------|----------------------|--------|-----|-----|');

  // Sort by detection timeline (earliest first)
  biomarkers.sort((a, b) => {
    const aYears = a.detectionTimeline?.yearsBeforeSymptoms ?? 0;
    const bYears = b.detectionTimeline?.yearsBeforeSymptoms ?? 0;
    return bYears - aYears;
  }).forEach(n => {
    const timeline = n.detectionTimeline;
    const years = timeline?.yearsBeforeSymptoms ?? '-';
    const method = timeline?.detectionMethod ?? '-';
    const atn = timeline?.atnCategory ?? '-';
    const auc = timeline?.performance?.auc ?? '-';
    console.log(`| ${n.id} | ${truncate(n.label, 30)} | ${years} | ${method} | ${atn} | ${auc} |`);
  });
}

// Generate therapeutic targets table
function generateTherapeuticTargetsTable() {
  console.log('\n---\n');
  console.log('## Therapeutic Target Nodes\n');

  const targets = allNodes.filter(n => n.roles?.includes('THERAPEUTIC_TARGET'));

  console.log('| ID | Label | Module | Category |');
  console.log('|----|-------|--------|----------|');

  targets.sort((a, b) => a.moduleId.localeCompare(b.moduleId)).forEach(n => {
    console.log(`| ${n.id} | ${truncate(n.label, 40)} | ${n.moduleId} | ${n.category} |`);
  });

  console.log(`\n**Total Therapeutic Targets**: ${targets.length}`);
}

// Generate cross-module edges table
function generateCrossModuleEdgesTable() {
  console.log('\n---\n');
  console.log('## Cross-Module Edges\n');

  const crossModuleEdges = allEdges.filter(e => e.crossModule);

  console.log('| ID | Source | Target | Cross-Module Info |');
  console.log('|----|--------|--------|-------------------|');

  crossModuleEdges.forEach(e => {
    console.log(`| ${e.id} | ${e.source} | ${e.target} | ${truncate(e.crossModule, 50)} |`);
  });

  console.log(`\n**Total Cross-Module Edges**: ${crossModuleEdges.length}`);
}

// Generate orphan check (nodes with no edges)
function generateOrphanCheck() {
  console.log('\n---\n');
  console.log('## Data Quality Checks\n');

  // Find orphan nodes (no incoming or outgoing edges)
  const nodeIds = new Set(allNodes.map(n => n.id));
  const connectedNodes = new Set<string>();

  allEdges.forEach(e => {
    connectedNodes.add(e.source);
    connectedNodes.add(e.target);
  });

  const orphanNodes = allNodes.filter(n => !connectedNodes.has(n.id));

  console.log('### Orphan Nodes (No Edges)\n');
  if (orphanNodes.length === 0) {
    console.log('*No orphan nodes found.*\n');
  } else {
    console.log('| ID | Label | Module |');
    console.log('|----|-------|--------|');
    orphanNodes.forEach(n => {
      console.log(`| ${n.id} | ${n.label} | ${n.moduleId} |`);
    });
  }

  // Find edges with missing nodes
  console.log('\n### Edges with Missing Nodes\n');
  const missingNodeEdges = allEdges.filter(e =>
    !nodeIds.has(e.source) || !nodeIds.has(e.target)
  );

  if (missingNodeEdges.length === 0) {
    console.log('*All edge endpoints exist.*\n');
  } else {
    console.log('| Edge ID | Missing Source | Missing Target |');
    console.log('|---------|----------------|----------------|');
    missingNodeEdges.forEach(e => {
      const missingSrc = !nodeIds.has(e.source) ? e.source : '';
      const missingTgt = !nodeIds.has(e.target) ? e.target : '';
      console.log(`| ${e.id} | ${missingSrc} | ${missingTgt} |`);
    });
  }

  // Check for duplicate IDs
  console.log('\n### Duplicate Node IDs\n');
  const nodeIdCounts = allNodes.reduce((acc, n) => {
    acc[n.id] = (acc[n.id] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const duplicateNodes = Object.entries(nodeIdCounts).filter(([, count]) => count > 1);
  if (duplicateNodes.length === 0) {
    console.log('*No duplicate node IDs.*\n');
  } else {
    console.log('| Node ID | Count |');
    console.log('|---------|-------|');
    duplicateNodes.forEach(([id, count]) => {
      console.log(`| ${id} | ${count} |`);
    });
  }

  console.log('\n### Duplicate Edge IDs\n');
  const edgeIdCounts = allEdges.reduce((acc, e) => {
    acc[e.id] = (acc[e.id] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const duplicateEdges = Object.entries(edgeIdCounts).filter(([, count]) => count > 1);
  if (duplicateEdges.length === 0) {
    console.log('*No duplicate edge IDs.*\n');
  } else {
    console.log('| Edge ID | Count |');
    console.log('|---------|-------|');
    duplicateEdges.forEach(([id, count]) => {
      console.log(`| ${id} | ${count} |`);
    });
  }
}

// Main execution
function main() {
  generateSummary();
  generateModulesTable();
  generateBiomarkersTable();
  generateTherapeuticTargetsTable();
  generateFeedbackLoopsTable();
  generateCrossModuleEdgesTable();
  generateOrphanCheck();
  generateNodesTable();
  generateEdgesTable();
}

main();
