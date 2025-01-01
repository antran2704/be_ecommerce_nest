import { Module } from '@nestjs/common';

import { UserModule } from '../../modules/user/user.module';
import { UserController } from 'src/modules/user/controller/user.controller';
import { PermissionModule } from 'src/modules/permissions/permission.module';
import { PermissionController } from 'src/modules/permissions/controllers/permission.controller';

@Module({
  controllers: [UserController, PermissionController],
  imports: [UserModule, PermissionModule],
})
export class InternalRouteModule {}
