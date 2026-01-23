// Post-Infectious Neurodegeneration Risk Data
// Captures the ME/CFS-AD connection, COVID dementia risk, and vaccine protection

export interface RiskEvidence {
  study: string;
  year: number;
  finding: string;
  sampleSize?: number;
  effectSize?: string;
}

export interface PostInfectiousRisk {
  id: string;
  trigger: string;
  category: 'viral' | 'autoimmune' | 'reactivation';
  riskIncrease: string;
  timeframe: string;
  mechanism: string;
  evidence: RiskEvidence[];
  preventionOptions: string[];
  keyInsight?: string;
}

export interface ProtectiveFactor {
  id: string;
  intervention: string;
  category: 'vaccine' | 'treatment' | 'lifestyle';
  riskReduction: string;
  mechanism: string;
  evidence: RiskEvidence[];
  availability: string;
  caveats?: string[];
  keyInsight?: string;
}

export interface MECFSConnection {
  id: string;
  finding: string;
  sharedWith: string[];
  implication: string;
  evidence: RiskEvidence[];
}

// ============================================================================
// POST-VIRAL RISK FACTORS
// ============================================================================

export const postInfectiousRisks: PostInfectiousRisk[] = [
  {
    id: 'covid-19',
    trigger: 'COVID-19 Infection',
    category: 'viral',
    riskIncrease: '69% increased AD risk',
    timeframe: 'Within 1 year of infection',
    mechanism: `COVID-19 triggers a cascade leading to neurodegeneration:
1. Acute infection → systemic inflammation
2. Chronic immune activation (Long COVID in 10-30%)
3. GPCR autoantibody production
4. Vasoregulatory dysfunction → hypoperfusion
5. LDAM formation → neuroinflammation → AD pathology`,
    evidence: [
      {
        study: 'Wang 2022 (J Alzheimers Dis)',
        year: 2022,
        finding: 'COVID-19 was associated with significantly increased risk for new diagnosis of AD (HR 1.69, 95% CI 1.53-1.72)',
        sampleSize: 6245282,
        effectSize: 'HR 1.69',
      },
      {
        study: 'Yang 2026',
        year: 2026,
        finding: '59% increase in pTau-181 in Long COVID patients with CNS symptoms',
        effectSize: '59% increase',
      },
    ],
    preventionOptions: [
      'Vaccination reduces severe COVID and likely Long COVID risk',
      'Early treatment may reduce chronic inflammation',
      'BC007 (aptamer targeting GPCR-AABs) in Phase 2 trials',
    ],
    keyInsight: 'We may see a massive wave of early-onset AD in 10-20 years from Long COVID',
  },
  {
    id: 'vzv-reactivation',
    trigger: 'VZV Reactivation (Shingles)',
    category: 'reactivation',
    riskIncrease: '~20% increased dementia risk',
    timeframe: 'Years following reactivation',
    mechanism: `Varicella zoster virus reactivation (shingles) triggers:
- Neuroinflammation along affected nerves
- Potential spread to CNS
- Chronic immune activation
- Microvascular damage`,
    evidence: [
      {
        study: 'Multiple cohort studies',
        year: 2023,
        finding: 'Herpes zoster associated with increased dementia risk; prevented by vaccination',
      },
    ],
    preventionOptions: [
      'Zostavax (live attenuated) - 17% dementia reduction',
      'Shingrix (recombinant + AS01B adjuvant) - 17-18% reduction',
    ],
    keyInsight: 'Vaccination protects against dementia beyond just preventing shingles',
  },
  {
    id: 'ebv',
    trigger: 'EBV Infection/Reactivation',
    category: 'viral',
    riskIncrease: 'Associated with MS; AD link under investigation',
    timeframe: 'Decades (long latency)',
    mechanism: `EBV establishes lifelong latency and may contribute to neurodegeneration via:
- Molecular mimicry with CNS proteins
- Chronic B cell dysregulation
- Periodic reactivation triggering inflammation`,
    evidence: [
      {
        study: 'Bjornevik 2022 (Science)',
        year: 2022,
        finding: 'EBV infection increases MS risk 32-fold; AD connection being studied',
        effectSize: '32x MS risk',
      },
    ],
    preventionOptions: [
      'EBV vaccines in development (Moderna mRNA vaccine in Phase 1)',
      'Antiviral therapy for reactivation',
    ],
  },
];

// ============================================================================
// PROTECTIVE FACTORS (Vaccines, Trained Immunity)
// ============================================================================

export const protectiveFactors: ProtectiveFactor[] = [
  {
    id: 'zostavax',
    intervention: 'Zostavax (Live Attenuated VZV Vaccine)',
    category: 'vaccine',
    riskReduction: '17% dementia reduction',
    mechanism: `Zostavax contains NO adjuvant, yet still reduces dementia.
This suggests the antigen itself (or immune response to it) provides protection
via trained immunity - epigenetic reprogramming of innate immune cells.

Key question: Is protection from preventing VZV reactivation, or from
beneficial immune reprogramming?`,
    evidence: [
      {
        study: 'Pomirchy 2026',
        year: 2026,
        finding: 'Zostavax reduces dementia risk independent of herpes zoster prevention',
        effectSize: '17% reduction',
      },
    ],
    availability: 'Largely replaced by Shingrix but demonstrates adjuvant-independent effect',
    caveats: [
      'Live vaccine - not suitable for immunocompromised',
      'Less effective than Shingrix for shingles prevention',
      'Key scientific question: mechanism of protection unclear',
    ],
    keyInsight: 'Proves dementia protection can occur WITHOUT adjuvant',
  },
  {
    id: 'shingrix',
    intervention: 'Shingrix (Recombinant VZV + AS01B Adjuvant)',
    category: 'vaccine',
    riskReduction: '17-18% dementia reduction',
    mechanism: `Shingrix uses AS01B adjuvant containing:
- MPL (TLR4 agonist from bacterial lipid A)
- QS-21 (saponin from tree bark)

Likely works via trained immunity:
- TLR4 activation → microglial reprogramming
- Enhanced phagocytic capacity
- Improved Aβ clearance

Similar reduction to Zostavax despite different mechanism suggests
multiple pathways can achieve protection.`,
    evidence: [
      {
        study: 'Multiple studies 2023-2025',
        year: 2024,
        finding: 'Shingrix associated with 17-18% reduction in dementia risk',
        effectSize: '17-18% reduction',
      },
    ],
    availability: 'FDA approved; recommended for adults 50+',
    caveats: [
      'Two-dose series required',
      'More reactogenic than Zostavax (local reactions common)',
      'Cost may be barrier for some',
    ],
  },
  {
    id: 'bcg',
    intervention: 'BCG Vaccine',
    category: 'vaccine',
    riskReduction: '~45% dementia reduction in bladder cancer patients',
    mechanism: `BCG is the canonical trained immunity stimulus:
- Epigenetic reprogramming (H3K4me3, H3K9me3)
- Enhanced metabolic flexibility in myeloid cells
- Improved innate immune response to diverse pathogens

The ~45% reduction seen in bladder cancer patients (who receive
repeated intravesical BCG) suggests robust neuroprotection.`,
    evidence: [
      {
        study: 'Cohort studies in bladder cancer patients',
        year: 2023,
        finding: 'Repeated BCG instillation associated with ~45% reduced dementia',
        effectSize: '~45% reduction',
      },
    ],
    availability: 'Not routinely used for dementia prevention; research ongoing',
    caveats: [
      'Bladder cancer cohort may not generalize',
      'Route of administration matters (intravesical vs intradermal)',
      'Clinical trials for AD indication needed',
    ],
    keyInsight: 'Largest effect size of any vaccine - suggests trained immunity is powerful',
  },
  {
    id: 'rsv-vaccines',
    intervention: 'RSV Vaccines (Arexvy, Abrysvo)',
    category: 'vaccine',
    riskReduction: '29% dementia reduction',
    mechanism: `New RSV vaccines for older adults show dementia protection:
- Arexvy uses AS01B adjuvant (same as Shingrix)
- Abrysvo is unadjuvanted

Both show protection, supporting multiple mechanisms:
1. Preventing RSV infection reduces inflammatory burden
2. Vaccine-induced trained immunity
3. Cross-reactive immune responses`,
    evidence: [
      {
        study: 'Early observational data 2024-2025',
        year: 2025,
        finding: 'RSV vaccination associated with 29% reduction in dementia diagnoses',
        effectSize: '29% reduction',
      },
    ],
    availability: 'FDA approved 2023; recommended for adults 60+',
    caveats: [
      'Very new vaccines - long-term data limited',
      'Observational data only so far',
      'Mechanism of protection unclear',
    ],
  },
];

// ============================================================================
// ME/CFS-ALZHEIMER'S CONNECTION
// ============================================================================

export const mecfsConnections: MECFSConnection[] = [
  {
    id: 'gpcr-aab-signature',
    finding: 'Same GPCR autoantibody signature in ME/CFS, Long COVID, and AD',
    sharedWith: ['ME/CFS', 'Long COVID', 'Alzheimer\'s Disease'],
    implication: `The shared GPCR-AAB signature suggests these conditions may share
a common autoimmune mechanism. AD may be fundamentally an autoimmune
vascular disease rather than a primary proteinopathy.

91% of AD patients have GPCR-AABs vs only 33% in Lewy body dementia.
This distinguishes AD from other dementias and suggests different
underlying mechanisms.`,
    evidence: [
      {
        study: 'Wallukat 2018',
        year: 2018,
        finding: 'GPCR-AABs detected in 91% of AD patients vs 33% in LBD',
        effectSize: '91% vs 33%',
      },
      {
        study: 'Loebel/Scheibenbogen 2015',
        year: 2015,
        finding: 'Same GPCR-AAB profile in ME/CFS patients',
      },
    ],
  },
  {
    id: 'progression-risk',
    finding: 'ME/CFS may be on the same spectrum as AD',
    sharedWith: ['ME/CFS', 'Long COVID'],
    implication: `If ME/CFS and AD share the same underlying autoimmune mechanism,
ME/CFS patients may be at elevated risk for future AD.

This has major public health implications:
- ME/CFS affects 1-2% of population
- Long COVID has created millions of new cases
- 10-20 year lag before AD manifests`,
    evidence: [
      {
        study: 'Mechanistic inference',
        year: 2024,
        finding: 'Shared pathophysiology suggests shared long-term outcomes',
      },
    ],
  },
  {
    id: 'ad-vs-lbd',
    finding: 'AD vs Lewy Body Dementia may be fundamentally different diseases',
    sharedWith: ['AD subtyping', 'Precision medicine'],
    implication: `The GPCR-AAB data suggests:
- AD = autoimmune/vascular disease (91% GPCR-AABs)
- LBD = true proteinopathy (33% GPCR-AABs)

This has major implications for treatment:
- AD may respond to immunomodulation, vascular protection
- LBD may require different approaches
- Current trials conflating these diseases may fail`,
    evidence: [
      {
        study: 'Wallukat 2018',
        year: 2018,
        finding: 'Dramatic difference in GPCR-AAB prevalence between AD and LBD',
        effectSize: '91% vs 33%',
      },
    ],
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getRisksByCategory(category: 'viral' | 'autoimmune' | 'reactivation'): PostInfectiousRisk[] {
  return postInfectiousRisks.filter(r => r.category === category);
}

export function getProtectiveByCategory(category: 'vaccine' | 'treatment' | 'lifestyle'): ProtectiveFactor[] {
  return protectiveFactors.filter(p => p.category === category);
}

export function getVaccineProtection(): ProtectiveFactor[] {
  return protectiveFactors.filter(p => p.category === 'vaccine');
}

// Summary statistics
export function getPostInfectiousSummary() {
  const vaccines = getVaccineProtection();
  const avgReduction = vaccines.reduce((sum, v) => {
    const match = v.riskReduction.match(/(\d+)/);
    return sum + (match ? parseInt(match[1]) : 0);
  }, 0) / vaccines.length;

  return {
    covidRiskIncrease: '69%',
    vaccinesWithProtection: vaccines.length,
    averageVaccineProtection: `~${Math.round(avgReduction)}%`,
    keyMessage: 'Post-infectious autoimmunity may be a major driver of AD. Vaccines offer significant protection via trained immunity.',
  };
}
