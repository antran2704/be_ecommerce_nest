import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";

import { ProductEntity } from "../entities/product.entity";
import { AdminGetProductListResponseDto } from "../dtos/services";

export class AdminGetProductListReponseMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        ProductEntity,
        AdminGetProductListResponseDto,
        forMember(
          (dest: AdminGetProductListResponseDto) => dest.productId,
          mapFrom((src: ProductEntity) => src.id),
        ),
        forMember(
          (dest: AdminGetProductListResponseDto) => dest.productName,
          mapFrom((src: ProductEntity) => src.name),
        ),
        forMember(
          (dest: AdminGetProductListResponseDto) => dest.basePrice,
          mapFrom((src: ProductEntity) => Number(src.base_price)),
        ),
        forMember(
          (dest: AdminGetProductListResponseDto) => dest.promotionPrice,
          mapFrom((src: ProductEntity) => Number(src.promotion_price)),
        ),
        forMember(
          (dest: AdminGetProductListResponseDto) => dest.mainCategoryId,
          mapFrom((src: ProductEntity) =>
            src.main_category ? src.main_category.id : null,
          ),
        ),
        forMember(
          (dest: AdminGetProductListResponseDto) => dest.mainCategoryName,
          mapFrom((src: ProductEntity) =>
            src.main_category ? src.main_category.name : null,
          ),
        ),
        forMember(
          (dest: AdminGetProductListResponseDto) => dest.isActive,
          mapFrom((src: ProductEntity) => src.is_active),
        ),
        forMember(
          (dest: AdminGetProductListResponseDto) => dest.createdAt,
          mapFrom((src: ProductEntity) => src.created_at),
        ),
      );
    };
  }
}
