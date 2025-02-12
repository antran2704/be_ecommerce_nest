import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";
import { ProductEntity } from "../entities/product.entity";
import { mockCategoryEntity } from "~/modules/category/mocks/category_entity.mock";
import { CategoryEntity } from "~/modules/category/entities/category.entity";

const mockProductEntity: Partial<ProductEntity> = {
  id: ENUM_PREFIX_DATABASE.PR + "123",
  name: "Product mock",
  description: "Product mock description",
  base_price: 1000,
  promotion_price: 100,
  thumbnail: "image1.jpg",
  gallery: ["image1.jpg", "image2.jpg"],
  is_active: true,
  main_category: mockCategoryEntity as CategoryEntity,
  sub_categories: [],
};

export { mockProductEntity };
