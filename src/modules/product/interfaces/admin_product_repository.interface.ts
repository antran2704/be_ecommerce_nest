import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { AdminGetProductRequestDto } from "../dtos/services";
import { ProductEntity } from "../entities/product.entity";
import {
  AdminCreateProductDto,
  AdminUpdateProductDto,
} from "../dtos/repositories";

export interface IAdminProductRepository {
  findProducts(
    payload: AdminGetProductRequestDto,
  ): Promise<IEntitesAndPaginationReponse<ProductEntity>>;
  findById(id: string): Promise<ProductEntity>;
  create(payload: AdminCreateProductDto): Promise<void>;
  updateCategory(id: string, payload: AdminUpdateProductDto): Promise<void>;
  deleteCategory(id: string): Promise<void>;
}
