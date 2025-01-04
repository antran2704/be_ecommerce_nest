import {
  createMap,
  Mapper,
} from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { GetAdminReponseDto } from "../dtos/get_admin_response.dto";
import { Admin } from "../entities/admin";

export class GetAdminReponseProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, Admin, GetAdminReponseDto);
    };
  }

  // override get profile(): MappingProfile {
  //   return (mapper) => {
  //     createMap(mapper, Repository<Admin>, GetAdminReponseDto);
  //   };
  // }
}
