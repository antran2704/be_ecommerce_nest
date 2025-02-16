import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";
import AdminGetInventoryResponseDto from "../dtos/services/admin_get_inventory_response.dto";
import {
  AdminCreateProductInventoryRequestDto,
  AdminUpdateProductInventoryRequestDto,
} from "../dtos/services";

const mockAdminInventoryResponse: AdminGetInventoryResponseDto = {
  inventoryId: 1,
  stock: 10,
};

const mockAdminCreateInventoryRequest: AdminCreateProductInventoryRequestDto = {
  stock: 10,
  productId: ENUM_PREFIX_DATABASE.PR + "123",
};

const mockAdminUpdateInventoryRequest: AdminUpdateProductInventoryRequestDto = {
  stock: 5,
};

export {
  mockAdminInventoryResponse,
  mockAdminUpdateInventoryRequest,
  mockAdminCreateInventoryRequest,
};
