const { test, expect } = require('@playwright/test');

const AI_BASE = process.env.BASE_AI_URL || 'http://localhost:8000';
const SAAS_BASE = process.env.BASE_SAAS_URL || 'http://localhost:3000';
const DEVOPS_BASE = process.env.BASE_DEVOPS_URL || 'http://localhost:4000';

test('UI smoke: all templates extended – errors and extended success paths', async ({ browser }) => {
  // AI: error
  {
    const p = await browser.newPage();
    await p.goto(AI_BASE + '/public/test-errors.html');
    await p.fill('#code', 'INTERNAL_ERROR');
    await p.fill('#msg', 'boom');
    await p.fill('#status', '400');
    await p.click('#trigger');
    await p.waitForSelector('.toast', { timeout: 6000 });
    await p.close();
  }
  // AI: extended success
  {
    const p = await browser.newPage();
    await p.goto(AI_BASE + '/public/test-success-extended.html');
    await p.click('#trigger');
    await p.waitForSelector('.toast', { timeout: 6000 });
    await p.close();
  }
  // SaaS: error
  {
    const p = await browser.newPage();
    await p.goto(SAAS_BASE + '/public/test-errors.html');
    await p.fill('#code', 'INTERNAL_ERROR');
    await p.fill('#msg', 'boom');
    await p.fill('#status', '400');
    await p.click('#trigger');
    await p.waitForSelector('.toast', { timeout: 6000 });
    await p.close();
  }
  // SaaS: extended success
  {
    const p = await browser.newPage();
    await p.goto(SAAS_BASE + '/public/test-success-extended.html');
    await p.click('#trigger');
    await p.waitForSelector('.toast', { timeout: 6000 });
    await p.close();
  }
  // DevOps: error
  {
    const p = await browser.newPage();
    await p.goto(DEVOPS_BASE + '/public/test-errors.html');
    await p.fill('#code', 'INTERNAL_ERROR');
    await p.fill('#msg', 'boom');
    await p.fill('#status', '400');
    await p.click('#trigger');
    await p.waitForSelector('.toast', { timeout: 6000 });
    await p.close();
  }
  // DevOps: extended success
  {
    const p = await browser.newPage();
    await p.goto(DEVOPS_BASE + '/public/test-success-extended.html');
    await p.click('#trigger');
    await p.waitForSelector('.toast', { timeout: 6000 });
    await p.close();
  }
});
