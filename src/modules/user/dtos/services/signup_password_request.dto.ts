import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class SignupUserPasswordRequestDto {
  @ApiProperty({
    required: true,
    example: "123456",
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
