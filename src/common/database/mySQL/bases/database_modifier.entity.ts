import { CreateDateColumn, UpdateDateColumn } from "typeorm";
import {
  CREATED_AT_FIELD,
  UPDATED_AT_FIELD,
} from "../../constants/fields.constant";

export class DatabaseModifierEntity {
  @CreateDateColumn({ type: "timestamp" })
  [CREATED_AT_FIELD]: string;

  @UpdateDateColumn({ type: "timestamp" })
  [UPDATED_AT_FIELD]: string;
}
