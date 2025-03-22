import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ENUM_AUTH_PROVIDER } from "../../enums/provider.enum";

export default class CreateAuthProviderRequestDto {
  @IsNotEmpty()
  @IsEmail()
  userId: string;

  @IsNotEmpty()
  @IsString()
  providerId: string;

  @IsNotEmpty()
  @IsEnum(ENUM_AUTH_PROVIDER)
  provider: ENUM_AUTH_PROVIDER;
}
