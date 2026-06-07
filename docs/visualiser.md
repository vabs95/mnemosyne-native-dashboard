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
