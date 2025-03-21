import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import {
  CreateCartItemRequestDto,
  GetCartItemResponseDto,
  GetCartItemsRequestDto,
  UpdateCartItemQuantityRequestDto,
} from "../dtos/services";

export interface ICartItemService {
  getCartItems(
    payload: GetCartItemsRequestDto,
  ): Promise<IEntitesAndPaginationReponse<GetCartItemResponseDto>>;
  createCartItem(payload: CreateCartItemRequestDto): Promise<void>;
  updateCartItemQuantity(
    id: string,
    payload: UpdateCartItemQuantityRequestDto,
  ): Promise<void>;
  deleteCartItem(id: string): Promise<void>;
}
