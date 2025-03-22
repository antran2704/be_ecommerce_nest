import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export default class AdminUpdateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsString()
  @IsOptional()
  parent_id?: string;

  @IsNumber()
  @IsOptional()
  category_index?: number;
}
