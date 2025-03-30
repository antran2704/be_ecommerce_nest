import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";

import { PaginationSearchRequestDto } from "~/common/pagination/dtos";
import { ENUM_ADMIN_STATUS } from "../../enums/admin.enum";

export default class SearchAdminResponseDto extends PaginationSearchRequestDto {
  @ApiPropertyOptional({
    example: ENUM_ADMIN_STATUS.ACTIVE,
    enum: ENUM_ADMIN_STATUS,
    default: ENUM_ADMIN_STATUS.ACTIVE,
  })
  @IsEnum(ENUM_ADMIN_STATUS)
  @IsOptional()
  status: ENUM_ADMIN_STATUS;
}
