# History Tab

The History tab presents a chronological timeline of all memory events, grouped either by calendar day or by session, with a companion panel showing the full consolidation history.

---

## Features

- **By Day / By Session toggle** for two timeline grouping modes
- **Right panel** — Consolidation History digest alongside the event timeline
- **Session detail panel** — loads inline when a session is selected (no modal)
- Click-through interactions on every event row and session link

---

## UI Layout

### Timeline Toggle

A control at the top switches between two grouping modes:

| Mode | Description |
|---|---|
| **By Day** | Events grouped under date headings (most recent first) |
| **By Session** | Events grouped under session ID headings |

### Timeline Panel (left / main)

Each group header (day or session) can be expanded to reveal its events. Each event row shows:

- Event type (created, retrieved, updated, expired, consolidated)
- Veracity badge and importance score
- Source and scope
- Timestamp
- Content preview

### Consolidation History Panel (right)

A digest list of consolidation events showing:

- Trigger session or date
- Number of memories consolidated
- Summary or theme of the consolidation

Clicking a consolidation row opens a JSON inspector modal.

### Session Detail Panel (inline)

When a session heading or session link is clicked, a detail panel expands inline below the session group showing:

- Session ID and date range
- Memory count, total retrieved, total consolidations
- List of memories created in that session

---

## CTAs / Interactions

| Trigger | Action |
|---|---|
| **By Day / By Session** toggle | Re-groups the timeline without a full reload |
| Click a memory event row | Opens Memory inspector modal |
| Click a session heading / link | Expands the inline Session detail panel |
| Click a consolidation row | Opens JSON inspector modal |

---

## Data Sources

```
GET /api/plugins/mnemosyne-native-dashboard/timeline
GET /api/plugins/mnemosyne-native-dashboard/consolidations
```

---

## Usage Guide & Value

- **Audit Memory Lifecycle**: Provides a chronological, tamper-evident log of memory events (creations, expirations, updates) to trace exactly when and why agent behavior changed.
- **Analyze Grouping Modes**: Switch to **By Day** to review general activity flow, or **By Session** to trace specific conversational logs.
- **Consolidation Inspector**: View consolidation summaries and inspect their raw JSON schema to understand exactly what facts was compressed and stored during background consolidation runs.

## Issues Found & Resolved

- **Accessibility & HTML Nesting Warnings**: The event rows originally used an absolute-positioned `<button>` overlaying text containers and inner buttons. This has been refactored into a `div role="button" tabIndex={0}` card with proper `onKeyDown` and mouse handlers. This resolves invalid nesting warnings, allows text selection, and permits clean interaction with nested session buttons.
- **Incorrect Consolidation Row Action**: Clicking a consolidation row was opening session details directly, ignoring the documented JSON inspector feature. Resolved by implementing a custom **JSON Consolidation Inspector Modal** displaying the stringified consolidation data, with a dedicated CTA button to load the session details.
- **Hardcoded Values & Localization**: Fully translated hardcoded session, importance labels, and date labels using the `t()` function. Veracity badges now show capitalized, localized terms (e.g. *Stated*, *Inferred*, *Tool*) to match the rest of the dashboard styling.
