# Plan: AD as Immune Disease Reframing

**Created:** 2026-01-23
**Status:** Ready for Approval

## Executive Summary

Transform the Alzheimer's visualization to emphasize the **unified mechanism**: AD is fundamentally an **immune disease** where microglia SEED plaques (not clear them), the cholinergic system is DOWNSTREAM, and the 99% trial failure rate makes sense because those trials targeted downstream pathology.

**Core Message Shift:** "We finally understand the mechanism. This disease is treatable."

---

## Part 1: Hero Section Redesign

### New Hero Content Structure

```
┌─────────────────────────────────────────────────────────┐
│              UNTANGLING ALZHEIMER'S                     │
│     The science, the system, and the search for cure   │
│                   ~15 min read                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  THE BREAKTHROUGH: We now understand the mechanism.     │
│                                                         │
│  [Mini Cascade Diagram]                                 │
│  Infection/Stress → Immune Dysregulation →              │
│       Metabolic Collapse → Plaques & Tangles            │
│                                                         │
│  Amyloid and tau are DOWNSTREAM. The disease starts     │
│  with microglia that SEED plaques—not clear them.       │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  THE BAD NEWS             │  THE GOOD NEWS              │
│  ─────────────────────────┼──────────────────────────── │
│  45 years before symptoms │  17-45% dementia reduction  │
│  we can detect changes    │  from vaccines              │
│                           │                             │
│  99% trial failure rate   │  4+ FDA drugs target        │
│  (targeted downstream)    │  upstream causes            │
│                           │                             │
│  1 unified mechanism      │  30-50% risk reduction      │
│  explains all hypotheses  │  from lifestyle (today)     │
├─────────────────────────────────────────────────────────┤
│        [Scroll to discover why we have reason to hope]  │
└─────────────────────────────────────────────────────────┘
```

### Files to Modify
- `src/components/sections/Hero.tsx` - Complete redesign

---

## Part 2: New "Infection → AD Cascade" Preset

Add to `src/data/mechanisticFramework/presets.ts`:

```typescript
{
  id: 'infection_ad_cascade',
  label: 'Infection → AD Cascade',
  description: 'The unified mechanism: Infection/stress → immune dysregulation → metabolic collapse → plaque seeding → neurodegeneration',
  category: 'hypotheses',
  nodeIds: [
    // Triggers (M19)
    'pathogenic_exposure', 'chronic_immune_activation',

    // Metabolic (M01/M05)
    'mtorc1_hyperactive', 'mtor_hif1a_axis', 'hif1a_stabilized',
    'glycolytic_switch', 'irg1_itaconate_shunt', 'sdh_inhibited',
    'tca_disrupted', 'glutaminolysis_compensatory', 'ammonia_accumulation',

    // Microglial Phenotypes (M05)
    'ldam', 'ldam_super_seeders', 'phagocytosis_impaired',

    // Downstream (M06, M07, M13)
    'abeta_plaques', 'tau_hyperphosphorylated', 'cholinergic_degeneration'
  ],
  color: '#C9461D' // Orange - inflammation theme
}
```

---

## Part 3: New Nodes Required

### Add to `src/data/mechanisticFramework/nodes/m13-cholinergic.ts`:

| Node ID | Label | Description |
|---------|-------|-------------|
| `a7nachr` | α7 Nicotinic AChR | Nicotinic receptor with ultra-high affinity for Aβ42 |
| `ab42_a7nachr_complex` | Aβ42–α7nAChR Complex | Pathogenic complex that triggers tau phosphorylation |
| `intraneuronal_amyloid` | Intraneuronal Aβ | Aβ42–α7nAChR complex internalized → intraneuronal aggregates |
| `microtubule_destabilization` | Microtubule Destabilization | Hyperphosphorylated tau can't stabilize microtubules |

**Mechanistic Significance:** This pathway shows how the cholinergic system (α7nAChR) is the NEXUS where soluble Aβ42 triggers BOTH:
1. Tau hyperphosphorylation → tangles
2. Intraneuronal Aβ accumulation → plaques (after cell death)

This explains why the hallmark pathologies (plaques AND tangles) co-occur—they share an upstream trigger at α7nAChR.

### Add to `src/data/mechanisticFramework/nodes/m05-microglia.ts`:

| Node ID | Label | Description |
|---------|-------|-------------|
| `mtor_hif1a_axis` | mTOR-HIF1α Axis | mTOR→HIF1α signaling drives glycolytic shift in AD microglia |
| `irg1_itaconate_shunt` | IRG1/Itaconate Shunt | IRG1 diverts aconitate to itaconate, disrupts TCA cycle |
| `sdh_inhibited` | SDH Inhibited | Itaconate competitively inhibits succinate dehydrogenase |
| `tca_disrupted` | TCA Cycle Disrupted | Broken TCA forces compensatory glutaminolysis |
| `glutaminolysis_compensatory` | Compensatory Glutaminolysis | Glutamine catabolism produces toxic ammonia |
| `ammonia_accumulation` | Ammonia Accumulation | Ammonia → astrocyte swelling → clasmatodendrosis |
| `ldam_super_seeders` | LDAM Super-seeders | Iron-loaded microglia that SEED plaques (paradigm shift) |

### Add to `src/data/mechanisticFramework/nodes/m15-interventions.ts`:

| Node ID | Label | Description |
|---------|-------|-------------|
| `dca_intervention` | DCA (Dichloroacetate) | PDK inhibitor - restores TCA cycle INDEPENDENT of amyloid |
| `rapamycin_intermittent` | Rapamycin (Intermittent) | 6mg/week - 74.3% response in ME/CFS, preserves mTORC2 |

---

## Part 4: New Edges Required

### Add to `src/data/mechanisticFramework/edges.ts`:

| Edge | Connection | Key Insight |
|------|------------|-------------|
| E05.NEW01 | mtorc1_hyperactive → hif1a_stabilized | mTOR-HIF1α axis validated in human AD tissue |
| E05.NEW02 | hif1a_stabilized → glycolytic_switch | HIF1α drives Warburg-like metabolism |
| E05.NEW03 | chronic_immune_activation → irg1_itaconate_shunt | Inflammation → IRG1 → itaconate production |
| E05.NEW04 | irg1_itaconate_shunt → sdh_inhibited | Itaconate is competitive SDH inhibitor |
| E05.NEW05 | sdh_inhibited → tca_disrupted | SDH block breaks TCA cycle |
| E05.NEW06 | tca_disrupted → glutaminolysis_compensatory | Anaplerotic compensation |
| E05.NEW07 | glutaminolysis_compensatory → ammonia_accumulation | Glutaminase releases ammonia |
| E05.NEW08 | ammonia_accumulation → clasmatodendrosis | Ammonia → astrocyte swelling (cross-module) |
| **E05.NEW09** | **ldam_super_seeders → abeta_plaques** | **PARADIGM SHIFT: LDAM SEED plaques** |
| E15.NEW01 | dca_intervention → tca_disrupted (decreases) | DCA restores TCA independent of amyloid |
| E13.NEW01 | neuroinflammation → cholinergic_degeneration | Cholinergic is DOWNSTREAM (explains donepezil limits) |

### Aβ42–α7nAChR–Tau Connection (Critical Link)

| Edge | Connection | Key Insight |
|------|------------|-------------|
| E13.NEW02 | abeta_oligomers → ab42_a7nachr_complex | Aβ42 binds α7nAChR with ultra-high affinity (Wang 2000) |
| E13.NEW03 | ab42_a7nachr_complex → tau_hyperphosphorylated | Complex activates kinases → tau hyperphosphorylation |
| E13.NEW04 | ab42_a7nachr_complex → intraneuronal_amyloid | Complex internalized via endocytosis → intraneuronal Aβ |
| E13.NEW05 | tau_hyperphosphorylated → microtubule_destabilization | Tau can't stabilize microtubules → transport impaired |
| E13.NEW06 | microtubule_destabilization → tau_aggregated | Impaired transport → tau aggregates accumulate |

**Mechanistic Significance:** This pathway mechanistically links the hallmark plaques AND tangles through a single receptor interaction. Soluble Aβ42 → α7nAChR binding → tau phosphorylation cascade → both pathologies emerge from the same upstream event.

---

## Part 5: Module Updates

### Update M05 (Microglia) in `modules.ts`:

**New Overview:**
```
PARADIGM SHIFT: Microglia don't just fail to clear Aβ—they actively SEED plaques.

The LDAM (Lipid-Droplet Accumulating Microglia) phenotype represents metabolically
dysfunctional cells where:
1. mTOR-HIF1α axis drives glycolytic shift (validated in human AD tissue)
2. IRG1/itaconate shunt disrupts TCA cycle
3. Compensatory glutaminolysis produces toxic ammonia
4. Iron accumulation + lysosomal dysfunction = "super-seeder" state
5. These microglia AGGREGATE Aβ, not clear it (Baligács 2024)

This explains why anti-amyloid therapies have limited success: they target the
OUTPUT of microglial dysfunction, not the upstream metabolic collapse.

40Hz gamma therapy works by enhancing glymphatic clearance—removing Aβ BEFORE
microglia can process it.
```

### Add Paradigm Shift Entries:

| Year | Discovery | Ref |
|------|-----------|-----|
| 2020 | LDAM discovery - lipid-loaded microglia in aging/AD | Marschallinger |
| 2024 | Microglia SEED plaques - paradigm reversal | Baligács 2024 |
| 2024 | mTOR-HIF1α axis validated in human AD tissue | TBD |
| 2025 | Rapamycin 74.3% response in ME/CFS via same mechanism | Ruan 2025 |

---

## Part 6: Narrative Arc Updates

### Messaging Framework

| Section | Old Tone | New Tone |
|---------|----------|----------|
| Hero | 99% failure, system broken | We understand the mechanism now |
| Act I | Paradox of failure | Failures make sense - targeted downstream |
| Act II | Market failures prevent cures | Market failures explain why proven treatments lack funding |
| Act III | Hope despite barriers | **EXPANDED**: Unified mechanism = treatable disease |

### Key Copy Updates

**Hero CTA:**
- Old: "Scroll to explore"
- New: "Scroll to discover why we finally have reason to hope"

**Hopeful Developments Header:**
- Old: "What's finally working—and what could work with proper funding"
- New: "The unified mechanism means targeted treatment is possible. Here's what's working."

---

## Part 7: Implementation Sequence

### Phase 1: Data Layer (Core Changes) ✅ COMPLETED
1. ✅ Add new nodes to `m05-microglia.ts` (7 metabolic cascade nodes)
2. ✅ Add new nodes to `m13-cholinergic.ts` (4 α7nAChR pathway nodes)
3. ✅ Add new edges to `edges.ts` (15 new edges: E05.015-024, E13.033-037)
4. ✅ Add "Infection → AD Cascade" preset to `presets.ts`
5. ✅ Update M05 module description in `modules.ts` with paradigm shift
6. ✅ Update CLAUDE.md with citation verification protocol
7. ✅ Add GWI convergence pathway (validates environmental triggers → AD):
   - Added 2 nodes to `m19-post-infectious.ts`: `neurotoxicant_exposure`, `gwi_glymphatic_impairment`
   - Added 4 edges: E19.011-014 (GWI → immune activation → Aβ → glymphatic impairment)
   - Added `bacopa_monnieri` to `drugLibrary.ts` (GWI/ME/CFS treatment with Phase II trial)
   - Updated preset with GWI nodes/edges

**Verification:** Build passed, network audit shows 275 nodes, 385 edges

**GWI Convergence Insight:** Gulf War Illness shows 14× higher dementia rate (Chao 2024), MCI at median age 49, and MEASURED glymphatic dysfunction (Zhang 2026). This validates:
- Environmental triggers (neurotoxicants) → AD pathway
- Glymphatic dysfunction as shared mechanism across GWI/ME/CFS/AD
- Clasmatodendrosis hypothesis (astrocyte endfoot damage from toxicant exposure)

### Phase 2: Hero Section Redesign (PENDING)
1. Redesign Hero.tsx with new structure
2. Add reading time (~15 min)
3. Add mini-cascade visualization
4. Add "good news" statistics

### Phase 3: Narrative Updates (PENDING)
1. Update section copy throughout
2. Update pause card summaries
3. Ensure cholinergic positioned as downstream
4. Add hopeful framing to Act III

### Phase 4: Bibliography (PENDING)
1. Add Baligács 2024 (LDAM plaque seeding)
2. Add Ruan 2025 (rapamycin ME/CFS trial)
3. Add Missailidis 2026 (lipid accumulation convergence)
4. Add mTOR-HIF1α human AD validation
5. Add D'Andrea 2023 (Aβ42–α7nAChR–tau link) - PMC10531384
6. Add Chao 2024 (GWI dementia 14× higher rate) - VERIFY PMID
7. Add Cui 2024 (Organophosphate → Aβ in wild-type mice) - VERIFY PMID
8. Add Zhang 2026 (GWI glymphatic dysfunction, AJNR) - VERIFY PMID
9. Add Prabhakar 2013 (Bacopa vs donepezil RCT) - PMID 24252493

### Key Citation: Aβ42–α7nAChR–Tau Connection

**Source (Verified via WebFetch):**
- **Title:** Simufilam Reverses Aberrant Receptor Interactions of Filamin A in Alzheimer's Disease
- **Authors:** Wang HY, Cecon E, Dam J, Pei Z, Jockers R, Burns LH
- **Journal:** International Journal of Molecular Sciences
- **Year:** 2023
- **DOI:** 10.3390/ijms241813927
- **PMCID:** PMC10531384

**Key Quotes:**
- "The ultra-high-affinity binding of Aβ42 for α7nAChR was first published in 2000, and this Aβ42–α7nAChR interaction was later shown to activate kinases that hyperphosphorylate tau."
- "Hyperphosphorylated tau can no longer stabilize microtubules, impairing intraneuronal transport of proteins, which causes the accumulation of hyperphosphorylated tau aggregates."
- "As increasing soluble Aβ42 piles onto this receptor, the Aβ42–α7nAChR complex is internalized into the cell by endocytosis, leading to intraneuronal amyloid aggregates."
- "Hence, this pathogenic signaling pathway of soluble Aβ42 mechanistically links the hallmark plaques and tangles."
- "simufilam's primary mechanism is to disrupt the toxic signaling of soluble Aβ42 via the α7nAChR that hyperphosphorylates tau"

---

## Part 8: CLAUDE.md Update - Citation Verification

Add to the "Adding New Sources" section in `.claude/CLAUDE.md`:

```markdown
### Adding New Sources
When adding a new source:
1. **ALWAYS use WebFetch or WebSearch** to verify citation details before adding
2. Choose the appropriate module file based on topic
3. Follow the `Source` interface structure from `types.ts`
4. Include at least one `Citation` with an exact quote
5. Verify quotes by fetching the actual source URL
6. Run `npx tsx scripts/dump-network-data.ts` to verify citations

**Citation Verification Protocol:**
- Use `WebFetch` on the source URL (PubMed, PMC, DOI link) to extract exact title, authors, journal, year, DOI
- Copy quotes EXACTLY as they appear in the source
- If a URL redirects, follow the redirect to get the actual content
- Mark any unverified citations with `// UNVERIFIED` comment until confirmed
```

---

## Critical Files

| File | Changes |
|------|---------|
| `.claude/CLAUDE.md` | Add citation verification protocol to "Adding New Sources" section |
| `src/components/sections/Hero.tsx` | Complete redesign with unified mechanism messaging |
| `src/data/mechanisticFramework/presets.ts` | Add "Infection → AD Cascade" preset |
| `src/data/mechanisticFramework/nodes/m05-microglia.ts` | Add 7 metabolic cascade nodes |
| `src/data/mechanisticFramework/edges.ts` | Add ~11 new edges |
| `src/data/mechanisticFramework/modules.ts` | Update M05 overview with paradigm shift |
| `src/data/bibliography/mechanisms.ts` | Add 4+ new citations |

---

## Verification

After implementation:
1. Run `npm run dev` and verify Hero section displays correctly
2. Navigate to the network viz and select "Infection → AD Cascade" preset
3. Verify new nodes/edges render with correct positioning
4. Check that all new edges have required `evidence` citations
5. Run `npx tsx scripts/dump-network-data.ts` to verify data integrity
