import React, { useState, useEffect } from 'react';
import { fetchJSON, Card, CardHeader, CardTitle, CardContent, Badge, cn, timeAgo } from '@hermes/sdk';
import { formatRelativeTime, safeNumber } from '../utils/format';

const API = '/api/plugins/mnemosyne-native-dashboard';

const MG = 'rgba(234,234,234,'; // midground base shorthand

interface OverviewStats {
  counts: { working_memory: number; episodic_memory: number; triples: number; consolidation_log: number; };
  by_veracity?: { veracity: string; count: number }[];
  by_source?: { source: string; count: number }[];
  contamination?: { total: number; high_importance: number };
  degradation?: { degraded: number };
}

interface MemoryItem {
  id: string;
  content: string;
  importance: number;
  veracity: string;
  source: string;
  created_at: string;
  session_id?: string;
}

interface OverviewTabProps {
  onInspectMemory: (id: string) => void;
  onNavigateToTab: (tab: string) => void;
}

const StatCard: React.FC<{ title: string; count: number; desc: string; icon: string }> = ({ title, count, desc, icon }) => (
  <Card>
    <CardContent>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: `${MG}0.45)`, marginBottom: '6px' }}>{title}</div>
          <div style={{ fontSize: '28px', fontWeight: 700, lineHeight: 1 }}>{count.toLocaleString()}</div>
          <div style={{ fontSize: '11px', color: `${MG}0.4)`, marginTop: '6px' }}>{desc}</div>
        </div>
        <div style={{ fontSize: '28px', opacity: 0.6 }}>{icon}</div>
      </div>
    </CardContent>
  </Card>
);

export const OverviewTab: React.FC<OverviewTabProps> = ({ onInspectMemory, onNavigateToTab }) => {
  const [stats, setStats] = useState<OverviewStats | null>(null);
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchJSON(`${API}/stats`),
      fetchJSON(`${API}/memories?limit=25`),
    ]).then(([s, m]) => {
      setStats(s);
      setMemories(m.items || []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: '32px', color: `${MG}0.4)`, textAlign: 'center' }}>Loading overview metrics...</div>;

  const counts = stats?.counts ?? { working_memory: 0, episodic_memory: 0, triples: 0, consolidation_log: 0 };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Stat Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        <StatCard title="Working Memory" count={counts.working_memory} desc="Short-term active thoughts" icon="🧠" />
        <StatCard title="Episodic Memory" count={counts.episodic_memory} desc="Archived session memories" icon="📖" />
        <StatCard title="Triples" count={counts.triples} desc="Extracted semantic facts" icon="◎" />
        <StatCard title="Consolidations" count={counts.consolidation_log} desc="Episodic summaries built" icon="✦" />
      </div>

      {/* Veracity & Source Breakdowns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <Card>
          <CardHeader><CardTitle>Veracity Mix</CardTitle></CardHeader>
          <CardContent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {(stats?.by_veracity ?? []).map(({ veracity, count }) => (
                <div key={veracity} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                  <span style={{ textTransform: 'capitalize' }}>{veracity}</span>
                  <Badge>{String(count)}</Badge>
                </div>
              ))}
              {!stats?.by_veracity?.length && <div style={{ color: `${MG}0.35)`, fontSize: '12px' }}>No data</div>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Sources</CardTitle></CardHeader>
          <CardContent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {(stats?.by_source ?? []).slice(0, 6).map(({ source, count }) => (
                <div key={source} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                  <span>{source || 'unknown'}</span>
                  <Badge>{String(count)}</Badge>
                </div>
              ))}
              {!stats?.by_source?.length && <div style={{ color: `${MG}0.35)`, fontSize: '12px' }}>No data</div>}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Memory Stream */}
      <Card>
        <CardHeader>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <CardTitle>Live Memory Log</CardTitle>
            <span style={{ fontSize: '11px', color: `${MG}0.4)` }}>Showing 25 latest</span>
          </div>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {memories.map(m => (
              <div
                key={m.id}
                onClick={() => onInspectMemory(m.id)}
                style={{
                  padding: '10px 12px', borderRadius: '4px',
                  background: 'rgba(234,234,234,0.03)', border: '1px solid rgba(234,234,234,0.07)',
                  cursor: 'pointer', transition: 'background 0.15s',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(234,234,234,0.07)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(234,234,234,0.03)')}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{m.content}</div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '4px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Badge>{m.veracity}</Badge>
                    {m.session_id && <span style={{ fontSize: '11px', fontFamily: 'var(--theme-font-mono)', color: `${MG}0.4)` }}>session:{m.session_id.slice(0, 8)}</span>}
                    <span style={{ fontSize: '11px', color: `${MG}0.4)` }}>importance:{safeNumber(m.importance, 2, 'n/a')}</span>
                  </div>
                </div>
                <div style={{ fontSize: '11px', color: `${MG}0.35)`, whiteSpace: 'nowrap', fontFamily: 'var(--theme-font-mono)' }}>
                  {formatRelativeTime(m.created_at, timeAgo(m.created_at))}
                </div>
              </div>
            ))}
            {!memories.length && <div style={{ color: `${MG}0.35)`, fontSize: '12px', textAlign: 'center', padding: '20px' }}>No memories found.</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
