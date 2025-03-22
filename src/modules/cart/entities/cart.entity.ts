import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";

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
  @JoinColumn({ name: "user" })
  user: UserEntity;

  @OneToMany(() => UserEntity, (entity) => entity.cart, { onDelete: "CASCADE" })
  cart_items: UserEntity;
}
