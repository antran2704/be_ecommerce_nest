import {
  AdminCreateProductInventoryRequestDto,
  AdminGetProductInventoryRequestDto,
  AdminGetProductInventoryResponseDto,
  AdminUpdateProductInventoryRequestDto,
} from "../dtos/services";

export interface IAdminInventoryService {
  getProductInventories(
    payload: AdminGetProductInventoryRequestDto,
  ): Promise<AdminGetProductInventoryResponseDto[]>;
  getProductInventory(id: string): Promise<number>;
  createProductInventory(
    payload: AdminCreateProductInventoryRequestDto,
  ): Promise<void>;
  updateProductInventory(
    id: string,
    payload: AdminUpdateProductInventoryRequestDto,
  ): Promise<void>;
  deleteProductIventory(id: string): Promise<void>;
}
