import React, { useState, useEffect } from 'react';
import { fetchJSON, Tabs, TabsList, TabsTrigger, Badge, Button } from '@hermes/sdk';

import { OverviewTab } from '@/components/OverviewTab';
import { TodayTab } from '@/components/TodayTab';
import { VisualiserTab } from '@/components/VisualiserTab';
import { ReviewTab } from '@/components/ReviewTab';
import { MemoriesTab } from '@/components/MemoriesTab';
import { ContextBankTab } from '@/components/ContextBankTab';
import { LifecycleTab } from '@/components/LifecycleTab';
import { GraphTab } from '@/components/GraphTab';
import { MemoriaTab } from '@/components/MemoriaTab';
import { HistoryTab } from '@/components/HistoryTab';
import { SettingsTab } from '@/components/SettingsTab';
import { formatDateTimeLabel, safeNumber } from '@/utils/format';
import { t } from '@/utils/i18n';

import { MemoryItem, API_BASE as API } from '@/types';

const TABS = [
  { id: 'overview' },
  { id: 'today' },
  { id: 'visualiser' },
  { id: 'review' },
  { id: 'memories' },
  { id: 'profile' },
  { id: 'lifecycle' },
  { id: 'graph' },
  { id: 'memoria' },
  { id: 'activity' },
  { id: 'settings' },
];

const getVeracityColor = (veracity: string | undefined | null) => {
  const v = String(veracity || 'unknown').toLowerCase();
  if (v === 'stated') return '#065f46';
  if (v === 'inferred') return '#1e3a8a';
  if (v === 'tool') return '#581c87';
  if (v === 'imported') return '#78350f';
  return 'rgba(234,234,234,0.1)';
};

const getLifecycleColor = (label: string | null | undefined) => {
  const l = String(label || '').toLowerCase();
  if (l === 'hot') return '#991b1b';
  if (l === 'warm') return '#854d0e';
  if (l === 'cold') return '#1e3a8a';
  return 'rgba(234,234,234,0.06)';
};

interface MemoryDetailModalProps {
  memoryId: string;
  memory: MemoryItem | null;
  loading: boolean;
  onClose: () => void;
  onInspectSession: (id: string) => void;
}

const MemoryDetailModal: React.FC<MemoryDetailModalProps> = ({
  memoryId,
  memory,
  loading,
  onClose,
  onInspectSession,
}) => {
  if (loading && !memory) {
    return (
      <div style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center',
        justifyContent: 'center', zIndex: 9999, padding: '16px',
      }}>
        <div style={{
          width: '100%', maxWidth: '680px', maxHeight: '85vh',
          background: 'var(--background-base)', border: '1px solid rgba(234,234,234,0.12)',
          borderRadius: '4px', overflow: 'hidden', display: 'flex', flexDirection: 'column',
        }}>
          <div style={{
            display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
            padding: '16px 20px', borderBottom: '1px solid rgba(234,234,234,0.1)',
            background: 'rgba(234,234,234,0.03)',
          }}>
            <div>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(234,234,234,0.4)', marginBottom: '4px' }}>{t('index.memoryRecord')}</div>
              <div style={{ fontSize: '11px', fontFamily: 'var(--theme-font-mono)', color: 'rgba(234,234,234,0.6)', wordBreak: 'break-all' }}>{memoryId}</div>
            </div>
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(234,234,234,0.5)', fontSize: '18px', lineHeight: 1, padding: '0 0 0 12px' }}
            >✕</button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            <div style={{ textAlign: 'center', color: 'rgba(234,234,234,0.4)', padding: '40px' }}>{t('index.loadingRecord')}</div>
          </div>
          <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(234,234,234,0.1)', display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={onClose}>{t('common.close')}</Button>
          </div>
        </div>
      </div>
    );
  }

  if (!memory) {
    return (
      <div style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center',
        justifyContent: 'center', zIndex: 9999, padding: '16px',
      }}>
        <div style={{
          width: '100%', maxWidth: '680px', maxHeight: '85vh',
          background: 'var(--background-base)', border: '1px solid rgba(234,234,234,0.12)',
          borderRadius: '4px', overflow: 'hidden', display: 'flex', flexDirection: 'column',
        }}>
          <div style={{
            display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
            padding: '16px 20px', borderBottom: '1px solid rgba(234,234,234,0.1)',
            background: 'rgba(234,234,234,0.03)',
          }}>
            <div>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(234,234,234,0.4)', marginBottom: '4px' }}>{t('index.memoryRecord')}</div>
              <div style={{ fontSize: '11px', fontFamily: 'var(--theme-font-mono)', color: 'rgba(234,234,234,0.6)', wordBreak: 'break-all' }}>{memoryId}</div>
            </div>
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(234,234,234,0.5)', fontSize: '18px', lineHeight: 1, padding: '0 0 0 12px' }}
            >✕</button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            <div style={{ textAlign: 'center', color: '#f87171', padding: '40px', fontSize: '13px' }}>{t('index.noRecordFound')}</div>
          </div>
          <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(234,234,234,0.1)', display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={onClose}>{t('common.close')}</Button>
          </div>
        </div>
      </div>
    );
  }

  let parsedMetadata = null;
  if (memory.metadata) {
    if (typeof memory.metadata === 'string') {
      try {
        parsedMetadata = JSON.parse(memory.metadata);
      } catch {
        parsedMetadata = { value: memory.metadata };
      }
    } else {
      parsedMetadata = memory.metadata;
    }
    if (typeof parsedMetadata === 'object' && Object.keys(parsedMetadata).length === 0) {
      parsedMetadata = null;
    }
  }

  const diagnosticsItems = [
    { label: 'Memory ID', value: memory.id },
    { label: 'Kind / Tier', value: memory.memory_kind || memory.tier || 'memory' },
    { label: 'Source', value: memory.source || 'unknown' },
    { label: 'Scope', value: memory.scope || 'session' },
    { label: 'Session ID', value: memory.session_id },
    { label: 'Status', value: memory.status },
    { label: 'Recall Count', value: memory.recall_count !== undefined && memory.recall_count !== null ? `${memory.recall_count}×` : '0×' },
    { label: 'Last Recalled', value: formatDateTimeLabel(memory.last_recalled, 'never') },
    { label: 'Created At', value: formatDateTimeLabel(memory.created_at, 'unknown') },
    { label: 'Degraded At', value: formatDateTimeLabel(memory.degraded_at, 'never') },
    { label: 'Valid Until', value: formatDateTimeLabel(memory.valid_until, 'none') },
    { label: 'Superseded By', value: memory.superseded_by || 'none' },
  ];

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
      backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 9999, padding: '16px',
    }}>
      <div style={{
        width: '100%', maxWidth: '680px', maxHeight: '85vh',
        background: 'var(--background-base)', border: '1px solid rgba(234,234,234,0.12)',
        borderRadius: '4px', overflow: 'hidden', display: 'flex', flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          padding: '16px 20px', borderBottom: '1px solid rgba(234,234,234,0.1)',
          background: 'rgba(234,234,234,0.03)',
        }}>
          <div>
            <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(234,234,234,0.4)', marginBottom: '4px' }}>{t('index.memoryRecord')}</div>
            <div style={{ fontSize: '11px', fontFamily: 'var(--theme-font-mono)', color: 'rgba(234,234,234,0.6)', wordBreak: 'break-all' }}>{memoryId}</div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(234,234,234,0.5)', fontSize: '18px', lineHeight: 1, padding: '0 0 0 12px' }}
          >✕</button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', scrollBehavior: 'smooth' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Trust strip */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Badge style={{ background: getVeracityColor(memory.veracity) }}>
                {memory.veracity} {t('index.trust')} (×{safeNumber(memory.trust_weight, 2, '1.00')})
              </Badge>
              <Badge style={{ background: getLifecycleColor(memory.degradation_label) }}>
                {memory.degradation_label ? `${memory.degradation_label} ${t('index.tier')} ${memory.degradation_tier}` : t('index.notDegraded')}
                {memory.degradation_weight !== undefined && memory.degradation_weight !== null ? ` (×${safeNumber(memory.degradation_weight, 2)})` : ''}
              </Badge>
              <Badge style={{ background: 'rgba(234,234,234,0.06)', border: '1px solid rgba(234,234,234,0.15)' }}>
                {t('index.effectiveWeight')} ×{safeNumber(memory.effective_memory_weight, 2, '0.00')}
              </Badge>
              {memory.contaminated && (
                <Badge style={{ background: '#991b1b', color: '#fca5a5' }}>
                  {t('index.needsReview')}
                </Badge>
              )}
            </div>

            {/* Content block */}
            <div>
              <div style={{ fontSize: '11px', color: 'rgba(234,234,234,0.45)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('index.content')}</div>
              <div style={{
                padding: '14px', borderRadius: '4px',
                background: 'rgba(234,234,234,0.04)', border: '1px solid rgba(234,234,234,0.1)',
                fontSize: '13px', lineHeight: '1.6', whiteSpace: 'pre-wrap',
              }}>{memory.content}</div>
            </div>

            {/* Comprehensive Diagnostics Table */}
            <div>
              <div style={{ fontSize: '11px', color: 'rgba(234,234,234,0.45)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('index.diagnostics')}</div>
              <div style={{ fontSize: '12px', fontFamily: 'var(--theme-font-mono)', color: 'rgba(234,234,234,0.5)', display: 'flex', flexDirection: 'column' }}>
                {diagnosticsItems.map(({ label, value }) => {
                  if (!value && label !== 'Valid Until' && label !== 'Superseded By' && label !== 'Last Recalled' && label !== 'Degraded At') return null;
                  return (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(234,234,234,0.06)' }}>
                      <span>{label}</span>
                      {label === 'Session ID' && value && value !== 'default' ? (
                        <button
                          type="button"
                          onClick={() => { onClose(); onInspectSession(String(value)); }}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            font: 'inherit',
                            color: 'rgba(234,234,234,0.75)',
                            textDecoration: 'underline',
                            cursor: 'pointer'
                          }}
                        >
                          {String(value)}
                        </button>
                      ) : (
                        <span style={{ color: 'rgba(234,234,234,0.75)' }}>{String(value)}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Metadata block */}
            {parsedMetadata && (
              <div>
                <div style={{ fontSize: '11px', color: 'rgba(234,234,234,0.45)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('common.metadata')}</div>
                <pre style={{
                  padding: '12px', borderRadius: '4px', background: 'rgba(234,234,234,0.04)',
                  fontSize: '11px', overflowX: 'auto', maxHeight: '160px',
                  fontFamily: 'var(--theme-font-mono)', color: 'rgba(234,234,234,0.6)', margin: 0
                }}>
                  {JSON.stringify(parsedMetadata, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(234,234,234,0.1)', display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClose}>{t('common.close')}</Button>
        </div>
      </div>
    </div>
  );
};

interface SessionDetailModalProps {
  sessionId: string;
  session: any;
  loading: boolean;
  onClose: () => void;
  onInspectMemoryId: (id: string) => void;
}

const SessionDetailModal: React.FC<SessionDetailModalProps> = ({
  sessionId,
  session,
  loading,
  onClose,
  onInspectMemoryId,
}) => {
  if (loading) {
    return (
      <div style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center',
        justifyContent: 'center', zIndex: 9999, padding: '16px',
      }}>
        <div style={{
          width: '100%', maxWidth: '680px', maxHeight: '85vh',
          background: 'var(--background-base)', border: '1px solid rgba(234,234,234,0.12)',
          borderRadius: '4px', overflow: 'hidden', display: 'flex', flexDirection: 'column',
        }}>
          <div style={{
            display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
            padding: '16px 20px', borderBottom: '1px solid rgba(234,234,234,0.1)',
            background: 'rgba(234,234,234,0.03)',
          }}>
            <div>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(234,234,234,0.4)', marginBottom: '4px' }}>{t('index.sessionDetails')}</div>
              <div style={{ fontSize: '11px', fontFamily: 'var(--theme-font-mono)', color: 'rgba(234,234,234,0.6)', wordBreak: 'break-all' }}>{sessionId}</div>
            </div>
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(234,234,234,0.5)', fontSize: '18px', lineHeight: 1, padding: '0 0 0 12px' }}
            >✕</button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            <div style={{ textAlign: 'center', color: 'rgba(234,234,234,0.4)', padding: '40px' }}>{t('index.loadingSession')}</div>
          </div>
          <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(234,234,234,0.1)', display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={onClose}>{t('common.close')}</Button>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center',
        justifyContent: 'center', zIndex: 9999, padding: '16px',
      }}>
        <div style={{
          width: '100%', maxWidth: '680px', maxHeight: '85vh',
          background: 'var(--background-base)', border: '1px solid rgba(234,234,234,0.12)',
          borderRadius: '4px', overflow: 'hidden', display: 'flex', flexDirection: 'column',
        }}>
          <div style={{
            display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
            padding: '16px 20px', borderBottom: '1px solid rgba(234,234,234,0.1)',
            background: 'rgba(234,234,234,0.03)',
          }}>
            <div>
              <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(234,234,234,0.4)', marginBottom: '4px' }}>{t('index.sessionDetails')}</div>
              <div style={{ fontSize: '11px', fontFamily: 'var(--theme-font-mono)', color: 'rgba(234,234,234,0.6)', wordBreak: 'break-all' }}>{sessionId}</div>
            </div>
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(234,234,234,0.5)', fontSize: '18px', lineHeight: 1, padding: '0 0 0 12px' }}
            >✕</button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            <div style={{ textAlign: 'center', color: '#f87171', padding: '40px', fontSize: '13px' }}>{t('index.sessionNotLoaded')}</div>
          </div>
          <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(234,234,234,0.1)', display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={onClose}>{t('common.close')}</Button>
          </div>
        </div>
      </div>
    );
  }

  const events = session.events || [];

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
      backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 9999, padding: '16px',
    }}>
      <div style={{
        width: '100%', maxWidth: '680px', maxHeight: '85vh',
        background: 'var(--background-base)', border: '1px solid rgba(234,234,234,0.12)',
        borderRadius: '4px', overflow: 'hidden', display: 'flex', flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          padding: '16px 20px', borderBottom: '1px solid rgba(234,234,234,0.1)',
          background: 'rgba(234,234,234,0.03)',
        }}>
          <div>
            <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(234,234,234,0.4)', marginBottom: '4px' }}>{t('index.sessionDetails')}</div>
            <div style={{ fontSize: '11px', fontFamily: 'var(--theme-font-mono)', color: 'rgba(234,234,234,0.6)', wordBreak: 'break-all' }}>{sessionId}</div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(234,234,234,0.5)', fontSize: '18px', lineHeight: 1, padding: '0 0 0 12px' }}
          >✕</button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ fontSize: '12px', color: 'rgba(234,234,234,0.5)', fontFamily: 'var(--theme-font-mono)', display: 'flex', gap: '16px', borderBottom: '1px solid rgba(234,234,234,0.08)', paddingBottom: '10px' }}>
              <span>{t('index.memories')} <strong>{session.counts?.memories ?? 0}</strong></span>
              <span>{t('index.facts')} <strong>{session.counts?.triples ?? 0}</strong></span>
              <span>{t('index.consolidations')} <strong>{session.counts?.consolidations ?? 0}</strong></span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {events.length > 0 ? (
                events.map((event: any, idx: number) => {
                  const eventKey = event.item?.id ? `${event.item.id}-${idx}` : `${event.timestamp}-${idx}`;
                  return (
                    <button
                      key={eventKey}
                      type="button"
                      onClick={() => event.item?.id && onInspectMemoryId(event.item.id)}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        padding: '10px 12px',
                        background: 'rgba(234,234,234,0.03)',
                        border: '1px solid rgba(234,234,234,0.07)',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        color: 'inherit',
                        font: 'inherit',
                      }}
                    >
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <Badge>{event.type}</Badge>
                        <span style={{ fontSize: '10px', color: 'rgba(234,234,234,0.4)' }}>{formatDateTimeLabel(event.timestamp)}</span>
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: 600 }}>{event.title}</div>
                      <div style={{ fontSize: '12px', color: 'rgba(234,234,234,0.7)' }}>{event.preview}</div>
                    </button>
                  );
                })
              ) : (
                <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(234,234,234,0.35)', fontSize: '12px' }}>{t('index.noSessionEvents')}</div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(234,234,234,0.1)', display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClose}>{t('common.close')}</Button>
        </div>
      </div>
    </div>
  );
};

/**
 * Main Mnemosyne Dashboard Component
 * Renders within the Hermes plugin content area without any duplicate sidebar.
 * Uses SDK Tabs for in-page navigation and Hermes design tokens throughout.
 */
const MnemosyneDashboard: React.FC = () => {
  const [adminMode, setAdminMode] = useState(false);
  const [version, setVersion] = useState('0.1.0');
  const [inspectedMemoryId, setInspectedMemoryId] = useState<string | null>(null);
  const [inspectedMemory, setInspectedMemory] = useState<MemoryItem | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // Global Session Inspector State
  const [inspectedSessionId, setInspectedSessionId] = useState<string | null>(null);
  const [inspectedSession, setInspectedSession] = useState<any>(null);
  const [loadingSession, setLoadingSession] = useState(false);

  // Global Memory Filters State
  const [memoryFilters, setMemoryFilters] = useState<any>({
    q: '',
    kind: 'all',
    status: 'active',
    sort: 'recent',
    source: '',
    scope: '',
    session_id: '',
    veracity: '',
    degradation_tier: '',
    trust_preset: '',
  });

  const handleApplyFilters = (filters: any, setActiveTabFn: (tab: string) => void) => {
    setMemoryFilters({
      q: '',
      kind: 'all',
      status: 'active',
      sort: 'recent',
      source: '',
      scope: '',
      session_id: '',
      veracity: '',
      degradation_tier: '',
      trust_preset: '',
      ...filters
    });
    setActiveTabFn('memories');
  };

  const handleInspectMemory = (memory: any) => {
    if (!memory) {
      setInspectedMemoryId(null);
      setInspectedMemory(null);
      return;
    }
    if (typeof memory === 'string') {
      setInspectedMemoryId(memory);
      setInspectedMemory(prev => (prev?.id === memory) ? prev : null);
    } else if (memory && typeof memory === 'object') {
      setInspectedMemoryId(memory.id);
      setInspectedMemory(memory);
    }
  };

  useEffect(() => {
    fetchJSON(`${API}/config`).then(res => {
      if (res?.config) setAdminMode(!!res.config.memory_admin_enabled);
      if (res?.version) setVersion(res.version);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (!inspectedMemoryId) { setInspectedMemory(null); return; }
    if (inspectedMemoryId === 'Consolidation detail' || inspectedMemoryId === 'Triple detail' || inspectedMemoryId === 'JSON') {
      return;
    }
    setLoadingDetail(true);
    fetchJSON(`${API}/memory?id=${encodeURIComponent(inspectedMemoryId)}`)
      .then(res => {
        if (res?.item) {
          setInspectedMemory(prev => (prev?.id === res.item.id) ? { ...prev, ...res.item } : res.item);
        }
      })
      .catch(() => {})
      .finally(() => setLoadingDetail(false));
  }, [inspectedMemoryId]);

  // Fetch session details globally
  useEffect(() => {
    if (!inspectedSessionId) { setInspectedSession(null); return; }
    setLoadingSession(true);
    fetchJSON(`${API}/session?id=${encodeURIComponent(inspectedSessionId)}&limit=200`)
      .then(res => { if (res) setInspectedSession(res); })
      .catch(() => {})
      .finally(() => setLoadingSession(false));
  }, [inspectedSessionId]);

  const renderTabContent = (tab: string, setActiveValue: (v: string) => void) => {
    switch (tab) {
      case 'overview':
        return (
          <OverviewTab
            onInspectMemory={handleInspectMemory}
            onInspectSession={setInspectedSessionId}
            onNavigateToTab={setActiveValue}
            onApplyFilters={(f) => handleApplyFilters(f, setActiveValue)}
          />
        );
      case 'today':
        return (
          <TodayTab
            onInspectMemory={handleInspectMemory}
            onInspectSession={setInspectedSessionId}
            onInspectJson={(data, title) => {
              handleInspectMemory({
                id: title || 'JSON',
                content: JSON.stringify(data, null, 2),
                veracity: 'n/a',
                importance: 0,
                source: 'system',
                scope: 'global',
                status: 'n/a',
                created_at: '',
              });
            }}
          />
        );
      case 'visualiser':
        return <VisualiserTab onInspectMemory={handleInspectMemory} />;
      case 'review':
        return (
          <ReviewTab
            onInspectMemory={handleInspectMemory}
            onInspectSession={setInspectedSessionId}
            onApplyFilters={(f) => handleApplyFilters(f, setActiveValue)}
            adminMode={adminMode}
          />
        );
      case 'memories':
        return (
          <MemoriesTab
            onInspectMemory={handleInspectMemory}
            onInspectSession={setInspectedSessionId}
            adminMode={adminMode}
            filters={memoryFilters}
            setFilters={setMemoryFilters}
          />
        );
      case 'profile':
        return <ContextBankTab />;
      case 'lifecycle':
        return (
          <LifecycleTab
            onInspectMemory={handleInspectMemory}
            onInspectSession={setInspectedSessionId}
            onApplyFilters={(f) => handleApplyFilters(f, setActiveValue)}
          />
        );
      case 'graph':
        return <GraphTab onInspectMemory={handleInspectMemory} onNavigateToTab={setActiveValue} />;
      case 'memoria':
        return <MemoriaTab onInspectSession={setInspectedSessionId} />;
      case 'activity':
        return <HistoryTab onInspectMemory={handleInspectMemory} />;
      case 'settings':
        return <SettingsTab adminMode={adminMode} onToggleAdminMode={setAdminMode} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: 0 }}>
      {/* Status bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
        paddingBottom: '8px',
        borderBottom: '1px solid rgba(234,234,234,0.1)',
        fontSize: '11px',
        fontFamily: 'var(--theme-font-mono)',
        color: 'rgba(234,234,234,0.45)',
      }}>
        <span>v{version}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: adminMode ? '#4ade80' : 'rgba(234,234,234,0.3)',
            display: 'inline-block',
          }} />
          <span>{adminMode ? t('index.adminActive') : t('index.readOnly')}</span>
        </div>
      </div>

      {/* Tab navigation using Hermes SDK Tabs */}
      <Tabs defaultValue="overview" className="">
        {(activeValue: string, setActiveValue: (v: string) => void) => {
          const tab = activeValue || 'overview';
          return (
            <>
              <TabsList style={{ marginBottom: '20px', flexWrap: 'wrap', height: 'auto', gap: '2px' }}>
                {TABS.map(tTab => (
                  <TabsTrigger
                    key={tTab.id}
                    value={tTab.id}
                    active={tab === tTab.id}
                    onClick={() => setActiveValue(tTab.id)}
                  >
                    {t('tabs.' + tTab.id)}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Tab content area */}
              <div style={{ minHeight: 0 }}>
                {renderTabContent(tab, setActiveValue)}
              </div>
            </>
          );
        }}
      </Tabs>

      {/* Global Memory Detail Modal */}
      {inspectedMemoryId && (
        <MemoryDetailModal
          memoryId={inspectedMemoryId}
          memory={inspectedMemory}
          loading={loadingDetail}
          onClose={() => handleInspectMemory(null)}
          onInspectSession={setInspectedSessionId}
        />
      )}

      {/* Global Session Detail Modal */}
      {inspectedSessionId && (
        <SessionDetailModal
          sessionId={inspectedSessionId}
          session={inspectedSession}
          loading={loadingSession}
          onClose={() => setInspectedSessionId(null)}
          onInspectMemoryId={setInspectedMemoryId}
        />
      )}
    </div>
  );
};

// Register plugin tab in the Hermes plugin gateway
if (globalThis.window !== undefined && (globalThis.window as any).__HERMES_PLUGINS__) {
  (globalThis.window as any).__HERMES_PLUGINS__.register('mnemosyne-native-dashboard', MnemosyneDashboard);
}

export default MnemosyneDashboard;
