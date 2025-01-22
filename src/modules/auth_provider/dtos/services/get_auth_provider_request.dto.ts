import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export default class CreateAuthProviderRequestDto {
  @IsNotEmpty()
  @IsEmail()
  accessToken: string;

  @IsNotEmpty()
  @IsString()
  providerId: string;
}
