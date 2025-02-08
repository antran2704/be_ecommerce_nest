import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { DatabaseModifierEntity } from "~/common/database/mySQL/bases/database_modifier.entity";
import { VariantTypeValueEntity } from "~/modules/variant_type_value/entities/variant_type.entity";

@Entity("variant_types")
export class VariantTypeEntity extends DatabaseModifierEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @OneToMany(() => VariantTypeValueEntity, (entity) => entity.variant_type, {
    cascade: true,
  })
  values: VariantTypeValueEntity[];
}
