# React Web Template

A modern React web template optimized for AI-assisted development and rapid prototyping.

## Tech Stack

- **Build**: Vite v7 (60ms HMR)
- **Language**: TypeScript (strict mode)
- **Routing**: TanStack Router v1 (file-based, type-safe)
- **Data Fetching**: TanStack Query v5
- **State**: Zustand v5
- **Styling**: Tailwind CSS v4 (CSS-based config)
- **Components**: shadcn/ui (Radix-based)
- **Forms**: React Hook Form + Zod
- **HTTP**: ky
- **Linting**: Biome v2
- **Tests**: Vitest + React Testing Library
- **E2E**: Playwright
- **Package Manager**: pnpm

## Commands

```bash
pnpm dev           # Start dev server (http://localhost:5173)
pnpm build         # Production build (tsc + vite build)
pnpm preview       # Preview production build
pnpm check         # Biome lint + format (auto-fix)
pnpm lint          # Biome lint only
pnpm format        # Biome format only
pnpm test          # Vitest (watch mode)
pnpm test:run      # Vitest (single run)
pnpm test:coverage # Vitest with coverage
pnpm e2e           # Playwright E2E tests
pnpm e2e:ui        # Playwright UI mode
pnpm typecheck     # TypeScript strict check
```

## Architecture

```
src/
├── app/              # App shell: providers, router, env config
├── routes/           # TanStack file-based routes (auto-generates routeTree.gen.ts)
├── components/       # Shared presentational components
│   └── ui/           # shadcn/ui components (editable — migrate changes on updates)
├── features/         # Feature modules
│   └── <name>/
│       ├── components/   # Presentational components for this feature
│       ├── hooks/        # Logic hooks for this feature
│       ├── services/     # API calls, Zod schemas, TanStack Query options
│       └── stores/       # Feature-scoped Zustand stores
├── hooks/            # Shared custom hooks (used across features)
├── lib/              # Utilities: api-client, query-client, utils
├── stores/           # Global Zustand stores (auth, session, cross-feature state)
└── types/            # Shared TypeScript types
```

## Ground Rules

**Before writing any code, you MUST read every file in `.cursor/rules/`:**

- `.cursor/rules/react.md` — code style, file naming, TypeScript conventions
- `.cursor/rules/components.md` — presentational-only, props vs state, route shells
- `.cursor/rules/hooks.md` — single responsibility, form hooks, return shape
- `.cursor/rules/stores.md` — placement, naming, selectors, expose via hooks
- `.cursor/rules/testing.md` — E2E first, unit test targets, coverage exceptions

Do not proceed with implementation until all five files have been read.

## Implementing a Feature — Mandatory Order

You MUST follow this sequence exactly. Do not skip or reorder steps.

1. **Write the E2E test first** — create `e2e/<feature>.spec.ts` before writing any source files. State the file path and test cases before proceeding.
2. **Implement** — write stores, hooks, components, and routes until `pnpm e2e` passes.
3. **Write unit tests** — cover every new hook and service file with Vitest.
4. **Verify** — run the commands below and show their full output. Fix any failures before declaring done.

## Definition of Done

A feature is not complete until all steps below pass. Run them in this exact order, act on the output of each before moving to the next, and show the output of each command.

**STEP 1 — E2E tests. Run and make sure all tests pass.**
```bash
pnpm e2e
```

**STEP 2 — Coverage. Fix gaps until coverage on all new and modified hooks and services is 100%.**
```bash
pnpm test:coverage
```

**STEP 3 — Unit tests. Fix any failures before continuing.**
```bash
pnpm test:run
```

**STEP 4 — Type check. Fix every error before continuing.**
```bash
pnpm typecheck
```

**STEP 5 — Lint, format, and auto-fix. Address every remaining issue before continuing.**
```bash
pnpm lint
pnpm format
pnpm check
```

Do not say you are finished until you have shown passing output from every step.

## Adding Routes

Create a file in `src/routes/` — TanStack Router auto-generates the route tree on next build/dev. Never edit `routeTree.gen.ts`.

```ts
// src/routes/about.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return <div>About</div>
}
```

## Adding shadcn/ui Components

```bash
npx shadcn@latest add <component-name>
```

Files land in `src/components/ui/` and may be edited to match designs. When pulling an updated version via the CLI, manually migrate any local style changes into the newly generated file.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values. All env vars must be prefixed with `VITE_` to be exposed to the client. Validate with Zod in `src/app/env.ts`.
