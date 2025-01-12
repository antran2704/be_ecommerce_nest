import { AdminEntity } from "src/modules/admin/entities/admin.entity";
import { AuthTokenEntity } from "../entities/auth_admin_token.entity";
import {
  UpdateForgotOtpAuthTokenDto,
  UpdateRefreshTokenAuthTokenDto,
} from "../dtos";

export interface IAuthTokenService {
  get(userId: string): Promise<AuthTokenEntity>;
  create(data: AdminEntity): Promise<void>;
  updateRefreshToken(
    userId: string,
    data: UpdateRefreshTokenAuthTokenDto,
  ): Promise<void>;
  updateForgotOtp(
    userId: string,
    data: UpdateForgotOtpAuthTokenDto,
  ): Promise<void>;
}
