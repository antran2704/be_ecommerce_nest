import { AutoMap } from "@automapper/classes";
import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { DatabaseModifierEntity } from "~/common/database/mySQL/bases/database_modifier.entity";
import { RoleEntity } from "~/modules/role/entities/role.entity";
import { AuthTokenEntity } from "~/modules/auth_token/entities/auth_token.entity";

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

  @Column({ default: null, nullable: true })
  @AutoMap()
  avatar: string;

  @Column({ default: true })
  @AutoMap()
  is_active: boolean;

  @Column({ default: false })
  @AutoMap()
  is_admin: boolean;

  @OneToOne(() => AuthTokenEntity, (entity) => entity.admin)
  authToken: AuthTokenEntity;

  @ManyToOne(() => RoleEntity, (role) => role.users, { nullable: true })
  @JoinColumn({ name: "role" })
  role: RoleEntity | null;
}
