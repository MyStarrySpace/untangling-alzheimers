// Bibliography Index
// Re-exports all modular bibliography sources and combines them into a single array

export type { Source, Citation } from './types';

// Import all source arrays
import { foundationalSources } from './foundational';
import { hypothesesSources } from './hypotheses';
import { scandalSources } from './scandal';
import { trialsSources } from './trials';
import { fundingSources } from './funding';
import { treatmentsSources } from './treatments';
import { mechanismsSources } from './mechanisms';
import { geneticsSources } from './genetics';
import { drugConcernsSources } from './drugConcerns';
import { sexAncestrySources } from './sexAncestry';
import { policySources } from './policy';
import { failureCascadeSources } from './failureCascade';
import { pipelineDrugsSources } from './pipelineDrugs';
import { historicalSources } from './historical';
import { precisionMedicineSources } from './precisionMedicine';

import type { Source, Citation } from './types';

// Re-export individual source arrays for targeted imports
export {
  foundationalSources,
  hypothesesSources,
  scandalSources,
  trialsSources,
  fundingSources,
  treatmentsSources,
  mechanismsSources,
  geneticsSources,
  drugConcernsSources,
  sexAncestrySources,
  policySources,
  failureCascadeSources,
  pipelineDrugsSources,
  historicalSources,
  precisionMedicineSources,
};

// Combined bibliography array (all sources)
export const bibliography: Source[] = [
  ...foundationalSources,
  ...hypothesesSources,
  ...scandalSources,
  ...trialsSources,
  ...fundingSources,
  ...treatmentsSources,
  ...mechanismsSources,
  ...geneticsSources,
  ...drugConcernsSources,
  ...sexAncestrySources,
  ...policySources,
  ...failureCascadeSources,
  ...pipelineDrugsSources,
  ...historicalSources,
  ...precisionMedicineSources,
];

// Helper function to get citation by ID
export function getCitation(citationId: string): Citation | undefined {
  for (const source of bibliography) {
    const citation = source.citations.find(c => c.id === citationId);
    if (citation) return citation;
  }
  return undefined;
}

// Helper function to get source by ID
export function getSource(sourceId: string): Source | undefined {
  return bibliography.find(s => s.id === sourceId);
}

// Helper function to get all citations used in a specific section
export function getCitationsForSection(sectionName: string): Array<{ source: Source; citation: Citation }> {
  const results: Array<{ source: Source; citation: Citation }> = [];
  for (const source of bibliography) {
    for (const citation of source.citations) {
      if (citation.usedIn.includes(sectionName)) {
        results.push({ source, citation });
      }
    }
  }
  return results;
}

// Format citation in academic style
export function formatCitation(sourceId: string): string {
  const source = getSource(sourceId);
  if (!source) return '';

  const authorStr = source.authors.length > 2
    ? `${source.authors[0]} et al.`
    : source.authors.join(' & ');

  return `${authorStr} (${source.year})`;
}
