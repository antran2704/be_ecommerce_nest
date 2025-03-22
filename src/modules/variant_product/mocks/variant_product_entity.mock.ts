import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";
import { VariantProductEntity } from "../entities/variant_product.entity";

const mockVariantProductEntity: Partial<VariantProductEntity> = {
  id: ENUM_PREFIX_DATABASE.VPR + "123",
  name: "Product name",
  base_price: 1000,
  promotion_price: 0,
  thumbnail: "Product thumbnail",
  is_active: true,
  inventories: [],
  variant_type_values: [],
};

export { mockVariantProductEntity };
