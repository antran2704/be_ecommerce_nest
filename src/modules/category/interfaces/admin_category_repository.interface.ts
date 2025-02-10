import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import {
  AdminCreateCategoryDto,
  AdminGetChildCategoryDto,
  AdminUpdateCategoryDto,
} from "../dtos/repositories";
import { AdminGetCategoriesRequestDto } from "../dtos/services";
import { CategoryEntity } from "../entities/category.entity";

export interface IAdminCategoryRepository {
  findCategories(
    payload: AdminGetCategoriesRequestDto,
  ): Promise<IEntitesAndPaginationReponse<CategoryEntity>>;
  findCategoryById(id: string): Promise<CategoryEntity>;
  findCategoryByName(name: string): Promise<CategoryEntity>;
  findChildren(id: string): Promise<AdminGetChildCategoryDto[]>;
  createCategory(payload: AdminCreateCategoryDto): Promise<void>;
  updateCategory(id: string, payload: AdminUpdateCategoryDto): Promise<void>;
  deleteCategory(id: string): Promise<void>;
}
