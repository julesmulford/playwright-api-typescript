import { z } from 'zod';

export const LoginResponseSchema = z.object({
  token: z.string().min(1),
});

export const RegisterResponseSchema = z.object({
  id: z.number().int().positive(),
  token: z.string().min(1),
});

export const ErrorResponseSchema = z.object({
  error: z.string().min(1),
});

export type LoginResponseSchemaType = z.infer<typeof LoginResponseSchema>;
export type RegisterResponseSchemaType = z.infer<typeof RegisterResponseSchema>;
export type ErrorResponseSchemaType = z.infer<typeof ErrorResponseSchema>;
