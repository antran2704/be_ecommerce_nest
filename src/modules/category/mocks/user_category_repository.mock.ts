import { IUserCategoryRepository } from "../interfaces/user_category_repository.interface";
import { mockCategoryEntity } from "./category_entity.mock";

const mockUserCategoryRepository: IUserCategoryRepository = {
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
};

export { mockUserCategoryRepository };
