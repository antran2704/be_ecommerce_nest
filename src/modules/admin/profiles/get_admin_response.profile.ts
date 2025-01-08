import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { GetAdminReponseDto } from "../dtos/get_admin_response.dto";
import { Admin } from "../entities/admin.entity";

export class GetAdminReponseProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        Admin,
        GetAdminReponseDto,
        forMember(
          (dest: GetAdminReponseDto) => dest?.isActive,
          mapFrom((src: Admin) => src.is_active),
        ),
        forMember(
          (dest: GetAdminReponseDto) => dest?.isAdmin,
          mapFrom((src: Admin) => src.is_admin),
        ),
        forMember(
          (dest: GetAdminReponseDto) => dest?.userId,
          mapFrom((src: Admin) => src.id),
        ),
        forMember(
          (dest: GetAdminReponseDto) => dest?.createdAt,
          mapFrom((src: Admin) => src.created_at),
        ),
      );
    };
  }
}
