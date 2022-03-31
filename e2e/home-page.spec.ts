import { test, expect } from '@playwright/test'

test('Should be able to view blog title when loading the blog', async ({ page }) => {
  await page.goto('/')

  const title = await page.evaluate(() => document?.querySelector('h1')?.textContent)
  expect(title).toContain('Blog')
})

