import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CategoryEntity } from "./entities/category.entity";
import { AdminCategoryRepository } from "./repositories/admin_category.repository";
import { AdminCategoryService } from "./services/admin_category.service";
import { AdminGetCategoryReponseMapper } from "./mappers/get_category_response.mapper";
import { AdminGetChildCategoryReponseMapper } from "./mappers/get_child_category_response.mapper";

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [
    AdminCategoryRepository,
    AdminCategoryService,
    AdminGetCategoryReponseMapper,
    AdminGetChildCategoryReponseMapper,
  ],
  exports: [AdminCategoryService],
})
export class AdminCategoryModule {}
