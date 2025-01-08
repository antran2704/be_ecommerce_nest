import { Module } from "@nestjs/common";
import { AuthModule } from "../../modules/auth/auth.module";
import { AuthController } from "../../modules/auth/controllers/auth.controller";

@Module({
  controllers: [AuthController],
  imports: [AuthModule],
})
export class PublicRouteModule {}
