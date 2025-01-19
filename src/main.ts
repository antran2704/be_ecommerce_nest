import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { Logger } from "@nestjs/common";

import { AppModule } from "./app/app.module";
import SwaggerApp from "./app/swagger";
import { SettingApp } from "./app/settings";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  const PORT = configService.get("app.port");
  const HOST = configService.get("app.host");
  const SWAGGER_ENABLE = configService.get("swagger.enable");

  const settingApp = new SettingApp(app, configService);

  // Global prefix, except for bull-mq-board and all the routes in the bull-mq-board
  settingApp.globalPrefix();

  // Config CORS
  settingApp.cors();

  // View engine
  settingApp.viewEngine();

  // Setup swagger if swagger.enable = 1
  if (Boolean(Number(SWAGGER_ENABLE))) {
    new SwaggerApp(app).initial();
  }

  await app.listen(PORT ?? 3000);
  Logger.log(`App is running on ${HOST}:${PORT}`, "Init app");
}
bootstrap();
