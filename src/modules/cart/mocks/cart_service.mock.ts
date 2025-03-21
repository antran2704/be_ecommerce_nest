import { ENUM_PAGINATION_ORDER } from "~/common/pagination/enums/order.enum";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";
import {
  CreateCartRequestDto,
  GetCartResponseDto,
  GetCartsRequestDto,
} from "../dtos/services";
import { mockUserEntity } from "~/modules/user/mocks/user_entity.mock";
import { UserEntity } from "~/modules/user/entities/user.entity";
import { ENUM_CARD_STATUS } from "../enums/cart.enum";
import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";

const mockCreateCartRequest: CreateCartRequestDto = {
  user: mockUserEntity as UserEntity,
  status: ENUM_CARD_STATUS.ACTIVE,
};

const mockGetCartsRequest: GetCartsRequestDto = {
  limit: 10,
  order: ENUM_PAGINATION_ORDER.DESC,
  page: 1,
};

const mockGetCartResponse: Partial<GetCartResponseDto> = {
  cartId: ENUM_PREFIX_DATABASE.CAR + "123",
  cartStatus: ENUM_CARD_STATUS.ACTIVE,
  cartTotal: 0,
};

const mockGetCartsResponse: IEntitesAndPaginationReponse<
  Partial<GetCartResponseDto>
> = {
  data: [mockGetCartResponse],
  pagination: {
    take: 10,
    page: 1,
    total: 10,
    totalPages: 1,
  },
};

export {
  mockCreateCartRequest,
  mockGetCartsRequest,
  mockGetCartResponse,
  mockGetCartsResponse,
};
