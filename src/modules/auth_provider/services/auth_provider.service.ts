import { Injectable } from "@nestjs/common";

import { AuthProviderEntity } from "../entities/auth_provider.entity";
import { IAuthProviderService } from "../interfaces/auth_provider_service.interface";
import { AuthProviderRepository } from "../repositories/auth_provider.repository";
import {
  CreateAuthProviderRequestDto,
  CreateAuthProviderSystemRequestDto,
  GetAuthProviderRequestDto,
} from "../dtos/services";
import { CreateAuthProviderDto } from "../dtos/repositories";
import { ENUM_AUTH_PROVIDER } from "../enums/provider.enum";

@Injectable()
export class AuthProviderService implements IAuthProviderService {
  constructor(
    private readonly authProviderRepository: AuthProviderRepository,
  ) {}

  async createAuthProvider(
    payload: CreateAuthProviderRequestDto,
  ): Promise<void> {
    const data: CreateAuthProviderDto = {
      provider: payload.provider,
      provider_id: payload.providerId,
      user_id: payload.userId,
    };

    await this.authProviderRepository.createAuthProvider(data);
  }

  async createAuthProviderSystem(
    payload: CreateAuthProviderSystemRequestDto,
  ): Promise<void> {
    const data: CreateAuthProviderDto = {
      provider: ENUM_AUTH_PROVIDER.SYSTEM,
      user_id: payload.userId,
    };

    await this.authProviderRepository.createAuthProvider(data);
  }

  async getAuthProvider(
    data: GetAuthProviderRequestDto,
  ): Promise<AuthProviderEntity> {
    return await this.authProviderRepository.getAuthProvider(data);
  }
}
