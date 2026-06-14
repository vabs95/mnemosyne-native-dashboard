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

---

## Usage Guide & Value

The Lifecycle tab serves as the primary diagnostic panel for monitoring memory compression and consolidation in Mnemosyne's **BEAM Memory Model**. It enables operators to oversee the automatic aging and pruning of episodic records.

### Key Capabilities
1. **Memory Compression Configuration**
   - Displays time-based transition thresholds (e.g. `Tier 2 after 30 days`, `Tier 3 after 180 days`) and degradation weight multipliers.
   - **Value**: Operators can inspect the configured policy to understand how fast the system summarizes/collates or discards old memories, ensuring important context is not aged out prematurely.
2. **Episodic Tier Oversight**
   - Groups active memories by category (Hot, Warm, Cold, Expired, Recently Degraded, Due for Degradation).
   - **Value**: High-importance items due for degradation can be reviewed before they are compressed or expired, preventing valuable learnings from fading from the agent's active recall loop.
3. **Seamless Filtering**
   - Clickable card controls and CTA buttons filter the main Memories list, making it easy to drill down into a specific degradation cohort for diagnostic inspection.

---

## Issues Found & Resolved

1. **Title Case Casing Violations**:
   - *Issue*: Section headers (e.g., `Hot memories`, `Warm memories`) and CTA buttons (e.g., `'Open lifecycle filter'`) were rendered in sentence/lowercase.
   - *Fix*: Standardized the button translation key (`openFilter`) to Title Case (`Open Lifecycle Filter`) and added `textTransform: 'capitalize'` to the dynamic queue header render in [LifecycleTab.tsx](file:///C:/Personal/Dev/mnemosyne-dashboard/web/src/components/LifecycleTab.tsx) and badge elements, ensuring they present consistently.
2. **Hardcoded User-Facing Strings**:
   - *Issue*: Temperature titles inside the banner (`hot`, `warm`, `cold`) and item row labels like `imp:` and `session:` were hardcoded.
   - *Fix*: Extracted temperature names into the `common` i18n object and applied the `t()` helper to load them dynamically alongside the translated `impLabel` and `sessionLabel` keys.
3. **Brittle Test Queries**:
   - *Issue*: Unit tests in [LifecycleTab.test.tsx](file:///C:/Personal/Dev/mnemosyne-dashboard/web/src/components/LifecycleTab.test.tsx) queried elements using literal case-sensitive strings (e.g., `'Open lifecycle filter'`) and overly broad searches (e.g., `/hot/`), causing assertions to fail when casing was corrected or matching subtitles.
   - *Fix*: Transitioned assertions to case-resilient regexes (e.g., `/Open Lifecycle Filter/i`) and targeted section-specific query matches (e.g., `/weights:.*hot/i`).

