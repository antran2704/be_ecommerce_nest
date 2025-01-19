import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail } from "class-validator";

export default class ForgotPasswordRequestDto {
  @ApiProperty({
    required: true,
    example: "phamtrangiaan27@gmail.com",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
