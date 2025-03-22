import { Test, TestingModule } from "@nestjs/testing";
import { createMapper } from "@automapper/core";
import { classes } from "@automapper/classes";
import { AutomapperModule, getMapperToken } from "@automapper/nestjs";

import { CartRepository } from "../repositories/cart.repository";
import { mockCartRepository } from "../mocks/cart_repository.mock";

import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";
import { CartItemService } from "../services/cart_item.service";
import { CartItemRepository } from "../repositories/cart_item.repository";
import { mockCartItemRepository } from "../mocks/cart_item_repository.mock";
import { AdminVariantProductRepository } from "~/modules/variant_product/repositories/admin_variant_product.repository";
import { mockAdminVariantProductRepository } from "~/modules/variant_product/mocks/admin_variant_product_repository.mock";
import { AdminProductRepository } from "~/modules/product/repositories/admin_product.repository";
import { mockAdminProductRepository } from "~/modules/product/mocks/admin_product_repository.mock";
import {
  mockCreateCartItemRequest,
  mockGetCartItemsRequest,
  mockGetCartItemsResponse,
} from "../mocks/cart_item_service.mock";
import { CartService } from "../services/cart.service";
import { AdminProductService } from "~/modules/product/services/admin_product.service";
import { AdminVariantProductService } from "~/modules/variant_product/services/admin_variant_product.service";
import { AdminCategoryService } from "~/modules/category/services/admin_category.service";
import { AdminProductInventoryService } from "~/modules/inventory/services/admin_product_inventory.service";
import { AdminVariantProductInventoryService } from "~/modules/inventory/services/admin_variant_product_inventory.service";
import { AdminVariantTypeService } from "~/modules/variant_type/services/admin_variant_type.service";
import { AdminVariantTypeValueService } from "~/modules/variant_type_value/services/admin_variant_type.service";
import { AdminCategoryRepository } from "~/modules/category/repositories/admin_category.repository";
import { mockAdminCategoryRepository } from "~/modules/category/mocks/admin_category_repository.mock";
import { AdminProductInventoryRepository } from "~/modules/inventory/repositories/admin_product_inventory.repository";
import {
  mockAdminProductInventoryRepository,
  mockAdminVariantProductInventoryRepository,
} from "~/modules/inventory/mocks/admin_inventory_repository.mock";
import { AdminVariantProductInventoryRepository } from "~/modules/inventory/repositories/admin_variant_product_inventory.repository";
import { AdminVariantTypeRepository } from "~/modules/variant_type/repositories/admin_variant_type.repository";
import { mockAdminVariantTypeRepository } from "~/modules/variant_type/mocks/admin_variant_type_repository.mock";
import { AdminVariantTypeValueRepository } from "~/modules/variant_type_value/repositories/admin_variant_type.repository";
import { mockAdminVariantTypeValueRepository } from "~/modules/variant_type_value/mocks/admin_variant_type_repository.mock";
import { mockProductEntity } from "~/modules/product/mocks/product_entity.mock";
import { ProductEntity } from "~/modules/product/entities/product.entity";
import { GetCartItemReponseMapper } from "../mappers/get_cart_item_response";
import { AdminGetVariantProductDetailReponseMapper } from "~/modules/variant_product/mappers/admin_get_variant_product_detail_response.mapper";
import { mockVariantProductEntity } from "~/modules/variant_product/mocks/variant_product_entity.mock";
import { VariantProductEntity } from "~/modules/variant_product/entities/variant_product.entity";

describe("CartItemService test case", () => {
  let service: CartItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AutomapperModule],
      providers: [
        CartItemService,
        CartService,
        AdminProductService,
        AdminVariantProductService,
        AdminCategoryService,
        AdminProductInventoryService,
        AdminVariantProductInventoryService,
        AdminVariantTypeService,
        AdminVariantTypeValueService,
        GetCartItemReponseMapper,
        AdminGetVariantProductDetailReponseMapper,
        {
          provide: CartRepository,
          useValue: mockCartRepository,
        },
        {
          provide: CartItemRepository,
          useValue: mockCartItemRepository,
        },
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

    service = module.get<CartItemService>(CartItemService);
  });

  it("service should be defined", () => {
    expect(service).toBeDefined();
  });

  it("getCarts successfully", async () => {
    expect(await service.getCartItems(mockGetCartItemsRequest)).toEqual(
      mockGetCartItemsResponse,
    );
  });

  it("createCartItem successfully", async () => {
    jest
      .spyOn(mockCartItemRepository, "findByProductId")
      .mockResolvedValueOnce(null);

    jest.spyOn(mockAdminProductRepository, "findById").mockResolvedValueOnce({
      ...mockProductEntity,
      inventories: [{ id: "123", stock: 10 } as any],
    } as ProductEntity);

    jest
      .spyOn(mockAdminVariantProductRepository, "findById")
      .mockResolvedValueOnce({
        ...mockVariantProductEntity,
        inventories: [{ id: "123", stock: 10 } as any],
      } as VariantProductEntity);

    expect(
      await service.createCartItem(mockCreateCartItemRequest),
    ).toBeUndefined();
  });

  it("updateCartItemQuantity", async () => {
    jest.spyOn(mockAdminProductRepository, "findById").mockResolvedValueOnce({
      ...mockProductEntity,
      inventories: [{ id: "123", stock: 10 } as any],
    } as ProductEntity);

    jest
      .spyOn(mockAdminVariantProductRepository, "findById")
      .mockResolvedValueOnce({
        ...mockVariantProductEntity,
        inventories: [{ id: "123", stock: 10 } as any],
      } as VariantProductEntity);

    expect(
      await service.updateCartItemQuantity(ENUM_PREFIX_DATABASE.CARI + "123", {
        quantity: 1,
      }),
    ).toBeUndefined();
  });

  it("deleteCartItem successfully", async () => {
    expect(
      await service.deleteCartItem(ENUM_PREFIX_DATABASE.CARI + "123"),
    ).toBeUndefined();
  });
});
