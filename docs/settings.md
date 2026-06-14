# Settings Tab

The Settings tab exposes database diagnostics and the admin mode toggle, allowing authorised users to enable elevated actions across the dashboard and inspect the health of the underlying SQLite database.

---

## Features

- **Admin mode toggle** — checkbox that gates bulk actions in Review and admin actions in Memories
- **Maintenance controls** — Create Backup and View Audit Logs shortcuts
- **Database Diagnostics panel** — live SQLite file checks and table row counts
- Settings are persisted server-side; toggling admin mode does not require a page reload

---

## UI Layout

### Memory Maintenance Section

| Control | Description |
|---|---|
| **Admin mode** (checkbox) | Enables bulk actions in Review tab and admin actions in Memories inspector |
| **Create Backup** (button) | Triggers a server-side SQLite backup of the Mnemosyne database |
| **View Audit Logs** (button) | Opens the audit log viewer (read-only list of past admin operations) |

### Database Diagnostics Section

A live health panel that queries the database on load:

| Diagnostic | Description |
|---|---|
| **SQLite file checks** | File existence, size, last modified timestamp, read/write status |
| **Table row counts** | Row count for each Mnemosyne table (`memories`, `facts`, `triples`, `sessions`, `consolidations`, etc.) |

Diagnostics refresh automatically each time the Settings tab is opened.

---

## CTAs / Interactions

| Trigger | Action |
|---|---|
| Toggle **Admin mode** checkbox | POSTs new config to server; updates dashboard-wide admin state |
| Click **Create Backup** | Initiates server-side database backup, shows success/error toast |
| Click **View Audit Logs** | Opens audit log panel or modal |

> [!CAUTION]
> Enabling admin mode grants access to **destructive operations** (memory expiry, content supersede, bulk actions). Disable when not actively performing maintenance.

---

## Data Sources

```
GET  /api/plugins/mnemosyne-native-dashboard/config
POST /api/plugins/mnemosyne-native-dashboard/config
GET  /api/plugins/mnemosyne-native-dashboard/diagnostics
```
