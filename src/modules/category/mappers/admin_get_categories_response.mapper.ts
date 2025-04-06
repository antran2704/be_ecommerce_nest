import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { CategoryEntity } from "../entities/category.entity";
import { AdminGetCategoriesResponseDto } from "../dtos/services";
import { getFullImagePath } from "~/common/multer/helpers";

export class AdminGetCategoriesReponseMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        CategoryEntity,
        AdminGetCategoriesResponseDto,
        forMember(
          (dest: AdminGetCategoriesResponseDto) => dest?.categoryId,
          mapFrom((src: CategoryEntity) => src.id),
        ),
        forMember(
          (dest: AdminGetCategoriesResponseDto) => dest?.categoryName,
          mapFrom((src: CategoryEntity) => src.name),
        ),
        forMember(
          (dest: AdminGetCategoriesResponseDto) => dest?.categoryThumbnail,
          mapFrom((src: CategoryEntity) =>
            src.thumbnail ? getFullImagePath(src.thumbnail) : null,
          ),
        ),
        forMember(
          (dest: AdminGetCategoriesResponseDto) => dest?.childrenCount,
          mapFrom((src: CategoryEntity) => src.children.length),
        ),
        forMember(
          (dest: AdminGetCategoriesResponseDto) => dest?.createdAt,
          mapFrom((src: CategoryEntity) => src.created_at),
        ),
      );
    };
  }
}
