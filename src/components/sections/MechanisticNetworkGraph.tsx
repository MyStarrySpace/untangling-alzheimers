'use client';

import { useCallback, useMemo, useState, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
  Node,
  Edge,
  MarkerType,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { allNodes } from '@/data/mechanisticFramework/nodes';
import { allEdges } from '@/data/mechanisticFramework/edges';
import type { MechanisticNode, BoundaryVariant } from '@/data/mechanisticFramework/types';
import { BoundaryVariantPanel } from './BoundaryVariantPanel';

// Module colors for visual grouping
const moduleColors: Record<string, string> = {
  'BOUNDARY': '#787473',
  'M01': '#486393',  // Insulin/mTOR - blue
  'M02': '#007385',  // Lysosomal - teal
  'M03': '#C9461D',  // Mitochondrial - orange
  'M04': '#E5AF19',  // Inflammasome - yellow
  'M05': '#C3577F',  // Microglial - pink
  'M06': '#60a5fa',  // Amyloid - soft blue
  'M07': '#a78bfa',  // Tau - purple
  'M08': '#34d399',  // Complement - green
  'M09': '#f472b6',  // Iron - pink
  'M10': '#8ecae6',  // APOE - teal
  'M11': '#fbbf24',  // TREM2 - yellow
  'M12': '#94a3b8',  // BBB - slate
  'M13': '#fb923c',  // Cholinergic - orange
  'M14': '#a855f7',  // MAM - violet
  'M15': '#22c55e',  // Interventions - green
  'M16': '#ec4899',  // Sex/Ancestry - pink
  'M17': '#14b8a6',  // Immunomodulatory - teal
};

// Category shapes/styles (SBSF v2.0: Only STOCK, STATE, BOUNDARY)
const categoryStyles: Record<string, { borderStyle: string; borderWidth: number }> = {
  'BOUNDARY': { borderStyle: 'dashed', borderWidth: 2 },
  'STATE': { borderStyle: 'solid', borderWidth: 2 },
  'STOCK': { borderStyle: 'solid', borderWidth: 3 },
};

// Role-based styling for REGULATOR nodes (SBSF v2.0: REGULATOR is now a role, not category)
const roleStyles: Record<string, { borderColor?: string; borderStyle?: string }> = {
  'REGULATOR': { borderColor: '#e36216', borderStyle: 'double' },
  'THERAPEUTIC_TARGET': { borderColor: '#C9461D' },
  'BIOMARKER': { borderColor: '#34d399' },
  'DRUG': { borderColor: '#5a8a6e' },
};

// Compute topological layers for DAG layout (left-to-right)
function computeDAGLayers(
  nodes: MechanisticNode[],
  edges: typeof allEdges
): Map<string, number> {
  const nodeIds = new Set(nodes.map(n => n.id));
  const relevantEdges = edges.filter(e => nodeIds.has(e.source) && nodeIds.has(e.target));

  // Build adjacency lists
  const inDegree: Record<string, number> = {};
  const outEdges: Record<string, string[]> = {};

  nodes.forEach(n => {
    inDegree[n.id] = 0;
    outEdges[n.id] = [];
  });

  relevantEdges.forEach(e => {
    inDegree[e.target] = (inDegree[e.target] || 0) + 1;
    outEdges[e.source] = outEdges[e.source] || [];
    outEdges[e.source].push(e.target);
  });

  // Kahn's algorithm for topological sort with layer assignment
  const layers = new Map<string, number>();
  let queue = nodes.filter(n => inDegree[n.id] === 0).map(n => n.id);
  let layer = 0;

  while (queue.length > 0) {
    const nextQueue: string[] = [];

    queue.forEach(nodeId => {
      layers.set(nodeId, layer);

      (outEdges[nodeId] || []).forEach(targetId => {
        inDegree[targetId]--;
        if (inDegree[targetId] === 0) {
          nextQueue.push(targetId);
        }
      });
    });

    queue = nextQueue;
    layer++;
  }

  // Handle any remaining nodes (cycles or disconnected) - place at end
  nodes.forEach(n => {
    if (!layers.has(n.id)) {
      layers.set(n.id, layer);
    }
  });

  return layers;
}

// Convert mechanistic nodes to React Flow nodes with DAG layout
function convertNodes(nodes: MechanisticNode[], selectedModule: string | null): Node[] {
  // Filter by module if selected
  const filteredNodes = selectedModule
    ? nodes.filter(n => n.moduleId === selectedModule)
    : nodes;

  // Compute DAG layers for left-to-right positioning
  const layers = computeDAGLayers(filteredNodes, allEdges);

  // Group nodes by layer
  const layerGroups: Record<number, MechanisticNode[]> = {};
  filteredNodes.forEach(node => {
    const layer = layers.get(node.id) ?? 0;
    if (!layerGroups[layer]) {
      layerGroups[layer] = [];
    }
    layerGroups[layer].push(node);
  });

  const flowNodes: Node[] = [];
  const layerWidth = 220;
  const nodeHeight = 80;
  const layerPadding = 40;

  // Position nodes: X based on layer (left-to-right), Y distributed within layer
  Object.entries(layerGroups).forEach(([layerStr, layerNodes]) => {
    const layer = parseInt(layerStr);
    const x = layer * layerWidth + layerPadding;

    // Sort nodes within layer by module for visual grouping
    layerNodes.sort((a, b) => a.moduleId.localeCompare(b.moduleId));

    layerNodes.forEach((node, index) => {
      const y = index * nodeHeight + layerPadding;
      const color = moduleColors[node.moduleId] || '#787473';
      const catStyle = categoryStyles[node.category] || categoryStyles['STATE'];

      // SBSF v2.0: Apply role-based styling if node has roles
      let borderColor = color;
      let borderStyle = catStyle.borderStyle;
      if (node.roles) {
        // Check for role-specific styling (priority: REGULATOR > THERAPEUTIC_TARGET > BIOMARKER > DRUG)
        for (const role of ['REGULATOR', 'THERAPEUTIC_TARGET', 'BIOMARKER', 'DRUG'] as const) {
          if (node.roles.includes(role) && roleStyles[role]) {
            if (roleStyles[role].borderColor) borderColor = roleStyles[role].borderColor!;
            if (roleStyles[role].borderStyle) borderStyle = roleStyles[role].borderStyle!;
            break;
          }
        }
      }

      // Check if this is a boundary node with variants
      const hasVariants = node.category === 'BOUNDARY' && node.variants && node.variants.length > 0;

      flowNodes.push({
        id: node.id,
        position: { x, y },
        data: {
          label: node.label,
          description: node.description,
          mechanism: node.mechanism,
          moduleId: node.moduleId,
          category: node.category,
          subtype: node.subtype,
          roles: node.roles,
          // Boundary variant data
          variants: node.variants,
          defaultVariant: node.defaultVariant,
          hasVariants,
        },
        style: {
          background: '#ffffff',
          border: `${catStyle.borderWidth}px ${borderStyle} ${borderColor}`,
          borderRadius: node.category === 'BOUNDARY' ? '50%' : '4px',
          padding: '8px 12px',
          fontSize: '11px',
          fontWeight: 500,
          color: '#2d2d2d',
          width: 180,
          textAlign: 'center' as const,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      });
    });
  });

  return flowNodes;
}

// Convert mechanistic edges to React Flow edges
function convertEdges(edges: typeof allEdges, selectedModule: string | null): Edge[] {
  const filteredEdges = selectedModule
    ? edges.filter(e => e.moduleId === selectedModule)
    : edges;

  return filteredEdges.map(edge => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    animated: edge.relation === 'directlyIncreases' || edge.relation === 'directlyDecreases',
    style: {
      stroke: edge.relation.includes('Decrease') ? '#c75146' : '#007385',
      strokeWidth: edge.causalConfidence?.startsWith('L')
        ? Math.max(1, 8 - parseInt(edge.causalConfidence.slice(1)))
        : 1,
      cursor: 'pointer',
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: edge.relation.includes('Decrease') ? '#c75146' : '#007385',
    },
    label: edge.mechanismLabel?.slice(0, 20),
    labelStyle: { fontSize: 9, fill: '#7a7a7a', cursor: 'pointer' },
    // Store full edge data for tooltip
    data: {
      mechanismLabel: edge.mechanismLabel,
      mechanismDescription: edge.mechanismDescription,
      relation: edge.relation,
      edgeType: edge.edgeType,
      causalConfidence: edge.causalConfidence,
      evidence: edge.evidence,
      keyInsight: edge.keyInsight,
      therapeuticImplication: edge.therapeuticImplication,
      translationalGap: edge.translationalGap,
    },
  }));
}

// Get unique modules for filter
function getModules(nodes: MechanisticNode[]): { id: string; label: string; count: number }[] {
  const moduleMap: Record<string, number> = {};
  nodes.forEach(node => {
    moduleMap[node.moduleId] = (moduleMap[node.moduleId] || 0) + 1;
  });

  const moduleLabels: Record<string, string> = {
    'BOUNDARY': 'Boundaries',
    'M01': 'Insulin/mTOR',
    'M02': 'Lysosomal',
    'M03': 'Mitochondrial',
    'M04': 'Inflammasome',
    'M05': 'Microglial',
    'M06': 'Amyloid',
    'M07': 'Tau',
    'M08': 'Complement',
    'M09': 'Iron',
    'M10': 'APOE',
    'M11': 'TREM2',
    'M12': 'BBB/Glymphatic',
    'M13': 'Cholinergic',
    'M14': 'MAM/Calcium',
    'M15': 'Interventions',
    'M16': 'Sex/Ancestry',
    'M17': 'Immunomodulatory',
  };

  return Object.entries(moduleMap)
    .map(([id, count]) => ({
      id,
      label: moduleLabels[id] || id,
      count,
    }))
    .sort((a, b) => {
      if (a.id === 'BOUNDARY') return -1;
      if (b.id === 'BOUNDARY') return 1;
      return a.id.localeCompare(b.id);
    });
}

interface MechanisticNetworkGraphProps {
  height?: string;
  showControls?: boolean;
  showMiniMap?: boolean;
}

// Inner component that uses useReactFlow (must be inside ReactFlowProvider)
function MechanisticNetworkGraphInner({
  height = '600px',
  showControls = true,
  showMiniMap = true,
}: MechanisticNetworkGraphProps) {
  const [selectedModule, setSelectedModule] = useState<string | null>('M01');
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [hoveredVariant, setHoveredVariant] = useState<string | null>(null);
  const { fitView } = useReactFlow();

  const modules = useMemo(() => getModules(allNodes), []);

  const initialNodes = useMemo(
    () => convertNodes(allNodes, selectedModule),
    [selectedModule]
  );

  const initialEdges = useMemo(
    () => convertEdges(allEdges, selectedModule),
    [selectedModule]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes/edges when module changes
  const handleModuleChange = useCallback((moduleId: string | null) => {
    setSelectedModule(moduleId);
    const newNodes = convertNodes(allNodes, moduleId);
    const newEdges = convertEdges(allEdges, moduleId);
    setNodes(newNodes);
    setEdges(newEdges);
    setSelectedNode(null);
    setSelectedEdge(null);
    setSelectedVariant(null);
    setHoveredVariant(null);
  }, [setNodes, setEdges]);

  // Fit view when nodes change (after module filter)
  useEffect(() => {
    // Small delay to ensure nodes are rendered before fitting
    const timer = setTimeout(() => {
      fitView({ padding: 0.2, duration: 300 });
    }, 50);
    return () => clearTimeout(timer);
  }, [nodes, fitView]);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setSelectedEdge(null);
    // Clear variant state when selecting a new node
    if (!node.data?.hasVariants) {
      setSelectedVariant(null);
      setHoveredVariant(null);
    }
  }, []);

  const onEdgeClick = useCallback((_: React.MouseEvent, edge: Edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  }, []);

  return (
    <div className="border border-[var(--border)] bg-white" style={{ height }}>
      {/* Module filter */}
      <div className="p-3 border-b border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="flex flex-wrap gap-2 mb-2">
          <button
            onClick={() => handleModuleChange(null)}
            className={`px-2 py-1 text-xs rounded ${
              selectedModule === null
                ? 'bg-[var(--accent-orange)] text-white'
                : 'bg-white border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent-orange)]'
            }`}
          >
            All ({allNodes.length})
          </button>
          {modules.map(module => (
            <button
              key={module.id}
              onClick={() => handleModuleChange(module.id)}
              className={`px-2 py-1 text-xs rounded ${
                selectedModule === module.id
                  ? 'text-white'
                  : 'bg-white border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent-orange)]'
              }`}
              style={{
                backgroundColor: selectedModule === module.id ? moduleColors[module.id] : undefined,
              }}
            >
              {module.label} ({module.count})
            </button>
          ))}
        </div>
        <p className="text-xs text-[var(--text-muted)]">
          {nodes.length} nodes, {edges.length} edges
        </p>
      </div>

      {/* Graph */}
      <div style={{ height: `calc(${height} - ${selectedNode || selectedEdge ? '220px' : '100px'})` }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          fitView
          attributionPosition="bottom-left"
        >
          <Background color="#e5e2dd" gap={20} />
          {showControls && <Controls />}
          {showMiniMap && (
            <MiniMap
              nodeColor={(node) => moduleColors[node.data?.moduleId as string] || '#787473'}
              maskColor="rgba(250, 249, 247, 0.8)"
            />
          )}
        </ReactFlow>
      </div>

      {/* Selected node details */}
      {selectedNode && (
        <div className="p-3 border-t border-[var(--border)] bg-[var(--bg-primary)]">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-[var(--text-primary)]">{selectedNode.data.label as string}</h4>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[var(--text-muted)]">Category: </span>
              <span className="text-[var(--text-body)]">{selectedNode.data.category as string}</span>
            </div>
            <div>
              <span className="text-[var(--text-muted)]">Subtype: </span>
              <span className="text-[var(--text-body)]">{selectedNode.data.subtype as string}</span>
            </div>
          </div>
          {selectedNode.data.description ? (
            <p className="mt-2 text-xs text-[var(--text-body)]">{String(selectedNode.data.description)}</p>
          ) : null}
          {selectedNode.data.mechanism ? (
            <p className="mt-1 text-xs text-[var(--text-muted)] italic">{String(selectedNode.data.mechanism)}</p>
          ) : null}
          {selectedNode.data.roles && Array.isArray(selectedNode.data.roles) && (selectedNode.data.roles as string[]).length > 0 ? (
            <div className="mt-2 flex gap-1">
              {(selectedNode.data.roles as string[]).map(role => (
                <span key={role} className="px-1.5 py-0.5 text-[10px] bg-[var(--accent-orange-light)] text-[var(--accent-orange)] rounded">
                  {role}
                </span>
              ))}
            </div>
          ) : null}

          {/* Boundary node variant panel */}
          {selectedNode.data.hasVariants && selectedNode.data.variants ? (
            <div className="mt-3">
              <BoundaryVariantPanel
                variants={selectedNode.data.variants as BoundaryVariant[]}
                defaultVariant={selectedNode.data.defaultVariant as string | undefined}
                selectedVariant={selectedVariant}
                hoveredVariant={hoveredVariant}
                onVariantSelect={setSelectedVariant}
                onVariantHover={setHoveredVariant}
              />
            </div>
          ) : null}
        </div>
      )}

      {/* Selected edge details */}
      {selectedEdge && selectedEdge.data && (() => {
        const edgeData = selectedEdge.data as {
          mechanismLabel?: string;
          mechanismDescription?: string;
          relation?: string;
          edgeType?: string;
          causalConfidence?: string;
          evidence?: Array<{pmid?: string; firstAuthor: string; year: number; methodType: string; quote?: string}>;
          keyInsight?: string;
          therapeuticImplication?: string;
          translationalGap?: string;
        };
        return (
        <div className="p-3 border-t border-[var(--border)] bg-[var(--bg-primary)] overflow-y-auto max-h-[200px]">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-semibold text-[var(--text-primary)]">
                {selectedEdge.source} → {selectedEdge.target}
              </h4>
              {edgeData.mechanismLabel && (
                <span className="text-xs text-[var(--text-muted)]">{edgeData.mechanismLabel}</span>
              )}
            </div>
            <button
              onClick={() => setSelectedEdge(null)}
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              Close
            </button>
          </div>

          {/* Relation and confidence */}
          <div className="grid grid-cols-3 gap-2 text-xs mb-2">
            <div>
              <span className="text-[var(--text-muted)]">Relation: </span>
              <span className={`font-medium ${
                edgeData.relation?.includes('Decrease') ? 'text-[#c75146]' : 'text-[#007385]'
              }`}>
                {edgeData.relation}
              </span>
            </div>
            {edgeData.edgeType && (
              <div>
                <span className="text-[var(--text-muted)]">Type: </span>
                <span className="text-[var(--text-body)]">{edgeData.edgeType}</span>
              </div>
            )}
            {edgeData.causalConfidence && (
              <div>
                <span className="text-[var(--text-muted)]">Confidence: </span>
                <span className="font-medium text-[var(--accent-orange)]">{edgeData.causalConfidence}</span>
              </div>
            )}
          </div>

          {/* Mechanism description */}
          {edgeData.mechanismDescription && (
            <p className="text-xs text-[var(--text-body)] mb-2">{edgeData.mechanismDescription}</p>
          )}

          {/* Key insight */}
          {edgeData.keyInsight && (
            <p className="text-xs text-[var(--success)] bg-[var(--success-light)] px-2 py-1 rounded mb-2">
              {edgeData.keyInsight}
            </p>
          )}

          {/* Translational gap */}
          {edgeData.translationalGap && (
            <p className="text-xs text-[var(--danger)] bg-[var(--danger-light)] px-2 py-1 rounded mb-2">
              {edgeData.translationalGap}
            </p>
          )}

          {/* Evidence citations */}
          {edgeData.evidence && edgeData.evidence.length > 0 && (
            <div className="mt-2 border-t border-[var(--border)] pt-2">
              <span className="text-xs font-medium text-[var(--text-muted)]">Evidence ({edgeData.evidence.length}):</span>
              <div className="mt-1 space-y-1">
                {edgeData.evidence.slice(0, 3).map((ev, i) => (
                  <div key={i} className="text-[10px] text-[var(--text-body)] bg-white p-1.5 rounded border border-[var(--border)]">
                    <div className="flex justify-between">
                      <span className="font-medium">{ev.firstAuthor} et al., {ev.year}</span>
                      <span className="text-[var(--text-muted)]">{ev.methodType}</span>
                    </div>
                    {ev.pmid && (
                      <a
                        href={`https://pubmed.ncbi.nlm.nih.gov/${ev.pmid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--accent-orange)] hover:underline"
                      >
                        PMID: {ev.pmid}
                      </a>
                    )}
                    {ev.quote && (
                      <p className="mt-1 italic text-[var(--text-muted)]">&ldquo;{ev.quote.slice(0, 150)}...&rdquo;</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        );
      })()}
    </div>
  );
}

// Wrapper component that provides ReactFlowProvider
export function MechanisticNetworkGraph(props: MechanisticNetworkGraphProps) {
  return (
    <ReactFlowProvider>
      <MechanisticNetworkGraphInner {...props} />
    </ReactFlowProvider>
  );
}
