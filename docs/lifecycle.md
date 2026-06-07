# Lifecycle Tab

The Lifecycle tab provides a read-only health dashboard for the memory degradation system, showing how memories are distributed across tiers and which records are approaching or have crossed degradation thresholds.

---

## Features

- **Degradation config display** — tier thresholds and importance weight multipliers
- **Stat cards per tier category** — counts at a glance for each degradation tier
- **Per-queue memory lists** — browsable lists of memories in each tier state
- **Click-through to Memories tab** for any tier card or queue

> [!NOTE]
> This tab is **read-only**. No degradation operations are triggered from here.

---

## UI Layout

### Degradation Config Panel

Displays the currently active degradation rules loaded from the server:

| Field | Description |
|---|---|
| **Tier thresholds** | Day counts that trigger hot → warm → cold transitions |
| **Importance weight multipliers** | How importance score affects tier transition timing |

### Tier Stat Cards

One card per degradation category:

| Card | Description |
|---|---|
| **Hot** | Memories within the active/recent threshold |
| **Warm** | Memories past hot threshold, not yet cold |
| **Cold** | Memories in the long-tail degraded state |
| **Expired** | Memories that have fully degraded past cold |

### Per-Queue Memory Lists

Below the cards, each tier queue is expanded into a list of matching memories showing veracity badge, importance, source, scope, and content preview.

---

## CTAs / Interactions

| Trigger | Action |
|---|---|
| Click a tier **stat card** | Opens Memories tab filtered to that degradation tier |
| Click a memory row in a queue list | Opens Memories tab filtered to that tier (or Memory inspector) |

---

## Architecture Notes

Degradation follows the **BEAM hot → warm → cold** model:

- **Hot** — short-term active memories with high recency weight
- **Warm** — mid-life memories with reduced priority
- **Cold** — archive-tier memories with minimal retrieval weight

Importance score multipliers allow high-value memories to resist degradation longer than their timestamp alone would suggest.

---

## Data Sources

```
GET /api/plugins/mnemosyne-native-dashboard/lifecycle
```
