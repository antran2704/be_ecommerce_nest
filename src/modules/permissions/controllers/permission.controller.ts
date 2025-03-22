import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";

import { PermissionService } from "../services/permission.service";
import { ENUM_PERMISSION } from "../enums/permission.enum";
import { Permissions } from "~/common/auth/decorators/permission.decorator";
import { PermissionGuard } from "~/common/auth/guards";

@Controller("permission")
@ApiBearerAuth()
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Get("/")
  @Permissions([ENUM_PERMISSION.HOME_VIEW])
  @UseGuards(PermissionGuard)
  @ApiResponse({
    status: 200,
    description: "Get list permission",
    example: {
      ADMIN: {
        title: "HOME",
        key: "HOME",
        childrend: [{ title: "HOME.VIEW", key: "HOME.VIEW" }],
      },
    },
  })
  getPermissions() {
    return this.permissionService.getPermissions();
  }
}
