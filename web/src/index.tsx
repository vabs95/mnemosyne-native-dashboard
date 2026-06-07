import React, { useState, useEffect } from 'react';
import { fetchJSON, cn, Tabs, TabsList, TabsTrigger, Badge } from '@hermes/sdk';

import { OverviewTab } from './components/OverviewTab';
import { TodayTab } from './components/TodayTab';
import { VisualiserTab } from './components/VisualiserTab';
import { ReviewTab } from './components/ReviewTab';
import { MemoriesTab } from './components/MemoriesTab';
import { ContextBankTab } from './components/ContextBankTab';
import { LifecycleTab } from './components/LifecycleTab';
import { GraphTab } from './components/GraphTab';
import { MemoriaTab } from './components/MemoriaTab';
import { HistoryTab } from './components/HistoryTab';
import { SettingsTab } from './components/SettingsTab';
import { Button } from '@hermes/sdk';
import { formatDateTimeLabel, safeNumber } from './utils/format';

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

const API = '/api/plugins/mnemosyne-native-dashboard';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'today', label: 'Today' },
  { id: 'visualiser', label: 'Visualiser' },
  { id: 'review', label: 'Review' },
  { id: 'memories', label: 'Memories' },
  { id: 'profile', label: 'Context Bank' },
  { id: 'lifecycle', label: 'Lifecycle' },
  { id: 'graph', label: 'Graph' },
  { id: 'memoria', label: 'MEMORIA' },
  { id: 'activity', label: 'History' },
  { id: 'settings', label: 'Settings' },
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

/**
 * Main Mnemosyne Dashboard Component
 * Renders within the Hermes plugin content area without any duplicate sidebar.
 * Uses SDK Tabs for in-page navigation and Hermes design tokens throughout.
 */
const MnemosyneDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [adminMode, setAdminMode] = useState(false);
  const [version, setVersion] = useState('0.1.0');
  const [inspectedMemoryId, setInspectedMemoryId] = useState<string | null>(null);
  const [inspectedMemory, setInspectedMemory] = useState<MemoryItem | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // Global Session Inspector State
  const [inspectedSessionId, setInspectedSessionId] = useState<string | null>(null);
  const [inspectedSession, setInspectedSession] = useState<any | null>(null);
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
      setInspectedMemory(prev => (prev && prev.id === memory) ? prev : null);
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
          setInspectedMemory(prev => (prev && prev.id === res.item.id) ? { ...prev, ...res.item } : res.item);
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
          <span>{adminMode ? 'Admin Active' : 'Read-Only'}</span>
        </div>
      </div>

      {/* Tab navigation using Hermes SDK Tabs */}
      <Tabs defaultValue="overview" className="">
        {(activeValue: string, setActiveValue: (v: string) => void) => {
          const tab = activeValue || 'overview';
          return (
            <>
              <TabsList style={{ marginBottom: '20px', flexWrap: 'wrap', height: 'auto', gap: '2px' }}>
                {TABS.map(t => (
                  <TabsTrigger
                    key={t.id}
                    value={t.id}
                    active={tab === t.id}
                    onClick={() => setActiveValue(t.id)}
                  >
                    {t.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Tab content area */}
              <div style={{ minHeight: 0 }}>
                {tab === 'overview' && (
                  <OverviewTab
                    onInspectMemory={handleInspectMemory}
                    onInspectSession={setInspectedSessionId}
                    onNavigateToTab={setActiveValue}
                    onApplyFilters={(f) => handleApplyFilters(f, setActiveValue)}
                  />
                )}
                {tab === 'today' && (
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
                )}
                {tab === 'visualiser' && <VisualiserTab onInspectMemory={handleInspectMemory} />}
                {tab === 'review' && (
                  <ReviewTab
                    onInspectMemory={handleInspectMemory}
                    onInspectSession={setInspectedSessionId}
                    onApplyFilters={(f) => handleApplyFilters(f, setActiveValue)}
                    adminMode={adminMode}
                  />
                )}
                {tab === 'memories' && (
                  <MemoriesTab
                    onInspectMemory={handleInspectMemory}
                    onInspectSession={setInspectedSessionId}
                    adminMode={adminMode}
                    filters={memoryFilters}
                    setFilters={setMemoryFilters}
                  />
                )}
                {tab === 'profile' && <ContextBankTab />}
                {tab === 'lifecycle' && (
                  <LifecycleTab
                    onInspectMemory={handleInspectMemory}
                    onInspectSession={setInspectedSessionId}
                    onApplyFilters={(f) => handleApplyFilters(f, setActiveValue)}
                  />
                )}
                {tab === 'graph' && <GraphTab onInspectMemory={handleInspectMemory} onNavigateToTab={setActiveValue} />}
                {tab === 'memoria' && <MemoriaTab onInspectSession={setInspectedSessionId} />}
                {tab === 'activity' && <HistoryTab onInspectMemory={handleInspectMemory} />}
                {tab === 'settings' && <SettingsTab adminMode={adminMode} onToggleAdminMode={setAdminMode} />}
              </div>
            </>
          );
        }}
      </Tabs>

      {/* Global Memory Detail Modal */}
      {inspectedMemoryId && (
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
                <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(234,234,234,0.4)', marginBottom: '4px' }}>Memory Record</div>
                <div style={{ fontSize: '11px', fontFamily: 'var(--theme-font-mono)', color: 'rgba(234,234,234,0.6)', wordBreak: 'break-all' }}>{inspectedMemoryId}</div>
              </div>
              <button
                onClick={() => handleInspectMemory(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(234,234,234,0.5)', fontSize: '18px', lineHeight: 1, padding: '0 0 0 12px' }}
              >✕</button>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', scrollBehavior: 'smooth' }}>
              {loadingDetail && !inspectedMemory ? (
                <div style={{ textAlign: 'center', color: 'rgba(234,234,234,0.4)', padding: '40px' }}>Loading memory record...</div>
              ) : inspectedMemory ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Trust strip */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <Badge style={{ background: getVeracityColor(inspectedMemory.veracity) }}>
                      {inspectedMemory.veracity} trust (×{safeNumber(inspectedMemory.trust_weight, 2, '1.00')})
                    </Badge>
                    <Badge style={{ background: getLifecycleColor(inspectedMemory.degradation_label) }}>
                      {inspectedMemory.degradation_label ? `${inspectedMemory.degradation_label} tier ${inspectedMemory.degradation_tier}` : 'not degraded'}
                      {inspectedMemory.degradation_weight !== undefined && inspectedMemory.degradation_weight !== null ? ` (×${safeNumber(inspectedMemory.degradation_weight, 2)})` : ''}
                    </Badge>
                    <Badge style={{ background: 'rgba(234,234,234,0.06)', border: '1px solid rgba(234,234,234,0.15)' }}>
                      effective weight: ×{safeNumber(inspectedMemory.effective_memory_weight, 2, '0.00')}
                    </Badge>
                    {inspectedMemory.contaminated && (
                      <Badge style={{ background: '#991b1b', color: '#fca5a5' }}>
                        needs review
                      </Badge>
                    )}
                  </div>

                  {/* Content block */}
                  <div>
                    <div style={{ fontSize: '11px', color: 'rgba(234,234,234,0.45)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Content</div>
                    <div style={{
                      padding: '14px', borderRadius: '4px',
                      background: 'rgba(234,234,234,0.04)', border: '1px solid rgba(234,234,234,0.1)',
                      fontSize: '13px', lineHeight: '1.6', whiteSpace: 'pre-wrap',
                    }}>{inspectedMemory.content}</div>
                  </div>

                  {/* Comprehensive Diagnostics Table */}
                  <div>
                    <div style={{ fontSize: '11px', color: 'rgba(234,234,234,0.45)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Diagnostics</div>
                    <div style={{ fontSize: '12px', fontFamily: 'var(--theme-font-mono)', color: 'rgba(234,234,234,0.5)', display: 'flex', flexDirection: 'column' }}>
                      {[
                        ['Memory ID', inspectedMemory.id],
                        ['Kind / Tier', inspectedMemory.memory_kind || inspectedMemory.tier || 'memory'],
                        ['Source', inspectedMemory.source || 'unknown'],
                        ['Scope', inspectedMemory.scope || 'session'],
                        ['Session ID', inspectedMemory.session_id],
                        ['Status', inspectedMemory.status],
                        ['Recall Count', inspectedMemory.recall_count !== undefined && inspectedMemory.recall_count !== null ? `${inspectedMemory.recall_count}×` : '0×'],
                        ['Last Recalled', formatDateTimeLabel(inspectedMemory.last_recalled, 'never')],
                        ['Created At', formatDateTimeLabel(inspectedMemory.created_at, 'unknown')],
                        ['Degraded At', formatDateTimeLabel(inspectedMemory.degraded_at, 'never')],
                        ['Valid Until', formatDateTimeLabel(inspectedMemory.valid_until, 'none')],
                        ['Superseded By', inspectedMemory.superseded_by || 'none'],
                      ].map(([label, value]) => {
                        if (!value && label !== 'Valid Until' && label !== 'Superseded By' && label !== 'Last Recalled' && label !== 'Degraded At') return null;
                        return (
                          <div key={label as string} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(234,234,234,0.06)' }}>
                            <span>{label}</span>
                            {label === 'Session ID' && value && value !== 'default' ? (
                              <span
                                onClick={() => { handleInspectMemory(null); setInspectedSessionId(value as string); }}
                                style={{ color: 'rgba(234,234,234,0.75)', textDecoration: 'underline', cursor: 'pointer' }}
                              >
                                {value as string}
                              </span>
                            ) : (
                              <span style={{ color: 'rgba(234,234,234,0.75)' }}>{String(value)}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Metadata block */}
                  {(() => {
                    if (!inspectedMemory.metadata) return null;
                    let parsed = inspectedMemory.metadata;
                    if (typeof parsed === 'string') {
                      try {
                        parsed = JSON.parse(parsed);
                      } catch {
                        parsed = { value: parsed };
                      }
                    }
                    if (typeof parsed === 'object' && Object.keys(parsed).length === 0) return null;
                    return (
                      <div>
                        <div style={{ fontSize: '11px', color: 'rgba(234,234,234,0.45)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Metadata</div>
                        <pre style={{
                          padding: '12px', borderRadius: '4px', background: 'rgba(234,234,234,0.04)',
                          fontSize: '11px', overflowX: 'auto', maxHeight: '160px',
                          fontFamily: 'var(--theme-font-mono)', color: 'rgba(234,234,234,0.6)', margin: 0
                        }}>
                          {JSON.stringify(parsed, null, 2)}
                        </pre>
                      </div>
                    );
                  })()}
                </div>
              ) : (
                <div style={{ textAlign: 'center', color: '#f87171', padding: '40px', fontSize: '13px' }}>Memory record could not be found.</div>
              )}
            </div>

            {/* Footer */}
            <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(234,234,234,0.1)', display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={() => handleInspectMemory(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      {/* Global Session Detail Modal */}
      {inspectedSessionId && (
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
                <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(234,234,234,0.4)', marginBottom: '4px' }}>Session Details</div>
                <div style={{ fontSize: '11px', fontFamily: 'var(--theme-font-mono)', color: 'rgba(234,234,234,0.6)', wordBreak: 'break-all' }}>{inspectedSessionId}</div>
              </div>
              <button
                onClick={() => setInspectedSessionId(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(234,234,234,0.5)', fontSize: '18px', lineHeight: 1, padding: '0 0 0 12px' }}
              >✕</button>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
              {loadingSession ? (
                <div style={{ textAlign: 'center', color: 'rgba(234,234,234,0.4)', padding: '40px' }}>Loading session details...</div>
              ) : inspectedSession ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ fontSize: '12px', color: 'rgba(234,234,234,0.5)', fontFamily: 'var(--theme-font-mono)', display: 'flex', gap: '16px', borderBottom: '1px solid rgba(234,234,234,0.08)', paddingBottom: '10px' }}>
                    <span>Memories: <strong>{inspectedSession.counts?.memories ?? 0}</strong></span>
                    <span>Facts: <strong>{inspectedSession.counts?.triples ?? 0}</strong></span>
                    <span>Consolidations: <strong>{inspectedSession.counts?.consolidations ?? 0}</strong></span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {inspectedSession.events && inspectedSession.events.length > 0 ? (
                      inspectedSession.events.map((event: any, idx: number) => (
                        <div
                          key={idx}
                          onClick={() => event.item?.id && setInspectedMemoryId(event.item.id)}
                          style={{
                            padding: '10px 12px', background: 'rgba(234,234,234,0.03)', border: '1px solid rgba(234,234,234,0.07)',
                            borderRadius: '4px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '4px'
                          }}
                        >
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            <Badge>{event.type}</Badge>
                            <span style={{ fontSize: '10px', color: 'rgba(234,234,234,0.4)' }}>{formatDateTimeLabel(event.timestamp)}</span>
                          </div>
                          <div style={{ fontSize: '12px', fontWeight: 600 }}>{event.title}</div>
                          <div style={{ fontSize: '12px', color: 'rgba(234,234,234,0.7)' }}>{event.preview}</div>
                        </div>
                      ))
                    ) : (
                      <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(234,234,234,0.35)', fontSize: '12px' }}>No session events found.</div>
                    )}
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', color: '#f87171', padding: '40px', fontSize: '13px' }}>Session could not be loaded.</div>
              )}
            </div>

            {/* Footer */}
            <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(234,234,234,0.1)', display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={() => setInspectedSessionId(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Register plugin tab in the Hermes plugin gateway
if (typeof window !== 'undefined' && (window as any).__HERMES_PLUGINS__) {
  (window as any).__HERMES_PLUGINS__.register('mnemosyne-native-dashboard', MnemosyneDashboard);
}

export default MnemosyneDashboard;
