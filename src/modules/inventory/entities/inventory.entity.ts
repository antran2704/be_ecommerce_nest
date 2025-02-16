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

@Entity("inventories")
export class InventoryEntity extends DatabaseModifierEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: string;

  @Column({ type: "int", default: 0 })
  @AutoMap()
  stock: number;

  @ManyToOne(() => ProductEntity, (entity) => entity.inventories, {
    nullable: true,
  })
  @JoinColumn({ name: "product_id" })
  product: ProductEntity | null;

  @Column()
  product_id: string;
}
