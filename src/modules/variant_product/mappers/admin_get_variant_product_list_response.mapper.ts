import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { VariantProductEntity } from "../entities/variant_product.entity";
import { AdminGetVariantProductListResponseDto } from "../dtos/services";

export class AdminGetVariantProductListReponseMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        VariantProductEntity,
        AdminGetVariantProductListResponseDto,
        forMember(
          (dest: AdminGetVariantProductListResponseDto) =>
            dest.variantProductId,
          mapFrom((src: VariantProductEntity) => src.id),
        ),
        forMember(
          (dest: AdminGetVariantProductListResponseDto) =>
            dest.variantProductName,
          mapFrom((src: VariantProductEntity) => src.name),
        ),
        forMember(
          (dest: AdminGetVariantProductListResponseDto) => dest.basePrice,
          mapFrom((src: VariantProductEntity) => Number(src.base_price)),
        ),
        forMember(
          (dest: AdminGetVariantProductListResponseDto) => dest.promotionPrice,
          mapFrom((src: VariantProductEntity) => Number(src.promotion_price)),
        ),
        forMember(
          (dest: AdminGetVariantProductListResponseDto) => dest.stock,
          mapFrom((src: VariantProductEntity) =>
            src.inventories.reduce((sum, inv) => sum + inv.stock, 0),
          ),
        ),
        forMember(
          (dest: AdminGetVariantProductListResponseDto) => dest.isActive,
          mapFrom((src: VariantProductEntity) => src.is_active),
        ),
        forMember(
          (dest: AdminGetVariantProductListResponseDto) => dest.createdAt,
          mapFrom((src: VariantProductEntity) => src.created_at),
        ),
      );
    };
  }
}
