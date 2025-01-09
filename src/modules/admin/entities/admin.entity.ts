import { AutoMap } from "@automapper/classes";
import { Entity, Column, PrimaryColumn, OneToOne } from "typeorm";

import { DatabaseModifierEntity } from "src/common/database/mySQL/bases/database_modifier.entity";
import { AuthAdminToken } from "./auth_admin_token.entity";

@Entity()
export class Admin extends DatabaseModifierEntity {
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

  @OneToOne(() => AuthAdminToken, (entity) => entity.user)
  authAdminToken: AuthAdminToken;
}
