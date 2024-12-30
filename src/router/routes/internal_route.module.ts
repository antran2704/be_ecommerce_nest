import { Module } from '@nestjs/common';

import { UserModule } from '../../modules/user/user.module';
import { UserController } from 'src/modules/user/controller/user.controller';

@Module({
  controllers: [UserController],
  imports: [UserModule],
})
export class InternalRouteModule {}
