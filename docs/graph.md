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
