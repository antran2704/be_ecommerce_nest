import {
  ForgotPasswordUserRequestDto,
  ForgotPasswordUserResponseDto,
  LoginUserRequestDto,
  LoginUserResponseDto,
  LoginWithProviderRequestDto,
  LogoutUserRequestDto,
  NewAccessTokenUserResponseDto,
  ResetPasswordUserRequestDto,
  SendSignupOtpRequestDto,
  SendSignupOtpResponseDto,
  SignupUserRequestDto,
} from "../dtos";
import ConfirmForgotPasswordRequestDto from "../dtos/services/confirm_otp_forgot_password_request.dto";

export interface IAuthUserService {
  login(data: LoginUserRequestDto): Promise<LoginUserResponseDto>;
  loginWithProvider(
    data: LoginWithProviderRequestDto,
  ): Promise<LoginUserResponseDto>;
  signup(data: SignupUserRequestDto): Promise<void>;
  logout(payload: LogoutUserRequestDto): Promise<void>;

  sendSignupOtp(
    data: SendSignupOtpRequestDto,
  ): Promise<SendSignupOtpResponseDto>;
  confirmSignupOtp(data: SendSignupOtpRequestDto): Promise<void>;

  forgotPassword(
    data: ForgotPasswordUserRequestDto,
  ): Promise<ForgotPasswordUserResponseDto>;
  confirmOtpForgotPassword(
    data: ConfirmForgotPasswordRequestDto,
  ): Promise<void>;

  resetPassword(data: ResetPasswordUserRequestDto): Promise<void>;
  getNewAccessToken(data: any): Promise<NewAccessTokenUserResponseDto>;
}
