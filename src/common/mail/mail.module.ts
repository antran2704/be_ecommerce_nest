import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import * as path from "path";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          service: "gmail",
          from: config.get("mail.defaultMail"),
          secure: false,
          auth: {
            user: config.get("mail.defaultMail"),
            pass: config.get("mail.password"),
          },
        },
        template: {
          dir: path.resolve() + "/src/views/pages",
          adapter: new HandlebarsAdapter(null, { inlineCssEnabled: true }),
        },
        options: {
          partials: {
            dir: path.resolve() + "/src/views/partials",
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class MailModule {}
