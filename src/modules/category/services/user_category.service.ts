import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";

import { UserGetCategoryResponseDto } from "../dtos/services";
import { CategoryEntity } from "../entities/category.entity";
import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { IUserCategoryService } from "../interfaces/user_category_service.interface";
import { UserCategoryRepository } from "../repositories/user_category.repository";
import { PaginationSearchRequestDto } from "~/common/pagination/dtos";

export class UserCategoryService implements IUserCategoryService {
  constructor(
    private readonly categoryRepository: UserCategoryRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async getCategories(
    payload: PaginationSearchRequestDto,
  ): Promise<IEntitesAndPaginationReponse<UserGetCategoryResponseDto>> {
    const { data, pagination } =
      await this.categoryRepository.findCategories(payload);
    const formatData = this.mapper.mapArray(
      data,
      CategoryEntity,
      UserGetCategoryResponseDto,
    );

    return { data: formatData, pagination };
  }

  async getCategoriesByParentId(
    id: string,
    data: CategoryEntity[],
  ): Promise<CategoryEntity[]> {
    const category = await this.categoryRepository.findCategoryById(id);

    if (category) {
      data.unshift(category);
    }

    if (category.parent_id) {
      return this.getCategoriesByParentId(category.parent_id, data);
    }

    return data;
  }

  async getParentCategories(id: string): Promise<UserGetCategoryResponseDto[]> {
    const categories = await this.getCategoriesByParentId(id, []);
    const formatData = this.mapper.mapArray(
      categories,
      CategoryEntity,
      UserGetCategoryResponseDto,
    );

    return formatData;
  }
}
