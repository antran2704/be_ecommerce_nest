import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export default class ModifierResponseDto {
  @ApiProperty({
    example: "2025-01-07T07:53:40.829Z",
  })
  @AutoMap()
  createdAt: string;
}
