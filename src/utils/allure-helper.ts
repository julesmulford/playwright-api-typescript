import { allure } from 'allure-playwright';

export async function attachJson(name: string, data: unknown): Promise<void> {
  try {
    allure.attachment(name, JSON.stringify(data, null, 2), 'application/json');
  } catch {
    // Non-fatal
  }
}

export async function attachText(name: string, content: string): Promise<void> {
  try {
    allure.attachment(name, content, 'text/plain');
  } catch {
    // Non-fatal
  }
}

export function addApiLabel(method: string, endpoint: string, statusCode: number): void {
  allure.label('api_endpoint', `${method} ${endpoint}`);
  allure.label('status_code', String(statusCode));
}
