import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { GetCartsRequestDto } from "../dtos/services";
import { CartEntity } from "../entities/cart.entity";
import { CreateCartDto } from "../dtos/repositories";

export interface ICartRepository {
  find(
    payload: GetCartsRequestDto,
  ): Promise<IEntitesAndPaginationReponse<CartEntity>>;
  findByUserId(id: string): Promise<CartEntity>;
  findById(id: string): Promise<CartEntity>;
  create(payload: CreateCartDto): Promise<void>;
  save(payload: CartEntity): Promise<void>;
  delete(id: string): Promise<void>;
}
