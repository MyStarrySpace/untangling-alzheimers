---
planStatus:
  planId: plan-bredesen-36-holes
  title: Bredesen 36 Holes Preset and Missing Mechanisms
  status: draft
  planType: feature
  priority: medium
  owner: developer
  stakeholders:
    - developer
  tags:
    - mechanistic-framework
    - presets
    - bredesen
    - homocysteine
    - toxins
    - ketogenic
  created: "2026-01-19"
  updated: "2026-01-19T22:30:00.000Z"
  progress: 0
---

# Bredesen 36 Holes Preset and Missing Mechanisms

## Goals

1. Add a "Bredesen 36 Holes" hypothesis preset that maps his ReCODE protocol factors to our mechanistic network
2. Add missing mechanisms: Homocysteine/Methylation, Heavy Metals, Mycotoxins
3. Expand Ketogenic Diet intervention with detailed mechanistic pathway (KetoFLEX 12/3)

## Problem Description

Bredesen's "36 holes in the roof" metaphor describes AD as a multifactorial disease where each contributing factor is a "hole" that must be addressed. His ReCODE protocol tests and addresses these factors across five categories:

| Category | ReCODE Tests | Our Coverage | Gap |
|----------|--------------|--------------|-----|
| **1. Insulin Resistance** | HOMA-IR, fasting insulin, HbA1c | Good (M01) | Ketone bodies |
| **2. Inflammation/Infections** | hs-CRP, IL-6, homocysteine, pathogens | Partial | Homocysteine pathway incomplete |
| **3. Hormones/Nutrients/Trophic** | E2, T, cortisol, thyroid, BDNF, B12, D3, Zn | Partial (M20) | B vitamins, BDNF, Zn/Cu ratio |
| **4. Toxins** | Hg, Pb, As, Cd, mycotoxins, ERMI | Missing | Full module needed |
| **5. Synaptic Protection** | Sleep, exercise, cognitive training | Good | Minor gaps |

**Bredesen's 6 AD Subtypes:**
- Type 1 "Hot" (Inflammatory): CRP↑, IL-6↑, complement activation
- Type 2 "Cold" (Atrophic): hormone↓, trophic support↓
- Type 1.5 "Sweet" (Glycotoxic): insulin resistance + inflammation
- Type 3 "Vile" (Toxic): heavy metals, mycotoxins, biotoxins
- Type 4 "Pale" (Vascular): BBB dysfunction, homocysteine↑
- Type 5 "Dazed" (Traumatic): TBI history

**User requests:**
- Homocysteine/Methylation pathway expansion (MTHFR, B12, folate)
- Heavy metals/Mycotoxins nodes
- More detailed Ketogenic diet mechanism (KetoFLEX 12/3)

## High-Level Approach

### Phase 1: Map Existing Nodes to Bredesen Categories

Create `bredesen_36_holes` preset using existing nodes where possible:

**Type 1 - Inflammatory ("Hot"):**
- `nlrp3_inflammasome`, `il1beta_release`, `microglial_activation`
- `complement_c1q`, `complement_c3`
- `systemic_inflammation`, `gut_permeability`

**Type 2 - Atrophic ("Cold"):**
- `insulin_resistance`, `mtorc1_hyperactive`
- Hormone nodes from M20 (estrogen, testosterone, cortisol)
- `bdnf` (needs creation), `ngf` (needs creation)

**Type 1.5 - Glycotoxic ("Sweet"):**
- `insulin_resistance`
- Advanced glycation end products (AGE) - needs creation

**Type 3 - Toxic ("Vile"):**
- Heavy metals, mycotoxins - needs new module
- `gut_microbiome`, `gut_permeability`

**Type 4 - Vascular ("Pale"):**
- `bbb_breakdown`, `pericyte_injury`, `cypa_elevated`
- `homocysteine` (existing)

**Type 5 - Traumatic ("Dazed"):**
- Traumatic brain injury - needs creation

### Phase 2: New Module M21 - Toxins & Environmental Exposures

Create new module for environmental toxicity factors (Bredesen Type 3 "Toxic" AD).

**Research-backed mechanisms:**

*Heavy metals (Hg, Pb, Cd, As):*
- Mercury binds sulfhydryl groups on glutathione (GSH) → 30% GSH reduction with 50 μg/L exposure
- Mercury → GSH depletion → impaired Phase II detoxification
- Mercury → TNF-α↑ → neuroinflammation
- Mercury → NFT formation + Aβ aggregation
- Lead/Cd → BBB permeability increase
- All heavy metals → mitochondrial dysfunction

*Mycotoxins (ochratoxin A, trichothecenes, aflatoxins, gliotoxin):*
- Produced by molds: Stachybotrys, Aspergillus, Penicillium, Chaetomium, Wallemia
- Mycotoxins → chronic inflammation → complement activation
- Mycotoxins → mitochondrial Complex I inhibition
- Can cause CIRS (Chronic Inflammatory Response Syndrome)

**Bredesen tests:** Urine mycotoxin panel, blood metals, ERMI (mold index), HERTSMI-2

**Nodes:**
- `heavy_metal_burden` - BOUNDARY input for toxic metal load
- `mercury_exposure` - From dental amalgams, large fish (avoid shark/swordfish/tuna)
- `mycotoxin_exposure` - BOUNDARY input for mold/biotoxin exposure
- `glutathione_status` - STOCK for GSH levels (detox capacity)
- `detoxification_capacity` - STATE for Phase I/II function

**Key edges:**
- `heavy_metal_burden` → `glutathione_status` (depletes)
- `heavy_metal_burden` → `ros_production`
- `heavy_metal_burden` → `bbb_breakdown`
- `heavy_metal_burden` → `tau_hyperphosphorylation`
- `mycotoxin_exposure` → `nlrp3_inflammasome`
- `mycotoxin_exposure` → `mitochondrial_dysfunction`
- `glutathione_status` → `detoxification_capacity`

### Phase 3: Expand Methylation/Homocysteine Pathway

Current coverage: `homocysteine` node exists in M07 with edges to CBS enzyme.

**Research-backed mechanism chain:**
1. MTHFR C677T variant (9-17% homozygous, 30-41% heterozygous) → 50% reduced enzyme activity
2. ↓5-MTHF production → impaired homocysteine remethylation
3. Brain lacks BHMT, so entirely dependent on folate/B12 pathway
4. Elevated homocysteine causes:
   - MMP activation → tight junction degradation → BBB dysfunction
   - PP2A inhibition → tau hyperphosphorylation
   - NMDA receptor activation → excitotoxicity
   - Oxidative stress → cob[I]alamin oxidation (further impairs B12 function)
   - DNA hypomethylation → PSEN1/BACE1 upregulation → ↑Aβ

**Bredesen targets:** Homocysteine <7 μmol/L, B12 >500 pg/mL

**Additions needed:**
- `homocysteine_elevated` - BOUNDARY/STOCK with target <7 μmol/L
- `mthfr_variant` - BOUNDARY genetic variant (like APOE/TREM2)
- `methylation_capacity` - STATE for SAM/SAH ratio
- `vitamin_b12_status` - BOUNDARY input
- `folate_status` - BOUNDARY input

**Key edges:**
- `mthfr_variant` → `homocysteine_elevated` (genetic risk)
- `vitamin_b12_status` → `homocysteine_elevated` (inverse)
- `folate_status` → `homocysteine_elevated` (inverse)
- `homocysteine_elevated` → `bbb_breakdown` (via MMP9 activation)
- `homocysteine_elevated` → `tau_hyperphosphorylation` (via PP2A inhibition)
- `homocysteine_elevated` → `ros_production` (oxidative stress)

### Phase 4: Ketogenic Diet Intervention (KetoFLEX 12/3)

Bredesen's KetoFLEX 12/3 is the dietary component of ReCODE:
- **Keto**: Mild ketosis via plant-rich, low-glycemic diet
- **Flex**: Metabolic flexibility (can burn glucose or fat) + flexitarian (meat optional)
- **12/3**: 12-hour daily fast minimum, 3 hours before bed

**Research-backed mechanisms:**
1. **Ketone bodies (BHB) as alternative brain fuel**: Brain glucose metabolism impaired in AD; ketones bypass this. PET shows reduced glucose uptake precedes AD.
2. **BHB inhibits NLRP3 inflammasome**: Direct anti-inflammatory effect via HDAC inhibition
3. **BHB increases BDNF**: Via CREB phosphorylation → synaptic plasticity
4. **Fasting activates autophagy**: 12+ hour fast → AMPK activation, mTORC1 inhibition → TFEB nuclear translocation → autophagy/lysosomal genes
5. **Glymphatic clearance during fasting**: "gives you time at night to induce ketosis, to clean out your brain via the glymphatic system"

**New nodes needed:**
- `ketone_bodies` - STOCK for β-hydroxybutyrate levels
- `ketogenic_diet` - BOUNDARY input (intervention)
- `bdnf_level` - STOCK for brain-derived neurotrophic factor
- `metabolic_flexibility` - STATE for ability to switch fuels

**New edges:**
- `ketogenic_diet` → `ketone_bodies`
- `ketone_bodies` → `nlrp3_inflammasome` (inhibitory)
- `ketone_bodies` → `bdnf_level` (↑)
- `ketone_bodies` → `atp_production` (alternative fuel)
- `fasting_state` → `mtorc1_hyperactive` (↓)
- `fasting_state` → `tfeb_phosphorylated` (↓, releases TFEB to nucleus)
- `fasting_state` → `glymphatic_clearance` (↑, during sleep)

## Key Components

### 1. Preset Definition (presets.ts)

Add `bredesen_36_holes` to hypothesisPresets array with:
- Comprehensive nodeIds covering all six Bredesen types
- Clear description referencing ReCODE protocol
- Color: suggest unique color (perhaps Apollo Health brand color)

### 2. New Module M21 (nodes/m21-toxins-environmental.ts)

New file with ~10-15 nodes covering:
- Heavy metals (Hg, Pb, As, Cd)
- Mycotoxins (ochratoxin A, trichothecenes)
- Detoxification pathways (glutathione, metallothionein)

### 3. Methylation Expansion (nodes/m07-tau.ts or new file)

Expand homocysteine context with methylation cycle nodes.

### 4. Ketogenic Diet (drugLibrary.ts)

Comprehensive lifestyle intervention entry.

## Files to Modify

1. `src/data/mechanisticFramework/presets.ts` - Add Bredesen preset
2. `src/data/mechanisticFramework/nodes/m21-toxins-environmental.ts` - NEW FILE
3. `src/data/mechanisticFramework/nodes/m07-tau.ts` - Expand methylation nodes
4. `src/data/mechanisticFramework/nodes/index.ts` - Export new module
5. `src/data/mechanisticFramework/modules.ts` - Add M21 module definition
6. `src/data/mechanisticFramework/edges.ts` - Add toxin/methylation edges
7. `src/data/mechanisticFramework/drugLibrary.ts` - Add ketogenic diet intervention
8. `src/data/bibliography/hypotheses.ts` or new file - Add Bredesen citations

## Acceptance Criteria

1. "Bredesen 36 Holes" appears in preset dropdown under Hypotheses
2. Selecting preset highlights nodes across multiple modules
3. Heavy metal and mycotoxin nodes render correctly with appropriate module color
4. Methylation pathway shows clear B12/Folate → Homocysteine → Downstream effects
5. Ketogenic diet shows mechanism via insulin, mTOR, NLRP3, and mitochondrial pathways
6. Build passes with no TypeScript errors
7. Network graph renders all new nodes and edges correctly

## Success Metrics

- Preset covers ≥30 of Bredesen's 36 holes (mapped to nodes)
- Users can visualize how Bredesen's categories map to mechanistic pathways
- Toxin module provides clear causal path: exposure → cellular damage → AD pathology

## Open Questions

1. **Bredesen Citation**: Should we cite Bredesen's books directly, or rely on peer-reviewed papers that validate individual mechanisms?
   - Suggestion: Use peer-reviewed evidence for mechanisms; cite Bredesen for the framework concept only

2. **Nutrient Nodes**: How detailed should nutrient deficiency nodes be?
   - Option A: Individual nodes (vitamin_d_status, vitamin_b12_status, zinc_status, etc.)
   - Option B: Grouped nodes (nutrient_deficiency_syndrome)
   - Suggestion: Individual nodes for key ones (B12, D, Zn), grouped for others

3. **MTHFR Variants**: Should we add MTHFR as a genetic boundary node with variants?
   - C677T and A1298C are common polymorphisms affecting methylation
   - Would parallel our APOE/TREM2 variant structure

4. **Bredesen Type 3 Specificity**: Type 3 "Toxic" includes biotoxins, metals, AND infections (like herpes simplex). How much of the infectious etiology should we include?
   - HSV-1 hypothesis has growing evidence
   - Could be its own preset or part of Type 3

## References

**Bredesen Protocol:**
- [Apollo Health - Bredesen Protocol](https://www.apollohealthco.com/bredesen-protocol/)
- [Apollo Health - KetoFLEX 12/3](https://www.apollohealthco.com/ketoflex-12-3/)
- [ReCODE Test Panel](https://www.apollohealthco.com/the-recode-test-panel-list/)
- [ApoE4.Info Wiki - Bredesen Protocol](https://wiki.apoe4.info/wiki/Bredesen_Protocol)
- [FoundMyFitness - Dale Bredesen Interview](https://www.foundmyfitness.com/episodes/dale-bredesen)
- [FastLifeHacks - Bredesen Protocol Summary](https://fastlifehacks.com/bredesen-protocol/)

**Homocysteine/Methylation:**
- [PMC6359124 - MTHFR, Methylation Pathways, B Vitamins in LOAD](https://pmc.ncbi.nlm.nih.gov/articles/PMC6359124/)
- [PMC4485324 - Homocysteine and Cerebrovascular Dysfunction](https://pmc.ncbi.nlm.nih.gov/articles/PMC4485324/)
- [PMC6770069 - MTHFR Mutations and White Matter Disease](https://pmc.ncbi.nlm.nih.gov/articles/PMC6770069/)

**Heavy Metals/Mycotoxins:**
- [PMC7457422 - Oxidative Stress and Metal Toxicity in AD](https://pmc.ncbi.nlm.nih.gov/articles/PMC7457422/)
- [PMC7454042 - Heavy Metals and ADRD](https://pmc.ncbi.nlm.nih.gov/articles/PMC7454042/)
- [Frontiers - Metal Toxicity in AD](https://www.frontiersin.org/journals/pharmacology/articles/10.3389/fphar.2022.903099/full)

**Ketogenic Diet:**
- [FoundMyFitness - KetoFLEX Approach](https://www.foundmyfitness.com/episodes/the-bredesen-protocol-s-ketoflex-approach-to-diet-and-eating-for-alzheimer-s-disease)
