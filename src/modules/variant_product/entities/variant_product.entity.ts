import { AutoMap } from "@automapper/classes";
import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
  OneToMany,
} from "typeorm";

import { DatabaseModifierEntity } from "~/common/database/mySQL/bases/database_modifier.entity";
import { CartItemEntity } from "~/modules/cart/entities/cart_item.entity";
import { InventoryEntity } from "~/modules/inventory/entities/inventory.entity";
import { ProductEntity } from "~/modules/product/entities/product.entity";
import { VariantTypeValueEntity } from "~/modules/variant_type_value/entities/variant_type_value.entity";

@Entity({ name: "variant_products" })
export class VariantProductEntity extends DatabaseModifierEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  @AutoMap()
  name: string;

  @Column({ nullable: true, default: null })
  @AutoMap()
  thumbnail: string;

  @Column({ type: "decimal", default: 0 })
  base_price: number;

  @Column({ type: "decimal", default: 0 })
  promotion_price: number;

  @Column({ type: "boolean", default: true })
  is_active: boolean;

  @ManyToOne(() => ProductEntity, (entity) => entity.variant_products, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "product" })
  product: ProductEntity;

  @ManyToMany(
    () => VariantTypeValueEntity,
    (entity) => entity.variant_product_values,
    { eager: true },
  )
  @JoinTable({
    name: "variant_product_values",
    joinColumn: { name: "variant_product_id", referencedColumnName: "id" },
    inverseJoinColumn: {
      name: "variant_type_value_id",
      referencedColumnName: "id",
    },
  })
  variant_type_values: VariantTypeValueEntity[];

  @OneToMany(() => InventoryEntity, (entity) => entity.variant_product, {
    cascade: true,
    eager: true,
  })
  inventories: InventoryEntity[];

  @OneToMany(() => CartItemEntity, (entity) => entity.variant_product, {
    cascade: true,
  })
  cart_items: CartItemEntity[];
}
