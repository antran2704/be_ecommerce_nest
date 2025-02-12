import { ProductEntity } from "../entities/product.entity";
import { IAdminProductRepository } from "../interfaces/admin_product_repository.interface";
import { mockProductEntity } from "./product_entity.mock";

const mockAdminProductRepository: IAdminProductRepository = {
  find: jest.fn(async () => ({
    data: [mockProductEntity as ProductEntity],
    pagination: {
      page: 1,
      take: 10,
      total: 10,
      totalPages: 1,
    },
  })),
  findById: jest.fn(async () => {
    return mockProductEntity as ProductEntity;
  }),
  create: jest.fn(),
  update: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  disable: jest.fn(),
  enable: jest.fn(),
};

export { mockAdminProductRepository };
