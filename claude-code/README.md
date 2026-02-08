# Claude Code

Global instruction file for [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code).

## Setup

Symlink to Claude Code's expected location:

```bash
ln -nsf ~/Documents/src/agents/claude-code/instruction.md ~/.claude/CLAUDE.md
```

## What It Does

Claude Code automatically reads `~/.claude/CLAUDE.md` as global instructions for all projects. This instruction file enforces:

- User and developer experience priorities
- Test-first development
- No regressions policy
- Server and port management conventions

See [`instruction.md`](./instruction.md) for the full ruleset.
