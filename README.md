# Agents

Personal system instructions for LLM agents.

## Available Agents

| Agent | Platform | Purpose |
|-------|----------|---------|
| [Claude Code](./claude-code/) | Claude Code CLI | Quality-focused development guidelines |
| [ChatGPT](./chatgpt/) | ChatGPT | Strategic operator focused on leverage |

## Quick Setup

### Claude Code

```bash
ln -nsf ~/Documents/src/agents/claude-code/instruction.md ~/.claude/CLAUDE.md
```

### ChatGPT

Copy the contents of [`chatgpt/instruction.md`](./chatgpt/instruction.md) into ChatGPT's custom instructions.

## Structure

```
agents/
├── claude-code/
│   └── instruction.md    # Claude Code global rules
└── chatgpt/
    └── instruction.md    # ChatGPT Morpheus persona
```

## Adding New Agents

1. Create a directory named after the agent/platform
2. Add an `instruction.md` with the system prompt
3. Add a `README.md` with setup instructions
