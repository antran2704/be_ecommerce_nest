import { ENUM_PAGINATION_ORDER } from "~/common/pagination/enums/order.enum";
import {
  AdminCreateCategoryRequestDto,
  AdminGetCategoriesRequestDto,
  AdminGetCategoryRequestDto,
  AdminGetCategoryResponseDto,
} from "../dtos/services";
import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";

const mockAdminCreateCategoryRequest: AdminCreateCategoryRequestDto = {
  categoryName: "Category Test",
  categoryParentId: null,
};

const mockAdminGetCategoriesRequest: AdminGetCategoriesRequestDto = {
  limit: 10,
  order: ENUM_PAGINATION_ORDER.DESC,
  page: 1,
};

const mockAdminGetCategoryRequest: AdminGetCategoryRequestDto = {
  categoryId: "CA0502258197",
};

const mockAdminGetCategoryResponse: AdminGetCategoryResponseDto = {
  categoryId: "CA0502258197",
  categoryName: "Clothes",
  categoryIndex: 0,
  createdAt: "2025-02-05T16:33:17.338Z",
};

const mockAdminGetCategoriesResponse: IEntitesAndPaginationReponse<AdminGetCategoryResponseDto> =
  {
    data: [mockAdminGetCategoryResponse],
    pagination: {
      take: 10,
      page: 1,
      total: 10,
      totalPages: 1,
    },
  };

export {
  mockAdminCreateCategoryRequest,
  mockAdminGetCategoriesRequest,
  mockAdminGetCategoryRequest,
  mockAdminGetCategoriesResponse,
  mockAdminGetCategoryResponse,
};
