const { test, expect } = require('@playwright/test');
const BASE = process.env.BASE_URL || 'http://localhost:8000';

test('AI: head-to-head error and extended success', async ({ page }) => {
  // Error path first
  await page.goto(BASE + '/public/test-errors.html');
  await page.fill('#code', 'INTERNAL_ERROR');
  await page.fill('#msg', 'boom');
  await page.fill('#status', '400');
  await page.click('#trigger');
  const toast1 = await page.waitForSelector('.toast', { timeout: 6000 });
  const t1 = await toast1.textContent();
  expect(t1).toBe('boom');
  const log1 = await page.waitForSelector('#log', { timeout: 6000 });
  const payload1 = JSON.parse(await log1.textContent());
  expect(payload1.error).toBeTruthy();
  expect(payload1.error.code).toBe('INTERNAL_ERROR');
  expect(payload1.error.message).toBe('boom');
  // Success extended path
  const page2 = page.context().pages()[0] || page; // reuse main page if possible
  // Load extended success page
  await page.goto(BASE + '/public/test-success-extended.html');
  await page.click('#trigger');
  const toast2 = await page.waitForSelector('.toast', { timeout: 6000 });
  const t2 = await toast2.textContent();
  expect(t2).toBe('Success payload returned');
  const log2 = await page.waitForSelector('#log', { timeout: 6000 });
  const payload2 = JSON.parse(await log2.textContent());
  expect(payload2.result).toBeTruthy();
  expect(payload2.result.ok).toBe(true);
  expect(payload2.result.trace_id).toBeDefined();
  expect(payload2.result.extra).toBeDefined();
  expect(payload2.result.extra.note).toBe('extended payload');
});
