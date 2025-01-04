import { Column } from "typeorm";
import { SOFT_DELETED_FIELD } from "../../constants/fields.constant";
import { DatabaseModifierEntity } from "./database_modifier.entity";

export class DatabaseSoftDeleteEntity extends DatabaseModifierEntity {
  @Column({ default: false })
  [SOFT_DELETED_FIELD]: boolean;
}
