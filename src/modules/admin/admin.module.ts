import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AdminService } from "./services/admin.service";
import { AdminEntity } from "./entities/admin.entity";
import { AuthCommonModule } from "src/common/auth/auth.module";
import { GetAdminReponseMapper } from "./mappers/get_admin_response.mapper";
import { AdminRepository } from "./repositories/admin.repository";
import { RoleModule } from "../role/role.module";
import { AuthTokenModule } from "../authToken/auth_token.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity]),
    AuthCommonModule,
    RoleModule,
    AuthTokenModule,
  ],
  providers: [AdminService, GetAdminReponseMapper, AdminRepository],
  exports: [AdminService],
})
export class AdminModule {}
