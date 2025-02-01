import { ConfigService } from "@nestjs/config";
import * as hbs from "hbs";
import { join } from "path";

import { ISettingApp } from "../interfaces/setting.interface";
import { NestExpressApplication } from "@nestjs/platform-express";

export class SettingApp implements ISettingApp {
  private readonly app: NestExpressApplication;
  private readonly configService: ConfigService;

  constructor(app: NestExpressApplication, configService: ConfigService) {
    this.app = app;
    this.configService = configService;
  }

  globalPrefix() {
    const API_VERSION = this.configService.get("app.apiVersion");
    const GLOBAL_PREFIX = this.configService.get("app.globalPrefix");

    this.app.setGlobalPrefix(GLOBAL_PREFIX + API_VERSION);
  }

  cors() {
    const allowedHeaders = this.configService.get(
      "middleware.cors.allowHeader",
    );
    const allowedOrigins = this.configService.get(
      "middleware.cors.allowOrigin",
    );
    const allowedMethods = this.configService.get(
      "middleware.cors.allowMethod",
    );

    this.app.enableCors({
      allowedHeaders,
      origin: allowedOrigins,
      methods: allowedMethods,
    });
  }

  viewEngine() {
    this.app.setBaseViewsDir(join(__dirname, "../../../../src/views/pages"));
    this.app.setViewEngine("hbs");
    hbs.registerPartials(join(__dirname, "../../../../src/views/partials"));
  }
}
