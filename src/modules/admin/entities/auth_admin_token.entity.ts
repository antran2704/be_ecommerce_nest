import { AutoMap } from "@automapper/classes";
import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AdminEntity } from "./admin.entity";

@Entity({ name: "auth_admin_token" })
export class AuthAdminTokenEntity {
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
  expire_otp_at: string;

  @OneToOne(() => AdminEntity, (admin) => admin.authAdminToken, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: AdminEntity;
}
