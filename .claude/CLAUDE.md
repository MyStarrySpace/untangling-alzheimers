# Alzheimer's Disease Market Failure Visualization

## Project Overview
An interactive scrollytelling visualization exposing how patent incentives, regulatory structures, and funding mechanisms systematically prevent promising Alzheimer's interventions from reaching patients.

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
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # Reusable UI primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Container.tsx
│   │   ├── Heading.tsx
│   │   └── index.ts
│   ├── sections/           # Page sections (scrollytelling acts)
│   │   ├── Hero.tsx
│   │   ├── InvestmentWaterfall.tsx
│   │   ├── EvidenceGraveyard.tsx
│   │   ├── FailureCascade.tsx
│   │   ├── CaseStudies.tsx
│   │   └── index.ts
│   ├── visualizations/     # Data visualization components
│   │   ├── WaterfallChart.tsx
│   │   ├── FlowDiagram.tsx
│   │   ├── ComparisonTable.tsx
│   │   └── index.ts
│   └── layout/             # Layout components
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── ScrollProgress.tsx
├── data/                   # Data structures and constants
│   ├── drugs.ts            # Drug comparison data
│   ├── failures.ts         # Market failure definitions
│   ├── caseStudies.ts      # Case study narratives
│   └── index.ts
├── hooks/                  # Custom React hooks
│   ├── useScrollProgress.ts
│   ├── useInView.ts
│   └── index.ts
├── lib/                    # Utilities and helpers
│   ├── utils.ts
│   └── cn.ts               # className utility
└── types/                  # TypeScript type definitions
    └── index.ts
```

## Design System

### Color Palette
```css
/* Primary - Deep blue for trust and seriousness */
--primary-50: #eff6ff;
--primary-100: #dbeafe;
--primary-500: #3b82f6;
--primary-600: #2563eb;
--primary-900: #1e3a8a;

/* Accent - Amber for warnings and highlights */
--accent-50: #fffbeb;
--accent-500: #f59e0b;
--accent-600: #d97706;

/* Semantic Colors */
--success: #10b981;     /* Generic drugs, positive outcomes */
--danger: #ef4444;      /* Failed trials, market failures */
--warning: #f59e0b;     /* Caution, underfunded */
--neutral: #6b7280;     /* Secondary information */

/* Background */
--bg-dark: #0f172a;     /* Slate 900 - main background */
--bg-card: #1e293b;     /* Slate 800 - card backgrounds */
--bg-highlight: #334155; /* Slate 700 - hover states */
```

### Typography
- **Headings**: Geist Sans, bold weights
- **Body**: Geist Sans, regular weight
- **Data/Numbers**: Geist Mono for numerical emphasis
- **Scale**: Use Tailwind's default type scale (text-sm through text-6xl)

### Animation Guidelines
- Use Framer Motion for all animations
- Standard easing: `[0.4, 0, 0.2, 1]` (ease-out)
- Section transitions: 0.6s duration
- Micro-interactions: 0.2-0.3s duration
- Scroll-triggered animations should use `whileInView`
- Stagger children animations with 0.1s delay

### Component Patterns

#### Cards
```tsx
<Card variant="default | highlighted | warning">
  <CardHeader>...</CardHeader>
  <CardContent>...</CardContent>
</Card>
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

## Data Conventions

### Drug Data Structure
```typescript
interface Drug {
  id: string;
  name: string;
  type: 'patented' | 'generic' | 'supplement';
  investment: number;        // in millions USD
  annualCost: number;        // patient cost per year
  fdaStatus: 'approved' | 'pending' | 'no-pathway';
  evidenceStrength: 1 | 2 | 3 | 4 | 5;
  outcome: string;
  mechanism: string;
  keyStudyYear: number;
}
```

### Market Failure Structure
```typescript
interface MarketFailure {
  id: string;
  title: string;
  description: string;
  impact: string;
  connections: string[];     // IDs of related failures
  icon: LucideIcon;
}
```

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
- Components: PascalCase (`InvestmentWaterfall.tsx`)
- Hooks: camelCase with `use` prefix (`useScrollProgress.ts`)
- Data files: camelCase (`caseStudies.ts`)
- Types: PascalCase (`DrugData`)
- CSS classes: Use Tailwind utilities, avoid custom CSS

## Key Visualizations

1. **Investment Waterfall**: Proportional bars showing $50B vs $50M disparity
2. **Evidence Graveyard**: Grid of "tombstone" cards for abandoned research
3. **Failure Cascade**: Flow diagram of interconnected market failures
4. **Comparison Table**: Interactive table of patented vs generic drugs
5. **Timeline**: Alternative history showing what could have been

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
