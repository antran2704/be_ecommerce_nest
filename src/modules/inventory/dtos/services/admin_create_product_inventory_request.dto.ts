import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";

export default class AdminCreateProductInventoryRequestDto {
  @ApiProperty({
    required: true,
    example: 10,
  })
  @IsNumber()
  stock: number;

  @ApiProperty({
    required: true,
    example: ENUM_PREFIX_DATABASE.PR + "123",
  })
  @IsString()
  productId: string;
}
