import { AutoMap } from "@automapper/classes";
import { AdminEntity } from "~/modules/admin/entities/admin.entity";
import { UserEntity } from "~/modules/user/entities/user.entity";
import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "auth_tokens" })
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

  @Column({ default: "" })
  @AutoMap()
  signup_otp: string;

  @Column({ default: "" })
  @AutoMap()
  signup_otp_expire_at: string;

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
