# Mnemosyne Native Dashboard — Agent Rules

## graphify

This project has a knowledge graph at `graphify-out/` with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, invoke the `skill` tool with `skill: "graphify"` before doing anything else.

Rules:
- For codebase questions, first run `graphify query "<question>"` when `graphify-out/graph.json` exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Dirty `graphify-out/` files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If `graphify-out/wiki/index.md` exists, use it for broad navigation instead of raw source browsing.
- Read `graphify-out/GRAPH_REPORT.md` only for broad architecture review or when query/path/explain do not surface enough context.
- **After every commit, run `graphify update .` to keep the graph current (AST-only, no API cost).**

---

## Project Architecture

### Stack
- **Backend**: Python plugin (`__init__.py`) exposing REST API at `/api/plugins/mnemosyne-native-dashboard/*`
- **Frontend**: React + TypeScript, built with esbuild (`web/esbuild.js`), output to `dashboard/`
- **Hermes SDK**: `@hermes/sdk` — provides `fetchJSON`, `Card`, `Badge`, `Button`, `Tabs`, `Input`, `Select`, etc.
- **i18n**: Central translation utility at `web/src/utils/i18n.ts` with `t('namespace.key')` helper
- **Formatting**: Shared helpers at `web/src/utils/format.ts` (`safeNumber`, `shortId`, `formatDateTimeLabel`, `formatRelativeTime`)

### BEAM Memory Model
Mnemosyne follows the **BEAM** (Bilevel Episodic-Associative Memory) architecture:
| Tier | Name | Description |
|------|------|-------------|
| 1 | Working Memory | Short-term active thoughts from current session |
| 2 | Episodic Memory | Archived session memories |
| 3 | Scratchpad | Reasoning workspace / temp notes |

Degradation: `hot` (tier 1) → `warm` (tier 2, after N days) → `cold` (tier 3, after M days)

### Tab Registry (`web/src/index.tsx`)
| Tab ID | Component | Purpose |
|--------|-----------|---------|
| `overview` | `OverviewTab` | System health, stat cards, live memory log |
| `today` | `TodayTab` | Daily digest of additions, recalls, facts, consolidations |
| `visualiser` | `VisualiserTab` | 3D memory constellation (WebGL) |
| `review` | `ReviewTab` | Trust triage queues for contaminated memories |
| `memories` | `MemoriesTab` | Full-featured memory search and browser |
| `profile` | `ContextBankTab` | Inferred user profile / context bank |
| `lifecycle` | `LifecycleTab` | Degradation health by tier |
| `graph` | `GraphTab` | KG relationship graph + triples table |
| `memoria` | `MemoriaTab` | Memoria 3.x structured fact store |
| `activity` | `HistoryTab` | Chronological timeline + consolidations |
| `settings` | `SettingsTab` | DB diagnostics + admin mode toggle |

---

## Development Rules & Conventions

### Safety
- **Dashboard is read-only by default.** No write or delete operations unless `adminMode === true`.
- Admin mode is gated by `adminMode` prop threaded from `index.tsx`. Check before rendering any mutation UI.
- Maintenance/write actions (supersede, expire, invalidate) must be behind the `{adminMode && ...}` guard.
- Never trigger degradation operations from the UI — those run server-side only.

### Code Style
- All components live in `web/src/components/`, one file per tab.
- Use **named exports** (`export const FooTab`), never default exports for tab components.
- The `MG` helper must always be a **function**: `const MG = (o: number) => \`rgba(234,234,234,${o})\`` — never a string.
- Use `safeNumber(val, decimals, fallback?)` for any numeric display — never raw `.toFixed()` without null checks.
- Use `shortId(session_id)` for session ID display — never the raw UUID.
- Loop variable names must not shadow the `t` translation helper — use `tItem`, `cItem`, `tTab`, etc.

### i18n
- **All user-facing strings must use `t('namespace.key')`** — no hardcoded English strings in JSX.
- Add new keys to `web/src/utils/i18n.ts` before using them.
- Namespace keys by tab: `overview.*`, `today.*`, `memories.*`, `review.*`, `lifecycle.*`, `history.*`, `memoria.*`, `settings.*`, `contextBank.*`, `visualiser.*`, `graph.*`, `index.*`, `common.*`.
- `common.*` is for strings reused across multiple tabs (loading, close, noData, etc.).

### UI/UX Consistency Rules
- **Section headers**: `fontSize: '15px', fontWeight: 600` for main tab title + `fontSize: '12px', color: MG(0.45)` subtitle.
- **Card inner headers**: `fontSize: '12px'` CardTitle inside breakdown cards.
- **Metric labels**: `fontSize: '10px'` UPPERCASE with `letterSpacing: '0.08em'`.
- **Importance label**: Always abbreviated as `imp:` (not `importance:`).
- **Session links**: Always displayed as `session:{shortId(id)}` in monospace, underlined, clickable.
- **Empty states**: Centered, `fontSize: '12px'`, `color: MG(0.35)`, with `padding: '20px'`. Use dashed border for primary empty containers.
- **Loading states**: Centered text, `color: MG(0.4)`, `padding: '32px'`.
- **Row hover**: `background: MG(0.03)` default, `MG(0.07)` on hover, transition `0.15s`.

### Badge Color Scheme (Semantic, Consistent)

| Context | Value | Background |
|---------|-------|------------|
| Veracity | `stated` | `#065f46` (dark green) |
| Veracity | `inferred` | `#1e3a8a` (dark blue) |
| Veracity | `tool` | `#581c87` (dark purple) |
| Veracity | `imported` | `#78350f` (dark amber) |
| Veracity | `unknown` | `MG(0.1)` (neutral) |
| Lifecycle | `hot` | `#991b1b` (red) |
| Lifecycle | `warm` | `#854d0e` (amber) |
| Lifecycle | `cold` | `#1e3a8a` (blue) |
| Status | Active | `#065f46` |
| Status | Inactive | `#991b1b` |
| Alert | Needs Review | `rgba(239,68,68,0.1)` / `color: #f87171` |
| Alert | High Importance | `rgba(245,158,11,0.1)` / `color: #fbbf24` |
| Neutral count badge | — | Default SDK Badge (no override) |

Use the shared `VERACITY_COLOR` record defined locally in each tab that shows veracity badges:
```ts
const VERACITY_COLOR: Record<string, string> = {
  stated: '#065f46',
  inferred: '#1e3a8a',
  tool: '#581c87',
  imported: '#78350f',
};
// Usage:
<Badge style={{ background: VERACITY_COLOR[String(m.veracity).toLowerCase()] || MG(0.1) }}>{m.veracity}</Badge>
```

### Text Casing Conventions
| Element | Convention | Example |
|---------|-----------|---------|
| Tab labels | Title Case | `Overview`, `Context Bank`, `Memoria` |
| Section headers | Title Case | `Live Memory Log`, `Trust Mix` |
| Card titles | Title Case | `Table Counts`, `Top Sessions` |
| Metric labels | Title Case | `Working Memory`, `Needs Review` |
| Button CTAs | Title Case | `Apply Filters`, `Create Backup` |
| Metadata field labels | Title Case | `Memory ID`, `Effective Weight` |
| Badge values | Sentence case (from API) | `stated`, `inferred`, `hot` |
| Empty state messages | Sentence case | `No memories found.` |

### Commit Conventions
- Use Conventional Commits: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`
- Always run `graphify update .` immediately after each commit.
- All commits must pass: `npm run typecheck`, `npm run build`, `python -m pytest -q`

### PR Checklist
- [ ] `python -m ruff check .`
- [ ] `python -m ruff format --check .`
- [ ] `python -m pytest -q`
- [ ] `python -m compileall -q .`
- [ ] `cd web && npm run build`
- [ ] `cd web && npm run typecheck`
- [ ] Dashboard remains read-only by default
- [ ] Maintenance/write actions disabled unless `adminMode` enabled in Settings
- [ ] All new strings added to `web/src/utils/i18n.ts`
- [ ] `graphify update .` run after final commit

---

## Documentation
Each tab has a corresponding doc in `docs/`:
- `docs/overview.md` — Overview tab
- `docs/today.md` — Today tab
- `docs/memories.md` — Memories tab
- `docs/review.md` — Review tab
- `docs/lifecycle.md` — Lifecycle tab
- `docs/history.md` — History tab
- `docs/memoria.md` — Memoria tab
- `docs/graph.md` — Graph tab
- `docs/visualiser.md` — Visualiser tab
- `docs/context-bank.md` — Context Bank tab
- `docs/settings.md` — Settings tab
