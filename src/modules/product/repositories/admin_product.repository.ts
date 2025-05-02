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
import { ENUM_PRODUCT_STATUS } from "../enums/product.enum";

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

        query.leftJoinAndSelect(`${originalNameEntity}.inventories`, "IV");

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
        if (params.status) {
          query.andWhere(`${originalNameEntity}.is_active = :status`, {
            status: params.status === ENUM_PRODUCT_STATUS.ACTIVE ? true : false,
          });
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
    const ORIGINAL_NAME_ENTITY = "product";
    const queryBuilder =
      this.productEntity.createQueryBuilder(ORIGINAL_NAME_ENTITY);

    queryBuilder
      .leftJoin(`${ORIGINAL_NAME_ENTITY}.main_category`, "mc")
      .addSelect(["mc.id", "mc.name"]);
    queryBuilder
      .leftJoin(`${ORIGINAL_NAME_ENTITY}.sub_categories`, "sc")
      .addSelect(["sc.id", "sc.name"]);
    queryBuilder
      .leftJoin(`${ORIGINAL_NAME_ENTITY}.inventories`, "iv")
      .addSelect(["iv.id", "iv.stock"]);
    queryBuilder
      .leftJoin(`${ORIGINAL_NAME_ENTITY}.variant_products`, "vp")
      .addSelect(["vp.id", "vp.name"]);
    queryBuilder
      .leftJoin("vp.variant_type_values", "vtv")
      .addSelect(["vtv.id", "vtv.name"]);
    queryBuilder
      .leftJoin("vtv.variant_type", "vt")
      .addSelect(["vt.id", "vt.name"]);
    queryBuilder.where(`${ORIGINAL_NAME_ENTITY}.id = :id`, { id });

    return queryBuilder.getOne();
  }

  async create(payload: AdminCreateProductDto): Promise<void> {
    const newEntity = this.productEntity.create(payload);
    await this.productEntity.save(newEntity);
  }

  async update(id: string, payload: AdminUpdateProductDto): Promise<void> {
    await this.productEntity.update({ id }, payload);
  }

  async enable(id: string): Promise<void> {
    await this.productEntity.update({ id }, { is_active: true });
  }

  async disable(id: string): Promise<void> {
    await this.productEntity.update({ id }, { is_active: false });
  }

  async save(payload: ProductEntity): Promise<void> {
    await this.productEntity.save(payload);
  }

  async delete(id: string): Promise<void> {
    await this.productEntity.delete({ id });
  }
}
