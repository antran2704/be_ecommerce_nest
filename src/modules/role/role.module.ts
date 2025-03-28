import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { RoleEntity } from "./entities/role.entity";
import { RoleService } from "./services/role.service";
import { RoleRepository } from "./repositories";
import GetRoleMapper from "./mappers/get_role_response.mapper";
import { GroupRoleModule } from "../group_role/group_role.module";

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity]), GroupRoleModule],
  providers: [RoleService, RoleRepository, GetRoleMapper],
  exports: [RoleService],
})
export class RoleModule {}
