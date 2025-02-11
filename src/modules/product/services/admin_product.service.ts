import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";

import { GetDatabaseDefaultID } from "~/helpers/database";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";

import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { BadRequestException } from "@nestjs/common";
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
import {
  AdminCreateProductDto,
  AdminUpdateProductDto,
} from "../dtos/repositories";
import { CategoryEntity } from "~/modules/category/entities/category.entity";
import { PRODUCT_ERROR_MESSAGES } from "../messages/product.error";

export class AdminProductService implements IAdminProductService {
  constructor(
    private readonly productRepository: AdminProductRepository,
    private readonly categoryService: AdminCategoryService,
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
    const category = await this.productRepository.findById(id);
    const formatData = this.mapper.map(
      category,
      ProductEntity,
      AdminGetProductDetailResponseDto,
    );

    return formatData;
  }

  async createProduct(payload: AdminCreateProductRequestDto): Promise<void> {
    const category = await this.categoryService.getCategoryEntityById(
      payload.mainCategoryId,
    );

    let subCategories: CategoryEntity[] = [];
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
      main_category_id: payload.mainCategoryId,
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
  }

  async updateProduct(id: string, payload: AdminUpdateProductRequestDto) {
    const product = await this.productRepository.findById(id);

    if (!product)
      throw new BadRequestException(PRODUCT_ERROR_MESSAGES.NOT_FOUND);

    const formatData: AdminUpdateProductDto = {
      name: payload.productName,
      description: payload.description,
      gallery: payload.gallery,
      thumbnail: payload.thumbnail,
      base_price: payload.basePrice || 0,
      promotion_price: payload.promotionPrice || 0,
      is_active: payload.isActive,
      main_category_id: payload.mainCategoryId,
    };

    // check if update mainCategoryId
    if (payload.mainCategoryId !== product.main_category_id) {
      const category = await this.categoryService.getCategoryEntityById(
        payload.mainCategoryId,
      );

      formatData.main_category_id = category.id;
    }

    // check if have sub categories
    if (payload.subCategories.length) {
      const subCategories: CategoryEntity[] = [];

      for (const id of payload.subCategories) {
        const subCategory =
          await this.categoryService.getCategoryEntityById(id);
        subCategories.push(subCategory);
      }

      formatData.sub_categories = subCategories;
    }

    await this.productRepository.update(id, formatData);
  }

  async deleteProduct(id: string): Promise<void> {
    const product = await this.productRepository.findById(id);

    if (!product)
      throw new BadRequestException(PRODUCT_ERROR_MESSAGES.NOT_FOUND);

    await this.productRepository.delete(id);
  }
}
