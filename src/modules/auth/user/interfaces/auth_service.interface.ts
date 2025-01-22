import {
  ForgotPasswordUserRequestDto,
  ForgotPasswordUserResponseDto,
  LoginUserRequestDto,
  LoginUserResponseDto,
  LogoutUserRequestDto,
  NewAccessTokenUserResponseDto,
  ResetPasswordUserRequestDto,
} from "../dtos";
import ConfirmForgotPasswordRequestDto from "../dtos/services/confirm_otp_forgot_password_request.dto";

export interface IAuthUserService {
  login(data: LoginUserRequestDto): Promise<LoginUserResponseDto>;
  logout(payload: LogoutUserRequestDto): Promise<void>;
  forgotPassword(
    data: ForgotPasswordUserRequestDto,
  ): Promise<ForgotPasswordUserResponseDto>;
  confirmOtpForgotPassword(
    data: ConfirmForgotPasswordRequestDto,
  ): Promise<void>;
  resetPassword(data: ResetPasswordUserRequestDto): Promise<void>;
  getNewAccessToken(data: any): Promise<NewAccessTokenUserResponseDto>;
}
