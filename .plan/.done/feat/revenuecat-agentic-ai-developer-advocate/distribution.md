# Distribution Plan

---

## Distribution Gate

All direct RevenueCat outreach is gated by verification.

```bash
cd devrel-agent && npm run verify
```

**Until verification passes:**
- Public threads: Allowed
- Developer communities: Allowed
- Direct RevenueCat contact: BLOCKED

---

## Asset: Public Gist

**URL:** https://gist.github.com/wilmoore/4d497fba82894b5bb128f6726fe670d0

**Title:** RevenueCat Developer Friction Report — Batch 001

---

## Asset: Public Thread

See `ready-to-post.md` for copy-paste thread content.

Target: X/Twitter, general developer audience.

Do NOT tag @RevenueCat until verification passes.

---

## Blocked: Direct RevenueCat Outreach

**No DM templates are stored in this repository.**

When `npm run verify` passes:
1. Claude Code will generate DM content with real evidence
2. Content will reference actual GitHub issue URLs
3. Outreach becomes credible

Until then, this section remains empty by design.

---

## Verification Criteria (ADR-002)

- [ ] Live signal extraction from GitHub API
- [ ] Verifiable evidence URLs (real issues, not /example-)
- [ ] Automated pipeline (no manual input)
- [ ] Source metadata in reports
- [ ] 3+ batches generated successfully

---

## Next Steps to Unblock

1. Implement GitHub API calls in `signals.ts`
2. Generate Batch-002 and Batch-003 with live data
3. Run `npm run verify`
4. If all checks pass, generate DM content
