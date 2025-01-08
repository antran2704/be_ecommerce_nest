import { Module } from "@nestjs/common";

import { AdminModule } from "../../modules/admin/admin.module";
import { AdminController } from "src/modules/admin/controller/admin.controller";
import { PermissionModule } from "src/modules/permissions/permission.module";
import { PermissionController } from "src/modules/permissions/controllers/permission.controller";

@Module({
  controllers: [AdminController, PermissionController],
  imports: [AdminModule, PermissionModule],
})
export class InternalRouteModule {}
