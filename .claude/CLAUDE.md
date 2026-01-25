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

### Bibliography Location
**ALWAYS add sources to the modular bibliography folder**: `src/data/bibliography/`

The bibliography is organized into topic-specific modules:
- `foundational.ts` - Core AD discoveries and seminal papers
- `hypotheses.ts` - Competing theories (amyloid, tau, inflammation, etc.)
- `mechanisms.ts` - Mechanistic pathway citations (for network edges)
- `treatments.ts` - Drug trials and therapeutic interventions
- `trials.ts` - Clinical trial results and methodology
- `funding.ts` - Funding disparities and investment data
- `policy.ts` - Regulatory and policy sources
- `genetics.ts` - Genetic risk factors (APOE, TREM2, etc.)
- `sexAncestry.ts` - Sex differences and ancestry effects
- `scandal.ts` - Research misconduct (Bharat Lesne, etc.)
- `pipelineDrugs.ts` - Pipeline and experimental treatments
- `precisionMedicine.ts` - Biomarkers and precision medicine
- `historical.ts` - Historical context and timeline events
- `failureCascade.ts` - Market failure documentation
- `drugConcerns.ts` - Safety and efficacy concerns

**DO NOT** add to the legacy `src/data/bibliography.ts` file (deprecated).

### Adding New Sources
When adding a new source:
1. **ALWAYS use WebFetch or WebSearch** to verify citation details before adding
2. Choose the appropriate module file based on topic
3. Follow the `Source` interface structure from `types.ts`
4. Include at least one `Citation` with an exact quote
5. Verify quotes by fetching the actual source URL
6. Run `npx tsx scripts/dump-network-data.ts` to verify citations

**Citation Verification Protocol:**
- Use `WebFetch` on the source URL (PubMed, PMC, DOI link) to extract exact title, authors, journal, year, DOI
- Copy quotes EXACTLY as they appear in the source
- If a URL redirects, follow the redirect to get the actual content
- Mark any unverified citations with `// UNVERIFIED` comment until confirmed

### Citation Quality Rules
- The `quote` field must contain **exact quotes** that can be found in the original source via Ctrl+F
- Do NOT paraphrase or summarize in the quote field—use the exact text from the source
- If the exact wording cannot be verified, mark the citation with a comment or use the `context` field for editorial notes
- Each timeline event should reference specific `citationIds` that correspond to verifiable quotes in the bibliography
- **COPY QUOTES EXACTLY AS THEY APPEAR** from the source—do not correct grammar, change capitalization, or modify punctuation
- When using web search to gather citations, always verify quotes by fetching the actual source URL when possible

## Mechanistic Framework (Excel-based)

The mechanistic framework data is stored in an **Excel file** for easier editing and collaboration:

**File location:** `src/data/mechanisticFramework/framework.xlsx`

### Editing the Framework

1. **Open the Excel file** directly in Excel, Google Sheets, or LibreOffice Calc
2. **Edit the appropriate sheet:**
   - `Nodes` - Biological entities (proteins, organelles, states, processes)
   - `Edges` - Causal relationships between nodes
   - `Modules` - Groupings of related nodes (M01, M02, etc.)
3. **Save the file** - changes are loaded automatically at build time

### Node Columns (Nodes sheet)

| Column | Required | Description |
|--------|----------|-------------|
| `id` | Yes | Unique identifier, snake_case (e.g., `lysosome`, `tau_aggregated`) |
| `label` | Yes | Display name (e.g., "Lysosome", "Tau Aggregated") |
| `category` | Yes | STOCK, STATE, BOUNDARY, or PROCESS |
| `subtype` | Yes | More specific type (Organelle, ProteinPool, MetabolicState, etc.) |
| `moduleId` | Yes | Module this belongs to (M01, M02, etc.) |
| `description` | Yes | Brief 1-2 sentence description |
| `mechanism` | No | Detailed mechanism explanation |
| `references_protein` | No | UniProt ID (e.g., UniProt:P01234) |
| `references_gene` | No | HGNC ID (e.g., HGNC:1234) |
| `references_process` | No | GO term (e.g., GO:0005764) |
| `references_cellType` | No | Cell Ontology ID |
| `roles` | No | Comma-separated: THERAPEUTIC_TARGET, BIOMARKER, RATE_LIMITER, LEVERAGE_POINT |
| `pmid` | No | Primary citation PubMed ID |
| `notes` | No | Additional notes |

### Edge Columns (Edges sheet)

| Column | Required | Description |
|--------|----------|-------------|
| `id` | Yes | Unique identifier (E01.001 format) |
| `source` | Yes | Source node id |
| `target` | Yes | Target node id |
| `relation` | Yes | increases, decreases, regulates, produces, etc. |
| `moduleId` | Yes | Primary module for this edge |
| `causalConfidence` | Yes | Evidence level: L1 (strongest) to L7 (weakest) |
| `mechanismDescription` | No | How source affects target |
| `keyInsight` | No | Important takeaway for this edge |
| `pmid` | No | Primary citation PubMed ID |
| `firstAuthor` | No | First author of citation |
| `year` | No | Year of citation |
| `methodType` | No | RCT, cohort, knockout, in_vitro, etc. |
| `notes` | No | Additional notes |

### Evidence Levels (causalConfidence)

| Level | Description | Example Methods |
|-------|-------------|-----------------|
| L1 | RCT with clinical endpoints | Phase 3 trial, clinical outcome |
| L2 | Mendelian randomization, natural experiments | Genetic instrument studies |
| L3 | GWAS + functional validation, knockout studies | Mouse KO + human GWAS |
| L4 | Animal intervention studies | Drug treatment in mice |
| L5 | In vitro / cell culture | Cell line experiments |
| L6 | Observational / correlational | Cohort studies, case-control |
| L7 | Expert opinion / review | Review articles, expert consensus |

### Module Columns (Modules sheet)

| Column | Required | Description |
|--------|----------|-------------|
| `id` | Yes | Module ID (M01, M02, etc.) |
| `name` | Yes | Full name |
| `shortName` | Yes | Abbreviated name for UI |
| `description` | Yes | What this module covers |
| `color` | Yes | Hex color for visualization |

### Using the Data in Code

```typescript
import { allNodes, allEdges, modules } from '@/data/mechanisticFramework';

// Or use the loader directly for fresh data
import { loadFramework } from '@/data/mechanisticFramework';
const framework = loadFramework();
```

### Reference Files

Old TypeScript-based implementation is preserved in `_reference/` for reference:
- `_reference/scripts/` - Analysis scripts
- `_reference/lib/` - Pathway calculation utilities

## Writing Style & Copywriting Guidelines

Good copy is clear, concise, and serves the reader. Follow these principles based on [Federal Plain Language Guidelines](https://plainlanguage.gov/guidelines/) and [scientific communication best practices](https://ecampusontario.pressbooks.pub/scientificcommunication/chapter/style-tips/).

### Core Principles

1. **Write for scanners** - 73% of readers skim content. Use:
   - Short paragraphs (2-3 sentences max)
   - Bullet points for lists
   - Bold for key terms
   - Clear subheadings

2. **One idea per sentence** - Scientific writing averages 12-17 words per sentence. If a sentence has multiple clauses, split it.

3. **Lead with the point** - State conclusions first, then supporting details. Don't make readers hunt for the takeaway.

4. **Use active voice** - "Mice developed plaques" not "Plaques were developed by mice." Active voice is shorter and clearer.

5. **Prefer concrete over abstract** - "400 drugs failed" not "A significant number of therapeutic candidates proved ineffective."

### What to Avoid

- **Jargon without context** - Define technical terms on first use or avoid them
- **Hedging language** - "It could potentially perhaps suggest" → "Evidence suggests"
- **Redundant modifiers** - "completely eliminate," "very unique," "basically essential"
- **Passive constructions** - Especially "It is..." and "There are..."
- **Run-on explanations** - If you need a semicolon and two commas, make it two sentences
- **Em dashes (—)** - Use alternatives:
  - Comma + space: "for ALS, but no Western trials"
  - Colon: "stuck in trials: too cheap to fund"
  - Parentheses: "blocked by stigma (not science)"
  - Period and new sentence for longer asides

### Card/Callout Copy Pattern

For insight cards and callouts, follow this structure:
```
[Title]: 3-6 words, concrete noun + descriptor
[Body]: 2-3 sentences max. Problem → Evidence → Implication.
[Takeaway]: Single sentence starting with action word or "So..."
```

**Bad example:**
> "The pharmaceutical industry has invested approximately $42.5 billion in patented Alzheimer's drug development over the past two decades, whereas generic drug repurposing studies have received only approximately $500 million in funding. This represents an 85:1 ratio of investment that favors patented compounds over potentially effective generic alternatives."

**Good example:**
> "$42.5B went to patented drugs. $500M went to generics. That's 85:1. Generic drugs can't recoup trial costs, so they don't get tested. The market selects for patents, not science."

### Explanatory Content Guidelines

When explaining scientific concepts:
- **Start with why it matters** to the reader
- **Use analogies** sparingly and only if they clarify
- **Show, don't tell** - Use data and examples over adjectives
- **Avoid "word salad"** - Dense, jargon-heavy sentences that sound smart but communicate poorly

### Tone

- **Authoritative but accessible** - Expert knowledge, plain language
- **Direct but not aggressive** - State facts without editorializing
- **Curious but not uncertain** - Present open questions as interesting, not as weakness

### Information Hierarchy (Progressive Disclosure)

Design content for three levels of reader engagement. Each level should be complete on its own.

#### Level 1: Scanners (5 seconds)
For readers who want the gist at a glance.
- **Large statistics** with units: "99%" "400 drugs" "$42.5B"
- **Section headings** that convey the point, not just the topic
- **Visual hierarchy** through size, color, and weight
- **One takeaway per section** visible without scrolling

#### Level 2: Readers (30 seconds)
For readers who want to understand the story.
- **2-3 sentence explanations** below each statistic
- **Card bodies** that give context: problem → evidence → implication
- **Interpretive labels** on charts and diagrams
- **Clear cause-and-effect** language

#### Level 3: Explorers (2+ minutes)
For readers who want the full picture. Access via interaction.
- **Expandable sections** for methodology, caveats, full data
- **Tooltips** on technical terms and data points
- **Click-through details** on cards, table rows, chart elements
- **Source citations** and links to primary research

#### Implementation Pattern
```tsx
{/* Level 1: The hook */}
<div className="text-5xl font-serif font-bold">99%</div>
<div className="text-lg text-[var(--text-muted)]">failure rate</div>

{/* Level 2: The explanation */}
<p className="text-[var(--text-body)] mt-4">
  Of 400+ drugs tested in Alzheimer's trials, fewer than 5 reached approval.
  Most failed despite showing promise in animal models.
</p>

{/* Level 3: The deep dive (interactive) */}
<button onClick={() => setExpanded(!expanded)}>
  View trial breakdown →
</button>
{expanded && <DetailedTrialTable />}
```

#### Visual Hierarchy Checklist
- [ ] Can someone get the main point in 5 seconds?
- [ ] Does the statistic/heading work without the body text?
- [ ] Is there a clear path to more detail for curious readers?
- [ ] Are interactive elements discoverable but not distracting?

## Planning

### Plan Storage
All implementation plans should be written to `.claude/plans/` folder with descriptive filenames:
- Format: `[topic]-[date].md` (e.g., `vaccine-updates-2026-01-22.md`)
- Include: Overview, tasks with checkboxes, decision log, references
- Update plan status as work progresses

### When to Create Plans
- Multi-file changes affecting data or components
- New feature additions
- Major refactoring efforts
- Research-intensive updates requiring source verification

## Research Requirements
- **ALWAYS use web search** to verify factual claims before adding or modifying data content (drug information, trial results, researcher claims, statistics, etc.)
- Only skip web search when making purely functional code changes (fixing bugs, refactoring, UI adjustments)
- Never assume factual information is correct, verify with current sources
- When adding drugs, treatments, or clinical trial information, search for the latest status and results
