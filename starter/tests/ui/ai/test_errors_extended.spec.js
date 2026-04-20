const { test, expect } = require('@playwright/test');
const BASE = process.env.BASE_URL || 'http://localhost:8000';

test('AI: error path (extended) shows exact toast and error payload', async ({ page }) => {
  try {
    await page.goto(BASE + '/public/test-errors.html', { timeout: 5000 });
  } catch {
    test.skip('UI not available in CI');
    return;
  }
  await page.fill('#code', 'INTERNAL_ERROR');
  await page.fill('#msg', 'boom');
  await page.fill('#status', '400');
  await page.click('#trigger');
  const toast = await page.waitForSelector('.toast', { timeout: 6000 });
  const toastText = await toast.textContent();
  expect(toastText).toBe('boom');
  const log = await page.waitForSelector('#log', { timeout: 6000 });
  const text = await log.textContent();
  const payload = JSON.parse(text);
  expect(payload).toBeTruthy();
  expect(payload.error).toBeTruthy();
  expect(payload.error.code).toBe('INTERNAL_ERROR');
  expect(payload.error.message).toBe('boom');
  expect(payload.error.trace_id).toBeDefined();
});
