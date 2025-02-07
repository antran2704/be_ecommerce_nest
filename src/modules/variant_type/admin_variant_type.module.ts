import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VariantTypeEntity } from "./entities/variant_type.entity";

@Module({
  imports: [TypeOrmModule.forFeature([VariantTypeEntity])],
  providers: [],
  exports: [],
})
export class AdminVariantTypeModule {}
