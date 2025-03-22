import { ENUM_PAGINATION_ORDER } from "~/common/pagination/enums/order.enum";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";
import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import {
  CreateCartItemRequestDto,
  GetCartItemResponseDto,
  GetCartItemsRequestDto,
} from "../dtos/services";

const mockCreateCartItemRequest: CreateCartItemRequestDto = {
  cartId: ENUM_PREFIX_DATABASE.CAR + "123",
  productId: ENUM_PREFIX_DATABASE.PR + "123",
  variantProductId: ENUM_PREFIX_DATABASE.VPR + "123",
  quantity: 1,
};

const mockGetCartItemsRequest: GetCartItemsRequestDto = {
  limit: 10,
  order: ENUM_PAGINATION_ORDER.DESC,
  page: 1,
  cardId: ENUM_PREFIX_DATABASE.CAR + "123",
};

const mockGetCartItemResponse: Partial<GetCartItemResponseDto> = {
  cartItemId: ENUM_PREFIX_DATABASE.CARI + "123",
  inventory: 0,
  price: 1000,
  quantity: 1,
  promotionPrice: 0,
  thumbnail: "Product thumbnail",
  product: {
    name: "Product name",
    productId: ENUM_PREFIX_DATABASE.PR + "123",
  },
  variantProduct: {
    name: "Product name",
    variantProductId: ENUM_PREFIX_DATABASE.VPR + "123",
    options: [],
  },
};

const mockGetCartItemsResponse: IEntitesAndPaginationReponse<
  Partial<GetCartItemResponseDto>
> = {
  data: [mockGetCartItemResponse],
  pagination: {
    take: 10,
    page: 1,
    total: 10,
    totalPages: 1,
  },
};

export {
  mockCreateCartItemRequest,
  mockGetCartItemsRequest,
  mockGetCartItemsResponse,
  mockGetCartItemResponse,
};
