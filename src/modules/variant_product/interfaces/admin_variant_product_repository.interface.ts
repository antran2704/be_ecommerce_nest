import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { AdminGetVariantProductsRequestDto } from "../dtos/services";
import { VariantProductEntity } from "../entities/variant_product.entity";
import { AdminCreateVariantProductDto } from "../dtos/repositories";

export interface IAdminVariantProductRepository {
  find(
    payload: AdminGetVariantProductsRequestDto,
  ): Promise<IEntitesAndPaginationReponse<VariantProductEntity>>;
  findById(id: string): Promise<VariantProductEntity>;
  create(payload: AdminCreateVariantProductDto): Promise<void>;
  checkIsExited(
    payload: AdminCreateVariantProductDto,
  ): Promise<VariantProductEntity>;
  enable(id: string): Promise<void>;
  disable(id: string): Promise<void>;
  save(payload: VariantProductEntity): Promise<void>;
  delete(id: string): Promise<void>;
  deleteAll(productId: string): Promise<void>;
}
