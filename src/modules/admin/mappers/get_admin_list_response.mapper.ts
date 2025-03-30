import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { AdminEntity } from "../entities/admin.entity";
import { GetAdminListResponseDto } from "../dtos";

export class GetAdminListReponseMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        AdminEntity,
        GetAdminListResponseDto,
        forMember(
          (dest: GetAdminListResponseDto) => dest?.isActive,
          mapFrom((src: AdminEntity) => src.is_active),
        ),
        forMember(
          (dest: GetAdminListResponseDto) => dest?.isAdmin,
          mapFrom((src: AdminEntity) => src.is_admin),
        ),
        forMember(
          (dest: GetAdminListResponseDto) => dest?.userId,
          mapFrom((src: AdminEntity) => src.id),
        ),
        forMember(
          (dest: GetAdminListResponseDto) => dest?.createdAt,
          mapFrom((src: AdminEntity) => src.created_at),
        ),
      );
    };
  }
}
