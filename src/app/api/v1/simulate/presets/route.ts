/**
 * GET /api/v1/simulate/presets
 *
 * Returns pre-built simulation scenario presets for common use cases.
 *
 * Query parameters:
 * - tag: Filter presets by tag
 */

import { NextRequest } from 'next/server';
import { success } from '@/lib/api/response';
import {
  scenarioPresets,
  getScenarioPresetsByTag,
  getAllPresetTags,
} from '@/lib/simulation/presets';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get('tag');

  // Filter by tag if provided
  const presets = tag
    ? getScenarioPresetsByTag(tag)
    : scenarioPresets;

  return success({
    presets: presets.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      tags: p.tags,
      suggestedTreatments: p.suggestedTreatments,
      scenario: {
        age: p.scenario.age,
        sex: p.scenario.sex,
        apoeGenotype: p.scenario.apoeGenotype,
        diseaseStage: p.scenario.diseaseStage,
        hasOverrides: !!p.scenario.nodeOverrides,
      },
    })),
    availableTags: getAllPresetTags(),
    total: presets.length,
  });
}
