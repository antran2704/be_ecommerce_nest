import { Test, TestingModule } from "@nestjs/testing";
import { createMapper } from "@automapper/core";
import { classes } from "@automapper/classes";
import { AutomapperModule, getMapperToken } from "@automapper/nestjs";

import { UserCategoryService } from "../services/user_category.service";
import { UserCategoryRepository } from "../repositories/user_category.repository";
import { UserGetCategoryReponseMapper } from "../mappers/user_get_category_response.mapper";
import { mockUserCategoryRepository } from "../mocks/user_category_repository.mock";
import {
  mockUserGetCategoriesRequest,
  mockUserGetCategoriesResponse,
  mockUserGetCategoryResponse,
} from "../mocks/user_category_service.mock";
import { mockCategoryEntity } from "../mocks/category_entity.mock";

describe("UserCategoryService test case", () => {
  let categoryService: UserCategoryService;
  let repository: UserCategoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AutomapperModule],
      providers: [
        UserCategoryService,
        UserGetCategoryReponseMapper,
        {
          provide: UserCategoryRepository,
          useValue: mockUserCategoryRepository,
        },
        {
          provide: getMapperToken(),
          useValue: createMapper({
            strategyInitializer: classes(),
          }),
        },
      ],
    }).compile();

    categoryService = module.get<UserCategoryService>(UserCategoryService);
    repository = module.get<UserCategoryRepository>(UserCategoryRepository);
  });

  it("categoryService should be defined", () => {
    expect(categoryService).toBeDefined();
  });

  it("repository should be defined", () => {
    expect(repository).toBeDefined();
  });

  it("getCategories successfully", async () => {
    expect(
      await categoryService.getCategories(mockUserGetCategoriesRequest),
    ).toEqual(mockUserGetCategoriesResponse);
  });

  it("getParentCategories successfully", async () => {
    expect(
      await categoryService.getCategoriesByParentId("CA0502258197", []),
    ).toEqual([mockCategoryEntity]);
  });

  it("getParentCategories successfully", async () => {
    expect(await categoryService.getParentCategories("CA0502258197")).toEqual([
      mockUserGetCategoryResponse,
    ]);
  });
});
