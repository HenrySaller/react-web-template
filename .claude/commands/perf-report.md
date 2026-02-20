Run the Playwright E2E suite, capture Web Vitals performance metrics, and report them as a signal for iteration.

## Steps

### 1. Run the E2E suite

Run `pnpm e2e` and capture the full output.

### 2. Collect metrics

Look for Web Vitals data in:
- Test output (if a performance fixture is in use)
- `playwright-report/` — check for any generated JSON or HTML reports
- `test-results/` — check for trace files

If no performance data is present, report that a performance fixture has not been set up yet and describe what would be needed (a Playwright fixture that calls `page.evaluate(() => performance.getEntriesByType('navigation'))` and captures LCP via `PerformanceObserver`).

### 3. Present metrics

Report results in a structured table:

| Metric | Value | Reference budget | Signal |
|---|---|---|---|
| LCP (Largest Contentful Paint) | — | < 2.5s | — |
| FCP (First Contentful Paint) | — | < 1.8s | — |
| CLS (Cumulative Layout Shift) | — | < 0.1 | — |
| TTFB (Time to First Byte) | — | < 800ms | — |

Fill in actual measured values. Mark each as **Good**, **Needs work**, or **No data**.

### 4. Signal

State clearly:
- Which metrics are within the reference budget
- Which metrics suggest the current implementation needs optimization
- Whether performance is good enough to declare the current feature complete, or whether another iteration is warranted

These are signals, not hard failures. The goal is to inform the next decision, not block progress.
