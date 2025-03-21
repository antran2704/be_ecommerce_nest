import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";
import { ModifierResponseDto } from "~/common/dtos";

export default class AdminGetVariantProductListResponseDto extends ModifierResponseDto {
  @ApiProperty({
    required: true,
    example: ENUM_PREFIX_DATABASE.VPR + "123",
  })
  @IsNotEmpty()
  @IsString()
  variantProductId: string;

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
  @AutoMap()
  thumbnail: string;

  @ApiProperty({
    required: true,
    example: 1000,
  })
  @IsNumber()
  basePrice: number;

  @ApiProperty({
    required: true,
    example: 100,
  })
  @IsNumber()
  promotionPrice: number;

  @ApiProperty({
    required: true,
    example: 100,
  })
  @IsNumber()
  stock: number;

  @ApiProperty({
    required: true,
    example: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    required: true,
    example: [
      {
        variantTypeValueId: ENUM_PREFIX_DATABASE.VTE + "123",
        variantTypeValueName: "Blue",
      },
    ],
  })
  @IsArray()
  variantTypeValues: {
    variantTypeValueId: string;
    variantTypeValueName: string;
  }[];
}
