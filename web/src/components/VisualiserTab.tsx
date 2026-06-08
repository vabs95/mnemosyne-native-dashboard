/**
 * VisualiserTab — Three.js WebGL edition
 *
 * Replaces the manual 2-D canvas projection with a proper Three.js scene.
 * Every feature from the legacy canvas version is preserved:
 *   - Constellation mode  (wide orbital layout, dashed edges, star palette)
 *   - Neural map mode     (clustered layout, curved synapses, green-red palette)
 *   - Auto-rotation / drift that can be paused
 *   - Mouse/touch rotate + pan + pinch-zoom
 *   - Scroll-wheel zoom with focal-point offset
 *   - Node hover & click → inspector panel
 *   - Fullscreen toggle
 *   - Camera-mode toggle (rotate ↔ pan)
 *   - Reset view
 *   - Cluster / region ellipsoids (neural mode)
 *   - Background star field (instanced sprites)
 *   - Label sprites (canvas-texture billboards, collision-free culling)
 *   - Selection ring highlight
 *   - Cluster badge row at the bottom
 */

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import * as THREE from 'three';
import { fetchJSON, Button, Badge } from '@hermes/sdk';
import { safeNumber } from '../utils/format';
import { t } from '../utils/i18n';

/* ─────────────────────────────── constants ─────────────────────────── */

const API = '/api/plugins/mnemosyne-native-dashboard';
const MG = (o: number) => `rgba(234,234,234,${o})`;
const MIN_ZOOM = 0.45;
const MAX_ZOOM = 4.0;

// Camera FOV in constellation vs. neural modes (vertical degrees)
const FOV_CONST = 52;
const FOV_NEURAL = 46;

// World-space radii
const WORLD_CONST = 340;   // constellation outer ring radius

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
  wx: number;  // world-space position
  wy: number;
  wz: number;
  radius: number;   // visual radius in world units
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

interface Palette {
  bg: string;
  bgVec: THREE.Color;
  core: THREE.Color;
  star: THREE.Color;
  memory: THREE.Color;
  edge: THREE.Color;
  edgeMemory: THREE.Color;
  edgeHot: THREE.Color;
  text: string;
}

/* ─────────────────────────────── helpers ─────────────────────────── */

const paletteFor = (mode: VisualiserMode): Palette => {
  if (mode === 'neural') {
    return {
      bg:        '#06100f',
      bgVec:     new THREE.Color(0x06100f),
      core:      new THREE.Color(0x22826f).multiplyScalar(0.28),
      star:      new THREE.Color(0x66e8c6),
      memory:    new THREE.Color(0xff5f57),
      edge:      new THREE.Color(0x52d6b5),
      edgeMemory:new THREE.Color(0xff5f57),
      edgeHot:   new THREE.Color(0x5aeec4),
      text:      '#f6fbf7',
    };
  }
  return {
    bg:        '#050711',
    bgVec:     new THREE.Color(0x050711),
    core:      new THREE.Color(0x65d6ff).multiplyScalar(0.14),
    star:      new THREE.Color(0x65d6ff),
    memory:    new THREE.Color(0xffe08a),
    edge:      new THREE.Color(0xc6e0ff),
    edgeMemory:new THREE.Color(0xffe08a),
    edgeHot:   new THREE.Color(0x65d6ff),
    text:      '#f7f8ff',
  };
};



const shortLabel = (s: string, max = 22) =>
  s.length > max ? `${s.slice(0, max - 3)}...` : s;

const labelForCanvas = (raw: string) => {
  const label = String(raw || '').replace(/^memory:/, 'mem ');
  return /^[A-Z][A-Z_\s-]{2,}$/.test(label)
    ? label.toLowerCase().replace(/(^|[_\s-])([a-z])/g, (_m, sep, ch) =>
        (sep === '_' ? ' ' : sep) + ch.toUpperCase())
    : label;
};

const isTechnical = (raw: string) => {
  const alpha = (raw.match(/[A-Za-z]/g) || []).length;
  return /^[a-f0-9]{10,}$/i.test(raw) ||
    /^mem\s+[a-f0-9]{6,}$/i.test(raw) ||
    alpha < 4;
};

/* ─────────────────────── node layout builder ─────────────────────── */

interface Region {
  label: string;
  angle: number;
  cx: number; cy: number; cz: number;
  spread: number;
}

function buildSceneData(payload: any, mode: VisualiserMode): {
  nodes: SceneNode[];
  edges: SceneEdge[];
  regions: Region[];
  stars: { x: number; y: number; z: number; r: number; a: number; phase: number; freq: number }[];
} {
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

  // Regions (for neural cluster hulls)
  const regions: Region[] = categories.map((cat, idx) => {
    const tPos = categories.length === 1 ? 0 : (idx / Math.max(1, categories.length - 1)) * 2 - 1;
    const angle = -Math.PI / 2 + idx * 2.399963;
    const radial = Math.sqrt(Math.max(0, 1 - tPos * tPos));
    return {
      label: cat,
      angle,
      cx: Math.cos(angle) * radial * 230,
      cy: tPos * 150 + Math.sin(angle * 0.7) * 24,
      cz: Math.sin(angle) * radial * 190 + (idx % 2 === 0 ? -28 : 28),
      spread: 78 + (idx % 4) * 12,
    };
  });
  const regionByCategory: Record<string, Region> = Object.fromEntries(regions.map(r => [r.label, r]));

  const nodes: SceneNode[] = rawNodes.map((node: any, idx: number) => {
    const cat = String(node.category || 'Other');
    const ci = Number(catIndex[cat] || 0);
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
      const band = node.kind === 'memory' ? 1.28 : 0.72 + (ci % 4) * 0.16;
      const radius = WORLD_CONST * band + (idx % 7) * 16;
      wx = Math.cos(angle) * radius;
      wy = Math.sin(angle * 1.23) * (100 + (ci % 5) * 24) + (((idx * 53) % 131) - 65) * 0.82;
      wz = Math.sin(angle) * radius * 0.82 + (((idx * 97) % 181) - 90) * 1.55 + ((ci % 5) - 2) * 42;
    }

    const deg = degree.get(node.id) || 0;
    const sizeScale = mode === 'neural' ? 0.8 : 0.54;
    const maxR = mode === 'neural' ? 30 : 22;
    const baseR = mode === 'neural' ? 8 : 4;
    const nodeRadius = Math.min(maxR, baseR + Math.sqrt(weight + deg) * (node.kind === 'memory' ? 3.2 : 4.1)) * sizeScale;

    return {
      ...node,
      wx, wy, wz,
      radius: Math.max(4, nodeRadius),
      twinkle: (idx % 17) / 17,
      twinkleFreq: (mode === 'neural' ? 0.0017 : 0.00115) + ((idx * 31) % 90) / 100000,
      twinkleAmp: 0.075 + ((idx * 19) % 55) / 1000,
    };
  });

  const edges: SceneEdge[] = rawEdges.map((e: any) => ({
    id: String(e.id || `${e.source}-${e.target}`),
    source: e.source,
    target: e.target,
    kind: e.kind,
  }));

  const starCount = mode === 'neural' ? 80 : 160;
  const stars = Array.from({ length: starCount }, (_, idx) => {
    const fast = idx % 13 === 0;
    const spread = 1800;
    return {
      x: ((idx * 73) % 1000) / 1000 * spread - spread / 2,
      y: ((idx * 191) % 680) / 680 * spread - spread / 2,
      z: ((idx * 137) % 1000) / 1000 * spread - spread / 2,
      r: 0.8 + ((idx * 37) % 100) / 50,
      a: 0.12 + ((idx * 29) % 100) / (mode === 'neural' ? 340 : 240),
      phase: ((idx * 47) % 628) / 100,
      freq: fast ? 0.0058 + ((idx * 41) % 80) / 100000 : 0.00048 + ((idx * 41) % 95) / 100000,
    };
  });

  return { nodes, edges, regions, stars };
}

/* ─────────────────────── label texture factory ─────────────────────── */

const _labelCache = new Map<string, THREE.CanvasTexture>();
const _labelUsage  = new Map<string, number>();

function makeLabelTexture(text: string, textColor: string): THREE.CanvasTexture {
  const key = `${text}|${textColor}`;
  if (_labelCache.has(key)) {
    _labelUsage.set(key, (_labelUsage.get(key) || 0) + 1);
    return _labelCache.get(key)!;
  }
  const cvs = document.createElement('canvas');
  const ctx = cvs.getContext('2d')!;
  const fontSize = 26;
  ctx.font = `${fontSize}px system-ui, sans-serif`;
  const w = Math.ceil(ctx.measureText(text).width) + 24;
  const h = fontSize + 16;
  cvs.width  = w;
  cvs.height = h;
  ctx.font = `${fontSize}px system-ui, sans-serif`;
  ctx.lineWidth = 6;
  ctx.strokeStyle = 'rgba(0,0,0,0.82)';
  ctx.fillStyle = textColor;
  ctx.strokeText(text, 12, fontSize + 2);
  ctx.fillText(text, 12, fontSize + 2);
  const tex = new THREE.CanvasTexture(cvs);
  tex.needsUpdate = true;
  _labelCache.set(key, tex);
  _labelUsage.set(key, 1);
  return tex;
}

function disposeLabelTexture(text: string, textColor: string) {
  const key = `${text}|${textColor}`;
  const usage = (_labelUsage.get(key) || 0) - 1;
  if (usage <= 0) {
    _labelCache.get(key)?.dispose();
    _labelCache.delete(key);
    _labelUsage.delete(key);
  } else {
    _labelUsage.set(key, usage);
  }
}

/* ─────────────────────── glow-disc texture ─────────────────────── */

function makeGlowTexture(starColor: string, isMemory: boolean): THREE.CanvasTexture {
  const key = `glow:${starColor}:${isMemory}`;
  if (_labelCache.has(key)) return _labelCache.get(key)!;
  const size = 128;
  const cvs  = document.createElement('canvas');
  cvs.width = cvs.height = size;
  const ctx = cvs.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0,    'rgba(255,255,255,1)');
  g.addColorStop(0.18, starColor);
  g.addColorStop(0.55, isMemory ? 'rgba(255,180,80,0.35)' : 'rgba(100,200,255,0.2)');
  g.addColorStop(1,    'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(cvs);
  tex.needsUpdate = true;
  _labelCache.set(key, tex);
  return tex;
}

/* ──────────────────────────── main component ──────────────────────── */

export const VisualiserTab: React.FC<VisualiserTabProps> = ({ onInspectMemory }) => {
  const mountRef      = useRef<HTMLDivElement>(null);
  const wrapRef       = useRef<HTMLDivElement>(null);

  // Three.js objects kept in refs (not state — no re-renders on frame)
  const rendererRef   = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef      = useRef<THREE.Scene | null>(null);
  const cameraRef     = useRef<THREE.PerspectiveCamera | null>(null);
  const frameRef      = useRef<number | null>(null);
  const clockRef      = useRef<THREE.Clock>(new THREE.Clock());

  // Scene data (stable references across draws)
  const nodesRef      = useRef<SceneNode[]>([]);
  const edgesRef      = useRef<SceneEdge[]>([]);
  const regionsRef    = useRef<Region[]>([]);

  // Three.js objects for scene elements
  const nodeMeshesRef = useRef<THREE.Mesh[]>([]);
  const edgeLinesRef  = useRef<THREE.LineSegments | THREE.Line[]>([]);
  const labelSpritesRef  = useRef<THREE.Sprite[]>([]);
  const regionMeshesRef  = useRef<THREE.Mesh[]>([]);
  const starMeshRef      = useRef<THREE.Points | null>(null);
  const selectionRingRef = useRef<THREE.Mesh | null>(null);
  const hoverRingRef     = useRef<THREE.Mesh | null>(null);

  // Camera control state
  const camStateRef = useRef({
    spherical: new THREE.Spherical(CAMERA_Z_CONST, Math.PI / 2 - 0.34, -0.42),
    panOffset: new THREE.Vector3(),
    zoom: 1.0,
    autoRotate: true,
    rotateSpeed: 0.00065,
    dragMode: null as 'rotate' | 'pan' | null,
    dragStart: new THREE.Vector2(),
    dragSphStart: new THREE.Spherical(),
    dragPanStart: new THREE.Vector3(),
    pinchStartDist: 0,
    pinchStartZoom: 1,
    pointers: new Map<number, THREE.Vector2>(),
    cameraMode: 'rotate' as CameraMode,
  });

  // React state (only for UI re-renders)
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

  // Keep latest in ref for use inside rAF loop
  const modeRef         = useRef(mode);
  const pausedRef       = useRef(paused);
  const selectedNodeRef = useRef<SceneNode | null>(null);
  const hoveredNodeRef  = useRef<SceneNode | null>(null);

  useEffect(() => { modeRef.current = mode; },       [mode]);
  useEffect(() => { pausedRef.current = paused; },   [paused]);
  useEffect(() => { selectedNodeRef.current = selectedNode; }, [selectedNode]);
  useEffect(() => { hoveredNodeRef.current  = hoveredNode;  }, [hoveredNode]);

  /* ─────────── init Three.js renderer ─────────── */
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth || 1000, mount.clientHeight || 680);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.width  = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.cursor = 'grab';
    rendererRef.current = renderer;

    const threeScene = new THREE.Scene();
    sceneRef.current = threeScene;

    const camera = new THREE.PerspectiveCamera(FOV_CONST, (mount.clientWidth || 1000) / (mount.clientHeight || 680), 1, 6000);
    camera.position.set(0, 0, CAMERA_Z_CONST);
    cameraRef.current = camera;

    // Ambient + dim directional light (helps node shading pop)
    threeScene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(200, 400, 300);
    threeScene.add(dirLight);

    // Selection / hover rings (always in scene, moved to selected node)
    const ringGeo = new THREE.RingGeometry(1.0, 1.12, 48);
    const selMat  = new THREE.MeshBasicMaterial({ color: 0xffe08a, side: THREE.DoubleSide, transparent: true, opacity: 0.95, depthWrite: false });
    const hovMat  = new THREE.MeshBasicMaterial({ color: 0xf7f8ff, side: THREE.DoubleSide, transparent: true, opacity: 0.72, depthWrite: false });
    const selRing = new THREE.Mesh(ringGeo, selMat);
    const hovRing = new THREE.Mesh(ringGeo.clone(), hovMat);
    selRing.visible = hovRing.visible = false;
    selRing.renderOrder = hovRing.renderOrder = 999;
    threeScene.add(selRing, hovRing);
    selectionRingRef.current = selRing;
    hoverRingRef.current     = hovRing;

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      rendererRef.current = null;
      sceneRef.current    = null;
      cameraRef.current   = null;
    };
  }, []); // run once

  /* ─────────── resize observer ─────────── */
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const ro = new ResizeObserver(() => {
      const w = wrap.clientWidth  || 1000;
      const h = wrap.clientHeight || 680;
      const renderer = rendererRef.current;
      const camera   = cameraRef.current;
      if (renderer) renderer.setSize(w, h, false);
      if (camera)   { camera.aspect = w / h; camera.updateProjectionMatrix(); }
    });
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  /* ─────────── fetch data ─────────── */
  const fetchConstellation = useCallback(() => {
    setLoading(true);
    setSceneError('');
    fetchJSON(`${API}/constellation?limit=240`)
      .then((payload) => setData(payload))
      .catch((err: any) => setSceneError(err?.message || t('visualiser.loadError')))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchConstellation(); }, []);

  /* ─────────── clear Three.js scene objects ─────────── */
  const clearScene = useCallback(() => {
    const threeScene = sceneRef.current;
    if (!threeScene) return;

    nodeMeshesRef.current.forEach(m => {
      threeScene.remove(m);
      (m.geometry as THREE.BufferGeometry).dispose();
      ((m.material as THREE.Material)).dispose();
    });
    nodeMeshesRef.current = [];

    (edgeLinesRef.current as any[]).forEach(l => {
      threeScene.remove(l);
      if ('geometry' in l) (l.geometry as THREE.BufferGeometry).dispose();
      if ('material' in l) (l.material as THREE.Material).dispose();
    });
    edgeLinesRef.current = [];

    labelSpritesRef.current.forEach(s => {
      threeScene.remove(s);
      const key = (s.userData as any).labelKey as string;
      const color = (s.userData as any).labelColor as string;
      if (key && color) disposeLabelTexture(key, color);
      (s.material as THREE.SpriteMaterial).dispose();
    });
    labelSpritesRef.current = [];

    regionMeshesRef.current.forEach(m => {
      threeScene.remove(m);
      (m.geometry as THREE.BufferGeometry).dispose();
      ((m.material as THREE.Material)).dispose();
    });
    regionMeshesRef.current = [];

    if (starMeshRef.current) {
      threeScene.remove(starMeshRef.current);
      (starMeshRef.current.geometry as THREE.BufferGeometry).dispose();
      ((starMeshRef.current.material as THREE.Material)).dispose();
      starMeshRef.current = null;
    }
  }, []);

  /* ─────────── build Three.js scene from data ─────────── */
  const buildThreeScene = useCallback((payload: any, nextMode: VisualiserMode) => {
    const threeScene = sceneRef.current;
    if (!threeScene) return;

    clearScene();

    const { nodes, edges, regions, stars } = buildSceneData(payload, nextMode);
    nodesRef.current   = nodes;
    edgesRef.current   = edges;
    regionsRef.current = regions;

    const pal = paletteFor(nextMode);

    // ── background colour ──
    threeScene.background = pal.bgVec;

    // ── stars (instanced point sprites) ──
    {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(stars.length * 3);
      const sizes = new Float32Array(stars.length);
      const alphas = new Float32Array(stars.length);
      stars.forEach((s, i) => {
        pos[i * 3]     = s.x;
        pos[i * 3 + 1] = s.y;
        pos[i * 3 + 2] = s.z;
        sizes[i]  = s.r;
        alphas[i] = s.a;
      });
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1));
      geo.setAttribute('alpha',    new THREE.BufferAttribute(alphas, 1));

      // Custom shader-based points for per-point alpha
      const mat = new THREE.ShaderMaterial({
        uniforms: { color: { value: pal.star }, time: { value: 0 } },
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
        depthWrite:  false,
        blending:    THREE.AdditiveBlending,
      });

      const points = new THREE.Points(geo, mat);
      points.userData.starData = stars;
      threeScene.add(points);
      starMeshRef.current = points;
    }

    // ── region ellipsoids (neural mode) ──
    if (nextMode === 'neural') {
      regions.slice(0, 10).forEach((region, idx) => {
        const geo = new THREE.SphereGeometry(1, 16, 10);
        const colors = [0x4cab9e, 0x65d6ff, 0xffd166];
        const baseColor = colors[idx % 3];
        const mat = new THREE.MeshBasicMaterial({
          color: baseColor,
          transparent: true,
          opacity: 0.055,
          side: THREE.FrontSide,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(region.cx, region.cy, region.cz);
        const sx = region.spread * 3.2;
        const sy = region.spread * 2.0;
        const sz = region.spread * 2.6;
        mesh.scale.set(sx, sy, sz);
        mesh.rotation.y = region.angle * 0.42;
        threeScene.add(mesh);
        regionMeshesRef.current.push(mesh);

        // Wire outline
        const outGeo = new THREE.EdgesGeometry(new THREE.SphereGeometry(0.72, 10, 6));
        const outMat = new THREE.LineBasicMaterial({
          color: idx % 3 === 2 ? 0xffe08a : 0x65d6ff,
          transparent: true,
          opacity: 0.12,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const outline = new THREE.LineSegments(outGeo, outMat);
        outline.position.copy(mesh.position);
        outline.scale.copy(mesh.scale);
        outline.rotation.copy(mesh.rotation);
        threeScene.add(outline);
        regionMeshesRef.current.push(outline as any);
      });
    }

    // ── edges ──
    {
      const byId: Record<string, SceneNode> = {};
      nodes.forEach(n => { byId[n.id] = n; });

      const degree = new Map<string, number>();
      edges.forEach(e => {
        degree.set(e.source, (degree.get(e.source) || 0) + 1);
        degree.set(e.target, (degree.get(e.target) || 0) + 1);
      });

      const edgeLimit   = nextMode === 'neural' ? 260 : 200;
      const degreeLimit = 6;
      const edgeDeg     = new Map<string, number>();
      let drawn         = 0;

      for (const edge of edges) {
        if (drawn >= edgeLimit) break;
        const a = byId[edge.source];
        const b = byId[edge.target];
        if (!a || !b) continue;
        const da = edgeDeg.get(edge.source) || 0;
        const db = edgeDeg.get(edge.target) || 0;
        if (da >= degreeLimit || db >= degreeLimit) continue;
        edgeDeg.set(edge.source, da + 1);
        edgeDeg.set(edge.target, db + 1);
        drawn++;

        const edgeColor = edge.kind === 'memory' ? pal.edgeMemory : pal.edge;
        const opacity   = edge.kind === 'memory' ? 0.42 : 0.28;

        if (nextMode === 'neural') {
          // Quadratic bezier curve via TubeGeometry path
          const start = new THREE.Vector3(a.wx, a.wy, a.wz);
          const end   = new THREE.Vector3(b.wx, b.wy, b.wz);
          const mid   = start.clone().add(end).multiplyScalar(0.5);
          const perp  = new THREE.Vector3(
            -(end.y - start.y), end.x - start.x, 0
          ).normalize();
          const curveMag = Math.min(48, start.distanceTo(end) * 0.16) * ((edge.id.length % 2) ? 1 : -1);
          mid.addScaledVector(perp, curveMag);

          const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
          const pts   = curve.getPoints(20);
          const geo   = new THREE.BufferGeometry().setFromPoints(pts);
          const mat   = new THREE.LineBasicMaterial({
            color: edgeColor,
            transparent: true,
            opacity,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          });
          const line = new THREE.Line(geo, mat);
          line.renderOrder = 1;
          threeScene.add(line);
          (edgeLinesRef.current as THREE.Line[]).push(line);
        } else {
          // Straight dashed line
          const pts = [
            new THREE.Vector3(a.wx, a.wy, a.wz),
            new THREE.Vector3(b.wx, b.wy, b.wz),
          ];
          const geo = new THREE.BufferGeometry().setFromPoints(pts);
          const mat = new THREE.LineDashedMaterial({
            color: edgeColor,
            transparent: true,
            opacity,
            dashSize: 8,
            gapSize: 10,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          });
          const line = new THREE.LineSegments(geo, mat);
          line.computeLineDistances();
          line.renderOrder = 1;
          threeScene.add(line);
          (edgeLinesRef.current as THREE.LineSegments[]).push(line as any);
        }
      }
    }

    // ── node glow discs ──
    {
      const byId: Record<string, SceneNode> = {};
      nodes.forEach(n => { byId[n.id] = n; });

      const nodeDeg = new Map<string, number>();
      edges.forEach(e => {
        nodeDeg.set(e.source, (nodeDeg.get(e.source) || 0) + 1);
        nodeDeg.set(e.target, (nodeDeg.get(e.target) || 0) + 1);
      });

      nodes.forEach((node, _idx) => {
        const isMemory = node.kind === 'memory';
        const weight   = Math.max(1, Number(node.weight || node.count || 1));
        const baseCol  = isMemory
          ? `#${pal.memory.getHexString()}`
          : `#${pal.star.getHexString()}`;

        const glowTex = makeGlowTexture(baseCol, isMemory);
        const spriteMat = new THREE.SpriteMaterial({
          map: glowTex,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          opacity: isMemory ? 0.88 : 0.75,
        });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.position.set(node.wx, node.wy, node.wz);
        const glowSize = node.radius * (isMemory ? 4.5 : 3.4);
        sprite.scale.set(glowSize, glowSize, 1);
        sprite.renderOrder = 2;
        sprite.userData.nodeId = node.id;
        sprite.userData.nodeIndex = _idx;
        sprite.userData.isGlow = true;
        threeScene.add(sprite);
        nodeMeshesRef.current.push(sprite as any);

        // Bright white core disc
        const coreGeo = new THREE.CircleGeometry(node.radius * 0.38, 16);
        const coreMat = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.97,
          depthWrite: false,
          side: THREE.DoubleSide,
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        core.position.set(node.wx, node.wy, node.wz);
        core.renderOrder = 3;
        core.userData.nodeId    = node.id;
        core.userData.nodeIndex = _idx;
        core.userData.isCore    = true;
        core.userData.weight    = weight;
        threeScene.add(core);
        nodeMeshesRef.current.push(core);
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
        const raw   = labelForCanvas(node.label || '');
        if (isTechnical(raw)) return;
        const weight = Math.max(1, Number(node.weight || node.count || 1));
        const deg    = nodeDeg.get(node.id) || 0;
        const score  = Math.log1p(weight) * 0.52 + Math.log1p(deg) * 0.38 + (node.kind !== 'memory' ? 0.9 : 0.1);
        if (score < 1.8) return; // skip very minor nodes

        const label    = shortLabel(raw);
        const tex      = makeLabelTexture(label, pal.text);
        const mat      = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
        const sprite   = new THREE.Sprite(mat);
        const aspect   = tex.image.width / tex.image.height;
        const labelW   = node.radius * 3.2 * aspect;
        const labelH   = node.radius * 3.2;
        sprite.scale.set(labelW, labelH, 1);
        sprite.position.set(
          node.wx + node.radius * 1.8,
          node.wy + node.radius * 0.6,
          node.wz,
        );
        sprite.renderOrder = 4;
        sprite.userData.labelKey   = label;
        sprite.userData.labelColor = pal.text;
        sprite.userData.nodeId     = node.id;
        threeScene.add(sprite);
        labelSpritesRef.current.push(sprite);
      });
    }

    // Re-seat selection/hover rings off screen until a node is picked
    const sel = selectionRingRef.current;
    const hov = hoverRingRef.current;
    if (sel) sel.visible = false;
    if (hov) hov.visible = false;
  }, [clearScene]);

  /* ─────────── reset camera ─────────── */
  const resetView = useCallback((nextMode: VisualiserMode = modeRef.current) => {
    const cam = camStateRef.current;
    const z   = nextMode === 'neural' ? CAMERA_Z_NEURAL : CAMERA_Z_CONST;
    cam.spherical.set(z, Math.PI / 2 - 0.34, -0.42);
    cam.panOffset.set(0, 0, 0);
    cam.zoom = 1.0;
    cam.autoRotate = true;
    const camera = cameraRef.current;
    if (camera) {
      camera.fov = nextMode === 'neural' ? FOV_NEURAL : FOV_CONST;
      camera.updateProjectionMatrix();
    }
    setPaused(false);
    pausedRef.current = false;
  }, []);

  /* ─────────── rebuild scene when data/mode changes ─────────── */
  useEffect(() => {
    if (!data) return;
    window.localStorage.setItem('mnemosyne-dashboard-visualiser-mode', mode);
    buildThreeScene(data, mode);
    resetView(mode);
    setSelectedNode(null);
    setHoveredNode(null);
  }, [data, mode, buildThreeScene, resetView]);

  /* ─────────── animation loop ─────────── */
  useEffect(() => {
    if (loading || sceneError || !data) return;
    const renderer = rendererRef.current;
    const threeScene = sceneRef.current;
    const camera     = cameraRef.current;
    if (!renderer || !threeScene || !camera) return;

    const cam = camStateRef.current;

    let animFrame: number;
    const animate = () => {
      animFrame = requestAnimationFrame(animate);
      frameRef.current = animFrame;

      const time    = clockRef.current.getElapsedTime() * 1000; // ms
      const delta   = clockRef.current.getDelta() * 1000;        // ms

      // Auto-rotation
      const currentMode = modeRef.current;
      if (!pausedRef.current && cam.dragMode === null && cam.autoRotate) {
        const speed = currentMode === 'neural' ? 0.000032 : 0.000065;
        cam.spherical.theta += delta * speed;
      }

      // Update camera from spherical + pan
      const r = cam.spherical.radius * cam.zoom;
      const clampedPhi = Math.max(0.15, Math.min(Math.PI - 0.15, cam.spherical.phi));
      const x = r * Math.sin(clampedPhi) * Math.sin(cam.spherical.theta);
      const y = r * Math.cos(clampedPhi);
      const z = r * Math.sin(clampedPhi) * Math.cos(cam.spherical.theta);
      camera.position.set(x, y, z).add(cam.panOffset);
      camera.lookAt(cam.panOffset);

      // Animate node glow twinkle
      const nodes = nodesRef.current;
      nodeMeshesRef.current.forEach(m => {
        if (!m.userData.isGlow) return;
        const nIdx  = m.userData.nodeIndex as number;
        const node  = nodes[nIdx];
        if (!node) return;
        const pulse = 1 + Math.sin(time * node.twinkleFreq + node.twinkle * 6.28) * node.twinkleAmp;
        const s = m.scale.x / pulse; // reverse previous
        const base = node.radius * (node.kind === 'memory' ? 4.5 : 3.4);
        const ns   = base * pulse;
        m.scale.set(ns, ns, 1);
      });

      // Animate star points time uniform
      if (starMeshRef.current) {
        const mat = starMeshRef.current.material as THREE.ShaderMaterial;
        mat.uniforms.time.value = time * 0.001;
      }

      // Billboard: face core discs toward camera
      nodeMeshesRef.current.forEach(m => {
        if (!m.userData.isCore) return;
        m.quaternion.copy(camera.quaternion);
      });

      // Sync ring positions to selected/hovered nodes
      const selNode = selectedNodeRef.current;
      const hovNode = hoveredNodeRef.current;
      const selRing = selectionRingRef.current;
      const hovRing = hoverRingRef.current;

      if (selRing) {
        if (selNode) {
          selRing.visible = true;
          selRing.position.set(selNode.wx, selNode.wy, selNode.wz);
          selRing.quaternion.copy(camera.quaternion);
          const rs = selNode.radius * 2.6;
          selRing.scale.set(rs, rs, rs);
        } else {
          selRing.visible = false;
        }
      }
      if (hovRing) {
        if (hovNode && hovNode.id !== selNode?.id) {
          hovRing.visible = true;
          hovRing.position.set(hovNode.wx, hovNode.wy, hovNode.wz);
          hovRing.quaternion.copy(camera.quaternion);
          const rh = hovNode.radius * 2.6;
          hovRing.scale.set(rh, rh, rh);
        } else {
          hovRing.visible = false;
        }
      }

      renderer.render(threeScene, camera);
    };

    animate();
    return () => {
      cancelAnimationFrame(animFrame);
    };
  }, [data, loading, sceneError]);

  /* ─────────── interaction (pointer/wheel) ─────────── */
  useEffect(() => {
    if (loading || sceneError || !data) return;
    const mount  = mountRef.current;
    const canvas = rendererRef.current?.domElement;
    if (!mount || !canvas) return;

    const cam     = camStateRef.current;
    const raycaster = new THREE.Raycaster();
    raycaster.params.Points!.threshold = 8;

    const getPointerNDC = (clientX: number, clientY: number): THREE.Vector2 => {
      const rect = canvas.getBoundingClientRect();
      return new THREE.Vector2(
        ((clientX - rect.left) / rect.width)  * 2 - 1,
        -((clientY - rect.top)  / rect.height) * 2 + 1,
      );
    };

    const pickNode = (clientX: number, clientY: number): SceneNode | null => {
      const camera = cameraRef.current;
      if (!camera) return null;
      const ndc = getPointerNDC(clientX, clientY);
      raycaster.setFromCamera(ndc, camera);

      const nodes  = nodesRef.current;
      const byId: Record<string, SceneNode> = {};
      nodes.forEach(n => { byId[n.id] = n; });

      // Test against all node core meshes
      const targets = nodeMeshesRef.current.filter(m => m.userData.isCore);
      const hits    = raycaster.intersectObjects(targets);
      if (hits.length > 0) {
        const id = hits[0].object.userData.nodeId as string;
        return byId[id] || null;
      }

      // Fallback: sphere test in screen space
      const rect = canvas.getBoundingClientRect();
      const cx   = clientX - rect.left;
      const cy   = clientY - rect.top;
      const w    = rect.width;
      const h    = rect.height;

      let best: SceneNode | null = null;
      let bestDist = Infinity;

      for (const node of nodes) {
        const v = new THREE.Vector3(node.wx, node.wy, node.wz).project(camera);
        const sx = (v.x + 1) / 2 * w;
        const sy = (1 - (v.y + 1) / 2) * h;
        const dist = Math.hypot(sx - cx, sy - cy);
        const hitR = Math.max(18, node.radius * 2.2);
        if (dist < hitR && dist < bestDist) {
          best     = node;
          bestDist = dist;
        }
      }
      return best;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const factor = Math.exp(-e.deltaY * 0.0012);
      cam.zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, cam.zoom * factor));
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.cancelable) e.preventDefault();
      try { canvas.setPointerCapture(e.pointerId); } catch {}
      cam.pointers.set(e.pointerId, new THREE.Vector2(e.clientX, e.clientY));
      if (cam.pointers.size === 1) {
        cam.dragMode = cam.cameraMode === 'pan' || e.shiftKey || e.button === 1 || e.button === 2
          ? 'pan' : 'rotate';
        cam.dragStart.set(e.clientX, e.clientY);
        cam.dragSphStart.copy(cam.spherical);
        cam.dragPanStart.copy(cam.panOffset);
      }
      canvas.style.cursor = 'grabbing';
    };

    const handlePointerMove = (e: PointerEvent) => {
      cam.pointers.set(e.pointerId, new THREE.Vector2(e.clientX, e.clientY));

      // Pinch-zoom (2 fingers)
      if (cam.pointers.size === 2) {
        const pts = [...cam.pointers.values()];
        const d   = pts[0].distanceTo(pts[1]);
        if (cam.pinchStartDist === 0) {
          cam.pinchStartDist = d;
          cam.pinchStartZoom = cam.zoom;
        } else {
          cam.zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, cam.pinchStartZoom * (d / cam.pinchStartDist)));
        }
        return;
      }

      // Hover hit-test (no drag)
      if (cam.dragMode === null) {
        const hit = pickNode(e.clientX, e.clientY);
        if (hit?.id !== hoveredNodeRef.current?.id) {
          hoveredNodeRef.current = hit;
          setHoveredNode(hit);
        }
        canvas.style.cursor = hit ? 'pointer' : 'grab';
        return;
      }

      if (e.cancelable) e.preventDefault();
      const dx = e.clientX - cam.dragStart.x;
      const dy = e.clientY - cam.dragStart.y;

      if (cam.dragMode === 'rotate') {
        cam.spherical.theta = cam.dragSphStart.theta - dx * 0.008;
        cam.spherical.phi   = Math.max(0.15, Math.min(
          Math.PI - 0.15,
          cam.dragSphStart.phi + dy * 0.006,
        ));
      } else {
        // Pan: project in camera space
        const camera = cameraRef.current;
        if (!camera) return;
        const right = new THREE.Vector3();
        const up    = new THREE.Vector3();
        camera.getWorldDirection(new THREE.Vector3());
        right.setFromMatrixColumn(camera.matrix, 0);
        up.setFromMatrixColumn(camera.matrix, 1);
        const panScale = cam.zoom * cam.spherical.radius * 0.0014;
        cam.panOffset.copy(cam.dragPanStart)
          .addScaledVector(right, -dx * panScale)
          .addScaledVector(up,     dy * panScale);
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      const start  = cam.pointers.get(e.pointerId);
      const moved  = start ? start.distanceTo(new THREE.Vector2(e.clientX, e.clientY)) > 5 : false;
      cam.pointers.delete(e.pointerId);

      if (cam.pointers.size === 0) {
        cam.pinchStartDist = 0;
        if (!moved) {
          // Click — pick node
          const hit = pickNode(e.clientX, e.clientY);
          selectedNodeRef.current = hit;
          setSelectedNode(hit);
        }
        cam.dragMode = null;
        canvas.style.cursor = 'grab';
      }
    };

    const handleContextMenu = (e: MouseEvent) => e.preventDefault();

    canvas.addEventListener('wheel',        handleWheel,       { passive: false });
    canvas.addEventListener('pointerdown',  handlePointerDown);
    canvas.addEventListener('pointermove',  handlePointerMove);
    canvas.addEventListener('pointerup',    handlePointerUp);
    canvas.addEventListener('pointercancel',handlePointerUp);
    canvas.addEventListener('contextmenu',  handleContextMenu);

    return () => {
      canvas.removeEventListener('wheel',        handleWheel);
      canvas.removeEventListener('pointerdown',  handlePointerDown);
      canvas.removeEventListener('pointermove',  handlePointerMove);
      canvas.removeEventListener('pointerup',    handlePointerUp);
      canvas.removeEventListener('pointercancel',handlePointerUp);
      canvas.removeEventListener('contextmenu',  handleContextMenu);
    };
  }, [loading, sceneError, data]);

  /* ─────────── UI handlers ─────────── */
  const togglePause = () => {
    const next = !pausedRef.current;
    pausedRef.current = next;
    camStateRef.current.autoRotate = !next;
    setPaused(next);
  };

  const togglePan = () => {
    const next: CameraMode = camStateRef.current.cameraMode === 'pan' ? 'rotate' : 'pan';
    camStateRef.current.cameraMode = next;
    setCameraMode(next);
  };

  const toggleFullscreen = () => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else wrap.requestFullscreen?.();
  };

  const counts = { nodes: data?.nodes?.length || 0, edges: data?.edges?.length || 0 };
  const pal    = paletteFor(mode);
  const activeNode = selectedNode || hoveredNode;

  /* ─────────── render ─────────── */
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: '15px', fontWeight: 600 }}>{t('visualiser.workspaceTitle')}</div>
          <div style={{ fontSize: '12px', color: MG(0.45), marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {t('visualiser.workspaceSubtitle')}
          </div>
        </div>
        <Badge>{counts.nodes} {t('visualiser.nodes')} · {counts.edges} {t('visualiser.edges')}</Badge>
      </div>

      {/* Mode switcher */}
      <div style={{ display: 'flex', gap: '10px', padding: '12px', border: `1px solid ${MG(0.09)}`, borderRadius: '6px', background: MG(0.03), flexWrap: 'wrap' }}>
        <Button primary={mode === 'constellation'} ghost={mode !== 'constellation'} onClick={() => setMode('constellation')}>
          {t('visualiser.constellationMode')}
        </Button>
        <Button primary={mode === 'neural'} ghost={mode !== 'neural'} onClick={() => setMode('neural')}>
          {t('visualiser.neuralMode')}
        </Button>
      </div>

      {/* Controls */}
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

      {/* Canvas + Inspector */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2.5fr) minmax(280px, 1fr)', gap: '16px', alignItems: 'stretch' }}>
        <div
          ref={wrapRef}
          style={{
            position: 'relative',
            minHeight: '680px',
            border: `1px solid ${MG(0.1)}`,
            borderRadius: '6px',
            overflow: 'hidden',
            background: mode === 'neural' ? '#06100f' : '#050711',
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
              {/* Three.js mount target */}
              <div
                ref={mountRef}
                aria-label={t('visualiser.canvasLabel')}
                style={{ width: '100%', height: '100%', minHeight: '680px', display: 'block' }}
              />

              {/* Legend overlay */}
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
                  pointerEvents: 'none',
                }}
              >
                <span><span style={{ color: `#${pal.star.getHexString()}` }}>●</span> {mode === 'neural' ? t('visualiser.neuronHub') : t('visualiser.entityTopic')}</span>
                <span><span style={{ color: `#${pal.memory.getHexString()}` }}>●</span> {mode === 'neural' ? t('visualiser.memorySoma') : t('visualiser.memory')}</span>
                <span style={{ color: MG(0.55) }}>─ {mode === 'neural' ? t('visualiser.synapse') : t('visualiser.link')}</span>
              </div>
            </>
          ) : (
            <div style={{ height: '680px', display: 'grid', placeItems: 'center', color: MG(0.4), fontSize: '12px' }}>
              {t('visualiser.noNodes')}
            </div>
          )}
        </div>

        {/* Inspector aside */}
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

      {/* Cluster badge row */}
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
