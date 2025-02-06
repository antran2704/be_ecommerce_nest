import { AdminGetChildCategoryDto } from "../dtos/repositories";
import { CategoryEntity } from "../entities/category.entity";

const mockDataCategoryEntity: CategoryEntity = {
  id: "CA0502258197",
  name: "Clothes",
  category_index: 0,
  children: [],
  parent: null,
  parent_id: null,
  created_at: "2025-02-05T16:33:17.338Z",
  updated_at: "2025-02-05T16:33:17.338Z",
};

const mockDataChildCategoryEntity: AdminGetChildCategoryDto = {
  id: "CA0502258197",
  name: "Clothes",
  category_index: 0,
  parent_id: null,
  created_at: "2025-02-05T16:33:17.338Z",
  children_count: 0,
};

export { mockDataCategoryEntity, mockDataChildCategoryEntity };
