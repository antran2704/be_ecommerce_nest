import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { BadRequestException } from "@nestjs/common";

import { GetDatabaseDefaultID } from "~/helpers/database";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";

import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { IAdminVariantProductService } from "../interfaces/admin_variant_product_service.interface";
import { AdminVariantProductRepository } from "../repositories/admin_variant_product.repository";
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
import { AdminVariantProductInventoryService } from "~/modules/inventory/services/admin_variant_product_inventory.service";
import { AdminVariantTypeValueService } from "~/modules/variant_type_value/services/admin_variant_type.service";
import { VariantTypeValueEntity } from "~/modules/variant_type_value/entities/variant_type_value.entity";

export class AdminVariantProductService implements IAdminVariantProductService {
  constructor(
    private readonly variantProductRepository: AdminVariantProductRepository,
    private readonly productService: AdminProductService,
    private readonly inventoryService: AdminVariantProductInventoryService,
    private readonly variantTypeValueService: AdminVariantTypeValueService,
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

    if (!data)
      throw new BadRequestException(VARIANT_PRODUCT_ERROR_MESSAGES.NOT_FOUND);

    const formatData = this.mapper.map(
      data,
      VariantProductEntity,
      AdminGetVariantProductDetailResponseDto,
    );

    return formatData;
  }

  async getVariantProductEntityById(id: string): Promise<VariantProductEntity> {
    const data = await this.variantProductRepository.findById(id);

    if (!data)
      throw new BadRequestException(VARIANT_PRODUCT_ERROR_MESSAGES.NOT_FOUND);

    return data;
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
      variant_type_values: [],
    };

    const variantValues: VariantTypeValueEntity[] = [];

    if (payload.variantValueIds.length) {
      for (let i = 0; i < payload.variantValueIds.length; i++) {
        const variantValueEntity =
          await this.variantTypeValueService.getVariantValueEntityById(
            payload.variantValueIds[i],
          );

        variantValues.push(variantValueEntity);
      }

      formatData.variant_type_values = variantValues;
    }

    // check if variant product is exited
    const isExited =
      await this.variantProductRepository.checkIsExited(formatData);

    console.log("check is exited:::", isExited);

    if (!isExited) {
      console.log("create new variant product:::");

      await this.variantProductRepository.create(formatData);

      // create inventory
      await this.inventoryService.createVariantProductInventory({
        varaintProductId: newId,
        stock: payload.stock,
      });
    }
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

    await this.variantProductRepository.save(product);

    const currentInventory =
      await this.inventoryService.getVariantProductInventory(product.id);

    // check if have change stock
    if (payload.stock !== currentInventory) {
      await this.inventoryService.updateVariantProductInventory(product.id, {
        stock: payload.stock,
      });
    }
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

  async deleteAllVariantProduct(productId: string): Promise<void> {
    await this.productService.getProductById(productId);

    await this.variantProductRepository.deleteAll(productId);
  }
}
