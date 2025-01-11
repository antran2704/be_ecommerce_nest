import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { GroupRoleService } from "./services/group_role.service";
import GroupRoleRepository from "./repositories/group_role.repository";
import { GroupRoleEntity } from "./entities/group_role.entity";
import { GetGroupRoleMapper } from "./mappers";
import { RoleModule } from "../role/role.module";

@Module({
  imports: [TypeOrmModule.forFeature([GroupRoleEntity]), RoleModule],
  providers: [GroupRoleService, GroupRoleRepository, GetGroupRoleMapper],
  exports: [GroupRoleService],
})
export class GroupRoleModule {}
