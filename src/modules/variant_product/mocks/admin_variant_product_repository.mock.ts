import { VariantProductEntity } from "../entities/variant_product.entity";
import { IAdminVariantProductRepository } from "../interfaces/admin_variant_product_repository.interface";
import { mockVariantProductEntity } from "./variant_product_entity.mock";

const mockAdminVariantProductRepository: IAdminVariantProductRepository = {
  find: jest.fn().mockResolvedValue({
    data: [mockVariantProductEntity as VariantProductEntity],
    pagination: {
      page: 1,
      take: 10,
      total: 10,
      totalPages: 1,
    },
  }),
  findById: jest
    .fn()
    .mockResolvedValue(mockVariantProductEntity as VariantProductEntity),
  create: jest.fn().mockReturnValue(null),
  checkIsExited: jest.fn().mockResolvedValue(null),
  save: jest.fn().mockReturnValue(null),
  delete: jest.fn().mockReturnValue(null),
  deleteAll: jest.fn().mockReturnValue(null),
  disable: jest.fn().mockReturnValue(null),
  enable: jest.fn().mockReturnValue(null),
};

export { mockAdminVariantProductRepository };
