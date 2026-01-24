# Plan: Vaccine Data Updates & AS01 Generalization

**Created:** 2026-01-22
**Status:** COMPLETE
**Last Updated:** 2026-01-22

## Overview

Update vaccine-related content to:
1. Replace AS01-specific language with general "vaccination/trained immunity" framing
2. Evaluate new drugs/interventions from vaccine tracker v1.13 for inclusion

## Key Insight from Pomirchy 2026

The Pomirchy et al. 2026 Lancet Neurology study is crucial:
- Zostavax (live-attenuated, **NO adjuvant**) showed 17% dementia reduction
- This **rules out AS01-specific mechanisms** as the sole explanation
- Both adjuvanted AND non-adjuvanted vaccines protect equally
- **Trained immunity** is the unifying mechanism, not adjuvant-specific effects

## Completed Tasks

### Task 1: Update AS01 References to General Vaccination ✓ COMPLETE
Files updated:
- [x] `src/data/bibliography/treatments.ts` - Added comment noting Pomirchy finding, updated section header to "VACCINES & TRAINED IMMUNITY"
- [x] `src/data/promisingFrontier.ts` - Already uses general "Vaccines (Trained Immunity)" framing
- [x] `src/data/postInfectiousRisk.ts` - Updated VZV prevention options to emphasize trained immunity
- [x] `src/data/mechanisticFramework/edges.ts` - Citations kept (exact paper titles); descriptions are correct
- [x] `src/data/mechanisticFramework/nodes/m19-post-infectious.ts` - Updated mechanism description
- [x] `src/data/mechanisticFramework/nodes/boundary.ts` - Updated comment (M17 = Trained Immunity, not AS01)
- [x] `src/data/hopefulDevelopments.ts` - Already has good vaccine entries with correct framing

### Task 2: Evaluate Drug Additions from Tracker v1.13 ✓ COMPLETE

#### Already Present (verified):
- [x] Shingrix - in hopefulDevelopments.ts
- [x] Zostavax - in hopefulDevelopments.ts
- [x] BCG - in hopefulDevelopments.ts
- [x] RSV vaccines - in hopefulDevelopments.ts
- [x] Rapamycin - in promisingFrontier.ts
- [x] Lithium (microdose) - in promisingFrontier.ts & hopefulDevelopments.ts
- [x] Colchicine - in promisingFrontier.ts
- [x] Valacyclovir - in promisingFrontier.ts (correctly marked as FAILED)
- [x] SRI-011381 (C381) - in hopefulDevelopments.ts & promisingFrontier.ts
- [x] Metformin - in hopefulDevelopments.ts
- [x] Dimethyl Fumarate - in hopefulDevelopments.ts
- [x] DHA/Fish oil - mentioned in hopefulDevelopments.ts (Mediterranean diet)
- [x] Clemastine - mentioned in mechanisticFramework edges/feedbackLoops as therapeutic option

#### Not Added (and why):
| Candidate | Decision | Rationale |
|-----------|----------|-----------|
| Itaconate derivatives | DEFER | Preclinical only; mechanistic interest but no human trials |
| Borneol | DO NOT ADD | P-gp inhibitor may worsen Aβ accumulation |
| Fenchol/FFAR2 | DEFER | Preclinical only |
| TMP/Ligustrazine | DEFER | TCM compound; no Western clinical trials |
| SBI-425 (ALPL inhibitor) | DEFER | Preclinical; interesting but no AD trials yet |
| β2-AR agonists (Nixon) | DEFER | Preclinical lysosomal acidification approach |
| PDGF-BB supplementation | CAUTION | Liu 2024 shows systemic PDGF-BB may worsen BBB |

#### Mechanistic Insights (already captured):
- [x] GABA shunt and ammonia accumulation - in M19
- [x] Astrocyte-oligodendrocyte metabolic coupling - in M18
- [x] GFAP as shared biomarker (Long COVID ↔ AD) - in M19
- [x] GPCR autoantibodies (ME/CFS, Long COVID) - in M19
- [x] LDAM-ferroptosis cascade - in M05 and M09
- [x] NfL as biomarker - in M19

### Task 3: Add Pomirchy 2026 Citation ✓ COMPLETE
Added to `src/data/bibliography/treatments.ts`:
- Full citation with DOI
- Two key quotes: no-adjuvant finding, sex difference

### Task 4: Update Mechanistic Framework ✓ COMPLETE
- Trained immunity well-captured in M17 ("Trained Immunity / Vaccine-Mediated Neuroprotection")
- Itaconate pathway edges exist in M19 (irg1_itaconate_shunt)
- GFAP/astrocyte dysfunction well-captured in M18

## Decision Log

| Item | Decision | Rationale |
|------|----------|-----------|
| AS01 references in citations | KEEP | Exact paper titles/quotes should not be altered |
| AS01 references in descriptions | UPDATED | Changed to trained immunity framing |
| Pomirchy 2026 | ADDED | Key citation proving trained immunity mechanism |
| Borneol | DO NOT ADD | P-gp inhibitor may worsen Aβ accumulation |
| Itaconate derivatives | DEFER | Preclinical only; monitor for future |
| Vitamin D/P-gp inducers | CONSIDER FUTURE | May add as lifestyle/supplement intervention |
| CLAUDE.md update | ADDED | New Planning section documenting plan storage location |

## Files Changed

1. `src/data/bibliography/treatments.ts` - Added Pomirchy citation, updated section header
2. `src/data/postInfectiousRisk.ts` - Updated VZV prevention options
3. `src/data/mechanisticFramework/nodes/m19-post-infectious.ts` - Updated trained immunity mechanism
4. `src/data/mechanisticFramework/nodes/boundary.ts` - Fixed M17 comment
5. `.claude/CLAUDE.md` - Added Planning section
6. `.claude/plans/vaccine-updates-2026-01-22.md` - This plan file

## References

- Pomirchy et al. 2026, Lancet Neurol - Zostavax dementia protection (NO adjuvant)
- Taquet et al. 2025 - Shingrix/RSV vaccine protection
- Domínguez-Andrés 2018, Cell Metab - Itaconate and trained immunity
- Liu 2024, J Neuroinflammation - PDGF-BB→ALPL mechanism (caution for systemic PDGF-BB)
