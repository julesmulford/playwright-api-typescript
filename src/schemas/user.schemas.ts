import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number().int().positive(),
  email: z.string().email(),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  avatar: z.string().url(),
});

export const UserSupportSchema = z.object({
  url: z.string().url(),
  text: z.string().min(1),
});

export const UsersListSchema = z.object({
  page: z.number().int().positive(),
  per_page: z.number().int().positive(),
  total: z.number().int().nonnegative(),
  total_pages: z.number().int().positive(),
  data: z.array(UserSchema),
  support: UserSupportSchema,
});

export const SingleUserSchema = z.object({
  data: UserSchema,
  support: UserSupportSchema,
});

export const CreateUserResponseSchema = z.object({
  name: z.string().min(1),
  job: z.string().min(1),
  id: z.string().min(1),
  createdAt: z.string().min(1),
});

export const UpdateUserResponseSchema = z.object({
  name: z.string().min(1),
  job: z.string().min(1),
  updatedAt: z.string().min(1),
});

export type UsersListSchemaType = z.infer<typeof UsersListSchema>;
export type SingleUserSchemaType = z.infer<typeof SingleUserSchema>;
export type CreateUserResponseSchemaType = z.infer<typeof CreateUserResponseSchema>;
export type UpdateUserResponseSchemaType = z.infer<typeof UpdateUserResponseSchema>;
