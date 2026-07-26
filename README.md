# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  # DailyDots

  DailyDots は、日々の記録と気分を 1 日 1 件で残せる日記アプリです。現行のコードベースではブラウザの `localStorage` に保存し、将来的に Supabase へ差し替えやすいように UI、Hooks、Services を分離しています。

  ## 1. プロジェクト概要

  このアプリは、日付ごとの journal を作成・更新・削除しながら、気分の変化も一緒に記録できることを目的にしています。

  画面はシンプルな 3 つの導線で構成されています。

  - Home: 直近の記録とクイック入力
  - My Journals: 保存済み一覧の確認・編集・削除
  - Add New Journal: 日付を指定して新規作成または更新

  ## 2. 主な機能

  - 1 日 1 件の journal を作成・更新・削除できる
  - 気分を `happy` / `calm` / `sad` / `angry` / `anxious` から選べる
  - 直近の journal を Home 画面で素早く確認できる
  - 過去 7 日分の日付候補からすばやく入力できる
  - 入力バリデーションで空欄や短すぎる本文を防げる
  - 保存済みデータは日付の降順で並ぶ

  ## 3. 技術スタック

  - Vite
  - React 19
  - TypeScript
  - React Router
  - React Hook Form
  - date-fns
  - Tailwind CSS v4
  - ESLint

  補足として、現行の永続化は Supabase ではなく `localStorage` ベースです。`.github` 配下の設計方針にある Supabase は、今後の拡張方針として扱っています。

  ## 4. アーキテクチャ方針

  基本方針は「UI -> Hooks -> Services -> 永続化層」です。

  - UI コンポーネントは表示とイベント通知に集中する
  - カスタム Hooks が state と操作をまとめる
  - Services が保存・取得・削除のルールを担う
  - 永続化層は現在 `localStorage`、将来は Supabase に差し替え可能な形を目指す

  実装の要点は次の通りです。

  - 1 日 1 件の制約はサービス層で統一している
  - 日付処理は `date-fns` を使って正規化・比較している
  - フォームは `react-hook-form` で管理し、バリデーションもそこで扱う
  - 画面ルーティングは React Router で行う

  ## 5. ディレクトリ構成

  ```text
  src/
  ├── App.tsx
  ├── App.css
  ├── index.css
  ├── main.tsx
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

  ルート直下には `package.json`、`vite.config.ts`、`tsconfig*.json`、`eslint.config.js` などの設定ファイルがあります。

  ## 6. セットアップ手順

  1. リポジトリをクローンします。
  2. 依存関係をインストールします。

  ```bash
  npm install
  ```

  3. 開発サーバーを起動します。

  ```bash
  npm run dev
  ```

  4. ブラウザで表示されたローカル URL を開きます。

  5. 生成物の確認や本番相当の確認が必要な場合は、ビルドとプレビューを実行します。

  ```bash
  npm run build
  npm run preview
  ```

  ## 7. 環境変数

  現時点で必須の環境変数はありません。

  現行実装は `localStorage` を利用しているため、Supabase 用の `VITE_*` 変数も未使用です。将来 Supabase を導入する場合は、`.env` と `.env.example` を追加して管理してください。

  ## 8. 開発コマンド

  ```bash
  npm run dev      # 開発サーバー起動
  npm run build    # TypeScript のチェックと本番ビルド
  npm run lint     # ESLint 実行
  npm run preview  # ビルド成果物のローカル確認
  ```

  現時点では `test` スクリプトは定義されていません。

  ## 9. コーディング規約（要点）

  - React は関数コンポーネントのみを使う
  - ロジックは UI から分離し、Hooks と Services に寄せる
  - TypeScript は strict 前提で、`any` は使わない
  - 状態はできるだけ最小限に保つ
  - 日付は手書き計算を避け、`date-fns` で扱う
  - フォームは `react-hook-form` を使う
  - 1 日 1 件のルールはコンポーネントではなくサービス側で守る
  - スタイルは既存実装に合わせて Tailwind CSS v4 のユーティリティ中心でまとめる
  - 必要な場合のみ、局所的で最小限の追加 CSS を使う

  ## 10. テスト方針

  現時点では自動テスト基盤は未導入です。新しくテストを追加する場合は、Vitest と React Testing Library を前提に次を優先します。

  - `journalStorageService` の保存・更新・削除ルール
  - `useJournalEntries` の state 更新
  - `JournalForm` の入力バリデーション
  - ルーティングと更新導線

  PR 前の最低限の確認として、`npm run lint` と `npm run build` を通す運用を推奨します。

  ## 11. セキュリティとデータ保護

  - 現行実装の保存先はブラウザの `localStorage` なので、データはその端末・そのブラウザに限定される
  - 共有端末や他人と共用するブラウザでは、保存データの取り扱いに注意する
  - 現時点で秘密情報は不要で、API キーやトークンも使用していない
  - 将来 Supabase を導入する場合は、公開用の匿名キーと RLS を前提にし、秘密情報をフロントエンドへ直書きしない

  ## 12. デプロイ

  Vite の静的サイトとしてデプロイできます。Vercel などの静的ホスティングにそのまま載せる構成が扱いやすいです。

  デプロイ時の確認ポイントは次の通りです。

  - `npm run build` が成功すること
  - ルーティングが SPA として正しく動くこと
  - ブラウザ依存の `localStorage` 動作を想定していること

  将来 Supabase を使う構成に変わる場合は、環境変数の設定と RLS の有効化を忘れないでください。

  ## 13. よくあるトラブル対応

  - 画面が更新されない場合は、まずハードリロードを試す
  - 古い journal が残っている場合は、ブラウザの `localStorage` にある `daily-dots-journals` を確認する
  - 保存結果が想定と違う場合は、同じ日付の journal が既に存在していないか確認する
  - `npm run build` が失敗する場合は、TypeScript の型エラーや未使用変数を確認する
  - Tailwind の見た目が反映されない場合は、`src/index.css` で Tailwind の import が生きているか確認する

  ## 14. 今後の拡張ポイント

  - Supabase への永続化切り替え
  - 認証機能の追加
  - 月間カレンダーや気分の推移表示
  - journal のエクスポート / インポート
  - テスト基盤の導入と回帰テストの整備
  - 端末間同期やオフライン対応の強化

  ## Assumptions

  - 現行の実装事実を優先し、保存方式は `localStorage` として記載しました
  - `.github` の方針にある Supabase は、現時点では未接続の将来方針として扱いました
  - `npm run test` は未定義のため、テスト方針は今後の導入前提でまとめました
