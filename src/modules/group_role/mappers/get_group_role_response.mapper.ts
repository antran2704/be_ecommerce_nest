import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { GroupRoleEntity } from "../entities/group_role.entity";
import { GetGroupRoleResponeDto } from "../dtos";

export default class GetGroupRoleMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        GroupRoleEntity,
        GetGroupRoleResponeDto,
        forMember(
          (dest: GetGroupRoleResponeDto) => dest?.groupRoleId,
          mapFrom((src: GroupRoleEntity) => src.id),
        ),
      );
    };
  }
}
