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

```
GET /api/plugins/mnemosyne-native-dashboard/stats
GET /api/plugins/mnemosyne-native-dashboard/memories?limit=25
```
