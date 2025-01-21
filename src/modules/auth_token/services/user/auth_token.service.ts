import { Injectable, NotFoundException } from "@nestjs/common";

import {
  UpdateForgotOtpAuthTokenDto,
  UpdateRefreshTokenAuthTokenDto,
} from "../../dtos";
import { IAuthTokenService } from "../../interfaces/auth_token_service.interface";
import { UserAuthTokenRepository } from "../../repositories";
import { AuthTokenEntity } from "../../entities/auth_token.entity";
import { AUTH_TOKEN_ERROR_MESSAGES } from "../../messages/auth_token.error";
import { UserEntity } from "src/modules/user/entities/user.entity";

@Injectable()
export default class AuthTokenService implements IAuthTokenService {
  constructor(private readonly authTokenRepository: UserAuthTokenRepository) {}

  async create(data: UserEntity): Promise<void> {
    await this.authTokenRepository.create(data);
  }

  async getAuthTokenByUserId(id: string): Promise<AuthTokenEntity> {
    const data = await this.authTokenRepository.getAuthToken(id);

    if (!data) throw new NotFoundException(AUTH_TOKEN_ERROR_MESSAGES.NOT_FOUND);

    return data;
  }

  async updateForgotOtp(
    userId: string,
    data: UpdateForgotOtpAuthTokenDto,
  ): Promise<void> {
    const authToken = await this.authTokenRepository.getAuthToken(userId);

    if (!authToken)
      throw new NotFoundException(AUTH_TOKEN_ERROR_MESSAGES.NOT_FOUND);

    await this.authTokenRepository.updateForgotOtp(userId, data);
  }

  async updateRefreshToken(
    userId: string,
    data: UpdateRefreshTokenAuthTokenDto,
  ): Promise<void> {
    const authToken = await this.authTokenRepository.getAuthToken(userId);

    if (!authToken)
      throw new NotFoundException(AUTH_TOKEN_ERROR_MESSAGES.NOT_FOUND);

    await this.authTokenRepository.updateRefreshToken(userId, data);
  }
}
