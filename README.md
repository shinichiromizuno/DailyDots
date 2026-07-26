# DailyDots

DailyDots は、1 日 1 件の日記と気分を残せるシンプルな日記アプリです。現在の実装ではブラウザの `localStorage` に保存し、日付ごとの記録を更新・削除できる構成になっています。

## 機能

- ホーム画面で最新の記録と簡易入力を確認できる
- 1 日 1 件の journal を作成・更新できる
- 保存済みの journal を一覧で確認し、編集・削除できる
- 気分を `happy` / `calm` / `sad` / `angry` / `anxious` から選べる
- 過去 7 日分の日付候補をワンクリックで入力できる
- 日記本文にはライブ文字数カウンターを表示し、最大 2000 文字まで入力できる

## 技術スタック

- Vite
- React 19
- TypeScript
- React Router
- React Hook Form
- date-fns
- Tailwind CSS v4
- ESLint
- Vitest
- Testing Library

## ディレクトリ構成

```text
src/
├── App.tsx
├── components/
│   └── AppShell.tsx
├── features/
│   └── journal/
│       ├── components/
│       │   └── JournalForm.tsx
│       ├── constants/
│       │   └── moods.ts
│       ├── hooks/
│       │   └── useJournalEntries.ts
│       ├── services/
│       │   └── journalStorageService.ts
│       └── types/
│           └── journal.ts
└── pages/
  ├── HomePage.tsx
  ├── AddJournalPage.tsx
  └── MyJournalsPage.tsx
```

## アーキテクチャ

実装は「UI -> Hooks -> Services -> 永続化層」の順で分けています。

- UI コンポーネントは表示と操作だけを担当する
- `useJournalEntries` が一覧 state と保存・削除の操作をまとめる
- `journalStorageService` が `localStorage` の読み書きと 1 日 1 件のルールを担当する
- `JournalForm` は `react-hook-form` で入力とバリデーションを管理する

保存キーは `daily-dots-journals` です。

## セットアップ

```bash
npm install
npm run dev
```

開発サーバー起動後、表示されたローカル URL を開いて確認します。

## スクリプト

```bash
npm run dev
npm run build
npm run lint
npm run preview
npm test
```

## データ仕様

- journal は日付、気分、本文、更新日時を持つ
- 同じ日付で保存すると既存データを上書きする
- 保存済みデータは日付の降順で表示する
- 本文は保存時に前後の空白を除去する
- 本文は最大 2000 文字まで入力可能で、文字数カウンターで確認できる

## 補足

- 現行の保存先はブラウザの `localStorage` です
- 共有端末では保存データの扱いに注意してください
- SPA のルーティングは React Router で処理しています
