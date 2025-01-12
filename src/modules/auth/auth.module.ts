import { Module } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { AuthCommonModule } from "src/common/auth/auth.module";
import { AdminModule } from "../admin/admin.module";

@Module({
  imports: [AuthCommonModule, AdminModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
