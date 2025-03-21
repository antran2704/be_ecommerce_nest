import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";
import { ModifierResponseDto } from "~/common/dtos";
import { ENUM_CARD_STATUS } from "../../enums/cart.enum";

export default class AdminGetCartResponseDto extends ModifierResponseDto {
  @ApiProperty({
    required: true,
    example: ENUM_PREFIX_DATABASE.CAR + "123",
  })
  @IsNotEmpty()
  @IsString()
  cartId: string;

  @ApiProperty({
    required: true,
    example: 1000,
  })
  @IsNumber()
  cartTotal: number;

  @ApiProperty({
    required: true,
    example: ENUM_CARD_STATUS.ACTIVE,
  })
  @IsEnum(ENUM_CARD_STATUS)
  cartStatus: ENUM_CARD_STATUS;
}
