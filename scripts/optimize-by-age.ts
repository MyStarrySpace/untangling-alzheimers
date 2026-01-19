/**
 * CLI Script: Age-Based Treatment Optimizer
 *
 * Optimizes treatment recommendations based on patient age, considering:
 * - Disease stage likelihood at given age
 * - Intervention window alignment (prevention vs treatment)
 * - Age-activated pathways in the network
 * - Risk factor weighting
 *
 * Usage:
 *   npx tsx scripts/optimize-by-age.ts [age]
 *   npx tsx scripts/optimize-by-age.ts 55
 *   npx tsx scripts/optimize-by-age.ts 55 75   # age range
 *   npm run optimize-age -- 65
 */

import { allNodes } from '../src/data/mechanisticFramework/nodes';
import { allEdges } from '../src/data/mechanisticFramework/edges';
import { modules } from '../src/data/mechanisticFramework/modules';
import { feedbackLoops } from '../src/data/mechanisticFramework/feedbackLoops';
import {
  treatmentLibrary,
  type TreatmentLibraryEntry,
} from '../src/data/mechanisticFramework/drugLibrary';
import {
  calculateDrugPathway,
  getPathwayStats,
  buildAdjacencyLists,
} from '../src/lib/pathwayCalculation';

// ============================================================================
// TYPES
// ============================================================================

interface AgeProfile {
  age: number;
  ageGroup: 'under_65' | '65_74' | '75_84' | '85_plus';
  riskMultiplier: number;
  prevalence: number;
  likelyStage: 'preclinical' | 'early_mci' | 'late_mci' | 'dementia';
  stageDistribution: {
    preclinical: number;
    early_mci: number;
    late_mci: number;
    dementia: number;
  };
  primaryConcerns: string[];
  interventionFocus: 'prevention' | 'early_treatment' | 'treatment' | 'management';
}

interface PathwayRelevance {
  moduleId: string;
  moduleName: string;
  relevanceScore: number;
  reason: string;
  interventionWindow: string;
}

interface TreatmentRecommendation {
  treatment: TreatmentLibraryEntry;
  ageScore: number;
  baseScore: number;
  pathwayMatch: number;
  timingBonus: number;
  loopBreakBonus: number;
  costEfficiency: number;
  reasons: string[];
  warnings: string[];
}

// ============================================================================
// AGE PROFILE CALCULATOR
// ============================================================================

function calculateAgeProfile(age: number): AgeProfile {
  // AD prevalence and risk by age (based on epidemiological data)
  let ageGroup: AgeProfile['ageGroup'];
  let riskMultiplier: number;
  let prevalence: number;
  let likelyStage: AgeProfile['likelyStage'];
  let stageDistribution: AgeProfile['stageDistribution'];
  let primaryConcerns: string[];
  let interventionFocus: AgeProfile['interventionFocus'];

  if (age < 65) {
    ageGroup = 'under_65';
    riskMultiplier = 0.3;
    prevalence = 0.02; // ~2% for early-onset
    likelyStage = 'preclinical';
    stageDistribution = { preclinical: 0.85, early_mci: 0.10, late_mci: 0.03, dementia: 0.02 };
    primaryConcerns = [
      'Genetic risk factors (APOE4, familial mutations)',
      'Metabolic dysfunction (insulin resistance, mTOR)',
      'Early lysosomal/mitochondrial changes',
      'Building cognitive reserve',
    ];
    interventionFocus = 'prevention';
  } else if (age < 75) {
    ageGroup = '65_74';
    riskMultiplier = 1.0;
    prevalence = 0.05; // ~5%
    likelyStage = 'preclinical';
    stageDistribution = { preclinical: 0.70, early_mci: 0.18, late_mci: 0.07, dementia: 0.05 };
    primaryConcerns = [
      'Emerging neuroinflammation',
      'C1q/complement activation beginning',
      'Glymphatic decline starting',
      'Metabolic pathways still modifiable',
    ];
    interventionFocus = 'prevention';
  } else if (age < 85) {
    ageGroup = '75_84';
    riskMultiplier = 3.0;
    prevalence = 0.15; // ~15%
    likelyStage = 'early_mci';
    stageDistribution = { preclinical: 0.45, early_mci: 0.25, late_mci: 0.15, dementia: 0.15 };
    primaryConcerns = [
      'Active neuroinflammation (NLRP3, cGAS-STING)',
      'Iron accumulation and ferroptosis risk',
      'Synaptic pruning via complement',
      'Tau pathology spreading',
      'BBB breakdown accelerating',
    ];
    interventionFocus = 'early_treatment';
  } else {
    ageGroup = '85_plus';
    riskMultiplier = 8.0;
    prevalence = 0.35; // ~35%
    likelyStage = 'late_mci';
    stageDistribution = { preclinical: 0.20, early_mci: 0.15, late_mci: 0.25, dementia: 0.40 };
    primaryConcerns = [
      'Widespread neuropathology',
      'Multiple feedback loops active',
      'Neurodegeneration ongoing',
      'Quality of life preservation',
      'Comorbidity management',
    ];
    interventionFocus = 'treatment';
  }

  return {
    age,
    ageGroup,
    riskMultiplier,
    prevalence,
    likelyStage,
    stageDistribution,
    primaryConcerns,
    interventionFocus,
  };
}

// ============================================================================
// PATHWAY RELEVANCE BY AGE
// ============================================================================

function calculatePathwayRelevance(profile: AgeProfile): PathwayRelevance[] {
  const relevance: PathwayRelevance[] = [];

  // Module relevance weights by intervention focus
  const moduleRelevance: Record<string, Record<string, number>> = {
    prevention: {
      M01: 1.0,  // mTOR/Autophagy - highly modifiable early
      M02: 0.9,  // Lysosomal - early intervention critical
      M03: 0.9,  // Mitochondrial - early
      M04: 0.7,  // Inflammasome - emerging
      M05: 0.6,  // Microglia - early activation
      M06: 0.5,  // Amyloid - prevent accumulation
      M07: 0.4,  // Tau - prevent seeding
      M08: 0.8,  // Complement - C1q rising
      M09: 0.6,  // Iron - prevent accumulation
      M10: 1.0,  // APOE4/REST - genetic modulation
      M11: 0.7,  // TREM2/DAM - preserve function
      M12: 0.9,  // BBB/Glymphatic - preserve
      M14: 0.8,  // MAM/Calcium - early
      M18: 0.9,  // Endfoot Integrity - earliest biomarker
    },
    early_treatment: {
      M01: 0.8,
      M02: 0.9,
      M03: 0.8,
      M04: 1.0,  // Inflammasome - active target
      M05: 0.9,  // Microglia - intervention point
      M06: 0.8,  // Amyloid - clearance needed
      M07: 0.9,  // Tau - spreading
      M08: 1.0,  // Complement - active pruning
      M09: 0.9,  // Iron - accumulating
      M10: 0.7,
      M11: 0.9,  // TREM2 - modifiable
      M12: 0.8,
      M14: 0.7,
      M18: 0.8,
    },
    treatment: {
      M01: 0.5,
      M02: 0.6,
      M03: 0.6,
      M04: 0.9,  // Inflammasome - reduce damage
      M05: 0.8,
      M06: 0.7,  // Amyloid - some benefit
      M07: 1.0,  // Tau - primary target
      M08: 0.7,
      M09: 1.0,  // Iron/Ferroptosis - prevent death
      M10: 0.5,
      M11: 0.6,
      M12: 0.6,
      M13: 1.0,  // Cholinergic - symptomatic
      M14: 0.5,
      M18: 0.6,
    },
    management: {
      M01: 0.3,
      M04: 0.7,
      M07: 0.8,
      M09: 0.9,
      M13: 1.0,  // Cholinergic - symptomatic relief
    },
  };

  const weights = moduleRelevance[profile.interventionFocus] || moduleRelevance.treatment;

  modules.forEach(mod => {
    const score = weights[mod.id] || 0.5;
    let reason = '';

    if (score >= 0.9) {
      reason = `Critical intervention target at age ${profile.age}`;
    } else if (score >= 0.7) {
      reason = `Important pathway at this disease stage`;
    } else if (score >= 0.5) {
      reason = `Moderately relevant`;
    } else {
      reason = `Lower priority at this stage`;
    }

    relevance.push({
      moduleId: mod.id,
      moduleName: mod.shortName,
      relevanceScore: score,
      reason,
      interventionWindow: mod.interventionWindow || 'treatment',
    });
  });

  return relevance.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

// ============================================================================
// TREATMENT OPTIMIZER
// ============================================================================

const adjacency = buildAdjacencyLists(allNodes, allEdges);
const nodeMap = new Map(allNodes.map(n => [n.id, n]));

// Find aging-related edges
const agingEdges = allEdges.filter(e => e.source === 'aging');
const agingTargets = new Set(agingEdges.map(e => e.target));

function optimizeTreatment(
  treatment: TreatmentLibraryEntry,
  profile: AgeProfile,
  pathwayRelevance: Map<string, number>
): TreatmentRecommendation {
  const pathway = calculateDrugPathway(treatment, allNodes, allEdges, feedbackLoops, 5);
  const stats = getPathwayStats(pathway);

  const reasons: string[] = [];
  const warnings: string[] = [];

  // Base score from network coverage
  const baseScore = (pathway.upstreamNodes.length + pathway.targetNodes.length + pathway.downstreamNodes.length) / allNodes.length * 100;

  // Pathway match: how well does this treatment target age-relevant modules?
  let pathwayMatch = 0;
  pathway.affectedModules.forEach(modId => {
    const relevance = pathwayRelevance.get(modId) || 0.5;
    pathwayMatch += relevance;
  });
  pathwayMatch = pathwayMatch / Math.max(pathway.affectedModules.length, 1) * 100;

  // Timing bonus: does intervention window match?
  let timingBonus = 0;
  const targetModules = pathway.affectedModules
    .map(id => modules.find(m => m.id === id))
    .filter(m => m !== undefined);

  const windowMatch = targetModules.filter(m =>
    m?.interventionWindow === profile.interventionFocus ||
    (profile.interventionFocus === 'prevention' && m?.interventionWindow === 'early_treatment') ||
    (profile.interventionFocus === 'early_treatment' && ['prevention', 'treatment'].includes(m?.interventionWindow || ''))
  ).length;

  timingBonus = (windowMatch / Math.max(targetModules.length, 1)) * 30;

  if (timingBonus > 20) {
    reasons.push(`Excellent timing match for ${profile.interventionFocus} stage`);
  }

  // Loop break bonus (more valuable as disease progresses)
  const loopBreakMultiplier = profile.interventionFocus === 'prevention' ? 1.5 :
                             profile.interventionFocus === 'early_treatment' ? 2.0 :
                             profile.interventionFocus === 'treatment' ? 2.5 : 3.0;

  const loopBreakBonus = stats.loopsBreaking * 10 * loopBreakMultiplier;

  if (stats.loopsBreaking > 0) {
    const brokenLoops = pathway.relevantLoops
      .filter(l => l.involvement === 'breaks')
      .map(l => feedbackLoops.find(fl => fl.id === l.loopId)?.name || l.loopId);
    reasons.push(`Breaks ${stats.loopsBreaking} vicious cycle(s): ${brokenLoops.join(', ')}`);
  }

  // Does treatment target aging-specific pathways?
  const targetsAgingPathway = pathway.downstreamNodes.some(n => agingTargets.has(n)) ||
                             pathway.targetNodes.some(n => agingTargets.has(n));
  if (targetsAgingPathway) {
    reasons.push('Targets age-activated pathways');
    pathwayMatch += 10;
  }

  // Cost efficiency (weighted by age - older patients may have different considerations)
  let costEfficiency = 0;
  if (treatment.annualCost !== undefined && treatment.annualCost > 0) {
    const baseEfficiency = baseScore / (treatment.annualCost / 1000);
    costEfficiency = Math.min(baseEfficiency * 10, 30); // Cap at 30
  } else if (treatment.availability === 'free' || treatment.type === 'lifestyle') {
    costEfficiency = 25; // Free interventions get bonus
    reasons.push('No cost / lifestyle intervention');
  }

  // Warnings
  if (treatment.fdaStatus === 'preclinical' || treatment.fdaStatus === 'phase1') {
    warnings.push('Not yet clinically available');
  }

  if (profile.age >= 85 && treatment.type === 'antibody') {
    warnings.push('ARIA risk may be elevated in advanced age');
  }

  if (profile.interventionFocus === 'management' && stats.loopsBreaking === 0) {
    warnings.push('Disease-modifying effect may be limited at this stage');
  }

  // Check evidence level
  if (['L6', 'L7'].includes(treatment.adEvidence.level)) {
    warnings.push(`Limited evidence (${treatment.adEvidence.level})`);
  }

  // Calculate final age-adjusted score
  const ageScore = baseScore * 0.3 + pathwayMatch * 0.3 + timingBonus * 0.2 + loopBreakBonus * 0.15 + costEfficiency * 0.05;

  return {
    treatment,
    ageScore,
    baseScore,
    pathwayMatch,
    timingBonus,
    loopBreakBonus,
    costEfficiency,
    reasons,
    warnings,
  };
}

// ============================================================================
// MAIN
// ============================================================================

// Parse command line args
const args = process.argv.slice(2);
let ages: number[] = [];

if (args.length === 0) {
  // Default: show multiple age profiles
  ages = [45, 55, 65, 75, 85];
} else if (args.length === 1) {
  ages = [parseInt(args[0], 10)];
} else {
  // Range
  const start = parseInt(args[0], 10);
  const end = parseInt(args[1], 10);
  for (let a = start; a <= end; a += 10) {
    ages.push(a);
  }
}

console.log('');
console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     AGE-BASED TREATMENT OPTIMIZER                              ║');
console.log('║     Personalized AD Prevention & Treatment Recommendations     ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');

ages.forEach(age => {
  console.log('');
  console.log('████████████████████████████████████████████████████████████████');
  console.log(`█  AGE: ${age} YEARS`);
  console.log('████████████████████████████████████████████████████████████████');
  console.log('');

  const profile = calculateAgeProfile(age);
  const pathwayRelevance = calculatePathwayRelevance(profile);
  const relevanceMap = new Map(pathwayRelevance.map(p => [p.moduleId, p.relevanceScore]));

  // ============================================================================
  // AGE PROFILE
  // ============================================================================

  console.log('════════════════════════════════════════════════════════════════');
  console.log('RISK PROFILE');
  console.log('════════════════════════════════════════════════════════════════');
  console.log('');
  console.log(`  Age Group: ${profile.ageGroup.replace('_', '-')}`);
  console.log(`  AD Risk Multiplier: ${profile.riskMultiplier}x baseline`);
  console.log(`  Population Prevalence: ${(profile.prevalence * 100).toFixed(0)}%`);
  console.log(`  Most Likely Stage: ${profile.likelyStage.replace('_', ' ')}`);
  console.log(`  Intervention Focus: ${profile.interventionFocus.replace('_', ' ').toUpperCase()}`);
  console.log('');

  console.log('  Stage Distribution at This Age:');
  console.log(`    Preclinical:  ${'█'.repeat(Math.round(profile.stageDistribution.preclinical * 20))} ${(profile.stageDistribution.preclinical * 100).toFixed(0)}%`);
  console.log(`    Early MCI:    ${'█'.repeat(Math.round(profile.stageDistribution.early_mci * 20))} ${(profile.stageDistribution.early_mci * 100).toFixed(0)}%`);
  console.log(`    Late MCI:     ${'█'.repeat(Math.round(profile.stageDistribution.late_mci * 20))} ${(profile.stageDistribution.late_mci * 100).toFixed(0)}%`);
  console.log(`    Dementia:     ${'█'.repeat(Math.round(profile.stageDistribution.dementia * 20))} ${(profile.stageDistribution.dementia * 100).toFixed(0)}%`);
  console.log('');

  console.log('  Primary Concerns at This Age:');
  profile.primaryConcerns.forEach(concern => {
    console.log(`    • ${concern}`);
  });
  console.log('');

  // ============================================================================
  // PRIORITY PATHWAYS
  // ============================================================================

  console.log('════════════════════════════════════════════════════════════════');
  console.log('PRIORITY PATHWAYS TO TARGET');
  console.log('════════════════════════════════════════════════════════════════');
  console.log('');

  pathwayRelevance.slice(0, 8).forEach((pw, i) => {
    const bar = '█'.repeat(Math.round(pw.relevanceScore * 10));
    const space = ' '.repeat(10 - Math.round(pw.relevanceScore * 10));
    console.log(`  ${i + 1}. ${pw.moduleName.padEnd(20)} ${bar}${space} ${(pw.relevanceScore * 100).toFixed(0)}%`);
    console.log(`     ${pw.reason}`);
  });
  console.log('');

  // ============================================================================
  // OPTIMIZED TREATMENT RECOMMENDATIONS
  // ============================================================================

  console.log('════════════════════════════════════════════════════════════════');
  console.log('OPTIMIZED TREATMENT RECOMMENDATIONS');
  console.log('════════════════════════════════════════════════════════════════');
  console.log('');

  const recommendations = treatmentLibrary
    .map(t => optimizeTreatment(t, profile, relevanceMap))
    .sort((a, b) => b.ageScore - a.ageScore);

  // Top recommendations
  console.log('TOP 10 TREATMENTS FOR THIS AGE:');
  console.log('');

  recommendations.slice(0, 10).forEach((rec, i) => {
    const status = rec.treatment.fdaStatus === 'approved' ? '✓ APPROVED' :
                   rec.treatment.fdaStatus === 'phase3' ? '◐ Phase 3' :
                   rec.treatment.fdaStatus === 'lifestyle' ? '♥ Lifestyle' :
                   rec.treatment.fdaStatus;

    console.log(`${(i + 1).toString().padStart(2)}. ${rec.treatment.name}`);
    console.log(`    Age-Optimized Score: ${rec.ageScore.toFixed(1)} | ${status}`);
    console.log(`    Components: Coverage ${rec.baseScore.toFixed(0)}% + Pathway ${rec.pathwayMatch.toFixed(0)}% + Timing ${rec.timingBonus.toFixed(0)} + Loops ${rec.loopBreakBonus.toFixed(0)}`);

    if (rec.reasons.length > 0) {
      console.log(`    Why: ${rec.reasons[0]}`);
      rec.reasons.slice(1).forEach(r => console.log(`          ${r}`));
    }

    if (rec.warnings.length > 0) {
      console.log(`    ⚠️  ${rec.warnings.join('; ')}`);
    }

    if (rec.treatment.annualCost !== undefined) {
      console.log(`    Cost: $${rec.treatment.annualCost.toLocaleString()}/year`);
    }
    console.log('');
  });

  // ============================================================================
  // RECOMMENDED PROTOCOL
  // ============================================================================

  console.log('════════════════════════════════════════════════════════════════');
  console.log('RECOMMENDED PROTOCOL');
  console.log('════════════════════════════════════════════════════════════════');
  console.log('');

  // Select best from different categories
  const approvedDrugs = recommendations.filter(r =>
    r.treatment.fdaStatus === 'approved' && r.treatment.type === 'small_molecule'
  ).slice(0, 2);

  const lifestyle = recommendations.filter(r =>
    r.treatment.type === 'lifestyle' || r.treatment.type === 'device'
  ).slice(0, 2);

  const supplements = recommendations.filter(r =>
    r.treatment.availability === 'supplement' || r.treatment.type === 'supplement'
  ).slice(0, 2);

  const loopBreakers = recommendations.filter(r => r.loopBreakBonus > 0).slice(0, 2);

  console.log('TIER 1 - Foundation (Lifestyle):');
  lifestyle.forEach(r => {
    console.log(`  • ${r.treatment.name} - ${r.reasons[0] || 'High network impact'}`);
  });
  console.log('');

  if (approvedDrugs.length > 0) {
    console.log('TIER 2 - Approved Medications:');
    approvedDrugs.forEach(r => {
      console.log(`  • ${r.treatment.name} - ${r.reasons[0] || 'Good pathway match'}`);
    });
    console.log('');
  }

  if (supplements.length > 0) {
    console.log('TIER 3 - Supplements (Evidence Varies):');
    supplements.forEach(r => {
      console.log(`  • ${r.treatment.name} - ${r.reasons[0] || 'Supportive evidence'}`);
      if (r.warnings.length > 0) console.log(`    ⚠️  ${r.warnings[0]}`);
    });
    console.log('');
  }

  if (loopBreakers.length > 0) {
    console.log('TIER 4 - Vicious Cycle Breakers (Consider):');
    loopBreakers.forEach(r => {
      console.log(`  • ${r.treatment.name} - Breaks ${r.loopBreakBonus / 10} feedback loop(s)`);
    });
    console.log('');
  }

  // Cost estimate
  const protocolTreatments = [...lifestyle.slice(0, 1), ...approvedDrugs.slice(0, 1), ...supplements.slice(0, 1)];
  const totalCost = protocolTreatments.reduce((sum, r) => sum + (r.treatment.annualCost || 0), 0);

  console.log(`Estimated Protocol Cost: $${totalCost.toLocaleString()}/year`);
  console.log('');

  // ============================================================================
  // AGE-SPECIFIC WARNINGS
  // ============================================================================

  console.log('════════════════════════════════════════════════════════════════');
  console.log('AGE-SPECIFIC CONSIDERATIONS');
  console.log('════════════════════════════════════════════════════════════════');
  console.log('');

  if (age < 50) {
    console.log('• Consider genetic testing for APOE4 and familial mutations');
    console.log('• Focus on metabolic health (insulin sensitivity, mTOR)');
    console.log('• Maximize cognitive reserve through education and activity');
    console.log('• Sleep optimization is critical at this age');
  } else if (age < 65) {
    console.log('• Monitor for early biomarkers (GFAP, p-tau)');
    console.log('• Cardiovascular health strongly linked to brain health');
    console.log('• Consider baseline cognitive testing for future comparison');
    console.log('• Glymphatic function still highly modifiable');
  } else if (age < 75) {
    console.log('• Regular cognitive monitoring recommended');
    console.log('• Neuroinflammation becoming more prominent');
    console.log('• ARIA risk with anti-amyloid antibodies - consider alternatives');
    console.log('• Loop-breaking treatments becoming more valuable');
  } else if (age < 85) {
    console.log('• Multiple pathways likely active - multi-target approach best');
    console.log('• Balance disease modification with quality of life');
    console.log('• Ferroptosis risk increasing - monitor iron status');
    console.log('• Symptomatic treatments (cholinergics) have role');
  } else {
    console.log('• Focus on quality of life and symptom management');
    console.log('• Anti-amyloid antibodies may have limited benefit at this stage');
    console.log('• Ferroptosis prevention important for neuronal preservation');
    console.log('• Non-pharmacological interventions remain valuable');
    console.log('• Caregiver support is crucial');
  }
  console.log('');
});

// ============================================================================
// CROSS-AGE COMPARISON (if multiple ages)
// ============================================================================

if (ages.length > 1) {
  console.log('');
  console.log('████████████████████████████████████████████████████████████████');
  console.log('█  CROSS-AGE COMPARISON');
  console.log('████████████████████████████████████████████████████████████████');
  console.log('');

  console.log('How Top Treatments Rank Across Ages:');
  console.log('');

  // Get top 5 treatments overall
  const allRecs = new Map<string, Map<number, number>>();

  ages.forEach(age => {
    const profile = calculateAgeProfile(age);
    const pathwayRelevance = calculatePathwayRelevance(profile);
    const relevanceMap = new Map(pathwayRelevance.map(p => [p.moduleId, p.relevanceScore]));

    const recs = treatmentLibrary
      .map(t => optimizeTreatment(t, profile, relevanceMap))
      .sort((a, b) => b.ageScore - a.ageScore);

    recs.forEach((rec, rank) => {
      if (!allRecs.has(rec.treatment.id)) {
        allRecs.set(rec.treatment.id, new Map());
      }
      allRecs.get(rec.treatment.id)!.set(age, rank + 1);
    });
  });

  // Find treatments that are consistently top-ranked
  const avgRanks = Array.from(allRecs.entries()).map(([id, ranks]) => {
    const avgRank = Array.from(ranks.values()).reduce((a, b) => a + b, 0) / ranks.size;
    const treatment = treatmentLibrary.find(t => t.id === id)!;
    return { id, treatment, avgRank, ranks };
  }).sort((a, b) => a.avgRank - b.avgRank);

  console.log('Treatment'.padEnd(30) + ages.map(a => `Age ${a}`.padStart(8)).join('') + '  Avg');
  console.log('-'.repeat(30 + ages.length * 8 + 6));

  avgRanks.slice(0, 10).forEach(({ treatment, avgRank, ranks }) => {
    const name = treatment.name.slice(0, 28).padEnd(30);
    const rankStr = ages.map(a => {
      const rank = ranks.get(a);
      return rank ? `#${rank}`.padStart(8) : '   -    ';
    }).join('');
    console.log(`${name}${rankStr}  ${avgRank.toFixed(1)}`);
  });

  console.log('');
  console.log('Insight: Treatments ranked consistently high across ages target');
  console.log('fundamental mechanisms. Age-variable rankings indicate stage-specific');
  console.log('interventions.');
}

console.log('');
console.log('════════════════════════════════════════════════════════════════');
console.log('OPTIMIZATION COMPLETE');
console.log('════════════════════════════════════════════════════════════════');
console.log('');
console.log('Disclaimer: This is a network-based analysis tool, not medical advice.');
console.log('Consult healthcare providers for personalized treatment decisions.');
console.log('');
