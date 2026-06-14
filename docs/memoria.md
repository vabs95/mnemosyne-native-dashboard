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

---

## Usage Guide & Value

The Memoria tab serves as the primary dashboard for reviewing the **Memoria 3.x schema fact store**. In the BEAM memory model, agents do not merely accumulate unstructured logs—they systematically structure knowledge into distinct categories:
1. **Facts**: Specific entity properties (e.g. `User Name = Seth`).
2. **Timelines**: Chronological user-historical event sequences.
3. **Instructions**: Hard behavioral directives stored for agent operations.
4. **Knowledge Graph (KG)**: Inter-connected concept mappings.
5. **Preferences**: Learned preferences for interaction formatting.

### Operational Value
- **Tabular Inspectability**: Provides direct tabs for facts, timelines, instructions, KG, and preferences, allowing developers or operators to check exactly what the agent is learning.
- **Direct Traceability**: Includes clickable session references next to facts/instructions, making it possible to jump to session details and trace exactly why the agent inferred a given preference or fact.

---

## Issues Found & Resolved

1. **Broken Translation Keys in Sub-tabs**:
   - *Issue*: Sub-tabs were literally displaying their translation keys (e.g., `memoria.facts`, `memoria.timelines`, etc.) because the underlying translations were not defined in `i18n.ts`.
   - *Fix*: Added the missing translations (`facts`, `timelines`, `instructions`, `kg`, `preferences`) inside the `memoria` namespace in `i18n.ts`, resolving the broken UI labels.
2. **Hardcoded Labels**:
   - *Issue*: Row labels like `imp:` (importance) and `session:` were hardcoded in English.
   - *Fix*: Transformed the hardcoded labels to reference `t('review.impLabel')` and `t('review.sessionLabel')` from the global i18n object.
3. **Missing Casing Styles**:
   - *Issue*: Badges displaying categories or sources were rendered in all lowercase.
   - *Fix*: Applied CSS `textTransform: 'capitalize'` to badges (`item.fact_type`, `item.source`, and `topic`), aligning them with the Title Case guideline.
4. **Missing Unit Tests**:
   - *Issue*: There was no automated test coverage for the MemoriaTab component.
   - *Fix*: Created [MemoriaTab.test.tsx](file:///C:/Personal/Dev/mnemosyne-dashboard/web/src/components/MemoriaTab.test.tsx) and updated [fixtures.ts](file:///C:/Personal/Dev/mnemosyne-dashboard/web/src/test/fixtures.ts) to verify overview counts, session links, sub-tab trigger button clicks, and table rendering.
