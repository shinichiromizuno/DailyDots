---
applyTo: "**/*.tsx,**/*.ts,**/*.css"
---

# UI and UX Design Standards

## Scope
- Applies to UI and interaction design decisions across TSX, TS, and CSS files.
- Prioritize clarity, simplicity, and usability over visual novelty.

## Core Principles
- Make primary actions obvious and secondary actions unobtrusive.
- Reduce cognitive load through predictable structure and clear labels.
- Prefer progressive disclosure over dense, all-at-once interfaces.
- Optimize for fast comprehension and efficient task completion.

## Layout Consistency
- Use consistent page structure: header, main content, and contextual actions.
- Keep alignment and container widths consistent within the same feature area.
- Maintain stable placement for key controls to reduce relearning.
- Avoid unnecessary layout shifts during loading, validation, or state changes.

## Spacing System
- Use a defined spacing scale and apply it consistently for margins, gaps, and padding.
- Increase spacing to indicate separation between sections; tighten spacing within related groups.
- Keep tap targets and interactive controls comfortably spaced for touch and mouse use.
- Do not mix arbitrary spacing values without a clear reason.

## Typography Hierarchy
- Establish clear levels for page title, section title, body, and supportive text.
- Use typography to communicate information priority, not decoration.
- Keep line length and line height readable across mobile and desktop.
- Avoid excessive font-size variation; preserve a small, consistent type scale.

## Color Usage
- Assign semantic meaning to color roles (primary, success, warning, danger, neutral).
- Reserve high-emphasis colors for important actions and states.
- Ensure text/background and state indicators meet accessible contrast standards.
- Do not rely on color alone to communicate status; pair with labels or icons.

## Accessibility Requirements
- Ensure full keyboard operability for all interactive elements.
- Provide visible and consistent focus indicators.
- Use semantic elements and accessible naming for controls and form fields.
- Provide clear validation and error feedback near the relevant input.
- Respect reduced-motion preferences for non-essential animations.

## Component Consistency
- Reuse existing component patterns before creating new variants.
- Keep behavior and visual states consistent for similar components.
- Define explicit states for default, hover, active, focus, disabled, loading, and error.
- Prefer composable, single-purpose components over large, multi-responsibility components.

## Decision Rules
- Choose the simplest design that satisfies user goals and constraints.
- Prioritize readability and task success when trade-offs are required.
- Document non-obvious design decisions when they affect reuse or behavior.
