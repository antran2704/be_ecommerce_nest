import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export default class ForgotPasswordUserResponseDto {
  @ApiProperty({
    required: true,
    example: "150603",
  })
  @IsString()
  otp: string;

  @ApiProperty({
    required: true,
    example: "2025-01-18T11:27:41.231Z",
  })
  @IsString()
  expireAt: string;
}
