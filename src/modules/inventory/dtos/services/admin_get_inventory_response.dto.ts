import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

import { ModifierResponseDto } from "~/common/dtos";
import { AutoMap } from "@automapper/classes";

export default class AdminGetInventoryResponseDto extends ModifierResponseDto {
  @ApiProperty({
    required: true,
    example: "123",
  })
  @IsString()
  inventoryId: string;

  @ApiProperty({
    required: true,
    example: 10,
  })
  @IsNumber()
  @AutoMap()
  stock: number;
}
