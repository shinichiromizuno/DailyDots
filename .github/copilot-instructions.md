# GitHub Copilot Instructions

## Project Overview

This project is a **Daily Journal with Mood Tracker** built using:

- Vite
- React
- TypeScript
- Supabase
- React Router
- Plain CSS
- React Hook Form
- date-fns
- Vitest
- React Testing Library

The application allows authenticated users to:

- Create, edit, and delete daily journal entries
- Track daily moods
- View mood history
- Maintain private journal data securely using Supabase Authentication and Row Level Security (RLS)

---

# General Principles

## Code Quality

Always generate production-quality code that is:

- Readable
- Maintainable
- Modular
- Reusable
- Type-safe
- Scalable

Prefer simple solutions over clever ones.

Avoid unnecessary abstractions and dependencies.

---

# Tech Stack

Always use:

- React Functional Components
- TypeScript
- React Hooks
- React Router
- Plain CSS
- React Hook Form
- date-fns
- Supabase JavaScript SDK

Do NOT introduce:

- Tailwind CSS
- CSS-in-JS
- Redux
- MobX
- Material UI
- Chakra UI
- Bootstrap
- jQuery

unless explicitly requested.

---

# Architecture

Follow Separation of Concerns.

```
UI Components
        ↓
Custom Hooks
        ↓
Services
        ↓
Supabase
```

Business logic must never live inside UI components.

Database access must never occur directly inside components.

---

# Folder Structure

Prefer feature-based organization.

```
src/
│
├── app/
│
├── components/
│
├── features/
│   ├── auth/
│   ├── journal/
│   └── mood/
│
├── hooks/
│
├── services/
│
├── lib/
│
├── pages/
│
├── utils/
│
├── types/
│
├── styles/
│
└── assets/
```

Each feature may contain:

```
components/
hooks/
services/
types/
utils/
```

---

# React Guidelines

Always use:

- Functional Components
- Hooks
- Composition

Avoid:

- Class Components
- Huge components
- Duplicate logic

Each component should have a single responsibility.

---

# Component Design

Prefer many small reusable components over large ones.

Components should:

- Receive data through props
- Keep rendering logic simple
- Delegate business logic to hooks
- Delegate API/database logic to services

---

# TypeScript Guidelines

Never use:

```
any
```

unless absolutely unavoidable.

Prefer:

- interfaces
- type aliases
- enums (where appropriate)
- utility types

Always strongly type:

- Props
- State
- Forms
- Service responses
- Supabase models

Example:

```ts
interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: Mood;
  createdAt: string;
}
```

---

# Naming Conventions

Components

```
JournalCard
MoodSelector
JournalEditor
```

Files

```
JournalCard.tsx
journalService.ts
useJournal.ts
```

Variables

```
journalEntries
selectedMood
currentUser
```

Functions

Use verb-based names.

Examples:

```
createJournalEntry()
updateJournalEntry()
deleteJournalEntry()
getJournalEntries()
loginUser()
logoutUser()
fetchMoodHistory()
```

Constants

```
MAX_ENTRY_LENGTH
DEFAULT_MOOD
DATE_FORMAT
```

---

# Styling

Use Plain CSS.

Each component should have its own CSS file.

Example

```
MoodCard/
    MoodCard.tsx
    MoodCard.css
```

Avoid:

- Inline styles
- CSS frameworks
- Global styles unless necessary

Use meaningful class names.

---

# Responsive Design

Always build mobile-first.

Layouts should work on:

- Mobile
- Tablet
- Desktop

Use CSS media queries.

---

# Routing

Use React Router.

Protected pages must require authentication.

Keep route configuration organized.

---

# State Management

Use:

- useState
- useReducer
- Context API

Avoid introducing global state libraries unless requirements change.

---

# Supabase

Use a dedicated service layer.

Example:

```
lib/
    supabase.ts

services/
    authService.ts
    journalService.ts
    moodService.ts
```

Components should never communicate with Supabase directly.

---

# Authentication

Use Supabase Email/Password Authentication.

Authentication responsibilities include:

- login
- signup
- logout
- password reset
- session management

---

# Database Security

Always assume Row Level Security is enabled.

Generate queries that work correctly with RLS.

Never bypass security in frontend code.

Never expose secrets.

---

# Data Fetching

Always use:

Custom Hooks

Example:

```
useJournal()
useMood()
useAuth()
```

Hooks should:

- fetch data
- manage loading
- manage errors
- expose clean interfaces

---

# Async Code

Use async/await.

Always use try/catch.

Example:

```ts
try {
    const entries = await getJournalEntries();
}
catch (error) {
    handleError(error);
}
```

Avoid Promise chains unless required.

---

# Error Handling

Use centralized error handling.

Return meaningful error messages.

Avoid duplicated error handling code.

Never silently ignore errors.

---

# Forms

Use:

React Hook Form

Use validation.

Show helpful validation messages.

Disable submit buttons during submission.

---

# Mood Tracking

Mood values are fixed.

Use:

```ts
export type Mood =
    | "happy"
    | "calm"
    | "sad"
    | "angry"
    | "anxious";
```

Keep mood values consistent across:

- database
- UI
- services
- analytics

---

# Date Handling

Use date-fns.

Avoid manual date formatting.

Use helper utilities.

---

# Accessibility

Always follow WCAG best practices.

Use:

- semantic HTML
- labels
- keyboard navigation
- ARIA attributes where appropriate

---

# Security

Always:

- validate user input
- sanitize displayed content when necessary
- protect authenticated routes
- keep secrets in environment variables
- avoid exposing implementation details

---

# Environment Variables

Never hardcode credentials.

Use:

```
.env
.env.example
```

Example:

```
VITE_SUPABASE_URL=

VITE_SUPABASE_ANON_KEY=
```

---

# Testing

Use:

- Vitest
- React Testing Library

Test:

- Components
- Hooks
- Utilities
- Business logic

Prioritize meaningful tests.

---

# Comments

Write comments only when they explain:

- complex logic
- non-obvious behavior
- important decisions

Avoid comments that describe obvious code.

---

# Documentation

Keep documentation updated.

Maintain:

- README.md
- Setup instructions
- Environment variables
- Folder structure
- Architecture overview

---

# Git

Use Conventional Commits.

Examples:

```
feat: add journal editor

fix: resolve mood selector bug

refactor: simplify auth service

docs: update setup guide

test: add journal service tests
```

---

# Deployment

Deployment target:

Vercel

Ensure:

- successful production builds
- environment variables configured
- secrets never committed

---

# Performance

Optimize only after measuring.

Avoid premature optimization.

Prefer readable code over unnecessary memoization.

Use:

- React.memo
- useMemo
- useCallback

only when profiling indicates a benefit.

---

# GitHub Copilot Behavior

When generating code, always:

1. Analyze existing code before creating new code.
2. Follow existing project conventions.
3. Preserve consistency across files.
4. Reuse existing utilities before creating new ones.
5. Keep components small and reusable.
6. Keep business logic in hooks.
7. Keep database logic in services.
8. Keep components focused on presentation.
9. Write strict TypeScript.
10. Avoid duplicate code.
11. Generate accessible UI.
12. Follow responsive design principles.
13. Write secure code by default.
14. Prefer descriptive naming.
15. Keep files organized by feature.
16. Ask for clarification if requirements are ambiguous.

---

# Code Generation Priorities

When multiple implementations are possible, prioritize:

1. Maintainability
2. Readability
3. Security
4. Type Safety
5. Scalability
6. User Experience
7. Performance

Always generate code suitable for a professional production application.