import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserService } from "./services/user.service";
import { UserEntity } from "./entities/user.entity";
import { AuthCommonModule } from "~/common/auth/auth.module";
import { GetUserReponseMapper } from "./mappers/get_user_response.mapper";
import { UserRepository } from "./repositories/user.repository";
import { AuthTokenModule } from "../auth_token/auth_token.module";
import { AuthProviderModule } from "../auth_provider/auth_provider.module";
import { CartModule } from "../cart/cart.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    AuthCommonModule,
    AuthTokenModule,
    AuthProviderModule,
    CartModule,
  ],
  providers: [UserService, GetUserReponseMapper, UserRepository],
  exports: [UserService],
})
export class UserModule {}
