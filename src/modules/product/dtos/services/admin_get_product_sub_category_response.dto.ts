import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";

export default class AdminGetProductSubCategoryResponseDto {
  @ApiProperty({
    required: true,
    example: ENUM_PREFIX_DATABASE.CA + "123",
  })
  @IsString()
  categoryId: string;

  @ApiProperty({
    required: true,
    example: "Clothes",
  })
  @IsString()
  categoryName: string;
}
