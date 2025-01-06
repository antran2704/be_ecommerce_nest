import { AutoMap } from "@automapper/classes";
import { Entity, Column, PrimaryColumn } from "typeorm";

import { DatabaseModifierEntity } from "src/common/database/mySQL/bases/database_modifier.entity";

@Entity()
export class Admin extends DatabaseModifierEntity {
  @PrimaryColumn()
  @AutoMap()
  id: string;

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
  is_active: boolean;

  @Column({ default: false })
  @AutoMap()
  is_admin: boolean;
}
