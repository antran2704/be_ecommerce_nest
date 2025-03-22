import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { PaginationRequestDto } from "~/common/pagination/dtos";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";

export default class GetCartItemsRequestDto extends PaginationRequestDto {
  @ApiProperty({
    example: ENUM_PREFIX_DATABASE.CAR + "123",
  })
  @IsString()
  cardId: string;
}
