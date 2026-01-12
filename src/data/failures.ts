import {
  FileText,
  DollarSign,
  Clock,
  Shield,
  Users,
  UserX,
  Timer,
} from 'lucide-react';
import type { MarketFailure } from '@/types';

export const marketFailures: MarketFailure[] = [
  {
    id: 'patent-system',
    title: 'The Patent System',
    shortTitle: 'Patents',
    description:
      'Only novel molecules generate return on investment. Generic drugs and supplements—regardless of evidence—cannot recoup clinical trial costs.',
    impact:
      '$50 billion investment in patented drugs vs. ~$50 million in generics (1000:1 ratio)',
    connections: ['trial-economics', 'fda-structure'],
    icon: FileText,
    order: 1,
  },
  {
    id: 'fda-structure',
    title: 'FDA Regulatory Structure',
    shortTitle: 'FDA',
    description:
      'The FDA approves treatments, not prevention. There is no regulatory pathway for "take this at 50 to avoid AD at 75."',
    impact:
      'Prevention trials require 10+ years of follow-up, making them prohibitively expensive for drugs without patent protection',
    connections: ['patent-system', 'trial-economics', 'timing-catastrophe'],
    icon: Shield,
    order: 2,
  },
  {
    id: 'trial-economics',
    title: 'Trial Economics',
    shortTitle: 'Trial Costs',
    description:
      'A single Phase 3 AD trial costs $50-100 million. Only entities with patent protection can justify this investment.',
    impact:
      'Academic researchers cannot fund large-scale trials without industry partnership, and industry will not partner on generic drugs',
    connections: ['patent-system', 'fda-structure', 'insurance-structure'],
    icon: DollarSign,
    order: 3,
  },
  {
    id: 'insurance-structure',
    title: 'Insurance Structure',
    shortTitle: 'Insurance',
    description:
      'Insurance pays for treatment of diagnosed disease, not prevention.',
    impact:
      'Even if a generic drug prevented AD, there would be no reimbursement mechanism for prescribing it to healthy 50-year-olds',
    connections: ['trial-economics', 'fda-structure'],
    icon: Clock,
    order: 4,
  },
  {
    id: 'subtype-blindness',
    title: 'Subtype Blindness',
    shortTitle: 'Subtypes',
    description:
      '"Alzheimer\'s disease" is likely 5+ mechanistically distinct conditions with similar symptoms.',
    impact:
      'Trials that lump all patients together systematically fail because responders are diluted by non-responders',
    connections: ['timing-catastrophe', 'sex-difference'],
    icon: Users,
    order: 5,
  },
  {
    id: 'sex-difference',
    title: 'Sex Difference Erasure',
    shortTitle: 'Sex Bias',
    description:
      'Women represent 2/3 of AD patients but are underrepresented in trials. Many drugs show sex-specific effects.',
    impact:
      'This may explain why some "failed" drugs actually worked—in half the population',
    connections: ['subtype-blindness'],
    icon: UserX,
    order: 6,
  },
  {
    id: 'timing-catastrophe',
    title: 'Timing Catastrophe',
    shortTitle: 'Timing',
    description:
      'All drugs are tested in established disease, after neuronal death. Drugs that might prevent the disease are declared "failed" because they cannot reverse existing damage.',
    impact:
      'The nebivolol study exemplifies this: it reduced amyloid pathology but didn\'t improve cognition in mice with established disease—exactly what a prevention drug would do',
    connections: ['fda-structure', 'subtype-blindness'],
    icon: Timer,
    order: 7,
  },
];

export const failureCascadeNarrative = `The Alzheimer's field has a 99% clinical trial failure rate—the worst of any therapeutic area. The standard explanation is that the disease is complex and poorly understood.

While true, this explanation obscures a deeper structural problem: the drugs that receive investment are selected based on patent status, not scientific promise.

Each market failure reinforces the others, creating a self-perpetuating system that excludes the most promising interventions.`;

export const cascadeFlow = [
  { from: 'patent-system', to: 'trial-economics' },
  { from: 'patent-system', to: 'fda-structure' },
  { from: 'fda-structure', to: 'trial-economics' },
  { from: 'fda-structure', to: 'timing-catastrophe' },
  { from: 'trial-economics', to: 'insurance-structure' },
  { from: 'timing-catastrophe', to: 'subtype-blindness' },
  { from: 'subtype-blindness', to: 'sex-difference' },
];
