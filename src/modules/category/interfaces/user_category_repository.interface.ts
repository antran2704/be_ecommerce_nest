import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { CategoryEntity } from "../entities/category.entity";
import { PaginationSearchRequestDto } from "~/common/pagination/dtos";

export interface IUserCategoryRepository {
  findCategories(
    payload: PaginationSearchRequestDto,
  ): Promise<IEntitesAndPaginationReponse<CategoryEntity>>;
  findCategoryById(id: string): Promise<CategoryEntity>;
}
