import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { ENUM_PERMISSION } from "~/modules/permissions/enums/permission.enum";

export default class GetAdminPermissionResponseDto {
  @ApiProperty({
    enum: ENUM_PERMISSION,
    type: "array",
    example: [ENUM_PERMISSION.ROLE_CREATE],
  })
  @AutoMap()
  permissions: ENUM_PERMISSION[];
}
