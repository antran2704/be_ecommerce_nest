import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";
import { InventoryEntity } from "../entities/inventory.entity";

const mockInventoryEntity: Partial<InventoryEntity> = {
  id: 1,
  stock: 10,
  product_id: ENUM_PREFIX_DATABASE.PR + "123",
};

export { mockInventoryEntity };
