import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { InventoryEntity } from "../entities/inventory.entity";
import { AdminGetProductInventoryResponseDto } from "../dtos/services";

export class AdminGetInventoryReponseMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        InventoryEntity,
        AdminGetProductInventoryResponseDto,
        forMember(
          (dest: AdminGetProductInventoryResponseDto) => dest.inventoryId,
          mapFrom((src: InventoryEntity) => src.id),
        ),
      );
    };
  }
}
