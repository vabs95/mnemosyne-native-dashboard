import React, { useState, useEffect } from 'react';
import { fetchJSON, cn, Tabs, TabsList, TabsTrigger } from '@hermes/sdk';

import { OverviewTab } from './components/OverviewTab';
import { TodayTab } from './components/TodayTab';
import { VisualiserTab } from './components/VisualiserTab';
import { MemoriesTab } from './components/MemoriesTab';
import { ContextBankTab } from './components/ContextBankTab';
import { GraphTab } from './components/GraphTab';
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
  metadata?: string;
}

const API = '/api/plugins/mnemosyne-native-dashboard';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'today', label: 'Today' },
  { id: 'memories', label: 'Memories' },
  { id: 'graph', label: 'Graph' },
  { id: 'visualiser', label: 'Visualiser' },
  { id: 'profile', label: 'Context Bank' },
  { id: 'activity', label: 'History' },
  { id: 'settings', label: 'Settings' },
];

/**
 * Main Mnemosyne Dashboard Component
 * Renders within the Hermes plugin content area without any duplicate sidebar.
 * Uses SDK Tabs for in-page navigation and Hermes design tokens throughout.
 */
const MnemosyneDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [adminMode, setAdminMode] = useState(false);
  const [inspectedMemoryId, setInspectedMemoryId] = useState<string | null>(null);
  const [inspectedMemory, setInspectedMemory] = useState<MemoryItem | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    fetchJSON(`${API}/config`).then(res => {
      if (res?.config) setAdminMode(!!res.config.memory_admin_enabled);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (!inspectedMemoryId) { setInspectedMemory(null); return; }
    setLoadingDetail(true);
    fetchJSON(`${API}/memory?id=${encodeURIComponent(inspectedMemoryId)}`)
      .then(res => { if (res?.item) setInspectedMemory(res.item); })
      .catch(() => {})
      .finally(() => setLoadingDetail(false));
  }, [inspectedMemoryId]);

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
        <span>v0.13.1</span>
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
                {tab === 'overview' && <OverviewTab onInspectMemory={setInspectedMemoryId} onNavigateToTab={setActiveValue} />}
                {tab === 'today' && <TodayTab />}
                {tab === 'memories' && <MemoriesTab onInspectMemory={setInspectedMemoryId} adminMode={adminMode} />}
                {tab === 'graph' && <GraphTab onInspectMemory={setInspectedMemoryId} onNavigateToTab={setActiveValue} />}
                {tab === 'visualiser' && <VisualiserTab onInspectMemory={setInspectedMemoryId} />}
                {tab === 'profile' && <ContextBankTab />}
                {tab === 'activity' && <HistoryTab onInspectMemory={setInspectedMemoryId} />}
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
                onClick={() => setInspectedMemoryId(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(234,234,234,0.5)', fontSize: '18px', lineHeight: 1, padding: '0 0 0 12px' }}
              >✕</button>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
              {loadingDetail ? (
                <div style={{ textAlign: 'center', color: 'rgba(234,234,234,0.4)', padding: '40px' }}>Loading memory record...</div>
              ) : inspectedMemory ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Content */}
                  <div>
                    <div style={{ fontSize: '11px', color: 'rgba(234,234,234,0.45)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Content</div>
                    <div style={{
                      padding: '14px', borderRadius: '4px',
                      background: 'rgba(234,234,234,0.04)', border: '1px solid rgba(234,234,234,0.1)',
                      fontSize: '13px', lineHeight: '1.6', whiteSpace: 'pre-wrap',
                    }}>{inspectedMemory.content}</div>
                  </div>

                  {/* Metadata grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                    {[
                      { label: 'Veracity', value: inspectedMemory.veracity },
                      { label: 'Importance', value: safeNumber(inspectedMemory.importance, 2, 'n/a') },
                      { label: 'Source', value: inspectedMemory.source || 'unknown' },
                      { label: 'Scope', value: inspectedMemory.scope || 'session' },
                    ].map(f => (
                      <div key={f.label} style={{ padding: '10px 12px', background: 'rgba(234,234,234,0.04)', border: '1px solid rgba(234,234,234,0.08)', borderRadius: '4px' }}>
                        <div style={{ fontSize: '10px', color: 'rgba(234,234,234,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>{f.label}</div>
                        <div style={{ fontSize: '12px', fontWeight: 600 }}>{f.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Timeline fields */}
                  <div style={{ fontSize: '12px', fontFamily: 'var(--theme-font-mono)', color: 'rgba(234,234,234,0.5)' }}>
                    {[
                      ['Created', formatDateTimeLabel(inspectedMemory.created_at, '')],
                      ['Session', inspectedMemory.session_id],
                      ['Valid Until', formatDateTimeLabel(inspectedMemory.valid_until, '')],
                      ['Status', inspectedMemory.status],
                    ].filter(([, v]) => v).map(([label, value]) => (
                      <div key={label as string} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(234,234,234,0.06)' }}>
                        <span>{label}</span>
                        <span style={{ color: 'rgba(234,234,234,0.75)' }}>{value as string}</span>
                      </div>
                    ))}
                  </div>

                  {inspectedMemory.metadata && (
                    <div>
                      <div style={{ fontSize: '11px', color: 'rgba(234,234,234,0.45)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Metadata</div>
                      <pre style={{ padding: '12px', borderRadius: '4px', background: 'rgba(234,234,234,0.04)', fontSize: '11px', overflowX: 'auto', maxHeight: '160px', fontFamily: 'var(--theme-font-mono)', color: 'rgba(234,234,234,0.6)' }}>
                        {JSON.stringify(inspectedMemory.metadata, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ textAlign: 'center', color: '#f87171', padding: '40px', fontSize: '13px' }}>Memory record could not be found.</div>
              )}
            </div>

            {/* Footer */}
            <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(234,234,234,0.1)', display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={() => setInspectedMemoryId(null)}>Close</Button>
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
