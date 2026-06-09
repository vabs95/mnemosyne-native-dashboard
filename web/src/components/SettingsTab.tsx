import React, { useState, useEffect } from 'react';
import { fetchJSON, Card, CardHeader, CardTitle, CardContent, Button, Checkbox } from '@hermes/sdk';
import { safeNumber } from '../utils/format';
import { t } from '../utils/i18n';
import { API_BASE as API } from '../types';

const MG = (o: number) => `rgba(234,234,234,${o})`;

interface Diagnostics {
  exists?: boolean;
  readable?: boolean;
  writable?: boolean;
  size_bytes?: number;
  db_exists: boolean;
  db_readable: boolean;
  db_writable: boolean;
  table_counts: Record<string, number>;
  file_size_bytes: number;
}

interface AuditLogItem {
  timestamp: string;
  action: string;
  memory_id?: string;
  user?: string;
  details?: string;
}

interface SettingsTabProps {
  adminMode: boolean;
  onToggleAdminMode: (enabled: boolean) => void;
}

/**
 * SettingsTab Component
 * Exposes SQLite diagnostics reports, backup builders, and memory admin mode toggles.
 */
export const SettingsTab: React.FC<SettingsTabProps> = ({ adminMode, onToggleAdminMode }) => {
  const [diagnostics, setDiagnostics] = useState<Diagnostics | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);
  const [showAudits, setShowAudits] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionStatus, setActionStatus] = useState('');

  useEffect(() => { loadDiagnostics(); }, []);

  async function loadDiagnostics() {
    try {
      setDiagnostics(await fetchJSON(`${API}/diagnostics`));
    } catch {} finally { setLoading(false); }
  }

  async function handleToggleAdmin(checked: boolean) {
    setActionStatus(t('settings.saving'));
    try {
      const res = await fetchJSON(`${API}/config`, { method: 'POST', body: JSON.stringify({ memory_admin_enabled: checked }) });
      onToggleAdminMode(res.config.memory_admin_enabled);
      setActionStatus(t('settings.saved'));
      setTimeout(() => setActionStatus(''), 2000);
    } catch (err: any) {
      setActionStatus(`Error: ${err.message}`);
    }
  }

  async function handleCreateBackup() {
    setActionStatus(t('settings.creatingBackup'));
    try {
      const res = await fetchJSON(`${API}/admin/backup`, { method: 'POST' });
      setActionStatus(`${t('settings.backupCreated')}: ${res.backup?.path || 'done'}`);
      loadDiagnostics();
    } catch (err: any) {
      setActionStatus(`Error: ${err.message}`);
    }
  }

  async function handleLoadAuditLogs() {
    try {
      const res = await fetchJSON(`${API}/admin/audit?limit=100`);
      setAuditLogs(res.items || []);
      setShowAudits(true);
    } catch (err: any) {
      alert(`${t('settings.failedAuditLogs')}: ${err.message}`);
    }
  }

  const StatusDot = ({ ok }: { ok: boolean }) => (
    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: ok ? '#4ade80' : '#f87171' }} />
  );

  const exists = diagnostics?.exists ?? diagnostics?.db_exists ?? false;
  const readable = diagnostics?.readable ?? diagnostics?.db_readable ?? false;
  const writable = diagnostics?.writable ?? diagnostics?.db_writable;
  const fileSizeBytes = diagnostics?.size_bytes ?? diagnostics?.file_size_bytes ?? 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        {/* Memory Maintenance */}
        <Card>
          <CardHeader><CardTitle>{t('settings.memoryMaintenance')}</CardTitle></CardHeader>
          <CardContent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ fontSize: '12px', color: MG(0.55), lineHeight: '1.6' }}>
                {t('settings.maintenanceInfo')}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Checkbox
                  id="adminModeToggle"
                  checked={adminMode}
                  onCheckedChange={(checked: boolean) => handleToggleAdmin(!!checked)}
                />
                <label htmlFor="adminModeToggle" style={{ fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
                  {t('settings.enableAdminMode')}
                </label>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <Button ghost onClick={handleCreateBackup}>{t('settings.createBackup')}</Button>
                {adminMode && <Button ghost onClick={handleLoadAuditLogs}>{t('settings.viewAuditLogs')}</Button>}
              </div>

              {actionStatus && (
                <div style={{ fontSize: '11px', fontFamily: 'var(--theme-font-mono)', color: MG(0.6) }}>
                  {actionStatus}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Database Diagnostics */}
        <Card>
          <CardHeader><CardTitle>{t('settings.databaseDiagnostics')}</CardTitle></CardHeader>
          <CardContent>
            {loading ? (
              <div style={{ color: MG(0.4), fontSize: '12px' }}>{t('settings.runningDiagnostics')}</div>
            ) : diagnostics ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', fontFamily: 'var(--theme-font-mono)' }}>
                {[
                  { label: 'SQLite File Exists', ok: exists },
                  { label: 'Read Permission', ok: readable },
                  { label: 'Write Permission', ok: writable },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '6px', borderBottom: `1px solid ${MG(0.07)}` }}>
                    <span style={{ color: MG(0.5) }}>{row.label}</span>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <StatusDot ok={!!row.ok} />
                      <span>{row.ok == null ? 'N/A' : row.ok ? 'OK' : 'Fail'}</span>
                    </div>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: `1px solid ${MG(0.07)}` }}>
                  <span style={{ color: MG(0.5) }}>{t('settings.size')}</span>
                  <span>{safeNumber(fileSizeBytes / 1024, 1, 'n/a')} KB</span>
                </div>

                <div style={{ paddingTop: '8px' }}>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: MG(0.4), marginBottom: '8px' }}>{t('settings.tableRows')}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
                    {Object.entries(diagnostics.table_counts).map(([tbl, count]) => (
                      <div key={tbl} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: MG(0.04), borderRadius: '4px', border: `1px solid ${MG(0.07)}` }}>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: '8px', color: MG(0.55) }}>{tbl}</span>
                        <span>{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ color: MG(0.35), fontSize: '12px' }}>{t('settings.noDiagnostics')}</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Audit Logs */}
      {showAudits && (
        <Card>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardTitle>{t('settings.auditLogsTitle')}</CardTitle>
              <Button ghost onClick={() => setShowAudits(false)}>{t('settings.closeLogs')}</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div style={{ maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px', fontFamily: 'var(--theme-font-mono)', fontSize: '11px' }}>
              {auditLogs.length > 0 ? (
                auditLogs.map((log, i) => (
                  <div key={i} style={{ padding: '8px 10px', background: MG(0.04), borderRadius: '4px', border: `1px solid ${MG(0.07)}` }}>
                    <span style={{ color: MG(0.7), marginRight: '8px' }}>[{new Date(log.timestamp).toLocaleString()}]</span>
                    <strong style={{ textTransform: 'capitalize', color: MG(0.5), marginRight: '8px' }}>{log.action}:</strong>
                    <span>{log.details || log.memory_id}</span>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', color: MG(0.35), padding: '20px' }}>{t('settings.noAuditLogs')}</div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
