import { IsNumber, IsOptional, IsString } from "class-validator";

export default class AdminCreateProductInventoryDto {
  @IsNumber()
  stock: number;

  @IsString()
  @IsOptional()
  product_id: string | null;
}
