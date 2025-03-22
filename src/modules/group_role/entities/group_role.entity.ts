import { AutoMap } from "@automapper/classes";
import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";

import { DatabaseModifierEntity } from "~/common/database/mySQL/bases/database_modifier.entity";
import { RoleEntity } from "~/modules/role/entities/role.entity";

@Entity({ name: "group_roles" })
export class GroupRoleEntity extends DatabaseModifierEntity {
  @PrimaryColumn()
  @AutoMap()
  id: string;

  @Column()
  @AutoMap()
  name: string;

  @OneToMany(() => RoleEntity, (role) => role.groupRole, {
    cascade: true,
  })
  roles: RoleEntity[];
}
