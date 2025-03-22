import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from "class-validator";
import { ENUM_PAGINATION_ORDER } from "../enums/order.enum";
import { Type } from "class-transformer";

class PaginationRequestDto {
  @ApiPropertyOptional({
    example: "1",
  })
  @Type(() => Number)
  @IsInt()
  @Min(1, { message: "Minimal page is 1" })
  @IsOptional()
  page: number = 1;

  @ApiPropertyOptional({
    example: "10",
    default: 10,
  })
  @IsInt()
  @Type(() => Number)
  @Min(1, { message: "Minimal take is 1" })
  @Max(100, { message: "Maximal take is 100" })
  @IsOptional()
  limit: number = 10;

  @ApiPropertyOptional({
    example: ENUM_PAGINATION_ORDER.DESC,
    enum: ENUM_PAGINATION_ORDER,
    default: ENUM_PAGINATION_ORDER.DESC,
  })
  @IsEnum(ENUM_PAGINATION_ORDER, {
    message: `order must be ${ENUM_PAGINATION_ORDER.ASC} or ${ENUM_PAGINATION_ORDER.DESC}`,
  })
  @IsOptional()
  order: ENUM_PAGINATION_ORDER = ENUM_PAGINATION_ORDER.DESC;

  @ApiPropertyOptional({
    required: false,
    description: "Sort column",
  })
  @IsString()
  @IsOptional()
  readonly sort?: string;
}

export default PaginationRequestDto;
