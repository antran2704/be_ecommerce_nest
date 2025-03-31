import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum } from "class-validator";
import { ENUM_PERMISSION } from "~/modules/permissions/enums/permission.enum";

export default class UpdatePermissionRequestDto {
  @ApiProperty({
    enum: ENUM_PERMISSION,
    required: true,
    example: [ENUM_PERMISSION.ADMIN_STAFF_CREATE],
    type: "array",
  })
  @IsArray()
  @IsEnum(ENUM_PERMISSION, { each: true })
  permissions: ENUM_PERMISSION[];
}
