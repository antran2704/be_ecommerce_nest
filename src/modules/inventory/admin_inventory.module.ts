import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { InventoryEntity } from "./entities/inventory.entity";
import { AdminGetInventoryReponseMapper } from "./mappers/admin_get_inventory_response.mapper";
import { AdminInventoryRepository } from "./repositories/admin_inventory.repository";
import { AdminInventoryService } from "./services/admin_inventory.service";

@Module({
  imports: [TypeOrmModule.forFeature([InventoryEntity])],
  providers: [
    AdminGetInventoryReponseMapper,
    AdminInventoryRepository,
    AdminInventoryService,
  ],
  exports: [AdminInventoryService],
})
export class AdminInventoryModule {}
