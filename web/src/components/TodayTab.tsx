import React, { useState, useEffect } from 'react';
import { fetchJSON, Card, CardHeader, CardTitle, CardContent, Badge, Button, Input } from '@hermes/sdk';
import { formatDateTimeLabel, safeNumber, shortId } from '../utils/format';
import { t } from '../utils/i18n';

const API = '/api/plugins/mnemosyne-native-dashboard';
const MG = (o: number) => `rgba(234,234,234,${o})`;
const VERACITY_COLOR: Record<string, string> = {
  stated: '#065f46',
  inferred: '#1e3a8a',
  tool: '#581c87',
  imported: '#78350f',
};

interface MemoryItem {
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
}

interface TripleItem {
  id: string;
  subject: string;
  predicate: string;
  object: string;
  confidence?: number;
  created_at?: string;
  valid_from?: string;
}

interface ConsolidationItem {
  id: string;
  session_id: string;
  items_consolidated: number;
  summary_preview: string;
  created_at: string;
}

interface DigestData {
  day: string;
  counts: {
    memories_added: number;
    memories_recalled: number;
    contaminated_added: number;
    degraded_added: number;
    triples_added: number;
    consolidations: number;
  };
  memories_added: MemoryItem[];
  memories_recalled: MemoryItem[];
  triples_added: TripleItem[];
  consolidations: ConsolidationItem[];
  breakdowns?: {
    sources?: Array<{ label: string; count: number }>;
    sessions?: Array<{ label: string; count: number }>;
    veracity?: Array<{ label: string; count: number }>;
    degradation?: Array<{ label: string; count: number }>;
    entities?: Array<{ label: string; count: number }>;
  };
}

export const TodayTab: React.FC<{
  onInspectMemory: (memory: any) => void;
  onInspectSession: (id: string) => void;
  onInspectJson: (data: any, title?: string) => void;
}> = ({ onInspectMemory, onInspectSession, onInspectJson }) => {
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [digest, setDigest] = useState<DigestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSubPanel, setActiveSubPanel] = useState<'added' | 'recalled' | 'triples' | 'consolidations'>('added');

  useEffect(() => {
    setLoading(true);
    fetchJSON(`${API}/digest/today?day=${date}`)
      .then(d => setDigest(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [date]);

  const resetToday = () => setDate(new Date().toISOString().split('T')[0]);

  const breakdownsList: Array<[string, Array<{ label: string; count: number }> | undefined]> = digest?.breakdowns
    ? [
        [t('today.topEntities'), digest.breakdowns.entities],
        [t('today.trustMix'), digest.breakdowns.veracity],
        [t('today.lifecycle'), digest.breakdowns.degradation],
        [t('today.sources'), digest.breakdowns.sources],
        [t('today.sessions'), digest.breakdowns.sessions],
      ]
    : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '16px', borderBottom: `1px solid ${MG(0.1)}` }}>
        <div>
          <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>{t('today.subtitle')}</div>
          <div style={{ fontSize: '12px', color: MG(0.45) }}>{t('today.digest')}</div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Input type="date" value={date} onChange={(e: any) => setDate(e.target.value)} style={{ width: '160px' }} />
          <Button onClick={resetToday} ghost>{t('today.todayBtn')}</Button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', color: MG(0.4), padding: '40px' }}>{t('today.loadingDigest')}</div>
      ) : (
        <>
          {/* Metric cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px' }}>
            {[
              { label: t('today.added'), value: digest?.counts.memories_added ?? 0 },
              { label: t('today.recalled'), value: digest?.counts.memories_recalled ?? 0 },
              { label: t('today.needsReview'), value: digest?.counts.contaminated_added ?? 0 },
              { label: t('today.lifecycleChanges'), value: digest?.counts.degraded_added ?? 0 },
              { label: t('today.triples'), value: digest?.counts.triples_added ?? 0 },
              { label: t('today.consolidations'), value: digest?.counts.consolidations ?? 0 },
            ].map(c => (
              <Card key={c.label}>
                <CardContent style={{ padding: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '9px', color: MG(0.45), textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={c.label}>
                    {c.label}
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 700, marginTop: '4px' }}>{c.value.toLocaleString()}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Breakdowns compact view */}
          {digest?.breakdowns && (
            <Card>
              <CardHeader><CardTitle>{t('today.breakdowns')}</CardTitle></CardHeader>
              <CardContent style={{ padding: '16px 20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '16px' }}>
                  {breakdownsList.map(([label, rows]) => (
                    <div key={label}>
                      <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: MG(0.45), marginBottom: '8px' }}>{label}</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {(rows || []).slice(0, 6).map((row: any) => (
                          <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', fontSize: '11px' }}>
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={row.label || 'unknown'}>
                              {row.label || 'unknown'}
                            </span>
                            <strong>{row.count}</strong>
                          </div>
                        ))}
                        {!(rows || []).length && <div style={{ color: MG(0.35), fontSize: '11px' }}>{t('common.noData')}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Subpanels tabs navigation */}
          <div style={{ display: 'flex', gap: '4px', borderBottom: `1px solid ${MG(0.1)}`, paddingBottom: '8px', marginTop: '8px' }}>
            <Button onClick={() => setActiveSubPanel('added')} ghost={activeSubPanel !== 'added'} primary={activeSubPanel === 'added'} style={{ fontSize: '12px', padding: '6px 12px', height: '30px' }}>{t('today.added')}</Button>
            <Button onClick={() => setActiveSubPanel('recalled')} ghost={activeSubPanel !== 'recalled'} primary={activeSubPanel === 'recalled'} style={{ fontSize: '12px', padding: '6px 12px', height: '30px' }}>{t('today.recalled')}</Button>
            <Button onClick={() => setActiveSubPanel('triples')} ghost={activeSubPanel !== 'triples'} primary={activeSubPanel === 'triples'} style={{ fontSize: '12px', padding: '6px 12px', height: '30px' }}>{t('today.triples')}</Button>
            <Button onClick={() => setActiveSubPanel('consolidations')} ghost={activeSubPanel !== 'consolidations'} primary={activeSubPanel === 'consolidations'} style={{ fontSize: '12px', padding: '6px 12px', height: '30px' }}>{t('today.consolidations')}</Button>
          </div>

          {/* Subpanel lists */}
          <div>
            {/* Added list */}
            {activeSubPanel === 'added' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {digest?.memories_added && digest.memories_added.length > 0 ? (
                  digest.memories_added.map(m => (
                    <div
                      key={m.id}
                      onClick={() => onInspectMemory(m)}
                      style={{
                        padding: '10px 12px', borderRadius: '4px', cursor: 'pointer',
                        background: MG(0.03), border: `1px solid ${MG(0.07)}`,
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px',
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                        <span style={{ fontSize: '13px' }}>{m.content}</span>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '4px', alignItems: 'center' }}>
                          <Badge style={{ background: VERACITY_COLOR[String(m.veracity).toLowerCase()] || MG(0.1) }}>{m.veracity}</Badge>
                          {m.session_id && (
                            <span
                              onClick={e => { e.stopPropagation(); onInspectSession(m.session_id!); }}
                              style={{ fontSize: '10px', fontFamily: 'var(--theme-font-mono)', color: MG(0.5), cursor: 'pointer', textDecoration: 'underline' }}
                            >
                              session:{shortId(m.session_id)}
                            </span>
                          )}
                          <span style={{ fontSize: '10px', color: MG(0.4) }}>imp:{safeNumber(m.importance, 2)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ color: MG(0.35), fontSize: '12px', textAlign: 'center', padding: '20px' }}>{t('today.noAdded')}</div>
                )}
              </div>
            )}

            {/* Recalled list */}
            {activeSubPanel === 'recalled' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {digest?.memories_recalled && digest.memories_recalled.length > 0 ? (
                  digest.memories_recalled.map(m => (
                    <div
                      key={m.id}
                      onClick={() => onInspectMemory(m)}
                      style={{
                        padding: '10px 12px', borderRadius: '4px', cursor: 'pointer',
                        background: MG(0.03), border: `1px solid ${MG(0.07)}`,
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px',
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                        <span style={{ fontSize: '13px' }}>{m.content}</span>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '4px', alignItems: 'center' }}>
                          <Badge style={{ background: VERACITY_COLOR[String(m.veracity).toLowerCase()] || MG(0.1) }}>{m.veracity}</Badge>
                          {m.session_id && (
                            <span
                              onClick={e => { e.stopPropagation(); onInspectSession(m.session_id!); }}
                              style={{ fontSize: '10px', fontFamily: 'var(--theme-font-mono)', color: MG(0.5), cursor: 'pointer', textDecoration: 'underline' }}
                            >
                              session:{shortId(m.session_id)}
                            </span>
                          )}
                          <span style={{ fontSize: '10px', color: MG(0.4) }}>importance:{safeNumber(m.importance, 2)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ color: MG(0.35), fontSize: '12px', textAlign: 'center', padding: '20px' }}>{t('today.noRecalled')}</div>
                )}
              </div>
            )}

            {/* Triples list */}
            {activeSubPanel === 'triples' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {digest?.triples_added && digest.triples_added.length > 0 ? (
                  digest.triples_added.map((tItem, idx) => (
                    <div
                      key={tItem.id || idx}
                      onClick={() => onInspectJson(tItem, 'Triple detail')}
                      style={{
                        padding: '10px 12px', borderRadius: '4px', cursor: 'pointer',
                        background: MG(0.03), border: `1px solid ${MG(0.07)}`,
                        fontSize: '12px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: MG(0.45), marginBottom: '4px' }}>
                        <span>{t('today.triples').toLowerCase()}</span>
                        <span>{formatDateTimeLabel(tItem.created_at || tItem.valid_from)}</span>
                      </div>
                      <div>
                        <strong>{tItem.subject}</strong> — {tItem.predicate} → <strong>{tItem.object}</strong>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ color: MG(0.35), fontSize: '12px', textAlign: 'center', padding: '20px' }}>{t('today.noTriples')}</div>
                )}
              </div>
            )}

            {/* Consolidations list */}
            {activeSubPanel === 'consolidations' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {digest?.consolidations && digest.consolidations.length > 0 ? (
                  digest.consolidations.map((cItem, idx) => (
                    <div
                      key={cItem.id || idx}
                      onClick={() => onInspectJson(cItem, 'Consolidation detail')}
                      style={{
                        padding: '10px 12px', borderRadius: '4px', cursor: 'pointer',
                        background: MG(0.03), border: `1px solid ${MG(0.07)}`,
                        fontSize: '12px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: MG(0.45), marginBottom: '4px' }}>
                        <span>{t('today.consolidations').toLowerCase()} · {cItem.items_consolidated} {t('contextBank.items')}</span>
                        <span>{formatDateTimeLabel(cItem.created_at)}</span>
                      </div>
                      <div>
                        <strong style={{ fontFamily: 'var(--theme-font-mono)' }}>{cItem.session_id}</strong>: {cItem.summary_preview}
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ color: MG(0.35), fontSize: '12px', textAlign: 'center', padding: '20px' }}>{t('today.noConsolidations')}</div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
