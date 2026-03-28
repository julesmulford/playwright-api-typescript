import { allure } from 'allure-playwright';
import { test, expect } from '../src/fixtures/api.fixtures';
import {
  UsersListSchema,
  SingleUserSchema,
} from '../src/schemas/user.schemas';
import { validateSchema, assertStatusCode } from '../src/utils/assertion-helpers';
import { testData } from '../src/testdata/test-data';

test.describe('GET /api/users', () => {
  test.beforeEach(async () => {
    allure.epic('Users API');
    allure.feature('GET Users');
  });

  test('list users returns 200 with valid schema', async ({ usersClient }) => {
    allure.story('List Users');
    allure.severity('critical');

    const { response, body } = await usersClient.getUsers(testData.users.listPage);

    assertStatusCode(response.status(), 200, 'GET /api/users');
    const validated = validateSchema(UsersListSchema, body, 'GET /api/users');

    expect(validated.data.length).toBeGreaterThan(0);
    expect(validated.page).toBe(testData.users.listPage);
    expect(validated.data.every((u) => u.email.includes('@'))).toBe(true);
  });

  test('list users returns correct pagination fields', async ({ usersClient }) => {
    allure.story('Pagination');
    allure.severity('normal');

    const { response, body } = await usersClient.getUsers(1);

    assertStatusCode(response.status(), 200, 'GET /api/users page=1');
    const validated = validateSchema(UsersListSchema, body, 'Pagination');

    expect(validated.per_page).toBeGreaterThan(0);
    expect(validated.total).toBeGreaterThan(0);
    expect(validated.total_pages).toBeGreaterThan(0);
  });

  test('get single user returns 200 with valid schema', async ({ usersClient }) => {
    allure.story('Single User');
    allure.severity('critical');

    const { response, body } = await usersClient.getUser(testData.users.existingUserId);

    assertStatusCode(response.status(), 200, `GET /api/users/${testData.users.existingUserId}`);
    const validated = validateSchema(SingleUserSchema, body, 'Single User');

    expect(validated.data.id).toBe(testData.users.existingUserId);
    expect(validated.data.email).toBeTruthy();
    expect(validated.data.first_name).toBeTruthy();
  });

  test('get user with non-existent ID returns 404', async ({ usersClient }) => {
    allure.story('User Not Found');
    allure.severity('critical');

    const { response } = await usersClient.getUserNotFound(testData.users.nonExistentUserId);

    assertStatusCode(response.status(), 404, `GET /api/users/${testData.users.nonExistentUserId}`);
  });

  test('get single user has content-type application/json', async ({ usersClient }) => {
    allure.story('Response Headers');
    allure.severity('minor');

    const { response } = await usersClient.getUser(testData.users.existingUserId);

    const contentType = response.headers()['content-type'] ?? '';
    expect(contentType).toContain('application/json');
  });

  test('list users contains support information', async ({ usersClient }) => {
    allure.story('Support Info');
    allure.severity('minor');

    const { body } = await usersClient.getUsers(1);
    const validated = validateSchema(UsersListSchema, body, 'Support Info');

    expect(validated.support.url).toBeTruthy();
    expect(validated.support.text).toBeTruthy();
  });
});
