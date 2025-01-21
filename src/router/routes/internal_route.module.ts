import { Module } from "@nestjs/common";

import { AdminModule } from "../../modules/admin/admin.module";
import { AdminController } from "src/modules/admin/controller/admin.controller";
import { PermissionModule } from "src/modules/permissions/permission.module";
import { PermissionController } from "src/modules/permissions/controllers/permission.controller";
import { GroupRoleModule } from "src/modules/group_role/group_role.module";
import { GroupRoleController } from "src/modules/group_role/controllers/group_role.controller";
import { RoleController } from "src/modules/role/controllers/role.controller";
import { RoleModule } from "src/modules/role/role.module";
import { UserController } from "src/modules/user/controller/user.controller";
import { UserModule } from "src/modules/user/user.module";

@Module({
  controllers: [
    AdminController,
    UserController,
    PermissionController,
    GroupRoleController,
    RoleController,
  ],
  imports: [
    AdminModule,
    UserModule,
    PermissionModule,
    GroupRoleModule,
    RoleModule,
  ],
})
export class InternalRouteModule {}
