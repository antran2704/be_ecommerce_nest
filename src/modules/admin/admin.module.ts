import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AdminService } from "./services/admin.service";
import { AdminEntity } from "./entities/admin.entity";
import { AuthCommonModule } from "src/common/auth/auth.module";
import { GetAdminReponseMapper } from "./mappers/get_admin_response.mapper";
import { AuthAdminTokenEntity } from "./entities/auth_admin_token.entity";
import { AdminRepository } from "./repositories/admin.repository";
import { AuthAdminTokenRepository } from "./repositories/authAdminToken.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity, AuthAdminTokenEntity]),
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
