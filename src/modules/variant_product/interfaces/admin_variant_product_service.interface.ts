import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import {
  AdminCreateVariantProductRequestDto,
  AdminGetVariantProductDetailResponseDto,
  AdminGetVariantProductListResponseDto,
  AdminGetVariantProductsRequestDto,
  AdminUpdateVariantProductRequestDto,
} from "../dtos/services";
import { VariantProductEntity } from "../entities/variant_product.entity";

export interface IAdminVariantProductService {
  getVariantProducts(
    payload: AdminGetVariantProductsRequestDto,
  ): Promise<
    IEntitesAndPaginationReponse<AdminGetVariantProductListResponseDto>
  >;
  getVariantProductById(
    id: string,
  ): Promise<AdminGetVariantProductDetailResponseDto>;
  getVariantProductEntityById(id: string): Promise<VariantProductEntity>;
  createVariantProduct(
    payload: AdminCreateVariantProductRequestDto,
  ): Promise<void>;
  updateVariantProduct(
    id: string,
    payload: AdminUpdateVariantProductRequestDto,
  ): Promise<void>;
  enableVariantProduct(id: string): Promise<void>;
  disableVariantProduct(id: string): Promise<void>;
  deleteVariantProduct(id: string): Promise<void>;
}
