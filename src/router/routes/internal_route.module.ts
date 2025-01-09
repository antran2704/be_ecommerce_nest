import { Module } from "@nestjs/common";

import { AdminModule } from "../../modules/admin/admin.module";
import { AdminController } from "src/modules/admin/controller/admin.controller";
import { PermissionModule } from "src/modules/permissions/permission.module";
import { PermissionController } from "src/modules/permissions/controllers/permission.controller";
import { GroupRoleModule } from "src/modules/group_role/group_role.module";
import { GroupRoleController } from "src/modules/group_role/controllers/group_role.controller";

@Module({
  controllers: [AdminController, PermissionController, GroupRoleController],
  imports: [AdminModule, PermissionModule, GroupRoleModule],
})
export class InternalRouteModule {}
