import { allure } from 'allure-playwright';
import { test, expect } from '../src/fixtures/api.fixtures';
import {
  LoginResponseSchema,
  RegisterResponseSchema,
  ErrorResponseSchema,
} from '../src/schemas/auth.schemas';
import { validateSchema, assertStatusCode } from '../src/utils/assertion-helpers';
import { testData } from '../src/testdata/test-data';

test.describe('POST /api/login and /api/register', () => {
  test.beforeEach(async () => {
    allure.epic('Authentication API');
    allure.feature('Login and Registration');
  });

  test('POST /api/login with valid credentials returns 200 and token', async ({ usersClient }) => {
    allure.story('Valid Login');
    allure.severity('critical');

    const { response, body } = await usersClient.login(testData.auth.validLogin());

    assertStatusCode(response.status(), 200, 'POST /api/login');
    const validated = validateSchema(LoginResponseSchema, body, 'Valid Login');

    expect(validated.token).toBeTruthy();
    expect(validated.token.length).toBeGreaterThan(0);
  });

  test('POST /api/login without password returns 400 with error', async ({ usersClient }) => {
    allure.story('Login Missing Password');
    allure.severity('critical');

    const { response, body } = await usersClient.login(testData.auth.loginMissingPassword());

    assertStatusCode(response.status(), 400, 'POST /api/login missing password');
    const validated = validateSchema(ErrorResponseSchema, body, 'Login Error');

    expect(validated.error).toBeTruthy();
    expect(validated.error.toLowerCase()).toContain('missing');
  });

  test('POST /api/register with valid credentials returns 200 and id + token', async ({ usersClient }) => {
    allure.story('Valid Registration');
    allure.severity('critical');

    const { response, body } = await usersClient.register(testData.auth.validRegister());

    assertStatusCode(response.status(), 200, 'POST /api/register');
    const validated = validateSchema(RegisterResponseSchema, body, 'Valid Register');

    expect(validated.id).toBeGreaterThan(0);
    expect(validated.token).toBeTruthy();
  });

  test('login response has content-type application/json', async ({ usersClient }) => {
    allure.story('Login Response Headers');
    allure.severity('minor');

    const { response } = await usersClient.login(testData.auth.validLogin());

    const contentType = response.headers()['content-type'] ?? '';
    expect(contentType).toContain('application/json');
  });
});
