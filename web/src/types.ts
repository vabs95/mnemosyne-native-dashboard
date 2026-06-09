export interface MemoryItem {
  id: string;
  content: string;
  importance: number;
  veracity: string;
  source: string;
  scope: string;
  status: string;
  created_at: string;
  session_id?: string;
  valid_until?: string;
  metadata?: any;
  trust_weight?: number;
  degradation_label?: string | null;
  degradation_tier?: number | null;
  degradation_weight?: number | null;
  effective_memory_weight?: number;
  contaminated?: boolean;
  memory_kind?: string;
  tier?: string;
  recall_count?: number;
  last_recalled?: string;
  degraded_at?: string;
  superseded_by?: string;
}

export interface TripleItem {
  id: string;
  subject: string;
  predicate: string;
  object: string;
  confidence?: number;
  created_at?: string;
  valid_from?: string;
}

export interface Edge extends TripleItem {
  source: string;
  target: string;
}

export interface Node {
  id: string;
  label: string;
  count?: number;
  x?: number;
  y?: number;
}

export interface ConsolidationItem {
  id: string;
  session_id: string;
  items_consolidated?: number;
  summary_preview?: string;
  summary?: string;
  created_at: string;
}

export const API_BASE = '/api/plugins/mnemosyne-native-dashboard';
