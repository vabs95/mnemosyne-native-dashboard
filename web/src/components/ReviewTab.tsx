import React, { useState, useEffect } from 'react';
import { fetchJSON, Card, CardContent, Badge, Button, Input, Select, SelectOption, Checkbox } from '@hermes/sdk';
import { formatDateTimeLabel, safeNumber, shortId } from '@/utils/format';
import { t } from '@/utils/i18n';
import { MemoryItem, API_BASE as API } from '@/types';

const MG = (o: number) => `rgba(234,234,234,${o})`;
const VERACITY_COLOR: Record<string, string> = {
  stated: '#065f46',
  inferred: '#1e3a8a',
  tool: '#581c87',
  imported: '#78350f',
};

interface ReviewCard {
  key: string;
  title: string;
  count: number;
  description?: string;
}

interface ReviewTabProps {
  onInspectMemory: (memory: any) => void;
  onInspectSession: (id: string) => void;
  onApplyFilters: (filters: any) => void;
  adminMode: boolean;
}

export const ReviewTab: React.FC<ReviewTabProps> = ({ onInspectMemory, onInspectSession, onApplyFilters, adminMode }) => {
  const [cards, setCards] = useState<ReviewCard[]>([]);
  const [selectedQueue, setSelectedQueue] = useState('contaminated');
  const [searchQuery, setSearchQuery] = useState('');
  const [minImportance, setMinImportance] = useState('0');
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<MemoryItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [nextOffset, setNextOffset] = useState<number | null>(null);

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);

  const [expiryDate, setExpiryDate] = useState('');

  useEffect(() => {
    loadReviewQueues(false);
  }, [selectedQueue]);

  async function loadReviewQueues(append = false) {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        queue: selectedQueue,
        limit: '100',
        offset: append ? String(offset) : '0',
      });
      if (searchQuery.trim()) params.append('q', searchQuery.trim());
      if (Number(minImportance) > 0) params.append('min_importance', minImportance);

      const data = await fetchJSON(`${API}/review?${params.toString()}`);
      setCards(data.cards || []);

      const newItems = data.queues?.[selectedQueue]?.items || [];
      if (append) {
        setItems(prev => {
          const map = new Map(prev.map(item => [item.id, item]));
          newItems.forEach((item: MemoryItem) => map.set(item.id, item));
          return Array.from(map.values());
        });
      } else {
        setItems(newItems);
        setSelectedIds(new Set());
      }

      setTotalCount(data.total || 0);
      setHasMore(!!data.has_more);
      setNextOffset(data.next_offset === undefined ? null : data.next_offset);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleApplyFilters = () => {
    setOffset(0);
    loadReviewQueues(false);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setMinImportance('0');
    setOffset(0);
    setLoading(true);
    const params = new URLSearchParams({ queue: selectedQueue, limit: '100', offset: '0' });
    fetchJSON(`${API}/review?${params.toString()}`)
      .then(data => {
        setCards(data.cards || []);
        setItems(data.queues?.[selectedQueue]?.items || []);
        setSelectedIds(new Set());
        setTotalCount(data.total || 0);
        setHasMore(!!data.has_more);
        setNextOffset(data.next_offset === undefined ? null : data.next_offset);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleLoadMore = () => {
    if (nextOffset !== null) {
      setOffset(nextOffset);
      setTimeout(() => loadReviewQueues(true), 0);
    }
  };

  const handleSelectToggle = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelectAllToggle = () => {
    if (items.every(x => selectedIds.has(x.id))) {
      setSelectedIds(prev => {
        const next = new Set(prev);
        items.forEach(x => next.delete(x.id));
        return next;
      });
    } else {
      setSelectedIds(prev => {
        const next = new Set(prev);
        items.forEach(x => next.add(x.id));
        return next;
      });
    }
  };

  async function runBulkAction(url: string, getBody: (id: string) => object) {
    setSubmitting(true);
    try {
      const ids = Array.from(selectedIds);
      for (const id of ids) {
        await fetchJSON(url, { method: 'POST', body: JSON.stringify(getBody(id)) });
      }
      setSelectedIds(new Set());
      loadReviewQueues(false);
    } catch (err: any) {
      alert(err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  }

  const handleConfirmSelected = () => {
    if (!selectedIds.size) return;
    if (confirm(`Mark ${selectedIds.size} selected memories as stated?`)) {
      runBulkAction(`${API}/admin/memory/veracity`, id => ({ memory_id: id, veracity: 'stated', backup: true }));
    }
  };

  const handleSetTrust = (v: string) => {
    if (!selectedIds.size || !v) return;
    runBulkAction(`${API}/admin/memory/veracity`, id => ({ memory_id: id, veracity: v, backup: true }));
  };

  const handleSetExpiry = () => {
    if (!selectedIds.size) return;
    runBulkAction(`${API}/admin/memory/expiry`, id => ({ memory_id: id, valid_until: expiryDate, backup: true }));
  };

  const handleExpireSelected = () => {
    if (!selectedIds.size) return;
    if (confirm(`Expire ${selectedIds.size} selected memories?`)) {
      runBulkAction(`${API}/admin/memory/invalidate`, id => ({ memory_id: id, backup: true }));
    }
  };

  const currentQueueInfo = cards.find(c => c.key === selectedQueue);

  const renderReviewListContent = () => {
    if (loading && items.length === 0) {
      return <div style={{ padding: '60px', textAlign: 'center', color: MG(0.4) }}>{t('review.loadingTriage')}</div>;
    }
    if (items.length === 0) {
      return (
        <div style={{ padding: '20px', border: `1px dashed ${MG(0.15)}`, borderRadius: '4px', textAlign: 'center', color: MG(0.35), fontSize: '12px' }}>
          {t('review.noItems')}
        </div>
      );
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items.map(m => (
          <div
            key={m.id}
            style={{
              padding: '12px',
              borderRadius: '4px',
              background: MG(0.03),
              border: `1px solid ${MG(0.07)}`,
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = MG(0.07))}
            onMouseLeave={e => (e.currentTarget.style.background = MG(0.03))}
          >
            {adminMode && (
              <Checkbox
                checked={selectedIds.has(m.id)}
                onCheckedChange={() => handleSelectToggle(m.id)}
                style={{ marginTop: '4px', cursor: 'pointer' }}
              />
            )}

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center', marginBottom: '8px' }}>
                <Badge>{m.memory_kind || 'memory'}</Badge>
                <Badge>{m.status || 'active'}</Badge>
                <Badge style={{ background: VERACITY_COLOR[String(m.veracity).toLowerCase()] || MG(0.1) }}>{m.veracity}</Badge>
                {m.degradation_label && <Badge>{m.degradation_label}</Badge>}
                <span style={{ fontSize: '11px', color: MG(0.4) }}>imp:{safeNumber(m.importance, 2)}</span>
                {m.session_id && (
                  <button
                    type="button"
                    onClick={() => onInspectSession(m.session_id!)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      font: 'inherit',
                      fontSize: '11px',
                      fontFamily: 'var(--theme-font-mono)',
                      color: MG(0.6),
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    session:{shortId(m.session_id)}
                  </button>
                )}
                <span style={{ fontSize: '11px', color: MG(0.4) }}>{formatDateTimeLabel(m.created_at)}</span>
              </div>

              <button
                type="button"
                onClick={() => onInspectMemory(m)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  font: 'inherit',
                  fontSize: '13px',
                  lineHeight: '1.6',
                  cursor: 'pointer',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  color: 'inherit',
                }}
              >
                {m.content}
              </button>

              {/* Reason badges */}
              <div style={{ display: 'flex', gap: '4px', marginTop: '8px', flexWrap: 'wrap' }}>
                {(selectedQueue === 'contaminated' || m.veracity !== 'stated') && <span style={{ fontSize: '10px', background: 'rgba(239,68,68,0.1)', color: '#f87171', padding: '2px 6px', borderRadius: '2px' }}>Needs review</span>}
                {(selectedQueue === 'important_contaminated' || m.importance >= 0.75) && <span style={{ fontSize: '10px', background: 'rgba(245,158,11,0.1)', color: '#fbbf24', padding: '2px 6px', borderRadius: '2px' }}>High importance</span>}
                {(selectedQueue === 'degraded' || (m.degradation_tier && m.degradation_tier > 1)) && <span style={{ fontSize: '10px', background: 'rgba(96,165,250,0.1)', color: '#60a5fa', padding: '2px 6px', borderRadius: '2px' }}>Degraded</span>}
                {selectedQueue === 'due_degradation' && <span style={{ fontSize: '10px', background: 'rgba(167,139,250,0.1)', color: '#a78bfa', padding: '2px 6px', borderRadius: '2px' }}>Due for degradation</span>}
              </div>
            </div>
          </div>
        ))}

        {hasMore && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
            <Button onClick={handleLoadMore} primary>{t('review.loadMore')}</Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header */}
      <div>
        <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>{t('review.title')}</div>
        <div style={{ fontSize: '12px', color: MG(0.45) }}>{t('review.subtitle')}</div>
      </div>

      {/* Stats Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        {cards.map(card => (
          <button
            key={card.key}
            type="button"
            onClick={() => { setSelectedQueue(card.key); setOffset(0); }}
            style={{
              padding: '12px',
              borderRadius: '4px',
              background: selectedQueue === card.key ? MG(0.08) : MG(0.03),
              border: `1px solid ${selectedQueue === card.key ? MG(0.2) : MG(0.07)}`,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '80px',
              width: '100%',
              font: 'inherit',
              color: 'inherit',
              textAlign: 'left',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => { if (selectedQueue !== card.key) e.currentTarget.style.background = MG(0.06); }}
            onMouseLeave={e => { if (selectedQueue !== card.key) e.currentTarget.style.background = MG(0.03); }}
          >
            <div style={{ display: 'flex', width: '100%', flexDirection: 'column', justifyContent: 'space-between', height: '100%', alignItems: 'stretch' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: MG(0.45) }}>{card.title}</div>
              <div style={{ fontSize: '24px', fontWeight: 700, marginTop: '8px' }}>{card.count.toLocaleString()}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <Card>
        <CardContent>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '160px' }}>
              <span style={{ fontSize: '10px', color: MG(0.4), textTransform: 'uppercase' }}>{t('review.title')}</span>
              <Select value={selectedQueue} onValueChange={(val: any) => { setSelectedQueue(val); setOffset(0); }}>
                {cards.map(c => (
                  <SelectOption key={c.key} value={c.key}>{c.title} ({c.count})</SelectOption>
                ))}
              </Select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, minWidth: '200px' }}>
              <span style={{ fontSize: '10px', color: MG(0.4), textTransform: 'uppercase' }}>Search</span>
              <Input
                placeholder={t('review.searchPlaceholder')}
                value={searchQuery}
                onChange={(e: any) => setSearchQuery(e.target.value)}
                onKeyDown={(e: any) => e.key === 'Enter' && handleApplyFilters()}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '150px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: MG(0.4), textTransform: 'uppercase' }}>
                <span>{t('review.minImportance')}</span>
                <span style={{ fontFamily: 'var(--theme-font-mono)' }}>
                  {Number(minImportance) > 0 ? `≥ ${safeNumber(minImportance, 2)}` : 'any'}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={minImportance}
                onChange={(e) => setMinImportance(e.target.value)}
                style={{ width: '100%', height: '36px', background: 'none', cursor: 'pointer' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '6px', alignSelf: 'flex-end', height: '36px' }}>
              <Button onClick={handleApplyFilters} primary>{t('review.applyFilters')}</Button>
              <Button onClick={handleClearFilters} ghost>{t('review.clear')}</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk action bar (Admin only) */}
      {adminMode && items.length > 0 && (
        <Card style={{ borderLeft: `4px solid var(--theme-color-warn, #f59e0b)` }}>
          <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer' }}>
                <Checkbox
                  id="selectAllCheckbox"
                  checked={items.length > 0 && items.every(x => selectedIds.has(x.id))}
                  onCheckedChange={handleSelectAllToggle}
                />
                <span>{t('review.selectListed')}</span>
              </label>
              <Badge>{selectedIds.size} {t('review.selectedCount')}</Badge>
            </div>

            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Button onClick={handleConfirmSelected} disabled={!selectedIds.size || submitting} primary>{t('review.confirmSelected')}</Button>

              <div style={{ width: '120px' }}>
                <Select value="" onValueChange={handleSetTrust} disabled={!selectedIds.size || submitting}>
                  <SelectOption value="">{t('review.setTrust')}</SelectOption>
                  <SelectOption value="stated">stated</SelectOption>
                  <SelectOption value="inferred">inferred</SelectOption>
                  <SelectOption value="tool">tool</SelectOption>
                  <SelectOption value="imported">imported</SelectOption>
                  <SelectOption value="unknown">unknown</SelectOption>
                </Select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Input
                  type="datetime-local"
                  value={expiryDate}
                  onChange={(e: any) => setExpiryDate(e.target.value)}
                  style={{ width: '150px', height: '36px' }}
                  disabled={!selectedIds.size || submitting}
                />
                <Button onClick={handleSetExpiry} disabled={!selectedIds.size || submitting} ghost>{t('memories.setExpiry')}</Button>
              </div>

              <Button onClick={handleExpireSelected} disabled={!selectedIds.size || submitting} style={{ background: '#ef4444', color: '#fff' }}>{t('review.expire')}</Button>
              <Button onClick={() => setSelectedIds(new Set())} disabled={!selectedIds.size} ghost>{t('review.clearSelection')}</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Body */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 600 }}>{currentQueueInfo?.title || selectedQueue}</div>
            <div style={{ fontSize: '12px', color: MG(0.4) }}>{currentQueueInfo?.description || ''}</div>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: MG(0.5) }}>{totalCount} {t('review.totalCount')} · {items.length} {t('review.listedCount')}</span>
            <Button
              onClick={() => {
                if (currentQueueInfo) {
                  const filterMap: any = {
                    contaminated: { veracity: '', contaminated_only: '1' },
                    high_importance_contaminated: { contaminated_only: '1', sort: 'importance' },
                    degraded: { veracity: '', degraded_only: '1' },
                    due_for_degradation: { kind: 'episodic', due_for_degradation: '1', sort: 'oldest' }
                  };
                  onApplyFilters(filterMap[selectedQueue] || {});
                }
              }}
              ghost
            >
              {t('review.openBrowser')}
            </Button>
          </div>
        </div>

        {renderReviewListContent()}
      </div>
    </div>
  );
};
