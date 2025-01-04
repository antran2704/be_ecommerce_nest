import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import SwaggerApp from './app/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const PORT = configService.get('app.port');
  const HOST = configService.get('app.host');
  const globalPrefix = configService.get('app.globalPrefix');
  const SWAGGER_ENABLE = configService.get('swagger.enable');

  // Global prefix, except for bull-mq-board and all the routes in the bull-mq-board
  app.setGlobalPrefix(globalPrefix);

  // Config CORS
  app.enableCors({
    allowedHeaders: configService.get('middleware.cors.allowHeader'),
    origin: configService.get('middleware.cors.allowOrigin'),
    methods: configService.get('middleware.cors.allowMethod'),
  });
  
  // Setup swagger if swagger.enable = 1
  if (Boolean(Number(SWAGGER_ENABLE))) {
    new SwaggerApp(app).initial();
  }
  
  await app.listen(PORT ?? 3000);
  Logger.log(`App is running on ${HOST}:${PORT}`, 'Init app');
}
bootstrap();
