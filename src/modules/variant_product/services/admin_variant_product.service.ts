import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { BadRequestException } from "@nestjs/common";

import { GetDatabaseDefaultID } from "~/helpers/database";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";

import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { IAdminVariantProductService } from "../interfaces/admin_variant_product_service.interface";
import { AdminVariantProductRepository } from "../repositories/admin_variant_product.repository";
import { AdminInventoryService } from "~/modules/inventory/services/admin_inventory.service";
import {
  AdminCreateVariantProductRequestDto,
  AdminGetVariantProductDetailResponseDto,
  AdminGetVariantProductListResponseDto,
  AdminGetVariantProductsRequestDto,
  AdminUpdateVariantProductRequestDto,
} from "../dtos/services";
import { VariantProductEntity } from "../entities/variant_product.entity";
import { AdminCreateVariantProductDto } from "../dtos/repositories";
import { AdminProductService } from "~/modules/product/services/admin_product.service";
import { VARIANT_PRODUCT_ERROR_MESSAGES } from "../messages/varaint_product.error";

export class AdminVariantProductService implements IAdminVariantProductService {
  constructor(
    private readonly variantProductRepository: AdminVariantProductRepository,
    private readonly productService: AdminProductService,
    private readonly inventoryService: AdminInventoryService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async getVariantProducts(
    payload: AdminGetVariantProductsRequestDto,
  ): Promise<
    IEntitesAndPaginationReponse<AdminGetVariantProductListResponseDto>
  > {
    const { data, pagination } =
      await this.variantProductRepository.find(payload);
    const formatData = this.mapper.mapArray(
      data,
      VariantProductEntity,
      AdminGetVariantProductListResponseDto,
    );

    return { data: formatData, pagination };
  }

  async getVariantProductById(
    id: string,
  ): Promise<AdminGetVariantProductDetailResponseDto> {
    const data = await this.variantProductRepository.findById(id);

    const formatData = this.mapper.map(
      data,
      VariantProductEntity,
      AdminGetVariantProductDetailResponseDto,
    );

    return formatData;
  }

  async createVariantProduct(
    payload: AdminCreateVariantProductRequestDto,
  ): Promise<void> {
    const newId = GetDatabaseDefaultID(ENUM_PREFIX_DATABASE.VPR);

    const product = await this.productService.getProductEntityById(
      payload.productId,
    );

    const formatData: AdminCreateVariantProductDto = {
      id: newId,
      name: payload.variantProductName,
      thumbnail: payload.thumbnail,
      base_price: payload.basePrice || 0,
      promotion_price: payload.promotionPrice || 0,
      is_active: payload.isActive,
      product,
      variant_product_values: [],
    };

    await this.variantProductRepository.create(formatData);

    // create inventory
    await this.inventoryService.createProductInventory({
      productId: newId,
      stock: payload.stock,
    });
  }

  async updateVariantProduct(
    id: string,
    payload: AdminUpdateVariantProductRequestDto,
  ) {
    let product = await this.variantProductRepository.findById(id);

    if (!product)
      throw new BadRequestException(VARIANT_PRODUCT_ERROR_MESSAGES.NOT_FOUND);

    product = {
      ...product,
      name: payload.variantProductName,
      thumbnail: payload.thumbnail,
      base_price: payload.basePrice || 0,
      promotion_price: payload.promotionPrice || 0,
    };

    const currentInventory = await this.inventoryService.getProductInventory(
      product.id,
    );

    // check if have change stock
    if (payload.stock !== currentInventory) {
      await this.inventoryService.updateProductInventory(product.id, {
        stock: payload.stock,
      });
    }

    await this.variantProductRepository.save(product);
  }

  async enableVariantProduct(id: string): Promise<void> {
    const product = await this.variantProductRepository.findById(id);

    if (!product)
      throw new BadRequestException(VARIANT_PRODUCT_ERROR_MESSAGES.NOT_FOUND);

    if (product.is_active)
      throw new BadRequestException(VARIANT_PRODUCT_ERROR_MESSAGES.WAS_ENABLED);

    await this.variantProductRepository.enable(id);
  }

  async disableVariantProduct(id: string): Promise<void> {
    const product = await this.variantProductRepository.findById(id);

    if (!product)
      throw new BadRequestException(VARIANT_PRODUCT_ERROR_MESSAGES.NOT_FOUND);

    if (!product.is_active)
      throw new BadRequestException(
        VARIANT_PRODUCT_ERROR_MESSAGES.WAS_DISABLED,
      );

    await this.variantProductRepository.disable(id);
  }

  async deleteVariantProduct(id: string): Promise<void> {
    const product = await this.variantProductRepository.findById(id);

    if (!product)
      throw new BadRequestException(VARIANT_PRODUCT_ERROR_MESSAGES.NOT_FOUND);

    await this.variantProductRepository.delete(id);
  }
}
