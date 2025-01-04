import { DatabaseModifierEntity } from "src/common/database/mySQL/bases/database_modifier.entity";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin extends DatabaseModifierEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isAdmin: boolean;
}
