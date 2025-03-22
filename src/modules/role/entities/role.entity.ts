import { AutoMap } from "@automapper/classes";
import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";

import { DatabaseModifierEntity } from "~/common/database/mySQL/bases/database_modifier.entity";
import { GroupRoleEntity } from "~/modules/group_role/entities/group_role.entity";
import { AdminEntity } from "~/modules/admin/entities/admin.entity";

@Entity({ name: "roles" })
export class RoleEntity extends DatabaseModifierEntity {
  @PrimaryColumn()
  @AutoMap()
  id: string;

  @Column()
  @AutoMap()
  name: string;

  @Column({ type: "json" })
  @AutoMap()
  permissions: string[];

  @ManyToOne(() => GroupRoleEntity, (entity) => entity.roles, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "group_role_id" })
  groupRole: GroupRoleEntity;

  @OneToMany(() => AdminEntity, (entity) => entity.role)
  users: AdminEntity[];
}
