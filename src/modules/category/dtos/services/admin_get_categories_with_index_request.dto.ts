import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

export default class AdminGetCategoriesByIndexRequestDto {
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0, { message: "Minimal page is 0" })
  @IsOptional()
  index?: number;
}
