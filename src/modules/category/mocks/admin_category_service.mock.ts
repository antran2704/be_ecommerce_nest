import { ENUM_PAGINATION_ORDER } from "~/common/pagination/enums/order.enum";
import {
  AdminCreateCategoryRequestDto,
  AdminGetCategoriesRequestDto,
  AdminGetCategoryRequestDto,
  AdminGetCategoryResponseDto,
} from "../dtos/services";

const mockAdminCreateCategoryRequest: AdminCreateCategoryRequestDto = {
  categoryName: "Clothes",
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

export {
  mockAdminCreateCategoryRequest,
  mockAdminGetCategoriesRequest,
  mockAdminGetCategoryRequest,
  mockAdminGetCategoryResponse,
};
