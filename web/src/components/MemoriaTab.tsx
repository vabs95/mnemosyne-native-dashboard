import React, { useState, useEffect } from 'react';
import { fetchJSON, Card, CardHeader, CardTitle, CardContent, Badge, Button, Input } from '@hermes/sdk';
import { safeNumber } from '../utils/format';

const API = '/api/plugins/mnemosyne-native-dashboard';
const MG = (o: number) => `rgba(234,234,234,${o})`;

const NAME_MAP: Record<string, string> = {
  facts: 'Facts',
  timelines: 'Timelines',
  instructions: 'Instructions',
  kg: 'KG',
  preferences: 'Preferences',
};

interface TableStats {
  count: number;
}

interface MemoriaStats {
  tables: Record<string, TableStats>;
  top_sessions: Array<{ session_id: string; count: number }>;
}

export const MemoriaTab: React.FC<{
  onInspectSession: (id: string) => void;
}> = ({ onInspectSession }) => {
  const [activePanel, setActivePanel] = useState<'overview' | 'facts' | 'timelines' | 'instructions' | 'kg' | 'preferences'>('overview');
  const [stats, setStats] = useState<MemoriaStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  // Search query states
  const [queries, setQueries] = useState({
    facts: '',
    timelines: '',
    instructions: '',
    kg: '',
    preferences: '',
  });

  // Table lists states
  const [listData, setListData] = useState<Record<string, any[]>>({
    facts: [],
    timelines: [],
    instructions: [],
    kg: [],
    preferences: [],
  });
  const [loadingList, setLoadingList] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (activePanel !== 'overview') {
      fetchTableData(activePanel);
    }
  }, [activePanel]);

  async function fetchStats() {
    setLoadingStats(true);
    try {
      const res = await fetchJSON(`${API}/memoria/stats`);
      setStats(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingStats(false);
    }
  }

  async function fetchTableData(panel: typeof activePanel) {
    if (panel === 'overview') return;
    setLoadingList(true);
    try {
      const q = queries[panel].trim();
      const endpoint = panel === 'kg' ? 'kg' : panel;
      const res = await fetchJSON(`${API}/memoria/${endpoint}?q=${encodeURIComponent(q)}&limit=200`);
      setListData(prev => ({ ...prev, [panel]: res.items || [] }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingList(false);
    }
  }

  const handleSearch = (panel: typeof activePanel) => {
    fetchTableData(panel);
  };

  const handleQueryChange = (panel: keyof typeof queries, value: string) => {
    setQueries(prev => ({ ...prev, [panel]: value }));
  };

  // Render helpers
  const renderFact = (item: any) => {
    const key = item.key || '';
    const value = item.value || '';
    const ctx = item.context_snippet || '';
    return (
      <div key={item.id || key} style={{ padding: '10px 12px', background: MG(0.03), border: `1px solid ${MG(0.07)}`, borderRadius: '4px' }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '6px' }}>
          {item.fact_type && <Badge>{item.fact_type}</Badge>}
          {item.importance && <Badge>imp {Number(item.importance).toFixed(2)}</Badge>}
          {item.session_id && item.session_id !== 'default' && (
            <span
              onClick={() => onInspectSession(item.session_id)}
              style={{ fontSize: '10px', fontFamily: 'var(--theme-font-mono)', color: MG(0.6), cursor: 'pointer', textDecoration: 'underline' }}
            >
              session:{item.session_id.slice(0, 8)}
            </span>
          )}
        </div>
        <div style={{ fontSize: '13px' }}><strong>{key}</strong>{value ? `: ${value}` : ''}</div>
        {ctx && <div style={{ fontSize: '11px', color: MG(0.45), marginTop: '4px', wordBreak: 'break-all' }}>{ctx}</div>}
      </div>
    );
  };

  const renderTimeline = (item: any, idx: number) => {
    const desc = item.description || '';
    const date = item.date || '';
    return (
      <div key={item.id || idx} style={{ padding: '10px 12px', background: MG(0.03), border: `1px solid ${MG(0.07)}`, borderRadius: '4px' }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '6px' }}>
          {date && <Badge>{date}</Badge>}
          {item.source && <Badge>{item.source}</Badge>}
          {item.session_id && item.session_id !== 'default' && (
            <span
              onClick={() => onInspectSession(item.session_id)}
              style={{ fontSize: '10px', fontFamily: 'var(--theme-font-mono)', color: MG(0.6), cursor: 'pointer', textDecoration: 'underline' }}
            >
              session:{item.session_id.slice(0, 8)}
            </span>
          )}
        </div>
        <div style={{ fontSize: '13px' }}>{desc}</div>
      </div>
    );
  };

  const renderInstruction = (item: any) => {
    const instr = item.instruction || '';
    const topic = item.topic || '';
    const ctx = item.context_snippet || '';
    const isActive = item.active == 1;
    return (
      <div key={item.id || instr} style={{ padding: '10px 12px', background: MG(0.03), border: `1px solid ${MG(0.07)}`, borderRadius: '4px' }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '6px' }}>
          {topic && <Badge>{topic}</Badge>}
          <Badge style={{ background: isActive ? '#065f46' : '#991b1b' }}>{isActive ? 'active' : 'inactive'}</Badge>
          {item.session_id && item.session_id !== 'default' && (
            <span
              onClick={() => onInspectSession(item.session_id)}
              style={{ fontSize: '10px', fontFamily: 'var(--theme-font-mono)', color: MG(0.6), cursor: 'pointer', textDecoration: 'underline' }}
            >
              session:{item.session_id.slice(0, 8)}
            </span>
          )}
        </div>
        <div style={{ fontSize: '13px' }}>{instr}</div>
        {ctx && <div style={{ fontSize: '11px', color: MG(0.45), marginTop: '4px', wordBreak: 'break-all' }}>{ctx}</div>}
      </div>
    );
  };

  const renderPreference = (item: any, idx: number) => {
    const content = item.preference || item.instruction || item.description || item.value || JSON.stringify(item);
    const hidden = new Set(['id', 'message_idx', 'updated_msg_idx', 'valid_from_msg_idx', 'valid_to_msg_idx', 'version_id', 'previous_value']);
    const badges = Object.entries(item)
      .filter(([k, v]) => !hidden.has(k) && v !== null && v !== undefined && v !== '' && !['preference', 'instruction', 'description', 'value', 'context_snippet', 'key'].includes(k))
      .map(([k, v]) => `${k}: ${String(v).slice(0, 40)}`);

    return (
      <div key={item.id || idx} style={{ padding: '10px 12px', background: MG(0.03), border: `1px solid ${MG(0.07)}`, borderRadius: '4px' }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '6px' }}>
          {badges.map(b => <Badge key={b}>{b}</Badge>)}
        </div>
        <div style={{ fontSize: '13px' }}>{String(content).slice(0, 500)}</div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header */}
      <div>
        <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>MEMORIA</div>
        <div style={{ fontSize: '12px', color: MG(0.45) }}>Structured fact extraction and retrieval (Memoria 3.x schema)</div>
      </div>

      {/* Subpanels tabs navigation */}
      <div style={{ display: 'flex', gap: '4px', borderBottom: `1px solid ${MG(0.1)}`, paddingBottom: '8px' }}>
        {(['overview', 'facts', 'timelines', 'instructions', 'kg', 'preferences'] as const).map(panel => (
          <Button
            key={panel}
            onClick={() => setActivePanel(panel)}
            ghost={activePanel !== panel}
            primary={activePanel === panel}
            style={{ fontSize: '12px', textTransform: 'capitalize', padding: '6px 12px', height: '30px' }}
          >
            {panel === 'kg' ? 'KG' : panel}
          </Button>
        ))}
      </div>

      {/* Overview stats cards (Only loaded from stats fetch) */}
      {loadingStats ? (
        <div style={{ padding: '20px', color: MG(0.4), textAlign: 'center' }}>Loading Memoria metrics...</div>
      ) : (
        activePanel === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
              {Object.entries(stats?.tables || {}).map(([tbl, info]) => {
                const label = NAME_MAP[tbl.replace('memoria_', '')] || tbl.replace('memoria_', '');
                return (
                  <Card key={tbl}>
                    <CardContent style={{ padding: '12px' }}>
                      <div style={{ fontSize: '10px', textTransform: 'uppercase', color: MG(0.45), letterSpacing: '0.05em' }}>{label}</div>
                      <div style={{ fontSize: '20px', fontWeight: 700, marginTop: '4px' }}>{info.count.toLocaleString()}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {/* Table counts list */}
              <Card>
                <CardHeader><CardTitle>Table Counts</CardTitle></CardHeader>
                <CardContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {Object.entries(stats?.tables || {}).map(([tbl, info]) => {
                      const label = NAME_MAP[tbl.replace('memoria_', '')] || tbl.replace('memoria_', '');
                      return (
                        <div key={tbl} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                          <span>{label}</span>
                          <strong>{info.count.toLocaleString()}</strong>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Top sessions */}
              <Card>
                <CardHeader><CardTitle>Top Sessions</CardTitle></CardHeader>
                <CardContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {stats?.top_sessions && stats.top_sessions.length > 0 ? (
                      stats.top_sessions.map((s, i) => (
                        <div
                          key={i}
                          onClick={() => onInspectSession(s.session_id)}
                          style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', cursor: 'pointer' }}
                        >
                          <span style={{ textDecoration: 'underline', fontFamily: 'var(--theme-font-mono)' }}>{s.session_id.slice(0, 24)}</span>
                          <strong>{s.count}</strong>
                        </div>
                      ))
                    ) : (
                      <div style={{ color: MG(0.35), fontSize: '12px' }}>No session data</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      )}

      {/* Facts Panel */}
      {activePanel === 'facts' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: 600 }}>MEMORIA Facts</span>
            <span style={{ fontSize: '11px', color: MG(0.4) }}>{listData.facts.length} entries</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Input
              placeholder="Search facts..."
              value={queries.facts}
              onChange={(e: any) => handleQueryChange('facts', e.target.value)}
              onKeyDown={(e: any) => e.key === 'Enter' && handleSearch('facts')}
              style={{ flex: 1 }}
            />
            <Button onClick={() => handleSearch('facts')} primary>Search</Button>
          </div>
          {loadingList ? (
            <div style={{ textAlign: 'center', color: MG(0.4), padding: '40px' }}>Searching facts...</div>
          ) : listData.facts.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {listData.facts.map(renderFact)}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: MG(0.35) }}>No entries found.</div>
          )}
        </div>
      )}

      {/* Timelines Panel */}
      {activePanel === 'timelines' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: 600 }}>MEMORIA Timelines</span>
            <span style={{ fontSize: '11px', color: MG(0.4) }}>{listData.timelines.length} entries</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Input
              placeholder="Search timelines..."
              value={queries.timelines}
              onChange={(e: any) => handleQueryChange('timelines', e.target.value)}
              onKeyDown={(e: any) => e.key === 'Enter' && handleSearch('timelines')}
              style={{ flex: 1 }}
            />
            <Button onClick={() => handleSearch('timelines')} primary>Search</Button>
          </div>
          {loadingList ? (
            <div style={{ textAlign: 'center', color: MG(0.4), padding: '40px' }}>Searching timelines...</div>
          ) : listData.timelines.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {listData.timelines.map(renderTimeline)}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: MG(0.35) }}>No entries found.</div>
          )}
        </div>
      )}

      {/* Instructions Panel */}
      {activePanel === 'instructions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: 600 }}>MEMORIA Instructions</span>
            <span style={{ fontSize: '11px', color: MG(0.4) }}>{listData.instructions.length} entries</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Input
              placeholder="Search instructions..."
              value={queries.instructions}
              onChange={(e: any) => handleQueryChange('instructions', e.target.value)}
              onKeyDown={(e: any) => e.key === 'Enter' && handleSearch('instructions')}
              style={{ flex: 1 }}
            />
            <Button onClick={() => handleSearch('instructions')} primary>Search</Button>
          </div>
          {loadingList ? (
            <div style={{ textAlign: 'center', color: MG(0.4), padding: '40px' }}>Searching instructions...</div>
          ) : listData.instructions.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {listData.instructions.map(renderInstruction)}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: MG(0.35) }}>No entries found.</div>
          )}
        </div>
      )}

      {/* KG Panel */}
      {activePanel === 'kg' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: 600 }}>MEMORIA KG</span>
            <span style={{ fontSize: '11px', color: MG(0.4) }}>{listData.kg.length} entries</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Input
              placeholder="Search KG..."
              value={queries.kg}
              onChange={(e: any) => handleQueryChange('kg', e.target.value)}
              onKeyDown={(e: any) => e.key === 'Enter' && handleSearch('kg')}
              style={{ flex: 1 }}
            />
            <Button onClick={() => handleSearch('kg')} primary>Search</Button>
          </div>
          {loadingList ? (
            <div style={{ textAlign: 'center', color: MG(0.4), padding: '40px' }}>Searching KG...</div>
          ) : listData.kg.length > 0 ? (
            <Card style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${MG(0.15)}`, textAlign: 'left' }}>
                    <th style={{ padding: '8px 12px' }}>Subject</th>
                    <th style={{ padding: '8px 12px' }}>Predicate</th>
                    <th style={{ padding: '8px 12px' }}>Object</th>
                    <th style={{ padding: '8px 12px' }}>Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {listData.kg.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: `1px solid ${MG(0.06)}` }}>
                      <td style={{ padding: '8px 12px' }}>{item.subject}</td>
                      <td style={{ padding: '8px 12px' }}>{item.predicate}</td>
                      <td style={{ padding: '8px 12px' }}>{item.object}</td>
                      <td style={{ padding: '8px 12px' }}>{item.confidence !== null && item.confidence !== undefined ? Number(item.confidence).toFixed(2) : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: MG(0.35) }}>No entries found.</div>
          )}
        </div>
      )}

      {/* Preferences Panel */}
      {activePanel === 'preferences' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: 600 }}>MEMORIA Preferences</span>
            <span style={{ fontSize: '11px', color: MG(0.4) }}>{listData.preferences.length} entries</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Input
              placeholder="Search preferences..."
              value={queries.preferences}
              onChange={(e: any) => handleQueryChange('preferences', e.target.value)}
              onKeyDown={(e: any) => e.key === 'Enter' && handleSearch('preferences')}
              style={{ flex: 1 }}
            />
            <Button onClick={() => handleSearch('preferences')} primary>Search</Button>
          </div>
          {loadingList ? (
            <div style={{ textAlign: 'center', color: MG(0.4), padding: '40px' }}>Searching preferences...</div>
          ) : listData.preferences.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {listData.preferences.map(renderPreference)}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: MG(0.35) }}>No entries found.</div>
          )}
        </div>
      )}
    </div>
  );
};
