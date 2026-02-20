Run the Playwright E2E suite, collect Web Vitals from the JSON report, and signal whether performance is good enough to move on.

## Steps

### 1. Run the E2E suite

Run `pnpm e2e` and capture the full output.

### 2. Read the JSON report

Read `playwright-report/results.json` directly. The structure is `suites[n].specs[n].tests[n].results[n].attachments`. For each result, find attachments with the name `web-vitals` and parse their body as base64-decoded JSON. Each attachment contains:

```json
{ "ttfb": 12, "fcp": 340, "lcp": 410, "cls": 0 }
```

Values of `-1` mean the metric was not captured (e.g. FCP not fired before `getVitals()` was called).

### 3. Present metrics

For each test that has a `web-vitals` attachment, report a table:

| Test | TTFB | FCP | LCP | CLS |
|---|---|---|---|---|
| home page renders | 12ms ✅ | 340ms ✅ | 410ms ✅ | 0.000 ✅ |

Reference budgets:

| Metric | Budget |
|---|---|
| TTFB | < 800ms |
| FCP | < 1800ms |
| LCP | < 2500ms |
| CLS | < 0.1 |

Mark values within budget ✅ and over budget ❌.

### 4. Signal

State clearly:
- Which metrics are within budget across all tests
- Which metrics are over budget and on which pages
- Whether performance is good enough to declare the current work complete, or whether another iteration is warranted

Performance results are signals, not hard failures. The goal is to inform the next decision, not block progress.
