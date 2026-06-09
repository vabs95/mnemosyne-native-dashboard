# Mnemosyne Native Dashboard — Design & UX Guidelines

This document defines the core styling and coding standards to keep the dashboard native, performant, and consistent.

## 1. Hermes SDK First Policy
Always prioritize Out-Of-The-Box (OOTB) components from `@hermes/sdk` (`Card`, `Badge`, `Button`, `Input`, `Select`, `Tabs`, `Checkbox`).
*   **Custom Styling**: Only write custom CSS or vanilla HTML layouts when native SDK components cannot support the required behavior.

## 2. Core UI & UX Standards
*   **Typography Hierarchy**:
    *   Main Tab Title: `fontSize: '15px'`, `fontWeight: 600` (Subtitle: `12px`, `color: MG(0.45)`).
    *   Breakdown Cards: Inner headers should use `fontSize: '12px'` for titles.
    *   Metric Labels: Upper-case with `fontSize: '10px'`.
*   **List Item Hover**: All interactive rows must have a smooth hover transition:
    *   `transition: 'background 0.15s'`
    *   Default background `MG(0.03)` (or card/list bg), transitioning to `MG(0.07)` on hover.
*   **States**:
    *   **Empty States**: Centered text, `fontSize: '12px'`, `color: MG(0.35)`, `padding: '20px'`. Primary empty lists should use a `1px dashed MG(0.15)` border container.
    *   **Loading States**: Centered text, `color: MG(0.4)`, `padding: '20px'` or `32px`.
*   **Casing**: Use Title Case for titles, buttons, tabs, and headers; use Sentence case for descriptions, empty states, and badge statuses.

## 3. Formatting & Coding Conventions
*   **Local Badge Colors**: Use consistent local maps (e.g., `VERACITY_COLOR`) to color badges semantically (green = stated/active, red = hot/inactive, blue/purple = inferred/tool).
*   **Numerical Display**: Wrap numeric calculations in `safeNumber(value, digits, fallback?)` to prevent crash-on-null errors. Never use raw `.toFixed()`.
*   **UUID display**: Truncate session UUIDs using `shortId(id)` and render in monospace.
*   **i18n**: All user-facing strings must use the `t('namespace.key')` translation helper.
