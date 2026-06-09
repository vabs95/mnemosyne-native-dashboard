/**
 * VisualiserTab — Three.js WebGL edition (lazy-loaded)
 *
 * Three.js is NOT bundled. It is loaded on demand from the platform vendor
 * file (/static/vendor/three.module.min.js) the first time this tab is opened,
 * via threeLoader.ts. All subsequent visits reuse the browser-cached copy.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import type * as THREEns from 'three';
import { fetchJSON, Button, Badge, Card, CardHeader, CardTitle, CardContent } from '@hermes/sdk';
import { safeNumber } from '@/utils/format';
import { t } from '@/utils/i18n';
import { getThree, type ThreeModule } from '@/utils/threeLoader';

/* ─────────────────────────────── constants ─────────────────────────── */

const API = '/api/plugins/mnemosyne-native-dashboard';
const MG = (o: number) => `rgba(234,234,234,${o})`;

const VERACITY_COLOR: Record<string, string> = {
  stated: '#065f46',
  inferred: '#1e3a8a',
  tool: '#581c87',
  imported: '#78350f',
};

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
  x: number;
  y: number;
  z: number;
  size: number;
  twinkle: number;
  twinkleFreq: number;
  twinkleAmp: number;
  _degree?: number;
  _weight?: number;
  neuralRegion?: string;
}

/* ─────────────────────────────── helpers ─────────────────────────── */

const esc = (s: any) => String(s || '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

const cssHexToInt = (hex: string) => {
  const m = /^#([0-9a-f]{6})$/i.exec(String(hex || ''));
  return m ? Number.parseInt(m[1], 16) : 0xffffff;
};

const constellationColors = (isLight: boolean) => {
  return isLight ? {
    light: true,
    bg: '#fbf8f3',
    nebula: 'rgba(101,214,255,.11)',
    star: '#087fa6',
    memory: '#c9a96e',
    text: '#2b2927',
    muted: 'rgba(66,58,52,.62)',
    edge: 'rgba(25,65,108,.50)',
    memoryEdge: 'rgba(130,78,18,.48)'
  } : {
    light: false,
    bg: '#050711',
    nebula: 'rgba(101,214,255,.14)',
    star: '#65d6ff',
    memory: '#ffe08a',
    text: '#f7f8ff',
    muted: 'rgba(213,219,239,.64)',
    edge: 'rgba(198,224,255,.44)',
    memoryEdge: 'rgba(255,224,138,.50)'
  };
};

const neuralColors = (isLight: boolean) => {
  return isLight ? {
    light: true,
    bg: '#f7f0e7',
    core: 'rgba(24,128,107,.18)',
    mid: 'rgba(185,54,46,.12)',
    star: '#087f73',
    memory: '#c63e35',
    text: '#252220',
    synapse: 'rgba(18,116,100,.34)',
    synapseHot: 'rgba(8,126,106,.62)',
    memorySynapse: 'rgba(190,54,46,.58)'
  } : {
    light: false,
    bg: '#06100f',
    core: 'rgba(34,130,111,.28)',
    mid: 'rgba(95,31,29,.40)',
    star: '#66e8c6',
    memory: '#ff5f57',
    text: '#f6fbf7',
    synapse: 'rgba(82,214,181,.22)',
    synapseHot: 'rgba(90,238,196,.52)',
    memorySynapse: 'rgba(255,95,87,.58)'
  };
};

function getThemeColors(mode: VisualiserMode, isLight: boolean) {
  const c = mode === 'neural' ? neuralColors(isLight) : constellationColors(isLight);
  let linkStr = '';
  if (mode === 'neural') {
    linkStr = isLight ? '#127464' : '#52d6b5';
  } else {
    linkStr = isLight ? '#19416c' : '#c6e0ff';
  }

  let pulseStr = '';
  if (mode === 'neural') {
    pulseStr = isLight ? '#6f6048' : '#fffaf0';
  } else {
    pulseStr = (c as any).memory;
  }

  return {
    bg: c.bg,
    star: c.star,
    memory: (c as any).memory,
    link: linkStr,
    pulse: pulseStr,
    text: c.text,
    light: isLight
  };
}

const shortLabel = (s: string, max = 22) =>
  s.length > max ? `${s.slice(0, max - 3)}...` : s;

const labelForDisplay = (raw: string) => {
  const label = String(raw || '').replace(/^memory:/, 'mem ');
  return /^[A-Z][A-Z_\s-]{2,}$/.test(label)
    ? label.toLowerCase().replace(/(^|[_\s-])([a-z])/g, (_m, sep, ch) =>
        (sep === '_' ? ' ' : sep) + ch.toUpperCase())
    : label;
};

/* ─────────────────────────────── layout builder ─────────────────────────── */

function buildThreePositions(data: any) {
  const nodes = (data.nodes || []).slice(0, 160).map((n: any) => ({ ...n }));
  const categories = [...new Set(nodes.map((n: any) => n.category || 'Other'))];
  const catIndex = Object.fromEntries(categories.map((c, i) => [c, i]));
  nodes.forEach((n: any, i: number) => {
    const cat = n.category || 'Other';
    const ci = catIndex[cat] || 0;
    const weight = Math.max(1, Number(n.weight || n.count || 1));
    const shell = n.kind === 'memory' ? 1.12 : 0.74 + (ci % 3) * 0.1;
    const radius = 285 * shell + (i % 7) * 18 + Math.min(46, Math.sqrt(weight) * 5.5);
    const longitude = ((i * 137.508 + ci * 23) % 360) * Math.PI / 180;
    const latitudeSeed = (((i * 53 + ci * 29) % 101) + 0.5) / 101;
    const latitude = Math.acos(1 - 2 * latitudeSeed) - Math.PI / 2;
    const radial = Math.cos(latitude);
    const orbitBias = Math.sin((i / Math.max(nodes.length, 1)) * Math.PI * 2 + ci * 0.62) * 22;
    n.x = Math.cos(longitude) * radial * radius;
    n.y = Math.sin(latitude) * radius * 0.92 + orbitBias;
    n.z = Math.sin(longitude) * radial * radius * 1.12 + Math.cos(longitude * 1.7 + ci) * 54;
    const sizeJitter = 1 + (((i * 37) % 11) - 5) * 0.035;
    n.size = Math.min(42, 9 + Math.sqrt(weight) * 6.2 + (n.kind === 'memory' ? 3.5 : 4.5)) * sizeJitter;
    n.twinkle = (i % 23) / 23;
    
    let twinkleTier = 0;
    if (i % 17 === 0) {
      twinkleTier = 2;
    } else if (i % 5 === 0) {
      twinkleTier = 1;
    }

    if (twinkleTier === 2) {
      n.twinkleFreq = 0.0048 + ((i * 41) % 130) / 100000;
      n.twinkleAmp = 0.34;
    } else if (twinkleTier === 1) {
      n.twinkleFreq = 0.0024 + ((i * 47) % 120) / 100000;
      n.twinkleAmp = 0.24;
    } else {
      n.twinkleFreq = 0.00125 + ((i * 53) % 110) / 100000;
      n.twinkleAmp = 0.15 + ((i * 29) % 70) / 1000;
    }

    n._degree = 0;
    n._weight = weight;
  });
  return nodes;
}

function buildNeuralRegionsMap(categories: any[], regionCount: number) {
  return Object.fromEntries(categories.map((cat, i) => {
    const angle = -Math.PI / 2 + (i / regionCount) * Math.PI * 2;
    let radius = 142 + (i % 2) * 18;
    if (regionCount <= 2) {
      radius = 86;
    } else if (i === regionCount - 1 && regionCount > 5) {
      radius = 70;
    }
    const lap = Math.floor(i / Math.max(1, regionCount));
    return [cat, {
      label: cat,
      angle,
      cx: Math.cos(angle) * radius + lap * 18,
      cy: Math.sin(angle) * radius * 0.96,
      cz: ((i * 41) % 89 - 44) * 0.72,
      spread: 94 + (i % 4) * 10
    }];
  }));
}

function positionNeuralNodes(
  nodes: any[],
  regions: Record<string, any>,
  degree: Map<string, number>,
  hubsByCategory: Record<string, any[]>,
  catIndex: Record<string, number>,
  edges: any[],
  byId: Record<string, any>
) {
  nodes.forEach((n: any, i: number) => {
    const cat = n.category || 'Other';
    const region = regions[cat] || regions.Other || { cx: 0, cy: 0, cz: 0, angle: 0, spread: 80 };
    const ci = catIndex[cat] || 0;
    const weight = Math.max(1, Number(n.weight || n.count || 1));
    const d = degree.get(n.id) || 0;
    if (n.kind === 'memory') {
      const linked = edges.find((e: any) => e.source === n.id || e.target === n.id);
      let parent = null;
      if (linked) {
        const targetId = linked.source === n.id ? linked.target : linked.source;
        parent = byId[targetId];
      }
      const parentX = parent && parent.kind !== 'memory' && Number.isFinite(parent.x) ? parent.x : region.cx;
      const parentY = parent && parent.kind !== 'memory' && Number.isFinite(parent.y) ? parent.y : region.cy;
      const parentZ = parent && parent.kind !== 'memory' && Number.isFinite(parent.z) ? parent.z : region.cz;
      const branch = ((i * 137.508 + ci * 19) % 360) * Math.PI / 180;
      const yUnit = ((((i * 43 + ci * 17) % 97) + 0.5) / 97) * 2 - 1;
      const radial = Math.sqrt(Math.max(0, 1 - yUnit * yUnit));
      const dist = 46 + (i % 6) * 13 + Math.min(48, Math.sqrt(weight) * 10);
      n.x = parentX + Math.cos(branch) * radial * dist;
      n.y = parentY + yUnit * dist * 0.82;
      n.z = parentZ + Math.sin(branch) * radial * dist * 0.86;
    } else {
      const rank = Math.max(0, (hubsByCategory[cat] || []).indexOf(n));
      const orbit = rank === 0 ? 0 : 30 + Math.sqrt(rank) * 20;
      const angle = region.angle + rank * 2.399963 + (ci % 3) * 0.24;
      const yUnit = rank === 0 ? 0 : ((((rank * 37 + ci * 11) % 89) + 0.5) / 89) * 2 - 1;
      const radial = Math.sqrt(Math.max(0, 1 - yUnit * yUnit));
      n.x = region.cx + Math.cos(angle) * radial * orbit;
      n.y = region.cy + yUnit * orbit * 0.86;
      n.z = region.cz + Math.sin(angle) * radial * orbit * 0.8;
    }
    n.size = Math.min(30, 8 + Math.sqrt(weight + d) * (n.kind === 'memory' ? 3.2 : 4.1));
    n._degree = d;
    n._weight = weight;
    n.neuralRegion = cat;
  });
}

function buildThreeNeuralPositions(data: any, vis: any) {
  const nodes = (data.nodes || []).slice(0, 170).map((n: any) => ({ ...n }));
  const nodeIds = new Set(nodes.map((n: any) => n.id));
  const edges = (data.edges || []).filter((e: any) => nodeIds.has(e.source) && nodeIds.has(e.target)).slice(0, 340);
  const categories = [...new Set(nodes.map((n: any) => n.category || 'Other'))];
  const catIndex = Object.fromEntries(categories.map((c, i) => [c, i]));
  const regionCount = Math.max(1, categories.length);
  const regions = buildNeuralRegionsMap(categories, regionCount);
  const degree = new Map<string, number>();
  edges.forEach((e: any) => {
    degree.set(e.source, (degree.get(e.source) || 0) + 1);
    degree.set(e.target, (degree.get(e.target) || 0) + 1);
  });
  const hubsByCategory: Record<string, any[]> = {};
  nodes.filter((n: any) => n.kind !== 'memory').sort((a: any, b: any) => (Number(b.weight || b.count || 0) + (degree.get(b.id) || 0)) - (Number(a.weight || a.count || 0) + (degree.get(a.id) || 0))).forEach((n: any) => {
    const cat = n.category || 'Other';
    if (!hubsByCategory[cat]) hubsByCategory[cat] = [];
    hubsByCategory[cat].push(n);
  });
  const byId = Object.fromEntries(nodes.map((n: any) => [n.id, n]));
  
  positionNeuralNodes(nodes, regions, degree, hubsByCategory, catIndex, edges, byId);
  
  vis.neuralRegions = Object.values(regions);
  return nodes;
}

function limitedThreeEdges(data: any, byId: Map<string, any>, isNeural: boolean, mobile = false) {
  const degree = new Map<string, number>();
  const out: any[] = [];
  
  let limit = 140;
  if (isNeural) {
    limit = 132;
  } else if (mobile) {
    limit = 92;
  }

  let degreeLimit = 4;
  if (isNeural) {
    degreeLimit = 5;
  } else if (mobile) {
    degreeLimit = 3;
  }

  for (const e of (data.edges || [])) {
    const a = byId.get(e.source);
    const b = byId.get(e.target);
    if (!a || !b) continue;
    const da = degree.get(e.source) || 0;
    const db = degree.get(e.target) || 0;
    if (da >= degreeLimit || db >= degreeLimit) continue;
    degree.set(e.source, da + 1);
    degree.set(e.target, db + 1);
    a._degree++;
    b._degree++;
    out.push({ ...e, a, b });
    if (out.length >= limit) break;
  }
  return out;
}

function addNeuralCurvePoints(positions: number[], ax: number, ay: number, az: number, bx: number, by: number, bz: number, i: number) {
  const dx = bx - ax, dy = by - ay, dz = bz - az;
  const len = Math.max(1, Math.hypot(dx, dy, dz));
  const bend = (i % 2 ? 1 : -1) * Math.min(58, 18 + len * 0.12);
  const cx = (ax + bx) / 2 + (-dy / len) * bend;
  const cy = (ay + by) / 2 + (dx / len) * bend * 0.55 + Math.sin(i * 0.71) * 18;
  const cz = (az + bz) / 2 + Math.cos(i * 0.53) * bend * 0.72;
  let px = ax, py = ay, pz = az;
  for (let step = 1; step <= 7; step++) {
    const tVal = step / 7;
    const inv = 1 - tVal;
    const x = inv * inv * ax + 2 * inv * tVal * cx + tVal * tVal * bx;
    const y = inv * inv * ay + 2 * inv * tVal * cy + tVal * tVal * by;
    const z = inv * inv * az + 2 * inv * tVal * cz + tVal * tVal * bz;
    positions.push(px, py, pz, x, y, z);
    px = x; py = y; pz = z;
  }
  return { cx, cy, cz };
}

function buildThreeLinkSegments(THREE: ThreeModule, edges: any[], isNeural: boolean) {
  const positions: number[] = [];
  edges.forEach((e: any, i: number) => {
    if (isNeural) {
      e._curve = addNeuralCurvePoints(positions, e.a.x, e.a.y, e.a.z, e.b.x, e.b.y, e.b.z, i);
    } else {
      positions.push(e.a.x, e.a.y, e.a.z, e.b.x, e.b.y, e.b.z);
    }
  });
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
  return geometry;
}

const _pointTexCache = new Map<string, THREEns.CanvasTexture>();

function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.28, 'rgba(255,255,255,0.92)');
  g.addColorStop(0.58, 'rgba(255,255,255,0.38)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 60, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.72)'; ctx.lineWidth = 1.3;
  ctx.beginPath(); ctx.moveTo(cx, 14); ctx.lineTo(cx, 114); ctx.moveTo(14, cy); ctx.lineTo(114, cy); ctx.stroke();
}

function drawNeuron(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 62);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.13, 'rgba(255,255,255,0.94)');
  g.addColorStop(0.42, 'rgba(255,255,255,0.28)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 61, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.7)'; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2 + 0.13;
    const len = 22 + (i % 4) * 4;
    const fork = len * 0.62;
    const sx = cx + Math.cos(a) * 13, sy = cy + Math.sin(a) * 13;
    const mx = cx + Math.cos(a + 0.1 * Math.sin(i)) * fork, my = cy + Math.sin(a + 0.1 * Math.sin(i)) * fork;
    const ex = cx + Math.cos(a) * len, ey = cy + Math.sin(a) * len;
    ctx.lineWidth = i % 3 === 0 ? 2.25 : 1.45;
    ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo(mx, my, ex, ey); ctx.stroke();
    ctx.lineWidth = 0.9;
    ctx.globalAlpha = 0.72;
    ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(cx + Math.cos(a + 0.38) * len * 0.66, cy + Math.sin(a + 0.38) * len * 0.66); ctx.stroke();
    if (i % 3 === 0) { ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(cx + Math.cos(a - 0.34) * len * 0.6, cy + Math.sin(a - 0.34) * len * 0.6); ctx.stroke(); }
    ctx.globalAlpha = 1;
  }
  ctx.fillStyle = 'rgba(255,255,255,0.98)'; ctx.beginPath(); ctx.arc(cx, cy, 34, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.54)'; ctx.beginPath(); ctx.arc(cx - 8, cy - 9, 8, 0, Math.PI * 2); ctx.fill();
}

function drawSoma(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 62);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.18, 'rgba(255,255,255,0.96)');
  g.addColorStop(0.42, 'rgba(255,255,255,0.34)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 62, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.68)'; ctx.lineCap = 'round'; ctx.lineWidth = 1.55;
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 + 0.22, len = 21 + (i % 2) * 4;
    ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * 18, cy + Math.sin(a) * 18); ctx.lineTo(cx + Math.cos(a) * len, cy + Math.sin(a) * len); ctx.stroke();
  }
  ctx.lineWidth = 3.4; ctx.beginPath(); ctx.arc(cx, cy, 40, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,1)'; ctx.beginPath(); ctx.arc(cx, cy, 35, 0, Math.PI * 2); ctx.fill();
}

function drawOrb(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.44, 'rgba(255,255,255,0.82)');
  g.addColorStop(0.78, 'rgba(255,255,255,0.22)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 60, 0, Math.PI * 2); ctx.fill();
}

function makePointTexture(THREE: ThreeModule, kind: 'star' | 'neuron' | 'soma' | 'orb'): THREEns.CanvasTexture {
  const key = `${kind}`;
  if (_pointTexCache.has(key)) return _pointTexCache.get(key)!;
  const canvas = document.createElement('canvas');
  canvas.width = 128; canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  const cx = 64, cy = 64;
  if (kind === 'star') {
    drawStar(ctx, cx, cy);
  } else if (kind === 'neuron') {
    drawNeuron(ctx, cx, cy);
  } else if (kind === 'soma') {
    drawSoma(ctx, cx, cy);
  } else {
    drawOrb(ctx, cx, cy);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  _pointTexCache.set(key, tex);
  return tex;
}

function addPoints(THREE: ThreeModule, vis: any, scene: THREEns.Scene | THREEns.Group, nodes: any[], kind: string, color: string, size: number) {
  const selected = nodes.filter((n: any) => (n.kind === 'memory') === (kind === 'memory'));
  const positions = new Float32Array(selected.length * 3);
  const sizes = new Float32Array(selected.length);
  const phases = new Float32Array(selected.length);
  const freqs = new Float32Array(selected.length);
  const amps = new Float32Array(selected.length);
  const majors = new Float32Array(selected.length);
  selected.forEach((n: any, i: number) => {
    const weight = Math.max(1, Number(n.weight || n.count || 1));
    positions[i * 3] = n.x; positions[i * 3 + 1] = n.y; positions[i * 3 + 2] = n.z;
    const degreeBoost = Math.min(10, Number(n._degree || 0) * 1.9);
    const variedSize = (n.size || size) + degreeBoost;
    sizes[i] = Math.max(size * 1.14, Math.min(size * 2.65, variedSize * 1.62));
    phases[i] = (n.twinkle || 0) * Math.PI * 2;
    freqs[i] = n.twinkleFreq || 0.0012;
    amps[i] = n.twinkleAmp || 0.12;
    majors[i] = weight > 6.2 || (kind === 'memory' && weight > 4.8) ? 1 : 0;
  });
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
  geometry.setAttribute('aFreq', new THREE.BufferAttribute(freqs, 1));
  geometry.setAttribute('aAmp', new THREE.BufferAttribute(amps, 1));
  geometry.setAttribute('aMajor', new THREE.BufferAttribute(majors, 1));
  
  const isLight = document.documentElement.dataset.theme === 'light';
  const themeColors = vis.mode === 'neural' ? neuralColors(isLight) : constellationColors(isLight);
  let opacity;
  if (kind === 'memory') {
    opacity = themeColors.light ? 0.88 : 0.98;
  } else {
    opacity = themeColors.light ? 0.76 : 0.86;
  }
  let material: THREEns.Material;
  if (vis.mode === 'neural') {
    material = new THREE.PointsMaterial({
      color,
      map: makePointTexture(THREE, kind === 'memory' ? 'soma' : 'neuron'),
      alphaTest: 0.04,
      size,
      sizeAttenuation: true,
      transparent: true,
      opacity,
      depthWrite: false,
      blending: themeColors.light ? THREE.NormalBlending : THREE.AdditiveBlending
    });
  } else {
    material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uScale: { value: 420 },
        uColor: { value: new THREE.Color(color) },
        uIsStar: { value: kind === 'memory' ? 0 : 1 },
        uOpacity: { value: kind === 'memory' ? 0.98 : 0.96 }
      },
      vertexShader: `
        attribute float aSize;
        attribute float aPhase;
        attribute float aFreq;
        attribute float aAmp;
        attribute float aMajor;
        uniform float uTime;
        uniform float uScale;
        varying float vPulse;
        varying float vMajor;
        void main(){
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          float wave = sin(uTime * aFreq + aPhase) + sin(uTime * aFreq * 0.43 + aPhase * 1.71) * 0.45;
          vPulse = 1.0 + wave * aAmp;
          vMajor = aMajor;
          gl_PointSize = aSize * (0.98 + (vPulse - 1.0) * 0.32) * (uScale / max(72.0, -mvPosition.z));
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uIsStar;
        uniform float uOpacity;
        varying float vPulse;
        varying float vMajor;
        void main(){
          vec2 p = gl_PointCoord - vec2(0.5);
          float d = length(p);
          if(d > 0.5) discard;
          float core = 1.0 - smoothstep(0.026, 0.060, d);
          float body = 1.0 - smoothstep(0.060, 0.135, d);
          float halo = (1.0 - smoothstep(0.13, 0.48, d)) * (0.15 + clamp(vPulse - 1.0, -0.30, 0.46) * 0.82);
          float rayH = max(0.0, 1.0 - abs(p.y) / 0.010) * (1.0 - smoothstep(0.07, 0.44, abs(p.x)));
          float rayV = max(0.0, 1.0 - abs(p.x) / 0.010) * (1.0 - smoothstep(0.07, 0.44, abs(p.y)));
          float diag1 = max(0.0, 1.0 - abs(p.x - p.y) / 0.013) * (1.0 - smoothstep(0.06, 0.26, d));
          float diag2 = max(0.0, 1.0 - abs(p.x + p.y) / 0.013) * (1.0 - smoothstep(0.06, 0.26, d));
          float rays = vMajor * (max(rayH, rayV) * 0.50 + max(diag1, diag2) * 0.16);
          float alpha = (body * 0.46 + core * 1.02 + halo + rays) * uOpacity * clamp(0.72 + (vPulse - 1.0) * 0.92, 0.46, 1.35);
          if(alpha < 0.022) discard;
          vec3 starCore = mix(uColor, vec3(1.0), core * 0.88 + rays * 0.38);
          vec3 memoryCore = mix(uColor, vec3(1.0), core * 0.34);
          vec3 crisp = mix(memoryCore, starCore, uIsStar);
          gl_FragColor = vec4(crisp * (0.92 + (vPulse - 1.0) * 0.22), min(alpha, 1.0));
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending
    });
  }
  const points = new THREE.Points(geometry, material);
  points.userData.nodes = selected;
  scene.add(points);
  return points;
}

function addHaloPoints(THREE: ThreeModule, vis: any, scene: THREEns.Scene | THREEns.Group, nodes: any[], kind: string, color: string, size: number) {
  let selected = nodes.filter((n: any) => (n.kind === 'memory') === (kind === 'memory'));
  if (vis.mode !== 'neural') {
    selected = selected
      .filter((n: any) => {
        const weight = Math.max(1, Number(n.weight || n.count || 1));
        return weight > (kind === 'memory' ? 3.6 : 4.4) || Number(n._degree || 0) > 3;
      })
      .sort((a: any, b: any) => (Math.max(1, Number(b.weight || b.count || 1)) + Number(b._degree || 0)) - (Math.max(1, Number(a.weight || a.count || 1)) + Number(a._degree || 0)))
      .slice(0, kind === 'memory' ? 30 : 44);
  }
  const positions = new Float32Array(selected.length * 3);
  selected.forEach((n: any, i: number) => { positions[i * 3] = n.x; positions[i * 3 + 1] = n.y; positions[i * 3 + 2] = n.z; });
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
  const isLight = document.documentElement.dataset.theme === 'light';
  const themeColors = vis.mode === 'neural' ? neuralColors(isLight) : constellationColors(isLight);
  let opacity;
  if (vis.mode === 'neural' && kind === 'memory') {
    opacity = themeColors.light ? 0.16 : 0.28;
  } else if (vis.mode === 'neural') {
    opacity = themeColors.light ? 0.18 : 0.34;
  } else if (kind === 'memory') {
    opacity = themeColors.light ? 0.12 : 0.24;
  } else {
    opacity = themeColors.light ? 0.13 : 0.26;
  }
  const material = new THREE.PointsMaterial({
    color,
    map: makePointTexture(THREE, 'orb'),
    alphaTest: 0.015,
    size,
    sizeAttenuation: true,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: themeColors.light ? THREE.NormalBlending : THREE.AdditiveBlending
  });
  const points = new THREE.Points(geometry, material);
  scene.add(points);
  return points;
}

function addNeuralDendrites(THREE: ThreeModule, group: THREEns.Group, nodes: any[], colors: any) {
  const trunks: number[] = [];
  const twigs: number[] = [];
  const tips: number[] = [];
  nodes.slice(0, 150).forEach((n: any, i: number) => {
    const arms = n.kind === 'memory' ? 3 : 6;
    const base = n.kind === 'memory' ? 10 : 17;
    for (let a = 0; a < arms; a++) {
      const theta = (a / arms) * Math.PI * 2 + (i % 11) * 0.19;
      const phi = Math.sin(i * 0.37 + a) * 0.58;
      const len = base + ((i + a * 13) % 9);
      const mid = [n.x + Math.cos(theta + 0.16) * Math.cos(phi) * len * 0.50, n.y + Math.sin(phi) * len * 0.36, n.z + Math.sin(theta + 0.16) * Math.cos(phi) * len * 0.50];
      const end = [n.x + Math.cos(theta) * Math.cos(phi) * len * 0.78, n.y + Math.sin(phi) * len * 0.54, n.z + Math.sin(theta) * Math.cos(phi) * len * 0.78];
      trunks.push(n.x, n.y, n.z, mid[0], mid[1], mid[2], mid[0], mid[1], mid[2], end[0], end[1], end[2]);
      if (n.kind !== 'memory' && a % 2 === 0) {
        const side = theta + (a % 2 ? 0.44 : -0.40);
        const fork = [mid[0] + Math.cos(side) * len * 0.18, mid[1] + Math.sin(phi + 0.25) * len * 0.12, mid[2] + Math.sin(side) * len * 0.18];
        twigs.push(mid[0], mid[1], mid[2], fork[0], fork[1], fork[2]);
      }
      if (i % 3 === 0 && a % 2 === 0) tips.push(end[0], end[1], end[2]);
    }
  });
  
  const trunkGeom = new THREE.BufferGeometry();
  trunkGeom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(trunks), 3));
  group.add(new THREE.LineSegments(trunkGeom, new THREE.LineBasicMaterial({
    color: colors.entity,
    transparent: true,
    opacity: colors.light ? 0.34 : 0.36,
    blending: colors.light ? THREE.NormalBlending : THREE.AdditiveBlending,
    depthWrite: false
  })));
  
  const twigGeom = new THREE.BufferGeometry();
  twigGeom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(twigs), 3));
  group.add(new THREE.LineSegments(twigGeom, new THREE.LineBasicMaterial({
    color: colors.link,
    transparent: true,
    opacity: colors.light ? 0.28 : 0.24,
    blending: colors.light ? THREE.NormalBlending : THREE.AdditiveBlending,
    depthWrite: false
  })));
  
  const tipGeom = new THREE.BufferGeometry();
  tipGeom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(tips), 3));
  group.add(new THREE.Points(tipGeom, new THREE.PointsMaterial({
    color: colors.entity,
    map: makePointTexture(THREE, 'orb'),
    alphaTest: 0.03,
    size: 3.8,
    transparent: true,
    opacity: colors.light ? 0.54 : 0.72,
    depthWrite: false,
    blending: colors.light ? THREE.NormalBlending : THREE.AdditiveBlending
  })));
}

function neuralAuraOverlay(regions: any[]) {
  const regionList = (regions || []).slice(0, 9);
  const innerHtml = regionList.map((r: any) => {
    const label = esc(r.label || '');
    const deg = (Number(r.angle || 0) * 28).toFixed(1);
    return '<span class="three-aura-oval-item" data-region="' + label + '" style="opacity:0;transform:translate(-50%,-50%) rotate(' + deg + 'deg)"></span>';
  }).join('');
  return '<div class="three-aura-layer-container">' + innerHtml + '</div>';
}

function visualiserResponsiveFill(width: number, height: number) {
  const w = Math.max(0, Number(width) || 0);
  const h = Math.max(0, Number(height) || 0);
  if (w < 760 || h < 520) return 1;
  const widthFill = Math.max(0, Math.min(1, (w - 760) / 760));
  const heightFill = Math.max(0, Math.min(1, (h - 520) / 360));
  return 1 + Math.min(0.22, (widthFill * 0.16) + (heightFill * 0.06));
}

function threeEffectiveCameraZ(vis: any, rect: { width: number; height: number }) {
  const fill = visualiserResponsiveFill(rect.width, rect.height);
  const mobile = rect.width < 760 || rect.height < 520;
  return vis.cameraZ / (mobile ? 1 : fill);
}

/* ──────────────────────────── main component ──────────────────────── */

export const VisualiserTab: React.FC<VisualiserTabProps> = ({ onInspectMemory }) => {
  const mountRef  = useRef<HTMLDivElement>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);

  // Three.js states (in a ref to bypass React rendering lag / closures in loops)
  const threeVisRef = useRef({
    mode: 'constellation' as VisualiserMode,
    data: null as any,
    renderer: null as THREEns.WebGLRenderer | null,
    scene: null as THREEns.Scene | null,
    camera: null as THREEns.PerspectiveCamera | null,
    group: null as THREEns.Group | null,
    nodes: [] as any[],
    edgePairs: [] as any[],
    labels: [] as any[],
    pulses: [] as any[],
    frame: 0,
    paused: false,
    panMode: false,
    drag: null as any,
    pointer: new Map<number, { x: number; y: number }>(),
    yaw: 0,
    pitch: 0.32,
    cameraZ: 780,
    panX: 0,
    panY: 0,
    lastT: 0,
    pulsePoints: null as THREEns.Points | null,
    neuralRegions: [] as any[],
    THREE: null as ThreeModule | null,
  });

  const selRingRef = useRef<THREEns.Mesh | null>(null);
  const hovRingRef = useRef<THREEns.Mesh | null>(null);

  // React state (UI only)
  const [threeReady, setThreeReady]     = useState(false);
  const [threeError, setThreeError]     = useState('');
  const [loading, setLoading]           = useState(true);
  const [sceneError, setSceneError]     = useState('');
  const [data, setData]                 = useState<any>(null);
  const [mode, setMode]                 = useState<VisualiserMode>(() => {
    const s = globalThis.localStorage.getItem('mnemosyne-dashboard-visualiser-mode');
    return s === 'neural' ? 'neural' : 'constellation';
  });
  const [paused, setPaused]             = useState(false);
  const [cameraMode, setCameraMode]     = useState<CameraMode>('rotate');
  const [selectedNode, setSelectedNode] = useState<SceneNode | null>(null);
  const [hoveredNode, setHoveredNode]   = useState<SceneNode | null>(null);

  // Sync state values to Ref so that they are visible in anim loop instantly
  const selectedNodeRef = useRef<SceneNode | null>(null);
  const hoveredNodeRef  = useRef<SceneNode | null>(null);

  useEffect(() => { threeVisRef.current.mode = mode; }, [mode]);
  useEffect(() => { threeVisRef.current.paused = paused; }, [paused]);
  useEffect(() => { threeVisRef.current.panMode = (cameraMode === 'pan'); }, [cameraMode]);
  useEffect(() => { selectedNodeRef.current = selectedNode; }, [selectedNode]);
  useEffect(() => { hoveredNodeRef.current = hoveredNode; }, [hoveredNode]);

  const [selectedMemoryDetail, setSelectedMemoryDetail] = useState<any>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // Details fetch
  useEffect(() => {
    if (selectedNode?.kind === 'memory' && selectedNode.memory_id) {
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

  /* ─────────── clamp camera ─────────── */
  const clampThreeCamera = useCallback(() => {
    const vis = threeVisRef.current;
    const rect = mountRef.current?.getBoundingClientRect() || { width: 680, height: 680 };
    const fallbackZ = vis.mode === 'neural' ? 600 : 760;
    const minCameraZ = fallbackZ / 10;
    vis.cameraZ = Math.max(minCameraZ, Math.min(1800, Number.isFinite(vis.cameraZ) ? vis.cameraZ : fallbackZ));
    vis.yaw = Number.isFinite(vis.yaw) ? vis.yaw : 0;
    vis.pitch = Math.max(-1.15, Math.min(1.15, Number.isFinite(vis.pitch) ? vis.pitch : 0.32));
    const zoomFactor = 900 / Math.max(80, vis.cameraZ);
    const panLimitX = Math.max(120, rect.width * (0.45 + zoomFactor * 0.18));
    const panLimitY = Math.max(120, rect.height * (0.34 + zoomFactor * 0.12));
    vis.panX = Math.max(-panLimitX, Math.min(panLimitX, Number.isFinite(vis.panX) ? vis.panX : 0));
    vis.panY = Math.max(-panLimitY, Math.min(panLimitY, Number.isFinite(vis.panY) ? vis.panY : 0));
  }, []);

  /* ─────────── update HTML labels & ovals ─────────── */
  const updateThreeAuras = useCallback((rect: { width: number; height: number }, v: THREEns.Vector3) => {
    const vis = threeVisRef.current;
    if (vis.mode !== 'neural' || !labelsRef.current) return;
    const mobile = rect.width < 520;
    
    labelsRef.current.querySelectorAll<HTMLSpanElement>('.three-aura-oval-item').forEach((el) => {
      const region = el.dataset.region || '';
      const pts = vis.nodes.filter((n: any) => n.neuralRegion === region);
      const screens: { x: number; y: number }[] = [];
      pts.forEach((n: any) => {
        v.set(n.x, n.y, n.z).applyMatrix4(vis.group!.matrixWorld).project(vis.camera!);
        if (v.z < 1 && v.z > -1) {
          screens.push({
            x: (v.x * 0.5 + 0.5) * rect.width,
            y: (-v.y * 0.5 + 0.5) * rect.height
          });
        }
      });
      if (screens.length < 2) {
        el.style.opacity = '0';
        return;
      }
      const xs = screens.map(p => p.x);
      const ys = screens.map(p => p.y);
      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);
      const cx = (minX + maxX) / 2;
      const cy = (minY + maxY) / 2;
      const maxW = mobile ? rect.width * 0.62 : Math.min(340, rect.width * 0.34);
      const maxH = mobile ? rect.height * 0.30 : Math.min(230, rect.height * 0.26);
      const w = Math.max(mobile ? 92 : 128, Math.min(maxW, (maxX - minX) + (mobile ? 46 : 74)));
      const h = Math.max(mobile ? 58 : 78, Math.min(maxH, (maxY - minY) + (mobile ? 34 : 56)));
      el.style.left = `${cx}px`;
      el.style.top = `${cy}px`;
      el.style.width = `${w}px`;
      el.style.height = `${h}px`;
      el.style.opacity = screens.length > 4 ? '0.42' : '0.28';
    });
  }, []);

  const updateSingleLabel = (
    el: HTMLSpanElement,
    i: number,
    vis: any,
    rect: { width: number; height: number },
    time: number,
    labelBoxes: { x: number; y: number; w: number; h: number }[],
    maxLabels: number,
    v: THREEns.Vector3
  ) => {
    const n = vis.labels[i];
    if (!n) return;
    v.set(n.x, n.y, n.z).applyMatrix4(vis.group!.matrixWorld).project(vis.camera!);
    const sx = (v.x * 0.5 + 0.5) * rect.width;
    const sy = (-v.y * 0.5 + 0.5) * rect.height;
    const visible = v.z < 1 && v.z > -1 && sx > 8 && sx < rect.width - 8 && sy > 8 && sy < rect.height - 8;
    const pulse = vis.mode === 'neural' && i > 3 ? Math.sin(time * 0.00032 + i * 1.73) : 1;
    const box = { x: sx - 54, y: sy - 13, w: 108, h: 24 };
    const collides = labelBoxes.some(b => !(box.x + box.w < b.x || b.x + b.w < box.x || box.y + box.h < b.y || b.y + b.h < box.y));
    const show = visible && labelBoxes.length < maxLabels && !collides && (vis.mode !== 'neural' || i <= 3 || pulse > 0.08);
    
    el.style.display = show ? '' : 'none';
    if (show) {
      labelBoxes.push(box);
      el.style.left = `${sx}px`;
      el.style.top = `${sy}px`;
      const depthAlpha = Math.max(0.32, Math.min(0.86, 1 - Math.abs(v.z) * 0.35));
      const pulseAlpha = vis.mode === 'neural' && i > 3 ? Math.min(0.78, 0.38 + pulse * 0.36) : depthAlpha;
      el.style.opacity = String(Math.min(depthAlpha, pulseAlpha));
    }
  };

  const updateThreeLabels = useCallback((rect: { width: number; height: number }, time: number) => {
    const vis = threeVisRef.current;
    if (!vis.camera || !vis.group || !labelsRef.current) return;
    const THREE = vis.THREE!;
    const v = new THREE.Vector3();
    
    updateThreeAuras(rect, v);
    
    const labelBoxes: { x: number; y: number; w: number; h: number }[] = [];
    const effectiveCameraZ = threeEffectiveCameraZ(vis, rect);
    const zoomReveal = vis.mode === 'neural'
      ? Math.max(0, Math.min(1, (900 - effectiveCameraZ) / 420))
      : Math.max(0, Math.min(1, (760 - effectiveCameraZ) / 520));
    
    let maxLabels;
    const isMobile = rect.width < 520;
    if (vis.mode === 'neural') {
      const base = isMobile ? 14 : 24;
      const factor = isMobile ? 14 : 18;
      maxLabels = base + Math.round(zoomReveal * factor);
    } else {
      if (isMobile) {
        maxLabels = 12 + Math.round(zoomReveal * 12);
      } else {
        maxLabels = 20 + Math.round(zoomReveal * 18);
      }
    }
      
    labelsRef.current.querySelectorAll<HTMLSpanElement>('.three-label-item').forEach((el, i) => {
      updateSingleLabel(el, i, vis, rect, time, labelBoxes, maxLabels, v);
    });
  }, [updateThreeAuras]);

  /* ─────────── clear scene objects ─────────── */
  const clearScene = useCallback(() => {
    const vis = threeVisRef.current;
    if (vis.frame) {
      cancelAnimationFrame(vis.frame);
      vis.frame = 0;
    }
    const scene = vis.scene;
    if (scene) {
      scene.traverse((obj: any) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m: any) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
      }
    }
    const renderer = vis.renderer;
    const mount = mountRef.current;
    if (renderer) {
      renderer.dispose();
      if (mount && mount.contains(renderer.domElement)) {
        renderer.domElement.remove();
      }
    }
    if (labelsRef.current) {
      labelsRef.current.innerHTML = '';
    }
    vis.renderer = null;
    vis.scene = null;
    vis.camera = null;
    vis.group = null;
    vis.nodes = [];
    vis.edgePairs = [];
    vis.labels = [];
    vis.pulses = [];
    vis.pulsePoints = null;
    vis.neuralRegions = [];
  }, []);

  /* ─────────── build Three.js scene ─────────── */
function addBackgroundStars(THREE: ThreeModule, scene: THREEns.Scene, nextMode: VisualiserMode) {
  const starCount = nextMode === 'neural' ? 360 : 420;
  const starPositions = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    const r = 600 + ((i * 37) % 480);
    const a = i * 2.17;
    const b = ((i * 53) % 180 - 90) * Math.PI / 180;
    starPositions.set([
      Math.cos(a) * Math.cos(b) * r,
      Math.sin(b) * r,
      Math.cos(b) * Math.sin(a) * r
    ], i * 3);
  }
  const starGeom = new THREE.BufferGeometry();
  starGeom.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  scene.add(new THREE.Points(starGeom, new THREE.PointsMaterial({
    color: 0xffffff,
    map: makePointTexture(THREE, 'orb'),
    alphaTest: 0.04,
    size: 1.25,
    transparent: true,
    opacity: nextMode === 'neural' ? 0.38 : 0.24,
    depthWrite: false
  })));
}

function addPulsePoints(THREE: ThreeModule, vis: any, themeColors: any, nextMode: VisualiserMode, edges: any[]) {
  const pulseEdges = nextMode === 'neural' ? edges.slice(0, 90) : [];
  const pulseGeom = new THREE.BufferGeometry();
  const pulsePositions = new Float32Array(pulseEdges.length * 3);
  pulseGeom.setAttribute('position', new THREE.BufferAttribute(pulsePositions, 3));
  const pulseOpacity = nextMode === 'neural' ? (themeColors.light ? 0.54 : 0.98) : 0.85;
  const pulsePoints = new THREE.Points(pulseGeom, new THREE.PointsMaterial({
    color: themeColors.pulse,
    map: makePointTexture(THREE, 'star'),
    alphaTest: 0.03,
    size: nextMode === 'neural' ? 10.5 : 5.2,
    transparent: true,
    opacity: pulseOpacity,
    depthWrite: false,
    depthTest: false,
    blending: themeColors.light ? THREE.NormalBlending : THREE.AdditiveBlending
  }));
  vis.group.add(pulsePoints);
  vis.pulses = pulseEdges;
  vis.pulsePoints = pulsePoints;
}

  const buildThreeScene = useCallback((payload: any, nextMode: VisualiserMode) => {
    const vis = threeVisRef.current;
    const THREE = vis.THREE;
    if (!THREE) return;

    clearScene();

    const mount = mountRef.current;
    if (!mount) return;

    const isLight = document.documentElement.dataset.theme === 'light';
    const themeColors = getThemeColors(nextMode, isLight);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio || 1, 2));
    renderer.setSize(mount.clientWidth || 1000, mount.clientHeight || 680);
    renderer.setClearColor(themeColors.bg, 0);
    
    mount.prepend(renderer.domElement);
    renderer.domElement.style.cssText = 'width:100%;height:100%;cursor:grab;display:block;position:absolute;top:0;left:0;z-index:1;';
    vis.renderer = renderer;

    const scene = new THREE.Scene();
    vis.scene = scene;

    const camera = new THREE.PerspectiveCamera(
      48,
      (mount.clientWidth || 1000) / (mount.clientHeight || 680),
      1, 5000,
    );
    vis.camera = camera;

    scene.background = new THREE.Color(themeColors.bg);
    scene.fog = new THREE.FogExp2(themeColors.bg, nextMode === 'neural' ? 0.0011 : 0.0009);

    vis.group = new THREE.Group();
    scene.add(vis.group);

    const ambient = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambient);

    const pointLight = new THREE.PointLight(themeColors.star, 1.2, 1200);
    pointLight.position.set(180, 220, 260);
    scene.add(pointLight);

    // Rings — always in scene, invisible until a node is picked
    const ringGeo = new THREE.RingGeometry(1, 1.12, 48);
    const selRing = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({
      color: 0xffe08a,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95,
      depthWrite: false
    }));
    const hovRing = new THREE.Mesh(ringGeo.clone(), new THREE.MeshBasicMaterial({
      color: 0xf7f8ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.72,
      depthWrite: false
    }));
    selRing.visible = hovRing.visible = false;
    selRing.renderOrder = hovRing.renderOrder = 999;
    scene.add(selRing, hovRing);
    selRingRef.current = selRing;
    hovRingRef.current = hovRing;

    // Load nodes positions
    let nodes: any[];
    if (nextMode === 'neural') {
      nodes = buildThreeNeuralPositions(payload, vis);
    } else {
      nodes = buildThreePositions(payload);
    }
    vis.nodes = nodes;
    const byId = new Map(nodes.map(n => [n.id, n]));

    const rect = mount.getBoundingClientRect();
    const mobileThree = rect.width < 520;
    const edges = limitedThreeEdges(payload, byId, nextMode === 'neural', mobileThree);
    vis.edgePairs = edges;

    // Build curve line segments
    const linkGeom = buildThreeLinkSegments(THREE, edges, nextMode === 'neural');
    
    let linkOpacity;
    if (nextMode === 'neural') {
      linkOpacity = themeColors.light ? 0.3 : 0.4;
    } else {
      if (themeColors.light) {
        linkOpacity = mobileThree ? 0.14 : 0.16;
      } else {
        linkOpacity = mobileThree ? 0.13 : 0.12;
      }
    }

    const linkMaterial = nextMode === 'neural'
      ? new THREE.LineBasicMaterial({
          color: themeColors.link,
          transparent: true,
          opacity: linkOpacity,
          blending: themeColors.light ? THREE.NormalBlending : THREE.AdditiveBlending,
          depthWrite: false
        })
      : new THREE.LineDashedMaterial({
          color: themeColors.link,
          transparent: true,
          opacity: linkOpacity,
          dashSize: 9,
          gapSize: 8,
          blending: THREE.NormalBlending,
          depthWrite: false
        });
    const linkLines = new THREE.LineSegments(linkGeom, linkMaterial);
    if (nextMode !== 'neural') linkLines.computeLineDistances();
    vis.group.add(linkLines);

    // Neural dendrites and halo points
    if (nextMode === 'neural') {
      addHaloPoints(THREE, vis, vis.group, nodes, 'entity', themeColors.star, 50);
      addHaloPoints(THREE, vis, vis.group, nodes, 'memory', themeColors.memory, 48);
      addNeuralDendrites(THREE, vis.group, nodes, themeColors);
    }

    // Points (Core particles)
    vis.group.add(addPoints(THREE, vis, vis.group, nodes, 'entity', themeColors.star, nextMode === 'neural' ? 30 : 52));
    vis.group.add(addPoints(THREE, vis, vis.group, nodes, 'memory', themeColors.memory, nextMode === 'neural' ? 26 : 50));

    // Star points background
    addBackgroundStars(THREE, scene, nextMode);

    // Pulse points
    addPulsePoints(THREE, vis, themeColors, nextMode, edges);

    // HTML Labels overlay
    const labelNodes = nodes.filter((n: any) => !/^[a-f0-9]{10,}$/i.test(String(n.label || ''))).sort((a: any, b: any) => (b._degree + b._weight) - (a._degree + a._weight)).slice(0, nextMode === 'neural' ? 72 : 56);
    vis.labels = labelNodes;

    if (labelsRef.current) {
      labelsRef.current.innerHTML = neuralAuraOverlay(vis.neuralRegions) + labelNodes.map((n: any, i: number) => {
        return `<span class="three-label-item ${n.kind === 'memory' ? 'memory' : ''}" data-i="${i}">${esc(String(n.label || '').replace(/^memory:/, 'mem ').slice(0, 24))}</span>`;
      }).join('');
    }
  }, [clearScene]);

  /* ─────────── reset camera ─────────── */
  const resetView = useCallback((nextMode: VisualiserMode = threeVisRef.current.mode) => {
    const vis = threeVisRef.current;
    vis.yaw = 0;
    vis.pitch = 0.32;
    vis.cameraZ = nextMode === 'neural' ? 600 : 760;
    vis.panX = 0;
    vis.panY = 0;
    vis.paused = false;
    setPaused(false);
    clampThreeCamera();
  }, [clampThreeCamera]);

  /* ─────────── rebuild when data/mode changes ─────────── */
  useEffect(() => {
    if (!threeReady || !data) return;
    globalThis.localStorage.setItem('mnemosyne-dashboard-visualiser-mode', mode);
    buildThreeScene(data, mode);
    resetView(mode);
    setSelectedNode(null);
    setHoveredNode(null);
  }, [threeReady, data, mode, buildThreeScene, resetView]);

  /* ─────────── data fetch ─────────── */
  const fetchConstellation = useCallback(() => {
    setLoading(true);
    setSceneError('');
    fetchJSON(`${API}/constellation?limit=320`)
      .then((payload) => setData(payload))
      .catch((err: any) => setSceneError(err?.message || t('visualiser.loadError')))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchConstellation(); }, [fetchConstellation]);

  /* ─────────── lazy-load Three.js + init renderer ─────────── */
  useEffect(() => {
    let cancelled = false;
    getThree()
      .then((THREE) => {
        if (cancelled) return;
        const vis = threeVisRef.current;
        vis.THREE = THREE;
        vis.yaw = 0;
        vis.pitch = 0.32;
        vis.cameraZ = mode === 'neural' ? 600 : 760;
        setThreeReady(true);
      })
      .catch((err: any) => {
        if (!cancelled) setThreeError(err?.message || 'Failed to load 3D engine');
      });

    return () => {
      cancelled = true;
      clearScene();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ─────────── resize observer ─────────── */
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const ro = new ResizeObserver(() => {
      const vis = threeVisRef.current;
      if (!vis.renderer || !vis.camera) return;
      const w = Math.max(320, wrap.clientWidth || 1000);
      const h = Math.max(320, wrap.clientHeight || 680);
      vis.renderer.setSize(w, h, false);
      vis.camera.aspect = w / h;
      vis.camera.updateProjectionMatrix();
    });
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  /* ─────────── animation loop ─────────── */
  useEffect(() => {
    if (!threeReady || loading || sceneError || !data) return;
    const vis = threeVisRef.current;

    let animFrame: number;

    const animate = (time: number = 0) => {
      animFrame = requestAnimationFrame(animate);
      vis.frame = animFrame;

      const renderer = vis.renderer;
      const scene = vis.scene;
      const camera = vis.camera;
      const group = vis.group;
      if (!renderer || !scene || !camera || !group) return;

      const delta = vis.lastT ? Math.min(48, time - vis.lastT) : 16;
      vis.lastT = time;

      // Auto rotation
      if (!vis.paused && !vis.drag) {
        vis.yaw += delta * (vis.mode === 'neural' ? 0.00009 : 0.000055);
      }

      // Clamp camera
      clampThreeCamera();

      // Rotate group
      group.rotation.y = vis.yaw;
      group.rotation.x = vis.pitch;

      // Position camera
      const rect = mountRef.current?.getBoundingClientRect() || { width: 650, height: 650 };
      const effectiveCameraZ = threeEffectiveCameraZ(vis, rect);
      camera.position.set(vis.panX, vis.panY, effectiveCameraZ);
      camera.lookAt(vis.panX, vis.panY, 0);

      // Pulse points along curves
      if (vis.pulsePoints) {
        const attr = vis.pulsePoints.geometry.attributes.position as THREEns.BufferAttribute;
        const arr = attr.array as Float32Array;
        vis.pulses.forEach((e: any, i: number) => {
          const phase = (time * 0.00030 + (i % 17) / 17) % 1;
          const inv = 1 - phase;
          if (e._curve) {
            arr[i * 3]     = inv * inv * e.a.x + 2 * inv * phase * e._curve.cx + phase * phase * e.b.x;
            arr[i * 3 + 1] = inv * inv * e.a.y + 2 * inv * phase * e._curve.cy + phase * phase * e.b.y;
            arr[i * 3 + 2] = inv * inv * e.a.z + 2 * inv * phase * e._curve.cz + phase * phase * e.b.z;
          } else {
            arr[i * 3]     = e.a.x + (e.b.x - e.a.x) * phase;
            arr[i * 3 + 1] = e.a.y + (e.b.y - e.a.y) * phase;
            arr[i * 3 + 2] = e.a.z + (e.b.z - e.a.z) * phase;
          }
        });
        attr.needsUpdate = true;
      }

      // Update shader uniform time
      scene.traverse((obj: any) => {
        if (obj.isPoints && obj.material?.uniforms?.uTime) {
          obj.material.uniforms.uTime.value = time;
          obj.material.uniforms.uScale.value = Math.max(360, Math.min(820, renderer.domElement.clientHeight || 420));
        }
      });

      // Update HTML labels
      updateThreeLabels(rect, time);

      // Sync selection and hover rings
      const selNode = selectedNodeRef.current;
      const hovNode = hoveredNodeRef.current;
      const selRing = selRingRef.current;
      const hovRing = hovRingRef.current;

      const THREE = vis.THREE!;
      if (selRing) {
        if (selNode) {
          selRing.visible = true;
          const worldPos = new THREE.Vector3(selNode.x, selNode.y, selNode.z).applyMatrix4(group.matrixWorld);
          selRing.position.copy(worldPos);
          selRing.quaternion.copy(camera.quaternion);
          const rs = (selNode.size || 10) * 0.45;
          selRing.scale.set(rs, rs, rs);
        } else {
          selRing.visible = false;
        }
      }
      if (hovRing) {
        if (hovNode && hovNode.id !== selNode?.id) {
          hovRing.visible = true;
          const worldPos = new THREE.Vector3(hovNode.x, hovNode.y, hovNode.z).applyMatrix4(group.matrixWorld);
          hovRing.position.copy(worldPos);
          hovRing.quaternion.copy(camera.quaternion);
          const rh = (hovNode.size || 10) * 0.45;
          hovRing.scale.set(rh, rh, rh);
        } else {
          hovRing.visible = false;
        }
      }

      renderer.render(scene, camera);
    };

    animate(0);
    return () => cancelAnimationFrame(animFrame);
  }, [threeReady, loading, sceneError, data, mode, clampThreeCamera, updateThreeLabels]);

  /* ─────────── pointer / wheel interaction ─────────── */
  useEffect(() => {
    if (!threeReady || loading || sceneError || !data) return;
    const viewport = mountRef.current;
    if (!viewport) return;

    const vis = threeVisRef.current;
    const THREE = vis.THREE!;
    const pointers = vis.pointer;
    
    const dist = () => {
      const ps = [...pointers.values()];
      return ps.length < 2 ? 1 : Math.max(1, Math.hypot(ps[0].x - ps[1].x, ps[0].y - ps[1].y));
    };
    
    const center = () => {
      const ps = [...pointers.values()];
      return ps.length < 2 ? { x: 0, y: 0 } : { x: (ps[0].x + ps[1].x) / 2, y: (ps[0].y + ps[1].y) / 2 };
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.cancelable) e.preventDefault();
      vis.cameraZ *= Math.exp(e.deltaY * 0.001);
      clampThreeCamera();
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.cancelable) e.preventDefault();
      try { viewport.setPointerCapture?.(e.pointerId); } catch (err) { console.warn('setPointerCapture failed', err); }
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      
      if (pointers.size >= 2) {
        const c = center();
        vis.drag = {
          mode: 'pinch',
          x: c.x,
          y: c.y,
          dist: dist(),
          cameraZ: vis.cameraZ,
          panX: vis.panX,
          panY: vis.panY,
          moved: false
        };
      } else {
        vis.drag = {
          mode: 'drag',
          x: e.clientX,
          y: e.clientY,
          yaw: vis.yaw,
          pitch: vis.pitch,
          panX: vis.panX,
          panY: vis.panY,
          moved: false
        };
      }
      viewport.style.cursor = 'grabbing';
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!pointers.has(e.pointerId) || !vis.drag) return;
      if (e.cancelable) e.preventDefault();
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      
      const d = vis.drag;
      if (d.mode === 'pinch') {
        if (pointers.size < 2) return;
        const c = center();
        const scale = dist() / Math.max(1, d.dist);
        vis.cameraZ = d.cameraZ / Math.max(0.35, Math.min(2.8, scale));
        vis.panX = d.panX - (c.x - d.x) * 0.72;
        vis.panY = d.panY + (c.y - d.y) * 0.72;
        d.moved = d.moved || Math.abs(c.x - d.x) + Math.abs(c.y - d.y) > 3 || Math.abs(scale - 1) > 0.015;
        clampThreeCamera();
        return;
      }
      
      const dx = e.clientX - d.x;
      const dy = e.clientY - d.y;
      if (Math.abs(dx) + Math.abs(dy) > 3) d.moved = true;
      
      if (vis.panMode || e.shiftKey) {
        vis.panX = d.panX - dx * 0.7;
        vis.panY = d.panY + dy * 0.7;
      } else {
        vis.yaw = d.yaw + dx * 0.006;
        vis.pitch = d.pitch + dy * 0.004;
      }
      clampThreeCamera();

      // Update hover state
      if (!d.moved) {
        const rect = viewport.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const v = new THREE.Vector3();
        let best = null;
        let bestD = Infinity;

        for (const n of vis.nodes) {
          v.set(n.x, n.y, n.z).applyMatrix4(vis.group!.matrixWorld).project(vis.camera!);
          if (v.z < -1 || v.z > 1) continue;
          const sx = (v.x * 0.5 + 0.5) * rect.width;
          const sy = (-v.y * 0.5 + 0.5) * rect.height;
          const dDist = Math.hypot(sx - mouseX, sy - mouseY);
          if (dDist < bestD && dDist < 18) {
            bestD = dDist;
            best = n;
          }
        }

        if (best?.id !== hoveredNodeRef.current?.id) {
          hoveredNodeRef.current = best;
          setHoveredNode(best);
        }
        viewport.style.cursor = best ? 'pointer' : 'grab';
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      pointers.delete(e.pointerId);
      if (vis.drag?.moved) {
        viewport.dataset.suppressClick = 'true';
      }
      
      if (pointers.size === 1) {
        const p = [...pointers.values()][0];
        vis.drag = {
          mode: 'drag',
          x: p.x,
          y: p.y,
          yaw: vis.yaw,
          pitch: vis.pitch,
          panX: vis.panX,
          panY: vis.panY,
          moved: true
        };
      } else {
        vis.drag = null;
        viewport.style.cursor = 'grab';
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (viewport.dataset.suppressClick === 'true') {
        viewport.dataset.suppressClick = 'false';
        return;
      }
      const rect = viewport.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const v = new THREE.Vector3();
      let best = null;
      let bestD = Infinity;

      for (const n of vis.nodes) {
        v.set(n.x, n.y, n.z).applyMatrix4(vis.group!.matrixWorld).project(vis.camera!);
        if (v.z < -1 || v.z > 1) continue;
        const sx = (v.x * 0.5 + 0.5) * rect.width;
        const sy = (-v.y * 0.5 + 0.5) * rect.height;
        const dDist = Math.hypot(sx - mouseX, sy - mouseY);
        if (dDist < bestD && dDist < 18) {
          bestD = dDist;
          best = n;
        }
      }

      setSelectedNode(best);
    };

    viewport.addEventListener('wheel', handleWheel, { passive: false });
    viewport.addEventListener('pointerdown', handlePointerDown, { passive: false });
    viewport.addEventListener('pointermove', handlePointerMove, { passive: false });
    viewport.addEventListener('pointerup', handlePointerUp);
    viewport.addEventListener('pointercancel', handlePointerUp);
    viewport.addEventListener('pointerleave', handlePointerUp);
    viewport.addEventListener('click', handleClick);

    return () => {
      viewport.removeEventListener('wheel', handleWheel);
      viewport.removeEventListener('pointerdown', handlePointerDown);
      viewport.removeEventListener('pointermove', handlePointerMove);
      viewport.removeEventListener('pointerup', handlePointerUp);
      viewport.removeEventListener('pointercancel', handlePointerUp);
      viewport.removeEventListener('pointerleave', handlePointerUp);
      viewport.removeEventListener('click', handleClick);
    };
  }, [threeReady, loading, sceneError, data, mode, clampThreeCamera]);

  /* ─────────── UI handlers ─────────── */
  const togglePause = () => {
    const next = !threeVisRef.current.paused;
    threeVisRef.current.paused = next;
    setPaused(next);
  };
  
  const togglePan = () => {
    const next: CameraMode = threeVisRef.current.panMode ? 'rotate' : 'pan';
    threeVisRef.current.panMode = (next === 'pan');
    setCameraMode(next);
  };
  
  const toggleFullscreen = () => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      wrap.requestFullscreen?.();
    }
  };

  const counts = { nodes: data?.nodes?.length || 0, edges: data?.edges?.length || 0 };
  const isLight = typeof document === 'undefined' ? false : (document.documentElement.dataset.theme === 'light');
  const themeColors = getThemeColors(mode, isLight);

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
    if (ce.neighbor?.weight !== undefined) return safeNumber(ce.neighbor.weight, 2);
    return '0.80';
  };

  const handleSelectNeighbor = (neighborNode: SceneNode) => {
    const matchedNode = threeVisRef.current.nodes.find(n => n.id === neighborNode.id);
    if (matchedNode) {
      setSelectedNode(matchedNode);
    }
  };

  const renderCanvasFallback = () => {
    if (threeError) {
      return (
        <div style={{ height: '680px', display: 'grid', placeItems: 'center', color: '#f87171', padding: '24px', textAlign: 'center' }}>
          {threeError}
        </div>
      );
    }
    if (loading) {
      return (
        <div style={{ height: '680px', display: 'grid', placeItems: 'center', color: MG(0.4), fontSize: '12px' }}>
          {t('visualiser.loadingEngine')}
        </div>
      );
    }
    if (sceneError) {
      return (
        <div style={{ height: '680px', display: 'grid', placeItems: 'center', color: '#f87171', padding: '24px', textAlign: 'center' }}>
          {sceneError}
        </div>
      );
    }
    if (counts.nodes === 0) {
      return (
        <div style={{ height: '680px', display: 'grid', placeItems: 'center', color: MG(0.4), fontSize: '12px' }}>
          {t('visualiser.noNodes')}
        </div>
      );
    }
    return null;
  };

  let pauseBtnLabel = '';
  if (paused) {
    pauseBtnLabel = t('visualiser.resume');
  } else if (mode === 'neural') {
    pauseBtnLabel = t('visualiser.pauseDrift');
  } else {
    pauseBtnLabel = t('visualiser.pauseRotation');
  }

  /* ─────────── render ─────────── */
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .constellation-wrap .three-labels-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
          overflow: hidden;
        }
        .constellation-wrap .three-label-item {
          position: absolute;
          z-index: 2;
          transform: translate(-50%, -50%);
          padding: 3px 6px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
          transition: opacity 0.55s ease, transform 0.55s ease;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        /* Dark Theme */
        html:not([data-theme="light"]) .constellation-wrap .three-label-item {
          background: rgba(4, 7, 14, 0.46);
          border: 1px solid rgba(255, 255, 255, 0.10);
          color: rgba(247, 248, 255, 0.82);
          text-shadow: 0 1px 8px rgba(0, 0, 0, 0.55);
        }
        html:not([data-theme="light"]) .constellation-wrap .three-label-item.memory {
          color: #ffd6bd;
          border-color: rgba(255, 155, 106, 0.18);
        }
        /* Light Theme */
        html[data-theme="light"] .constellation-wrap .three-label-item {
          background: rgba(255, 255, 255, 0.80);
          border: 1px solid rgba(61, 52, 44, 0.16);
          color: rgba(37, 34, 32, 0.86);
          box-shadow: 0 8px 18px rgba(60, 48, 36, 0.08);
        }
        html[data-theme="light"] .constellation-wrap .three-label-item.memory {
          color: #c63e35;
          border-color: rgba(198, 62, 53, 0.18);
        }

        .constellation-wrap .three-aura-layer-container {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .constellation-wrap .three-aura-oval-item {
          position: absolute;
          display: block;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(102, 232, 198, 0.15) 0%, rgba(102, 232, 198, 0.09) 48%, rgba(102, 232, 198, 0.025) 78%, transparent 100%);
          border: 1px solid rgba(102, 232, 198, 0.08);
          box-shadow: inset 0 0 28px rgba(102, 232, 198, 0.06), 0 0 24px rgba(102, 232, 198, 0.04);
          mix-blend-mode: screen;
          transition: left 0.12s linear, top 0.12s linear, width 0.12s linear, height 0.12s linear, opacity 0.12s linear;
        }
        .constellation-wrap .three-aura-oval-item::after {
          content: "";
          position: absolute;
          inset: 20%;
          border-radius: 50%;
          border: 1px solid rgba(165, 255, 229, 0.07);
        }

        /* Fullscreen styles */
        .constellation-wrap:fullscreen {
          width: 100vw !important;
          height: 100vh !important;
          min-height: 100vh !important;
          border-radius: 0 !important;
          border: 0 !important;
          box-shadow: none;
          background: #050711;
        }
        html[data-theme="light"] .constellation-wrap:fullscreen {
          background: #fbf8f3;
        }
        .constellation-wrap:fullscreen canvas {
          width: 100% !important;
          height: 100% !important;
        }
        .constellation-wrap:fullscreen .three-legend {
          left: 22px;
          right: 22px;
          bottom: 18px;
        }
        .constellation-wrap:fullscreen .three-labels-container {
          inset: 0;
        }

        /* Legend dot styles */
        .constellation-wrap .three-legend {
          position: absolute;
          bottom: 12px;
          left: 12px;
          display: flex;
          gap: 12px;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.6);
          background: rgba(0, 0, 0, 0.4);
          padding: 4px 8px;
          border-radius: 4px;
          font-family: monospace;
        }
        html[data-theme="light"] .constellation-wrap .three-legend {
          color: rgba(0, 0, 0, 0.6);
          background: rgba(255, 255, 255, 0.6);
        }
        .constellation-wrap .three-legend span {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .constellation-wrap .legend-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }
        .constellation-wrap .legend-dot.entity {
          background: #65d6ff;
        }
        .constellation-wrap .legend-dot.memory {
          background: #ffe08a;
        }
        html[data-theme="light"] .constellation-wrap .legend-dot.entity {
          background: #087fa6;
        }
        html[data-theme="light"] .constellation-wrap .legend-dot.memory {
          background: #c9a96e;
        }
        .constellation-wrap .legend-line {
          display: inline-block;
          width: 12px;
          height: 1px;
          background: rgba(255, 255, 255, 0.4);
        }
        html[data-theme="light"] .constellation-wrap .legend-line {
          background: rgba(0, 0, 0, 0.3);
        }

        /* Responsive adjustments */
        @media (max-width: 760px), (max-width: 940px) and (max-height: 520px) {
          .constellation-wrap {
            min-height: 430px !important;
          }
          .constellation-wrap .three-label-item {
            font-size: 10px;
            padding: 2px 5px;
          }
        }
      ` }} />
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
            {pauseBtnLabel}
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
          className="constellation-wrap"
          style={{
            position: 'relative', minHeight: '680px',
            border: `1px solid ${MG(0.1)}`, borderRadius: '6px',
            overflow: 'hidden', background: themeColors.bg,
          }}
        >
          {/* Error states */}
          {renderCanvasFallback()}

          {/* Three.js mount point */}
          <div
            ref={mountRef}
            id="threeViewport"
            aria-label={t('visualiser.canvasLabel')}
            style={{
              width: '100%', height: '100%', minHeight: '680px',
              position: 'relative',
              display: counts.nodes > 0 && !threeError && !sceneError ? 'block' : 'none',
            }}
          >
            {/* The canvas gets prepended here by WebGLRenderer */}
            
            {/* Fullscreen Exit Button */}
            <button
              id="threeExitFullscreen"
              className="fullscreen-exit"
              onClick={() => document.exitFullscreen()}
            />

            {/* HTML Labels overlay */}
            <div
              ref={labelsRef}
              id="threeLabels"
              className="three-labels-container"
            />

            {/* Legend overlay */}
            {counts.nodes > 0 && !threeError && !sceneError && (
              <div
                id="threeLegend"
                className="constellation-legend three-legend"
                aria-label={t('visualiser.legend')}
                style={{
                  pointerEvents: 'none',
                }}
              >
                {mode === 'neural' ? (
                  <>
                    <span><i className="legend-dot entity"></i>{t('visualiser.neuronHub')}</span>
                    <span><i className="legend-dot memory"></i>{t('visualiser.memorySoma')}</span>
                    <span><i className="legend-line"></i>{t('visualiser.synapse')}</span>
                  </>
                ) : (
                  <>
                    <span><i className="legend-dot entity"></i>{t('visualiser.entityTopic')}</span>
                    <span><i className="legend-dot memory"></i>{t('visualiser.memory')}</span>
                    <span><i className="legend-line"></i>{t('visualiser.link')}</span>
                  </>
                )}
              </div>
            )}
          </div>
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
                        <button
                          key={ce.edgeId}
                          type="button"
                          onClick={() => handleSelectNeighbor(ce.neighbor)}
                          style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '8px 10px',
                            borderRadius: '4px',
                            background: MG(0.03),
                            border: `1px solid ${MG(0.06)}`,
                            cursor: 'pointer',
                            fontSize: '11px',
                            font: 'inherit',
                            color: 'inherit',
                            textAlign: 'left',
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
                        </button>
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
