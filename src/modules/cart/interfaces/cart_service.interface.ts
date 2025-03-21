import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { GetCartResponseDto, GetCartsRequestDto } from "../dtos/services";
import CreateCartRequestDto from "../dtos/services/create_cart_request.dto";
import { CartEntity } from "../entities/cart.entity";

export interface ICartService {
  getCarts(
    payload: GetCartsRequestDto,
  ): Promise<IEntitesAndPaginationReponse<GetCartResponseDto>>;
  getCartByUserId(id: string): Promise<GetCartResponseDto>;
  getCartEntity(id: string): Promise<CartEntity>;
  createCart(payload: CreateCartRequestDto): Promise<void>;
  enableCart(id: string): Promise<void>;
  disableCart(id: string): Promise<void>;
  enableCartByUserId(id: string): Promise<void>;
  disableCartByUserId(id: string): Promise<void>;
  deleteCart(id: string): Promise<void>;
}
