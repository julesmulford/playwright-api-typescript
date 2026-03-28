import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseClient } from './base-client';
import {
  CreateUserRequest,
  CreateUserResponse,
  SingleUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  UsersListResponse,
} from '../models/user.model';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../models/auth.model';

export class UsersClient extends BaseClient {
  constructor(request: APIRequestContext, baseUrl: string) {
    super(request, baseUrl);
  }

  async getUsers(page: number = 1): Promise<{ response: APIResponse; body: UsersListResponse }> {
    return this.get<UsersListResponse>('/api/users', { params: { page } });
  }

  async getUser(id: number): Promise<{ response: APIResponse; body: SingleUserResponse }> {
    return this.get<SingleUserResponse>(`/api/users/${id}`);
  }

  async getUserNotFound(id: number): Promise<{ response: APIResponse; body: Record<string, unknown> }> {
    return this.get<Record<string, unknown>>(`/api/users/${id}`);
  }

  async createUser(
    payload: CreateUserRequest,
  ): Promise<{ response: APIResponse; body: CreateUserResponse }> {
    return this.post<CreateUserRequest, CreateUserResponse>('/api/users', payload);
  }

  async updateUser(
    id: number,
    payload: UpdateUserRequest,
  ): Promise<{ response: APIResponse; body: UpdateUserResponse }> {
    return this.put<UpdateUserRequest, UpdateUserResponse>(`/api/users/${id}`, payload);
  }

  async patchUser(
    id: number,
    payload: UpdateUserRequest,
  ): Promise<{ response: APIResponse; body: UpdateUserResponse }> {
    return this.patch<UpdateUserRequest, UpdateUserResponse>(`/api/users/${id}`, payload);
  }

  async deleteUser(id: number): Promise<{ response: APIResponse }> {
    return this.delete(`/api/users/${id}`);
  }

  async login(
    payload: LoginRequest,
  ): Promise<{ response: APIResponse; body: LoginResponse | Record<string, string> }> {
    return this.post<LoginRequest, LoginResponse | Record<string, string>>('/api/login', payload);
  }

  async register(
    payload: RegisterRequest,
  ): Promise<{ response: APIResponse; body: RegisterResponse }> {
    return this.post<RegisterRequest, RegisterResponse>('/api/register', payload);
  }
}
