import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import path from 'path';

const otherPlatforms = [
  {
    name: 'chromium',
    use: {
      ...devices['Desktop Chrome'],
    },
  },
  {
    name: 'firefox',
    use: {
      ...devices['Desktop Firefox'],
    },
  },
  {
    name: 'Mobile Chrome',
    use: {
      ...devices['Pixel 5'],
    },
  },
  {
    name: 'Mobile Safari',
    use: {
      ...devices['iPhone 12'],
    },
  },
  {
    name: 'Microsoft Edge',
    use: {
      channel: 'msedge',
    },
  },
  {
    name: 'Google Chrome',
    use: {
      channel: 'chrome',
    },
  },
]

const config: PlaywrightTestConfig = {
  testDir: path.join(__dirname, 'e2e'),
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    headless: true,
    actionTimeout: 0,
    baseURL: 'http://localhost:3000',
    trace: 'retry-with-trace',

    contextOptions: {
      ignoreHTTPSErrors: true,
    },

  },

  outputDir: 'test-results/',
  webServer: {
    command: 'npm run dev',
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },

  projects: [
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPad Pro 11'],
        ...devices['iPad Pro 11 landscape'],
        ...devices['iPhone 12'],
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPad Mini'],
        ...devices['iPad Mini landscape'],
        ...devices['iPhone 12'],
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 12'],
      },
    },
    ...(process.env.CI ? otherPlatforms : [])
  ],

};

export default config;
