import { ENUM_PAGINATION_ORDER } from "~/common/pagination/enums/order.enum";
import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";
import {
  AdminCreateVariantProductRequestDto,
  AdminGetVariantProductDetailResponseDto,
  AdminGetVariantProductListResponseDto,
  AdminGetVariantProductsRequestDto,
  AdminUpdateVariantProductRequestDto,
} from "../dtos/services";

const mockAdminCreateVariantProductRequest: AdminCreateVariantProductRequestDto =
  {
    variantProductName: "Product name",
    thumbnail: "Product thumbnail",
    basePrice: 1000,
    promotionPrice: 0,
    isActive: true,
    stock: 0,
    productId: ENUM_PREFIX_DATABASE.PR + "123",
    variantValueIds: [],
  };

const mockAdminUpdateVariantProductRequest: AdminUpdateVariantProductRequestDto =
  {
    variantProductName: "Product name",
    thumbnail: "Product thumbnail",
    basePrice: 1000,
    promotionPrice: 0,
    stock: 0,
  };

const mockAdminGetVariantProductsRequest: AdminGetVariantProductsRequestDto = {
  take: 10,
  order: ENUM_PAGINATION_ORDER.DESC,
  page: 1,
  productId: ENUM_PREFIX_DATABASE.PR + "123",
};

const mockAdminGetVariantProductDetailResponse: Partial<AdminGetVariantProductDetailResponseDto> =
  {
    variantProductId: ENUM_PREFIX_DATABASE.VPR + "123",
    variantProductName: "Product name",
    thumbnail: "Product thumbnail",
    basePrice: 1000,
    promotionPrice: 0,
    isActive: true,
    stock: 0,
    variantTypeValues: [],
  };

const mockAdminGetVariantProductListResponse: Partial<AdminGetVariantProductListResponseDto> =
  {
    variantProductId: ENUM_PREFIX_DATABASE.VPR + "123",
    variantProductName: "Product name",
    thumbnail: "Product thumbnail",
    basePrice: 1000,
    promotionPrice: 0,
    isActive: true,
    stock: 0,
    variantTypeValues: [],
  };

const mockAdminGetVariantProductsResponse: IEntitesAndPaginationReponse<
  Partial<AdminGetVariantProductListResponseDto>
> = {
  data: [mockAdminGetVariantProductListResponse],
  pagination: {
    take: 10,
    page: 1,
    total: 10,
    totalPages: 1,
  },
};

export {
  mockAdminCreateVariantProductRequest,
  mockAdminUpdateVariantProductRequest,
  mockAdminGetVariantProductsRequest,
  mockAdminGetVariantProductDetailResponse,
  mockAdminGetVariantProductListResponse,
  mockAdminGetVariantProductsResponse,
};
