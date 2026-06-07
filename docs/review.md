# Review Tab

The Review tab is the triage queue for memories that require human attention — contaminated, unverified, or lifecycle-due records are surfaced here for inspection and bulk action.

---

## Features

- **4 named queues** grouping memories by review category
- **Bulk selection** with multi-memory action support
- **"Open filtered browser"** shortcut to Memories tab with pre-set filters
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
| **"Open filtered browser"** button | Navigates to Memories tab pre-filtered to the active queue's criteria |
| Click a memory row | Opens Memory inspector modal |

> [!IMPORTANT]
> Bulk actions are only visible and operable when **Admin mode** is enabled in the Settings tab.

---

## Data Sources

```
GET /api/plugins/mnemosyne-native-dashboard/review
```
