# AGENTS.md

This repository uses the following files as the source of truth for detailed guidance:
- [.github/copilot-instructions.md](.github/copilot-instructions.md)
- [.github/instructions/general.instructions.md](.github/instructions/general.instructions.md)
- [.github/instructions/typescript-react.instructions.md](.github/instructions/typescript-react.instructions.md)
- [.github/instructions/design.instructions.md](.github/instructions/design.instructions.md)

## Rule Priority
- Follow the explicit user request first.
- Then follow the most specific applicable instruction file.
- Then follow this AGENTS.md.
- If two instruction files conflict, prefer the narrower scope over the broader one.
- If a conflict remains unclear, stop and ask before making a risky change.

## Working Rules
- Keep changes small, local, and easy to review.
- Follow the existing code patterns in the touched area.
- Avoid large refactors unless the task explicitly asks for one.
- Prefer minimal edits that solve the problem at the root cause.
- Do not duplicate guidance that already lives in the linked instruction files.

## Security Boundaries
- Do not commit or expose secrets, tokens, or private credentials.
- Do not weaken TypeScript strictness or add `any`-based shortcuts.
- Do not bypass authentication or Row Level Security.
- Do not move database access into UI components.

## Commands
Use the project package manager and the scripts defined in package.json. Common commands are:
- install
- dev
- build
- lint
- format
- typecheck
- test

## Do Not Modify
- Build output directories such as dist.
- Lockfiles unless dependency changes are required.
- Generated files unless the task explicitly targets them.

## Reporting Changes
- Summarize what changed and why.
- Call out any assumptions, risks, or follow-up work.
- Mention validation you ran, or say why validation could not be run.
- Keep the final report concise and file-focused.

## Project Notes
- The stack is Vite + React + TypeScript + Supabase.
- Use the linked instruction files for detailed architecture, React, CSS, and design guidance.
- When in doubt, make the smallest safe change and ask for clarification only if the risk is real.