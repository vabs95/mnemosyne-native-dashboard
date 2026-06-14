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

---

## Usage Guide & Value

The Memories tab is the comprehensive data explorer for Mnemosyne's **BEAM Memory Model**. It enables full inspection of all memories stored within the system, bridging runtime interactions with permanent memory structures.

### Core Capabilities
1. **Granular Memory Filtering**
   - Allows operators to drill down into memory types (`working` short-term memories vs. `episodic` long-term memories).
   - Filters by degradation tier (Hot, Warm, Cold) to understand how the memory compaction engine is aging data.
2. **Metadata Inspector & Diagnostics**
   - The Inspector panel surfaces exact veracity markers (`stated`, `inferred`, `tool`, `imported`), importance scores, and expiration timeframes.
   - **Value**: Essential for debugging agent reasoning pipelines—allowing operators to trace exactly where a piece of retrieved context originated and how much weight it carries.
3. **Interactive Curation (Admin Actions)**
   - When admin controls are enabled, operators can dynamically adjust memory state, update importance weights, alter veracity classifications, or manually force expiration.
   - **Value**: Provides a human-in-the-loop interface to prune erroneous or outdated facts, correcting the agent's long-term retrieval index in real-time.

---

## Issues Found & Resolved

1. **Casing & Capitalization Inconsistencies**:
   - *Issue*: Dropdown filter options (e.g., `all trust`, `degraded only`, `needs review`, `due for degradation`) and inspector detail values were presented in lowercase or inconsistent casing.
   - *Fix*: Standardized i18n values to Title Case (e.g., `All Trust`, `Needs Review`). Applied CSS `textTransform: 'capitalize'` to inspector values (`status`, `veracity`, `source`, `scope`), aligning them with the application's design guidelines.
2. **Invalid Nested HTML inside Select Options**:
   - *Issue*: Generating dynamic select option elements in the filter dropdowns by nesting `<span>` tags inside `<SelectOption>` (which compiles to HTML `<option>`) caused HTML validation failures and React warnings.
   - *Fix*: Removed nested tags and formatted select option values using Javascript string utilities (e.g., `.charAt(0).toUpperCase() + .slice(1)`) to output clean text content.
3. **Hardcoded User-Facing Strings**:
   - *Issue*: Labels such as `imp:`, `session:`, action alerts (e.g., confirmation popup for invalidation `'Invalidate this memory?'`), and default veracity types inside selectors were hardcoded in English.
   - *Fix*: Transferred all hardcoded strings into `i18n.ts` and loaded them dynamically via the standard translation helper `t()`.

