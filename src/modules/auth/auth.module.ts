import { Module } from "@nestjs/common";

import { AuthService } from "./services/auth.service";
import { AuthCommonModule } from "src/common/auth/auth.module";
import { AdminModule } from "../admin/admin.module";
import { AuthTokenModule } from "../auth_token/auth_token.module";
import { MailModule } from "src/common/mail/mail.module";

@Module({
  imports: [AuthCommonModule, AdminModule, AuthTokenModule, MailModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
