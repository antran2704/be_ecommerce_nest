import { IAdminCategoryRepository } from "../interfaces/admin_category_repository.interface";
import {
  mockCategoryEntity,
  mockChildCategoryEntity,
} from "./admin_category_entity.mock";

const mockAdminCategoryRepository: IAdminCategoryRepository = {
  findCategories: jest.fn().mockReturnValue({
    data: [mockCategoryEntity],
    pagination: {
      page: 1,
      take: 10,
      total: 10,
      totalPages: 1,
    },
  }),
  findCategoryById: jest.fn().mockReturnValue(mockCategoryEntity),
  findCategoryByName: jest.fn().mockReturnValue(mockCategoryEntity),
  findChildren: jest.fn().mockReturnValue([mockChildCategoryEntity]),

  createCategory: jest.fn().mockResolvedValue(null),
  updateCategory: jest.fn().mockResolvedValue(null),
  deleteCategory: jest.fn().mockResolvedValue(null),
};
