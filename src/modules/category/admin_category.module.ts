import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CategoryEntity } from "./entities/category.entity";
import { AdminCategoryRepository } from "./repositories/admin_category.repository";
import { AdminCategoryService } from "./services/admin_category.service";
import { AdminGetCategoryReponseMapper } from "./mappers/admin_get_category_response.mapper";
import { AdminGetChildCategoryReponseMapper } from "./mappers/admin_get_child_category_response.mapper";
import { AdminGetCategoriesReponseMapper } from "./mappers/admin_get_categories_response.mapper";

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [
    // Repositories
    AdminCategoryRepository,

    // Services
    AdminCategoryService,

    // Mappers
    AdminGetCategoriesReponseMapper,
    AdminGetCategoryReponseMapper,
    AdminGetChildCategoryReponseMapper,
  ],
  exports: [AdminCategoryService],
})
export class AdminCategoryModule {}
