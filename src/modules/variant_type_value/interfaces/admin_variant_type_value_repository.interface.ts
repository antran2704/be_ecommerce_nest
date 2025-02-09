import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { AdminGetVariantTypeValuesRequestDto } from "../dtos/services";
import { VariantTypeValueEntity } from "../entities/variant_type_value.entity";
import {
  CreateVariantTypeValueDto,
  UpdateVariantTypeValueDto,
} from "../dtos/repositories";

export interface IAdminVariantTypeValueRepository {
  findValues(
    payload: AdminGetVariantTypeValuesRequestDto,
  ): Promise<IEntitesAndPaginationReponse<VariantTypeValueEntity>>;
  findById(id: string): Promise<VariantTypeValueEntity>;
  findByName(
    name: string,
    variant_type_id?: string,
  ): Promise<VariantTypeValueEntity>;
  create(payload: CreateVariantTypeValueDto): Promise<void>;
  update(id: string, payload: UpdateVariantTypeValueDto): Promise<void>;
  delete(id: string): Promise<void>;
}
