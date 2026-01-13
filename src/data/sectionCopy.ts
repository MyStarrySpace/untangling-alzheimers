// Section Copy for the Alzheimer's Market Visualization
// Dramatic narrative content for each section

// ============================================
// INTRO / HISTORY SECTION
// (NEW: Goes between Hero and InvestmentWaterfall)
// ============================================

export const introHistoryCopy = {
  sectionId: 'history',
  title: '120 Years in Search of a Cure',
  subtitle: 'The story of a disease, a hypothesis, and the ideas that were left behind.',

  // Opening hook - dramatic narrative
  openingNarrative: `In 1906, a German psychiatrist stood before 88 colleagues and described something no one had ever documented: strange clumps and tangled fibers in the brain of a deceased patient named Auguste Deter.

The audience, eager for the next talk, sent him away without a single question.

He had just described a disease that would one day affect 55 million people.`,

  // The mystery
  mysteryNarrative: `For 80 years, no one knew what the plaques were made of.

Then, in 1984, two biochemists isolated a small protein—just 4 kilodaltons—and gave it a name: Aβ.

A target had emerged.`,

  // The hypothesis
  hypothesisNarrative: `In 1992, a one-page paper in *Science*, written in about a week, proposed a simple idea:

**Amyloid causes Alzheimer's. Remove the plaques, cure the disease.**

It was elegant. It was testable. It was fundable.

The field locked in.`,

  // The dissidents
  dissidentsNarrative: `But not everyone agreed.

Within a year, a researcher proposed that reduced blood flow—not amyloid—initiated the disease. His work was marginalized.

Over the next decade, others followed. One proposed mitochondrial failure. Another, brain insulin resistance. Each proposed amyloid as a consequence, not a cause.

Each was underfunded.`,

  // The billion-dollar bet
  betNarrative: `From 2002 to 2024, pharmaceutical companies and the NIH bet over $50 billion on the amyloid hypothesis.

The result?

**99.6% of clinical trials failed.**

The drugs successfully removed amyloid from the brain. The patients didn't get better.

Something was wrong with the theory.`,

  // The reckoning
  reckoningNarrative: `In 2022, a landmark paper that had shaped 16 years of amyloid research was exposed as likely fraudulent.

That same year, new research showed plaques form *inside* neurons—not outside—from the failure of the cell's recycling machinery.

In 2023, a *Nature* paper demonstrated that myelin breakdown drives amyloid deposition, not vice versa.

The frameworks the field ignored may have been right all along.`,

  // Closing
  closingNarrative: `What follows is the story of how this happened—and what it means for the 55 million people living with Alzheimer's today.

This is not just a failure of science.

**This is a failure of markets.**`,

  // Stat callouts for visual emphasis
  statCallouts: [
    {
      number: '1906',
      label: 'First Case Described',
      context: 'Alois Alzheimer presents Auguste Deter',
    },
    {
      number: '1992',
      label: 'Amyloid Hypothesis Formalized',
      context: 'One paper shapes 30 years of research',
    },
    {
      number: '99.6%',
      label: 'Clinical Trial Failure Rate',
      context: 'Since 2002',
    },
    {
      number: '5+',
      label: 'Alternative Frameworks Marginalized',
      context: 'Most point to upstream causes',
    },
  ],
};

// ============================================
// SIDELINED FRAMEWORKS SECTION
// (Replaces "Sidelined Researchers" section)
// ============================================

export const sidelinedFrameworksCopy = {
  sectionId: 'sidelined-frameworks',
  title: 'The Sidelined Frameworks',
  subtitle: 'For every dollar spent on amyloid, a penny went to these alternatives.',

  // Intro copy
  introCopy: `The amyloid cascade hypothesis wasn't the only idea. It wasn't even the best-supported idea for explaining the 95% of Alzheimer's cases that aren't caused by rare genetic mutations.

But it was the most fundable.

Alternative frameworks emerged throughout the 1990s and 2000s. Each proposed that amyloid was downstream—a consequence of earlier failures in blood flow, metabolism, energy production, or cellular cleanup.

Each pointed to interventions that were cheap, generic, or unpatentable.

Each was marginalized.`,

  // Framework comparison header
  comparisonHeader: 'What the Field Funded vs. What It Ignored',

  // The dominant framework callout
  dominantFramework: {
    name: 'Amyloid Cascade Hypothesis',
    status: 'DOMINANT',
    yearProposed: 1992,
    fundingShare: '~50% of NIH AD funding',
    coreClaim: 'Remove the plaques, cure the disease.',
    result: '99.6% trial failure rate',
    drugCost: '$26,500–$32,000/year',
    color: 'danger', // Red in the design system
  },

  // The marginalized frameworks intro
  marginalizedIntro: `Meanwhile, these frameworks received a fraction of the funding:`,

  // Transition to timeline
  timelineTransition: `To understand how this happened, we need to go back to the beginning.`,

  // Key message box
  keyMessage: {
    title: 'The Pattern',
    content: `Every marginalized framework has something in common: they propose that amyloid accumulation is a downstream consequence of earlier failures—not the root cause.

If they're right, targeting amyloid is like mopping the floor while the pipe is still leaking.

Most propose interventions that are cheap, generic, or lifestyle-based. They cannot generate the returns pharmaceutical companies require.

**This is not a conspiracy. It's an incentive structure.**`,
  },
};

// ============================================
// TIMELINE SECTION COPY
// (Visual timeline of the history)
// ============================================

export const timelineSectionCopy = {
  sectionId: 'timeline',
  title: 'A Century of Alzheimer\'s Research',
  subtitle: 'The discoveries, the hypothesis, and the ideas that were left behind.',

  // Era descriptions for timeline sections
  eraDescriptions: {
    origin: {
      title: 'The Discovery',
      years: '1906–1983',
      description: 'A disease is named, but its molecular cause remains unknown for nearly 80 years.',
      mood: 'neutral',
    },
    molecular: {
      title: 'The Target Emerges',
      years: '1984–1991',
      description: 'Aβ is identified. Genetic mutations seem to confirm its role.',
      mood: 'hopeful',
    },
    hypothesis: {
      title: 'The Hypothesis Takes Hold',
      years: '1992–1999',
      description: 'The amyloid cascade hypothesis is formalized. The field aligns behind a single theory.',
      mood: 'confident',
    },
    alternatives: {
      title: 'The Dissidents',
      years: '2000–2009',
      description:
        'Researchers propose vascular, metabolic, and mitochondrial causes. Their work is marginalized.',
      mood: 'conflicted',
    },
    failures: {
      title: 'The Failures Mount',
      years: '2010–2019',
      description: 'Trial after trial fails. The 99% failure rate becomes undeniable. The field doubles down.',
      mood: 'troubled',
    },
    reckoning: {
      title: 'The Reckoning',
      years: '2020–Present',
      description: 'Fraud exposed. Controversial approvals. New evidence suggests the sidelined frameworks were right.',
      mood: 'revelatory',
    },
  },

  // Closing statement after timeline
  closingStatement: `120 years after Alois Alzheimer's discovery, we still have no cure.

The question is no longer whether the amyloid hypothesis is incomplete.

The question is: **what do we do about it?**`,
};

// ============================================
// INVESTMENT ASYMMETRY SECTION COPY
// (Updated to flow from the history section)
// ============================================

export const investmentAsymmetryCopy = {
  sectionId: 'investment-asymmetry',
  title: 'The Investment Asymmetry',
  subtitle: 'The drugs that receive investment are selected based on patent status, not scientific promise.',

  // Transition from history
  transitionCopy: `Understanding the history explains the present.

The frameworks that proposed amyloid as downstream pointed to generic drugs, lifestyle interventions, and preventive measures.

The frameworks that proposed amyloid as the cause pointed to novel antibodies that could be patented.

Follow the money.`,

  // The visual comparison setup
  comparisonSetup: `Over the past two decades, here's where the money went:`,

  // Patented side
  patentedSide: {
    label: 'Patented Approaches',
    amount: '$50+ Billion',
    examples: ['Lecanemab', 'Donanemab', 'Aducanumab'],
    outcome: '27–35% slowing at best',
    costToPatient: '$26,500–$32,000/year',
  },

  // Generic side
  genericSide: {
    label: 'Generic Approaches',
    amount: '~$50 Million',
    examples: ['Lithium', 'Intranasal insulin', 'Antihypertensives', 'Valacyclovir'],
    outcome: 'Underfunded—we don\'t know',
    costToPatient: '<$500/year',
  },

  // The ratio callout
  ratioCallout: {
    ratio: '1000:1',
    explanation: 'For every dollar spent on generic approaches, $1,000 went to patented drugs.',
  },

  // Key insight
  keyInsight: `This isn't because patented drugs are more promising.

It's because they can generate returns for investors.

**This is market failure, not scientific consensus.**`,
};

// ============================================
// HOPEFUL DEVELOPMENTS SECTION
// (NEW: Goes at the end, before final call-to-action)
// ============================================

export const hopefulDevelopmentsCopy = {
  sectionId: 'hopeful-developments',
  title: 'Reasons for Hope',
  subtitle: 'What\'s working, what\'s promising, and what you can do today.',

  // Opening - acknowledge the difficult story
  openingNarrative: `The story so far has been sobering. Decades of misdirected investment. Sidelined researchers. A 99% failure rate.

But 2023 and 2024 marked a turning point.

For the first time in history, we have FDA-approved treatments that demonstrably slow cognitive decline. New approaches are entering clinical trials. And evidence-based lifestyle interventions are available to everyone—today.

**This is not a story without hope.**`,

  // Section: What's Working Now
  workingNow: {
    title: 'What\'s Working Now',
    subtitle: 'FDA-approved treatments that slow decline',
    introCopy: `After decades of failure, the first disease-modifying treatments have arrived. They're not cures—but they represent real progress.`,
    treatments: [
      {
        name: 'Lecanemab (Leqembi)',
        status: 'FDA Approved 2023',
        result: '27% slowing of cognitive decline',
        caveat: 'Only for early-stage AD; requires regular MRI monitoring',
        cost: '~$26,500/year',
      },
      {
        name: 'Donanemab (Kisunla)',
        status: 'FDA Approved 2024',
        result: '35% slowing of decline; 47% showed no decline at 1 year',
        caveat: 'Higher side effect rate; only for early-stage AD',
        cost: '~$32,000/year',
      },
    ],
    honestAssessment: `These drugs slow decline by roughly a third—meaningful, but modest. Patients still decline. Side effects can be serious. They only work for early-stage disease.

But they prove something important: **disease modification is possible.**`,
  },

  // Section: What's Promising
  promising: {
    title: 'What\'s Promising',
    subtitle: 'Approaches in clinical trials and emerging research',
    introCopy: `Beyond amyloid-targeting drugs, several innovative approaches are showing promise:`,
    approaches: [
      {
        name: '40Hz Gamma Entrainment (GENUS)',
        type: 'Device therapy',
        status: 'Phase 3 trial underway',
        whyExciting: 'Non-drug approach using light and sound. A decade of MIT research shows multiple mechanisms of benefit. Could be very low cost.',
        keyResult: 'Small human studies show less brain atrophy, improved memory, and potential long-term benefit.',
      },
      {
        name: 'Lithium Orotate (Low-dose)',
        type: 'Supplement',
        status: 'Clinical trials planned',
        whyExciting: '2025 Nature paper showed dramatic reversal of memory loss in mice at 1/1000th the psychiatric dose—without toxicity.',
        keyResult: 'First evidence that lithium deficiency may contribute to AD. Human trials needed.',
        caveat: 'Do NOT self-treat. Wait for clinical trial results to establish safe, effective doses.',
      },
      {
        name: 'App^NL-G-F Mouse Model',
        type: 'Research tool',
        status: 'Widely adopted',
        whyExciting: 'Better preclinical models may reduce the 99% failure rate by avoiding artifacts that misled previous research.',
        keyResult: 'More accurately models human disease without overexpression artifacts.',
      },
    ],
    whatFailed: {
      title: 'Learning from Failure',
      introCopy: 'Not everything promising pans out. Recent failures also teach us:',
      failures: [
        {
          name: 'Oral Semaglutide',
          result: 'Phase 3 EVOKE trials failed to slow cognitive decline despite biomarker improvements.',
          lesson: 'The drug has poor blood-brain barrier penetration (~1%). The metabolic hypothesis may still be valid, but requires drugs that actually reach the brain.',
        },
        {
          name: 'Valacyclovir',
          result: 'VALAD trial showed antiviral group did WORSE than placebo.',
          lesson: 'The viral hypothesis, at least via this approach, appears to be incorrect.',
        },
      ],
    },
  },

  // Section: What You Can Do Today
  actionable: {
    title: 'What You Can Do Today',
    subtitle: 'Evidence-based lifestyle interventions—available to everyone',
    introCopy: `While we wait for better drugs, compelling evidence supports lifestyle interventions that address the upstream mechanisms the sidelined frameworks identified.

These aren't silver bullets. But they're free (or cheap), available now, and address multiple pathways simultaneously.`,
    interventions: [
      {
        name: 'Regular Physical Exercise',
        evidenceStrength: 'Strong',
        keyFinding: 'Walking 3,000-5,000 steps/day delayed cognitive decline by 3 years. 5,000-7,500 steps delayed it by 7 years.',
        mechanism: 'Improves cerebral blood flow, mitochondrial function, reduces inflammation.',
        practical: 'Even 35 minutes/week of moderate activity associated with 41% lower dementia risk.',
        cost: 'Free',
      },
      {
        name: 'Mediterranean / MIND Diet',
        evidenceStrength: 'Moderate-Strong',
        keyFinding: 'Meta-analyses show 30% reduced AD incidence. Observational studies show up to 53% reduction with strict adherence.',
        mechanism: 'Anti-inflammatory, supports vascular health, provides brain-protective nutrients.',
        practical: 'Emphasize vegetables, fruits, fish, olive oil, berries, leafy greens. Limit red meat and processed foods.',
        cost: 'Varies; generally affordable',
        caveat: 'RCT did not show superiority over caloric restriction. Benefits may come from overall healthy eating.',
      },
      {
        name: 'Sleep Optimization',
        evidenceStrength: 'Moderate',
        keyFinding: 'Sleep activates glymphatic clearance—brain waste removal increases ~60% during sleep.',
        mechanism: 'Deep sleep promotes clearance of amyloid and tau. Poor sleep associated with higher amyloid levels.',
        practical: 'Prioritize 7-8 hours. Address sleep apnea. Maintain consistent sleep schedule.',
        cost: 'Free (behavior); varies for disorder treatment',
        caveat: 'Glymphatic mechanisms still being debated. Causation vs correlation unclear.',
      },
      {
        name: 'Cognitive & Social Engagement',
        evidenceStrength: 'Moderate',
        keyFinding: 'Part of successful FINGER intervention. Higher engagement associated with lower dementia risk.',
        mechanism: 'Builds cognitive reserve—the brain\'s resilience to pathology.',
        practical: 'Learn new skills, maintain social connections, engage in mentally stimulating activities.',
        cost: 'Free to low cost',
      },
    ],
    fingerStudy: {
      title: 'The FINGER Study: Proof of Concept',
      content: `In 2015, the Finnish FINGER trial demonstrated that a multidomain intervention—combining diet, exercise, cognitive training, and vascular risk management—improved cognitive function in at-risk elderly people.

This was the first methodologically robust trial showing lifestyle intervention can prevent cognitive decline at a population level.

Similar trials (U.S. POINTER, World Wide FINGERS) are now underway globally.`,
    },
  },

  // Closing
  closingNarrative: `The past century of Alzheimer's research has been marked by false starts, sunk costs, and sidelined ideas.

But we're not at the end of the story. We're at a turning point.

**The first disease-modifying drugs are here.** Novel approaches targeting upstream mechanisms are entering trials. And evidence-based lifestyle interventions are available to everyone, today.

The question isn't whether progress is possible.

The question is whether we'll invest in the full range of promising approaches—or keep betting everything on a single hypothesis.`,

  // Key statistics for visual display
  hopefulStats: [
    {
      number: '2',
      label: 'FDA-Approved Disease-Modifying Drugs',
      context: 'For the first time in history',
    },
    {
      number: '27-35%',
      label: 'Slowing of Cognitive Decline',
      context: 'Proven in Phase 3 trials',
    },
    {
      number: '3-7 years',
      label: 'Cognitive Decline Delayed',
      context: 'With regular walking (3,000-7,500 steps/day)',
    },
    {
      number: '30-53%',
      label: 'Reduced AD Risk',
      context: 'With Mediterranean/MIND diet adherence',
    },
  ],
};

// ============================================
// EXPORT ALL COPY
// ============================================

export const allSectionCopy = {
  introHistory: introHistoryCopy,
  sidelinedFrameworks: sidelinedFrameworksCopy,
  timeline: timelineSectionCopy,
  investmentAsymmetry: investmentAsymmetryCopy,
  hopefulDevelopments: hopefulDevelopmentsCopy,
};
