import {
  AdminCreateProductInventoryRequestDto,
  AdminGetProductInventoryRequestDto,
  AdminGetInventoryResponseDto,
  AdminUpdateInventoryRequestDto,
} from "../dtos/services";

export interface IAdminProductInventoryService {
  getProductInventories(
    payload: AdminGetProductInventoryRequestDto,
  ): Promise<AdminGetInventoryResponseDto[]>;

  getProductInventory(id: string): Promise<number>;

  createProductInventory(
    payload: AdminCreateProductInventoryRequestDto,
  ): Promise<void>;

  updateProductInventory(
    id: string,
    payload: AdminUpdateInventoryRequestDto,
  ): Promise<void>;

  deleteProductIventory(id: string): Promise<void>;
}
