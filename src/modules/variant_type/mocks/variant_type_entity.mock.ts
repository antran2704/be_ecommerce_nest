import { GetDatabaseDefaultID } from "~/helpers/database";
import { VariantTypeEntity } from "../entities/variant_type.entity";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";
import {
  CREATED_AT_FIELD,
  UPDATED_AT_FIELD,
} from "~/common/database/constants/fields.constant";

const mockVariantTypeEntity: VariantTypeEntity = {
  id: GetDatabaseDefaultID(ENUM_PREFIX_DATABASE.VT) + "123",
  name: "Colors",
  [CREATED_AT_FIELD]: "2025-02-05T16:33:17.338Z",
  [UPDATED_AT_FIELD]: "2025-02-05T16:33:17.338Z",
};

export { mockVariantTypeEntity };
