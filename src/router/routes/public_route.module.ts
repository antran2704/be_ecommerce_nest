import { Module } from "@nestjs/common";
import { AuthModule } from "../../modules/auth/auth.module";
import { AuthAdminController } from "../../modules/auth/admin/controllers/auth.controller";
import { AuthUserController } from "~/modules/auth/user/controllers/auth.controller";
import { UserCategoryModule } from "~/modules/category/user_category.module";
import { UserCategoryController } from "~/modules/category/controllers/user_category.controller";

@Module({
  controllers: [
    AuthAdminController,
    AuthUserController,
    UserCategoryController,
  ],
  imports: [AuthModule, UserCategoryModule],
})
export class PublicRouteModule {}
