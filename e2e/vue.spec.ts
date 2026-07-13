import { test, expect } from '@playwright/test'

test('visits the app root url', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toContainText('Take the quiz')
  await expect(page.locator('h1')).toContainText('and try your first pair!')
})
