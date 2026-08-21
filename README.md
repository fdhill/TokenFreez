# TokenFreez

[![npm version](https://img.shields.io/npm/v/tokenfreez)](https://www.npmjs.com/package/tokenfreez)
![License](https://img.shields.io/badge/license-MIT-blue)

opencode skills that cut token waste in AI coding sessions. Each skill targets one of
the four ways coding agents quietly burn tokens — so small tasks stop costing big money.

## Why

LLM APIs are stateless: every turn resends the whole conversation as input tokens.
Anything that grows context — long histories, retry loops, broad searches, verbose tool
output — gets paid for again on every subsequent turn. TokenFreez attacks all four.

| Problem | Fix | Component |
|---|---|---|
| History resent every turn grows cost | Freeze session state to a file, restart cheap | [tokenfreez](skills/tokenfreez/SKILL.md) |
| Retry-debug loops multiply cost | Stop blind fixes, hypothesize first, hard budget | [debuglock](skills/debuglock/SKILL.md) |
| Unstructured codebase exploration | Docs first, narrow search, subagent delegation | [scoutlock](skills/scoutlock/SKILL.md) |
| Verbose tool results flood context | Silence, redirect-and-grep, extract the one fact | [outputlock](skills/outputlock/SKILL.md) |
| Narration and code echo during work | Silent `[ ]`/`[x]` checklist output only | [build agent override](.opencode/agent/build.md) |

## Install

Requires [opencode](https://opencode.ai). Published on
[npm](https://www.npmjs.com/package/tokenfreez).

### One line (recommended)

Add `"plugin": ["tokenfreez"]` to your `opencode.json` — per project, or globally at
`~/.config/opencode/opencode.json` to enable the skills in every project:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["tokenfreez"]
}
```

Restart opencode — all four skills are available in every project.

> Pick **one** install method: enabling the plugin while also copying the skills
> manually registers duplicate skill names.

### Manual

Copy the skills you want into your project, or globally into `~/.config/opencode/skills/`:

```bash
cp -r skills/tokenfreez  your-project/.opencode/skills/
cp -r skills/debuglock   your-project/.opencode/skills/
cp -r skills/scoutlock   your-project/.opencode/skills/
cp -r skills/outputlock  your-project/.opencode/skills/
```

Optionally adopt the silent build agent:

```bash
mkdir -p your-project/.opencode/agent
cp .opencode/agent/build.md your-project/.opencode/agent/
```

Restart opencode so the skills load.

## Usage

Skills auto-trigger from natural language — no slash commands needed:

| Say / situation | Skill that kicks in |
|---|---|
| "freeze", "save session" | tokenfreez writes `FREEZE.md` |
| "masih error", second failed fix on the same bug | debuglock stops blind retries |
| multi-file exploration, "dimana", "carikan" | scoutlock reads docs before code |
| install/build/test runs, web lookups | outputlock keeps logs out of context |

### Freeze / resume cycle

```
(long session getting expensive)

you: freeze        → AI writes FREEZE.md with state, decisions, next steps
you: /new          → fresh, cheap session
you: resume        → AI reads FREEZE.md — context restored at one file-read price
```

`FREEZE.md` is gitignored by default so session state never gets committed.

## Notes

- Skills are plain markdown (`SKILL.md`) — portable to any tool that uses the same convention.
- scoutlock prefers an Obsidian vault when one is connected; otherwise it falls back to `README.md` / `docs/`.
- The build agent override is opencode-specific.

## License

[MIT](LICENSE) © fdhill
