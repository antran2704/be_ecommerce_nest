import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { AdminGetProductsRequestDto } from "../dtos/services";
import { ProductEntity } from "../entities/product.entity";
import {
  AdminCreateProductDto,
  AdminUpdateProductDto,
} from "../dtos/repositories";

export interface IAdminProductRepository {
  find(
    payload: AdminGetProductsRequestDto,
  ): Promise<IEntitesAndPaginationReponse<ProductEntity>>;
  findById(id: string): Promise<ProductEntity>;
  create(payload: AdminCreateProductDto): Promise<void>;
  update(id: string, payload: AdminUpdateProductDto): Promise<void>;
  save(payload: ProductEntity): Promise<void>;
  delete(id: string): Promise<void>;
}
