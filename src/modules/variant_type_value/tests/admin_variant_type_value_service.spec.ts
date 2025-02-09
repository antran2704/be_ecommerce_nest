import { Test, TestingModule } from "@nestjs/testing";
import { createMapper } from "@automapper/core";
import { classes } from "@automapper/classes";
import { AutomapperModule, getMapperToken } from "@automapper/nestjs";
import { mockAdminVariantTypeValueRepository } from "../mocks/admin_variant_type_repository.mock";
import {
  mockAdminCreateVariantValueRequest,
  mockAdminGetVariantValueResponse,
  mockAdminGetVariantValuesRequest,
  mockAdminGetVariantValuesResponse,
  mockAdminUpdateVariantValueRequest,
} from "../mocks/admin_variant_type_service.mock";
import { AdminVariantTypeValueService } from "../services/admin_variant_type.service";
import { AdminVariantTypeValueRepository } from "../repositories/admin_variant_type.repository";
import { AdminVariantTypeValueReponseMapper } from "../mappers/admin_get_variant_type_response.mapper";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";
import { AdminVariantTypeService } from "~/modules/variant_type/services/admin_variant_type.service";
import { AdminVariantTypeRepository } from "~/modules/variant_type/repositories/admin_variant_type.repository";
import { mockAdminVariantTypeRepository } from "~/modules/variant_type/mocks/admin_variant_type_repository.mock";
import { AdminVariantTypeReponseMapper } from "~/modules/variant_type/mappers/admin_get_variant_type_response.mapper";

describe("AdminVariantTypeValueService test case", () => {
  let variantValueService: AdminVariantTypeValueService;
  let repository: AdminVariantTypeValueRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AutomapperModule],
      providers: [
        AdminVariantTypeService,
        AdminVariantTypeValueService,
        AdminVariantTypeRepository,
        AdminVariantTypeReponseMapper,
        AdminVariantTypeValueReponseMapper,
        {
          provide: AdminVariantTypeValueRepository,
          useValue: mockAdminVariantTypeValueRepository,
        },
        {
          provide: AdminVariantTypeRepository,
          useValue: mockAdminVariantTypeRepository,
        },
        {
          provide: getMapperToken(),
          useValue: createMapper({
            strategyInitializer: classes(),
          }),
        },
      ],
    }).compile();

    variantValueService = module.get<AdminVariantTypeValueService>(
      AdminVariantTypeValueService,
    );
    repository = module.get<AdminVariantTypeValueRepository>(
      AdminVariantTypeValueRepository,
    );
  });

  it("variantValueService should be defined", () => {
    expect(variantValueService).toBeDefined();
  });

  it("repository should be defined", () => {
    expect(repository).toBeDefined();
  });

  it("getVariantValues successfully", async () => {
    expect(
      await variantValueService.getVariantValues(
        mockAdminGetVariantValuesRequest,
      ),
    ).toEqual(mockAdminGetVariantValuesResponse);
  });

  it("getVariantValueById successfully", async () => {
    expect(
      await variantValueService.getVariantValueById(
        ENUM_PREFIX_DATABASE.VTE + "123",
      ),
    ).toEqual(mockAdminGetVariantValueResponse);
  });

  it("createVariantValue successfully", async () => {
    expect(
      await variantValueService.createVariantValue(
        mockAdminCreateVariantValueRequest,
      ),
    ).toBeUndefined();
  });

  it("updateVariantValue successfully", async () => {
    expect(
      await variantValueService.updateVariantValue(
        ENUM_PREFIX_DATABASE.VTE + "123",
        mockAdminUpdateVariantValueRequest,
      ),
    ).toBeUndefined();
  });

  it("deleteVariantValue successfully", async () => {
    expect(
      await variantValueService.deleteVariantValue(
        ENUM_PREFIX_DATABASE.VTE + "123",
      ),
    ).toBeUndefined();
  });
});
