import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VariantTypeEntity } from "./entities/variant_type.entity";
import { AdminVariantTypeRepository } from "./repositories/admin_variant_type.repository";
import { AdminVariantTypeService } from "./services/admin_variant_type.service";
import { AdminVariantTypeReponseMapper } from "./mappers/admin_get_variant_type_response.mapper";

@Module({
  imports: [TypeOrmModule.forFeature([VariantTypeEntity])],
  providers: [
    AdminVariantTypeRepository,
    AdminVariantTypeService,
    AdminVariantTypeReponseMapper,
  ],
  exports: [AdminVariantTypeService],
})
export class AdminVariantTypeModule {}
