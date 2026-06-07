# Context Bank Tab

The Context Bank tab (tab ID: `profile`) provides a read-only view of the inferred user profile, presenting structured sections of learned context such as entities, preferences, topics, and more.

---

## Features

- **2-column card grid** — each card represents one profile section
- **Per-item metadata** — label, context type, confidence score, source, and content preview for every entry
- **Read-only** — profile data is inferred by the system; no editing is exposed in this tab

---

## UI Layout

### Card Grid

Cards are arranged in a responsive 2-column grid. Each card represents a **profile section** (e.g. Entities, Preferences, Topics, Relationships, Interests).

#### Card Header

- **Section title** (e.g. "Entities", "Preferences")
- Item count badge

#### Card Body — Item Rows

Each item within a card shows:

| Field | Description |
|---|---|
| **Label** | The inferred entity, preference, or topic name |
| **Context type** | Category or sub-type of the profile entry |
| **Confidence** | Inferred confidence score (0–1) |
| **Source** | Memory or session that contributed this inference |
| **Preview** | Short excerpt or value |

---

## CTAs / Interactions

| Trigger | Action |
|---|---|
| Click an item **Source** link | Navigates to Memories tab filtered to the source memory/session |

> [!NOTE]
> All other interactions are **read-only**. Profile data is derived automatically from memory content and cannot be modified from this tab.

---

## Data Sources

```
GET /api/plugins/mnemosyne-native-dashboard/profile/inferred
```
