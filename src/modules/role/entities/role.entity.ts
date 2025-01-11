import { AutoMap } from "@automapper/classes";
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";

import { DatabaseModifierEntity } from "src/common/database/mySQL/bases/database_modifier.entity";
import { GroupRoleEntity } from "src/modules/group_role/entities/group_role.entity";

@Entity({ name: "roles" })
export class RoleEntity extends DatabaseModifierEntity {
  @PrimaryColumn()
  @AutoMap()
  id: string;

  @Column()
  @AutoMap()
  name: string;

  @ManyToOne(() => GroupRoleEntity, (entity) => entity.roles, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "group_role_id" })
  groupRole: GroupRoleEntity;
}
