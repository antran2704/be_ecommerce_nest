import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Min } from "class-validator";

import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";

export default class CreateCartItemRequestDto {
  @ApiProperty({
    required: true,
    example: ENUM_PREFIX_DATABASE.CAR + "123",
  })
  @IsString()
  cartId: string;

  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({
    required: true,
    example: ENUM_PREFIX_DATABASE.PR + "123",
  })
  @IsString()
  productId: string;

  @ApiPropertyOptional({
    required: true,
    example: ENUM_PREFIX_DATABASE.VPR + "123",
  })
  @IsOptional()
  @IsString()
  variantProductId: string | null;
}
