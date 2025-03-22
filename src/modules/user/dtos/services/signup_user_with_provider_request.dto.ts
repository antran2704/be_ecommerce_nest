import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ENUM_AUTH_PROVIDER } from "~/modules/auth_provider/enums/provider.enum";

export default class SignupUserWithProviderRequestDto {
  @ApiProperty({
    required: true,
    example: "phamtrangiaan27@gmail.com",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  providerId: string;

  @IsNotEmpty()
  @IsEnum(ENUM_AUTH_PROVIDER)
  provider: ENUM_AUTH_PROVIDER;
}
