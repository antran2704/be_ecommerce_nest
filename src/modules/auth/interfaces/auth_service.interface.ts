import {
  ForgotPasswordRequestDto,
  ForgotPasswordResponseDto,
  LoginRequestDto,
  LoginResponseDto,
  LogoutRequestDto,
  NewAccessTokenResponseDto,
  ResetPasswordRequestDto,
} from "../dtos";
import ConfirmForgotForgotPasswordRequestDto from "../dtos/services/confirm_otp_forgot_password_request.dto";

export interface IAuthService {
  login(data: LoginRequestDto): Promise<LoginResponseDto>;
  logout(payload: LogoutRequestDto): Promise<void>;
  forgotPassword(
    data: ForgotPasswordRequestDto,
  ): Promise<ForgotPasswordResponseDto>;
  confirmOtpForgotPassword(
    data: ConfirmForgotForgotPasswordRequestDto,
  ): Promise<void>;
  resetPassword(data: ResetPasswordRequestDto): Promise<void>;
  getNewAccessToken(data: any): Promise<NewAccessTokenResponseDto>;
}
