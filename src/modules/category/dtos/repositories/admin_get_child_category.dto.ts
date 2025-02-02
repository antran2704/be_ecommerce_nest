import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class AdminGetChildCategoryDto {
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  id: string;

  @IsNotEmpty()
  @IsString()
  @AutoMap()
  name: string;

  @IsString()
  @AutoMap()
  parent_id: string | null;

  @IsNumber()
  @AutoMap()
  category_index: number;

  @IsNumber()
  @AutoMap()
  children_count: number;

  @IsString()
  @AutoMap()
  created_at: string;
}
