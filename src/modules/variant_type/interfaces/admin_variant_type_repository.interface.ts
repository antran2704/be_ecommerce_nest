import { PaginationSearchRequestDto } from "~/common/pagination/dtos";
import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { VariantTypeEntity } from "../entities/variant_type.entity";
import {
  CreateVariantTypeDto,
  UpdateVariantTypeDto,
} from "../dtos/repositories";

export interface IAdminVariantTypeRepository {
  findVariantTypes(
    payload: PaginationSearchRequestDto,
  ): Promise<IEntitesAndPaginationReponse<VariantTypeEntity>>;
  findVariantTypeById(id: string): Promise<VariantTypeEntity>;
  findVariantTypeByName(name: string): Promise<VariantTypeEntity>;
  create(payload: CreateVariantTypeDto): Promise<void>;
  update(id: string, payload: UpdateVariantTypeDto): Promise<void>;
  checkIsUsed(id: string): Promise<boolean>;
  delete(id: string): Promise<void>;
}
