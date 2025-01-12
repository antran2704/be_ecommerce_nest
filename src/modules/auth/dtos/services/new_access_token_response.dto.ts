import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export default class NewAccessTokenResponseDto {
  @ApiProperty({
    required: true,
    example: "abc.xyz.123",
  })
  @IsNotEmpty()
  @IsString()
  newAccessToken: string;
}
