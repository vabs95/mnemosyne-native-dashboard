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
