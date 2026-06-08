/**
 * VisualiserTab — Three.js WebGL edition (lazy-loaded)
 *
 * Three.js is NOT bundled. It is loaded on demand from the platform vendor
 * file (/static/vendor/three.module.min.js) the first time this tab is opened,
 * via threeLoader.ts. All subsequent visits reuse the browser-cached copy.
 *
 * Features (all preserved from the 2D canvas version):
 *   - Constellation mode  (wide orbital layout, dashed edges, star palette)
 *   - Neural map mode     (clustered layout, curved synapses, green-red palette)
 *   - Auto-rotation / drift, pauseable
 *   - Mouse/touch rotate + pan + pinch-zoom
 *   - Scroll-wheel zoom
 *   - Node hover & click → inspector panel
 *   - Fullscreen toggle
 *   - Camera-mode toggle (rotate ↔ pan)
 *   - Reset view
 *   - Cluster / region ellipsoids (neural mode)
 *   - Background star field (shader-based points)
 *   - Label sprites (canvas-texture billboards)
 *   - Selection / hover ring highlight
 *   - Cluster badge row at bottom
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import type * as THREEns from 'three'; // type-only — zero runtime bytes
import { fetchJSON, Button, Badge, Card, CardHeader, CardTitle, CardContent } from '@hermes/sdk';
import { safeNumber } from '../utils/format';
import { t } from '../utils/i18n';
import { getThree, type ThreeModule } from '../utils/threeLoader';

/* ─────────────────────────────── constants ─────────────────────────── */

const API = '/api/plugins/mnemosyne-native-dashboard';
const MG = (o: number) => `rgba(234,234,234,${o})`;
const VERACITY_COLOR: Record<string, string> = {
  stated: '#065f46',
  inferred: '#1e3a8a',
  tool: '#581c87',
  imported: '#78350f',
};
const MIN_ZOOM = 0.45;
const MAX_ZOOM = 4.0;
const FOV_CONST  = 52;
const FOV_NEURAL = 46;
const WORLD_CONST   = 340;
const CAMERA_Z_CONST  = 820;
const CAMERA_Z_NEURAL = 660;

/* ─────────────────────────────── types ─────────────────────────── */

interface VisualiserTabProps {
  onInspectMemory: (id: string) => void;
}

type VisualiserMode = 'constellation' | 'neural';
type CameraMode    = 'rotate' | 'pan';

interface SceneNode {
  id: string;
  label: string;
  kind?: string;
  category?: string;
  weight?: number;
  count?: number;
  memory_id?: string;
  preview?: string;
  wx: number;
  wy: number;
  wz: number;
  radius: number;
  twinkle: number;
  twinkleFreq: number;
  twinkleAmp: number;
}

interface SceneEdge {
  id: string;
  source: string;
  target: string;
  kind?: string;
}

interface Region {
  label: string;
  angle: number;
  cx: number; cy: number; cz: number;
  spread: number;
}

interface Palette {
  bg: string;
  bgHex: number;
  coreHex: number;
  starHex: number;
  memoryHex: number;
  starStr: string;
  memoryStr: string;
  edgeHex: number;
  edgeMemoryHex: number;
  text: string;
}

/* ─────────────────────────────── helpers ─────────────────────────── */

const PALETTES: Record<VisualiserMode, Palette> = {
  constellation: {
    bg: '#050711',   bgHex: 0x050711,
    coreHex: 0x65d6ff,
    starHex: 0x65d6ff, starStr: '#65d6ff',
    memoryHex: 0xffe08a, memoryStr: '#ffe08a',
    edgeHex: 0xc6e0ff, edgeMemoryHex: 0xffe08a,
    text: '#f7f8ff',
  },
  neural: {
    bg: '#06100f',   bgHex: 0x06100f,
    coreHex: 0x22826f,
    starHex: 0x66e8c6, starStr: '#66e8c6',
    memoryHex: 0xff5f57, memoryStr: '#ff5f57',
    edgeHex: 0x52d6b5, edgeMemoryHex: 0xff5f57,
    text: '#f6fbf7',
  },
};

const shortLabel = (s: string, max = 22) =>
  s.length > max ? `${s.slice(0, max - 3)}...` : s;

const labelForDisplay = (raw: string) => {
  const label = String(raw || '').replace(/^memory:/, 'mem ');
  return /^[A-Z][A-Z_\s-]{2,}$/.test(label)
    ? label.toLowerCase().replace(/(^|[_\s-])([a-z])/g, (_m, sep, ch) =>
        (sep === '_' ? ' ' : sep) + ch.toUpperCase())
    : label;
};

const isTechnical = (raw: string) => {
  const alpha = (raw.match(/[A-Za-z]/g) || []).length;
  return /^[a-f0-9]{10,}$/i.test(raw) || /^mem\s+[a-f0-9]{6,}$/i.test(raw) || alpha < 4;
};

/* ─────────────────────── layout builder ─────────────────────── */

function buildSceneData(payload: any, mode: VisualiserMode) {
  const maxNodes = mode === 'neural' ? 170 : 160;
  const maxEdges = mode === 'neural' ? 340 : 300;

  const rawNodes: any[] = (payload?.nodes || []).slice(0, maxNodes);
  const nodeIds = new Set(rawNodes.map((n: any) => n.id));
  const rawEdges: any[] = (payload?.edges || [])
    .filter((e: any) => nodeIds.has(e.source) && nodeIds.has(e.target))
    .slice(0, maxEdges);

  const categories: string[] = [...new Set(rawNodes.map((n: any) => String(n.category || 'Other')))];
  const catIndex: Record<string, number> = Object.fromEntries(categories.map((c, i) => [c, i]));

  const degree = new Map<string, number>();
  rawEdges.forEach((e: any) => {
    degree.set(e.source, (degree.get(e.source) || 0) + 1);
    degree.set(e.target, (degree.get(e.target) || 0) + 1);
  });

  const regions: Region[] = categories.map((cat, idx) => {
    const tPos = categories.length === 1 ? 0 : (idx / Math.max(1, categories.length - 1)) * 2 - 1;
    const angle = -Math.PI / 2 + idx * 2.399963;
    const radial = Math.sqrt(Math.max(0, 1 - tPos * tPos));
    return {
      label: cat, angle,
      cx: Math.cos(angle) * radial * 230,
      cy: tPos * 150 + Math.sin(angle * 0.7) * 24,
      cz: Math.sin(angle) * radial * 190 + (idx % 2 === 0 ? -28 : 28),
      spread: 78 + (idx % 4) * 12,
    };
  });
  const regionByCategory: Record<string, Region> = Object.fromEntries(regions.map(r => [r.label, r]));

  const nodes: SceneNode[] = rawNodes.map((node: any, idx: number) => {
    const cat = String(node.category || 'Other');
    const ci  = Number(catIndex[cat] || 0);
    const weight = Math.max(1, Number(node.weight || node.count || 1));
    let wx = 0, wy = 0, wz = 0;

    if (mode === 'neural') {
      const region = regionByCategory[cat] || regions[0] || { cx: 0, cy: 0, cz: 0, angle: 0 };
      const orbit = node.kind === 'memory'
        ? 70 + (idx % 6) * 15 + Math.min(42, Math.sqrt(weight) * 9)
        : (idx % 9) * 20;
      const angle = (region as Region).angle + idx * 2.399963 + ci * 0.18;
      const yUnit = ((((idx * 43 + ci * 17) % 97) + 0.5) / 97) * 2 - 1;
      const radial = Math.sqrt(Math.max(0, 1 - yUnit * yUnit));
      wx = region.cx + Math.cos(angle) * radial * orbit;
      wy = region.cy + yUnit * orbit * 0.82;
      wz = region.cz + Math.sin(angle) * radial * orbit * 0.86;
    } else {
      const angle = (idx / Math.max(rawNodes.length, 1)) * Math.PI * 2 + ci * 0.62;
      const band  = node.kind === 'memory' ? 1.28 : 0.72 + (ci % 4) * 0.16;
      const radius = WORLD_CONST * band + (idx % 7) * 16;
      wx = Math.cos(angle) * radius;
      wy = Math.sin(angle * 1.23) * (100 + (ci % 5) * 24) + (((idx * 53) % 131) - 65) * 0.82;
      wz = Math.sin(angle) * radius * 0.82 + (((idx * 97) % 181) - 90) * 1.55 + ((ci % 5) - 2) * 42;
    }

    const deg = degree.get(node.id) || 0;
    const nodeRadius = Math.min(
      mode === 'neural' ? 30 : 22,
      (mode === 'neural' ? 8 : 4) + Math.sqrt(weight + deg) * (node.kind === 'memory' ? 3.2 : 4.1),
    ) * (mode === 'neural' ? 0.8 : 0.54);

    return {
      ...node, wx, wy, wz,
      radius: Math.max(4, nodeRadius),
      twinkle: (idx % 17) / 17,
      twinkleFreq: (mode === 'neural' ? 0.0017 : 0.00115) + ((idx * 31) % 90) / 100000,
      twinkleAmp: 0.075 + ((idx * 19) % 55) / 1000,
    };
  });

  const edges: SceneEdge[] = rawEdges.map((e: any) => ({
    id: String(e.id || `${e.source}-${e.target}`),
    source: e.source, target: e.target, kind: e.kind,
  }));

  const starCount = mode === 'neural' ? 80 : 160;
  const spread    = 1800;
  const stars = Array.from({ length: starCount }, (_, idx) => ({
    x: ((idx * 73)  % 1000) / 1000 * spread - spread / 2,
    y: ((idx * 191) % 680)  / 680  * spread - spread / 2,
    z: ((idx * 137) % 1000) / 1000 * spread - spread / 2,
    r: 0.8 + ((idx * 37) % 100) / 50,
    a: 0.12 + ((idx * 29) % 100) / (mode === 'neural' ? 340 : 240),
    phase: ((idx * 47) % 628) / 100,
    freq:  (idx % 13 === 0 ? 0.0058 : 0.00048) + ((idx * 41) % 95) / 100000,
  }));

  return { nodes, edges, regions, stars };
}

/* ─────────── canvas-texture helpers (label + glow) ─────────── */

const _texCache = new Map<string, THREEns.CanvasTexture>();

function makeGlowTexture(THREE: ThreeModule, color: string, isMemory: boolean): THREEns.CanvasTexture {
  const key = `glow:${color}:${isMemory}`;
  if (_texCache.has(key)) return _texCache.get(key)!;
  const size = 128;
  const cvs  = document.createElement('canvas');
  cvs.width = cvs.height = size;
  const ctx = cvs.getContext('2d')!;
  const g   = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0,    'rgba(255,255,255,1)');
  g.addColorStop(0.18, color);
  g.addColorStop(0.55, isMemory ? 'rgba(255,180,80,0.35)' : 'rgba(100,200,255,0.2)');
  g.addColorStop(1,    'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(cvs);
  tex.needsUpdate = true;
  _texCache.set(key, tex as any);
  return tex as any;
}

function makeLabelTexture(THREE: ThreeModule, text: string, textColor: string): THREEns.CanvasTexture {
  const key = `label:${text}:${textColor}`;
  if (_texCache.has(key)) return _texCache.get(key)!;
  const cvs  = document.createElement('canvas');
  const ctx  = cvs.getContext('2d')!;
  const fs   = 26;
  ctx.font   = `${fs}px system-ui, sans-serif`;
  const w    = Math.ceil(ctx.measureText(text).width) + 24;
  cvs.width  = w; cvs.height = fs + 16;
  ctx.font   = `${fs}px system-ui, sans-serif`;
  ctx.lineWidth = 6;
  ctx.strokeStyle = 'rgba(0,0,0,0.82)';
  ctx.fillStyle   = textColor;
  ctx.strokeText(text, 12, fs + 2);
  ctx.fillText(text, 12, fs + 2);
  const tex = new THREE.CanvasTexture(cvs);
  tex.needsUpdate = true;
  _texCache.set(key, tex as any);
  return tex as any;
}

/* ──────────────────────────── main component ──────────────────────── */

export const VisualiserTab: React.FC<VisualiserTabProps> = ({ onInspectMemory }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const wrapRef  = useRef<HTMLDivElement>(null);

  // Three.js objects (refs — no state, no re-renders per frame)
  const THREE_REF    = useRef<ThreeModule | null>(null);
  const rendererRef  = useRef<THREEns.WebGLRenderer | null>(null);
  const sceneRef     = useRef<THREEns.Scene | null>(null);
  const cameraRef    = useRef<THREEns.PerspectiveCamera | null>(null);
  const frameRef     = useRef<number | null>(null);
  const clockRef     = useRef<{ start: number; last: number }>({ start: 0, last: 0 });

  const nodesRef    = useRef<SceneNode[]>([]);
  const nodeMeshes  = useRef<THREEns.Object3D[]>([]);
  const edgeLines   = useRef<(THREEns.Line | THREEns.LineSegments)[]>([]);
  const labelSprites= useRef<THREEns.Sprite[]>([]);
  const regionMeshes= useRef<THREEns.Object3D[]>([]);
  const starPoints  = useRef<THREEns.Points | null>(null);
  const selRingRef  = useRef<THREEns.Mesh | null>(null);
  const hovRingRef  = useRef<THREEns.Mesh | null>(null);

  // Camera control
  const camRef = useRef({
    theta: -0.42, phi: Math.PI / 2 - 0.34,
    radius: CAMERA_Z_CONST,
    panOffset: { x: 0, y: 0, z: 0 },
    zoom: 1.0,
    autoRotate: true,
    cameraMode: 'rotate' as CameraMode,
    dragMode: null as 'rotate' | 'pan' | null,
    dragStartX: 0, dragStartY: 0,
    dragThetaStart: 0, dragPhiStart: 0,
    dragPanStart: { x: 0, y: 0, z: 0 },
    pinchStartDist: 0, pinchStartZoom: 1,
    pointers: new Map<number, { x: number; y: number }>(),
  });

  // React state (UI redraws only)
  const [threeReady, setThreeReady]     = useState(false);
  const [threeError, setThreeError]     = useState('');
  const [loading, setLoading]           = useState(true);
  const [sceneError, setSceneError]     = useState('');
  const [data, setData]                 = useState<any>(null);
  const [mode, setMode]                 = useState<VisualiserMode>(() => {
    const s = window.localStorage.getItem('mnemosyne-dashboard-visualiser-mode');
    return s === 'neural' ? 'neural' : 'constellation';
  });
  const [paused, setPaused]             = useState(false);
  const [cameraMode, setCameraMode]     = useState<CameraMode>('rotate');
  const [selectedNode, setSelectedNode] = useState<SceneNode | null>(null);
  const [hoveredNode, setHoveredNode]   = useState<SceneNode | null>(null);

  // Latest values accessible inside rAF without stale closures
  const modeRef         = useRef(mode);
  const pausedRef       = useRef(paused);
  const selectedNodeRef = useRef<SceneNode | null>(null);
  const hoveredNodeRef  = useRef<SceneNode | null>(null);

  useEffect(() => { modeRef.current     = mode;          }, [mode]);
  useEffect(() => { pausedRef.current   = paused;        }, [paused]);
  useEffect(() => { selectedNodeRef.current = selectedNode; }, [selectedNode]);
  useEffect(() => { hoveredNodeRef.current  = hoveredNode;  }, [hoveredNode]);

  const [selectedMemoryDetail, setSelectedMemoryDetail] = useState<any>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    if (selectedNode && selectedNode.kind === 'memory' && selectedNode.memory_id) {
      setLoadingDetail(true);
      fetchJSON(`${API}/memory?id=${selectedNode.memory_id}`)
        .then((res: any) => {
          setSelectedMemoryDetail(res.item || null);
        })
        .catch(() => {
          setSelectedMemoryDetail(null);
        })
        .finally(() => {
          setLoadingDetail(false);
        });
    } else {
      setSelectedMemoryDetail(null);
      setLoadingDetail(false);
    }
  }, [selectedNode]);

  /* ─────────── lazy-load Three.js + init renderer ─────────── */
  useEffect(() => {
    let cancelled = false;
    getThree()
      .then((THREE) => {
        if (cancelled) return;
        THREE_REF.current = THREE;

        const mount = mountRef.current;
        if (!mount) return;

        const renderer = new THREE.WebGLRenderer({
          antialias: true, alpha: false, powerPreference: 'high-performance',
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(mount.clientWidth || 1000, mount.clientHeight || 680);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        mount.appendChild(renderer.domElement);
        renderer.domElement.style.cssText = 'width:100%;height:100%;cursor:grab;display:block;';
        rendererRef.current = renderer;

        const threeScene = new THREE.Scene();
        sceneRef.current = threeScene;

        const camera = new THREE.PerspectiveCamera(
          FOV_CONST,
          (mount.clientWidth || 1000) / (mount.clientHeight || 680),
          1, 6000,
        );
        camera.position.set(0, 0, CAMERA_Z_CONST);
        cameraRef.current = camera;

        threeScene.add(new THREE.AmbientLight(0xffffff, 0.6));
        const dir = new THREE.DirectionalLight(0xffffff, 0.5);
        dir.position.set(200, 400, 300);
        threeScene.add(dir);

        // Rings — always in scene, invisible until a node is picked
        const ringGeo  = new THREE.RingGeometry(1.0, 1.12, 48);
        const selRing  = new THREE.Mesh(ringGeo,
          new THREE.MeshBasicMaterial({ color: 0xffe08a, side: THREE.DoubleSide, transparent: true, opacity: 0.95, depthWrite: false }));
        const hovRing  = new THREE.Mesh(ringGeo.clone(),
          new THREE.MeshBasicMaterial({ color: 0xf7f8ff, side: THREE.DoubleSide, transparent: true, opacity: 0.72, depthWrite: false }));
        selRing.visible = hovRing.visible = false;
        selRing.renderOrder = hovRing.renderOrder = 999;
        threeScene.add(selRing, hovRing);
        selRingRef.current = selRing;
        hovRingRef.current = hovRing;

        clockRef.current.start = performance.now();
        clockRef.current.last  = 0;

        setThreeReady(true);
      })
      .catch((err: any) => {
        if (!cancelled) setThreeError(err?.message || 'Failed to load 3D engine');
      });

    return () => {
      cancelled = true;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      const renderer = rendererRef.current;
      const mount    = mountRef.current;
      if (renderer) {
        renderer.dispose();
        if (mount && mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      }
      rendererRef.current = null;
      sceneRef.current    = null;
      cameraRef.current   = null;
      THREE_REF.current   = null;
    };
  }, []); // once

  /* ─────────── resize observer ─────────── */
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const ro = new ResizeObserver(() => {
      const w = wrap.clientWidth  || 1000;
      const h = wrap.clientHeight || 680;
      rendererRef.current?.setSize(w, h, false);
      const cam = cameraRef.current;
      if (cam) { cam.aspect = w / h; cam.updateProjectionMatrix(); }
    });
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  /* ─────────── data fetch ─────────── */
  const fetchConstellation = useCallback(() => {
    setLoading(true);
    setSceneError('');
    fetchJSON(`${API}/constellation?limit=240`)
      .then((payload) => setData(payload))
      .catch((err: any) => setSceneError(err?.message || t('visualiser.loadError')))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchConstellation(); }, []);

  /* ─────────── clear scene objects ─────────── */
  const clearScene = useCallback(() => {
    const threeScene = sceneRef.current;
    if (!threeScene) return;

    nodeMeshes.current.forEach(m => {
      threeScene.remove(m);
      if ('geometry' in m) (m as any).geometry?.dispose?.();
      if ('material' in m) (m as any).material?.dispose?.();
    });
    nodeMeshes.current = [];

    edgeLines.current.forEach(l => {
      threeScene.remove(l);
      l.geometry?.dispose();
      (l.material as any)?.dispose?.();
    });
    edgeLines.current = [];

    labelSprites.current.forEach(s => {
      threeScene.remove(s);
      (s.material as any)?.dispose?.();
    });
    labelSprites.current = [];

    regionMeshes.current.forEach(m => {
      threeScene.remove(m);
      if ('geometry' in m) (m as any).geometry?.dispose?.();
      if ('material' in m) (m as any).material?.dispose?.();
    });
    regionMeshes.current = [];

    if (starPoints.current) {
      threeScene.remove(starPoints.current);
      starPoints.current.geometry.dispose();
      (starPoints.current.material as any).dispose?.();
      starPoints.current = null;
    }
  }, []);

  /* ─────────── build Three.js scene ─────────── */
  const buildThreeScene = useCallback((payload: any, nextMode: VisualiserMode) => {
    const THREE     = THREE_REF.current;
    const threeScene = sceneRef.current;
    if (!THREE || !threeScene) return;

    clearScene();

    const { nodes, edges, regions, stars } = buildSceneData(payload, nextMode);
    nodesRef.current = nodes;

    const pal = PALETTES[nextMode];
    threeScene.background = new THREE.Color(pal.bgHex);

    // ── star points (custom GLSL shader for per-point twinkling alpha) ──
    {
      const geo   = new THREE.BufferGeometry();
      const pos   = new Float32Array(stars.length * 3);
      const sizes = new Float32Array(stars.length);
      const alphas = new Float32Array(stars.length);
      stars.forEach((s, i) => {
        pos[i * 3] = s.x; pos[i * 3 + 1] = s.y; pos[i * 3 + 2] = s.z;
        sizes[i]  = s.r;
        alphas[i] = s.a;
      });
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1));
      geo.setAttribute('alpha',    new THREE.BufferAttribute(alphas, 1));

      const mat = new THREE.ShaderMaterial({
        uniforms: {
          color: { value: new THREE.Color(pal.starHex) },
          time:  { value: 0 },
        },
        vertexShader: `
          attribute float size;
          attribute float alpha;
          varying float vAlpha;
          void main() {
            vAlpha = alpha;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (350.0 / -mv.z);
            gl_Position  = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          varying float vAlpha;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float a = smoothstep(0.5, 0.0, d) * vAlpha;
            gl_FragColor = vec4(color, a);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const pts = new THREE.Points(geo, mat);
      pts.userData.starData = stars;
      threeScene.add(pts);
      starPoints.current = pts;
    }

    // ── region ellipsoids (neural mode only) ──
    if (nextMode === 'neural') {
      regions.slice(0, 10).forEach((region, idx) => {
        const regionColors = [0x4cab9e, 0x65d6ff, 0xffd166];
        const geo  = new THREE.SphereGeometry(1, 16, 10);
        const mat  = new THREE.MeshBasicMaterial({
          color: regionColors[idx % 3],
          transparent: true, opacity: 0.055,
          side: THREE.FrontSide, depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(region.cx, region.cy, region.cz);
        mesh.scale.set(region.spread * 3.2, region.spread * 2.0, region.spread * 2.6);
        mesh.rotation.y = region.angle * 0.42;
        threeScene.add(mesh);
        regionMeshes.current.push(mesh);

        const wire = new THREE.LineSegments(
          new THREE.EdgesGeometry(new THREE.SphereGeometry(0.72, 10, 6)),
          new THREE.LineBasicMaterial({
            color: idx % 3 === 2 ? 0xffe08a : 0x65d6ff,
            transparent: true, opacity: 0.12,
            depthWrite: false, blending: THREE.AdditiveBlending,
          }),
        );
        wire.position.copy(mesh.position);
        wire.scale.copy(mesh.scale);
        wire.rotation.copy(mesh.rotation);
        threeScene.add(wire);
        regionMeshes.current.push(wire);
      });
    }

    // ── edges ──
    {
      const byId: Record<string, SceneNode> = {};
      nodes.forEach(n => { byId[n.id] = n; });

      const edgeLimit   = nextMode === 'neural' ? 260 : 200;
      const degreeLimit = 6;
      const edgeDeg     = new Map<string, number>();
      let drawn = 0;

      for (const edge of edges) {
        if (drawn >= edgeLimit) break;
        const a = byId[edge.source], b = byId[edge.target];
        if (!a || !b) continue;
        const da = edgeDeg.get(edge.source) || 0;
        const db = edgeDeg.get(edge.target) || 0;
        if (da >= degreeLimit || db >= degreeLimit) continue;
        edgeDeg.set(edge.source, da + 1);
        edgeDeg.set(edge.target, db + 1);
        drawn++;

        const isMemEdge = edge.kind === 'memory';
        const edgeColor = new THREE.Color(isMemEdge ? pal.edgeMemoryHex : pal.edgeHex);
        const opacity   = isMemEdge ? 0.42 : 0.28;

        if (nextMode === 'neural') {
          const start = new THREE.Vector3(a.wx, a.wy, a.wz);
          const end   = new THREE.Vector3(b.wx, b.wy, b.wz);
          const mid   = start.clone().add(end).multiplyScalar(0.5);
          const perp  = new THREE.Vector3(-(end.y - start.y), end.x - start.x, 0).normalize();
          const curveMag = Math.min(48, start.distanceTo(end) * 0.16) * ((edge.id.length % 2) ? 1 : -1);
          mid.addScaledVector(perp, curveMag);
          const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
          const line = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(curve.getPoints(20)),
            new THREE.LineBasicMaterial({
              color: edgeColor, transparent: true, opacity,
              depthWrite: false, blending: THREE.AdditiveBlending,
            }),
          );
          line.renderOrder = 1;
          threeScene.add(line);
          edgeLines.current.push(line);
        } else {
          const line = new THREE.LineSegments(
            new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(a.wx, a.wy, a.wz),
              new THREE.Vector3(b.wx, b.wy, b.wz),
            ]),
            new THREE.LineDashedMaterial({
              color: edgeColor, transparent: true, opacity,
              dashSize: 8, gapSize: 10,
              depthWrite: false, blending: THREE.AdditiveBlending,
            }),
          );
          line.computeLineDistances();
          line.renderOrder = 1;
          threeScene.add(line);
          edgeLines.current.push(line as any);
        }
      }
    }

    // ── node glow sprites + core discs ──
    {
      nodes.forEach((node, nIdx) => {
        const isMemory = node.kind === 'memory';
        const baseColor = isMemory ? pal.memoryStr : pal.starStr;
        const glowTex  = makeGlowTexture(THREE, baseColor, isMemory);

        const glowMat  = new THREE.SpriteMaterial({
          map: glowTex as any, transparent: true,
          depthWrite: false, blending: THREE.AdditiveBlending,
          opacity: isMemory ? 0.88 : 0.75,
        });
        const glow  = new THREE.Sprite(glowMat);
        glow.position.set(node.wx, node.wy, node.wz);
        const gs = node.radius * (isMemory ? 4.5 : 3.4);
        glow.scale.set(gs, gs, 1);
        glow.renderOrder = 2;
        glow.userData.nodeId    = node.id;
        glow.userData.nodeIndex = nIdx;
        glow.userData.isGlow    = true;
        threeScene.add(glow);
        nodeMeshes.current.push(glow);

        const core = new THREE.Mesh(
          new THREE.CircleGeometry(node.radius * 0.38, 16),
          new THREE.MeshBasicMaterial({
            color: 0xffffff, transparent: true, opacity: 0.97,
            depthWrite: false, side: THREE.DoubleSide,
          }),
        );
        core.position.set(node.wx, node.wy, node.wz);
        core.renderOrder = 3;
        core.userData.nodeId    = node.id;
        core.userData.nodeIndex = nIdx;
        core.userData.isCore   = true;
        threeScene.add(core);
        nodeMeshes.current.push(core);
      });
    }

    // ── label sprites ──
    {
      const nodeDeg = new Map<string, number>();
      edges.forEach(e => {
        nodeDeg.set(e.source, (nodeDeg.get(e.source) || 0) + 1);
        nodeDeg.set(e.target, (nodeDeg.get(e.target) || 0) + 1);
      });

      nodes.forEach(node => {
        const raw   = labelForDisplay(node.label || '');
        if (isTechnical(raw)) return;
        const weight = Math.max(1, Number(node.weight || node.count || 1));
        const deg    = nodeDeg.get(node.id) || 0;
        const score  = Math.log1p(weight) * 0.52 + Math.log1p(deg) * 0.38 + (node.kind !== 'memory' ? 0.9 : 0.1);
        if (score < 1.8) return;

        const label   = shortLabel(raw);
        const tex     = makeLabelTexture(THREE, label, pal.text);
        const mat     = new THREE.SpriteMaterial({ map: tex as any, transparent: true, depthWrite: false });
        const sprite  = new THREE.Sprite(mat);
        const aspect  = (tex as any).image.width / (tex as any).image.height;
        const lw      = node.radius * 3.2 * aspect;
        const lh      = node.radius * 3.2;
        sprite.scale.set(lw, lh, 1);
        sprite.position.set(node.wx + node.radius * 1.8, node.wy + node.radius * 0.6, node.wz);
        sprite.renderOrder = 4;
        sprite.userData.nodeId = node.id;
        threeScene.add(sprite);
        labelSprites.current.push(sprite);
      });
    }

    // Hide rings until something is selected
    if (selRingRef.current) selRingRef.current.visible = false;
    if (hovRingRef.current) hovRingRef.current.visible = false;
  }, [clearScene]);

  /* ─────────── reset camera ─────────── */
  const resetView = useCallback((nextMode: VisualiserMode = modeRef.current) => {
    const cam = camRef.current;
    cam.theta  = -0.42;
    cam.phi    = Math.PI / 2 - 0.34;
    cam.radius = nextMode === 'neural' ? CAMERA_Z_NEURAL : CAMERA_Z_CONST;
    cam.panOffset = { x: 0, y: 0, z: 0 };
    cam.zoom       = 1.0;
    cam.autoRotate = true;
    const camera = cameraRef.current;
    if (camera) {
      camera.fov = nextMode === 'neural' ? FOV_NEURAL : FOV_CONST;
      camera.updateProjectionMatrix();
    }
    setPaused(false);
    pausedRef.current = false;
  }, []);

  /* ─────────── rebuild when data/mode changes ─────────── */
  useEffect(() => {
    if (!threeReady || !data) return;
    window.localStorage.setItem('mnemosyne-dashboard-visualiser-mode', mode);
    buildThreeScene(data, mode);
    resetView(mode);
    setSelectedNode(null);
    setHoveredNode(null);
  }, [threeReady, data, mode, buildThreeScene, resetView]);

  /* ─────────── animation loop ─────────── */
  useEffect(() => {
    if (!threeReady || loading || sceneError || !data) return;
    const renderer  = rendererRef.current;
    const threeScene = sceneRef.current;
    const camera     = cameraRef.current;
    if (!renderer || !threeScene || !camera) return;

    const cam = camRef.current;
    let animFrame: number;

    const animate = () => {
      animFrame = requestAnimationFrame(animate);
      frameRef.current = animFrame;

      const now   = performance.now();
      const time  = now - clockRef.current.start;
      const delta = clockRef.current.last ? Math.min(64, now - clockRef.current.last) : 16;
      clockRef.current.last = now;

      // Auto-rotation
      const currentMode = modeRef.current;
      if (!pausedRef.current && cam.dragMode === null && cam.autoRotate) {
        const speed = currentMode === 'neural' ? 0.000032 : 0.000065;
        cam.theta += delta * speed;
      }

      // Camera position from spherical coords
      const r    = cam.radius * cam.zoom;
      const phi  = Math.max(0.15, Math.min(Math.PI - 0.15, cam.phi));
      const px   = r * Math.sin(phi) * Math.sin(cam.theta);
      const py   = r * Math.cos(phi);
      const pz   = r * Math.sin(phi) * Math.cos(cam.theta);
      const po   = cam.panOffset;
      camera.position.set(px + po.x, py + po.y, pz + po.z);
      camera.lookAt(po.x, po.y, po.z);

      // Twinkle glow sprites
      const nodes = nodesRef.current;
      nodeMeshes.current.forEach(m => {
        if (!m.userData.isGlow) return;
        const node = nodes[m.userData.nodeIndex as number];
        if (!node) return;
        const pulse = 1 + Math.sin(time * node.twinkleFreq + node.twinkle * 6.28) * node.twinkleAmp;
        const base  = node.radius * (node.kind === 'memory' ? 4.5 : 3.4) * pulse;
        (m as THREEns.Sprite).scale.set(base, base, 1);
      });

      // Update star time uniform
      if (starPoints.current) {
        ((starPoints.current.material as THREEns.ShaderMaterial).uniforms.time.value) = time * 0.001;
      }

      // Billboard core discs toward camera
      nodeMeshes.current.forEach(m => {
        if (m.userData.isCore) m.quaternion.copy(camera.quaternion);
      });

      // Sync selection / hover rings
      const selNode = selectedNodeRef.current;
      const hovNode = hoveredNodeRef.current;
      const selRing = selRingRef.current;
      const hovRing = hovRingRef.current;

      if (selRing) {
        if (selNode) {
          selRing.visible = true;
          selRing.position.set(selNode.wx, selNode.wy, selNode.wz);
          selRing.quaternion.copy(camera.quaternion);
          const rs = selNode.radius * 2.6;
          selRing.scale.set(rs, rs, rs);
        } else { selRing.visible = false; }
      }
      if (hovRing) {
        if (hovNode && hovNode.id !== selNode?.id) {
          hovRing.visible = true;
          hovRing.position.set(hovNode.wx, hovNode.wy, hovNode.wz);
          hovRing.quaternion.copy(camera.quaternion);
          const rh = hovNode.radius * 2.6;
          hovRing.scale.set(rh, rh, rh);
        } else { hovRing.visible = false; }
      }

      renderer.render(threeScene, camera);
    };

    animate();
    return () => cancelAnimationFrame(animFrame);
  }, [threeReady, data, loading, sceneError]);

  /* ─────────── pointer / wheel interaction ─────────── */
  useEffect(() => {
    if (!threeReady || loading || sceneError || !data) return;
    const canvas = rendererRef.current?.domElement;
    if (!canvas) return;

    const THREE = THREE_REF.current!;
    const cam   = camRef.current;
    const raycaster = new THREE.Raycaster();

    const pickNode = (clientX: number, clientY: number): SceneNode | null => {
      const camera = cameraRef.current;
      if (!camera) return null;
      const rect = canvas.getBoundingClientRect();
      const ndc  = new THREE.Vector2(
        ((clientX - rect.left) / rect.width)  * 2 - 1,
        -((clientY - rect.top)  / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(ndc, camera);
      const cores  = nodeMeshes.current.filter(m => m.userData.isCore);
      const hits   = raycaster.intersectObjects(cores);
      const nodes  = nodesRef.current;
      const byId: Record<string, SceneNode> = {};
      nodes.forEach(n => { byId[n.id] = n; });
      if (hits.length > 0) return byId[hits[0].object.userData.nodeId as string] || null;

      // Fallback: screen-space sphere test
      const w = rect.width, h = rect.height;
      const cx = clientX - rect.left, cy = clientY - rect.top;
      let best: SceneNode | null = null, bestD = Infinity;
      for (const node of nodes) {
        const v  = new THREE.Vector3(node.wx, node.wy, node.wz).project(camera);
        const sx = (v.x + 1) / 2 * w, sy = (1 - (v.y + 1) / 2) * h;
        const d  = Math.hypot(sx - cx, sy - cy);
        if (d < Math.max(18, node.radius * 2.2) && d < bestD) { best = node; bestD = d; }
      }
      return best;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      cam.zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, cam.zoom * Math.exp(-e.deltaY * 0.0012)));
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.cancelable) e.preventDefault();
      try { canvas.setPointerCapture(e.pointerId); } catch {}
      cam.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (cam.pointers.size === 1) {
        cam.dragMode = cam.cameraMode === 'pan' || e.shiftKey || e.button === 1 || e.button === 2 ? 'pan' : 'rotate';
        cam.dragStartX = e.clientX; cam.dragStartY = e.clientY;
        cam.dragThetaStart = cam.theta; cam.dragPhiStart = cam.phi;
        cam.dragPanStart   = { ...cam.panOffset };
      }
      canvas.style.cursor = 'grabbing';
    };

    const handlePointerMove = (e: PointerEvent) => {
      cam.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (cam.pointers.size === 2) {
        const pts = [...cam.pointers.values()];
        const d   = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        if (cam.pinchStartDist === 0) { cam.pinchStartDist = d; cam.pinchStartZoom = cam.zoom; }
        else cam.zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, cam.pinchStartZoom * (d / cam.pinchStartDist)));
        return;
      }

      if (cam.dragMode === null) {
        const hit = pickNode(e.clientX, e.clientY);
        if (hit?.id !== hoveredNodeRef.current?.id) { hoveredNodeRef.current = hit; setHoveredNode(hit); }
        canvas.style.cursor = hit ? 'pointer' : 'grab';
        return;
      }

      if (e.cancelable) e.preventDefault();
      const dx = e.clientX - cam.dragStartX, dy = e.clientY - cam.dragStartY;
      if (cam.dragMode === 'rotate') {
        cam.theta = cam.dragThetaStart - dx * 0.008;
        cam.phi   = Math.max(0.15, Math.min(Math.PI - 0.15, cam.dragPhiStart + dy * 0.006));
      } else {
        const camera = cameraRef.current;
        if (!camera) return;
        const right = new THREE.Vector3().setFromMatrixColumn(camera.matrix, 0);
        const up    = new THREE.Vector3().setFromMatrixColumn(camera.matrix, 1);
        const scale = cam.zoom * cam.radius * 0.0014;
        cam.panOffset = {
          x: cam.dragPanStart.x - right.x * dx * scale + up.x * dy * scale,
          y: cam.dragPanStart.y - right.y * dx * scale + up.y * dy * scale,
          z: cam.dragPanStart.z - right.z * dx * scale + up.z * dy * scale,
        };
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      const prev   = cam.pointers.get(e.pointerId);
      const moved  = prev ? Math.hypot(prev.x - e.clientX, prev.y - e.clientY) > 5 : false;
      cam.pointers.delete(e.pointerId);
      if (cam.pointers.size === 0) {
        cam.pinchStartDist = 0;
        if (!moved) { const hit = pickNode(e.clientX, e.clientY); selectedNodeRef.current = hit; setSelectedNode(hit); }
        cam.dragMode = null;
        canvas.style.cursor = 'grab';
      }
    };

    canvas.addEventListener('wheel',        handleWheel,       { passive: false });
    canvas.addEventListener('pointerdown',  handlePointerDown);
    canvas.addEventListener('pointermove',  handlePointerMove);
    canvas.addEventListener('pointerup',    handlePointerUp);
    canvas.addEventListener('pointercancel',handlePointerUp);
    canvas.addEventListener('contextmenu',  (e: Event) => e.preventDefault());

    return () => {
      canvas.removeEventListener('wheel',       handleWheel);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup',   handlePointerUp);
      canvas.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [threeReady, loading, sceneError, data]);

  /* ─────────── UI handlers ─────────── */
  const togglePause = () => {
    const next = !pausedRef.current;
    pausedRef.current = next;
    camRef.current.autoRotate = !next;
    setPaused(next);
  };
  const togglePan = () => {
    const next: CameraMode = camRef.current.cameraMode === 'pan' ? 'rotate' : 'pan';
    camRef.current.cameraMode = next;
    setCameraMode(next);
  };
  const toggleFullscreen = () => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else wrap.requestFullscreen?.();
  };

  const counts    = { nodes: data?.nodes?.length || 0, edges: data?.edges?.length || 0 };
  const pal       = PALETTES[mode];

  // Compute connected edges for the selected node
  const connectedEdges = React.useMemo(() => {
    if (!selectedNode || !data?.edges) return [];
    return data.edges
      .filter((e: any) => e.source === selectedNode.id || e.target === selectedNode.id)
      .map((e: any) => {
        const neighborId = e.source === selectedNode.id ? e.target : e.source;
        const neighbor = data.nodes.find((n: any) => n.id === neighborId);
        return {
          edgeId: e.id,
          label: e.label || e.kind || 'connected',
          kind: e.kind,
          neighbor: neighbor,
          item: e.item
        };
      })
      .filter((ce: any) => ce.neighbor !== undefined);
  }, [selectedNode, data]);

  const getRelationshipStrength = (ce: any) => {
    if (ce.item) {
      if (ce.item.confidence !== undefined) return safeNumber(ce.item.confidence, 2);
      if (ce.item.importance !== undefined) return safeNumber(ce.item.importance, 2);
    }
    if (ce.neighbor && ce.neighbor.weight !== undefined) return safeNumber(ce.neighbor.weight, 2);
    return '0.80';
  };

  const handleSelectNeighbor = (neighborNode: SceneNode) => {
    setSelectedNode(neighborNode);
    selectedNodeRef.current = neighborNode;
  };

  /* ─────────── render ─────────── */
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '16px', borderBottom: `1px solid ${MG(0.1)}` }}>
        <div>
          <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>{t('visualiser.title')}</div>
          <div style={{ fontSize: '12px', color: MG(0.45) }}>{t('visualiser.subtitle')}</div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* Mode Switcher */}
          <div style={{ display: 'flex', gap: '2px', background: MG(0.05), padding: '2px', borderRadius: '6px' }}>
            <Button
              primary={mode === 'constellation'}
              ghost={mode !== 'constellation'}
              style={{ padding: '4px 10px', height: '28px', fontSize: '11px' }}
              onClick={() => setMode('constellation')}
            >
              {t('visualiser.constellationMode')}
            </Button>
            <Button
              primary={mode === 'neural'}
              ghost={mode !== 'neural'}
              style={{ padding: '4px 10px', height: '28px', fontSize: '11px' }}
              onClick={() => setMode('neural')}
            >
              {t('visualiser.neuralMode')}
            </Button>
          </div>

          <Badge>{counts.nodes} {t('visualiser.nodes')} · {counts.edges} {t('visualiser.edges')}</Badge>
        </div>
      </div>

      {/* Unified Action Toolbar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        border: `1px solid ${MG(0.1)}`,
        borderRadius: '4px',
        background: 'rgba(234,234,234,0.04)',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button onClick={fetchConstellation}>{t('visualiser.refresh')}</Button>
          <Button ghost onClick={() => resetView()}>{t('visualiser.resetView')}</Button>
          <Button ghost onClick={togglePan}>
            {cameraMode === 'pan' ? t('visualiser.rotateMode') : t('visualiser.panMode')}
          </Button>
          <Button ghost onClick={togglePause}>
            {paused ? t('visualiser.resume') : mode === 'neural' ? t('visualiser.pauseDrift') : t('visualiser.pauseRotation')}
          </Button>
          <Button ghost onClick={toggleFullscreen}>{t('visualiser.fullscreen')}</Button>
        </div>
        <span style={{ fontSize: '11px', color: MG(0.45), fontFamily: 'var(--theme-font-sans)' }}>
          {mode === 'neural' ? t('visualiser.neuralHelp') : t('visualiser.constellationHelp')}
        </span>
      </div>

      {/* Canvas + Inspector */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2.5fr) minmax(320px, 1.2fr)', gap: '16px', alignItems: 'stretch' }}>
        <div
          ref={wrapRef}
          style={{
            position: 'relative', minHeight: '680px',
            border: `1px solid ${MG(0.1)}`, borderRadius: '6px',
            overflow: 'hidden', background: pal.bg,
          }}
        >
          {/* Error states */}
          {threeError ? (
            <div style={{ height: '680px', display: 'grid', placeItems: 'center', color: '#f87171', padding: '24px', textAlign: 'center' }}>
              {threeError}
            </div>
          ) : loading ? (
            <div style={{ height: '680px', display: 'grid', placeItems: 'center', color: MG(0.4), fontSize: '12px' }}>
              {t('visualiser.loadingEngine')}
            </div>
          ) : sceneError ? (
            <div style={{ height: '680px', display: 'grid', placeItems: 'center', color: '#f87171', padding: '24px', textAlign: 'center' }}>
              {sceneError}
            </div>
          ) : counts.nodes === 0 ? (
            <div style={{ height: '680px', display: 'grid', placeItems: 'center', color: MG(0.4), fontSize: '12px' }}>
              {t('visualiser.noNodes')}
            </div>
          ) : null}

          {/* Three.js mount point — always rendered so the renderer can attach */}
          <div
            ref={mountRef}
            aria-label={t('visualiser.canvasLabel')}
            style={{
              width: '100%', height: '100%', minHeight: '680px',
              display: counts.nodes > 0 && !threeError && !sceneError ? 'block' : 'none',
            }}
          />

          {/* Legend overlay */}
          {counts.nodes > 0 && !threeError && !sceneError && (
            <div
              aria-label={t('visualiser.legend')}
              style={{
                position: 'absolute', right: '16px', bottom: '14px',
                display: 'flex', gap: '14px', alignItems: 'center',
                padding: '8px 10px', border: `1px solid ${MG(0.12)}`,
                background: 'rgba(5,7,17,0.72)', borderRadius: '4px',
                color: MG(0.72), fontSize: '11px',
                backdropFilter: 'blur(8px)', pointerEvents: 'none',
              }}
            >
              <span><span style={{ color: pal.starStr }}>●</span> {mode === 'neural' ? t('visualiser.neuronHub') : t('visualiser.entityTopic')}</span>
              <span><span style={{ color: pal.memoryStr }}>●</span> {mode === 'neural' ? t('visualiser.memorySoma') : t('visualiser.memory')}</span>
              <span style={{ color: MG(0.55) }}>─ {mode === 'neural' ? t('visualiser.synapse') : t('visualiser.link')}</span>
            </div>
          )}
        </div>

        {/* Inspector Card */}
        <Card style={{ minHeight: '680px', display: 'flex', flexDirection: 'column', background: MG(0.01) }}>
          <CardHeader style={{ padding: '18px 20px', borderBottom: `1px solid ${MG(0.08)}` }}>
            <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.14em', color: MG(0.45), fontWeight: 700 }}>
              {mode === 'neural' ? t('visualiser.neuralInspector') : t('visualiser.constellationInspector')}
            </div>
            <CardTitle style={{ fontSize: '15px', fontWeight: 600, marginTop: '10px', lineHeight: 1.4 }}>
              {selectedNode ? (selectedNode.kind === 'memory' ? 'Memory Record' : labelForDisplay(selectedNode.label)) : t('visualiser.nothingSelected')}
            </CardTitle>
          </CardHeader>
          <CardContent style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px', flex: 1, overflowY: 'auto' }}>
            {selectedNode ? (
              <>
                {/* Node Preview / Content */}
                <div style={{ fontSize: '13px', lineHeight: 1.55, color: MG(0.85), padding: '12px', border: `1px solid ${MG(0.08)}`, background: MG(0.03), borderRadius: '4px' }}>
                  {selectedNode.kind === 'memory' ? (selectedNode.preview || selectedNode.label) : labelForDisplay(selectedNode.label)}
                </div>

                {/* Entity Hub (Memory metadata) */}
                {selectedNode.kind === 'memory' && (
                  <div>
                    <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: MG(0.45), marginBottom: '8px', fontWeight: 600 }}>
                      Entity Hub
                    </div>
                    {loadingDetail ? (
                      <div style={{ fontSize: '12px', color: MG(0.4) }}>Loading metadata...</div>
                    ) : selectedMemoryDetail ? (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '10px',
                        fontSize: '11px',
                        background: MG(0.02),
                        padding: '10px',
                        borderRadius: '4px',
                        border: `1px solid ${MG(0.05)}`
                      }}>
                        <div>
                          <span style={{ color: MG(0.4) }}>Source: </span>
                          <span style={{ color: MG(0.8) }} title={selectedMemoryDetail.source}>{shortLabel(selectedMemoryDetail.source || 'unknown', 14)}</span>
                        </div>
                        <div>
                          <span style={{ color: MG(0.4) }}>Scope: </span>
                          <span style={{ color: MG(0.8) }}>{selectedMemoryDetail.scope || 'unknown'}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ color: MG(0.4) }}>Veracity: </span>
                          <Badge style={{ background: VERACITY_COLOR[String(selectedMemoryDetail.veracity).toLowerCase()] || MG(0.1), padding: '2px 6px', fontSize: '9px' }}>
                            {selectedMemoryDetail.veracity}
                          </Badge>
                        </div>
                        <div>
                          <span style={{ color: MG(0.4) }}>Imp: </span>
                          <span style={{ color: MG(0.8), fontWeight: 600 }}>{safeNumber(selectedMemoryDetail.importance, 2, 'n/a')}</span>
                        </div>
                      </div>
                    ) : (
                      <div style={{ fontSize: '12px', color: MG(0.4) }}>Metadata unavailable.</div>
                    )}
                  </div>
                )}

                {/* Connected Edges */}
                <div>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: MG(0.45), marginBottom: '8px', fontWeight: 600 }}>
                    Connected Edges
                  </div>
                  {connectedEdges.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '280px', overflowY: 'auto' }}>
                      {connectedEdges.map((ce: any) => (
                        <div
                          key={ce.edgeId}
                          onClick={() => handleSelectNeighbor(ce.neighbor)}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '8px 10px',
                            borderRadius: '4px',
                            background: MG(0.03),
                            border: `1px solid ${MG(0.06)}`,
                            cursor: 'pointer',
                            fontSize: '11px',
                            transition: 'background 0.15s, border-color 0.15s'
                          }}
                          onMouseEnter={(e: any) => {
                            e.currentTarget.style.background = MG(0.07);
                            e.currentTarget.style.borderColor = MG(0.12);
                          }}
                          onMouseLeave={(e: any) => {
                            e.currentTarget.style.background = MG(0.03);
                            e.currentTarget.style.borderColor = MG(0.06);
                          }}
                        >
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                            <span style={{ fontWeight: 600, color: MG(0.85), overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {ce.neighbor.kind === 'memory' ? 'Memory Record' : labelForDisplay(ce.neighbor.label)}
                            </span>
                            <span style={{ fontSize: '9px', color: MG(0.45) }}>
                              {ce.label} ({ce.neighbor.kind || 'unknown'})
                            </span>
                          </div>
                          <Badge style={{ background: MG(0.08), color: MG(0.6) }}>
                            {getRelationshipStrength(ce)}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ fontSize: '11px', color: MG(0.4), fontStyle: 'italic' }}>
                      No semantic connections.
                    </div>
                  )}
                </div>

                {selectedNode.memory_id && (
                  <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
                    <Button primary style={{ width: '100%' }} onClick={() => onInspectMemory(selectedNode.memory_id!)}>
                      {t('visualiser.openMemory')}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div style={{ display: 'grid', placeItems: 'center', height: '100%', minHeight: '220px' }}>
                <div style={{
                  textAlign: 'center',
                  fontSize: '12px',
                  color: MG(0.35),
                  padding: '24px 20px',
                  border: `1px dashed ${MG(0.15)}`,
                  borderRadius: '6px',
                  background: MG(0.005),
                  width: '100%'
                }}>
                  {mode === 'neural' ? t('visualiser.neuralPickPrompt') : t('visualiser.constellationPickPrompt')}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Cluster badges */}
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
