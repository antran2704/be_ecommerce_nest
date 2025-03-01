import { IsNumber, IsOptional, IsString } from "class-validator";

export default class AdminCreateVariantProductInventoryDto {
  @IsNumber()
  stock: number;

  @IsString()
  @IsOptional()
  variant_product_id: string | null;
}
