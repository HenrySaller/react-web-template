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
pnpm dev          # Start dev server (http://localhost:5173)
pnpm build        # Production build (tsc + vite build)
pnpm preview      # Preview production build
pnpm check        # Biome lint + format (auto-fix)
pnpm lint         # Biome lint only
pnpm format       # Biome format only
pnpm test         # Vitest (watch mode)
pnpm test:run     # Vitest (single run)
pnpm test:coverage # Vitest with coverage
pnpm e2e          # Playwright E2E tests
pnpm e2e:ui       # Playwright UI mode
pnpm typecheck    # TypeScript strict check
```

## Architecture

```
src/
├── app/          # App shell: providers, router, env config
├── routes/       # TanStack file-based routes
├── components/   # Shared components
│   └── ui/       # shadcn/ui auto-generated
├── features/     # Feature modules (see features/README.md)
├── hooks/        # Shared custom hooks
├── lib/          # Utilities: api-client, query-client, utils
├── stores/       # Zustand global stores
└── types/        # Shared TypeScript types
```

## Conventions

- **No barrel files**: Import directly from source files
- **Path alias**: Use `@/` for `src/` (e.g., `import { cn } from '@/lib/utils'`)
- **Strict TypeScript**: All code must pass `pnpm typecheck`
- **Zod at boundaries**: Validate env vars, API responses, and form inputs with Zod
- **Feature-first**: New features go in `src/features/<feature-name>/`

## Adding Routes

Create a file in `src/routes/` — TanStack Router auto-generates the route tree on next build/dev.

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

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values. All env vars must be prefixed with `VITE_` to be exposed to the client.
