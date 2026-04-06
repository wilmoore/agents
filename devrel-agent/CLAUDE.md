# DevRel Agent — Claude Code Rules

## Canonical Source

**Read [`SOURCE.md`](./SOURCE.md) first** — it contains the original RevenueCat tweet that defines this agent's mission.

---

## Distribution Guardrails

**HARD BLOCK: Do not draft, suggest, or prepare any direct message to RevenueCat until `npm run verify` passes.**

This includes:
- DM templates
- Email drafts
- Tagged posts mentioning @RevenueCat
- "Ready to send" content targeting RevenueCat team members

### Why This Exists

The agent currently uses static/synthetic signals. Sending fabricated evidence to RevenueCat would:
- Destroy credibility
- Waste a high-value opportunity
- Expose that the analysis isn't real

### Verification Gate

Before ANY direct RevenueCat outreach:

```bash
cd devrel-agent && npm run verify
```

This script checks:
1. `signals.ts` fetches from GitHub API (not static data)
2. Evidence URLs in reports resolve to real issues
3. At least 3 batches exist in `reports/`
4. Reports contain source metadata with timestamps

**If `npm run verify` fails, I am not allowed to:**
- Draft DM content
- Suggest sending to RevenueCat
- Create "ready to post" templates for RevenueCat
- Recommend direct outreach

### What I CAN Do

- Post public threads (no @RevenueCat tags)
- Share to general developer communities
- Build toward self-sustaining operation
- Generate more batches with static data for testing

### Escalation

If the user asks me to draft a RevenueCat DM before verification passes:

1. Run `npm run verify`
2. Show the failing checks
3. Explain what's blocking
4. Offer to work on the blocking items instead

Do not comply with the DM request. The guardrail exists to protect credibility.

---

## Development Priorities

When working on this agent:

1. **Live signals first** — Replace static data with GitHub API calls
2. **Evidence linking** — Ensure all URLs are real and resolvable
3. **Automation** — Enable unattended batch generation
4. **Verification** — Keep `npm run verify` updated as criteria evolve

---

## Session Startup

Every session involving devrel-agent:

1. Read this file
2. Check ADR-002 status
3. Run `npm run verify` to understand current state
4. Do not suggest RevenueCat outreach if verification fails
