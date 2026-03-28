import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  baseUrl: process.env.API_BASE_URL ?? 'https://reqres.in',
  apiKey: process.env.API_KEY ?? 'reqres-free-v1',
  timeoutMs: parseInt(process.env.API_TIMEOUT_MS ?? '30000', 10),
} as const;
