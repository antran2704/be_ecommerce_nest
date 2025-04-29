import { ENUM_PAGINATION_ORDER } from "~/common/pagination/enums/order.enum";
import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import {
  AdminCreateVariantTypeValueRequestDto,
  AdminGetVariantTypeValueResponseDto,
  AdminGetVariantTypeValuesRequestDto,
  AdminUpdateVariantTypeValueRequestDto,
} from "../dtos/services";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";

const mockAdminCreateVariantValueRequest: AdminCreateVariantTypeValueRequestDto =
  {
    variantValueName: "Blue",
    variantTypeId: ENUM_PREFIX_DATABASE.VT + "123",
  };

const mockAdminUpdateVariantValueRequest: AdminUpdateVariantTypeValueRequestDto =
  {
    variantValueName: "Blue",
  };

const mockAdminGetVariantValuesRequest: AdminGetVariantTypeValuesRequestDto = {
  take: 10,
  order: ENUM_PAGINATION_ORDER.DESC,
  page: 1,
  variantTypeId: ENUM_PREFIX_DATABASE.VT + "123",
};

const mockAdminGetVariantValueResponse: AdminGetVariantTypeValueResponseDto = {
  variantTypeValueId: ENUM_PREFIX_DATABASE.VTE + "123",
  variantTypeValueName: "Blue",
  createdAt: "",
};

const mockAdminGetVariantValuesResponse: IEntitesAndPaginationReponse<AdminGetVariantTypeValueResponseDto> =
  {
    data: [mockAdminGetVariantValueResponse],
    pagination: {
      take: 10,
      page: 1,
      total: 10,
      totalPages: 1,
    },
  };

export {
  mockAdminCreateVariantValueRequest,
  mockAdminUpdateVariantValueRequest,
  mockAdminGetVariantValuesRequest,
  mockAdminGetVariantValueResponse,
  mockAdminGetVariantValuesResponse,
};
