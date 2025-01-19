import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class CreateGroupRoleRequestDto {
  @ApiProperty({
    required: true,
    example: "Group Admin",
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
