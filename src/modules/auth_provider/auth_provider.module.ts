import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthProviderEntity } from "./entities/auth_provider.entity";
import { AuthProviderRepository } from "./repositories/auth_provider.repository";
import { AuthProviderService } from "./services/auth_provider.service";

@Module({
  imports: [TypeOrmModule.forFeature([AuthProviderEntity])],
  providers: [AuthProviderRepository, AuthProviderService],
  exports: [AuthProviderService],
})
export class AuthProviderModule {}
