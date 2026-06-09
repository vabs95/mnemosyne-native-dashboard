# Mnemosyne Native Dashboard — AI Memory Model (BEAM)

This document describes the Bilevel Episodic-Associative Memory (BEAM) architecture monitored by this dashboard.

## Memory Tiers
Mnemosyne partitions agent memories into three primary tiers:

| Tier | Name | Description |
|------|------|-------------|
| 1 | Working Memory | Short-term active thoughts from the current session. |
| 2 | Episodic Memory | Archived session memories containing chronological events. |
| 3 | Scratchpad | Temporary reasoning workspace used by the agent during tasks. |

## Degradation Model
Memory degradation flows from **Working Memory (Hot)** $\rightarrow$ **Episodic Memory (Warm)** $\rightarrow$ **Scratchpad/Archived Memory (Cold)**. 

Degradation rules and scheduling are processed exclusively server-side. The dashboard provides read-only diagnostics to monitor these metrics.
