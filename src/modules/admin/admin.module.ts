import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AdminService } from "./services/admin.service";
import { Admin } from "./entities/admin";
import { AuthCommonModule } from "src/common/auth/auth.module";
import { GetAdminReponseProfile } from "./profiles/get_admin_response.profile";

@Module({
  imports: [TypeOrmModule.forFeature([Admin]), AuthCommonModule],
  providers: [AdminService, GetAdminReponseProfile],
  exports: [AdminService],
})
export class AdminModule {}
