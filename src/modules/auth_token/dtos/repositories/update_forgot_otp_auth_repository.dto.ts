import { IsString } from "class-validator";

export default class UpdateForgotOtpAuthTokenDto {
  @IsString()
  forgotOtp: string;

  @IsString()
  forgotOtpExpireAt: string;
}
