import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { classes } from "@automapper/classes";
import { AutomapperModule } from "@automapper/nestjs";

import configs from "~/configs";
import { DatabaseModule } from "./database/database.module";
import { AppRouterModule } from "../router/router.module";
import { MailModule } from "./mail/mail.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env.development", ".env.production", ".env"],
      isGlobal: true,
      load: configs,
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    DatabaseModule,
    MailModule,
    AppRouterModule,
  ],
})
export class CommonModule {}
