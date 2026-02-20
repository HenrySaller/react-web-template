---
description: Code style and general conventions for all TypeScript and React files
globs: ["src/**/*.ts", "src/**/*.tsx"]
alwaysApply: true
---

# Code Style

- Single quotes, no semicolons, 2-space indent, trailing commas (enforced by Biome)
- Named function declarations at the top level — not arrow functions
- `type` imports with `verbatimModuleSyntax`: `import type { Foo } from './foo'`
- Path alias: `@/` → `src/`; never use relative imports outside the same directory

# File Naming

- Components: `PascalCase.tsx`
- Hooks: `useCamelCase.ts`
- Utilities: `camelCase.ts`
- Stores: `useCamelCaseStore.ts`
- Feature directories: `kebab-case/`

# No Barrel Files

Always import directly from source:

```ts
// Correct
import { Button } from '@/components/ui/button'
import { useCart } from '@/features/cart/hooks/useCart'

// Wrong
import { Button } from '@/components/ui'
import { useCart } from '@/features/cart'
```

# TypeScript

- Strict mode — all code must pass `pnpm typecheck`
- Prefer `type` over `interface` for object shapes
- Use `z.infer<typeof schema>` to derive types from Zod schemas — never duplicate by hand
- No `any` — use `unknown` and narrow with guards or Zod
