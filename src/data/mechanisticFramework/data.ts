/**
 * AUTO-GENERATED FILE - DO NOT EDIT DIRECTLY
 *
 * This file is generated from framework.xlsx by:
 *   npx tsx scripts/generate-framework-data.ts
 *
 * To update this data, edit the Excel file and re-run the script.
 *
 * Generated: 2026-01-29T04:19:17.185Z
 */

import type { MechanisticNode, MechanisticEdge, Module } from './types';

export const allNodes: MechanisticNode[] = [
  {
    "id": "aging",
    "label": "Aging",
    "category": "STATE",
    "subtype": "RiskFactor",
    "moduleId": "M01",
    "description": "Age-related decline in cellular repair mechanisms",
    "mechanism": "Reduces ESCRT repair efficiency, impairs proteostasis, increases oxidative stress, decreases glymphatic function ~40%",
    "roles": [
      "RATE_LIMITER"
    ]
  },
  {
    "id": "apoe4",
    "label": "APOE4",
    "category": "STOCK",
    "subtype": "GeneticVariant",
    "moduleId": "M01",
    "description": "APOE ε4 allele - strongest genetic risk factor for late-onset AD",
    "mechanism": "Impairs lipid transport, lysosomal function, cholesterol homeostasis, and pericyte survival",
    "references": {
      "gene": "HGNC:613"
    },
    "roles": [
      "RATE_LIMITER"
    ]
  },
  {
    "id": "trem2_variant",
    "label": "TREM2 Variants",
    "category": "STOCK",
    "subtype": "GeneticVariant",
    "moduleId": "M01",
    "description": "Loss-of-function TREM2 variants (R47H, R62H) increase AD risk 2-4x",
    "mechanism": "TREM2 is a microglial lipid sensor. Variants impair microglial phagocytosis and response to damage signals.",
    "references": {
      "gene": "HGNC:17760"
    },
    "roles": [
      "RATE_LIMITER"
    ]
  },
  {
    "id": "chronic_inflammation",
    "label": "Chronic Inflammation",
    "category": "STATE",
    "subtype": "PhysiologicalState",
    "moduleId": "M01",
    "description": "Persistent low-grade systemic inflammation (inflammaging)",
    "mechanism": "Damages lysosomal membranes, impairs autophagy, activates complement cascade chronically"
  },
  {
    "id": "sleep_disruption",
    "label": "Sleep Disruption",
    "category": "STATE",
    "subtype": "RiskFactor",
    "moduleId": "M01",
    "description": "Chronic sleep deprivation or poor sleep quality",
    "mechanism": "Glymphatic clearance increases 60% during sleep (Xie 2013). Sleep disruption reduces Aβ clearance and causes AQP4 depolarization.",
    "pmid": "24136970"
  },
  {
    "id": "traumatic_brain_injury",
    "label": "TBI",
    "category": "STATE",
    "subtype": "RiskFactor",
    "moduleId": "M01",
    "description": "Traumatic brain injury as AD risk factor",
    "mechanism": "Causes acute BBB disruption, pericyte loss, iron deposition from microhemorrhages, and chronic neuroinflammation"
  },
  {
    "id": "metabolic_syndrome",
    "label": "Metabolic Syndrome",
    "category": "STATE",
    "subtype": "RiskFactor",
    "moduleId": "M01",
    "description": "Insulin resistance, obesity, T2DM as AD risk factors",
    "mechanism": "Insulin resistance impairs IDE availability for Aβ clearance. Hyperglycemia damages pericytes. Obesity drives chronic inflammation."
  },
  {
    "id": "animal_model",
    "label": "Animal Model",
    "category": "STATE",
    "subtype": "PhysiologicalState",
    "moduleId": "M01",
    "description": "Young mice with lysosomal dysfunction (not damage)",
    "mechanism": "Animal models show reversible lysosomal dysfunction. ESCRT repair is intact. Autophagy enhancers work.",
    "notes": "Key translational difference"
  },
  {
    "id": "human_ad",
    "label": "Human AD",
    "category": "STATE",
    "subtype": "DiseaseStage",
    "moduleId": "M01",
    "description": "Aged humans with irreversible lysosomal damage",
    "mechanism": "Human AD shows irreversible damage with ESCRT failure. Autophagy enhancers may be harmful.",
    "notes": "Key translational difference"
  },
  {
    "id": "lysosome",
    "label": "Lysosome",
    "category": "STOCK",
    "subtype": "Organelle",
    "moduleId": "M02",
    "description": "Central degradation organelle responsible for autophagy and clearance",
    "mechanism": "Maintains pH ~4.5-5 via V-ATPase. Contains hydrolases for degradation. Hub of the PLIG framework.",
    "references": {
      "process": "GO:0005764"
    },
    "roles": [
      "THERAPEUTIC_TARGET",
      "LEVERAGE_POINT"
    ]
  },
  {
    "id": "lysosomal_ph",
    "label": "Lysosomal pH",
    "category": "STATE",
    "subtype": "MetabolicState",
    "moduleId": "M02",
    "description": "Acidic pH (~4.5-5) required for hydrolase enzyme function",
    "mechanism": "V-ATPase pumps protons to maintain acidity. pH elevation inactivates cathepsins, GBA, and other enzymes. Master switch for multiple downstream pathways.",
    "pmid": "35259016",
    "roles": [
      "BIOMARKER",
      "THERAPEUTIC_TARGET",
      "LEVERAGE_POINT"
    ]
  },
  {
    "id": "v_atpase",
    "label": "V-ATPase",
    "category": "STOCK",
    "subtype": "ProteinPool",
    "moduleId": "M02",
    "description": "Vacuolar ATPase proton pump that acidifies lysosomes",
    "mechanism": "Multi-subunit enzyme complex. Estrogen upregulates expression. ORF3a disrupts function. Target of C381.",
    "pmid": "35259016",
    "roles": [
      "THERAPEUTIC_TARGET"
    ]
  },
  {
    "id": "lysosomal_membrane_integrity",
    "label": "Membrane Integrity",
    "category": "STATE",
    "subtype": "PhysiologicalState",
    "moduleId": "M02",
    "description": "Intact lysosomal membrane containing hydrolases and iron",
    "mechanism": "Membrane keeps cathepsins, iron, and other contents contained. Breach causes lysosomal membrane permeabilization (LMP).",
    "roles": [
      "BIOMARKER"
    ]
  },
  {
    "id": "lmp",
    "label": "LMP",
    "category": "STATE",
    "subtype": "PhysiologicalState",
    "moduleId": "M02",
    "description": "Lysosomal membrane permeabilization - contents leak into cytosol",
    "mechanism": "Releases cathepsins B/D/L, iron, and ROS into cytosol. Can be partial (repairable via ESCRT) or full (cell death).",
    "pmid": "29253550",
    "roles": [
      "BIOMARKER",
      "FEEDBACK_NODE"
    ]
  },
  {
    "id": "escrt_repair",
    "label": "ESCRT Repair",
    "category": "PROCESS",
    "subtype": "BiologicalProcess",
    "moduleId": "M02",
    "description": "ESCRT-III membrane repair machinery that seals lysosomal damage",
    "mechanism": "ESCRT-III, ALIX, TSG101 recruited to damaged membranes. Efficiency declines with age - key reason animal models mislead.",
    "pmid": "32709779",
    "roles": [
      "RATE_LIMITER"
    ]
  },
  {
    "id": "cathepsin_release",
    "label": "Cathepsin Release",
    "category": "STATE",
    "subtype": "PhysiologicalState",
    "moduleId": "M02",
    "description": "Lysosomal proteases leaked into cytosol after membrane failure",
    "mechanism": "Cathepsins B, D, L activate apoptosis and inflammasome when in cytosol. Triggers NLRP3 activation."
  },
  {
    "id": "cathepsin_activity",
    "label": "Cathepsin Activity",
    "category": "PROCESS",
    "subtype": "Enzyme",
    "moduleId": "M02",
    "description": "Cathepsin B and D enzymatic activity within functional lysosomes",
    "mechanism": "pH-dependent proteases that degrade Aβ, tau, and other substrates. Cathepsin B cleaves Aβ. Active only at pH < 5.",
    "roles": [
      "THERAPEUTIC_TARGET"
    ]
  },
  {
    "id": "lysosomal_biogenesis",
    "label": "Lysosomal Biogenesis",
    "category": "PROCESS",
    "subtype": "BiologicalProcess",
    "moduleId": "M02",
    "description": "TFEB-mediated creation of new lysosomes",
    "mechanism": "TFEB translocates to nucleus and activates CLEAR gene network. Creates NEW functional lysosomes rather than repairing damaged ones.",
    "pmid": "21979375",
    "roles": [
      "THERAPEUTIC_TARGET"
    ]
  },
  {
    "id": "lysosomal_dysfunction",
    "label": "Lysosomal Dysfunction",
    "category": "STATE",
    "subtype": "PhysiologicalState",
    "moduleId": "M02",
    "description": "REVERSIBLE impairment: pH elevation, enzyme deficiency",
    "mechanism": "Can be repaired by V-ATPase restoration (C381) or new lysosome creation (sulforaphane). What animal models typically show.",
    "notes": "REVERSIBLE - key distinction from damage",
    "roles": [
      "BIOMARKER"
    ]
  },
  {
    "id": "lysosomal_damage",
    "label": "Lysosomal Damage",
    "category": "STATE",
    "subtype": "PhysiologicalState",
    "moduleId": "M02",
    "description": "IRREVERSIBLE structural damage: LMP, membrane rupture",
    "mechanism": "Membrane integrity lost. ESCRT repair fails with aging. Requires clearance via lysophagy, not repair.",
    "notes": "IRREVERSIBLE - what human AD brains show",
    "roles": [
      "BIOMARKER"
    ]
  },
  {
    "id": "lipofuscin",
    "label": "Lipofuscin",
    "category": "STOCK",
    "subtype": "Aggregate",
    "moduleId": "M02",
    "description": "Indigestible lysosomal waste that accumulates with age",
    "mechanism": "Cross-linked lipid-protein aggregates that trap iron and resist degradation. Occupies lysosomal volume, reducing capacity. Generates ROS via Fenton chemistry.",
    "roles": [
      "FEEDBACK_NODE"
    ]
  },
  {
    "id": "autophagosome",
    "label": "Autophagosome",
    "category": "STOCK",
    "subtype": "Organelle",
    "moduleId": "M03",
    "description": "Double-membrane vesicle that engulfs cargo for degradation",
    "mechanism": "Forms around cargo, fuses with lysosome. Accumulates when lysosomes are damaged or dysfunctional.",
    "references": {
      "process": "GO:0005776"
    },
    "roles": [
      "BIOMARKER"
    ]
  },
  {
    "id": "autophagy_flux",
    "label": "Autophagy Flux",
    "category": "PROCESS",
    "subtype": "BiologicalProcess",
    "moduleId": "M03",
    "description": "Rate of cargo delivery and degradation through autophagy",
    "mechanism": "Complete process rate. Enhanced flux is HARMFUL when lysosomes are damaged (cargo piles up with nowhere to go).",
    "pmid": "16286508",
    "roles": [
      "BIOMARKER"
    ]
  },
  {
    "id": "cargo_accumulation",
    "label": "Cargo Accumulation",
    "category": "STATE",
    "subtype": "PhysiologicalState",
    "moduleId": "M03",
    "description": "Buildup of undegraded material due to lysosomal failure",
    "mechanism": "Autophagosomes deliver cargo to damaged lysosomes that cannot degrade it. The autophagy paradox: more autophagy = more damage when lysosomes are broken.",
    "notes": "Why autophagy enhancers fail in human AD",
    "roles": [
      "BIOMARKER"
    ]
  },
  {
    "id": "mtor",
    "label": "mTOR",
    "category": "STOCK",
    "subtype": "ProteinPool",
    "moduleId": "M03",
    "description": "Mechanistic target of rapamycin - master metabolic regulator",
    "mechanism": "When active: inhibits autophagy initiation and sequesters TFEB in cytosol.",
    "references": {
      "gene": "HGNC:3942"
    },
    "roles": [
      "THERAPEUTIC_TARGET"
    ]
  },
  {
    "id": "tfeb",
    "label": "TFEB",
    "category": "STOCK",
    "subtype": "ProteinPool",
    "moduleId": "M03",
    "description": "Master transcription factor for lysosomal biogenesis",
    "mechanism": "Regulates CLEAR gene network. Nuclear translocation activates lysosome production. Can be activated mTOR-independently by sulforaphane.",
    "pmid": "21979375",
    "references": {
      "gene": "HGNC:11753"
    },
    "roles": [
      "THERAPEUTIC_TARGET",
      "LEVERAGE_POINT"
    ]
  },
  {
    "id": "lysophagy",
    "label": "Lysophagy",
    "category": "PROCESS",
    "subtype": "BiologicalProcess",
    "moduleId": "M03",
    "description": "Selective autophagy of damaged lysosomes",
    "mechanism": "Ubiquitin-dependent recognition and clearance of damaged lysosomes. Requires functional lysosomes to degrade the damaged ones - a catch-22 in late disease.",
    "roles": [
      "THERAPEUTIC_TARGET"
    ]
  },
  {
    "id": "pericyte",
    "label": "Pericyte",
    "category": "STOCK",
    "subtype": "CellType",
    "moduleId": "M04",
    "description": "Mural cells that wrap brain capillaries and maintain BBB integrity",
    "mechanism": "Regulate BBB permeability, capillary diameter, and neurovascular coupling. Lost early in AD. APOE4 accelerates pericyte death.",
    "notes": "INTEGRITY NOTE: Key pericyte-AD mouse studies from Zlokovic lab retracted (Sagare 2013 Nat Commun, Montagne 2018 Nat Med) due to image manipulation. Pericyte biology supported independently by Armulik 2010 (Nature), Daneman 2010 (Nature), and human imaging studies (Montagne 2015 Nat Med, NOT retracted). Claims about pericyte loss in AD remain plausible but mouse model evidence is weakened.",
    "references": {
      "cellType": "CL:0000669"
    },
    "roles": [
      "LEVERAGE_POINT"
    ]
  },
  {
    "id": "bbb",
    "label": "Blood-Brain Barrier",
    "category": "STATE",
    "subtype": "Barrier",
    "moduleId": "M04",
    "description": "Tight-junction barrier controlling brain entry/exit of molecules",
    "mechanism": "Formed by endothelial cells, pericytes, and astrocyte endfeet. Pericyte loss opens BBB, allowing peripheral iron and immune cells into brain.",
    "notes": "BBB breakdown in AD supported by independent human MRI studies (Montagne 2015 Nat Med, Nation 2019 Nat Med) and is not solely dependent on retracted Zlokovic mouse data.",
    "roles": [
      "BIOMARKER"
    ]
  },
  {
    "id": "astrocyte_endfeet",
    "label": "Astrocyte Endfeet",
    "category": "STOCK",
    "subtype": "CellType",
    "moduleId": "M04",
    "description": "Astrocyte processes that contact blood vessels and regulate AQP4",
    "mechanism": "Express AQP4 water channels for glymphatic flow. Polarization (AQP4 concentrated at endfeet) is required for efficient clearance. Lost in AD.",
    "roles": [
      "LEVERAGE_POINT"
    ]
  },
  {
    "id": "aqp4",
    "label": "AQP4",
    "category": "STOCK",
    "subtype": "ProteinPool",
    "moduleId": "M04",
    "description": "Aquaporin-4 water channel on astrocyte endfeet",
    "mechanism": "Mediates perivascular CSF-ISF exchange (glymphatic flow). Polarization to endfeet required. Depolarization reduces clearance.",
    "references": {
      "gene": "HGNC:633"
    },
    "roles": [
      "BIOMARKER"
    ]
  },
  {
    "id": "glymphatic_clearance",
    "label": "Glymphatic Clearance",
    "category": "PROCESS",
    "subtype": "BiologicalProcess",
    "moduleId": "M04",
    "description": "AQP4-mediated perivascular clearance of brain waste including soluble Aβ",
    "mechanism": "CSF flows along periarterial spaces, exchanges with ISF, clears solutes along perivenous routes. Increases 60% during sleep. Declines ~40% with age.",
    "pmid": "24136970",
    "roles": [
      "THERAPEUTIC_TARGET"
    ]
  },
  {
    "id": "lrp1",
    "label": "LRP1",
    "category": "STOCK",
    "subtype": "Receptor",
    "moduleId": "M04",
    "description": "Low-density lipoprotein receptor-related protein 1 - primary Aβ efflux receptor at BBB",
    "mechanism": "Two trafficking routes: PACSIN2-mediated tubular transcytosis (rapid Aβ efflux, physiological) vs PICALM-clathrin-Rab5 pathway (leads to LRP1 lysosomal degradation). In AD, trafficking shifts pathologically to Rab5 route.",
    "pmid": "41052971",
    "references": {
      "gene": "HGNC:6692"
    },
    "roles": [
      "THERAPEUTIC_TARGET"
    ]
  },
  {
    "id": "bbb_iron_entry",
    "label": "BBB Iron Entry",
    "category": "PROCESS",
    "subtype": "BiologicalProcess",
    "moduleId": "M04",
    "description": "Unregulated iron influx through compromised BBB",
    "mechanism": "BBB breakdown allows peripheral iron, transferrin, and ferritin into brain parenchyma. Contributes to iron maldistribution."
  },
  {
    "id": "ace2",
    "label": "ACE2",
    "category": "STOCK",
    "subtype": "Receptor",
    "moduleId": "M04",
    "description": "Angiotensin-converting enzyme 2 - SARS-CoV-2 entry receptor on pericytes",
    "mechanism": "Pericytes express high ACE2 levels. Viral binding damages pericytes, disrupts BBB. Also regulates angiotensin balance.",
    "references": {
      "gene": "HGNC:13557"
    },
    "roles": [
      "LEVERAGE_POINT"
    ]
  },
  {
    "id": "labile_iron_pool",
    "label": "Labile Iron Pool",
    "category": "STATE",
    "subtype": "IonPool",
    "moduleId": "M05",
    "description": "Free redox-active iron in cytosol (Fe²⁺) available for Fenton chemistry",
    "mechanism": "Released from damaged lysosomes (LMP), dying cells, and degraded ferritin. Catalyzes hydroxyl radical production. The dangerous form of iron.",
    "roles": [
      "BIOMARKER",
      "FEEDBACK_NODE"
    ]
  },
  {
    "id": "functional_iron",
    "label": "Functional Iron",
    "category": "STATE",
    "subtype": "IonPool",
    "moduleId": "M05",
    "description": "Iron bound in enzymes, mitochondria, and hemoglobin - required for life",
    "mechanism": "Necessary for mitochondrial electron transport, DNA synthesis, neurotransmitter production. Iron maldistribution depletes functional pools while toxic pools grow.",
    "roles": [
      "BIOMARKER"
    ]
  },
  {
    "id": "iron_trapped_lysosomes",
    "label": "Iron Trapped in Lysosomes",
    "category": "STATE",
    "subtype": "IonPool",
    "moduleId": "M05",
    "description": "Iron sequestered in dysfunctional lysosomes that cannot export it",
    "mechanism": "Alkalinized lysosomes cannot reduce Fe³⁺ to Fe²⁺ for export via DMT1. Iron accumulates, undergoes Fenton chemistry within the lysosome itself, damaging membranes.",
    "roles": [
      "FEEDBACK_NODE"
    ]
  },
  {
    "id": "iron_trapped_aggregates",
    "label": "Iron Trapped in Aggregates",
    "category": "STATE",
    "subtype": "IonPool",
    "moduleId": "M05",
    "description": "Iron bound within Aβ plaques, α-synuclein aggregates, and lipofuscin",
    "mechanism": "Protein aggregates chelate iron. This iron is not bioavailable but can generate localized ROS. Contributes to aggregate toxicity."
  },
  {
    "id": "fenton_reaction",
    "label": "Fenton Reaction",
    "category": "PROCESS",
    "subtype": "ChemicalReaction",
    "moduleId": "M05",
    "description": "Fe²⁺ + H₂O₂ → Fe³⁺ + OH• + OH⁻ - produces hydroxyl radicals",
    "mechanism": "Most destructive ROS in biology. Occurs wherever labile iron meets hydrogen peroxide. Damages lipids, proteins, DNA, and lysosomal membranes.",
    "roles": [
      "FEEDBACK_NODE"
    ]
  },
  {
    "id": "lipid_peroxidation",
    "label": "Lipid Peroxidation",
    "category": "STATE",
    "subtype": "MetabolicState",
    "moduleId": "M05",
    "description": "Oxidative damage to membrane lipids by hydroxyl radicals",
    "mechanism": "Iron-catalyzed oxidation of PUFAs. Damages cell membranes and lysosomal membranes. Produces 4-HNE and MDA. Leads to ferroptosis."
  },
  {
    "id": "ferroptosis",
    "label": "Ferroptosis",
    "category": "STATE",
    "subtype": "ClinicalOutcome",
    "moduleId": "M05",
    "description": "Iron-dependent regulated cell death via lipid peroxidation",
    "mechanism": "Defined by iron dependence, lipid peroxide accumulation, and GPX4 inactivation. Releases intracellular iron, propagating damage to neighbors.",
    "roles": [
      "FEEDBACK_NODE"
    ]
  },
  {
    "id": "gpx4",
    "label": "GPX4",
    "category": "STOCK",
    "subtype": "Enzyme",
    "moduleId": "M05",
    "description": "Glutathione peroxidase 4 - key ferroptosis suppressor enzyme",
    "mechanism": "Reduces lipid peroxides to alcohols. Selenium-dependent. Inactivation triggers ferroptosis.",
    "references": {
      "gene": "HGNC:4556"
    },
    "roles": [
      "THERAPEUTIC_TARGET"
    ]
  },
  {
    "id": "ferroportin",
    "label": "Ferroportin",
    "category": "STOCK",
    "subtype": "ProteinPool",
    "moduleId": "M05",
    "description": "Only known cellular iron exporter (SLC40A1)",
    "mechanism": "Exports Fe²⁺ from cells. Expressed on neurons, microglia, endothelial cells, and enterocytes. Degraded by hepcidin binding. Key to iron redistribution strategy.",
    "notes": "The only way cells can export iron. Central to redistribution vs chelation debate.",
    "references": {
      "gene": "HGNC:10909"
    },
    "roles": [
      "THERAPEUTIC_TARGET",
      "LEVERAGE_POINT"
    ]
  },
  {
    "id": "cell_death",
    "label": "Cell Death",
    "category": "STATE",
    "subtype": "ClinicalOutcome",
    "moduleId": "M05",
    "description": "Neuronal death through ferroptosis, lysosomal cell death, or apoptosis",
    "mechanism": "All cell death pathways release intracellular iron stores, propagating iron toxicity to neighboring cells. Creates a feed-forward loop."
  },
  {
    "id": "iron_release",
    "label": "Iron Release",
    "category": "STATE",
    "subtype": "PhysiologicalState",
    "moduleId": "M05",
    "description": "Iron released from dying cells into extracellular space",
    "mechanism": "Cell death releases stored iron from ferritin and iron-containing proteins. Propagates damage to neighboring cells via labile iron.",
    "roles": [
      "FEEDBACK_NODE"
    ]
  },
  {
    "id": "abeta_production",
    "label": "Aβ Production",
    "category": "PROCESS",
    "subtype": "BiologicalProcess",
    "moduleId": "M06",
    "description": "Normal amyloid-beta production rate via APP processing",
    "mechanism": "SILK study (Mawuenyega 2010): Aβ production rates are NORMAL in sporadic AD. Late-onset AD is a clearance disease, not overproduction.",
    "pmid": "21148344",
    "notes": "CRITICAL: production is normal, clearance is impaired"
  },
  {
    "id": "abeta_clearance",
    "label": "Aβ Clearance",
    "category": "PROCESS",
    "subtype": "BiologicalProcess",
    "moduleId": "M06",
    "description": "Combined clearance of Aβ via BBB transport, glymphatic flow, enzymatic degradation, and microglial phagocytosis",
    "mechanism": "Multiple redundant systems: LRP1 BBB efflux, glymphatic drainage, neprilysin/IDE/cathepsin degradation, microglial phagocytosis. Plaques form only when MULTIPLE systems fail.",
    "pmid": "21148344",
    "roles": [
      "THERAPEUTIC_TARGET",
      "LEVERAGE_POINT"
    ]
  },
  {
    "id": "abeta_aggregation",
    "label": "Aβ Aggregation",
    "category": "STATE",
    "subtype": "Aggregate",
    "moduleId": "M06",
    "description": "Amyloid-beta plaque formation due to clearance failure",
    "mechanism": "Aβ accumulates when clearance is 30% reduced (Mawuenyega 2010). Oligomers form first, then fibrils and plaques. Plaques trap iron and activate complement.",
    "roles": [
      "BIOMARKER"
    ]
  },
  {
    "id": "tau_aggregation",
    "label": "Tau Aggregation",
    "category": "STATE",
    "subtype": "Aggregate",
    "moduleId": "M06",
    "description": "Hyperphosphorylated tau neurofibrillary tangles",
    "mechanism": "Forms when autophagy-lysosome pathway fails. Better correlates with cognitive decline than Aβ.",
    "roles": [
      "BIOMARKER"
    ]
  },
  {
    "id": "alpha_synuclein",
    "label": "α-Synuclein",
    "category": "STATE",
    "subtype": "Aggregate",
    "moduleId": "M06",
    "description": "Alpha-synuclein aggregation - hallmark of Parkinson's and Lewy body dementia",
    "mechanism": "GBA deficiency causes α-synuclein accumulation. Lysosomal dysfunction is common upstream cause across AD and PD.",
    "roles": [
      "BIOMARKER"
    ]
  },
  {
    "id": "neprilysin_ide",
    "label": "Neprilysin / IDE",
    "category": "STOCK",
    "subtype": "Enzyme",
    "moduleId": "M06",
    "description": "Extracellular Aβ-degrading enzymes: neprilysin and insulin-degrading enzyme",
    "mechanism": "Degrade soluble Aβ monomers and oligomers. IDE is competed away by insulin (link to metabolic syndrome). Cannot clear fibrillar plaques.",
    "roles": [
      "THERAPEUTIC_TARGET"
    ]
  },
  {
    "id": "microglial_phagocytosis",
    "label": "Microglial Phagocytosis",
    "category": "PROCESS",
    "subtype": "BiologicalProcess",
    "moduleId": "M06",
    "description": "The ONLY mechanism capable of clearing deposited Aβ plaques",
    "mechanism": "Requires functional lysosomes for degradation and complement receptors (CR3, CR1) for recognition. Misdirected by chronic complement activation toward synapses instead of plaques.",
    "notes": "Only microglia can clear deposited plaques. Antibodies substitute for this function.",
    "roles": [
      "THERAPEUTIC_TARGET",
      "LEVERAGE_POINT"
    ]
  },
  {
    "id": "microglia_homeostatic",
    "label": "Homeostatic Microglia",
    "category": "STOCK",
    "subtype": "CellType",
    "moduleId": "M07",
    "description": "Surveilling microglia in healthy state - phagocytic and neuroprotective",
    "mechanism": "Express P2RY12, TMEM119, CX3CR1. Perform synaptic pruning, debris clearance, and neurotrophic support. Transition to DAM or LDAM under stress.",
    "references": {
      "cellType": "CL:0000129"
    }
  },
  {
    "id": "microglia_dam",
    "label": "DAM Microglia",
    "category": "STOCK",
    "subtype": "CellType",
    "moduleId": "M07",
    "description": "Disease-associated microglia - TREM2-dependent activated state",
    "mechanism": "Upregulate TREM2, TYROBP, LPL, CST7. Enhanced phagocytosis but also produce inflammatory cytokines. TREM2 variants block this transition.",
    "pmid": "28602351"
  },
  {
    "id": "microglia_ldam",
    "label": "LDAM Microglia",
    "category": "STOCK",
    "subtype": "CellType",
    "moduleId": "M07",
    "description": "Lipid-droplet-accumulating microglia - dysfunctional phagocytes",
    "mechanism": "Accumulate lipid droplets due to lysosomal failure. Cannot degrade phagocytosed material. Produce ROS and inflammatory cytokines. Age-associated.",
    "pmid": "31902528",
    "roles": [
      "FEEDBACK_NODE"
    ]
  },
  {
    "id": "astrocyte_reactive",
    "label": "Reactive Astrocyte (A1)",
    "category": "STOCK",
    "subtype": "CellType",
    "moduleId": "M07",
    "description": "Neurotoxic reactive astrocyte phenotype induced by activated microglia",
    "mechanism": "Induced by IL-1α, TNFα, and C1q from microglia (Liddelow 2017). Lose normal functions and become neurotoxic. Kill neurons and oligodendrocytes.",
    "pmid": "28099414"
  },
  {
    "id": "oligodendrocyte",
    "label": "Oligodendrocyte",
    "category": "STOCK",
    "subtype": "CellType",
    "moduleId": "M07",
    "description": "Myelin-producing glial cells dependent on lysosomal function",
    "mechanism": "Require GBA for lipid recycling and myelin maintenance. GBA deficiency causes demyelination. Killed by A1 astrocytes.",
    "references": {
      "cellType": "CL:0000128"
    }
  },
  {
    "id": "demyelination",
    "label": "Demyelination",
    "category": "STATE",
    "subtype": "PhysiologicalState",
    "moduleId": "M07",
    "description": "Loss of myelin sheaths causing white matter damage",
    "mechanism": "Caused by oligodendrocyte death (via A1 astrocytes) and GBA-dependent lipid recycling failure. Prominent in vascular dementia and MS."
  },
  {
    "id": "nlrp3_inflammasome",
    "label": "NLRP3 Inflammasome",
    "category": "PROCESS",
    "subtype": "SignalingPathway",
    "moduleId": "M07",
    "description": "Multi-protein complex that produces IL-1β and IL-18",
    "mechanism": "Activated by cathepsin release from damaged lysosomes, Aβ fibrils, and iron-mediated ROS. Amplifies neuroinflammation.",
    "roles": [
      "THERAPEUTIC_TARGET"
    ]
  },
  {
    "id": "sars_cov2",
    "label": "SARS-CoV-2",
    "category": "BOUNDARY",
    "subtype": "Virus",
    "moduleId": "M08",
    "description": "COVID-19 virus that targets pericytes via ACE2 and alkalinizes lysosomes via ORF3a",
    "mechanism": "Enters via ACE2 on pericytes. ORF3a protein inserts into lysosomal membrane and disrupts V-ATPase. Causes acute PLIG dysfunction."
  },
  {
    "id": "orf3a",
    "label": "ORF3a",
    "category": "STOCK",
    "subtype": "ProteinPool",
    "moduleId": "M08",
    "description": "SARS-CoV-2 viroporin that directly alkalinizes lysosomes",
    "mechanism": "Inserts into lysosomal membrane, forms ion channels that dissipate pH gradient. Blocks autophagosome-lysosome fusion. Persists in tissues post-acute infection.",
    "pmid": "33422265"
  },
  {
    "id": "viral_persistence",
    "label": "Viral Persistence",
    "category": "STATE",
    "subtype": "TemporalPhase",
    "moduleId": "M08",
    "description": "Persistent viral proteins or RNA in tissues post-acute infection",
    "mechanism": "ORF3a and spike protein fragments detected in brain, gut, and lymph nodes months post-infection. Causes ongoing lysosomal alkalinization."
  },
  {
    "id": "post_viral_syndrome",
    "label": "Post-Viral Syndrome",
    "category": "STATE",
    "subtype": "DiseaseStage",
    "moduleId": "M08",
    "description": "Long COVID and post-viral cognitive dysfunction",
    "mechanism": "PLIG framework explains post-viral neurodegeneration: pericyte damage (BBB leak), lysosomal alkalinization (ORF3a), iron maldistribution, and chronic microglial activation."
  },
  {
    "id": "herpes_viruses",
    "label": "Herpes Viruses (HSV/HHV)",
    "category": "BOUNDARY",
    "subtype": "Virus",
    "moduleId": "M08",
    "description": "HSV-1 and HHV-6 associated with AD risk",
    "mechanism": "Reactivate under immune stress. Trigger neuroinflammation and lysosomal dysfunction. Epidemiological association with AD risk."
  },
  {
    "id": "c1q",
    "label": "C1q",
    "category": "STOCK",
    "subtype": "ComplementFactor",
    "moduleId": "M09",
    "description": "Complement initiator that tags synapses and debris for elimination",
    "mechanism": "Binds exposed phosphatidylserine on stressed synapses. INITIATES complement cascade. In AD, chronically elevated, causing excessive synapse elimination.",
    "notes": "Blocking C1q (the initiator) may redirect microglia from synapse destruction to Aβ clearance",
    "roles": [
      "THERAPEUTIC_TARGET",
      "LEVERAGE_POINT"
    ]
  },
  {
    "id": "c3_c3a",
    "label": "C3 / C3a",
    "category": "STOCK",
    "subtype": "ComplementFactor",
    "moduleId": "M09",
    "description": "Central complement component and its activation fragment",
    "mechanism": "C3 cleavage produces C3a (anaphylatoxin) and C3b (opsonin). C3b tags targets for phagocytosis. C3a recruits microglia. Amplification loop: C3b recruits more C3.",
    "roles": [
      "FEEDBACK_NODE"
    ]
  },
  {
    "id": "complement_activation",
    "label": "Complement Activation",
    "category": "PROCESS",
    "subtype": "SignalingPathway",
    "moduleId": "M09",
    "description": "Full complement cascade from C1q through membrane attack complex",
    "mechanism": "C1q → C4/C2 → C3 → C5 → C5b-9 (MAC). In AD, chronic activation diverts microglia from Aβ clearance to synapse destruction.",
    "roles": [
      "THERAPEUTIC_TARGET"
    ]
  },
  {
    "id": "synapse_elimination",
    "label": "Synapse Elimination",
    "category": "STATE",
    "subtype": "ClinicalOutcome",
    "moduleId": "M09",
    "description": "Complement-mediated removal of synapses by microglia",
    "mechanism": "C1q tags stressed synapses, C3b opsonizes them, microglia phagocytose via CR3. Normal in development. Pathological in AD where it drives cognitive decline.",
    "pmid": "26816939",
    "notes": "Hong 2016: complement mediates early synapse loss in AD models"
  },
  {
    "id": "cognitive_decline",
    "label": "Cognitive Decline",
    "category": "STATE",
    "subtype": "ClinicalOutcome",
    "moduleId": "M09",
    "description": "Progressive loss of cognitive function",
    "mechanism": "Correlates more with synapse loss and tau pathology than with Aβ plaque burden. End result of multiple converging PLIG pathways."
  },
  {
    "id": "estrogen",
    "label": "Estrogen",
    "category": "STOCK",
    "subtype": "Hormone",
    "moduleId": "M10",
    "description": "Estradiol (E2) - neuroprotective hormone that supports lysosomal function",
    "mechanism": "Upregulates V-ATPase expression (maintains lysosomal pH). Supports pericyte survival. Anti-inflammatory. Loss at menopause accelerates PLIG decline.",
    "roles": [
      "LEVERAGE_POINT"
    ]
  },
  {
    "id": "hepcidin",
    "label": "Hepcidin",
    "category": "STOCK",
    "subtype": "Hormone",
    "moduleId": "M10",
    "description": "Master iron-regulatory hormone that controls ferroportin",
    "mechanism": "Binds ferroportin causing internalization and degradation. Elevated in inflammation (IL-6 drives hepcidin). Traps iron inside cells by removing the only export route.",
    "notes": "Hepcidin-ferroportin axis is central to iron maldistribution",
    "references": {
      "gene": "HGNC:15598"
    },
    "roles": [
      "THERAPEUTIC_TARGET",
      "LEVERAGE_POINT"
    ]
  },
  {
    "id": "menopause",
    "label": "Menopause",
    "category": "STATE",
    "subtype": "TemporalPhase",
    "moduleId": "M10",
    "description": "Estrogen decline at menopause accelerates PLIG dysfunction",
    "mechanism": "Loss of estrogen removes V-ATPase upregulation, pericyte protection, and anti-inflammatory effects. Explains 2:1 female:male AD ratio."
  },
  {
    "id": "pon1",
    "label": "PON1",
    "category": "STOCK",
    "subtype": "Enzyme",
    "moduleId": "M10",
    "description": "Paraoxonase-1 - antioxidant enzyme with sex-linked expression",
    "mechanism": "Protects lipids from oxidation. Higher activity in premenopausal women. Declines with menopause. Genetic variants affect activity levels.",
    "references": {
      "gene": "HGNC:9204"
    }
  },
  {
    "id": "gba_enzyme",
    "label": "GBA (Glucocerebrosidase)",
    "category": "STOCK",
    "subtype": "Enzyme",
    "moduleId": "M02",
    "description": "Lysosomal enzyme that cleaves glucosylceramide. pH-dependent.",
    "mechanism": "Requires lysosomal pH < 5.5 for activity. GBA mutations cause Gaucher disease and increase PD risk 5-10x. GBA deficiency impairs α-synuclein clearance and oligodendrocyte lipid recycling.",
    "pmid": "15549395",
    "references": {
      "gene": "HGNC:4177"
    },
    "roles": [
      "THERAPEUTIC_TARGET",
      "LEVERAGE_POINT"
    ]
  },
  {
    "id": "c381",
    "label": "C381",
    "category": "BOUNDARY",
    "subtype": "Activator",
    "moduleId": "THER",
    "description": "V-ATPase enhancer that restores lysosomal acidification",
    "mechanism": "Benzyl urea derivative. Brain-penetrant, oral. Restores lysosomal pH in early dysfunction. Cannot help already-damaged lysosomes.",
    "pmid": "35259016",
    "notes": "PROMISING for early-stage. Addresses master switch (pH).",
    "roles": [
      "THERAPEUTIC_TARGET"
    ]
  },
  {
    "id": "sulforaphane",
    "label": "Sulforaphane",
    "category": "BOUNDARY",
    "subtype": "Activator",
    "moduleId": "THER",
    "description": "TFEB activator via mild ROS signaling",
    "mechanism": "Induces mild ROS that activates TFEB via mTOR-INDEPENDENT pathway. Creates new lysosomes rather than repairing damaged ones.",
    "pmid": "24823361",
    "notes": "PROMISING - bypasses mTOR, creates NEW lysosomes",
    "roles": [
      "THERAPEUTIC_TARGET"
    ]
  },
  {
    "id": "ambroxol",
    "label": "Ambroxol",
    "category": "BOUNDARY",
    "subtype": "Activator",
    "moduleId": "THER",
    "description": "GBA chaperone that restores glucocerebrosidase activity",
    "mechanism": "pH-dependent chaperone: stabilizes GBA in ER at neutral pH, releases in acidic lysosome. Crosses BBB. In PD trials (phase 2).",
    "pmid": "27779100",
    "notes": "PROMISING for GBA-linked PD and AD",
    "roles": [
      "THERAPEUTIC_TARGET"
    ]
  },
  {
    "id": "fasudil",
    "label": "Fasudil",
    "category": "BOUNDARY",
    "subtype": "Activator",
    "moduleId": "THER",
    "description": "ROCK inhibitor enabling selective mitophagy/lysophagy",
    "mechanism": "Inhibits ROCK, de-represses PINK1-Parkin pathway. Enables selective clearance of damaged organelles (not bulk autophagy).",
    "pmid": "29782259",
    "notes": "PROMISING - targets damaged organelles selectively",
    "roles": [
      "THERAPEUTIC_TARGET"
    ]
  },
  {
    "id": "rock",
    "label": "ROCK",
    "category": "STOCK",
    "subtype": "ProteinPool",
    "moduleId": "THER",
    "description": "Rho-associated kinase that suppresses selective mitophagy",
    "mechanism": "Normally suppresses PINK1-Parkin pathway. Fasudil inhibition enables selective organelle clearance.",
    "references": {
      "gene": "HGNC:10251"
    },
    "roles": [
      "THERAPEUTIC_TARGET"
    ]
  },
  {
    "id": "pink1_parkin",
    "label": "PINK1-Parkin",
    "category": "STOCK",
    "subtype": "ProteinPool",
    "moduleId": "THER",
    "description": "Selective mitophagy/lysophagy pathway",
    "mechanism": "PINK1 accumulates on damaged organelles, recruits Parkin for ubiquitination and selective degradation. Clears damaged mitochondria AND lysosomes.",
    "references": {
      "gene": "HGNC:14581"
    },
    "roles": [
      "THERAPEUTIC_TARGET"
    ]
  },
  {
    "id": "iron_redistribution",
    "label": "Iron Redistribution",
    "category": "BOUNDARY",
    "subtype": "BiologicalProcess",
    "moduleId": "THER",
    "description": "Therapeutic strategy: move iron from toxic compartments to functional pools, rather than removing it",
    "mechanism": "The goal is not less iron but correctly distributed iron. Variants: (1) ferroportin upregulation to enhance export, (2) lysosomal pH restoration to release trapped iron, (3) chelation (removes all iron - does not work). Redistribution requires functioning export machinery.",
    "notes": "Umbrella concept. Chelation is a failed variant. Redistribution via ferroportin and pH restoration are the viable approaches.",
    "roles": [
      "THERAPEUTIC_TARGET"
    ]
  },
  {
    "id": "iron_chelation",
    "label": "Iron Chelation (Deferiprone)",
    "category": "BOUNDARY",
    "subtype": "Inhibitor",
    "moduleId": "THER",
    "description": "Systemic iron chelation - removes all iron non-selectively. Does NOT work.",
    "mechanism": "FAIRPARK-II trial (deferiprone in PD): WORSENED outcomes. Chelators remove functional iron that cells need while trapped iron in aggregates/lysosomes remains inaccessible to chelators.",
    "pmid": "37931283",
    "notes": "ANTI-TARGET: FAIRPARK-II showed deferiprone worsened PD outcomes. Chelation is the wrong approach - redistribution is needed.",
    "roles": [
      "ANTI_TARGET"
    ]
  },
  {
    "id": "ferroportin_upregulation",
    "label": "Ferroportin Upregulation",
    "category": "BOUNDARY",
    "subtype": "Activator",
    "moduleId": "THER",
    "description": "Enhancing cellular iron export via ferroportin as redistribution strategy",
    "mechanism": "Increase ferroportin surface expression or block hepcidin-mediated degradation. Allows cells to export excess iron safely rather than accumulating it. Anti-hepcidin antibodies or mini-hepcidins under investigation.",
    "notes": "Viable iron redistribution approach: enhance export rather than chelate.",
    "roles": [
      "THERAPEUTIC_TARGET"
    ]
  },
  {
    "id": "anx005",
    "label": "ANX005 (Anti-C1q)",
    "category": "BOUNDARY",
    "subtype": "Inhibitor",
    "moduleId": "THER",
    "description": "Anti-C1q antibody that blocks complement initiation",
    "mechanism": "Blocks C1q, the INITIATING step of complement. May redirect microglia from synapse destruction to productive Aβ phagocytosis. Showed disease stabilization in Huntington's and promising NfL in ALS.",
    "notes": "PROMISING: blocks complement at initiation. Ravulizumab (C5 inhibitor) failed in ALS - must block upstream.",
    "roles": [
      "THERAPEUTIC_TARGET"
    ]
  },
  {
    "id": "ferroptosis_inhibitors",
    "label": "Ferroptosis Inhibitors",
    "category": "BOUNDARY",
    "subtype": "Inhibitor",
    "moduleId": "THER",
    "description": "Lipid peroxidation inhibitors and GPX4 activators",
    "mechanism": "Liproxstatin-1, ferrostatin-1, vitamin E analogs. Interrupt iron-ROS-lipid peroxidation cascade. Symptomatic relief but do not address upstream iron maldistribution.",
    "roles": [
      "THERAPEUTIC_TARGET"
    ]
  },
  {
    "id": "dgat_inhibitors",
    "label": "DGAT Inhibitors",
    "category": "BOUNDARY",
    "subtype": "Inhibitor",
    "moduleId": "THER",
    "description": "Block lipid droplet formation in microglia to prevent LDAM phenotype",
    "mechanism": "Inhibit DGAT1/2 to prevent triglyceride synthesis and lipid droplet accumulation. May restore microglial phagocytic function.",
    "notes": "Experimental - targets LDAM microglia",
    "roles": [
      "THERAPEUTIC_TARGET"
    ]
  },
  {
    "id": "ldn",
    "label": "Low-Dose Naltrexone",
    "category": "BOUNDARY",
    "subtype": "Inhibitor",
    "moduleId": "THER",
    "description": "Low-dose naltrexone as microglial modulator",
    "mechanism": "At low doses (1-5mg), modulates TLR4 on microglia, reducing inflammatory activation without immunosuppression. Inexpensive, well-tolerated.",
    "notes": "Generic, inexpensive. Modulates rather than suppresses.",
    "roles": [
      "THERAPEUTIC_TARGET"
    ]
  },
  {
    "id": "rapamycin",
    "label": "Rapamycin",
    "category": "BOUNDARY",
    "subtype": "Inhibitor",
    "moduleId": "THER",
    "description": "mTOR inhibitor - context-dependent effects",
    "mechanism": "Inhibits mTOR, increasing autophagy flux. In EARLY disease (functional lysosomes): may help clear cargo. In LATE disease (damaged lysosomes): pushes cargo into broken lysosomes, worsening accumulation.",
    "notes": "NUANCED: Tier 2 per PLIG. Context-dependent - helpful early, potentially harmful late.",
    "roles": [
      "THERAPEUTIC_TARGET"
    ]
  },
  {
    "id": "sleep_optimization",
    "label": "Sleep Optimization",
    "category": "BOUNDARY",
    "subtype": "ProtectiveFactor",
    "moduleId": "THER",
    "description": "Improving sleep quality to enhance glymphatic clearance",
    "mechanism": "Glymphatic clearance increases 60% during deep sleep. Melatonin restores AQP4 polarization. Sleep position (lateral) enhances drainage.",
    "pmid": "24136970",
    "notes": "Lifestyle intervention with strong mechanistic basis",
    "roles": [
      "THERAPEUTIC_TARGET"
    ]
  },
  {
    "id": "ros_signal",
    "label": "ROS Signal (Mild)",
    "category": "STATE",
    "subtype": "MetabolicState",
    "moduleId": "THER",
    "description": "Mild reactive oxygen species as signaling molecules",
    "mechanism": "Low-level ROS from sulforaphane activates TFEB nuclear translocation without causing oxidative damage. Hormetic stress response."
  }
];

export const allEdges: MechanisticEdge[] = [
  {
    "id": "E01.001",
    "source": "aging",
    "target": "escrt_repair",
    "relation": "decreases",
    "moduleId": "M02",
    "causalConfidence": "L4",
    "keyInsight": "ESCRT efficiency declines with age - key translational factor",
    "evidence": {
      "pmid": "32709779",
      "methodType": "observational"
    }
  },
  {
    "id": "E01.002",
    "source": "aging",
    "target": "lysosomal_membrane_integrity",
    "relation": "decreases",
    "moduleId": "M02",
    "causalConfidence": "L4",
    "keyInsight": "Aging weakens lysosomal membranes",
    "evidence": {
      "methodType": "observational"
    }
  },
  {
    "id": "E01.003",
    "source": "apoe4",
    "target": "lysosomal_dysfunction",
    "relation": "increases",
    "moduleId": "M02",
    "causalConfidence": "L3",
    "keyInsight": "APOE4 impairs lysosomal lipid handling",
    "evidence": {
      "methodType": "knockout"
    }
  },
  {
    "id": "E01.004",
    "source": "chronic_inflammation",
    "target": "lmp",
    "relation": "increases",
    "moduleId": "M02",
    "causalConfidence": "L4",
    "keyInsight": "Inflammatory cytokines damage lysosomal membranes",
    "evidence": {
      "methodType": "in_vitro"
    }
  },
  {
    "id": "E01.005",
    "source": "apoe4",
    "target": "pericyte",
    "relation": "decreases",
    "moduleId": "M04",
    "causalConfidence": "L3",
    "keyInsight": "APOE4 accelerates pericyte death, BBB dysfunction",
    "notes": "INTEGRITY NOTE: Some APOE4-pericyte evidence from Zlokovic lab. Independent support from Halliday 2016 (Acta Neuropathol) and human imaging studies.",
    "evidence": {
      "methodType": "cohort"
    }
  },
  {
    "id": "E01.006",
    "source": "sleep_disruption",
    "target": "glymphatic_clearance",
    "relation": "decreases",
    "moduleId": "M04",
    "causalConfidence": "L3",
    "keyInsight": "Sleep disruption reduces glymphatic Aβ clearance by up to 60%",
    "evidence": {
      "pmid": "24136970",
      "methodType": "intervention_animal"
    }
  },
  {
    "id": "E01.007",
    "source": "traumatic_brain_injury",
    "target": "bbb",
    "relation": "disrupts",
    "moduleId": "M04",
    "causalConfidence": "L3",
    "keyInsight": "TBI causes acute BBB disruption and pericyte loss",
    "evidence": {
      "methodType": "cohort"
    }
  },
  {
    "id": "E01.008",
    "source": "traumatic_brain_injury",
    "target": "labile_iron_pool",
    "relation": "increases",
    "moduleId": "M05",
    "causalConfidence": "L4",
    "keyInsight": "TBI microhemorrhages deposit iron in brain tissue",
    "evidence": {
      "methodType": "observational"
    }
  },
  {
    "id": "E01.009",
    "source": "metabolic_syndrome",
    "target": "pericyte",
    "relation": "decreases",
    "moduleId": "M04",
    "causalConfidence": "L3",
    "keyInsight": "Hyperglycemia damages pericytes (same mechanism as diabetic retinopathy)",
    "notes": "Pericyte damage from hyperglycemia is well-established in retinal research (Hammes 2002) independent of Zlokovic lab.",
    "evidence": {
      "methodType": "cohort"
    }
  },
  {
    "id": "E01.010",
    "source": "metabolic_syndrome",
    "target": "neprilysin_ide",
    "relation": "decreases",
    "moduleId": "M06",
    "causalConfidence": "L4",
    "keyInsight": "Insulin competes with Aβ for IDE binding",
    "evidence": {
      "methodType": "in_vitro"
    }
  },
  {
    "id": "E01.011",
    "source": "trem2_variant",
    "target": "microglia_dam",
    "relation": "decreases",
    "moduleId": "M07",
    "causalConfidence": "L3",
    "keyInsight": "TREM2 variants block transition to disease-associated microglia",
    "evidence": {
      "methodType": "knockout"
    }
  },
  {
    "id": "E01.012",
    "source": "aging",
    "target": "glymphatic_clearance",
    "relation": "decreases",
    "moduleId": "M04",
    "causalConfidence": "L4",
    "keyInsight": "Glymphatic function declines ~40% with aging",
    "evidence": {
      "methodType": "observational"
    }
  },
  {
    "id": "E02.001",
    "source": "v_atpase",
    "target": "lysosomal_ph",
    "relation": "decreases",
    "moduleId": "M02",
    "causalConfidence": "L3",
    "mechanismDescription": "V-ATPase pumps protons to maintain acidic pH. More V-ATPase = lower (more acidic) pH.",
    "keyInsight": "V-ATPase is the master switch for lysosomal function",
    "evidence": {
      "pmid": "35259016",
      "methodType": "knockout"
    }
  },
  {
    "id": "E02.002",
    "source": "lysosomal_ph",
    "target": "lysosomal_dysfunction",
    "relation": "increases",
    "moduleId": "M02",
    "causalConfidence": "L3",
    "mechanismDescription": "Elevated (alkaline) pH inactivates lysosomal enzymes",
    "keyInsight": "Elevated pH = enzyme dysfunction (REVERSIBLE)",
    "evidence": {
      "methodType": "in_vitro"
    }
  },
  {
    "id": "E02.003",
    "source": "lysosomal_ph",
    "target": "cathepsin_activity",
    "relation": "decreases",
    "moduleId": "M02",
    "causalConfidence": "L3",
    "mechanismDescription": "Cathepsins require pH < 5 for activity. Alkalinization inactivates them.",
    "keyInsight": "pH elevation → loss of Aβ/tau degradation capacity"
  },
  {
    "id": "E02.004",
    "source": "lysosomal_ph",
    "target": "gba_enzyme",
    "relation": "decreases",
    "moduleId": "M02",
    "causalConfidence": "L3",
    "mechanismDescription": "GBA requires pH < 5.5 for activity. Alkalinization inactivates it.",
    "keyInsight": "pH elevation → GBA failure → α-synuclein and lipid accumulation",
    "evidence": {
      "pmid": "15549395"
    }
  },
  {
    "id": "E02.005",
    "source": "lysosomal_ph",
    "target": "iron_trapped_lysosomes",
    "relation": "increases",
    "moduleId": "M05",
    "causalConfidence": "L4",
    "mechanismDescription": "Alkalinized lysosomes cannot reduce Fe³⁺ to Fe²⁺ for DMT1 export. Iron accumulates and undergoes Fenton chemistry.",
    "keyInsight": "LYSOSOMAL FENTON LOOP: pH up → iron trapped → Fenton → LMP → more pH disruption"
  },
  {
    "id": "E02.006",
    "source": "lysosomal_membrane_integrity",
    "target": "lmp",
    "relation": "decreases",
    "moduleId": "M02",
    "causalConfidence": "L3",
    "mechanismDescription": "Intact membrane prevents permeabilization",
    "keyInsight": "Membrane health prevents LMP"
  },
  {
    "id": "E02.007",
    "source": "lmp",
    "target": "lysosomal_damage",
    "relation": "directlyIncreases",
    "moduleId": "M02",
    "causalConfidence": "L3",
    "mechanismDescription": "Membrane breach causes structural damage",
    "keyInsight": "LMP = irreversible damage (key distinction from dysfunction)",
    "evidence": {
      "pmid": "29253550",
      "methodType": "in_vitro"
    }
  },
  {
    "id": "E02.008",
    "source": "lysosomal_damage",
    "target": "escrt_repair",
    "relation": "increases",
    "moduleId": "M02",
    "causalConfidence": "L3",
    "mechanismDescription": "Damage triggers ESCRT recruitment attempt",
    "keyInsight": "ESCRT recruited to repair but fails in aged humans",
    "evidence": {
      "pmid": "32709779",
      "methodType": "in_vitro"
    }
  },
  {
    "id": "E02.009",
    "source": "escrt_repair",
    "target": "lysosomal_damage",
    "relation": "decreases",
    "moduleId": "M02",
    "causalConfidence": "L3",
    "mechanismDescription": "Successful ESCRT repair seals membrane",
    "keyInsight": "Successful in young animals, rare in aged humans",
    "evidence": {
      "pmid": "32709779"
    }
  },
  {
    "id": "E02.010",
    "source": "lysosomal_damage",
    "target": "cathepsin_release",
    "relation": "increases",
    "moduleId": "M02",
    "causalConfidence": "L2",
    "mechanismDescription": "Failed repair leads to cathepsin leakage into cytosol",
    "keyInsight": "Cathepsin release = death cascade initiation",
    "evidence": {
      "pmid": "29253550"
    }
  },
  {
    "id": "E02.011",
    "source": "cathepsin_release",
    "target": "cell_death",
    "relation": "increases",
    "moduleId": "M02",
    "causalConfidence": "L2",
    "mechanismDescription": "Cytosolic cathepsins trigger apoptosis",
    "keyInsight": "Lysosomal cell death pathway",
    "evidence": {
      "methodType": "in_vitro"
    }
  },
  {
    "id": "E02.012",
    "source": "cathepsin_release",
    "target": "nlrp3_inflammasome",
    "relation": "increases",
    "moduleId": "M07",
    "causalConfidence": "L3",
    "mechanismDescription": "Cytosolic cathepsin B activates NLRP3",
    "keyInsight": "Lysosomal damage → inflammasome → IL-1β amplification"
  },
  {
    "id": "E02.013",
    "source": "tfeb",
    "target": "lysosomal_biogenesis",
    "relation": "increases",
    "moduleId": "M02",
    "causalConfidence": "L3",
    "mechanismDescription": "TFEB activates CLEAR gene network",
    "keyInsight": "TFEB = master regulator of lysosome creation",
    "evidence": {
      "pmid": "21979375",
      "methodType": "knockout"
    }
  },
  {
    "id": "E02.014",
    "source": "lysosomal_biogenesis",
    "target": "lysosome",
    "relation": "increases",
    "moduleId": "M02",
    "causalConfidence": "L3",
    "keyInsight": "Creates new functional lysosomes to replace damaged ones"
  },
  {
    "id": "E02.015",
    "source": "lipofuscin",
    "target": "iron_trapped_lysosomes",
    "relation": "increases",
    "moduleId": "M05",
    "causalConfidence": "L4",
    "mechanismDescription": "Lipofuscin traps iron and catalyzes ROS within lysosomes",
    "keyInsight": "Lipofuscin is an iron sink that generates ongoing oxidative damage"
  },
  {
    "id": "E02.016",
    "source": "lipofuscin",
    "target": "lysosome",
    "relation": "decreases",
    "moduleId": "M02",
    "causalConfidence": "L4",
    "mechanismDescription": "Lipofuscin occupies lysosomal volume, reducing degradation capacity",
    "keyInsight": "Indigestible waste reduces lysosomal capacity with age"
  },
  {
    "id": "E02.017",
    "source": "lmp",
    "target": "labile_iron_pool",
    "relation": "increases",
    "moduleId": "M05",
    "causalConfidence": "L3",
    "mechanismDescription": "Lysosomal membrane breach releases stored iron into cytosol",
    "keyInsight": "LMP releases lysosomal iron into cytosol as labile Fe²⁺"
  },
  {
    "id": "E03.001",
    "source": "autophagy_flux",
    "target": "autophagosome",
    "relation": "increases",
    "moduleId": "M03",
    "causalConfidence": "L3",
    "keyInsight": "More flux = more autophagosomes formed"
  },
  {
    "id": "E03.002",
    "source": "autophagosome",
    "target": "lysosome",
    "relation": "requires",
    "moduleId": "M03",
    "causalConfidence": "L3",
    "mechanismDescription": "Autophagosomes fuse with lysosomes for degradation",
    "keyInsight": "Autolysosome formation requires functional lysosomes"
  },
  {
    "id": "E03.003",
    "source": "lysosomal_damage",
    "target": "cargo_accumulation",
    "relation": "increases",
    "moduleId": "M03",
    "causalConfidence": "L3",
    "mechanismDescription": "Damaged lysosomes cannot degrade delivered cargo",
    "keyInsight": "CRITICAL: Why autophagy enhancers fail in human AD",
    "evidence": {
      "pmid": "16286508",
      "methodType": "observational"
    }
  },
  {
    "id": "E03.004",
    "source": "mtor",
    "target": "autophagy_flux",
    "relation": "decreases",
    "moduleId": "M03",
    "causalConfidence": "L1",
    "mechanismDescription": "mTOR inhibits autophagy initiation",
    "keyInsight": "mTOR = autophagy brake"
  },
  {
    "id": "E03.005",
    "source": "mtor",
    "target": "tfeb",
    "relation": "decreases",
    "moduleId": "M03",
    "causalConfidence": "L2",
    "mechanismDescription": "mTOR phosphorylates TFEB, sequestering it in cytosol",
    "keyInsight": "Active mTOR = TFEB trapped, no new lysosomes"
  },
  {
    "id": "E03.006",
    "source": "lysosomal_dysfunction",
    "target": "abeta_clearance",
    "relation": "decreases",
    "moduleId": "M06",
    "causalConfidence": "L3",
    "keyInsight": "Dysfunctional lysosomes cannot clear Aβ - the core clearance failure"
  },
  {
    "id": "E03.007",
    "source": "lysophagy",
    "target": "lysosomal_damage",
    "relation": "decreases",
    "moduleId": "M03",
    "causalConfidence": "L3",
    "mechanismDescription": "Lysophagy clears damaged lysosomes",
    "keyInsight": "Catch-22: lysophagy requires functional lysosomes to degrade the damaged ones"
  },
  {
    "id": "E04.001",
    "source": "pericyte",
    "target": "bbb",
    "relation": "protects",
    "moduleId": "M04",
    "causalConfidence": "L2",
    "mechanismDescription": "Pericytes maintain tight junctions and regulate BBB permeability",
    "keyInsight": "Pericyte loss → BBB breakdown → uncontrolled brain entry",
    "notes": "INTEGRITY NOTE: Zlokovic lab mouse studies (Sagare 2013, Montagne 2018) retracted. L2 confidence retained based on independent evidence: Armulik 2010 (Nature), Daneman 2010 (Nature), Bell 2010 (Neuron). Pericyte-BBB relationship is well-established beyond Zlokovic lab.",
    "evidence": {
      "methodType": "knockout"
    }
  },
  {
    "id": "E04.002",
    "source": "bbb",
    "target": "bbb_iron_entry",
    "relation": "decreases",
    "moduleId": "M04",
    "causalConfidence": "L3",
    "mechanismDescription": "Intact BBB limits iron entry to regulated transferrin receptor pathway",
    "keyInsight": "BBB breakdown = unregulated iron flooding into brain"
  },
  {
    "id": "E04.003",
    "source": "bbb_iron_entry",
    "target": "labile_iron_pool",
    "relation": "increases",
    "moduleId": "M05",
    "causalConfidence": "L4",
    "mechanismDescription": "Unregulated iron crosses broken BBB",
    "keyInsight": "BBB breach contributes to brain iron maldistribution"
  },
  {
    "id": "E04.004",
    "source": "astrocyte_endfeet",
    "target": "aqp4",
    "relation": "increases",
    "moduleId": "M04",
    "causalConfidence": "L3",
    "mechanismDescription": "Astrocyte endfeet express and polarize AQP4 channels",
    "keyInsight": "AQP4 polarization at endfeet required for glymphatic flow"
  },
  {
    "id": "E04.005",
    "source": "aqp4",
    "target": "glymphatic_clearance",
    "relation": "increases",
    "moduleId": "M04",
    "causalConfidence": "L3",
    "mechanismDescription": "AQP4 enables perivascular CSF-ISF exchange",
    "keyInsight": "AQP4 depolarization (lost from endfeet) reduces clearance",
    "evidence": {
      "pmid": "24136970"
    }
  },
  {
    "id": "E04.006",
    "source": "glymphatic_clearance",
    "target": "abeta_clearance",
    "relation": "increases",
    "moduleId": "M06",
    "causalConfidence": "L3",
    "mechanismDescription": "Glymphatic flow clears soluble Aβ from parenchyma to CSF",
    "keyInsight": "One of multiple redundant Aβ clearance systems"
  },
  {
    "id": "E04.007",
    "source": "lrp1",
    "target": "abeta_clearance",
    "relation": "increases",
    "moduleId": "M06",
    "causalConfidence": "L2",
    "mechanismDescription": "LRP1 mediates Aβ transcytosis across BBB (PACSIN2 route)",
    "keyInsight": "Primary route for Aβ efflux. In AD, LRP1 trafficked to lysosomes and degraded.",
    "evidence": {
      "pmid": "26619118",
      "methodType": "knockout"
    }
  },
  {
    "id": "E04.008",
    "source": "lysosomal_dysfunction",
    "target": "lrp1",
    "relation": "decreases",
    "moduleId": "M04",
    "causalConfidence": "L4",
    "mechanismDescription": "In AD, LRP1 trafficking shifts from PACSIN2 (efflux) to Rab5 (lysosomal degradation)",
    "keyInsight": "Lysosomal dysfunction causes LRP1 to be degraded instead of recycled",
    "evidence": {
      "pmid": "41052971"
    }
  },
  {
    "id": "E04.009",
    "source": "pericyte",
    "target": "ferroportin",
    "relation": "increases",
    "moduleId": "M05",
    "causalConfidence": "L4",
    "mechanismDescription": "Pericytes support endothelial ferroportin expression for iron export across BBB",
    "keyInsight": "Pericyte loss impairs brain iron export via ferroportin at BBB"
  },
  {
    "id": "E04.010",
    "source": "ace2",
    "target": "pericyte",
    "relation": "protects",
    "moduleId": "M04",
    "causalConfidence": "L3",
    "mechanismDescription": "ACE2 enzyme activity (angiotensin balance) supports pericyte survival",
    "keyInsight": "SARS-CoV-2 binding to ACE2 disrupts this protective function"
  },
  {
    "id": "E05.001",
    "source": "labile_iron_pool",
    "target": "fenton_reaction",
    "relation": "catalyzes",
    "moduleId": "M05",
    "causalConfidence": "L2",
    "mechanismDescription": "Fe²⁺ + H₂O₂ → Fe³⁺ + OH• + OH⁻",
    "keyInsight": "Free iron + hydrogen peroxide = hydroxyl radicals (most destructive ROS)"
  },
  {
    "id": "E05.002",
    "source": "fenton_reaction",
    "target": "lipid_peroxidation",
    "relation": "increases",
    "moduleId": "M05",
    "causalConfidence": "L2",
    "mechanismDescription": "Hydroxyl radicals oxidize membrane PUFAs",
    "keyInsight": "Fenton-generated radicals damage membranes"
  },
  {
    "id": "E05.003",
    "source": "lipid_peroxidation",
    "target": "ferroptosis",
    "relation": "increases",
    "moduleId": "M05",
    "causalConfidence": "L3",
    "keyInsight": "Accumulated lipid peroxides trigger ferroptotic cell death"
  },
  {
    "id": "E05.004",
    "source": "gpx4",
    "target": "lipid_peroxidation",
    "relation": "decreases",
    "moduleId": "M05",
    "causalConfidence": "L2",
    "mechanismDescription": "GPX4 reduces lipid peroxides to alcohols",
    "keyInsight": "GPX4 = primary ferroptosis brake"
  },
  {
    "id": "E05.005",
    "source": "ferroptosis",
    "target": "cell_death",
    "relation": "increases",
    "moduleId": "M05",
    "causalConfidence": "L3",
    "keyInsight": "Ferroptosis is a major cell death pathway in neurodegeneration"
  },
  {
    "id": "E05.006",
    "source": "cell_death",
    "target": "iron_release",
    "relation": "increases",
    "moduleId": "M05",
    "causalConfidence": "L3",
    "keyInsight": "FEEDBACK: dying cells release stored iron",
    "notes": "Key feed-forward loop"
  },
  {
    "id": "E05.007",
    "source": "iron_release",
    "target": "labile_iron_pool",
    "relation": "increases",
    "moduleId": "M05",
    "causalConfidence": "L3",
    "keyInsight": "Released iron enters labile pool, propagating damage to neighbors"
  },
  {
    "id": "E05.008",
    "source": "iron_trapped_lysosomes",
    "target": "fenton_reaction",
    "relation": "increases",
    "moduleId": "M05",
    "causalConfidence": "L4",
    "mechanismDescription": "Iron in alkalinized lysosomes undergoes Fenton chemistry, damaging lysosomal membrane from within",
    "keyInsight": "LYSOSOMAL FENTON LOOP: internal Fenton → LMP → more iron release"
  },
  {
    "id": "E05.009",
    "source": "fenton_reaction",
    "target": "lysosomal_membrane_integrity",
    "relation": "decreases",
    "moduleId": "M02",
    "causalConfidence": "L3",
    "mechanismDescription": "Hydroxyl radicals from Fenton reaction damage lysosomal membranes",
    "keyInsight": "Iron-mediated damage to lysosomes creates a vicious cycle"
  },
  {
    "id": "E05.010",
    "source": "abeta_aggregation",
    "target": "iron_trapped_aggregates",
    "relation": "traps",
    "moduleId": "M05",
    "causalConfidence": "L4",
    "mechanismDescription": "Aβ plaques bind and sequester iron",
    "keyInsight": "Aggregates become iron sinks, contributing to functional iron depletion"
  },
  {
    "id": "E05.011",
    "source": "ferroportin",
    "target": "labile_iron_pool",
    "relation": "decreases",
    "moduleId": "M05",
    "causalConfidence": "L3",
    "mechanismDescription": "Ferroportin exports Fe²⁺ from cells, reducing intracellular labile iron",
    "keyInsight": "Only known cellular iron exporter. Functional ferroportin = iron homeostasis.",
    "notes": "Central to iron redistribution strategy"
  },
  {
    "id": "E05.012",
    "source": "lipid_peroxidation",
    "target": "lysosomal_membrane_integrity",
    "relation": "decreases",
    "moduleId": "M02",
    "causalConfidence": "L3",
    "mechanismDescription": "Peroxidized lipids weaken lysosomal membrane",
    "keyInsight": "Iron damage feeds back to lysosomal damage"
  },
  {
    "id": "E06.001",
    "source": "abeta_clearance",
    "target": "abeta_aggregation",
    "relation": "decreases",
    "moduleId": "M06",
    "causalConfidence": "L2",
    "mechanismDescription": "30% clearance reduction is sufficient for Aβ accumulation (SILK study)",
    "keyInsight": "Clearance failure, NOT overproduction, drives sporadic AD",
    "evidence": {
      "pmid": "21148344"
    }
  },
  {
    "id": "E06.002",
    "source": "cargo_accumulation",
    "target": "tau_aggregation",
    "relation": "increases",
    "moduleId": "M06",
    "causalConfidence": "L3",
    "keyInsight": "Undegraded tau forms neurofibrillary tangles"
  },
  {
    "id": "E06.003",
    "source": "cargo_accumulation",
    "target": "abeta_aggregation",
    "relation": "increases",
    "moduleId": "M06",
    "causalConfidence": "L3",
    "keyInsight": "Undegraded intracellular Aβ seeds aggregation"
  },
  {
    "id": "E06.004",
    "source": "cathepsin_activity",
    "target": "abeta_clearance",
    "relation": "increases",
    "moduleId": "M06",
    "causalConfidence": "L3",
    "mechanismDescription": "Cathepsin B cleaves Aβ within lysosomes",
    "keyInsight": "Functional cathepsins degrade Aβ - requires acidic pH"
  },
  {
    "id": "E06.005",
    "source": "neprilysin_ide",
    "target": "abeta_clearance",
    "relation": "increases",
    "moduleId": "M06",
    "causalConfidence": "L3",
    "mechanismDescription": "Extracellular enzymes degrade soluble Aβ monomers/oligomers",
    "keyInsight": "Cannot clear fibrillar plaques - only soluble forms"
  },
  {
    "id": "E06.006",
    "source": "microglial_phagocytosis",
    "target": "abeta_clearance",
    "relation": "increases",
    "moduleId": "M06",
    "causalConfidence": "L2",
    "mechanismDescription": "Only mechanism that clears deposited Aβ plaques",
    "keyInsight": "Microglia are the ONLY plaque-clearing mechanism. Anti-Aβ antibodies substitute for this.",
    "notes": "Key PLIG insight: restore microglial function instead of antibody substitution"
  },
  {
    "id": "E06.007",
    "source": "gba_enzyme",
    "target": "alpha_synuclein",
    "relation": "decreases",
    "moduleId": "M06",
    "causalConfidence": "L2",
    "mechanismDescription": "GBA cleaves glucosylceramide, preventing α-synuclein accumulation",
    "keyInsight": "GBA deficiency → α-synuclein aggregation (PD link)",
    "evidence": {
      "pmid": "15549395",
      "methodType": "mendelian_randomization"
    }
  },
  {
    "id": "E06.008",
    "source": "abeta_production",
    "target": "abeta_aggregation",
    "relation": "increases",
    "moduleId": "M06",
    "causalConfidence": "L2",
    "mechanismDescription": "Normal production + impaired clearance = accumulation",
    "keyInsight": "Production is normal in sporadic AD. Only clearance is impaired.",
    "evidence": {
      "pmid": "21148344"
    }
  },
  {
    "id": "E07.001",
    "source": "lysosomal_dysfunction",
    "target": "microglia_ldam",
    "relation": "increases",
    "moduleId": "M07",
    "causalConfidence": "L3",
    "mechanismDescription": "Lysosomal failure causes lipid droplet accumulation in microglia",
    "keyInsight": "Dysfunctional lysosomes → LDAM phenotype → lost phagocytic capacity",
    "evidence": {
      "pmid": "31902528"
    }
  },
  {
    "id": "E07.002",
    "source": "microglia_ldam",
    "target": "microglial_phagocytosis",
    "relation": "decreases",
    "moduleId": "M06",
    "causalConfidence": "L3",
    "mechanismDescription": "Lipid-laden microglia cannot phagocytose effectively",
    "keyInsight": "LDAM microglia are dysfunctional phagocytes"
  },
  {
    "id": "E07.003",
    "source": "microglia_homeostatic",
    "target": "microglial_phagocytosis",
    "relation": "increases",
    "moduleId": "M06",
    "causalConfidence": "L3",
    "mechanismDescription": "Healthy microglia perform efficient phagocytosis",
    "keyInsight": "Homeostatic microglia maintain brain clearance"
  },
  {
    "id": "E07.004",
    "source": "microglia_dam",
    "target": "microglia_homeostatic",
    "relation": "decreases",
    "moduleId": "M07",
    "causalConfidence": "L3",
    "mechanismDescription": "DAM activation replaces homeostatic state",
    "keyInsight": "Disease activation trades surveillance for inflammatory response"
  },
  {
    "id": "E07.005",
    "source": "nlrp3_inflammasome",
    "target": "chronic_inflammation",
    "relation": "amplifies",
    "moduleId": "M07",
    "causalConfidence": "L3",
    "mechanismDescription": "NLRP3 produces IL-1β and IL-18, amplifying inflammation",
    "keyInsight": "Inflammasome creates feed-forward inflammatory loop"
  },
  {
    "id": "E07.006",
    "source": "nlrp3_inflammasome",
    "target": "astrocyte_reactive",
    "relation": "increases",
    "moduleId": "M07",
    "causalConfidence": "L3",
    "mechanismDescription": "IL-1α, TNFα, C1q from activated microglia induce A1 astrocytes (Liddelow 2017)",
    "keyInsight": "Activated microglia convert astrocytes to neurotoxic A1 phenotype",
    "evidence": {
      "pmid": "28099414"
    }
  },
  {
    "id": "E07.007",
    "source": "astrocyte_reactive",
    "target": "oligodendrocyte",
    "relation": "decreases",
    "moduleId": "M07",
    "causalConfidence": "L3",
    "mechanismDescription": "A1 astrocytes kill oligodendrocytes",
    "keyInsight": "Reactive astrocytes → oligodendrocyte death → demyelination",
    "evidence": {
      "pmid": "28099414"
    }
  },
  {
    "id": "E07.008",
    "source": "gba_enzyme",
    "target": "oligodendrocyte",
    "relation": "increases",
    "moduleId": "M07",
    "causalConfidence": "L3",
    "mechanismDescription": "GBA provides lipid recycling for myelin maintenance",
    "keyInsight": "GBA deficiency → failed myelin maintenance → demyelination"
  },
  {
    "id": "E07.009",
    "source": "oligodendrocyte",
    "target": "demyelination",
    "relation": "decreases",
    "moduleId": "M07",
    "causalConfidence": "L3",
    "mechanismDescription": "Healthy oligodendrocytes maintain myelin",
    "keyInsight": "Oligodendrocyte loss leads to white matter damage"
  },
  {
    "id": "E07.010",
    "source": "astrocyte_reactive",
    "target": "astrocyte_endfeet",
    "relation": "decreases",
    "moduleId": "M04",
    "causalConfidence": "L4",
    "mechanismDescription": "Reactive transformation disrupts endfeet polarization and AQP4 localization",
    "keyInsight": "A1 astrocytes lose endfeet function → glymphatic impairment"
  },
  {
    "id": "E08.001",
    "source": "sars_cov2",
    "target": "ace2",
    "relation": "binds",
    "moduleId": "M08",
    "causalConfidence": "L2",
    "mechanismDescription": "Spike protein binds ACE2 on pericytes",
    "keyInsight": "SARS-CoV-2 targets pericytes via ACE2",
    "evidence": {
      "methodType": "in_vitro"
    }
  },
  {
    "id": "E08.002",
    "source": "sars_cov2",
    "target": "pericyte",
    "relation": "decreases",
    "moduleId": "M08",
    "causalConfidence": "L3",
    "mechanismDescription": "Viral infection damages and kills pericytes",
    "keyInsight": "COVID → pericyte death → BBB breakdown",
    "evidence": {
      "methodType": "cohort"
    }
  },
  {
    "id": "E08.003",
    "source": "orf3a",
    "target": "v_atpase",
    "relation": "disrupts",
    "moduleId": "M08",
    "causalConfidence": "L3",
    "mechanismDescription": "ORF3a viroporin inserts into lysosomal membrane, dissipates pH gradient",
    "keyInsight": "ORF3a directly causes lysosomal alkalinization",
    "evidence": {
      "pmid": "33422265",
      "methodType": "in_vitro"
    }
  },
  {
    "id": "E08.004",
    "source": "orf3a",
    "target": "lysosomal_ph",
    "relation": "increases",
    "moduleId": "M08",
    "causalConfidence": "L3",
    "mechanismDescription": "ORF3a ion channels dissipate proton gradient",
    "keyInsight": "Viral alkalinization mimics age-related lysosomal dysfunction",
    "evidence": {
      "pmid": "33422265"
    }
  },
  {
    "id": "E08.005",
    "source": "viral_persistence",
    "target": "orf3a",
    "relation": "produces",
    "moduleId": "M08",
    "causalConfidence": "L4",
    "mechanismDescription": "Persistent viral proteins maintain ORF3a in tissues",
    "keyInsight": "Long COVID: ongoing lysosomal alkalinization from persistent ORF3a"
  },
  {
    "id": "E08.006",
    "source": "viral_persistence",
    "target": "post_viral_syndrome",
    "relation": "increases",
    "moduleId": "M08",
    "causalConfidence": "L4",
    "mechanismDescription": "Persistent viral antigens drive chronic inflammation and PLIG dysfunction",
    "keyInsight": "PLIG explains post-viral neurodegeneration: all four pillars affected"
  },
  {
    "id": "E08.007",
    "source": "herpes_viruses",
    "target": "chronic_inflammation",
    "relation": "increases",
    "moduleId": "M08",
    "causalConfidence": "L6",
    "mechanismDescription": "Herpesvirus reactivation triggers neuroinflammatory cascades",
    "keyInsight": "Epidemiological association between HSV-1/HHV-6 and AD risk",
    "evidence": {
      "methodType": "epidemiological"
    }
  },
  {
    "id": "E09.001",
    "source": "c1q",
    "target": "complement_activation",
    "relation": "increases",
    "moduleId": "M09",
    "causalConfidence": "L2",
    "mechanismDescription": "C1q initiates classical complement cascade",
    "keyInsight": "C1q is the INITIATING step. Block here, not downstream."
  },
  {
    "id": "E09.002",
    "source": "complement_activation",
    "target": "c3_c3a",
    "relation": "increases",
    "moduleId": "M09",
    "causalConfidence": "L2",
    "mechanismDescription": "Cascade produces C3b (opsonin) and C3a (anaphylatoxin)",
    "keyInsight": "C3b amplification loop: C3b recruits more C3 cleavage"
  },
  {
    "id": "E09.003",
    "source": "c1q",
    "target": "synapse_elimination",
    "relation": "increases",
    "moduleId": "M09",
    "causalConfidence": "L2",
    "mechanismDescription": "C1q tags stressed synapses for complement-mediated elimination by microglia",
    "keyInsight": "C1q on synapses → C3b → microglial phagocytosis via CR3",
    "evidence": {
      "pmid": "26816939"
    }
  },
  {
    "id": "E09.004",
    "source": "synapse_elimination",
    "target": "cognitive_decline",
    "relation": "increases",
    "moduleId": "M09",
    "causalConfidence": "L2",
    "mechanismDescription": "Synapse loss drives cognitive impairment",
    "keyInsight": "Synapse loss correlates with cognitive decline better than plaques"
  },
  {
    "id": "E09.005",
    "source": "complement_activation",
    "target": "microglial_phagocytosis",
    "relation": "decreases",
    "moduleId": "M09",
    "causalConfidence": "L3",
    "mechanismDescription": "Chronic complement activation misdirects microglia toward synapses instead of plaques",
    "keyInsight": "KEY PLIG INSIGHT: complement diverts microglia from Aβ clearance to synapse destruction",
    "notes": "C1q inhibition may redirect microglial resources toward plaque clearance"
  },
  {
    "id": "E09.006",
    "source": "abeta_aggregation",
    "target": "c1q",
    "relation": "increases",
    "moduleId": "M09",
    "causalConfidence": "L3",
    "mechanismDescription": "Aβ plaques activate complement by binding C1q",
    "keyInsight": "Plaques drive complement activation → synapse loss feedback loop"
  },
  {
    "id": "E09.007",
    "source": "c1q",
    "target": "astrocyte_reactive",
    "relation": "increases",
    "moduleId": "M09",
    "causalConfidence": "L2",
    "mechanismDescription": "C1q is one of three signals (with IL-1α and TNFα) that induce neurotoxic A1 astrocytes",
    "keyInsight": "C1q contributes to A1 astrocyte induction (Liddelow 2017)",
    "evidence": {
      "pmid": "28099414"
    }
  },
  {
    "id": "E10.001",
    "source": "estrogen",
    "target": "v_atpase",
    "relation": "increases",
    "moduleId": "M10",
    "causalConfidence": "L4",
    "mechanismDescription": "Estradiol upregulates V-ATPase subunit expression",
    "keyInsight": "Estrogen maintains lysosomal acidification - loss at menopause accelerates pH elevation"
  },
  {
    "id": "E10.002",
    "source": "estrogen",
    "target": "pericyte",
    "relation": "protects",
    "moduleId": "M10",
    "causalConfidence": "L4",
    "mechanismDescription": "Estrogen supports pericyte survival and BBB integrity",
    "keyInsight": "Post-menopausal BBB deterioration partly estrogen-dependent"
  },
  {
    "id": "E10.003",
    "source": "menopause",
    "target": "estrogen",
    "relation": "decreases",
    "moduleId": "M10",
    "causalConfidence": "L1",
    "mechanismDescription": "Ovarian estrogen production ceases at menopause",
    "keyInsight": "Menopause removes protective estrogen effects on all PLIG pillars"
  },
  {
    "id": "E10.004",
    "source": "hepcidin",
    "target": "ferroportin",
    "relation": "decreases",
    "moduleId": "M10",
    "causalConfidence": "L1",
    "mechanismDescription": "Hepcidin binds ferroportin causing internalization and degradation",
    "keyInsight": "Hepcidin blocks the ONLY iron export route. Chronic inflammation → high hepcidin → iron trapped in cells.",
    "notes": "Hepcidin-ferroportin axis: master regulator of iron distribution"
  },
  {
    "id": "E10.005",
    "source": "chronic_inflammation",
    "target": "hepcidin",
    "relation": "increases",
    "moduleId": "M10",
    "causalConfidence": "L2",
    "mechanismDescription": "IL-6 drives hepatic and local hepcidin production",
    "keyInsight": "Inflammation → hepcidin → ferroportin degradation → iron trapped in cells",
    "evidence": {
      "methodType": "cohort"
    }
  },
  {
    "id": "E10.006",
    "source": "pon1",
    "target": "lipid_peroxidation",
    "relation": "decreases",
    "moduleId": "M10",
    "causalConfidence": "L4",
    "mechanismDescription": "PON1 protects lipids from oxidation",
    "keyInsight": "PON1 declines with menopause, contributing to increased lipid peroxidation"
  },
  {
    "id": "E10.007",
    "source": "menopause",
    "target": "pon1",
    "relation": "decreases",
    "moduleId": "M10",
    "causalConfidence": "L4",
    "mechanismDescription": "PON1 activity declines post-menopause",
    "keyInsight": "Sex-linked antioxidant decline"
  },
  {
    "id": "ETHER.001",
    "source": "c381",
    "target": "v_atpase",
    "relation": "increases",
    "moduleId": "THER",
    "causalConfidence": "L3",
    "mechanismDescription": "C381 enhances V-ATPase activity",
    "keyInsight": "RESTORES existing lysosome function by fixing pH",
    "evidence": {
      "pmid": "35259016",
      "methodType": "intervention_animal"
    }
  },
  {
    "id": "ETHER.002",
    "source": "sulforaphane",
    "target": "ros_signal",
    "relation": "increases",
    "moduleId": "THER",
    "causalConfidence": "L3",
    "mechanismDescription": "Sulforaphane induces mild hormetic ROS",
    "keyInsight": "Mild ROS = signaling, not damage",
    "evidence": {
      "pmid": "24823361",
      "methodType": "in_vitro"
    }
  },
  {
    "id": "ETHER.003",
    "source": "ros_signal",
    "target": "tfeb",
    "relation": "increases",
    "moduleId": "THER",
    "causalConfidence": "L3",
    "mechanismDescription": "ROS triggers TFEB nuclear translocation independently of mTOR",
    "keyInsight": "mTOR-INDEPENDENT TFEB activation pathway",
    "evidence": {
      "pmid": "24823361",
      "methodType": "in_vitro"
    }
  },
  {
    "id": "ETHER.004",
    "source": "ambroxol",
    "target": "gba_enzyme",
    "relation": "increases",
    "moduleId": "THER",
    "causalConfidence": "L3",
    "mechanismDescription": "Ambroxol acts as pharmacological chaperone for GBA",
    "keyInsight": "Stabilizes GBA in ER, releases in acidic lysosome. Crosses BBB.",
    "evidence": {
      "pmid": "27779100",
      "methodType": "RCT"
    }
  },
  {
    "id": "ETHER.005",
    "source": "fasudil",
    "target": "rock",
    "relation": "decreases",
    "moduleId": "THER",
    "causalConfidence": "L2",
    "mechanismDescription": "Fasudil directly inhibits ROCK kinase",
    "keyInsight": "Direct kinase inhibition",
    "evidence": {
      "pmid": "29782259",
      "methodType": "RCT"
    }
  },
  {
    "id": "ETHER.006",
    "source": "rock",
    "target": "pink1_parkin",
    "relation": "decreases",
    "moduleId": "THER",
    "causalConfidence": "L4",
    "mechanismDescription": "ROCK normally suppresses PINK1-Parkin pathway",
    "keyInsight": "ROCK inhibition enables selective mitophagy/lysophagy"
  },
  {
    "id": "ETHER.007",
    "source": "pink1_parkin",
    "target": "lysosomal_damage",
    "relation": "decreases",
    "moduleId": "THER",
    "causalConfidence": "L4",
    "mechanismDescription": "PINK1-Parkin clears damaged organelles selectively",
    "keyInsight": "Selective clearance of damaged lysosomes (lysophagy)"
  },
  {
    "id": "ETHER.008",
    "source": "iron_redistribution",
    "target": "labile_iron_pool",
    "relation": "decreases",
    "moduleId": "THER",
    "causalConfidence": "L4",
    "mechanismDescription": "Goal: move iron from toxic labile pools back to functional compartments or export it",
    "keyInsight": "Redistribution (not removal) is the correct iron strategy",
    "notes": "Umbrella concept: viable approaches are ferroportin upregulation and lysosomal pH restoration"
  },
  {
    "id": "ETHER.009",
    "source": "iron_chelation",
    "target": "functional_iron",
    "relation": "decreases",
    "moduleId": "THER",
    "causalConfidence": "L1",
    "mechanismDescription": "Chelators remove all iron non-selectively including functional iron",
    "keyInsight": "FAILED: FAIRPARK-II deferiprone worsened PD outcomes",
    "notes": "ANTI-TARGET: chelation removes functional iron while trapped iron remains inaccessible",
    "evidence": {
      "pmid": "37931283",
      "methodType": "clinical_trial_failure"
    }
  },
  {
    "id": "ETHER.010",
    "source": "iron_chelation",
    "target": "labile_iron_pool",
    "relation": "decreases",
    "moduleId": "THER",
    "causalConfidence": "L1",
    "mechanismDescription": "Chelators bind labile iron but also deplete functional pools",
    "keyInsight": "Chelation reduces labile iron but at cost of functional iron depletion",
    "evidence": {
      "pmid": "37931283",
      "methodType": "clinical_trial_failure"
    }
  },
  {
    "id": "ETHER.011",
    "source": "ferroportin_upregulation",
    "target": "ferroportin",
    "relation": "increases",
    "moduleId": "THER",
    "causalConfidence": "L4",
    "mechanismDescription": "Increase ferroportin surface expression or block hepcidin-mediated degradation",
    "keyInsight": "Enhancing export rather than chelating: preserves functional iron while reducing toxic pools"
  },
  {
    "id": "ETHER.012",
    "source": "anx005",
    "target": "c1q",
    "relation": "decreases",
    "moduleId": "THER",
    "causalConfidence": "L3",
    "mechanismDescription": "Anti-C1q antibody blocks complement initiation",
    "keyInsight": "Block at initiation (C1q), not downstream (C5). Ravulizumab C5-inhibitor failed in ALS.",
    "notes": "Redirect microglia from synapse destruction to Aβ clearance",
    "evidence": {
      "pmid": "37695623"
    }
  },
  {
    "id": "ETHER.013",
    "source": "ferroptosis_inhibitors",
    "target": "lipid_peroxidation",
    "relation": "decreases",
    "moduleId": "THER",
    "causalConfidence": "L4",
    "mechanismDescription": "Radical-trapping antioxidants block lipid peroxidation",
    "keyInsight": "Symptomatic relief but does not address upstream iron maldistribution",
    "evidence": {
      "methodType": "intervention_animal"
    }
  },
  {
    "id": "ETHER.014",
    "source": "dgat_inhibitors",
    "target": "microglia_ldam",
    "relation": "decreases",
    "moduleId": "THER",
    "causalConfidence": "L4",
    "mechanismDescription": "Block lipid droplet formation to prevent LDAM phenotype",
    "keyInsight": "Experimental: may restore microglial phagocytic function",
    "evidence": {
      "methodType": "in_vitro"
    }
  },
  {
    "id": "ETHER.015",
    "source": "ldn",
    "target": "nlrp3_inflammasome",
    "relation": "decreases",
    "moduleId": "THER",
    "causalConfidence": "L4",
    "mechanismDescription": "Low-dose naltrexone modulates TLR4, reducing inflammatory activation",
    "keyInsight": "Modulates rather than suppresses microglial inflammation. Generic, inexpensive.",
    "evidence": {
      "methodType": "observational"
    }
  },
  {
    "id": "ETHER.016",
    "source": "rapamycin",
    "target": "mtor",
    "relation": "decreases",
    "moduleId": "THER",
    "causalConfidence": "L1",
    "mechanismDescription": "Direct mTOR inhibition increases autophagy flux",
    "keyInsight": "Context-dependent: helpful early (functional lysosomes), harmful late (damaged lysosomes)",
    "evidence": {
      "methodType": "RCT"
    }
  },
  {
    "id": "ETHER.017",
    "source": "rapamycin",
    "target": "cargo_accumulation",
    "relation": "increases",
    "moduleId": "THER",
    "causalConfidence": "L4",
    "mechanismDescription": "Increased autophagy flux pushes cargo into damaged lysosomes",
    "keyInsight": "PARADOX: more autophagy = more damage when lysosomes are broken",
    "notes": "Nuanced: Tier 2 per PLIG. Timing matters.",
    "evidence": {
      "methodType": "observational"
    }
  },
  {
    "id": "ETHER.018",
    "source": "sleep_optimization",
    "target": "glymphatic_clearance",
    "relation": "increases",
    "moduleId": "THER",
    "causalConfidence": "L3",
    "mechanismDescription": "Deep sleep increases glymphatic flow 60%",
    "keyInsight": "Lifestyle intervention: sleep is the primary glymphatic driver",
    "evidence": {
      "pmid": "24136970"
    }
  },
  {
    "id": "ETHER.019",
    "source": "c381",
    "target": "iron_trapped_lysosomes",
    "relation": "decreases",
    "moduleId": "THER",
    "causalConfidence": "L4",
    "mechanismDescription": "Restoring lysosomal pH enables Fe³⁺ → Fe²⁺ reduction and DMT1 export",
    "keyInsight": "pH restoration = iron redistribution from lysosomes to functional pools",
    "notes": "Lysosomal pH fix is itself an iron redistribution strategy"
  },
  {
    "id": "E-TRANS.001",
    "source": "animal_model",
    "target": "lysosomal_dysfunction",
    "relation": "association",
    "moduleId": "M01",
    "causalConfidence": "L6",
    "keyInsight": "Animal models show dysfunction (reparable)"
  },
  {
    "id": "E-TRANS.002",
    "source": "human_ad",
    "target": "lysosomal_damage",
    "relation": "association",
    "moduleId": "M01",
    "causalConfidence": "L6",
    "keyInsight": "Human AD shows damage (irreparable)"
  }
];

export const modules: Module[] = [
  {
    "id": "M01",
    "name": "Upstream Triggers & Risk Factors",
    "shortName": "Triggers",
    "description": "Age-related, genetic, and environmental risk factors that initiate PLIG dysfunction",
    "color": "#787473"
  },
  {
    "id": "M02",
    "name": "Lysosomal Pathology",
    "shortName": "Lysosome",
    "description": "Central hub: lysosomal pH, membrane integrity, enzyme function, and the dysfunction vs damage distinction",
    "color": "#34d399"
  },
  {
    "id": "M03",
    "name": "Autophagy & Cargo",
    "shortName": "Autophagy",
    "description": "Autophagy flux, cargo accumulation paradox, and selective organelle clearance",
    "color": "#a78bfa"
  },
  {
    "id": "M04",
    "name": "Pericytes & BBB",
    "shortName": "Pericytes",
    "description": "Pericyte health, blood-brain barrier integrity, and neurovascular coupling",
    "color": "#C3577F"
  },
  {
    "id": "M05",
    "name": "Iron Maldistribution",
    "shortName": "Iron",
    "description": "Iron trapped in wrong compartments: labile pools, Fenton chemistry, ferroptosis, and ferroportin export",
    "color": "#E5AF19"
  },
  {
    "id": "M06",
    "name": "Protein Aggregation & Clearance",
    "shortName": "Aggregates",
    "description": "Aβ and α-synuclein aggregation as downstream consequence of clearance failure, not overproduction",
    "color": "#60a5fa"
  },
  {
    "id": "M07",
    "name": "Glial Cells",
    "shortName": "Glia",
    "description": "Microglia, astrocytes, oligodendrocytes, and their role in neuroinflammation and repair",
    "color": "#8ecae6"
  },
  {
    "id": "M08",
    "name": "Viral Mechanisms",
    "shortName": "Viral",
    "description": "SARS-CoV-2 ORF3a lysosomal alkalinization, viral persistence, and post-viral syndromes",
    "color": "#c75146"
  },
  {
    "id": "M09",
    "name": "Complement & Amplification",
    "shortName": "Complement",
    "description": "Complement cascade (C1q → C3 → MAC), synapse elimination, and microglial misdirection",
    "color": "#486393"
  },
  {
    "id": "M10",
    "name": "Hormonal Modulation",
    "shortName": "Hormones",
    "description": "Estrogen, hepcidin, PON1, and sex-linked modifiers of PLIG pathways",
    "color": "#fbbf24"
  },
  {
    "id": "THER",
    "name": "Therapeutic Interventions",
    "shortName": "Therapy",
    "description": "Drug targets, iron redistribution strategies, and the clearance restoration paradigm",
    "color": "#e36216"
  }
];

export const mechanisticFramework = {
  nodes: allNodes,
  edges: allEdges,
  modules,
};
