import { Module } from "@nestjs/common";

import { AuthCommonModule } from "~/common/auth/auth.module";
import { AdminModule } from "../admin/admin.module";
import { AuthTokenModule } from "../auth_token/auth_token.module";
import { MailModule } from "~/common/mail/mail.module";
import { AuthAdminService } from "./admin/services/auth.service";
import { UserModule } from "../user/user.module";
import { AuthUserService } from "./user/services/auth.service";
import { AuthProviderModule } from "../auth_provider/auth_provider.module";
import { ClerkClientProvider } from "~/common/auth_provider/clerk/clerk_client.provider";
import { CartModule } from "../cart/cart.module";

@Module({
  imports: [
    AuthCommonModule,
    AdminModule,
    UserModule,
    AuthTokenModule,
    AuthProviderModule,
    MailModule,
    CartModule,
  ],
  providers: [AuthAdminService, AuthUserService, ClerkClientProvider],
  exports: [AuthAdminService, AuthUserService],
})
export class AuthModule {}
