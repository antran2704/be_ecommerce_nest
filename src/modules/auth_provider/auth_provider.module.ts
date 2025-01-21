import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthProviderEntity } from "./entities/auth_provider.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AuthProviderEntity])],
})
export class AuthProviderModule {}
