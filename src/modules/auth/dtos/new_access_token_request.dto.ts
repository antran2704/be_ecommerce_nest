import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export default class NewAccessTokenRequestDto {
  @ApiProperty({
    required: true,
    example: "abc.xyz.123",
  })
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @ApiProperty({
    required: true,
    example: "abc.xyz.123",
  })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
