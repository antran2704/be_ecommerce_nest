import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CategoryEntity } from "../entities/category.entity";
import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { getEntitesAndPagination } from "~/common/pagination/helpers/pagination";
import { IUserCategoryRepository } from "../interfaces/user_category_repository.interface";
import { PaginationSearchRequestDto } from "~/common/pagination/dtos";

export class UserCategoryRepository implements IUserCategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryEntity: Repository<CategoryEntity>,
  ) {}

  async findCategories(
    params: PaginationSearchRequestDto,
  ): Promise<IEntitesAndPaginationReponse<CategoryEntity>> {
    const { data, pagination } = await getEntitesAndPagination(
      this.categoryEntity,
      params,
      (query, originalNameEntity) => {
        // filter with name or id
        if (params.search) {
          query.where(`${originalNameEntity}.id LIKE :id`, {
            id: `${params.search}%`,
          });

          query.orWhere(
            `MATCH(${originalNameEntity}.name) AGAINST(:name IN BOOLEAN MODE)`,
            {
              name: `${params.search}*`,
            },
          );
        }
      },
    );

    return { data, pagination };
  }

  async findCategoryById(id: string): Promise<CategoryEntity> {
    return this.categoryEntity.findOneBy({ id });
  }
}
