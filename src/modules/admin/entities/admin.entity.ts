import { AutoMap } from "@automapper/classes";
import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { DatabaseModifierEntity } from "src/common/database/mySQL/bases/database_modifier.entity";
import { AuthAdminTokenEntity } from "./auth_admin_token.entity";
import { RoleEntity } from "src/modules/role/entities/role.entity";

@Entity({ name: "admins" })
export class AdminEntity extends DatabaseModifierEntity {
  @PrimaryColumn()
  @AutoMap()
  id: string;

  @Column()
  @AutoMap()
  name: string;

  @Column()
  @AutoMap()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  @AutoMap()
  is_active: boolean;

  @Column({ default: false })
  @AutoMap()
  is_admin: boolean;

  @OneToOne(() => AuthAdminTokenEntity, (entity) => entity.user)
  authAdminToken: AuthAdminTokenEntity;

  @ManyToOne(() => RoleEntity, (role) => role.users, { nullable: true })
  @JoinColumn({ name: "role_id" }) // Liên kết với cột role_id
  role: RoleEntity | null;
}
