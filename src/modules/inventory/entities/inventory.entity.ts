import { AutoMap } from "@automapper/classes";
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DatabaseModifierEntity } from "~/common/database/mySQL/bases/database_modifier.entity";
import { ProductEntity } from "~/modules/product/entities/product.entity";

@Entity("inventories")
export class InventoryEntity extends DatabaseModifierEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: string;

  @Column({ type: "int", default: 0 })
  @AutoMap()
  stock: number;

  @ManyToOne(() => ProductEntity, (entity) => entity.sub_categories, {
    nullable: true,
  })
  product: ProductEntity | null;
}
