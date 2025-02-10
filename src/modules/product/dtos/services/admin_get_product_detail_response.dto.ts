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
import AdminGetProductSubCategoryResponseDto from "./admin_get_product_sub_category_response.dto";

export default class AdminGetProductDetailResponseDto {
  @ApiProperty({
    required: true,
    example: "Iphone 15 Pro Max",
  })
  @IsNotEmpty()
  @IsString()
  productName: string;

  @ApiProperty({
    required: true,
    example: "Description product",
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    required: true,
    example: "/path/to/thumbnail",
  })
  @IsString()
  @IsOptional()
  thumbnail: string;

  @ApiProperty({
    required: true,
    example: ["/path/to/thumbnail"],
  })
  @IsArray()
  @IsString({ each: true })
  gallery: string[];

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
    example: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    required: true,
    example: ENUM_PREFIX_DATABASE.CA + "123",
  })
  @IsString()
  mainCategoryId: string;

  @ApiProperty({
    required: true,
    example: "Clothes",
  })
  @IsString()
  mainCategoryName: string;

  @ApiProperty({
    required: true,
    example: [AdminGetProductSubCategoryResponseDto],
  })
  @IsArray()
  subCategories: AdminGetProductSubCategoryResponseDto[];
}
