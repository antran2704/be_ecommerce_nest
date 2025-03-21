import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { BadRequestException } from "@nestjs/common";

import { GetDatabaseDefaultID } from "~/helpers/database";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";

import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { ICartItemService } from "../interfaces/cart_item_service.interface";
import { CartItemRepository } from "../repositories/cart_item.repository";
import {
  CreateCartItemRequestDto,
  GetCartItemResponseDto,
  GetCartItemsRequestDto,
  UpdateCartItemRequestDto,
} from "../dtos/services";
import { CartItemEntity } from "../entities/cart_item.entity";
import { CartService } from "./cart.service";
import { AdminProductService } from "~/modules/product/services/admin_product.service";
import { AdminVariantProductService } from "~/modules/variant_product/services/admin_variant_product.service";
import { CART_ITEM_ERROR_MESSAGES } from "../messages/cart_item";
import { CreateCartItemDto } from "../dtos/repositories";
import { PRODUCT_ERROR_MESSAGES } from "~/modules/product/messages/product.error";
import { InventoryEntity } from "~/modules/inventory/entities/inventory.entity";
import { VARIANT_PRODUCT_ERROR_MESSAGES } from "~/modules/variant_product/messages/varaint_product.error";

export class CartItemService implements ICartItemService {
  constructor(
    private readonly repository: CartItemRepository,
    private readonly cartService: CartService,
    private readonly productSerivce: AdminProductService,
    private readonly variantProductSerivce: AdminVariantProductService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async getCartItems(
    payload: GetCartItemsRequestDto,
  ): Promise<IEntitesAndPaginationReponse<GetCartItemResponseDto>> {
    const { data, pagination } = await this.repository.find(payload);
    const formatData = this.mapper.mapArray(
      data,
      CartItemEntity,
      GetCartItemResponseDto,
    );

    return { data: formatData, pagination };
  }

  async createCartItem(payload: CreateCartItemRequestDto): Promise<void> {
    const { cartId, productId, variantProductId, quantity } = payload;

    // Check cart is existed
    const cart = await this.cartService.getCartEntity(cartId);

    // check product is existed in cart item
    const isExitProductInCartItem = await this.repository.findByProductId(
      variantProductId ? variantProductId : productId,
    );

    if (isExitProductInCartItem) {
      throw new BadRequestException(CART_ITEM_ERROR_MESSAGES.IS_EXTED);
    }

    // Check product is existed
    const product = await this.productSerivce.getProductEntityById(productId);
    const productStock = product.inventories.reduce(
      (acc, inventory) => acc + inventory.stock,
      0,
    );

    // Check product stock
    if (productStock < quantity) {
      throw new BadRequestException(PRODUCT_ERROR_MESSAGES.OUT_OF_STOCK);
    }

    let variantProduct = null;

    // Check variant product is existed
    if (variantProductId) {
      variantProduct =
        await this.variantProductSerivce.getVariantProductById(
          variantProductId,
        );

      const variantProductStock = variantProduct.inventories.reduce(
        (acc: number, inventory: InventoryEntity) => acc + inventory.stock,
        0,
      );

      // Check variant product stock
      if (variantProductStock < quantity) {
        throw new BadRequestException(
          VARIANT_PRODUCT_ERROR_MESSAGES.OUT_OF_STOCK,
        );
      }
    }

    const cartItemId = GetDatabaseDefaultID(ENUM_PREFIX_DATABASE.CAR);

    const formatData: CreateCartItemDto = {
      id: cartItemId,
      cart,
      product,
      variant_product: variantProduct,
      quantity,
    };

    await this.repository.create(formatData);
  }

  async updateCartItem(
    id: string,
    payload: UpdateCartItemRequestDto,
  ): Promise<void> {
    const { productId, variantProductId, quantity } = payload;

    const cartItemEntity = await this.repository.findById(id);

    if (!cartItemEntity)
      throw new BadRequestException(CART_ITEM_ERROR_MESSAGES.NOT_FOUND);

    // Check product is existed
    const product = await this.productSerivce.getProductEntityById(productId);
    const productStock = product.inventories.reduce(
      (acc, inventory) => acc + inventory.stock,
      0,
    );

    // Check product stock
    if (productStock < quantity) {
      throw new BadRequestException(PRODUCT_ERROR_MESSAGES.OUT_OF_STOCK);
    }

    let variantProduct = null;

    // Check variant product is existed
    if (variantProductId) {
      variantProduct =
        await this.variantProductSerivce.getVariantProductById(
          variantProductId,
        );

      const variantProductStock = variantProduct.inventories.reduce(
        (acc: number, inventory: InventoryEntity) => acc + inventory.stock,
        0,
      );

      // Check variant product stock
      if (variantProductStock < quantity) {
        throw new BadRequestException(
          VARIANT_PRODUCT_ERROR_MESSAGES.OUT_OF_STOCK,
        );
      }
    }

    cartItemEntity.quantity = payload.quantity;

    await this.repository.save(cartItemEntity);
  }

  async deleteCartItem(id: string): Promise<void> {
    const cartItemEntity = await this.repository.findById(id);

    if (!cartItemEntity)
      throw new BadRequestException(CART_ITEM_ERROR_MESSAGES.NOT_FOUND);

    await this.repository.delete(id);
  }
}
