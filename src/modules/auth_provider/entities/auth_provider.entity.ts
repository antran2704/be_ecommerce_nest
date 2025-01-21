import { AutoMap } from "@automapper/classes";
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";

import { DatabaseModifierEntity } from "src/common/database/mySQL/bases/database_modifier.entity";
import { ENUM_AUTH_PROVIDER } from "../enums/provider.enum";
import { UserEntity } from "src/modules/user/entities/user.entity";

@Entity({ name: "auth_providers" })
export class AuthProviderEntity extends DatabaseModifierEntity {
  @PrimaryColumn()
  @AutoMap()
  id: string;

  @Column({ type: "enum", enum: ENUM_AUTH_PROVIDER })
  @AutoMap()
  provider: string;

  @Column({ nullable: true })
  providerId: string;

  @ManyToOne(() => UserEntity, (entity) => entity.authProviders, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: UserEntity;
}
