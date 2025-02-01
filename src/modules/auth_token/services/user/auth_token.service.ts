import { Injectable, NotFoundException } from "@nestjs/common";

import {
  UpdateForgotOtpAuthTokenDto,
  UpdateRefreshTokenAuthTokenDto,
  UpdateSignupOtpAuthTokenDto,
} from "../../dtos";
import { UserAuthTokenRepository } from "../../repositories";
import { AuthTokenEntity } from "../../entities/auth_token.entity";
import { AUTH_TOKEN_ERROR_MESSAGES } from "../../messages/auth_token.error";
import { UserEntity } from "~/modules/user/entities/user.entity";
import { IUserAuthTokenService } from "../../interfaces/user_auth_token_service.interface";

@Injectable()
export default class AuthTokenService implements IUserAuthTokenService {
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

  async updateSignupOtp(
    userId: string,
    data: UpdateSignupOtpAuthTokenDto,
  ): Promise<void> {
    const authToken = await this.authTokenRepository.getAuthToken(userId);

    if (!authToken)
      throw new NotFoundException(AUTH_TOKEN_ERROR_MESSAGES.NOT_FOUND);

    await this.authTokenRepository.updateSignupOtp(userId, data);
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
