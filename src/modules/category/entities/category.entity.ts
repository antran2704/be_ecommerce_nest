import { AutoMap } from "@automapper/classes";
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  Index,
  JoinColumn,
  ManyToMany,
} from "typeorm";
import { DatabaseModifierEntity } from "~/common/database/mySQL/bases/database_modifier.entity";
import { ProductEntity } from "~/modules/product/entities/product.entity";

@Entity("categories")
export class CategoryEntity extends DatabaseModifierEntity {
  @PrimaryColumn()
  @AutoMap()
  id: string;

  @Column({ type: "varchar", length: 255 })
  @Index({ fulltext: true })
  @AutoMap()
  name: string;

  @Column({ type: "integer", default: 0 })
  @AutoMap()
  category_index: number;

  @ManyToOne(() => CategoryEntity, (category) => category.children, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "parent_id" })
  parent: CategoryEntity;

  @Column({ nullable: true, default: null })
  parent_id: string | null;

  @OneToMany(() => CategoryEntity, (entity) => entity.parent)
  children: CategoryEntity[];

  @OneToMany(() => ProductEntity, (entity) => entity.main_category)
  main_products: ProductEntity[];

  @ManyToMany(() => ProductEntity, (entity) => entity.sub_categories)
  sub_products: ProductEntity[];
}
