import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { InternalRouteModule } from './routes/internal_route.module';
import { PublicRouteModule } from './routes/public_route.module';
@Module({
  imports: [
    RouterModule.register([
      {
        path: 'internal',
        module: InternalRouteModule,
      },
    ]),
    PublicRouteModule,
    InternalRouteModule
  ],
})
export class AppRouterModule {}
