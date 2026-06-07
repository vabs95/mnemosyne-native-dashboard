import React, { useState, useEffect } from 'react';
import { fetchJSON, Card, CardHeader, CardTitle, CardContent, Badge, Button, Input } from '@hermes/sdk';
import { safeNumber, shortId } from '../utils/format';
import { t } from '../utils/i18n';

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

  const [queries, setQueries] = useState({
    facts: '',
    timelines: '',
    instructions: '',
    kg: '',
    preferences: '',
  });

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
              session:{shortId(item.session_id)}
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
              session:{shortId(item.session_id)}
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
          <Badge style={{ background: isActive ? '#065f46' : '#991b1b' }}>{isActive ? t('common.active') : t('common.inactive')}</Badge>
          {item.session_id && item.session_id !== 'default' && (
            <span
              onClick={() => onInspectSession(item.session_id)}
              style={{ fontSize: '10px', fontFamily: 'var(--theme-font-mono)', color: MG(0.6), cursor: 'pointer', textDecoration: 'underline' }}
            >
              session:{shortId(item.session_id)}
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

  const panels = ['overview', 'facts', 'timelines', 'instructions', 'kg', 'preferences'] as const;

  const panelTitleKey: Record<string, string> = {
    overview: 'Overview',
    facts: t('memoria.facts'),
    timelines: t('memoria.timelines'),
    instructions: t('memoria.instructions'),
    kg: t('memoria.kg'),
    preferences: t('memoria.preferences'),
  };

  const panelSearchPlaceholders: Record<string, string> = {
    facts: t('memoria.searchFacts'),
    timelines: t('memoria.searchTimelines'),
    instructions: t('memoria.searchInstructions'),
    kg: t('memoria.searchKg'),
    preferences: t('memoria.searchPreferences'),
  };

  const panelSearchingLabels: Record<string, string> = {
    facts: `${t('memoria.searching')} facts...`,
    timelines: `${t('memoria.searching')} timelines...`,
    instructions: `${t('memoria.searching')} instructions...`,
    kg: `${t('memoria.searching')} KG...`,
    preferences: `${t('memoria.searching')} preferences...`,
  };

  const panelHeaderKeys: Record<string, string> = {
    facts: t('memoria.factsTitle'),
    timelines: t('memoria.timelinesTitle'),
    instructions: t('memoria.instructionsTitle'),
    kg: t('memoria.kgTitle'),
    preferences: t('memoria.preferencesTitle'),
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header */}
      <div>
        <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>{t('memoria.title')}</div>
        <div style={{ fontSize: '12px', color: MG(0.45) }}>{t('memoria.subtitle')}</div>
      </div>

      {/* Subpanels tabs navigation */}
      <div style={{ display: 'flex', gap: '4px', borderBottom: `1px solid ${MG(0.1)}`, paddingBottom: '8px' }}>
        {panels.map(panel => (
          <Button
            key={panel}
            onClick={() => setActivePanel(panel)}
            ghost={activePanel !== panel}
            primary={activePanel === panel}
            style={{ fontSize: '12px', textTransform: 'capitalize', padding: '6px 12px', height: '30px' }}
          >
            {panelTitleKey[panel] || panel}
          </Button>
        ))}
      </div>

      {/* Overview stats cards */}
      {loadingStats ? (
        <div style={{ padding: '20px', color: MG(0.4), textAlign: 'center' }}>{t('memoria.loadingMetrics')}</div>
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
                <CardHeader><CardTitle>{t('memoria.tableCounts')}</CardTitle></CardHeader>
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
                <CardHeader><CardTitle>{t('memoria.topSessions')}</CardTitle></CardHeader>
                <CardContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {stats?.top_sessions && stats.top_sessions.length > 0 ? (
                      stats.top_sessions.map((s, i) => (
                        <div
                          key={i}
                          onClick={() => onInspectSession(s.session_id)}
                          style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', cursor: 'pointer' }}
                        >
                          <span style={{ textDecoration: 'underline', fontFamily: 'var(--theme-font-mono)' }}>{shortId(s.session_id)}</span>
                          <strong>{s.count}</strong>
                        </div>
                      ))
                    ) : (
                      <div style={{ color: MG(0.35), fontSize: '12px' }}>{t('memoria.noSessionData')}</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      )}

      {/* Dynamic panels (facts / timelines / instructions / kg / preferences) */}
      {(['facts', 'timelines', 'instructions', 'kg', 'preferences'] as const).map(panel => (
        activePanel === panel && (
          <div key={panel} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>{panelHeaderKeys[panel]}</span>
              <span style={{ fontSize: '11px', color: MG(0.4) }}>{listData[panel].length} {t('memoria.entries')}</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Input
                placeholder={panelSearchPlaceholders[panel]}
                value={queries[panel]}
                onChange={(e: any) => handleQueryChange(panel, e.target.value)}
                onKeyDown={(e: any) => e.key === 'Enter' && handleSearch(panel)}
                style={{ flex: 1 }}
              />
              <Button onClick={() => handleSearch(panel)} primary>{t('memoria.search')}</Button>
            </div>
            {loadingList ? (
              <div style={{ textAlign: 'center', color: MG(0.4), padding: '40px' }}>{panelSearchingLabels[panel]}</div>
            ) : listData[panel].length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {panel === 'facts' && listData.facts.map(renderFact)}
                {panel === 'timelines' && listData.timelines.map(renderTimeline)}
                {panel === 'instructions' && listData.instructions.map(renderInstruction)}
                {panel === 'preferences' && listData.preferences.map(renderPreference)}
                {panel === 'kg' && (
                  <Card style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                      <thead>
                        <tr style={{ borderBottom: `1px solid ${MG(0.15)}`, textAlign: 'left' }}>
                          <th style={{ padding: '8px 12px' }}>{t('memoria.subject')}</th>
                          <th style={{ padding: '8px 12px' }}>{t('memoria.predicate')}</th>
                          <th style={{ padding: '8px 12px' }}>{t('memoria.object')}</th>
                          <th style={{ padding: '8px 12px' }}>{t('memoria.confidence')}</th>
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
                )}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: MG(0.35) }}>{t('memoria.noData')}</div>
            )}
          </div>
        )
      ))}
    </div>
  );
};
