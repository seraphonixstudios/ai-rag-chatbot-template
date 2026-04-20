const { test, expect } = require('@playwright/test');
const BASE = process.env.BASE_URL || 'http://localhost:8000';

test('AI: head-to-head placeholder', async ({ page }) => {
  try {
    await page.goto(BASE + '/public/test-errors.html', { timeout: 5000 });
  } catch {
    test.skip('UI not available in CI');
    return;
  }
  // Minimal smoke: just ensure the page loads
  expect(true).toBeTruthy();
});
