---
applyTo: "**/*.css,**/*.ts,**/*.tsx"
---

# CSS and Tailwind Standards

## Scope
- Applies to styling decisions in CSS, TS, and TSX files.
- Follow [project instructions](../copilot-instructions.md) for architecture and stack constraints.

## Tailwind-First Approach
- Prefer Tailwind utility classes for layout, spacing, typography, color, and state styling.
- Keep styling close to components through className composition; avoid scattered style decisions.
- Reuse approved design tokens and utility patterns before introducing new values.

## Class Organization Order
- Keep class order consistent for readability and reviewability.
- Use this order in className strings:
  1. Layout and positioning
  2. Box model (display, size, spacing)
  3. Typography
  4. Visual styles (color, background, border, shadow)
  5. Effects and animation
  6. Interaction states (hover, active, disabled)
  7. Responsive variants
- Group related utilities and avoid duplicated or conflicting classes.

## Responsive Design Rules
- Build mobile-first; base classes target the smallest viewport.
- Add breakpoint variants progressively (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`) only when the layout requires them.
- Prefer fluid layouts and content-driven breakpoints over hardcoded device assumptions.
- Ensure components remain usable and readable across common mobile, tablet, and desktop widths.

## Accessibility and Focus States
- All interactive elements must have visible keyboard focus styles.
- Never remove focus indication without an accessible replacement (`focus-visible:` styles required).
- Maintain sufficient color contrast for text, icons, borders, and focus rings.
- Use semantic HTML first; ARIA should complement, not replace, correct element choice.
- Ensure hover-only behaviors have keyboard and touch-accessible alternatives.

## When Custom CSS Is Allowed
- Use custom CSS only when Tailwind utilities cannot express the requirement clearly.
- Valid cases include:
  - Complex keyframe animations
  - Third-party component overrides that cannot be handled via utilities
  - Advanced selectors/pseudo-elements not practical in utility form
- Keep custom CSS scoped, minimal, and component-focused.
- Do not duplicate styles already available through Tailwind utilities.

## Maintainability
- Prefer predictable, explicit class composition over clever abstractions.
- Remove dead utility classes and unused CSS while editing.
- Keep styling decisions consistent with existing patterns in the same feature area.
