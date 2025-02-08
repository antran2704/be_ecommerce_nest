import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { VariantTypeValueEntity } from "../entities/variant_type.entity";
import { AdminGetVariantTypeValueResponseDto } from "../dtos/services";

export class AdminVariantTypeValueReponseMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        VariantTypeValueEntity,
        AdminGetVariantTypeValueResponseDto,
        forMember(
          (dest: AdminGetVariantTypeValueResponseDto) =>
            dest.variantTypeValueId,
          mapFrom((src: VariantTypeValueEntity) => src.id),
        ),
        forMember(
          (dest: AdminGetVariantTypeValueResponseDto) =>
            dest.variantTypeValueName,
          mapFrom((src: VariantTypeValueEntity) => src.name),
        ),
      );
    };
  }
}
