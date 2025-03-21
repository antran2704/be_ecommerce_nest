import { Test, TestingModule } from "@nestjs/testing";
import { createMapper } from "@automapper/core";
import { classes } from "@automapper/classes";
import { AutomapperModule, getMapperToken } from "@automapper/nestjs";
import { BadRequestException } from "@nestjs/common";

import { CartService } from "../services/cart.service";
import { GetCartReponseMapper } from "../mappers/get_cart_response";
import { CartRepository } from "../repositories/cart.repository";
import { mockCartRepository } from "../mocks/cart_repository.mock";
import {
  mockCreateCartRequest,
  mockGetCartResponse,
  mockGetCartsRequest,
  mockGetCartsResponse,
} from "../mocks/admin_product_service.mock";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";
import { CART_ERROR_MESSAGES } from "../messages/cart";
import { mockCartEntity } from "../mocks/cart_entity.mock";
import { CartEntity } from "../entities/cart.entity";

describe("CartService test case", () => {
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AutomapperModule],
      providers: [
        CartService,
        GetCartReponseMapper,
        {
          provide: CartRepository,
          useValue: mockCartRepository,
        },
        {
          provide: getMapperToken(),
          useValue: createMapper({
            strategyInitializer: classes(),
          }),
        },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  it("service should be defined", () => {
    expect(service).toBeDefined();
  });

  it("getCarts successfully", async () => {
    expect(await service.getCarts(mockGetCartsRequest)).toEqual(
      mockGetCartsResponse,
    );
  });

  it("getCartByUserId successfully", async () => {
    expect(
      await service.getCartByUserId(ENUM_PREFIX_DATABASE.US + "123"),
    ).toEqual(mockGetCartResponse);
  });

  it("createCart successfully", async () => {
    jest.spyOn(mockCartRepository, "findByUserId").mockResolvedValueOnce(null);

    expect(await service.createCart(mockCreateCartRequest)).toBeUndefined();
  });

  it("enableCart successfully", async () => {
    await expect(
      service.enableCart(ENUM_PREFIX_DATABASE.CAR + "123"),
    ).rejects.toThrow(new BadRequestException(CART_ERROR_MESSAGES.WAS_ENABLED));
  });

  it("disableCart successfully", async () => {
    expect(
      await service.disableCart(ENUM_PREFIX_DATABASE.CAR + "123"),
    ).toBeUndefined();
  });

  it("deleteCart successfully", async () => {
    expect(
      await service.deleteCart(ENUM_PREFIX_DATABASE.CAR + "123"),
    ).toBeUndefined();
  });
});
