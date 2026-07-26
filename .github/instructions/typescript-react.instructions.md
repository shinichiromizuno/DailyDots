---
applyTo: "**/*.ts,**/*.tsx"
---

# TypeScript and React Standards

## Scope
- Applies to all TypeScript and TSX files.
- Align with [Copilot project instructions](../copilot-instructions.md) and keep this file focused on enforceable coding behavior.

## TypeScript
- Assume `strict` TypeScript configuration. Do not add code that depends on relaxed compiler options.
- Never use `any`. If a boundary is unknown, use `unknown` and narrow with type guards.
- Prefer explicit domain types (`type` / `interface`) over ad-hoc inline object types when reused.
- Model state transitions with discriminated unions for async/resource states.
- Prefer immutability by default: use `readonly` properties, immutable update patterns, and avoid in-place mutation.
- Keep function signatures explicit for exported functions and public module APIs.
- Avoid non-null assertions (`!`) unless a proven invariant is documented nearby.

## React
- Use functional components only. Do not introduce class components.
- Keep components small and single-purpose; extract complex logic into hooks.
- Follow Hooks rules strictly: call hooks only at top level and never conditionally.
- Type component props explicitly and avoid implicit `any` through destructuring.
- Prefer derived state over duplicated state; keep local state minimal.
- Side effects belong in `useEffect` with correct dependency arrays; avoid effect-driven business logic when pure computation is possible.

## Error Handling
- Handle expected failures explicitly at the boundary where they can occur.
- Use `try/catch` for async flows and surface actionable error context.
- Do not swallow errors silently; either recover with fallback UI/state or rethrow with context.
- Normalize error shapes in service or hook layers before reaching UI components.

## State Management Philosophy
- Keep state close to where it is used; lift only when multiple consumers need shared ownership.
- Use `useState` for simple local state, `useReducer` for complex transitions, and Context only for stable cross-tree concerns.
- Store canonical source of truth once; compute derivations with memoized selectors when needed.
- Preserve predictable data flow: UI -> hooks -> services -> external systems.

## Maintainability
- Prefer clear, explicit code over clever abstractions.
- Keep modules cohesive and remove dead types/imports during edits.
- Add concise comments only for non-obvious constraints, invariants, or trade-offs.
