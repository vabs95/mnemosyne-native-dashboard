# MEMORIA Tab

The MEMORIA tab provides a structured browser for the Memoria 3.x fact store, exposing all sub-schemas — facts, timelines, instructions, knowledge graph triples, and preferences — through a unified tabbed interface.

---

## Features

- **Overview stats panel** summarising counts across all Memoria sub-schemas
- **Six sub-panels**, each with its own search box and result list
- **KG panel** with a subject / predicate / object / confidence table view
- Per-panel search queries the respective API endpoint independently

---

## UI Layout

### Sub-Panel Tabs

| Tab | Description |
|---|---|
| **Overview** | Aggregate counts: total facts, timelines, instructions, KG triples, preferences |
| **Facts** | Structured fact records (entity + predicate + value) |
| **Timelines** | Temporal event records with date ranges |
| **Instructions** | Persistent behavioural directives stored for the agent |
| **KG** | Knowledge graph triples — subject / predicate / object / confidence |
| **Preferences** | Inferred or stated user preferences |

### Overview Panel

Displays a stat card grid with totals for each sub-schema and a quick health indicator (e.g. last update timestamp).

### Facts / Timelines / Instructions / Preferences Panels

Each panel shares a common layout:

- **Search box** at the top — filters results by keyword
- **Result list** — rows with entity name, predicate/type, value/description, confidence, and timestamp

### KG Panel

Rendered as a sortable table:

| Column | Description |
|---|---|
| **Subject** | Source entity |
| **Predicate** | Relationship type |
| **Object** | Target entity or value |
| **Confidence** | Score (0–1) |
| **Timestamp** | When the triple was recorded |

---

## CTAs / Interactions

| Trigger | Action |
|---|---|
| Type in a panel's **search box** | Filters that panel's result list in real time |
| Click a fact / triple row | Opens JSON inspector modal for full record detail |
| Click an entity link | Navigates to Graph tab or opens filtered Memories view |

---

## Data Sources

```
GET /api/plugins/mnemosyne-native-dashboard/memoria/overview
GET /api/plugins/mnemosyne-native-dashboard/memoria/facts
GET /api/plugins/mnemosyne-native-dashboard/memoria/timelines
GET /api/plugins/mnemosyne-native-dashboard/memoria/instructions
GET /api/plugins/mnemosyne-native-dashboard/memoria/kg
GET /api/plugins/mnemosyne-native-dashboard/memoria/preferences
```
