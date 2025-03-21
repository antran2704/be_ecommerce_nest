import { Test, TestingModule } from "@nestjs/testing";
import { createMapper } from "@automapper/core";
import { classes } from "@automapper/classes";
import { AutomapperModule, getMapperToken } from "@automapper/nestjs";
import { BadRequestException } from "@nestjs/common";

import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";
import { AdminCategoryService } from "~/modules/category/services/admin_category.service";
import { AdminVariantProductService } from "../services/admin_variant_product.service";
import { AdminGetVariantProductDetailReponseMapper } from "../mappers/admin_get_variant_product_detail_response.mapper";
import { AdminGetVariantProductListReponseMapper } from "../mappers/admin_get_variant_product_list_response.mapper";
import { AdminVariantProductRepository } from "../repositories/admin_variant_product.repository";
import { mockAdminVariantProductRepository } from "../mocks/admin_variant_product_repository.mock";
import { AdminProductRepository } from "~/modules/product/repositories/admin_product.repository";
import { mockAdminProductRepository } from "~/modules/product/mocks/admin_product_repository.mock";
import { AdminProductInventoryRepository } from "~/modules/inventory/repositories/admin_product_inventory.repository";
import {
  mockAdminProductInventoryRepository,
  mockAdminVariantProductInventoryRepository,
} from "~/modules/inventory/mocks/admin_inventory_repository.mock";
import { AdminVariantTypeValueRepository } from "~/modules/variant_type_value/repositories/admin_variant_type.repository";
import { mockAdminVariantTypeValueRepository } from "~/modules/variant_type_value/mocks/admin_variant_type_repository.mock";
import {
  mockAdminCreateVariantProductRequest,
  mockAdminGetVariantProductDetailResponse,
  mockAdminGetVariantProductsRequest,
  mockAdminGetVariantProductsResponse,
  mockAdminUpdateVariantProductRequest,
} from "../mocks/admin_variant_product_service.mock";
import { VARIANT_PRODUCT_ERROR_MESSAGES } from "../messages/varaint_product.error";
import { AdminProductService } from "~/modules/product/services/admin_product.service";
import { AdminVariantProductInventoryService } from "~/modules/inventory/services/admin_variant_product_inventory.service";
import { AdminVariantTypeValueService } from "~/modules/variant_type_value/services/admin_variant_type.service";
import { AdminCategoryRepository } from "~/modules/category/repositories/admin_category.repository";
import { mockAdminCategoryRepository } from "~/modules/category/mocks/admin_category_repository.mock";
import { AdminVariantProductInventoryRepository } from "~/modules/inventory/repositories/admin_variant_product_inventory.repository";
import { AdminProductInventoryService } from "~/modules/inventory/services/admin_product_inventory.service";
import { AdminVariantTypeService } from "~/modules/variant_type/services/admin_variant_type.service";
import { AdminVariantTypeRepository } from "~/modules/variant_type/repositories/admin_variant_type.repository";
import { mockAdminVariantTypeRepository } from "~/modules/variant_type/mocks/admin_variant_type_repository.mock";

describe("AdminVariantProductService test case", () => {
  let service: AdminVariantProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AutomapperModule],
      providers: [
        AdminVariantProductService,
        AdminGetVariantProductDetailReponseMapper,
        AdminGetVariantProductListReponseMapper,
        AdminProductService,
        AdminCategoryService,
        AdminProductInventoryService,
        AdminVariantProductInventoryService,
        AdminVariantTypeService,
        AdminVariantTypeValueService,
        {
          provide: AdminVariantProductRepository,
          useValue: mockAdminVariantProductRepository,
        },
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
          provide: AdminVariantProductInventoryRepository,
          useValue: mockAdminVariantProductInventoryRepository,
        },
        {
          provide: AdminVariantTypeRepository,
          useValue: mockAdminVariantTypeRepository,
        },
        {
          provide: AdminVariantTypeValueRepository,
          useValue: mockAdminVariantTypeValueRepository,
        },
        {
          provide: getMapperToken(),
          useValue: createMapper({
            strategyInitializer: classes(),
          }),
        },
      ],
    }).compile();

    service = module.get<AdminVariantProductService>(
      AdminVariantProductService,
    );
  });

  it("service should be defined", () => {
    expect(service).toBeDefined();
  });

  it("getVariantProducts successfully", async () => {
    expect(
      await service.getVariantProducts(mockAdminGetVariantProductsRequest),
    ).toEqual(mockAdminGetVariantProductsResponse);
  });

  it("getVariantProductById successfully", async () => {
    expect(
      await service.getVariantProductById(ENUM_PREFIX_DATABASE.VPR + "123"),
    ).toEqual(mockAdminGetVariantProductDetailResponse);
  });

  it("createVariantProduct successfully", async () => {
    expect(
      await service.createVariantProduct(mockAdminCreateVariantProductRequest),
    ).toBeUndefined();
  });

  it("updateVariantProduct successfully", async () => {
    expect(
      await service.updateVariantProduct(
        ENUM_PREFIX_DATABASE.VPR + "123",
        mockAdminUpdateVariantProductRequest,
      ),
    ).toBeUndefined();
  });

  it("enableVariantProduct successfully", async () => {
    await expect(
      service.enableVariantProduct(ENUM_PREFIX_DATABASE.VPR + "123"),
    ).rejects.toThrow(
      new BadRequestException(VARIANT_PRODUCT_ERROR_MESSAGES.WAS_ENABLED),
    );
  });

  it("disableVariantProduct successfully", async () => {
    expect(
      await service.disableVariantProduct(ENUM_PREFIX_DATABASE.VPR + "123"),
    ).toBeUndefined();
  });

  it("deleteVariantProduct successfully", async () => {
    expect(
      await service.deleteVariantProduct(ENUM_PREFIX_DATABASE.VPR + "123"),
    ).toBeUndefined();
  });
});
