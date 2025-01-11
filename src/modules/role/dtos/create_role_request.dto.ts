import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class CreateRoleRequestDto {
  @ApiProperty({
    required: true,
    example: "GR123",
  })
  @IsNotEmpty()
  @IsString()
  groupRoleId: string;

  @ApiProperty({
    required: true,
    example: "Super Admin",
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
