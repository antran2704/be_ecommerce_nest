import { Test, TestingModule } from "@nestjs/testing";
import { createMapper } from "@automapper/core";
import { classes } from "@automapper/classes";
import { AutomapperModule, getMapperToken } from "@automapper/nestjs";
import { BadRequestException } from "@nestjs/common";

import { AdminProductService } from "../services/admin_product.service";
import { AdminProductRepository } from "../repositories/admin_product.repository";
import { AdminGetProductDetailReponseMapper } from "../mappers/admin_get_product_detail_response.mapper";
import { AdminGetProductListReponseMapper } from "../mappers/admin_get_product_list_response.mapper";
import { mockAdminProductRepository } from "../mocks/admin_product_repository.mock";
import {
  mockAdminCreateProductRequest,
  mockAdminGetProductDetailResponse,
  mockAdminGetProductsRequest,
  mockAdminGetProductsResponse,
  mockAdminUpdateProductRequest,
} from "../mocks/admin_product_service.mock";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";
import { AdminCategoryRepository } from "~/modules/category/repositories/admin_category.repository";
import { AdminCategoryService } from "~/modules/category/services/admin_category.service";
import { mockAdminCategoryRepository } from "~/modules/category/mocks/admin_category_repository.mock";
import { PRODUCT_ERROR_MESSAGES } from "../messages/product.error";
import { AdminProductInventoryService } from "~/modules/inventory/services/admin_product_inventory.service";
import { AdminProductInventoryRepository } from "~/modules/inventory/repositories/admin_product_inventory.repository";
import { mockAdminProductInventoryRepository } from "~/modules/inventory/mocks/admin_inventory_repository.mock";

describe("AdminProductService test case", () => {
  let productService: AdminProductService;
  let repository: AdminProductRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AutomapperModule],
      providers: [
        AdminProductService,
        AdminGetProductDetailReponseMapper,
        AdminGetProductListReponseMapper,
        AdminCategoryService,
        AdminProductInventoryService,
        {
          provide: AdminProductRepository,
          useValue: mockAdminProductRepository,
        },
        {
          provide: AdminCategoryRepository,
          useValue: mockAdminCategoryRepository,
        },
        {
          provide: AdminProductInventoryRepository,
          useValue: mockAdminProductInventoryRepository,
        },
        {
          provide: getMapperToken(),
          useValue: createMapper({
            strategyInitializer: classes(),
          }),
        },
      ],
    }).compile();

    productService = module.get<AdminProductService>(AdminProductService);
    repository = module.get<AdminProductRepository>(AdminProductRepository);
  });

  it("service should be defined", () => {
    expect(productService).toBeDefined();
  });

  it("repository should be defined", () => {
    expect(repository).toBeDefined();
  });

  it("getProducts successfully", async () => {
    expect(
      await productService.getProducts(mockAdminGetProductsRequest),
    ).toEqual(mockAdminGetProductsResponse);
  });

  it("getProductById successfully", async () => {
    expect(
      await productService.getProductById(ENUM_PREFIX_DATABASE.PR + "123"),
    ).toEqual(mockAdminGetProductDetailResponse);
  });

  it("createProduct successfully", async () => {
    expect(
      await productService.createProduct(mockAdminCreateProductRequest),
    ).toBeUndefined();
  });

  it("updateProduct successfully", async () => {
    expect(
      await productService.updateProduct(
        ENUM_PREFIX_DATABASE.PR + "123",
        mockAdminUpdateProductRequest,
      ),
    ).toBeUndefined();
  });

  it("enableProduct successfully", async () => {
    await expect(
      productService.enableProduct(ENUM_PREFIX_DATABASE.PR + "123"),
    ).rejects.toThrow(
      new BadRequestException(PRODUCT_ERROR_MESSAGES.WAS_ENABLED),
    );
  });

  it("disableProduct successfully", async () => {
    expect(
      await productService.disableProduct(ENUM_PREFIX_DATABASE.PR + "123"),
    ).toBeUndefined();
  });

  it("deleteProduct successfully", async () => {
    expect(
      await productService.deleteProduct(ENUM_PREFIX_DATABASE.PR + "123"),
    ).toBeUndefined();
  });
});
