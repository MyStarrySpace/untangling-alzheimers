---
planStatus:
  planId: plan-mechanistic-network-viz
  title: Mechanistic Network Visualization Tool
  status: draft
  planType: feature
  priority: high
  owner: developer
  stakeholders:
    - developer
    - research-team
  tags:
    - visualization
    - network-graph
    - mechanistic-framework
    - interactive
  created: "2026-01-14"
  updated: "2026-01-14T18:30:00.000Z"
  progress: 0
---

# Mechanistic Network Visualization Tool

## Goals

1. Create an interactive network visualization of the AD mechanistic framework (16 modules, ~140 nodes, ~100+ edges)
2. Provide contextual understanding throughout the presentation narrative
3. Allow users to explore causal relationships, evidence strength, and therapeutic targets
4. Integrate with existing scrollytelling sections to highlight relevant subnetworks
5. Support both overview exploration and detail-on-demand patterns

## Problem Description

### The Story Problem
The project has built a white-box mechanistic AD model with ROC ~0.90, but this complex causal network is currently only documented in markdown files and TypeScript data structures. Users need to:
- **Understand the big picture**: How do 16 modules interconnect?
- **Explore causal paths**: What causes what? Which evidence supports each edge?
- **See therapeutic implications**: Where are the intervention points? What's been tried?
- **Track disease progression**: How does upstream dysfunction cascade to clinical outcomes?

### Jobs to be Done
1. **As a reader**, I want to see how insulin resistance leads to amyloid deposition through multiple intermediate steps, so I understand why targeting amyloid alone fails
2. **As a researcher**, I want to explore nodes by evidence strength and cross-module connections, so I can identify understudied but promising targets
3. **As a storyteller**, I want to highlight specific subnetworks during narrative sections, so the network provides context throughout the presentation

## Research: Best Practices Applied

Based on [Ten Simple Rules for Biological Network Figures](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1007244) and [React Graph Visualization Guide](https://cambridge-intelligence.com/react-graph-visualization-library/):

### Design Principles to Follow
1. **Purpose-driven layout**: Use hierarchical layout showing causal flow (boundaries → mechanisms → outcomes)
2. **Module-based clustering**: Color-code by module; allow collapse/expand for managing complexity
3. **Evidence-aware encoding**: Visual weight/opacity by causal confidence (L1-L3 strongest, L6-L7 weakest)
4. **Color-blind safe palette**: Use existing MODULE_COLORS with luminance testing
5. **Overview + Detail pattern**: Full network with click-to-zoom into module subnetworks
6. **Readable labeling**: Node labels on hover/select, edge mechanism on click
7. **Avoid 3D**: Keep 2D despite library support; 3D adds occlusion without benefit

### Interactivity Requirements
- Pan/zoom with smooth transitions
- Node selection → highlight connected edges
- Module filtering → show/hide module groups
- Edge confidence filtering → show only high-confidence paths
- Hover tooltips for node/edge details
- Click for detailed side panel

## High-Level Approach

### Library Choice: Reagraph
Based on research from [Reagraph docs](https://reagraph.dev/), this library fits because:
- WebGL performance handles 100+ nodes smoothly
- React-native with declarative API matching project patterns
- Built-in clustering, theming, and layout engines
- Supports custom node rendering for category shapes
- Active maintenance and good documentation

### Architecture Components

1. **Data Adapter Layer**
   - Transform mechanisticFramework nodes/edges to Reagraph format
   - Add visual properties (color, size, shape) based on node category and module

2. **MechanisticNetworkCanvas Component**
   - Main visualization canvas with Reagraph
   - Configurable layout modes (hierarchical, force-directed, module-clustered)
   - Theme integration with existing CSS variables

3. **NetworkControls Component**
   - Module filter toggles
   - Confidence level slider
   - Layout mode selector
   - Search/find node input

4. **NetworkDetailPanel Component**
   - Selected node details (category, references, therapeutic implications)
   - Selected edge details (mechanism, evidence citations, confidence)
   - Related feedback loops

5. **NetworkMinimap Component**
   - Overview thumbnail for navigation in large networks
   - Current viewport indicator

6. **Section Integration Hooks**
   - `useNetworkHighlight(moduleIds)` - highlight specific modules during scrollytelling
   - `useNetworkFocus(nodeId)` - zoom to specific node
   - Integration with existing Section components

### Visual Encoding Scheme

| Element | Encoding |
|---------|----------|
| Node shape | By category (circle=STOCK, diamond=REGULATOR, square=PROCESS, hexagon=STATE, triangle=BOUNDARY) |
| Node color | By module (use existing MODULE_COLORS) |
| Node size | By degree (hub nodes larger) |
| Node border | By role (thick=THERAPEUTIC_TARGET, dashed=BIOMARKER) |
| Edge color | By confidence (gradient from green=L1-L3 to gray=L6-L7) |
| Edge width | By relation type (thick=direct, thin=indirect) |
| Edge style | Dashed for cross-module connections |

## Key Components & Files

### New Files to Create
- `src/components/visualization/MechanisticNetworkCanvas.tsx`
- `src/components/visualization/NetworkControls.tsx`
- `src/components/visualization/NetworkDetailPanel.tsx`
- `src/components/visualization/NetworkMinimap.tsx`
- `src/components/visualization/index.ts`
- `src/hooks/useNetworkHighlight.ts`
- `src/hooks/useNetworkFocus.ts`
- `src/lib/networkAdapter.ts` (transforms framework data to Reagraph format)

### Files to Modify
- `src/app/page.tsx` - Add network visualization section
- `src/components/sections/index.ts` - Export new components
- `package.json` - Add reagraph dependency

### Data Files (Already Complete)
- `src/data/mechanisticFramework/nodes.ts` - 140+ nodes across 16 modules
- `src/data/mechanisticFramework/edges.ts` - 100+ edges with evidence
- `src/data/mechanisticFramework/feedbackLoops.ts` - 7 feedback loops
- `src/data/mechanisticFramework/modules.ts` - 16 module definitions

## Acceptance Criteria

### Core Functionality
- [ ] Network renders all nodes and edges from mechanisticFramework
- [ ] Nodes colored by module, shaped by category
- [ ] Clicking a node shows details in side panel
- [ ] Clicking an edge shows mechanism and evidence
- [ ] Module filter toggles work correctly
- [ ] Confidence slider filters edges appropriately

### Performance
- [ ] Initial render under 500ms
- [ ] Smooth 60fps pan/zoom interactions
- [ ] No jank when filtering/highlighting

### Integration
- [ ] Works with existing theme (light mode CSS variables)
- [ ] Responsive behavior on different screen sizes
- [ ] Accessible keyboard navigation for node selection

### Storytelling
- [ ] Can programmatically highlight modules during scroll
- [ ] Smooth transitions when switching focus

## Success Metrics

1. **Comprehension**: Users can trace a path from insulin_resistance to cognitive_decline
2. **Exploration**: Average time on visualization section >2 minutes
3. **Integration**: Network context appears in at least 3 narrative sections
4. **Performance**: Lighthouse performance score remains >90

## Open Questions

1. **Standalone page vs embedded section?**
   - Could be a `/network` page for deep exploration
   - AND/OR embedded mini-view in main scrollytelling

2. **Mobile experience?**
   - Touch pan/zoom on mobile
   - Simplified view showing only current module?

3. **Persistence?**
   - Save user's filter/zoom state in URL params?
   - Remember last explored node?

4. **Animation during scroll?**
   - Auto-play cascade animation as user scrolls?
   - Progressive reveal of modules?

## References

- [Ten Simple Rules for Biological Network Figures](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1007244)
- [Reagraph Documentation](https://reagraph.dev/)
- [React Graph Visualization Guide](https://cambridge-intelligence.com/react-graph-visualization-library/)
- [DAGitty - Causal DAG Tool](https://www.dagitty.net/)
- [Causalvis: Visualizations for Causal Inference](https://dl.acm.org/doi/10.1145/3544548.3581236)
