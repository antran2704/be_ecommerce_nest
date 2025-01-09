import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Admin } from "../entities/admin.entity";
import { GetAdminResponseDto } from "../dtos";

export class GetAdminReponseMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        Admin,
        GetAdminResponseDto,
        forMember(
          (dest: GetAdminResponseDto) => dest?.isActive,
          mapFrom((src: Admin) => src.is_active),
        ),
        forMember(
          (dest: GetAdminResponseDto) => dest?.isAdmin,
          mapFrom((src: Admin) => src.is_admin),
        ),
        forMember(
          (dest: GetAdminResponseDto) => dest?.userId,
          mapFrom((src: Admin) => src.id),
        ),
        forMember(
          (dest: GetAdminResponseDto) => dest?.createdAt,
          mapFrom((src: Admin) => src.created_at),
        ),
      );
    };
  }
}
