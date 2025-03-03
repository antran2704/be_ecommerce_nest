import {
  AdminCreateVariantProductInventoryRequestDto,
  AdminGetInventoryResponseDto,
  AdminGetVariantProductInventoryRequestDto,
  AdminUpdateInventoryRequestDto,
} from "../dtos/services";

export interface IAdminVariantProductInventoryService {
  getVariantProductInventories(
    payload: AdminGetVariantProductInventoryRequestDto,
  ): Promise<AdminGetInventoryResponseDto[]>;

  getVariantProductInventory(id: string): Promise<number>;

  createVariantProductInventory(
    payload: AdminCreateVariantProductInventoryRequestDto,
  ): Promise<void>;

  updateVariantProductInventory(
    id: string,
    payload: AdminUpdateInventoryRequestDto,
  ): Promise<void>;

  deleteVariantProductIventory(id: string): Promise<void>;
}
