import { Column } from "typeorm";
import {
  CREATED_AT_FIELD,
  UPDATED_AT_FIELD,
} from "../../constants/fields.constant";

export class DatabaseModifierEntity {
  @Column({ default: new Date().toISOString() })
  [CREATED_AT_FIELD]: string;

  @Column({ default: new Date().toISOString() })
  [UPDATED_AT_FIELD]: string;
}
