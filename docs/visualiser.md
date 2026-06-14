# Visualiser Tab

The Visualiser tab renders the full memory store as an interactive 3D constellation using Three.js/WebGL, where each node is a memory record and edges represent semantic associations between memories.

---

## Features

- **3D memory constellation** — spatially arranged nodes in a WebGL scene
- **Hover labels** — node content preview appears on mouse-over
- **Click inspector panel** — shows entity hub view and connected edges for any selected node
- **"Open Associated Memory"** CTA from inspector to the full Memory inspector modal

---

## UI Layout

### 3D Canvas

The main viewport occupies the full tab area:

- **Nodes** — spheres representing individual memory records, coloured by veracity tier or kind
- **Edges** — lines connecting semantically associated memories
- **Zoom** — scroll wheel or pinch gesture
- **Rotate / pan** — click-drag to orbit, right-click-drag to pan

### Inspector Panel

Slides in from the right when a node is selected:

| Section | Description |
|---|---|
| **Entity Hub** | The selected memory's entity associations and key metadata (source, scope, veracity, importance) |
| **Connected Edges** | List of associated memories linked to the selected node, showing relationship type and strength |
| **"Open Associated Memory"** | Button to open the full Memory inspector modal for the selected record |

---

## CTAs / Interactions

| Trigger | Action |
|---|---|
| Hover over a **node** | Displays a floating label with content preview |
| Click a **node** | Opens the inspector panel for that memory |
| Click a **connected edge** row in inspector | Selects the linked memory node and refreshes the inspector |
| **"Open Associated Memory"** button | Opens full Memory inspector modal |
| Drag / scroll on canvas | Orbits or zooms the 3D scene |

---

## Data Sources

```
GET /api/plugins/mnemosyne-native-dashboard/constellation
```

---

## Usage Guide & Value

The 3D Visualiser tab maps directly to the underlying **BEAM Memory Model** (Brain-like Episodic Association Model), rendering memories as an associative neural network rather than static rows.

### Mode Perspectives
1. **Constellation Mode (Semantic Concept Mapping)**
   - Renders **Entity/Topic** nodes (blue stars) and **Memory** records (yellow somas) connected by semantic **Links**.
   - **Value**: Used to understand how individual episodic memories cluster around common semantic topics/concepts. It helps engineers trace memory retrieval paths and identify dense knowledge domains.
2. **Neural Map Mode (Activation Mapping)**
   - Renders **Neuron Hubs** (dense concept nodes) and **Memory Somas** (base episodic memories) connected by **Synapses**.
   - **Value**: Visualizes active paths and synapse weights, mapping to the activation diffusion process where related nodes are activated together during retrieval.

### Actionable Value
- **Concept Cohesion**: Provides a visual cue on how well-integrated newly acquired knowledge is. Densely clustered groups indicate consolidated concepts, whereas isolated nodes indicate fringe/unassociated memories.
- **Relational Navigation**: Allows developers to trace semantic links and debug incorrect associative relationships (e.g., if a memory is wrongly connected to an entity).

---

## Issues Found & Resolved

1. **Capitalization Inconsistencies on Action Buttons**: 
   - *Issue*: Toolbar action buttons ("Refresh visualiser", "Reset view", "Pan mode", "Pause rotation/drift") were using sentence case, violating the Title Case requirement for buttons, tabs, and headers in [DESIGN.md](file:///C:/Personal/Dev/mnemosyne-dashboard/DESIGN.md).
   - *Fix*: Updated to Title Case: "Refresh Visualiser", "Reset View", "Pan Mode", "Pause Rotation", "Pause Drift".
2. **Capitalization Inconsistencies on Inspector Headers**: 
   - *Issue*: Inspector titles ("Constellation inspector", "Neural inspector") were using lowercase for "inspector".
   - *Fix*: Updated to Title Case: "Constellation Inspector", "Neural Inspector".
3. **Hardcoded User-Facing Strings**:
   - *Issue*: Labels and fallback texts such as `Memory Record`, `Entity Hub`, `Connected Edges`, `Loading metadata...`, `Metadata unavailable.`, `No semantic connections.`, `Failed to load 3D engine`, `Source:`, `Scope:`, `Veracity:`, and `Imp:` were hardcoded in the JSX code.
   - *Fix*: Extracted all hardcoded user-facing strings to the `visualiser` section in `web/src/utils/i18n.ts` and loaded them dynamically via the `t()` translation helper.
4. **Missing Capitalization in Badges**:
   - *Issue*: Metadata fields like `veracity` (e.g. "stated", "inferred") and `scope` (e.g. "session", "global") were displayed in raw lowercase format as returned from the API, causing visual inconsistency.
   - *Fix*: Added `textTransform: 'capitalize'` styling to the veracity badge and scope metadata elements inside the inspector's Entity Hub.
5. **Hardcoded Fallbacks**:
   - *Issue*: Fallback strings like `'unknown'` were hardcoded instead of using the localized `t('common.unknown')`.
   - *Fix*: Replaced them with the global `t('common.unknown')` helper.
