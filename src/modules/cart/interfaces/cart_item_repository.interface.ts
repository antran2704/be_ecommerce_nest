import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { CartItemEntity } from "../entities/cart_item.entity";
import { GetCartItemsRequestDto } from "../dtos/services";
import { CreateCartItemDto } from "../dtos/repositories";

export interface ICartItemRepository {
  find(
    payload: GetCartItemsRequestDto,
  ): Promise<IEntitesAndPaginationReponse<CartItemEntity>>;
  findById(id: string): Promise<CartItemEntity>;
  findByProductId(id: string): Promise<CartItemEntity>;
  create(payload: CreateCartItemDto): Promise<void>;
  save(payload: CartItemEntity): Promise<void>;
  delete(id: string): Promise<void>;
}
