import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";

export default class GetAdminListResponseDto {
  @ApiProperty({
    example: `${ENUM_PREFIX_DATABASE.AD}123`,
  })
  @AutoMap()
  userId: string;

  @ApiProperty({
    example: "phamtrangiaan27@gmail.com",
  })
  @AutoMap()
  email: string;

  @ApiProperty({
    example: "antran",
  })
  @AutoMap()
  name: string;

  @ApiProperty({
    example: "/path/image",
  })
  @AutoMap()
  avatar: string;

  @ApiProperty({
    example: "Admin",
  })
  @AutoMap()
  role: string;

  @ApiProperty({
    example: ENUM_PREFIX_DATABASE.RO + "123",
  })
  @AutoMap()
  roleId: string;

  @ApiProperty({
    example: "Super Admin",
  })
  @AutoMap()
  groupRole: string;

  @ApiProperty({
    example: ENUM_PREFIX_DATABASE.GR + "123",
  })
  @AutoMap()
  groupRoleId: string;

  @ApiProperty({
    example: true,
  })
  @AutoMap()
  isAdmin: boolean;

  @ApiProperty({
    example: true,
  })
  @AutoMap()
  isActive: boolean;

  @ApiProperty({
    example: "2026-01-08T07:53:40.829Z",
  })
  @AutoMap()
  createdAt: string;
}
