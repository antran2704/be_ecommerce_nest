import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import {
  AdminCreateCategoryRequestDto,
  AdminGetCategoriesRequestDto,
  AdminGetCategoryResponseDto,
  AdminGetChildCategoryResponseDto,
  AdminUpdateCategoryRequestDto,
} from "../dtos/services";

export interface ICategoryService {
  getCategories(
    payload: AdminGetCategoriesRequestDto,
  ): Promise<IEntitesAndPaginationReponse<AdminGetCategoryResponseDto>>;
  getChildren(id: string): Promise<AdminGetChildCategoryResponseDto[]>;
  getCategoryById(id: string): Promise<AdminGetCategoryResponseDto>;
  createCategory(payload: AdminCreateCategoryRequestDto): Promise<void>;
  updateCategory(
    id: string,
    payload: AdminUpdateCategoryRequestDto,
  ): Promise<void>;
  updateIndexChildren(id: string, indexParent: number): Promise<void>;
  deleteCategory(id: string): Promise<void>;
}
