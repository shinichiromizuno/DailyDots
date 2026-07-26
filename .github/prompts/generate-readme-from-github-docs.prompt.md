---
description: "Analyze .github documentation and generate a comprehensive README.md for this repository"
name: "Generate Comprehensive README"
argument-hint: "Additional README requirements (optional)"
agent: "agent"
---
Generate a production-ready, comprehensive `README.md` for this repository by analyzing the project documentation under `.github`.

## Inputs
- Current repository files and source structure
- Documentation under:
  - [.github/copilot-instructions.md](../copilot-instructions.md)
  - [.github/instructions/general.instructions.md](../instructions/general.instructions.md)
  - [.github/instructions/typescript-react.instructions.md](../instructions/typescript-react.instructions.md)
  - [.github/instructions/design.instructions.md](../instructions/design.instructions.md)
  - [.github/instructions/css-tailwind.instructions.md](../instructions/css-tailwind.instructions.md)
- Optional user argument: {{input}}

## Goal
Replace the default Vite template README with a practical, team-usable README that accurately reflects this app and its conventions.

## Required Output Language
- Write the README in Japanese.

## Required README Sections
1. プロジェクト概要
2. 主な機能
3. 技術スタック
4. アーキテクチャ方針
5. ディレクトリ構成
6. セットアップ手順
7. 環境変数
8. 開発コマンド
9. コーディング規約（要点）
10. テスト方針
11. セキュリティとデータ保護
12. デプロイ
13. よくあるトラブル対応
14. 今後の拡張ポイント

## Quality Constraints
- Do not invent unsupported facts. If uncertain, state assumptions clearly.
- Keep command examples aligned with `package.json` scripts when present.
- Reflect the documented architecture: UI -> Hooks -> Services -> Supabase.
- Preserve consistency with documented constraints (TypeScript strictness, plain CSS, React Hook Form, date-fns, Supabase service layer).
- Prefer concise, actionable explanations over generic prose.

## Execution Steps
1. Read and synthesize all listed `.github` docs.
2. Inspect repository files needed to ground setup steps and commands.
3. Produce a complete `README.md` draft.
4. Provide a short "Assumptions" section if any details cannot be verified.

Return only the final README markdown content.