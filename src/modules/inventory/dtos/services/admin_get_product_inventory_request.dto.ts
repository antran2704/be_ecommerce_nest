import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { ENUM_PAGINATION_ORDER } from "~/common/pagination/enums/order.enum";

export default class AdminGetProductInventoryRequestDto {
  @ApiPropertyOptional({
    example: ENUM_PAGINATION_ORDER.DESC,
    enum: ENUM_PAGINATION_ORDER,
    default: ENUM_PAGINATION_ORDER.DESC,
  })
  @IsEnum(ENUM_PAGINATION_ORDER, {
    message: `order must be ${ENUM_PAGINATION_ORDER.ASC} or ${ENUM_PAGINATION_ORDER.DESC}`,
  })
  @IsOptional()
  order?: ENUM_PAGINATION_ORDER = ENUM_PAGINATION_ORDER.DESC;

  @ApiProperty({
    required: true,
  })
  @IsString()
  productId: string;
}
