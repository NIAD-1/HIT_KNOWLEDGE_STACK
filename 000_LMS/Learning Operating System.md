---
type: lms-system
status: draft
tags:
  - lms
  - learning-system
---

# Learning Operating System

The goal is not to copy a school LMS. The goal is to build a personal founder-engineer university around your own knowledge stack.

## Design Principles

1. Obsidian remains the source of truth.
2. Notes stay readable as plain markdown.
3. Each topic must produce evidence, not just reading.
4. Progress is tracked lightly but consistently.
5. Learning should compound across science, engineering, regulation, business, and product thinking.

## Core Objects

| Object | Meaning | Existing Form |
|---|---|---|
| School | A major knowledge domain | Top-level folders like `017_Regulatory_Science` |
| Module | A course-sized block | `Module 01 - ...` folders |
| Chapter | A cluster of related topics | `Chapter ...` folders |
| Learning Unit | One topic to study and prove | Topic folder containing `Research.md`, `Learning.md`, `Assignment.md` |
| Project | A larger proof of capability | `Projects` and capstone folders |
| Reflection | What changed in your thinking | Weekly review or learning log |

## Standard Statuses

Use these consistently in notes and dashboards:

- `backlog`: worth studying later
- `queued`: selected for the current semester
- `active`: currently studying
- `blocked`: needs prerequisite, source, or decision
- `review`: completed once and needs review
- `complete`: proof exists
- `archived`: no longer relevant

## Learning Unit Metadata

Add this frontmatter to important learning units over time:

```yaml
type: learning-unit
status: queued
school:
module:
topic:
level: 1
priority: medium
started:
completed:
evidence:
next_action:
tags:
  - lms/unit
```

## Assessment Rubric

| Score | Meaning |
|---|---|
| 0 | I recognize the term but cannot explain it. |
| 1 | I can explain the idea simply. |
| 2 | I can solve guided problems or follow an implementation. |
| 3 | I can build with it without step-by-step help. |
| 4 | I can teach it, critique trade-offs, and connect it to other domains. |
| 5 | I can create original work, research questions, or product strategy from it. |

## Weekly Review

Each week, answer:

1. What did I finish?
2. What evidence did I produce?
3. What did I misunderstand?
4. What deserves review?
5. What should I study next?
6. What could become a product, platform, paper, or business?

## Obsidian Link Strategy

Use normal wiki links for durable connections:

- Link school pages from the LMS dashboard.
- Link active learning units from the semester note.
- Link assignments to projects.
- Link open questions to research notes.
- Link product ideas to business, entrepreneurship, and industry-domain notes.

## Future App Strategy

If this becomes a custom LMS app, it should treat this vault as a content repository:

- Read markdown files from the vault.
- Parse frontmatter for status and progress.
- Preserve Obsidian links.
- Write progress updates back as markdown.
- Avoid locking the learning system inside app-only data.
