import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  timeout: 30000,
  reporter: [
    ['allure-playwright'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['line'],
  ],
  use: {
    baseURL: process.env.API_BASE_URL ?? 'https://reqres.in',
    extraHTTPHeaders: {
      'x-api-key': process.env.API_KEY ?? 'reqres-free-v1',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
  projects: [
    {
      name: 'api-tests',
      use: {},
    },
  ],
});
