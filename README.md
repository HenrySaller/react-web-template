# React Web Template

A modern React web template optimized for AI-assisted development and rapid prototyping.

## Tech Stack

| Category | Package |
|---|---|
| Build | Vite v7 |
| Language | TypeScript (strict) |
| Routing | TanStack Router v1 (file-based) |
| Data Fetching | TanStack Query v5 |
| State | Zustand v5 |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui |
| Forms | React Hook Form + Zod |
| HTTP | ky |
| Linting | Biome v2 |
| Tests | Vitest + React Testing Library |
| E2E | Playwright |
| Package Manager | pnpm |

## Getting Started

```bash
pnpm install
pnpm dev
```

## Commands

```bash
pnpm dev            # Start dev server (http://localhost:5173)
pnpm build          # Production build
pnpm preview        # Preview production build
pnpm check          # Biome lint + format (auto-fix)
pnpm test           # Vitest (watch mode)
pnpm test:run       # Vitest (single run)
pnpm e2e            # Playwright E2E tests
pnpm typecheck      # TypeScript strict check
```

## Project Structure

```
src/
├── app/          # Providers, router instance, env config
├── routes/       # TanStack file-based routes
├── components/
│   └── ui/       # shadcn/ui components
├── features/     # Feature modules (see features/README.md)
├── hooks/        # Shared custom hooks
├── lib/          # api-client, query-client, utils
├── stores/       # Zustand global stores
└── types/        # Shared TypeScript types
```

## Adding a Route

Create a file in `src/routes/` — the route tree is auto-generated on next `pnpm dev` or `pnpm build`.

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
pnpm dlx shadcn@latest add <component-name>
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values. All client-side vars must be prefixed with `VITE_`.
