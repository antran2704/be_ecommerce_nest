import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class ResetPasswordRequestDto {
  @ApiProperty({
    required: true,
    example: "123456@Abc",
  })
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
