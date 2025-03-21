import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Min } from "class-validator";

import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";

export default class AdminCreateVariantProductInventoryRequestDto {
  @ApiProperty({
    required: true,
    example: 10,
  })
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({
    required: true,
    example: ENUM_PREFIX_DATABASE.VPR + "123",
  })
  @IsString()
  varaintProductId: string;
}
