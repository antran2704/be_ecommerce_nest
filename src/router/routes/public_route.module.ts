import { Module } from "@nestjs/common";
import { AuthModule } from "../../modules/auth/auth.module";
import { AuthAdminController } from "../../modules/auth/admin/controllers/auth.controller";
import { AuthUserController } from "~/modules/auth/user/controllers/auth.controller";
import { UserCategoryModule } from "~/modules/category/user_category.module";
import { UserCategoryController } from "~/modules/category/controllers/user_category.controller";
import { FilesModule } from "~/modules/file/file.module";
import { FilesController } from "~/modules/file/controllers/file.controller";

@Module({
  controllers: [
    FilesController,
    AuthAdminController,
    AuthUserController,
    UserCategoryController,
  ],
  imports: [FilesModule, AuthModule, UserCategoryModule],
})
export class PublicRouteModule {}
