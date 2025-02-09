import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VariantTypeValueEntity } from "./entities/variant_type_value.entity";
import { AdminVariantTypeValueRepository } from "./repositories/admin_variant_type.repository";
import { AdminVariantTypeValueService } from "./services/admin_variant_type.service";
import { AdminVariantTypeValueReponseMapper } from "./mappers/admin_get_variant_type_response.mapper";
import { AdminVariantTypeModule } from "../variant_type/admin_variant_type.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([VariantTypeValueEntity]),
    AdminVariantTypeModule,
  ],
  providers: [
    AdminVariantTypeValueRepository,
    AdminVariantTypeValueService,
    AdminVariantTypeValueReponseMapper,
  ],
  exports: [AdminVariantTypeValueService],
})
export class AdminVariantTypeValueModule {}
