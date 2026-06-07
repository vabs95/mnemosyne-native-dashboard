import React, { useState, useEffect } from 'react';
import { fetchJSON, Card, CardHeader, CardTitle, CardContent, Badge, Button, Input, Select, SelectOption } from '@hermes/sdk';
import { formatDateLabel, safeNumber } from '../utils/format';

const API = '/api/plugins/mnemosyne-native-dashboard';
const MG = (o: number) => `rgba(234,234,234,${o})`;

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

interface StatsData {
  by_source?: Array<{ source: string; count: number }>;
  by_scope?: Array<{ scope: string; count: number }>;
  by_session?: Array<{ session_id: string; count: number }>;
}

interface MemoriesTabProps {
  onInspectMemory: (id: string) => void;
  onInspectSession: (id: string) => void;
  adminMode: boolean;
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
}

export const MemoriesTab: React.FC<MemoriesTabProps> = ({ onInspectMemory, onInspectSession, adminMode, filters, setFilters }) => {
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<MemoryItem | null>(null);

  // Lists for dropdown options (fetched from stats)
  const [statsData, setStatsData] = useState<StatsData | null>(null);

  const [supersedeText, setSupersedeText] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Load dropdown lists on mount
  useEffect(() => {
    fetchJSON(`${API}/stats`)
      .then(res => setStatsData(res))
      .catch(console.error);
  }, []);

  // Fetch memories when filters change
  useEffect(() => {
    loadMemories();
  }, [filters]);

  async function loadMemories() {
    setLoading(true);
    try {
      const queryParams: any = {
        kind: filters.kind || 'all',
        q: (filters.q || '').trim(),
        status: filters.status || 'active',
        sort: filters.sort || 'recent',
        source: filters.source || '',
        scope: filters.scope || '',
        session_id: filters.session_id || '',
        veracity: filters.veracity || '',
        degradation_tier: filters.degradation_tier || '',
        contaminated_only: filters.trust_preset === 'contaminated' ? '1' : '',
        degraded_only: filters.trust_preset === 'degraded' ? '1' : '',
        due_for_degradation: filters.trust_preset === 'due' ? '1' : '',
        limit: '150',
      };

      // Clean up empty parameters
      Object.keys(queryParams).forEach(k => {
        if (queryParams[k] === '') delete queryParams[k];
      });

      const qs = new URLSearchParams(queryParams).toString();
      const res = await fetchJSON(`${API}/memories?${qs}`);
      const items = res.items || [];
      setMemories(items);
      setSelected(items.length > 0 ? items[0] : null);
    } catch {
    } finally {
      setLoading(false);
    }
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
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
  };

  async function adminAction(url: string, body: object) {
    setSubmitting(true);
    try {
      await fetchJSON(url, { method: 'POST', body: JSON.stringify(body) });
      loadMemories();
    } catch (err: any) {
      alert(err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  }

  const handleInvalidate = (id: string) => {
    if (confirm('Invalidate this memory?')) adminAction(`${API}/admin/memory/invalidate`, { memory_id: id, backup: true });
  };
  const handleSupersede = (id: string) => {
    if (supersedeText.trim()) adminAction(`${API}/admin/memory/supersede`, { memory_id: id, content: supersedeText, backup: true });
  };
  const handleSetExpiry = (id: string) => adminAction(`${API}/admin/memory/expiry`, { memory_id: id, valid_until: expiryDate, backup: true });
  const handleSetVeracity = (id: string, v: string) => adminAction(`${API}/admin/memory/veracity`, { memory_id: id, veracity: v, backup: true });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '16px', alignItems: 'start' }}>
      {/* Left: Filters + List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Expanded Filters */}
        <Card>
          <CardContent style={{ padding: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Input
                  placeholder="Search memories..."
                  value={filters.q || ''}
                  onChange={(e: any) => handleFilterChange('q', e.target.value)}
                  style={{ flex: 1 }}
                />
                <Button onClick={loadMemories} ghost>Refresh</Button>
                <Button onClick={handleClearFilters} ghost>Clear</Button>
              </div>

              {/* Advanced filter dropdowns */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '9px', color: MG(0.4), textTransform: 'uppercase' }}>Kind</span>
                  <Select value={filters.kind || 'all'} onValueChange={(val: string) => handleFilterChange('kind', val)}>
                    <SelectOption value="all">All Tiers</SelectOption>
                    <SelectOption value="working">Working</SelectOption>
                    <SelectOption value="episodic">Episodic</SelectOption>
                  </Select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '9px', color: MG(0.4), textTransform: 'uppercase' }}>Status</span>
                  <Select value={filters.status || 'active'} onValueChange={(val: string) => handleFilterChange('status', val)}>
                    <SelectOption value="active">Active Only</SelectOption>
                    <SelectOption value="expired">Expired Only</SelectOption>
                    <SelectOption value="all">All Statuses</SelectOption>
                  </Select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '9px', color: MG(0.4), textTransform: 'uppercase' }}>Sort</span>
                  <Select value={filters.sort || 'recent'} onValueChange={(val: string) => handleFilterChange('sort', val)}>
                    <SelectOption value="recent">Recent</SelectOption>
                    <SelectOption value="importance">Importance</SelectOption>
                    <SelectOption value="oldest">Oldest</SelectOption>
                  </Select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '9px', color: MG(0.4), textTransform: 'uppercase' }}>Trust Preset</span>
                  <Select value={filters.trust_preset || ''} onValueChange={(val: string) => handleFilterChange('trust_preset', val)}>
                    <SelectOption value="">All confidence</SelectOption>
                    <SelectOption value="contaminated">needs review</SelectOption>
                    <SelectOption value="degraded">degraded only</SelectOption>
                    <SelectOption value="due">due for degradation</SelectOption>
                  </Select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '9px', color: MG(0.4), textTransform: 'uppercase' }}>Veracity</span>
                  <Select value={filters.veracity || ''} onValueChange={(val: string) => handleFilterChange('veracity', val)}>
                    <SelectOption value="">All trust</SelectOption>
                    <SelectOption value="stated">stated</SelectOption>
                    <SelectOption value="inferred">inferred</SelectOption>
                    <SelectOption value="tool">tool</SelectOption>
                    <SelectOption value="imported">imported</SelectOption>
                    <SelectOption value="unknown">unknown</SelectOption>
                  </Select>
                </div>
              </div>

              {/* Dynamic list selects (Source, Scope, Session) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '9px', color: MG(0.4), textTransform: 'uppercase' }}>Source</span>
                  <Select value={filters.source || ''} onValueChange={(val: string) => handleFilterChange('source', val)}>
                    <SelectOption value="">All Sources</SelectOption>
                    {(statsData?.by_source || []).map(s => (
                      <SelectOption key={s.source} value={s.source}>{s.source || 'unknown'}</SelectOption>
                    ))}
                  </Select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '9px', color: MG(0.4), textTransform: 'uppercase' }}>Scope</span>
                  <Select value={filters.scope || ''} onValueChange={(val: string) => handleFilterChange('scope', val)}>
                    <SelectOption value="">All Scopes</SelectOption>
                    {(statsData?.by_scope || []).map(s => (
                      <SelectOption key={s.scope} value={s.scope}>{s.scope || 'unknown'}</SelectOption>
                    ))}
                  </Select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '9px', color: MG(0.4), textTransform: 'uppercase' }}>Session</span>
                  <Select value={filters.session_id || ''} onValueChange={(val: string) => handleFilterChange('session_id', val)}>
                    <SelectOption value="">All Sessions</SelectOption>
                    {(statsData?.by_session || []).map(s => (
                      <SelectOption key={s.session_id} value={s.session_id}>{s.session_id.slice(0, 15)}...</SelectOption>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Memory list */}
        <div style={{ maxHeight: '600px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: MG(0.4) }}>Loading memory list...</div>
          ) : memories.length > 0 ? (
            memories.map(m => (
              <div
                key={m.id}
                onClick={() => setSelected(m)}
                style={{
                  padding: '10px 12px', borderRadius: '4px', cursor: 'pointer',
                  background: selected?.id === m.id ? MG(0.08) : MG(0.03),
                  border: `1px solid ${selected?.id === m.id ? MG(0.2) : MG(0.07)}`,
                  transition: 'background 0.1s',
                }}
                onMouseEnter={e => { if (selected?.id !== m.id) e.currentTarget.style.background = MG(0.06); }}
                onMouseLeave={e => { if (selected?.id !== m.id) e.currentTarget.style.background = MG(0.03); }}
              >
                <div style={{ fontSize: '12px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', marginBottom: '6px' }}>{m.content}</div>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <Badge>{m.veracity}</Badge>
                  <span style={{ fontSize: '10px', fontFamily: 'var(--theme-font-mono)', color: MG(0.4) }}>imp:{safeNumber(m.importance, 2, 'n/a')}</span>
                  {m.scope && <span style={{ fontSize: '10px', fontFamily: 'var(--theme-font-mono)', color: MG(0.4) }}>{m.scope}</span>}
                  {m.session_id && (
                    <span
                      onClick={e => { e.stopPropagation(); onInspectSession(m.session_id!); }}
                      style={{ fontSize: '10px', fontFamily: 'var(--theme-font-mono)', color: MG(0.6), cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      session:{m.session_id.slice(0, 8)}
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: MG(0.35), fontSize: '13px' }}>No memories matching filters.</div>
          )}
        </div>
      </div>

      {/* Right Panel: Detail Inspector */}
      <Card style={{ alignSelf: 'stretch', minHeight: '300px' }}>
        <CardHeader>
          <CardTitle>Memory Inspector</CardTitle>
        </CardHeader>
        <CardContent>
          {selected ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '10px', color: MG(0.4), textTransform: 'uppercase' }}>Memory content</span>
                <div style={{
                  padding: '10px', background: MG(0.03), border: `1px solid ${MG(0.07)}`,
                  borderRadius: '4px', fontSize: '13px', lineHeight: '1.5', whiteSpace: 'pre-wrap', marginTop: '4px',
                }}>{selected.content}</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
                <div>ID: <span style={{ fontFamily: 'var(--theme-font-mono)', color: MG(0.5) }}>{selected.id.slice(0, 8)}</span></div>
                <div>Status: <strong>{selected.status}</strong></div>
                <div>Veracity: <strong>{selected.veracity}</strong></div>
                <div>Importance: <strong>{safeNumber(selected.importance, 2)}</strong></div>
                <div>Source: <strong>{selected.source || 'unknown'}</strong></div>
                <div>Scope: <strong>{selected.scope || 'session'}</strong></div>
                {selected.session_id && (
                  <div style={{ gridColumn: 'span 2' }}>
                    Session:{' '}
                    <span
                      onClick={() => onInspectSession(selected.session_id!)}
                      style={{ textDecoration: 'underline', cursor: 'pointer', color: MG(0.7), fontFamily: 'var(--theme-font-mono)' }}
                    >
                      {selected.session_id}
                    </span>
                  </div>
                )}
                <div style={{ gridColumn: 'span 2' }}>Created: <span>{formatDateLabel(selected.created_at)}</span></div>
                {selected.valid_until && <div style={{ gridColumn: 'span 2' }}>Expires: <span>{formatDateLabel(selected.valid_until)}</span></div>}
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                <Button onClick={() => onInspectMemory(selected.id)} primary>View Details</Button>
              </div>

              {/* Maintenance tools (Admin only) */}
              {adminMode && (
                <div style={{ borderTop: `1px solid ${MG(0.1)}`, paddingTop: '12px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', color: MG(0.45) }}>Admin Actions</div>

                  {/* Supersede */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <Input
                      placeholder="Replacement text content..."
                      value={supersedeText}
                      onChange={(e: any) => setSupersedeText(e.target.value)}
                    />
                    <Button onClick={() => handleSupersede(selected.id)} disabled={submitting || !supersedeText.trim()} primary>Supersede (Replace)</Button>
                  </div>

                  {/* Trust */}
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                      <Select value="" onValueChange={(val: string) => val && handleSetVeracity(selected.id, val)} disabled={submitting}>
                        <SelectOption value="">Adjust Veracity/Trust</SelectOption>
                        <SelectOption value="stated">stated</SelectOption>
                        <SelectOption value="inferred">inferred</SelectOption>
                        <SelectOption value="tool">tool</SelectOption>
                        <SelectOption value="imported">imported</SelectOption>
                        <SelectOption value="unknown">unknown</SelectOption>
                      </Select>
                    </div>
                  </div>

                  {/* Expiry */}
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <Input
                      type="datetime-local"
                      value={expiryDate}
                      onChange={(e: any) => setExpiryDate(e.target.value)}
                      style={{ flex: 1, height: '36px' }}
                    />
                    <Button onClick={() => handleSetExpiry(selected.id)} disabled={submitting} ghost>Set Expiry</Button>
                  </div>

                  {/* Invalidate */}
                  <Button onClick={() => handleInvalidate(selected.id)} disabled={submitting} style={{ background: '#ef4444', color: '#fff', marginTop: '4px' }}>Expire (Invalidate)</Button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ color: MG(0.4), fontSize: '13px', textAlign: 'center', padding: '40px' }}>Select a memory from the list to inspect.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
