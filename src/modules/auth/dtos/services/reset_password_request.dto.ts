import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, IsString } from "class-validator";

export default class ResetPasswordRequestDto {
  @ApiProperty({
    required: true,
    example: "phamtrangiaan27@gmail.com",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    example: "123456@Abc",
  })
  @IsNotEmpty()
  @IsString()
  otp: string;

  @ApiProperty({
    required: true,
    example: "123456@Abc",
  })
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
