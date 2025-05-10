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

        // left join inventory
        query.leftJoinAndSelect(`${originalNameEntity}.inventories`, "IV");

        // left join variant type value
        query.leftJoinAndSelect(
          `${originalNameEntity}.variant_type_values`,
          "vtv",
        );

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

  async checkIsExited(
    payload: AdminCreateVariantProductDto,
  ): Promise<VariantProductEntity> {
    const { product, variant_type_values } = payload;

    const inputIds = variant_type_values.map((item) => item.id);

    const qb = this.entity
      .createQueryBuilder("vp")
      .innerJoin("vp.variant_type_values", "vtv")
      .innerJoin("vtv.variant_product_values", "vpv")
      .where("vp.product = :productId", { productId: product.id })
      .andWhere("vp.id = vpv.id")
      .andWhere("vtv.id IN (:...inputIds)", { inputIds })
      .groupBy("vp.id")
      .having("COUNT(DISTINCT vtv.id) = :count", { count: inputIds.length });

    const result = await qb.getOne();

    return result;
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

  async deleteAll(productId: string): Promise<void> {
    await this.entity.delete({ product: { id: productId } });
  }
}
