import { AutoMap } from "@automapper/classes";
import { AdminEntity } from "src/modules/admin/entities/admin.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";
import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "auth_token" })
export class AuthTokenEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: string;

  @Column({ default: "" })
  @AutoMap()
  refresh_token: string;

  @Column({ default: "" })
  @AutoMap()
  forgot_otp: string;

  @Column({ default: "" })
  @AutoMap()
  forgot_otp_expire_at: string;

  // Relations with AdminEntity
  @OneToOne(() => AdminEntity, (entity) => entity.authToken, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "admin_id" })
  admin: AdminEntity;

  // Relations with UserEntity
  @OneToOne(() => UserEntity, (entity) => entity.authToken, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: UserEntity;
}
