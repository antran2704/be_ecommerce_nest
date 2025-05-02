import { ENUM_PAGINATION_ORDER } from "~/common/pagination/enums/order.enum";
import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import {
  AdminCreateProductRequestDto,
  AdminGetProductDetailResponseDto,
  AdminGetProductListResponseDto,
  AdminGetProductsRequestDto,
  AdminUpdateProductRequestDto,
} from "../dtos/services";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";
import { mockProductEntity } from "./product_entity.mock";

const mockAdminCreateProductRequest: AdminCreateProductRequestDto = {
  productName: "Product name",
  description: "Product description",
  thumbnail: "Product thumbnail",
  gallery: [],
  basePrice: 1000,
  promotionPrice: 0,
  mainCategory: mockProductEntity.main_category.id,
  subCategories: [],
  isActive: true,
  stock: 0,
};

const mockAdminUpdateProductRequest: AdminUpdateProductRequestDto = {
  productName: "Product name",
  description: "Product description",
  thumbnail: "Product thumbnail",
  gallery: [],
  basePrice: 1000,
  promotionPrice: 0,
  mainCategory: ENUM_PREFIX_DATABASE.CA + "123",
  subCategories: [],
  stock: 0,
};

const mockAdminGetProductsRequest: AdminGetProductsRequestDto = {
  take: 10,
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
    mainCategoryId: mockProductEntity.main_category.id,
    mainCategoryName: mockProductEntity.main_category.name,
    subCategories: [],
    isActive: true,
    createdAt: "",
    stock: 0,
  };

const mockAdminGetProductListResponse: Partial<AdminGetProductListResponseDto> =
  {
    productId: ENUM_PREFIX_DATABASE.PR + "123",
    productName: "Product name",
    thumbnail: "Product thumbnail",
    basePrice: 1000,
    promotionPrice: 0,
    mainCategoryId: mockProductEntity.main_category.id,
    mainCategoryName: mockProductEntity.main_category.name,
    isActive: true,
    createdAt: "",
    stock: 0,
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
  mockAdminUpdateProductRequest,
  mockAdminGetProductsRequest,
  mockAdminGetProductDetailResponse,
  mockAdminGetProductListResponse,
  mockAdminGetProductsResponse,
};
