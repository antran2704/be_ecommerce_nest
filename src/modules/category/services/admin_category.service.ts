import { Mapper } from "@automapper/core";
import { IAdminCategoryService } from "../interfaces/admin_category_service.interface";
import { AdminCategoryRepository } from "../repositories/admin_category.repository";
import { InjectMapper } from "@automapper/nestjs";
import {
  AdminCreateCategoryRequestDto,
  AdminGetCategoriesByIndexRequestDto,
  AdminGetCategoriesRequestDto,
  AdminGetCategoriesResponseDto,
  AdminGetCategoryResponseDto,
  AdminGetChildCategoryResponseDto,
  AdminUpdateCategoryRequestDto,
} from "../dtos/services";
import { CategoryEntity } from "../entities/category.entity";
import { GetDatabaseDefaultID } from "~/helpers/database";
import { ENUM_PREFIX_DATABASE } from "~/common/database/enums/perfix.enum";
import {
  AdminCreateCategoryDto,
  AdminGetChildCategoryDto,
  AdminUpdateCategoryDto,
} from "../dtos/repositories";
import { IEntitesAndPaginationReponse } from "~/common/pagination/interfaces/pagination.interface";
import { BadRequestException } from "@nestjs/common";
import { CATEGORY_ERROR_MESSAGES } from "../messages/category.error";
import { stringToSlug } from "~/helpers/format";

export class AdminCategoryService implements IAdminCategoryService {
  constructor(
    private readonly categoryRepository: AdminCategoryRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async getCategories(
    payload: AdminGetCategoriesRequestDto,
  ): Promise<IEntitesAndPaginationReponse<AdminGetCategoriesResponseDto>> {
    const { data, pagination } =
      await this.categoryRepository.findCategories(payload);

    const formatData = this.mapper.mapArray(
      data,
      CategoryEntity,
      AdminGetCategoriesResponseDto,
    );

    return { data: formatData, pagination };
  }

  async getCategoriesByIndex(
    dto: AdminGetCategoriesByIndexRequestDto,
  ): Promise<AdminGetCategoriesResponseDto[]> {
    const data = await this.categoryRepository.findCategoriesByIndex(dto);

    const formatData = this.mapper.mapArray(
      data,
      CategoryEntity,
      AdminGetCategoriesResponseDto,
    );

    return formatData;
  }

  async getChildren(id: string): Promise<AdminGetChildCategoryResponseDto[]> {
    const data = await this.categoryRepository.findChildren(id);
    const formatData = this.mapper.mapArray(
      data,
      AdminGetChildCategoryDto,
      AdminGetChildCategoryResponseDto,
    );

    return formatData;
  }

  async getCategoryById(id: string): Promise<AdminGetCategoryResponseDto> {
    const category = await this.categoryRepository.findCategoryById(id);

    if (!category)
      throw new BadRequestException(CATEGORY_ERROR_MESSAGES.CATEGORY_NOT_FOUND);

    const formatData = this.mapper.map(
      category,
      CategoryEntity,
      AdminGetCategoryResponseDto,
    );
    return formatData;
  }

  async getCategoryEntityById(id: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findCategoryById(id);

    if (!category)
      throw new BadRequestException(CATEGORY_ERROR_MESSAGES.CATEGORY_NOT_FOUND);

    return category;
  }

  async createCategory(payload: AdminCreateCategoryRequestDto): Promise<void> {
    const category = await this.categoryRepository.findCategoryByName(
      payload.categoryName,
    );

    if (category)
      throw new BadRequestException(
        CATEGORY_ERROR_MESSAGES.CATEGORY_NAME_EXISTED,
      );

    const categoryId = GetDatabaseDefaultID(ENUM_PREFIX_DATABASE.CA);
    const categoryIndex: number = 0;

    const formatData: AdminCreateCategoryDto = {
      id: categoryId,
      category_index: categoryIndex,
      name: payload.categoryName,
      slug: payload.categorySlug
        ? stringToSlug(payload.categorySlug)
        : stringToSlug(payload.categoryName),
      thumbnail: payload.categoryThumbnail,
    };

    // check if have parentId
    if (payload.categoryParentId) {
      const categoryParent = await this.categoryRepository.findCategoryById(
        payload.categoryParentId,
      );

      if (!categoryParent) {
        throw new BadRequestException(
          CATEGORY_ERROR_MESSAGES.CATEGORY_PARENT_NOT_FOUND,
        );
      }

      // set parentId
      formatData.parent_id = payload.categoryParentId;

      // set category index
      formatData.category_index = categoryParent.category_index + 1;
    }

    await this.categoryRepository.createCategory(formatData);
  }

  async updateIndexChildren(id: string, indexParent: number): Promise<void> {
    const children = await this.categoryRepository.findChildren(id);

    for (const child of children) {
      const formatChildData: AdminUpdateCategoryDto = {
        category_index: indexParent + 1,
      };

      this.categoryRepository.updateCategory(child.id, formatChildData);

      if (child.children_count > 0) {
        this.updateIndexChildren(child.id, indexParent + 1);
      }
    }
  }

  async updateCategory(id: string, payload: AdminUpdateCategoryRequestDto) {
    const category = await this.categoryRepository.findCategoryById(id);

    if (!category)
      throw new BadRequestException(CATEGORY_ERROR_MESSAGES.CATEGORY_NOT_FOUND);

    const categoryName = await this.categoryRepository.findCategoryByName(
      payload.categoryName,
    );

    if (categoryName && categoryName.id !== id)
      throw new BadRequestException(
        CATEGORY_ERROR_MESSAGES.CATEGORY_NAME_EXISTED,
      );

    const formatData: AdminUpdateCategoryDto = {
      name: payload.categoryName,
      slug: payload.categorySlug
        ? stringToSlug(payload.categorySlug)
        : stringToSlug(payload.categoryName),
    };

    if (payload.categoryThumbnail) {
      formatData.thumbnail = payload.categoryThumbnail;
    }

    // check if update parentId
    if (
      payload.categoryParentId &&
      category.parent_id !== payload.categoryParentId
    ) {
      const categoryParent = await this.categoryRepository.findCategoryById(
        payload.categoryParentId,
      );

      if (!categoryParent) {
        throw new BadRequestException(
          CATEGORY_ERROR_MESSAGES.CATEGORY_PARENT_NOT_FOUND,
        );
      }

      // set parentId
      formatData.parent_id = payload.categoryParentId;

      // set category index
      formatData.category_index = categoryParent.category_index + 1;

      // update category index for child category
      this.updateIndexChildren(id, formatData.category_index);
    }

    // check if old data have parentId and update parentId === null
    if (payload.categoryParentId === null && category.parent_id) {
      // set parentId
      formatData.parent_id = null;

      // set category index
      formatData.category_index = 0;

      // update category index for child category
      this.updateIndexChildren(id, formatData.category_index);
    }

    await this.categoryRepository.updateCategory(id, formatData);
  }

  async deleteCategory(id: string): Promise<void> {
    const category = await this.categoryRepository.findCategoryById(id);

    if (!category)
      throw new BadRequestException(CATEGORY_ERROR_MESSAGES.CATEGORY_NOT_FOUND);

    await this.categoryRepository.deleteCategory(id);
  }
}
