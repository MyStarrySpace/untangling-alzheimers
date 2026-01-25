/**
 * Print all L1-L3 edges for evaluation
 */

import { mechanisticFramework } from '../src/data/mechanisticFramework';

const edges = mechanisticFramework.edges;

// Filter L1-L3 edges
const strongEdges = edges.filter(e => {
  const level = e.causalConfidence;
  return level === 'L1' || level === 'L2' || level === 'L3';
});

console.log('# L1-L3 Strong Evidence Edges');
console.log('');
console.log(`Total: ${strongEdges.length} edges`);
console.log('');

// Group by confidence level
const byLevel: Record<string, typeof strongEdges> = { L1: [], L2: [], L3: [] };
strongEdges.forEach(e => {
  if (e.causalConfidence) {
    byLevel[e.causalConfidence].push(e);
  }
});

const levelDescriptions: Record<string, string> = {
  L1: 'RCT with clinical endpoints',
  L2: 'Mendelian randomization, natural experiments',
  L3: 'GWAS + functional validation, knockout studies',
};

for (const level of ['L1', 'L2', 'L3']) {
  const levelEdges = byLevel[level];
  console.log(`## ${level}: ${levelDescriptions[level]} (${levelEdges.length} edges)`);
  console.log('');

  levelEdges.forEach(e => {
    const evidence = e.evidence?.[0];
    const citation = evidence ? `${evidence.firstAuthor} ${evidence.year}` : 'No citation';
    const method = evidence?.methodType || 'unknown';
    const module = e.moduleId;

    console.log(`### ${e.id} [${module}]`);
    console.log(`**${e.source}** → **${e.target}** (${e.relation})`);
    console.log('');
    console.log(`- Citation: ${citation}`);
    console.log(`- Method: ${method}`);
    if (e.mechanismDescription) {
      console.log(`- Mechanism: ${e.mechanismDescription.slice(0, 150)}${e.mechanismDescription.length > 150 ? '...' : ''}`);
    }
    if (e.keyInsight) {
      console.log(`- **Key Insight**: ${e.keyInsight}`);
    }
    console.log('');
  });
}

// Also print as connected chains
console.log('---');
console.log('');
console.log('# Connected Pathways in L1-L3 Network');
console.log('');

// Build adjacency list
const adj: Record<string, string[]> = {};
const nodes = new Set<string>();

strongEdges.forEach(e => {
  nodes.add(e.source);
  nodes.add(e.target);
  if (!adj[e.source]) adj[e.source] = [];
  adj[e.source].push(e.target);
});

// Find all paths of length 2+ starting from each node
const paths: string[][] = [];

function dfs(node: string, path: string[], visited: Set<string>) {
  if (path.length >= 2) {
    paths.push([...path]);
  }
  if (path.length >= 5) return; // Limit depth

  const neighbors = adj[node] || [];
  for (const next of neighbors) {
    if (!visited.has(next)) {
      visited.add(next);
      path.push(next);
      dfs(next, path, visited);
      path.pop();
      visited.delete(next);
    }
  }
}

nodes.forEach(node => {
  const visited = new Set([node]);
  dfs(node, [node], visited);
});

// Sort by length and print unique paths
const uniquePaths = Array.from(new Set(paths.map(p => p.join(' → '))));
uniquePaths.sort((a, b) => b.split(' → ').length - a.split(' → ').length);

console.log(`Found ${uniquePaths.length} paths of length 2-5`);
console.log('');
console.log('## Longest Pathways (4+ nodes):');
console.log('');

uniquePaths.filter(p => p.split(' → ').length >= 4).forEach((p, i) => {
  console.log(`${i + 1}. ${p}`);
});

console.log('');
console.log('## All 3-node Pathways:');
console.log('');

uniquePaths.filter(p => p.split(' → ').length === 3).slice(0, 50).forEach((p, i) => {
  console.log(`${i + 1}. ${p}`);
});
