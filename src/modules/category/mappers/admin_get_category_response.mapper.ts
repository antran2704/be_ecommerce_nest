import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { CategoryEntity } from "../entities/category.entity";
import { AdminGetCategoryResponseDto } from "../dtos/services";

export class AdminGetCategoryReponseMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        CategoryEntity,
        AdminGetCategoryResponseDto,
        forMember(
          (dest: AdminGetCategoryResponseDto) => dest?.categoryId,
          mapFrom((src: CategoryEntity) => src.id),
        ),
        forMember(
          (dest: AdminGetCategoryResponseDto) => dest?.categoryName,
          mapFrom((src: CategoryEntity) => src.name),
        ),
        forMember(
          (dest: AdminGetCategoryResponseDto) => dest?.categoryParentId,
          mapFrom((src: CategoryEntity) => src.parent_id),
        ),
        forMember(
          (dest: AdminGetCategoryResponseDto) => dest?.categoryThumbnail,
          mapFrom((src: CategoryEntity) => src.thumbnail),
        ),
        forMember(
          (dest: AdminGetCategoryResponseDto) => dest?.categorySlug,
          mapFrom((src: CategoryEntity) => src.slug),
        ),
        forMember(
          (dest: AdminGetCategoryResponseDto) => dest?.childrenCount,
          mapFrom((src: CategoryEntity) => src.children.length),
        ),
        forMember(
          (dest: AdminGetCategoryResponseDto) => dest?.createdAt,
          mapFrom((src: CategoryEntity) => src.created_at),
        ),
      );
    };
  }
}
