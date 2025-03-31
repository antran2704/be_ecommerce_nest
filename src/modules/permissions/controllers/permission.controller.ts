import { Body, Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";

import { PermissionService } from "../services/permission.service";
import { ENUM_PERMISSION } from "../enums/permission.enum";
import { Permissions } from "~/common/auth/decorators/permission.decorator";
import { PermissionGuard } from "~/common/auth/guards";
import { UpdatedSuccessResponse } from "~/common/response/success.response";
import { UpdatePermissionRequestDto } from "~/modules/role/dtos";

@Controller("permissions")
@ApiBearerAuth()
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Get("/")
  @Permissions([ENUM_PERMISSION.ADMIN_ROLE_VIEW])
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

  @Patch("/:role_id")
  @Permissions([ENUM_PERMISSION.ADMIN_ROLE_UPDATE])
  @UseGuards(PermissionGuard)
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  updatePermissions(
    @Param("role_id") id: string,
    @Body() payload: UpdatePermissionRequestDto,
  ) {
    return this.permissionService.updatePermissions(id, payload);
  }
}
