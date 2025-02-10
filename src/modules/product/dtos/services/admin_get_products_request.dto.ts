import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

import { PaginationSearchRequestDto } from "~/common/pagination/dtos";

export default class AdminGetProductsRequestDto extends PaginationSearchRequestDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  categoryId?: string;
}
