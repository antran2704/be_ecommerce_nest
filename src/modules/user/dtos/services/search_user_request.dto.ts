import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";

import { PaginationSearchRequestDto } from "~/common/pagination/dtos";
import { ENUM_USER_STATUS } from "../../enums/user.enum";

export default class SearchUserResponseDto extends PaginationSearchRequestDto {
  @ApiPropertyOptional({
    example: ENUM_USER_STATUS.ACTIVE,
    enum: ENUM_USER_STATUS,
    default: ENUM_USER_STATUS.ACTIVE,
  })
  @IsEnum(ENUM_USER_STATUS)
  @IsOptional()
  status: ENUM_USER_STATUS;
}
