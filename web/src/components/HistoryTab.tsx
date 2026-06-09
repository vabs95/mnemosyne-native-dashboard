import React, { useState, useEffect } from 'react';
import { fetchJSON, Card, CardHeader, CardTitle, CardContent, Button, Badge, Tabs, TabsList, TabsTrigger } from '@hermes/sdk';
import { formatDateTimeLabel, safeNumber, shortId } from '@/utils/format';
import { t } from '@/utils/i18n';
import { ConsolidationItem, API_BASE as API } from '@/types';

const MG = (o: number) => `rgba(234,234,234,${o})`;
const VERACITY_COLOR: Record<string, string> = {
  stated: '#065f46',
  inferred: '#1e3a8a',
  tool: '#581c87',
  imported: '#78350f',
};

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

interface SessionDetail {
  session_id: string;
  memories_count: number;
  memories: Array<{ id: string; content: string; veracity: string; importance?: number; created_at: string; }>;
}

interface TimelineEventProps {
  event: any;
  onInspectMemory: (memory: any) => void;
  handleOpenSession: (sessionId: string) => void;
}

const TimelineEvent: React.FC<TimelineEventProps> = ({ event, onInspectMemory, handleOpenSession }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      {/* Outer button covering the whole card area */}
      <button
        type="button"
        onClick={() => event.item && onInspectMemory(event.item)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={t('history.event')}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          background: 'none',
          border: 'none',
          cursor: event.item ? 'pointer' : 'default',
          zIndex: 1,
        }}
      />

      <div
        style={{
          padding: '10px 12px',
          background: hovered && event.item ? MG(0.07) : MG(0.03),
          border: `1px solid ${MG(0.07)}`,
          borderRadius: '4px',
          position: 'relative',
          zIndex: 2,
          pointerEvents: 'none',
          transition: 'background 0.15s',
        }}
      >
        <div style={{ fontSize: '13px', lineHeight: '1.5', marginBottom: '6px' }}>
          {event.preview || event.title || event.item?.content || 'No preview available'}
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Badge style={{ background: VERACITY_COLOR[String(event.item?.veracity || event.type || 'event').toLowerCase()] || MG(0.1) }}>
            {event.item?.veracity || event.type || 'event'}
          </Badge>
          {event.session_id && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenSession(event.session_id!);
              }}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                font: 'inherit',
                fontSize: '10px',
                fontFamily: 'var(--theme-font-mono)',
                color: MG(0.6),
                cursor: 'pointer',
                textDecoration: 'underline',
                pointerEvents: 'auto',
              }}
            >
              session:{shortId(event.session_id)}
            </button>
          )}
          <span style={{ fontSize: '10px', color: MG(0.4), fontFamily: 'var(--theme-font-mono)' }}>
            {formatDateTimeLabel(event.timestamp || event.item?.created_at, 'unknown')}
          </span>
        </div>
      </div>
    </div>
  );
};

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
          <Tabs defaultValue="day" className="">
            {(activeValue: string, setActiveValue: (v: string) => void) => {
              const currentGrouping = activeValue || 'day';
              return (
                <TabsList style={{ height: 'auto', gap: '2px' }}>
                  <TabsTrigger value="day" active={currentGrouping === 'day'} onClick={() => { setActiveValue('day'); setGrouping('day'); }}>{t('history.byDay')}</TabsTrigger>
                  <TabsTrigger value="session" active={currentGrouping === 'session'} onClick={() => { setActiveValue('session'); setGrouping('session'); }}>{t('history.bySession')}</TabsTrigger>
                </TabsList>
              );
            }}
          </Tabs>
        </div>

        {loading ? (
          <div style={{ padding: '32px', color: MG(0.4), textAlign: 'center' }}>{t('history.loadingTimeline')}</div>
        ) : timeline.length === 0 ? (
          <div style={{ padding: '20px', border: `1px dashed ${MG(0.15)}`, borderRadius: '4px', textAlign: 'center', color: MG(0.35), fontSize: '12px' }}>
            {t('history.noEvents')}
          </div>
        ) : (
          <div style={{ maxHeight: '600px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {timeline.map((group) => (
              <div key={group.key} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  position: 'sticky', top: 0, background: 'var(--background-base)',
                  padding: '6px 0', borderBottom: `1px solid ${MG(0.1)}`, zIndex: 5,
                }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, fontFamily: 'var(--theme-font-mono)', color: MG(0.8) }}>{group.key}</div>
                  <Badge>{group.count} {group.count === 1 ? t('history.event') : t('history.events')}</Badge>
                </div>

                <div style={{ paddingLeft: '12px', borderLeft: `2px solid ${MG(0.15)}`, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {group.events.map((event, idx) => {
                    const eventKey = event.id || `${group.key}-${event.timestamp}-${idx}`;
                    return (
                      <TimelineEvent
                        key={eventKey}
                        event={event}
                        onInspectMemory={onInspectMemory}
                        handleOpenSession={handleOpenSession}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
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
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => onInspectMemory(m)}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px',
                      background: MG(0.04),
                      border: `1px solid ${MG(0.08)}`,
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      color: 'inherit',
                      font: 'inherit',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = MG(0.08))}
                    onMouseLeave={e => (e.currentTarget.style.background = MG(0.04))}
                  >
                    <div style={{ lineHeight: '1.5', marginBottom: '4px' }}>{m.content}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: MG(0.4), fontFamily: 'var(--theme-font-mono)' }}>
                      <span>{m.veracity}</span>
                      <span>imp:{safeNumber(m.importance, 2, 'n/a')}</span>
                    </div>
                  </button>
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
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleOpenSession(c.session_id)}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 12px',
                      background: MG(0.03),
                      border: `1px solid ${MG(0.07)}`,
                      borderRadius: '4px',
                      cursor: 'pointer',
                      color: 'inherit',
                      font: 'inherit',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = MG(0.07))}
                    onMouseLeave={e => (e.currentTarget.style.background = MG(0.03))}
                  >
                    <div style={{ fontSize: '12px', lineHeight: '1.5', marginBottom: '6px' }}>{c.summary}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: MG(0.4), fontFamily: 'var(--theme-font-mono)' }}>
                      <span style={{ textDecoration: 'underline' }}>session:{shortId(c.session_id)}</span>
                      <span>{new Date(c.created_at).toLocaleDateString()}</span>
                    </div>
                  </button>
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
