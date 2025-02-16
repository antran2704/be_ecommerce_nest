import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

import { AutoMap } from "@automapper/classes";

export default class AdminGetInventoryResponseDto {
  @ApiProperty({
    required: true,
    example: 123,
  })
  @IsString()
  inventoryId: number;

  @ApiProperty({
    required: true,
    example: 10,
  })
  @IsNumber()
  @AutoMap()
  stock: number;
}
