import { ENUM_PAGINATION_ORDER } from "~/common/pagination/enums/order.enum";
import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import {
  AdminCreateProductRequestDto,
  AdminGetProductDetailResponseDto,
  AdminGetProductListResponseDto,
  AdminGetProductsRequestDto,
} from "../dtos/services";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";

const mockAdminCreateProductRequest: AdminCreateProductRequestDto = {
  productName: "Product name",
  description: "Product description",
  thumbnail: "Product thumbnail",
  gallery: [],
  basePrice: 1000,
  promotionPrice: 0,
  mainCategoryId: ENUM_PREFIX_DATABASE.CA + "123",
  subCategories: [],
  isActive: true,
};

const mockAdminGetProductsRequest: AdminGetProductsRequestDto = {
  limit: 10,
  order: ENUM_PAGINATION_ORDER.DESC,
  page: 1,
};

const mockAdminGetProductDetailResponse: Partial<AdminGetProductDetailResponseDto> =
  {
    productId: ENUM_PREFIX_DATABASE.PR + "123",
    productName: "Product name",
    description: "Product description",
    thumbnail: "Product thumbnail",
    gallery: [],
    basePrice: 1000,
    promotionPrice: 0,
    mainCategoryId: ENUM_PREFIX_DATABASE.CA + "123",
    mainCategoryName: "Category name",
    subCategories: [],
    isActive: true,
  };

const mockAdminGetProductListResponse: Partial<AdminGetProductListResponseDto> =
  {
    productId: ENUM_PREFIX_DATABASE.PR + "123",
    productName: "Product name",
    description: "Product description",
    thumbnail: "Product thumbnail",
    basePrice: 1000,
    promotionPrice: 0,
    mainCategoryId: ENUM_PREFIX_DATABASE.CA + "123",
    mainCategoryName: "Category name",
    isActive: true,
  };

const mockAdminGetProductsResponse: IEntitesAndPaginationReponse<
  Partial<AdminGetProductListResponseDto>
> = {
  data: [mockAdminGetProductListResponse],
  pagination: {
    take: 10,
    page: 1,
    total: 10,
    totalPages: 1,
  },
};

export {
  mockAdminCreateProductRequest,
  mockAdminGetProductsRequest,
  mockAdminGetProductDetailResponse,
  mockAdminGetProductListResponse,
  mockAdminGetProductsResponse,
};
