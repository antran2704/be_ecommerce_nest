import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { ProductEntity } from "~/modules/product/entities/product.entity";
import { VariantProductEntity } from "~/modules/variant_product/entities/variant_product.entity";
import { CartEntity } from "../../entities/cart.entity";

export default class CreateCartItemDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @Type(() => CartEntity)
  cart: CartEntity;

  @Type(() => ProductEntity)
  product: ProductEntity;

  @Type(() => VariantProductEntity)
  variant_product: VariantProductEntity | null;
}
