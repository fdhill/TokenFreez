---
name: outputlock
description: >
  Keeps verbose tool results out of context: silences or truncates bash output,
  extracts single facts from web results, and summarizes oversized tool dumps instead
  of echoing them. Use BEFORE running commands known to produce long output (install,
  build, test, tail logs), before web search/fetch, when only one small fact is needed
  from a big source, or when a huge tool result has just landed.
---

Tool results enter context whole and are resent every turn. One careless dump is paid
for the rest of the session.

## Bash discipline

1. Prefer commands that are quiet by default; add flags when needed (`-q`, `--silent`,
   `--no-progress`, `2>&1 | tail -n 20`).
2. If long output is unavoidable, redirect it to a temp file and grep/tail only the
   relevant part into context:
   `npm install > /tmp/install.log 2>&1; tail -n 5 /tmp/install.log`
3. Stack traces: keep the full trace in a file if needed, but read only the header
   and the first error frames - never paste hundreds of lines into context.
4. Never run a command again just to "see the output again" - grep the saved file.

## Web discipline

1. One search per question. Extract the fact as a one-line note immediately.
2. Do not re-search or re-fetch the same topic; do not open the page when the search
   snippet already answers the question.
3. Never quote a whole page back into context - the extracted line is the record.

## File reads

Follow scoutlock: segment reads (offset/limit) before full reads, never re-read
unchanged files.

## When a huge result lands anyway

Summarize it to one line internally and reason from that summary onward. Never echo,
quote, or re-read the raw blob.

## Rules

- Extraction over ingestion: get the 1 fact, leave the 10k tokens behind.
- Silence is free: a flag that prevents output costs nothing; filtering it later
  still pays for generating it.
