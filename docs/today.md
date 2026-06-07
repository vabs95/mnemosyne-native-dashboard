# Today Tab

The Today tab provides a daily digest summarising all memory activity for a selected date, offering a focused view of what was added, retrieved, and changed on any given day.

---

## Features

- **Date picker** with a "Today" reset button for navigating to any date
- **6 metric cards** summarising the day's activity at a glance
- **Breakdowns section** with distribution slices for entities, trust, lifecycle, sources, and sessions
- **Sub-panel tabs** listing individual records for each activity category

---

## UI Layout

### Metric Cards

| Card | Description |
|---|---|
| **Added** | Memories created on the selected date |
| **Retrieved** | Memories accessed/recalled on the selected date |
| **Needs Review** | Memories flagged for review that day |
| **Lifecycle Changes** | Tier transitions (e.g. active → degraded) that occurred |
| **Facts** | Structured fact records created |
| **Consolidations** | Consolidation events triggered |

### Breakdowns Section

| Breakdown | Description |
|---|---|
| **Top Entities** | Most-mentioned entities in that day's memories |
| **Trust Mix** | Trust distribution for the day's memories |
| **Lifecycle** | Tier split for the day's memories |
| **Sources** | Memory counts grouped by source |
| **Sessions** | Active sessions that day |

### Sub-Panel Tabs

Four tabs beneath the breakdowns list the individual records for the selected day:

- **Added** — each memory row with veracity badge, source, and preview
- **Retrieved** — memories recalled, with access timestamp
- **Facts** — structured fact rows with entity and predicate
- **Consolidations** — consolidation events with summary and trigger info

---

## CTAs / Interactions

| Trigger | Action |
|---|---|
| **Date picker** | Reloads digest for chosen date (`day=YYYY-MM-DD`) |
| **"Today" button** | Resets picker to current date |
| Click memory row | Opens Memory inspector modal |
| Click session span | Opens Session inspector modal |
| Click consolidation / triple row | Opens JSON inspector modal |

---

## Data Sources

```
GET /api/plugins/mnemosyne-native-dashboard/digest/today?day=YYYY-MM-DD
```
