# Memories Tab

The Memories tab is the full-featured memory browser, offering rich filtering, search, and inspection of every record in the Mnemosyne store.

---

## Features

- **9 filter controls** for precise querying of the memory store
- **Memory rows** with inline veracity badges, importance scores, and content previews
- **Inspector panel** showing complete metadata for any selected memory
- **Admin actions** available when admin mode is enabled in Settings

---

## UI Layout

### Filter Bar

| Filter | Options |
|---|---|
| **Kind** | `working`, `episodic` |
| **Status** | `active`, `expired` |
| **Sort** | `recent`, `importance`, `oldest` |
| **Trust Preset** | Preset trust-level brackets |
| **Veracity** | Numeric range or label |
| **Source** | Free-text or dropdown of known sources |
| **Scope** | Free-text scope identifier |
| **Session** | Session ID or picker |
| **Degradation Tier** | Hot / Warm / Cold |
| **Search** | Full-text query against memory content |

### Memory Row

Each row in the results list displays:

- **Veracity badge** — colour-coded (green = high, amber = medium, red = low)
- **Importance score**
- **Source** and **Scope** labels
- **Session link** (opens Session inspector)
- **Timestamp** (created / last accessed)
- **Content preview** (truncated)

### Inspector Panel

Appears to the right (or below on narrow viewports) when a memory row is selected:

- Full memory **content**
- All **metadata fields** (kind, status, trust, veracity, source, scope, session, created, expires)
- **Diagnostic row table** — per-field internal values for debugging

### Admin Actions Panel

Visible only when admin mode is active:

| Action | Description |
|---|---|
| **Supersede content** | Replace the memory's content with new text |
| **Adjust Veracity / Trust** | Modify numeric veracity or trust level |
| **Set Expiry** | Assign or update the expiry date/time |
| **Invalidate / Expire** | Mark the memory as expired immediately |

---

## CTAs / Interactions

| Trigger | Action |
|---|---|
| Apply / clear any filter | Reloads memory list with updated query params |
| Click a memory row | Loads full inspector panel for that memory |
| Click **Session link** in row | Opens Session inspector modal |
| Submit an admin action | POSTs update and refreshes inspector |

---

## Data Sources

```
GET /api/plugins/mnemosyne-native-dashboard/memories
```

Query parameters mirror the filter bar values (e.g. `kind`, `status`, `sort`, `veracity`, `source`, `scope`, `session`, `tier`, `q`).
