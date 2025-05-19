import { PlaywrightTestConfig } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const resultsDir = path.join(__dirname, 'test-results');
if (fs.existsSync(resultsDir)) {
  fs.rmSync(resultsDir, { recursive: true, force: true });
  console.log('test-results folder was removed.');
}

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
    ['list'],  // Good for console readability
    ['dot'],  // Shows progress with dots (useful for large test suites)
    ['json', { outputFile: 'test-results.json' }], // JSON report
    //['allure-playwright', { outputFolder: 'playwright-report', open: 'always'}], // Allure report
    ['html', { outputFolder: 'playwright-report', open: 'always' }], // HTML report
  
    //['junit', { outputFile: 'results.xml' }] // JUnit report (for CI/CD)
  ]
};

export default config;