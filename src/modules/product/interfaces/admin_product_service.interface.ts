import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import {
  AdminCreateProductRequestDto,
  AdminGetProductDetailResponseDto,
  AdminGetProductListResponseDto,
  AdminGetProductsRequestDto,
  AdminUpdateProductRequestDto,
} from "../dtos/services";

export interface IAdminProductService {
  getProducts(
    payload: AdminGetProductsRequestDto,
  ): Promise<IEntitesAndPaginationReponse<AdminGetProductListResponseDto>>;
  getProductById(id: string): Promise<AdminGetProductDetailResponseDto>;
  createProduct(payload: AdminCreateProductRequestDto): Promise<void>;
  updateProduct(
    id: string,
    payload: AdminUpdateProductRequestDto,
  ): Promise<void>;
  deleteProduct(id: string): Promise<void>;
}
