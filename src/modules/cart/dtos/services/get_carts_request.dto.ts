import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";

import { PaginationSearchRequestDto } from "~/common/pagination/dtos";
import { ENUM_CARD_STATUS } from "../../enums/cart.enum";

export default class GetCartsRequestDto extends PaginationSearchRequestDto {
  @ApiPropertyOptional({
    example: ENUM_CARD_STATUS.ACTIVE,
    enum: ENUM_CARD_STATUS,
  })
  @IsEnum(ENUM_CARD_STATUS)
  @IsOptional()
  cardStatus?: ENUM_CARD_STATUS;
}
