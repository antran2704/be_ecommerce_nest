import { AutoMap } from "@automapper/classes";
import { Entity, Column, PrimaryColumn, OneToOne, OneToMany } from "typeorm";

import { DatabaseModifierEntity } from "src/common/database/mySQL/bases/database_modifier.entity";
import { AuthTokenEntity } from "src/modules/auth_token/entities/auth_token.entity";
import { AuthProviderEntity } from "src/modules/auth_provider/entities/auth_provider.entity";

@Entity({ name: "users" })
export class UserEntity extends DatabaseModifierEntity {
  @PrimaryColumn()
  @AutoMap()
  id: string;

  @Column()
  @AutoMap()
  name: string;

  @Column()
  @AutoMap()
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: true })
  @AutoMap()
  is_active: boolean;

  @OneToOne(() => AuthTokenEntity, (entity) => entity.admin)
  authToken: AuthTokenEntity;

  @OneToMany(() => AuthProviderEntity, (entity) => entity.user)
  authProviders: AuthProviderEntity[];
}
