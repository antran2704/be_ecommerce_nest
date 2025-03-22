import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { CartItemEntity } from "../entities/cart_item.entity";
import { GetCartItemResponseDto } from "../dtos/services";

export class GetCartItemReponseMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        CartItemEntity,
        GetCartItemResponseDto,
        forMember(
          (dest: GetCartItemResponseDto) => dest?.cartItemId,
          mapFrom((src: CartItemEntity) => src.id),
        ),
        forMember(
          (dest: GetCartItemResponseDto) => dest?.product,
          mapFrom((src: CartItemEntity) => ({
            productId: src.product.id,
            name: src.product.name,
          })),
        ),
        forMember(
          (dest: GetCartItemResponseDto) => dest?.variantProduct,
          mapFrom((src: CartItemEntity) => {
            if (src.variant_product) {
              return {
                variantProductId: src.variant_product.id,
                name: src.variant_product.name,
                options: src.variant_product.variant_type_values
                  ? src.variant_product.variant_type_values.map((item) => ({
                      id: item.id,
                      name: item.name,
                    }))
                  : [],
              };
            }

            return null;
          }),
        ),
        forMember(
          (dest: GetCartItemResponseDto) => dest?.thumbnail,
          mapFrom((src: CartItemEntity) => {
            if (src.variant_product) {
              return src.variant_product.thumbnail || null;
            }

            return src.product.thumbnail || null;
          }),
        ),
        forMember(
          (dest: GetCartItemResponseDto) => dest?.price,
          mapFrom((src: CartItemEntity) => {
            if (src.variant_product) {
              return src.variant_product.base_price
                ? Number(src.variant_product.base_price)
                : 0;
            }

            return src.product.base_price ? Number(src.product.base_price) : 0;
          }),
        ),
        forMember(
          (dest: GetCartItemResponseDto) => dest?.promotionPrice,
          mapFrom((src: CartItemEntity) => {
            if (src.variant_product) {
              return src.variant_product.promotion_price
                ? Number(src.variant_product.promotion_price)
                : 0;
            }

            return src.product.promotion_price
              ? Number(src.product.promotion_price)
              : 0;
          }),
        ),
        forMember(
          (dest: GetCartItemResponseDto) => dest?.inventory,
          mapFrom((src: CartItemEntity) => {
            if (src.variant_product) {
              return src.variant_product.inventories
                ? src.variant_product.inventories.reduce(
                    (sum, inv) => sum + inv.stock,
                    0,
                  )
                : 0;
            }

            return src.product.inventories
              ? src.product.inventories.reduce((sum, inv) => sum + inv.stock, 0)
              : 0;
          }),
        ),
      );
    };
  }
}
