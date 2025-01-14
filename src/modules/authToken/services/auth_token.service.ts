import { Injectable } from "@nestjs/common";

import { AdminEntity } from "../../admin/entities/admin.entity";
import {
  UpdateForgotOtpAuthTokenDto,
  UpdateRefreshTokenAuthTokenDto,
} from "../dtos";
import { IAuthTokenService } from "../interfaces/auth_token_service.interface";
import { AuthTokenRepository } from "../repositories/auth_token.repository";
import { AuthTokenEntity } from "../entities/auth_admin_token.entity";

@Injectable()
export class AuthTokenService implements IAuthTokenService {
  constructor(private readonly authTokenRepository: AuthTokenRepository) {}

  async create(data: AdminEntity): Promise<void> {
    await this.authTokenRepository.create(data);
  }

  async getAuthTokenByUserId(id: string): Promise<AuthTokenEntity> {
    return await this.authTokenRepository.getAuthToken(id);
  }

  async updateForgotOtp(
    userId: string,
    data: UpdateForgotOtpAuthTokenDto,
  ): Promise<void> {
    await this.authTokenRepository.updateForgotOtp(userId, data);
  }

  async updateRefreshToken(
    userId: string,
    data: UpdateRefreshTokenAuthTokenDto,
  ): Promise<void> {
    await this.authTokenRepository.updateRefreshToken(userId, data);
  }
}
