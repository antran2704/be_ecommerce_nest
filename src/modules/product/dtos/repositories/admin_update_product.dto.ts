import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { CategoryEntity } from "~/modules/category/entities/category.entity";

export default class AdminUpdateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  thumbnail: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  gallery: string[];

  @IsNumber()
  base_price: number;

  @IsNumber()
  promotion_price: number;

  @IsBoolean()
  is_active: boolean;

  @IsString()
  main_category_id: string;

  @ValidateNested({ each: true })
  @Type(() => CategoryEntity)
  sub_categories: CategoryEntity[];
}
