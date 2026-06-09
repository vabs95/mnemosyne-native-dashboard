import React, { useState, useEffect } from 'react';
import { fetchJSON, Card, CardContent, Button, Badge } from '@hermes/sdk';
import { formatDateTimeLabel, safeNumber, shortId } from '../utils/format';
import { t } from '../utils/i18n';
import { MemoryItem, API_BASE as API } from '../types';

const MG = (o: number) => `rgba(234,234,234,${o})`;
const VERACITY_COLOR: Record<string, string> = {
  stated: '#065f46',
  inferred: '#1e3a8a',
  tool: '#581c87',
  imported: '#78350f',
};

interface LifecycleCard {
  key: string;
  title: string;
  count: number;
  description: string;
}

interface LifecycleQueue {
  title: string;
  description: string;
  filter: any;
  items: MemoryItem[];
}

export const LifecycleTab: React.FC<{
  onInspectMemory: (memory: any) => void;
  onInspectSession: (id: string) => void;
  onApplyFilters: (filters: any) => void;
}> = ({ onInspectMemory, onInspectSession, onApplyFilters }) => {
  const [loading, setLoading] = useState(true);
  const [thresholds, setThresholds] = useState<any>(null);
  const [cards, setCards] = useState<LifecycleCard[]>([]);
  const [queues, setQueues] = useState<Record<string, LifecycleQueue>>({});

  useEffect(() => {
    fetchJSON(`${API}/lifecycle?limit=80`)
      .then(data => {
        setThresholds(data.thresholds || {});
        setCards(data.cards || []);
        setQueues(data.queues || {});
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: '32px', color: MG(0.4), textAlign: 'center' }}>{t('lifecycle.loadingLifecycle')}</div>;

  const weights = thresholds?.weights || {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header */}
      <div>
        <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>{t('lifecycle.title')}</div>
        <div style={{ fontSize: '12px', color: MG(0.45) }}>{t('lifecycle.subtitle')}</div>
      </div>

      {/* Threshold Config Banner */}
      <Card style={{ background: MG(0.02) }}>
        <CardContent style={{ padding: '12px 16px' }}>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', fontSize: '12px', color: MG(0.7) }}>
            <span>{t('lifecycle.tier2After')} <strong>{thresholds?.tier2_days ?? 30} {t('lifecycle.days')}</strong></span>
            <span>{t('lifecycle.tier3After')} <strong>{thresholds?.tier3_days ?? 180} {t('lifecycle.days')}</strong></span>
            <span>{t('lifecycle.weights')}: hot ×{safeNumber(weights['1'] ?? 1.0, 2)} · warm ×{safeNumber(weights['2'] ?? 0.5, 2)} · cold ×{safeNumber(weights['3'] ?? 0.25, 2)}</span>
            <span style={{ color: '#fbbf24' }}>{t('lifecycle.readOnlyNotice')}</span>
          </div>
        </CardContent>
      </Card>

      {/* Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        {cards.map(card => (
          <div
            key={card.key}
            onClick={() => {
              if (queues[card.key]?.filter) {
                onApplyFilters(queues[card.key].filter);
              }
            }}
            style={{
              padding: '12px 16px',
              borderRadius: '4px',
              background: MG(0.03),
              border: `1px solid ${MG(0.07)}`,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '100px',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = MG(0.06))}
            onMouseLeave={e => (e.currentTarget.style.background = MG(0.03))}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: MG(0.45) }}>{card.title}</div>
              <div style={{ fontSize: '24px', fontWeight: 700 }}>{card.count.toLocaleString()}</div>
            </div>
            <div style={{ fontSize: '11px', color: MG(0.4), marginTop: '8px', lineHeight: '1.4' }}>{card.description}</div>
          </div>
        ))}
      </div>

      {/* Queues List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '12px' }}>
        {Object.entries(queues).map(([key, q]) => (
          <div key={key}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px', borderBottom: `1px solid ${MG(0.08)}`, paddingBottom: '6px' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600 }}>{q.title || key}</div>
                <div style={{ fontSize: '12px', color: MG(0.4) }}>{q.description || ''}</div>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: MG(0.5) }}>{q.items?.length || 0} {t('lifecycle.listed')}</span>
                <Button onClick={() => onApplyFilters(q.filter || {})} ghost>{t('lifecycle.openFilter')}</Button>
              </div>
            </div>

            {q.items && q.items.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {q.items.map(m => (
                  <div
                    key={m.id}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '4px',
                      background: MG(0.03),
                      border: `1px solid ${MG(0.07)}`,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = MG(0.07))}
                    onMouseLeave={e => (e.currentTarget.style.background = MG(0.03))}
                  >
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', fontSize: '11px' }}>
                      <Badge style={{ background: VERACITY_COLOR[String(m.veracity).toLowerCase()] || MG(0.1) }}>{m.veracity}</Badge>
                      {m.degradation_label && <Badge>{m.degradation_label}</Badge>}
                      <span style={{ color: MG(0.4) }}>imp:{safeNumber(m.importance, 2)}</span>
                      {m.session_id && (
                        <span
                          onClick={() => onInspectSession(m.session_id!)}
                          style={{ fontFamily: 'var(--theme-font-mono)', color: MG(0.6), cursor: 'pointer', textDecoration: 'underline' }}
                        >
                          session:{shortId(m.session_id)}
                        </span>
                      )}
                      <span style={{ color: MG(0.4) }}>{formatDateTimeLabel(m.created_at)}</span>
                    </div>
                    <div
                      onClick={() => onInspectMemory(m)}
                      style={{ fontSize: '13px', lineHeight: '1.5', cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '20px', textAlign: 'center', color: MG(0.35), fontSize: '12px' }}>
                {t('lifecycle.noItems')}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
