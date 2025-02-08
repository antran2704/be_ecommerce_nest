import { IAdminVariantTypeRepository } from "../interfaces/admin_variant_type_value_repository.interface";
import { mockVariantTypeEntity } from "./variant_type_entity.mock";

const mockAdminVariantTypeRepository: IAdminVariantTypeRepository = {
  findVariantTypes: jest.fn().mockReturnValue({
    data: [mockVariantTypeEntity],
    pagination: {
      page: 1,
      take: 10,
      total: 10,
      totalPages: 1,
    },
  }),
  findVariantTypeById: jest.fn().mockReturnValue(mockVariantTypeEntity),
  findVariantTypeByName: jest.fn().mockReturnValue(null),

  create: jest.fn().mockResolvedValue(null),
  update: jest.fn().mockResolvedValue(null),
  delete: jest.fn().mockResolvedValue(null),
};

export { mockAdminVariantTypeRepository };
