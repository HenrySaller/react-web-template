import { expect } from '@playwright/test'
import { testWithVitals } from './fixtures/perf'

testWithVitals('home page renders', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'React Web Template' })).toBeVisible()
})
