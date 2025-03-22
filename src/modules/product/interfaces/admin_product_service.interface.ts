import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import {
  AdminCreateProductRequestDto,
  AdminGetProductDetailResponseDto,
  AdminGetProductListResponseDto,
  AdminGetProductsRequestDto,
  AdminUpdateProductRequestDto,
} from "../dtos/services";
import { ProductEntity } from "../entities/product.entity";

export interface IAdminProductService {
  getProducts(
    payload: AdminGetProductsRequestDto,
  ): Promise<IEntitesAndPaginationReponse<AdminGetProductListResponseDto>>;
  getProductById(id: string): Promise<AdminGetProductDetailResponseDto>;
  getProductEntityById(id: string): Promise<ProductEntity>;
  createProduct(payload: AdminCreateProductRequestDto): Promise<void>;
  updateProduct(
    id: string,
    payload: AdminUpdateProductRequestDto,
  ): Promise<void>;
  enableProduct(id: string): Promise<void>;
  disableProduct(id: string): Promise<void>;
  deleteProduct(id: string): Promise<void>;
}
