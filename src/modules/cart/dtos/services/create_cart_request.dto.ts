import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum } from "class-validator";

import { ENUM_CARD_STATUS } from "../../enums/cart.enum";
import { UserEntity } from "~/modules/user/entities/user.entity";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";

export default class CreateCartRequestDto {
  @ApiProperty({
    required: true,
    example: {
      id: ENUM_PREFIX_DATABASE.US + "123",
    },
  })
  @Type(() => UserEntity)
  user: UserEntity;

  @ApiProperty({
    required: true,
    example: ENUM_CARD_STATUS.ACTIVE,
  })
  @IsEnum(() => ENUM_CARD_STATUS)
  status: ENUM_CARD_STATUS;
}
