import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

export default class AdminUpdateVariantProductDto {
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
}
