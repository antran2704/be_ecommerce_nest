import { IsString } from "class-validator";

export default class UpdateRefreshTokenAuthTokenDto {
  @IsString()
  forgotOtp: string;

  @IsString()
  forgotOtpExpireAt: string;
}
