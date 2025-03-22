import { UpdateSignupOtpAuthTokenDto } from "../dtos";
import { IAuthTokenRepository } from "./auth_token_repositoty.interface";

export interface IUserAuthTokenRepository extends IAuthTokenRepository {
  updateSignupOtp(
    userId: string,
    data: UpdateSignupOtpAuthTokenDto,
  ): Promise<void>;
}
