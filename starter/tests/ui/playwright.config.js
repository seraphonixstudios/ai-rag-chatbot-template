// Playwright config for multi-browser UI smoke tests (AI template)
module.exports = {
  testDir: __dirname,
  testMatch: /test_(errors|success|head_to_head|errors_extended|success_extended).spec.js/,
  timeout: 30000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'Chromium', use: { browserName: 'chromium' } },
    { name: 'Firefox',  use: { browserName: 'firefox' } },
    { name: 'WebKit',   use: { browserName: 'webkit' } },
  ],
};
