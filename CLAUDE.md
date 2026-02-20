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

Detailed conventions live in `.cursor/rules/`:

- **Components** → `.cursor/rules/components.md` — presentational-only, props vs state, naming
- **Hooks** → `.cursor/rules/hooks.md` — single responsibility, naming, return shape, data fetching
- **Stores** → `.cursor/rules/stores.md` — placement, selectors, when to use Zustand vs useState
- **Testing** → `.cursor/rules/testing.md` — E2E first, unit test targets, coverage exceptions
- **Code style** → `.cursor/rules/react.md` — Biome conventions, TypeScript, file naming, imports

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
