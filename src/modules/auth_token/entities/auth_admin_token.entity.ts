import { AutoMap } from "@automapper/classes";
import { AdminEntity } from "src/modules/admin/entities/admin.entity";
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

  @OneToOne(() => AdminEntity, (admin) => admin.authAdminToken, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: AdminEntity;
}
