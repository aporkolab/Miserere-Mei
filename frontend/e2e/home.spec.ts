import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('renders the command interface without accessibility violations', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('app-root')).toBeVisible();
  await expect(page).toHaveScreenshot('home.png', {
    fullPage: true,
    animations: 'disabled',
    maxDiffPixelRatio: 0.02,
  });
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});
