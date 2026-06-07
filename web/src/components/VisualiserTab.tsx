import React, { useState, useEffect, useRef } from 'react';
import { fetchJSON, Card, CardHeader, CardTitle, CardContent, Button } from '@hermes/sdk';
import { safeNumber } from '../utils/format';
import { t } from '../utils/i18n';

const API = '/api/plugins/mnemosyne-native-dashboard';
const MG = (o: number) => `rgba(234,234,234,${o})`;

interface VisualiserTabProps {
  onInspectMemory: (id: string) => void;
}

export const VisualiserTab: React.FC<VisualiserTabProps> = ({ onInspectMemory }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const nodesRef = useRef<any[]>([]);
  const pointerRef = useRef({ x: 0, y: 0 });
  const selectedNodeRef = useRef<any>(null);
  const hoveredNodeRef = useRef<any>(null);

  const [loading, setLoading] = useState(true);
  const [sceneError, setSceneError] = useState('');
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [hoveredNode, setHoveredNode] = useState<any>(null);
  const [constellationData, setConstellationData] = useState<any>(null);

  useEffect(() => {
    fetchJSON(`${API}/constellation?limit=240`)
      .then((d) => setConstellationData(d))
      .catch((err) => setSceneError(err?.message || 'Failed to load constellation data'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!constellationData || !canvasRef.current || sceneError) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setSceneError('Canvas rendering is unavailable in this browser');
      return;
    }

    const resize = () => {
      const parent = canvas.parentElement;
      const width = parent?.clientWidth || 600;
      const height = 480;
      canvas.width = Math.max(1, Math.floor(width * window.devicePixelRatio));
      canvas.height = Math.max(1, Math.floor(height * window.devicePixelRatio));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const rawNodes = (constellationData.nodes || []).map((n: any, idx: number) => {
      const weight = Number(n.weight ?? 0.4);
      return {
        ...n,
        x: Math.sin(weight * 100 + idx) * 180,
        y: Math.cos(weight * 50 + idx * 0.3) * 120,
        z: Math.sin(weight * 25 + idx * 0.2) * 180,
        r: 4 + Math.min(6, weight * 4),
      };
    });
    nodesRef.current = rawNodes;

    const getLayout = () => {
      const width = canvas.clientWidth || 600;
      const height = canvas.clientHeight || 480;
      const cx = width / 2;
      const cy = height / 2;
      const t = performance.now() * 0.0004;
      const project = (node: any) => {
        const rotY = node.x * Math.cos(t) - node.z * Math.sin(t);
        const depth = 0.6 + ((node.z * Math.cos(t) + node.x * Math.sin(t)) + 220) / 440;
        return {
          x: cx + rotY,
          y: cy + node.y * (0.8 + depth * 0.2),
          r: node.r * depth,
          alpha: Math.max(0.25, Math.min(1, depth)),
        };
      };

      return { width, height, cx, cy, project };
    };

    const findHitNode = (x: number, y: number) => {
      const { project } = getLayout();
      return (
        nodesRef.current.find((node) => {
          const p = project(node);
          return Math.hypot(p.x - x, p.y - y) <= p.r + 6;
        }) || null
      );
    };

    const handlePointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      pointerRef.current = { x, y };
      const hit = findHitNode(x, y);
      hoveredNodeRef.current = hit;
      setHoveredNode(hit);
    };

    const handleClick = (event: PointerEvent) => {
      handlePointer(event);
      const { x, y } = pointerRef.current;
      const hit = findHitNode(x, y);
      if (hit) {
        selectedNodeRef.current = hit;
        setSelectedNode(hit);
      }
    };

    const draw = () => {
      const { width, height, project } = getLayout();

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.fillRect(0, 0, width, height);

      // Soft connection mesh
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(234,234,234,0.08)';
      for (let i = 0; i < nodesRef.current.length - 1; i++) {
        const a = project(nodesRef.current[i]);
        const b = project(nodesRef.current[i + 1]);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      nodesRef.current.forEach((node) => {
        const p = project(node);
        ctx.beginPath();
        ctx.fillStyle = `rgba(96, 165, 250, ${p.alpha})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        if (hoveredNodeRef.current?.id === node.id) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(234, 234, 234, 0.85)';
          ctx.lineWidth = 2;
          ctx.arc(p.x, p.y, p.r + 3, 0, Math.PI * 2);
          ctx.stroke();
        }

        if (selectedNodeRef.current?.id === node.id) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(251, 191, 36, 0.95)';
          ctx.lineWidth = 2;
          ctx.arc(p.x, p.y, p.r + 4, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    canvas.addEventListener('pointermove', handlePointer);
    canvas.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', handlePointer);
      canvas.removeEventListener('click', handleClick);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [constellationData, sceneError]);

  const counts = {
    nodes: constellationData?.nodes?.length || 0,
    edges: constellationData?.edges?.length || 0,
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
      <Card>
        <CardHeader>
          <CardTitle>{t('visualiser.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ fontSize: '12px', color: MG(0.45), marginBottom: '12px' }}>
            {t('visualiser.subtitle')}
          </div>
          <div style={{ fontSize: '11px', color: MG(0.4), marginBottom: '10px' }}>
            {counts.nodes} {t('visualiser.nodes')} · {counts.edges} {t('visualiser.edges')}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              minHeight: '18px',
              marginBottom: '12px',
              fontSize: '11px',
              color: MG(0.45),
            }}
          >
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {selectedNode ? t('visualiser.selected') : hoveredNode ? t('visualiser.hovering') : t('visualiser.ready')}
            </span>
            <span style={{ color: MG(0.7), fontFamily: 'var(--theme-font-mono)' }}>
              {selectedNode?.label || hoveredNode?.label || t('visualiser.prompt')}
            </span>
          </div>
          {loading ? (
            <div
              style={{
                height: '480px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: MG(0.04),
                borderRadius: '4px',
                color: MG(0.4),
              }}
            >
              {t('visualiser.loadingEngine')}
            </div>
          ) : sceneError ? (
            <div
              style={{
                height: '480px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: MG(0.03),
                borderRadius: '4px',
                color: '#f87171',
                textAlign: 'center',
                padding: '24px',
              }}
            >
              {sceneError}
            </div>
          ) : counts.nodes > 0 ? (
            <canvas
              ref={canvasRef}
              style={{
                height: '480px',
                background: MG(0.03),
                borderRadius: '4px',
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                display: 'block',
                cursor: 'pointer',
              }}
            />
          ) : (
            <div
              style={{
                height: '480px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: MG(0.03),
                borderRadius: '4px',
                color: MG(0.4),
              }}
            >
              {t('visualiser.noNodes')}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('visualiser.inspectorTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ fontSize: '12px', color: MG(0.45), marginBottom: '16px' }}>
            {t('visualiser.inspectorDesc')}
          </div>
          {selectedNode ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '12px', borderTop: `1px solid ${MG(0.1)}` }}>
              <div>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: MG(0.4), marginBottom: '6px' }}>
                  {t('visualiser.entityHub')}
                </div>
                <div style={{ fontSize: '15px', fontWeight: 700 }}>{selectedNode.label}</div>
                <div style={{ fontSize: '11px', color: MG(0.45), marginTop: '4px' }}>
                  weight: {safeNumber(selectedNode.weight, 2, 'n/a')}
                </div>
                <div style={{ fontSize: '11px', color: MG(0.45), marginTop: '4px', fontFamily: 'var(--theme-font-mono)' }}>
                  {selectedNode.category || 'Other'}
                </div>
              </div>
              {selectedNode.memory_id && (
                <Button onClick={() => onInspectMemory(selectedNode.memory_id)}>
                  {t('visualiser.openMemory')}
                </Button>
              )}
            </div>
          ) : (
            <div
              style={{
                padding: '20px',
                border: `1px dashed ${MG(0.15)}`,
                borderRadius: '4px',
                textAlign: 'center',
                fontSize: '11px',
                color: MG(0.4),
                fontFamily: 'var(--theme-font-mono)',
              }}
            >
              {t('visualiser.clickNodePrompt')}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
