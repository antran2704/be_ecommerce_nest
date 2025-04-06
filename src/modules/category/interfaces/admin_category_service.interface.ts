import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import {
  AdminCreateCategoryRequestDto,
  AdminGetCategoriesByIndexRequestDto,
  AdminGetCategoriesRequestDto,
  AdminGetCategoriesResponseDto,
  AdminGetCategoryResponseDto,
  AdminGetChildCategoryResponseDto,
  AdminUpdateCategoryRequestDto,
} from "../dtos/services";
import { CategoryEntity } from "../entities/category.entity";

export interface IAdminCategoryService {
  getCategories(
    payload: AdminGetCategoriesRequestDto,
  ): Promise<IEntitesAndPaginationReponse<AdminGetCategoriesResponseDto>>;
  getCategoriesByIndex(
    payload: AdminGetCategoriesByIndexRequestDto,
  ): Promise<AdminGetCategoriesResponseDto[]>;
  getChildren(id: string): Promise<AdminGetChildCategoryResponseDto[]>;
  getCategoryById(id: string): Promise<AdminGetCategoryResponseDto>;
  getCategoryEntityById(id: string): Promise<CategoryEntity>;
  createCategory(payload: AdminCreateCategoryRequestDto): Promise<void>;
  updateCategory(
    id: string,
    payload: AdminUpdateCategoryRequestDto,
  ): Promise<void>;
  updateIndexChildren(id: string, indexParent: number): Promise<void>;
  deleteCategory(id: string): Promise<void>;
}
