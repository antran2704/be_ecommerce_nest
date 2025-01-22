import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export default class LogoutAdminRequestDto {
  @ApiProperty({
    required: true,
    example: "userId123",
  })
  @IsNotEmpty()
  @IsString()
  userId: string;
}
