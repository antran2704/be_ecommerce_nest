import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { VariantProductEntity } from "./entities/variant_product.entity";
import { AdminVariantProductRepository } from "./repositories/admin_variant_product.repository";
import { AdminGetVariantProductDetailReponseMapper } from "./mappers/admin_get_variant_product_detail_response.mapper";
import { AdminGetVariantProductListReponseMapper } from "./mappers/admin_get_variant_product_list_response.mapper";

@Module({
  imports: [TypeOrmModule.forFeature([VariantProductEntity])],
  providers: [
    AdminVariantProductRepository,
    AdminGetVariantProductListReponseMapper,
    AdminGetVariantProductDetailReponseMapper,
  ],
  exports: [],
})
export class AdminVariantProductModule {}
