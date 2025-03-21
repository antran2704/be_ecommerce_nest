import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { InventoryEntity } from "./entities/inventory.entity";
import { AdminGetInventoryReponseMapper } from "./mappers/admin_get_inventory_response.mapper";
import { AdminProductInventoryRepository } from "./repositories/admin_product_inventory.repository";
import { AdminProductInventoryService } from "./services/admin_product_inventory.service";
import { AdminVariantProductInventoryService } from "./services/admin_variant_product_inventory.service";
import { AdminVariantProductInventoryRepository } from "./repositories/admin_variant_product_inventory.repository";

@Module({
  imports: [TypeOrmModule.forFeature([InventoryEntity])],
  providers: [
    AdminGetInventoryReponseMapper,
    AdminProductInventoryRepository,
    AdminVariantProductInventoryRepository,
    AdminProductInventoryService,
    AdminVariantProductInventoryService,
  ],
  exports: [AdminProductInventoryService, AdminVariantProductInventoryService],
})
export class AdminInventoryModule {}
