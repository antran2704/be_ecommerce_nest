import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthTokenEntity } from "./entities/auth_token.entity";
import { AdminAuthTokenService, UserAuthTokenService } from "./services";
import {
  AdminAuthTokenRepository,
  UserAuthTokenRepository,
} from "./repositories";

@Module({
  imports: [TypeOrmModule.forFeature([AuthTokenEntity])],
  providers: [
    AdminAuthTokenService,
    UserAuthTokenService,
    AdminAuthTokenRepository,
    UserAuthTokenRepository,
  ],
  exports: [UserAuthTokenService, AdminAuthTokenService],
})
export class AuthTokenModule {}
