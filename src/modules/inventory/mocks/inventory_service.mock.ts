import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";
import AdminGetInventoryResponseDto from "../dtos/services/admin_get_inventory_response.dto";
import {
  AdminCreateProductInventoryRequestDto,
  AdminCreateVariantProductInventoryRequestDto,
} from "../dtos/services";
import AdminUpdateProductInventoryRequestDto from "../dtos/services/admin_update_inventory_request.dto";

const mockAdminInventoryResponse: AdminGetInventoryResponseDto = {
  inventoryId: 1,
  stock: 10,
};

const mockAdminCreateProductInventoryRequest: AdminCreateProductInventoryRequestDto =
  {
    stock: 10,
    productId: ENUM_PREFIX_DATABASE.PR + "123",
  };

const mockAdminCreateVariantProductInventoryRequest: AdminCreateVariantProductInventoryRequestDto =
  {
    stock: 10,
    varaintProductId: ENUM_PREFIX_DATABASE.VPR + "123",
  };

const mockAdminUpdateInventoryRequest: AdminUpdateProductInventoryRequestDto = {
  stock: 5,
};

export {
  mockAdminInventoryResponse,
  mockAdminUpdateInventoryRequest,
  mockAdminCreateProductInventoryRequest,
  mockAdminCreateVariantProductInventoryRequest,
};
