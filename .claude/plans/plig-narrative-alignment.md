---
planStatus:
  planId: plan-plig-narrative-alignment
  title: Align Narrative Components with PLIG Unified Framework
  status: draft
  planType: refactor
  priority: high
  owner: developer
  stakeholders:
    - developer
  tags:
    - plig
    - narrative
    - mechanistic-framework
    - content-update
  created: "2026-01-28"
  updated: "2026-01-28T22:45:00.000Z"
  progress: 0
---

# Align Narrative Components with PLIG Unified Framework

## Goals

- Reframe the site's narrative from "competing hypotheses" to a unified PLIG model where amyloid, vascular, metabolic, and lysosomal pathways are interconnected downstream consequences
- Integrate the new PLIG mechanistic framework (91 nodes, 118 edges, 11 modules) into the storytelling
- Add the clearance restoration paradigm: Aβ accumulates due to clearance failure, not overproduction, and restoring clearance systems may obviate antibodies
- Connect iron maldistribution (not just "iron accumulation") and ferroportin biology to the narrative
- Surface the hepcidin-ferroportin axis and its link to chronic inflammation

## Problem Description

The site currently presents AD as a landscape of competing hypotheses (amyloid vs. tau vs. vascular vs. metabolic vs. lysosomal). Each section treats these as independent theories. The PLIG model unifies them: pericyte loss opens the BBB, lysosomal alkalinization cripples clearance, iron becomes maldistributed, and glia become dysfunctional. Amyloid and tau are downstream symptoms of these converging failures.

The mechanistic framework data (91 nodes, 118 edges) now exists but no component consumes it. The narrative sections contain hardcoded content that partially aligns with PLIG but uses fragmented framing. Key gaps:

- No section visualizes or explains the PLIG mechanistic cascade
- The clearance restoration paradigm (SILK study: production normal, clearance 30% reduced) is absent
- Iron is mentioned in sexAncestryEffects but not connected to ferroportin, hepcidin, or the lysosomal Fenton loop
- Pericytes and BBB are barely mentioned despite being a core PLIG pillar
- The complement misdirection story (C1q diverts microglia from Aβ clearance to synapse destruction) is missing
- HopefulDevelopments doesn't include PLIG-aligned therapeutics (ambroxol, ANX005, ferroportin upregulation, iron redistribution)

## High-Level Approach

Rather than rewrite every section, focus on **three categories of change**:

### A. New Section: Mechanistic Cascade (PLIG Visualization)

Add a new section (Act III or between Acts II and III) that visualizes the PLIG framework as an interactive network or cascade diagram. This is the centerpiece that makes the unified model tangible.

- Consumes `src/data/mechanisticFramework` data directly
- Shows the four pillars (Pericyte, Lysosome, Iron, Glia) as interconnected modules
- Highlights key feedback loops (lysosomal Fenton loop, iron death spiral, complement misdirection)
- Includes the clearance restoration argument: multiple redundant clearance systems, plaques form only when multiple fail
- Progressive disclosure: Level 1 shows pillars, Level 2 shows key pathways, Level 3 shows full node/edge detail

### B. Content Updates to Existing Data Files

Update narrative data to use PLIG framing without restructuring components:

**`hopefulDevelopments.ts`** (medium-high priority)
- Add PLIG-aligned therapeutics: ambroxol (GBA chaperone), ANX005 (anti-C1q), iron redistribution concept, ferroportin upregulation, DGAT inhibitors, low-dose naltrexone
- Reframe C381 with explicit PLIG language (lysosomal pH as master switch)
- Add clearance restoration framing to lecanemab/donanemab entries (antibodies substitute for what restored clearance systems should do)
- Add sleep/glymphatic as mechanistic intervention (not just "lifestyle")

**`caseStudies.ts`** (medium priority)
- Add new case study: iron chelation failure (FAIRPARK-II deferiprone worsened PD) as example of wrong mental model (chelation vs redistribution)
- Reframe TNF inhibitors through PLIG lens (inflammation drives hepcidin, hepcidin degrades ferroportin, iron gets trapped)
- Connect GV-971 gut-brain axis to systemic inflammation → hepcidin → iron maldistribution

**`sexAncestryEffects.ts`** (medium-high priority)
- Add hepcidin-ferroportin axis to hormonal section (inflammation → hepcidin → ferroportin loss → iron trapped)
- Add ferroportin as the only cellular iron exporter, regulated by estrogen and hepcidin
- Connect menopause → estrogen loss → V-ATPase downregulation → lysosomal pH elevation → iron trapped in lysosomes
- Add PON1 decline post-menopause → increased lipid peroxidation → ferroptosis vulnerability

**`timeline.ts`** (high priority)
- Add events for key PLIG milestones: SILK study (2010), pericyte-AD connection, FAIRPARK-II failure, ORF3a lysosomal alkalinization discovery, complement-synapse elimination (Hong 2016)
- Populate currently empty framework categories (lysosomal, infection, myelin)

**`failures.ts`** (medium priority)
- Add "Hypothesis Lock-In" failure: amyloid dominance starved pericyte, iron, and lysosomal research of funding for 30 years
- Strengthen "Subtype Blindness" with PLIG language: subtypes may map to which PLIG pillar fails first

### C. Type System Updates

**`types/index.ts`**
- Add `FrameworkId` values: `'pericyte'`, `'iron'`, `'complement'`, `'bbb'`
- These enable timeline filtering and cross-referencing to the mechanistic framework

## Files Affected

### New files
- `src/components/sections/MechanisticCascade.tsx` - New section component for PLIG visualization

### Modified data files
- `src/data/hopefulDevelopments.ts` - Add PLIG therapeutics, reframe existing entries
- `src/data/caseStudies.ts` - Add FAIRPARK-II case study, reframe existing through PLIG
- `src/data/sexAncestryEffects.ts` - Add hepcidin-ferroportin, iron maldistribution by sex
- `src/data/timeline.ts` - Add PLIG milestone events, populate empty categories
- `src/data/failures.ts` - Add hypothesis lock-in failure
- `src/types/index.ts` - Add new FrameworkId values

### Modified components
- `src/app/page.tsx` - Add MechanisticCascade section to narrative flow
- `src/components/sections/index.ts` - Export new section

### Possibly modified components (content tweaks only)
- `src/components/sections/HopefulDevelopments.tsx` - If rendering logic needs adjustment for new data
- `src/components/sections/EmergingRiskFactors.tsx` - May need PLIG terminology in copy

## Acceptance Criteria

- [ ] New MechanisticCascade section renders the PLIG framework data as an interactive visualization
- [ ] The four PLIG pillars are visually distinct and their interconnections are clear
- [ ] Clearance restoration paradigm is presented: production normal, clearance impaired, multiple redundant systems
- [ ] Iron redistribution (not chelation) is explained with FAIRPARK-II as cautionary evidence
- [ ] Ferroportin and the hepcidin-ferroportin axis appear in both the cascade visualization and sexAncestryEffects
- [ ] At least 5 new PLIG-aligned therapeutics appear in HopefulDevelopments
- [ ] Timeline has events for lysosomal, infection, pericyte, and iron framework categories
- [ ] All new content follows citation standards (verified quotes, PMIDs)
- [ ] Build passes (`npm run build`)
- [ ] Existing sections that aren't modified continue to render correctly

## What Success Looks Like

A reader going through the site should understand by the end:

1. AD is not caused by amyloid overproduction. It's caused by clearance failure from converging system breakdowns.
2. Four systems break down together: pericytes (BBB), lysosomes (degradation), iron distribution, and glial function.
3. These aren't competing theories. They're interconnected. Lysosomal alkalinization traps iron, which damages lysosomes further. Pericyte loss opens the BBB to unregulated iron. Complement misdirects microglia from clearing plaques to destroying synapses.
4. Fixing any major clearance pathway may be sufficient (compensatory systems exist). The goal is clearance restoration, not amyloid removal.
5. Iron chelation doesn't work (FAIRPARK-II). The problem is iron in the wrong place, not too much iron. Ferroportin-based redistribution is the viable approach.
6. Sex differences in AD map to PLIG: menopause removes estrogen's protection of V-ATPase, pericytes, and ferroportin regulation.

## Open Questions

1. **Visualization approach for MechanisticCascade**: Force-directed graph (like D3/react-force-graph)? Layered Sankey-style diagram? Simplified pillar diagram with expandable detail? Need to decide based on what communicates the unified model best for a general audience.

2. **Scope of content rewrites**: Should existing section copy (hardcoded JSX text) be rewritten to use PLIG language, or should we keep existing sections as-is and let the new MechanisticCascade section carry the PLIG message? Rewriting risks introducing errors; leaving as-is creates framing inconsistency.

3. **How deep on clearance restoration**: The PLIG v1.7 document argues complement inhibition (ANX005) may redirect microglia to clear plaques naturally, potentially making anti-amyloid antibodies unnecessary. This is a strong claim. Should the site present it as established PLIG prediction or as open hypothesis?

4. **Staging the work**: Should we implement the MechanisticCascade visualization first (so the PLIG model is visible) before updating narrative content? Or update data files first so the content is consistent even without the visualization?

5. **Senolytics positioning**: The old framework marked senolytics as anti-target (iron release from killed cells). The PLIG model is more nuanced ("under investigation, needs more data"). How should we present this?
