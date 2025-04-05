import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export default class AdminUpdateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  parent_id?: string;

  @IsOptional()
  @IsNumber()
  category_index?: number;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsOptional()
  @IsString()
  slug?: string;
}
