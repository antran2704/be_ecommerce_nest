import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";

export default class AdminCreateVariantProductRequestDto {
  @ApiProperty({
    required: true,
    example: "Iphone 15 Pro Max",
  })
  @IsNotEmpty()
  @IsString()
  variantProductName: string;

  @ApiProperty({
    required: true,
    example: "/path/to/thumbnail",
  })
  @IsString()
  @IsOptional()
  thumbnail: string;

  @ApiProperty({
    required: true,
    example: 1000,
  })
  @IsNumber()
  @Min(0)
  basePrice: number;

  @ApiProperty({
    required: true,
    example: 100,
  })
  @IsNumber()
  @Min(0)
  promotionPrice: number;

  @ApiProperty({
    required: true,
    example: 10,
  })
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({
    required: true,
    example: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    required: true,
    example: ENUM_PREFIX_DATABASE.PR + "123",
  })
  @IsString()
  productId: string;

  @ApiProperty({
    required: true,
    example: [ENUM_PREFIX_DATABASE.VTE + "123"],
  })
  @IsArray()
  @IsString({ each: true })
  variantValueIds: string[];
}
