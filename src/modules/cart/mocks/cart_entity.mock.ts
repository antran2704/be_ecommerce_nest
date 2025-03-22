import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";
import { CartEntity } from "../entities/cart.entity";
import { ENUM_CARD_STATUS } from "../enums/cart.enum";

const mockCartEntity: Partial<CartEntity> = {
  id: ENUM_PREFIX_DATABASE.CAR + "123",
  total: 0,
  status: ENUM_CARD_STATUS.ACTIVE,
};

export { mockCartEntity };
