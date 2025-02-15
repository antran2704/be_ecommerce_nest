import {
  AdminCreateProductInventoryRequestDto,
  AdminGetProductInventoryRequestDto,
  AdminGetProductInventoryResponseDto,
  AdminUpdateProductInventoryRequestDto,
} from "../dtos/services";

export interface IAdminInventoryService {
  getProductInventory(
    payload: AdminGetProductInventoryRequestDto,
  ): Promise<AdminGetProductInventoryResponseDto>;
  createProductInventory(
    payload: AdminCreateProductInventoryRequestDto,
  ): Promise<void>;
  updateProductInventory(
    id: string,
    payload: AdminUpdateProductInventoryRequestDto,
  ): Promise<void>;
  deleteProductIventory(id: string): Promise<void>;
}
