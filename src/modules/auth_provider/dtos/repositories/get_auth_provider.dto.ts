import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ENUM_AUTH_PROVIDER } from "../../enums/provider.enum";

export default class GetAuthProviderDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsEnum(ENUM_AUTH_PROVIDER)
  provider: ENUM_AUTH_PROVIDER;
}
