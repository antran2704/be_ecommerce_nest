import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Admin, Repository } from "typeorm";
import { GetAdminReponseDto } from "../dtos/get_admin_response.dto";

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
