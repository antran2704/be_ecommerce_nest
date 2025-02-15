import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";
import { AdminGetChildCategoryDto } from "../dtos/repositories";
import { CategoryEntity } from "../entities/category.entity";

const mockCategoryEntity: Partial<CategoryEntity> = {
  id: ENUM_PREFIX_DATABASE.CA + "123",
  name: "Clothes",
  category_index: 0,
  children: [],
  parent: null,
  parent_id: null,
  created_at: "",
};

const mockChildCategoryEntity: Partial<AdminGetChildCategoryDto> = {
  id: ENUM_PREFIX_DATABASE.CA + "123",
  name: "Clothes",
  category_index: 0,
  parent_id: null,
  children_count: 0,
  created_at: "",
};

export { mockCategoryEntity, mockChildCategoryEntity };
