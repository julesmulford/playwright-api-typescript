import { allure } from 'allure-playwright';
import { test, expect } from '../src/fixtures/api.fixtures';
import { assertStatusCode } from '../src/utils/assertion-helpers';
import { testData } from '../src/testdata/test-data';

test.describe('DELETE /api/users', () => {
  test.beforeEach(async () => {
    allure.epic('Users API');
    allure.feature('Delete Users');
  });

  test('DELETE /api/users/:id returns 204 No Content', async ({ usersClient }) => {
    allure.story('Delete User');
    allure.severity('critical');

    const { response } = await usersClient.deleteUser(testData.users.existingUserId);

    assertStatusCode(response.status(), 204, `DELETE /api/users/${testData.users.existingUserId}`);
  });

  test('DELETE /api/users/:id returns empty body', async ({ usersClient }) => {
    allure.story('Delete User Empty Body');
    allure.severity('minor');

    const { response } = await usersClient.deleteUser(testData.users.existingUserId);

    const body = await response.text();
    expect(body.trim()).toBe('');
  });
});
