import { Type } from "class-transformer";
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";

import { ProductEntity } from "~/modules/product/entities/product.entity";
import { VariantTypeValueEntity } from "~/modules/variant_type_value/entities/variant_type_value.entity";

export default class AdminCreateVariantProductDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  thumbnail: string;

  @IsNumber()
  @Min(0)
  base_price: number;

  @IsNumber()
  @Min(0)
  promotion_price: number;

  @IsBoolean()
  is_active: boolean;

  @Type(() => ProductEntity)
  product: ProductEntity;

  @ValidateNested({ each: true })
  @Type(() => VariantTypeValueEntity)
  variant_product_values: VariantTypeValueEntity[];
}
