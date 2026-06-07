import React, { useState, useEffect } from 'react';
import { fetchJSON, Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@hermes/sdk';
import { formatDateTimeLabel, safeNumber, shortId } from '../utils/format';
import { t } from '../utils/i18n';

const API = '/api/plugins/mnemosyne-native-dashboard';
const MG = (o: number) => `rgba(234,234,234,${o})`;

interface TimelineGroup {
  key: string;
  count: number;
  events: Array<{
    id?: string;
    type?: string;
    timestamp?: string;
    session_id?: string;
    title?: string;
    preview?: string;
    item?: { id?: string; content?: string; veracity?: string; created_at?: string; importance?: number; source?: string };
  }>;
}

interface ConsolidationItem {
  id: string;
  session_id: string;
  summary: string;
  created_at: string;
}

interface SessionDetail {
  session_id: string;
  memories_count: number;
  memories: Array<{ id: string; content: string; veracity: string; importance?: number; created_at: string; }>;
}

interface HistoryTabProps {
  onInspectMemory: (memory: any) => void;
}

/**
 * HistoryTab Component
 * Renders the daily/session event timeline and consolidations digest.
 */
export const HistoryTab: React.FC<HistoryTabProps> = ({ onInspectMemory }) => {
  const [timeline, setTimeline] = useState<TimelineGroup[]>([]);
  const [consolidations, setConsolidations] = useState<ConsolidationItem[]>([]);
  const [selectedSession, setSelectedSession] = useState<SessionDetail | null>(null);
  const [grouping, setGrouping] = useState<'day' | 'session'>('day');
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadHistory(); }, [grouping]);

  async function loadHistory() {
    setLoading(true);
    try {
      const [timelineData, consolidationsData] = await Promise.all([
        fetchJSON(`${API}/timeline?group=${grouping}&limit=100`),
        fetchJSON(`${API}/consolidations?limit=50`),
      ]);
      setTimeline(timelineData.groups || timelineData.items || []);
      setConsolidations(consolidationsData.items || []);
    } catch {} finally {
      setLoading(false);
    }
  }

  async function handleOpenSession(sessionId: string) {
    try {
      const data = await fetchJSON(`${API}/session?id=${encodeURIComponent(sessionId)}&limit=200`);
      setSelectedSession(data);
    } catch (err: any) {
      alert(`Failed to load session details: ${err.message}`);
    }
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', alignItems: 'start' }}>
      {/* Left: Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: `1px solid ${MG(0.1)}` }}>
          <div style={{ fontSize: '14px', fontWeight: 600 }}>{t('history.title')}</div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <Button onClick={() => setGrouping('day')} outlined={grouping !== 'day'}>{t('history.byDay')}</Button>
            <Button onClick={() => setGrouping('session')} outlined={grouping !== 'session'}>{t('history.bySession')}</Button>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '32px', color: MG(0.4), textAlign: 'center' }}>{t('history.loadingTimeline')}</div>
        ) : timeline.length > 0 ? (
          <div style={{ maxHeight: '600px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {timeline.map((group, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  position: 'sticky', top: 0, background: 'var(--background-base)',
                  padding: '6px 0', borderBottom: `1px solid ${MG(0.1)}`, zIndex: 5,
                }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, fontFamily: 'var(--theme-font-mono)', color: MG(0.8) }}>{group.key}</div>
                  <Badge>{group.count} {group.count === 1 ? t('history.event') : t('history.events')}</Badge>
                </div>

                <div style={{ paddingLeft: '12px', borderLeft: `2px solid ${MG(0.15)}`, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {group.events.map(event => (
                    <div
                      key={event.id || `${group.key}-${event.timestamp}-${event.title}`}
                      onClick={() => event.item && onInspectMemory(event.item)}
                      style={{
                        padding: '10px 12px', background: MG(0.03), border: `1px solid ${MG(0.07)}`,
                        borderRadius: '4px', cursor: 'pointer', transition: 'background 0.15s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = MG(0.07))}
                      onMouseLeave={e => (e.currentTarget.style.background = MG(0.03))}
                    >
                      <div style={{ fontSize: '13px', lineHeight: '1.5', marginBottom: '6px' }}>{event.preview || event.title || event.item?.content || 'No preview available'}</div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <Badge>{event.item?.veracity || event.type || 'event'}</Badge>
                        {event.session_id && (
                          <span
                            onClick={e => { e.stopPropagation(); handleOpenSession(event.session_id!); }}
                            style={{ fontSize: '10px', fontFamily: 'var(--theme-font-mono)', color: MG(0.6), cursor: 'pointer', textDecoration: 'underline' }}
                          >
                            session:{shortId(event.session_id)}
                          </span>
                        )}
                        <span style={{ fontSize: '10px', color: MG(0.4), fontFamily: 'var(--theme-font-mono)' }}>{formatDateTimeLabel(event.timestamp || event.item?.created_at, 'unknown')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: '32px', border: `1px dashed ${MG(0.15)}`, borderRadius: '4px', textAlign: 'center', color: MG(0.35), fontSize: '13px' }}>
            {t('history.noEvents')}
          </div>
        )}
      </div>

      {/* Right: Consolidations + Session Detail */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {selectedSession && (
          <Card>
            <CardHeader>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <CardTitle>{t('history.sessionDetails')}</CardTitle>
                <Button ghost onClick={() => setSelectedSession(null)}>{t('common.close')}</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div style={{ fontSize: '11px', fontFamily: 'var(--theme-font-mono)', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px', color: MG(0.5) }}>
                <div>{t('history.session')}: {selectedSession.session_id}</div>
                <div>{t('history.count')}: {selectedSession.memories_count}</div>
              </div>
              <div style={{ maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {selectedSession.memories.map(m => (
                  <div
                    key={m.id}
                    onClick={() => onInspectMemory(m)}
                    style={{ padding: '10px', background: MG(0.04), border: `1px solid ${MG(0.08)}`, borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                    onMouseEnter={e => (e.currentTarget.style.background = MG(0.08))}
                    onMouseLeave={e => (e.currentTarget.style.background = MG(0.04))}
                  >
                    <div style={{ lineHeight: '1.5', marginBottom: '4px' }}>{m.content}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: MG(0.4), fontFamily: 'var(--theme-font-mono)' }}>
                      <span>{m.veracity}</span>
                      <span>imp:{safeNumber(m.importance, 2, 'n/a')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader><CardTitle>{t('history.consolidationHistory')}</CardTitle></CardHeader>
          <CardContent>
            <div style={{ maxHeight: '400px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {consolidations.length > 0 ? (
                consolidations.map(c => (
                  <div
                    key={c.id}
                    onClick={() => handleOpenSession(c.session_id)}
                    style={{ padding: '10px 12px', background: MG(0.03), border: `1px solid ${MG(0.07)}`, borderRadius: '4px', cursor: 'pointer' }}
                    onMouseEnter={e => (e.currentTarget.style.background = MG(0.07))}
                    onMouseLeave={e => (e.currentTarget.style.background = MG(0.03))}
                  >
                    <div style={{ fontSize: '12px', lineHeight: '1.5', marginBottom: '6px' }}>{c.summary}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: MG(0.4), fontFamily: 'var(--theme-font-mono)' }}>
                      <span style={{ textDecoration: 'underline' }}>session:{shortId(c.session_id)}</span>
                      <span>{new Date(c.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', color: MG(0.35), fontSize: '12px', padding: '20px' }}>{t('history.noConsolidations')}</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
