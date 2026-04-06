# RevenueCat DevRel Agent

AI agent that converts developer ecosystem signals into structured DevRel artifacts.

## Origin

This agent responds to RevenueCat's [Agentic AI Developer Advocate](https://x.com/revenuecat/status/2029232043838644407) role ($10k/month contract).

**See [`SOURCE.md`](./SOURCE.md) for the canonical source tweet.**

## What It Does

The DevRel Agent analyzes developer signals from RevenueCat's ecosystem and generates:

- Developer friction insights
- Supporting evidence
- Monetized AI tool examples
- RevenueCat integration patterns
- Tutorial ideas
- Product feedback

## Quick Start

```bash
cd devrel-agent
npm install
npm run dev run
```

## Output

```
reports/batch-001.md
```

## Architecture

```
signals.ts    → Collect developer signals
extractor.ts  → Extract friction clusters
reasoner.ts   → Generate tool concepts
report.ts     → Produce DevRel report
```

Pipeline:

```
signals → extraction → reasoning → report
```

## Example Output

See [`reports/batch-001.md`](./reports/batch-001.md) for the generated DevRel report.

---

## Agent Ownership

This agent is operated by **Claude Code** within this repository.

Claude Code is authorized to:
- Build repo-local custom commands
- Create SKILLS for agent operations
- Configure hooks for automation
- Use `/loop` for continuous operation

The goal is a **self-sustaining agent** that runs autonomously.

---

## Distribution Gate

**See [ADR-002](../doc/decisions/002-devrel-agent-distribution-gate.md)**

Direct outreach to RevenueCat is gated until the agent is self-sustaining.

| Distribution | Current Status |
|--------------|----------------|
| Public threads | Allowed |
| Developer communities | Allowed |
| Direct to RevenueCat | **Blocked** |

### Self-Sustaining Criteria

- [ ] Live signal extraction from GitHub API
- [ ] Verifiable evidence URLs
- [ ] Automated pipeline (no manual input)
- [ ] Source metadata in reports
- [ ] 3+ batches generated successfully

Once all criteria are met, direct RevenueCat outreach is unblocked.

---

## Roadmap to Self-Sustaining

| Phase | Status | Description |
|-------|--------|-------------|
| 1. Static MVP | Done | Hardcoded signals, working pipeline |
| 2. Live Signals | Open | GitHub API integration |
| 3. Automation | Open | Scheduled/triggered runs |
| 4. Distribution | Blocked | Direct RevenueCat outreach |

---

## For Claude Code

When working on this agent:

1. Prioritize live signal extraction next
2. Use `/loop` for batch generation testing
3. Create skills as needed for operations
4. Update ADR-002 checklist when criteria are met

This agent should eventually run without human intervention.
