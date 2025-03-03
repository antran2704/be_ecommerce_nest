import { AdminCreateVariantProductInventoryDto } from "../dtos/repositories";
import { AdminGetVariantProductInventoryRequestDto } from "../dtos/services";
import { InventoryEntity } from "../entities/inventory.entity";

export interface IAdminVariantProductInventoryRepository {
  findByVariantProductId(
    payload: AdminGetVariantProductInventoryRequestDto,
  ): Promise<InventoryEntity[]>;
  create(payload: AdminCreateVariantProductInventoryDto): Promise<void>;
  save(payload: InventoryEntity): Promise<void>;
  deleteByVariantProductId(id: string): Promise<void>;
}
