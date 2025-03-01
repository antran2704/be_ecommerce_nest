import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { getEntitesAndPagination } from "~/common/pagination/helpers/pagination";
import { IAdminVariantProductRepository } from "../interfaces/admin_variant_product_repository.interface";
import { VariantProductEntity } from "../entities/variant_product.entity";
import { AdminGetVariantProductsRequestDto } from "../dtos/services";
import { ENUM_VARIANT_PRODUCT_STATUS } from "../enums/variant_product.enum";
import { AdminCreateVariantProductDto } from "../dtos/repositories";

export class AdminVariantProductRepository
  implements IAdminVariantProductRepository
{
  constructor(
    @InjectRepository(VariantProductEntity)
    private readonly entity: Repository<VariantProductEntity>,
  ) {}

  async find(
    params: AdminGetVariantProductsRequestDto,
  ): Promise<IEntitesAndPaginationReponse<VariantProductEntity>> {
    const { data, pagination } = await getEntitesAndPagination(
      this.entity,
      params,
      (query, originalNameEntity) => {
        query.where(`${originalNameEntity}.product = :id`, {
          id: params.productId,
        });

        // query.leftJoinAndSelect(`${originalNameEntity}.main_category`, "ca");

        query.leftJoinAndSelect(`${originalNameEntity}.inventories`, "IV");

        // filter with name or id
        if (params.search) {
          query
            .where(`${originalNameEntity}.id LIKE :id`, {
              id: `${params.search}%`,
            })
            .orWhere(`${originalNameEntity}.name LIKE :name`, {
              name: `${params.search}%`,
            });
        }

        // filter with status
        if (params.status) {
          query.andWhere(`${originalNameEntity}.is_active = :status`, {
            status:
              params.status === ENUM_VARIANT_PRODUCT_STATUS.ACTIVE
                ? true
                : false,
          });
        }
      },
    );

    return { data, pagination };
  }

  async findById(id: string): Promise<VariantProductEntity> {
    return this.entity.findOne({
      where: { id },
      relations: ["variant_type_values", "inventories"],
    });
  }

  async create(payload: AdminCreateVariantProductDto): Promise<void> {
    const newEntity = this.entity.create(payload);
    await this.entity.save(newEntity);
  }

  async enable(id: string): Promise<void> {
    await this.entity.update({ id }, { is_active: true });
  }

  async disable(id: string): Promise<void> {
    await this.entity.update({ id }, { is_active: false });
  }

  async save(payload: VariantProductEntity): Promise<void> {
    await this.entity.save(payload);
  }

  async delete(id: string): Promise<void> {
    await this.entity.delete({ id });
  }
}
