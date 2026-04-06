# Agents

Personal system instructions for LLM agents.

## Available Agents

| Agent | Platform | Purpose |
|-------|----------|---------|
| [Claude Code](./claude-code/) | Claude Code CLI | Quality-focused development guidelines |
| [ChatGPT](./chatgpt/) | ChatGPT | Strategic operator focused on leverage |
| [DevRel Agent](./devrel-agent/) | CLI | RevenueCat developer advocacy automation |

## Quick Setup

### Claude Code

```bash
ln -nsf ~/Documents/src/agents/claude-code/instruction.md ~/.claude/CLAUDE.md
```

### ChatGPT

Copy the contents of [`chatgpt/instruction.md`](./chatgpt/instruction.md) into ChatGPT's custom instructions.

### DevRel Agent

```bash
cd devrel-agent && npm install && npm run dev run
```

## Structure

```
agents/
├── claude-code/
│   └── instruction.md    # Claude Code global rules
├── chatgpt/
│   └── instruction.md    # ChatGPT Morpheus persona
└── devrel-agent/
    ├── src/              # TypeScript source
    └── reports/          # Generated DevRel reports
```

## Adding New Agents

1. Create a directory named after the agent/platform
2. Add an `instruction.md` with the system prompt
3. Add a `README.md` with setup instructions
