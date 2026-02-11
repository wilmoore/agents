# 001. ChatGPT Project Directory Structure

Date: 2026-02-11

## Status

Accepted

## Context

ChatGPT allows creating custom projects with system instructions. These projects need to be version-controlled alongside other LLM agent configurations in this repository. Projects are identified by unique IDs in the ChatGPT interface (e.g., `g-p-698c66f0c2608191ac76fe4366c82666`).

## Decision

Store ChatGPT project instructions under `chatgpt/projects/{project-id}/instruction.md` where:
- `{project-id}` is the ChatGPT-assigned project identifier
- Each project gets its own directory to allow for future expansion (additional files, assets)
- The main instruction file is always named `instruction.md`

## Consequences

**Positive:**
- Clear organization mirroring ChatGPT's project structure
- Project ID in path enables easy cross-reference with ChatGPT UI
- Directory structure allows adding related files per project
- Consistent with existing `chatgpt/` directory pattern

**Negative:**
- Project IDs are opaque (not human-readable)
- Requires looking at instruction content to understand project purpose

## Alternatives Considered

1. **Flat file structure** (`chatgpt/projects/{project-id}.md`) - Rejected because it doesn't allow for multi-file projects
2. **Human-readable names** (`chatgpt/projects/linkedin-inbound-engine/`) - Rejected because it creates sync issues with ChatGPT's actual project identifiers

## Related

- Planning: `.plan/.done/feat/linkedin-inbound-engine-chatgpt-project/`
