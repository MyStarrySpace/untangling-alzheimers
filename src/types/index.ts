import type { LucideIcon } from 'lucide-react';

export interface Drug {
  id: string;
  name: string;
  type: 'patented' | 'generic' | 'supplement' | 'biosimilar';
  investment: number; // in millions USD
  annualCost: number; // patient cost per year
  fdaStatus: 'approved' | 'pending' | 'no-pathway';
  evidenceStrength: 1 | 2 | 3 | 4 | 5;
  outcome: string;
  mechanism: string;
  keyStudyYear: number;
  keyEvidence?: string;
}

export interface MarketFailure {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  impact: string;
  connections: string[]; // IDs of related failures
  icon: LucideIcon;
  order: number;
}

export interface CaseStudy {
  id: string;
  title: string;
  drug: string;
  year: number;
  keyFinding: string;
  whatShouldHappen: string;
  whatActuallyHappened: string;
  quote?: string;
  quoteSource?: string;
  cost: string;
  patentStatus: 'patented' | 'generic' | 'supplement' | 'biosimilar';
}

export interface ComparisonRow {
  category: string;
  patented: string;
  generic: string;
  delta?: string;
}

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  type: 'discovery' | 'trial' | 'failure' | 'approval' | 'funding';
  drug?: string;
}
