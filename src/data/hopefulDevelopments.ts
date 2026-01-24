// Hopeful Developments in Alzheimer's Research
// Promising research, approved treatments, and evidence-based lifestyle interventions

export type DevelopmentStatus =
  | 'fda_approved' // FDA approved for AD
  | 'phase_3' // In Phase 3 trials
  | 'phase_2' // In Phase 2 trials
  | 'preclinical' // Promising preclinical data
  | 'evidence_based'; // Strong observational/clinical evidence

export type DevelopmentCategory =
  | 'approved_drug' // FDA-approved AD treatments
  | 'pipeline_drug' // Drugs in clinical trials
  | 'research_tool' // New research methodologies
  | 'device_therapy' // Non-drug interventions
  | 'lifestyle' // Evidence-based lifestyle interventions
  | 'supplement' // Supplements with clinical evidence
  | 'vaccine'; // Vaccines showing dementia protection

export type TreatmentType =
  | 'disease_modifying' // Slows underlying disease progression
  | 'symptomatic'; // Treats symptoms without slowing progression

export interface ClinicalEvidence {
  trialName?: string;
  trialPhase?: string;
  participants?: number;
  duration?: string;
  primaryOutcome: string;
  result: string;
  limitation?: string;
}

export interface HopefulDevelopment {
  id: string;
  name: string;
  category: DevelopmentCategory;
  status: DevelopmentStatus;
  treatmentType?: TreatmentType; // For approved_drug category: disease-modifying vs symptomatic
  description: string;
  mechanism: string;
  whyHopeful: string;
  evidence: ClinicalEvidence[];
  cost?: string;
  availability?: string;
  caveats?: string[];
  sourceIds: string[];
}

export const hopefulDevelopments: HopefulDevelopment[] = [
  // ============================================
  // FDA-APPROVED TREATMENTS
  // ============================================
  {
    id: 'lecanemab',
    name: 'Lecanemab (Leqembi)',
    category: 'approved_drug',
    status: 'fda_approved',
    treatmentType: 'disease_modifying',
    description:
      'Monoclonal antibody that targets amyloid-beta (Aβ) protofibrils. First disease-modifying therapy with clear evidence of slowing decline.',
    mechanism: 'Binds to soluble Aβ protofibrils and promotes their clearance from the brain.',
    whyHopeful:
      'First drug to demonstrate statistically significant slowing of cognitive decline in a Phase 3 trial. Validates that removing amyloid can have clinical benefit, though modest.',
    evidence: [
      {
        trialName: 'CLARITY AD',
        trialPhase: 'Phase 3',
        participants: 1795,
        duration: '18 months',
        primaryOutcome: 'CDR-SB (Clinical Dementia Rating - Sum of Boxes): clinician rates 6 domains (memory, orientation, judgment, community affairs, home/hobbies, personal care) from 0-3 each; total 0-18 where higher = more impaired',
        result: '27% slowing of cognitive decline vs placebo (0.45 points difference on 18-point scale)',
        limitation: 'ARIA (brain swelling/bleeding) in 12.6% of patients',
      },
      {
        trialName: 'CLARITY AD OLE',
        trialPhase: 'Open-label extension',
        duration: '36 months',
        primaryOutcome: 'Long-term efficacy',
        result: 'Continued benefit through 36 months',
      },
    ],
    cost: '~$26,500/year',
    availability: 'FDA approved January 2023 (accelerated), July 2023 (traditional)',
    caveats: [
      '27% slowing is modest,patients still decline',
      'Requires regular MRI monitoring for ARIA',
      'Only for early-stage AD with confirmed amyloid',
      'High cost limits accessibility',
    ],
    sourceIds: ['lecanemab-clarity-2023'],
  },

  {
    id: 'donanemab',
    name: 'Donanemab (Kisunla)',
    category: 'approved_drug',
    status: 'fda_approved',
    treatmentType: 'disease_modifying',
    description:
      'Monoclonal antibody targeting a modified form of Aβ (N3pG). Can be stopped once amyloid is cleared.',
    mechanism:
      'Targets pyroglutamate Aβ, a modified form found primarily in plaques. Designed for time-limited treatment.',
    whyHopeful:
      'Showed 35% slowing of decline,the best result for any amyloid-targeting drug. Unique "treat to clear" approach may allow stopping therapy.',
    evidence: [
      {
        trialName: 'TRAILBLAZER-ALZ 2',
        trialPhase: 'Phase 3',
        participants: 1736,
        duration: '18 months',
        primaryOutcome: 'iADRS (integrated Alzheimer\'s Disease Rating Scale): combines ADAS-cog13 (memory, language, praxis tests) + ADCS-iADL (daily activities like using phone, managing finances); 0-144 scale where higher = better function',
        result: '35% slowing of decline (3.25 points difference on 144-point scale); 47% showed no decline at 1 year vs 29% placebo',
        limitation: 'ARIA-E in 24% of patients (vs 1.9% placebo)',
      },
    ],
    cost: '~$32,000/year (but may be shorter duration)',
    availability: 'FDA approved July 2024',
    caveats: [
      'Higher ARIA rate than lecanemab (24%)',
      'Three deaths possibly related to ARIA in trials',
      'Only for early-stage AD',
      'Long-term durability unclear',
    ],
    sourceIds: ['donanemab-trailblazer-2024'],
  },

  {
    id: 'donepezil',
    name: 'Donepezil (Aricept)',
    category: 'approved_drug',
    status: 'fda_approved',
    treatmentType: 'symptomatic',
    description:
      'Cholinesterase inhibitor that boosts acetylcholine levels in the brain. The most widely prescribed AD medication for over 25 years.',
    mechanism:
      'Inhibits acetylcholinesterase, the enzyme that breaks down acetylcholine, thereby increasing ACh availability at synapses.',
    whyHopeful:
      'Provides modest but real symptomatic benefit. Can slow symptom progression for 6-12 months. Now generic and affordable (<$20/month).',
    evidence: [
      {
        trialName: 'Multiple Phase 3 trials',
        trialPhase: 'Phase 3',
        participants: 2000,
        duration: '12-52 weeks',
        primaryOutcome: 'ADAS-cog (Alzheimer\'s Disease Assessment Scale - Cognitive Subscale): 11 tasks testing word recall, naming objects, following commands, copying shapes, and orientation to time/place; higher scores = worse cognition (0-70 scale)',
        result: '2-3 point improvement on 70-point scale maintained for up to 1 year',
        limitation: 'Does not slow disease progression; symptomatic only',
      },
    ],
    cost: '<$20/month (generic)',
    availability: 'FDA approved 1996; generic available',
    caveats: [
      'Symptomatic only,does not slow underlying disease',
      'Benefits typically last 6-12 months before decline resumes',
      'GI side effects (nausea, diarrhea) in some patients',
    ],
    sourceIds: ['donepezil-fda-1996'],
  },

  {
    id: 'rivastigmine',
    name: 'Rivastigmine (Exelon)',
    category: 'approved_drug',
    status: 'fda_approved',
    treatmentType: 'symptomatic',
    description:
      'Cholinesterase inhibitor available as oral medication or transdermal patch. Also approved for Parkinson\'s disease dementia.',
    mechanism:
      'Inhibits both acetylcholinesterase and butyrylcholinesterase. Patch formulation provides steady drug levels and fewer GI side effects.',
    whyHopeful:
      'Patch delivery reduces GI side effects. Only AD drug also approved for Parkinson\'s dementia. Now generic and affordable.',
    evidence: [
      {
        trialName: 'Phase 3 trials',
        trialPhase: 'Phase 3',
        primaryOutcome: 'ADAS-cog (Alzheimer\'s Disease Assessment Scale - Cognitive Subscale): 11 tasks testing word recall, naming objects, following commands, copying shapes, and orientation to time/place; higher scores = worse cognition (0-70 scale)',
        result: 'Similar efficacy to donepezil (2-3 point improvement on 70-point scale)',
        limitation: 'Symptomatic only',
      },
    ],
    cost: '<$30/month (generic)',
    availability: 'FDA approved 2000; generic available',
    caveats: [
      'Symptomatic only',
      'Requires dose titration to minimize side effects',
    ],
    sourceIds: ['rivastigmine-fda-2000'],
  },

  {
    id: 'galantamine',
    name: 'Galantamine (Razadyne)',
    category: 'approved_drug',
    status: 'fda_approved',
    treatmentType: 'symptomatic',
    description:
      'Cholinesterase inhibitor and α7 nAChR positive allosteric modulator. Recent research reveals a previously unrecognized BBB-protective mechanism via the splenic anti-inflammatory pathway.',
    mechanism:
      'Triple mechanism: (1) AChE inhibition → ↑ synaptic ACh; (2) α7 nAChR allosteric modulation → enhanced neurotransmission; (3) α7 nAChR activation on splenic immune cells → ↓ systemic TNF-α/IL-1β → ↑ tight junction proteins (claudin-5, occludin) → BBB protection.',
    whyHopeful:
      'The Dash lab discovered that galantamine protects BBB integrity via a systemic neuroimmune circuit (vagus → spleen → cytokines → BBB). Effects persist 10 days after drug discontinuation—suggesting structural stabilization, not just acute ACh elevation. This may explain why galantamine works in TBI and vascular dementia, not just AD. Raises important question: should we measure BBB permeability in AD trials?',
    evidence: [
      {
        trialName: 'Phase 3 trials (AD)',
        trialPhase: 'Phase 3',
        primaryOutcome: 'ADAS-cog',
        result: '2-3 point improvement on 70-point scale, similar to other AChEIs',
        limitation: 'Traditionally considered symptomatic only',
      },
      {
        trialName: 'Dash Lab TBI Study (Zhao et al. 2017)',
        trialPhase: 'Preclinical',
        primaryOutcome: 'BBB permeability, cognitive function',
        result: 'Galantamine ↓ TBI-triggered BBB permeability, ↓ GABAergic neuron loss, ↑ Morris water maze performance. Effects persisted 10 days post-treatment.',
        limitation: 'TBI model, not AD; needs replication in AD context',
      },
      {
        trialName: 'Dash Lab α7 nAChR Study (2016)',
        trialPhase: 'Preclinical',
        primaryOutcome: 'BBB permeability mechanism',
        result: 'α7 nAChR knockout mice have ↑ BBB permeability after TBI. CRITICAL: α-bungarotoxin INTO SPLEEN → ↑ BBB permeability; splenectomy abolished drug effect. Proves splenic α7 nAChR is REQUIRED.',
        limitation: 'Mechanistic study in TBI; AD confirmation needed',
      },
    ],
    cost: '<$30/month (generic)',
    availability: 'FDA approved 2001; generic available',
    caveats: [
      'BBB protection demonstrated in TBI, not yet confirmed in AD models',
      'Mainstream clinical understanding still focuses only on AChE inhibition',
      'The splenic mechanism suggests BBB permeability should be measured in trials',
      'May have advantages in mixed/vascular dementia given BBB mechanism',
    ],
    sourceIds: ['galantamine-fda-2001', 'dash-galantamine-2017', 'dash-alpha7-bbb-2016'],
  },

  {
    id: 'memantine',
    name: 'Memantine (Namenda)',
    category: 'approved_drug',
    status: 'fda_approved',
    treatmentType: 'symptomatic',
    description:
      'NMDA receptor antagonist for moderate-to-severe AD. Works through a different mechanism than cholinesterase inhibitors and can be used in combination.',
    mechanism:
      'Blocks excessive NMDA receptor activation by glutamate, which can cause excitotoxic neuronal damage. Allows normal signaling while blocking pathological overstimulation.',
    whyHopeful:
      'Different mechanism allows combination with cholinesterase inhibitors. Approved for moderate-to-severe AD when other drugs are less effective. Now generic.',
    evidence: [
      {
        trialName: 'Phase 3 trials',
        trialPhase: 'Phase 3',
        primaryOutcome: 'SIB (Severe Impairment Battery): 40 simple tasks for patients with advanced dementia,naming colors, counting fingers, following one-step commands (0-100 scale, higher = better). ADCS-ADL (Activities of Daily Living): 23 items rating ability to eat, dress, use telephone, manage money (0-54 scale, higher = more independent)',
        result: 'Modest improvement: ~3 points on 100-point SIB and ~1.5 points on 54-point ADCS-ADL',
        limitation: 'Smaller effect size than cholinesterase inhibitors in mild AD',
      },
    ],
    cost: '<$20/month (generic)',
    availability: 'FDA approved 2003; generic available',
    caveats: [
      'Symptomatic only',
      'Primarily for moderate-to-severe stages',
      'Effect size modest',
    ],
    sourceIds: ['memantine-fda-2003'],
  },

  // ============================================
  // PROMISING PIPELINE (NON-AMYLOID)
  // ============================================
  {
    id: 'glp1-next-gen',
    name: 'Next-Generation GLP-1 Agonists',
    category: 'pipeline_drug',
    status: 'phase_2',
    description:
      'GLP-1 receptor agonists with improved blood-brain barrier penetration. Addresses the "Type 3 Diabetes" hypothesis.',
    mechanism:
      'Enhances brain insulin signaling, reduces inflammation, improves neuronal energy metabolism. Key is adequate CNS exposure.',
    whyHopeful:
      'The metabolic hypothesis remains compelling. Previous GLP-1 failures (oral semaglutide, liraglutide) may be due to limited BBB penetration. Newer approaches with better brain exposure are in development.',
    evidence: [
      {
        trialName: 'ELAD (Liraglutide)',
        trialPhase: 'Phase 2b',
        participants: 204,
        duration: '52 weeks',
        primaryOutcome: 'Brain glucose metabolism (FDG-PET)',
        result: 'Did not significantly slow metabolism decline; BBB penetration ~2-3%',
        limitation: 'May need better CNS-penetrant formulations',
      },
      {
        trialName: 'EVOKE (Oral Semaglutide)',
        trialPhase: 'Phase 3',
        participants: 3808,
        duration: '156 weeks',
        primaryOutcome: 'Cognitive decline',
        result: 'Failed primary endpoint; oral bioavailability limits brain exposure (~1%)',
        limitation: 'BBB penetration inadequate for CNS effect',
      },
    ],
    cost: 'Varies by formulation',
    availability: 'Next-generation trials ongoing (tirzepatide, CNS-optimized formulations)',
    caveats: [
      'Previous GLP-1 trials failed,hypothesis may be wrong OR drug delivery was inadequate',
      'Blood-brain barrier penetration is the key limitation',
      'Tirzepatide (GLP-1/GIP dual agonist) trials ongoing,may have better CNS effects',
      'Need drugs specifically designed for brain penetration',
    ],
    sourceIds: ['liraglutide-elad-2025', 'semaglutide-evoke-2024'],
  },

  {
    id: '40hz-gamma',
    name: '40Hz Gamma Entrainment (GENUS)',
    category: 'device_therapy',
    status: 'phase_3',
    description:
      'Light and sound stimulation at 40Hz frequency to entrain brain gamma rhythms. Non-invasive, no drugs.',
    mechanism:
      'Entrains brain gamma oscillations, which activates microglia for amyloid clearance and enhances glymphatic function.',
    whyHopeful:
      'Novel non-drug approach. Decade of MIT research shows multiple mechanisms of benefit. Phase 3 trial underway. Could be very low cost if proven.',
    evidence: [
      {
        trialName: 'MIT Phase 2a',
        trialPhase: 'Phase 2a',
        participants: 15,
        duration: '3 months',
        primaryOutcome: 'Safety, brain structure, cognition',
        result: 'Less brain atrophy, improved connectivity, better memory',
        limitation: 'Very small sample size',
      },
      {
        trialName: 'Long-term pilot',
        trialPhase: 'Pilot',
        participants: 5,
        duration: '~2 years',
        primaryOutcome: 'Long-term safety and efficacy',
        result: 'Safe; late-onset AD patients showed better cognitive scores than matched controls',
        limitation: 'Only 5 participants; not placebo-controlled',
      },
    ],
    cost: 'Potentially very low (LED lights + speakers)',
    availability: 'Phase 3 trial ongoing (Cognito Therapeutics)',
    caveats: [
      'Large Phase 3 results not yet available',
      'Small studies may not replicate',
      'Best results in late-onset AD subgroup',
    ],
    sourceIds: ['tsai-40hz-2022', 'tsai-40hz-2025'],
  },

  {
    id: 'focused-ultrasound',
    name: 'Focused Ultrasound (FUS)',
    category: 'device_therapy',
    status: 'phase_2',
    description:
      'Non-invasive technique using focused sound waves to temporarily open the blood-brain barrier, potentially enhancing drug delivery or directly clearing amyloid.',
    mechanism:
      'Low-intensity pulsed ultrasound combined with microbubbles temporarily opens the BBB in targeted brain regions. This may allow better drug penetration, activate microglia to clear amyloid, and enhance glymphatic clearance.',
    whyHopeful:
      'Addresses a fundamental problem: most drugs cannot cross the BBB effectively. Early trials show safe BBB opening and amyloid reduction without drugs. Could enhance efficacy of existing treatments or work as standalone therapy.',
    evidence: [
      {
        trialName: 'Lipsman et al. (Sunnybrook)',
        trialPhase: 'Phase 1',
        participants: 6,
        duration: 'Single treatment',
        primaryOutcome: 'Safety and BBB opening',
        result: 'Safe, reversible BBB opening confirmed; no serious adverse events',
        limitation: 'Very small safety study',
      },
      {
        trialName: 'Phase 2a (Multiple centers)',
        trialPhase: 'Phase 2a',
        participants: 30,
        duration: '6 months',
        primaryOutcome: 'Amyloid reduction, safety',
        result: 'Reduced amyloid in treated regions without drug co-administration',
        limitation: 'Small sample; long-term effects unknown',
      },
      {
        trialName: 'FUS + Aducanumab combination',
        trialPhase: 'Phase 1/2',
        primaryOutcome: 'Enhanced drug delivery',
        result: 'FUS enhanced antibody delivery to targeted brain regions by 5-8x',
        limitation: 'Combination approach still experimental',
      },
    ],
    cost: 'High (specialized equipment required)',
    availability: 'Phase 2 trials ongoing; FDA Breakthrough Device designation for related brain applications (BBB disruption for brain tumors)',
    caveats: [
      'Requires MRI-guided specialized equipment',
      'Long-term safety of repeated BBB opening unknown',
      'Optimal treatment parameters still being determined',
      'High cost may limit accessibility',
    ],
    sourceIds: ['fus-lipsman-2018', 'fus-phase2-2023'],
  },

  {
    id: 'mindimmune-cd11c',
    name: 'MITI-101 (CD11c Antibody)',
    category: 'pipeline_drug',
    status: 'preclinical',
    description:
      'Monoclonal antibody targeting CD11c to block peripheral immune cells from entering the brain and driving neuroinflammation.',
    mechanism:
      'Blocks CD11c, a marker on innate immune cells in the bloodstream. This prevents these cells from being recruited into the brain, where they accumulate around amyloid plaques and contribute to synaptic destruction.',
    whyHopeful:
      'Novel approach targeting peripheral immune system rather than brain-resident cells. Preclinical data shows reduced synaptic damage. Backed by Pfizer Ventures and Gates Frontier with $30M Series A.',
    evidence: [
      {
        trialName: 'MindImmune Preclinical',
        trialPhase: 'Preclinical',
        primaryOutcome: 'Synaptic markers in AD mouse models',
        result: 'Blocking CD11c+ cells reduced markers of synaptic dystrophy in mouse models',
        limitation: 'Mouse studies only; Phase 1 trials planned',
      },
    ],
    cost: 'Unknown (early stage)',
    availability: 'Phase 1 clinical trials planned',
    caveats: [
      'Still in preclinical stage,human data not yet available',
      'Novel mechanism,long-term effects of blocking peripheral immune cells unknown',
      'Neuroinflammation hypothesis still being validated',
    ],
    sourceIds: ['mindimmune-2025'],
  },

  {
    id: 'sri-011381',
    name: 'SRI-011381 (C381)',
    category: 'pipeline_drug',
    status: 'preclinical',
    description:
      'Orally bioavailable, brain-penetrant small molecule that restores lysosomal function and enhances microglial amyloid-β clearance through dual complementary mechanisms. IND-enabling toxicology complete since 2022. Key challenge: TGF-β pathway is neuroprotective in brain but pro-fibrotic peripherally—founders building brain-selective delivery platform to address this.',
    mechanism:
      'Dual mechanism: (1) v-ATPase activation → lysosomal acidification → enhanced degradation of phagocytosed cargo; (2) TGF-β1/Smad activation → TMEM119 upregulation → maintained microglial homeostasis → increased Aβ phagocytic capacity.',
    whyHopeful:
      'Extraordinary preclinical validation: 11+ validation studies across multiple disease models by independent labs. Efficacy in AD (5xFAD, 3xTG), PD (MPTP), MS (EAE), and TBI models. Works even in mid-stage disease. Dual mechanism: (1) lysosomal acidification and (2) TGF-β/TMEM119 microglial enhancement. The TGF-β pathway is a double-edged sword—neuroprotective in brain but pro-fibrotic peripherally. Rather than abandoning C381, founders pivoted to building QinoTrans, a BBB delivery platform to achieve brain-selective exposure while avoiding systemic TGF-β activation. Eli Lilly partnership (Oct 2024) validates the platform approach. C381 isn\'t abandoned—it\'s waiting for the right delivery technology.',
    evidence: [
      {
        trialName: 'Vest et al. 2022 (PNAS)',
        trialPhase: 'Preclinical',
        primaryOutcome: 'Neuroprotection in FTD (Grn⁻/⁻) and PD (MPTP) models',
        result:
          'Protected dopaminergic neurons, reduced p-α-synuclein, improved motor and cognitive function. IND-enabling toxicology complete.',
        limitation: 'Mouse studies only',
      },
      {
        trialName: 'Liu et al. 2025 (Immunity)',
        trialPhase: 'Preclinical',
        primaryOutcome: 'Aβ clearance and cognition in 5xFAD and 3xTG mice',
        result:
          'Reduced plaque burden, improved Morris water maze and Y-maze. Mid-stage treatment (starting at 5 months) still effective.',
        limitation: 'Mouse studies only',
      },
      {
        trialName: 'Chou et al. 2025 (Nature Cell Biology)',
        trialPhase: 'Preclinical',
        primaryOutcome: 'Human AD neurons (tNeurons)',
        result:
          '20-46% reduction in intracellular Aβ42, reduced inflammatory cytokines, improved neuronal survival',
        limitation: 'In vitro human neurons, not in vivo',
      },
      {
        trialName: 'Wu et al. 2021 (Theranostics)',
        trialPhase: 'Preclinical',
        primaryOutcome: 'MS (EAE model)',
        result:
          'Rescued demyelination, reduced gliosis and inflammatory infiltration',
        limitation: 'Mouse model only',
      },
      {
        trialName: 'Li et al. 2024 (Neurotrauma Reports)',
        trialPhase: 'Preclinical',
        primaryOutcome: 'Repetitive mild TBI model',
        result: 'Reversed TBI-induced gene expression changes, attenuated vascular damage',
        limitation: 'Mouse model only',
      },
      {
        trialName: 'QinoTrans/Eli Lilly Partnership',
        trialPhase: 'Platform development',
        primaryOutcome: 'BBB-selective delivery technology',
        result:
          'Oct 2024: Lilly entered research collaboration for novel BBB delivery vehicles; same team that discovered C381',
        limitation: 'Platform not yet validated for C381 specifically',
      },
    ],
    cost: 'Unknown (early stage; small molecule economics favorable)',
    availability: 'IND-ready since 2022 but no clinical trials registered as of January 2026',
    caveats: [
      'TGF-β agonism: neuroprotective in brain but pro-fibrotic in peripheral organs (heart, lung, liver, kidney)',
      'Oral systemic delivery may cause peripheral fibrosis with chronic use—delivery technology needed',
      'Founders building QinoTrans BBB platform to achieve brain-selective exposure',
      'Eli Lilly partnership (Oct 2024) validates brain-targeted delivery approach',
      'Independent oral C381 development may be premature—safest path may be via QinoTrans or similar',
    ],
    sourceIds: [
      'vest-2022-pnas',
      'liu-2025-immunity',
      'chou-2025-nature-cell-bio',
      'wu-2021-theranostics',
      'li-2024-neurotrauma',
      'luo-2023-neural-regen-res',
      'qinotrans-lilly-2024',
    ],
  },

  {
    id: 'lithium-orotate',
    name: 'Lithium Orotate (Low-dose)',
    category: 'supplement',
    status: 'preclinical',
    description:
      'Low-dose lithium in orotate form. Dramatically different from high-dose lithium carbonate used in psychiatry.',
    mechanism:
      'May enhance autophagy, reduce neuroinflammation, and support neuronal health. 2025 Nature paper suggests lithium deficiency contributes to AD.',
    whyHopeful:
      'Groundbreaking 2025 Nature study showed lithium orotate reversed cognitive decline in aging mice at 1/1000th the psychiatric dose, without toxicity. Clinical trials planned.',
    evidence: [
      {
        trialName: 'Yankner Lab (Harvard/Boston Children\'s)',
        trialPhase: 'Preclinical',
        primaryOutcome: 'Cognitive function in aging mice',
        result:
          'Low-dose lithium orotate completely reversed memory loss in aging mice; prevented plaque and tau accumulation in AD mice',
        limitation: 'Mouse study only; human trials needed',
      },
      {
        trialName: 'Nunes 2013',
        trialPhase: 'Small clinical trial',
        participants: 45,
        duration: '15 months',
        primaryOutcome: 'Cognitive decline',
        result: 'Microdose lithium slowed cognitive decline vs placebo',
        limitation: 'Very small study; needs replication',
      },
      {
        trialName: 'LATTICE',
        trialPhase: 'Phase 2',
        participants: 80,
        duration: '2 years',
        primaryOutcome: 'Cognition, PET imaging',
        result: 'Completed; results pending',
      },
    ],
    cost: '~$10-20/month (supplement)',
    availability: 'Available as supplement (not FDA-regulated)',
    caveats: [
      'Human clinical trials not yet completed',
      'Optimal dose for humans unknown',
      'Do not self-treat,wait for clinical trial results',
      'Supplement quality varies',
    ],
    sourceIds: ['lithium-orotate-2025'],
  },

  {
    id: 'ic100-zyversa',
    name: 'IC 100 (ZyVersa Therapeutics)',
    category: 'pipeline_drug',
    status: 'preclinical',
    description:
      'Humanized IgG4 monoclonal antibody targeting ASC, the adaptor protein common to multiple inflammasomes (NLRP1, NLRP2, NLRP3, NLRC4, AIM2, Pyrin). Unlike NLRP3-specific inhibitors, blocks the shared component across all inflammasome types.',
    mechanism:
      'ASC is a critical adaptor protein required for inflammasome assembly. IC 100 binds ASC, preventing inflammasome formation and the release of ASC specks. Importantly, extracellular ASC specks act as seeds for Aβ aggregation, creating a self-perpetuating cycle: Aβ → inflammasome activation → ASC speck release → more Aβ aggregation.',
    whyHopeful:
      'Addresses a key amplification loop in AD. Published data shows ASC specks seed amyloid plaques, and NLRP3 inhibition reduces both Aβ deposition and neuroinflammation in AD mouse models. Blocking the shared ASC adaptor may be more effective than NLRP3-specific inhibitors since multiple inflammasome types (NLRP1, NLRP2, Pyrin) contribute to neurodegeneration.',
    evidence: [
      {
        trialName: 'University of Miami AD mouse study (2025)',
        trialPhase: 'Preclinical',
        primaryOutcome: 'Aβ deposition and neuroinflammation',
        result:
          'NLRP3 inhibition significantly reduced Aβ pathology and neuroinflammation, enhanced microglial phagocytosis of Aβ, and boosted microglial metabolic activity via glutamine utilization',
        limitation: 'Mouse model; antibody BBB penetration not addressed',
      },
      {
        trialName: 'Michael J. Fox Foundation PD study (2025)',
        trialPhase: 'Preclinical',
        primaryOutcome: 'α-synuclein and microglial activation',
        result:
          'IC 100 blocked microglial inflammasome activation and reduced neurotoxic α-synuclein accumulation in Parkinson\'s model. Authors noted applicability to Lewy body dementia and AD.',
        limitation: 'Parkinson\'s model; AD-specific studies ongoing',
      },
      {
        trialName: 'Plasma ASC biomarker study (2024)',
        trialPhase: 'Clinical biomarker',
        primaryOutcome: 'ASC as early cognitive decline biomarker',
        result:
          'Plasma ASC levels elevated in early cognitive decline, supporting ASC/inflammasome role in neurodegeneration onset',
      },
    ],
    cost: 'Unknown (early stage)',
    availability: 'IND planned H2-2025; no AD trials yet (lead indication is cardiometabolic)',
    caveats: [
      'ZyVersa is a small biotech (market cap ~$5-10M) with execution risk',
      'Lead indication is cardiometabolic, not AD; neurodegeneration is secondary',
      'No AD-specific clinical trials planned yet',
      'Antibody BBB penetration is a concern; may need clearance enhancer',
      'Competition from small molecule NLRP3 inhibitors (Novartis, Roche) with better BBB penetration',
    ],
    sourceIds: ['zyversa-ic100-2025', 'zyversa-mjff-2025'],
  },

  {
    id: 'caffeic-acid-12d',
    name: 'Caffeic Acid Derivative (Compound 12d)',
    category: 'pipeline_drug',
    status: 'preclinical',
    description:
      'Multi-target directed ligand (MTDL) derived from caffeic acid that addresses multiple AD pathways simultaneously: cholinergic, oxidative, metal-induced, and amyloid.',
    mechanism:
      'Four complementary mechanisms: (1) selective AChE inhibition (IC₅₀ 3.72 μM) boosts acetylcholine; (2) potent antioxidant activity (DPPH IC₅₀ 6.32 μM); (3) metal chelation reduces free radical damage; (4) inhibits Aβ self-aggregation.',
    whyHopeful:
      'The "one drug, one target" paradigm has failed in AD. Multi-target directed ligands address the disease\'s complexity by hitting several pathways at once. Compound 12d shows strong preclinical efficacy with predicted blood-brain barrier permeability.',
    evidence: [
      {
        trialName: 'Kumar & Modi 2025 (IIT BHU)',
        trialPhase: 'Preclinical',
        primaryOutcome: 'Neuroprotection and memory in AD models',
        result:
          'Protected SH-SY5Y neurons from H₂O₂ toxicity, reduced intracellular ROS. Improved Y-maze spatial memory in scopolamine-induced AD mice and restored cholinesterase levels.',
        limitation: 'Mouse model (scopolamine-induced); not tested in transgenic AD models yet',
      },
      {
        trialName: 'In vitro characterization',
        trialPhase: 'Preclinical',
        primaryOutcome: 'Multi-target activity profile',
        result:
          'AChE IC₅₀: 3.72 μM (selective over BuChE); DPPH IC₅₀: 6.32 μM; Thioflavin T assay confirmed Aβ aggregation inhibition; predicted BBB permeable (Pe = 4.12)',
        limitation: 'In vitro data; needs in vivo validation of all mechanisms',
      },
    ],
    cost: 'Unknown (early stage)',
    availability: 'Preclinical; no clinical trials registered',
    caveats: [
      'Only tested in scopolamine model, not transgenic AD mice',
      'BBB permeability predicted computationally, not measured in vivo',
      'MTDL approach promising but challenging to optimize',
      'Long path from preclinical to human trials',
    ],
    sourceIds: ['kumar-modi-caffeic-2025'],
  },

  {
    id: 'metformin',
    name: 'Metformin',
    category: 'pipeline_drug',
    status: 'phase_2',
    description:
      'AMPK activator that inhibits mTORC1, suppresses NF-κB, and enhances autophagy. World\'s most prescribed diabetes drug (~$4/month generic) with decades of safety data.',
    mechanism:
      'Activates AMPK via mitochondrial complex I inhibition, leading to mTORC1 inhibition, autophagy enhancement, NF-κB suppression, and M2 microglial polarization. Works through AMPK/mTOR/S6K/BACE1 and AMPK/P65 NF-κB pathways.',
    whyHopeful:
      'Strong preclinical evidence (Ou 2017: reduced Aβ, improved cognition in APP/PS1 mice). Epidemiological data shows reduced dementia in diabetic users. Multiple mechanisms addressing upstream pathology. Extremely cheap and safe.',
    evidence: [
      {
        trialName: 'MAP Trial',
        trialPhase: 'Phase 2',
        participants: 326,
        duration: '2 years',
        primaryOutcome: 'Cognitive function in aMCI',
        result: 'Ongoing (NCT04098666). Results expected 2027. APOE4-stratified.',
        limitation: 'Will not assess long-term use, which may be critical',
      },
      {
        trialName: 'Ou 2017 (Preclinical)',
        trialPhase: 'Preclinical',
        primaryOutcome: 'Aβ and cognition in APP/PS1 mice',
        result: 'Attenuated memory deficits, decreased Aβ plaques, reduced activated microglia, enhanced AMPK, suppressed NF-κB and mTOR',
      },
      {
        trialName: 'Wu 2020 (Epidemiological)',
        trialPhase: 'Cohort study',
        primaryOutcome: 'Memory decline by APOE status',
        result: 'Reduced memory decline in cognitively normal T2DM patients',
        limitation: 'CRITICAL: Possible ACCELERATED decline in AD patients who are APOE4 carriers',
      },
    ],
    cost: '~$4/month (generic)',
    availability: 'FDA approved for diabetes; off-label possible',
    caveats: [
      'APOE4 interaction: may benefit cognitively normal but harm AD+APOE4 carriers (Wu 2020)',
      'MAP trial relies on academic/philanthropic funding only (no pharma sponsor)',
      'Strongest rationale is for prevention, not treatment of established AD',
      'Long-term exposure question unaddressed by current trials (Daly 2025)',
      'Exemplifies market failure: $4/month generic with strong evidence but no Phase 3 funding',
    ],
    sourceIds: ['metformin-ou-2017', 'metformin-wu-2020', 'metformin-map-trial'],
  },

  {
    id: 'dimethyl-fumarate',
    name: 'Dimethyl Fumarate (Tecfidera)',
    category: 'pipeline_drug',
    status: 'preclinical',
    description:
      'Nrf2 activator that suppresses NF-κB, inhibits NLRP3 inflammasome, and prevents glycolytic switch in microglia. FDA-approved for MS with established CNS penetration.',
    mechanism:
      'Covalently modifies Keap1 cysteine residues, releasing Nrf2 which induces antioxidant genes (HO-1, NQO1, GPX4). Also activates HCAR2 receptor. Suppresses NF-κB → reduces NLRP3 transcription and HIF-1α stabilization → prevents microglial glycolytic switch.',
    whyHopeful:
      'FDA-approved with known safety profile. CNS-penetrant (good BBB permeability). Wang 2024 showed improved cognition in App-KI mice. Addresses multiple pathways simultaneously. Complete AD trial design published (Sharkus 2023).',
    evidence: [
      {
        trialName: 'Wang 2024 (Preclinical)',
        trialPhase: 'Preclinical',
        primaryOutcome: 'Cognition and neuroinflammation in App-KI mice',
        result: 'Improved cognitive dysfunction via astrocytic Nrf2 activation → reduced STAT3/C3 signaling → decreased neuroinflammation',
      },
      {
        trialName: 'Sharkus 2023 (Trial Design)',
        trialPhase: 'Proposed Phase I/II',
        participants: 60,
        duration: '12 weeks',
        primaryOutcome: 'Safety and biomarker changes',
        result: 'Trial design published but NO active AD trial registered as of 2025',
        limitation: 'No sponsor has funded this proposed trial',
      },
      {
        trialName: 'MS Approval Data',
        trialPhase: 'Phase 3 (MS)',
        primaryOutcome: 'Relapse rate in MS',
        result: 'FDA approved 2013 for relapsing-remitting MS; establishes safety and CNS penetration',
      },
    ],
    cost: '~$50/year (generic since 2020)',
    availability: 'FDA approved for MS; off-label possible',
    caveats: [
      'NO active AD trial despite published trial design (Sharkus 2023)',
      'Lymphopenia monitoring required (every 3 months); discontinue if ALC <0.8',
      'GI intolerance in ~40% (flushing, nausea, diarrhea); diroximel fumarate (Vumerity) better tolerated',
      'Rare but serious PML risk in severely lymphopenic patients',
      'Clear market failure: approved CNS-penetrant drug with strong rationale but no AD trial sponsor',
    ],
    sourceIds: ['dmf-wang-2024', 'dmf-sharkus-2023', 'dmf-rosito-2020'],
  },

  // ============================================
  // RESEARCH TOOLS
  // ============================================
  {
    id: 'appnlgf-model',
    name: 'App^NL-G-F Knock-in Mouse Model',
    category: 'research_tool',
    status: 'evidence_based',
    description:
      'Next-generation AD mouse model that expresses APP at normal levels with disease-causing mutations. Avoids overexpression artifacts.',
    mechanism:
      'Knock-in approach places humanized APP with three familial AD mutations (Swedish, Arctic, Iberian) into the mouse genome at normal expression levels.',
    whyHopeful:
      'Solves a major problem: previous transgenic models overexpressed APP, causing artifacts. This model may better predict human outcomes, potentially reducing the 99% failure rate.',
    evidence: [
      {
        trialName: 'Saido lab development',
        trialPhase: 'Preclinical tool',
        primaryOutcome: 'AD pathology modeling',
        result:
          'Shows progressive amyloid pathology, neuroinflammation, and cognitive decline without APP overexpression artifacts',
      },
    ],
    availability: 'Available to researchers; widely adopted since 2014',
    caveats: [
      'Still a mouse model,may not translate to humans',
      'Only models amyloid pathology, not full AD complexity',
    ],
    sourceIds: ['appnlgf-saido-2014'],
  },

  // ============================================
  // VACCINES WITH DEMENTIA PROTECTION
  // ============================================
  {
    id: 'shingrix',
    name: 'Shingrix (Recombinant VZV Vaccine)',
    category: 'vaccine',
    status: 'evidence_based',
    description:
      'Recombinant varicella zoster virus vaccine. Shows 17-18% reduction in dementia diagnoses beyond shingles prevention.',
    mechanism:
      'Induces trained immunity: long-term epigenetic reprogramming (H3K4me3, H3K27ac) of innate immune cells including microglia. Enhanced metabolic flexibility and phagocytic capacity. Protection extends beyond preventing VZV reactivation.',
    whyHopeful:
      'Demonstrates vaccines can protect against neurodegeneration via trained immunity, not just infection prevention. FDA-approved, widely available, well-established safety profile.',
    evidence: [
      {
        trialName: 'Multiple cohort studies 2023-2025',
        trialPhase: 'Observational',
        primaryOutcome: 'Dementia incidence',
        result: '17-18% reduction in dementia risk in vaccinated individuals',
      },
    ],
    cost: '~$200 for 2-dose series (often covered by insurance)',
    availability: 'FDA approved; recommended for adults 50+',
    caveats: [
      'Observational data; RCT for dementia endpoint not conducted',
      'More reactogenic than Zostavax (local reactions common)',
      'Two-dose series required',
    ],
    sourceIds: ['shingrix-dementia-2024'],
  },

  {
    id: 'zostavax',
    name: 'Zostavax (Live Attenuated VZV Vaccine)',
    category: 'vaccine',
    status: 'evidence_based',
    description:
      'Live attenuated varicella zoster virus vaccine. Shows 17% dementia reduction, proving protection occurs via trained immunity regardless of adjuvant.',
    mechanism:
      'Zostavax contains NO adjuvant yet still reduces dementia risk. This is key evidence that trained immunity (not adjuvant-specific mechanisms) is the unifying mechanism. Live-attenuated vaccines induce prolonged, low-level immune activation that reprograms innate immune cells epigenetically.',
    whyHopeful:
      'Critical proof that trained immunity, not specific adjuvants, is the mechanism. Both adjuvanted (Shingrix) and non-adjuvanted (Zostavax) vaccines protect equally well.',
    evidence: [
      {
        trialName: 'Pomirchy 2026',
        trialPhase: 'Observational',
        primaryOutcome: 'Dementia incidence',
        result: '17% reduction in dementia risk independent of herpes zoster prevention',
      },
    ],
    cost: 'Lower than Shingrix',
    availability: 'Largely replaced by Shingrix but historically available',
    caveats: [
      'Live vaccine - not suitable for immunocompromised',
      'Less effective than Shingrix for shingles prevention',
      'Mechanism of dementia protection unclear',
      'No longer the preferred shingles vaccine',
    ],
    sourceIds: ['zostavax-dementia-2026'],
  },

  {
    id: 'bcg-vaccine',
    name: 'BCG Vaccine',
    category: 'vaccine',
    status: 'preclinical',
    description:
      'Bacillus Calmette-Guérin tuberculosis vaccine. Shows ~45% dementia reduction in bladder cancer patients who receive repeated intravesical BCG.',
    mechanism:
      'BCG is the canonical trained immunity stimulus. Induces epigenetic reprogramming (H3K4me3, H3K9me3) of myeloid cells including microglia. Enhances metabolic flexibility and phagocytic capacity.',
    whyHopeful:
      'Shows the largest effect size of any vaccine for dementia protection (~45%). Demonstrates the power of trained immunity for neuroprotection. Well-established safety profile over 100 years of use.',
    evidence: [
      {
        trialName: 'Bladder cancer patient cohorts',
        trialPhase: 'Observational',
        primaryOutcome: 'Dementia incidence',
        result: '~45% reduction in dementia in patients receiving repeated BCG instillations',
        limitation: 'Specific population (bladder cancer); may not generalize',
      },
    ],
    cost: 'Very low (generic)',
    availability: 'Not routinely used for dementia prevention; research ongoing',
    caveats: [
      'Bladder cancer cohort may not generalize to general population',
      'Route of administration matters (intravesical vs intradermal)',
      'No RCT for dementia indication',
      'Clinical trials for AD indication needed',
    ],
    sourceIds: ['bcg-dementia-2023'],
  },

  {
    id: 'rsv-vaccines',
    name: 'RSV Vaccines (Arexvy, Abrysvo)',
    category: 'vaccine',
    status: 'evidence_based',
    description:
      'Newly approved RSV vaccines for older adults. Early data shows 29% reduction in dementia diagnoses.',
    mechanism:
      'Both adjuvanted (Arexvy) and unadjuvanted (Abrysvo) vaccines show protection. This reinforces trained immunity as the unifying mechanism: vaccination induces epigenetic reprogramming of innate immune cells that persists for years, enhancing their ability to respond to neuroinflammatory challenges.',
    whyHopeful:
      'Further confirms that vaccines in general protect the aging brain via trained immunity. The fact that both adjuvanted and unadjuvanted RSV vaccines show benefit proves the mechanism is not adjuvant-specific.',
    evidence: [
      {
        trialName: 'Early observational data 2024-2025',
        trialPhase: 'Observational',
        primaryOutcome: 'Dementia diagnoses',
        result: '29% reduction in dementia diagnoses in vaccinated individuals',
        limitation: 'Very new vaccines; limited follow-up time',
      },
    ],
    cost: '~$200-300 per dose',
    availability: 'FDA approved 2023; recommended for adults 60+',
    caveats: [
      'Very new vaccines - long-term data limited',
      'Observational data only so far',
      'Mechanism of protection unclear',
      'Cost may be barrier for some',
    ],
    sourceIds: ['rsv-dementia-2025'],
  },

  // ============================================
  // EVIDENCE-BASED LIFESTYLE INTERVENTIONS
  // ============================================
  {
    id: 'exercise',
    name: 'Regular Physical Exercise',
    category: 'lifestyle',
    status: 'evidence_based',
    description:
      'Moderate aerobic exercise, even modest amounts like walking 3,000-5,000 steps daily.',
    mechanism:
      'Improves cerebral blood flow, enhances mitochondrial function, reduces inflammation, may enhance glymphatic clearance, and promotes BDNF release.',
    whyHopeful:
      'Addresses multiple upstream mechanisms (vascular, mitochondrial, inflammatory). Large epidemiological evidence. FINGER trial showed cognitive benefits. No side effects.',
    evidence: [
      {
        trialName: 'FINGER',
        trialPhase: 'RCT',
        participants: 1260,
        duration: '2 years',
        primaryOutcome: 'Cognitive function',
        result:
          'Multidomain intervention (including exercise) improved cognitive scores in at-risk elderly',
      },
      {
        trialName: 'Nature Medicine 2025',
        trialPhase: 'Cohort study',
        primaryOutcome: 'Cognitive decline in amyloid-positive individuals',
        result:
          '3,000-5,000 steps/day delayed decline by 3 years; 5,000-7,500 steps by 7 years',
      },
      {
        trialName: 'Johns Hopkins 2025',
        trialPhase: 'Cohort study',
        primaryOutcome: 'Dementia incidence',
        result:
          'Just 35 min/week of moderate-vigorous activity associated with 41% lower dementia risk',
      },
    ],
    cost: 'Free',
    availability: 'Available to everyone',
    caveats: [
      'Observational data; causation not proven',
      'May not reverse existing disease',
      'Benefits likely greatest for prevention',
    ],
    sourceIds: ['finger-study-2015', 'exercise-nature-2025'],
  },

  {
    id: 'mediterranean-diet',
    name: 'Mediterranean / MIND Diet',
    category: 'lifestyle',
    status: 'evidence_based',
    description:
      'Dietary pattern emphasizing vegetables, fruits, whole grains, fish, olive oil, and limiting red meat and processed foods. MIND diet adds emphasis on berries and leafy greens.',
    mechanism:
      'Anti-inflammatory, antioxidant, supports vascular health, provides omega-3 fatty acids and polyphenols that may support brain health.',
    whyHopeful:
      'Addresses metabolic and vascular frameworks. Large observational studies show 30-53% reduced AD risk. Inexpensive and broadly accessible.',
    evidence: [
      {
        trialName: 'Meta-analysis 2024',
        trialPhase: 'Meta-analysis',
        primaryOutcome: 'AD incidence',
        result: '30% reduction in Alzheimer\'s incidence with Mediterranean diet adherence',
      },
      {
        trialName: 'Rush MIND study',
        trialPhase: 'Observational',
        participants: 923,
        duration: '4.5 years average',
        primaryOutcome: 'AD incidence',
        result:
          'High MIND adherence: 53% lower AD risk; moderate adherence: 35% lower risk',
      },
      {
        trialName: 'MIND Diet RCT',
        trialPhase: 'Phase 3 RCT',
        participants: 604,
        duration: '3 years',
        primaryOutcome: 'Cognitive change',
        result:
          'Both MIND diet and calorie-restricted control showed similar cognitive improvements',
        limitation: 'Control group also improved; may need longer follow-up',
      },
    ],
    cost: 'Varies; generally affordable',
    availability: 'Available to everyone',
    caveats: [
      'RCT did not show superiority over caloric restriction',
      'Observational benefits may reflect overall healthy lifestyle',
      'Adherence can be challenging',
    ],
    sourceIds: ['mind-diet-meta-2024', 'mind-diet-rct-2023'],
  },

  {
    id: 'sleep-optimization',
    name: 'Sleep Optimization',
    category: 'lifestyle',
    status: 'evidence_based',
    description:
      'Prioritizing 7-8 hours of quality sleep, addressing sleep disorders like apnea, and optimizing deep (slow-wave) sleep.',
    mechanism:
      'Deep sleep activates the glymphatic system for brain waste clearance. Sleep deprivation increases amyloid and tau accumulation.',
    whyHopeful:
      'Directly targets clearance mechanisms. Observational data shows sleep quality predicts AD risk. Addresses a modifiable risk factor.',
    evidence: [
      {
        trialName: 'Nedergaard lab',
        trialPhase: 'Preclinical',
        primaryOutcome: 'Brain clearance rates',
        result:
          'Sleep increases brain waste clearance by ~60% in mice compared to waking',
      },
      {
        trialName: 'Observational studies',
        trialPhase: 'Epidemiological',
        primaryOutcome: 'AD biomarkers',
        result:
          'Poor sleep quality associated with higher amyloid levels in cognitively normal individuals',
      },
    ],
    cost: 'Free (behavior change); varies for sleep disorder treatment',
    availability: 'Available to everyone',
    caveats: [
      'Glymphatic theory recently debated,mechanisms may be more complex',
      'Causation vs correlation unclear',
      'Sleep disorders may be early AD symptom, not cause',
    ],
    sourceIds: ['glymphatic-sleep-2013', 'sleep-amyloid-2017'],
  },

  {
    id: 'cognitive-engagement',
    name: 'Cognitive Engagement & Social Connection',
    category: 'lifestyle',
    status: 'evidence_based',
    description:
      'Maintaining cognitive stimulation through learning, puzzles, social interaction, and mentally engaging activities.',
    mechanism:
      'Builds cognitive reserve,the brain\'s resilience to pathology. Social engagement may reduce stress and inflammation.',
    whyHopeful:
      'Part of successful FINGER intervention. Large observational evidence. Addresses the "use it or lose it" principle.',
    evidence: [
      {
        trialName: 'FINGER',
        trialPhase: 'RCT',
        primaryOutcome: 'Cognitive function',
        result:
          'Multidomain intervention including cognitive training improved outcomes',
      },
      {
        trialName: 'Observational meta-analyses',
        trialPhase: 'Meta-analysis',
        primaryOutcome: 'Dementia risk',
        result:
          'Higher cognitive engagement and social connection associated with lower dementia risk',
      },
    ],
    cost: 'Free to low cost',
    availability: 'Available to everyone',
    caveats: [
      'Difficult to isolate from other healthy behaviors',
      '"Brain training" games have limited evidence',
      'Quality of engagement may matter more than quantity',
    ],
    sourceIds: ['finger-study-2015'],
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getDevelopmentsByCategory(category: DevelopmentCategory): HopefulDevelopment[] {
  return hopefulDevelopments.filter(d => d.category === category);
}

export function getDevelopmentsByStatus(status: DevelopmentStatus): HopefulDevelopment[] {
  return hopefulDevelopments.filter(d => d.status === status);
}

export function getApprovedTreatments(): HopefulDevelopment[] {
  return hopefulDevelopments.filter(d => d.status === 'fda_approved');
}

export function getLifestyleInterventions(): HopefulDevelopment[] {
  return hopefulDevelopments.filter(d => d.category === 'lifestyle');
}

export function getPipelineDrugs(): HopefulDevelopment[] {
  return hopefulDevelopments.filter(
    d => d.category === 'pipeline_drug' || d.category === 'device_therapy'
  );
}

export function getVaccines(): HopefulDevelopment[] {
  return hopefulDevelopments.filter(d => d.category === 'vaccine');
}

// Summary statistics for the hopeful section
export function getHopeSummary() {
  return {
    approvedTreatments: getApprovedTreatments().length,
    pipelineApproaches: getPipelineDrugs().length,
    lifestyleInterventions: getLifestyleInterventions().length,
    keyMessage:
      'For the first time, we have FDA-approved treatments that slow decline. More approaches targeting upstream mechanisms are in development. And evidence-based lifestyle interventions are available to everyone today.',
  };
}
