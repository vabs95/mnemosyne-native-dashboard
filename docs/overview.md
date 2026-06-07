# Mnemosyne Dashboard Overview

The **Overview** tab serves as the central hub of the Mnemosyne Native Dashboard. It provides high-level metrics, multidimensional breakdowns of memory storage, and quick navigation paths.

## Key Metrics (Stat Cards)

The dashboard presents six core metrics at the top, each functioning as a call-to-action (CTA) button to filter or navigate to the corresponding tab:

1. **Working Memory**: Shows the count of active short-term thoughts. Clicking it filters the **Memories** list to `kind: working`.
2. **Episodic Memory**: Shows archived session memories. Clicking it filters the **Memories** list to `kind: episodic`.
3. **Needs Review**: Displays the count of contaminated or low-confidence memories. Clicking it switches to the **Review** tab.
4. **Degraded**: Displays the count of decayed episodic memory summaries. Clicking it switches to the **Lifecycle** tab.
5. **Triples**: Displays the count of extracted semantic facts. Clicking it switches to the **Graph** tab.
6. **Consolidations**: Displays the count of episodic summaries built. Clicking it switches to the **History** (timeline) tab.

## Storage Breakdowns

Beneath the metrics, five distinct breakdown panels analyze the memory database:

* **Trust Mix (Veracity)**: Grouping of memories by confidence preset (e.g., `stated`, `inferred`, `tool`, `imported`, `unknown`). Clicking any veracity label filters the memories by that veracity.
* **Lifecycle (Degradation)**: Grouping of episodic memories by decay tiers (`hot`, `warm`, `cold`). Clicking any tier filters the memories by that tier.
* **Sources**: Lists top creators of memories (e.g., `user`, `assistant`, `agent`). Clicking a source filters the memories.
* **Scopes**: Grouping by memory scope (e.g., `global`, `session`). Clicking a scope filters the memories.
* **Top Sessions**: Showcases the active agent interaction sessions sorted by memory volume. Session IDs are shortened for readability (e.g., `hermes_2…123456`). Clicking a session ID opens the **Session Details Inspector**.

## Live Memory Log

The **Live Memory Log** displays a real-time stream of the 25 latest memories recorded in the database. Each log entry highlights:
- The text content snippet.
- A veracity badge.
- An interactive session chip.
- Relevance/importance score.
- Relative creation time (e.g., `5m ago`, `2d ago`).

## Navigation & Filtering Flow

To ensure smooth transitions, all filter-based CTAs on the Overview tab reset unrelated memory filters before applying the new filter. This guarantees that clicking "Working Memory" or a specific "Source" takes you to a clean, correctly filtered list on the **Memories** tab.
