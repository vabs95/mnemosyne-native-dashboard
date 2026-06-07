import React, { useState, useEffect } from 'react';
import { fetchJSON, Card, CardHeader, CardTitle, CardContent, Badge, Button, Input } from '@hermes/sdk';

const API = '/api/plugins/mnemosyne-native-dashboard';
const MG = (o: number) => `rgba(234,234,234,${o})`;

interface DigestData {
  day: string;
  counts: {
    memories_added: number;
    memories_recalled?: number;
    contaminated_added?: number;
    degraded_added?: number;
    triples_added: number;
    consolidations: number;
  };
  memories_added: any[];
  triples_added: any[];
  consolidations: any[];
  breakdowns?: {
    sources?: Array<{ label: string; count: number }>;
    sessions?: Array<{ label: string; count: number }>;
    veracity?: Array<{ label: string; count: number }>;
    entities?: Array<{ label: string; count: number }>;
  };
}

/**
 * TodayTab Component
 * Renders a daily digest for the selected date.
 */
export const TodayTab: React.FC = () => {
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [digest, setDigest] = useState<DigestData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchJSON(`${API}/digest/today?day=${date}`)
      .then(d => setDigest(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [date]);

  const resetToday = () => setDate(new Date().toISOString().split('T')[0]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '16px', borderBottom: `1px solid ${MG(0.1)}` }}>
        <div>
          <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>Today in Memory</div>
          <div style={{ fontSize: '12px', color: MG(0.45) }}>Daily digest of additions, consolidations, and triples</div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Input type="date" value={date} onChange={(e: any) => setDate(e.target.value)} style={{ width: '160px' }} />
          <Button onClick={resetToday} ghost>Today</Button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', color: MG(0.4), padding: '40px' }}>Loading daily digest...</div>
      ) : (
        <>
          {/* Metric cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {[
              { label: 'Memories Added', value: digest?.counts.memories_added ?? 0 },
              { label: 'Triples Added', value: digest?.counts.triples_added ?? 0 },
              { label: 'Consolidations', value: digest?.counts.consolidations ?? 0 },
            ].map(c => (
              <Card key={c.label}>
                <CardContent>
                  <div style={{ textAlign: 'center', padding: '8px 0' }}>
                    <div style={{ fontSize: '11px', color: MG(0.45), textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>{c.label}</div>
                    <div style={{ fontSize: '32px', fontWeight: 700 }}>{c.value}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Memories logged */}
          <Card>
            <CardHeader><CardTitle>Memories Logged</CardTitle></CardHeader>
            <CardContent>
              {digest?.memories_added && digest.memories_added.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {digest.memories_added.map((m: any) => (
                    <div
                      key={m.id}
                      style={{
                        padding: '10px 12px', borderRadius: '4px',
                        background: MG(0.03), border: `1px solid ${MG(0.07)}`,
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px',
                      }}
                    >
                      <span style={{ fontSize: '13px', flex: 1 }}>{m.content}</span>
                      <Badge>{m.veracity}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ color: MG(0.35), fontSize: '12px', textAlign: 'center', padding: '20px' }}>No memories recorded on this date.</div>
              )}
            </CardContent>
          </Card>

          {/* Triples logged */}
          {digest?.triples_added && digest.triples_added.length > 0 && (
            <Card>
              <CardHeader><CardTitle>Triples Extracted</CardTitle></CardHeader>
              <CardContent>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {digest.triples_added.map((t: any, i: number) => (
                    <div key={t.id || i} style={{ padding: '8px 12px', fontSize: '12px', fontFamily: 'var(--theme-font-mono)', background: MG(0.03), borderRadius: '4px', border: `1px solid ${MG(0.07)}` }}>
                      <span style={{ color: MG(0.75) }}>{t.subject}</span>{' '}
                      <span style={{ color: MG(0.4) }}>{t.predicate}</span>{' '}
                      <span style={{ color: MG(0.75) }}>{t.object}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {digest?.breakdowns && (
            <Card>
              <CardHeader><CardTitle>Breakdowns</CardTitle></CardHeader>
              <CardContent>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '16px' }}>
                  {[
                    ['Sources', digest.breakdowns.sources],
                    ['Sessions', digest.breakdowns.sessions],
                    ['Veracity', digest.breakdowns.veracity],
                    ['Entities', digest.breakdowns.entities],
                  ].map(([label, rows]) => (
                    <div key={label as string}>
                      <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: MG(0.4), marginBottom: '8px' }}>{label}</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {(rows || []).slice(0, 6).map((row: any) => (
                          <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', fontSize: '12px' }}>
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.label || 'unknown'}</span>
                            <Badge>{row.count}</Badge>
                          </div>
                        ))}
                        {!(rows || []).length && <div style={{ color: MG(0.35), fontSize: '12px' }}>No data</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};
