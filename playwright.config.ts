import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: 'Keka-engage/tests',
  timeout: 60000,
  retries: 1,
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
  },
  projects: [
    { name: 'Chromium', use: { browserName: 'chromium' } }
    // { name: 'Firefox', use: { browserName: 'firefox' } },
    // { name: 'WebKit', use: { browserName: 'webkit' } }
  ],
  reporter: [
    ['list'],  // Shows results in console
    ['json', { outputFile: 'test-results.json' }], // JSON report
    ['html', { outputFolder: 'playwright-report', open: 'always' }], // HTML report
    ['junit', { outputFile: 'results.xml' }] // JUnit report (for CI/CD)
  ]
};

export default config;