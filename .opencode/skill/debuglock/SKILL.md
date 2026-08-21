---
name: debuglock
description: >
  Breaks retry-debug loops: stops blind fix attempts, forces root-cause analysis with
  ranked hypotheses before touching code again. Use when the same error has been fixed
  unsuccessfully twice in a row, when user says "masih error", "error lagi", "debug",
  "loop", or whenever you notice you have made 2+ consecutive failed fix attempts on
  the same issue. Auto-trigger; do not wait to be asked.
---

Retry loops burn tokens multiplicatively: error → fix → error → re-read → fix.
When triggered, stop paying that tax and find the root cause instead.

## Trigger

- You have made 2+ consecutive failed fix attempts on the same error, OR
- The user reports the error persists ("masih error", "error lagi", "debug", "loop").

## Protocol (in order, no skipping)

1. **STOP editing.** No more fixes until this protocol completes.
2. **Inventory from history** (no re-running anything): list every attempt already
   tried and the exact error each produced.
3. **Read once, fully.** Read the complete relevant file(s) and full stack trace one
   time. Never re-read a file that has not changed since your last read.
4. **Ranked hypotheses.** Write a numbered list of hypotheses with evidence for and
   against each. Rank by likelihood.
5. **Verify cheapest first.** Discriminate hypotheses with logging, an assert, or a
   minimal repro BEFORE editing any code.
6. **Fix at the root.** Apply the fix at the choke point (the shared function all
   callers route through), not per-caller symptom patches. Grep every caller first.
7. **One change per cycle.** Each edit→test cycle changes exactly one thing, so
   results isolate variables.
8. **Trim logs.** From long output, extract only failing assertion/error lines;
   never paste whole logs into context.

## Hard budget

After activation, if 2 fix attempts fail: STOP permanently on this bug. Report:

- Attempts made and their errors
- Hypothesis status (confirmed / refuted / untested)
- What you need from the user (decision, access, or information)

Never continue solo past this point.

## Rules

- No blind retries: never re-attempt a fix whose hypothesis is already refuted.
- No shotgun edits: multiple simultaneous changes destroy signal.
- If new evidence invalidates the hypothesis list mid-cycle, return to step 4,
  not to editing.
