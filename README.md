# Tech Brief AI

AI-powered mobile app for personalized technology briefs, reports, podcasts, search, bookmarks, and RAG chat.

## Phase 1 Scope

- Turborepo monorepo setup.
- Expo React Native mobile shell.
- Next.js 15 backend shell.
- Shared TypeScript, configuration, validation, UI, and domain packages.
- Strict TypeScript and lint foundations.

Later phases will add database schema, authentication, news ingestion, AI processing, mobile screens, offline support, testing, and deployment.

## Commands

```bash
npm install
npm run dev
npm run mobile
npm run typecheck
npm run lint
```

For Expo Go, run the mobile workspace script from the repo root:

```bash
npm run mobile
```

Do not run `npx expo start` from the monorepo root; it starts the wrong project and looks for a root `App` file.

## Workspace Layout

```text
apps/
  api/       Next.js App Router backend
  mobile/    Expo Router mobile app
packages/
  config/    Environment parsing and app constants
  domain/    Core business entities and ports
  eslint-config/
  typescript-config/
  ui/        Shared cross-platform primitives
  validation/ Shared Zod schemas
```
