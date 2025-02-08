import { ENUM_PAGINATION_ORDER } from "~/common/pagination/enums/order.enum";
import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import {
  AdminCreateVariantTypeRequestDto,
  AdminGetVariantTypeResponseDto,
  AdminUpdateVariantTypeRequestDto,
} from "../dtos/services";
import { PaginationSearchRequestDto } from "~/common/pagination/dtos";

const mockAdminCreateVariantTypeRequest: AdminCreateVariantTypeRequestDto = {
  variantTypeName: "Color",
};

const mockAdminUpdateVariantTypeRequest: AdminUpdateVariantTypeRequestDto = {
  variantTypeName: "Color",
};

const mockAdminGetVariantTypesRequest: PaginationSearchRequestDto = {
  limit: 10,
  order: ENUM_PAGINATION_ORDER.DESC,
  page: 1,
};

const mockAdminGetVariantTypeResponse: AdminGetVariantTypeResponseDto = {
  variantTypeId: "VT123",
  variantTypeName: "Colors",
  createdAt: "2025-02-05T16:33:17.338Z",
};

const mockAdminGetVariantTypesResponse: IEntitesAndPaginationReponse<AdminGetVariantTypeResponseDto> =
  {
    data: [mockAdminGetVariantTypeResponse],
    pagination: {
      take: 10,
      page: 1,
      total: 10,
      totalPages: 1,
    },
  };

export {
  mockAdminCreateVariantTypeRequest,
  mockAdminUpdateVariantTypeRequest,
  mockAdminGetVariantTypesRequest,
  mockAdminGetVariantTypesResponse,
  mockAdminGetVariantTypeResponse,
};
