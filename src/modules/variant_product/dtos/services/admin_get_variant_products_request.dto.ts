import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";

import { PaginationSearchRequestDto } from "~/common/pagination/dtos";
import { ENUM_VARIANT_PRODUCT_STATUS } from "../../enums/variant_product.enum";

export default class AdminGetProductsRequestDto extends PaginationSearchRequestDto {
  @ApiPropertyOptional({
    example: ENUM_VARIANT_PRODUCT_STATUS.ACTIVE,
    enum: ENUM_VARIANT_PRODUCT_STATUS,
    default: ENUM_VARIANT_PRODUCT_STATUS.ACTIVE,
  })
  @IsEnum(ENUM_VARIANT_PRODUCT_STATUS)
  @IsOptional()
  status?: ENUM_VARIANT_PRODUCT_STATUS;

  @ApiProperty()
  @IsString()
  productId: string;
}
