import { Entity, Column, PrimaryColumn, OneToOne } from "typeorm";

import { DatabaseModifierEntity } from "~/common/database/mySQL/bases/database_modifier.entity";
import { UserEntity } from "~/modules/user/entities/user.entity";
import { ENUM_CARD_STATUS } from "../enums/cart.enum";

@Entity({ name: "carts" })
export class CartEntity extends DatabaseModifierEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: "decimal", default: 0 })
  total: number;

  @Column({
    type: "enum",
    enum: ENUM_CARD_STATUS,
    default: ENUM_CARD_STATUS.ACTIVE,
  })
  status: ENUM_CARD_STATUS;

  @OneToOne(() => UserEntity, (entity) => entity.cart, { onDelete: "CASCADE" })
  user: UserEntity;
}
