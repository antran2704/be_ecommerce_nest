import { Test, TestingModule } from "@nestjs/testing";
import { createMapper } from "@automapper/core";
import { classes } from "@automapper/classes";
import { AutomapperModule, getMapperToken } from "@automapper/nestjs";

import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";
import { AdminGetInventoryReponseMapper } from "../mappers/admin_get_inventory_response.mapper";
import {
  mockAdminCreateProductInventoryRequest,
  mockAdminInventoryResponse,
  mockAdminUpdateInventoryRequest,
} from "../mocks/inventory_service.mock";
import { AdminProductInventoryService } from "../services/admin_product_inventory.service";
import { AdminProductInventoryRepository } from "../repositories/admin_product_inventory.repository";
import { mockAdminProductInventoryRepository } from "../mocks/inventory_repository.mock";

describe("AdminProductInventoryService test case", () => {
  let service: AdminProductInventoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AutomapperModule],
      providers: [
        AdminGetInventoryReponseMapper,
        AdminProductInventoryService,
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

    service = module.get<AdminProductInventoryService>(
      AdminProductInventoryService,
    );
  });

  it("service should be defined", () => {
    expect(service).toBeDefined();
  });

  it("getProductInventories successfully", async () => {
    expect(
      await service.getProductInventories({
        productId: ENUM_PREFIX_DATABASE.PR + "123",
      }),
    ).toEqual([mockAdminInventoryResponse]);
  });

  it("getProductInventory successfully", async () => {
    expect(
      await service.getProductInventory(ENUM_PREFIX_DATABASE.PR + "123"),
    ).toEqual(10);
  });

  it("createProductInventory successfully", async () => {
    expect(
      await service.createProductInventory(
        mockAdminCreateProductInventoryRequest,
      ),
    ).toBeUndefined();
  });

  it("updateProductInventory successfully", async () => {
    expect(
      await service.updateProductInventory(
        ENUM_PREFIX_DATABASE.PR + "123",
        mockAdminUpdateInventoryRequest,
      ),
    ).toBeUndefined();
  });

  it("deleteProductInventory successfully", async () => {
    expect(
      await service.deleteProductIventory(ENUM_PREFIX_DATABASE.PR + "123"),
    ).toBeUndefined();
  });
});
