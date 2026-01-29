# Case Study: Untangling Alzheimer's

**An interactive exploration of why 99% of Alzheimer's trials fail—and what the research actually shows.**

[Live Demo](#) | [GitHub Repository](#)

---

## The Spark

I was revisiting my old bioinformatics homework when someone mentioned the Lesné scandal on LinkedIn. Sylvain Lesné, a prominent Alzheimer's researcher, had been accused of image manipulation in a highly-cited 2006 Nature paper that claimed to identify Aβ*56 as the causative agent in Alzheimer's. The paper had directed hundreds of millions in research funding toward a specific amyloid oligomer hypothesis.

This sent me down a rabbit hole. I started reading about Alzheimer's research controversies and realized something was deeply wrong with how the field was structured. The more I read, the more questions emerged:

- Why had the field spent 40+ years and $42.5 billion chasing a single hypothesis?
- Why were generic drugs with promising epidemiological evidence never tested in proper trials?
- Why did researchers who proposed alternative hypotheses (vascular, metabolic, inflammatory) get marginalized?
- And most puzzling: if amyloid plaques cause Alzheimer's, why do anti-amyloid drugs consistently fail to help patients?

I decided to build something that could help me—and others—understand what was actually going on.

---

## The Core Problem: Causation is Circular

The first challenge was conceptual. As I mapped out Alzheimer's mechanisms from the literature, I kept running into the same problem: **everything causes everything else**.

```
Amyloid → Neuroinflammation → Tau → Neurodegeneration → Amyloid
    ↑                                                        ↓
    ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ←
```

This isn't a linear cascade—it's a web of reinforcing feedback loops with **multiple possible entry points**:

1. **Vascular hypothesis**: Blood-brain barrier breakdown → impaired Aβ clearance → accumulation
2. **Metabolic hypothesis**: Insulin resistance → mTOR dysregulation → impaired autophagy → protein accumulation
3. **Inflammatory hypothesis**: Microglial dysfunction → chronic inflammation → neuronal damage
4. **Lysosomal hypothesis**: Cathepsin dysfunction → impaired protein degradation → aggregation
5. **Iron hypothesis**: Ferroptosis → oxidative damage → membrane dysfunction

The field's dominant "amyloid cascade hypothesis" treats amyloid as the single upstream cause. But the evidence increasingly suggests amyloid is **downstream of earlier failures**—it's a symptom, not the root cause.

This insight shaped everything about how I built the visualization.

---

## Design Decisions

### 1. Systems Biology Framework (Not Just a Graph)

My bioinformatics background pushed me toward a rigorous systems modeling approach. I designed a **Systems Biology Stock-Flow (SBSF) framework** combining:

- **Donella Meadows' Systems Dynamics**: Stock-flow thinking, feedback loops, leverage points
- **BEL (Biological Expression Language)**: Causal semantics for edges
- **OBO Relation Ontology**: Standardized biological relationships

This wasn't just academic rigor—it enabled **computable causality**. Each edge has:

```typescript
interface MechanisticEdge {
  id: string;
  source: string;
  target: string;
  relation: RelationType;        // 'directlyIncreases' | 'decreases' | 'modulates'
  edgeType: EdgeType;            // 'FLOW' | 'MODULATION' | 'TRANSITION' | 'INFLUENCE'
  evidence: EvidenceCitation[];
  causalConfidence: CausalConfidence;  // L1 (RCT) through L7 (case report)
  quantitative?: {
    km?: number;      // Enzyme kinetics
    ic50?: number;    // Drug potency
    foldChange?: number;
  };
}
```

The `CausalConfidence` hierarchy became crucial. A correlation study (L7) shouldn't be weighted the same as a randomized controlled trial (L1) or Mendelian randomization study (L2). This let me highlight where the evidence was strong vs. where we were extrapolating from weaker data.

### 2. 18 Interconnected Modules

I organized 200+ nodes into 18 thematic modules:

| Module | Domain | Key Insight |
|--------|--------|-------------|
| M01 | mTOR/Autophagy | Rapamycin's protective effects suggest upstream metabolic failure |
| M06 | Amyloid | Production is normal; clearance is impaired |
| M07 | Tau | Hyperphosphorylation follows, not precedes, other dysfunction |
| M12 | BBB/Glymphatic | Vascular damage detectable 15-45 years before symptoms |
| M16 | Sex/Ancestry | 2/3 of patients are women; APOE4 risk varies 4× by ancestry |

Each module has its own file (`nodes/m01-mtor-autophagy.ts`, etc.) with full citations, cross-references, and therapeutic implications.

### 3. Evidence Hierarchy Visualization

One of my early realizations: people (including researchers) conflate correlation with causation constantly. I built an explicit 7-level evidence hierarchy:

| Level | Method | Example |
|-------|--------|---------|
| L1 | Randomized Controlled Trial | Lecanemab CLARITY-AD trial |
| L2 | Mendelian Randomization | APOE variants as natural experiments |
| L3 | Genetic Knockout/Knockin | TREM2 R47H risk variant studies |
| L4 | Intervention Studies | Rapamycin in mouse models |
| L5 | In Vitro/Biochemical | Enzyme kinetics, cell culture |
| L6 | Cohort/Case-Control | Epidemiological associations |
| L7 | Cross-Sectional/Case Report | Single observations |

Every edge in the network is tagged with its evidence level. This lets users immediately see: "This connection is based on a mouse knockout study (L3), not human trial data (L1)."

### 4. Scroll-Driven Storytelling

The technical framework needed to be accessible. I structured the narrative into three acts:

**Act I: The Paradox**
- Alzheimer described 4 observations in 1907; the field studied 2 and ignored 2 for 100+ years
- $42.5B invested with 99% trial failure rate
- Generic drugs with promising evidence can't get funding

**Act II: The System**
- 7 interconnected market failures explain the dysfunction
- Case studies: Lithium, GV-971, TNF inhibitors, the Lesné scandal
- Translational failures: why mouse models don't predict human outcomes

**Act III: The Science**
- The mechanistic network visualization
- Precision medicine: 5 molecular subtypes requiring different treatments
- What's actually working and what could work with proper funding

---

## Technical Implementation

### Stack
- **Next.js 15** with App Router for the narrative pages and API routes
- **TypeScript** throughout for type safety on complex domain models
- **Tailwind CSS** for styling consistency
- **Framer Motion** for scroll-triggered animations
- **Custom force-directed graph** for the mechanistic network

### Architecture Highlights

**Modular Data Layer**
```
src/data/
├── mechanisticFramework/
│   ├── types.ts          # SBSF type system (939 lines)
│   ├── modules.ts        # 18 module definitions
│   ├── edges.ts          # 100+ causal edges with citations
│   ├── drugLibrary.ts    # 40+ treatments with mechanisms
│   ├── feedbackLoops.ts  # Identified feedback cycles
│   └── nodes/
│       ├── m01-mtor-autophagy.ts
│       ├── m06-amyloid.ts
│       └── ... (18 module files)
├── bibliography/
│   ├── foundational.ts   # Landmark papers
│   ├── hypotheses.ts     # Competing theories
│   ├── trials.ts         # Clinical trial data
│   └── scandal.ts        # Research integrity issues
```

**API Layer**
```typescript
// GET /api/v1/network
// Returns full graph with optional filters
{
  nodes: MechanisticNode[],
  edges: MechanisticEdge[],
  modules: MechanisticModule[],
  feedbackLoops: FeedbackLoop[]
}

// GET /api/v1/pathway?from=bbb_breakdown&to=cognitive_decline
// Returns shortest causal path between two nodes

// GET /api/v1/treatments/lecanemab/pathway
// Returns mechanism of action as subgraph
```

**Network Visualization**

The graph presented unique challenges:
- 200+ nodes needed intelligent clustering by module
- Edges needed to show direction, type (modulation vs. flow), and confidence
- Users needed to explore subsets (single module, drug pathway, feedback loop)

I implemented:
- Force-directed layout with module-based clustering
- Edge styling based on type and confidence (dashed = indirect, solid = direct)
- Interactive filters: by module, by evidence level, by time window
- Preset views ("Show me the vascular pathway", "Show me amyloid clearance")

---

## Challenges and Solutions

### Challenge 1: Domain Complexity

Alzheimer's research spans 20+ sub-disciplines: neurology, immunology, cell biology, pharmacology, epidemiology, genetics. I had to synthesize literature across all of these.

**Solution**: I built systematic research workflows:
1. Start with review papers to identify key mechanisms
2. Chase citations to find original studies
3. Verify claims against primary sources
4. Extract exact quotes (no paraphrasing) for the bibliography
5. Tag each edge with evidence level based on methodology

### Challenge 2: The "Everything Connects" Problem

In complex biological systems, indirect effects cascade everywhere. If I drew every connection, the graph would be unintelligible.

**Solution**:
- Separate **direct** vs. **indirect** edges (different visual styles)
- Identify **feedback loops** explicitly and allow toggling
- Provide **preset views** that highlight specific pathways
- Use **module boundaries** to contain visual complexity

### Challenge 3: Balancing Rigor and Accessibility

The target audience includes both scientists who want citations and non-experts who need the story.

**Solution**:
- Narrative layer (scrollytelling) for accessibility
- Interactive network for exploration
- Every claim links to primary sources
- Hover states show evidence levels
- API exports for researchers who want the raw data

### Challenge 4: Citation Integrity

After seeing the Lesné scandal, I was paranoid about citation accuracy.

**Solution**:
- Every quote is **exact** (verifiable via Ctrl+F in the source)
- Built a bibliography validation system
- Linked PMIDs for verification
- Flagged claims with only weak evidence (L6-L7)

---

## Key Insights from the Work

Building this project taught me several things:

### 1. The Causation Problem is Fundamental

The biggest insight: **you cannot determine causation from studying late-stage disease**. By the time someone has dementia, all the feedback loops have been running for decades. Everything correlates with everything because everything is downstream of everything else.

This is why amyloid-clearing drugs "work" on biomarkers but fail on cognition. They're removing a downstream symptom while upstream failures continue.

### 2. Funding Structures Shape Science

The 85:1 funding ratio between patented and generic drugs isn't about scientific merit—it's about profit potential. Metformin, lithium, and TNF inhibitors have decades of safety data and promising signals, but no company can afford $500M+ trials for drugs they can't patent.

### 3. Precision Medicine is Inevitable

The field is finally recognizing that "Alzheimer's disease" is actually 5+ distinct molecular subtypes:
- Hyperplasticity (36-59% of patients)
- Innate immune activation (26-29%)
- BBB dysfunction (7-10%)
- RNA dysregulation
- Cholinergic-dominant

A single drug can't treat all of these. The future is biomarker-guided stratification: match the patient's subtype to the appropriate treatment cocktail.

---

## Technical Skills Demonstrated

| Skill | Application |
|-------|-------------|
| **Domain Modeling** | SBSF type system with 70+ types, discriminated unions, ontology references |
| **Data Visualization** | Interactive force-directed graph, scroll-driven charts, evidence hierarchy |
| **Research Synthesis** | 200+ citations extracted, validated, and structured |
| **React/Next.js** | App Router, server components, API routes, dynamic data loading |
| **TypeScript** | Complex type hierarchies, type guards, generic utilities |
| **Information Architecture** | Narrative structure, progressive disclosure, cross-referencing |
| **Systems Thinking** | Feedback loops, leverage points, causal confidence hierarchies |

---

## Future Directions

1. **Drug-Target Visualization**: Interactive view showing which treatments hit which pathway nodes
2. **Clinical Trial Tracker**: Real-time integration with ClinicalTrials.gov
3. **Subtype Calculator**: Input patient biomarkers, get predicted subtype and treatment recommendations
4. **Collaboration**: Partner with research groups to validate and extend the network

---

## Conclusion

This project started as personal curiosity about a research scandal and became a deep exploration of how scientific fields can get stuck—and what it might take to unstick them.

The Alzheimer's research community is finally recognizing that the "amyloid cascade hypothesis" was too simple. The disease has multiple entry points, multiple subtypes, and requires multiple interventions. The tools I've built here are my contribution to making that complexity navigable.

If you're working on Alzheimer's research, drug development, or scientific communication, I'd love to connect.

---

*Built with Next.js, TypeScript, and thousands of hours reading papers I never expected to understand.*
