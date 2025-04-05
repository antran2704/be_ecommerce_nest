import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export default class AdminCreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsString()
  @IsOptional()
  parent_id?: string;

  @IsNumber()
  category_index: number;
}
