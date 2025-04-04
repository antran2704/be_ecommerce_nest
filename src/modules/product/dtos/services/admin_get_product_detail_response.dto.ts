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
import { ModifierResponseDto } from "~/common/dtos";
import { AutoMap } from "@automapper/classes";
import { IAdminOptionProduct } from "../../interfaces/admin_option_product.interface";

export default class AdminGetProductDetailResponseDto extends ModifierResponseDto {
  @ApiProperty({
    required: true,
    example: ENUM_PREFIX_DATABASE.PR + "123",
  })
  @IsNotEmpty()
  @IsString()
  productId: string;

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
  @AutoMap()
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
    example: [
      { categoryId: ENUM_PREFIX_DATABASE.CA + "123", categoryName: "T-shirt" },
    ],
  })
  @IsArray()
  subCategories: AdminGetProductSubCategoryResponseDto[];

  @ApiProperty({
    required: true,
    example: 100,
  })
  @IsNumber()
  stock: number;

  @ApiProperty({
    example: [
      {
        id: "123",
        name: "Color",
        values: [
          {
            id: "123",
            name: "Blue",
          },
        ],
      },
    ],
  })
  options: IAdminOptionProduct[];
}
