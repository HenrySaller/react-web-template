import { expect, test } from './fixtures/perf'

test('home page renders', async ({ page, getVitals }, testInfo) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'React Web Template' })).toBeVisible()

  const vitals = await getVitals()
  await testInfo.attach('web-vitals', {
    body: JSON.stringify(vitals, null, 2),
    contentType: 'application/json',
  })
})
