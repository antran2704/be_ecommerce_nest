import { Test, TestingModule } from "@nestjs/testing";
import { createMapper } from "@automapper/core";
import { classes } from "@automapper/classes";
import { AutomapperModule, getMapperToken } from "@automapper/nestjs";
import { AdminVariantTypeService } from "../services/admin_variant_type.service";
import { AdminVariantTypeRepository } from "../repositories/admin_variant_type.repository";
import { AdminVariantTypeReponseMapper } from "../mappers/admin_get_variant_type_response.mapper";
import { mockAdminVariantTypeRepository } from "../mocks/admin_variant_type_repository.mock";
import {
  mockAdminCreateVariantTypeRequest,
  mockAdminGetVariantTypeResponse,
  mockAdminGetVariantTypesRequest,
  mockAdminGetVariantTypesResponse,
  mockAdminUpdateVariantTypeRequest,
} from "../mocks/admin_variant_type_service.mock";

describe("AdminVariantTypeService test case", () => {
  let variantTypeService: AdminVariantTypeService;
  let repository: AdminVariantTypeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AutomapperModule],
      providers: [
        AdminVariantTypeService,
        AdminVariantTypeReponseMapper,
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

    variantTypeService = module.get<AdminVariantTypeService>(
      AdminVariantTypeService,
    );
    repository = module.get<AdminVariantTypeRepository>(
      AdminVariantTypeRepository,
    );
  });

  it("variantTypeService should be defined", () => {
    expect(variantTypeService).toBeDefined();
  });

  it("repository should be defined", () => {
    expect(repository).toBeDefined();
  });

  it("getVariantTypes successfully", async () => {
    expect(
      await variantTypeService.getVariantTypes(mockAdminGetVariantTypesRequest),
    ).toEqual(mockAdminGetVariantTypesResponse);
  });

  it("getVariantTypeById successfully", async () => {
    expect(await variantTypeService.getVariantTypeById("VT123")).toEqual(
      mockAdminGetVariantTypeResponse,
    );
  });

  it("createVariantType successfully", async () => {
    expect(
      await variantTypeService.createVariantType(
        mockAdminCreateVariantTypeRequest,
      ),
    ).toBeUndefined();
  });

  it("updateVariantType successfully", async () => {
    expect(
      await variantTypeService.updateVariantType(
        "VT123",
        mockAdminUpdateVariantTypeRequest,
      ),
    ).toBeUndefined();
  });

  it("deleteVariantType successfully", async () => {
    expect(await variantTypeService.deleteVariantType("VT123")).toBeUndefined();
  });
});
