# React Web Template - Cursor Rules

## Stack

TypeScript (strict) · React 19 · Vite 7 · TanStack Router · TanStack Query · Zustand · Tailwind CSS v4 · shadcn/ui · Biome · Vitest · Playwright

## Code Style

- Single quotes, no semicolons, 2-space indent, trailing commas (enforced by Biome)
- Named function declarations for components (not arrow functions at top-level)
- `type` imports with `verbatimModuleSyntax`: `import type { Foo } from './foo'`
- Path alias: `@/` → `src/`; never use relative paths outside same directory

## Components

- Use shadcn/ui components from `@/components/ui/` for base UI elements
- Use `cn()` from `@/lib/utils` for conditional Tailwind classes
- Add new shadcn components: `npx shadcn@latest add <name>`

## Routing

- Add routes in `src/routes/` using file-based conventions
- Route files export `const Route = createFileRoute('...')({...})`
- Route tree at `src/routeTree.gen.ts` is auto-generated — do not edit

## Data Fetching

- Use TanStack Query for server state; Zustand for client-only state
- Create queries in `src/features/<feature>/services/` or inline with `queryOptions`
- Always type API responses with Zod schemas

## Forms

- Use React Hook Form + Zod via `@hookform/resolvers/zod`
- Define schema with `z.object({...})` and infer type with `z.infer<typeof schema>`

## File Naming

- Components: `PascalCase.tsx`
- Hooks: `useCamelCase.ts`
- Utilities: `camelCase.ts`
- Stores: `useCamelCaseStore.ts`
- Feature files: `kebab-case/` directories

## No Barrel Files

Import directly: `import { Button } from '@/components/ui/button'`
Never: `import { Button } from '@/components/ui'`
