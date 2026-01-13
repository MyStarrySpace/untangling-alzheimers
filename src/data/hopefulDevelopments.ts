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
  | 'supplement'; // Supplements with clinical evidence

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
        primaryOutcome: 'Change in CDR-SB (Clinical Dementia Rating)',
        result: '27% slowing of cognitive decline vs placebo',
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
    availability: 'FDA approved January 2023 (accelerated), July 2024 (traditional)',
    caveats: [
      '27% slowing is modest—patients still decline',
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
    description:
      'Monoclonal antibody targeting a modified form of Aβ (N3pG). Can be stopped once amyloid is cleared.',
    mechanism:
      'Targets pyroglutamate Aβ, a modified form found primarily in plaques. Designed for time-limited treatment.',
    whyHopeful:
      'Showed 35% slowing of decline—the best result for any amyloid-targeting drug. Unique "treat to clear" approach may allow stopping therapy.',
    evidence: [
      {
        trialName: 'TRAILBLAZER-ALZ 2',
        trialPhase: 'Phase 3',
        participants: 1736,
        duration: '18 months',
        primaryOutcome: 'iADRS (integrated Alzheimer\'s Disease Rating Scale)',
        result: '35% slowing of decline; 47% showed no decline at 1 year vs 29% placebo',
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
      'Previous GLP-1 trials failed—hypothesis may be wrong OR drug delivery was inadequate',
      'Blood-brain barrier penetration is the key limitation',
      'Tirzepatide (GLP-1/GIP dual agonist) trials ongoing—may have better CNS effects',
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
      'Do not self-treat—wait for clinical trial results',
      'Supplement quality varies',
    ],
    sourceIds: ['lithium-orotate-2025'],
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
      'Still a mouse model—may not translate to humans',
      'Only models amyloid pathology, not full AD complexity',
    ],
    sourceIds: ['appnlgf-saido-2014'],
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
      'Glymphatic theory recently debated—mechanisms may be more complex',
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
      'Builds cognitive reserve—the brain\'s resilience to pathology. Social engagement may reduce stress and inflammation.',
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
