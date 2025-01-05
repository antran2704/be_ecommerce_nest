import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';

import configs from 'src/configs';
import { DatabaseModule } from './database/database.module';
import { AppRouterModule } from '../router/router.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env'],
      isGlobal: true,
      load: configs,
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    DatabaseModule,
    AppRouterModule,
  ],
})
export class CommonModule {}
