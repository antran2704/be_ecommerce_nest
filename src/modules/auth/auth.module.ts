import { Module } from "@nestjs/common";

import { AuthService } from "./services/auth.service";
import { AuthCommonModule } from "src/common/auth/auth.module";
import { AdminModule } from "../admin/admin.module";
import { AuthTokenModule } from "../auth_token/auth_token.module";

@Module({
  imports: [AuthCommonModule, AdminModule, AuthTokenModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
