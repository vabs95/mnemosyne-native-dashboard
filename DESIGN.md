# Mnemosyne Native Dashboard — Design & Coding Conventions

This document outlines the UI/UX consistency, colors, and layout guidelines for the dashboard.

## 1. Hermes SDK First Policy
This dashboard is a plugin integrated within the Hermes workspace. Always use Out-Of-The-Box (OOTB) components from `@hermes/sdk` to maintain a unified theme and look:
*   **Preferred Components**: `Card`, `CardHeader`, `CardTitle`, `CardContent`, `Badge`, `Button`, `Input`, `Select`, `Tabs`, `TabsList`, `TabsTrigger`, `Checkbox`.
*   **Custom Styling**: Only write custom CSS or vanilla HTML layouts when the SDK components cannot support the required behavior.

## 2. UI/UX Consistency Rules
*   **Section Headers**: `fontSize: '15px'`, `fontWeight: 600` for titles + `fontSize: '12px'`, `color: MG(0.45)` for subtitles.
*   **Card Inner Headers**: `fontSize: '12px'` for `CardTitle` inside breakdowns.
*   **Metric Labels**: `fontSize: '10px'`, UPPERCASE with `letterSpacing: '0.08em'`.
*   **Session Links**: Displayed in monospace as `session:{shortId(id)}`, underlined, and clickable.
*   **Row Hover**: Interactive rows must default to `background: MG(0.03)` (or transparent/card bg), transition to `MG(0.07)` on hover, with a duration of `0.15s`.
*   **Empty States**: Centered, `fontSize: '12px'`, `color: MG(0.35)`, `padding: '20px'`. Use `1px dashed MG(0.15)` borders for primary empty containers.
*   **Loading States**: Centered, `color: MG(0.4)`, `padding: '32px'`.

## 3. Colors & Badge Color Scheme
Do not use generic raw color codes. Use theme tokens or the opacity function `MG(opacity)` where `MG = (o: number) => rgba(234,234,234,o)`.
Badge backgrounds are restricted to:
*   **Veracity**: `stated` (#065f46), `inferred` (#1e3a8a), `tool` (#581c87), `imported` (#78350f), `unknown` (MG(0.1)).
*   **Lifecycle**: `hot` (#991b1b), `warm` (#854d0e), `cold` (#1e3a8a).
*   **Status**: Active (#065f46), Inactive (#991b1b).
*   **Alerts**: Needs Review (rgba(239,68,68,0.1) / color: #f87171), High Importance (rgba(245,158,11,0.1) / color: #fbbf24).

## 4. Code & Text Conventions
*   **Imports & Modules**: All tab components live in `web/src/components/` and must use named exports (never default exports).
*   **Numeric Display**: Always wrap values in `safeNumber(val, decimals, fallback?)` from `web/src/utils/format.ts`. Never use raw `.toFixed()`.
*   **UUID Truncation**: Truncate session UUIDs using `shortId(id)`.
*   **Loop Variables**: Never shadow the `t` localization helper. Use `tItem`, `cItem`, etc.
*   **Text Casing**: Use Title Case for tab labels, section/card headers, metric labels, button CTAs, and metadata fields. Use Sentence case for empty states and API badge values.
