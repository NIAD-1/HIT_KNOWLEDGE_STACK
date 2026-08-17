---
type: integration
status: draft
tags:
  - lms
  - obsidian
---

# Obsidian Integration

The LMS should be linked to Obsidian by making Obsidian the canonical learning environment.

## What Is Already Connected

- The vault is already an Obsidian vault because `.obsidian` exists.
- Core plugins include Properties, Templates, Daily Notes, Bookmarks, Canvas, Graph, Backlinks, Search, and Bases.
- Internal links are configured to update automatically.

## Recommended Obsidian Setup

1. Keep `000_LMS` at the top of the vault.
2. Set [[000_LMS/LMS Home|LMS Home]] as the default starting page or bookmark it.
3. Use [[000_LMS/Current Semester|Current Semester]] daily.
4. Use templates in [[000_LMS/Templates]] for new LMS notes.
5. Add frontmatter only to the units you actively study first.

## Suggested Tags

- `#lms`
- `#lms/unit`
- `#lms/project`
- `#lms/review`
- `#status/backlog`
- `#status/queued`
- `#status/active`
- `#status/review`
- `#status/complete`

## Deep Link Pattern

Obsidian can open vault notes through links like:

```text
obsidian://open?vault=HIT_Knowledge_Stack&file=000_LMS%2FLMS%20Home
```

A future LMS app can use this pattern to jump from the app into Obsidian.

## App Architecture Later

If you build a custom app, use this split:

| Layer | Responsibility |
|---|---|
| Obsidian vault | Content, notes, links, reflections |
| Markdown indexer | Scans folders and extracts metadata |
| Local database | Progress, reviews, scheduling, analytics |
| Web UI | Dashboard, search, current lesson, assignments |
| AI assistant | Tutor, quiz maker, curriculum planner, reviewer |

## Minimum Useful Product

The first useful version does not need authentication, payments, certificates, or complex admin tools.

It needs:

- Course browser
- Current semester page
- Learning unit view
- Progress status
- Assignment evidence
- Review queue
- Obsidian open-link button
- Search

## Data Rule

When in doubt, write back to markdown. Your notes should remain useful even if the custom LMS app disappears.
