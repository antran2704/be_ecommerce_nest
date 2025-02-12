import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { getEntitesAndPagination } from "~/common/pagination/helpers/pagination";
import { IAdminProductRepository } from "../interfaces/admin_product_repository.interface";
import { ProductEntity } from "../entities/product.entity";
import { AdminGetProductsRequestDto } from "../dtos/services";
import {
  AdminCreateProductDto,
  AdminUpdateProductDto,
} from "../dtos/repositories";

export class AdminProductRepository implements IAdminProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productEntity: Repository<ProductEntity>,
  ) {}

  async find(
    params: AdminGetProductsRequestDto,
  ): Promise<IEntitesAndPaginationReponse<ProductEntity>> {
    const { data, pagination } = await getEntitesAndPagination(
      this.productEntity,
      params,
      (query, originalNameEntity) => {
        query.leftJoinAndSelect(`${originalNameEntity}.main_category`, "ca");

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

        // filter with category
        if (params.categoryId) {
          query.andWhere(`${originalNameEntity}.main_category = :id`, {
            id: params.categoryId,
          });
        }
      },
    );

    return { data, pagination };
  }

  async findById(id: string): Promise<ProductEntity> {
    return this.productEntity.findOne({
      where: { id },
      relations: ["main_category", "sub_categories"],
    });
  }

  async create(payload: AdminCreateProductDto): Promise<void> {
    const newEntity = this.productEntity.create(payload);
    await this.productEntity.save(newEntity);
  }

  async update(id: string, payload: AdminUpdateProductDto): Promise<void> {
    await this.productEntity.update({ id }, payload);
  }

  async save(payload: ProductEntity): Promise<void> {
    await this.productEntity.save(payload);
  }

  async delete(id: string): Promise<void> {
    await this.productEntity.delete({ id });
  }
}
