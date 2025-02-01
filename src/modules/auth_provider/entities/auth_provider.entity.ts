import { AutoMap } from "@automapper/classes";
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

import { DatabaseModifierEntity } from "~/common/database/mySQL/bases/database_modifier.entity";
import { ENUM_AUTH_PROVIDER } from "../enums/provider.enum";
import { UserEntity } from "~/modules/user/entities/user.entity";

@Entity({ name: "auth_providers" })
export class AuthProviderEntity extends DatabaseModifierEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: string;

  @Column({ type: "enum", enum: ENUM_AUTH_PROVIDER })
  @AutoMap()
  provider: string;

  @Column({ nullable: true, default: "" })
  provider_id: string;

  @ManyToOne(() => UserEntity, (entity) => entity.authProviders, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @Column()
  user_id: string;
}
