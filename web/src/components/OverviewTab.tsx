import React, { useState, useEffect } from 'react';
import { fetchJSON, Card, CardHeader, CardTitle, CardContent, Badge, timeAgo, Button } from '@hermes/sdk';
import { formatRelativeTime, safeNumber } from '../utils/format';

const API = '/api/plugins/mnemosyne-native-dashboard';
const MG = 'rgba(234,234,234,'; // midground base shorthand

interface OverviewStats {
  counts: { working_memory: number; episodic_memory: number; triples: number; consolidation_log: number; };
  by_veracity?: { veracity: string; count: number }[];
  by_source?: { source: string; count: number }[];
  by_scope?: { scope: string; count: number }[];
  by_session?: { session_id: string; count: number }[];
  by_degradation?: { degradation_label: string; count: number }[];
  contamination?: { total: number; high_importance: number };
  degradation?: { degraded: number };
  db_path?: string;
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
  onInspectSession: (id: string) => void;
  onNavigateToTab: (tab: string) => void;
  onApplyFilters: (filters: any) => void;
}

const StatCard: React.FC<{ title: string; count: number; desc: string; icon: string; onClick?: () => void }> = ({ title, count, desc, icon, onClick }) => (
  <Card
    onClick={onClick}
    style={{
      cursor: onClick ? 'pointer' : 'default',
      transition: 'background 0.15s, border-color 0.15s',
    }}
    onMouseEnter={(e: any) => { if (onClick) e.currentTarget.style.background = 'rgba(234,234,234,0.06)'; }}
    onMouseLeave={(e: any) => { if (onClick) e.currentTarget.style.background = 'none'; }}
  >
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

export const OverviewTab: React.FC<OverviewTabProps> = ({ onInspectMemory, onInspectSession, onNavigateToTab, onApplyFilters }) => {
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
  const contaminationTotal = stats?.contamination?.total ?? 0;
  const degradationTotal = stats?.degradation?.degraded ?? 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* 6 Stat Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        <StatCard title="Working Memory" count={counts.working_memory} desc="Short-term active thoughts" icon="🧠" onClick={() => onApplyFilters({ kind: 'working' })} />
        <StatCard title="Episodic Memory" count={counts.episodic_memory} desc="Archived session memories" icon="📖" onClick={() => onApplyFilters({ kind: 'episodic' })} />
        <StatCard title="Needs Review" count={contaminationTotal} desc="Unverified/contaminated logs" icon="⚑" onClick={() => onNavigateToTab('review')} />
        <StatCard title="Degraded" count={degradationTotal} desc="Decayed episodic summaries" icon="◴" onClick={() => onNavigateToTab('lifecycle')} />
        <StatCard title="Triples" count={counts.triples} desc="Extracted semantic facts" icon="◎" onClick={() => onNavigateToTab('graph')} />
        <StatCard title="Consolidations" count={counts.consolidation_log} desc="Episodic summaries built" icon="✦" onClick={() => onNavigateToTab('activity')} />
      </div>

      {/* Quick Actions Panel */}
      <Card style={{ background: 'rgba(234,234,234,0.02)' }}>
        <CardContent style={{ padding: '12px 20px', display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'rgba(234,234,234,0.4)', letterSpacing: '0.08em', marginRight: '8px' }}>Quick Actions</span>
          <Button onClick={() => onApplyFilters({})} primary style={{ fontSize: '12px' }}>Browse memories</Button>
          <Button onClick={() => onApplyFilters({ q: ' ' })} ghost style={{ fontSize: '12px' }}>Search everything</Button>
          <Button onClick={() => onNavigateToTab('activity')} ghost style={{ fontSize: '12px' }}>Latest activity</Button>
          <Button onClick={() => onNavigateToTab('graph')} ghost style={{ fontSize: '12px' }}>Open graph</Button>
        </CardContent>
      </Card>

      {/* 5 Breakdowns Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
        {/* Trust mix */}
        <Card>
          <CardHeader><CardTitle style={{ fontSize: '12px' }}>Trust mix</CardTitle></CardHeader>
          <CardContent style={{ padding: '10px 14px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {(stats?.by_veracity ?? []).map(({ veracity, count }) => (
                <div
                  key={veracity}
                  onClick={() => onApplyFilters({ veracity })}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  <span style={{ textTransform: 'capitalize' }}>{veracity}</span>
                  <Badge>{String(count)}</Badge>
                </div>
              ))}
              {!stats?.by_veracity?.length && <div style={{ color: `${MG}0.35)`, fontSize: '11px' }}>No data</div>}
            </div>
          </CardContent>
        </Card>

        {/* Lifecycle */}
        <Card>
          <CardHeader><CardTitle style={{ fontSize: '12px' }}>Lifecycle</CardTitle></CardHeader>
          <CardContent style={{ padding: '10px 14px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {(stats?.by_degradation ?? []).map(({ degradation_label, count }) => {
                const tierMap: any = { hot: '1', warm: '2', cold: '3' };
                return (
                  <div
                    key={degradation_label}
                    onClick={() => onApplyFilters({ degradation_tier: tierMap[degradation_label] || '' })}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    <span style={{ textTransform: 'capitalize' }}>{degradation_label}</span>
                    <Badge>{String(count)}</Badge>
                  </div>
                );
              })}
              {!stats?.by_degradation?.length && <div style={{ color: `${MG}0.35)`, fontSize: '11px' }}>No data</div>}
            </div>
          </CardContent>
        </Card>

        {/* Sources */}
        <Card>
          <CardHeader><CardTitle style={{ fontSize: '12px' }}>Sources</CardTitle></CardHeader>
          <CardContent style={{ padding: '10px 14px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {(stats?.by_source ?? []).slice(0, 6).map(({ source, count }) => (
                <div
                  key={source}
                  onClick={() => onApplyFilters({ source })}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={source}>{source || 'unknown'}</span>
                  <Badge>{String(count)}</Badge>
                </div>
              ))}
              {!stats?.by_source?.length && <div style={{ color: `${MG}0.35)`, fontSize: '11px' }}>No data</div>}
            </div>
          </CardContent>
        </Card>

        {/* Scopes */}
        <Card>
          <CardHeader><CardTitle style={{ fontSize: '12px' }}>Scopes</CardTitle></CardHeader>
          <CardContent style={{ padding: '10px 14px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {(stats?.by_scope ?? []).slice(0, 6).map(({ scope, count }) => (
                <div
                  key={scope}
                  onClick={() => onApplyFilters({ scope })}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  <span style={{ textTransform: 'capitalize' }}>{scope || 'unknown'}</span>
                  <Badge>{String(count)}</Badge>
                </div>
              ))}
              {!stats?.by_scope?.length && <div style={{ color: `${MG}0.35)`, fontSize: '11px' }}>No data</div>}
            </div>
          </CardContent>
        </Card>

        {/* Top sessions */}
        <Card>
          <CardHeader><CardTitle style={{ fontSize: '12px' }}>Top sessions</CardTitle></CardHeader>
          <CardContent style={{ padding: '10px 14px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {(stats?.by_session ?? []).slice(0, 6).map(({ session_id, count }) => (
                <div
                  key={session_id}
                  onClick={() => onInspectSession(session_id)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'var(--theme-font-mono)' }} title={session_id}>{session_id.slice(0, 8)}</span>
                  <Badge>{String(count)}</Badge>
                </div>
              ))}
              {!stats?.by_session?.length && <div style={{ color: `${MG}0.35)`, fontSize: '11px' }}>No data</div>}
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
                    {m.session_id && (
                      <span
                        onClick={e => { e.stopPropagation(); onInspectSession(m.session_id!); }}
                        style={{ fontSize: '11px', fontFamily: 'var(--theme-font-mono)', color: `${MG}0.4)`, cursor: 'pointer', textDecoration: 'underline' }}
                      >
                        session:{m.session_id.slice(0, 8)}
                      </span>
                    )}
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
