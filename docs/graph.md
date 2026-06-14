# Graph Tab

The Graph tab visualises the Memoria knowledge graph as an interactive SVG canvas and provides a complementary searchable triples table for structured exploration.

---

## Features

- **Relationship Graph** — SVG canvas with zoom, pan, and node/edge click interactions
- **Facts Table** — sortable, searchable table of all KG triples
- **Node inspector** — shows connected triples and links to memory search on click
- **Edge inspector** — shows subject / predicate / object / confidence / timestamp on click

---

## UI Layout

### Sub-Panel Tabs

| Tab | Description |
|---|---|
| **Relationship Graph** | Interactive SVG graph of entities and their relationships |
| **Facts Table** | Tabular view of all subject–predicate–object triples |

### Relationship Graph Panel

- **Canvas** — entities rendered as labelled nodes; relationships as directed edges
- **Zoom / pan** — scroll to zoom, drag to pan
- **Node inspector sidebar** — appears on the right when a node is selected:
  - Entity label and type
  - List of all connected triples (in and out)
  - **"Search Memories"** CTA — runs a memory search for the entity

- **Edge inspector** — appears in a tooltip or sidebar when an edge is clicked:
  - Subject, Predicate, Object
  - Confidence score
  - Recorded timestamp

### Facts Table Panel

Sortable table with columns:

| Column | Description |
|---|---|
| **Subject** | Source entity |
| **Predicate** | Relationship type |
| **Object** | Target entity or value |
| **Confidence** | Score (0–1) |
| **Timestamp** | When the triple was recorded |

Search box at the top filters rows by any column value.

---

## CTAs / Interactions

| Trigger | Action |
|---|---|
| **Refresh graph** button | Re-fetches graph data and re-renders canvas |
| **Reset view** button | Resets zoom and pan to default fit-to-canvas |
| Click a **graph node** | Opens node inspector sidebar |
| **"Show in Triples"** (node inspector) | Switches to Facts Table tab filtered to that entity |
| **"Search Memories"** (node inspector) | Navigates to Memories tab with entity as search query |
| **"Inspect JSON"** (node inspector) | Opens raw JSON inspector modal |
| **"Details"** button | Expands full triple detail view |
| Click a **graph edge** | Shows edge inspector with triple metadata |
| Type in Facts Table **search box** | Filters table rows in real time |

---

## Data Sources

```
GET /api/plugins/mnemosyne-native-dashboard/kg/graph
GET /api/plugins/mnemosyne-native-dashboard/memoria/kg
```

---

## Usage Guide & Value

The Graph tab provides a visual and tabular interface for exploring Mnemosyne's **semantic knowledge graph**. As autonomous agents operate, they do not just record plain text memories—they extract structured, relational facts (triples consisting of Subject–Predicate–Object) to form a semantic web of knowledge.

### Core Capabilities
1. **Interactive Relationship Graph**
   - Renders a force-directed layout mapping entities and their relationships.
   - Operators can pan, zoom, drag, and click nodes or edges to dynamically isolate segments of the knowledge graph.
   - **Value**: Helpful for understanding how the agent links different concepts, projects, or users, surfacing the structural network of the agent's long-term intelligence.
2. **Tabular Facts Explorer**
   - The Facts Table lists every triple along with its extraction confidence score.
   - **Value**: Allows precise filtering and searching across the entity graph. High-confidence facts can be confirmed, and low-confidence relationships can be scrutinized.
3. **Cross-Tab Navigational CTAs**
   - Selecting a node opens the Graph Inspector, which provides quick shortcuts to jump to the Facts Table filtered by that node or run a full-text query in the Memories tab.
   - **Value**: Establishes complete trace-to-source workflows. An operator can see a fact relationship, inspect the underlying memories that created it, and verify the agent's reasoning.

---

## Issues Found & Resolved

1. **Title Case Casing Violations**:
   - *Issue*: Sub-tabs (`Relationship graph`, `Facts table`), CTA buttons (`Refresh graph`, `Reset view`), and panel headers (`Graph inspector`) were styled in sentence case, which violates the dashboard's Title Case requirements.
   - *Fix*: Standardized the translation strings under the `graph` namespace in `i18n.ts` to use Title Case (`Relationship Graph`, `Facts Table`, `Refresh Graph`, `Reset View`, `Graph Inspector`).
2. **Missing Unit Tests**:
   - *Issue*: The Graph tab component had no automated test coverage in the frontend suite.
   - *Fix*: Created a comprehensive unit test suite in [GraphTab.test.tsx](file:///C:/Personal/Dev/mnemosyne-dashboard/web/src/components/GraphTab.test.tsx) and updated the mocks in [fixtures.ts](file:///C:/Personal/Dev/mnemosyne-dashboard/web/src/test/fixtures.ts) to verify rendering, sub-tab switches, and API queries.

