# Untangling Alzheimer's

## Project Overview
**The science, the system, and the search for a cure.**

An interactive exploration of Alzheimer's research that maps structural barriers preventing cures, visualizes competing theories in a network, and highlights promising future treatments. Includes the 9-stage mechanistic cascade and evidence hierarchy for evaluating causal claims.

## Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React

## Project Structure
```
src/
├── app/                    # Next.js app router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main scrollytelling page
│   ├── globals.css         # Global styles
│   ├── methodology/        # Methodology & sources page
│   │   └── page.tsx
│   └── showcase/           # Component library showcase
│       └── page.tsx        # /showcase - visual component reference
├── components/
│   ├── ui/                 # Reusable UI primitives
│   │   ├── Abbreviation.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Container.tsx
│   │   ├── Heading.tsx
│   │   ├── Section.tsx
│   │   ├── ShoutoutBox.tsx
│   │   └── index.ts
│   ├── sections/           # Page sections (scrollytelling acts)
│   │   ├── Hero.tsx
│   │   ├── HistoricalTimeline.tsx
│   │   ├── TrialBarriers.tsx
│   │   ├── EvidenceGraveyard.tsx
│   │   ├── FailureCascade.tsx
│   │   ├── CaseStudies.tsx
│   │   ├── HopefulDevelopments.tsx
│   │   ├── SexAncestryEffects.tsx
│   │   ├── EvidenceHierarchy.tsx
│   │   └── index.ts
│   └── layout/             # Layout components
│       ├── Header.tsx
│       ├── Footer.tsx
│       ├── ScrollProgress.tsx
│       ├── SectionNav.tsx
│       └── index.ts
├── data/                   # Data structures and constants
│   ├── bibliography/       # Modular citation database
│   │   ├── types.ts
│   │   ├── foundational.ts
│   │   ├── hypotheses.ts
│   │   ├── trials.ts
│   │   └── index.ts
│   ├── timeline.ts         # Historical timeline events
│   ├── trialBarriers.ts    # Trial cost/funding data
│   ├── hopefulDevelopments.ts
│   ├── sexAncestryEffects.ts
│   ├── failures.ts         # Market failure definitions
│   ├── caseStudies.ts      # Case study narratives
│   └── index.ts
├── hooks/                  # Custom React hooks
│   ├── useScrollProgress.ts
│   └── index.ts
├── lib/                    # Utilities and helpers
│   ├── utils.ts
│   └── cn.ts               # className utility
└── types/                  # TypeScript type definitions
    └── index.ts
```

## Page Structure (Narrative Flow)

### Act I: The Paradox
- **Hero**: Introduction with key statistics (55M patients, 99% trial failure rate)
- **InvestmentWaterfall**: $42.5B vs ~$50M investment disparity visualization

### Act II: The System
- **EvidenceGraveyard**: Tombstone cards for abandoned generic drug research
- **SidelinedResearchers**: Researchers marginalized for challenging amyloid primacy
- **FailureCascade**: 7 interconnected market failures flow diagram
- **CaseStudies**: Interactive case studies (Lithium, GV-971, TNF inhibitors, Nebivolol, Lesne Scandal)

### Act III: The Science
- **EvidenceHierarchy**: 5-star ranking system for causal evidence
- **MechanisticCascade**: 9-stage causal cascade showing why amyloid is downstream

### Act IV: The Stakes
- **Stakes**: Human cost statistics and alternative timeline comparison

## Design System

**IMPORTANT**: Always refer to the component library at `/showcase` for visual reference when building new components or modifying existing ones. The showcase demonstrates proper usage of colors, typography, buttons, cards, badges, alerts, and tables.

### Color Palette (Light Theme)
```css
/* Backgrounds - Warm off-whites */
--bg-primary: #faf9f7;      /* Main background - warm off-white */
--bg-secondary: #f5f3f0;    /* Section backgrounds - slightly darker */
--bg-card: #ffffff;         /* Card backgrounds - pure white */

/* Text - Dark grays for readability */
--text-primary: #2d2d2d;    /* Headings - near black */
--text-body: #4a4a4a;       /* Body text - dark gray */
--text-muted: #7a7a7a;      /* Secondary text - muted gray */

/* Accent - Signature orange */
--accent-orange: #e36216;
--accent-orange-light: #f8e8de;

/* Chart Colors - Used in data visualizations */
--chart-primary: #486393;     /* Primary blue */
--chart-secondary: #007385;   /* Teal */
--chart-accent: #C9461D;      /* Accent orange (darker) */
--chart-warning: #E5AF19;     /* Warning yellow / Amerindian */
--chart-pink: #C3577F;        /* Nigerian pink */
--chart-muted: #787473;       /* Muted gray */
--chart-light-blue: #7ED3FF;  /* Sky blue */
--chart-light-orange: #FFA380;/* Light orange */

/* Category Colors - Soft pastels for hypothesis coding */
--category-amyloid: #60a5fa;    /* Soft blue */
--category-vascular: #a78bfa;   /* Soft purple */
--category-metabolic: #fbbf24;  /* Warm yellow */
--category-lysosomal: #34d399;  /* Soft green */
--category-mitochondrial: #8ecae6; /* Soft teal */
--category-myelin: #f472b6;     /* Soft pink */

/* Semantic Colors - Muted for professionalism */
--danger: #c75146;          /* Muted brick red - failures */
--danger-light: #fae8e6;
--success: #5a8a6e;         /* Sage green - alternatives */
--success-light: #e8f3ec;

/* Borders */
--border: #e5e2dd;          /* Warm gray border */
```

### Chart Colors (For Recharts/Data Viz)
When using Recharts or any data visualization, use these consistent colors:
```typescript
const chartColors = {
  primary: '#e36216',      // orange - primary for takeaways/highlights
  secondary: '#007385',    // teal - secondary data
  tertiary: '#486393',     // blue - supporting data
  accent: '#C9461D',       // darker orange - AD-specific data
  warning: '#E5AF19',      // yellow - warnings/Amerindian
  pink: '#C3577F',         // pink - Nigerian
  muted: '#787473',        // gray - less important data
  lightBlue: '#7ED3FF',    // sky blue
  lightOrange: '#FFA380',  // light orange
  dark: '#263238',         // dark
};
```

### Typography
- **Headings**: Neuton (serif), bold weights - for gravitas and authority
- **Body**: Encode Sans, regular weight - clean, readable sans-serif
- **Data/Numbers**: Encode Sans or monospace for numerical emphasis
- **Scale**: Use Tailwind's default type scale (text-sm through text-6xl)

### Animation Guidelines
- Use Framer Motion for all animations
- Standard easing: `[0.4, 0, 0.2, 1]` (ease-out)
- Section transitions: 0.6s duration
- Micro-interactions: 0.2-0.3s duration
- Scroll-triggered animations should use `whileInView`
- Stagger children animations with 0.1s delay

### Component Patterns

See `/showcase` for live examples of all components.

#### Buttons
```tsx
<Button variant="primary | secondary | ghost" size="sm | md | lg">
  Action Text
</Button>
```

#### Cards
Cards use rectangular corners (`rounded` not `rounded-lg`):
```tsx
<Card variant="default | highlighted | success | danger">
  <CardHeader>...</CardHeader>
  <CardContent>...</CardContent>
</Card>
```

#### ShoutoutBox
Theme-consistent callout boxes for important information:
```tsx
<ShoutoutBox variant="default | primary | secondary | warning | danger | success">
  Important information here...
</ShoutoutBox>
```

#### Badges
```tsx
// Status badges
<Badge variant="default | primary | success | warning | danger">Status</Badge>

// Category tags (for hypothesis coding)
<Badge variant="amyloid | vascular | metabolic | lysosomal">Category</Badge>
```

#### Alerts
```tsx
<Alert variant="info | success | warning | danger">
  <Icon /> Alert message
</Alert>
```

#### Sections
```tsx
<Section id="unique-id" className="min-h-screen">
  <Container>
    <SectionHeader title="..." subtitle="..." />
    {/* Content */}
  </Container>
</Section>
```

#### Animated Elements
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  {/* Content */}
</motion.div>
```

#### Statistics Display
```tsx
<StatDisplay value="55 million+" label="Description text" highlight />
```

## Data Conventions

### Drug Data Structure
```typescript
interface Drug {
  id: string;
  name: string;
  type: 'patented' | 'generic' | 'supplement' | 'biosimilar';
  investment: number;        // in millions USD
  annualCost: number;        // patient cost per year
  fdaStatus: 'approved' | 'pending' | 'no-pathway';
  evidenceStrength: 1 | 2 | 3 | 4 | 5;
  outcome: string;
  mechanism: string;
  keyStudyYear: number;
  keyEvidence?: string;
}
```

### Sidelined Researcher Structure
```typescript
interface SidelinedResearcher {
  id: string;
  name: string;
  institution: string;
  hypothesis: string;
  year: number;
  keyFinding: string;
  cascadeStage: number;      // 1-9
  stageName: string;
}
```

### Cascade Stage Structure
```typescript
interface CascadeStage {
  stage: number;
  title: string;
  shortTitle: string;
  description: string;
  mechanisms: string[];
  evidenceLevel: string;
  researchers?: string[];
  drugs?: { name: string; effect: string }[];
}
```

### Evidence Hierarchy
```typescript
interface EvidenceLevel {
  stars: number;             // 1-5
  type: string;
  description: string;
  examples: string[];
}
```

## Key Visualizations

1. **Investment Waterfall**: Proportional bars showing $42.5B vs ~$50M disparity (850:1 ratio)
2. **Evidence Graveyard**: Grid of "tombstone" cards for abandoned research
3. **Sidelined Researchers**: Cards showing marginalized scientists and their hypotheses
4. **Failure Cascade**: 7-node flow diagram of interconnected market failures
5. **Case Studies**: Interactive tabbed interface with 5 case studies including Lesne scandal
6. **Evidence Hierarchy**: 6-level star rating system for causal evidence types
7. **Mechanistic Cascade**: 9-stage expandable cascade showing disease progression
8. **Drug Efficacy Table**: Comparison of drugs by target stage and efficacy

## Coding Standards

### Imports Order
1. React/Next.js
2. Third-party libraries (framer-motion, lucide-react)
3. Local components (@/components/*)
4. Data/Types (@/data/*, @/types/*)
5. Utilities (@/lib/*)
6. Styles

### Component Structure
```tsx
'use client'; // Only if needed

import { motion } from 'framer-motion';
import { IconName } from 'lucide-react';
import { cn } from '@/lib/cn';

interface ComponentProps {
  // Props interface
}

export function Component({ ...props }: ComponentProps) {
  // Hooks
  // Handlers
  // Render
  return (
    // JSX
  );
}
```

### Naming Conventions
- Components: PascalCase (`MechanisticCascade.tsx`)
- Hooks: camelCase with `use` prefix (`useScrollProgress.ts`)
- Data files: camelCase (`caseStudies.ts`)
- Types: PascalCase (`CascadeStage`)
- CSS classes: Use Tailwind utilities, avoid custom CSS

### Styling Consistency
- **Always use CSS variables** for colors (e.g., `text-[var(--text-primary)]` not `text-slate-900`)
- **Use `rounded` not `rounded-lg`** for rectangular corners on cards and boxes
- **Avoid Tailwind color classes** like `bg-blue-50`, `text-emerald-600` - use theme colors instead
- **Use chartColors constant** for all data visualizations (see Chart Colors section above)
- **Status badges** should use theme-consistent background/text color pairs

## Accessibility
- All interactive elements must be keyboard accessible
- Use semantic HTML (section, article, nav, etc.)
- Provide alt text for visualizations
- Ensure color contrast meets WCAG AA standards
- Animations should respect `prefers-reduced-motion`

## Performance
- Use Next.js Image component for images
- Lazy load below-fold sections
- Use `viewport={{ once: true }}` for scroll animations
- Keep bundle size minimal - import icons individually

## Citation Standards
- The `quote` field in bibliography.ts citations must contain **exact quotes** that can be found in the original source via Ctrl+F
- Do NOT paraphrase or summarize in the quote field—use the exact text from the source
- If the exact wording cannot be verified, mark the citation with a comment or use the `context` field for editorial notes
- Each timeline event should reference specific `citationIds` that correspond to verifiable quotes in the bibliography
- **COPY QUOTES EXACTLY AS THEY APPEAR** from the source—do not correct grammar, change capitalization, or modify punctuation
- When using web search to gather citations, always verify quotes by fetching the actual source URL when possible

## Writing Style
- **Avoid em dashes (—)** in all content strings. Use alternatives instead:
  - Comma + space: "for ALS, but no Western trials"
  - Colon + space: "stuck in trials: too cheap to fund"
  - Parentheses: "blocked by stigma (not science)"
  - Semicolon + space: "Phase 3 for stroke; no AD trials"
  - Period and new sentence for longer asides
- **Avoid run-on sentences and awkward phrasing** when replacing em dashes:
  - If a comma creates a run-on, split into two sentences instead
  - Read the result aloud mentally to check for natural flow
  - Restructure the sentence if no punctuation substitution sounds right
  - Example: Instead of "The drug works, but only in mice, but no human trials exist" → "The drug works in mice. No human trials exist."
- This applies to summaries, descriptions, subtitles, and any user-facing text in data files

## Research Requirements
- **ALWAYS use web search** to verify factual claims before adding or modifying data content (drug information, trial results, researcher claims, statistics, etc.)
- Only skip web search when making purely functional code changes (fixing bugs, refactoring, UI adjustments)
- Never assume factual information is correct, verify with current sources
- When adding drugs, treatments, or clinical trial information, search for the latest status and results
