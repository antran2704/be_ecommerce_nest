import { AdminCreateProductInventoryDto } from "../dtos/repositories";
import { AdminGetProductInventoryRequestDto } from "../dtos/services";
import { InventoryEntity } from "../entities/inventory.entity";

export interface IAdminInventoryRepository {
  findByProductId(
    payload: AdminGetProductInventoryRequestDto,
  ): Promise<InventoryEntity[]>;
  create(payload: AdminCreateProductInventoryDto): Promise<void>;
  save(payload: InventoryEntity): Promise<void>;
  deleteByProductId(id: string): Promise<void>;
}
