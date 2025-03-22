import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEnum } from "class-validator";
import { ENUM_AUTH_PROVIDER } from "~/modules/auth_provider/enums/provider.enum";

export default class LoginWithProviderRequestDto {
  @ApiProperty({
    required: true,
    example: "xxx.yyy.zzz",
  })
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @ApiProperty({
    required: true,
    enum: ENUM_AUTH_PROVIDER,
    example: ENUM_AUTH_PROVIDER.GOOGLE,
  })
  @IsNotEmpty()
  @IsEnum(ENUM_AUTH_PROVIDER)
  provider: ENUM_AUTH_PROVIDER;
}
