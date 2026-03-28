import { CreateUserRequest, UpdateUserRequest } from '../models/user.model';
import { LoginRequest, RegisterRequest } from '../models/auth.model';

export const testData = {
  users: {
    existingUserId: 2,
    nonExistentUserId: 23,
    listPage: 2,
    newUser: (): CreateUserRequest => ({
      name: 'Jane Smith',
      job: 'Software Engineer',
    }),
    updatedUser: (): UpdateUserRequest => ({
      name: 'Jane Smith Updated',
      job: 'Senior Software Engineer',
    }),
    patchedUser: (): UpdateUserRequest => ({
      job: 'Principal Engineer',
    }),
  },
  auth: {
    validLogin: (): LoginRequest => ({
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    }),
    loginMissingPassword: (): LoginRequest => ({
      email: 'peter@klaven.com',
    }),
    validRegister: (): RegisterRequest => ({
      email: 'eve.holt@reqres.in',
      password: 'pistol',
    }),
  },
} as const;
