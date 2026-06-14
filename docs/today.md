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

```http
GET /api/plugins/mnemosyne-native-dashboard/digest/today?day=YYYY-MM-DD
```

---

## Usage Guide & Value

The **Today Tab** offers a daily digest report focusing on a single date's memory footprint. It is valuable for:
1. **Daily Activity Auditing**: Understanding exactly what thoughts were generated (`Added`) and what prior knowledge was recalled (`Retrieved`) during a specific day's runs.
2. **Review Triage Monitoring**: Seeing if the memory store accumulated a high number of unverified memories on a specific day (which would require reviews).
3. **Consolidation Footprint**: Tracking how many episodic summaries were compressed on a specific day, verifying if database pruning/summarization jobs ran successfully.
4. **Day-by-Day Historical Navigation**: Operators can select any past date to diagnose issues that occurred on that specific day (e.g., debugging why a certain conversation or error occurred by reviewing what the agent was thinking).

---

## Issues Found

The following issues were identified and addressed on the **Today Tab**:

1. **Inconsistent Capitalization in Breakdowns**
   - **Status**: Fixed
   - **Details**: The breakdown slices for Trust Mix (`stated`, `unknown`), Lifecycle (`hot`, `warm`, `cold`), and Sources (`conversation`, `correction`) were rendered in raw lowercase, creating a mismatch with the Overview tab. Added conditional capitalization based on the card key.

2. **Non-Interactive SESSIONS Breakdown Card**
   - **Status**: Fixed
   - **Details**: The SESSIONS breakdown card listed active sessions as plain static text, despite the documentation stating that clicking them should open the Session inspector. Refactored the sessions breakdown list to render monospaced, truncated buttons using the premium row hover backgrounds and triggering `onInspectSession` on click.
