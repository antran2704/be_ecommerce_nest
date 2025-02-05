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
          (dest: AdminGetCategoryResponseDto) => dest?.categoryIndex,
          mapFrom((src: CategoryEntity) => src.category_index),
        ),
        forMember(
          (dest: AdminGetCategoryResponseDto) => dest?.createdAt,
          mapFrom((src: CategoryEntity) => src.created_at),
        ),
      );
    };
  }
}
