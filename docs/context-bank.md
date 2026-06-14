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

---

## Usage Guide & Value

The Context Bank tab provides a consolidated, read-only interface for reviewing the user's inferred profile in Mnemosyne's **BEAM Memory Model**. 

### Role in the Architecture
In agentic workflows, episodic memories are continually ingested. The background profiling system parses these memories to extract persistent context segments such as:
1. **User Preferences**: Long-term preferences (e.g. coding styles, interface preferences, communication guidelines).
2. **Entity Repositories**: Learned information about people, projects, systems, and tools.
3. **Behavioral Archetypes**: Inferred patterns of user interaction and requirements.

### Operational Value
- **Traceability**: By converting plain text `source` fields into interactive links, operators can click any source and immediately jump to the Memories tab with that source or session pre-filtered. This allows operators to trace an inferred profile preference back to the raw conversation or tool log that produced it.
- **Safety Auditing**: Profiles are learned automatically by the system. The Context Bank provides a diagnostic window to ensure the agent is not formulating incorrect assumptions or hallucinations about the user.

---

## Issues Found & Resolved

1. **Hardcoded User-Facing Strings**:
   - *Issue*: Prefixes like `count:` and `w:` (weight/importance), along with the loading text and empty states, were hardcoded in the JSX file.
   - *Fix*: Extracted all strings into `i18n.ts` under the `contextBank` namespace and rendered them dynamically using the `t()` translation helper.
2. **Casing & Capitalization**:
   - *Issue*: Section titles derived from database keys (e.g. `user_preferences`) and item badges were rendered in lowercase or inconsistent casing.
   - *Fix*: Applied CSS `textTransform: 'capitalize'` to both card titles and badge elements, ensuring they present consistently in Title Case.
3. **Missing Source Link Navigation**:
   - *Issue*: The design specification described clicking a "Source" to filter memories, but the source was rendered as a static `<span />` element with no interaction capability.
   - *Fix*: Equipped the `ContextBankTab` component with the `onApplyFilters` navigation handler prop. Replaced the static span with an accessible, keyboard-focusable `<button />` element that determines if the source is a session ID or a general source, and filters the Memories tab accordingly.
4. **TypeScript Build Safety**:
   - *Issue*: The navigation click callback caused TypeScript build errors because `item.source` (which could be undefined) was not narrowed correctly before being passed to `onApplyFilters`.
   - *Fix*: Implemented proper type narrowing within the onClick handler callback to ensure type safety.

