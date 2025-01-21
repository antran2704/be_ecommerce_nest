import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { IAuthTokenRepository } from "../../interfaces/auth_token_repositoty.interface";
import { AdminEntity } from "../../../admin/entities/admin.entity";
import {
  UpdateForgotOtpAuthTokenDto,
  UpdateRefreshTokenAuthTokenDto,
} from "../../dtos";
import { AuthTokenEntity } from "../../entities/auth_token.entity";

@Injectable()
export default class AuthTokenRepository implements IAuthTokenRepository {
  constructor(
    @InjectRepository(AuthTokenEntity)
    private readonly authTokenEntity: Repository<AuthTokenEntity>,
  ) {}

  async create(data: AdminEntity): Promise<void> {
    const newAuthToken = this.authTokenEntity.create({
      admin: data,
    });

    await this.authTokenEntity.save(newAuthToken);
  }

  async getAuthToken(id: string): Promise<AuthTokenEntity> {
    return await this.authTokenEntity.findOne({ where: { admin: { id } } });
  }

  async updateForgotOtp(
    userId: string,
    data: UpdateForgotOtpAuthTokenDto,
  ): Promise<void> {
    await this.authTokenEntity.update(
      { admin: { id: userId } },
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
      { admin: { id: userId } },
      {
        refresh_token: data.refreshToken,
      },
    );
  }
}
