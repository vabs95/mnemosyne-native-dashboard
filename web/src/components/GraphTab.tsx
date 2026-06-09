import React, { useState, useEffect, useRef } from 'react';
import { fetchJSON, Card, CardContent, Button, Input, Badge, Tabs, TabsList, TabsTrigger } from '@hermes/sdk';
import { t } from '@/utils/i18n';
import { safeNumber } from '@/utils/format';
import { Node, Edge, API_BASE } from '@/types';

interface GraphData {
  nodes: Node[];
  edges: Edge[];
}

interface GraphTabProps {
  onInspectMemory: (id: string) => void;
  onNavigateToTab: (tab: string) => void;
}

/**
 * GraphTab Component
 * Renders the relationship knowledge graph (using SVG circular layout with pan/zoom)
 * and the semantic triples facts table.
 */
export const GraphTab: React.FC<GraphTabProps> = ({ onInspectMemory, onNavigateToTab }) => {
  const [activePanel, setActivePanel] = useState<'graph' | 'triples'>('graph');
  
  // Graph Panel State
  const [graphQuery, setGraphQuery] = useState('');
  const [processedNodes, setProcessedNodes] = useState<Node[]>([]);
  const [processedEdges, setProcessedEdges] = useState<Edge[]>([]);
  const [loadingGraph, setLoadingGraph] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);

  // Triple Panel State
  const [tripleQuery, setTripleQuery] = useState('');
  const [triples, setTriples] = useState<Edge[]>([]);
  const [loadingTriples, setLoadingTriples] = useState(false);
  
  // Modal for raw JSON inspection
  const [inspectingJson, setInspectingJson] = useState<object | null>(null);

  // Pan / Zoom state for SVG
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [zoomState, setZoomState] = useState({
    scale: 1,
    x: 0,
    y: 0,
    dragging: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0
  });

  // Fetch graph data
  async function loadGraphData(queryStr: string = '') {
    setLoadingGraph(true);
    setSelectedNode(null);
    setSelectedEdge(null);
    try {
      const q = encodeURIComponent(queryStr.trim());
      const data = await fetchJSON(`${API_BASE}/graph?q=${q}&limit=300`);
      
      // Calculate layout coordinates using a force-directed (Fruchterman-Reingold) simulation
      const w = 1000;
      const h = 650;
      const cx = w / 2;
      const cy = h / 2;

      const nodesList: Node[] = (data.nodes || []).slice(0, 160);
      const nodeMap = new Map<string, any>();
      
      // Initialize nodes with a spiral pattern to prevent overlays
      nodesList.forEach((n, idx) => {
        const angle = idx * 0.15 * Math.PI;
        const radius = 25 + idx * 2.2;
        nodeMap.set(n.id, {
          ...n,
          x: cx + Math.cos(angle) * radius,
          y: cy + Math.sin(angle) * radius,
          vx: 0,
          vy: 0
        });
      });

      const filteredEdges = (data.edges || []).filter((e: Edge) => 
        nodeMap.has(e.source) && nodeMap.has(e.target)
      ).slice(0, 300);

      // Force-directed layout parameters
      const iterations = 150;
      const k = Math.sqrt((w * h) / (nodesList.length || 1)) * 0.72; // Optimal spacing distance

      for (let iter = 0; iter < iterations; iter++) {
        // 1. Repulsive forces (nodes push away from each other)
        for (let i = 0; i < nodesList.length; i++) {
          const n1 = nodeMap.get(nodesList[i].id);
          for (let j = i + 1; j < nodesList.length; j++) {
            const n2 = nodeMap.get(nodesList[j].id);
            const dx = n1.x - n2.x;
            const dy = n1.y - n2.y;
            const dist = Math.hypot(dx, dy) || 1;
            if (dist < 320) {
              const force = (k * k) / dist * 0.45;
              const fx = (dx / dist) * force;
              const fy = (dy / dist) * force;
              n1.vx += fx;
              n1.vy += fy;
              n2.vx -= fx;
              n2.vy -= fy;
            }
          }
        }

        // 2. Attractive forces (connected nodes pull together)
        for (const edge of filteredEdges) {
          const n1 = nodeMap.get(edge.source);
          const n2 = nodeMap.get(edge.target);
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.hypot(dx, dy) || 1;
          const force = (dist * dist) / k * 0.16;
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          n1.vx -= fx;
          n1.vy -= fy;
          n2.vx += fx;
          n2.vy += fy;
        }

        // 3. Central gravity + position updates with cooling temperature
        const temp = 1 - (iter / iterations);
        for (const n of nodeMap.values()) {
          const dx = n.x - cx;
          const dy = n.y - cy;
          const dist = Math.hypot(dx, dy) || 1;
          n.vx -= (dx / dist) * 0.08 * k;
          n.vy -= (dy / dist) * 0.08 * k;

          const vel = Math.hypot(n.vx, n.vy) || 1;
          const maxDisp = 16 * temp;
          const disp = Math.min(maxDisp, vel);
          
          n.x += (n.vx / vel) * disp;
          n.y += (n.vy / vel) * disp;

          // Keep nodes inside viewport with some padding
          n.x = Math.max(35, Math.min(w - 35, n.x));
          n.y = Math.max(35, Math.min(h - 35, n.y));

          // Reset force accumulators
          n.vx = 0;
          n.vy = 0;
        }
      }

      const mappedNodes = nodesList.map(n => nodeMap.get(n.id) as Node);
      setProcessedNodes(mappedNodes);
      setProcessedEdges(filteredEdges);
    } catch (err) {
      console.error('Failed to load graph data', err);
    } finally {
      setLoadingGraph(false);
    }
  }

  // Fetch triples data
  async function loadTriplesData(queryStr: string = '') {
    setLoadingTriples(true);
    try {
      const q = encodeURIComponent(queryStr.trim());
      const res = await fetchJSON(`${API_BASE}/triples?q=${q}&limit=200`);
      setTriples(res.items || []);
    } catch (err) {
      console.error('Failed to load triples data', err);
    } finally {
      setLoadingTriples(false);
    }
  }

  // Load initial graph on mount
  useEffect(() => {
    loadGraphData();
  }, []);

  // Sync triples fetch when switching to the triples panel
  useEffect(() => {
    if (activePanel === 'triples') {
      loadTriplesData(tripleQuery);
    }
  }, [activePanel]);

  // Handle graph SVG zoom using mouse wheel
  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 1000;
    const py = ((e.clientY - rect.top) / rect.height) * 650;
    const oldScale = zoomState.scale;
    const nextScale = Math.max(0.35, Math.min(4, oldScale * (e.deltaY < 0 ? 1.12 : 0.88)));
    
    setZoomState(prev => ({
      ...prev,
      x: px - (px - prev.x) * (nextScale / oldScale),
      y: py - (py - prev.y) * (nextScale / oldScale),
      scale: nextScale
    }));
  };

  // Pointer down event to begin panning
  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    // If clicking a node or edge, do not initiate background panning
    const target = e.target as SVGElement;
    if (target.closest('.interactive-node') || target.closest('.interactive-edge')) {
      return;
    }
    setZoomState(prev => ({
      ...prev,
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      originX: prev.x,
      originY: prev.y
    }));
    if (svgRef.current) {
      svgRef.current.setPointerCapture(e.pointerId);
    }
  };

  // Pointer move event for panning
  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!zoomState.dragging) return;
    const dx = e.clientX - zoomState.startX;
    const dy = e.clientY - zoomState.startY;
    setZoomState(prev => ({
      ...prev,
      x: prev.originX + dx,
      y: prev.originY + dy
    }));
  };

  // Pointer up/leave events
  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    if (zoomState.dragging) {
      setZoomState(prev => ({ ...prev, dragging: false }));
      if (svgRef.current) {
        try {
          svgRef.current.releasePointerCapture(e.pointerId);
        } catch (err) {
          console.debug('Failed to release pointer capture:', err);
        }
      }
    }
  };

  const handleResetView = () => {
    setZoomState({
      scale: 1,
      x: 0,
      y: 0,
      dragging: false,
      startX: 0,
      startY: 0,
      originX: 0,
      originY: 0
    });
  };

  const selectNode = (node: Node) => {
    setSelectedEdge(null);
    setSelectedNode(node);
  };

  const selectEdge = (edge: Edge) => {
    setSelectedNode(null);
    setSelectedEdge(edge);
  };

  // Check if element is dimmed during active selection
  const isDimmedNode = (nodeId: string) => {
    if (selectedNode) {
      if (selectedNode.id === nodeId) return false;
      // Is connected to selected node?
      const isConnected = processedEdges.some(e => 
        (e.source === selectedNode.id && e.target === nodeId) ||
        (e.target === selectedNode.id && e.source === nodeId)
      );
      return !isConnected;
    }
    if (selectedEdge) {
      return selectedEdge.source !== nodeId && selectedEdge.target !== nodeId;
    }
    return false;
  };

  const isDimmedEdge = (edgeId: string) => {
    if (selectedEdge) {
      return selectedEdge.id !== edgeId;
    }
    if (selectedNode) {
      // Is edge connected to selected node?
      const edgeObj = processedEdges.find(e => e.id === edgeId);
      if (!edgeObj) return true;
      return edgeObj.source !== selectedNode.id && edgeObj.target !== selectedNode.id;
    }
    return false;
  };

  // Get connected edges/triples for a node
  const getConnectedEdges = (nodeId: string) => {
    return processedEdges.filter(e => e.source === nodeId || e.target === nodeId);
  };

  const renderTriplesContent = () => {
    if (loadingTriples) {
      return <tr><td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: 'rgba(234,234,234,0.4)' }}>{t('graph.searchingKg')}</td></tr>;
    }
    if (triples.length === 0) {
      return <tr><td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: 'rgba(234,234,234,0.4)' }}>{t('graph.noTriplesMatch')}</td></tr>;
    }
    return triples.map(t_item => (
      <tr key={t_item.id} style={{ borderBottom: '1px solid rgba(234,234,234,0.06)' }}
        onMouseEnter={ev => (ev.currentTarget.style.background = 'rgba(234,234,234,0.04)')}
        onMouseLeave={ev => (ev.currentTarget.style.background = '')}>
        <td style={{ padding: '10px 12px', fontFamily: 'var(--theme-font-mono)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={t_item.subject}>{t_item.subject}</td>
        <td style={{ padding: '10px 12px', fontFamily: 'var(--theme-font-mono)', color: '#f59e0b', fontWeight: 600, maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={t_item.predicate}>{t_item.predicate}</td>
        <td style={{ padding: '10px 12px', fontFamily: 'var(--theme-font-mono)', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={t_item.object}>{t_item.object}</td>
        <td style={{ padding: '10px 12px', fontFamily: 'var(--theme-font-mono)', textAlign: 'center' }}>{safeNumber(t_item.confidence, 2)}</td>
        <td style={{ padding: '10px 12px', textAlign: 'right' }}>
          <Button ghost onClick={() => setInspectingJson(t_item)}>{t('common.details')}</Button>
        </td>
      </tr>
    ));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Dynamic styles to handle SVG states without style leaks */}
      <style>{`
        .interactive-node {
          cursor: pointer;
          transition: transform 0.2s ease, fill 0.2s ease;
        }
        .interactive-node:hover {
          fill: #eaeaea !important;
          stroke: #ffffff !important;
        }
        .interactive-edge {
          cursor: pointer;
          stroke-width: 1.5;
          stroke: rgba(234,234,234,0.3);
          opacity: 0.6;
          transition: stroke-width 0.2s ease, stroke 0.2s ease, opacity 0.2s ease;
        }
        .interactive-edge:hover, .interactive-edge.selected {
          stroke-width: 3.5;
          stroke: #f59e0b !important;
          opacity: 1;
        }
        .interactive-label {
          font-size: 10px;
          cursor: pointer;
          fill: #f59e0b;
          paint-order: stroke;
          stroke: #0e0e0e;
          stroke-width: 3px;
          transition: fill 0.2s ease;
        }
        .interactive-label:hover, .interactive-label.selected {
          fill: #eaeaea !important;
          font-weight: bold;
        }
        .interactive-text {
          font-size: 11px;
          cursor: pointer;
          fill: rgba(234,234,234,0.85);
          paint-order: stroke;
          stroke: #0e0e0e;
          stroke-width: 3px;
        }
        .dimmed {
          opacity: 0.15 !important;
        }
        .panning-svg {
          cursor: grabbing !important;
        }
      `}</style>

      {/* Sub-tabs using SDK Tabs */}
      <Tabs defaultValue="graph" className="">
        {(activeValue: string, setActiveValue: (v: string) => void) => {
          const currentPanel = activeValue || 'graph';
          return (
            <TabsList style={{ marginBottom: '16px', flexWrap: 'wrap', height: 'auto', gap: '2px' }}>
              <TabsTrigger value="graph" active={currentPanel === 'graph'} onClick={() => { setActiveValue('graph'); setActivePanel('graph'); }}>{t('graph.relationshipGraph')}</TabsTrigger>
              <TabsTrigger value="triples" active={currentPanel === 'triples'} onClick={() => { setActiveValue('triples'); setActivePanel('triples'); }}>{t('graph.factsTable')}</TabsTrigger>
            </TabsList>
          );
        }}
      </Tabs>

      {activePanel === 'graph' && (
        <div className="space-y-4">
          {/* Toolbar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', padding: '12px 16px', borderRadius: '4px', background: 'rgba(234,234,234,0.04)', border: '1px solid rgba(234,234,234,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '280px' }}>
              <Input
                placeholder={t('graph.filterGraphPlaceholder')}
                value={graphQuery}
                onChange={(e: any) => setGraphQuery(e.target.value)}
                onKeyDown={(e: any) => {
                  if (e.key === 'Enter') loadGraphData(graphQuery);
                }}
                style={{ flex: 1 }}
              />
              <Button onClick={() => loadGraphData(graphQuery)}>{t('graph.refreshGraph')}</Button>
              <Button ghost onClick={() => { setGraphQuery(''); loadGraphData(''); }}>{t('graph.clear')}</Button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Button ghost onClick={handleResetView}>{t('graph.resetView')}</Button>
              <span style={{ fontSize: '11px', color: 'rgba(234,234,234,0.4)' }}>{t('graph.helpText')}</span>
            </div>
          </div>

          {/* Graph Layout Container */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', alignItems: 'stretch' }}>
            {/* SVG viewport */}
            <div style={{ border: '1px solid rgba(234,234,234,0.1)', borderRadius: '4px', overflow: 'hidden', background: 'rgba(0,0,0,0.35)', position: 'relative', minHeight: '500px' }}>
              {loadingGraph && (
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(14,14,14,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, fontSize: '13px', color: 'rgba(234,234,234,0.5)' }}>
                  {t('graph.queryingGraph')}
                </div>
              )}
              
              <svg
                ref={svgRef}
                viewBox="0 0 1000 650"
                className={`w-full h-[550px] select-none ${zoomState.dragging ? 'panning-svg' : 'cursor-grab'}`}
                onWheel={handleWheel}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
              >
                <defs>
                  <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#6366f1" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
                
                <g transform={`translate(${zoomState.x}, ${zoomState.y}) scale(${zoomState.scale})`}>
                  {processedNodes.length === 0 && !loadingGraph && (
                    <text x="500" y="325" textAnchor="middle" fill="#94a3b8" className="text-sm">
                    {t('graph.noTriples')}
                    </text>
                  )}

                  {/* Render Edges */}
                  {processedEdges.map(e => {
                    const sourceNode = processedNodes.find(n => n.id === e.source);
                    const targetNode = processedNodes.find(n => n.id === e.target);
                    if (!sourceNode || !targetNode) return null;
                    
                    const isDimmed = isDimmedEdge(e.id);
                    const isSelected = selectedEdge?.id === e.id;
                    const midX = ((sourceNode.x ?? 0) + (targetNode.x ?? 0)) / 2;
                    const midY = ((sourceNode.y ?? 0) + (targetNode.y ?? 0)) / 2;

                    return (
                      <g key={e.id}>
                        <line
                          x1={sourceNode.x}
                          y1={sourceNode.y}
                          x2={targetNode.x}
                          y2={targetNode.y}
                          onClick={() => selectEdge(e)}
                          className={`interactive-edge ${isSelected ? 'selected' : ''} ${isDimmed ? 'dimmed' : ''}`}
                          stroke="url(#edgeGrad)"
                        />
                        <text
                          x={midX}
                          y={midY}
                          textAnchor="middle"
                          onClick={() => selectEdge(e)}
                          className={`interactive-label ${isSelected ? 'selected' : ''} ${isDimmed ? 'dimmed' : ''}`}
                        >
                          {e.predicate}
                        </text>
                      </g>
                    );
                  })}

                  {/* Render Nodes */}
                  {processedNodes.map(n => {
                    const isDimmed = isDimmedNode(n.id);
                    const isSelected = selectedNode?.id === n.id;
                    const radius = Math.min(15, 7 + Math.sqrt(n.count || 1));

                    return (
                      <g key={n.id} onClick={() => selectNode(n)}>
                        <circle
                          cx={n.x}
                          cy={n.y}
                          r={radius}
                          fill={isSelected ? '#fbbf24' : '#60a5fa'}
                          stroke="#ffffff"
                          strokeWidth={isSelected ? 2.5 : 1.2}
                          className={`interactive-node ${isDimmed ? 'dimmed' : ''}`}
                        />
                        <text
                          x={(n.x ?? 0) + 12}
                          y={(n.y ?? 0) + 4}
                          className={`interactive-text ${isDimmed ? 'dimmed' : ''}`}
                        >
                          {n.label.length > 25 ? n.label.slice(0, 22) + '...' : n.label}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>
            </div>

            {/* Sidebar Details */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Card style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                  <div style={{ paddingBottom: '12px', borderBottom: '1px solid rgba(234,234,234,0.1)' }}>
                    <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(234,234,234,0.45)' }}>
                      {t('graph.inspectorTitle')}
                    </span>
                  </div>

                  {selectedNode && (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}>
                      <div>
                        <Badge>{t('graph.entityNode')}</Badge>
                        <div style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'var(--theme-font-mono)', marginTop: '8px', wordBreak: 'break-all' }}>{selectedNode.label}</div>
                        <div style={{ fontSize: '11px', color: 'rgba(234,234,234,0.45)', marginTop: '4px' }}>
                          {t('graph.connectedCount').replace('{count}', String(getConnectedEdges(selectedNode.id).length))}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Button
                          style={{ flex: 1 }}
                          onClick={() => { setTripleQuery(selectedNode.label); setActivePanel('triples'); }}
                        >
                          {t('graph.showInTriples')}
                        </Button>
                        <Button
                          ghost
                          style={{ flex: 1 }}
                          onClick={() => onNavigateToTab('memories')}
                        >
                          {t('graph.searchMemories')}
                        </Button>
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '11px', color: 'rgba(234,234,234,0.45)', marginBottom: '8px' }}>{t('graph.connectedTriples')}</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '220px', overflowY: 'auto' }}>
                          {getConnectedEdges(selectedNode.id).map(e => (
                            <button
                              key={e.id}
                              onClick={() => selectEdge(e)}
                              style={{ textAlign: 'left', padding: '8px 10px', border: '1px solid rgba(234,234,234,0.1)', borderRadius: '4px', background: 'rgba(234,234,234,0.04)', cursor: 'pointer', width: '100%' }}
                              onMouseEnter={ev => (ev.currentTarget.style.background = 'rgba(234,234,234,0.08)')}
                              onMouseLeave={ev => (ev.currentTarget.style.background = 'rgba(234,234,234,0.04)')}
                            >
                              <div style={{ color: '#f59e0b', fontFamily: 'var(--theme-font-mono)', fontSize: '11px', fontWeight: 600 }}>{e.predicate}</div>
                              <div style={{ color: 'rgba(234,234,234,0.5)', fontSize: '11px', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.subject} → {e.object}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedEdge && (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div>
                        <Badge>{t('graph.predicateLink')}</Badge>
                        <div style={{ fontSize: '16px', fontWeight: 700, color: '#f59e0b', fontFamily: 'var(--theme-font-mono)', marginTop: '8px' }}>{selectedEdge.predicate}</div>
                        
                        <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(234,234,234,0.04)', border: '1px solid rgba(234,234,234,0.1)', borderRadius: '4px', fontSize: '11px', fontFamily: 'var(--theme-font-mono)' }}>
                          <div style={{ marginBottom: '8px' }}>
                            <div style={{ color: 'rgba(234,234,234,0.4)', marginBottom: '2px' }}>{t('graph.subject')}</div>
                            <div style={{ fontWeight: 600, wordBreak: 'break-all' }}>{selectedEdge.subject}</div>
                          </div>
                          <div style={{ borderTop: '1px solid rgba(234,234,234,0.08)', paddingTop: '8px' }}>
                            <div style={{ color: 'rgba(234,234,234,0.4)', marginBottom: '2px' }}>{t('graph.object')}</div>
                            <div style={{ fontWeight: 600, wordBreak: 'break-all' }}>{selectedEdge.object}</div>
                          </div>
                        </div>

                        <div style={{ fontSize: '11px', color: 'rgba(234,234,234,0.45)', marginTop: '8px' }}>
                          {t('graph.confidence')} {safeNumber(selectedEdge.confidence, 2)}
                        </div>
                        {selectedEdge.created_at && (
                          <div style={{ fontSize: '11px', color: 'rgba(234,234,234,0.4)', fontFamily: 'var(--theme-font-mono)', marginTop: '4px' }}>
                            {t('graph.recorded')} {new Date(selectedEdge.created_at).toLocaleString()}
                          </div>
                        )}
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Button style={{ flex: 1 }} onClick={() => setInspectingJson(selectedEdge)}>{t('graph.inspectJson')}</Button>
                        <Button ghost style={{ flex: 1 }} onClick={() => { setTripleQuery(`${selectedEdge.subject} ${selectedEdge.predicate} ${selectedEdge.object}`); setActivePanel('triples'); }}>{t('graph.showInTriples')}</Button>
                      </div>
                    </div>
                  )}

                  {!selectedNode && !selectedEdge && (
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', border: '1px dashed rgba(234,234,234,0.15)', borderRadius: '4px', textAlign: 'center' }}>
                      <p style={{ fontSize: '12px', color: 'rgba(234,234,234,0.4)' }}>
                        {t('graph.pickNodePrompt')}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {activePanel === 'triples' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Triples Toolbar */}
          <div style={{ display: 'flex', gap: '8px', maxWidth: '600px' }}>
            <Input
              placeholder={t('graph.searchTriplesPlaceholder')}
              value={tripleQuery}
              onChange={(e: any) => setTripleQuery(e.target.value)}
              onKeyDown={(e: any) => { if (e.key === 'Enter') loadTriplesData(tripleQuery); }}
              style={{ flex: 1 }}
            />
            <Button onClick={() => loadTriplesData(tripleQuery)}>{t('graph.search')}</Button>
          </div>

          {/* Triples Table */}
          <div style={{ border: '1px solid rgba(234,234,234,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto', maxHeight: '500px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                <thead style={{ background: 'rgba(234,234,234,0.05)', position: 'sticky', top: 0, zIndex: 10, borderBottom: '1px solid rgba(234,234,234,0.1)' }}>
                  <tr>
                    {['Subject', 'Predicate', 'Object', 'Confidence', ''].map(h => (
                      <th key={h} style={{ padding: '10px 12px', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(234,234,234,0.45)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {renderTriplesContent()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* JSON Inspection Modal */}
      {inspectingJson && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '16px' }}>
          <Card style={{ width: '100%', maxWidth: '680px' }}>
            <CardContent>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid rgba(234,234,234,0.1)', marginBottom: '12px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>{t('graph.relationalFactDetails')}</span>
                <button onClick={() => setInspectingJson(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(234,234,234,0.5)', fontSize: '16px', lineHeight: 1 }}>✕</button>
              </div>
              <pre style={{ padding: '12px', borderRadius: '4px', background: 'rgba(234,234,234,0.04)', fontSize: '11px', overflowX: 'auto', maxHeight: '400px', fontFamily: 'var(--theme-font-mono)', color: 'rgba(234,234,234,0.7)', lineHeight: 1.6 }}>
                {JSON.stringify(inspectingJson, null, 2)}
              </pre>
              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '12px' }}>
                <Button onClick={() => setInspectingJson(null)}>{t('common.close')}</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
