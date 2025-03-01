import { IsNumber, IsOptional, IsString } from "class-validator";

export default class AdminCreateInventoryDto {
  @IsNumber()
  stock: number;

  @IsString()
  @IsOptional()
  product_id: string | null;
}
