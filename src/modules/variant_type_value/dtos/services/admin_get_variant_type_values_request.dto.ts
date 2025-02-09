import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

import { PaginationSearchRequestDto } from "~/common/pagination/dtos";

export default class AdminGetVariantTypeValuesRequestDto extends PaginationSearchRequestDto {
  @ApiProperty()
  @IsString()
  variantTypeId: string;
}
