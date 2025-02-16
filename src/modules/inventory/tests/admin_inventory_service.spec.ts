import { Test, TestingModule } from "@nestjs/testing";
import { createMapper } from "@automapper/core";
import { classes } from "@automapper/classes";
import { AutomapperModule, getMapperToken } from "@automapper/nestjs";
import { BadRequestException } from "@nestjs/common";

import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";
import { AdminInventoryService } from "../services/admin_inventory.service";
import { AdminInventoryRepository } from "../repositories/admin_inventory.repository";
import { AdminGetInventoryReponseMapper } from "../mappers/admin_get_inventory_response.mapper";
import { mockAdminInventoryRepository } from "../mocks/inventory_repository.mock";
import {
  mockAdminCreateInventoryRequest,
  mockAdminInventoryResponse,
  mockAdminUpdateInventoryRequest,
} from "../mocks/inventory_service.mock";

describe("AdminInventoryService test case", () => {
  let service: AdminInventoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AutomapperModule],
      providers: [
        AdminGetInventoryReponseMapper,
        AdminInventoryService,
        {
          provide: AdminInventoryRepository,
          useValue: mockAdminInventoryRepository,
        },
        {
          provide: getMapperToken(),
          useValue: createMapper({
            strategyInitializer: classes(),
          }),
        },
      ],
    }).compile();

    service = module.get<AdminInventoryService>(AdminInventoryService);
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
      await service.createProductInventory(mockAdminCreateInventoryRequest),
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
