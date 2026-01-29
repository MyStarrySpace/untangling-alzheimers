/**
 * Populate the mechanistic framework Excel file with lysosomal damage-centered data
 *
 * Run: npx tsx scripts/populate-lysosomal-framework.ts
 * Then: npx tsx scripts/generate-framework-data.ts
 */

import * as XLSX from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';

const EXCEL_PATH = path.join(__dirname, '../src/data/mechanisticFramework/framework.xlsx');

// ============================================================================
// MODULES
// ============================================================================
const modules = [
  { id: 'M01', name: 'Upstream Triggers', shortName: 'Triggers', description: 'Age-related and genetic risk factors that initiate lysosomal stress', color: '#787473' },
  { id: 'M02', name: 'Lysosomal Pathology', shortName: 'Lysosome', description: 'Central hub: lysosomal damage vs dysfunction distinction', color: '#34d399' },
  { id: 'M03', name: 'Autophagy', shortName: 'Autophagy', description: 'Autophagy flux and the cargo accumulation paradox', color: '#a78bfa' },
  { id: 'M06', name: 'Protein Aggregation', shortName: 'Aggregates', description: 'Downstream Aβ and tau aggregation', color: '#60a5fa' },
  { id: 'M09', name: 'Ferroptosis', shortName: 'Ferroptosis', description: 'Iron-mediated cell death pathway', color: '#f472b6' },
  { id: 'THER', name: 'Therapeutic Interventions', shortName: 'Therapy', description: 'Drug targets and treatment strategies', color: '#e36216' },
];

// ============================================================================
// NODES
// ============================================================================
const nodes = [
  // ---- M01: Upstream Triggers ----
  { id: 'aging', label: 'Aging', category: 'STATE', subtype: 'RiskFactor', moduleId: 'M01', description: 'Age-related decline in cellular repair mechanisms', mechanism: 'Aging reduces ESCRT repair efficiency, impairs proteostasis, and increases oxidative stress', roles: 'RATE_LIMITER' },
  { id: 'apoe4', label: 'APOE4', category: 'STOCK', subtype: 'RiskFactor', moduleId: 'M01', description: 'APOE ε4 allele - strongest genetic risk factor for late-onset AD', mechanism: 'APOE4 impairs lipid transport, lysosomal function, and cholesterol homeostasis', roles: 'RATE_LIMITER', references_gene: 'HGNC:613' },
  { id: 'chronic_inflammation', label: 'Chronic Inflammation', category: 'STATE', subtype: 'PhysiologicalState', moduleId: 'M01', description: 'Persistent low-grade inflammation associated with aging', mechanism: 'Inflammaging damages lysosomal membranes and impairs autophagy', roles: '' },

  // ---- M02: Lysosomal Pathology (Central Hub) ----
  { id: 'lysosome', label: 'Lysosome', category: 'STOCK', subtype: 'Organelle', moduleId: 'M02', description: 'Central degradation organelle responsible for autophagy and clearance', mechanism: 'Lysosomes maintain pH ~4.5-5 via V-ATPase. Contains hydrolases for degradation. Critical distinction: dysfunction (reparable) vs damage (irreparable).', roles: 'THERAPEUTIC_TARGET', references_process: 'GO:0005764', notes: 'Central node - the hub of this framework' },
  { id: 'lysosomal_ph', label: 'Lysosomal pH', category: 'STATE', subtype: 'MetabolicState', moduleId: 'M02', description: 'Acidic pH (~4.5-5) required for hydrolase enzyme function', mechanism: 'V-ATPase pumps protons to maintain acidity. pH elevation inactivates cathepsins and other enzymes.', roles: 'BIOMARKER,THERAPEUTIC_TARGET', pmid: '35259016' },
  { id: 'v_atpase', label: 'V-ATPase', category: 'STOCK', subtype: 'ProteinPool', moduleId: 'M02', description: 'Vacuolar ATPase proton pump that acidifies lysosomes', mechanism: 'Multi-subunit enzyme complex. Target of C381 drug. Dysfunction leads to pH elevation.', roles: 'THERAPEUTIC_TARGET', pmid: '35259016' },
  { id: 'lysosomal_membrane_integrity', label: 'Membrane Integrity', category: 'STATE', subtype: 'PhysiologicalState', moduleId: 'M02', description: 'Intact lysosomal membrane containing hydrolases', mechanism: 'Membrane keeps cathepsins and other enzymes contained. Breach causes lysosomal membrane permeabilization (LMP).', roles: 'BIOMARKER' },
  { id: 'lmp', label: 'LMP', category: 'STATE', subtype: 'PhysiologicalState', moduleId: 'M02', description: 'Lysosomal membrane permeabilization - cathepsin leakage into cytosol', mechanism: 'LMP releases cathepsins B, D, L which trigger apoptotic cascades. Can be partial (repairable) or full (cell death).', roles: 'BIOMARKER', pmid: '29253550' },
  { id: 'escrt_repair', label: 'ESCRT Repair', category: 'PROCESS', subtype: 'BiologicalProcess', moduleId: 'M02', description: 'ESCRT-III membrane repair machinery that seals lysosomal damage', mechanism: 'ESCRT-III, ALIX, TSG101 complex recruited to damaged membranes. Efficiency declines with age - key translational factor.', roles: 'RATE_LIMITER', pmid: '32709779', notes: 'Critical: ESCRT decline explains why animal models mislead' },
  { id: 'cathepsin_release', label: 'Cathepsin Release', category: 'STATE', subtype: 'PhysiologicalState', moduleId: 'M02', description: 'Lysosomal proteases leaked into cytosol after membrane failure', mechanism: 'Cathepsins B, D, L activate cell death pathways when released into cytosol. Triggers inflammasome activation.', roles: 'BIOMARKER' },
  { id: 'lysosomal_biogenesis', label: 'Lysosomal Biogenesis', category: 'PROCESS', subtype: 'BiologicalProcess', moduleId: 'M02', description: 'TFEB-mediated creation of new lysosomes', mechanism: 'TFEB translocates to nucleus and activates CLEAR gene network for lysosome production. Target of sulforaphane.', roles: 'THERAPEUTIC_TARGET', pmid: '21979375' },
  { id: 'lysosomal_dysfunction', label: 'Lysosomal Dysfunction', category: 'STATE', subtype: 'PhysiologicalState', moduleId: 'M02', description: 'REVERSIBLE impairment: pH elevation, enzyme deficiency', mechanism: 'Can be repaired by V-ATPase restoration (C381) or new lysosome creation (sulforaphane). What animal models typically show.', roles: 'BIOMARKER', notes: 'REVERSIBLE - key distinction from damage' },
  { id: 'lysosomal_damage', label: 'Lysosomal Damage', category: 'STATE', subtype: 'PhysiologicalState', moduleId: 'M02', description: 'IRREVERSIBLE structural damage: LMP, membrane rupture', mechanism: 'Membrane integrity lost. ESCRT repair fails (especially with aging). Requires clearance of damaged organelle, not repair.', roles: 'BIOMARKER', notes: 'IRREVERSIBLE - what human AD shows. Explains translational failures.' },

  // ---- M03: Autophagy ----
  { id: 'autophagosome', label: 'Autophagosome', category: 'STOCK', subtype: 'Organelle', moduleId: 'M03', description: 'Double-membrane vesicle that engulfs cargo for degradation', mechanism: 'Forms around cargo (proteins, organelles), then fuses with lysosome for degradation. Accumulates when lysosomes are damaged.', roles: 'BIOMARKER', references_process: 'GO:0005776' },
  { id: 'autophagy_flux', label: 'Autophagy Flux', category: 'PROCESS', subtype: 'BiologicalProcess', moduleId: 'M03', description: 'Rate of cargo delivery and degradation through autophagy', mechanism: 'Measure of complete autophagy process. Enhanced flux is harmful when lysosomes are damaged (cargo piles up).', roles: 'BIOMARKER', pmid: '16286508' },
  { id: 'cargo_accumulation', label: 'Cargo Accumulation', category: 'STATE', subtype: 'PhysiologicalState', moduleId: 'M03', description: 'Buildup of undegraded material due to lysosomal failure', mechanism: 'Autophagosomes deliver cargo to damaged lysosomes that cannot degrade it. The autophagy paradox in AD.', roles: 'BIOMARKER', notes: 'Why autophagy enhancers fail in human AD' },
  { id: 'mtor', label: 'mTOR', category: 'STOCK', subtype: 'ProteinPool', moduleId: 'M03', description: 'Mechanistic target of rapamycin - master metabolic regulator', mechanism: 'When active: inhibits autophagy, sequesters TFEB in cytosol. Target of rapamycin.', roles: 'THERAPEUTIC_TARGET', references_gene: 'HGNC:3942' },
  { id: 'tfeb', label: 'TFEB', category: 'STOCK', subtype: 'ProteinPool', moduleId: 'M03', description: 'Master transcription factor for lysosomal biogenesis', mechanism: 'Regulates CLEAR gene network. Nuclear translocation activates lysosome production. Activated by sulforaphane (mTOR-independent).', roles: 'THERAPEUTIC_TARGET,LEVERAGE_POINT', pmid: '21979375', references_gene: 'HGNC:11753' },

  // ---- M06: Protein Aggregation ----
  { id: 'abeta_clearance', label: 'Aβ Clearance', category: 'PROCESS', subtype: 'BiologicalProcess', moduleId: 'M06', description: 'Removal of amyloid-beta through multiple pathways', mechanism: 'Includes microglial phagocytosis, perivascular drainage, and lysosomal degradation. Impaired by lysosomal damage.', roles: 'THERAPEUTIC_TARGET' },
  { id: 'tau_aggregation', label: 'Tau Aggregation', category: 'STATE', subtype: 'Aggregate', moduleId: 'M06', description: 'Pathological tau accumulation and neurofibrillary tangles', mechanism: 'Hyperphosphorylated tau forms aggregates when autophagy-lysosome pathway fails. Correlates with cognitive decline.', roles: 'BIOMARKER' },
  { id: 'abeta_aggregation', label: 'Aβ Aggregation', category: 'STATE', subtype: 'Aggregate', moduleId: 'M06', description: 'Amyloid-beta plaque formation', mechanism: 'Aβ oligomers and plaques form when clearance is impaired. Historically viewed as cause; now seen as downstream of lysosomal failure.', roles: 'BIOMARKER' },

  // ---- M09: Ferroptosis ----
  { id: 'iron_accumulation', label: 'Iron Accumulation', category: 'STATE', subtype: 'MetabolicState', moduleId: 'M09', description: 'Pathological iron buildup in cells and tissues', mechanism: 'Released from dying cells and degraded ferritin. Catalyzes Fenton reaction producing hydroxyl radicals.', roles: 'BIOMARKER' },
  { id: 'lipid_peroxidation', label: 'Lipid Peroxidation', category: 'STATE', subtype: 'MetabolicState', moduleId: 'M09', description: 'Oxidative damage to membrane lipids', mechanism: 'Iron-catalyzed oxidation of polyunsaturated fatty acids. Leads to membrane damage and ferroptotic cell death.', roles: 'BIOMARKER' },
  { id: 'gpx4', label: 'GPX4', category: 'STOCK', subtype: 'ProteinPool', moduleId: 'M09', description: 'Glutathione peroxidase 4 - key ferroptosis suppressor', mechanism: 'Reduces lipid peroxides to alcohols. Inactivation leads to ferroptosis. Selenium-dependent enzyme.', roles: 'THERAPEUTIC_TARGET', references_gene: 'HGNC:4556' },
  { id: 'ferroptosis', label: 'Ferroptosis', category: 'STATE', subtype: 'ClinicalOutcome', moduleId: 'M09', description: 'Iron-dependent form of regulated cell death', mechanism: 'Characterized by iron accumulation, lipid peroxidation, and GPX4 inactivation. Increasingly implicated in AD neurodegeneration.', roles: 'THERAPEUTIC_TARGET' },
  { id: 'cell_death', label: 'Cell Death', category: 'STATE', subtype: 'ClinicalOutcome', moduleId: 'M09', description: 'Neuronal cell death through multiple pathways', mechanism: 'Can occur via ferroptosis, lysosomal cell death (cathepsin release), or apoptosis. Releases intracellular iron.', roles: '' },

  // ---- THER: Therapeutics ----
  { id: 'c381', label: 'C381', category: 'BOUNDARY', subtype: 'Activator', moduleId: 'THER', description: 'V-ATPase enhancer that restores lysosomal acidification', mechanism: 'Benzyl urea derivative. Brain-penetrant, oral bioavailable. Restores lysosomal pH in early dysfunction.', roles: 'THERAPEUTIC_TARGET', pmid: '35259016', notes: 'PROMISING for early-stage AD' },
  { id: 'sulforaphane', label: 'Sulforaphane', category: 'BOUNDARY', subtype: 'Activator', moduleId: 'THER', description: 'TFEB activator that induces lysosomal biogenesis', mechanism: 'Induces mild ROS that activates TFEB via mTOR-INDEPENDENT pathway. Creates new lysosomes rather than repairing damaged ones.', roles: 'THERAPEUTIC_TARGET', pmid: '24823361', notes: 'PROMISING - creates new lysosomes' },
  { id: 'fasudil', label: 'Fasudil', category: 'BOUNDARY', subtype: 'Activator', moduleId: 'THER', description: 'ROCK inhibitor that enhances selective mitophagy', mechanism: 'Inhibits ROCK, which normally suppresses PINK1-Parkin pathway. Enables selective clearance of damaged organelles.', roles: 'THERAPEUTIC_TARGET', pmid: '29782259', notes: 'PROMISING - targets damaged organelles selectively' },
  { id: 'rapamycin', label: 'Rapamycin', category: 'BOUNDARY', subtype: 'Inhibitor', moduleId: 'THER', description: 'mTOR inhibitor - autophagy enhancer', mechanism: 'Inhibits mTOR, increasing autophagy flux. HARMFUL in human AD because it pushes cargo into damaged lysosomes.', roles: '', notes: 'ANTI-TARGET: Works in animal models, likely harmful in humans' },
  { id: 'senolytics', label: 'Senolytics', category: 'BOUNDARY', subtype: 'Inhibitor', moduleId: 'THER', description: 'Drugs that kill senescent cells', mechanism: 'Eliminate senescent cells to reduce SASP. HARMFUL because cell death releases intracellular iron, worsening iron toxicity.', roles: '', pmid: '34182019', notes: 'ANTI-TARGET: Worsens iron accumulation' },
  { id: 'iron_chelation', label: 'Iron Chelation', category: 'BOUNDARY', subtype: 'Inhibitor', moduleId: 'THER', description: 'Iron chelators like deferoxamine', mechanism: 'Remove iron from tissues. HARMFUL because they remove functional iron that cells need, not just toxic iron.', roles: '', pmid: '15050906', notes: 'ANTI-TARGET: Removes functional iron' },
  { id: 'ros_signal', label: 'ROS Signal', category: 'STATE', subtype: 'MetabolicState', moduleId: 'THER', description: 'Mild reactive oxygen species as signaling molecules', mechanism: 'Low-level ROS from sulforaphane activates TFEB nuclear translocation without causing oxidative damage.', roles: '' },
  { id: 'rock', label: 'ROCK', category: 'STOCK', subtype: 'ProteinPool', moduleId: 'THER', description: 'Rho-associated kinase that inhibits mitophagy', mechanism: 'Normally suppresses PINK1-Parkin pathway. Fasudil inhibits ROCK to enable selective mitophagy.', roles: 'THERAPEUTIC_TARGET', references_gene: 'HGNC:10251' },
  { id: 'pink1_parkin', label: 'PINK1-Parkin', category: 'STOCK', subtype: 'ProteinPool', moduleId: 'THER', description: 'Selective mitophagy pathway for damaged mitochondria', mechanism: 'PINK1 accumulates on damaged mitochondria, recruits Parkin, triggers selective degradation. Also clears damaged lysosomes.', roles: 'THERAPEUTIC_TARGET', references_gene: 'HGNC:14581' },
  { id: 'iron_release', label: 'Iron Release', category: 'STATE', subtype: 'PhysiologicalState', moduleId: 'THER', description: 'Iron released from dying cells into extracellular space', mechanism: 'Cell death releases stored iron from ferritin and iron-containing proteins. Propagates damage to neighboring cells.', roles: 'BIOMARKER' },
  { id: 'functional_iron', label: 'Functional Iron', category: 'STATE', subtype: 'MetabolicState', moduleId: 'THER', description: 'Iron required for normal cellular functions', mechanism: 'Necessary for mitochondrial function, DNA synthesis, neurotransmitter production. Should not be chelated.', roles: '' },

  // ---- Translational Gap Nodes ----
  { id: 'animal_model', label: 'Animal Model', category: 'STATE', subtype: 'PhysiologicalState', moduleId: 'M01', description: 'Young mice with lysosomal dysfunction (not damage)', mechanism: 'Animal models show reversible lysosomal dysfunction. ESCRT repair is intact. Autophagy enhancers work.', notes: 'Key translational difference' },
  { id: 'human_ad', label: 'Human AD', category: 'STATE', subtype: 'DiseaseStage', moduleId: 'M01', description: 'Aged humans with irreversible lysosomal damage', mechanism: 'Human AD shows irreversible damage with ESCRT failure. Autophagy enhancers may be harmful.', notes: 'Key translational difference' },
];

// ============================================================================
// EDGES
// ============================================================================
const edges = [
  // ---- M01 → M02: Upstream to Lysosomal Pathology ----
  { id: 'E01.001', source: 'aging', target: 'escrt_repair', relation: 'decreases', moduleId: 'M02', causalConfidence: 'L4', keyInsight: 'ESCRT efficiency declines with age - key translational factor', pmid: '32709779', methodType: 'observational' },
  { id: 'E01.002', source: 'aging', target: 'lysosomal_membrane_integrity', relation: 'decreases', moduleId: 'M02', causalConfidence: 'L4', keyInsight: 'Aging weakens lysosomal membranes', methodType: 'observational' },
  { id: 'E01.003', source: 'apoe4', target: 'lysosomal_dysfunction', relation: 'increases', moduleId: 'M02', causalConfidence: 'L3', keyInsight: 'APOE4 impairs lysosomal lipid handling', methodType: 'knockout' },
  { id: 'E01.004', source: 'chronic_inflammation', target: 'lmp', relation: 'increases', moduleId: 'M02', causalConfidence: 'L4', keyInsight: 'Inflammatory cytokines damage lysosomal membranes', methodType: 'in_vitro' },

  // ---- M02: Core Lysosomal Pathways ----
  { id: 'E02.001', source: 'v_atpase', target: 'lysosomal_ph', relation: 'decreases', moduleId: 'M02', causalConfidence: 'L3', mechanismDescription: 'V-ATPase pumps protons to maintain acidic pH', keyInsight: 'V-ATPase dysfunction = pH elevation', pmid: '35259016', methodType: 'knockout' },
  { id: 'E02.002', source: 'lysosomal_ph', target: 'lysosomal_dysfunction', relation: 'increases', moduleId: 'M02', causalConfidence: 'L3', mechanismDescription: 'Elevated pH inactivates lysosomal enzymes', keyInsight: 'Elevated pH = enzyme dysfunction (REVERSIBLE)', methodType: 'in_vitro' },
  { id: 'E02.003', source: 'lysosomal_membrane_integrity', target: 'lmp', relation: 'decreases', moduleId: 'M02', causalConfidence: 'L3', mechanismDescription: 'Intact membrane prevents permeabilization', keyInsight: 'Membrane health prevents LMP' },
  { id: 'E02.004', source: 'lmp', target: 'lysosomal_damage', relation: 'directlyIncreases', moduleId: 'M02', causalConfidence: 'L3', mechanismDescription: 'Membrane breach causes structural damage', keyInsight: 'LMP = irreversible damage (key distinction)', pmid: '29253550', methodType: 'in_vitro' },
  { id: 'E02.005', source: 'lysosomal_damage', target: 'escrt_repair', relation: 'increases', moduleId: 'M02', causalConfidence: 'L3', mechanismDescription: 'Damage triggers ESCRT repair attempt', keyInsight: 'ESCRT recruited to repair damage', pmid: '32709779', methodType: 'in_vitro' },
  { id: 'E02.006', source: 'escrt_repair', target: 'lysosomal_damage', relation: 'decreases', moduleId: 'M02', causalConfidence: 'L3', mechanismDescription: 'Successful ESCRT repair seals membrane', keyInsight: 'Successful repair reverses damage (rare in aged humans)', pmid: '32709779', methodType: 'in_vitro' },
  { id: 'E02.007', source: 'lysosomal_damage', target: 'cathepsin_release', relation: 'increases', moduleId: 'M02', causalConfidence: 'L2', mechanismDescription: 'Failed repair leads to cathepsin leakage', keyInsight: 'Cathepsin release = death cascade initiation', pmid: '29253550', methodType: 'cohort' },
  { id: 'E02.008', source: 'cathepsin_release', target: 'cell_death', relation: 'increases', moduleId: 'M02', causalConfidence: 'L2', mechanismDescription: 'Cytosolic cathepsins trigger apoptosis', keyInsight: 'Lysosomal cell death pathway', methodType: 'in_vitro' },
  { id: 'E02.009', source: 'tfeb', target: 'lysosomal_biogenesis', relation: 'increases', moduleId: 'M02', causalConfidence: 'L3', mechanismDescription: 'TFEB activates CLEAR gene network', keyInsight: 'TFEB = master regulator of lysosome creation', pmid: '21979375', methodType: 'knockout' },
  { id: 'E02.010', source: 'lysosomal_biogenesis', target: 'lysosome', relation: 'increases', moduleId: 'M02', causalConfidence: 'L3', keyInsight: 'Creates new functional lysosomes' },

  // ---- M03: Autophagy Module ----
  { id: 'E03.001', source: 'autophagy_flux', target: 'autophagosome', relation: 'increases', moduleId: 'M03', causalConfidence: 'L3', keyInsight: 'More flux = more autophagosomes' },
  { id: 'E03.002', source: 'autophagosome', target: 'lysosome', relation: 'increases', moduleId: 'M03', causalConfidence: 'L3', mechanismDescription: 'Autophagosomes fuse with lysosomes', keyInsight: 'Autolysosome formation for degradation' },
  { id: 'E03.003', source: 'lysosomal_damage', target: 'cargo_accumulation', relation: 'increases', moduleId: 'M03', causalConfidence: 'L3', mechanismDescription: 'Damaged lysosomes cannot degrade cargo', keyInsight: 'CRITICAL: Why autophagy enhancers fail in human AD', pmid: '16286508', methodType: 'observational', notes: 'Core insight of the framework' },
  { id: 'E03.004', source: 'mtor', target: 'autophagy_flux', relation: 'decreases', moduleId: 'M03', causalConfidence: 'L1', mechanismDescription: 'mTOR inhibits autophagy initiation', keyInsight: 'mTOR = autophagy brake' },
  { id: 'E03.005', source: 'mtor', target: 'tfeb', relation: 'decreases', moduleId: 'M03', causalConfidence: 'L2', mechanismDescription: 'mTOR phosphorylates and sequesters TFEB in cytosol', keyInsight: 'Active mTOR = TFEB trapped in cytosol' },
  { id: 'E03.006', source: 'lysosomal_dysfunction', target: 'abeta_clearance', relation: 'decreases', moduleId: 'M03', causalConfidence: 'L3', keyInsight: 'Dysfunctional lysosomes cannot clear Aβ' },

  // ---- M06: Protein Aggregation ----
  { id: 'E06.001', source: 'abeta_clearance', target: 'abeta_aggregation', relation: 'decreases', moduleId: 'M06', causalConfidence: 'L3', keyInsight: 'Clearance failure leads to aggregation' },
  { id: 'E06.002', source: 'cargo_accumulation', target: 'tau_aggregation', relation: 'increases', moduleId: 'M06', causalConfidence: 'L3', keyInsight: 'Undegraded tau aggregates' },
  { id: 'E06.003', source: 'cargo_accumulation', target: 'abeta_aggregation', relation: 'increases', moduleId: 'M06', causalConfidence: 'L3', keyInsight: 'Undegraded Aβ aggregates' },

  // ---- M09: Ferroptosis ----
  { id: 'E09.001', source: 'cell_death', target: 'iron_release', relation: 'increases', moduleId: 'M09', causalConfidence: 'L3', keyInsight: 'Dying cells release stored iron' },
  { id: 'E09.002', source: 'iron_release', target: 'iron_accumulation', relation: 'increases', moduleId: 'M09', causalConfidence: 'L3', keyInsight: 'Released iron accumulates in tissue' },
  { id: 'E09.003', source: 'iron_accumulation', target: 'lipid_peroxidation', relation: 'increases', moduleId: 'M09', causalConfidence: 'L3', mechanismDescription: 'Iron catalyzes Fenton reaction', keyInsight: 'Free iron generates hydroxyl radicals' },
  { id: 'E09.004', source: 'lipid_peroxidation', target: 'ferroptosis', relation: 'increases', moduleId: 'M09', causalConfidence: 'L3', keyInsight: 'Peroxidized lipids trigger ferroptosis' },
  { id: 'E09.005', source: 'gpx4', target: 'lipid_peroxidation', relation: 'decreases', moduleId: 'M09', causalConfidence: 'L2', mechanismDescription: 'GPX4 reduces lipid peroxides', keyInsight: 'GPX4 = key ferroptosis suppressor' },
  { id: 'E09.006', source: 'ferroptosis', target: 'cell_death', relation: 'increases', moduleId: 'M09', causalConfidence: 'L3', keyInsight: 'Ferroptosis is a cell death pathway' },

  // ---- THER: Therapeutic Interventions ----
  // C381 pathway
  { id: 'ETHER.001', source: 'c381', target: 'v_atpase', relation: 'increases', moduleId: 'THER', causalConfidence: 'L3', mechanismDescription: 'C381 enhances V-ATPase activity', keyInsight: 'RESTORES existing lysosome function', pmid: '35259016', methodType: 'intervention_animal' },

  // Sulforaphane pathway
  { id: 'ETHER.002', source: 'sulforaphane', target: 'ros_signal', relation: 'increases', moduleId: 'THER', causalConfidence: 'L3', mechanismDescription: 'Sulforaphane induces mild ROS', keyInsight: 'Mild ROS = signaling, not damage', pmid: '24823361', methodType: 'in_vitro' },
  { id: 'ETHER.003', source: 'ros_signal', target: 'tfeb', relation: 'increases', moduleId: 'THER', causalConfidence: 'L3', mechanismDescription: 'ROS triggers TFEB nuclear translocation', keyInsight: 'mTOR-INDEPENDENT TFEB activation', pmid: '24823361', methodType: 'in_vitro' },

  // Fasudil pathway
  { id: 'ETHER.004', source: 'fasudil', target: 'rock', relation: 'decreases', moduleId: 'THER', causalConfidence: 'L2', mechanismDescription: 'Fasudil directly inhibits ROCK', keyInsight: 'Direct kinase inhibition', pmid: '29782259', methodType: 'RCT' },
  { id: 'ETHER.005', source: 'rock', target: 'pink1_parkin', relation: 'decreases', moduleId: 'THER', causalConfidence: 'L4', mechanismDescription: 'ROCK normally suppresses PINK1-Parkin', keyInsight: 'ROCK inhibition enables selective mitophagy', pmid: '29782259', methodType: 'in_vitro' },
  { id: 'ETHER.006', source: 'pink1_parkin', target: 'lysosomal_damage', relation: 'decreases', moduleId: 'THER', causalConfidence: 'L4', mechanismDescription: 'PINK1-Parkin clears damaged organelles', keyInsight: 'Selective clearance of damaged lysosomes', methodType: 'in_vitro' },

  // Rapamycin - ANTI-TARGET
  { id: 'ETHER.007', source: 'rapamycin', target: 'mtor', relation: 'decreases', moduleId: 'THER', causalConfidence: 'L1', mechanismDescription: 'Direct mTOR inhibition', keyInsight: 'Increases autophagy flux', methodType: 'RCT' },
  { id: 'ETHER.008', source: 'rapamycin', target: 'cargo_accumulation', relation: 'increases', moduleId: 'THER', causalConfidence: 'L4', mechanismDescription: 'Increases flux into broken lysosomes', keyInsight: 'PARADOX: Harmful when lysosomes damaged', methodType: 'observational', notes: 'ANTI-TARGET: Why rapamycin may harm human AD patients' },

  // Senolytics - ANTI-TARGET
  { id: 'ETHER.009', source: 'senolytics', target: 'iron_release', relation: 'increases', moduleId: 'THER', causalConfidence: 'L4', mechanismDescription: 'Senolytic-induced cell death releases iron', keyInsight: 'HARMFUL: Worsens iron toxicity', pmid: '34182019', methodType: 'intervention_animal', notes: 'ANTI-TARGET' },

  // Iron chelation - ANTI-TARGET
  { id: 'ETHER.010', source: 'iron_chelation', target: 'functional_iron', relation: 'decreases', moduleId: 'THER', causalConfidence: 'L4', mechanismDescription: 'Chelators remove all iron non-selectively', keyInsight: 'HARMFUL: Removes iron cells need', pmid: '15050906', methodType: 'observational', notes: 'ANTI-TARGET' },

  // ---- Translational Gap ----
  { id: 'E-TRANS.001', source: 'animal_model', target: 'lysosomal_dysfunction', relation: 'association', moduleId: 'M01', causalConfidence: 'L6', keyInsight: 'Animal models show dysfunction (reparable)' },
  { id: 'E-TRANS.002', source: 'human_ad', target: 'lysosomal_damage', relation: 'association', moduleId: 'M01', causalConfidence: 'L6', keyInsight: 'Human AD shows damage (irreparable)' },
];

// ============================================================================
// MAIN
// ============================================================================
function main() {
  console.log('Creating mechanistic framework Excel file...');

  // Create workbook
  const wb = XLSX.utils.book_new();

  // Create Nodes sheet
  const nodesSheet = XLSX.utils.json_to_sheet(nodes);
  XLSX.utils.book_append_sheet(wb, nodesSheet, 'Nodes');

  // Create Edges sheet
  const edgesSheet = XLSX.utils.json_to_sheet(edges);
  XLSX.utils.book_append_sheet(wb, edgesSheet, 'Edges');

  // Create Modules sheet
  const modulesSheet = XLSX.utils.json_to_sheet(modules);
  XLSX.utils.book_append_sheet(wb, modulesSheet, 'Modules');

  // Write file
  XLSX.writeFile(wb, EXCEL_PATH);

  console.log(`Written to: ${EXCEL_PATH}`);
  console.log(`  Modules: ${modules.length}`);
  console.log(`  Nodes: ${nodes.length}`);
  console.log(`  Edges: ${edges.length}`);
  console.log('\nNow run: npx tsx scripts/generate-framework-data.ts');
}

main();
