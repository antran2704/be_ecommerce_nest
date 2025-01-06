import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AdminService } from "./services/admin.service";
import { Admin } from "./entities/admin.entity";
import { AuthCommonModule } from "src/common/auth/auth.module";
import { GetAdminReponseProfile } from "./profiles/get_admin_response.profile";
import { AuthAdminToken } from "./entities/auth_admin_token.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Admin, AuthAdminToken]), AuthCommonModule],
  providers: [AdminService, GetAdminReponseProfile],
  exports: [AdminService],
})
export class AdminModule {}
