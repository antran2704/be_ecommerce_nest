import { Module } from "@nestjs/common";
import { AuthModule } from "../../modules/auth/auth.module";
import { AuthAdminController } from "../../modules/auth/admin/controllers/auth.controller";
import { AuthUserController } from "~/modules/auth/user/controllers/auth.controller";

@Module({
  controllers: [AuthAdminController, AuthUserController],
  imports: [AuthModule],
})
export class PublicRouteModule {}
