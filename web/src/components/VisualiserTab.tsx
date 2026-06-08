import React, { useCallback, useEffect, useRef, useState } from 'react';
import { fetchJSON, Button, Badge } from '@hermes/sdk';
import { safeNumber } from '../utils/format';
import { t } from '../utils/i18n';

const API = '/api/plugins/mnemosyne-native-dashboard';
const MG = (o: number) => `rgba(234,234,234,${o})`;
const CAMERA_DEFAULT = { rotation: -0.42, tilt: 0.34, zoom: 1, panX: 0, panY: 0, mode: 'rotate' as const };
const NEURAL_CAMERA_DEFAULT = { rotation: 0.34, tilt: 0.38, zoom: 1, panX: 0, panY: 0, mode: 'rotate' as const };
const MIN_ZOOM = 0.62;
const MAX_ZOOM = 2.7;

interface VisualiserTabProps {
  onInspectMemory: (id: string) => void;
}

type VisualiserMode = 'constellation' | 'neural';
type CameraMode = 'rotate' | 'pan';

interface SceneNode {
  id: string;
  label: string;
  kind?: string;
  category?: string;
  weight?: number;
  count?: number;
  memory_id?: string;
  preview?: string;
  x: number;
  y: number;
  z: number;
  size: number;
  twinkle: number;
  twinkleFreq: number;
  twinkleAmp: number;
}

interface SceneEdge {
  id: string;
  source: string;
  target: string;
  kind?: string;
  label?: string;
}

interface SceneState {
  nodes: SceneNode[];
  edges: SceneEdge[];
  stars: { x: number; y: number; r: number; a: number; phase: number; freq: number }[];
  hits: { x: number; y: number; r: number; node: SceneNode }[];
  regions: { label: string; angle: number; cx: number; cy: number; cz: number; spread: number }[];
  rotation: number;
  tilt: number;
  zoom: number;
  panX: number;
  panY: number;
  mode: CameraMode;
  paused: boolean;
  drag: any;
  pointers: Map<number, { x: number; y: number }>;
  lastFrameTime: number;
}

const sceneDefaults = (): SceneState => ({
  nodes: [],
  edges: [],
  stars: [],
  hits: [],
  regions: [],
  ...CAMERA_DEFAULT,
  paused: false,
  drag: null,
  pointers: new Map(),
  lastFrameTime: 0,
});

const colorsFor = (mode: VisualiserMode) => {
  if (mode === 'neural') {
    return {
      bg: '#06100f',
      core: 'rgba(34,130,111,.28)',
      mid: 'rgba(95,31,29,.40)',
      star: '#66e8c6',
      memory: '#ff5f57',
      text: '#f6fbf7',
      edge: 'rgba(82,214,181,.22)',
      edgeHot: 'rgba(90,238,196,.52)',
      memoryEdge: 'rgba(255,95,87,.58)',
    };
  }
  return {
    bg: '#050711',
    core: 'rgba(101,214,255,.14)',
    mid: 'rgba(72,130,160,.035)',
    star: '#65d6ff',
    memory: '#ffe08a',
    text: '#f7f8ff',
    edge: 'rgba(198,224,255,.44)',
    edgeHot: 'rgba(101,214,255,.58)',
    memoryEdge: 'rgba(255,224,138,.50)',
  };
};

const shortLabel = (label: string, max = 22) => (label.length > max ? `${label.slice(0, max - 3)}...` : label);

const labelForCanvas = (raw: string) => {
  const label = String(raw || '').replace(/^memory:/, 'mem ');
  return /^[A-Z][A-Z_\s-]{2,}$/.test(label)
    ? label.toLowerCase().replace(/(^|[_\s-])([a-z])/g, (_m, sep, ch) => (sep === '_' ? ' ' : sep) + ch.toUpperCase())
    : label;
};

export const VisualiserTab: React.FC<VisualiserTabProps> = ({ onInspectMemory }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const sceneRef = useRef<SceneState>(sceneDefaults());
  const selectedNodeRef = useRef<SceneNode | null>(null);
  const hoveredNodeRef = useRef<SceneNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [sceneError, setSceneError] = useState('');
  const [data, setData] = useState<any>(null);
  const [mode, setMode] = useState<VisualiserMode>(() => {
    const saved = window.localStorage.getItem('mnemosyne-dashboard-visualiser-mode');
    return saved === 'neural' ? 'neural' : 'constellation';
  });
  const [paused, setPaused] = useState(false);
  const [cameraMode, setCameraMode] = useState<CameraMode>('rotate');
  const [selectedNode, setSelectedNode] = useState<SceneNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<SceneNode | null>(null);

  useEffect(() => {
    selectedNodeRef.current = selectedNode;
  }, [selectedNode]);

  useEffect(() => {
    hoveredNodeRef.current = hoveredNode;
  }, [hoveredNode]);

  const clampCamera = useCallback((width: number, height: number) => {
    const scene = sceneRef.current;
    scene.zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, Number.isFinite(scene.zoom) ? scene.zoom : 1));
    scene.tilt = Math.max(-1.05, Math.min(1.05, Number.isFinite(scene.tilt) ? scene.tilt : 0.34));
    const panLimitX = Math.max(80, width * (0.24 + scene.zoom * 0.22));
    const panLimitY = Math.max(90, height * (0.16 + scene.zoom * 0.14));
    scene.panX = Math.max(-panLimitX, Math.min(panLimitX, Number.isFinite(scene.panX) ? scene.panX : 0));
    scene.panY = Math.max(-panLimitY, Math.min(panLimitY, Number.isFinite(scene.panY) ? scene.panY : 0));
  }, []);

  const projectNode = useCallback((node: SceneNode, width: number, height: number, currentMode: VisualiserMode) => {
    const scene = sceneRef.current;
    const x = Number(node.x || 0);
    const y = Number(node.y || 0);
    const z = Number(node.z || 0);
    const cosR = Math.cos(scene.rotation);
    const sinR = Math.sin(scene.rotation);
    const xr = x * cosR - z * sinR;
    const zr = x * sinR + z * cosR;
    const cosT = Math.cos(scene.tilt);
    const sinT = Math.sin(scene.tilt);
    const yr = y * cosT - zr * sinT;
    const zt = y * sinT + zr * cosT;
    const fill = width / Math.max(1, height);
    const fit =
      currentMode === 'neural'
        ? width < 620
          ? Math.min(0.88, Math.max(0.62, (width - 38) / 620))
          : Math.min(1.1, Math.max(0.76, (width - 80) / 720))
        : width < 620
          ? Math.min(0.72, Math.max(0.58, (width - 36) / 680))
          : Math.min(1.18, Math.max(0.62, (width - 72) / 760) * Math.max(0.76, Math.min(1.18, fill)));
    const cameraDistance = currentMode === 'neural' ? (width < 620 ? 760 : 980) : 760;
    const perspective = currentMode === 'neural'
      ? Math.max(0.48, Math.min(1.85, cameraDistance / Math.max(260, cameraDistance - zt)))
      : cameraDistance / (cameraDistance + zt + 260);
    const scale = fit * scene.zoom * perspective;
    return {
      x: width / 2 + scene.panX + xr * scale,
      y: height / 2 + scene.panY + yr * scale,
      z: zt,
      scale,
      alpha: Math.max(0.34, Math.min(1, 0.58 + zt / 620)),
      visible: scale > 0.35,
    };
  }, []);

  const resetView = useCallback((nextMode: VisualiserMode = mode) => {
    const scene = sceneRef.current;
    Object.assign(scene, nextMode === 'neural' ? NEURAL_CAMERA_DEFAULT : CAMERA_DEFAULT, {
      drag: null,
      lastFrameTime: 0,
    });
    scene.pointers.clear();
    setCameraMode(scene.mode);
  }, [mode]);

  const buildScene = useCallback((payload: any, nextMode: VisualiserMode) => {
    const rawNodes = (payload?.nodes || []).slice(0, nextMode === 'neural' ? 170 : 160).map((node: any) => ({ ...node }));
    const nodeIds = new Set(rawNodes.map((node: any) => node.id));
    const rawEdges = (payload?.edges || []).filter((edge: any) => nodeIds.has(edge.source) && nodeIds.has(edge.target)).slice(0, nextMode === 'neural' ? 340 : 300);
    const categories = [...new Set(rawNodes.map((node: any) => node.category || 'Other'))];
    const catIndex = Object.fromEntries(categories.map((cat, idx) => [cat, idx]));
    const degree = new Map<string, number>();
    rawEdges.forEach((edge: any) => {
      degree.set(edge.source, (degree.get(edge.source) || 0) + 1);
      degree.set(edge.target, (degree.get(edge.target) || 0) + 1);
    });

    const regions = categories.map((cat, idx) => {
      const tPos = categories.length === 1 ? 0 : (idx / Math.max(1, categories.length - 1)) * 2 - 1;
      const angle = -Math.PI / 2 + idx * 2.399963;
      const radial = Math.sqrt(Math.max(0, 1 - tPos * tPos));
      return {
        label: String(cat),
        angle,
        cx: Math.cos(angle) * radial * 230,
        cy: tPos * 150 + Math.sin(angle * 0.7) * 24,
        cz: Math.sin(angle) * radial * 190 + (idx % 2 === 0 ? -28 : 28),
        spread: 78 + (idx % 4) * 12,
      };
    });
    const regionByCategory = Object.fromEntries(regions.map((region) => [region.label, region]));
    const byId: Record<string, SceneNode> = {};

    const nodes: SceneNode[] = rawNodes.map((node: any, idx: number) => {
      const cat = node.category || 'Other';
      const ci = Number(catIndex[cat] || 0);
      const weight = Math.max(1, Number(node.weight || node.count || 1));
      let x = 0;
      let y = 0;
      let z = 0;

      if (nextMode === 'neural') {
        const region = regionByCategory[cat] || regions[0] || { cx: 0, cy: 0, cz: 0, angle: 0 };
        const orbit = node.kind === 'memory' ? 70 + (idx % 6) * 15 + Math.min(42, Math.sqrt(weight) * 9) : (idx % 9) * 20;
        const angle = region.angle + idx * 2.399963 + ci * 0.18;
        const yUnit = ((((idx * 43 + ci * 17) % 97) + 0.5) / 97) * 2 - 1;
        const radial = Math.sqrt(Math.max(0, 1 - yUnit * yUnit));
        x = region.cx + Math.cos(angle) * radial * orbit;
        y = region.cy + yUnit * orbit * 0.82;
        z = region.cz + Math.sin(angle) * radial * orbit * 0.86;
      } else {
        const angle = (idx / Math.max(rawNodes.length, 1)) * Math.PI * 2 + ci * 0.62;
        const band = node.kind === 'memory' ? 1.28 : 0.72 + (ci % 4) * 0.16;
        const radius = 250 * band + (idx % 7) * 16;
        x = Math.cos(angle) * radius;
        y = Math.sin(angle * 1.23) * (100 + (ci % 5) * 24) + (((idx * 53) % 131) - 65) * 0.82;
        z = Math.sin(angle) * radius * 0.82 + (((idx * 97) % 181) - 90) * 1.55 + ((ci % 5) - 2) * 42;
      }

      const sceneNode: SceneNode = {
        ...node,
        x,
        y,
        z,
        size: Math.min(nextMode === 'neural' ? 30 : 22, (nextMode === 'neural' ? 8 : 4) + Math.sqrt(weight + (degree.get(node.id) || 0)) * (node.kind === 'memory' ? 3.2 : 4.1)),
        twinkle: (idx % 17) / 17,
        twinkleFreq: (nextMode === 'neural' ? 0.0017 : 0.00115) + ((idx * 31) % 90) / 100000,
        twinkleAmp: 0.075 + ((idx * 19) % 55) / 1000,
      };
      byId[sceneNode.id] = sceneNode;
      return sceneNode;
    });

    sceneRef.current.nodes = nodes;
    sceneRef.current.edges = rawEdges;
    sceneRef.current.regions = nextMode === 'neural' ? regions : [];
    sceneRef.current.hits = [];
    sceneRef.current.stars = Array.from({ length: nextMode === 'neural' ? 60 : 140 }, (_, idx) => {
      const fast = idx % 13 === 0;
      return {
        x: ((idx * (nextMode === 'neural' ? 89 : 73)) % 1000) / 1000,
        y: ((idx * (nextMode === 'neural' ? 157 : 191)) % 680) / 680,
        r: 0.32 + ((idx * 37) % 100) / (nextMode === 'neural' ? 120 : 90),
        a: 0.12 + ((idx * 29) % 100) / (nextMode === 'neural' ? 340 : 240),
        phase: ((idx * 47) % 628) / 100,
        freq: fast ? 0.0058 + ((idx * 41) % 80) / 100000 : 0.00048 + ((idx * 41) % 95) / 100000,
      };
    });
  }, []);

  const fetchConstellation = useCallback(() => {
    setLoading(true);
    setSceneError('');
    fetchJSON(`${API}/constellation?limit=240`)
      .then((payload) => {
        setData(payload);
        buildScene(payload, mode);
      })
      .catch((err) => setSceneError(err?.message || t('visualiser.loadError')))
      .finally(() => setLoading(false));
  }, [buildScene, mode]);

  useEffect(() => {
    fetchConstellation();
  }, []);

  useEffect(() => {
    if (!data) return;
    window.localStorage.setItem('mnemosyne-dashboard-visualiser-mode', mode);
    buildScene(data, mode);
    resetView(mode);
    setSelectedNode(null);
    setHoveredNode(null);
  }, [buildScene, data, mode, resetView]);

  const draw = useCallback((time = 0) => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const width = Math.max(320, wrap.clientWidth || canvas.clientWidth || 1000);
    const height = Math.max(430, wrap.clientHeight || canvas.clientHeight || 680);
    const compact = width < 620;
    const dpr = Math.min(window.devicePixelRatio || 1, mode === 'neural' ? (compact ? 1.8 : 1.25) : (compact ? 2 : 1.5));
    if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
    }
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scene = sceneRef.current;
    if (!scene.paused && !scene.drag && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const delta = scene.lastFrameTime ? Math.min(48, time - scene.lastFrameTime) : 16;
      scene.rotation += delta * (mode === 'neural' ? 0.000032 : 0.000065);
    }
    scene.lastFrameTime = time;
    clampCamera(width, height);

    const c = colorsFor(mode);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    const bg = ctx.createRadialGradient(width * 0.52, height * 0.44, 20, width * 0.52, height * 0.44, Math.max(width, height) * 0.72);
    bg.addColorStop(0, c.core);
    bg.addColorStop(0.48, c.mid);
    bg.addColorStop(1, c.bg);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    scene.stars.forEach((star) => {
      const pulse = 0.42 + Math.sin(time * star.freq + star.phase) * 0.34 + Math.sin(time * star.freq * 0.37 + star.phase * 1.9) * 0.18;
      ctx.globalAlpha = star.a * Math.max(0.12, Math.min(1, pulse)) * 0.78;
      ctx.fillStyle = c.text;
      ctx.beginPath();
      ctx.arc(star.x * width, star.y * height, star.r * 0.9, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    const projected = new Map<string, ReturnType<typeof projectNode>>();
    scene.nodes.forEach((node) => projected.set(node.id, projectNode(node, width, height, mode)));

    if (mode === 'neural') {
      scene.regions.slice(0, 10).forEach((region, idx) => {
        const p = projectNode(
          { id: region.label, label: region.label, x: region.cx, y: region.cy, z: region.cz, size: 1, twinkle: 0, twinkleFreq: 0, twinkleAmp: 0 },
          width,
          height,
          mode,
        );
        const rx = (region.spread || 82) * (compact ? 1.2 : 1.55) * p.scale;
        const ry = (region.spread || 82) * (compact ? 0.76 : 0.98) * p.scale;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(region.angle * 0.42);
        ctx.fillStyle = idx % 3 === 2 ? 'rgba(255,209,102,.070)' : idx % 3 === 1 ? 'rgba(101,214,255,.092)' : 'rgba(76,171,158,.115)';
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 0.18;
        ctx.strokeStyle = idx % 3 === 2 ? c.memoryEdge : c.edgeHot;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.ellipse(0, 0, rx * 0.72, ry * 0.72, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.restore();
      });
    }

    const edgeDegree = new Map<string, number>();
    let drawnEdges = 0;
    const edgeLimit = mode === 'neural' ? (compact ? 58 : 132) : (compact ? 44 : 140);
    const degreeLimit = compact ? 3 : 5;
    for (const edge of scene.edges) {
      const a = projected.get(edge.source);
      const b = projected.get(edge.target);
      if (!a || !b || !a.visible || !b.visible || drawnEdges >= edgeLimit) continue;
      const da = edgeDegree.get(edge.source) || 0;
      const db = edgeDegree.get(edge.target) || 0;
      if (da >= degreeLimit || db >= degreeLimit) continue;
      edgeDegree.set(edge.source, da + 1);
      edgeDegree.set(edge.target, db + 1);
      drawnEdges++;
      ctx.strokeStyle = edge.kind === 'memory' ? c.memoryEdge : c.edge;
      ctx.globalAlpha = Math.min(0.58, Math.max(0.24, (a.scale + b.scale) / 5.2)) * (compact ? 0.74 : 0.92);
      ctx.lineWidth = 0.78 + Math.max(a.scale, b.scale) * 0.26;
      if (mode === 'neural') {
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const len = Math.max(1, Math.hypot(dx, dy));
        const curve = Math.min(compact ? 30 : 48, len * 0.16) * ((edge.id || '').length % 2 ? 1 : -1);
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(mx - (dy / len) * curve, my + (dx / len) * curve, b.x, b.y);
        ctx.stroke();
      } else {
        ctx.setLineDash(edge.kind === 'memory' ? [5, 7] : [4, 8]);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
    ctx.setLineDash([]);

    const hits: SceneState['hits'] = [];
    const labelBoxes: { x: number; y: number; w: number; h: number }[] = [];
    const nodeDegrees = new Map<string, number>();
    scene.edges.forEach((edge) => {
      nodeDegrees.set(edge.source, (nodeDegrees.get(edge.source) || 0) + 1);
      nodeDegrees.set(edge.target, (nodeDegrees.get(edge.target) || 0) + 1);
    });

    [...scene.nodes].sort((a, b) => (projected.get(a.id)?.z || 0) - (projected.get(b.id)?.z || 0)).forEach((node) => {
      const p = projected.get(node.id);
      if (!p?.visible) return;
      const weight = Math.max(1, Number(node.weight || node.count || 1));
      const base = node.kind === 'memory' ? c.memory : c.star;
      const pulse = 1 + Math.sin(time * (node.twinkleFreq || 0.0017) + node.twinkle * 6.28) * (node.twinkleAmp || 0.09);
      const radius = Math.min(mode === 'neural' ? (compact ? 7.5 : 11) : (compact ? 3.2 : 4.6), Math.max(compact ? 1.4 : 2, (1 + Math.sqrt(weight)) * p.scale * (mode === 'neural' ? 0.8 : 0.54))) * pulse;
      const halo = Math.max(mode === 'neural' ? radius * 2.4 : 2.4, radius * (node.kind === 'memory' ? 3.2 : 2.35));
      const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, halo);
      glow.addColorStop(0, 'rgba(255,255,255,.92)');
      glow.addColorStop(0.2, base);
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.globalAlpha = mode === 'neural' ? 0.3 * p.alpha : Math.min(compact ? 0.28 : 0.34, p.scale * (compact ? 0.18 : 0.24));
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(p.x, p.y, halo, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.96 * p.alpha;
      ctx.fillStyle = 'rgba(255,255,255,.98)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.62, radius * (mode === 'neural' ? 0.88 : 0.52)), 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.72 * p.alpha;
      ctx.fillStyle = base;
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.28, radius * 0.35), 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      const raw = labelForCanvas(node.label || '');
      const alphaChars = (raw.match(/[A-Za-z]/g) || []).length;
      const technical = /^[a-f0-9]{10,}$/i.test(raw) || /^mem\s+[a-f0-9]{6,}$/i.test(raw) || alphaChars < 4;
      const degree = nodeDegrees.get(node.id) || 0;
      const labelScore = p.scale * 2.05 + Math.log1p(weight) * 0.52 + Math.log1p(degree) * 0.38 + (node.kind !== 'memory' ? 0.9 : 0.1);
      if (!technical && labelScore > (compact ? 4.15 : 3.9)) {
        const label = shortLabel(raw);
        ctx.font = `${Math.round((compact ? 9 : 10) + Math.min(3, Math.sqrt(weight)))}px var(--theme-font, system-ui), system-ui, sans-serif`;
        const lx = p.x + halo * 0.55 + 6;
        const ly = p.y + 4;
        const tw = ctx.measureText(label).width;
        const box = { x: lx - 4, y: ly - 14, w: tw + 8, h: 19 };
        const onCanvas = box.x >= 10 && box.x + box.w <= width - 10 && box.y >= 10 && box.y + box.h <= height - 10;
        const collides = labelBoxes.some((b) => !(box.x + box.w < b.x || b.x + b.w < box.x || box.y + box.h < b.y || b.y + b.h < box.y));
        if (onCanvas && !collides) {
          labelBoxes.push(box);
          ctx.lineWidth = 5;
          ctx.strokeStyle = c.bg;
          ctx.fillStyle = c.text;
          ctx.globalAlpha = Math.min(0.82, 0.36 + p.scale * 0.32) * p.alpha;
          ctx.strokeText(label, lx, ly);
          ctx.fillText(label, lx, ly);
          ctx.globalAlpha = 1;
        }
      }
      hits.push({ x: p.x, y: p.y, r: Math.max(14, halo + 8), node });
    });

    const activeNode = selectedNodeRef.current || hoveredNodeRef.current;
    if (activeNode) {
      const p = projected.get(activeNode.id);
      if (p) {
        ctx.strokeStyle = selectedNodeRef.current?.id === activeNode.id ? 'rgba(255,224,138,.95)' : 'rgba(247,248,255,.85)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 18, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    scene.hits = hits;
    frameRef.current = requestAnimationFrame(draw);
  }, [clampCamera, mode, projectNode]);

  useEffect(() => {
    if (loading || sceneError || !data) return;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(draw);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [data, draw, loading, sceneError]);

  useEffect(() => {
    if (loading || sceneError || !data) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const zoomAt = (factor: number, clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const scene = sceneRef.current;
      const oldZoom = scene.zoom;
      const nextZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, oldZoom * factor));
      if (Math.abs(nextZoom - oldZoom) < 0.001) return;
      const x = clientX - rect.left - rect.width / 2 - scene.panX;
      const y = clientY - rect.top - rect.height / 2 - scene.panY;
      const ratio = nextZoom / oldZoom;
      scene.panX -= x * (ratio - 1);
      scene.panY -= y * (ratio - 1);
      scene.zoom = nextZoom;
      clampCamera(rect.width, rect.height);
    };

    const updateHover = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const hit = sceneRef.current.hits.find((candidate) => Math.hypot(candidate.x - x, candidate.y - y) <= candidate.r)?.node || null;
      if (hoveredNodeRef.current?.id !== hit?.id) {
        hoveredNodeRef.current = hit;
        setHoveredNode(hit);
      }
      canvas.style.cursor = sceneRef.current.drag ? 'grabbing' : hit ? 'pointer' : 'grab';
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      zoomAt(Math.exp(-event.deltaY * 0.0012), event.clientX, event.clientY);
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (event.cancelable) event.preventDefault();
      canvas.style.touchAction = 'none';
      try { canvas.setPointerCapture(event.pointerId); } catch {}
      const scene = sceneRef.current;
      scene.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      scene.drag = {
        mode: scene.mode === 'pan' || event.shiftKey || event.button === 1 || event.button === 2 ? 'pan' : 'rotate',
        x: event.clientX,
        y: event.clientY,
        rotation: scene.rotation,
        tilt: scene.tilt,
        panX: scene.panX,
        panY: scene.panY,
        moved: false,
      };
    };
    const handlePointerMove = (event: PointerEvent) => {
      updateHover(event);
      const scene = sceneRef.current;
      const drag = scene.drag;
      if (!drag) return;
      if (event.cancelable) event.preventDefault();
      const dx = event.clientX - drag.x;
      const dy = event.clientY - drag.y;
      if (Math.abs(dx) + Math.abs(dy) > 3) drag.moved = true;
      if (drag.mode === 'pan') {
        scene.panX = drag.panX + dx;
        scene.panY = drag.panY + dy;
      } else {
        scene.rotation = drag.rotation + dx * 0.008;
        scene.tilt = Math.max(-1.05, Math.min(1.05, drag.tilt + dy * 0.006));
      }
    };
    const handlePointerEnd = (event: PointerEvent) => {
      const scene = sceneRef.current;
      scene.pointers.delete(event.pointerId);
      if (scene.drag?.moved) canvas.dataset.suppressClick = 'true';
      scene.drag = null;
      canvas.style.cursor = 'grab';
    };
    const handleClick = (event: MouseEvent) => {
      if (canvas.dataset.suppressClick === 'true') {
        canvas.dataset.suppressClick = 'false';
        return;
      }
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const hit = sceneRef.current.hits.find((candidate) => Math.hypot(candidate.x - x, candidate.y - y) <= candidate.r)?.node || null;
      selectedNodeRef.current = hit;
      setSelectedNode(hit);
    };
    const handleContextMenu = (event: MouseEvent) => event.preventDefault();

    canvas.addEventListener('wheel', handleWheel, { passive: false });
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerEnd);
    canvas.addEventListener('pointercancel', handlePointerEnd);
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('contextmenu', handleContextMenu);
    return () => {
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', handlePointerEnd);
      canvas.removeEventListener('pointercancel', handlePointerEnd);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [clampCamera, data, loading, sceneError]);

  const togglePause = () => {
    sceneRef.current.paused = !sceneRef.current.paused;
    sceneRef.current.lastFrameTime = 0;
    setPaused(sceneRef.current.paused);
  };

  const togglePan = () => {
    sceneRef.current.mode = sceneRef.current.mode === 'pan' ? 'rotate' : 'pan';
    setCameraMode(sceneRef.current.mode);
  };

  const toggleFullscreen = () => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else wrap.requestFullscreen?.();
  };

  const counts = {
    nodes: data?.nodes?.length || 0,
    edges: data?.edges?.length || 0,
  };

  const activeNode = selectedNode || hoveredNode;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: '15px', fontWeight: 600 }}>{t('visualiser.workspaceTitle')}</div>
          <div style={{ fontSize: '12px', color: MG(0.45), marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {t('visualiser.workspaceSubtitle')}
          </div>
        </div>
        <Badge>{counts.nodes} {t('visualiser.nodes')} · {counts.edges} {t('visualiser.edges')}</Badge>
      </div>

      <div style={{ display: 'flex', gap: '10px', padding: '12px', border: `1px solid ${MG(0.09)}`, borderRadius: '6px', background: MG(0.03), flexWrap: 'wrap' }}>
        <Button primary={mode === 'constellation'} ghost={mode !== 'constellation'} onClick={() => setMode('constellation')}>
          {t('visualiser.constellationMode')}
        </Button>
        <Button primary={mode === 'neural'} ghost={mode !== 'neural'} onClick={() => setMode('neural')}>
          {t('visualiser.neuralMode')}
        </Button>
      </div>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '12px', border: `1px solid ${MG(0.09)}`, borderRadius: '6px', background: MG(0.03), flexWrap: 'wrap' }}>
        <Button primary onClick={fetchConstellation}>{t('visualiser.refresh')}</Button>
        <Button ghost onClick={() => resetView()}>{t('visualiser.resetView')}</Button>
        <Button ghost onClick={togglePan}>{cameraMode === 'pan' ? t('visualiser.rotateMode') : t('visualiser.panMode')}</Button>
        <Button ghost onClick={togglePause}>{paused ? t('visualiser.resume') : mode === 'neural' ? t('visualiser.pauseDrift') : t('visualiser.pauseRotation')}</Button>
        <Button ghost onClick={toggleFullscreen}>{t('visualiser.fullscreen')}</Button>
        <span style={{ fontSize: '12px', color: MG(0.45) }}>
          {mode === 'neural' ? t('visualiser.neuralHelp') : t('visualiser.constellationHelp')}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2.5fr) minmax(280px, 1fr)', gap: '16px', alignItems: 'stretch' }}>
        <div
          ref={wrapRef}
          style={{
            position: 'relative',
            minHeight: '680px',
            border: `1px solid ${MG(0.1)}`,
            borderRadius: '6px',
            overflow: 'hidden',
            background: '#050711',
          }}
        >
          {loading ? (
            <div style={{ height: '680px', display: 'grid', placeItems: 'center', color: MG(0.4), fontSize: '12px' }}>
              {t('visualiser.loadingEngine')}
            </div>
          ) : sceneError ? (
            <div style={{ height: '680px', display: 'grid', placeItems: 'center', color: '#f87171', padding: '24px', textAlign: 'center' }}>
              {sceneError}
            </div>
          ) : counts.nodes > 0 ? (
            <>
              <canvas
                ref={canvasRef}
                aria-label={t('visualiser.canvasLabel')}
                style={{ width: '100%', height: '100%', display: 'block', cursor: 'grab' }}
              />
              <div
                aria-label={t('visualiser.legend')}
                style={{
                  position: 'absolute',
                  right: '16px',
                  bottom: '14px',
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'center',
                  padding: '8px 10px',
                  border: `1px solid ${MG(0.12)}`,
                  background: 'rgba(5,7,17,0.72)',
                  borderRadius: '4px',
                  color: MG(0.72),
                  fontSize: '11px',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span><span style={{ color: colorsFor(mode).star }}>●</span> {mode === 'neural' ? t('visualiser.neuronHub') : t('visualiser.entityTopic')}</span>
                <span><span style={{ color: colorsFor(mode).memory }}>●</span> {mode === 'neural' ? t('visualiser.memorySoma') : t('visualiser.memory')}</span>
                <span style={{ color: MG(0.55) }}>─ {mode === 'neural' ? t('visualiser.synapse') : t('visualiser.link')}</span>
              </div>
            </>
          ) : (
            <div style={{ height: '680px', display: 'grid', placeItems: 'center', color: MG(0.4), fontSize: '12px' }}>
              {t('visualiser.noNodes')}
            </div>
          )}
        </div>

        <aside style={{ border: `1px solid ${MG(0.1)}`, borderRadius: '6px', background: MG(0.02), minHeight: '680px' }}>
          <div style={{ padding: '18px 20px', borderBottom: `1px solid ${MG(0.08)}` }}>
            <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.14em', color: MG(0.45), fontWeight: 700 }}>
              {mode === 'neural' ? t('visualiser.neuralInspector') : t('visualiser.constellationInspector')}
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, marginTop: '12px' }}>
              {activeNode ? activeNode.label : t('visualiser.nothingSelected')}
            </div>
          </div>
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {activeNode ? (
              <>
                <div style={{ color: MG(0.5), fontSize: '12px', lineHeight: 1.6 }}>
                  {(activeNode.category || t('common.unknown'))} · {Number(activeNode.count || 0).toLocaleString()} {t('visualiser.signals')} · {t('visualiser.weight')} {safeNumber(activeNode.weight, 2, 'n/a')}
                </div>
                {activeNode.preview && (
                  <div style={{ fontSize: '13px', lineHeight: 1.55, color: MG(0.74), padding: '12px', border: `1px solid ${MG(0.08)}`, background: MG(0.03), borderRadius: '4px' }}>
                    {activeNode.preview}
                  </div>
                )}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <Badge>{activeNode.kind || t('common.unknown')}</Badge>
                  <Badge>{activeNode.category || t('common.unknown')}</Badge>
                </div>
                {activeNode.memory_id && (
                  <Button primary onClick={() => onInspectMemory(activeNode.memory_id!)}>
                    {t('visualiser.openMemory')}
                  </Button>
                )}
              </>
            ) : (
              <div style={{ color: MG(0.45), fontSize: '13px', lineHeight: 1.6 }}>
                {mode === 'neural' ? t('visualiser.neuralPickPrompt') : t('visualiser.constellationPickPrompt')}
              </div>
            )}
          </div>
        </aside>
      </div>

      {!!data?.clusters?.length && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {data.clusters.slice(0, 10).map((cluster: any) => (
            <Badge key={cluster.label}>{cluster.label}: {cluster.count}</Badge>
          ))}
        </div>
      )}
    </div>
  );
};
