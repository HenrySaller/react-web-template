Scaffold a new feature module following project conventions.

## Arguments

`$ARGUMENTS` is the feature name in kebab-case (e.g. `user-profile`, `shopping-cart`).
If empty, ask the user for the feature name before proceeding.

## Steps

### 1. Validate

Confirm `$ARGUMENTS` is a valid kebab-case name.
Check that `src/features/$ARGUMENTS/` does not already exist — if it does, stop and report it.

### 2. Scaffold directory structure

Create the following structure with `.gitkeep` files to preserve empty directories:

```
src/features/$ARGUMENTS/
├── components/.gitkeep   # Presentational components — no logic
├── hooks/.gitkeep        # All business logic for this feature
├── services/.gitkeep     # API calls, Zod schemas, TanStack Query options
└── stores/.gitkeep       # Feature-scoped Zustand stores
```

### 3. Create the E2E test file

Create `e2e/$ARGUMENTS.spec.ts`:

```ts
import { test, expect } from '@playwright/test'

test.describe('$ARGUMENTS', () => {
  test.todo('define success criteria before implementing')
})
```

### 4. Report

List every created file and remind the user of the workflow:
- Fill in the E2E test first — it defines what "done" means
- Build until the test passes
- Ensure `pnpm test:coverage` shows 100% on hooks and services
- Run `/perf-report` to check performance before declaring the feature complete
