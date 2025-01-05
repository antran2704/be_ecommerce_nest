import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { IAccessTokenPayload } from 'src/modules/auth/interfaces/auth.interface';
import { ENUM_PERMISSION } from 'src/modules/permissions/enums/permission.enum';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Reflector } from '@nestjs/core';
import { Permissions } from '../decorators/permission.decorator';

const initPermission = [ENUM_PERMISSION.HOME_VIEW, ENUM_PERMISSION.HOME_CREATE];

@Injectable()
export class PermissionGuard extends JwtAuthGuard {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // check if user is authenticated
    const isAuthenticated = await super.canActivate(context);

    if (!isAuthenticated) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user: IAccessTokenPayload = request.user;

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
