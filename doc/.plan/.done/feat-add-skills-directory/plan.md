# Plan — Skills Directory + sow-generator Import

Branch: `feat/add-skills-directory`

## Goals

- Add a repo-level `skills/` directory that stores Agent Skills as child directories.
- Import `sow-generator` from a local `.skill` bundle.

## Decisions

- Skill format follows https://agentskills.io/specification
- Store extracted skill directory at `skills/sow-generator/`.
- Do not commit the original `.skill` archive once extracted.

## Verification

- `skills/sow-generator/SKILL.md` exists and `name` matches directory.
- `skills/sow-generator/assets/template.html` exists.

## Related ADRs

- `doc/decisions/003-store-agent-skills-under-skills-directory.md`
