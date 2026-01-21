# Network Data Audit Report

Generated: 2026-01-21T14:54:21.394Z

## Summary Statistics

| Metric | Count |
|--------|-------|
| Total Nodes | 227 |
| Total Edges | 290 |
| Total Modules | 19 |
| Feedback Loops | 9 |

### Nodes by Category

| Category | Count |
|----------|-------|
| STOCK | 99 |
| STATE | 95 |
| BOUNDARY | 33 |

### Nodes by Module

| Module | Count |
|--------|-------|
| BOUNDARY: BOUNDARY | 20 |
| M01: Insulin/mTOR/Autophagy Axis | 10 |
| M02: Lysosomal Pathology | 12 |
| M03: Mitochondrial Dysfunction | 8 |
| M04: Inflammasome & Cytokines | 12 |
| M05: Microglial Phenotypes | 14 |
| M06: Amyloid Pathology | 11 |
| M07: Tau Pathology | 21 |
| M08: Complement & Synaptic Pruning | 4 |
| M09: Iron Dysregulation & Ferrop... | 11 |
| M10: APOE4 Pathways & REST/Epige... | 7 |
| M11: TREM2 & DAM | 5 |
| M12: BBB & Glymphatic | 24 |
| M13: Cholinergic & White Matter | 18 |
| M14: MAM & Calcium | 5 |
| M15: Interventions & Clinical Bo... | 5 |
| M16: Sex & Ancestry Modifiers | 7 |
| M17: Immunomodulatory Interventions | 3 |
| M18: Astrocyte Endfoot Integrity... | 16 |
| M20: Hormonal Influences | 14 |

### Edges by Module

| Module | Count |
|--------|-------|
| BOUNDARY: BOUNDARY | 6 |
| M01: Insulin/mTOR/Autophagy Axis | 14 |
| M02: Lysosomal Pathology | 13 |
| M03: Mitochondrial Dysfunction | 11 |
| M04: Inflammasome & Cytokines | 16 |
| M05: Microglial Phenotypes | 18 |
| M06: Amyloid Pathology | 16 |
| M07: Tau Pathology | 30 |
| M08: Complement & Synaptic Pruning | 9 |
| M09: Iron Dysregulation & Ferrop... | 17 |
| M10: APOE4 Pathways & REST/Epige... | 13 |
| M11: TREM2 & DAM | 9 |
| M12: BBB & Glymphatic | 35 |
| M13: Cholinergic & White Matter | 29 |
| M14: MAM & Calcium | 8 |
| M15: Interventions & Clinical Bo... | 14 |
| M16: Sex & Ancestry Modifiers | 12 |
| M17: Immunomodulatory Interventions | 4 |
| M18: Astrocyte Endfoot Integrity... | 16 |

### Edges by Relation Type

| Relation | Count |
|----------|-------|
| increases | 169 |
| decreases | 55 |
| directlyIncreases | 52 |
| regulates | 8 |
| substrateof | 2 |
| modulates | 2 |
| causesNoChange | 2 |

### Edges by Causal Confidence

| Level | Count | Description |
|-------|-------|-------------|
| L1 | 5 | Human RCT |
| L2 | 0 | Human genetic (Mendelian) |
| L3 | 37 | Human genetic (GWAS) + animal KO |
| L4 | 144 | Animal intervention |
| L5 | 77 | In vitro / Cell culture |
| L6 | 25 | Observational / Correlation |
| L7 | 2 | Expert opinion / Hypothesis |

---

## Modules

| ID | Name | Description |
|----|------|-------------|
| M01 | Insulin/mTOR/Autophagy Axis | Metabolic dysfunction driving lysosomal and mitochondrial... |
| M02 | Lysosomal Pathology | Lysosomal dysfunction leading to LMP and inflammatory act... |
| M03 | Mitochondrial Dysfunction | Direct mtDNA release via mPTP/VDAC (pre-lysosomal pathway) |
| M04 | Inflammasome & Cytokines | NLRP3 and cGAS-STING convergence point |
| M05 | Microglial Phenotypes | LDAM, DAM, and A1 astrocyte induction |
| M06 | Amyloid Pathology | Aβ production, oligomerization, and clearance failure |
| M07 | Tau Pathology | Tau hyperphosphorylation, aggregation, and spreading |
| M08 | Complement & Synaptic Pruning | C1q-C3-CR3 synaptic elimination cascade |
| M09 | Iron Dysregulation & Ferroptosis | Iron accumulation, functional deficiency, and ferroptotic... |
| M10 | APOE4 Pathways & REST/Epigenetic Dysregulation | APOE4 lipid dysfunction and REST nuclear depletion |
| M11 | TREM2 & DAM | TREM2 variants and disease-associated microglia |
| M12 | BBB & Glymphatic | Blood-brain barrier and glymphatic clearance dysfunction |
| M13 | Cholinergic & White Matter | Cholinergic degeneration and white matter pathology |
| M14 | MAM & Calcium | Mitochondria-associated ER membranes and calcium dysregul... |
| M15 | Interventions & Clinical Boundaries | Therapeutic targets and clinical outcome boundaries |
| M16 | Sex & Ancestry Modifiers | Biological sex and genetic ancestry effects on AD pathways |
| M17 | Immunomodulatory Interventions | Vaccine adjuvant-based immunomodulation and IFN-γ pathways |
| M18 | Astrocyte Endfoot Integrity / Clasmatodendrosis | Astrocytic endfoot dysfunction from AEP-mediated vimentin... |
| M20 | Hormonal Influences | Sex hormones, stress hormones (HPA axis), and metabolic h... |

---

## Biomarker Nodes

| ID | Label | Years Before Symptoms | Method | ATN | AUC |
|----|-------|----------------------|--------|-----|-----|
| plasma_spdgfrbeta | sPDGFRβ (Pericyte Injury) | 45 | CSF | V | 0.85 |
| pericyte_injury | Pericyte Injury | 45 | CSF | V | 0.85 |
| ad_autoantibody_panel | AD Autoantibody Panel | 19 | Plasma | I | 0.94 |
| plasma_abeta42_40_ratio | Aβ42/40 Ratio | 18 | Plasma | A | 0.88 |
| pvs_enlarged | PVS Enlarged | 18 | MRI | V | 0.75 |
| plasma_ptau217 | p-tau217 | 15 | Plasma | T | 0.96 |
| retinal_amyloid | Retinal Aβ Deposits | 15 | Retinal | A | 0.82 |
| plasma_ptau181 | p-tau181 | 10 | Plasma | T | 0.91 |
| plasma_gfap | Plasma GFAP | 10 | Plasma | I | 0.84 |
| retinal_rnfl | Retinal Nerve Fiber Layer | 7 | Retinal | N | 0.76 |
| plasma_nfl | Neurofilament Light (NfL) | 5 | Plasma | N | 0.85 |
| cognitive_score | Cognitive Score | - | - | - | - |
| synapses | Synapse Density | - | - | - | - |
| neuronal_count | Neuron Count | - | - | - | - |
| brain_volume | Brain Volume | - | - | - | - |
| csf_biomarkers | CSF Biomarkers | - | - | - | - |
| bmp_lysosomal | BMP (Bis(monoacylglycero)ph... | - | - | - | - |
| nlrp3_active | NLRP3 Inflammasome Active | - | - | - | - |
| il1b | IL-1β | - | - | - | - |
| il18 | IL-18 | - | - | - | - |
| type_i_ifn | Type I Interferon | - | - | - | - |
| isg_expression | ISG Expression | - | - | - | - |
| abeta_oligomers | Aβ Oligomers | - | - | - | - |
| tau_aggregated | Aggregated Tau | - | - | - | - |
| abeta_plaques | Aβ Plaques | - | - | - | - |
| iglon5_autoantibodies | Anti-IgLON5 Autoantibodies | - | - | - | - |
| nft_formation | Neurofibrillary Tangles | - | - | - | - |
| homocysteine | Homocysteine | - | - | - | - |
| glutathione_gsh | Glutathione (GSH) | - | - | - | - |
| c1q_elevated | C1q Elevated | - | - | - | - |
| iron_accumulation | Brain Iron Accumulation | - | - | - | - |
| strem2 | Soluble TREM2 | - | - | - | - |
| bbb_breakdown | BBB Breakdown | - | - | - | - |
| bbb_integrity | BBB Integrity | - | - | - | - |
| aqp4_depolarization | AQP4 Depolarization | - | - | - | - |
| aria_edema | ARIA-E (Edema) | - | - | - | - |
| aria_hemorrhage | ARIA-H (Hemorrhage) | - | - | - | - |
| biomarker_change | Biomarker Change | - | - | - | - |
| ifn_gamma | IFN-γ | - | - | - | - |
| gfap_released | GFAP (Released) | - | - | - | - |
| csf_gfap | CSF GFAP | - | - | - | - |
| dti_alps | DTI-ALPS Index | - | - | - | - |
| vimentin_fragments | Vimentin Fragments | - | - | - | - |
| estrogen_level | Estrogen Level | - | - | - | - |
| testosterone_level | Testosterone Level | - | - | - | - |
| cortisol_level | Cortisol Level | - | - | - | - |
| thyroid_function | Thyroid Function | - | - | - | - |
| insulin_signaling | Brain Insulin Signaling | - | - | - | - |
| melatonin_level | Melatonin Level | - | - | - | - |

---

## Therapeutic Target Nodes

| ID | Label | Module | Category |
|----|-------|--------|----------|
| mtorc1_hyperactive | mTORC1 Hyperactive | M01 | STOCK |
| sirt1_activity | SIRT1 (Sirtuin 1) | M01 | STOCK |
| mptp_open | mPTP Open | M03 | STATE |
| pink1_parkin | PINK1/Parkin Mitophagy | M03 | STOCK |
| nlrp3_active | NLRP3 Inflammasome Active | M04 | STOCK |
| sting_active | STING Active | M04 | STOCK |
| gsk3b_active | GSK-3β Active | M04 | STOCK |
| nf_kb_active | NF-κB Active | M05 | STOCK |
| ldam | LDAM Microglia | M05 | STATE |
| c1q | C1q | M05 | STOCK |
| abeta_oligomers | Aβ Oligomers | M06 | STOCK |
| bace1_upregulated | BACE1 Upregulated | M06 | STOCK |
| neuronal_hyperactivity | Neuronal Hyperactivity | M07 | STATE |
| cse_enzyme | CSE (Cystathionine γ-lyase) | M07 | STOCK |
| c1q_elevated | C1q Elevated | M08 | STOCK |
| ferroportin_reduced | Ferroportin Reduced | M09 | STOCK |
| gpx4_activity | GPX4 Activity | M09 | STOCK |
| senescent_cells | Senescent Cells | M09 | STOCK |
| nrf2_pathway | Nrf2 Antioxidant Pathway | M10 | STOCK |
| trem2_surface | TREM2 Surface Expression | M11 | STOCK |
| lrp1_apoe4_impaired | LRP1-ApoE4 Impairment | M12 | STATE |
| meningeal_lymphatics | Meningeal Lymphatics | M12 | STOCK |
| aqp4_polarization | AQP4 Polarization | M12 | STATE |
| aqp4_depolarization | AQP4 Depolarization | M12 | STATE |
| astrocyte_endfeet | Astrocyte Endfeet Integrity | M12 | STOCK |
| peripheral_sink_hypothesis | Peripheral Sink Hypothesis | M12 | STATE |
| intramural_periarterial_drainage | Intramural Periarterial Drainage (IPAD) | M12 | STATE |
| ach_reduced | Acetylcholine Reduced | M13 | STOCK |
| ol_cholesterol_synthesis | OL Cholesterol Synthesis | M13 | STATE |
| remyelination_capacity | Remyelination Capacity | M13 | STATE |
| robo1_ol | OL ROBO1 Receptor | M13 | STOCK |
| fyn_kinase_ol | OL Fyn Kinase Activity | M13 | STATE |
| rhoa_gtp_ol | OL RhoA-GTP | M13 | STOCK |
| dap12_signaling | DAP12 Signaling | M13 | STATE |
| as01_adjuvant | AS01 Adjuvant (Shingrix/Arexvy) | M17 | BOUNDARY |
| aep_active | AEP (Active) | M18 | STOCK |
| vimentin_intact | Vimentin (Intact) | M18 | STOCK |
| clasmatodendrosis | Clasmatodendrosis | M18 | STATE |
| estrogen_level | Estrogen Level | M20 | BOUNDARY |
| cortisol_level | Cortisol Level | M20 | BOUNDARY |
| chronic_stress | Chronic Psychosocial Stress | M20 | BOUNDARY |
| insulin_signaling | Brain Insulin Signaling | M20 | STATE |
| melatonin_level | Melatonin Level | M20 | BOUNDARY |

**Total Therapeutic Targets**: 43

---

## Feedback Loops

| ID | Name | Type | Modules | Edge Count |
|----|------|------|---------|------------|
| loop_mTORC1_S6K1_IRS1 | mTORC1-S6K1-IRS1 Insulin Resistance Loop | reinforcing | M01 | 4 |
| loop_NLRP3_tau_feedforward | NLRP3-Tau Feedforward Loop | reinforcing | M04, M07 | 5 |
| loop_LDAM_Abeta | LDAM-Aβ Clearance Failure Loop | reinforcing | M05, M06 | 3 |
| loop_lysosome_inflammasome | Lysosomal Dysfunction-Inflammation Loop | reinforcing | M01, M02, M04 | 7 |
| loop_mtDNA_STING | mtDNA-STING Aging Inflammation Loop | reinforcing | M03, M04 | 4 |
| loop_A1_synapse | A1 Astrocyte Synapse Loss Loop | reinforcing | M05, M08 | 6 |
| loop_OPC_myelin_WM | OPC-Myelin-White Matter Degeneration ... | reinforcing | M13, M05 | 6 |
| loop_OPC_BBB | OPC-BBB Integrity Loop | balancing | M13, M12 | 5 |
| loop_mitophagy_balance | Mitophagy Quality Control (Balancing) | balancing | M02, M03 | 2 |

### Feedback Loop Details

#### mTORC1-S6K1-IRS1 Insulin Resistance Loop

- **ID**: loop_mTORC1_S6K1_IRS1
- **Type**: reinforcing
- **Modules**: M01
- **Description**: Self-amplifying pathological cycle: insulin resistance removes TSC1/2 brake       on mTORC1 → mTORC1 activates S6K1 → S6K1 phosphorylates IRS-1 → IRS-1       degradation/inhibition → MORE insulin r...
- **Clinical Implication**: Breaking the cycle requires intervention at any node
- **Edges**: E01.001 → E01.008 → E01.009 → E01.010
- **Intervention Points**: mtorc1_hyperactive, s6k1_active, insulin_resistance

#### NLRP3-Tau Feedforward Loop

- **ID**: loop_NLRP3_tau_feedforward
- **Type**: reinforcing
- **Modules**: M04, M07
- **Description**: Self-amplifying tau pathology: NLRP3 activation → GSK3β↑/PP2A↓ → tau       hyperphosphorylation → tau aggregation → aggregated tau activates NLRP3       → MORE inflammation.        This creates exp...
- **Clinical Implication**: Explains rapid progression once tau pathology begins
- **Edges**: E04.005 → E04.006 → E04.007 → E04.008 → E04.010
- **Intervention Points**: nlrp3_active, gsk3b_active, tau_aggregated

#### LDAM-Aβ Clearance Failure Loop

- **ID**: loop_LDAM_Abeta
- **Type**: reinforcing
- **Modules**: M05, M06
- **Description**: Phagocytic failure creates accumulation: LDAM phenotype → impaired       phagocytosis → reduced Aβ clearance → more Aβ oligomers → more       microglial activation → more LDAM.        This explains...
- **Clinical Implication**: DGAT2 inhibitors may break this loop by reducing lipid droplets
- **Edges**: E05.007 → E05.008 → E05.015
- **Intervention Points**: srebp1_active, lipid_droplets, abeta_oligomers

#### Lysosomal Dysfunction-Inflammation Loop

- **ID**: loop_lysosome_inflammasome
- **Type**: reinforcing
- **Modules**: M01, M02, M04
- **Description**: Lysosomal failure amplifies inflammation: lysosomal dysfunction →       cargo accumulation → lipofuscin → LMP → cathepsin B release →       NLRP3 activation → IL-1β → NF-κB → more lysosomal stress....
- **Clinical Implication**: Breaking at lipofuscin is impossible (irreversible); must target upstream
- **Edges**: E01.004 → E02.001 → E02.002 → E02.003 → E02.004 → E02.005 → E02.021
- **Intervention Points**: mtorc1_hyperactive, nlrp3_active, cathepsin_b_cytosolic

#### mtDNA-STING Aging Inflammation Loop

- **ID**: loop_mtDNA_STING
- **Type**: reinforcing
- **Modules**: M03, M04
- **Description**: Mitochondrial damage amplifies via inflammation: damaged mitochondria →       mtDNA release → cGAS-STING activation → Type I IFN → ISG expression →       impaired mitophagy → more damaged mitochond...
- **Clinical Implication**: STING inhibitors show promise for aging-related inflammation
- **Edges**: E03.009 → E04.003 → E04.004 → E03.011
- **Intervention Points**: pink1_parkin, sting_active, cgas_active

#### A1 Astrocyte Synapse Loss Loop

- **ID**: loop_A1_synapse
- **Type**: reinforcing
- **Modules**: M05, M08
- **Description**: Glial dysfunction amplifies neurodegeneration: activated microglia →       IL-1α + TNF + C1q → A1 astrocytes → neurotoxicity + C3 production →       complement-mediated synapse elimination → neuron...
- **Clinical Implication**: Complement inhibitors have early therapeutic window
- **Edges**: E05.010 → E05.011 → E05.012 → E05.013 → E05.014 → E05.016
- **Intervention Points**: c1q, a1_astrocytes, il1a

#### OPC-Myelin-White Matter Degeneration Loop

- **ID**: loop_OPC_myelin_WM
- **Type**: reinforcing
- **Modules**: M13, M05
- **Description**: White matter degeneration creates vicious cycle: OPC dysfunction →       impaired remyelination → myelin debris accumulation → microglial       activation → A1 astrocyte induction → A1 astrocytes k...
- **Clinical Implication**: Early white matter changes (DTI) may be the earliest modifiable biomarker. 22-year prodrome suggests large intervention window.
- **Edges**: E13.010 → E13.012 → E13.018 → E13.019 → E13.020 → E13.023
- **Intervention Points**: opcs, remyelination_capacity, a1_astrocytes, ol_cholesterol_synthesis

#### OPC-BBB Integrity Loop

- **ID**: loop_OPC_BBB
- **Type**: balancing
- **Modules**: M13, M12
- **Description**: OPCs maintain BBB homeostasis: healthy OPCs → TGF-β1 secretion →       tight junction maintenance → BBB integrity → protected brain environment →       OPC survival.        This balancing loop main...
- **Clinical Implication**: OPC health may be critical for BBB maintenance. Current BBB models lack OPCs - major translational gap.
- **Edges**: E13.014 → E13.015 → E13.016 → E13.017 → E13.024
- **Intervention Points**: opcs, opc_tgf_beta1, bbb_integrity

#### Mitophagy Quality Control (Balancing)

- **ID**: loop_mitophagy_balance
- **Type**: balancing
- **Modules**: M02, M03
- **Description**: Homeostatic mitochondrial quality control: damaged mitochondria →       PINK1 stabilization → Parkin recruitment → mitophagy → clearance →       reduced damaged pool.        This balancing loop mai...
- **Clinical Implication**: Enhancing this loop (urolithin A) may restore balance
- **Edges**: E02.006 → E03.010
- **Intervention Points**: pink1_parkin


---

## Cross-Module Edges

| ID | Source | Target | Cross-Module Info |
|----|--------|--------|-------------------|
| E01.004 | lysosomal_genes_down | lysosome_pool | M01 → M02 |
| E01.021 | ampk_phosphorylated | ulk1_phosphorylated | M01 → M02 |
| E02.005 | cathepsin_b_cytosolic | nlrp3_active | Output to Module 4 (Inflammasome) |
| E02.010 | mtdna_from_lysosome | cgas_active | Output to Module 4 (Inflammasome) |
| E02.021 | il1b | lysosomal_dysfunction | M04 → M02 (completes loop_lysosome_inflammasome) |
| E03.011 | type_i_ifn | damaged_mito_pool | M04 → M03 (completes loop_mtDNA_STING) |
| E05.015 | abeta_oligomers | microglia_activated | M06 → M05 (completes loop_LDAM_Abeta) |
| E05.016 | synapses | microglia_activated | M08 → M05 (completes loop_A1_synapse) |
| E13.023 | myelin_breakdown | opcs | M13 (completes loop_OPC_myelin_WM) |
| E13.024 | bbb_integrity | opcs | M12 → M13 (completes loop_OPC_BBB) |
| E03.008 | ox_mtdna_cytosolic | nlrp3_active | Output to Module 4 (Inflammasome) |
| E03.009 | mtdna_cytosolic | cgas_active | Output to Module 4 (Inflammasome) |
| E04.007 | gsk3b_active | tau_hyperphosphorylated | Output to Module 7 (Tau) |
| E04.008 | pp2a_activity | tau_hyperphosphorylated | Output to Module 7 (Tau) |
| E04.009 | abeta_oligomers | nlrp3_active | Input from Module 6 (Amyloid) |
| E04.010 | tau_aggregated | nlrp3_active | Input from Module 7 (Tau) - creates feedback loop |
| E04.014 | isg_expression | microglia_activated | M04 → M05 |
| E05.009 | ldam | c1q | Output to Module 8 (Complement) |
| E_CM.001 | il1b | neuroinflammation | M04 → M05 |
| E_CM.002 | type_i_ifn | neuroinflammation | M04 → M05 |
| E_CM.003 | a1_astrocytes | neuronal_dysfunction | M05 → M07 |
| E_CM.004 | nf_kb_active | bace1_upregulated | M05 → M06 |
| E_CM.005 | ferroptosis | neuronal_count | M09 → BOUNDARY |
| E_CM.006 | neuronal_dysfunction | cognitive_score | M07 → BOUNDARY |
| E_CM.008 | ltp_inhibition | cognitive_score | M06 → BOUNDARY |
| E_CM.009 | bbb_breakdown | neuroinflammation | M12 → M05 |
| E_CM.010 | apoe_lipidation_reduced | abeta_clearance | M10 → M06 |
| E_CM.011 | neuronal_dysfunction | mortality | M07 → BOUNDARY |
| E_CM.012 | tau_aggregated | brain_volume | M07 → BOUNDARY |
| E_CM.014 | abeta_oligomers | csf_biomarkers | M06 → BOUNDARY |
| E_CM.015 | tau_hyperphosphorylated | csf_biomarkers | M07 → BOUNDARY |
| E_CM.016 | csf_biomarkers | clinical_benefit | BOUNDARY → M15 |
| E06.006 | phagocytosis_impaired | abeta_clearance | Input from Module 5 (LDAM) |
| E06.007 | lysosomal_dysfunction | abeta_monomers | Input from Module 2 (Lysosomal) |
| E06.012 | trem2_surface | plaque_compaction | M11 → M06 |
| E07.007 | cse_enzyme | glutathione_gsh | Output to Module 9 (Ferroptosis - GPX4 requires... |
| E07.011 | abeta_oligomers | pp2a_inhibited | M06 → M07 |
| E07.022 | cysteine | glutathione_gsh | Output to M09 (Ferroptosis - GPX4 requires GSH) |
| E07.028 | tau_missorting | tau_hyperphosphorylated | M07 → M04 (tau to inflammasome cascade) |
| E08.007 | abeta_oligomers | c1q | Input from Module 6 (Amyloid) |
| E09.001 | il1b | hepcidin_elevated | Input from Module 4 (Inflammation) |
| E09.007 | glutathione_gsh | gpx4_activity | Input from Module 7B (CSE provides cysteine for... |
| E09.008 | aging | senescent_cells | BOUNDARY → M09 |
| E09.008b | senescent_cells | il1b | M09 → M04 |
| E09.011 | lysosomal_dysfunction | lysosomal_iron_trap | M02 → M09 |
| E10.003 | apoe_lipidation_reduced | abeta_clearance | Output to Module 6 (Amyloid) |
| E10.006 | nrf2_pathway | gpx4_activity | Output to Module 9 (Ferroptosis) |
| E10.008 | lysosomal_cholesterol_sequestration | lysosomal_dysfunction | M10 → M02 |
| E10.010 | astrocyte_lipid_droplets | neuroinflammation | M10 → M04 |
| E11.007 | dam_transition_blocked | abeta_clearance | M11 → M06 |
| E11.009 | senescent_trem2_microglia | neuroinflammation | M11 → M04 |
| E12.005 | glymphatic_clearance | abeta_oligomers | Output to Module 6 (Amyloid) |
| E12.012 | isf_abeta_clearance | abeta_oligomers | M12 → M06 |
| E12.018 | exercise | aqp4_polarization | M15 → M12 |
| E12.019 | exercise | arterial_pulsatility | M15 → M12 |
| E12.024 | a1_astrocytes | astrocyte_endfeet | Input from M05 (Microglial Phenotypes) |
| E12.025 | astrocyte_endfeet | lysosomal_dysfunction | Output to M02 (Lysosomal) |
| E12.026 | ach_reduced | astrocyte_endfeet | Input from M13 (Cholinergic) |
| E12.029 | lrp1_apoe4_impaired | abeta_monomers | Output to Module 6 (Amyloid) |
| E12.030 | bbb_breakdown | abeta_monomers | Output to Module 6 (Amyloid) |
| E12.031 | tau_aggregated | plasma_ptau217 | Input from Module 7 (Tau) |
| E12.032 | tau_aggregated | plasma_ptau181 | Input from Module 7 (Tau) |
| E13.001 | tau_aggregated | cholinergic_degeneration | Input from Module 7 (Tau) |
| E13.006 | myelin_breakdown | neuronal_dysfunction | M13 → M07 |
| E13.013 | apoe_genotype | ol_cholesterol_synthesis | Input from M10 (APOE4/REST) |
| E13.015 | opc_tgf_beta1 | bbb_integrity | Output to M12 (BBB/Glymphatic) |
| E13.016 | opc_vascular_coupling | pericyte_function | Output to M12 (BBB/Glymphatic) |
| E13.018 | a1_astrocytes | mature_oligodendrocytes | Input from M05 (Microglial Phenotypes) |
| E13.025 | tau_aggregated | dap12_signaling | M07 → M13 (tau triggers demyelination cascade) |
| E14.003 | er_mito_ca_flux | ca_overload | Output to Module 3 (Mitochondrial) |
| E14.004 | mam_hyperconnectivity | gamma_secretase_mam | Output to Module 6 (Amyloid) |
| E14.008 | mito_ca_overload_mam | ca_overload | M14 → M03 |
| E16.007 | sex | x_linked_lysosomal_genes | M16 → M02 (Lysosomal) |
| E16.008 | x_linked_lysosomal_genes | lysosomal_dysfunction | M16 → M02 |
| E16.010 | visceral_adipose_tissue | neuroinflammation | M16 → M04 |
| E16.011 | sex | female_iron_storage_failure | M16 → M09 |
| E16.012 | female_iron_storage_failure | ferroptosis | M16 → M09 |
| E17.003 | ifn_gamma | abeta_clearance | M17 → M06 |
| E17.004 | abeta_clearance | abeta_oligomers | M17 → M06 |
| E18.009 | clasmatodendrosis | aqp4_depolarization | M18 → M12 |
| E18.010 | a1_astrocytes | aep_active | M05 → M18 |
| E18.011 | mito_ros | aep_active | M03 → M18 |
| E18.012 | clasmatodendrosis | glymphatic_clearance | M18 → M12 |

**Total Cross-Module Edges**: 83

---

## Data Quality Checks

### Orphan Nodes (No Edges)

| ID | Label | Module |
|----|-------|--------|
| plasma_abeta42_40_ratio | Aβ42/40 Ratio | BOUNDARY |
| retinal_amyloid | Retinal Aβ Deposits | BOUNDARY |
| ad_autoantibody_panel | AD Autoantibody Panel | BOUNDARY |
| fcrn_transport | FcRn Transport (BBB) | M12 |
| fcrn_recycling | FcRn Recycling (Periphery) | M12 |
| peripheral_sink_hypothesis | Peripheral Sink Hypothesis | M12 |
| intramural_periarterial_drainage | Intramural Periarterial Drainage (IPAD) | M12 |
| cervical_lymph_nodes | Cervical Lymph Node Drainage | M12 |
| splenic_clearance | Splenic Aβ Clearance | M12 |
| hepatic_clearance | Hepatic Aβ Clearance | M12 |
| aria_edema | ARIA-E (Edema) | M12 |
| aria_hemorrhage | ARIA-H (Hemorrhage) | M12 |
| vimentin_intact | Vimentin (Intact) | M18 |
| gfap_network_intact | GFAP Network Intact | M18 |
| pvs_normal | PVS Normal | M18 |
| hrt_intervention | Hormone Replacement Therapy | M20 |
| estrogen_neuroprotection | Estrogen Neuroprotection | M20 |
| testosterone_neuroprotection | Testosterone Neuroprotection | M20 |
| cortisol_level | Cortisol Level | M20 |
| hpa_axis_activation | HPA Axis Activation | M20 |
| chronic_stress | Chronic Psychosocial Stress | M20 |
| stress_reduction | Stress Reduction Interventions | M20 |
| thyroid_function | Thyroid Function | M20 |
| hypothyroidism | Hypothyroidism | M20 |
| insulin_signaling | Brain Insulin Signaling | M20 |
| intranasal_insulin | Intranasal Insulin | M20 |
| melatonin_level | Melatonin Level | M20 |

### Edges with Missing Nodes

| Edge ID | Missing Source | Missing Target |
|---------|----------------|----------------|
| E-THER.006 | synaptic_dysfunction |  |

### Duplicate Node IDs

| Node ID | Count |
|---------|-------|
| estrogen_level | 2 |
| testosterone_level | 2 |

### Duplicate Edge IDs

*No duplicate edge IDs.*


---

## All Nodes

| ID | Label | Category | Subtype | Module | Roles |
|----|-------|----------|---------|--------|-------|
| ad_autoantibody_panel | AD Autoantibody Panel | BOUNDARY | Biomarker | BOUNDARY | BIOMARKER |
| aging | Aging | BOUNDARY | Lifestyle | BOUNDARY |  |
| apoe_genotype | APOE Genotype | BOUNDARY | GeneticVariant | BOUNDARY |  |
| brain_volume | Brain Volume | STOCK | CompartmentState | BOUNDARY | BIOMARKER |
| cognitive_score | Cognitive Score | STOCK | MetaboliteSignal | BOUNDARY | BIOMARKER |
| csf_biomarkers | CSF Biomarkers | STOCK | MetaboliteSignal | BOUNDARY | BIOMARKER |
| familial_ad_mutations | Familial AD Mutations | BOUNDARY | GeneticVariant | BOUNDARY |  |
| mortality | Mortality | BOUNDARY | Diagnosis | BOUNDARY |  |
| neuronal_count | Neuron Count | STOCK | CellPopulation | BOUNDARY | BIOMARKER |
| plasma_abeta42_40_ratio | Aβ42/40 Ratio | BOUNDARY | Biomarker | BOUNDARY | BIOMARKER |
| plasma_nfl | Neurofilament Light (NfL) | BOUNDARY | Biomarker | BOUNDARY | BIOMARKER |
| plasma_ptau181 | p-tau181 | BOUNDARY | Biomarker | BOUNDARY | BIOMARKER |
| plasma_ptau217 | p-tau217 | BOUNDARY | Biomarker | BOUNDARY | BIOMARKER |
| plasma_spdgfrbeta | sPDGFRβ (Pericyte Injury) | BOUNDARY | Biomarker | BOUNDARY | BIOMARKER |
| retinal_amyloid | Retinal Aβ Deposits | BOUNDARY | Biomarker | BOUNDARY | BIOMARKER |
| retinal_rnfl | Retinal Nerve Fiber Layer | BOUNDARY | Biomarker | BOUNDARY | BIOMARKER |
| sex | Biological Sex | BOUNDARY | GeneticVariant | BOUNDARY |  |
| sleep_disruption | Sleep Disruption | BOUNDARY | Lifestyle | BOUNDARY |  |
| synapses | Synapse Density | STOCK | OrganellePool | BOUNDARY | BIOMARKER |
| trem2_variants | TREM2 Variants | BOUNDARY | GeneticVariant | BOUNDARY |  |
| ampk_phosphorylated | AMPK Phosphorylated (Inhibited) | STOCK | Kinase | M01 | REGULATOR |
| insulin_resistance | Brain Insulin Resistance | STATE | MetabolicState | M01 | LEVERAGE_POINT |
| irs1_serine_phosphorylated | IRS-1 Serine Phosphorylated | STATE | Phosphorylated | M01 |  |
| lysosomal_genes_down | Lysosomal Genes Downregulated | STATE | BiologicalProcess | M01 |  |
| mitophagy_rate_reduced | Mitophagy Rate Reduced | STATE | Mitophagy | M01 |  |
| mtorc1_hyperactive | mTORC1 Hyperactive | STOCK | Kinase | M01 | REGULATOR, THERAPEUTIC_TARGET, RATE_LIMITER |
| s6k1_active | S6K1 Active | STOCK | Kinase | M01 | REGULATOR |
| sirt1_activity | SIRT1 (Sirtuin 1) | STOCK | Transferase | M01 | REGULATOR, THERAPEUTIC_TARGET |
| tfeb_phosphorylated | TFEB Phosphorylated | STATE | Phosphorylated | M01 |  |
| ulk1_phosphorylated | ULK1 Phosphorylated (Inhibited) | STOCK | Kinase | M01 | REGULATOR |
| autolysosome | Autolysosome | STOCK | OrganellePool | M02 |  |
| bmp_lysosomal | BMP (Bis(monoacylglycero)phosphate) | STOCK | MetabolitePool | M02 | BIOMARKER |
| cargo_accumulation | Cargo Accumulation | STOCK | Aggregate | M02 |  |
| cathepsin_b_cytosolic | Cytosolic Cathepsin B | STOCK | ActiveProteinPool | M02 |  |
| damaged_mito_pool | Damaged Mitochondria Pool | STOCK | OrganellePool | M02 |  |
| lipofuscin | Lipofuscin | STOCK | Aggregate | M02 |  |
| lmp | Lysosomal Membrane Permeabilization | STATE | BiologicalProcess | M02 |  |
| lysosomal_dysfunction | Lysosomal Dysfunction | STATE | CompartmentIntegrity | M02 | FEEDBACK_HUB, LEVERAGE_POINT |
| lysosome_pool | Lysosome Pool | STOCK | OrganellePool | M02 | RATE_LIMITER |
| mitophagosome | Mitophagosome | STOCK | OrganellePool | M02 |  |
| mtdna_from_lysosome | mtDNA Escaped from Lysosome | STOCK | MetabolitePool | M02 |  |
| mtdna_undegraded | Undegraded mtDNA (Lysosomal) | STOCK | MetabolitePool | M02 |  |
| ca_overload | Mitochondrial Ca²⁺ Overload | STATE | CompartmentIntegrity | M03 |  |
| mito_ros | Mitochondrial ROS | STOCK | MetabolitePool | M03 |  |
| mptp_open | mPTP Open | STATE | CompartmentIntegrity | M03 | THERAPEUTIC_TARGET |
| mtdna_cytosolic | Cytosolic mtDNA (Non-oxidized) | STOCK | MetabolitePool | M03 |  |
| mtdna_oxidized | Oxidized mtDNA | STOCK | MetabolitePool | M03 |  |
| ox_mtdna_cytosolic | Cytosolic Oxidized mtDNA | STOCK | MetabolitePool | M03 |  |
| pink1_parkin | PINK1/Parkin Mitophagy | STOCK | MasterRegulator | M03 | REGULATOR, THERAPEUTIC_TARGET |
| vdac_oligomer | VDAC Oligomers | STOCK | ComplexPool | M03 |  |
| caspase1_active | Active Caspase-1 | STOCK | ActiveProteinPool | M04 |  |
| cgas_active | cGAS Active | STOCK | ActiveProteinPool | M04 |  |
| gsk3b_active | GSK-3β Active | STOCK | ActiveProteinPool | M04 | THERAPEUTIC_TARGET |
| il18 | IL-18 | STOCK | CytokineLevel | M04 | BIOMARKER |
| il1b | IL-1β | STOCK | CytokineLevel | M04 | BIOMARKER |
| isg_expression | ISG Expression | STOCK | RNAPool | M04 | BIOMARKER |
| neuroinflammation | Neuroinflammation | STATE | DiseaseStage | M04 | FEEDBACK_HUB |
| nlrp3_active | NLRP3 Inflammasome Active | STOCK | ComplexPool | M04 | THERAPEUTIC_TARGET, BIOMARKER, FEEDBACK_HUB |
| pp2a_activity | PP2A Activity | STOCK | ActiveProteinPool | M04 |  |
| sting_active | STING Active | STOCK | ActiveProteinPool | M04 | THERAPEUTIC_TARGET |
| tau_hyperphosphorylated | Tau Hyperphosphorylated | STATE | Phosphorylated | M04 |  |
| type_i_ifn | Type I Interferon | STOCK | CytokineLevel | M04 | BIOMARKER |
| a1_astrocytes | A1 Astrocytes | STATE | A1_Astrocyte | M05 |  |
| c1q | C1q | STOCK | ProteinPool | M05 | THERAPEUTIC_TARGET |
| dam_stage1 | DAM Stage 1 | STATE | DAM | M05 |  |
| dam_stage2 | DAM Stage 2 | STATE | DAM | M05 |  |
| glycolytic_switch | Glycolytic Switch | STATE | MetabolicState | M05 |  |
| hif1a_stabilized | HIF-1α Stabilized | STOCK | Activator | M05 | REGULATOR |
| il1a | IL-1α | STOCK | CytokineLevel | M05 |  |
| ldam | LDAM Microglia | STATE | LDAM | M05 | THERAPEUTIC_TARGET |
| lipid_droplets | Lipid Droplets | STOCK | Aggregate | M05 |  |
| microglia_activated | Activated Microglia | STOCK | PhenotypePool | M05 |  |
| nf_kb_active | NF-κB Active | STOCK | Activator | M05 | REGULATOR, THERAPEUTIC_TARGET |
| phagocytosis_impaired | Phagocytosis Impaired | STATE | Phagocytosis | M05 |  |
| srebp1_active | SREBP1 Active | STOCK | Activator | M05 | REGULATOR |
| tnf | TNF-α | STOCK | CytokineLevel | M05 |  |
| abeta_clearance | Aβ Clearance | STATE | Phagocytosis | M06 |  |
| abeta_monomers | Aβ Monomers | STOCK | ProteinPool | M06 |  |
| abeta_oligomers | Aβ Oligomers | STOCK | Aggregate | M06 | BIOMARKER, THERAPEUTIC_TARGET |
| abeta_plaques | Aβ Plaques | STOCK | Aggregate | M06 | BIOMARKER |
| abeta_production | Aβ Production Rate | STATE | BiologicalProcess | M06 |  |
| app_betactf | APP β-CTF (C99) | STOCK | ProteinPool | M06 |  |
| app_processing_amyloidogenic | Amyloidogenic APP Processing | STATE | BiologicalProcess | M06 |  |
| bace1_upregulated | BACE1 Upregulated | STOCK | Protease | M06 | REGULATOR, THERAPEUTIC_TARGET, RATE_LIMITER |
| ltp_inhibition | LTP Inhibition | STATE | CompartmentIntegrity | M06 |  |
| plaque_compaction | Plaque Compaction | STATE | BiologicalProcess | M06 |  |
| synaptic_abeta_binding | Synaptic Aβ Binding | STATE | BiologicalProcess | M06 |  |
| cbs_enzyme | CBS (Cystathionine β-synthase) | STOCK | Transferase | M07 | REGULATOR |
| cse_enzyme | CSE (Cystathionine γ-lyase) | STOCK | Transferase | M07 | REGULATOR, THERAPEUTIC_TARGET, LEVERAGE_POINT |
| cystathionine | Cystathionine | STOCK | MetabolitePool | M07 |  |
| cysteine | Cysteine | STOCK | MetabolitePool | M07 |  |
| glutathione_gsh | Glutathione (GSH) | STOCK | MetabolitePool | M07 | BIOMARKER |
| gsk3beta_sulfhydrated | GSK3β Sulfhydrated (Inactive) | STATE | Phosphorylated | M07 |  |
| h2s_production | H₂S Production | STATE | BiologicalProcess | M07 |  |
| homocysteine | Homocysteine | STOCK | MetabolitePool | M07 | BIOMARKER |
| iglon5_autoantibodies | Anti-IgLON5 Autoantibodies | STOCK | Autoantibody | M07 | BIOMARKER |
| neuronal_dysfunction | Neuronal Dysfunction | STATE | DiseaseStage | M07 |  |
| neuronal_hyperactivity | Neuronal Hyperactivity | STATE | BiologicalProcess | M07 | THERAPEUTIC_TARGET |
| nft_formation | Neurofibrillary Tangles | STOCK | Aggregate | M07 | BIOMARKER |
| p38_mapk_active | p38 MAPK Active | STOCK | Kinase | M07 | REGULATOR |
| pp2a_inhibited | PP2A Inhibited | STATE | Phosphorylated | M07 |  |
| sulfhydration | Protein Sulfhydration | STATE | BiologicalProcess | M07 |  |
| tau_aggregated | Aggregated Tau | STOCK | Aggregate | M07 | BIOMARKER |
| tau_aggregated_phf | Tau PHF Aggregates | STOCK | Aggregate | M07 |  |
| tau_exosomal_release | Tau Exosomal Release | STATE | BiologicalProcess | M07 |  |
| tau_misfolded | Tau Misfolded | STATE | Phosphorylated | M07 |  |
| tau_missorting | Tau Somatodendritic Missorting | STATE | BiologicalProcess | M07 |  |
| tau_seeding | Tau Seeding | STATE | BiologicalProcess | M07 |  |
| c1q_elevated | C1q Elevated | STOCK | ProteinPool | M08 | THERAPEUTIC_TARGET, BIOMARKER |
| c3_opsonization | C3 Opsonization | STATE | BiologicalProcess | M08 |  |
| cr3_mediated_pruning | CR3-Mediated Synapse Pruning | STATE | Phagocytosis | M08 |  |
| synapse_elimination | Synapse Elimination | STATE | BiologicalProcess | M08 |  |
| ferritin_trap | Ferritin Iron Trap | STOCK | MetabolitePool | M09 |  |
| ferroportin_reduced | Ferroportin Reduced | STOCK | ProteinPool | M09 | THERAPEUTIC_TARGET |
| ferroptosis | Ferroptosis | STATE | Ferroptosis | M09 |  |
| functional_iron_deficiency | Functional Iron Deficiency | STATE | MetabolicState | M09 |  |
| gpx4_activity | GPX4 Activity | STOCK | Transferase | M09 | REGULATOR, THERAPEUTIC_TARGET |
| hepcidin_elevated | Hepcidin Elevated | STOCK | HormoneLevel | M09 |  |
| iron_accumulation | Brain Iron Accumulation | STOCK | MetabolitePool | M09 | BIOMARKER |
| labile_iron | Labile Iron Pool | STOCK | MetabolitePool | M09 |  |
| lipid_peroxidation | Lipid Peroxidation | STOCK | MetabolitePool | M09 |  |
| lysosomal_iron_trap | Lysosomal Iron Trap | STOCK | MetabolitePool | M09 |  |
| senescent_cells | Senescent Cells | STOCK | PhenotypePool | M09 | THERAPEUTIC_TARGET |
| apoe_lipidation_reduced | APOE Lipidation Reduced | STATE | CompartmentIntegrity | M10 |  |
| apoe4_domain_interaction | APOE4 Domain Interaction | STATE | Bound | M10 |  |
| astrocyte_lipid_droplets | Astrocyte Lipid Droplets | STOCK | Aggregate | M10 |  |
| lysosomal_cholesterol_sequestration | Lysosomal Cholesterol Sequestration | STATE | CompartmentIntegrity | M10 |  |
| nrf2_pathway | Nrf2 Antioxidant Pathway | STOCK | Activator | M10 | REGULATOR, THERAPEUTIC_TARGET |
| rest_depleted | REST Depleted (AD) | STATE | NuclearLocalized | M10 |  |
| rest_nuclear | REST Nuclear (Protective) | STOCK | Repressor | M10 | REGULATOR, LEVERAGE_POINT |
| dam_transition_blocked | DAM Transition Blocked | STATE | DAM | M11 |  |
| plaque_barrier_function | Microglial Plaque Barrier | STATE | BiologicalProcess | M11 |  |
| senescent_trem2_microglia | Senescent TREM2+ Microglia | STATE | Senescent | M11 |  |
| strem2 | Soluble TREM2 | STOCK | ProteinPool | M11 | BIOMARKER |
| trem2_surface | TREM2 Surface Expression | STOCK | ProteinPool | M11 | THERAPEUTIC_TARGET |
| aqp4_depolarization | AQP4 Depolarization | STATE | DiseaseStage | M12 | BIOMARKER, THERAPEUTIC_TARGET |
| aqp4_polarization | AQP4 Polarization | STATE | Homeostatic | M12 | THERAPEUTIC_TARGET |
| aria_edema | ARIA-E (Edema) | STATE | DiseaseStage | M12 | BIOMARKER |
| aria_hemorrhage | ARIA-H (Hemorrhage) | STATE | DiseaseStage | M12 | BIOMARKER |
| arterial_pulsatility | Arterial Pulsatility | STATE | Homeostatic | M12 |  |
| astrocyte_endfeet | Astrocyte Endfeet Integrity | STOCK | CompartmentState | M12 | LEVERAGE_POINT, THERAPEUTIC_TARGET |
| bbb_breakdown | BBB Breakdown | STATE | CompartmentIntegrity | M12 | BIOMARKER |
| bbb_integrity | BBB Integrity | STATE | Homeostatic | M12 | BIOMARKER |
| cervical_lymph_nodes | Cervical Lymph Node Drainage | STOCK | CompartmentState | M12 |  |
| csf_isf_exchange | CSF-ISF Exchange | STATE | BiologicalProcess | M12 |  |
| cypa_elevated | Cyclophilin A Elevated | STOCK | ProteinPool | M12 |  |
| fcrn_recycling | FcRn Recycling (Periphery) | STATE | BiologicalProcess | M12 |  |
| fcrn_transport | FcRn Transport (BBB) | STATE | BiologicalProcess | M12 | RATE_LIMITER |
| glymphatic_clearance | Glymphatic Clearance | STATE | BiologicalProcess | M12 |  |
| hepatic_clearance | Hepatic Aβ Clearance | STATE | BiologicalProcess | M12 |  |
| intramural_periarterial_drainage | Intramural Periarterial Drainage... | STATE | BiologicalProcess | M12 | THERAPEUTIC_TARGET |
| isf_abeta_clearance | ISF Aβ Clearance | STATE | BiologicalProcess | M12 |  |
| lrp1_apoe4_impaired | LRP1-ApoE4 Impairment | STATE | DiseaseStage | M12 | THERAPEUTIC_TARGET, LEVERAGE_POINT |
| meningeal_lymphatics | Meningeal Lymphatics | STOCK | OrganellePool | M12 | THERAPEUTIC_TARGET |
| mmp9_elevated | MMP-9 Elevated | STOCK | ActiveProteinPool | M12 |  |
| pericyte_function | Pericyte Function | STATE | Homeostatic | M12 |  |
| pericyte_injury | Pericyte Injury | STATE | DiseaseStage | M12 | BIOMARKER |
| peripheral_sink_hypothesis | Peripheral Sink Hypothesis | STATE | BiologicalProcess | M12 | THERAPEUTIC_TARGET |
| splenic_clearance | Splenic Aβ Clearance | STATE | BiologicalProcess | M12 | LEVERAGE_POINT |
| ach_reduced | Acetylcholine Reduced | STOCK | MetaboliteSignal | M13 | THERAPEUTIC_TARGET |
| cholinergic_degeneration | Cholinergic Degeneration | STATE | Neurodegeneration | M13 |  |
| dap12_signaling | DAP12 Signaling | STATE | BiologicalProcess | M13 | THERAPEUTIC_TARGET |
| fyn_kinase_ol | OL Fyn Kinase Activity | STATE | BiologicalProcess | M13 | THERAPEUTIC_TARGET |
| mature_oligodendrocytes | Mature Oligodendrocytes | STOCK | CellPopulation | M13 |  |
| myelin_breakdown | Myelin Breakdown | STATE | Neurodegeneration | M13 |  |
| myelin_sheath_withdrawal | Myelin Sheath Withdrawal | STATE | Neurodegeneration | M13 |  |
| ol_cholesterol_synthesis | OL Cholesterol Synthesis | STATE | MetabolicState | M13 | THERAPEUTIC_TARGET |
| ol_process_retraction | OL Process Retraction | STATE | BiologicalProcess | M13 |  |
| opc_nos1_activity | OPC NOS1 Activity | STATE | BiologicalProcess | M13 |  |
| opc_tgf_beta1 | OPC-Derived TGF-β1 | STOCK | CytokineSignal | M13 |  |
| opc_vascular_coupling | OPC-Vascular Coupling | STATE | BiologicalProcess | M13 |  |
| opcs | Oligodendrocyte Precursor Cells | STOCK | CellPopulation | M13 |  |
| remyelination_capacity | Remyelination Capacity | STATE | Homeostatic | M13 | THERAPEUTIC_TARGET |
| rhoa_gtp_ol | OL RhoA-GTP | STOCK | ActiveProteinPool | M13 | THERAPEUTIC_TARGET |
| robo1_ol | OL ROBO1 Receptor | STOCK | SurfaceReceptor | M13 | THERAPEUTIC_TARGET |
| slit2_neuronal | Neuronal SLIT2 | STOCK | ProteinPool | M13 |  |
| white_matter_pathology | White Matter Pathology | STATE | DiseaseStage | M13 |  |
| er_ca_stores | ER Ca²⁺ Stores | STOCK | MetabolitePool | M14 |  |
| er_mito_ca_flux | ER-Mito Ca²⁺ Flux Increased | STATE | BiologicalProcess | M14 |  |
| gamma_secretase_mam | γ-Secretase at MAM | STOCK | Protease | M14 | REGULATOR |
| mam_hyperconnectivity | MAM Hyperconnectivity | STATE | CompartmentIntegrity | M14 |  |
| mito_ca_overload_mam | Mitochondrial Ca²⁺ Overload (MAM) | STATE | CompartmentIntegrity | M14 |  |
| bbb_penetration | BBB Penetration | STATE | CompartmentIntegrity | M15 |  |
| biomarker_change | Biomarker Change | STOCK | MetaboliteSignal | M15 | BIOMARKER |
| clinical_benefit | Clinical Benefit | BOUNDARY | CognitiveScore | M15 |  |
| exercise | Exercise | BOUNDARY | Lifestyle | M15 |  |
| target_engagement | Target Engagement | STATE | Bound | M15 |  |
| apoe4_ancestry_effect | APOE4 Ancestry Effect | STATE | GeneticVariant | M16 |  |
| estrogen_level | Estrogen Level | STOCK | HormoneLevel | M16 |  |
| female_iron_storage_failure | Female Iron Storage Failure | STATE | MetabolicState | M16 |  |
| fsh_elevated | FSH Elevated (Menopause) | STOCK | HormoneLevel | M16 |  |
| testosterone_level | Testosterone Level | STOCK | HormoneLevel | M16 |  |
| visceral_adipose_tissue | Visceral Adipose Tissue | STOCK | MetabolitePool | M16 |  |
| x_linked_lysosomal_genes | X-Linked Lysosomal Genes | BOUNDARY | Gene | M16 |  |
| as01_adjuvant | AS01 Adjuvant (Shingrix/Arexvy) | BOUNDARY | SmallMolecule | M17 | THERAPEUTIC_TARGET |
| ifn_gamma | IFN-γ | STOCK | CytokineLevel | M17 | BIOMARKER |
| tlr4_activation | TLR4 Activation | STATE | BiologicalProcess | M17 |  |
| aep_active | AEP (Active) | STOCK | Protease | M18 | REGULATOR, THERAPEUTIC_TARGET |
| aep_inactive | AEP (Inactive) | STOCK | Protease | M18 | REGULATOR |
| cerebral_hypoperfusion | Cerebral Hypoperfusion | STATE | DiseaseStage | M18 |  |
| clasmatodendrosis | Clasmatodendrosis | STATE | Neurodegeneration | M18 | THERAPEUTIC_TARGET |
| csf_gfap | CSF GFAP | BOUNDARY | Biomarker | M18 | BIOMARKER |
| dti_alps | DTI-ALPS Index | BOUNDARY | Biomarker | M18 | BIOMARKER |
| gfap_network_disrupted | GFAP Network Disrupted | STATE | DiseaseStage | M18 |  |
| gfap_network_intact | GFAP Network Intact | STATE | Homeostatic | M18 |  |
| gfap_released | GFAP (Released) | STOCK | ProteinPool | M18 | BIOMARKER |
| plasma_gfap | Plasma GFAP | BOUNDARY | Biomarker | M18 | BIOMARKER |
| pvs_enlarged | PVS Enlarged | STATE | DiseaseStage | M18 | BIOMARKER |
| pvs_normal | PVS Normal | STATE | Homeostatic | M18 |  |
| sleep_fragmentation | Sleep Fragmentation | BOUNDARY | EnvironmentalAgent | M18 |  |
| vimentin_cleaved | Vimentin (Cleaved) | STATE | Cleaved | M18 |  |
| vimentin_fragments | Vimentin Fragments | BOUNDARY | Biomarker | M18 | BIOMARKER |
| vimentin_intact | Vimentin (Intact) | STOCK | ProteinPool | M18 | THERAPEUTIC_TARGET |
| chronic_stress | Chronic Psychosocial Stress | BOUNDARY | EnvironmentalExposure | M20 | THERAPEUTIC_TARGET |
| cortisol_level | Cortisol Level | BOUNDARY | HormoneSignal | M20 | BIOMARKER, THERAPEUTIC_TARGET |
| estrogen_level | Estrogen Level | BOUNDARY | HormoneSignal | M20 | BIOMARKER, THERAPEUTIC_TARGET |
| estrogen_neuroprotection | Estrogen Neuroprotection | STATE | PhysiologicalState | M20 | LEVERAGE_POINT |
| hpa_axis_activation | HPA Axis Activation | STATE | DiseaseStage | M20 | LEVERAGE_POINT |
| hrt_intervention | Hormone Replacement Therapy | BOUNDARY | DrugIntervention | M20 | DRUG, LEVERAGE_POINT |
| hypothyroidism | Hypothyroidism | STATE | DiseaseStage | M20 |  |
| insulin_signaling | Brain Insulin Signaling | STATE | SignalingPathway | M20 | BIOMARKER, THERAPEUTIC_TARGET |
| intranasal_insulin | Intranasal Insulin | BOUNDARY | DrugIntervention | M20 | DRUG |
| melatonin_level | Melatonin Level | BOUNDARY | HormoneSignal | M20 | BIOMARKER, THERAPEUTIC_TARGET |
| stress_reduction | Stress Reduction Interventions | BOUNDARY | LifestyleIntervention | M20 | DRUG, LEVERAGE_POINT |
| testosterone_level | Testosterone Level | BOUNDARY | HormoneSignal | M20 | BIOMARKER |
| testosterone_neuroprotection | Testosterone Neuroprotection | STATE | PhysiologicalState | M20 |  |
| thyroid_function | Thyroid Function | BOUNDARY | HormoneSignal | M20 | BIOMARKER |

---

## All Edges

| ID | Source | Relation | Target | Module | Confidence | Mechanism |
|----|--------|----------|--------|--------|------------|-----------|
| E_CM.001 | il1b | increases | neuroinflammation | M04 | L4 | IL1B_neuroinflammation |
| E_CM.002 | type_i_ifn | increases | neuroinflammation | M04 | L3 | IFN_neuroinflammation |
| E_CM.003 | a1_astrocytes | increases | neuronal_dysfunction | M05 | L3 | A1_neurotoxicity |
| E_CM.004 | nf_kb_active | increases | bace1_upregulated | M05 | L4 | NFkB_BACE1_transcription |
| E_CM.005 | ferroptosis | decreases | neuronal_count | M09 | L4 | ferroptosis_neuronal_death |
| E_CM.006 | neuronal_dysfunction | decreases | cognitive_score | M07 | L6 | dysfunction_cognition |
| E_CM.007 | tau_misfolded | increases | tau_aggregated | M07 | L5 | tau_aggregation_cascade |
| E_CM.008 | ltp_inhibition | decreases | cognitive_score | M06 | L4 | LTP_memory_impairment |
| E_CM.009 | bbb_breakdown | increases | neuroinflammation | M12 | L4 | BBB_peripheral_infiltration |
| E_CM.010 | apoe_lipidation_reduced | decreases | abeta_clearance | M10 | L4 | APOE4_clearance_impairment |
| E_CM.011 | neuronal_dysfunction | increases | mortality | BOUNDARY | L6 | dysfunction_mortality |
| E_CM.012 | tau_aggregated | decreases | brain_volume | BOUNDARY | L6 | tau_atrophy |
| E_CM.013 | brain_volume | increases | cognitive_score | BOUNDARY | L6 | volume_cognition |
| E_CM.014 | abeta_oligomers | regulates | csf_biomarkers | BOUNDARY | L6 | abeta_CSF |
| E_CM.015 | tau_hyperphosphorylated | increases | csf_biomarkers | BOUNDARY | L6 | ptau_CSF |
| E_CM.016 | csf_biomarkers | regulates | clinical_benefit | BOUNDARY | L6 | biomarker_monitoring |
| E-THER.001 | abeta_plaques | decreases | cognitive_score | M15 | L1 | gantenerumab_threshold_failure |
| E-THER.002 | abeta_oligomers | causesNoChange | cognitive_score | M15 | L1 | latrepirdine_no_validation |
| E-THER.003 | synapses | increases | cognitive_score | M15 | L4 | velnacrine_hepatotoxicity |
| E-THER.004 | ach_reduced | increases | cognitive_score | M15 | L1 | metrifonate_nmj_toxicity |
| E-THER.005 | neuroinflammation | decreases | cognitive_score | M15 | L1 | propentofylline_species_gap |
| E-THER.006 | synaptic_dysfunction | causesNoChange | cognitive_score | M15 | L1 | pde9_biomarker_dissociation |
| E-THER.007 | ach_reduced | increases | cognitive_score | M15 | L4 | eptastigmine_granulocytopenia |
| E01.001 | insulin_resistance | increases | mtorc1_hyperactive | M01 | L5 | insulin_mTORC1_activation |
| E01.002 | mtorc1_hyperactive | directlyIncreases | tfeb_phosphorylated | M01 | L5 | mTORC1_TFEB_phosphorylation |
| E01.003 | tfeb_phosphorylated | increases | lysosomal_genes_down | M01 | L3 | TFEB_cytoplasmic_sequestration |
| E01.004 | lysosomal_genes_down | decreases | lysosome_pool | M01 | L4 | reduced_lysosome_biogenesis |
| E01.004b | lysosome_pool | decreases | lysosomal_dysfunction | M02 | L4 | lysosome_depletion_dysfunction |
| E01.005 | mtorc1_hyperactive | directlyIncreases | ulk1_phosphorylated | M01 | L5 | mTORC1_ULK1_phosphorylation |
| E01.006 | ulk1_phosphorylated | increases | mitophagy_rate_reduced | M01 | L4 | ULK1_autophagy_block |
| E01.007 | mitophagy_rate_reduced | increases | damaged_mito_pool | M01 | L4 | mass_balance_accumulation |
| E01.008 | mtorc1_hyperactive | directlyIncreases | s6k1_active | M01 | L5 | mTORC1_S6K1_phosphorylation |
| E01.009 | s6k1_active | directlyIncreases | irs1_serine_phosphorylated | M01 | L5 | S6K1_IRS1_phosphorylation |
| E01.010 | irs1_serine_phosphorylated | increases | insulin_resistance | M01 | L4 | IRS1_insulin_signaling_block |
| E01.020 | mtorc1_hyperactive | increases | ampk_phosphorylated | M01 | L4 | mTORC1_AMPK_inhibition |
| E01.021 | ampk_phosphorylated | increases | ulk1_phosphorylated | M01 | L4 | AMPK_autophagy_block |
| E01.022 | sirt1_activity | decreases | mtorc1_hyperactive | M01 | L4 | SIRT1_mTORC1_inhibition |
| E01.023 | sirt1_activity | decreases | ulk1_phosphorylated | M01 | L4 | SIRT1_autophagy_promotion |
| E02.001 | lysosomal_dysfunction | increases | cargo_accumulation | M02 | L4 | degradation_failure_accumul... |
| E02.002 | cargo_accumulation | increases | lipofuscin | M02 | L4 | oxidative_crosslinking |
| E02.003 | lipofuscin | directlyIncreases | lmp | M02 | L4 | lipofuscin_membrane_damage |
| E02.004 | lmp | directlyIncreases | cathepsin_b_cytosolic | M02 | L5 | compartment_breach |
| E02.005 | cathepsin_b_cytosolic | directlyIncreases | nlrp3_active | M02 | L5 | cathepsin_NLRP3_activation |
| E02.006 | damaged_mito_pool | increases | mitophagosome | M02 | L3 | PINK1_Parkin_mitophagy_init... |
| E02.007 | mitophagosome | increases | autolysosome | M02 | L5 | autophagosome_lysosome_fusion |
| E02.008 | lysosomal_dysfunction | increases | mtdna_undegraded | M02 | L3 | DNase_II_pH_failure |
| E02.009 | mtdna_undegraded | increases | mtdna_from_lysosome | M02 | L4 | mtDNA_lysosomal_escape |
| E02.010 | mtdna_from_lysosome | directlyIncreases | cgas_active | M02 | L3 | mtDNA_cGAS_sensing |
| E02.020 | lysosomal_dysfunction | increases | bmp_lysosomal | M02 | L5 | lysosomal_stress_BMP_elevation |
| E02.021 | il1b | increases | lysosomal_dysfunction | M02 | L4 | IL1B_lysosomal_stress |
| E03.001 | damaged_mito_pool | increases | mito_ros | M03 | L5 | ETC_dysfunction_ROS |
| E03.002 | mito_ros | directlyIncreases | mtdna_oxidized | M03 | L5 | ROS_DNA_oxidation |
| E03.003 | mito_ros | increases | ca_overload | M03 | L4 | ROS_calcium_dysregulation |
| E03.004 | ca_overload | directlyIncreases | mptp_open | M03 | L5 | calcium_mPTP_trigger |
| E03.005 | mptp_open | increases | vdac_oligomer | M03 | L4 | mPTP_VDAC_coordination |
| E03.006 | mtdna_oxidized | increases | ox_mtdna_cytosolic | M03 | L5 | FEN1_cleavage_release |
| E03.007 | vdac_oligomer | directlyIncreases | ox_mtdna_cytosolic | M03 | L5 | VDAC_pore_transport |
| E03.008 | ox_mtdna_cytosolic | directlyIncreases | nlrp3_active | M03 | L5 | ox_mtDNA_NLRP3_binding |
| E03.009 | mtdna_cytosolic | directlyIncreases | cgas_active | M03 | L3 | mtDNA_cGAS_sensing |
| E03.010 | pink1_parkin | decreases | mtdna_cytosolic | M03 | L3 | mitophagy_prevents_mtDNA_re... |
| E03.011 | type_i_ifn | increases | damaged_mito_pool | M03 | L4 | IFN_mitophagy_impairment |
| E04.001 | nlrp3_active | directlyIncreases | caspase1_active | M04 | L3 | inflammasome_caspase1_recru... |
| E04.002 | caspase1_active | directlyIncreases | il1b | M04 | L5 | IL1B_cleavage |
| E04.003 | cgas_active | directlyIncreases | sting_active | M04 | L5 | cGAMP_STING_activation |
| E04.004 | sting_active | increases | type_i_ifn | M04 | L3 | STING_IFN_induction |
| E04.005 | nlrp3_active | increases | gsk3b_active | M04 | L3 | NLRP3_GSK3B_activation |
| E04.006 | nlrp3_active | decreases | pp2a_activity | M04 | L3 | NLRP3_PP2A_inhibition |
| E04.007 | gsk3b_active | directlyIncreases | tau_hyperphosphorylated | M04 | L5 | GSK3B_tau_phosphorylation |
| E04.008 | pp2a_activity | decreases | tau_hyperphosphorylated | M04 | L5 | PP2A_tau_dephosphorylation |
| E04.009 | abeta_oligomers | increases | nlrp3_active | M04 | L4 | Abeta_NLRP3_activation |
| E04.010 | tau_aggregated | increases | nlrp3_active | M04 | L4 | tau_NLRP3_activation |
| E04.011 | caspase1_active | directlyIncreases | il18 | M04 | L5 | IL18_maturation |
| E04.012 | il18 | increases | neuroinflammation | M04 | L4 | IL18_neuroinflammation |
| E04.013 | neuroinflammation | increases | isg_expression | M04 | L4 | IFN_ISG_induction |
| E04.014 | isg_expression | increases | microglia_activated | M04 | L4 | ISG_microglia |
| E05.001 | neuroinflammation | increases | microglia_activated | M05 | L4 | inflammation_microglia_acti... |
| E05.002 | microglia_activated | increases | nf_kb_active | M05 | L5 | activation_NFkB |
| E05.003 | nf_kb_active | increases | hif1a_stabilized | M05 | L4 | NFkB_HIF1A_stabilization |
| E05.004 | hif1a_stabilized | increases | glycolytic_switch | M05 | L5 | HIF1A_glycolysis |
| E05.005 | glycolytic_switch | increases | srebp1_active | M05 | L4 | glycolysis_SREBP1 |
| E05.006 | srebp1_active | increases | lipid_droplets | M05 | L4 | SREBP1_lipogenesis |
| E05.007 | lipid_droplets | increases | ldam | M05 | L4 | LD_LDAM_phenotype |
| E05.008 | ldam | increases | phagocytosis_impaired | M05 | L4 | LDAM_phagocytosis_failure |
| E05.009 | ldam | increases | c1q | M05 | L4 | LDAM_C1q_production |
| E05.010 | microglia_activated | increases | il1a | M05 | L3 | microglia_IL1A |
| E05.011 | microglia_activated | increases | tnf | M05 | L3 | microglia_TNF |
| E05.012 | il1a | increases | a1_astrocytes | M05 | L3 | IL1A_A1_induction |
| E05.013 | tnf | increases | a1_astrocytes | M05 | L3 | TNF_A1_induction |
| E05.014 | c1q | increases | a1_astrocytes | M05 | L3 | C1q_A1_induction |
| E05.015 | abeta_oligomers | increases | microglia_activated | M05 | L4 | Abeta_microglia_activation |
| E05.016 | synapses | decreases | microglia_activated | M05 | L4 | synapse_microglial_inhibiti... |
| E06.001 | bace1_upregulated | directlyIncreases | app_betactf | M06 | L5 | BACE1_APP_cleavage |
| E06.002 | app_betactf | directlyIncreases | abeta_monomers | M06 | L5 | gamma_secretase_cleavage |
| E06.003 | abeta_monomers | increases | abeta_oligomers | M06 | L4 | oligomerization |
| E06.004 | abeta_oligomers | increases | abeta_plaques | M06 | L4 | plaque_deposition |
| E06.005 | abeta_oligomers | directlyIncreases | ltp_inhibition | M06 | L4 | synaptic_toxicity |
| E06.006 | phagocytosis_impaired | decreases | abeta_clearance | M06 | L4 | LDAM_clearance_failure |
| E06.007 | lysosomal_dysfunction | increases | abeta_monomers | M06 | L4 | PANTHOS_pathway |
| E06.008 | app_processing_amyloidogenic | increases | app_betactf | M06 | L5 | amyloidogenic_pathway |
| E06.009 | bace1_upregulated | increases | app_processing_amyloidogenic | M06 | L5 | BACE1_amyloidogenic |
| E06.010 | app_processing_amyloidogenic | increases | abeta_production | M06 | L5 | abeta_generation |
| E06.011 | abeta_production | increases | abeta_monomers | M06 | L5 | monomer_release |
| E06.012 | trem2_surface | increases | plaque_compaction | M06 | L4 | protective_compaction |
| E06.013 | plaque_compaction | increases | plaque_barrier_function | M06 | L4 | barrier_formation |
| E06.014 | abeta_oligomers | increases | synaptic_abeta_binding | M06 | L4 | synaptic_toxicity_binding |
| E06.015 | synaptic_abeta_binding | increases | ltp_inhibition | M06 | L4 | LTP_blockade |
| E07.001 | tau_hyperphosphorylated | increases | tau_misfolded | M07 | L5 | phospho_tau_conformational_... |
| E07.002 | tau_misfolded | increases | tau_aggregated | M07 | L5 | tau_aggregation |
| E07.003 | tau_aggregated | directlyIncreases | tau_seeding | M07 | L4 | prion_like_spreading |
| E07.004 | tau_aggregated | increases | neuronal_dysfunction | M07 | L4 | tau_toxicity |
| E07.005 | cse_enzyme | directlyIncreases | h2s_production | M07 | L5 | H2S_production |
| E07.006 | h2s_production | decreases | gsk3b_active | M07 | L4 | H2S_GSK3B_sulfhydration |
| E07.007 | cse_enzyme | increases | glutathione_gsh | M07 | L5 | cysteine_GSH_synthesis |
| E07.008 | aging | decreases | cse_enzyme | M07 | L6 | age_CSE_decline |
| E07.009 | neuroinflammation | increases | p38_mapk_active | M07 | L4 | inflammation_p38_activation |
| E07.010 | p38_mapk_active | increases | tau_hyperphosphorylated | M07 | L4 | p38_tau_phosphorylation |
| E07.011 | abeta_oligomers | increases | pp2a_inhibited | M07 | L4 | abeta_PP2A_inhibition |
| E07.012 | pp2a_inhibited | increases | tau_hyperphosphorylated | M07 | L5 | PP2A_tau_accumulation |
| E07.013 | tau_aggregated | increases | tau_aggregated_phf | M07 | L5 | PHF_formation |
| E07.014 | tau_aggregated_phf | increases | nft_formation | M07 | L6 | NFT_maturation |
| E07.015 | nft_formation | increases | neuronal_dysfunction | M07 | L6 | NFT_toxicity |
| E07.016 | tau_aggregated | increases | tau_exosomal_release | M07 | L4 | exosomal_spreading |
| E07.017 | tau_exosomal_release | increases | tau_seeding | M07 | L4 | exosome_seeding |
| E07.018 | homocysteine | substrateof | cbs_enzyme | M07 | L5 | CBS_substrate |
| E07.019 | cbs_enzyme | directlyIncreases | cystathionine | M07 | L5 | CBS_product |
| E07.020 | cystathionine | substrateof | cse_enzyme | M07 | L5 | CSE_substrate |
| E07.021 | cse_enzyme | directlyIncreases | cysteine | M07 | L5 | CSE_cysteine_product |
| E07.022 | cysteine | increases | glutathione_gsh | M07 | L5 | cysteine_GSH |
| E07.023 | h2s_production | directlyIncreases | sulfhydration | M07 | L4 | H2S_PTM |
| E07.024 | sulfhydration | increases | gsk3beta_sulfhydrated | M07 | L4 | GSK3B_sulfhydration |
| E07.025 | gsk3beta_sulfhydrated | decreases | gsk3b_active | M07 | L4 | GSK3B_inactivation |
| E07.026 | iglon5_autoantibodies | increases | neuronal_hyperactivity | M07 | L3 | AAB_ion_channel_hyperactivity |
| E07.027 | neuronal_hyperactivity | increases | tau_missorting | M07 | L3 | hyperactivity_tau_mislocali... |
| E07.028 | tau_missorting | increases | tau_hyperphosphorylated | M07 | L4 | missorting_hyperphosphoryla... |
| E08.001 | aging | increases | c1q | M08 | L3 | age_C1q_upregulation |
| E08.002 | c1q | directlyIncreases | c3_opsonization | M08 | L5 | complement_cascade_initiation |
| E08.003 | c3_opsonization | increases | cr3_mediated_pruning | M08 | L3 | C3_iC3b_opsonization |
| E08.004 | cr3_mediated_pruning | directlyIncreases | synapse_elimination | M08 | L3 | CR3_phagocytosis_trigger |
| E08.005 | synapse_elimination | decreases | synapses | M08 | L3 | synapse_loss |
| E08.006 | synapses | increases | cognitive_score | M08 | L6 | synapse_cognition_correlation |
| E08.007 | abeta_oligomers | increases | c1q | M08 | L4 | Abeta_C1q_induction |
| E08.008 | aging | increases | c1q_elevated | M08 | L3 | aging_C1q_elevation |
| E08.009 | c1q_elevated | increases | c3_opsonization | M08 | L4 | elevated_C1q_cascade |
| E09.001 | il1b | increases | hepcidin_elevated | M09 | L4 | IL6_STAT3_hepcidin |
| E09.002 | hepcidin_elevated | decreases | ferroportin_reduced | M09 | L3 | hepcidin_ferroportin_degrad... |
| E09.003 | ferroportin_reduced | decreases | labile_iron | M09 | L5 | ferroportin_iron_export |
| E09.004 | labile_iron | directlyIncreases | lipid_peroxidation | M09 | L5 | Fenton_reaction |
| E09.005 | gpx4_activity | decreases | lipid_peroxidation | M09 | L3 | GPX4_lipid_peroxide_reduction |
| E09.006 | lipid_peroxidation | directlyIncreases | ferroptosis | M09 | L5 | lipid_peroxide_ferroptosis |
| E09.007 | glutathione_gsh | increases | gpx4_activity | M09 | L5 | GSH_GPX4_cofactor |
| E09.008 | aging | increases | senescent_cells | M09 | L5 | aging_drives_senescence |
| E09.008b | senescent_cells | increases | il1b | M09 | L4 | senescence_inflammation |
| E09.009 | ferroportin_reduced | increases | iron_accumulation | M09 | L4 | iron_accumulation_mechanism |
| E09.010 | iron_accumulation | increases | ferritin_trap | M09 | L5 | ferritin_sequestration |
| E09.011 | lysosomal_dysfunction | increases | lysosomal_iron_trap | M09 | L4 | lysosomal_iron_sequestration |
| E09.012 | ferritin_trap | increases | functional_iron_deficiency | M09 | L4 | sequestration_deficiency |
| E09.013 | lysosomal_iron_trap | increases | functional_iron_deficiency | M09 | L4 | lysosomal_deficiency |
| E09.014 | functional_iron_deficiency | decreases | ferroptosis | M09 | L4 | paradox_protection |
| E09.015 | iron_accumulation | increases | senescent_cells | M09 | L4 | iron_drives_senescence |
| E10.001 | apoe_genotype | directlyIncreases | apoe4_domain_interaction | M10 | L5 | APOE4_structural_defect |
| E10.002 | apoe4_domain_interaction | increases | apoe_lipidation_reduced | M10 | L4 | domain_interaction_lipidation |
| E10.003 | apoe_lipidation_reduced | increases | abeta_clearance | M10 | L4 | APOE4_Abeta_clearance |
| E10.004 | aging | decreases | rest_nuclear | M10 | L6 | age_REST_depletion |
| E10.005 | rest_nuclear | increases | nrf2_pathway | M10 | L4 | REST_Nrf2_coordination |
| E10.006 | nrf2_pathway | increases | gpx4_activity | M10 | L4 | Nrf2_GPX4_induction |
| E10.007 | apoe4_domain_interaction | increases | lysosomal_cholesterol_sequestration | M10 | L4 | APOE4_cholesterol_trap |
| E10.008 | lysosomal_cholesterol_sequestration | increases | lysosomal_dysfunction | M10 | L4 | cholesterol_lysosomal_impai... |
| E10.009 | apoe_lipidation_reduced | increases | astrocyte_lipid_droplets | M10 | L4 | APOE4_lipid_droplet_accumul... |
| E10.010 | astrocyte_lipid_droplets | increases | neuroinflammation | M10 | L4 | lipid_droplet_inflammation |
| E10.011 | aging | increases | rest_depleted | M10 | L6 | age_REST_loss |
| E10.012 | rest_depleted | increases | neuronal_dysfunction | M10 | L4 | REST_loss_vulnerability |
| E11.001 | trem2_surface | increases | dam_stage1 | M11 | L3 | TREM2_DAM_transition |
| E11.002 | dam_stage1 | increases | dam_stage2 | M11 | L3 | DAM_progression |
| E11.003 | dam_stage2 | increases | plaque_barrier_function | M11 | L4 | DAM_plaque_compaction |
| E11.004 | trem2_variants | decreases | trem2_surface | M11 | L4 | TREM2_variant_hypomorph |
| E11.005 | trem2_surface | increases | strem2 | M11 | L5 | TREM2_shedding |
| E11.006 | trem2_variants | increases | dam_transition_blocked | M11 | L3 | TREM2_DAM_block |
| E11.007 | dam_transition_blocked | decreases | abeta_clearance | M11 | L4 | blocked_DAM_clearance_failure |
| E11.008 | aging | increases | senescent_trem2_microglia | M11 | L4 | age_TREM2_senescence |
| E11.009 | senescent_trem2_microglia | increases | neuroinflammation | M11 | L4 | senescent_microglia_inflamm... |
| E12.001 | apoe_genotype | increases | cypa_elevated | M12 | L3 | APOE4_CypA_upregulation |
| E12.002 | cypa_elevated | directlyIncreases | mmp9_elevated | M12 | L4 | CypA_MMP9_activation |
| E12.003 | mmp9_elevated | directlyIncreases | bbb_breakdown | M12 | L4 | MMP9_tight_junction_degrada... |
| E12.004 | sleep_disruption | decreases | glymphatic_clearance | M12 | L4 | sleep_glymphatic |
| E12.005 | glymphatic_clearance | decreases | abeta_oligomers | M12 | L4 | glymphatic_Abeta_clearance |
| E12.006 | aging | decreases | glymphatic_clearance | M12 | L4 | age_glymphatic_decline |
| E12.007 | mmp9_elevated | increases | pericyte_injury | M12 | L4 | MMP9_pericyte_damage |
| E12.008 | pericyte_injury | increases | bbb_breakdown | M12 | L3 | pericyte_BBB_integrity |
| E12.009 | aging | decreases | meningeal_lymphatics | M12 | L4 | age_lymphatic_decline |
| E12.010 | meningeal_lymphatics | increases | glymphatic_clearance | M12 | L4 | lymphatic_glymphatic_connec... |
| E12.011 | glymphatic_clearance | increases | isf_abeta_clearance | M12 | L4 | glymphatic_ISF_drainage |
| E12.012 | isf_abeta_clearance | decreases | abeta_oligomers | M12 | L4 | ISF_clearance_Abeta |
| E12.013 | aqp4_polarization | increases | csf_isf_exchange | M12 | L4 | AQP4_CSF_ISF_exchange |
| E12.014 | csf_isf_exchange | increases | glymphatic_clearance | M12 | L4 | CSF_ISF_glymphatic |
| E12.015 | aging | increases | aqp4_depolarization | M12 | L4 | age_AQP4_depolarization |
| E12.016 | aqp4_depolarization | decreases | glymphatic_clearance | M12 | L4 | AQP4_depol_glymphatic_impair |
| E12.017 | arterial_pulsatility | increases | csf_isf_exchange | M12 | L4 | pulsatility_CSF_flow |
| E12.018 | exercise | increases | aqp4_polarization | M12 | L4 | exercise_AQP4_restoration |
| E12.019 | exercise | increases | arterial_pulsatility | M12 | L4 | exercise_cardiac_pulsatility |
| E12.020 | sleep_disruption | increases | aqp4_depolarization | M12 | L5 | sleep_AQP4_polarization |
| E12.021 | astrocyte_endfeet | directlyIncreases | aqp4_polarization | M12 | L3 | endfoot_AQP4_scaffold |
| E12.022 | astrocyte_endfeet | directlyIncreases | bbb_integrity | M12 | L3 | endfoot_BBB_support |
| E12.023 | astrocyte_endfeet | increases | csf_isf_exchange | M12 | L4 | endfoot_glymphatic_gate |
| E12.024 | a1_astrocytes | decreases | astrocyte_endfeet | M12 | L4 | A1_endfoot_damage |
| E12.025 | astrocyte_endfeet | decreases | lysosomal_dysfunction | M12 | L5 | endfoot_lysosomal_clearance |
| E12.026 | ach_reduced | decreases | astrocyte_endfeet | M12 | L4 | cholinergic_endfoot_support |
| E12.027 | aging | decreases | astrocyte_endfeet | M12 | L4 | aging_endfoot_retraction |
| E12.028 | pericyte_injury | directlyIncreases | plasma_spdgfrbeta | M12 | L4 | pericyte_spdgfrbeta_release |
| E12.029 | lrp1_apoe4_impaired | increases | abeta_monomers | M12 | L3 | lrp1_abeta_clearance_failure |
| E12.030 | bbb_breakdown | increases | abeta_monomers | M12 | L4 | bbb_abeta_accumulation |
| E12.031 | tau_aggregated | directlyIncreases | plasma_ptau217 | M12 | L4 | tau_ptau217_release |
| E12.032 | tau_aggregated | directlyIncreases | plasma_ptau181 | M12 | L4 | tau_ptau181_release |
| E12.033 | neuronal_count | directlyIncreases | plasma_nfl | M12 | L4 | neuronal_loss_nfl_release |
| E12.034 | neuronal_count | decreases | retinal_rnfl | M12 | L6 | neuronal_loss_rnfl_thinning |
| E13.001 | tau_aggregated | increases | cholinergic_degeneration | M13 | L6 | tau_nbM_vulnerability |
| E13.002 | cholinergic_degeneration | increases | ach_reduced | M13 | L5 | cholinergic_loss_ACh |
| E13.003 | ach_reduced | increases | cognitive_score | M13 | L5 | ACh_cognition |
| E13.004 | neuroinflammation | increases | white_matter_pathology | M13 | L4 | inflammation_white_matter |
| E13.005 | white_matter_pathology | increases | myelin_breakdown | M13 | L5 | WM_demyelination |
| E13.006 | myelin_breakdown | increases | neuronal_dysfunction | M13 | L5 | demyelination_dysfunction |
| E13.010 | opcs | increases | mature_oligodendrocytes | M13 | L4 | OPC_differentiation |
| E13.011 | ol_cholesterol_synthesis | increases | mature_oligodendrocytes | M13 | L4 | cholesterol_myelination_cou... |
| E13.012 | mature_oligodendrocytes | decreases | myelin_breakdown | M13 | L5 | OL_myelin_maintenance |
| E13.013 | apoe_genotype | decreases | ol_cholesterol_synthesis | M13 | L4 | APOE4_OL_cholesterol_deficit |
| E13.014 | opcs | directlyIncreases | opc_tgf_beta1 | M13 | L3 | OPC_TGFb1_secretion |
| E13.015 | opc_tgf_beta1 | increases | bbb_integrity | M13 | L3 | TGFb1_tight_junction_mainte... |
| E13.016 | opc_vascular_coupling | modulates | pericyte_function | M13 | L4 | OPC_Ca_pericyte_dilation |
| E13.017 | opc_nos1_activity | modulates | opc_vascular_coupling | M13 | L6 | OPC_NO_signaling |
| E13.018 | a1_astrocytes | decreases | mature_oligodendrocytes | M13 | L4 | A1_astrocyte_OL_killing |
| E13.019 | aging | decreases | opcs | M13 | L5 | age_OPC_exhaustion |
| E13.020 | aging | decreases | remyelination_capacity | M13 | L5 | age_remyelination_decline |
| E13.021 | myelin_breakdown | increases | white_matter_pathology | M13 | L5 | demyelination_WM_pathology |
| E13.022 | white_matter_pathology | increases | cholinergic_degeneration | M13 | L5 | WM_disconnection_BFCN |
| E13.023 | myelin_breakdown | decreases | opcs | M13 | L4 | myelin_debris_OPC_inhibition |
| E13.024 | bbb_integrity | increases | opcs | M13 | L4 | BBB_OPC_protection |
| E13.025 | tau_aggregated | increases | dap12_signaling | M13 | L4 | tau_DAP12_activation |
| E13.026 | dap12_signaling | increases | slit2_neuronal | M13 | L4 | microglia_neuron_SLIT2_indu... |
| E13.027 | slit2_neuronal | directlyIncreases | robo1_ol | M13 | L5 | SLIT2_ROBO1_binding |
| E13.028 | robo1_ol | decreases | fyn_kinase_ol | M13 | L4 | ROBO1_Fyn_dissociation |
| E13.029 | fyn_kinase_ol | decreases | rhoa_gtp_ol | M13 | L4 | Fyn_RhoA_regulation |
| E13.030 | rhoa_gtp_ol | increases | ol_process_retraction | M13 | L4 | RhoA_ROCK_retraction |
| E13.031 | ol_process_retraction | increases | myelin_sheath_withdrawal | M13 | L4 | process_retraction_myelin_loss |
| E13.032 | myelin_sheath_withdrawal | increases | myelin_breakdown | M13 | L4 | withdrawal_to_breakdown |
| E14.001 | familial_ad_mutations | increases | mam_hyperconnectivity | M14 | L4 | PS_MAM_upregulation |
| E14.002 | mam_hyperconnectivity | increases | er_mito_ca_flux | M14 | L4 | MAM_Ca_transfer |
| E14.003 | er_mito_ca_flux | increases | ca_overload | M14 | L4 | MAM_mito_Ca_overload |
| E14.004 | mam_hyperconnectivity | increases | gamma_secretase_mam | M14 | L4 | MAM_gamma_secretase |
| E14.005 | familial_ad_mutations | regulates | er_ca_stores | M14 | L4 | PS1_ER_Ca_leak |
| E14.006 | er_ca_stores | increases | er_mito_ca_flux | M14 | L5 | ER_Ca_to_mito |
| E14.007 | er_mito_ca_flux | increases | mito_ca_overload_mam | M14 | L4 | MAM_Ca_transfer |
| E14.008 | mito_ca_overload_mam | increases | ca_overload | M14 | L4 | Ca_mito_dysfunction |
| E15.001 | bbb_penetration | increases | target_engagement | M15 | L5 | CNS_target_engagement |
| E15.002 | exercise | increases | glymphatic_clearance | M15 | L4 | exercise_glymphatic |
| E15.003 | exercise | decreases | neuroinflammation | M15 | L3 | exercise_antiinflammatory |
| E15.004 | exercise | decreases | mtorc1_hyperactive | M15 | L4 | exercise_autophagy |
| E15.005 | target_engagement | increases | biomarker_change | M15 | L5 | engagement_biomarker |
| E15.006 | biomarker_change | increases | clinical_benefit | M15 | L6 | biomarker_clinical_gap |
| E15.007 | clinical_benefit | increases | cognitive_score | M15 | L5 | benefit_cognition |
| E16.001 | sex | regulates | estrogen_level | M16 | L5 | sex_estrogen |
| E16.002 | estrogen_level | decreases | neuroinflammation | M16 | L4 | estrogen_neuroprotection |
| E16.003 | fsh_elevated | increases | neuronal_dysfunction | M16 | L4 | FSH_neurodegeneration |
| E16.004 | sex | regulates | apoe4_ancestry_effect | M16 | L6 | ancestry_APOE4_interaction |
| E16.005 | sex | regulates | testosterone_level | M16 | L5 | sex_testosterone |
| E16.006 | testosterone_level | decreases | neuroinflammation | M16 | L4 | testosterone_neuroprotection |
| E16.007 | sex | regulates | x_linked_lysosomal_genes | M16 | L4 | X_chromosome_dosage |
| E16.008 | x_linked_lysosomal_genes | decreases | lysosomal_dysfunction | M16 | L4 | lysosomal_gene_protection |
| E16.009 | estrogen_level | decreases | visceral_adipose_tissue | M16 | L6 | estrogen_adipose |
| E16.010 | visceral_adipose_tissue | increases | neuroinflammation | M16 | L4 | VAT_inflammation |
| E16.011 | sex | regulates | female_iron_storage_failure | M16 | L6 | sex_iron_storage |
| E16.012 | female_iron_storage_failure | increases | ferroptosis | M16 | L4 | female_ferroptosis_vulnerab... |
| E17.001 | as01_adjuvant | directlyIncreases | tlr4_activation | M17 | L5 | MPL_TLR4_agonism |
| E17.002 | tlr4_activation | increases | ifn_gamma | M17 | L4 | TLR4_IFNg_cascade |
| E17.003 | ifn_gamma | increases | abeta_clearance | M17 | L7 | IFNg_amyloid_clearance |
| E17.004 | abeta_clearance | decreases | abeta_oligomers | M17 | L5 | clearance_reduces_oligomers |
| E18.001 | aep_inactive | directlyIncreases | aep_active | M18 | L5 | AEP_pH_activation |
| E18.002 | aep_active | directlyIncreases | vimentin_cleaved | M18 | L5 | AEP_vimentin_cleavage |
| E18.003 | vimentin_cleaved | directlyIncreases | gfap_network_disrupted | M18 | L5 | vimentin_GFAP_network_collapse |
| E18.004 | gfap_network_disrupted | directlyIncreases | clasmatodendrosis | M18 | L5 | cytoskeleton_endfoot_fragme... |
| E18.005 | clasmatodendrosis | directlyIncreases | gfap_released | M18 | L6 | endfoot_damage_GFAP_release |
| E18.006 | clasmatodendrosis | directlyIncreases | pvs_enlarged | M18 | L6 | endfoot_retraction_PVS_enla... |
| E18.007 | sleep_fragmentation | increases | aep_active | M18 | L4 | sleep_loss_AEP_activation |
| E18.008 | cerebral_hypoperfusion | increases | aep_active | M18 | L4 | hypoperfusion_AEP_upregulation |
| E18.009 | clasmatodendrosis | directlyIncreases | aqp4_depolarization | M18 | L5 | endfoot_loss_AQP4_depolariz... |
| E18.010 | a1_astrocytes | increases | aep_active | M18 | L5 | A1_astrocyte_AEP_upregulation |
| E18.011 | mito_ros | increases | aep_active | M18 | L5 | ROS_AEP_activation |
| E18.012 | clasmatodendrosis | decreases | glymphatic_clearance | M18 | L5 | endfoot_damage_glymphatic_f... |
| E18.013 | gfap_released | directlyIncreases | plasma_gfap | M18 | L6 | GFAP_blood_transport |
| E18.014 | gfap_released | directlyIncreases | csf_gfap | M18 | L6 | GFAP_CSF_entry |
| E18.015 | pvs_enlarged | decreases | dti_alps | M18 | L6 | PVS_ALPS_correlation |
| E18.016 | vimentin_cleaved | directlyIncreases | vimentin_fragments | M18 | L7 | vimentin_fragment_detection |
