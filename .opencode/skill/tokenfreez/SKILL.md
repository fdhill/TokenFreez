---
name: tokenfreez
description: >
  Freezes session state into FREEZE.md at project root so long conversations can be
  restarted cheaply in a fresh session. Replaces expensive chat history with one small
  file read. Use when user says "freeze", "tokenfreez", "freeze session", "save session",
  "resume", "lanjutkan dari freeze", or complains about long/expensive context. Also
  proactively suggest freezing when context grows large, a task completes, or the
  topic switches.
---

Freeze session state into a file. Chat history is resent as input tokens every turn
and grows costly; FREEZE.md is read once. Swap expensive storage for cheap storage.

## Freeze Procedure

Triggered by explicit request ("freeze", "tokenfreez") or when the user accepts an
auto-suggestion. Do this:

1. Summarize the current session state.
2. Overwrite `FREEZE.md` at the project root using this exact format:

```markdown
# FREEZE — <project> — <YYYY-MM-DD HH:MM>

## Active Task
<one line: what is being worked on right now>

## Decisions
- <decision> — <why>

## Done
- [x] <completed item>

## Pending / Next Steps
- [ ] <next action>

## Key Files
- <path> — <why it matters>
```

3. Tell the user exactly: run `/new`, then say "resume from FREEZE.md".

## Restore Procedure

When a session starts and the user says "resume", "lanjutkan", or mentions FREEZE.md:

1. Read `FREEZE.md` from the project root before answering anything else.
2. Treat it as the source of truth for prior context.
3. If its claims look stale (files moved, checklist items already done), verify
   against the actual files and refresh FREEZE.md.

## Auto-Suggest Rules

Proactively offer a freeze (one short sentence, do not nag) when:

- A task or milestone just completed.
- Large tool outputs have accumulated this session.
- The user switches to an unrelated topic.

## Rules

- **Overwrite, never append.** One file, always current. Keep it under ~100 lines.
- **No secrets** in FREEZE.md: no keys, tokens, passwords, credentials.
- Compress ruthlessly: decisions and next steps over narrative.
- If FREEZE.md already exists, update it in place rather than asking.
