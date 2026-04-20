const { test, expect } = require('@playwright/test');
const BASE = process.env.BASE_URL || 'http://localhost:8000';

test('AI: success path UI shows toast and payload', async ({ page }) => {
  try {
    await page.goto(BASE + '/public/test-success.html', { timeout: 5000 });
  } catch {
    test.skip('UI not available in CI');
    return;
  }
  await page.click('#trigger');
  const toast = await page.waitForSelector('.toast', { timeout: 6000 });
  const toastText = await toast.textContent();
  expect(toastText).toBe('Success payload returned');
  const log = await page.waitForSelector('#log', { timeout: 6000 });
  const text = await log.textContent();
  const payload = JSON.parse(text);
  expect(payload).toBeTruthy();
  expect(payload.result).toBeTruthy();
  expect(payload.result.ok).toBe(true);
  expect(payload.result.trace_id).toBeDefined();
});
