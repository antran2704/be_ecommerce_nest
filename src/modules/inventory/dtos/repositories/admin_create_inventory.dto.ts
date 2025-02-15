import { Type } from "class-transformer";
import { IsNumber, IsOptional, ValidateNested } from "class-validator";
import { ProductEntity } from "~/modules/product/entities/product.entity";

export default class AdminCreateInventoryDto {
  @IsNumber()
  stock: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProductEntity)
  product?: ProductEntity | null;
}
