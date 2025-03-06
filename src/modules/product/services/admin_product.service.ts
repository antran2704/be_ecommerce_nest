import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";

import { GetDatabaseDefaultID } from "~/helpers/database";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";

import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { IAdminProductService } from "../interfaces/admin_product_service.interface";
import { AdminProductRepository } from "../repositories/admin_product.repository";
import {
  AdminCreateProductRequestDto,
  AdminGetProductDetailResponseDto,
  AdminGetProductListResponseDto,
  AdminGetProductsRequestDto,
  AdminUpdateProductRequestDto,
} from "../dtos/services";
import { ProductEntity } from "../entities/product.entity";
import { AdminCategoryService } from "~/modules/category/services/admin_category.service";
import { AdminCreateProductDto } from "../dtos/repositories";
import { CategoryEntity } from "~/modules/category/entities/category.entity";
import { PRODUCT_ERROR_MESSAGES } from "../messages/product.error";
import { AdminProductInventoryService } from "~/modules/inventory/services/admin_product_inventory.service";
import { IAdminOptionProduct } from "../interfaces/admin_option_product.interface";
import AdminDetailProductDto from "../dtos/repositories/admin_detail_product.dto";

export class AdminProductService implements IAdminProductService {
  constructor(
    private readonly productRepository: AdminProductRepository,
    private readonly categoryService: AdminCategoryService,
    private readonly inventoryService: AdminProductInventoryService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async getProducts(
    payload: AdminGetProductsRequestDto,
  ): Promise<IEntitesAndPaginationReponse<AdminGetProductListResponseDto>> {
    const { data, pagination } = await this.productRepository.find(payload);
    const formatData = this.mapper.mapArray(
      data,
      ProductEntity,
      AdminGetProductListResponseDto,
    );

    return { data: formatData, pagination };
  }

  async getProductById(id: string): Promise<AdminGetProductDetailResponseDto> {
    const data = await this.productRepository.findById(id);

    if (!data) throw new NotFoundException(PRODUCT_ERROR_MESSAGES.NOT_FOUND);

    const variant_products = data.variant_products;
    const options: { [x: string]: IAdminOptionProduct } = {};

    for (const variantProduct of variant_products) {
      const variantTypeValues = variantProduct.variant_type_values;

      for (const variantTypeValue of variantTypeValues) {
        const variantType = variantTypeValue.variant_type;

        if (options[variantType.id]) {
          options[variantType.id].values.push({
            id: variantTypeValue.id,
            name: variantTypeValue.name,
          });
        } else {
          options[variantType.id] = {
            id: variantType.id,
            name: variantType.name,
            values: [
              {
                id: variantTypeValue.id,
                name: variantTypeValue.name,
              },
            ],
          };
        }
      }
    }

    const formatData = this.mapper.map(
      { ...data, options: Object.values(options) },
      AdminDetailProductDto,
      AdminGetProductDetailResponseDto,
    );

    return formatData;
  }

  async getProductEntityById(id: string): Promise<ProductEntity> {
    const data = await this.productRepository.findById(id);

    if (!data) throw new NotFoundException(PRODUCT_ERROR_MESSAGES.NOT_FOUND);

    return data;
  }

  async createProduct(payload: AdminCreateProductRequestDto): Promise<void> {
    const category = await this.categoryService.getCategoryEntityById(
      payload.mainCategoryId,
    );

    const subCategories: CategoryEntity[] = [];
    const newId = GetDatabaseDefaultID(ENUM_PREFIX_DATABASE.PR);

    const formatData: AdminCreateProductDto = {
      id: newId,
      name: payload.productName,
      description: payload.description,
      gallery: payload.gallery,
      thumbnail: payload.thumbnail,
      base_price: payload.basePrice || 0,
      promotion_price: payload.promotionPrice || 0,
      is_active: payload.isActive,
      main_category: category,
      sub_categories: subCategories,
    };

    // check if have sub categories
    if (payload.subCategories.length) {
      for (const id of payload.subCategories) {
        const subCategory =
          await this.categoryService.getCategoryEntityById(id);
        subCategories.push(subCategory);
      }

      formatData.sub_categories = subCategories;
    }

    await this.productRepository.create(formatData);

    // create inventory
    await this.inventoryService.createProductInventory({
      productId: newId,
      stock: payload.stock,
    });
  }

  async updateProduct(id: string, payload: AdminUpdateProductRequestDto) {
    let product = await this.productRepository.findById(id);

    if (!product)
      throw new BadRequestException(PRODUCT_ERROR_MESSAGES.NOT_FOUND);

    product = {
      ...product,
      name: payload.productName,
      description: payload.description,
      gallery: payload.gallery,
      thumbnail: payload.thumbnail,
      base_price: payload.basePrice || 0,
      promotion_price: payload.promotionPrice || 0,
    };

    // check if update mainCategoryId
    if (
      payload.mainCategoryId &&
      payload.mainCategoryId !== product.main_category.id
    ) {
      const category = await this.categoryService.getCategoryEntityById(
        payload.mainCategoryId,
      );

      product.main_category = category;
    }

    // check if have change sub categories
    if (payload.subCategories && payload.subCategories.length) {
      const subCategories: CategoryEntity[] = [];

      for (const id of payload.subCategories) {
        const subCategory =
          await this.categoryService.getCategoryEntityById(id);
        subCategories.push(subCategory);
      }

      product.sub_categories = subCategories;
    }

    // check if have change sub categories to empty
    if (payload.subCategories && !payload.subCategories.length) {
      product.sub_categories = [];
    }

    const currentInventory = await this.inventoryService.getProductInventory(
      product.id,
    );

    await this.productRepository.save(product);

    // check if have change stock
    if (payload.stock !== currentInventory) {
      await this.inventoryService.updateProductInventory(id, {
        stock: payload.stock,
      });
    }
  }

  async enableProduct(id: string): Promise<void> {
    const product = await this.productRepository.findById(id);

    if (!product)
      throw new BadRequestException(PRODUCT_ERROR_MESSAGES.NOT_FOUND);

    if (product.is_active)
      throw new BadRequestException(PRODUCT_ERROR_MESSAGES.WAS_ENABLED);

    await this.productRepository.enable(id);
  }

  async disableProduct(id: string): Promise<void> {
    const product = await this.productRepository.findById(id);

    if (!product)
      throw new BadRequestException(PRODUCT_ERROR_MESSAGES.NOT_FOUND);

    if (!product.is_active)
      throw new BadRequestException(PRODUCT_ERROR_MESSAGES.WAS_DISABLED);

    await this.productRepository.disable(id);
  }

  async deleteProduct(id: string): Promise<void> {
    const product = await this.productRepository.findById(id);

    if (!product)
      throw new BadRequestException(PRODUCT_ERROR_MESSAGES.NOT_FOUND);

    await this.productRepository.delete(id);
  }
}
