# playwright-api-typescript

REST API test framework — TypeScript, Playwright Test, Zod schema validation, ESLint, Prettier, Allure reporting targeting reqres.in.

REST API test framework built on Playwright Test runner, demonstrating enterprise API testing patterns: typed API client, Zod schema validation, structured request/response logging, Allure reporting with payload attachments, and deterministic test data.

## Tech Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Language | TypeScript | 5.4.5 |
| Test Runner | @playwright/test | 1.44.0 |
| Schema Validation | zod | 3.23.8 |
| Reporting | allure-playwright | 2.9.2 |
| Environment | dotenv | 16.4.5 |
| Linting | ESLint | 9.3.0 |
| Formatting | Prettier | 3.3.0 |

## Project Structure

```
playwright-api-typescript/
├── .github/workflows/ci.yml
├── src/
│   ├── api/
│   │   ├── base-client.ts
│   │   └── users-client.ts
│   ├── models/
│   │   ├── user.model.ts
│   │   └── auth.model.ts
│   ├── schemas/
│   │   ├── user.schemas.ts
│   │   └── auth.schemas.ts
│   ├── fixtures/
│   │   └── api.fixtures.ts
│   ├── config/
│   │   └── config.ts
│   ├── utils/
│   │   ├── allure-helper.ts
│   │   └── assertion-helpers.ts
│   └── testdata/
│       └── test-data.ts
├── tests/
│   ├── users-get.spec.ts
│   ├── users-create-update.spec.ts
│   ├── users-delete.spec.ts
│   └── auth.spec.ts
├── playwright.config.ts
├── tsconfig.json
├── package.json
├── .env.example
├── .eslintrc.cjs
├── .prettierrc
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js 20+
- npm 10+

## Setup

```bash
git clone https://github.com/YOUR_USERNAME/playwright-api-typescript.git
cd playwright-api-typescript
npm install
```

No browser installation needed — this is an API test suite only.

## Running Tests

```bash
# All tests
npm test

# Specific test file
npx playwright test tests/users-get.spec.ts

# With Allure report
npm test && npm run report

# Lint
npm run lint

# Format check
npm run format:check

# Type check
npm run typecheck
```

## Allure Reporting

```bash
npm run report
```

## CI/CD

GitHub Actions: lint → typecheck → test → upload Allure results.

## Architecture Decisions

**Typed API Client**: `BaseClient` wraps Playwright's `APIRequestContext` with typed request/response methods. All requests and responses are logged and attached to Allure.

**Zod Validation**: Each API response is validated against a Zod schema before assertions run, catching structural drift early.

**Fixture Pattern**: `apiFixtures` extends Playwright's `test` to inject `usersClient` and `baseUrl` into every test.

**Deterministic Test Data**: `testData` module provides named presets. `POST`/`PUT` tests use stable payloads.
