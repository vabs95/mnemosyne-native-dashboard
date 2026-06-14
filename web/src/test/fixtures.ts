import type { MemoryItem } from '@/types';

export const memory = (overrides: Partial<MemoryItem> = {}): MemoryItem => ({
  id: 'mem-001',
  content: 'Remember that frontend values must be correct.',
  importance: 0.82,
  veracity: 'inferred',
  source: 'chat',
  scope: 'session',
  status: 'active',
  created_at: '2026-06-01T10:00:00Z',
  session_id: 'session-1234567890',
  trust_weight: 0.75,
  degradation_label: 'warm',
  degradation_tier: 2,
  degradation_weight: 0.5,
  effective_memory_weight: 0.31,
  memory_kind: 'working',
  recall_count: 3,
  ...overrides,
});

export const stats = () => ({
  counts: {
    working_memory: 12,
    episodic_memory: 34,
    scratchpad: 5,
    triples: 99,
    consolidation_log: 7,
  },
  by_veracity: [{ veracity: 'inferred', count: 9 }],
  by_source: [{ source: 'chat', count: 6 }],
  by_scope: [{ scope: 'session', count: 8 }],
  by_session: [{ session_id: 'session-1234567890', count: 4 }],
  by_degradation: [{ degradation_label: 'warm', count: 3 }],
  contamination: { total: 2, high_importance: 1 },
  degradation: { degraded: 3 },
});

export const memoriesResponse = (items: MemoryItem[] = [memory()]) => ({ items });

export const reviewResponse = () => ({
  cards: [
    { key: 'contaminated', title: 'Contaminated', count: 1, description: 'Needs review' },
    { key: 'high_importance_contaminated', title: 'Important memories needing review', count: 1, description: 'Priority review' },
    { key: 'degraded', title: 'Degraded', count: 1, description: 'Lifecycle tier changed' },
    { key: 'due_for_degradation', title: 'Due for degradation', count: 1, description: 'Ready for lifecycle compression' },
  ],
  queues: {
    contaminated: { items: [memory({ id: 'mem-review', veracity: 'unknown', contaminated: true })] },
    high_importance_contaminated: { items: [memory({ id: 'mem-important-review', veracity: 'tool', importance: 0.93, contaminated: true })] },
    degraded: { items: [memory({ id: 'mem-degraded', degradation_label: 'cold', degradation_tier: 3 })] },
    due_for_degradation: { items: [memory({ id: 'mem-due', memory_kind: 'episodic', degradation_label: 'hot', degradation_tier: 1 })] },
  },
  total: 1,
  has_more: false,
  next_offset: null,
});

export const lifecycleResponse = () => ({
  thresholds: {
    tier2_days: 30,
    tier3_days: 180,
    weights: { '1': 1, '2': 0.5, '3': 0.25 },
  },
  cards: [
    { key: 'warm', title: 'Warm', count: 3, description: 'Mid-life memories' },
  ],
  queues: {
    warm: {
      title: 'Warm',
      description: 'Mid-life memories',
      filter: { degradation_tier: '2' },
      items: [memory({ id: 'mem-warm', degradation_label: 'warm', degradation_tier: 2 })],
    },
  },
});

export const configResponse = (admin = false) => ({
  version: '0.2.0',
  config: { memory_admin_enabled: admin },
});

export const sessionResponse = () => ({
  counts: { memories: 1, triples: 2, consolidations: 3 },
  events: [
    {
      type: 'memory',
      timestamp: '2026-06-01T10:00:00Z',
      title: 'Memory created',
      preview: 'Frontend values must be correct.',
      item: { id: 'mem-001' },
    },
  ],
});
