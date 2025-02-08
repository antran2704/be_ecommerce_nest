import { VariantTypeEntity } from "../entities/variant_type.entity";
import {
  CREATED_AT_FIELD,
  UPDATED_AT_FIELD,
} from "~/common/database/constants/fields.constant";

const mockVariantTypeEntity: VariantTypeEntity = {
  id: "VT123",
  name: "Colors",
  [CREATED_AT_FIELD]: "2025-02-05T16:33:17.338Z",
  [UPDATED_AT_FIELD]: "2025-02-05T16:33:17.338Z",
};

export { mockVariantTypeEntity };
