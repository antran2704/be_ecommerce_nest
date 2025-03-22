import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ENUM_AUTH_PROVIDER } from "../../enums/provider.enum";

export default class CreateAuthProviderDto {
  @IsNotEmpty()
  @IsEnum(ENUM_AUTH_PROVIDER)
  provider: ENUM_AUTH_PROVIDER;

  @IsOptional()
  @IsString()
  provider_id?: string;

  @IsNotEmpty()
  @IsString()
  user_id: string;
}
