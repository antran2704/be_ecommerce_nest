import { AutoMap } from "@automapper/classes";
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  Index,
  JoinColumn,
} from "typeorm";
import { DatabaseModifierEntity } from "~/common/database/mySQL/bases/database_modifier.entity";

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

  @OneToMany(() => CategoryEntity, (category) => category.parent)
  children: CategoryEntity[];
}
