import { Entity, PrimaryColumn, JoinColumn, ManyToOne, Column } from "typeorm";

import { DatabaseModifierEntity } from "~/common/database/mySQL/bases/database_modifier.entity";
import { CartEntity } from "./cart.entity";
import { ProductEntity } from "~/modules/product/entities/product.entity";
import { VariantProductEntity } from "~/modules/variant_product/entities/variant_product.entity";

@Entity({ name: "cart_items" })
export class CartItemEntity extends DatabaseModifierEntity {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => CartEntity, (entity) => entity.cart_items, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "cart" })
  cart: CartEntity;

  @ManyToOne(() => ProductEntity, (entity) => entity.cart_items, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "product" })
  product: ProductEntity;

  @ManyToOne(() => VariantProductEntity, (entity) => entity.cart_items, {
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({ name: "variant_product" })
  variant_product: VariantProductEntity;

  @Column({ type: "int", default: 0 })
  quantity: number;
}
