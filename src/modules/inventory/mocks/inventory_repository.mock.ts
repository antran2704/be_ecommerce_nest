import { InventoryEntity } from "../entities/inventory.entity";
import { IAdminInventoryRepository } from "../interfaces/admin_inventory_repository.interface";
import { mockInventoryEntity } from "./inventory_entity.mock";

const mockAdminInventoryRepository: IAdminInventoryRepository = {
  findByProductId: jest
    .fn()
    .mockResolvedValue([mockInventoryEntity as InventoryEntity]),
  create: jest.fn().mockReturnValue(null),
  save: jest.fn().mockReturnValue(null),
  deleteByProductId: jest.fn().mockReturnValue(null),
};

export { mockAdminInventoryRepository };
