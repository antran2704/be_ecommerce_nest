import { VariantTypeValueEntity } from "../entities/variant_type_value.entity";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";

const mockVariantTypeValueEntity: Partial<VariantTypeValueEntity> = {
  id: ENUM_PREFIX_DATABASE.VTE + "123",
  name: "Blue",
  variant_type_id: ENUM_PREFIX_DATABASE.VT + "123",
};

export { mockVariantTypeValueEntity };
