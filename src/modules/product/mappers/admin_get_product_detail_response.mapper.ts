import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";

import { AdminGetProductDetailResponseDto } from "../dtos/services";
import AdminDetailProductDto from "../dtos/repositories/admin_detail_product.dto";
import { getFullFilePath } from "~/common/multer/helpers";

export class AdminGetProductDetailReponseMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        AdminDetailProductDto,
        AdminGetProductDetailResponseDto,
        forMember(
          (dest: AdminGetProductDetailResponseDto) => dest.productId,
          mapFrom((src: AdminDetailProductDto) => src.id),
        ),
        forMember(
          (dest: AdminGetProductDetailResponseDto) => dest.productName,
          mapFrom((src: AdminDetailProductDto) => src.name),
        ),
        forMember(
          (dest: AdminGetProductDetailResponseDto) => dest?.thumbnail,
          mapFrom((src: AdminDetailProductDto) =>
            src.thumbnail ? getFullFilePath(src.thumbnail) : null,
          ),
        ),
        forMember(
          (dest: AdminGetProductDetailResponseDto) => dest?.gallery,
          mapFrom((src: AdminDetailProductDto) =>
            src.gallery ? src.gallery.map((x) => getFullFilePath(x)) : [],
          ),
        ),
        forMember(
          (dest: AdminGetProductDetailResponseDto) => dest.description,
          mapFrom((src: AdminDetailProductDto) => src.description),
        ),
        forMember(
          (dest: AdminGetProductDetailResponseDto) => dest.basePrice,
          mapFrom((src: AdminDetailProductDto) => Number(src.base_price)),
        ),
        forMember(
          (dest: AdminGetProductDetailResponseDto) => dest.promotionPrice,
          mapFrom((src: AdminDetailProductDto) => Number(src.promotion_price)),
        ),
        forMember(
          (dest: AdminGetProductDetailResponseDto) => dest.promotionPrice,
          mapFrom((src: AdminDetailProductDto) => Number(src.promotion_price)),
        ),
        forMember(
          (dest: AdminGetProductDetailResponseDto) => dest.stock,
          mapFrom((src: AdminDetailProductDto) =>
            src.inventories
              ? src.inventories.reduce((sum, inv) => sum + inv.stock, 0)
              : 0,
          ),
        ),
        forMember(
          (dest: AdminGetProductDetailResponseDto) => dest.mainCategoryId,
          mapFrom((src: AdminDetailProductDto) =>
            src.main_category ? src.main_category.id : null,
          ),
        ),
        forMember(
          (dest: AdminGetProductDetailResponseDto) => dest.mainCategoryName,
          mapFrom((src: AdminDetailProductDto) =>
            src.main_category ? src.main_category.name : null,
          ),
        ),
        forMember(
          (dest: AdminGetProductDetailResponseDto) => dest.subCategories,
          mapFrom((src: AdminDetailProductDto) =>
            src.sub_categories
              ? src.sub_categories.map((subCategory) => ({
                  categoryName: subCategory.name,
                  categoryId: subCategory.id,
                }))
              : [],
          ),
        ),
        forMember(
          (dest: AdminGetProductDetailResponseDto) => dest.options,
          mapFrom((src: AdminDetailProductDto) => src.options),
        ),
        forMember(
          (dest: AdminGetProductDetailResponseDto) => dest.isActive,
          mapFrom((src: AdminDetailProductDto) => src.is_active),
        ),
        forMember(
          (dest: AdminGetProductDetailResponseDto) => dest.createdAt,
          mapFrom((src: AdminDetailProductDto) => src.created_at),
        ),
      );
    };
  }
}
