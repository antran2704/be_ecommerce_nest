import { AutoMap } from "@automapper/classes";
import {
  Entity,
  Column,
  PrimaryColumn,
  Index,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from "typeorm";

import { DatabaseModifierEntity } from "~/common/database/mySQL/bases/database_modifier.entity";
import { CategoryEntity } from "~/modules/category/entities/category.entity";

@Entity({ name: "products" })
export class ProductEntity extends DatabaseModifierEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  @Index({ fulltext: true })
  @AutoMap()
  name: string;

  @Column()
  @AutoMap()
  description: string;

  @Column({ nullable: true, default: null })
  @AutoMap()
  thumbnail: string;

  @Column({ type: "json", default: null })
  @AutoMap()
  gallery: string[];

  @Column({ type: "decimal", default: 0 })
  base_price: number;

  @Column({ type: "decimal", default: 0 })
  promotion_price: number;

  @Column({ type: "boolean", default: true })
  is_active: boolean;

  @ManyToOne(() => CategoryEntity, (entity) => entity.main_products)
  @JoinColumn({ name: "main_category" })
  main_category: CategoryEntity;

  @ManyToMany(() => CategoryEntity, (entity) => entity.sub_products)
  @JoinTable({
    name: "product_sub_categories",
    joinColumn: { name: "product_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "category_id", referencedColumnName: "id" },
  })
  sub_categories: CategoryEntity[];
}
