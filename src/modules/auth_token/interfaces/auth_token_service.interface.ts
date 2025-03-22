import { AdminEntity } from "~/modules/admin/entities/admin.entity";
import { AuthTokenEntity } from "../entities/auth_token.entity";
import {
  UpdateForgotOtpAuthTokenDto,
  UpdateRefreshTokenAuthTokenDto,
} from "../dtos";
import { UserEntity } from "~/modules/user/entities/user.entity";

export interface IAuthTokenService {
  getAuthTokenByUserId(userId: string): Promise<AuthTokenEntity>;
  create(data: AdminEntity | UserEntity): Promise<void>;
  updateRefreshToken(
    userId: string,
    data: UpdateRefreshTokenAuthTokenDto,
  ): Promise<void>;
  updateForgotOtp(
    userId: string,
    data: UpdateForgotOtpAuthTokenDto,
  ): Promise<void>;
}
