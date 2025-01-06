import { AutoMap } from "@automapper/classes";
import { Entity, Column, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Admin } from "./admin.entity";

@Entity()
export class AuthAdminToken {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: string;

  @Column({default: ""})
  @AutoMap()
  refresh_token: string;

  @Column({default: ""})
  @AutoMap()
  forgot_otp: string;

  @Column({default: ""})
  @AutoMap()
  expire_otp_at: string;

  @OneToOne(() => Admin, (admin) => admin.id)
  @JoinColumn({ name: "user_id" })
  user: Admin;

  @Column()
  user_id: string;
}
