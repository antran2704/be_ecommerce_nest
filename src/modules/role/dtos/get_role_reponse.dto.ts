import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";

export default class GetRoleResponeDto {
  @ApiProperty({
    required: true,
    example: `${ENUM_PREFIX_DATABASE.RO}123123`,
  })
  @AutoMap()
  @IsString()
  roleId: string;

  @ApiProperty({
    required: true,
    example: "Super Admin",
  })
  @AutoMap()
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    example: "Super Admin",
  })
  @AutoMap()
  @IsString()
  permissions: string[];
}
