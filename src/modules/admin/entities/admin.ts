import { AutoMap } from "@automapper/classes";
import { DatabaseModifierEntity } from "src/common/database/mySQL/bases/database_modifier.entity";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin extends DatabaseModifierEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

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
  isActive: boolean;

  @Column({ default: false })
  @AutoMap()
  isAdmin: boolean;
}
