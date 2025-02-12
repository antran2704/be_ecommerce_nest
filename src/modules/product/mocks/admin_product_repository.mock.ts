import { ProductEntity } from "../entities/product.entity";
import { IAdminProductRepository } from "../interfaces/admin_product_repository.interface";
import { mockProductEntity } from "./product_entity.mock";

const mockAdminProductRepository: IAdminProductRepository = {
  find: jest.fn().mockResolvedValue({
    data: [mockProductEntity as ProductEntity],
    pagination: {
      page: 1,
      take: 10,
      total: 10,
      totalPages: 1,
    },
  }),
  findById: jest.fn().mockResolvedValue(mockProductEntity as ProductEntity),
  create: jest.fn().mockReturnValue(null),
  update: jest.fn().mockReturnValue(null),
  save: jest.fn().mockReturnValue(null),
  delete: jest.fn().mockReturnValue(null),
  disable: jest.fn().mockReturnValue(null),
  enable: jest.fn().mockReturnValue(null),
};

export { mockAdminProductRepository };
