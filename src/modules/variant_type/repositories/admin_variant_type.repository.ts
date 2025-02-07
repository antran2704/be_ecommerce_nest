import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { getEntitesAndPagination } from "~/common/pagination/helpers/pagination";
import { GetDatabaseDefaultID } from "~/helpers/database";

import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";
import { IAdminVariantTypeRepository } from "../interfaces/admin_variant_type_repository.interface";
import { VariantTypeEntity } from "../entities/variant_type.entity";
import { PaginationSearchRequestDto } from "~/common/pagination/dtos";
import {
  CreateVariantTypeDto,
  UpdateVariantTypeDto,
} from "../dtos/repositories";

@Injectable()
export class AdminVariantTypeRepository implements IAdminVariantTypeRepository {
  constructor(
    @InjectRepository(VariantTypeEntity)
    private readonly varianTypeEntity: Repository<VariantTypeEntity>,
  ) {}

  async findVariantTypes(
    params: PaginationSearchRequestDto,
  ): Promise<IEntitesAndPaginationReponse<VariantTypeEntity>> {
    const { data, pagination } = await getEntitesAndPagination(
      this.varianTypeEntity,
      params,
      (query, originalNameEntity) => {
        // filter with email or id
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

  async findVariantTypeById(id: string): Promise<VariantTypeEntity> {
    return await this.varianTypeEntity.findOneBy({
      id,
    });
  }

  async findVariantTypeByName(name: string): Promise<VariantTypeEntity> {
    return await this.varianTypeEntity.findOneBy({
      name,
    });
  }

  async create(payload: CreateVariantTypeDto): Promise<void> {
    const newId = GetDatabaseDefaultID(ENUM_PREFIX_DATABASE.VT);

    const entity = this.varianTypeEntity.create({
      ...payload,
      id: newId,
    });

    // save user
    await this.varianTypeEntity.save(entity);
  }

  async update(id: string, payload: UpdateVariantTypeDto): Promise<void> {
    await this.varianTypeEntity.update({ id }, payload);
  }

  async delete(id: string): Promise<void> {
    await this.varianTypeEntity.delete(id);
  }
}
