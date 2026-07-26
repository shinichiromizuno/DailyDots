---
applyTo: "**/*"
---

# General Engineering Standards

## Naming
- Use descriptive, intention-revealing names.
- Prefer clear verbs for actions and nouns for data.
- Avoid ambiguous abbreviations unless they are widely understood.

## File and module structure
- Keep each file focused on a single responsibility.
- Group related code by feature or domain rather than by implementation detail.
- Prefer small, composable units over large monolithic files.

## Readability
- Write code that is easy to scan and understand.
- Keep functions and classes small and focused.
- Avoid deep nesting, duplicated logic, and unnecessary cleverness.

## Comments
- Use comments to explain why, not what.
- Avoid obvious or stale comments.
- Document non-obvious constraints, trade-offs, and external assumptions.

## Refactoring discipline
- Improve code while touching it.
- Extract duplication early and keep structure simple.
- Preserve behavior while simplifying implementation.
- Prefer incremental refactoring over large risky rewrites.

## Error handling
- Handle expected failures explicitly.
- Avoid silently swallowing errors.
- Surface actionable errors and preserve useful context.

## Imports and dependencies
- Keep imports organized and minimal.
- Prefer direct, local dependencies over hidden coupling.
- Remove unused code and unnecessary dependencies.

## Formatting and style
- Follow the repository’s existing style and formatting conventions.
- Keep formatting consistent, readable, and predictable.
- Use automated formatting tools when available.

## Collaboration
- Keep changes focused and easy to review.
- Preserve existing behavior unless a change is explicitly intended to alter it.
- Document significant decisions when they are not obvious from the code.
