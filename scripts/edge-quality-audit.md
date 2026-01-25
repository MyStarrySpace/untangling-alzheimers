# L1-L3 Edge Quality Audit

Generated: 2026-01-24

## Issues Identified

### 1. neuroinflammation → cognitive_score (TOO DIRECT)

**Current edge:** E-THER.005 (L1 - propentofylline RCT)
```
neuroinflammation → cognitive_score (decreases)
```

**Problem:** This skips critical intermediates. Neuroinflammation doesn't directly affect cognition - it works through:
- Synaptic stripping
- Neuronal death
- Myelin damage
- Circuit dysfunction

**Should be:**
```
neuroinflammation → synaptic_loss → cognitive_score
neuroinflammation → neuronal_death → cognitive_score
neuroinflammation → white_matter_pathology → cognitive_score
```

**Note:** The E-THER.005 edge is documenting a TRIAL FAILURE, not a mechanistic pathway. The trial tested whether reducing neuroinflammation improves cognition directly - it didn't, possibly BECAUSE these intermediates weren't addressed.

---

### 2. aging → c1q (TOO VAGUE)

**Current edge:** E08.001 (L3)
```
source: 'aging'
target: 'c1q'
mechanismDescription: 'C1q increases ~300-fold in aged brain (primarily from microglia)'
```

**Problem:** "Aging" is a boundary condition, not a mechanism. What ASPECT of aging drives C1q elevation?

**Literature suggests:**
- Microglial senescence → C1q upregulation
- Oxidative stress → NF-κB activation → C1q transcription
- Epigenetic drift → loss of transcriptional repression
- Cellular debris accumulation → need for clearance signals

**Should be (pick primary mechanism with evidence):**
```
aging → microglial_phenotype_shift → c1q
   OR
aging → oxidative_stress → nf_kb_active → c1q
   OR
senescent_cells → c1q (SASP includes complement)
```

**Citation check (Stephan 2013):** The paper explicitly states *"the molecular mechanisms responsible are unknown"* - they document the phenomenon but NOT the cause.

**What recent research suggests (2024):**
- Microglia produce and secrete C1q ([PMC3742932](https://pmc.ncbi.nlm.nih.gov/articles/PMC3742932/))
- Microglial senescence occurs with age ([Nature Comms 2023](https://www.nature.com/articles/s42003-023-05027-2))
- Senescent microglia accumulate in white matter
- Oxidative stress → metabolic shift (OXPHOS → glycolysis) in senescent microglia
- Myelin debris overburdens microglia → C1q upregulation

**PROBLEM:** Current L3 confidence is too high - this is CORRELATIONAL, not mechanistically proven.

**Should downgrade to L5-L6 or add intermediate:**
```
aging → microglial_senescence (L4-L5)
microglial_senescence → c1q (L5 - mechanism unclear)
```

---

### 3. a1_astrocytes → neuronal_dysfunction (MISSING INTERMEDIATE)

**Current edge:** E_CM.003 (L3)
```
source: 'a1_astrocytes'
target: 'neuronal_dysfunction'
mechanismDescription: 'A1 astrocytes lose ability to promote neuronal survival and actively induce neuronal death'
```

**Problem:** A1 astrocytes act through SECRETED FACTORS, not direct contact.

**Liddelow 2017 showed:**
1. A1 astrocytes LOSE: synaptogenic support, phagocytosis, glutamate uptake
2. A1 astrocytes GAIN: secretion of neurotoxic factor (identity unknown at time)

**Guttenplan 2021 ([Nature](https://www.nature.com/articles/s41586-021-03960-y), [PMID:34616039](https://pubmed.ncbi.nlm.nih.gov/34616039/)) identified:**
- A1 toxic factor = **saturated lipids** (NOT proteins)
- Lipids are carried in **APOE/APOJ lipoparticles**
- Key enzyme: **ELOVL1** (elongates fatty acids to long-chain saturated lipids)
- ELOVL1 knockout in astrocytes **eliminates toxicity**

**Specific mechanism:**
```
a1_astrocytes → elovl1_upregulated → long_chain_saturated_lipids
                                        ↓
                          apoe_apoj_lipoparticles (carriers)
                                        ↓
                               neuronal_death + ol_death
```

**Should add nodes:**
- `elovl1_activity` - saturated lipid synthesis enzyme
- `astrocyte_toxic_lipids` or `apoe_saturated_lipid_cargo` - the actual toxic species
- Update existing `a1_astrocytes → neuronal_dysfunction` to include intermediate

**Should be:**
```
a1_astrocytes → elovl1_activity → astrocyte_toxic_lipids → neuronal_dysfunction
a1_astrocytes → elovl1_activity → astrocyte_toxic_lipids → ol_death → myelin_breakdown
a1_astrocytes → glutamate_uptake_impaired → excitotoxicity → neuronal_dysfunction
a1_astrocytes → synaptogenic_support_lost → synaptic_dysfunction
```

---

### 4. Proposed New Edge Type: STRUCTURAL_COMPOSITION

**Problem:** Current edges are all CAUSAL. But some relationships are COMPOSITIONAL:

| Relationship | Type | Current Handling |
|--------------|------|------------------|
| astrocyte_endfeet ↔ astrocytes | PART_OF | Not modeled |
| lysosome ↔ microglia | CONTAINED_IN | Not modeled |
| mitochondria ↔ neurons | CONTAINED_IN | Not modeled |
| AQP4 ↔ astrocyte_endfeet | LOCALIZED_TO | Implicit only |

**Why it matters:**
- Astrocyte endfeet are a DISTINCT compartment with different functions than soma
- Lysosomes exist in multiple cell types but may behave differently
- Subcellular localization determines function (e.g., nuclear REST vs cytoplasmic REST)

**Proposed edge types:**
```typescript
type StructuralRelation =
  | 'IS_PART_OF'      // endfeet is part of astrocyte
  | 'CONTAINS'        // astrocyte contains lysosome
  | 'LOCALIZED_TO'    // AQP4 localized to endfoot membrane
  | 'CO_LOCALIZES'    // TREM2 co-localizes with DAP12
```

**Example usage:**
```typescript
{
  id: 'S01.001',
  source: 'astrocyte_endfeet',
  target: 'astrocytes',
  relation: 'IS_PART_OF',
  edgeType: 'STRUCTURAL',
  mechanismDescription: 'Endfeet are specialized astrocyte processes that ensheath blood vessels',
  // No causalConfidence - this is ontological, not causal
}
```

---

### 5. Ammonia Pathway (MISSING INTERMEDIATES)

**Current edges:**
```
E18.025: ammonia_accumulation → astrocyte_swelling (L3)
E18.026: ammonia_accumulation → app_er_translocation (L3)
E18.027: app_er_translocation → abeta_oligomers (L3)
```

**Problem:** Missing the astrocyte-specific context and mechanism.

**Full pathway should include:**
```
Portal ammonia / gut dysbiosis
    ↓
hepatic_encephalopathy OR bbb_ammonia_transport
    ↓
astrocyte_ammonia_uptake (astrocytes are primary NH4+ sinks via GS)
    ↓
glutamine_synthetase_overload
    ↓
├── astrocyte_swelling (osmotic - glutamine accumulation)
├── glutamate_release (calcium-dependent)
└── app_er_translocation (Komatsu 2022 - novel)
    ↓
abeta_production (ER-resident BACE1/PS1 cleavage)
```

**Missing nodes:**
- `astrocyte_glutamine_synthetase` - key enzyme
- `astrocyte_glutamine_accumulation` - osmotic driver
- `hepatic_encephalopathy` or `hyperammonemia` - upstream trigger

**Missing edges:**
- How does ammonia GET to the brain? (liver failure, gut microbiome, BBB transport)
- Why astrocytes specifically? (they express glutamine synthetase)

---

## Recommendations

### Priority 1: Add Missing Intermediates
1. Split `neuroinflammation → cognitive_score` into pathway through neuronal death/synaptic loss
2. Add intermediate for `a1_astrocytes → neuronal_dysfunction` (toxic lipid secretion)
3. Complete ammonia pathway with astrocyte-specific nodes

### Priority 2: Refine "Aging" Edges
1. Identify specific aging mechanism for C1q (likely microglial senescence)
2. Consider whether `aging` should be a boundary node that feeds into specific mechanisms rather than directly to molecular changes

### Priority 3: Implement STRUCTURAL Edge Type
1. Define new edge type schema
2. Add structural relationships for:
   - Astrocyte compartments (endfeet, soma, processes)
   - Organelles (lysosomes, mitochondria) in different cell types
   - Subcellular protein localization

### Priority 4: Citation Verification
1. Verify Stephan 2013 for aging → C1q mechanism
2. Verify Komatsu 2022 for ammonia → APP pathway completeness
3. Check if Guttenplan 2021 identifies specific toxic lipids for A1 → neuron edge
