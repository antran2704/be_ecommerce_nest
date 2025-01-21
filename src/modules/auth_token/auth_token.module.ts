import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthTokenService } from "./services/auth_token.service";
import { AuthTokenRepository } from "./repositories/auth_token.repository";
import { AuthTokenEntity } from "./entities/auth_token.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AuthTokenEntity])],
  providers: [AuthTokenService, AuthTokenRepository],
  exports: [AuthTokenService],
})
export class AuthTokenModule {}
