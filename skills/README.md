# Skills

This directory stores Agent Skills as defined by the Agent Skills specification:

- Spec: https://agentskills.io/specification

## Layout

Each skill is a child directory that contains, at minimum, a `SKILL.md` file:

```
skills/
  <skill-name>/
    SKILL.md
    assets/
    references/
    scripts/
```

The skill directory name must match the `name` field in `SKILL.md` frontmatter.
