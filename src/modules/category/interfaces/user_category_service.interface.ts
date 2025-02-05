import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { AdminGetCategoryResponseDto } from "../dtos/services";
import { PaginationSearchRequestDto } from "~/common/pagination/dtos";
import { CategoryEntity } from "../entities/category.entity";

export interface IUserCategoryService {
  getCategories(
    payload: PaginationSearchRequestDto,
  ): Promise<IEntitesAndPaginationReponse<AdminGetCategoryResponseDto>>;

  getCategoriesByParentId(
    id: string,
    data: CategoryEntity[],
  ): Promise<CategoryEntity[]>;
  getParentCategories(id: string): Promise<AdminGetCategoryResponseDto[]>;
}
