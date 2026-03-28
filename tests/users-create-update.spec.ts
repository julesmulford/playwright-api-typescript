import { allure } from 'allure-playwright';
import { test, expect } from '../src/fixtures/api.fixtures';
import {
  CreateUserResponseSchema,
  UpdateUserResponseSchema,
} from '../src/schemas/user.schemas';
import { validateSchema, assertStatusCode } from '../src/utils/assertion-helpers';
import { testData } from '../src/testdata/test-data';

test.describe('POST/PUT/PATCH /api/users', () => {
  test.beforeEach(async () => {
    allure.epic('Users API');
    allure.feature('Create and Update Users');
  });

  test('POST /api/users creates user and returns 201', async ({ usersClient }) => {
    allure.story('Create User');
    allure.severity('critical');

    const payload = testData.users.newUser();
    const { response, body } = await usersClient.createUser(payload);

    assertStatusCode(response.status(), 201, 'POST /api/users');
    const validated = validateSchema(CreateUserResponseSchema, body, 'Create User');

    expect(validated.name).toBe(payload.name);
    expect(validated.job).toBe(payload.job);
    expect(validated.id).toBeTruthy();
    expect(validated.createdAt).toBeTruthy();
  });

  test('POST /api/users returns id as string', async ({ usersClient }) => {
    allure.story('Create User Response Fields');
    allure.severity('normal');

    const { body } = await usersClient.createUser(testData.users.newUser());
    const validated = validateSchema(CreateUserResponseSchema, body, 'Create User Fields');

    expect(typeof validated.id).toBe('string');
    expect(validated.id.length).toBeGreaterThan(0);
  });

  test('PUT /api/users/:id fully updates user and returns 200', async ({ usersClient }) => {
    allure.story('Full Update User');
    allure.severity('critical');

    const payload = testData.users.updatedUser();
    const { response, body } = await usersClient.updateUser(testData.users.existingUserId, payload);

    assertStatusCode(response.status(), 200, `PUT /api/users/${testData.users.existingUserId}`);
    const validated = validateSchema(UpdateUserResponseSchema, body, 'Full Update');

    expect(validated.name).toBe(payload.name);
    expect(validated.job).toBe(payload.job);
    expect(validated.updatedAt).toBeTruthy();
  });

  test('PATCH /api/users/:id partially updates user and returns 200', async ({ usersClient }) => {
    allure.story('Partial Update User');
    allure.severity('normal');

    const payload = testData.users.patchedUser();
    const { response, body } = await usersClient.patchUser(testData.users.existingUserId, payload);

    assertStatusCode(response.status(), 200, `PATCH /api/users/${testData.users.existingUserId}`);
    const validated = validateSchema(UpdateUserResponseSchema, body, 'Partial Update');

    expect(validated.job).toBe(payload.job);
    expect(validated.updatedAt).toBeTruthy();
  });

  test('PUT returns updatedAt timestamp in response', async ({ usersClient }) => {
    allure.story('Update Timestamp');
    allure.severity('minor');

    const { body } = await usersClient.updateUser(testData.users.existingUserId, testData.users.updatedUser());
    const validated = validateSchema(UpdateUserResponseSchema, body, 'Update Timestamp');

    const updatedAt = new Date(validated.updatedAt);
    expect(updatedAt.getTime()).not.toBeNaN();
  });
});
