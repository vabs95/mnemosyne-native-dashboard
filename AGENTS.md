# Mnemosyne Native Dashboard — Agent Rules

This file contains guidelines specifically for AI coding assistants working on this repository.

## 1. Graphify Knowledge Graph
This project maintains an AST-based knowledge graph in `graphify-out/`.
*   **Codebase Queries**: Before reading files or using grep, run `graphify query "<question>"` to obtain a scoped subgraph. Use `graphify path` for relationships and `graphify explain` for concepts.
*   **Graph Sync**: After modifying any files, always run `graphify update .` to keep the AST current.

## 2. Safety Guidelines
*   **Read-Only Default**: The dashboard UI must remain read-only by default. Mutation actions (supersede, expire, invalidate) must be hidden unless `adminMode === true` is passed.
*   **SDK Focus**: Prefer Out-Of-The-Box components from `@hermes/sdk` over writing custom HTML, CSS, or JS layouts.

## 3. Design & Domain References
*   Refer to [DESIGN.md](file:///C:/Personal/Dev/mnemosyne-dashboard/DESIGN.md) for UI styling, row hovers, colors, and coding standards.
*   Refer to [AI.md](file:///C:/Personal/Dev/mnemosyne-dashboard/AI.md) for the BEAM memory model architecture.

## 4. Verification Check
Run these checks before ending your turn:
1.  `cd web && npm run typecheck`
2.  `cd web && npm run lint`
3.  `cd web && npm run build`
4.  `python -m pytest -q`
5.  `graphify update .`
