/**
 * GET /api/v1/analysis
 *
 * Runs comprehensive graph analysis on the AD mechanistic network.
 * Returns network insights including centrality measures, bridges,
 * chokepoints, evidence gaps, and more.
 *
 * Query params:
 * - format: 'full' | 'insights' (default: 'insights')
 *   - full: Returns all computed data
 *   - insights: Returns human-readable insight reports
 */

import { NextRequest } from 'next/server';
import { success } from '@/lib/api/response';
import {
  allNodes,
  allEdges,
  modules,
  feedbackLoops,
} from '@/data/mechanisticFramework';
import {
  analyzeNetwork,
  generateInsightReports,
} from '@/lib/graphAnalysis';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const format = url.searchParams.get('format') || 'insights';

  // Run full network analysis
  const insights = analyzeNetwork(allNodes, allEdges, modules, feedbackLoops);

  if (format === 'full') {
    return success(insights);
  }

  // Generate human-readable insights
  const reports = generateInsightReports(insights);

  return success({
    summary: insights.summary,
    insights: reports,
    topFindings: {
      mostConnectedNode: insights.hubNodes[0]?.label,
      biggestBridge: insights.bridgeNodes[0]?.label,
      criticalChokepoint: insights.chokepoints[0]?.label,
      topNeglectedTarget: insights.neglectedTargets[0]?.label,
      biggestEvidenceGap: insights.evidenceGaps[0]?.label,
    },
  });
}
