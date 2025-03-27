import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class UpdateAdminMeRequestDto {
  @ApiProperty({
    required: true,
    example: "admin",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    required: true,
    example: "/images/avatar.png",
  })
  @IsString()
  avatar: string;
}
