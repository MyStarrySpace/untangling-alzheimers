---
planStatus:
  planId: plan-add-metformin-dmf
  title: Add Metformin, DMF, and SIRT1 Node
  status: completed
  planType: feature
  priority: medium
  owner: developer
  stakeholders:
    - developer
  tags:
    - drugs
    - data-completeness
    - metabolic-hypothesis
    - oxidative-stress
    - SIRT1
  created: "2026-01-20"
  updated: "2026-01-20T14:30:00.000Z"
  progress: 100
---

# Add Metformin, DMF, and SIRT1 Node

## Goals
- Complete drug data with two key repurposed drugs (metformin, DMF)
- Add SIRT1 node to enable proper pathway targeting
- Organize drugs by infographic section (not as separate preset)
- Use evidence from ad_clearance_model_v1.md (Section 11.18.10-11)

## Problem Description

### Current Gap
- **Metformin**: Only in `caseStudies.ts`. Missing from `drugLibrary.ts` and `hopefulDevelopments.ts`
- **Dimethyl fumarate (DMF/Tecfidera)**: Not in any active data files
- **SIRT1 node**: Missing from mechanistic network (needed for metformin targeting)

### Evidence Source
Primary reference: `c:\Users\quest\Downloads\ad_clearance_model_v1.md`
- Section 11.18.10: Metabolic Reprogramming Approaches
- Section 11.18.11: Why DMF and Metformin Haven't Been Fully Implemented

### Why These Drugs Matter (from source document)

**Metformin (Section 11.18.10):**
- AMPK activator → inhibits mTORC1, suppresses NF-κB, promotes M2 microglial polarization
- Ou et al. 2017: APP/PS1 mice showed attenuated memory deficits, decreased Aβ, reduced activated microglia
- Mechanism: **AMPK/mTOR/S6K/BACE1** and **AMPK/P65 NF-κB** pathways
- MAP Trial (NCT04098666): Phase 2 prevention trial, results expected 2027
- **CRITICAL CAVEAT**: Wu 2020 showed APOE4 × metformin interaction (benefit in cognitively normal, possible harm in AD+APOE4)
- Cost: ~$4/month generic → represents market failure

**Dimethyl Fumarate (Section 11.18.10-11):**
- FDA-approved for MS (Tecfidera), CNS penetrant
- Activates Nrf2 via HCAR2 and direct Keap1 modification
- Wang et al. 2024: Improved cognition in App-KI mice via astrocytic Nrf2 → reduced STAT3/C3
- Mechanism: Nrf2 → ↓NF-κB → ↓HIF-1α → prevents glycolytic switch
- Sharkus 2023: Published Phase I/II trial design, **but NO active AD trial as of 2025**
- Safety concerns: lymphopenia monitoring, GI intolerance, rare PML risk
- "Clear market failure" per source document

## High-Level Approach

1. **Add SIRT1 node** to M01 (mTOR/Autophagy) module
2. **Add metformin** to drugLibrary.ts and hopefulDevelopments.ts
3. **Add DMF** to drugLibrary.ts and hopefulDevelopments.ts
4. **Organize by infographic section** (drugs appear in relevant sections, not separate preset)
5. **Verify build**

## Key Components

### New Node: SIRT1

**Location:** `src/data/mechanisticFramework/nodes/m01-mtor-autophagy.ts` or `m03-mitochondrial.ts`

**Node definition:**
- id: `sirt1_activity`
- label: "SIRT1 (Sirtuin 1)"
- category: STOCK with REGULATOR role
- subtype: Enzyme (deacetylase)
- moduleId: M01 or M03
- description: "NAD+-dependent deacetylase; longevity-associated enzyme"
- mechanism: "Deacetylates tau, PGC-1α, FOXO; anti-inflammatory via NF-κB deacetylation"
- roles: ['REGULATOR', 'THERAPEUTIC_TARGET']

**Edges to add:**
- `ampk_phosphorylated` → `sirt1_activity` (increases) - AMPK activation increases NAD+/NADH ratio
- `sirt1_activity` → `mtorc1_hyperactive` (inhibits) - SIRT1 inhibits mTORC1 signaling

### Metformin Entry

**drugLibrary.ts targets:**
| Node | Effect | Mechanism |
|------|--------|-----------|
| `ampk_phosphorylated` | activates | Primary mechanism: AMPK activation via mitochondrial complex I inhibition |
| `mtorc1_hyperactive` | inhibits | Via AMPK → TSC2 → mTORC1 inhibition |
| `sirt1_activity` | activates | Via increased NAD+/NADH ratio from AMPK activation |
| `nlrp3_active` | inhibits | Via AMPK → NF-κB suppression |

**hopefulDevelopments.ts:**
- Category: pipeline_drug
- Status: phase_2 (MAP trial ongoing)
- Key evidence: Ou 2017 (APP/PS1 mice), Wu 2020 (APOE4 interaction)
- Caveats: APOE4 interaction concern, long-term use question

### Dimethyl Fumarate Entry

**drugLibrary.ts targets:**
| Node | Effect | Mechanism |
|------|--------|-----------|
| `nrf2_pathway` | activates | Direct Keap1 modification + HCAR2 activation |
| `nlrp3_active` | inhibits | Via Nrf2 → NF-κB suppression |
| `gpx4_activity` | activates | Via Nrf2-mediated antioxidant gene induction |

**hopefulDevelopments.ts:**
- Category: pipeline_drug
- Status: preclinical (for AD; approved for MS)
- Key evidence: Wang 2024 (App-KI mice), Sharkus 2023 (trial design)
- Caveats: No active AD trial despite published design, lymphopenia monitoring, GI side effects

## Files to Modify

| File | Changes |
|------|---------|
| `src/data/mechanisticFramework/nodes/m01-mtor-autophagy.ts` | Add SIRT1 node |
| `src/data/mechanisticFramework/edges.ts` | Add AMPK→SIRT1, SIRT1→mTORC1 edges |
| `src/data/mechanisticFramework/nodePositions.ts` | Add SIRT1 position |
| `src/data/mechanisticFramework/drugLibrary.ts` | Add metformin and DMF entries |
| `src/data/hopefulDevelopments.ts` | Add both as pipeline developments |

## Acceptance Criteria

1. SIRT1 node appears in network with proper connections
2. Both drugs appear in mechanistic network when relevant nodes selected
3. Both drugs appear in "Promising Pipeline" tab
4. Evidence and caveats accurately reflect source document
5. Build passes with no TypeScript errors
6. Drugs organized by relevant infographic section (not separate metabolic preset)

## Key Evidence to Include

### Metformin
- **Ou 2017**: APP/PS1 mice: attenuated memory deficits, decreased Aβ, reduced microglia
- **Wu 2020**: APOE4 interaction: protective in cognitively normal, may accelerate in AD+APOE4
- **MAP Trial**: NCT04098666, results 2027
- **Daly 2025**: Long-term low-dose proposal for prevention

### DMF
- **Wang 2024**: App-KI mice: astrocytic Nrf2 activation improved cognition
- **Sharkus 2023**: Published trial design (n=60, 12 weeks, 240mg BID)
- **Rosito 2020**: Review of DMF mechanisms in neurodegeneration

## Open Questions (Resolved)

1. ~~Does network have Nrf2 node?~~ **YES** - `nrf2_pathway` in M10
2. ~~Does network have AMPK/mTOR nodes?~~ **YES** - `ampk_phosphorylated`, `mtorc1_hyperactive` in M01
3. ~~Should we add SIRT1 node?~~ **YES** - User confirmed
4. ~~Organize as preset or by section?~~ **BY SECTION** - User confirmed
