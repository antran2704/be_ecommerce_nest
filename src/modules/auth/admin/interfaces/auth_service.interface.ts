import NewAccessTokenResponseDto from "../../dtos/new_access_token_response.dto";
import {
  ForgotPasswordAdminRequestDto,
  ForgotPasswordAdminResponseDto,
  LoginAdminRequestDto,
  LoginAdminResponseDto,
  LogoutAdminRequestDto,
  ResetPasswordAdminRequestDto,
} from "../dtos";
import ConfirmForgotPasswordRequestDto from "../dtos/services/confirm_otp_forgot_password_request.dto";

export interface IAuthAdminService {
  login(data: LoginAdminRequestDto): Promise<LoginAdminResponseDto>;
  logout(payload: LogoutAdminRequestDto): Promise<void>;
  forgotPassword(
    data: ForgotPasswordAdminRequestDto,
  ): Promise<ForgotPasswordAdminResponseDto>;
  isInForgotPassword(data: ForgotPasswordAdminRequestDto): Promise<boolean>;
  confirmOtpForgotPassword(
    data: ConfirmForgotPasswordRequestDto,
  ): Promise<void>;
  resetPassword(data: ResetPasswordAdminRequestDto): Promise<void>;
  getNewAccessToken(data: any): Promise<NewAccessTokenResponseDto>;
}
