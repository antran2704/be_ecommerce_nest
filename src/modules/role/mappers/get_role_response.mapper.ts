import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { RoleEntity } from "../entities/role.entity";
import { GetRoleResponeDto } from "../dtos";

export default class GetRoleMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        RoleEntity,
        GetRoleResponeDto,
        forMember(
          (dest: GetRoleResponeDto) => dest?.roleId,
          mapFrom((src: RoleEntity) => src.id),
        ),
      );
    };
  }
}
