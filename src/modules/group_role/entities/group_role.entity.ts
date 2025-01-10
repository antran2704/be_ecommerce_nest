import { AutoMap } from "@automapper/classes";
import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";

import { DatabaseModifierEntity } from "src/common/database/mySQL/bases/database_modifier.entity";
import { Role } from "src/modules/role/entities/role.entity";

@Entity()
export class GroupRole extends DatabaseModifierEntity {
  @PrimaryColumn()
  @AutoMap()
  id: string;

  @Column()
  @AutoMap()
  name: string;

  @OneToMany(() => Role, (role) => role.groupRole, {
    cascade: true,
  })
  roles: Role[];
}
