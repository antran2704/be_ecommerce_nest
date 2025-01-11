import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { ENUM_PREFIX_DATABASE } from "src/common/database/enums/perfix.enum";

export default class GetGroupRoleResponeDto {
  @ApiProperty({
    required: true,
    example: `${ENUM_PREFIX_DATABASE.GR}123123`,
  })
  @AutoMap()
  @IsNotEmpty()
  @IsString()
  groupRoleId: string;

  @ApiProperty({
    required: true,
    example: "Group Admin",
  })
  @AutoMap()
  @IsNotEmpty()
  @IsString()
  name: string;
}
