import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { AdminEntity } from "../entities/admin.entity";
import { GetAdminResponseDto } from "../dtos";

export class GetAdminReponseMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        AdminEntity,
        GetAdminResponseDto,
        forMember(
          (dest: GetAdminResponseDto) => dest?.isActive,
          mapFrom((src: AdminEntity) => src.is_active),
        ),
        forMember(
          (dest: GetAdminResponseDto) => dest?.isAdmin,
          mapFrom((src: AdminEntity) => src.is_admin),
        ),
        forMember(
          (dest: GetAdminResponseDto) => dest?.userId,
          mapFrom((src: AdminEntity) => src.id),
        ),
        forMember(
          (dest: GetAdminResponseDto) => dest?.createdAt,
          mapFrom((src: AdminEntity) => src.created_at),
        ),
      );
    };
  }
}
