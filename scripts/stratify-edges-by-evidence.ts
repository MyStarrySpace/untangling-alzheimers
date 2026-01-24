#!/usr/bin/env npx tsx
/**
 * Edge Stratification by Evidence Quality
 *
 * Analyzes edges by causal confidence level to identify:
 * - Strong causal evidence (L1-L3): RCTs, Mendelian randomization, genetic + KO
 * - Moderate evidence (L4-L5): Animal intervention, in vitro
 * - Weak/correlational evidence (L6-L7): Observational, expert opinion
 * - Missing evidence: Edges without citations
 *
 * Usage:
 *   npx tsx scripts/stratify-edges-by-evidence.ts
 *   npx tsx scripts/stratify-edges-by-evidence.ts --module M19
 *   npx tsx scripts/stratify-edges-by-evidence.ts --weak-only
 *   npx tsx scripts/stratify-edges-by-evidence.ts --json
 */

import { allEdges, modules } from '../src/data/mechanisticFramework';
import type { MechanisticEdge, CausalConfidence } from '../src/data/mechanisticFramework/types';

// ============================================================================
// TYPES
// ============================================================================

interface StratifiedEdges {
  strong: MechanisticEdge[];      // L1-L3
  moderate: MechanisticEdge[];    // L4-L5
  weak: MechanisticEdge[];        // L6-L7
  noEvidence: MechanisticEdge[];  // Empty evidence array
  mixed: MechanisticEdge[];       // Multiple confidence levels
}

interface EdgeSummary {
  id: string;
  source: string;
  target: string;
  moduleId: string;
  relation: string;
  edgeConfidence: CausalConfidence | undefined;
  evidenceCount: number;
  bestEvidence: CausalConfidence | undefined;
  worstEvidence: CausalConfidence | undefined;
  hasPmid: boolean;
  keyInsight?: string;
}

// ============================================================================
// CONFIDENCE LEVEL UTILITIES
// ============================================================================

const CONFIDENCE_DESCRIPTIONS: Record<CausalConfidence, string> = {
  L1: 'Human RCT',
  L2: 'Human genetic (Mendelian)',
  L3: 'Human genetic (GWAS) + animal KO',
  L4: 'Animal intervention',
  L5: 'In vitro / Cell culture',
  L6: 'Observational / Correlation',
  L7: 'Expert opinion / Hypothesis',
};

const CONFIDENCE_ORDER: CausalConfidence[] = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7'];

function getConfidenceRank(level: CausalConfidence | undefined): number {
  if (!level) return 999;
  return CONFIDENCE_ORDER.indexOf(level);
}

function getBestConfidence(levels: (CausalConfidence | undefined)[]): CausalConfidence | undefined {
  const validLevels = levels.filter((l): l is CausalConfidence => l !== undefined);
  if (validLevels.length === 0) return undefined;
  return validLevels.reduce((best, curr) =>
    getConfidenceRank(curr) < getConfidenceRank(best) ? curr : best
  );
}

function getWorstConfidence(levels: (CausalConfidence | undefined)[]): CausalConfidence | undefined {
  const validLevels = levels.filter((l): l is CausalConfidence => l !== undefined);
  if (validLevels.length === 0) return undefined;
  return validLevels.reduce((worst, curr) =>
    getConfidenceRank(curr) > getConfidenceRank(worst) ? curr : worst
  );
}

function isStrongEvidence(level: CausalConfidence | undefined): boolean {
  return level === 'L1' || level === 'L2' || level === 'L3';
}

function isModerateEvidence(level: CausalConfidence | undefined): boolean {
  return level === 'L4' || level === 'L5';
}

function isWeakEvidence(level: CausalConfidence | undefined): boolean {
  return level === 'L6' || level === 'L7';
}

// ============================================================================
// EDGE ANALYSIS
// ============================================================================

function analyzeEdge(edge: MechanisticEdge): EdgeSummary {
  const evidenceLevels = edge.evidence?.map(e => e.causalConfidence) || [];
  const hasPmid = edge.evidence?.some(e => e.pmid !== undefined) || false;

  return {
    id: edge.id,
    source: edge.source,
    target: edge.target,
    moduleId: edge.moduleId,
    relation: edge.relation,
    edgeConfidence: edge.causalConfidence,
    evidenceCount: edge.evidence?.length || 0,
    bestEvidence: getBestConfidence(evidenceLevels),
    worstEvidence: getWorstConfidence(evidenceLevels),
    hasPmid,
    keyInsight: edge.keyInsight,
  };
}

function stratifyEdges(edges: MechanisticEdge[]): StratifiedEdges {
  const result: StratifiedEdges = {
    strong: [],
    moderate: [],
    weak: [],
    noEvidence: [],
    mixed: [],
  };

  for (const edge of edges) {
    const evidenceLevels = edge.evidence?.map(e => e.causalConfidence).filter(Boolean) as CausalConfidence[] || [];

    if (evidenceLevels.length === 0) {
      result.noEvidence.push(edge);
      continue;
    }

    const hasStrong = evidenceLevels.some(isStrongEvidence);
    const hasModerate = evidenceLevels.some(isModerateEvidence);
    const hasWeak = evidenceLevels.some(isWeakEvidence);

    // Mixed if has both strong and weak
    if (hasStrong && hasWeak) {
      result.mixed.push(edge);
    } else if (hasStrong) {
      result.strong.push(edge);
    } else if (hasModerate) {
      result.moderate.push(edge);
    } else {
      result.weak.push(edge);
    }
  }

  return result;
}

// ============================================================================
// OUTPUT FORMATTERS
// ============================================================================

function printMarkdownTable(edges: MechanisticEdge[], title: string) {
  if (edges.length === 0) {
    console.log(`\n### ${title}\n\n*No edges in this category*\n`);
    return;
  }

  console.log(`\n### ${title} (${edges.length} edges)\n`);
  console.log('| ID | Source → Target | Module | Evidence | Best | PMID? | Key Insight |');
  console.log('|----|-----------------|--------|----------|------|-------|-------------|');

  for (const edge of edges) {
    const summary = analyzeEdge(edge);
    const connection = `${summary.source} → ${summary.target}`;
    const truncatedInsight = summary.keyInsight
      ? summary.keyInsight.substring(0, 40) + (summary.keyInsight.length > 40 ? '...' : '')
      : '-';

    console.log(
      `| ${summary.id} | ${connection.substring(0, 30)} | ${summary.moduleId} | ${summary.evidenceCount} | ${summary.bestEvidence || '-'} | ${summary.hasPmid ? '✓' : '✗'} | ${truncatedInsight} |`
    );
  }
}

function printSummaryStats(stratified: StratifiedEdges, moduleFilter?: string) {
  const total = allEdges.length;
  const filtered = moduleFilter
    ? allEdges.filter(e => e.moduleId === moduleFilter).length
    : total;

  console.log('# Edge Stratification by Evidence Quality\n');
  console.log(`Generated: ${new Date().toISOString()}\n`);
  if (moduleFilter) {
    console.log(`**Module Filter:** ${moduleFilter}\n`);
  }

  console.log('## Summary Statistics\n');
  console.log('| Category | Count | % of Total | Description |');
  console.log('|----------|-------|------------|-------------|');
  console.log(`| **Strong (L1-L3)** | ${stratified.strong.length} | ${((stratified.strong.length / filtered) * 100).toFixed(1)}% | RCTs, Mendelian, GWAS+KO |`);
  console.log(`| **Moderate (L4-L5)** | ${stratified.moderate.length} | ${((stratified.moderate.length / filtered) * 100).toFixed(1)}% | Animal intervention, in vitro |`);
  console.log(`| **Weak (L6-L7)** | ${stratified.weak.length} | ${((stratified.weak.length / filtered) * 100).toFixed(1)}% | Observational, expert opinion |`);
  console.log(`| **No Evidence** | ${stratified.noEvidence.length} | ${((stratified.noEvidence.length / filtered) * 100).toFixed(1)}% | Missing citations |`);
  console.log(`| **Mixed** | ${stratified.mixed.length} | ${((stratified.mixed.length / filtered) * 100).toFixed(1)}% | Both strong and weak |`);
  console.log(`| **Total** | ${filtered} | 100% | |`);

  // Quality score
  const qualityScore =
    (stratified.strong.length * 3 + stratified.moderate.length * 2 + stratified.weak.length * 1) /
    (filtered * 3);
  console.log(`\n**Evidence Quality Score:** ${(qualityScore * 100).toFixed(1)}% (100% = all L1-L3)\n`);
}

function printModuleBreakdown(edges: MechanisticEdge[]) {
  console.log('\n## Evidence by Module\n');
  console.log('| Module | Total | Strong | Moderate | Weak | No Evidence | Quality % |');
  console.log('|--------|-------|--------|----------|------|-------------|-----------|');

  const moduleIds = [...new Set(edges.map(e => e.moduleId))].sort();

  for (const moduleId of moduleIds) {
    const moduleEdges = edges.filter(e => e.moduleId === moduleId);
    const stratified = stratifyEdges(moduleEdges);
    const total = moduleEdges.length;
    const quality =
      ((stratified.strong.length * 3 + stratified.moderate.length * 2 + stratified.weak.length * 1) /
        (total * 3) * 100).toFixed(0);

    const moduleName = modules.find(m => m.id === moduleId)?.name || moduleId;
    const truncatedName = moduleName.substring(0, 25) + (moduleName.length > 25 ? '...' : '');

    console.log(
      `| ${moduleId}: ${truncatedName} | ${total} | ${stratified.strong.length} | ${stratified.moderate.length} | ${stratified.weak.length} | ${stratified.noEvidence.length} | ${quality}% |`
    );
  }
}

function printPriorityUpgrades(stratified: StratifiedEdges) {
  console.log('\n## Priority: Edges Needing Evidence Upgrade\n');
  console.log('These edges have weak/no evidence but are likely important (have keyInsight):\n');

  const needsUpgrade = [...stratified.weak, ...stratified.noEvidence]
    .filter(e => e.keyInsight)
    .sort((a, b) => (a.keyInsight?.length || 0) > (b.keyInsight?.length || 0) ? -1 : 1)
    .slice(0, 20);

  if (needsUpgrade.length === 0) {
    console.log('*No weak edges with key insights found*\n');
    return;
  }

  console.log('| ID | Connection | Current | Key Insight |');
  console.log('|----|------------|---------|-------------|');

  for (const edge of needsUpgrade) {
    const summary = analyzeEdge(edge);
    const insight = edge.keyInsight?.substring(0, 50) + (edge.keyInsight && edge.keyInsight.length > 50 ? '...' : '');
    console.log(
      `| ${edge.id} | ${edge.source} → ${edge.target} | ${summary.bestEvidence || 'NONE'} | ${insight} |`
    );
  }
}

function printMissingPmids(stratified: StratifiedEdges) {
  console.log('\n## Edges Missing PMIDs\n');
  console.log('These edges have evidence but no PMID (harder to verify):\n');

  const missingPmid = allEdges.filter(e =>
    e.evidence &&
    e.evidence.length > 0 &&
    !e.evidence.some(ev => ev.pmid)
  );

  if (missingPmid.length === 0) {
    console.log('*All edges with evidence have PMIDs* ✓\n');
    return;
  }

  console.log(`Found ${missingPmid.length} edges with evidence but no PMID:\n`);
  console.log('| ID | Module | First Author | Year |');
  console.log('|----|--------|--------------|------|');

  for (const edge of missingPmid.slice(0, 30)) {
    const firstEvidence = edge.evidence?.[0];
    console.log(
      `| ${edge.id} | ${edge.moduleId} | ${firstEvidence?.firstAuthor || '-'} | ${firstEvidence?.year || '-'} |`
    );
  }

  if (missingPmid.length > 30) {
    console.log(`\n*...and ${missingPmid.length - 30} more*`);
  }
}

// ============================================================================
// CLI
// ============================================================================

function parseCliArgs() {
  const args = process.argv.slice(2);
  return {
    module: args.find(a => a.startsWith('--module='))?.split('=')[1],
    weakOnly: args.includes('--weak-only'),
    strongOnly: args.includes('--strong-only'),
    json: args.includes('--json'),
    help: args.includes('--help') || args.includes('-h'),
  };
}

function showHelp() {
  console.log(`
Edge Stratification by Evidence Quality

Analyzes edges by causal confidence level to identify evidence gaps.

Usage:
  npx tsx scripts/stratify-edges-by-evidence.ts [options]

Options:
  --module=M19      Filter to specific module
  --weak-only       Only show weak/no evidence edges
  --strong-only     Only show strong evidence edges
  --json            Output as JSON instead of markdown
  --help, -h        Show this help

Evidence Levels:
  L1: Human RCT (strongest)
  L2: Mendelian randomization
  L3: GWAS + animal knockout
  L4: Animal intervention
  L5: In vitro / cell culture
  L6: Observational / correlation
  L7: Expert opinion (weakest)
`);
}

function main() {
  const args = parseCliArgs();

  if (args.help) {
    showHelp();
    process.exit(0);
  }

  // Filter edges if module specified
  let edges = allEdges;
  if (args.module) {
    edges = allEdges.filter(e => e.moduleId === args.module);
    if (edges.length === 0) {
      console.error(`No edges found for module: ${args.module}`);
      process.exit(1);
    }
  }

  const stratified = stratifyEdges(edges);

  if (args.json) {
    const output = {
      generated: new Date().toISOString(),
      moduleFilter: args.module || null,
      summary: {
        strong: stratified.strong.length,
        moderate: stratified.moderate.length,
        weak: stratified.weak.length,
        noEvidence: stratified.noEvidence.length,
        mixed: stratified.mixed.length,
        total: edges.length,
      },
      edges: {
        strong: stratified.strong.map(analyzeEdge),
        moderate: stratified.moderate.map(analyzeEdge),
        weak: stratified.weak.map(analyzeEdge),
        noEvidence: stratified.noEvidence.map(analyzeEdge),
        mixed: stratified.mixed.map(analyzeEdge),
      },
    };
    console.log(JSON.stringify(output, null, 2));
    return;
  }

  // Print markdown report
  printSummaryStats(stratified, args.module);
  printModuleBreakdown(edges);

  if (args.weakOnly) {
    printMarkdownTable(stratified.weak, 'Weak Evidence (L6-L7)');
    printMarkdownTable(stratified.noEvidence, 'No Evidence');
  } else if (args.strongOnly) {
    printMarkdownTable(stratified.strong, 'Strong Evidence (L1-L3)');
  } else {
    printPriorityUpgrades(stratified);
    printMissingPmids(stratified);

    // Detailed tables
    console.log('\n---\n');
    console.log('## Detailed Edge Lists\n');
    printMarkdownTable(stratified.strong, 'Strong Evidence (L1-L3)');
    printMarkdownTable(stratified.moderate, 'Moderate Evidence (L4-L5)');
    printMarkdownTable(stratified.weak, 'Weak Evidence (L6-L7)');
    printMarkdownTable(stratified.noEvidence, 'No Evidence');
    printMarkdownTable(stratified.mixed, 'Mixed Evidence');
  }
}

main();
