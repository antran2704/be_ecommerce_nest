import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";

import { getEntitesAndPagination } from "~/common/pagination/helpers/pagination";

import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { IAdminVariantTypeValueRepository } from "../interfaces/admin_variant_type_value_repository.interface";
import { VariantTypeValueEntity } from "../entities/variant_type_value.entity";
import { AdminGetVariantTypeValuesRequestDto } from "../dtos/services";
import {
  CreateVariantTypeValueDto,
  UpdateVariantTypeValueDto,
} from "../dtos/repositories";

@Injectable()
export class AdminVariantTypeValueRepository
  implements IAdminVariantTypeValueRepository
{
  constructor(
    @InjectRepository(VariantTypeValueEntity)
    private readonly entity: Repository<VariantTypeValueEntity>,
  ) {}

  async findValues(
    params: AdminGetVariantTypeValuesRequestDto,
  ): Promise<IEntitesAndPaginationReponse<VariantTypeValueEntity>> {
    const { data, pagination } = await getEntitesAndPagination(
      this.entity,
      params,
      (query, originalNameEntity) => {
        // filter with variant type id
        if (params.variantTypeId) {
          query.andWhere(`${originalNameEntity}.variant_type_id = :id`, {
            id: params.variantTypeId,
          });
        }

        // filter with name or id
        if (params.search) {
          query.where(`${originalNameEntity}.id LIKE :id`, {
            id: `${params.search}%`,
          });

          query.orWhere(`${originalNameEntity}.name LIKE :name`, {
            name: `${params.search}%`,
          });
        }
      },
    );

    return { data, pagination };
  }

  async findById(id: string): Promise<VariantTypeValueEntity> {
    return await this.entity.findOneBy({
      id,
    });
  }

  async findByName(
    name: string,
    variant_type_id?: string,
  ): Promise<VariantTypeValueEntity> {
    const query: FindOptionsWhere<VariantTypeValueEntity> = { name };

    if (variant_type_id) {
      query.variant_type_id = variant_type_id;
    }

    return await this.entity.findOneBy(query);
  }

  async create(payload: CreateVariantTypeValueDto): Promise<void> {
    const entity = this.entity.create(payload);

    // save user
    await this.entity.save(entity);
  }

  async update(id: string, payload: UpdateVariantTypeValueDto): Promise<void> {
    await this.entity.update({ id }, payload);
  }

  async checkIsUsed(id: string): Promise<boolean> {
    const data = await this.entity.findOne({
      where: { id },
      relations: ["variant_product_values"],
    });

    return data.variant_product_values.length > 0;
  }

  async delete(id: string): Promise<void> {
    await this.entity.delete(id);
  }
}
