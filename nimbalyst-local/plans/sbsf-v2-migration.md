---
planStatus:
  planId: plan-sbsf-v2-migration
  title: SBSF v2.0 Schema Migration
  status: draft
  planType: refactor
  priority: high
  owner: developer
  stakeholders:
    - developer
    - researcher
  tags:
    - sbsf
    - mechanistic-framework
    - data-model
    - refactor
  created: "2026-01-15"
  updated: "2026-01-15T12:00:00.000Z"
  progress: 0
---

# SBSF v2.0 Schema Migration

## Goals

- Migrate the mechanistic framework from SBSF v1.0 to v2.0 architecture
- Eliminate PROCESS nodes by converting them to edge labels (processes are verbs, not nouns)
- Implement proper node type classification (STOCK, STATE, BOUNDARY only)
- Add optional role annotations (REGULATOR, BIOMARKER, THERAPEUTIC_TARGET, DRUG)
- Implement four edge types (FLOW, TRANSITION, MODULATION, INFLUENCE)
- Ensure all edges have proper evidence schema with citations, quotes, and causal confidence

## Problem Description

### Current State
The existing mechanistic framework (nodes.ts, edges.ts, types.ts) uses SBSF v1.0 which treats PROCESS as a node type. This is architecturally incorrect - in proper stock-flow modeling, processes are **edges** (verbs connecting nouns), not nodes.

### Jobs to be Done
1. As a researcher, I want the graph to properly represent causal relationships so that I can reason about interventions
2. As a developer, I want a clean separation between things that accumulate (STOCK), categorical conditions (STATE), and the transformations connecting them (edges)
3. As a visualization consumer, I want edge labels to show the process name so I understand what's happening

### Examples of Incorrect vs Correct Architecture

**Wrong (SBSF v1.0):**
```
C1q (STOCK) → complement_mediated_pruning (PROCESS) → synapses (STOCK)
```

**Correct (SBSF v2.0):**
```
C1q (STOCK) --[complement_cascade_pruning | decreases]--> synapses (STOCK)
```

## High-Level Approach

### Phase 1: Update TypeScript Types
Modify `src/data/mechanisticFramework/types.ts` to reflect v2.0 schema:
- Remove 'PROCESS' from NodeCategory enum
- Add NodeRole type for optional annotations
- Update MechanisticEdge with edge_type and mechanism_label fields
- Add evidence schema types

### Phase 2: Migrate Nodes
For each module in `nodes.ts`:
- Identify all PROCESS nodes
- Determine reclassification: most become edge labels, some become STATE or STOCK with REGULATOR role
- Add `units` field to all STOCK nodes (required for v2.0)
- Add optional `roles` field where applicable

### Phase 3: Migrate Edges
For each module in `edges.ts`:
- Add `edge_type` field (FLOW, TRANSITION, MODULATION, INFLUENCE)
- Add `mechanism_label` field (the process name that was previously a node)
- Remove edges that targeted PROCESS nodes (they become the edge itself)
- Update source/target to connect STOCKs and STATEs directly

### Phase 4: Update Visualization
Modify `MechanisticNetworkGraph.tsx`:
- Remove PROCESS styling (no longer a node type)
- Add edge labels showing mechanism_label
- Update color coding for node roles

## Key Components

### Affected Files
- `src/data/mechanisticFramework/types.ts` - Type definitions
- `src/data/mechanisticFramework/nodes.ts` - Node data (17 modules)
- `src/data/mechanisticFramework/edges.ts` - Edge data (17 modules)
- `src/components/sections/MechanisticNetworkGraph.tsx` - Visualization

### Modules to Migrate (from audit document)

| Module | Status | Notes |
|--------|--------|-------|
| 4. Inflammasome & Cytokines | ✅ Template ready | Full v2.0 schema documented |
| 8. Complement & Synaptic Pruning | ✅ Template ready | 7 edges documented |
| 9. Iron & Ferroptosis | ✅ Template ready | 9 edges documented |
| 10. APOE4 & REST | ✅ Template ready | 12 edges documented |
| 11. TREM2 & DAM | ✅ Template ready | 11 edges documented |
| 12. BBB & Glymphatic | ✅ TEMPLATE | 15 edges, use as reference |
| 13. Cholinergic & White Matter | ✅ Template ready | 10 edges documented |
| 16. Sex & Ancestry | ✅ Template ready | 17 edges documented |
| 17. Temporal Patterns | ✅ Template ready | Resolves red team issues |
| 1-3, 5-7, 14, 15 | ❌ Needs migration | Follow template pattern |

### PROCESS Nodes to Reclassify

Key transformations from audit document:
- `lysosomal_genes_down` → edge label on TFEB → lysosomal_proteins
- `mitophagy_rate_reduced` → reduced rate on damage → clearance FLOW
- `NLRP3_priming` → STATE: NLRP3_primed
- `NLRP3_activation` → TRANSITION edge
- `phagocytosis_impaired` → reduced rate FLOW edge
- `tau_hyperphosphorylation` → FLOW edge (tau → pTau)
- `APP_processing` → FLOW edge (APP → Aβ)

## Acceptance Criteria

1. **No PROCESS node type exists** - All former PROCESS nodes are either edges or reclassified
2. **All STOCK nodes have units** - Required field in v2.0
3. **All edges have edge_type** - One of FLOW, TRANSITION, MODULATION, INFLUENCE
4. **All edges have mechanism_label** - The process name as edge label
5. **TypeScript builds without errors** - Types are consistent
6. **Visualization works** - Graph renders with new schema
7. **Edge evidence preserved** - No loss of citation data

## What Success Looks Like

- The mechanistic graph clearly shows stocks (rectangles with units), states (categorical), and boundaries (system edges)
- Processes appear as labeled arrows connecting nodes, not as nodes themselves
- Edge labels are visible in the visualization showing what transformation is occurring
- The data model aligns with the documented SBSF v2.0 schema in `ad_dag_sbsf_audit_tasks.md`

## Open Questions

1. Should we migrate all 17 modules at once or incrementally?
2. How do we handle nodes that are both STOCK and have REGULATOR role (e.g., GPX4)?
3. Should edge labels be shown by default in the visualization or on hover?
4. Do we need to update the checklist document simultaneously?
