# Overview Tab

The Overview tab provides a real-time system health snapshot of the Mnemosyne memory store, giving a bird's-eye view of memory counts, degradation state, and live ingestion activity.

---

## Features

- **7 stat cards** summarising key memory system metrics
- **5 breakdown mini-cards** showing distribution slices of the memory store
- **Live Memory Log** streaming the 25 most recent memory records
- Click-through navigation — every card and row is interactive

---

## UI Layout

### Stat Cards

| Card | Description |
|---|---|
| **Working Memory** | Short-term active thoughts (BEAM hot tier) |
| **Episodic Memory** | Archived session memories (BEAM warm/cold tier) |
| **Scratchpad** | Reasoning workspace entries |
| **Needs Review** | Contaminated or unverified memories awaiting triage |
| **Degraded** | Memories in a degraded lifecycle tier |
| **Triples** | Total KG (knowledge graph) subject–predicate–object facts |
| **Consolidations** | Total consolidation events recorded |

### Breakdown Mini-Cards

| Card | Breakdown type |
|---|---|
| **Trust Mix** | Distribution of trust levels across the store |
| **Lifecycle** | Count per lifecycle tier (active / degraded / expired) |
| **Sources** | Memory counts grouped by source label |
| **Scopes** | Memory counts grouped by scope |
| **Top Sessions** | Most active sessions by memory count |

### Live Memory Log

Scrollable feed of the 25 most recently created memories, each row showing source, scope, veracity badge, and a content preview.

---

## CTAs / Interactions

| Trigger | Action |
|---|---|
| Click **Working Memory** card | Navigates to Memories tab, filtered to `kind=working` |
| Click **Episodic Memory** card | Navigates to Memories tab, filtered to `kind=episodic` |
| Click **Needs Review** card | Navigates to Review tab |
| Click **Degraded** card | Navigates to Lifecycle tab |
| Click **Triples** card | Navigates to Graph tab |
| Click **Consolidations** card | Navigates to History tab |
| Click any breakdown row | Navigates to Memories tab with corresponding filter applied |
| Click a **Top Session** row | Opens Session inspector modal |
| Click a memory in **Live Memory Log** | Opens Memory inspector modal |

---

## Architecture Notes

The stat cards map directly to the **BEAM memory model tiers**:

- **Working Memory** — short-lived, high-priority active context
- **Episodic Memory** — persisted session snapshots promoted from working memory
- **Scratchpad** — ephemeral reasoning workspace; not promoted to episodic

---

## Data Sources

```http
GET /api/plugins/mnemosyne-native-dashboard/stats
GET /api/plugins/mnemosyne-native-dashboard/memories?limit=25
```

---

## Usage Guide & Value

The **Overview Tab** is the central command center for operators monitoring a Mnemosyne-backed AI agent. It provides immediate visual answers to:
1. **Agent State Ingestion**: How quickly is the agent ingesting new context? (via *Live Memory Log* and *Working Memory* counts).
2. **Episodic Compression**: Is the agent successfully building long-term memories? If *Episodic Memory* remains 0 while *Working Memory* grows, it indicates that memory consolidation is either not configured or stuck.
3. **KG Signal Density**: How many semantic triples are being extracted? Triples represent the structured knowledge extracted from raw text.
4. **Data Contamination & Triage**: How many memories need human review? The *Needs Review* metric monitors memories marked with low confidence or unverified veracity.
5. **Memory Decay**: Are memories degrading? The *Degraded* metric alerts operators to memories that have aged into a lower tier, reducing active context pollution.

---

## Issues Found

The following issues were identified and addressed on the **Overview Tab**:

1. **Inconsistent Capitalization in Breakdown Cards**
   - **Status**: Fixed
   - **Details**: The `by_source` mini-card was rendering source names in raw lowercase (e.g. `conversation`, `correction`), whereas other mini-cards (Trust Mix, Scopes, Lifecycle) capitalized their labels. This was corrected by adding `textTransform: 'capitalize'` to the sources list renderer.

2. **Unstyled Links in Breakdown Mini-Cards**
   - **Status**: Fixed
   - **Details**: Mini-card breakdown rows used default underlined buttons which looked cluttered. This was redesigned to match `DESIGN.md` guidelines by replacing text underlines with premium row hover backgrounds (`rgba(234,234,234,0.02)` transitioning to `rgba(234,234,234,0.06)` on hover) and clean padding.

3. **Non-Interactive Scratchpad Card**
   - **Status**: Documented/Open
   - **Details**: The `Scratchpad` stat card has no click handler (unlike Working/Episodic/Triples/Consolidations). This is because Scratchpad represents a system-level SQLite table (`scratchpad`) used for raw agent reasoning steps, which is not exposed in the standard Memories query endpoint.
