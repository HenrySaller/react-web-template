import { test as base } from '@playwright/test'

export type WebVitals = {
  ttfb: number // ms — Time to First Byte
  fcp: number  // ms — First Contentful Paint
  lcp: number  // ms — Largest Contentful Paint
  cls: number  // unitless — Cumulative Layout Shift
}

/**
 * Extends the base Playwright test with a `getVitals` fixture.
 *
 * Usage: import { test, expect } from './fixtures/perf'
 *
 * The fixture injects PerformanceObserver scripts before page load so LCP and
 * CLS are captured from the very first navigation. Call `getVitals()` after
 * the page has settled to read the collected values.
 */
export const test = base.extend<{ getVitals: () => Promise<WebVitals> }>({
  getVitals: async ({ page }, use) => {
    // Injected before every navigation — sets up LCP and CLS observers
    await page.addInitScript(() => {
      ;(window as Window & { __lcp: number; __cls: number }).__lcp = 0
      ;(window as Window & { __lcp: number; __cls: number }).__cls = 0

      new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const last = entries[entries.length - 1]
        if (last) {
          ;(window as Window & { __lcp: number }).__lcp = last.startTime
        }
      }).observe({ type: 'largest-contentful-paint', buffered: true })

      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as PerformanceEntry & { hadRecentInput: boolean }).hadRecentInput) {
            ;(window as Window & { __cls: number }).__cls +=
              (entry as PerformanceEntry & { value: number }).value
          }
        }
      }).observe({ type: 'layout-shift', buffered: true })
    })

    await use(async () => {
      return page.evaluate(() => {
        const nav = performance.getEntriesByType(
          'navigation',
        )[0] as PerformanceNavigationTiming
        const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0]
        const w = window as Window & { __lcp: number; __cls: number }

        return {
          ttfb: Math.round(nav.responseStart - nav.requestStart),
          fcp: Math.round(fcpEntry?.startTime ?? -1),
          lcp: Math.round(w.__lcp ?? -1),
          cls: Math.round((w.__cls ?? 0) * 1000) / 1000,
        }
      })
    })
  },
})

export { expect } from '@playwright/test'
