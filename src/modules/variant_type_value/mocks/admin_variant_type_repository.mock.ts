import { IAdminVariantTypeValueRepository } from "../interfaces/admin_variant_type_value_repository.interface";
import { mockVariantTypeValueEntity } from "./variant_type_entity.mock";

const mockAdminVariantTypeValueRepository: IAdminVariantTypeValueRepository = {
  findValues: jest.fn().mockReturnValue({
    data: [mockVariantTypeValueEntity],
    pagination: {
      page: 1,
      take: 10,
      total: 10,
      totalPages: 1,
    },
  }),
  findById: jest.fn().mockReturnValue(mockVariantTypeValueEntity),
  findByName: jest.fn().mockReturnValue(null),

  create: jest.fn().mockResolvedValue(null),
  update: jest.fn().mockResolvedValue(null),
  checkIsUsed: jest.fn().mockResolvedValue(false),
  delete: jest.fn().mockResolvedValue(null),
};

export { mockAdminVariantTypeValueRepository };
