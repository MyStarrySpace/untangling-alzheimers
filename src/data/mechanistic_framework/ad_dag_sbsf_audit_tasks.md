# AD DAG SBSF Architecture Audit

**Created**: 2026-01-14
**Last Updated**: 2026-01-14
**Purpose**: Systematically correct SBSF architecture errors and standardize edge evidence schema

---

## Module Completion Status

| Module | Status | SBSF v2.0 | Notes |
|--------|--------|-----------|-------|
| 1. Insulin/mTOR/Autophagy | 🔄 Partial | [ ] | Has content, needs v2.0 update |
| 2. Lysosomal Pathology | 🔄 Partial | [ ] | Has content, needs v2.0 update |
| 3. Mitochondrial Dysfunction | 🔄 Partial | [ ] | Has content, needs v2.0 update |
| **4. Inflammasome & Cytokines** | ✅ Complete | [x] | Full schema, 10 edges, 3 interventions |
| 5. Microglial Phenotypes | 🔄 Partial | [ ] | Has content, needs v2.0 update |
| 6. Amyloid Pathology | 🔄 Partial | [ ] | Has content, needs v2.0 update |
| 7. Tau Pathology | 🔄 Partial | [ ] | Has content, needs v2.0 update |
| 7B. CSE/H₂S Pathway | 🔄 Partial | [ ] | Has content, needs v2.0 update |
| **8. Complement & Synaptic Pruning** | ✅ Complete | [x] | Full schema, 7 edges, 2 interventions |
| **9. Iron & Ferroptosis** | ✅ Complete | [x] | Full schema, 9 edges, 5 interventions |
| **10. APOE4 & REST** | ✅ Complete | [x] | Full schema, 12 edges (6 REST/BBB + 6 lipid metabolism), 5 interventions |
| **11. TREM2 & DAM** | ✅ Complete | [x] | Full schema, 11 edges (8 original + 3 new), 3 interventions |
| **12. BBB & Glymphatic** | ✅ Complete | [x] | **TEMPLATE**, 15 edges, 4 interventions |
| **13. Cholinergic & White Matter** | ✅ Complete | [x] | Full schema, 10 edges, 4 interventions; APOE4→OL cholesterol; TrkA agonists |
| 14. MAM & Calcium | ❌ TODO | [ ] | Needs building |
| **15. Clinical Boundaries** | ✅ Complete | [x] | 45+ boundary nodes; PK/biomarkers/safety/logistics; ARIA framework |
| **16. Sex & Ancestry Modifiers** | ✅ Complete | [x] | Full schema, 17 edges; **X-linked genes + Fat distribution genetics + FSH** |
| **17. Temporal Patterns & Constraints** | ✅ Complete | [x] | Red Team resolution; REGULATOR nodes for temporal patterns; intervention timing |

**Completed**: 10/17 modules (Modules 4, 8, 9, 10, 11, 12, 13, 15, 16, 17)
**Template**: Module 12 demonstrates full v2.0 schema

---

## Quick Reference Summary

| Element | Types/Options | Required Fields |
|---------|---------------|-----------------|
| **Node Types** | STOCK, STATE, BOUNDARY | id, type; units (if STOCK) |
| **Node Roles** | REGULATOR, BIOMARKER, THERAPEUTIC_TARGET, DRUG | (optional) |
| **Edge Types** | FLOW, TRANSITION, MODULATION, INFLUENCE | id, source, target, edge_type, relation, mechanism_label, evidence[] |
| **Evidence** | (per edge) | citation, quote, species (NCBITaxon), methodology, causal_confidence |
| **Intervention** | 19 types | id, name, target_id, intervention_type, action, clinical_status |

**Key Principle**: Processes (verbs) are EDGES, not nodes. Nodes are nouns (things that accumulate or have states).

---

## Part 1: Corrected SBSF Architecture

### Core Principle: Processes Are Edges, Not Nodes

In proper stock-flow modeling, processes (verbs) are EDGES, not nodes. Nodes are nouns.

### Node Types (Mutually Exclusive)

| Type | Definition | Criteria | Examples |
|------|------------|----------|----------|
| **STOCK** | Quantities that accumulate over time | **Must have units**; continuously variable; measurable | synapses (count), C1q (ng/mL), GPX4_activity (nmol/min/mg), labile_iron (µM) |
| **STATE** | Categorical/qualitative conditions | Discrete categories; phenotypes; no meaningful units | homeostatic_microglia, DAM_stage2, insulin_resistant, NLRP3_primed |
| **BOUNDARY** | System inputs or outputs | Terminal nodes; model doesn't explain (input) or extend beyond (output) | aging, APOE4_genotype, cognitive_function, mortality |

**Decision rule**: If you can specify units → STOCK. If it's categorical/phenotypic → STATE.

### Node Role Annotations (Optional, Multiple Allowed)

Roles describe functional properties independent of node type:

| Role | Definition | Can Apply To | Examples |
|------|------------|--------------|----------|
| **REGULATOR** | Modulates rate of one or more edges | STOCK, STATE | GPX4 (STOCK+REGULATOR), TREM2 (STOCK+REGULATOR) |
| **BIOMARKER** | Clinically measured; diagnostic/prognostic value | STOCK, STATE | CSF_sTREM2, NfL, pTau181 |
| **THERAPEUTIC_TARGET** | Druggable; subject of therapeutic intervention | STOCK, STATE | mTORC1, NLRP3, C1q |
| **DRUG** | Exogenous intervention compound | STOCK | rapamycin, senolytics, lecanemab |

### Node Schema (Full)

```yaml
node:
  id: "GPX4"                          # Unique identifier (required)
  type: "STOCK"                       # ENUM: STOCK | STATE | BOUNDARY (required)
  
  # Required for STOCK
  units: "nmol/min/mg protein"        # Measurement units
  
  # Optional role annotations
  roles: ["REGULATOR", "THERAPEUTIC_TARGET"]
  
  # Optional: edges this node modulates (if REGULATOR role)
  modulates_edges:
    - edge_id: "lipid_peroxide_detox"
      effect: "increases_rate"        # ENUM: increases_rate | decreases_rate | enables | inhibits
  
  # Optional: timescale of changes
  timescale: "hours"                  # ENUM: milliseconds | seconds | minutes | hours | days | weeks | months | years
  
  # Optional: compartmentalization
  compartments:
    - location: "cytoplasm"
      go_term: "GO:0005737"
    - location: "mitochondria"
      go_term: "GO:0005739"
  
  # Standard references
  references:
    uniprot: "P36969"
    hgnc: "HGNC:4556"
    go_function: "GO:0004602"         # phospholipid-hydroperoxide glutathione peroxidase activity
  
  # Human-readable
  description: "Selenium-dependent enzyme that reduces lipid hydroperoxides; master regulator of ferroptosis"
```

### Timescale Enum

| Value | Range | Biological Examples |
|-------|-------|---------------------|
| `milliseconds` | <1 sec | Calcium transients, action potentials |
| `seconds` | 1-60 sec | Receptor activation, kinase cascades |
| `minutes` | 1-60 min | Protein phosphorylation, gene induction onset |
| `hours` | 1-24 hr | Protein synthesis/degradation, transcriptional responses |
| `days` | 1-7 d | Cell proliferation, inflammatory resolution |
| `weeks` | 1-4 wk | Synapse remodeling, plaque growth |
| `months` | 1-12 mo | Neuronal loss, brain atrophy |
| `years` | >1 yr | Disease progression, cognitive decline |

### Incorrect vs Correct Architecture

**WRONG** (process as node):
```
C1q (STOCK) --[increases]--> complement_mediated_pruning (PROCESS) --[decreases]--> synapses (STOCK)
```

**CORRECT** (process as edge label):
```
C1q (STOCK) --[complement_cascade_pruning | decreases]--> synapses (STOCK)
```

---

### Edge Types (Mutually Exclusive)

Edges represent different kinds of relationships:

| Edge Type | Definition | Conservation Rule | Example |
|-----------|------------|-------------------|---------|
| **FLOW** | Physical transfer of quantity between stocks | Mass-conserving: what leaves source enters target | `Aβ_monomers --[aggregation]--> Aβ_oligomers` |
| **TRANSITION** | Same entity changes categorical state | Count-conserving: same cells, different phenotype | `homeostatic_microglia --[activation]--> DAM_stage1` |
| **MODULATION** | Regulator affects another edge's rate | No transfer; rate modification only | `TREM2 --[enables]--> (DAM_stage1→DAM_stage2)` |
| **INFLUENCE** | Causal effect without direct physical transfer | Non-conserving; indirect pathway | `Aβ_oligomers --[induces]--> C1q_expression` |

**Decision rules:**
- Is quantity physically moving from A to B? → **FLOW**
- Is the same biological entity changing category? → **TRANSITION**  
- Does A change the *rate* of edge X without participating in it? → **MODULATION**
- Does A cause B through indirect/signaling mechanisms? → **INFLUENCE**

### Edge Schema (Full)

```yaml
edge:
  id: "E8.001"                        # Unique identifier (required)
  source_node: "C1q"                  # Source node ID (required)
  target_node: "synapses"             # Target node ID (required)
  
  edge_type: "INFLUENCE"              # ENUM: FLOW | TRANSITION | MODULATION | INFLUENCE (required)
  relation: "decreases"               # ENUM: see Relation Type below (required)
  
  mechanism_label: "complement_mediated_pruning"   # Process name as edge label (required)
  mechanism_description: "C1q tags synapses → C3 cleavage → iC3b opsonization → CR3 recognition → phagocytic engulfment"
  
  # For MODULATION edges only
  modulates_edge: "E7.003"            # Edge ID being modulated
  modulation_effect: "enables"        # ENUM: increases_rate | decreases_rate | enables | inhibits
  
  # For FLOW edges only  
  conserved: true                     # Does mass/count balance?
  
  # For TRANSITION edges only
  reversible: false                   # Can the transition reverse?
  
  evidence:  # Array - at least 1 required (see Evidence Schema below)
    - citation: {...}
      quote: "..."
      species: {...}
      methodology: {...}
```

### Evidence Schema (Required for Every Edge)

Each edge must have at least one evidence entry:

```yaml
evidence:
  - citation:
      pmid: "27033548"                # PubMed ID (required if available)
      doi: "10.1126/science.aad8373"  # DOI (required)
      first_author: "Hong"            # First author surname (required)
      year: 2016                      # Publication year (required)
      title: "Complement and microglia mediate early synapse loss in Alzheimer mouse models"
    
    quote: "Inhibition of C1q, C3, or the microglial complement receptor CR3 reduces the number of phagocytic microglia as well as early synapse loss"  # Direct quote (required)
    
    species:
      ncbi_taxon: "NCBITaxon:10090"   # NCBI Taxonomy ID (required)
      common_name: "mouse"            # Human readable (required)
      strain: "J20 (APP transgenic)"  # Strain/model details (required for T-score)
      translation_category: "T2"     # Disease model rodent
    
    methodology:
      type: "knockout"                # ENUM: see Methodology Enum (required)
      details: "C1qa-/-, C3-/-, Itgam/CR3-/- knockout mice crossed with J20"
      methodology_category: "M3"     # Genetic manipulation
    
    # CALCULABLE CONFIDENCE (required)
    causal_confidence:
      T_score: 2                      # T2: Rodent disease model (J20)
      M_score: 3                      # M3: Knockout
      base_level: "L4"               # 9 - 2 - 3 = 4
      adjustments: []                # No adjustments
      final_level: "L4"              # Final confidence
    
    # Optional fields
    quantitative_data:
      effect_size: "~50% reduction in synapse loss"
      p_value: "<0.05"
      confidence_interval: null
      sample_size: "n=8-12 per group"
    
    figure_reference: "Figure 3A-C"   # Where in paper is key data
    
    limitations: "Mouse model only; no human validation"  # Known caveats
```

**Shorthand notation** (acceptable for inline documentation):
```yaml
causal_confidence: "L4"  # T2 (J20 mouse) + M3 (knockout) = 9-2-3
```

### Relation Type Enum

| Value | Symbol | Definition |
|-------|--------|------------|
| `directlyIncreases` | => | Physical interaction with known mechanism (e.g., kinase phosphorylates substrate) |
| `directlyDecreases` | =| | Physical inhibition with known mechanism |
| `increases` | -> | Indirect/pathway effect, increases target |
| `decreases` | -| | Indirect/pathway effect, decreases target |
| `regulates` | ~ | Direction context-dependent or bidirectional |
| `association` | -- | Correlation only, no causal claim |

### Methodology Enum

| Value | Description |
|-------|-------------|
| `knockout` | Gene deletion (constitutive or conditional) |
| `knockin` | Gene insertion or replacement |
| `knockdown` | RNAi, siRNA, shRNA, ASO |
| `overexpression` | Transgenic overexpression |
| `crispr_edit` | CRISPR-Cas9 editing (specify type) |
| `pharmacological_animal` | Drug/compound intervention in animals |
| `pharmacological_human` | Drug intervention in humans (RCT, clinical trial) |
| `in_vitro_cell_line` | Immortalized cell lines |
| `in_vitro_primary` | Primary cell cultures |
| `iPSC` | Induced pluripotent stem cell models |
| `organoid` | 3D organoid cultures |
| `in_vivo_imaging` | PET, MRI, 2-photon in living subjects |
| `cohort` | Observational human cohort study |
| `case_control` | Case-control study design |
| `cross_sectional` | Single timepoint human study |
| `postmortem` | Human autopsy/brain bank tissue |
| `GWAS` | Genome-wide association study |
| `Mendelian_randomization` | MR causal inference |
| `scRNA-seq` | Single-cell RNA sequencing |
| `bulk_RNA-seq` | Bulk tissue RNA sequencing |
| `proteomics` | Mass spectrometry proteomics |
| `metabolomics` | Metabolite profiling |
| `biochemistry` | In vitro kinase assay, binding assay, etc. |
| `immunohistochemistry` | IHC, IF tissue staining |
| `western_blot` | Protein detection |
| `ELISA` | Enzyme-linked immunosorbent assay |
| `electrophysiology` | Patch clamp, LTP/LTD recording |
| `behavioral` | Animal behavior testing |
| `computational` | In silico modeling/prediction |
| `meta_analysis` | Systematic review with quantitative synthesis |
| `OTHER` | Specify in methodology.details |

### Species Database Codes

| Species | NCBITaxon | Common Name |
|---------|-----------|-------------|
| Homo sapiens | NCBITaxon:9606 | Human |
| Mus musculus | NCBITaxon:10090 | Mouse |
| Rattus norvegicus | NCBITaxon:10116 | Rat |
| Drosophila melanogaster | NCBITaxon:7227 | Fruit fly |
| Caenorhabditis elegans | NCBITaxon:6239 | Nematode |
| Danio rerio | NCBITaxon:7955 | Zebrafish |
| Saccharomyces cerevisiae | NCBITaxon:4932 | Yeast |
| In vitro (cell-free) | N/A | Biochemical assay |

### Causal Confidence Calculation Rubric

**Principle**: Causal confidence (L1-L7) is calculable from two independent scores:
1. **Translation Score (T)**: How directly does this evidence translate to human disease?
2. **Methodology Score (M)**: How strong is the causal inference from the experimental design?

**Formula**: `L = 9 - T - M` (bounded to L1-L7)

---

#### Translation Score (T: 1-4)

| T-Score | Category | Examples | Rationale |
|---------|----------|----------|-----------|
| **T4** | Human in vivo | Clinical trial participants, living human subjects with interventions | Direct relevance; no translation needed |
| **T3** | Human ex vivo / NHP | Postmortem brain, CSF, blood; iPSC from patients; non-human primates | Human tissue or closest model; minor translation gap |
| **T2** | Rodent disease model | 5xFAD, APP/PS1, TREM2-KO, P301S tau, APOE4-KI, aged mice (>18mo) | Recapitulates disease features; moderate translation gap |
| **T1** | WT rodent / lower / in vitro | WT mouse, rat, degu; C. elegans, Drosophila, zebrafish; HEK293, N2a, immortalized lines; cell-free biochemistry | Basic mechanism; significant translation gap |

**Species Classification Reference**:

| NCBITaxon | Common Name | Typical T-Score | Notes |
|-----------|-------------|-----------------|-------|
| 9606 | Human | T4 (in vivo) or T3 (ex vivo) | T4 if living intervention; T3 if postmortem/iPSC |
| 9598 | Chimpanzee | T3 | Rarely used in AD research |
| 9544 | Rhesus macaque | T3 | NHP model |
| 10090 | Mouse (WT) | T1 | Wild-type |
| 10090 | Mouse (transgenic/aged) | T2 | 5xFAD, APP/PS1, APOE4-KI, etc. |
| 10116 | Rat | T1 (WT) or T2 (model) | Specify strain |
| 10160 | Octodon degus | T2 | Natural AD-like pathology |
| 7955 | Zebrafish | T1 | Lower organism |
| 7227 | Drosophila | T1 | Lower organism |
| 6239 | C. elegans | T1 | Lower organism |
| N/A | Cell line (immortalized) | T1 | HEK293, SH-SY5Y, N2a |
| N/A | Primary cells | T1-T2 | T2 if from disease model |
| N/A | Human iPSC | T3 | Patient-derived |
| N/A | Cell-free/biochemistry | T1 | In vitro assay |

---

#### Methodology Score (M: 1-4)

| M-Score | Category | Examples | Rationale |
|---------|----------|----------|-----------|
| **M4** | Randomized controlled intervention | RCT, crossover trial, randomized animal intervention | Gold standard for causation; controls confounders |
| **M3** | Genetic manipulation / MR | Knockout, knockin, CRISPR edit, Mendelian randomization, ASO/siRNA | Specific target manipulation; strong causal inference |
| **M2** | Pharmacological / controlled intervention | Drug treatment (non-randomized), chemical inhibitor, iPSC differentiation manipulation | Intervention with controls; moderate specificity |
| **M1** | Observational / correlational | Cohort, case-control, cross-sectional, postmortem correlation, scRNA-seq, GWAS association, computational prediction | No intervention; association only |

**Methodology Classification Reference**:

| Methodology Type | Typical M-Score | Notes |
|------------------|-----------------|-------|
| `pharmacological_human` (RCT) | M4 | Randomized clinical trial |
| `pharmacological_human` (open-label) | M2 | Non-randomized intervention |
| `Mendelian_randomization` | M3 | Genetic instrument for causation |
| `knockout` | M3 | Gene deletion |
| `knockin` | M3 | Gene insertion |
| `crispr_edit` | M3 | CRISPR-Cas9 editing |
| `knockdown` | M3 | RNAi, siRNA, shRNA, ASO |
| `overexpression` | M3 | Transgenic overexpression |
| `pharmacological_animal` | M2 | Drug intervention in animals |
| `iPSC` (with manipulation) | M2 | Differentiation + intervention |
| `iPSC` (observational) | M1 | Patient vs control comparison only |
| `organoid` (with manipulation) | M2 | Intervention in 3D culture |
| `in_vitro_primary` | M2 | Primary culture + intervention |
| `in_vitro_cell_line` | M2 | Cell line + intervention |
| `electrophysiology` | M2 | Functional measurement (often with intervention) |
| `cohort` | M1 | Observational longitudinal |
| `case_control` | M1 | Observational comparison |
| `cross_sectional` | M1 | Single timepoint |
| `postmortem` | M1 | Human autopsy correlation |
| `GWAS` | M1 | Association only (use MR for causal) |
| `scRNA-seq` | M1 | Correlational profiling |
| `bulk_RNA-seq` | M1 | Correlational profiling |
| `proteomics` | M1 | Correlational profiling |
| `metabolomics` | M1 | Correlational profiling |
| `immunohistochemistry` | M1 | Descriptive staining |
| `western_blot` | M1 | Protein detection |
| `ELISA` | M1 | Biomarker measurement |
| `biochemistry` (binding/activity) | M2 | In vitro mechanistic |
| `behavioral` | M1-M2 | M2 if intervention-driven |
| `in_vivo_imaging` | M1-M2 | M2 if intervention-driven |
| `computational` | M1 | In silico prediction |
| `meta_analysis` | +0.5 | Bonus: add to base methodology |

---

#### Confidence Level Calculation Matrix

| | M4 (RCT) | M3 (Genetic/MR) | M2 (Pharma/Controlled) | M1 (Observational) |
|---|:---:|:---:|:---:|:---:|
| **T4 (Human in vivo)** | **L1** | **L2** | **L3** | **L4** |
| **T3 (Human ex vivo/NHP)** | **L2** | **L3** | **L4** | **L5** |
| **T2 (Rodent disease model)** | **L3** | **L4** | **L5** | **L6** |
| **T1 (WT/lower/in vitro)** | **L4** | **L5** | **L6** | **L7** |

**Worked Examples**:

| Evidence Description | Species | T | Methodology | M | L = 9-T-M |
|---------------------|---------|---|-------------|---|-----------|
| Lecanemab Phase 3 RCT | Human (in vivo) | 4 | pharmacological_human (RCT) | 4 | **L1** |
| TREM2 R47H Mendelian randomization | Human (genetic) | 4 | Mendelian_randomization | 3 | **L2** |
| TREM2-KO in 5xFAD mice | Mouse (disease model) | 2 | knockout | 3 | **L4** |
| Deferiprone in PD patients (open-label) | Human (in vivo) | 4 | pharmacological_human (open) | 2 | **L3** |
| C1q-/- aging mice (WT background) | Mouse (aged WT) | 1* | knockout | 3 | **L5** |
| Rapamycin in APP/PS1 mice | Mouse (disease model) | 2 | pharmacological_animal | 2 | **L5** |
| Human postmortem AD vs control | Human (postmortem) | 3 | postmortem | 1 | **L5** |
| APOE4 iPSC-derived neurons + CRISPR | Human iPSC | 3 | crispr_edit | 3 | **L3** |
| scRNA-seq of 5xFAD microglia | Mouse (disease model) | 2 | scRNA-seq | 1 | **L6** |
| AlphaFold structure prediction | In silico | 1 | computational | 1 | **L7** |

*Note: Aged WT mice get T1 unless specifically modeling disease aspect (e.g., age-related C1q increase IS the phenotype being studied, so could argue T2)

---

#### Adjustments and Edge Cases

**Upgrading (+0.5 to +1 level, round to nearest)**:
- Multiple independent replication across labs: +0.5
- Rescue experiment (KO + reconstitution): +0.5
- Bidirectional manipulation (both KO and overexpression): +0.5
- Human validation of animal finding: +1
- Meta-analysis of multiple studies: +0.5

**Downgrading (-0.5 to -1 level)**:
- Single study, no replication: -0.5
- Known species-specific effect: -0.5
- Conflicting results in literature: -0.5
- Small sample size (n<5/group): -0.5

**Recording in YAML**:
```yaml
causal_confidence:
  T_score: 2
  T_rationale: "5xFAD transgenic mouse (disease model)"
  M_score: 3
  M_rationale: "TREM2 knockout"
  base_level: "L4"  # 9 - 2 - 3 = 4
  adjustments:
    - "+0.5: rescue experiment included"
    - "-0.5: single lab, no replication"
  final_level: "L4"  # No net change
```

---

#### Confidence Level Definitions (Reference)

| Level | Interpretation | Typical Evidence Pattern |
|-------|---------------|-------------------------|
| **L1** | Clinical causal evidence | Human RCT with outcome |
| **L2** | Strong human causal inference | Mendelian randomization; human genetic intervention |
| **L3** | Human intervention or strong animal genetic | Human pharma (controlled); iPSC + genetic manipulation |
| **L4** | Animal genetic causal | Knockout/knockin in disease model |
| **L5** | Animal pharmacological or human correlational | Drug in disease model; human postmortem |
| **L6** | Animal correlational or in vitro mechanistic | scRNA-seq in models; cell line experiments |
| **L7** | Computational or indirect | In silico; GWAS association without MR |

---

### Intervention Schema

Interventions are therapeutic or experimental manipulations that target nodes or edges. Essential for simulation.

```yaml
intervention:
  id: "INT_001"                        # Unique identifier (required)
  name: "Rapamycin"                    # Common/generic name (required)
  aliases: ["Sirolimus", "Rapamune"]   # Trade names, synonyms
  
  # What it targets
  target_type: "node"                  # ENUM: node | edge (required)
  target_id: "mTORC1"                  # Node or edge ID (required)
  
  # Mechanism
  intervention_type: "small_molecule_inhibitor"  # ENUM: see below (required)
  mechanism_of_action: "Binds FKBP12; complex inhibits mTORC1 kinase activity"
  action: "decreases"                  # ENUM: increases | decreases | activates | inhibits | stabilizes | destabilizes
  
  # Quantitative parameters for simulation
  parameters:
    effect_magnitude: 0.85             # Fractional effect at therapeutic dose (0-1)
    ic50: "0.1 nM"                     # Half-maximal inhibition concentration
    ec50: null                         # Half-maximal effective concentration (for agonists)
    hill_coefficient: 1.2              # Cooperativity
    time_to_effect: "hours"            # ENUM: immediate | minutes | hours | days | weeks
    duration: "reversible"             # ENUM: reversible | irreversible | sustained
    half_life: "62 hours"              # Pharmacokinetic half-life
  
  # Clinical status
  clinical_status: "approved_other"    # ENUM: see below (required)
  indication_status:                   # Disease-specific status
    - indication: "Alzheimer's disease"
      status: "phase_2"
      trial_id: "NCT04629495"
    - indication: "organ transplant rejection"
      status: "approved"
      year_approved: 1999
  
  # For failed interventions - critical learning
  failure_analysis:
    failed: false
    failure_stage: null                # ENUM: preclinical | phase_1 | phase_2 | phase_3
    failure_reason: null               # ENUM: see below
    failure_details: null
  
  # Evidence
  evidence:
    - citation: {pmid: "22343943", ...}
      quote: "Rapamycin treatment activates TFEB..."
      species: {ncbi_taxon: "NCBITaxon:10090", ...}
      methodology: {type: "pharmacological_animal", ...}
  
  # Practical info
  route_of_administration: "oral"      # ENUM: oral | iv | sc | intrathecal | topical | intranasal
  blood_brain_barrier: "poor"          # ENUM: good | moderate | poor | unknown
  
  # References
  references:
    drugbank: "DB00877"
    chebi: "CHEBI:9168"
    pubchem_cid: "5284616"
```

### Intervention Type Enum

| Value | Description | Examples |
|-------|-------------|----------|
| `small_molecule_inhibitor` | Decreases target activity | Rapamycin, RSL3, MCC950 |
| `small_molecule_agonist` | Increases target activity | TREM2 agonists |
| `small_molecule_activator` | Allosteric activator | AMPK activators |
| `small_molecule_stabilizer` | Prevents degradation | TFEB stabilizers |
| `monoclonal_antibody` | Therapeutic antibody | Lecanemab, Aducanumab, AL002 |
| `bispecific_antibody` | Dual-target antibody | - |
| `antisense_oligonucleotide` | ASO knockdown | MAPT ASO |
| `sirna` | siRNA knockdown | - |
| `gene_therapy_knockdown` | AAV-shRNA, etc. | - |
| `gene_therapy_overexpression` | AAV-mediated expression | AAV-TREM2 |
| `gene_therapy_editing` | CRISPR therapeutics | Base editing |
| `cell_therapy` | CAR-T, stem cells | - |
| `peptide` | Therapeutic peptide | - |
| `enzyme_replacement` | Recombinant enzyme | - |
| `lifestyle_sleep` | Sleep intervention | Sleep extension, CPAP |
| `lifestyle_exercise` | Exercise intervention | Aerobic training |
| `lifestyle_diet` | Dietary intervention | Ketogenic, Mediterranean |
| `device` | Medical device | Focused ultrasound BBB opening |
| `OTHER` | Specify in mechanism_of_action | - |

### Clinical Status Enum

| Value | Description |
|-------|-------------|
| `preclinical` | Animal studies only |
| `phase_1` | Safety/dosing in humans |
| `phase_2` | Efficacy signal in humans |
| `phase_3` | Pivotal efficacy trials |
| `approved_AD` | Approved for Alzheimer's disease |
| `approved_other` | Approved for other indication (repurposing candidate) |
| `failed` | Development discontinued |
| `withdrawn` | Removed from market |

### Failure Reason Enum (Critical for Learning)

| Value | Description | Example |
|-------|-------------|---------|
| `no_efficacy` | Primary endpoint not met | Aducanumab EMERGE inconsistency |
| `wrong_target` | Target hypothesis incorrect | BACE inhibitors → worse cognition |
| `wrong_timing` | Intervention too late in disease | Most Aβ trials in symptomatic AD |
| `wrong_population` | Patient selection suboptimal | Not stratified by APOE4 |
| `insufficient_engagement` | Target not adequately modulated | Dose too low, poor BBB penetration |
| `safety_toxicity` | Unacceptable adverse effects | ARIA with anti-amyloid antibodies |
| `safety_off_target` | Off-target toxicity | BACE inhibitors: liver, cognition |
| `pharmacokinetics` | Poor PK/bioavailability | CNS exposure insufficient |
| `commercial` | Business decision, not scientific | - |
| `OTHER` | Specify in failure_details | - |

### Linking Interventions to Network

```yaml
# In node schema, add:
node:
  id: "mTORC1"
  type: STOCK
  # ... other fields ...
  
  interventions:  # Array of intervention IDs targeting this node
    - intervention_id: "INT_rapamycin"
      effect: "decreases"
    - intervention_id: "INT_everolimus"
      effect: "decreases"

# In edge schema, add:
edge:
  id: "E6.001"
  source_node: "APP"
  target_node: "Abeta_monomers"
  mechanism_label: "beta_secretase_cleavage"
  # ... other fields ...
  
  interventions:  # Interventions targeting this edge/process
    - intervention_id: "INT_verubecestat"
      effect: "decreases"
      status: "failed"
      failure_reason: "safety_off_target"
```

### Key AD Interventions to Document

| Intervention | Target | Type | Status | Notes |
|--------------|--------|------|--------|-------|
| **Lecanemab** | Aβ_protofibrils | monoclonal_antibody | approved_AD | First disease-modifying approval |
| **Donanemab** | Aβ_plaques (N3pG) | monoclonal_antibody | approved_AD | Plaque clearance |
| **Aducanumab** | Aβ_aggregates | monoclonal_antibody | withdrawn | Controversial, removed 2024 |
| **BACE inhibitors** | APP_processing (edge) | small_molecule_inhibitor | failed | Verubecestat - worse cognition |
| **Rapamycin** | mTORC1 | small_molecule_inhibitor | phase_2 | Autophagy enhancement |
| **MCC950** | NLRP3 | small_molecule_inhibitor | preclinical | Inflammasome inhibition |
| **AL002** | TREM2 | monoclonal_antibody | phase_2 | TREM2 agonist |
| **Senolytics** | senescent_cells | small_molecule_inhibitor | phase_2 | Dasatinib + quercetin |
| **ANX005** | C1q | monoclonal_antibody | phase_2 | Complement inhibition |
| **MAPT ASO** | tau (mRNA) | antisense_oligonucleotide | phase_1 | Tau reduction |

### Simulation Use Cases

With this schema, you can simulate:

1. **Single intervention**: "What if I inhibit mTORC1 by 85%?"
2. **Combination therapy**: "Rapamycin + lecanemab together?"
3. **Timing experiments**: "Early vs late intervention?"
4. **Patient stratification**: "APOE4 carriers vs non-carriers?"
5. **Failure analysis**: "Why did BACE inhibitors fail?"
6. **Repurposing**: "Could rapamycin work in AD?"

### Compartment Modeling (Optional)

For proteins that exist in multiple locations with location-dependent function:

```yaml
node:
  id: "REST"
  type: STOCK
  units: "molecules"
  compartments:
    - location: "nucleus"
      go_term: "GO:0005634"
      function: "Transcriptional repressor of neuronal genes"
    - location: "cytoplasm"  
      go_term: "GO:0005737"
      function: "Inactive; sequestered from target genes"

# Transport between compartments modeled as FLOW edge
edge:
  id: "REST_nuclear_import"
  source_node: "REST"
  target_node: "REST"
  edge_type: "FLOW"
  relation: "regulates"
  from_compartment: "cytoplasm"
  to_compartment: "nucleus"
  mechanism_label: "importin_mediated_transport"
```

**When to use compartments:**
- Protein has distinct functions in different locations (REST, TFEB, NFκB)
- Localization is a key regulatory mechanism
- Disease involves mis-localization

**When NOT needed:**
- Protein functions in only one compartment
- Location isn't mechanistically relevant to the model

---

## Part 2: PROCESS Node Audit by Module

### Instructions

For each PROCESS node listed below:
1. **RECLASSIFY** - Determine if it should become:
   - An **edge label** (most common - the process connects two stocks)
   - A **REGULATOR** (if it controls rates but has multiple inputs/outputs)
   - A **STATE** (if it's really a phenotypic condition)
   - **DELETED** (if redundant with edge)

2. **IDENTIFY CONNECTED STOCKS** - What stocks does this process connect?

3. **DOCUMENT EVIDENCE** - Ensure at least 1 source with full schema

---

### Module 1: Insulin/mTOR/Autophagy

| Current Node | Current Type | Reclassify To | Edge Type | Connected Nodes | Status |
|--------------|--------------|---------------|-----------|-----------------|--------|
| lysosomal_genes_down | PROCESS | EDGE | INFLUENCE | TFEB_cytoplasmic --[decreases]--> lysosomal_proteins | [ ] |
| mitophagy_rate_reduced | PROCESS | EDGE | FLOW (blocked) | damaged_mitochondria --X--> (clearance) | [ ] |

**Notes**: 
- `lysosomal_genes_down` is TFEB sequestration → reduced transcription (INFLUENCE on gene expression)
- `mitophagy_rate_reduced` describes blocked clearance - model as reduced FLOW rate

---

### Module 2: NLRP3 Inflammasome

| Current Node | Current Type | Reclassify To | Edge Type | Connected Nodes | Status |
|--------------|--------------|---------------|-----------|-----------------|--------|
| NLRP3_priming | PROCESS | STATE: NLRP3_primed | N/A (node) | - | [ ] |
| NLRP3_activation | PROCESS | EDGE | TRANSITION | NLRP3_primed → NLRP3_active | [ ] |
| caspase1_cleavage | PROCESS | EDGE | FLOW | pro_caspase1 → active_caspase1 | [ ] |
| IL1B_maturation | PROCESS | EDGE | FLOW | pro_IL1B → IL1B_mature | [ ] |
| IL18_maturation | PROCESS | EDGE | FLOW | pro_IL18 → IL18_mature | [ ] |
| GSDMD_cleavage | PROCESS | EDGE | FLOW | GSDMD → GSDMD_NT | [ ] |
| pyroptosis | PROCESS | EDGE | TRANSITION | viable_cell → pyroptotic_cell | [ ] |

**Notes**:
- Inflammasome has clear two-step model: priming (STATE) then activation (TRANSITION)
- Cleavage events are FLOW edges (substrate → product)
- Pyroptosis is a cell state TRANSITION

---

### Module 3: cGAS-STING

| Current Node | Current Type | Reclassify To | Edge Type | Connected Nodes | Status |
|--------------|--------------|---------------|-----------|-----------------|--------|
| cGAS_activation | PROCESS | EDGE | FLOW | cytosolic_DNA + cGAS → cGAMP | [ ] |
| STING_activation | PROCESS | STATE: STING_active | N/A (node) | - | [ ] |
| TBK1_activation | PROCESS | EDGE | FLOW | TBK1 → pTBK1 | [ ] |
| IRF3_activation | PROCESS | EDGE | FLOW | IRF3_cytoplasmic → IRF3_nuclear | [ ] |
| IFN_response | PROCESS | EDGE | INFLUENCE | IRF3_nuclear --[increases]--> IFN_genes | [ ] |

**Notes**:
- cGAS catalyzes cGAMP synthesis = FLOW
- STING_active is a STATE (conformational change)
- TBK1/IRF3 phosphorylation = FLOW (substrate → product)

---

### Module 4: Inflammasome & Cytokines ✅ COMPLETE (2026-01-14)

| Current Node | Current Type | Reclassify To | Edge Type | Connected Nodes | Status |
|--------------|--------------|---------------|-----------|-----------------|--------|
| NFkB_activation | PROCESS | EDGE | FLOW | NFkB_cytoplasmic → NFkB_nuclear | [x] |
| cytokine_release | PROCESS | EDGE | FLOW | intracellular_cytokines → extracellular_cytokines | [x] |
| astrocyte_reactivity | PROCESS | STATE: reactive_astrocyte | N/A (node) | - | [x] |
| microglia_activation | PROCESS | STATE: activated_microglia | N/A (node) | - | [x] |

**Completed**: Full SBSF v2.0 schema with 10 YAML edges (ox-mtDNA→NLRP3, cathepsin→NLRP3, NLRP3→tau via GSK3β/PP2A, cGAS-STING pathway), 3 interventions (MCC950, STING inhibitors, Anakinra), NLRP3-tau feedback loop documented, bibliography with 5 DOIs.

---

### Module 5: Lipid-Droplet Microglia (LDAM)

| Current Node | Current Type | Reclassify To | Edge Type | Connected Nodes | Status |
|--------------|--------------|---------------|-----------|-----------------|--------|
| phagocytosis_impaired | PROCESS | EDGE (reduced rate) | FLOW | debris --[reduced rate]--> degraded | [ ] |
| lipid_droplet_accumulation | PROCESS | EDGE | FLOW | free_lipids → lipid_droplets | [ ] |
| ROS_production | PROCESS | EDGE | FLOW | O2 + NADPH → ROS | [ ] |

**Notes**:
- "Impaired phagocytosis" = reduced rate of existing FLOW edge
- Model as FLOW with rate modifier from LDAM STATE

---

### Module 6: Amyloid Cascade

| Current Node | Current Type | Reclassify To | Edge Type | Connected Nodes | Status |
|--------------|--------------|---------------|-----------|-----------------|--------|
| APP_processing | PROCESS | EDGE | FLOW | APP → Aβ_monomers + sAPP | [ ] |
| Abeta_aggregation | PROCESS | EDGE | FLOW | Aβ_monomers → Aβ_oligomers → Aβ_fibrils | [ ] |
| Abeta_clearance_impaired | PROCESS | EDGE (reduced rate) | FLOW | Aβ --[reduced]--> degraded | [ ] |
| plaque_formation | PROCESS | EDGE | FLOW | Aβ_fibrils → Aβ_plaques | [ ] |

**Notes**:
- All amyloid cascade steps are FLOW (mass-conserving transformations)
- "Impaired clearance" = reduced rate constant on degradation FLOW

---

### Module 7: Tau Pathology

| Current Node | Current Type | Reclassify To | Edge Type | Connected Nodes | Status |
|--------------|--------------|---------------|-----------|-----------------|--------|
| tau_hyperphosphorylation | PROCESS | EDGE | FLOW | tau → pTau | [ ] |
| tau_aggregation | PROCESS | EDGE | FLOW | pTau_soluble → tau_oligomers → NFTs | [ ] |
| tau_propagation | PROCESS | EDGE | FLOW | tau_donor_neuron → tau_recipient_neuron (via exosomes) | [ ] |
| microtubule_destabilization | PROCESS | EDGE | INFLUENCE | pTau --[decreases]--> microtubule_integrity | [ ] |

**Notes**:
- Phosphorylation and aggregation are FLOW (biochemical transformation)
- Propagation is FLOW (physical transfer via exosomes)
- Microtubule destabilization is INFLUENCE (pTau disrupts without being consumed)

---

### Module 8: Complement & Synaptic Pruning ✅ COMPLETE (2026-01-14)

| Current Node | Current Type | Reclassify To | Edge Type | Connected Nodes | Status |
|--------------|--------------|---------------|-----------|-----------------|--------|
| C3_cleavage | PROCESS | EDGE | FLOW | C3 → C3a + C3b → iC3b | [x] |
| complement_mediated_pruning | PROCESS | EDGE | INFLUENCE | iC3b --[decreases]--> synapses | [x] |

**Completed**: Full SBSF v2.0 schema with 7 YAML edges (aging→C1q, Aβ→C1q, cascade, CR3 engulfment), 2 interventions (ANX005, C3 inhibitors), bibliography with 4 foundational DOIs.

---

### Module 9: Iron & Ferroptosis ✅ COMPLETE (2026-01-14)

| Current Node | Current Type | Reclassify To | Edge Type | Connected Nodes | Status |
|--------------|--------------|---------------|-----------|-----------------|--------|
| iron_accumulation | PROCESS | EDGE | FLOW | extracellular_iron → labile_iron_pool | [x] |
| lipid_peroxidation | PROCESS | EDGE | FLOW | PUFA → lipid_peroxides (Fe²⁺ catalyzed) | [x] |
| ferroptosis_execution | PROCESS | EDGE | TRANSITION | viable_cell → ferroptotic_cell | [x] |
| GPX4_activity | PROCESS | STOCK+REGULATOR | N/A (node) | Units: nmol/min/mg | [x] |

**Completed**: Full SBSF v2.0 schema with 18 STOCK nodes, 3 STATE nodes, 9 YAML edges with evidence, 5 interventions, bibliography with DOIs.

---

### Module 10: REST/APOE4 & Epigenetics ✅ COMPLETE (2026-01-14)

| Current Node | Current Type | Reclassify To | Edge Type | Connected Nodes | Status |
|--------------|--------------|---------------|-----------|-----------------|--------|
| REST_nuclear_export | PROCESS | EDGE | FLOW | REST_nuclear → REST_cytoplasmic | [x] |
| progenitor_renewal_reduced | PROCESS | EDGE | INFLUENCE | REST_nuclear --[increases]--> progenitor_cells | [x] |

**Completed**: Full SBSF v2.0 schema with APOE4-CypA-BBB axis, REST-Nrf2-ferroptosis axis, 6 YAML edges with evidence, 2 interventions, bibliography with DOIs.

---

### Module 11: TREM2 & DAM ✅ COMPLETE (2026-01-14)

| Current Node | Current Type | Reclassify To | Edge Type | Connected Nodes | Status |
|--------------|--------------|---------------|-----------|-----------------|--------|
| TREM2_signaling | REGULATOR | STOCK+REGULATOR ✓ | N/A (node) | Units: signaling activity | [x] |
| APOE_lipid_delivery | PROCESS | EDGE | FLOW | APOE_lipidated → (TREM2 binding) | [x] |

**Completed**: Full SBSF v2.0 schema with 8 YAML edges, DAM/DIM/senescent paradigm updates, 2 interventions (AL002, ABT-737), bibliography with 7 DOIs.

---

### Module 12: BBB & Glymphatic ✅ COMPLETE (2026-01-14)

| Current Node | Current Type | Reclassify To | Edge Type | Connected Nodes | Status |
|--------------|--------------|---------------|-----------|-----------------|--------|
| peripheral_immune_infiltration | PROCESS | EDGE | FLOW | peripheral_immune_cells → brain_immune_cells | [x] |
| glymphatic_flow | PROCESS | EDGE | FLOW | CSF → ISF (convective exchange) | [x] |
| waste_clearance | PROCESS | EDGE | FLOW | ISF_solutes → cervical_lymph_nodes | [x] |

**Completed**: **TEMPLATE MODULE** - Full SBSF v2.0 schema with 19 nodes (16 STOCK, 2 STATE, 3 BOUNDARY including oxidative_stress), 15 YAML edges with evidence, 4 interventions, bibliography with 10 DOIs.

---

### Module 13: Cholinergic & White Matter (TO BUILD)

| Current Node | Current Type | Reclassify To | Edge Type | Connected Nodes | Status |
|--------------|--------------|---------------|-----------|-----------------|--------|
| OPC_differentiation | PROCESS | EDGE | TRANSITION | OPCs → oligodendrocytes | [ ] |

**Notes**:
- OPC differentiation is TRANSITION (same cells, different state)

---

### Module 14: MAM & Calcium (TO BUILD)

| Current Node | Current Type | Reclassify To | Edge Type | Connected Nodes | Status |
|--------------|--------------|---------------|-----------|-----------------|--------|
| ER_mito_calcium_transfer | PROCESS | EDGE | FLOW | ER_calcium → mito_calcium | [ ] |
| calcium_dysregulation | PROCESS | STATE: calcium_dysregulated | N/A (node) | - | [ ] |

**Notes**:
- Calcium transfer at MAM is FLOW (ion transport through IP3R/VDAC/MCU)
- Calcium dysregulation is a STATE (qualitative condition)

---

### Module 16: Sex & Ancestry Modifiers ✅ COMPLETE (2026-01-14)

| Current Node | Current Type | Reclassify To | Edge Type | Connected Nodes | Status |
|--------------|--------------|---------------|-----------|-----------------|--------|
| sex_female / sex_male | N/A | BOUNDARY | N/A | Input node | [x] |
| ancestry_* | N/A | BOUNDARY | N/A | Input nodes (EUR/AFR/AI/EAS) | [x] |
| APOE_local_ancestry | N/A | BOUNDARY | N/A | Input node (ancestry at APOE locus) | [x] |
| lysosomal_pH | N/A | STOCK | N/A | Measurable; pH units | [x] |
| LDAM_susceptibility | N/A | STATE | N/A | Qualitative propensity | [x] |
| **SLC9A7_expression** | N/A | STOCK | N/A | **X-linked; #1 AD risk locus** | [x] |
| **ATP6AP2_expression** | N/A | STOCK | N/A | **X-linked; v-ATPase assembly** | [x] |
| **LAMP2_expression** | N/A | STOCK | N/A | **X-linked; autophagy completion** | [x] |
| **visceral_adipose_tissue** | N/A | STOCK | N/A | **VAT; ancestry-specific** | [x] |
| **FSH_level** | N/A | STOCK | N/A | **Direct neuronal AD effects** | [x] |
| **RSPO3_expression** | N/A | STOCK | N/A | **Fat distribution via Wnt** | [x] |

**Completed**: Full SBSF v2.0 schema with:
- **22 nodes**: 8 BOUNDARY (sex, ancestry inputs), 4 STOCK (hormones, lysosomal function, lipids), 2 STATE, **4 X-linked gene nodes**, **4 fat distribution nodes**
- **17 YAML edges** with full evidence:
  1. Sex → lysosome → immune chain
  2. Ancestry → lipid → APOE chain  
  3. **X-linked gene → pH/lysosome chain**
  4. **Ancestry → VAT → neuroinflammation chain**
  5. **FSH → direct neuronal Aβ/Tau**
- **Key papers**:
  - **Belloy 2024 JAMA Neurology**: SLC9A7 = #1 X-linked AD risk locus (n=1.15M)
  - **Xiong 2022 Nature**: FSH acts directly on neurons → Aβ/Tau; blockade reverses AD
  - **Camilleri 2021 Genes**: Africans have less VAT, Asians have more VAT
  - **Heid 2010 Nat Genet**: 7/14 fat distribution loci show sexual dimorphism
- **Bibliography**: 20 DOIs

---

### Edges Missing Required Evidence Fields

After reclassifying PROCESS nodes, audit all edges for:

| Requirement | Check |
|-------------|-------|
| At least 1 citation (PMID or DOI) | [ ] |
| Direct quote from source | [ ] |
| Species with NCBITaxon code | [ ] |
| Methodology enum value | [ ] |
| Causal confidence level | [ ] |

---

## Part 4: Progress Tracking

### Module Completion Status

| Module | PROCESS Audit | Edge Evidence | Interventions | Complete |
|--------|---------------|---------------|---------------|----------|
| 1. Insulin/mTOR | [ ] | [ ] | [ ] | [ ] |
| 2. NLRP3 | [ ] | [ ] | [ ] | [ ] |
| 3. cGAS-STING | [ ] | [ ] | [ ] | [ ] |
| 4. Neuroinflammation | [ ] | [ ] | [ ] | [ ] |
| 5. LDAM | [ ] | [ ] | [ ] | [ ] |
| 6. Amyloid | [ ] | [ ] | [ ] | [ ] |
| 7. Tau | [ ] | [ ] | [ ] | [ ] |
| 8. Complement | [ ] | [ ] | [ ] | [ ] |
| 9. Ferroptosis | [ ] | [ ] | [ ] | [ ] |
| 10. REST/APOE4 | [ ] | [ ] | [ ] | [ ] |
| 11. TREM2/DAM | [ ] | [ ] | [ ] | [ ] |
| **12. BBB/Glymphatic** | **[x]** | **[x]** | **[x]** | **[x]** |
| 13. Cholinergic/WM | [ ] | [ ] | [ ] | [ ] |
| 14. MAM/Calcium | [ ] | [ ] | [ ] | [ ] |

### Interventions to Document by Module

| Module | Target Nodes/Edges | Key Interventions | Status |
|--------|-------------------|-------------------|--------|
| 1. Insulin/mTOR | mTORC1, AMPK, TFEB | Rapamycin, Metformin, Trehalose | [ ] |
| 2. NLRP3 | NLRP3, IL1B | MCC950, Dapansutrile, Canakinumab | [ ] |
| 3. cGAS-STING | STING, TBK1 | H-151, STING inhibitors | [ ] |
| 4. Neuroinflammation | NFkB, TNFα, IL6 | NSAIDs, TNF inhibitors | [ ] |
| 5. LDAM | lipid_droplets, phagocytosis | Statins (indirect) | [ ] |
| 6. Amyloid | APP_processing, Aβ | BACE inhibitors (failed), Lecanemab, Donanemab | [ ] |
| 7. Tau | tau, pTau | MAPT ASO, Tau antibodies | [ ] |
| 8. Complement | C1q, C3 | ANX005, Pegcetacoplan | [ ] |
| 9. Ferroptosis | GPX4, lipid_peroxidation | Liproxstatin-1, Ferrostatin-1, Iron chelators | [ ] |
| 10. REST/APOE4 | REST, APOE | Valproic acid (HDAC), Gene therapy | [ ] |
| 11. TREM2/DAM | TREM2, DAM | AL002, DNL919 | [ ] |
| 12. BBB/Glymphatic | pericytes, AQP4 | VEGF-C, Sleep interventions | [ ] |
| 13. Cholinergic/WM | ACh, BFCNs | AChE inhibitors (Donepezil), NGF | [ ] |
| 14. MAM/Calcium | MAM, calcium | - | [ ] |

---

## Part 5: Red Team Stress Test Resolution

**Date**: 2026-01-14
**Status**: ✅ All 5 paradoxes resolved via Module 17 (proper SBSF)

### Resolution Approach

The red team findings were NOT addressed via a "limitations" section, but by creating **Module 17: Temporal Pattern Regulators & Biophysical Constraints** using proper SBSF ontology:

1. **Temporal patterns modeled as REGULATORS** (not "notes")
2. **Energy constraints modeled as MODULATION edges** with kinetics
3. **Transit kinetics modeled as intermediate STOCKS** with conditional effects
4. **Intervention timing annotated with proper `intervention_window`** semantics

### Key Principle: Anti-Aβ Drugs are TREATMENT, not PREVENTION

The lecanemab/donanemab "success" is properly annotated as:
- **intervention_window**: "treatment" (NOT "prevention")
- **what_it_addresses**: Direct oligomer → LTP toxicity (~30% of decline)
- **what_it_does_NOT_address**: clearance_impaired, LDAM, lysosomal_dysfunction
- **consequence**: If stopped, re-accumulation occurs because core dysfunction persists
- **sex_effect**: Documented as uncertain but flagged for APOE4 homozygote ARIA risk

### New Module 17 Components

| Component | Type | Purpose |
|-----------|------|---------|
| `signaling_temporal_pattern` | REGULATOR | Discriminate pulsed vs chronic signaling |
| `dosing_temporal_pattern` | REGULATOR | Control intervention scheduling |
| `cytosolic_labile_iron` | STOCK | Intermediate in iron transit |
| `synaptic_protein_synthesis` | STOCK | mTORC1 target; required for LTP |
| E17.001-E17.005 | EDGES | Modulation and flow relationships with kinetics |

### Bibliography (Module 17 - Refs 74-81)

See main checklist for full citations.

---

## Part 6: Schema Migration Notes

### Changes to Main Checklist Document

When migrating each module:

1. **Remove PROCESS from node tables** - Delete rows where SBSF Type = PROCESS
2. **Add process name to edge tables** - Create `mechanism_label` column
3. **Expand evidence schema** - Add quote, species code, methodology enum
4. **Update Instructions section** - Reflect corrected architecture

### Example Migration: Module 8

**BEFORE (Node Table)**:
```
| [x] | C3_cleavage | PROCESS | ... |
| [x] | complement_mediated_pruning | PROCESS | ... |
```

**AFTER (Node Table)**:
```
| [x] | C1q | STOCK | ... |
| [x] | iC3b | STOCK | ... |  # NEW - opsonin intermediate
| [x] | synapses | STOCK | ... |
```

**AFTER (Edge Table)**:
```
| Edge ID | Source | Target | Relation | Mechanism Label | Evidence |
|---------|--------|--------|----------|-----------------|----------|
| E8.1 | C1q | iC3b | directlyIncreases | C3_cleavage_cascade | [...] |
| E8.2 | iC3b | synapses | decreases | CR3_phagocytosis | [...] |
```

---

## Changelog

- 2026-01-14: **Red Team Resolution via Module 17** (proper SBSF, not "limitations")
  - Created Module 17: Temporal Pattern Regulators & Biophysical Constraints
  - Key insight: Temporal patterns are REGULATORS that modulate edges, not "notes"
  - Anti-Aβ drugs properly annotated as TREATMENT (not prevention); clearance dysfunction persists
  - Updated Module Completion Status: 10/17 complete
- 2026-01-14: Created audit document with corrected SBSF architecture
- 2026-01-14: Added refinements:
  - Sharp STATE vs STOCK criteria (require units for STOCK)
  - Four edge types: FLOW, TRANSITION, MODULATION, INFLUENCE
  - Node role annotations: REGULATOR, BIOMARKER, THERAPEUTIC_TARGET, DRUG (optional)
  - Timescale hints (optional): milliseconds → years
  - Compartment modeling schema for localization-dependent proteins
  - Full evidence schema with quote, species (NCBITaxon), methodology (30+ enums)
  - Updated all 14 module audit tables with Edge Type column
- 2026-01-14: Added Intervention schema for simulation:
  - Intervention type enum (19 options: small molecules, antibodies, gene therapy, lifestyle)
  - Clinical status tracking (preclinical → approved/failed/withdrawn)
  - Failure reason enum (10 options) - critical for learning from trial failures
  - Quantitative parameters: IC50, EC50, effect magnitude, Hill coefficient, time to effect
  - PK parameters: half-life, route of administration, BBB penetration
  - Linking interventions to nodes and edges
  - Key AD interventions list (10 major drugs/candidates)
- 2026-01-14: **Module 12 (BBB/Glymphatic) completed with full new schema**:
  - 18 nodes (all STOCK/STATE/BOUNDARY - no PROCESS)
  - 15 edges with full YAML evidence (quotes, NCBITaxon, methodology)
  - 4 interventions: VEGF-C, CsA, Sleep optimization, FUS BBB opening
  - 10 bibliography entries with DOIs
  - Template for remaining modules
- 2026-01-14: **Module 16 (Sex & Ancestry Modifiers) expanded with fat distribution genetics**:
  - 22 nodes (8 BOUNDARY inputs for sex/ancestry, 4 STOCK, 2 STATE, 4 X-linked gene nodes, 4 fat distribution nodes)
  - 17 YAML edges documenting mechanistic chains:
    1. Sex → Lysosome → Immune Function (testosterone enhances autophagy; estrogen loss impairs acidification)
    2. Ancestry → Lipid Metabolism → APOE Function (local ancestry modifies APOE4 risk 3-5×)
    3. **X-linked genes section**: SLC9A7, ATP6AP2, LAMP2, ATP6AP1
       - **Belloy et al. 2024 JAMA Neurology** (n=1.15 million): SLC9A7 = #1 X-linked AD risk locus
       - SLC9A7 regulates Golgi pH → validates lysosomal acidification hypothesis
    4. **Fat distribution genetics section**:
       - **Ancestry differences**: Africans have LESS VAT, Asians have MORE VAT at same BMI
       - **RSPO3** = strongest WHR signal (Wnt → adipogenesis)
       - **TBX15, LYPLAL1, VEGFA, GRB14, LY86, ADAMTS9** - 7/14 show sexual dimorphism
    5. **FSH → AD pathway**:
       - **Xiong 2022 Nature**: FSH acts DIRECTLY on hippocampal neurons
       - Activates C/EBPβ-δ-secretase → accelerates Aβ/Tau
       - FSH blockade reverses AD-like phenotype
  - 2 interventions: HRT (timing-critical), Ancestry-adjusted risk assessment
  - Cross-module connections to Modules 2, 4, 5, 8, 9, 10
  - 20 bibliography entries with DOIs
