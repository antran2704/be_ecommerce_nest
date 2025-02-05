import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CategoryEntity } from "./entities/category.entity";
import { UserGetCategoryReponseMapper } from "./mappers/user_get_category_response.mapper";
import { UserCategoryRepository } from "./repositories/user_category.repository";
import { UserCategoryService } from "./services/user_category.service";

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [
    // Repositories
    UserCategoryRepository,

    // Services
    UserCategoryService,

    // Mappers
    UserGetCategoryReponseMapper,
  ],
  exports: [UserCategoryService],
})
export class UserCategoryModule {}
