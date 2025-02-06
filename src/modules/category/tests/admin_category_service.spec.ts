import { Test, TestingModule } from "@nestjs/testing";
import { createMapper } from "@automapper/core";
import { classes } from "@automapper/classes";
import { AutomapperModule, getMapperToken } from "@automapper/nestjs";

import { AdminCategoryService } from "../services/admin_category.service";
import { AdminCategoryRepository } from "../repositories/admin_category.repository";
import { AdminGetCategoryReponseMapper } from "../mappers/admin_get_category_response.mapper";
import { AdminGetChildCategoryReponseMapper } from "../mappers/admin_get_child_category_response.mapper";
import { mockAdminCategoryRepository } from "../mocks/admin_category_repository.mock";
import {
  mockAdminCreateCategoryRequest,
  mockAdminGetCategoriesRequest,
  mockAdminGetCategoriesResponse,
  mockAdminGetCategoryResponse,
} from "../mocks/admin_category_service.mock";

describe("AdminCategoryService test case", () => {
  let categoryService: AdminCategoryService;
  let repository: AdminCategoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AutomapperModule],
      providers: [
        AdminCategoryService,
        AdminGetCategoryReponseMapper,
        AdminGetChildCategoryReponseMapper,
        {
          provide: AdminCategoryRepository,
          useValue: mockAdminCategoryRepository,
        },
        {
          provide: getMapperToken(),
          useValue: createMapper({
            strategyInitializer: classes(),
          }),
        },
      ],
    }).compile();

    categoryService = module.get<AdminCategoryService>(AdminCategoryService);
    repository = module.get<AdminCategoryRepository>(AdminCategoryRepository);
  });

  it("categoryService should be defined", () => {
    expect(categoryService).toBeDefined();
  });

  it("repository should be defined", () => {
    expect(repository).toBeDefined();
  });

  it("getCategories successfully", async () => {
    expect(
      await categoryService.getCategories(mockAdminGetCategoriesRequest),
    ).toEqual(mockAdminGetCategoriesResponse);
  });

  it("getCategory successfully", async () => {
    expect(await categoryService.getCategoryById("CA0502258197")).toEqual(
      mockAdminGetCategoryResponse,
    );
  });

  it("createCategory successfully", async () => {
    expect(
      await categoryService.createCategory(mockAdminCreateCategoryRequest),
    ).toBeUndefined();
  });

  it("updateCategory successfully", async () => {
    expect(
      await categoryService.updateCategory("CA0502258197", {
        categoryName: "Test",
        categoryParentId: null,
      }),
    ).toBeUndefined();
  });

  it("deleteCategory successfully", async () => {
    expect(
      await categoryService.deleteCategory("CA05022581972"),
    ).toBeUndefined();
  });
});
