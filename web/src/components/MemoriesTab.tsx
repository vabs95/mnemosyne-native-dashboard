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

interface MemoriesTabProps {
  onInspectMemory: (id: string) => void;
  adminMode: boolean;
}

/**
 * MemoriesTab Component
 * Renders the main Memory Browser with filters, paged list, detail inspector,
 * and optional admin actions (supersede, expire, veracity, invalidate).
 */
export const MemoriesTab: React.FC<MemoriesTabProps> = ({ onInspectMemory, adminMode }) => {
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<MemoryItem | null>(null);

  const [q, setQ] = useState('');
  const [kind, setKind] = useState('all');
  const [status, setStatus] = useState('active');
  const [sort, setSort] = useState('recent');

  const [supersedeText, setSupersedeText] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { loadMemories(); }, [q, kind, status, sort]);

  async function loadMemories() {
    setLoading(true);
    try {
      const qs = new URLSearchParams({ kind, q, status, sort, limit: '50' }).toString();
      const res = await fetchJSON(`${API}/memories?${qs}`);
      const items = res.items || [];
      setMemories(items);
      setSelected(items.length > 0 ? items[0] : null);
    } catch {
    } finally {
      setLoading(false);
    }
  }

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
        {/* Filters */}
        <Card>
          <CardContent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Input
                  placeholder="Search memories..."
                  value={q}
                  onChange={(e: any) => setQ(e.target.value)}
                  style={{ flex: 1 }}
                />
                <Button onClick={loadMemories} ghost>Refresh</Button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                <Select value={kind} onValueChange={setKind}>
                  <SelectOption value="all">All Tiers</SelectOption>
                  <SelectOption value="working">Working</SelectOption>
                  <SelectOption value="episodic">Episodic</SelectOption>
                </Select>
                <Select value={status} onValueChange={setStatus}>
                  <SelectOption value="active">Active Only</SelectOption>
                  <SelectOption value="expired">Expired Only</SelectOption>
                  <SelectOption value="all">All Statuses</SelectOption>
                </Select>
                <Select value={sort} onValueChange={setSort}>
                  <SelectOption value="recent">Recent</SelectOption>
                  <SelectOption value="importance">Highest Importance</SelectOption>
                  <SelectOption value="oldest">Oldest</SelectOption>
                </Select>
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
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: MG(0.35), fontSize: '13px' }}>No memories matching filters.</div>
          )}
        </div>
      </div>

      {/* Right: Inspector */}
      {selected ? (
        <Card style={{ position: 'sticky', top: '16px' }}>
          <CardHeader><CardTitle>Memory Inspector</CardTitle></CardHeader>
          <CardContent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Content display */}
              <div style={{
                padding: '12px', background: MG(0.04), borderRadius: '4px',
                border: `1px solid ${MG(0.1)}`, fontSize: '13px', lineHeight: '1.6',
              }}>
                {selected.content}
              </div>

              {/* Metadata grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '11px', fontFamily: 'var(--theme-font-mono)' }}>
                {[
                  ['Source', selected.source || 'agent'],
                  ['Scope', selected.scope || 'global'],
                  ['Created', formatDateLabel(selected.created_at, 'unknown')],
                  ['Expires', selected.valid_until ? formatDateLabel(selected.valid_until, 'unknown') : 'Never'],
                ].map(([k, v]) => (
                  <div key={k} style={{ padding: '8px', background: MG(0.04), borderRadius: '4px', border: `1px solid ${MG(0.07)}` }}>
                    <div style={{ color: MG(0.4), marginBottom: '2px' }}>{k}</div>
                    <div style={{ color: MG(0.8) }}>{v}</div>
                  </div>
                ))}
              </div>

              {/* Admin section */}
              {adminMode ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '12px', borderTop: `1px solid ${MG(0.1)}` }}>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: MG(0.45) }}>Admin Actions</div>

                  {/* Veracity buttons */}
                  <div>
                    <div style={{ fontSize: '11px', color: MG(0.45), marginBottom: '6px' }}>Change Veracity</div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {['stated', 'inferred', 'tool'].map(v => (
                        <Button
                          key={v}
                          onClick={() => handleSetVeracity(selected.id, v)}
                          disabled={submitting}
                          outlined={selected.veracity !== v}
                        >
                          {v}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Expiry */}
                  <div>
                    <div style={{ fontSize: '11px', color: MG(0.45), marginBottom: '6px' }}>Set Expiry Date</div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Input type="date" value={expiryDate} onChange={(e: any) => setExpiryDate(e.target.value)} style={{ flex: 1 }} />
                      <Button onClick={() => handleSetExpiry(selected.id)} disabled={submitting}>Apply</Button>
                    </div>
                  </div>

                  {/* Supersede */}
                  <div>
                    <div style={{ fontSize: '11px', color: MG(0.45), marginBottom: '6px' }}>Supersede Memory</div>
                    <textarea
                      placeholder="Replacement memory text..."
                      value={supersedeText}
                      onChange={(e) => setSupersedeText(e.target.value)}
                      style={{
                        width: '100%', padding: '8px', fontSize: '12px',
                        background: MG(0.04), border: `1px solid ${MG(0.15)}`,
                        borderRadius: '4px', color: 'inherit', fontFamily: 'inherit',
                        height: '80px', resize: 'vertical', outline: 'none', boxSizing: 'border-box',
                      }}
                    />
                    <Button onClick={() => handleSupersede(selected.id)} disabled={submitting || !supersedeText.trim()} style={{ width: '100%', marginTop: '6px' }}>
                      Supersede
                    </Button>
                  </div>

                  {/* Invalidate */}
                  <Button
                    destructive
                    onClick={() => handleInvalidate(selected.id)}
                    disabled={submitting}
                    style={{ width: '100%' }}
                  >
                    Invalidate & Expire Memory
                  </Button>
                </div>
              ) : (
                <div style={{
                  padding: '12px', background: MG(0.03), borderRadius: '4px',
                  border: `1px dashed ${MG(0.15)}`, textAlign: 'center',
                  fontSize: '11px', color: MG(0.4), fontFamily: 'var(--theme-font-mono)',
                }}>
                  Enable Admin Mode in Settings to unlock maintenance actions.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div style={{
          padding: '40px', textAlign: 'center', color: MG(0.35),
          border: `1px dashed ${MG(0.15)}`, borderRadius: '4px', fontSize: '13px',
        }}>
          Select a memory from the list to inspect it.
        </div>
      )}
    </div>
  );
};
