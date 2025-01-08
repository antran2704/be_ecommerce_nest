import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export default class GetAdminResponseDto {
  @ApiProperty({
    example: "AD123",
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
    example: "2025-01-07T07:53:40.829Z",
  })
  @AutoMap()
  createdAt: string;
}
