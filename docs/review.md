# Review Tab

The Review tab is the triage queue for memories that require human attention — contaminated, unverified, or lifecycle-due records are surfaced here for inspection and bulk action.

---

## Features

- **4 named queues** grouping memories by review category
- **Bulk selection** with multi-memory action support
- **"Open Filtered Browser"** shortcut to Memories tab with pre-set filters
- **Admin-gated bulk actions** — only available when admin mode is enabled in Settings

---

## UI Layout

### Queue Cards

Clicking a queue card switches the active list below.

| Queue | Description |
|---|---|
| **Contaminated** | Memories flagged as potentially unreliable |
| **Important Contaminated** | High-importance contaminated memories needing priority review |
| **Degraded** | Memories in a degraded lifecycle tier |
| **Due for Degradation** | Memories approaching a tier transition threshold |

Each card shows the current count for its queue.

### Memory List

The active queue's memories are displayed as rows with:

- Veracity badge and importance score
- Source, scope, and session reference
- Content preview
- Checkbox for bulk selection

### Bulk Action Bar

Appears when one or more memories are selected (admin mode required):

| Action | Description |
|---|---|
| **Confirm** | Marks selected memories as reviewed/verified |
| **Set Trust** | Updates the trust level for all selected memories |
| **Set Expiry** | Assigns an expiry date/time to all selected memories |
| **Expire** | Immediately expires all selected memories |

---

## CTAs / Interactions

| Trigger | Action |
|---|---|
| Click a queue card | Switches the active memory list to that queue |
| Select memory checkboxes | Enables the bulk action bar |
| Submit a bulk action | Applies the operation to all selected memories |
| **"Open Filtered Browser"** button | Navigates to Memories tab pre-filtered to the active queue's criteria |
| Click a memory row | Opens Memory inspector modal |

> [!IMPORTANT]
> Bulk actions are only visible and operable when **Admin mode** is enabled in the Settings tab.

---

## Data Sources

```
GET /api/plugins/mnemosyne-native-dashboard/review
```

---

## Usage Guide & Value

The Review tab is the core administrative triage dashboard for Mnemosyne's **BEAM Memory Model**. In autonomous agent architectures, memories are continuously recorded from dynamic sources (conversations, tools, document ingestion, and background inferences).

### Triage Objectives
1. **Veracity Triage (Contaminated)**
   - Inferences or tool-generated memories start with unverified trust levels (`inferred`, `tool`, or `imported`). If they are flagged as potentially contaminated, they are queued here.
   - **Value**: Operators can audit high-importance records and confirm them (moving them to `stated`) or discard them, preventing misinformation from propagating back into the agent's long-term retrieval contexts.
2. **Lifecycle oversight (Degraded & Due for Degradation)**
   - Shows episodic memory clusters that have degraded into lower retention tiers or are scheduled for summarization/expiration.
   - **Value**: Provides visibility into the memory compression engine, ensuring key historical summaries are not degraded or expired incorrectly.

---

## Issues Found & Resolved

1. **Casing & Capitalization Inconsistencies**:
   - *Issue*: The active queue section header (e.g. `Needs review`, `Important memories needing review`) was rendered in sentence case, violating [DESIGN.md](file:///C:/Personal/Dev/mnemosyne-dashboard/DESIGN.md)'s Title Case requirement.
   - *Fix*: Applied CSS `textTransform: 'capitalize'` to list header container elements, ensuring they render as Title Case (e.g., `Needs Review`).
   - *Issue*: The "Open filtered browser" button text was in sentence case.
   - *Fix*: Changed to Title Case: "Open Filtered Browser". Updated frontend tests to query the button using a case-resilient regex (`/Open Filtered Browser/i`).
2. **Invalid Nested HTML inside Select Options**:
   - *Issue*: Dropdown select options were rendering a nested `<span>` inside the `<SelectOption>` component (which maps to an HTML `<option>` element). HTML specifications prohibit nested elements inside options, causing React warnings and DOM query failures in frontend unit tests.
   - *Fix*: Removed the `<span>` tag and replaced it with a Javascript-based text capitalization helper (`.replace(/\b\w/g, char => char.toUpperCase())`), keeping option nodes as plain text.
3. **Hardcoded User-Facing Strings**:
   - *Issue*: User-facing UI labels and placeholders (`Search`, fallback `'any'`, veracity select options, confirmation popups, error alert fallback strings, and detail labels like `imp:`, `session:`) were hardcoded in the JSX code.
   - *Fix*: Migrated all hardcoded values to namespaces `common` and `review` in `web/src/utils/i18n.ts` and loaded them dynamically via the `t()` helper.
