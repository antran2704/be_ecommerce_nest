import { AdminCreateInventoryDto } from "../dtos/repositories";
import { InventoryEntity } from "../entities/inventory.entity";

export interface IAdminInventoryRepository {
  findByProductId(id: string): Promise<InventoryEntity[]>;
  create(payload: AdminCreateInventoryDto): Promise<void>;
  save(payload: InventoryEntity): Promise<void>;
  delete(id: string): Promise<void>;
}
