import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { UserEntity } from "~/modules/user/entities/user.entity";
import { ENUM_CARD_STATUS } from "../../enums/cart.enum";

export default class CreateCartDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNumber()
  @Min(0)
  total: number;

  @IsEnum(ENUM_CARD_STATUS)
  is_active: ENUM_CARD_STATUS;

  @Type(() => UserEntity)
  user: UserEntity;
}
