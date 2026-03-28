import { test as base } from '@playwright/test';
import { UsersClient } from '../api/users-client';
import { config } from '../config/config';

type ApiFixtures = {
  usersClient: UsersClient;
  baseUrl: string;
};

export const test = base.extend<ApiFixtures>({
  usersClient: async ({ request }, use) => {
    const client = new UsersClient(request, config.baseUrl);
    await use(client);
  },
  baseUrl: async ({}, use) => {
    await use(config.baseUrl);
  },
});

export { expect } from '@playwright/test';
