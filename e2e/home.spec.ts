import { expect, test } from './fixtures/perf'

test('home page renders', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'React Web Template' })).toBeVisible()
})
