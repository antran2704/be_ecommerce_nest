import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { IAdminCategoryRepository } from "../interfaces/admin_category_repository.interface";
import { CategoryEntity } from "../entities/category.entity";
import { AdminGetCategoriesRequestDto } from "../dtos/services";
import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { getEntitesAndPagination } from "~/common/pagination/helpers/pagination";
import {
  AdminCreateCategoryDto,
  AdminGetChildCategoryDto,
  AdminUpdateCategoryDto,
} from "../dtos/repositories";

export class AdminCategoryRepository implements IAdminCategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryEntity: Repository<CategoryEntity>,
  ) {}

  async findCategories(
    params: AdminGetCategoriesRequestDto,
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

        // filter with status
        if (params.parentId) {
          query.andWhere(`${originalNameEntity}.parent_id = :parent_id`, {
            parent_id: params.parentId,
          });
        }

        // count children
        query.leftJoinAndSelect(`${originalNameEntity}.children`, "children");
      },
    );

    return { data, pagination };
  }

  async findCategoryById(id: string): Promise<CategoryEntity> {
    return this.categoryEntity.findOneBy({ id });
  }

  async findChildren(id: string): Promise<AdminGetChildCategoryDto[]> {
    const data: AdminGetChildCategoryDto[] = await this.categoryEntity
      .createQueryBuilder("c1")
      .leftJoin(CategoryEntity, "c2", "c1.id = c2.parent_id")
      .where("c1.parent_id = :id", { id })
      .select([
        "c1.id AS id",
        "c1.name AS name",
        "c1.parent_id AS parent_id",
        "c1.category_index AS category_index",
        "c1.created_at AS created_at",
        "COUNT(c2.id) AS children_count",
      ])
      .groupBy("c1.id")
      .getRawMany();

    return data.map((item) => ({
      ...item,
      children_count: Number(item.children_count),
    }));
  }

  async findCategoryByName(name: string): Promise<CategoryEntity> {
    return this.categoryEntity.findOneBy({ name });
  }

  async createCategory(payload: AdminCreateCategoryDto): Promise<void> {
    const newEntity = this.categoryEntity.create(payload);
    await this.categoryEntity.save(newEntity);
  }

  async updateCategory(
    id: string,
    payload: AdminUpdateCategoryDto,
  ): Promise<void> {
    await this.categoryEntity.update({ id }, payload);
  }

  async deleteCategory(id: string): Promise<void> {
    await this.categoryEntity.delete({ id });
  }
}
