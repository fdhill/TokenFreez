---
name: scoutlock
description: >
  Token-efficient codebase exploration: read documentation before code, search with
  narrow targeted queries, batch parallel lookups, and delegate broad hunts to a
  subagent. Use BEFORE any multi-file exploration, when about to run the 3rd search
  for the same thing, when user says "cari", "dimana", "explore", "carikan", or when
  you notice grep/read results piling up without answering the question.
---

Exploration burns more tokens than writing code. Search with intent or not at all.

## Step 0 - Docs first

Before touching any code-search tool, check documentation in this order:

1. Obsidian vault if connected: project index, architecture notes (backend/frontend),
   progress file - these state what exists and where by design.
2. Otherwise: `README.md`, `docs/` folder, root-level `*.md`.

Code search only fills gaps the docs do not answer. If docs name the exact file or
module, go straight to it - skip searching entirely.

## Protocol

1. **State the target** in one line before the first tool call: what symbol/fact is
   needed and why.
2. **Cheapest tool first:** glob for filenames → narrow grep (specific identifier +
   file-pattern filter like `*.ts`) → read a segment (offset/limit) → full file read
   only if it is small or genuinely needed whole.
3. **Batch parallel:** send independent searches in one turn, not one per turn.
4. **Never re-read** a file that has not changed since you last read it.
5. **Delegate broad hunts:** if finding the answer needs more than 3 search rounds,
   hand it to an explore subagent with a precise question; only its final answer
   enters main context, not the search noise.
6. **Tests smallest-first:** run one test function/file to verify locally; full
   suite at most once, at the end.
7. **Stop-rule:** the same search failing 3 times → stop, report what was tried and
   what is known so far, ask the user.

## Rules

- No fishing expeditions: never grep a generic word ("data", "handler") unfiltered.
- One question per search: know what answer would end the hunt before running it.
- If mid-hunt the target changes, restate it - do not drift into reading whatever
  looks interesting.
