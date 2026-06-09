import React, { useState, useEffect } from 'react';
import { fetchJSON, Card, CardHeader, CardTitle, CardContent, Badge, timeAgo } from '@hermes/sdk';
import { formatRelativeTime, safeNumber, shortId } from '@/utils/format';
import { t } from '@/utils/i18n';
import { MemoryItem, API_BASE as API } from '@/types';

const MG = (o: number) => `rgba(234,234,234,${o})`;

interface OverviewStats {
  counts: { working_memory: number; episodic_memory: number; triples: number; consolidation_log: number; scratchpad?: number; };
  by_veracity?: { veracity: string; count: number }[];
  by_source?: { source: string; count: number }[];
  by_scope?: { scope: string; count: number }[];
  by_session?: { session_id: string; count: number }[];
  by_degradation?: { degradation_label: string; count: number }[];
  contamination?: { total: number; high_importance: number };
  degradation?: { degraded: number };
  db_path?: string;
}

interface OverviewTabProps {
  onInspectMemory: (memory: any) => void;
  onInspectSession: (id: string) => void;
  onNavigateToTab: (tab: string) => void;
  onApplyFilters: (filters: any) => void;
}

const StatCard: React.FC<{ title: string; count: number; desc: string; icon: string; onClick?: () => void }> = ({ title, count, desc, icon, onClick }) => {
  const Component = onClick ? 'button' : 'div';
  return (
    <Component
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      style={{
        display: 'block',
        width: '100%',
        textAlign: 'left',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'background 0.15s, border-color 0.15s',
        padding: '12px',
        borderRadius: '6px',
        border: `1px solid ${MG(0.1)}`,
        background: MG(0.03),
        minHeight: '104px',
        minWidth: 0,
        font: 'inherit',
        color: 'inherit',
      }}
      onMouseEnter={(e: any) => { if (onClick) e.currentTarget.style.background = MG(0.06); }}
      onMouseLeave={(e: any) => { if (onClick) e.currentTarget.style.background = MG(0.03); }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 32px', alignItems: 'start', gap: '10px' }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: MG(0.45), marginBottom: '7px', lineHeight: 1.25, overflowWrap: 'anywhere' }}>{title}</div>
          <div style={{ fontSize: '26px', fontWeight: 700, lineHeight: 1.05, fontVariantNumeric: 'tabular-nums', overflowWrap: 'anywhere' }}>{count.toLocaleString()}</div>
          <div style={{ fontSize: '11px', color: MG(0.4), marginTop: '7px', lineHeight: 1.35, overflowWrap: 'anywhere' }}>{desc}</div>
        </div>
        <div
          aria-hidden="true"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            display: 'grid',
            placeItems: 'center',
            background: MG(0.06),
            color: MG(0.64),
            fontSize: '18px',
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          <span style={{ display: 'block', lineHeight: 1, transform: 'translateY(-1px)' }}>
            {icon}
          </span>
        </div>
      </div>
    </Component>
  );
};

const VERACITY_COLOR: Record<string, string> = {
  stated: '#065f46',
  inferred: '#1e3a8a',
  tool: '#581c87',
  imported: '#78350f',
};

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

  if (loading) return <div style={{ padding: '32px', color: MG(0.4), textAlign: 'center' }}>{t('common.loading')}</div>;

  const counts = stats?.counts ?? { working_memory: 0, episodic_memory: 0, triples: 0, consolidation_log: 0, scratchpad: 0 };
  const contaminationTotal = stats?.contamination?.total ?? 0;
  const degradationTotal = stats?.degradation?.degraded ?? 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* 7 Stat Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
        <StatCard title={t('overview.workingMemory')} count={counts.working_memory} desc={t('overview.workingDesc')} icon="◉" onClick={() => onApplyFilters({ kind: 'working' })} />
        <StatCard title={t('overview.episodicMemory')} count={counts.episodic_memory} desc={t('overview.episodicDesc')} icon="▤" onClick={() => onApplyFilters({ kind: 'episodic' })} />
        <StatCard title={t('overview.scratchpad')} count={counts.scratchpad ?? 0} desc={t('overview.scratchpadDesc')} icon="✎" />
        <StatCard title={t('overview.needsReview')} count={contaminationTotal} desc={t('overview.needsReviewDesc')} icon="⚑" onClick={() => onNavigateToTab('review')} />
        <StatCard title={t('overview.degraded')} count={degradationTotal} desc={t('overview.degradedDesc')} icon="◴" onClick={() => onNavigateToTab('lifecycle')} />
        <StatCard title={t('overview.triples')} count={counts.triples} desc={t('overview.triplesDesc')} icon="◎" onClick={() => onNavigateToTab('graph')} />
        <StatCard title={t('overview.consolidations')} count={counts.consolidation_log} desc={t('overview.consolidationsDesc')} icon="✦" onClick={() => onNavigateToTab('activity')} />
      </div>

      {/* 5 Breakdowns Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
        {/* Trust mix */}
        <Card>
          <CardHeader><CardTitle style={{ fontSize: '12px' }}>{t('overview.trustMix')}</CardTitle></CardHeader>
          <CardContent style={{ padding: '10px 14px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {(stats?.by_veracity ?? []).map(({ veracity, count }) => (
                <button
                  key={veracity}
                  type="button"
                  onClick={() => onApplyFilters({ veracity })}
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    font: 'inherit',
                    fontSize: '12px',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    color: 'inherit',
                  }}
                >
                  <span style={{ textTransform: 'capitalize' }}>{veracity}</span>
                  <Badge>{String(count)}</Badge>
                </button>
              ))}
              {!stats?.by_veracity?.length && <div style={{ color: MG(0.35), fontSize: '11px' }}>{t('overview.noData')}</div>}
            </div>
          </CardContent>
        </Card>

        {/* Lifecycle */}
        <Card>
          <CardHeader><CardTitle style={{ fontSize: '12px' }}>{t('overview.lifecycle')}</CardTitle></CardHeader>
          <CardContent style={{ padding: '10px 14px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {(stats?.by_degradation ?? []).map(({ degradation_label, count }) => {
                const tierMap: any = { hot: '1', warm: '2', cold: '3' };
                return (
                  <button
                    key={degradation_label}
                    type="button"
                    onClick={() => onApplyFilters({ degradation_tier: tierMap[degradation_label] || '' })}
                    style={{
                      display: 'flex',
                      width: '100%',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      font: 'inherit',
                      fontSize: '12px',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      color: 'inherit',
                    }}
                  >
                    <span style={{ textTransform: 'capitalize' }}>{degradation_label}</span>
                    <Badge>{String(count)}</Badge>
                  </button>
                );
              })}
              {!stats?.by_degradation?.length && <div style={{ color: MG(0.35), fontSize: '11px' }}>{t('overview.noData')}</div>}
            </div>
          </CardContent>
        </Card>

        {/* Sources */}
        <Card>
          <CardHeader><CardTitle style={{ fontSize: '12px' }}>{t('overview.sources')}</CardTitle></CardHeader>
          <CardContent style={{ padding: '10px 14px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {(stats?.by_source ?? []).slice(0, 6).map(({ source, count }) => (
                <button
                  key={source}
                  type="button"
                  onClick={() => onApplyFilters({ source })}
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    font: 'inherit',
                    fontSize: '12px',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    color: 'inherit',
                  }}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'left' }} title={source}>{source || 'unknown'}</span>
                  <Badge>{String(count)}</Badge>
                </button>
              ))}
              {!stats?.by_source?.length && <div style={{ color: MG(0.35), fontSize: '11px' }}>{t('overview.noData')}</div>}
            </div>
          </CardContent>
        </Card>

        {/* Scopes */}
        <Card>
          <CardHeader><CardTitle style={{ fontSize: '12px' }}>{t('overview.scopes')}</CardTitle></CardHeader>
          <CardContent style={{ padding: '10px 14px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {(stats?.by_scope ?? []).slice(0, 6).map(({ scope, count }) => (
                <button
                  key={scope}
                  type="button"
                  onClick={() => onApplyFilters({ scope })}
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    font: 'inherit',
                    fontSize: '12px',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    color: 'inherit',
                  }}
                >
                  <span style={{ textTransform: 'capitalize' }}>{scope || 'unknown'}</span>
                  <Badge>{String(count)}</Badge>
                </button>
              ))}
              {!stats?.by_scope?.length && <div style={{ color: MG(0.35), fontSize: '11px' }}>{t('overview.noData')}</div>}
            </div>
          </CardContent>
        </Card>

        {/* Top sessions */}
        <Card>
          <CardHeader><CardTitle style={{ fontSize: '12px' }}>{t('overview.topSessions')}</CardTitle></CardHeader>
          <CardContent style={{ padding: '10px 14px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {(stats?.by_session ?? []).slice(0, 6).map(({ session_id, count }) => (
                <button
                  key={session_id}
                  type="button"
                  onClick={() => onInspectSession(session_id)}
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    font: 'inherit',
                    fontSize: '12px',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    color: 'inherit',
                  }}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'var(--theme-font-mono)' }} title={session_id}>{shortId(session_id)}</span>
                  <Badge>{String(count)}</Badge>
                </button>
              ))}
              {!stats?.by_session?.length && <div style={{ color: MG(0.35), fontSize: '11px' }}>{t('overview.noData')}</div>}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Memory Stream */}
      <Card>
        <CardHeader>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <CardTitle>{t('overview.liveMemoryLog')}</CardTitle>
            <span style={{ fontSize: '11px', color: MG(0.4) }}>{t('overview.showingLatest')}</span>
          </div>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {memories.map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => onInspectMemory(m)}
                style={{
                  display: 'flex',
                  width: '100%',
                  textAlign: 'left',
                  padding: '10px 12px', borderRadius: '4px',
                  background: 'rgba(234,234,234,0.03)', border: '1px solid rgba(234,234,234,0.07)',
                  cursor: 'pointer', transition: 'background 0.15s',
                  alignItems: 'center', justifyContent: 'space-between', gap: '12px',
                  font: 'inherit',
                  color: 'inherit',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(234,234,234,0.07)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(234,234,234,0.03)')}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{m.content}</div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '4px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Badge style={{ background: VERACITY_COLOR[String(m.veracity).toLowerCase()] || MG(0.1) }}>{m.veracity}</Badge>
                    {m.session_id && (
                      <button
                        type="button"
                        onClick={e => { e.stopPropagation(); onInspectSession(m.session_id!); }}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          font: 'inherit',
                          fontSize: '11px',
                          fontFamily: 'var(--theme-font-mono)',
                          color: MG(0.4),
                          cursor: 'pointer',
                          textDecoration: 'underline',
                        }}
                      >
                        session:{shortId(m.session_id)}
                      </button>
                    )}
                    <span style={{ fontSize: '11px', color: MG(0.4) }}>imp:{safeNumber(m.importance, 2, 'n/a')}</span>
                  </div>
                </div>
                <span style={{ fontSize: '11px', color: MG(0.35), whiteSpace: 'nowrap', fontFamily: 'var(--theme-font-mono)' }}>
                  {formatRelativeTime(m.created_at, timeAgo(m.created_at))}
                </span>
              </button>
            ))}
            {!memories.length && <div style={{ color: MG(0.35), fontSize: '12px', textAlign: 'center', padding: '20px' }}>{t('overview.noMemories')}</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
