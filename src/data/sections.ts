// Central source of truth for all section metadata
// Used by components, navigation, and anywhere section info is needed

export type ActNumber = 'I' | 'II' | 'III';

export interface SectionConfig {
  id: string;
  title: string;
  subtitle: string;
  navLabel: string;  // Short label for navigation
  act: ActNumber;
}

// All sections in order of appearance
export const sections: SectionConfig[] = [
  // Act I: The Paradox
  {
    id: 'paradox',
    title: 'The Investment Asymmetry',
    subtitle: 'The drugs that receive investment are selected based on patent status, not scientific promise.',
    navLabel: 'Investment',
    act: 'I',
  },
  {
    id: 'timeline',
    title: 'A Century of Search',
    subtitle: 'From the first case in 1906 to today\'s controversies: the long road that led us here.',
    navLabel: 'Timeline',
    act: 'I',
  },
  {
    id: 'trial-barriers',
    title: 'Why AD Trials Are Different',
    subtitle: 'Alzheimer\'s trials are 3-5x more expensive, take 2-3x longer, and have higher failure rates than almost any other disease.',
    navLabel: 'Trials',
    act: 'I',
  },

  // Act II: The System
  {
    id: 'system',
    title: 'The Failure Cascade',
    subtitle: 'Each market failure reinforces the others, creating a system that systematically excludes the most promising interventions.',
    navLabel: 'System',
    act: 'II',
  },
  {
    id: 'translational-failures',
    title: 'The Translation Gap',
    subtitle: 'Why promising treatments that work in animal models fail in human trials',
    navLabel: 'Models',
    act: 'II',
  },
  {
    id: 'forgotten-observations',
    title: 'The Forgotten Observations',
    subtitle: 'Half of what Alzheimer saw in 1907 was ignored for over a century—and it was the upstream half.',
    navLabel: 'Forgotten',
    act: 'II',
  },
  {
    id: 'cases',
    title: 'Case Studies in Market Failure',
    subtitle: 'Real stories of promising treatments that were abandoned not for scientific reasons, but economic ones.',
    navLabel: 'Cases',
    act: 'II',
  },

  // Act III: Reasons for Hope
  {
    id: 'hopeful-developments',
    title: 'Reasons for Hope',
    subtitle: 'For the first time in history, we have treatments that slow cognitive decline, plus evidence-based interventions available to everyone today.',
    navLabel: 'Hope',
    act: 'III',
  },
  {
    id: 'promising-frontier',
    title: 'The Promising Frontier',
    subtitle: 'Drugs with strong mechanistic rationale that deserve proper trials—but can\'t attract funding.',
    navLabel: 'Frontier',
    act: 'III',
  },
];

// Helper: Get section by ID
export function getSection(id: string): SectionConfig | undefined {
  return sections.find(s => s.id === id);
}

// Helper: Get sections by act
export function getSectionsByAct(act: ActNumber): SectionConfig[] {
  return sections.filter(s => s.act === act);
}

// Helper: Get navigation structure (for Header)
export interface ActNavConfig {
  label: ActNumber;
  sections: { id: string; label: string }[];
}

export function getNavConfig(): ActNavConfig[] {
  const acts: ActNumber[] = ['I', 'II', 'III'];
  return acts.map(act => ({
    label: act,
    sections: getSectionsByAct(act).map(s => ({
      id: s.id,
      label: s.navLabel,
    })),
  }));
}

// Additional sections not in main nav but used in the app
export const additionalSections: Record<string, Omit<SectionConfig, 'act' | 'navLabel'>> = {
  'evidence-graveyard': {
    id: 'evidence-graveyard',
    title: 'The Evidence Graveyard',
    subtitle: 'Promising interventions with substantial evidence, abandoned because they cannot generate profit.',
  },
  'sidelined-researchers': {
    id: 'sidelined-researchers',
    title: 'The Sidelined Researchers',
    subtitle: 'Behind each alternative hypothesis is a researcher who built their career on a theory that challenged amyloid primacy, and paid the price in marginalized funding.',
  },
  'evidence-hierarchy': {
    id: 'evidence-hierarchy',
    title: 'Evidence Hierarchy for Causality',
    subtitle: 'Most biological evidence is correlational. This ranking helps distinguish strong causal evidence from mere association.',
  },
  'mechanistic-cascade': {
    id: 'mechanistic-cascade',
    title: 'The 9-Stage Causal Cascade',
    subtitle: 'Why amyloid is downstream: A unified model integrating all alternative hypotheses',
  },
  'sex-ancestry': {
    id: 'sex-ancestry',
    title: 'Sex & Ancestry in AD',
    subtitle: 'Mechanistic drivers, rather than statistical covariates, that determine who gets AD and who responds to treatment.',
  },
  'stakes': {
    id: 'stakes',
    title: 'The Human Cost',
    subtitle: 'Behind every statistic is a person. Behind every failed trial is a family waiting for hope.',
  },
};

// Get any section (main or additional)
export function getAnySection(id: string): { title: string; subtitle: string } | undefined {
  const mainSection = getSection(id);
  if (mainSection) return { title: mainSection.title, subtitle: mainSection.subtitle };
  return additionalSections[id];
}
