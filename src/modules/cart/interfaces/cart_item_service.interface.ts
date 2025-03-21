import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import {
  CreateCartItemRequestDto,
  GetCartItemResponseDto,
  GetCartItemsRequestDto,
  UpdateCartItemRequestDto,
} from "../dtos/services";

export interface ICartItemService {
  getCartItems(
    payload: GetCartItemsRequestDto,
  ): Promise<IEntitesAndPaginationReponse<GetCartItemResponseDto>>;
  createCartItem(payload: CreateCartItemRequestDto): Promise<void>;
  updateCartItem(id: string, payload: UpdateCartItemRequestDto): Promise<void>;
  deleteCartItem(id: string): Promise<void>;
}
