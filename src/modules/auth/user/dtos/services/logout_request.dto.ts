import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export default class LogoutUserRequestDto {
  @ApiProperty({
    required: true,
    example: "userId123",
  })
  @IsNotEmpty()
  @IsString()
  userId: string;
}
