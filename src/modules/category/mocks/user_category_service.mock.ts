import { ENUM_PAGINATION_ORDER } from "~/common/pagination/enums/order.enum";
import { UserGetCategoryResponseDto } from "../dtos/services";
import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { PaginationSearchRequestDto } from "~/common/pagination/dtos";

const mockUserGetCategoriesRequest: PaginationSearchRequestDto = {
  limit: 10,
  order: ENUM_PAGINATION_ORDER.DESC,
  page: 1,
};

const mockUserGetCategoryResponse: UserGetCategoryResponseDto = {
  categoryId: "CA0502258197",
  categoryName: "Clothes",
  categoryIndex: 0,
  createdAt: "2025-02-05T16:33:17.338Z",
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
