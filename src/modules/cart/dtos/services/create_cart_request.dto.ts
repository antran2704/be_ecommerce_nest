import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

import { ENUM_CARD_STATUS } from "../../enums/cart.enum";
import { UserEntity } from "~/modules/user/entities/user.entity";

export default class CreateCartRequestDto {
  @ApiProperty({
    required: true,
    example: ENUM_CARD_STATUS.ACTIVE,
  })
  @Type(() => UserEntity)
  user: UserEntity;
}
