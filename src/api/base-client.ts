import { APIRequestContext, APIResponse } from '@playwright/test';
import { allure } from 'allure-playwright';

export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number>;
}

export class BaseClient {
  protected readonly request: APIRequestContext;
  protected readonly baseUrl: string;

  constructor(request: APIRequestContext, baseUrl: string) {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  protected async get<T>(
    path: string,
    options: RequestOptions = {},
  ): Promise<{ response: APIResponse; body: T }> {
    const url = `${this.baseUrl}${path}`;
    const response = await this.request.get(url, {
      headers: options.headers,
      params: options.params,
    });
    const body = await this.parseResponse<T>(response, 'GET', url);
    await this.attachToAllure('GET', url, null, body, response.status());
    return { response, body };
  }

  protected async post<TReq, TRes>(
    path: string,
    payload: TReq,
    options: RequestOptions = {},
  ): Promise<{ response: APIResponse; body: TRes }> {
    const url = `${this.baseUrl}${path}`;
    const response = await this.request.post(url, {
      data: payload as Record<string, unknown>,
      headers: options.headers,
    });
    const body = await this.parseResponse<TRes>(response, 'POST', url);
    await this.attachToAllure('POST', url, payload, body, response.status());
    return { response, body };
  }

  protected async put<TReq, TRes>(
    path: string,
    payload: TReq,
    options: RequestOptions = {},
  ): Promise<{ response: APIResponse; body: TRes }> {
    const url = `${this.baseUrl}${path}`;
    const response = await this.request.put(url, {
      data: payload as Record<string, unknown>,
      headers: options.headers,
    });
    const body = await this.parseResponse<TRes>(response, 'PUT', url);
    await this.attachToAllure('PUT', url, payload, body, response.status());
    return { response, body };
  }

  protected async patch<TReq, TRes>(
    path: string,
    payload: TReq,
    options: RequestOptions = {},
  ): Promise<{ response: APIResponse; body: TRes }> {
    const url = `${this.baseUrl}${path}`;
    const response = await this.request.patch(url, {
      data: payload as Record<string, unknown>,
      headers: options.headers,
    });
    const body = await this.parseResponse<TRes>(response, 'PATCH', url);
    await this.attachToAllure('PATCH', url, payload, body, response.status());
    return { response, body };
  }

  protected async delete(
    path: string,
    options: RequestOptions = {},
  ): Promise<{ response: APIResponse }> {
    const url = `${this.baseUrl}${path}`;
    const response = await this.request.delete(url, {
      headers: options.headers,
    });
    await this.attachToAllure('DELETE', url, null, null, response.status());
    return { response };
  }

  private async parseResponse<T>(
    response: APIResponse,
    method: string,
    url: string,
  ): Promise<T> {
    const text = await response.text();
    if (!text || text.trim() === '') {
      return undefined as unknown as T;
    }
    try {
      return JSON.parse(text) as T;
    } catch {
      throw new Error(`Failed to parse response from ${method} ${url}: ${text}`);
    }
  }

  private async attachToAllure(
    method: string,
    url: string,
    requestBody: unknown,
    responseBody: unknown,
    statusCode: number,
  ): Promise<void> {
    try {
      const label = `${method} ${url} → ${statusCode}`;
      if (requestBody !== null && requestBody !== undefined) {
        allure.attachment(
          `${label} - Request Body`,
          JSON.stringify(requestBody, null, 2),
          'application/json',
        );
      }
      if (responseBody !== null && responseBody !== undefined) {
        allure.attachment(
          `${label} - Response Body`,
          JSON.stringify(responseBody, null, 2),
          'application/json',
        );
      }
    } catch {
      // Allure attachment failures should not break test execution
    }
  }
}
