import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { VariantProductEntity } from "./entities/variant_product.entity";
import { AdminVariantProductRepository } from "./repositories/admin_variant_product.repository";
import { AdminGetVariantProductDetailReponseMapper } from "./mappers/admin_get_variant_product_detail_response.mapper";
import { AdminGetVariantProductListReponseMapper } from "./mappers/admin_get_variant_product_list_response.mapper";
import { AdminVariantProductService } from "./services/admin_variant_product.service";
import { AdminProductModule } from "../product/admin_product.module";
import { AdminInventoryModule } from "../inventory/admin_inventory.module";
import { AdminVariantTypeValueModule } from "../variant_type_value/admin_variant_type.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([VariantProductEntity]),
    AdminProductModule,
    AdminInventoryModule,
    AdminVariantTypeValueModule,
  ],
  providers: [
    AdminVariantProductRepository,
    AdminVariantProductService,
    AdminGetVariantProductListReponseMapper,
    AdminGetVariantProductDetailReponseMapper,
  ],
  exports: [AdminVariantProductService],
})
export class AdminVariantProductModule {}
