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
          mapFrom((src: ProductEntity) => src.base_price),
        ),
        forMember(
          (dest: AdminGetProductListResponseDto) => dest.promotionPrice,
          mapFrom((src: ProductEntity) => src.promotion_price),
        ),
        forMember(
          (dest: AdminGetProductListResponseDto) => dest.mainCategoryId,
          mapFrom((src: ProductEntity) => src.main_category_id),
        ),
        forMember(
          (dest: AdminGetProductListResponseDto) => dest.mainCategoryName, // TODO: check if can't get category
          mapFrom((src: ProductEntity) => src.main_category.name),
        ),
        forMember(
          (dest: AdminGetProductListResponseDto) => dest.createdAt,
          mapFrom((src: ProductEntity) => src.created_at),
        ),
      );
    };
  }
}
