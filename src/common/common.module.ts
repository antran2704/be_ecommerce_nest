import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configs from 'src/configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env'],
      isGlobal: true,
      load: configs,
    }),
  ],
})
export class CommonModule {}
