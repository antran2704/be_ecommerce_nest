import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";
import { ENUM_AUTH_PROVIDER } from "~/modules/auth_provider/enums/provider.enum";

export default class GetUserResponseDto {
  @ApiProperty({
    example: `${ENUM_PREFIX_DATABASE.US}123`,
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
    example: "0946xxxx",
  })
  phoneNumber: string;

  @ApiProperty({
    example: "2025-04-01T14:10:20.176Z",
  })
  @AutoMap()
  birthday: string;

  @ApiProperty({
    example: true,
  })
  @AutoMap()
  isActive: boolean;

  @ApiProperty({
    example: [
      {
        providerId: "123",
        provider: ENUM_AUTH_PROVIDER.SYSTEM,
      },
    ],
  })
  providers: [
    {
      providerId: string;
      provider: ENUM_AUTH_PROVIDER;
    },
  ];

  @ApiProperty({
    example: "2025-01-07T07:53:40.829Z",
  })
  @AutoMap()
  createdAt: string;
}
