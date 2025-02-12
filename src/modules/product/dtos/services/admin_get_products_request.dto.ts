import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";

import { PaginationSearchRequestDto } from "~/common/pagination/dtos";
import { ENUM_PRODUCT_STATUS } from "../../enums/product.enum";

export default class AdminGetProductsRequestDto extends PaginationSearchRequestDto {
  @ApiPropertyOptional({
    example: ENUM_PRODUCT_STATUS.ACTIVE,
    enum: ENUM_PRODUCT_STATUS,
    default: ENUM_PRODUCT_STATUS.ACTIVE,
  })
  @IsEnum(ENUM_PRODUCT_STATUS)
  @IsOptional()
  status?: ENUM_PRODUCT_STATUS;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  categoryId?: string;
}
