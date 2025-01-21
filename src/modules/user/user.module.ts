import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserService } from "./services/user.service";
import { UserEntity } from "./entities/user.entity";
import { AuthCommonModule } from "src/common/auth/auth.module";
import { GetUserReponseMapper } from "./mappers/get_user_response.mapper";
import { UserRepository } from "./repositories/user.repository";
import { AuthTokenModule } from "../auth_token/auth_token.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    AuthCommonModule,
    AuthTokenModule,
  ],
  providers: [UserService, GetUserReponseMapper, UserRepository],
  exports: [UserService],
})
export class UserModule {}
