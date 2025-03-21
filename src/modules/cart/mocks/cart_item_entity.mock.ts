import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";
import { CartItemEntity } from "../entities/cart_item.entity";
import { mockCartEntity } from "./cart_entity.mock";
import { CartEntity } from "../entities/cart.entity";
import { mockProductEntity } from "~/modules/product/mocks/product_entity.mock";
import { ProductEntity } from "~/modules/product/entities/product.entity";
import { mockVariantProductEntity } from "~/modules/variant_product/mocks/variant_product_entity.mock";
import { VariantProductEntity } from "~/modules/variant_product/entities/variant_product.entity";

const mockCartItemEntity: Partial<CartItemEntity> = {
  id: ENUM_PREFIX_DATABASE.CARI + "123",
  cart: mockCartEntity as CartEntity,
  quantity: 1,
  product: mockProductEntity as ProductEntity,
  variant_product: mockVariantProductEntity as VariantProductEntity,
};

export { mockCartItemEntity };
