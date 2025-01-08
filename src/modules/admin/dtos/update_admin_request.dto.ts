import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class UpdateAdminRequestDto {
  @ApiProperty({
    required: true,
    example: "admin",
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
