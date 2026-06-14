import React, { useState, useEffect } from 'react';
import { fetchJSON, Card, CardHeader, CardTitle, CardContent, Badge } from '@hermes/sdk';
import { safeNumber } from '@/utils/format';
import { t } from '@/utils/i18n';
import { API_BASE as API } from '@/types';

const MG = (o: number) => `rgba(234,234,234,${o})`;

interface ProfileSection {
  name: string;
  count: number;
  items: Array<{
    id: string;
    label: string;
    count: number;
    preview?: string;
    importance?: number;
    confidence_pct?: number;
    confidence_label?: string;
    context_type?: string;
    source?: string;
  }>;
}

interface ContextBankTabProps {
  onApplyFilters?: (filters: Record<string, string>) => void;
}

/**
 * ContextBankTab Component
 * Renders read-only inferred profile banks and topic models.
 */
export const ContextBankTab: React.FC<ContextBankTabProps> = ({ onApplyFilters }) => {
  const [sections, setSections] = useState<ProfileSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJSON(`${API}/profile/inferred?limit=10`)
      .then(d => setSections(d?.sections || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: '32px', color: MG(0.4), textAlign: 'center' }}>{t('contextBank.loading')}</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>{t('contextBank.title')}</div>
        <div style={{ fontSize: '12px', color: MG(0.45) }}>{t('contextBank.subtitle')}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
        {sections.length > 0 ? (
          sections.map((section) => (
            <Card key={section.name}>
              <CardHeader>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <CardTitle style={{ textTransform: 'capitalize' }}>{section.name.replace(/_/g, ' ')}</CardTitle>
                  <Badge>{section.count} {section.count === 1 ? t('contextBank.item') : t('contextBank.items')}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {section.items && section.items.length > 0 ? (
                    section.items.map((item) => (
                      <div key={item.id} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '8px 10px', background: MG(0.04), borderRadius: '4px',
                        border: `1px solid ${MG(0.07)}`, fontSize: '12px',
                      }}>
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0, paddingRight: '8px' }}>
                          <span style={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</span>
                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px', alignItems: 'center' }}>
                            {item.context_type && <Badge style={{ textTransform: 'capitalize' }}>{item.context_type}</Badge>}
                            {item.confidence_label && <Badge style={{ textTransform: 'capitalize' }}>{item.confidence_label}</Badge>}
                            {item.source && (
                              onApplyFilters ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const src = item.source || '';
                                    const isSession = src.startsWith('sess_') || src.length === 36;
                                    onApplyFilters(isSession ? { session_id: src } : { source: src });
                                  }}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    padding: 0,
                                    font: 'inherit',
                                    fontSize: '10px',
                                    color: MG(0.6),
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                  }}
                                >
                                  {item.source}
                                </button>
                              ) : (
                                <span style={{ fontSize: '10px', color: MG(0.45) }}>{item.source}</span>
                              )
                            )}
                          </div>
                          {item.preview && <span style={{ fontSize: '11px', color: MG(0.4), overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '4px' }}>{item.preview}</span>}
                        </div>
                        <div style={{ fontSize: '10px', fontFamily: 'var(--theme-font-mono)', color: MG(0.45), whiteSpace: 'nowrap', display: 'flex', gap: '8px' }}>
                          <span>{t('contextBank.countLabel')}{item.count}</span>
                          <span>{t('contextBank.weightLabel')}{safeNumber(item.confidence_pct ?? item.importance ?? item.count, 2, 'n/a')}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ fontSize: '12px', color: MG(0.35), textAlign: 'center', padding: '12px' }}>{t('contextBank.noActiveContext')}</div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div style={{ gridColumn: 'span 2', padding: '20px', textAlign: 'center', color: MG(0.35), border: `1px dashed ${MG(0.15)}`, borderRadius: '4px', fontSize: '12px' }}>
            {t('contextBank.noRecords')}
          </div>
        )}
      </div>
    </div>
  );
};
