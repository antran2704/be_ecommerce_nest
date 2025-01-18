import { IsString } from "class-validator";

export default class UpdateRefreshTokenAuthTokenDto {
  @IsString()
  refreshToken: string;
}
