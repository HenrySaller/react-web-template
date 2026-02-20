Run the Vitest test suite with coverage and report which hooks, utils, and services need more test coverage.

## Steps

### 1. Run coverage

Run `pnpm test:coverage` and capture the full output.

### 2. Parse results

Focus on files that are subject to 100% coverage requirements:
- `src/features/**/hooks/`
- `src/features/**/services/`
- `src/hooks/`
- `src/lib/`

Ignore files that are legitimately excluded (auto-generated files, shadcn/ui components, entry points).

### 3. Report

Present a summary table of files that are below 100% on any metric:

| File | Statements | Branches | Functions | Lines | Status |
|---|---|---|---|---|---|
| features/cart/hooks/useCart.ts | 100% | 100% | 100% | 100% | Pass |
| features/checkout/hooks/useCheckout.ts | 80% | 60% | 75% | 80% | Needs tests |

Files at 100% across all metrics do not need to appear in the table.

### 4. Action items

For each file below 100%:
- List the specific uncovered lines or branches (from the coverage report)
- Describe what test case would cover each gap
- Note if a gap represents untestable code that should instead be added to the exclusion list with a rationale

### 5. Reminder

Components are intentionally excluded from unit test coverage — they are covered by Playwright E2E tests. Do not flag component files as needing unit tests.
