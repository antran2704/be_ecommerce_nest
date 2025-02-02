import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ENUM_PERMISSION } from "~/modules/permissions/enums/permission.enum";

export default class UpdateRoleRequestDto {
  @ApiProperty({
    required: true,
    example: "Super Admin",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    enum: ENUM_PERMISSION,
    required: true,
    example: [ENUM_PERMISSION.STAFF_CREATE],
    type: "array",
  })
  @IsArray()
  @IsEnum(ENUM_PERMISSION, { each: true })
  permissions: ENUM_PERMISSION[];
}
