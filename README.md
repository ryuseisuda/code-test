# 都道府県別人口推移グラフ

RESAS(地域経済分析システム) APIを使用して、都道府県別の人口推移をグラフ化するWebアプリケーションです。

## 機能

- 都道府県の複数選択
- 人口種別（総人口、年少人口、生産年齢人口、老年人口）の切り替え
- 選択した都道府県の人口推移をグラフで表示
- レスポンシブ対応

## 技術スタック

- React 18
- TypeScript
- Vite
- TailwindCSS
- Recharts（グラフ描画）
- ESLint + Prettier

## 開発環境のセットアップ

1. リポジトリのクローン
2. パッケージインストール

```bash
npm install
```
3. 環境変数の設定

```bash
cp .env.example .env
```
4. 開発サーバー起動

```bash
npm run dev
```

利用可能なスクリプト

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run format
```

プロジェクト構成

```
src/
├── api/
│   ├── client.ts
│   └── types/
│       └── population.ts
├── components/
│   └── PopulationGraph.tsx
├── App.tsx
├── index.html
├── main.tsx
├── vite.config.ts
├── .env
├── .eslintrc.js
├── .prettierrc
└── package.json
```

