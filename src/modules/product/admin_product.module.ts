import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { AdminCategoryModule } from "../category/admin_category.module";

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), AdminCategoryModule],
  providers: [],
  exports: [],
})
export class AdminProductModule {}
