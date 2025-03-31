import { Module } from "@nestjs/common";

import { PermissionService } from "./services/permission.service";
import { RoleModule } from "../role/role.module";

@Module({
  imports: [RoleModule],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
