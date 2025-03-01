import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from "typeorm";
import { DatabaseModifierEntity } from "~/common/database/mySQL/bases/database_modifier.entity";
import { VariantProductEntity } from "~/modules/variant_product/entities/variant_product.entity";
import { VariantTypeEntity } from "~/modules/variant_type/entities/variant_type.entity";

@Entity("variant_type_values")
export class VariantTypeValueEntity extends DatabaseModifierEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @ManyToOne(() => VariantTypeEntity, (entity) => entity.values, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "variant_type_id" })
  variant_type: VariantTypeEntity;

  @Column()
  variant_type_id: string;

  @ManyToMany(
    () => VariantProductEntity,
    (entity) => entity.variant_type_values,
  )
  variant_product_values: VariantProductEntity[];
}
