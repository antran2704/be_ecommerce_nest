import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AdminService } from "./services/admin.service";
import { Admin } from "./entities/admin.entity";
import { AuthCommonModule } from "src/common/auth/auth.module";
import { GetAdminReponseMapper } from "./mappers/get_admin_response.mapper";
import { AuthAdminToken } from "./entities/auth_admin_token.entity";
import { AdminRepository } from "./repositories/admin.repository";
import { AuthAdminTokenRepository } from "./repositories/authAdminToken.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, AuthAdminToken]),
    AuthCommonModule,
  ],
  providers: [
    AdminService,
    GetAdminReponseMapper,
    AdminRepository,
    AuthAdminTokenRepository,
  ],
  exports: [AdminService],
})
export class AdminModule {}
