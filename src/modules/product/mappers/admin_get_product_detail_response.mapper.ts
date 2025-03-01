import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";

import { ProductEntity } from "../entities/product.entity";
import { AdminGetProductDetailResponseDto } from "../dtos/services";

export class AdminGetProductDetailReponseMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        ProductEntity,
        AdminGetProductDetailResponseDto,
        forMember(
          (dest: AdminGetProductDetailResponseDto) => dest.productId,
          mapFrom((src: ProductEntity) => src.id),
        ),
        forMember(
          (dest: AdminGetProductDetailResponseDto) => dest.productName,
          mapFrom((src: ProductEntity) => src.name),
        ),
        forMember(
          (dest: AdminGetProductDetailResponseDto) => dest.description,
          mapFrom((src: ProductEntity) => src.description),
        ),
        forMember(
          (dest: AdminGetProductDetailResponseDto) => dest.basePrice,
          mapFrom((src: ProductEntity) => Number(src.base_price)),
        ),
        forMember(
          (dest: AdminGetProductDetailResponseDto) => dest.promotionPrice,
          mapFrom((src: ProductEntity) => Number(src.promotion_price)),
        ),
        forMember(
          (dest: AdminGetProductDetailResponseDto) => dest.promotionPrice,
          mapFrom((src: ProductEntity) => src.promotion_price),
        ),
        forMember(
          (dest: AdminGetProductDetailResponseDto) => dest.gallery,
          mapFrom((src: ProductEntity) => src.gallery),
        ),
        forMember(
          (dest: AdminGetProductDetailResponseDto) => dest.stock,
          mapFrom((src: ProductEntity) =>
            src.inventories.reduce((sum, inv) => sum + inv.stock, 0),
          ),
        ),
        forMember(
          (dest: AdminGetProductDetailResponseDto) => dest.mainCategoryId,
          mapFrom((src: ProductEntity) =>
            src.main_category ? src.main_category.id : null,
          ),
        ),
        forMember(
          (dest: AdminGetProductDetailResponseDto) => dest.mainCategoryName,
          mapFrom((src: ProductEntity) =>
            src.main_category ? src.main_category.name : null,
          ),
        ),
        forMember(
          (dest: AdminGetProductDetailResponseDto) => dest.subCategories,
          mapFrom((src: ProductEntity) =>
            src.sub_categories.length
              ? src.sub_categories.map((subCategory) => ({
                  categoryName: subCategory.name,
                  categoryId: subCategory.id,
                }))
              : [],
          ),
        ),
        forMember(
          (dest: AdminGetProductDetailResponseDto) => dest.isActive,
          mapFrom((src: ProductEntity) => src.is_active),
        ),
        forMember(
          (dest: AdminGetProductDetailResponseDto) => dest.createdAt,
          mapFrom((src: ProductEntity) => src.created_at),
        ),
      );
    };
  }
}
