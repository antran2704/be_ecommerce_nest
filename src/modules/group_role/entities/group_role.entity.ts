import { AutoMap } from "@automapper/classes";
import { Entity, Column, PrimaryColumn } from "typeorm";

import { DatabaseModifierEntity } from "src/common/database/mySQL/bases/database_modifier.entity";

@Entity()
export class GroupRole extends DatabaseModifierEntity {
  @PrimaryColumn()
  @AutoMap()
  id: string;

  @Column()
  @AutoMap()
  name: string;
}
