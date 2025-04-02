import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";
import { ENUM_AUTH_PROVIDER } from "~/modules/auth_provider/enums/provider.enum";

export default class IsExitUserRequestDto {
  @ApiProperty({
    required: true,
    example: "phamtrangiaan27@gmail.com",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    example: ENUM_AUTH_PROVIDER.SYSTEM,
  })
  @IsNotEmpty()
  @IsEnum(ENUM_AUTH_PROVIDER)
  provider: ENUM_AUTH_PROVIDER;
}
