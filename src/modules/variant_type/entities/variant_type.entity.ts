import { Entity, Column, PrimaryColumn } from "typeorm";
import { DatabaseModifierEntity } from "~/common/database/mySQL/bases/database_modifier.entity";

@Entity("variant_types")
export class VariantTypeEntity extends DatabaseModifierEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;
}
