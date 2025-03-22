import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { AdminCategoryModule } from "../category/admin_category.module";
import { AdminProductRepository } from "./repositories/admin_product.repository";
import { AdminProductService } from "./services/admin_product.service";
import { AdminGetProductDetailReponseMapper } from "./mappers/admin_get_product_detail_response.mapper";
import { AdminGetProductListReponseMapper } from "./mappers/admin_get_product_list_response.mapper";
import { AdminInventoryModule } from "../inventory/admin_inventory.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    AdminCategoryModule,
    AdminInventoryModule,
  ],
  providers: [
    AdminProductRepository,
    AdminProductService,
    AdminGetProductDetailReponseMapper,
    AdminGetProductListReponseMapper,
  ],
  exports: [AdminProductService],
})
export class AdminProductModule {}
