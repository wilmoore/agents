# 002. DevRel Agent Distribution Gate

Date: 2026-03-07

## Status

Accepted

## Context

The DevRel Agent generates developer friction reports for RevenueCat. The initial MVP produces structured artifacts with realistic formatting but uses static/synthetic signals rather than live data from RevenueCat's actual GitHub issues, discussions, and documentation.

Sending synthetic analysis to RevenueCat DevRel would:
- Expose fabricated evidence
- Undermine credibility
- Waste a high-value distribution opportunity

## Decision

**Direct outreach to RevenueCat (DMs, emails, tagged posts) is gated on the agent being self-sustaining.**

Self-sustaining means:

1. **Live signal extraction** — pulls real data from RevenueCat GitHub repos
2. **Verifiable evidence** — all quoted issues/discussions link to actual sources
3. **Automated pipeline** — runs without manual intervention
4. **Batch generation** — can produce sequential reports (Batch 001, 002, 003...)

Until these criteria are met:

| Distribution Channel | Allowed |
|---------------------|---------|
| Public thread (X, LinkedIn) | Yes |
| General developer communities | Yes |
| Direct to RevenueCat | **No** |

## Consequences

**Positive:**
- Preserves credibility for high-value outreach
- Creates clear milestone for agent completion
- Prevents premature exposure of synthetic data

**Negative:**
- Delays direct RevenueCat engagement
- Requires additional engineering work

## Implementation

Claude Code owns the DevRel Agent in this repository and is authorized to:

- Build repo-local custom commands
- Create SKILLS for agent operations
- Configure hooks for automation
- Use `/loop` for continuous operation

The agent becomes self-sustaining when it can run autonomously and produce verifiable reports.

## Verification Checklist

Before direct RevenueCat outreach:

- [ ] `signals.ts` fetches from GitHub API
- [ ] Evidence URLs resolve to real issues/discussions
- [ ] `devrel-agent run` executes without manual input
- [ ] Reports include timestamp and source metadata
- [ ] At least 3 batches generated successfully

## Related

- **Canonical Source:** [`devrel-agent/SOURCE.md`](../../devrel-agent/SOURCE.md) — Original RevenueCat tweet
- ADR-001: ChatGPT Project Directory Structure
- Planning: `.plan/feat-revenuecat-agentic-ai-developer-advocate/`
