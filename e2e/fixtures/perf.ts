import { test as base } from '@playwright/test'
import type { Page } from '@playwright/test'

export type WebVitals = {
  ttfb: number // Time to First Byte (ms)
  fcp: number  // First Contentful Paint (ms)
  lcp: number  // Largest Contentful Paint (ms)
  cls: number  // Cumulative Layout Shift (unitless)
}

// Extend the browser Window type to hold accumulated observer values
declare global {
  interface Window {
    __vitals: { lcp: number; cls: number }
  }
}

// TS lib doesn't include layout-shift entry shape
interface LayoutShift extends PerformanceEntry {
  value: number
  hadRecentInput: boolean
}

// Injected before every navigation so LCP and CLS are tracked from first paint
async function injectObservers(page: Page): Promise<void> {
  await page.addInitScript(() => {
    window.__vitals = { lcp: 0, cls: 0 }

    new PerformanceObserver((list) => {
      const last = list.getEntries().at(-1)
      if (last) window.__vitals.lcp = last.startTime
    }).observe({ type: 'largest-contentful-paint', buffered: true })

    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const shift = entry as LayoutShift
        if (!shift.hadRecentInput) window.__vitals.cls += shift.value
      }
    }).observe({ type: 'layout-shift', buffered: true })
  })
}

// Reads all metrics from the page after it has settled
async function collectVitals(page: Page): Promise<WebVitals> {
  return page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    const fcp = performance.getEntriesByName('first-contentful-paint')[0]

    return {
      ttfb: Math.round(nav.responseStart - nav.requestStart),
      fcp: Math.round(fcp?.startTime ?? -1),
      lcp: Math.round(window.__vitals.lcp),
      cls: Math.round(window.__vitals.cls * 1000) / 1000,
    }
  })
}

// Auto fixture — active for every test without explicit opt-in.
// Injects observers before the test runs, attaches collected vitals after.
export const testWithVitals = base.extend<{ _vitals: void }>({
  _vitals: [
    async ({ page }, use, testInfo) => {
      await injectObservers(page)
      await use()
      const vitals = await collectVitals(page)
      await testInfo.attach('web-vitals', {
        body: JSON.stringify(vitals),
        contentType: 'application/json',
      })
    },
    { auto: true },
  ],
})
