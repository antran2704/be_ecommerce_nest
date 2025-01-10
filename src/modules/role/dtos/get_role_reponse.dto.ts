import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class GetRoleResponeDto {
  @ApiProperty({
    required: true,
    example: "GR123123",
  })
  @AutoMap()
  @IsNotEmpty()
  @IsString()
  groupRoleId: string;

  @ApiProperty({
    required: true,
    example: "Super Admin",
  })
  @AutoMap()
  @IsNotEmpty()
  @IsString()
  name: string;
}
