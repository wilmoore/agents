---
name: sow-generator
description: >
  Generates a professional Statement of Work (SOW) PDF from markdown source content.
  Use this skill any time the user wants to create, generate, produce, or export a SOW,
  proposal, or scope document — even if they just say "make me a SOW", "turn this into
  a SOW", or "export this as a PDF". The output is always a downloadable PDF using the
  locked Savvy AI / Code Rescues brand design: navy header, DM Serif Display + DM Sans
  + DM Mono typography, two-column table scope layout with inline en-dash bullets, navy
  summary bar, amber notes block, and signature section.
---

# SOW Generator

Converts structured markdown into a branded, client-ready SOW PDF. The design is locked
— do not deviate from it. Every SOW produced must look identical in structure and style.

## Input Format

The user provides markdown in this shape (all sections optional except title and scope):

```markdown
# [Project Title]
## Outcome
[One or two sentences.]
## Scope
1. [Item Title]
- [bullet]
- [bullet]
2. [Item Title]
- [bullet]
...
## Timeline
[e.g. 3–5 days]
## Price
[e.g. $5,000]
## Notes
[Optional important note shown in amber block.]
## Meta
- Date: [e.g. April 1, 2026]
- Project Type: [e.g. Infrastructure & Reliability]
- Reference: [e.g. SOW-2026-04-01-CLIENT-TYPE-01]
```

## Output

A single PDF file delivered via `present_files`. Also keep the intermediate HTML in
`/mnt/user-data/outputs/` alongside the PDF for future edits.

## Step-by-Step Instructions

### 1. Parse the markdown

Extract:
- `title` — H1
- `outcome` — paragraph under `## Outcome`
- `scope_items` — numbered list under `## Scope`; each item has a title and bullet list
- `timeline` — value under `## Timeline`
- `price` — value under `## Price`
- `notes` — paragraph under `## Notes` (optional)
- `date`, `project_type`, `reference` — from `## Meta` or infer sensible defaults

### 2. Render the HTML

Use the locked template in `assets/template.html` as the base. Replace these placeholders:

| Placeholder | Value |
|---|---|
| `{{TITLE}}` | Project title |
| `{{DATE}}` | Date |
| `{{PROJECT_TYPE}}` | Project type |
| `{{REFERENCE}}` | Reference string |
| `{{OUTCOME}}` | Outcome paragraph |
| `{{SCOPE_ROWS}}` | Generated `<tr>` rows (see below) |
| `{{TIMELINE}}` | Timeline value |
| `{{PRICE}}` | Price value |
| `{{NOTES_BLOCK}}` | Amber notes block HTML (omit entirely if no notes) |

**Generating `{{SCOPE_ROWS}}`:**

Pair scope items into rows of two. For each pair, generate:

```html
<tr>
  <td>
    <div class="scope-item-title"><span class="scope-num">01</span> Item Title</div>
    <ul>
      <li>– Bullet text</li>
    </ul>
  </td>
  <td>
    <div class="scope-item-title"><span class="scope-num">02</span> Item Title</div>
    <ul>
      <li>– Bullet text</li>
    </ul>
  </td>
</tr>
```

If there is an odd number of items, the last `<tr>` has a single `<td colspan="2">` for
the final item, styled consistently.

**CRITICAL bullet rule:** Every `<li>` must begin with `– ` (en-dash + space) as literal
text. Do NOT use CSS `::before` pseudo-elements or `content:` for bullets — WeasyPrint
renders these inconsistently inside tables and produces double dashes.

**`{{NOTES_BLOCK}}`** when present:
```html
<div class="notes-block">
  <div class="notes-label">Important Note</div>
  <p>Note text here.</p>
</div>
```
Omit the entire block (replace placeholder with empty string) when there are no notes.

### 3. Convert HTML → PDF

```python
from weasyprint import HTML, CSS

HTML(filename='path/to/sow.html').write_pdf(
    'path/to/sow.pdf',
    stylesheets=[CSS(string='@page { size: A4; }')]
)
```

Install if needed: `python -m venv .venv && source .venv/bin/activate && pip install weasyprint -q`

### 4. Deliver

Save both files to `/mnt/user-data/outputs/` with a slug derived from the title, e.g.:
- `sow-infrastructure-stabilization.html`
- `sow-infrastructure-stabilization.pdf`

Call `present_files` with the PDF path.

---

## Design Rules (DO NOT CHANGE)

These are locked. Do not alter fonts, colors, spacing, or structure between SOWs.

- **Fonts:** DM Serif Display (title, outcome quote, summary values), DM Sans (body),
  DM Mono (labels, badges, footer)
- **Header:** Navy `#111827` background, white title, muted mono meta labels
- **Scope layout:** HTML `<table>`, two columns, horizontal rules between rows,
  vertical rule between columns — NO border-box cards
- **Scope numbers:** Mono badge, blue `#3b82f6` text on `#dbeafe` background
- **Bullets:** Inline `– ` character in `<li>` text. Never CSS pseudo-elements.
- **Summary bar:** Navy background, serif large values, mono labels
- **Notes:** Amber `#fffbeb` background, `#f59e0b` border
- **Page margins:** `@page :first { margin: 0 }` / `@page { margin-top: 48px }`
- **Signatures:** Two-column grid, three fields each (Name, Signature, Date)
- **Footer:** Centered mono text — `Confidential & Proprietary • [Title] SOW • Page 1 of 1`

See `assets/template.html` for the full reference implementation.
