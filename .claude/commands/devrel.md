# /devrel — RevenueCat DevRel Agent

Bootstrap command for new Claude Code sessions working on the DevRel Agent.

---

## On Invocation

1. Read `devrel-agent/SOURCE.md` for canonical mission
2. Read `devrel-agent/CLAUDE.md` for guardrails
3. Run `cd devrel-agent && npm run verify`
4. Based on status:
   - **If BLOCKED:** Show what's needed, offer to implement blocking items
   - **If PASSED:** Generate DM content, ready for distribution

---

## Mission (from SOURCE.md)

The RevenueCat Agentic AI Developer Advocate role requires:

| Responsibility | Implementation |
|----------------|----------------|
| Create content | Generate DevRel reports, tutorial ideas, monetized AI tool examples |
| Run growth experiments | Propose experiments, generate example products using RevenueCat |
| Provide product feedback | Surface developer friction, suggest improvements |

**Target:** $10k/month contract

---

## Current Priority

Implement live GitHub signal extraction to unblock distribution.

See [ADR-002](../doc/decisions/002-devrel-agent-distribution-gate.md) for distribution gate criteria.

---

## Quick Reference

```bash
# Check current status
cd devrel-agent && npm run verify

# Generate a batch
npm run dev run

# View latest report
cat devrel-agent/reports/batch-001.md
```

---

## Distribution Status

| Channel | Status |
|---------|--------|
| Public threads | Allowed |
| Developer communities | Allowed |
| Direct to RevenueCat | **Blocked** (pending live signals) |

---

## Entry Point

New session runs:

```
/devrel
```

Agent loads context, checks status, continues work.
