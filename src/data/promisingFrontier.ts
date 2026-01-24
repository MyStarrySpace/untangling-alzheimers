export interface PromisingDrug {
  id: string;
  drug: string;
  mechanism: string;
  mechanismCategory: 'lysosomal' | 'tau' | 'inflammatory' | 'viral' | 'immune';
  evidenceStrength: 1 | 2 | 3 | 4 | 5;
  keyEvidence: string;
  quote: string;
  quoteSource: string;
  whyItMatters: string;
  keyCaveat: string;
  status: string;
  costPerMonth: string;
  decisiveTrial: string;
  citationIds: string[];
}

export const promisingFrontierData: PromisingDrug[] = [
  {
    id: 'rapamycin',
    drug: 'Rapamycin (Sirolimus)',
    mechanism: 'mTORC1 inhibitor',
    mechanismCategory: 'lysosomal',
    evidenceStrength: 3,
    keyEvidence:
      'Phase 1 study completed: 8 weeks of low-dose rapamycin (1mg/day) in MCI/AD showed safety and tolerability. 12-month feasibility trial ongoing.',
    quote:
      'This is the cleanest pharmacologic probe of mTORC1 → TFEB → lysosomal cascade. Unlike many "metabolic" candidates, rapamycin is a direct mTORC1 inhibitor with a long clinical history.',
    quoteSource: 'Mechanistic analysis',
    whyItMatters:
      "Targets a central control node (mTORC1 → TFEB → lysosome function), not a downstream proxy. If it moves the right intermediate markers, you don't need to guess the lever.",
    keyCaveat:
      "Pleiotropic effects; positive results won't uniquely validate mechanism without pre-specified mediation endpoints. CNS engagement difficult to measure.",
    status: 'Phase 1 complete; 12-month trial ongoing',
    costPerMonth: '~$30 generic',
    decisiveTrial:
      'Short biomarker trial with CSF/plasma lysosome/autophagy markers + pTau/NfL trend as primary endpoints, cognition exploratory.',
    citationIds: ['rapamycin-phase1-2025', 'rapamycin-feasibility-nct'],
  },
  {
    id: 'lithium-microdose',
    drug: 'Microdose Lithium',
    mechanism: 'GSK-3β inhibitor',
    mechanismCategory: 'tau',
    evidenceStrength: 3,
    keyEvidence:
      'The Nunes microdose lithium trial showed stabilized cognitive impairment in amnestic MCI patients. Nature 2025 paper discusses lithium and AD, noting lower concentrations may be where signal lives.',
    quote:
      'Microdose lithium treatment stabilized cognitive impairment in elderly individuals with amnestic mild cognitive impairment.',
    quoteSource: 'Nunes et al., 2013',
    whyItMatters:
      'Direct perturbation of a key node (GSK-3β / tau phosphorylation dynamics). Unlike many supplements, it has a literature spine and real human precedent.',
    keyCaveat:
      "Lithium is pleiotropic—if it helps, won't know if it's GSK-3β, neurotrophic effects, inflammation, or sleep/circadian. Small-trial results need modern replication.",
    status: 'Small RCT positive; needs larger biomarker-anchored replication',
    costPerMonth: '~$10 supplement',
    decisiveTrial:
      'Tau-forward enrichment trial (amyloid+/tau+) with plasma/CSF pTau species and NfL as primary endpoints.',
    citationIds: ['nunes-lithium-2013', 'nature-lithium-2025'],
  },
  {
    id: 'colchicine',
    drug: 'Colchicine',
    mechanism: 'NLRP3-adjacent anti-inflammatory',
    mechanismCategory: 'inflammatory',
    evidenceStrength: 2,
    keyEvidence:
      "Pilot AD study showed tolerability. Modern CV trials (COLCOT, LoDoCo2) built cardiovascular outcomes credibility. Low-dose likely doesn't worsen cognition based on other populations.",
    quote:
      'One of the few cheap anti-inflammatories that has real modern cardiovascular outcomes credibility.',
    quoteSource: 'AlzDiscovery analysis',
    whyItMatters:
      'Cheap, well-characterized, and plausibly hits NLRP3-adjacent inflammatory machinery. If inflammation is part of the causal chain, colchicine is a fundable test.',
    keyCaveat:
      "Not a selective CNS NLRP3 inhibitor. Cardiology momentum may not translate to AD. Endpoint mismatch risk high—vascular/inflammatory benefits may not show on 18-month cognitive scales.",
    status: 'Pilot AD safety data; no modern efficacy trial',
    costPerMonth: '~$4 generic',
    decisiveTrial:
      'Vascular + inflammation enrichment trial in AD/MCI with high WMH burden. Primary: WMH progression + inflammatory biomarkers, not ADAS-cog.',
    citationIds: ['colchicine-pilot-mssm', 'alzdiscovery-colchicine'],
  },
  {
    id: 'valacyclovir',
    drug: 'Valacyclovir',
    mechanism: 'HSV antiviral',
    mechanismCategory: 'viral',
    evidenceStrength: 1,
    keyEvidence:
      'Columbia 2024: Treatment trial in HSV+ early AD showed NO benefit vs placebo on cognition or biomarkers over ~78 weeks. The "clean test" appears negative for treatment.',
    quote:
      "Antiviral treatment fails to slow early-stage Alzheimer's and cannot be recommended for that use case.",
    quoteSource: 'Columbia Irving Medical Center, 2024',
    whyItMatters:
      'This is intellectual honesty in action. The infection hypothesis was testable, the test was run in the right subgroup (HSV+), and it came back negative. Prevention remains theoretically interesting but practically untestable.',
    keyCaveat:
      'Treatment hypothesis largely negative. Prevention trials would require huge N, long follow-up, and big cost—exactly the trial nobody funds. May now be a weak "graveyard" candidate.',
    status: 'Treatment trial FAILED (Columbia 2024)',
    costPerMonth: '~$20 generic',
    decisiveTrial:
      'Prevention trial (if fundable): long-term antiviral after herpes infection to prevent AD onset. Economically brutal.',
    citationIds: ['columbia-valacyclovir-2024', 'beingpatient-valacyclovir'],
  },
  {
    id: 'vaccines-trained-immunity',
    drug: 'Vaccines (Trained Immunity)',
    mechanism: 'Trained immunity / microglial reprogramming',
    mechanismCategory: 'immune',
    evidenceStrength: 3,
    keyEvidence:
      'Multiple vaccines show 17-45% dementia reduction: Shingrix (17-18%), Zostavax (17%), BCG (~45%), RSV vaccines (29%). Critically, BOTH adjuvanted AND non-adjuvanted vaccines protect equally, proving trained immunity is the mechanism.',
    quote:
      'Zostavax (live-attenuated, NO adjuvant) showed 2.0 percentage point reduction over 5.5 years via quasi-randomized design, ruling out adjuvant-specific mechanisms.',
    quoteSource: 'Pomirchy et al., Lancet Neurol 2026',
    whyItMatters:
      'Trained immunity reprograms innate immune cells (including microglia) via epigenetic modifications that persist for years. This is immediately actionable: vaccines are FDA-approved, widely available, and already given to millions.',
    keyCaveat:
      'Observational data only—not RCTs. Effect could be healthy vaccinee bias. Mechanism (epigenetic reprogramming of microglia → enhanced clearance/reduced neuroinflammation) plausible but not proven.',
    status: 'Large observational studies; FDA-approved for other indications',
    costPerMonth: '~$150-200 (2-dose series for Shingrix)',
    decisiveTrial:
      'RCT of any vaccine in dementia-enriched population with CSF inflammatory markers, microglial imaging (TSPO-PET), and cognitive endpoints.',
    citationIds: ['pomirchy-zostavax-2026', 'taquet-as01-2025'],
  },
  {
    id: 'sri-011381',
    drug: 'SRI-011381 (C381)',
    mechanism: 'v-ATPase activator + TGF-β1 agonist',
    mechanismCategory: 'lysosomal',
    evidenceStrength: 4,
    keyEvidence:
      '11+ independent validation studies across AD (5xFAD, 3xTG), PD (MPTP), MS (EAE), and TBI models. Human AD neurons show 20-46% reduction in intracellular Aβ42. IND-enabling toxicology complete since 2022.',
    quote:
      'C381 isn\'t abandoned—it\'s waiting for the right delivery technology. The TGF-β pathway is neuroprotective in brain but pro-fibrotic peripherally.',
    quoteSource: 'Mechanistic analysis',
    whyItMatters:
      'Dual mechanism targets lysosomal dysfunction (v-ATPase → acidification) AND microglial clearance (TGF-β1 → TMEM119 → Aβ phagocytosis). Works even in mid-stage disease. Oral, brain-penetrant, IND-ready.',
    keyCaveat:
      'TGF-β agonism is a double-edged sword: neuroprotective in brain but pro-fibrotic in peripheral organs. Oral systemic delivery may cause peripheral fibrosis with chronic use—brain-selective delivery needed.',
    status: 'IND-ready; founders building QinoTrans BBB platform for brain-selective delivery',
    costPerMonth: 'Unknown (small molecule economics favorable)',
    decisiveTrial:
      'Phase 1 safety trial using brain-targeted delivery (QinoTrans or similar) to avoid peripheral TGF-β activation. Eli Lilly partnership (Oct 2024) validates BBB platform approach.',
    citationIds: [
      'vest-2022-pnas',
      'liu-2025-immunity',
      'chou-2025-nature-cell-bio',
      'qinotrans-lilly-2024',
    ],
  },
];
