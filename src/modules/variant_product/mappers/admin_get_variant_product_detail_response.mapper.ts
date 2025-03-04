import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { VariantProductEntity } from "../entities/variant_product.entity";
import { AdminGetVariantProductDetailResponseDto } from "../dtos/services";

export class AdminGetVariantProductDetailReponseMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        VariantProductEntity,
        AdminGetVariantProductDetailResponseDto,
        forMember(
          (dest: AdminGetVariantProductDetailResponseDto) =>
            dest.variantProductId,
          mapFrom((src: VariantProductEntity) => src.id),
        ),
        forMember(
          (dest: AdminGetVariantProductDetailResponseDto) =>
            dest.variantProductName,
          mapFrom((src: VariantProductEntity) => src.name),
        ),
        forMember(
          (dest: AdminGetVariantProductDetailResponseDto) => dest.basePrice,
          mapFrom((src: VariantProductEntity) => Number(src.base_price)),
        ),
        forMember(
          (dest: AdminGetVariantProductDetailResponseDto) =>
            dest.promotionPrice,
          mapFrom((src: VariantProductEntity) => Number(src.promotion_price)),
        ),
        forMember(
          (dest: AdminGetVariantProductDetailResponseDto) =>
            dest.promotionPrice,
          mapFrom((src: VariantProductEntity) => src.promotion_price),
        ),
        forMember(
          (dest: AdminGetVariantProductDetailResponseDto) =>
            dest.variantTypeValues,
          mapFrom((src: VariantProductEntity) =>
            src.variant_type_values.map((item) => ({
              variantTypeValueId: item.id,
              variantTypeValueName: item.name,
            })),
          ),
        ),
        forMember(
          (dest: AdminGetVariantProductDetailResponseDto) => dest.stock,
          mapFrom((src: VariantProductEntity) =>
            src.inventories.reduce((sum, inv) => sum + inv.stock, 0),
          ),
        ),
        forMember(
          (dest: AdminGetVariantProductDetailResponseDto) => dest.isActive,
          mapFrom((src: VariantProductEntity) => src.is_active),
        ),
        forMember(
          (dest: AdminGetVariantProductDetailResponseDto) => dest.createdAt,
          mapFrom((src: VariantProductEntity) => src.created_at),
        ),
      );
    };
  }
}
