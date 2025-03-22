import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { AdminGetChildCategoryResponseDto } from "../dtos/services";
import { AdminGetChildCategoryDto } from "../dtos/repositories";

export class AdminGetChildCategoryReponseMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        AdminGetChildCategoryDto,
        AdminGetChildCategoryResponseDto,
        forMember(
          (dest: AdminGetChildCategoryResponseDto) => dest.categoryId,
          mapFrom((src: AdminGetChildCategoryDto) => src.id),
        ),
        forMember(
          (dest: AdminGetChildCategoryResponseDto) => dest.categoryName,
          mapFrom((src: AdminGetChildCategoryDto) => src.name),
        ),
        forMember(
          (dest: AdminGetChildCategoryResponseDto) => dest.categoryIndex,
          mapFrom((src: AdminGetChildCategoryDto) => src.category_index),
        ),
        forMember(
          (dest: AdminGetChildCategoryResponseDto) => dest.childrenCount,
          mapFrom((src: AdminGetChildCategoryDto) => src.children_count),
        ),
        forMember(
          (dest: AdminGetChildCategoryResponseDto) => dest.createdAt,
          mapFrom((src: AdminGetChildCategoryDto) => src.created_at),
        ),
      );
    };
  }
}
