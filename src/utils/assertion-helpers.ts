import { expect } from '@playwright/test';
import { ZodSchema } from 'zod';
import { allure } from 'allure-playwright';

export function assertStatusCode(
  actual: number,
  expected: number,
  context: string = '',
): void {
  expect(actual, `[${context}] Expected status ${expected} but got ${actual}`).toBe(expected);
}

export function validateSchema<T>(schema: ZodSchema<T>, data: unknown, context: string = ''): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
    allure.attachment(`Schema Validation Errors (${context})`, errors, 'text/plain');
    throw new Error(`Schema validation failed [${context}]: ${errors}`);
  }
  return result.data;
}

export function assertHasHeader(headers: { [key: string]: string }, name: string): void {
  const normalized = name.toLowerCase();
  const found = Object.keys(headers).some((k) => k.toLowerCase() === normalized);
  expect(found, `Expected header '${name}' to be present`).toBe(true);
}
