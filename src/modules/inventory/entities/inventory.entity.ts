import { AutoMap } from "@automapper/classes";
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm";
import { DatabaseModifierEntity } from "~/common/database/mySQL/bases/database_modifier.entity";
import { ProductEntity } from "~/modules/product/entities/product.entity";
import { VariantProductEntity } from "~/modules/variant_product/entities/variant_product.entity";

@Entity("inventories")
export class InventoryEntity extends DatabaseModifierEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column({ type: "int", default: 0 })
  @AutoMap()
  stock: number;

  @ManyToOne(() => ProductEntity, (entity) => entity.inventories, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "product_id" })
  product: ProductEntity | null;

  @Column()
  product_id: string;

  @ManyToOne(() => VariantProductEntity, (entity) => entity.inventories, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "variant_product_id" })
  variant_product: VariantProductEntity | null;

  @Column()
  variant_product_id: string;
}
