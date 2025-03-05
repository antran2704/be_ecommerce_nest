import { InventoryEntity } from "../entities/inventory.entity";
import {
  IAdminProductInventoryRepository,
  IAdminVariantProductInventoryRepository,
} from "../interfaces";
import { mockInventoryEntity } from "./inventory_entity.mock";

const mockAdminProductInventoryRepository: IAdminProductInventoryRepository = {
  findByProductId: jest
    .fn()
    .mockResolvedValue([mockInventoryEntity as InventoryEntity]),
  create: jest.fn().mockReturnValue(null),
  save: jest.fn().mockReturnValue(null),
  deleteByProductId: jest.fn().mockReturnValue(null),
};

const mockAdminVariantProductInventoryRepository: IAdminVariantProductInventoryRepository =
  {
    findByVariantProductId: jest
      .fn()
      .mockResolvedValue([mockInventoryEntity as InventoryEntity]),
    create: jest.fn().mockReturnValue(null),
    save: jest.fn().mockReturnValue(null),
    deleteByVariantProductId: jest.fn().mockReturnValue(null),
  };

export {
  mockAdminProductInventoryRepository,
  mockAdminVariantProductInventoryRepository,
};
