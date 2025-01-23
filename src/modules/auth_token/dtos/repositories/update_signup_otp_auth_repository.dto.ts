import { IsString } from "class-validator";

export default class UpdateSignupOtpAuthTokenDto {
  @IsString()
  signupOtp: string;

  @IsString()
  signupOtpExpireAt: string;
}
