import { Injectable, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { Permissions } from "../decorators/permission.decorator";
import JwtAuthGuard from "./jwt-auth.guard";
import { IAccessTokenAdminPayload } from "~/modules/auth/admin/interfaces/access_token_payload.interface";
import { RoleService } from "~/modules/role/services/role.service";

@Injectable()
export default class PermissionGuard extends JwtAuthGuard {
  constructor(
    private reflector: Reflector,
    private readonly roleService: RoleService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // check if user is authenticated
    const isAuthenticated = await super.canActivate(context);

    if (!isAuthenticated) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user: IAccessTokenAdminPayload = request.user;

    // Pass if user is admin
    if (user.isAdmin) return true;

    // Fail if user has no role
    if (!user.role) return false;

    // Get required permissions form Permission decorator
    const requiredPermissions = this.reflector.get<string[]>(
      Permissions,
      context.getHandler(),
    );

    const roleEntity = await this.roleService.getRoleEntity(user.role);

    if (!roleEntity) return false;

    return roleEntity.permissions.some((permission) =>
      requiredPermissions.includes(permission),
    );
  }
}
