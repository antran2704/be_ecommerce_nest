import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { CategoryEntity } from "../entities/category.entity";
import { UserGetCategoryResponseDto } from "../dtos/services";

export class UserGetCategoryReponseMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        CategoryEntity,
        UserGetCategoryResponseDto,
        forMember(
          (dest: UserGetCategoryResponseDto) => dest?.categoryId,
          mapFrom((src: CategoryEntity) => src.id),
        ),
        forMember(
          (dest: UserGetCategoryResponseDto) => dest?.categoryName,
          mapFrom((src: CategoryEntity) => src.name),
        ),
        forMember(
          (dest: UserGetCategoryResponseDto) => dest?.categoryIndex,
          mapFrom((src: CategoryEntity) => src.category_index),
        ),
        forMember(
          (dest: UserGetCategoryResponseDto) => dest?.createdAt,
          mapFrom((src: CategoryEntity) => src.created_at),
        ),
      );
    };
  }
}
