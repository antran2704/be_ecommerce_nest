import { UpdateSignupOtpAuthTokenDto } from "../dtos";
import { IAuthTokenService } from "./auth_token_service.interface";

export interface IUserAuthTokenService extends IAuthTokenService {
  updateSignupOtp(
    userId: string,
    data: UpdateSignupOtpAuthTokenDto,
  ): Promise<void>;
}
