import { ENUM_PAGINATION_ORDER } from "~/common/pagination/enums/order.enum";
import {
  AdminCreateCategoryRequestDto,
  AdminGetCategoriesRequestDto,
  AdminGetCategoryRequestDto,
  AdminGetCategoryResponseDto,
} from "../dtos/services";
import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";

const mockAdminCreateCategoryRequest: AdminCreateCategoryRequestDto = {
  categoryName: "Category Test",
  categoryParentId: null,
  categorySlug: "category-test",
  categoryThumbnail: "/path/to/thumbnail",
};

const mockAdminGetCategoriesRequest: AdminGetCategoriesRequestDto = {
  take: 10,
  order: ENUM_PAGINATION_ORDER.DESC,
  page: 1,
};

const mockAdminGetCategoryRequest: AdminGetCategoryRequestDto = {
  categoryId: ENUM_PREFIX_DATABASE.CA + "123",
};

const mockAdminGetCategoryResponse: AdminGetCategoryResponseDto = {
  categoryId: ENUM_PREFIX_DATABASE.CA + "123",
  categoryName: "Clothes",
  categoryThumbnail: "",
  categorySlug: "",
  childrenCount: 0,
  createdAt: "",
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
