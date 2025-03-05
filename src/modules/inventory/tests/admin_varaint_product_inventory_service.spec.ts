import { Test, TestingModule } from "@nestjs/testing";
import { createMapper } from "@automapper/core";
import { classes } from "@automapper/classes";
import { AutomapperModule, getMapperToken } from "@automapper/nestjs";

import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";
import { AdminGetInventoryReponseMapper } from "../mappers/admin_get_inventory_response.mapper";
import {
  mockAdminCreateVariantProductInventoryRequest,
  mockAdminInventoryResponse,
  mockAdminUpdateInventoryRequest,
} from "../mocks/inventory_service.mock";
import { mockAdminVariantProductInventoryRepository } from "../mocks/admin_inventory_repository.mock";
import { AdminVariantProductInventoryService } from "../services/admin_variant_product_inventory.service";
import { AdminVariantProductInventoryRepository } from "../repositories/admin_variant_product_inventory.repository";

describe("AdminVariantProductInventoryService test case", () => {
  let service: AdminVariantProductInventoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AutomapperModule],
      providers: [
        AdminGetInventoryReponseMapper,
        AdminVariantProductInventoryService,
        {
          provide: AdminVariantProductInventoryRepository,
          useValue: mockAdminVariantProductInventoryRepository,
        },
        {
          provide: getMapperToken(),
          useValue: createMapper({
            strategyInitializer: classes(),
          }),
        },
      ],
    }).compile();

    service = module.get<AdminVariantProductInventoryService>(
      AdminVariantProductInventoryService,
    );
  });

  it("service should be defined", () => {
    expect(service).toBeDefined();
  });

  it("getVariantProductInventories successfully", async () => {
    expect(
      await service.getVariantProductInventories({
        variantProductId: ENUM_PREFIX_DATABASE.VPR + "123",
      }),
    ).toEqual([mockAdminInventoryResponse]);
  });

  it("getVariantProductInventory successfully", async () => {
    expect(
      await service.getVariantProductInventory(
        ENUM_PREFIX_DATABASE.VPR + "123",
      ),
    ).toEqual(10);
  });

  it("createVariantProductInventory successfully", async () => {
    expect(
      await service.createVariantProductInventory(
        mockAdminCreateVariantProductInventoryRequest,
      ),
    ).toBeUndefined();
  });

  it("updateVariantProductInventory successfully", async () => {
    expect(
      await service.updateVariantProductInventory(
        ENUM_PREFIX_DATABASE.VPR + "123",
        mockAdminUpdateInventoryRequest,
      ),
    ).toBeUndefined();
  });

  it("deleteVariantProductInventory successfully", async () => {
    expect(
      await service.deleteVariantProductIventory(
        ENUM_PREFIX_DATABASE.VPR + "123",
      ),
    ).toBeUndefined();
  });
});
