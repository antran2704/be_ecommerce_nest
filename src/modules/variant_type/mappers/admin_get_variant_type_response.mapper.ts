import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { VariantTypeEntity } from "../entities/variant_type.entity";
import { AdminGetVariantTypeResponseDto } from "../dtos/services";

export class AdminVariantTypeReponseMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        VariantTypeEntity,
        AdminGetVariantTypeResponseDto,
        forMember(
          (dest: AdminGetVariantTypeResponseDto) => dest?.variantTypeId,
          mapFrom((src: VariantTypeEntity) => src.id),
        ),
        forMember(
          (dest: AdminGetVariantTypeResponseDto) => dest?.variantTypeName,
          mapFrom((src: VariantTypeEntity) => src.name),
        ),
      );
    };
  }
}
