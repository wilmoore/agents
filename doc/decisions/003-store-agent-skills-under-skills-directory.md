# 003. Store Agent Skills Under skills/ Directory

Date: 2026-04-06

## Status

Accepted

## Context

We want to store reusable agent skills in this repository in a way that is:

- Harness-agnostic (usable by different agent runners)
- Validatable against a public spec
- Easy to browse, version, and review

The Agent Skills specification defines a skill as a directory containing at minimum a `SKILL.md` file with YAML frontmatter.

## Decision

Store Agent Skills as child directories under a top-level `skills/` directory.

- Each skill lives at `skills/<skill-name>/`
- Each skill must contain `skills/<skill-name>/SKILL.md` and follow the Agent Skills spec
- When importing packaged `.skill` archives (zip format), extract them into `skills/` and do not commit the original archive

## Consequences

**Positive:**

- Skills are portable and can be validated against an external specification
- Repository structure clearly separates skills from harness-specific command files

**Negative:**

- Adds another top-level concept (`skills/`) to the repo

## Alternatives Considered

1. Store skills under a harness-specific directory (e.g., `.claude/skills/`) — rejected because it ties skills to one runner.
2. Store only the `.skill` archive and not the extracted directory — rejected because it makes review and diffing harder.

## Related

- Spec: https://agentskills.io/specification
- Planning: `doc/.plan/feat-add-skills-directory/`
