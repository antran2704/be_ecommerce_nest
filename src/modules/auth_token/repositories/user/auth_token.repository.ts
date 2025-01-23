import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import {
  UpdateForgotOtpAuthTokenDto,
  UpdateRefreshTokenAuthTokenDto,
  UpdateSignupOtpAuthTokenDto,
} from "../../dtos";
import { AuthTokenEntity } from "../../entities/auth_token.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { IUserAuthTokenRepository } from "../../interfaces/user_auth_token_repository.interface";

@Injectable()
export default class AuthTokenRepository implements IUserAuthTokenRepository {
  constructor(
    @InjectRepository(AuthTokenEntity)
    private readonly authTokenEntity: Repository<AuthTokenEntity>,
  ) {}

  async create(data: UserEntity): Promise<void> {
    const newAuthToken = this.authTokenEntity.create({
      user: data,
    });

    await this.authTokenEntity.save(newAuthToken);
  }

  async getAuthToken(id: string): Promise<AuthTokenEntity> {
    return await this.authTokenEntity.findOne({ where: { user: { id } } });
  }

  async updateForgotOtp(
    userId: string,
    data: UpdateForgotOtpAuthTokenDto,
  ): Promise<void> {
    await this.authTokenEntity.update(
      { user: { id: userId } },
      {
        forgot_otp: data.forgotOtp,
        forgot_otp_expire_at: data.forgotOtpExpireAt,
      },
    );
  }

  async updateRefreshToken(
    userId: string,
    data: UpdateRefreshTokenAuthTokenDto,
  ): Promise<void> {
    await this.authTokenEntity.update(
      { user: { id: userId } },
      {
        refresh_token: data.refreshToken,
      },
    );
  }

  async updateSignupOtp(
    userId: string,
    data: UpdateSignupOtpAuthTokenDto,
  ): Promise<void> {
    await this.authTokenEntity.update(
      { user: { id: userId } },
      {
        signup_otp: data.signupOtp,
        signup_otp_expire_at: data.signupOtpExpireAt,
      },
    );
  }
}
