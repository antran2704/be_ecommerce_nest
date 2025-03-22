import { ENUM_PAGINATION_ORDER } from "~/common/pagination/enums/order.enum";
import { UserGetCategoryResponseDto } from "../dtos/services";
import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { PaginationSearchRequestDto } from "~/common/pagination/dtos";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";

const mockUserGetCategoriesRequest: PaginationSearchRequestDto = {
  limit: 10,
  order: ENUM_PAGINATION_ORDER.DESC,
  page: 1,
};

const mockUserGetCategoryResponse: UserGetCategoryResponseDto = {
  categoryId: ENUM_PREFIX_DATABASE.CA + "123",
  categoryName: "Clothes",
  categoryIndex: 0,
  createdAt: "",
};

const mockUserGetCategoriesResponse: IEntitesAndPaginationReponse<UserGetCategoryResponseDto> =
  {
    data: [mockUserGetCategoryResponse],
    pagination: {
      take: 10,
      page: 1,
      total: 10,
      totalPages: 1,
    },
  };

export {
  mockUserGetCategoriesRequest,
  mockUserGetCategoriesResponse,
  mockUserGetCategoryResponse,
};
