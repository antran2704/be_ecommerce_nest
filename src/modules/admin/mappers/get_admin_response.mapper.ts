import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { AdminEntity } from "../entities/admin.entity";
import { GetAdminResponseDto } from "../dtos";
import { getFullImagePath } from "~/common/multer/helpers";

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
          (dest: GetAdminResponseDto) => dest?.avatar,
          mapFrom((src: AdminEntity) =>
            src.avatar ? getFullImagePath(src.avatar) : null,
          ),
        ),
        forMember(
          (dest: GetAdminResponseDto) => dest?.roleId,
          mapFrom((src: AdminEntity) => (src.role ? src.role.id : null)),
        ),
        forMember(
          (dest: GetAdminResponseDto) => dest?.role,
          mapFrom((src: AdminEntity) => (src.role ? src.role.name : null)),
        ),
        forMember(
          (dest: GetAdminResponseDto) => dest?.groupRoleId,
          mapFrom((src: AdminEntity) =>
            src.role?.groupRole ? src.role.groupRole.id : null,
          ),
        ),
        forMember(
          (dest: GetAdminResponseDto) => dest?.groupRole,
          mapFrom((src: AdminEntity) =>
            src.role?.groupRole ? src.role.groupRole.name : null,
          ),
        ),
        forMember(
          (dest: GetAdminResponseDto) => dest?.createdAt,
          mapFrom((src: AdminEntity) => src.created_at),
        ),
      );
    };
  }
}
