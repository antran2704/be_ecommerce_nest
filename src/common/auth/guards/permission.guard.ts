import { Injectable, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { ENUM_PERMISSION } from "~/modules/permissions/enums/permission.enum";
import { Permissions } from "../decorators/permission.decorator";
import JwtAuthGuard from "./jwt-auth.guard";
import { IAccessTokenAdminPayload } from "~/modules/auth/admin/interfaces/access_token_payload.interface";

const initPermission = [ENUM_PERMISSION.HOME_VIEW, ENUM_PERMISSION.HOME_CREATE];

@Injectable()
export default class PermissionGuard extends JwtAuthGuard {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return true;
    // check if user is authenticated
    const isAuthenticated = await super.canActivate(context);

    if (!isAuthenticated) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user: IAccessTokenAdminPayload = request.user;

    // Pass if user is admin
    if (user.isAdmin) return true;
    // Get required permissions form Permission decorator
    const requiredPermissions = this.reflector.get<string[]>(
      Permissions,
      context.getHandler(),
    );

    return initPermission.some((permission) =>
      requiredPermissions.includes(permission),
    );
  }
}
