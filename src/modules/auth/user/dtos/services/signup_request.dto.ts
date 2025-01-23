import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export default class SignupUserRequestDto {
  @ApiProperty({
    required: true,
    example: "phamtrangiaan27@gmail.com",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    example: "150603",
  })
  @IsNotEmpty()
  @IsString()
  otp: string;

  @ApiProperty({
    required: true,
    example: "123456",
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
