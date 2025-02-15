import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";

export default class AdminGetProductInventoryRequestDto {
  @ApiProperty({
    required: true,
    example: ENUM_PREFIX_DATABASE.PR + "123",
  })
  @IsString()
  productId: string;
}
